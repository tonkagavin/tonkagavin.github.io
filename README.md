# Gavin McKay Portfolio Website

Interactive terminal-themed personal portfolio built with React, TypeScript, Vite, and Tailwind CSS.

## Overview

This site presents my education, projects, work experience, resume downloads, and contact info inside a shell-style interface.  
It includes command input, theme switching, animated background effects, and easter egg commands.

## Core Features

- Terminal-style UI with tab navigation and CLI command input
- Multi-theme support (`hackerman`, `catppuccin`, `gruvbox`, `tokyo-night`, `nord`)
- Command history + autosuggest-style inline completion
- Matrix / Dino easter egg views
- Animated background with sprite and special action sequences
- Contact form integration via EmailJS

## CLI Commands

Use the terminal input in the UI:

- `help` - list commands
- `ls`, `pwd`, `cd <dir>`, `open <file>`, `cat <file>`
- `theme <name>`, `themes`
- `matrix`, `dino`
- `doit` - run full animation showcase sequence
- `special` - trigger special clash sequence
- `clear`, `exit`

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- EmailJS (`@emailjs/browser`)

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy

This repo is configured for static hosting and GitHub Pages style deployment.