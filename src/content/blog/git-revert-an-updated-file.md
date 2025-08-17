---
title: 'Git: Revert an Updated File'
description: 'How to remove an updated file from a pull request without deleting the file itself — ensuring your changeset stays clean and focused.'
pubDate: 2021-02-17
tags: ['git', 'git-revert']
heroImage: '../../assets/git-revert.png'
author: 'Syed Aslam'
---

Sometimes, a file gets updated unintentionally — like when you run `bundle install` or `yarn install`, and suddenly your lock file changes. Keeping dependencies up to date is good practice, but these unrelated updates don’t belong in your feature branch.

So how do you remove such a file from your pull request _without deleting it_?

---

## 1. If you have not committed the changes

You can simply revert the file to its last committed state:

```bash
git checkout -- filename
```

Or, with the modern syntax:

```bash
git restore filename
```

## 2. If you want a partial revert

To reset a file to its state 2 commits ago:

```bash
git checkout HEAD~2 filename
# or modern equivalent
git restore --source=HEAD~2 filename
```

To apply the version of a file from a specific commit:

```bash
git show <commit> -- <filename> | git apply -R
```

## 3. If you already committed and pushed

If you’ve pushed changes upstream but want to undo them:

```bash
git checkout origin/<branch> -- <filename>
git commit -m "Reverted changes made to the file"
```

Or, with the modern `git restore`:

```bash
git restore --source=origin/<branch> filename
git commit -m "Reverted changes made to the file"
```

### Quick Comparison: Old vs New Commands

| Scenario                        | Legacy (`git checkout`)            | Modern (`git restore`)                  |
| ------------------------------- | ---------------------------------- | --------------------------------------- |
| Discard uncommitted changes     | `git checkout -- file`             | `git restore file`                      |
| Revert to specific commit       | `git checkout <commit> -- file`    | `git restore --source=<commit> file`    |
| Revert to origin branch version | `git checkout origin/main -- file` | `git restore --source=origin/main file` |

---

### Editor’s Note

When this post was first written, `git checkout` was the go-to command for everything: switching branches, discarding changes, and reverting files. Today, Git recommends using `git restore` (for files) and git switch (for branches), which make commands clearer and reduce accidental mistakes.

That said, you’ll still see git checkout in tutorials, StackOverflow answers, and older workflows, so it’s useful to understand both.

---

### Resources

- [Atlassian Git Tutorials](https://www.atlassian.com/git) — beginner to advanced Git workflows, commands, and code review tips.
