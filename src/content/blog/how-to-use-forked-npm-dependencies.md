---
title: 'How to Use Forked NPM Dependencies'
description: 'When an NPM package is missing a feature or has a blocking bug, point your project at a maintained fork via a Git URL—plus modern alternatives like patch-package and overrides.'
pubDate: '2020-12-08T12:50:00+05:30'
updatedDate: '2025-08-17T00:00:00+05:30'
author: 'Syed Aslam'
heroImage: '../../assets/forked-npm.png'
layout: '@/layouts/BlogPost.astro'
tags: ['node', 'npm', 'javascript', 'web-development']

canonical: 'https://syedaslam.com/blog/how-to-use-forked-npm-dependencies/'
---

> Editor’s Note (Updated 2025):
> The Git-URL approach for dependencies still works great. Today you also have alternatives—patch-package,
> overrides/resolutions, or publishing to a private scope—depending on whether you need a quick fix, to pin a
> transitive dependency, or to maintain a long-lived fork.

When you rely on open-source packages, you’ll eventually hit a missing feature or bug. If a PR won’t be merged soon—or the project is inactive—you can _temporarily use your fork_ by pointing `package.json` to a Git URL.

### Pointing a dependency at your fork

In `package.json`, dependencies can be versions, tarballs, or Git URLs. Examples like `git+ssh`, `git+https`, and `git://…#commit-ish` are valid, so you can target a specific branch, tag, or commit for reproducibility.

**From:**

```json
{
  "dependencies": {
    "custom-dep": "1.0.6"
  }
}
```

**To (fork on GitHub, pinned to a commit SHA):**

```json
{
  "dependencies": {
    "custom-dep": "git+https://github.com/aslam/custom-dep.git#<commit-sha>"
  }
}
```

This swaps the registry version with your forked source. If the library builds on install (e.g., via `prepare`), you usually don’t need extra steps.

---

### Version ranges & other specifiers (quick refresher)

You can still use ranges like `^1.2.3`, `~1.2.3`, `>=1.0.0 <2`, or even `user/repo` and tarball URLs, but for forks the **Git URL + commit** is the most predictable.

---

## Modern alternatives (2025)

- **patch-package**: Keep upstream package, apply a small local patch that’s committed to your repo. Great for tiny fixes while you wait on a PR.
- **overrides / resolutions**: Force specific versions of transitive deps (npm "overrides", Yarn/PNPM "resolutions"). Not for swapping a package to your fork, but perfect when only a sub-dependency is problematic.
- **Publish your fork**: For a long-lived divergence, publish under your org scope (e.g., `@yourorg/custom-dep`), keep a changelog, and treat it like a proper package.
- **GitHub Packages or a private registry**: Good for internal forks and restricted distribution.

### Quick Comparison

| Need                                  | Best Option                  | Why                              | Trade-offs                           |
| ------------------------------------- | ---------------------------- | -------------------------------- | ------------------------------------ |
| Ship your custom fix now              | **Git URL to your fork**     | Fast, no registry steps          | Must pin commit; CI needs Git access |
| Tiny hotfix while staying on upstream | **patch-package**            | Minimal diff, easy to drop later | Patches can drift on updates         |
| Pin or replace a transitive dep       | **overrides / resolutions**  | Great for deep dependency trees  | Doesn’t swap the top-level package   |
| Long-term maintained fork             | **Publish under your scope** | Clear ownership, versioning      | Release pipeline & maintenance       |

---

### Wrap-up

Using a **Git URL** is the quickest way to run with your fix without blocking on upstream. For small, temporary changes consider **patch-package**; for transitive issues try **overrides/resolutions**; for enduring forks, publish under your own scope.
