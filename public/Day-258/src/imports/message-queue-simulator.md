Design a modern web-based dashboard UI titled “Message Queue Simulator.” The application should visually demonstrate how message queues work between producers and consumers, similar to systems like RabbitMQ, Kafka, or AWS SQS. The interface should clearly show message flow, queue states, and processing in real time, with a clean DevOps and system-design inspired aesthetic.

Layout Structure
Top Navigation Bar

App logo and title: Message Queue Simulator

Simulation controls:

Start

Pause

Reset

Speed control slider (slow → fast)

Settings icon and user avatar

Left Sidebar

Navigation menu with icons:

Simulator Dashboard

Queues

Producers

Consumers

Message Logs

Analytics

Settings

Include “Create Queue” and “Add Producer/Consumer” buttons.

Main Simulation Area
Section 1: Visual Flow Diagram

Interactive diagram showing:

Producers on the left (apps sending messages)

Queue in the center (message buffer)

Consumers on the right (workers processing messages)

Include:

Animated message blocks moving from producers → queue → consumers

Queue container showing message count

Labels for each component

Status indicators (active, idle, overloaded)

Section 2: Queue Status Panel

Cards or table showing:

Queue name

Messages in queue

Messages processed

Processing rate

Queue status

Use progress bars and counters.

Right Sidebar – Message Details

When a message is selected:

Message ID

Timestamp

Producer source

Consumer destination

Status (queued, processing, completed)

Message content preview

Bottom Panel

Logs Panel

Timeline showing message events

Log entries like:

Message produced

Message queued

Message consumed

Analytics Panel

Messages per second graph

Queue size over time graph

Producer vs consumer throughput chart

Components to Include

Producer node component

Queue container component

Consumer node component

Animated message block component

Logs table component

Analytics charts

Simulation control buttons

Design Style

Dark mode DevOps/system dashboard aesthetic

Bright accent colors for messages and status indicators

Grid-based layout

Monospace font for logs and IDs

Clean infrastructure visualization style

Screens to Design

Active simulation dashboard

Empty state (no queues configured)

Queue detail view

Logs and analytics view

Add queue / producer / consumer modal