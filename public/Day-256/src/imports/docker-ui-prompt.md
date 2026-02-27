Here is a **Figma Make prompt** for your project **“Browser-Based Docker UI”** 🐳💻

---

## Prompt: Browser-Based Docker UI

Design a modern **web application dashboard UI** titled **“Browser-Based Docker UI.”** The interface should allow users to manage Docker containers, images, volumes, and logs directly from the browser. The design should feel similar to tools like Portainer, Kubernetes dashboards, or cloud infrastructure panels, with a clean, technical, and developer-focused experience.

---

## Layout Structure

### Top Navigation Bar

* App logo and title: **Docker UI**
* Environment selector (Local, Remote, Cluster)
* Global search bar (containers, images, volumes)
* Notification icon
* Settings icon and user avatar

---

### Left Sidebar

Vertical navigation menu with icons:

* Dashboard
* Containers
* Images
* Volumes
* Networks
* Logs
* Terminal
* Settings

Include a **“Create Container”** primary button.

---

### Main Dashboard View

#### Section 1: Summary Cards

Show key Docker stats:

* Total containers
* Running containers
* Stopped containers
* Total images
* CPU usage
* Memory usage

Use clean cards with icons and progress indicators.

---

#### Section 2: Containers List

Table showing:

* Container name
* Container ID (short)
* Image used
* Status (running, stopped, paused)
* CPU usage
* Memory usage
* Ports
* Action buttons (Start, Stop, Restart, Delete)

Include filtering and sorting options.

---

### Right Sidebar – Container Details

When a container is selected:

* Container name and ID
* Status indicator
* Resource usage graphs (CPU, memory)
* Logs preview panel
* Start / Stop / Restart buttons
* Open terminal button

---

### Additional Views

**Images Page**

* List of Docker images
* Image size, tag, created date
* Delete and run options

**Logs View**

* Terminal-style log viewer
* Monospace font
* Live streaming logs

**Terminal View**

* Browser-based terminal connected to container
* Dark background, command prompt style

---

## Components to Include

* Container card/table row component
* Status indicator badge (running/stopped)
* Resource usage graph widgets
* Terminal/log viewer component
* Sidebar navigation component
* Modal for creating new container

---

## Design Style

* Dark mode primary (developer-focused)
* Docker-inspired blue accent colors
* Clean DevOps dashboard layout
* Monospace font for logs and terminal
* Modern SaaS infrastructure aesthetic

---

## Screens to Design

1. Dashboard overview
2. Containers list view
3. Container detail with logs and stats
4. Terminal view
5. Create container modal
6. Empty state (no containers)

---

If you want, I can also give you a **GitHub PR message** and a **real implementation stack (React + Docker API + WebSockets)** so you can actually build and run containers from the browser.
