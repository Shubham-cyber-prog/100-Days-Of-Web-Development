Design a modern web application UI titled “Web Scraping Dashboard.” The application should allow users to create, manage, and monitor web scraping jobs. It should display scraping status, extracted data previews, logs, and analytics. The interface should feel similar to data engineering or DevOps dashboards with a clean, professional, and data-focused aesthetic.

Layout Structure
Top Navigation Bar

App logo and title: Web Scraping Dashboard

Global search bar (search jobs, URLs)

Buttons:

New Scraping Job

Export Data

Notifications icon

User avatar and settings

Left Sidebar

Navigation menu with icons:

Dashboard

Scraping Jobs

Data Explorer

Logs

Schedules

API Access

Settings

Include a “Create Job” primary button.

Main Dashboard View
Section 1: Summary Cards

Display key statistics:

Total scraping jobs

Active jobs

Failed jobs

Total records scraped

Success rate

Use clean cards with icons and progress indicators.

Section 2: Scraping Jobs Table

Table showing:

Job name

Target URL

Status (Running, Completed, Failed)

Records scraped

Last run time

Schedule type

Action buttons (Start, Stop, Edit, Delete)

Include filters (status, date, domain).

Section 3: Data Preview Panel

When a job is selected:

Table preview of scraped data

Pagination controls

Export options (CSV, JSON)

Right Sidebar – Job Details

Target URL

CSS/XPath selectors

Schedule configuration

Proxy settings

Retry attempts

Logs preview

Bottom Panel
Logs Viewer

Scrollable log output

Status messages (Started, Parsing, Error, Completed)

Monospace font

Analytics Section

Records scraped over time (line chart)

Success vs failure chart

Domain distribution chart

Components to Include

Job card/table component

Status badge component

Data preview table

Logs viewer component

Analytics chart widgets

Job creation modal

Sidebar navigation component

Design Style

Light mode primary (optional dark mode)

Data engineering / analytics dashboard aesthetic

Clean grid layout

Subtle shadows and rounded cards

Monospace font for logs and selectors

Screens to Design

Dashboard overview

Scraping jobs list view

Job detail view with logs and data preview

Create/edit job modal

Empty state (no jobs created)