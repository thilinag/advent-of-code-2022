https://adventofcode.com/2022

# How to run

- `node day[n].mjs`. eg: `node day1.mjs`
- using latest node features, requires node >= 18

# Why .mjs

Node.js treats files with an .mjs extension as ES modules. https://nodejs.org/docs/latest/api/packages.html#determining-module-system

# Starting today's challenge

`` cp template.mjs day`date +"%-d"`.mjs && touch day`date +"%-d"`.txt ``

This creates day[current date].mjs file from template and a blank day[current date].txt
