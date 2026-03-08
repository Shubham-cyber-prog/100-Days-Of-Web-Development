Design a modern web application UI titled “Online Regex Builder.” The application should allow users to create, test, and visualize regular expressions in real time. Users should be able to input regex patterns, test them against sample text, see matches highlighted, and view explanations. The design should feel similar to developer tools like regex101, VS Code panels, or online code playgrounds, with a clean and developer-focused layout.

Layout Structure
Top Navigation Bar

App logo and title: Online Regex Builder

Buttons:

New Pattern

Save

Export

Regex flavor selector dropdown:

JavaScript

Python

PCRE

Java

Settings icon and user avatar

Left Sidebar

Navigation menu:

Builder

Saved Patterns

Examples Library

Cheatsheet

Settings

Include “Create New Regex” button.

Main Workspace (Split Layout)
Left Panel – Regex Editor

Input field for regex pattern (monospace font)

Toggle options:

Case insensitive

Global match

Multiline

Real-time validation indicator (valid / error)

Syntax highlighting

Right Panel – Test Text Area

Large text area where users paste sample text

Matching text automatically highlighted

Scrollable panel

Match count display

Bottom Panel – Explanation and Matches

Explanation Section

Human-readable breakdown of regex components

Matches Table
Columns:

Match number

Matched text

Start index

End index

Right Sidebar (Optional)

Quick Tools

Common regex snippets

Character class builder

Quantifier builder

Components to Include

Regex input editor component

Highlighted text viewer

Match results table

Toggle switches

Regex cheatsheet panel

Save/export modal

Design Style

Dark mode developer tool aesthetic

Monospace font for regex and text

Syntax highlighting colors

Clean code-editor inspired layout

Minimal distractions, focus on usability

Screens to Design

Regex builder main workspace

Empty state (no regex entered)

Saved patterns library

Cheatsheet/reference panel

Mobile responsive simplified editor