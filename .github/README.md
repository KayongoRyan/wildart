# GitHub configuration

This folder contains configuration and automation for the wildart repository.

## Contents

| File / Folder | Purpose |
|---------------|---------|
| `workflows/activity-tracker.yml` | Runs on every **push** and **pull_request**. Logs event details and runs lint + build. |
| `CHANGELOG.md` | Human-maintained record of notable changes. Update when you commit. |
| `README.md` | This file. |

## Where to track GitHub activity

| What you want to see | Where to look |
|----------------------|---------------|
| **Push / pull history** | [Actions](https://github.com/KayongoRyan/wildart/actions) tab — each run shows event, actor, branch, recent commits |
| **Commit history** | [Commits](https://github.com/KayongoRyan/wildart/commits/master) tab or `git log` |
| **What changed in a commit** | Click a commit on GitHub, or run `git show <sha>` |
| **Branches & merges** | [Branches](https://github.com/KayongoRyan/wildart/branches) and [Network](https://github.com/KayongoRyan/wildart/network) |
| **Release notes** | `CHANGELOG.md` in this folder |

## Local commands

```bash
# Recent commits
git log --oneline -10

# What was pushed/pulled (reflog)
git reflog

# Changes in last commit
git show HEAD
```
