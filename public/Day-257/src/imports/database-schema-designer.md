Design a modern web-based visual database modeling tool UI titled “Database Schema Designer.” The application should allow users to create tables, define columns, and visually connect relationships using an interactive canvas. The interface should feel similar to tools like dbdiagram.io, drawSQL, or ERD editors, with a clean, technical, and developer-friendly design.

Layout Structure
Top Navigation Bar

App logo and title: Database Schema Designer

Current project/schema name (editable)

Buttons:

Save Schema

Export (SQL / PNG / JSON)

Undo / Redo

Search bar for tables or fields

Settings icon and user avatar

Left Sidebar

Vertical panel with tools:

Add Table

Add Relationship

Text / Notes

Templates (User system, E-commerce, Blog, etc.)

List of existing tables (click to focus)

Include a “New Schema” button.

Main Canvas Area

Large interactive workspace with subtle grid background:

Draggable table cards

Each table shows:

Table name (editable)

Columns list

Data types (INT, VARCHAR, DATE, BOOLEAN, etc.)

Primary key indicator

Foreign key indicator

Lines connecting tables to represent relationships

Drag-and-drop positioning

Zoom and pan support

Right Sidebar – Properties Panel

When a table or column is selected:

Edit table name

Add/edit/delete columns

Select data type dropdown

Toggle primary key, foreign key, nullable

Default value field

Relationship settings

Bottom Bar

Zoom controls (+ / –)

Canvas minimap

Schema validation indicator

Components to Include

Table card component

Column row component with data type badge

Relationship connector lines

Floating toolbar component

Properties editor panel

Export modal

Confirmation dialogs

Additional Screens

Main schema editor with multiple tables

Empty state (“Create your first table”)

Export schema modal

Mobile/tablet simplified viewer

Design Style

Light mode primary (optional dark mode)

Clean developer-tool aesthetic

Subtle grid canvas background

Rounded cards with soft shadows

Monospace font for column/data types

Modern SaaS productivity style