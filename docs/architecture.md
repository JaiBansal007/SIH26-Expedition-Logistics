# System Architecture

The following diagram illustrates the high-level architecture of the National Polar Operations Center, showing the interaction between frontend, backend, data processing, and storage components.

![MARG Architecture](../code/docs/architecture.png)

## Overview

1. **Frontend:** React + Vite SPA deployed on Vercel, providing dashboards and tracking UI.
2. **Backend API:** Node.js + Express providing RESTful endpoints.
3. **Data Ingestion:** Apache Kafka handles massive location update ingestion.
4. **Database:** MySQL database managed with Drizzle ORM for performant reads/writes.
5. **Caching:** Redis for rapid state management and session handling.
