Design a modern web-based virtualization management dashboard UI titled “Hypervisor Simulator.” The interface should simulate how a hypervisor manages multiple virtual machines (VMs), allocates CPU, memory, and storage, and monitors VM performance. The design should feel similar to VMware, VirtualBox, or cloud virtualization dashboards, with a clean, technical, and DevOps-focused aesthetic.

Layout Structure
Top Navigation Bar

App logo and title: Hypervisor Simulator

Host system selector (Local Host / Cluster)

Action buttons:

Create VM

Start All

Stop All

Search bar (search VMs)

Notifications icon and settings icon

User avatar

Left Sidebar

Navigation menu with icons:

Dashboard

Virtual Machines

Resource Allocation

Storage

Network

Logs

Settings

Include a “New Virtual Machine” primary button.

Main Dashboard View
Section 1: Host System Overview

Summary cards showing:

Total CPU usage

Total memory usage

Storage usage

Number of active VMs

Use progress bars and percentage indicators.

Section 2: Virtual Machine List

Table or card layout showing:

VM name

OS type (Linux, Windows, etc.)

Status (Running, Stopped, Paused)

CPU allocation

Memory allocation

Storage usage

Uptime

Action buttons (Start, Stop, Pause, Delete)

Include filters and sorting options.

Section 3: Resource Allocation Visualization

Visual diagram showing:

Host machine at top

Multiple VMs below

Resource allocation bars for CPU, RAM, and storage

Color-coded usage indicators

Right Sidebar – VM Details Panel

When a VM is selected:

VM name and OS

Status indicator

CPU, RAM, Storage allocation sliders

Live performance graphs (CPU, memory usage)

Console / Open Terminal button

Start / Stop / Restart buttons

Bottom Panel
Logs and Events

VM started/stopped events

Resource allocation changes

Error or warning messages

Performance Graphs

CPU usage over time

Memory usage over time

Components to Include

VM card/table row component

Resource usage progress bars

Performance graph widgets

Status badges (running, stopped, paused)

VM creation modal form

Sidebar navigation component

Design Style

Dark mode primary (infrastructure/devops aesthetic)

Blue, green, and purple accent colors

Clean grid-based layout

Monospace font for logs and technical info

Modern cloud / virtualization dashboard look

Screens to Design

Hypervisor dashboard overview

Virtual machines list

VM details and performance view

Create VM modal

Empty state (no VMs)