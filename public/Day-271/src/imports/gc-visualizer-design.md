Design a modern web-based system visualization dashboard UI titled “Garbage Collection Visualizer.” The application should visually demonstrate how memory is allocated and cleaned up by garbage collection algorithms. It should show objects in memory, references between objects, and how garbage collectors remove unused objects over time. The interface should feel educational and technical, similar to system simulation or algorithm visualization tools.

Layout Structure
Top Navigation Bar

App logo and title: Garbage Collection Visualizer

Algorithm selector dropdown:

Mark and Sweep

Reference Counting

Generational GC

Copying GC

Simulation controls:

Start

Pause

Step

Reset

Speed control slider

Settings icon

Left Sidebar

Navigation menu:

Memory Overview

Objects

References

GC Logs

Analytics

Settings

Include “Add Object” button.

Main Visualization Area
Section 1: Heap Memory Visualization (Primary View)

Interactive heap diagram showing:

Objects represented as nodes

References represented as arrows

Root references from:

Stack

Global variables

Color states:

🟢 Active (reachable)

🟡 Candidate for cleanup

🔴 Garbage (unreachable)

🔵 Newly allocated

Animations should show:

Mark phase

Sweep phase

Memory cleanup

Section 2: Memory Statistics Panel

Cards showing:

Total objects in heap

Active objects

Garbage objects

Memory usage percentage

Include progress bars.

Right Sidebar – Object Details Panel

When clicking an object:

Show:

Object ID

Memory size

Reference count

Status (Reachable / Garbage)

Incoming and outgoing references

Bottom Panel
GC Logs

Event logs such as:

Object allocated

Reference created

GC started

Object collected

Memory reclaimed

Performance Metrics

Charts showing:

Memory usage over time

GC cycles timeline

Allocation rate

Components to Include

Object node component

Reference arrow component

Heap container component

Status badge component

Memory usage charts

GC log viewer

Simulation control buttons

Design Style

Dark mode system visualization aesthetic

Bright color coding for object states

Grid-based layout

Monospace font for logs

Smooth animation for GC phases

Screens to Design

Heap visualization dashboard

GC cycle animation view

Object detail inspection view

Empty state (no objects created)

Analytics and logs dashboard