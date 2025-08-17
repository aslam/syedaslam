---
title: 'Creating Python Virtual Environments'
description: 'Learn how to create and use Python virtual environments with venv to isolate dependencies and manage multiple projects cleanly.'
pubDate: '2021-01-28T12:13:49+05:30'
updatedDate: '2025-08-17T00:00:00+05:30'
author: 'Syed Aslam'
heroImage: 'https://res.cloudinary.com/syed-aslam/image/upload/w_1000/q_auto/f_auto/v1611817564/hitesh-choudhary-D9Zow2REm8U-unsplash_g5ymcr.jpg'
layout: '@/layouts/BlogPost.astro'
tags: ['python', 'virtualenv', 'venv', 'best-practices']
canonical: 'https://syedaslam.com/blog/creating-python-virtual-environments/'
---

> **Editor’s Note (Updated 2025):**
> This post was originally written in 2021. The method described here using `venv` is still **the standard way** to create virtual environments in Python today.
> Alternatives such as **Poetry**, **Pipenv**, and **Conda** may also be used depending on your workflow, but `venv` remains the simplest, built-in option.

---

Python applications often rely on packages and modules that don’t come with the standard library. Different applications may also need different versions of the same library. This can quickly cause conflicts:

- App A requires version **1.0** of a library
- App B requires version **2.0** of the same library

Installing both globally is impossible — one will break.

The solution is to create a **virtual environment**, a self-contained directory tree that has its own Python installation and packages, isolated from your system Python.

---

## Creating a Virtual Environment

Choose a directory where you want to keep your environments:

```bash
$ mkdir Playground
$ cd Playground
```

Create a new environment named `learning_env`:

```bash
$ python3 -m venv learning_env
```

This creates a new directory with:

- `pyvenv.cfg` — points to the Python installation used
- `lib/` — contains the Python version and site-packages for installed libraries
- `include/` — for compiling packages
- `bin/` (Unix/macOS) or `Scripts/` (Windows) — contains the Python binary and activation scripts

Together, these isolate your project’s dependencies from the global system.

### Activating the Environment

Activate the environment with:

```bash
$ source learning_env/bin/activate
```

Your shell prompt will now include the environment name:

```bash
(learning_env) $
```

Inside the environment, you can just use `python` or `pip` and pip (no need for `python3` or `pip3`).

### Using the Environment

Check the Python version:

```bash
(learning_env) $ python --version
Python 3.9.1
```

Install packages as usual:

```bash
(learning_env) $ pip install requests
```

Everything is installed inside `learning_env`, isolated from your global Python.

### Deactivating

When you’re done, type:

```bash
(learning_env) $ deactivate
$ python --version
Python 2.7.16   # back to system default
```

---

### Modern Alternatives (2025)

While `venv` remains reliable, developers today also use:

- **Poetry** → dependency management + virtualenv + packaging in one
- **Pipenv** → manages `Pipfile` and `/Pipfile.lock` automatically
- **Conda** → great for data science, handles Python + non-Python packages

For most apps, though, the **built-in** `venv` is the simplest and most portable choice.

---

### Wrap-up

Virtual environments solve the problem of conflicting dependencies by isolating projects. Whether you use `venv`, Poetry, or Conda, it’s a best practice to never develop Python projects in your system Python installation.

### Quick Comparison

| Tool       | Built-in? | Best For                               | Pros                                                | Cons                                     |
| ---------- | --------- | -------------------------------------- | --------------------------------------------------- | ---------------------------------------- |
| **venv**   | ✅ Yes    | General projects, simple setups        | Lightweight, no extra installs, universal           | No dependency resolution, just isolation |
| **Poetry** | ❌ No     | Modern app development, packaging      | Lockfile, publishing support, dependency management | Extra tool to install, opinionated       |
| **Pipenv** | ❌ No     | Legacy projects, Pipfile workflow      | Integrates pip + virtualenv, human-friendly config  | Popularity declined, slower than Poetry  |
| **Conda**  | ❌ No     | Data science, ML, scientific computing | Handles Python + native libs (e.g., BLAS)           | Heavyweight, separate ecosystem          |
