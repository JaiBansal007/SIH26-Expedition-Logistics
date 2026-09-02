# Cargo Tracking Backend

A logistics tracking backend built with Express.js, TypeScript, MySQL (via Drizzle ORM), and Kafka for real-time GPS data processing.

---

## 🛠 Tech Stack

- **Runtime:** Node.js + TypeScript
- **Framework:** Express.js 5
- **Database:** MySQL (via Drizzle ORM)
- **Message Queue:** Apache Kafka (for GPS event streaming)
- **Authentication:** JWT + bcrypt
- **Email Notifications:** Nodemailer
- **Container Orchestration:** Docker Compose (Kafka + Zookeeper)

---

## 📋 Prerequisites

Before running the backend, ensure you have:

- **Node.js** (v18 or higher)
- **Docker & Docker Compose** (for Kafka/Zookeeper)
- **MySQL** database (local or remote)
- **npm** or **yarn**

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the `code/Backend/` directory by copying the example:

```bash
cp .env.example .env
```

Then configure the following variables:

```env
# Server Configuration
PORT=3000

# Database Configuration (Option 1: Connection String)
DATABASE_URL=mysql://user:password@host:port/database

# Database Configuration (Option 2: Individual Fields)
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=cargo_tracking

# Authentication
JWT_SECRET=your-super-secret-jwt-key-here

# API Configuration
API_URL=http://localhost:3000

# Kafka Configuration
KAFKA_BROKERS=localhost:9092
KAFKA_TOPIC=api-data-topic

# LocationIQ Reverse Geocoding API
REVERSE_PROXY_URL=https://us1.locationiq.com/v1/reverse.php

# OLA Maps API (Optional)
OLA_API_KEY=your-ola-api-key

# Email Notifications
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@cargotracking.com

# Alert Processing
ENABLE_ALERT_PROCESSING=true
ALERT_PROCESSING_INTERVAL=1200000
ALERT_BATCH_SIZE=100
```

