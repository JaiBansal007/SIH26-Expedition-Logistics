# Cargo Tracking Project Makefile
# Orchestrates infrastructure, backend, and frontend services

.PHONY: help install setup infra-dev infra-clean dev dev-backend dev-frontend db-setup db-migrate db-studio health logs clean

# Colors for output
GREEN  := \033[0;32m
YELLOW := \033[0;33m
RED    := \033[0;31m
NC     := \033[0m # No Color

# Project paths
BACKEND_DIR := Backend
FRONTEND_DIR := Frontend
INFRA_DIR := infra

# Default target
help:
	@echo "$(GREEN)Cargo Tracking - Available Commands$(NC)"
	@echo ""
	@echo "$(YELLOW)Setup & Installation:$(NC)"
	@echo "  make install          Install all dependencies (backend + frontend)"
	@echo "  make setup            Complete first-time setup (install + infra + DB)"
	@echo ""
	@echo "$(YELLOW)Development:$(NC)"
	@echo "  make dev              Start everything (infra + backend + frontend)"
	@echo "  make dev-backend      Start backend only (with infra)"
	@echo "  make dev-frontend     Start frontend only"
	@echo ""
	@echo "$(YELLOW)Infrastructure:$(NC)"
	@echo "  make infra-dev        Start infrastructure services only"
	@echo "  make infra-clean      Stop and remove all infrastructure"
	@echo "  make health           Check infrastructure health"
	@echo "  make logs             View infrastructure logs"
	@echo ""
	@echo "$(YELLOW)Database:$(NC)"
	@echo "  make db-setup         Initialize database (generate + migrate)"
	@echo "  make db-migrate       Run database migrations"
	@echo "  make db-studio        Launch Drizzle Studio (DB GUI)"
	@echo "  make db-backup        Backup database"
	@echo ""
	@echo "$(YELLOW)Utilities:$(NC)"
	@echo "  make clean            Clean all dependencies and containers"
	@echo "  make restart          Restart everything"

# Install all dependencies
install:
	@echo "$(GREEN)📦 Installing dependencies...$(NC)"
	@cd $(BACKEND_DIR) && npm install
	@cd $(FRONTEND_DIR) && npm install
	@echo "$(GREEN)✅ Dependencies installed!$(NC)"

# Complete first-time setup
setup: install infra-dev
	@echo "$(GREEN)🗄️  Setting up database...$(NC)"
	@cd $(BACKEND_DIR) && npm run db:generate && npm run db:migrate
	@echo ""
	@echo "$(GREEN)✅ Setup complete!$(NC)"
	@echo ""
	@echo "$(YELLOW)💡 Next steps:$(NC)"
	@echo "  1. Configure $(BACKEND_DIR)/.env"
	@echo "  2. Run: make dev"

# Start infrastructure services
infra-dev:
	@echo "$(GREEN)🐳 Starting infrastructure...$(NC)"
	@cd $(INFRA_DIR) && bash scripts/setup-dev.sh

# Stop and remove infrastructure
infra-clean:
	@echo "$(RED)🧹 Stopping infrastructure...$(NC)"
	@cd $(INFRA_DIR) && bash scripts/teardown-dev.sh

# Check infrastructure health
health:
	@cd $(INFRA_DIR) && bash scripts/health-check.sh

# View infrastructure logs
logs:
	@cd $(INFRA_DIR) && bash scripts/logs.sh

# Database setup
db-setup:
	@echo "$(GREEN)🗄️  Setting up database...$(NC)"
	@cd $(BACKEND_DIR) && npm run db:generate
	@cd $(BACKEND_DIR) && npm run db:migrate
	@cd $(BACKEND_DIR) && npm run migrate:indexes
	@echo "$(GREEN)✅ Database ready!$(NC)"

# Run database migrations
db-migrate:
	@echo "$(GREEN)🗄️  Running migrations...$(NC)"
	@cd $(BACKEND_DIR) && npm run db:migrate
	@echo "$(GREEN)✅ Migrations complete!$(NC)"

# Launch Drizzle Studio
db-studio:
	@echo "$(GREEN)🎨 Launching Drizzle Studio...$(NC)"
	@cd $(BACKEND_DIR) && npm run studio

# Backup database
db-backup:
	@cd $(INFRA_DIR) && bash scripts/backup-db.sh

# Start backend only (with infrastructure)
dev-backend: infra-dev
	@echo "$(GREEN)🔧 Starting backend...$(NC)"
	@cd $(BACKEND_DIR) && npm run dev

# Start frontend only
dev-frontend:
	@echo "$(GREEN)🎨 Starting frontend...$(NC)"
	@cd $(FRONTEND_DIR) && npm run dev

# Start full development environment
dev: infra-dev
	@echo "$(GREEN)🚀 Starting full development environment...$(NC)"
	@echo "$(YELLOW)Backend: http://localhost:3000$(NC)"
	@echo "$(YELLOW)Frontend: http://localhost:5173$(NC)"
	@echo ""
	@make -j2 _run-backend _run-frontend

# Internal targets for parallel execution
_run-backend:
	@sleep 3
	@cd $(BACKEND_DIR) && npm run dev

_run-frontend:
	@sleep 8
	@cd $(FRONTEND_DIR) && npm run dev

# Clean everything
clean:
	@echo "$(RED)🧹 Cleaning up...$(NC)"
	@cd $(INFRA_DIR) && bash scripts/teardown-dev.sh || true
	@echo "$(YELLOW)Removing node_modules...$(NC)"
	@rm -rf $(BACKEND_DIR)/node_modules
	@rm -rf $(FRONTEND_DIR)/node_modules
	@echo "$(GREEN)✅ Cleanup complete!$(NC)"

# Restart everything
restart: infra-clean dev
	@echo "$(GREEN)✅ Restarted!$(NC)"
