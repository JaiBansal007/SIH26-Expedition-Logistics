# 🏗️ Cargo Tracking Infrastructure

This directory contains all infrastructure configuration for the Cargo Tracking application.

---

## 📁 Directory Structure

```
infra/
├── docker/                     # Docker Compose configurations
│   ├── docker-compose.dev.yml  # Development environment
│   ├── docker-compose.test.yml # Testing/CI environment
│   └── .env.infra              # Infrastructure environment variables
│
├── database/                   # Database scripts
│   ├── init/                   # Initialization scripts (auto-run on first start)
│   │   └── 01-init.sql
│   └── seeds/                  # Sample data for development
│       └── dev-seed.sql
│
├── kafka/                      # Kafka configuration
│   └── create-topics.sh        # Auto-create Kafka topics
│
├── scripts/                    # Automation scripts
│   ├── setup-dev.sh            # Setup complete dev environment
│   ├── teardown-dev.sh         # Clean up everything
│   ├── health-check.sh         # Check service health
│   ├── backup-db.sh            # Backup PostgreSQL database
│   ├── restore-db.sh           # Restore from backup
│   └── logs.sh                 # View all service logs
│
└── docs/                       # Documentation
    └── README.md               # This file
```

---

## 🚀 Quick Start

### **1. First-Time Setup**

```bash
# From project root
cd code/infra
./scripts/setup-dev.sh
```

This will:
- Start PostgreSQL, Redis, Kafka, Zookeeper
- Create Kafka topics
- Initialize database with PostGIS
- Start Adminer, Mailhog, Kafka UI

### **2. Daily Development**

```bash
# From project root
make infra-dev        # Start infrastructure
make dev              # Start apps + infrastructure
```

### **3. Check Everything is Running**

```bash
cd code/infra
./scripts/health-check.sh
```

---

## 📊 Services

### **Core Services**

| Service | Port | Purpose | Access |
|---------|------|---------|--------|
| **PostgreSQL** | 5432 | Main database | `psql -U cargo -d cargo_tracking` |
| **Redis** | 6379 | Caching layer | `redis-cli -a cargo_redis_password` |
| **Kafka** | 9092 | Message queue | Broker: `localhost:9092` |
| **Zookeeper** | 2181 | Kafka coordination | - |

### **Development Tools**

| Service | Port | Purpose | Access |
|---------|------|---------|--------|
| **Adminer** | 8080 | Database GUI | http://localhost:8080 |
| **Mailhog** | 1025 (SMTP)<br>8025 (UI) | Email testing | http://localhost:8025 |
| **Kafka UI** | 8090 | Kafka management | http://localhost:8090 |

---

## 🔧 Common Tasks

### **View Logs**

```bash
# All services
./scripts/logs.sh

# Specific service
docker logs -f cargo-postgres-dev
docker logs -f cargo-kafka-dev
```

### **Backup Database**

```bash
./scripts/backup-db.sh
# Creates: backups/cargo_tracking_YYYYMMDD_HHMMSS.sql.gz
```

### **Restore Database**

```bash
./scripts/restore-db.sh backups/cargo_tracking_20260901_120000.sql.gz
```

### **Restart Services**

```bash
docker-compose -f docker/docker-compose.dev.yml restart
```

### **Stop Everything**

```bash
./scripts/teardown-dev.sh
```

---

## 🗄️ Database

### **Connection Details**

```env
DATABASE_URL=postgresql://cargo:cargo_dev_password_123@localhost:5432/cargo_tracking

# Or individual components:
DB_HOST=localhost
DB_PORT=5432
DB_USER=cargo
DB_PASSWORD=cargo_dev_password_123
DB_NAME=cargo_tracking
```

### **Extensions Enabled**

- ✅ **PostGIS** - Geospatial queries for GPS tracking
- ✅ **uuid-ossp** - UUID generation
- ✅ **pg_trgm** - Fuzzy text search

### **Access via Adminer**

1. Open http://localhost:8080
2. System: **PostgreSQL**
3. Server: **postgres**
4. Username: **cargo**
5. Password: **cargo_dev_password_123**
6. Database: **cargo_tracking**

---

## 📨 Email Testing (Mailhog)

### **Backend Configuration**

```env
EMAIL_HOST=localhost
EMAIL_PORT=1025
EMAIL_SECURE=false
EMAIL_USER=              # Leave empty
EMAIL_PASSWORD=          # Leave empty
```

### **View Emails**

All emails sent by your app are caught by Mailhog:
- Web UI: http://localhost:8025
- No emails are actually sent ✅

---

## 📡 Kafka

### **Topics**

| Topic | Partitions | Purpose |
|-------|------------|---------|
| `api-data-topic` | 3 | GPS data stream |
| `alert-events` | 1 | Alert notifications |

### **Kafka UI**

View topics, messages, and consumer groups:
- URL: http://localhost:8090

### **CLI Commands**

```bash
# List topics
docker exec cargo-kafka-dev kafka-topics \
  --list --bootstrap-server localhost:9092

# Consume messages
docker exec cargo-kafka-dev kafka-console-consumer \
  --bootstrap-server localhost:9092 \
  --topic api-data-topic \
  --from-beginning

# Produce test message
docker exec -it cargo-kafka-dev kafka-console-producer \
  --bootstrap-server localhost:9092 \
  --topic api-data-topic
```

---

## 🧪 Testing Environment

For CI/CD and automated tests, use the test configuration:

```bash
docker-compose -f docker/docker-compose.test.yml up -d
```

**Differences from dev:**
- Uses in-memory PostgreSQL (faster, ephemeral)
- Minimal services only
- Different ports to avoid conflicts

---

## 🐛 Troubleshooting

### **Services won't start**

```bash
# Check Docker is running
docker info

# Check port conflicts
lsof -i :5432  # PostgreSQL
lsof -i :9092  # Kafka

# View service logs
docker-compose -f docker/docker-compose.dev.yml logs
```

### **Database connection refused**

```bash
# Check PostgreSQL is healthy
docker exec cargo-postgres-dev pg_isready -U cargo

# Restart PostgreSQL
docker restart cargo-postgres-dev
```

### **Kafka not producing/consuming**

```bash
# Check Kafka health
docker exec cargo-kafka-dev kafka-broker-api-versions \
  --bootstrap-server localhost:9092

# Recreate topics
./kafka/create-topics.sh
```

### **Reset everything**

```bash
./scripts/teardown-dev.sh
./scripts/setup-dev.sh
```

---

## 🔒 Security Notes

**⚠️ These credentials are for LOCAL DEVELOPMENT ONLY**

- PostgreSQL password: `cargo_dev_password_123`
- Redis password: `cargo_redis_password`
- Read-only DB user: `cargo_readonly` / `readonly_password_123`

**Never use these in production!**

---

## 📚 Additional Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [PostGIS Documentation](https://postgis.net/documentation/)
- [Kafka Documentation](https://kafka.apache.org/documentation/)
- [Redis Documentation](https://redis.io/documentation)

---

## 💡 Next Steps

1. ✅ Infrastructure is running
2. Configure backend `.env` with database credentials
3. Run migrations: `cd Backend && npm run db:migrate`
4. Start development: `make dev`

---

**Last Updated:** 2026-09-01
