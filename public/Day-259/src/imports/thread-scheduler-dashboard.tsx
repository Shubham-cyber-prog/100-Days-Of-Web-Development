Design a modern web-based operating system simulation dashboard UI titled “Thread Scheduling Simulator.” The application should visually demonstrate how CPU scheduling algorithms manage threads/processes. The interface should clearly show the ready queue, CPU execution, timelines (Gantt chart), and thread states in real time. The design should feel similar to system monitoring tools and OS visualizers, with a clean, technical, and educational aesthetic.

Layout Structure
Top Navigation Bar

App logo and title: Thread Scheduling Simulator

Algorithm selector dropdown:

FCFS (First Come First Serve)

SJF (Shortest Job First)

Round Robin

Priority Scheduling

Simulation controls:

Start

Pause

Step

Reset

Speed control slider

Settings icon

Left Sidebar

Navigation menu with icons:

Simulator

Threads / Processes

Scheduling Algorithms

Logs

Analytics

Include “Add Thread” button.

Main Simulation Area
Section 1: CPU and Queue Visualization

Visual diagram showing:

Ready Queue (list of waiting threads)

CPU block in center showing currently running thread

Completed queue showing finished threads

Animated movement of threads between states

Each thread card should show:

Thread ID

Burst time

Remaining time

Priority

Status indicator (Ready, Running, Waiting, Completed)

Section 2: Gantt Chart Timeline

Horizontal timeline showing:

Execution order of threads

Color-coded thread blocks

Time markers

This is one of the most important visual components.

Right Sidebar – Thread Details Panel

When a thread is selected:

Thread ID

Arrival time

Burst time

Remaining time

Priority

Waiting time

Turnaround time

Status

Bottom Panel

Logs Panel

Events like:

Thread added

Thread started execution

Thread preempted

Thread completed

Analytics Panel

Average waiting time

Average turnaround time

CPU utilization graph

Components to Include

Thread card component

Ready queue container

CPU execution block

Gantt chart component

Simulation control buttons

Logs table component

Analytics widgets

Design Style

Dark mode technical dashboard

Bright distinct colors for different threads

Grid layout

Monospace font for timing/log data

Clean OS/system simulation aesthetic

Screens to Design

Active simulation dashboard

Empty state (no threads added)

Add thread modal form

Algorithm selection view

Analytics and logs view