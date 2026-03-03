Design a modern web-based developer tool UI titled “JWT Token Decoder.” The application should allow users to paste a JWT token and instantly decode its header, payload, and signature. The interface should feel similar to developer utilities like JSON viewers or API debugging tools, with a clean, minimal, and developer-focused aesthetic.

Layout Structure
Top Navigation Bar

App logo and title: JWT Token Decoder

Buttons:

Clear

Copy Decoded

Verify Token

Theme toggle (Light / Dark)

Settings icon

Main Workspace (Three-Column Layout)
Left Panel – Encoded JWT Input

Large text area for pasting JWT token

Placeholder example token

Real-time validation indicator:

Valid token (green)

Invalid token (red)

Auto-detect token structure

Middle Panel – Decoded Header & Payload

Split into two sections:

Header (JSON View)

Decoded JSON with syntax highlighting

Collapsible sections

Copy button

Payload (JSON View)

Pretty-printed JSON

Highlight standard claims:

iss

sub

aud

exp

iat

Expiration countdown indicator

Right Panel – Signature & Verification

Signature section (base64 view)

Verification status:

Valid

Invalid

Expired

Secret key input field (for HMAC verification)

Public key input field (for RSA verification)

Algorithm display (HS256, RS256, etc.)

Bottom Panel
Token Metadata

Token creation time

Expiration time

Time remaining

Token size

Algorithm type

Components to Include

Token input editor

JSON viewer component

Status badge component

Expiration countdown timer

Copy-to-clipboard buttons

Verification form

Error alert component

Design Style

Dark mode developer tool aesthetic (optional light mode)

Monospace font for tokens and JSON

Syntax highlighting for JSON

Clean and minimal layout

Subtle borders and spacing

Screens to Design

Main decoder workspace

Invalid token error state

Expired token state

Verified token state

Empty state (no token entered)