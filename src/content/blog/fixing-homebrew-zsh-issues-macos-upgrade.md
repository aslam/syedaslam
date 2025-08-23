---
title: 'Fixing Homebrew & Zsh Issues After macOS Upgrades'
description: 'Upgrading macOS often breaks command-line setups. Here’s how I fixed issues with Homebrew, Zsh, and oh-my-zsh during the Big Sur upgrade—steps still useful for modern macOS versions.'
pubDate: '2021-01-26T13:08:48+05:30'
updatedDate: '2025-08-17T16:45:00+05:30'
heroImage: '../../assets/macos-zsh.png'
tags: [macos, shell, zsh, homebrew]
author: 'Syed Aslam'
canonical: 'https://syedaslam.com/blog/fixing-homebrew-and-zsh-issues-after-macos-upgrades'
---

> **Note**: This post was originally written during my upgrade from Catalina → Big Sur (2021). While macOS has since advanced (now Sequoia, 2025), the troubleshooting steps for Homebrew, Zsh, and oh-my-zsh remain broadly applicable when upgrading between versions.

I recently upgraded macOS from Catalina to Big Sur. While many new features worked smoothly, the command line broke in a few places.

This post notes the fixes for some of the issues I encountered—specifically around **Homebrew** and **ZSH**.

## Homebrew Fixes

1. Ensure **Xcode** is installed:

```bash
xcode-select -p
```

If missing, install via the [App Store](https://apps.apple.com/us/app/xcode/id497799835) and then:

```bash
xcode-select --install
```

2. Diagnose Homebrew:

```bash
brew doctor
```

If Java cask issues occur:

```bash
brew uninstall --force java
rm -r "$(brew --prefix)/Caskroom/java"
brew install java
```

Finally, confirm:

```bash
Your system is ready to brew.
```

## ZSH Fixes

Big Sur made **Zsh** the default shell. My setup broke because my terminal was still loading `~/.bash_profile` instead of `~/.zshrc`.

- Verify current shell:

```bash
echo $0
```

Output showed `/bin/bash` → meaning I wasn't in Zsh.

- Fix: In **Terminal.app Preferences**, change shell to open with the default login shell (`/bin/zsh`).

### Bonus Tips

- Uninstall oh-my-zsh manually:

```bash
sh ~/.oh-my-zsh/tools/uninstall.sh
```

- For **iTerm**, change shell in:

```bash
iTerm > Preferences > Profiles > Login Shell
```

<img
  src="https://res.cloudinary.com/syed-aslam/image/upload/v1755342698/syedaslam/posts/macos/iterm.png"
  srcset="
    https://res.cloudinary.com/syed-aslam/image/upload/f_auto,q_auto,w_480/v1755342698/syedaslam/posts/macos/iterm.png 480w,
    https://res.cloudinary.com/syed-aslam/image/upload/f_auto,q_auto,w_800/v1755342698/syedaslam/posts/macos/iterm.png 800w,
    https://res.cloudinary.com/syed-aslam/image/upload/f_auto,q_auto,w_1280/v1755342698/syedaslam/posts/macos/iterm.png 1280w
  "
  sizes="(max-width: 768px) 90vw, 800px"
  width="800"
  height="450"
  alt="iTerm preferences window showing how to set the login shell"
  loading="lazy"
  decoding="async"
/>

---

### Wrap-up

- After a macOS upgrade, always run `brew doctor`.
- Ensure your terminal app is configured to use the correct default shell (`/bin/zsh`).
- Reinstalling oh-my-zsh or other shell frameworks can resolve path issues.

These steps should help you get back to a working command-line environment quickly.

---

### You might also like

- [Managing Multiple SSH Keys in Git and SSH Config](/blog/managing-multiple-ssh-keys-in-git-and-ssh-config)
