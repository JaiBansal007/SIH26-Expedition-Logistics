# 🚀 Cargo Tracking - Quick Start Guide

The easiest way to start the entire project with a single command using the **Makefile**.

---

## ⚡ Quick Start (Using Makefile)

### Prerequisites
- **Node.js** (v18+)
- **Docker & Docker Compose**
- **MySQL** database
- **make** (usually pre-installed on macOS/Linux)

### 1. First-Time Setup

```bash
# Clone the repository
cd "Cargo Tracking"

# Complete setup (installs deps, starts Docker, sets up DB)
make setup
```

This will:
- Install backend and frontend dependencies
- Start Kafka & Zookeeper in Docker
- Run database migrations

### 2. Configure Environment

```bash
# Copy the example .env file
cp code/Backend/.env.example code/Backend/.env

# Edit with your credentials
nano code/Backend/.env
```

Required variables:
- `DATABASE_URL` or `DB_*` credentials
- `JWT_SECRET`
- Email configuration (optional)

### 3. Start Everything

```bash
make dev
```

This starts:
- 🐳 Docker services (Kafka + Zookeeper)
- 🔧 Backend API on `http://localhost:3000`
- 🎨 Frontend on `http://localhost:5173`

---

## 📋 Available Make Commands

### Development
```bash
make dev              # Start everything (recommended)
make dev-backend      # Backend only (with Docker services)
make dev-frontend     # Frontend only
```

### Setup & Installation
```bash
make install          # Install all dependencies
make setup            # Complete first-time setup
make start-infra      # Start Docker services only
make stop-infra       # Stop Docker services
```

### Database
```bash
make db-setup         # Initialize database
make db-migrate       # Run migrations
make db-studio        # Launch Drizzle Studio (DB GUI)
```

### Testing & Utilities
```bash
make test             # Run all tests
make logs             # Show Docker logs
make clean            # Remove all dependencies & containers
make restart          # Restart everything
make help             # Show all commands
```

---

## 🐳 Alternative: Docker Compose (Coming Soon)

For a fully containerized setup:

```bash
docker-compose up
```

*(Docker Compose configuration for the full stack is planned)*

---

## 📂 Manual Setup (Without Make)

If you prefer to run services individually:

### Backend
```bash
cd code/Backend
npm install
cp .env.example .env
# Edit .env with your credentials
docker-compose up -d
npm run db:generate
npm run db:migrate
npm run dev
```

### Frontend
```bash
cd code/Frontend
npm install
npm run dev
```

---

## 🔧 Troubleshooting

### "make: command not found"
- **macOS**: `make` is pre-installed with Xcode Command Line Tools
- **Linux**: `sudo apt install build-essential`
- **Windows**: Use WSL2 or install via [Chocolatey](https://chocolatey.org/): `choco install make`

### Port conflicts
- Backend (3000): Change `PORT` in `.env`
- Frontend (5173): Vite will auto-increment to 5174
- Kafka (9092): Edit `docker-compose.yml`

### Docker services won't start
```bash
docker ps
docker-compose logs
make stop-infra && make start-infra
```

---

## 📚 Documentation

- [Backend README](code/Backend/README.md) - Detailed backend setup
- [Frontend README](code/Frontend/README.md) - Frontend configuration

---

## 🎯 Next Steps

1. Check the backend API: `curl http://localhost:3000/api/health`
2. Open the frontend: `http://localhost:5173`
3. Explore the database: `make db-studio`

Happy tracking! 🚛📦
