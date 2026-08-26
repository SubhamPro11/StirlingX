<p align="center">
  <img src="frontend/editor/src/core/assets/brand/branding-logo/logo-mark.png" width="120" alt="StirlingX logo">
</p>

<h1 align="center">StirlingX — Next-Generation PDF Studio</h1>

<p align="center">
  <b>The modern, privacy-first open-source PDF workspace with custom studio UI and 50+ PDF operations.</b>
</p>

<p align="center">
  <a href="https://github.com/SubhamPro11/StirlingX">
    <img src="https://img.shields.io/badge/StirlingX-Custom_Studio_UI-blue?style=for-the-badge&logo=pdf" alt="StirlingX">
  </a>
  <a href="https://github.com/SubhamPro11/StirlingX/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/License-GPL--3.0-green?style=for-the-badge" alt="License">
  </a>
  <a href="https://hub.docker.com/r/stirlingtools/stirling-pdf">
    <img src="https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker">
  </a>
</p>

---

## ✨ What is StirlingX?

**StirlingX** is a complete modern redesign of Stirling PDF, tailored for seamless document manipulation, enhanced usability, and client-side privacy. It delivers a fast studio interface paired with the Spring Boot PDF processing engine.

### 🎨 UI & UX Highlights

- **🛸 Studio Landing Hub**: Interactive drag-and-drop canvas with dynamic animated glow borders and instant file upload cues.
- **⚡ Popular Workflows Bento Grid**: One-click quick launch for top operations:
  - **Merge & Combine** — Combine and reorder multiple PDFs.
  - **Compress PDF** — Optimize file size with quality control.
  - **Convert Format** — Convert to/from Word, Excel, PowerPoint, Images, Markdown & HTML.
  - **OCR & Searchable** — Extract text from scanned documents.
  - **Sign & Fill** — Electronic signature drawing and form completion.
  - **Protect & Encrypt** — Password encryption and permission restrictions.
- **🕶️ Pitch Black Dark Mode (OLED / True Black)**: Pure `#000000` canvas and elevated dark surfaces (`#0f0f10`) for distraction-free reading.
- **🤹 Auto-Hiding Viewer Navigation Bar**: The bottom floating navigation toolbar auto-retracts while reading and smoothly springs up on hover.
- **💎 Glassmorphic Command Bar (`Ctrl+K`)**: Translucent header ribbon with universal search across tools and document contents.
- **📄 Rounded Document Cards**: Refined file cards with hover elevation and active state indicators.
- **🔒 100% Privacy**: Client-side execution available; no documents sent to third parties.

---

## 🚀 Quick Start with Docker Desktop

Run StirlingX with the custom UI override:

```bash
docker compose up -d
```

Or run via Docker CLI:

```bash
docker run -d \
  -p 8080:8080 \
  -v ./customFiles:/customFiles:rw \
  -v ./configs:/configs:rw \
  -v ./logs:/logs:rw \
  --name stirling-pdf \
  docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest
```

Open your browser at **[http://localhost:8080](http://localhost:8080)**.

---

## 💻 Local Development

### 1. Unified Dev Mode (Backend + Frontend)
```powershell
# Windows PowerShell
powershell -ExecutionPolicy Bypass -File scripts/dev.ps1

# Or using Task (if installed)
task dev
```

### 2. Frontend Only (Vite Dev Server)
```powershell
powershell -ExecutionPolicy Bypass -File scripts/dev-frontend.ps1
```
*Runs at `http://localhost:5173` with hot module replacement (HMR).*

### 3. Backend Only (Spring Boot)
```powershell
powershell -ExecutionPolicy Bypass -File scripts/dev-backend.ps1
```
*Runs at `http://localhost:8080`.*

---

## 🔄 Building & Deploying the Custom UI

To rebuild the frontend bundle and update the static files in `customFiles/static/`:

- **Windows (PowerShell)**:
  ```powershell
  powershell -ExecutionPolicy Bypass -File scripts/deploy-custom-ui.ps1
  ```
- **Linux / macOS (Bash)**:
  ```bash
  bash scripts/deploy-custom-ui.sh
  ```

---

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript + Vite + Mantine UI + TailwindCSS + PDF.js + pdf-lib
- **Backend**: Java 25 / Spring Boot + Apache PDFBox + LibreOffice + OCRmyPDF + Tesseract
- **Icons & Branding**: Custom Glowing SX vector mark + Google Material Symbols
- **Styling**: Vanilla CSS Design Tokens (`--c-*` semantic palette)

---

## 📄 License

StirlingX is open-source software licensed under [GPL-3.0](LICENSE).
