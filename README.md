# SIH 2026 Project Repository

This repository contains the source code and documentation for our Smart India Hackathon 2026 project.

## 1. Project Information

- **Project Title:** National Polar Operations Center (Cargo Tracking)
- **PS ID:** 26062
- **PS Title:** Indian Antarctic Expedition 46 Logistics & Real-Time Tracking
- **Category:** Software
- **Theme:** Smart Governance / Logistics
- **Team Name:** Tree.io
- **Team Members:**
      **MEMBER_1** - 2023UCA1869 - [@Jai](https://github.com/JaiBansal007)
      **MEMBER_2** - 2023UIN3332 - [@Dhruv](https://github.com/Dhruv-Tuteja)
      **MEMBER_3** - 2023UCS1548 - [@Nayan](https://github.com/NASA12345)
      **MEMBER_4** - 2023UCA1804 - [@Tushar](https://github.com/TusharSachdeva29)
      **MEMBER_5** - 2023UCA1728 - [@Yashaswini](https://github.com/Yashaswini-Sharma)
      **MEMBER_6** - 2023UCA1600 - [@Rohan](https://github.com/RohanJ26)

## 2. Problem Statement

Logistics operations for extreme and remote scenarios like the Indian Antarctic Expedition require flawless coordination, real-time tracking, and predictive insights. Traditional tracking systems lack the necessary robust geofencing, real-time anomaly detection, and comprehensive analytics needed to ensure safe and efficient cargo movement across challenging terrains.

## 3. Proposed Solution

The National Polar Operations Center is a unified GPS platform transforming government logistics with real-time tracking, predictive analytics, and seamless data integration, enabling smarter, more transparent operations. It processes over 1M+ location updates daily and triggers automated smart alerts for anomalies.

## 4. Key Features

- **Real-time trip & vehicle analytics** – ETAs, stoppages, speed, and drive time.
- **Fullscreen satellite & geofenced overlays** for dynamic live tracking.
- **Smart Alerts Engine** – Detects Speeding, GPS Loss, Route Deviation with automatic email notifications.
- **Historical path plotting** with speed, address, and timestamp playback.
- **Role-based access control** and page/group-specific permissions.
- **Bulk & Smart Utilities** – Bulk Excel upload/edit/delete and multi-select actions.
- **Comprehensive Reports** – 5 report types with filter-based Excel exports.
- **Dark Mode** support for enhanced accessibility.

## 5. Technology Stack

- **Frontend:** React.js, Vite, Tailwind CSS, shadcn/ui, Axios, Recharts
- **Backend:** Node.js, Express.js
- **Event Streaming:** Apache Kafka (1M+ location updates/day)
- **Database:** MySQL with Drizzle ORM
- **Caching:** Redis
- **Infrastructure:** Docker, Vercel / Nginx

## 6. Architecture

See [ARCHITECTURE](docs/architecture.md).

## 7. Repository Structure

```text
Cargo Tracking/
├── README.md
├── SUBMISSION_GUIDE.md
├── submission/
│   ├── PRESENTATION.md
│   └── DEMO.md
├── code/                   <-- Source Code (Frontend & backend)
├── docs/                   <-- Architecture & Documentation
├── assets/                 <-- Screenshots & Prototype photos
│   └── screenshots/
│       └── README.md
└── files/
```

## 8. Final Presentation

See [PRESENTATION](submission/PRESENTATION.md) for the presentation link.

## 9. Demo Video

See [DEMO VIDEO](submission/DEMO.md) for the video link.

## 10. Screenshots / Prototype Photos

See [SCREENSHOTS](assets/screenshots).

## 11. Installation

### Backend Setup
```bash
cd code/backend
npm install
```
Configure your `.env` file as required by copying the structure from the old documentation.

### Frontend Setup
```bash
cd code/Frontend
npm install
```
Configure your `.env` file with `VITE_BACKEND_URL=your-backend-url-here`.

## 12. Run

### Start the Backend
```bash
cd code/backend
npm run dev
```

### Start the Frontend
```bash
cd code/Frontend
npm run dev
```

## 13. Future Scope

- Integration with predictive ML models for advanced route optimization.
- Enhanced offline tracking capabilities using mesh network sync.
- Further expansion of the notification system via SMS and push notifications.