**Important Notes:**
- Use either `DATABASE_URL` **OR** the individual `DB_*` fields (not both).
- For Gmail SMTP, generate an [App Password](https://support.google.com/accounts/answer/185833) instead of using your regular password.

### 3. Start Kafka & Zookeeper (Docker)

The backend uses Kafka for real-time GPS data streaming. Start the required services:

```bash
docker-compose up -d
```

This will start:
- **Zookeeper** on port `2181`
- **Kafka** on port `9092`

Verify containers are running:

```bash
docker ps
```

### 4. Database Setup

#### Generate Database Schema

```bash
npm run db:generate
```

#### Run Migrations

```bash
npm run db:migrate
```

#### (Optional) Push Schema Directly

For development, you can push schema changes directly:

```bash
npm run db:push
```

#### Run All Database Setup

To generate schema, run migrations, and custom index migrations in one command:

```bash
npm run all
```

### 5. Start the Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3000` (or the port specified in `.env`).

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with auto-reload (launches Docker services, then starts `ts-node-dev`) |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm run db:generate` | Generate Drizzle migrations from schema changes |
| `npm run db:migrate` | Apply pending migrations to the database |
| `npm run db:push` | Push schema directly to database (dev only) |
| `npm run studio` | Launch Drizzle Studio (database GUI) |
| `npm run migrate:indexes` | Run custom index migrations |
| `npm run all` | Run all DB setup steps (generate + migrate + indexes) |
| `npm test` | Run test suite (Jest) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:gps` | Test GPS fetcher controller |

---

## 📂 Project Structure

```
code/Backend/
├── src/
│   ├── main.ts                 # Application entry point
│   ├── controller/             # Business logic and route handlers
│   ├── routes/                 # Express route definitions
│   ├── db/
│   │   ├── connection.ts       # MySQL connection pool
│   │   ├── schema.ts           # Drizzle ORM schema definitions
│   │   └── migrate.ts          # Migration runner
│   ├── middleware/             # Auth and other middleware
│   ├── kafka/
│   │   ├── consumers/          # Kafka consumers (GPS data ingestion)
│   │   └── producers/          # Kafka producers (event publishing)
│   ├── services/               # External service integrations
│   ├── utilities/              # Helper functions
│   ├── scripts/                # Migration and utility scripts
│   ├── types/                  # TypeScript type definitions
│   ├── Alerts_types/           # Alert type definitions
│   └── migrations/             # Generated Drizzle migrations
├── docker-compose.yml          # Kafka + Zookeeper setup
├── .env.example                # Environment variable template
├── package.json
└── README.md
```

---

## 🔐 Authentication

The backend uses **JWT (JSON Web Tokens)** for authentication.

### Authentication Flow
1. User registers or logs in via `/user/login` or `/user/register`
2. Server returns a JWT token
3. Client includes the token in the `Authorization` header or cookies for protected routes
4. Middleware validates the token and attaches user info to the request

---

## 🌐 API Routes

The backend exposes the following route groups (see `src/routes/` for details):

| Route Group | Base Path | Description |
|-------------|-----------|-------------|
| **User** | `/user/*` | User authentication & management |
| **Trip** | `/trip/*` | Trip/shipment tracking |
| **Live** | `/live/*` | Real-time GPS tracking |
| **Vendor** | `/vendor/*` | Vendor management |
| **Customer** | `/customer/*` | Customer management |
| **Entity** | `/entity/*` | Entity (vehicle/asset) management |
| **Role** | `/role/*` | Role-based access control |
| **Group** | `/group/*` | User group management |
| **Feature** | `/feature/*` | Feature flags |
| **GeoFence** | `/geofence/*` | Geofencing rules |
| **Alarm** | `/alarm/*` | Alarm management |
| **Alert** | `/alert/*` | Alert notifications |
| **Trail** | `/trail/*` | Historical location trails |
| **Report** | `/report/*` | Analytics and reporting |
| **Testing** | `/testing/*` | Development/testing endpoints |

---

## 🗄️ Database

### ORM: Drizzle

This project uses [Drizzle ORM](https://orm.drizzle.team/) for type-safe database interactions.

### Schema Location

Database schema is defined in `src/db/schema.ts`.

### Making Schema Changes

1. Edit `src/db/schema.ts`
2. Generate migrations: `npm run db:generate`
3. Review generated SQL in `src/migrations/`
4. Apply migrations: `npm run db:migrate`

### Database GUI

Launch Drizzle Studio to explore your database:

```bash
npm run studio
```

Opens at `http://localhost:4983` (or the port specified by Drizzle).

---

## 📨 Kafka Integration

The backend uses Kafka for real-time GPS data processing.

### GPS Data Flow

1. **GPS Producer** (`src/kafka/producers/GPSproducer.ts`) publishes GPS events to Kafka topic `api-data-topic`
2. **GPS Consumer** (`src/kafka/consumers/GPSconsumer.ts`) reads events and processes them (stores in DB, triggers alerts)

### Kafka Topics

- **Topic:** `api-data-topic`
- **Broker:** `localhost:9092` (configurable via `KAFKA_BROKERS`)

### Troubleshooting Kafka

If Kafka fails to start or connect:

1. Ensure Docker is running: `docker ps`
2. Restart Kafka services: `docker-compose restart`
3. Check logs: `docker-compose logs kafka`

---

## 📧 Email Alerts

The backend sends email notifications for triggered alerts (geofence violations, speed limits, etc.).

### Configuration

Set the following in `.env`:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@cargotracking.com
```

### Testing Email

Send a test email via the `/alert/test` endpoint (if implemented).

---

## 🐛 Troubleshooting

### Port Already in Use

If port `3000` is already in use:

```bash
lsof -i :3000
kill -9 <PID>
```

Or change the `PORT` in `.env`.

### Database Connection Failed

- Verify MySQL is running and accessible
- Double-check `DATABASE_URL` or `DB_*` credentials in `.env`
- Test connection: `mysql -h <host> -u <user> -p<password> <database>`

### Kafka Connection Failed

- Ensure Docker containers are running: `docker ps`
- Restart services: `docker-compose restart`
- Check Kafka logs: `docker-compose logs kafka`

### Migrations Not Applied

Run:

```bash
npm run db:migrate
```

If migrations are out of sync, regenerate:

```bash
npm run db:generate
npm run db:migrate
```

---

## 🔒 Security Notes

- **Never commit `.env`** to version control. Use `.env.example` as a template.
- Use strong, unique values for `JWT_SECRET`.
- For production, enable HTTPS and secure cookies.
- Regularly rotate API keys and database passwords.

---

## 📚 Additional Resources

- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [Express.js Guide](https://expressjs.com/)
- [Kafka.js Documentation](https://kafka.js.org/)
- [Nodemailer Documentation](https://nodemailer.com/)

---

## 📝 License

[Add your license here]

---

## 👥 Contributors

[Add contributor information]

---

**Last Updated:** 2026-09-01
