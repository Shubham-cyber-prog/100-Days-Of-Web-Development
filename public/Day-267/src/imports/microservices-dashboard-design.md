Design a modern web-based system design simulation dashboard UI titled “Microservices Architecture Simulator.” The application should visually demonstrate how multiple microservices interact within a distributed system. It should show service communication, API gateways, databases, message queues, and failure scenarios in real time. The design should feel similar to cloud architecture diagrams and DevOps monitoring dashboards, with a clean and professional system-design aesthetic.

Layout Structure
Top Navigation Bar

App logo and title: Microservices Architecture Simulator

Environment selector (Local / Staging / Production)

Simulation controls:

Start

Pause

Inject Failure

Reset

Speed control slider

Settings icon and user avatar

Left Sidebar

Navigation menu with icons:

Architecture Overview

Services

API Gateway

Databases

Message Broker

Logs

Analytics

Settings

Include a “Add Service” primary button.

Main Simulation Area
Section 1: Architecture Diagram (Primary View)

Interactive system diagram showing:

Client / Frontend

API Gateway

Multiple Microservices (User Service, Order Service, Payment Service, etc.)

Databases connected to each service

Message Queue / Event Bus

External APIs (optional)

Features:

Animated request flows between services

Color-coded service status (healthy, degraded, down)

Zoom and pan support

Clickable components

Section 2: Service Status Panel

Cards showing:

Service name

Status (Healthy / Down / Overloaded)

CPU usage

Memory usage

Request count

Error rate

Right Sidebar – Service Details Panel

When a service is selected:

Service name

Endpoint URL

Dependencies

Response time

Instance count

Logs preview

Restart / Scale buttons

Bottom Panel
Logs Viewer

Request logs

Error messages

Service communication logs

Metrics & Analytics

Requests per second graph

Latency graph

Error rate chart

Service dependency map

Components to Include

Service node component

API gateway component

Database component

Message queue component

Traffic animation arrows

Status badges

Metrics charts

Logs viewer

Design Style

Dark mode cloud/system dashboard aesthetic

Blue, purple, and green accent colors

Clean grid layout

Monospace font for logs

Modern SaaS DevOps style

Screens to Design

Full architecture overview

Service detail view

Failure injection scenario

Empty state (no services configured)

Analytics dashboard