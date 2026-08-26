# Stirling PDF UI Redesign — Modern Studio Architecture

## 1. Executive Summary & Design Vision

This document details the architectural and visual redesign of Stirling PDF into **"Stirling Studio"** — a high-performance, design-forward PDF workstation.

The redesign maintains 100% backward compatibility with all Spring Boot REST API endpoints, PDF manipulation hooks (`useToolOperation`), i18n translation namespaces, and multi-tool workflow state (`FileContext`, `ToolWorkflowContext`), while replacing dated UI conventions with a modern desktop-grade creative studio interface.

---

## 2. Core Design Pillars

### 2.1 Visual Language & Aesthetic
- **Studio Elevation System**: Replaces flat borders with subtle layered surfaces (`--c-bg` canvas, `--c-surface` panels, `--c-surface-raised` floating toolbars) with soft ambient drop shadows and subtle inner borders.
- **Glassmorphism & Depth**: Floating command bar, tool headers, and search palette featuring subtle translucent backdrop blurs (`backdrop-filter: blur(12px)`) with graceful light/dark adaptation.
- **Micro-Interactions & Transitions**: Smooth view transitions (`view-transition` API + CSS spring animations) when switching between Viewer, File Editor, Page Editor, and Tool configurations.
- **Vibrant Categorical Identity**: Refined color accents per tool subcategory (AI purple, Security emerald, Signing indigo, Formatting amber, Extraction cyan, Removal rose).

### 2.2 Re-architected Navigation & Layout
- **Global Studio Command Bar (`WorkbenchBar`)**:
  - Left: Interactive workspace mode pill (Viewer / Grid / Multi-Tool / Files) with active document counter and status indicators.
  - Center: Universal SuperSearch (`Ctrl+K` / `⌘K`) with category filtering and instant tool launch.
  - Right: Quick Export Studio button with format presets, Print, Notification Bell, and Settings trigger.
- **Dynamic Studio Landing Hub (`LandingPage`)**:
  - Hero interactive dropzone with animated border beam on drag-over.
  - **Quick Workflow Bento**: One-click jump to the top 6 power workflows (Merge, Compress, OCR, Convert, Sign, Protect).
  - Feature badges: Zero cloud leaks / 100% Private, 50+ Tools, Unlimited file sizes.
- **Modernized Tool Palette & Inspector (`RightSidebar`, `ToolPicker`, `ToolPanel`)**:
  - Refined category pill carousel with instant search filtering.
  - Elegant tool cards with rich icons, descriptions, and favorite star toggles.
  - Sleek parameter controls with segmented selectors, slider inputs, and real-time validation badges.
- **File Library Rail (`FileSidebar`)**:
  - Compact collapsible rail with quick file thumbnails, batch selection counter, drag-and-drop reordering, and cloud storage integrations.

---

## 3. Tool & Feature Inventory & Parity Guarantee

Every existing tool is preserved without regression:
- **Organize & Pages**: Merge, Split, Rotate, Reorganize, Remove Pages, Crop, Extract Pages, Multi-Tool (Page Editor).
- **Convert & OCR**: Convert to/from PDF (Office, Images, HTML, Markdown), OCR (Tesseract), Extract Images.
- **Security & Privacy**: Protect (Password), Remove Password, Change Permissions, Sanitize, Redact, Flatten.
- **Sign & Certify**: Draw Sign, Digital Certificate Sign, Validate Signature, Remove Certificate.
- **Enhance & Format**: Compress, Watermark, Stamp, Page Numbers, Booklet Imposition, Adjust Contrast, Replace Color, Metadata Editor.
- **Developer & Automate**: Show JS, Extract Info, Automate (Pipeline builder).

---

## 4. Deployment & Override Mechanism

Per Stirling PDF's static file override system:
1. Build modified frontend via `npm --prefix frontend run build` (or `task frontend:build`) -> outputs to `frontend/editor/dist/`.
2. Content is copied to `customFiles/static/` maintaining relative paths.
3. Automated deploy script: `scripts/deploy-custom-ui.ps1` / `scripts/deploy-custom-ui.sh`.
