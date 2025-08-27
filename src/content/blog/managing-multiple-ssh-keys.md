---
title: 'Managing Multiple SSH Keys in Git and SSH Config'
description: 'Learn how to manage multiple SSH keys for personal, work, and client projects using ssh-agent, ssh config, and gitconfig conditionals.'
pubDate: '2021-02-15'
updatedDate: '2025-08-20'
tags: ['ssh', 'ssh-config', 'gitconfig']
author: 'Syed Aslam'
heroImage: '../../assets/multiple-ssh-keys.png'
canonicalURL: 'https://syedaslam.com/blog/managing-multiple-ssh-keys-in-git-and-ssh-config/'
---

> **Note (2025):**
> While the examples here are from 2021, they remain very relevant. OpenSSH and Git continue to support managing multiple identities via `~/.ssh/config` and `gitconfig` conditionals. The **Ed25519** algorithm is still the recommended key type for security and performance, though RSA remains widely used for compatibility.

---

## Why multiple SSH keys?

It’s best practice to use one key per device, but in reality you may need more:

- One for **personal projects**
- Another for **work repositories**
- Possibly a third for **client servers**

Managing these can become cumbersome if you rely only on `ssh-add`. Every restart, you’d need to re-add keys and type passphrases again.

The better solution: automate key handling and specify which key to use per host using the SSH configuration file at `~/.ssh/config`.

---

## SSH Config Basics

The per-user [SSH config](https://linux.die.net/man/5/ssh_config) lets you define host-specific settings.

Create the file if it doesn’t exist:

```sh
touch ~/.ssh/config
chmod 600 ~/.ssh/config
```

Also, ensure private key files have the right permissions (Linux/macOS):

```sh
chmod 400 ~/.ssh/id_ed25519
```

---

### Recommended Key Type: Ed25519

Introduced in OpenSSH 6.5, Ed25519 is compact, fast, and more secure than RSA (unless RSA is 2048+ bits).

Generate an Ed25519 key:

```sh
ssh-keygen -t ed25519 -C "your_email@example.com"
```

Fallback (if Ed25519 unsupported):

```sh
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

---

### Example Configurations

**Work key for GitHub (corporate):**

```sh
Host github.com
  HostName github.com
  User github-corporate-user
  AddKeysToAgent yes
  UseKeychain yes
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/id_ed25519
```

**Personal GitHub key:**

```sh
Host github-personal
  HostName github.com
  User github-personal-user
  UseKeychain yes
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/id_ed25519_personal
  IdentitiesOnly yes
  AddKeysToAgent yes
```

Now you can:

```sh
ssh -T git@github.com
ssh -T git@github-personal
```

---

### Git Remote Example

To clone using your personal key:

```sh
git clone git@github-personal:your-account/interesting-project.git
```

To update an existing remote:

```sh
git remote set-url origin git@github-personal:your-account/interesting-project.git
```

### Git Identity Management

Per-repo identity override:

```sh
git config user.name "Your Name"
git config user.email "your@email.com"
```

Or conditionally per directory (Git ≥ 2.13):

```sh
[user]
  name = Your Name
  email = your@email.com

[includeIf "gitdir:~/private/"]
  path = ~/private/.gitconfig
```

Where `~/private/.gitconfig` contains:

```sh
[user]
  email = other@email.com
```

---

## Advanced Per-Repo SSH Key Settings

Via environment variable:

```sh
GIT_SSH_COMMAND="ssh -i ~/.ssh/id_rsa" git clone git@github-corporate:company/project.git
```

Or safer:

```sh
GIT_SSH_COMMAND="ssh -i ~/.ssh/id_rsa -F /dev/null" git clone git@github-corporate:company/project.git
```

**Via Git config (Git ≥ 2.10):**

```sh
git config core.sshCommand "ssh -i ~/.ssh/id_rsa -F /dev/null"
```

---

### Wrap-up

- Use Ed25519 for new keys.
- Manage multiple keys with ~/.ssh/config.
- Use IdentitiesOnly yes to force the right key per host.
- For Git identity, prefer gitconfig conditionals or per-repo overrides.

This setup scales cleanly across personal, work, and client projects.

---

### You might also like

- [Git: Revert an Updated File](/blog/git-revert-an-updated-file)
