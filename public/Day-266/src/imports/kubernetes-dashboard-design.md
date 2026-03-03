Design a modern web-based infrastructure visualization dashboard UI titled “Kubernetes Architecture Visualizer.” The application should visually represent Kubernetes cluster architecture including nodes, pods, services, deployments, and networking. The interface should feel similar to Kubernetes dashboards, DevOps monitoring tools, or cloud infrastructure panels, with a clean, technical, and professional aesthetic.

Layout Structure
Top Navigation Bar

App logo and title: Kubernetes Architecture Visualizer

Cluster selector dropdown (Local Cluster, Production, Staging)

Refresh button

Search bar (pods, services, namespaces)

Settings icon and user avatar

Left Sidebar

Navigation menu with icons:

Cluster Overview

Nodes

Pods

Deployments

Services

Ingress

Namespaces

Logs

Settings

Include a “Connect Cluster” primary button.

Main Visualization Area
Section 1: Cluster Diagram (Primary View)

Interactive architecture diagram showing:

Control Plane

API Server

Scheduler

Controller Manager

etcd

Worker Nodes

Node cards

Pods inside each node

Containers inside pods

Services

Connecting to multiple pods

Load balancing visualization

Animated lines showing traffic flow

Color-coded resources

Zoom and pan support

Section 2: Resource Status Panel

Cards showing:

Total Nodes

Running Pods

Failed Pods

Active Deployments

CPU usage

Memory usage

Use progress bars and status indicators.

Right Sidebar – Resource Details Panel

When clicking a resource (pod/node/service):

Show:

Resource name

Namespace

Status (Running, Pending, Failed)

CPU & Memory usage

Labels & annotations

Event logs

Bottom Panel
Logs Viewer

Container logs

Error messages

Restart events

Metrics Panel

CPU usage over time

Memory usage over time

Pod scaling graph

Components to Include

Node card component

Pod component

Service connector lines

Resource status badges

Metrics charts

Logs viewer component

Namespace selector

Design Style

Dark mode DevOps aesthetic

Blue and green Kubernetes-inspired colors

Grid-based layout

Monospace font for logs

Modern cloud dashboard style

Screens to Design

Cluster overview architecture diagram

Node detail view

Pod detail with logs and metrics

Empty state (no cluster connected)

Namespace filtered view