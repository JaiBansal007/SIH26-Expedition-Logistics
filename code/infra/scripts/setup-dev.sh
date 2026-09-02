#!/bin/bash

#==============================================================================
# Cargo Tracking - Development Environment Setup
#
# This script sets up the complete local development infrastructure
# Run this once before starting development
#==============================================================================

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║     Cargo Tracking - Development Environment Setup            ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Check prerequisites
echo -e "${YELLOW}📋 Checking prerequisites...${NC}"

if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker not found. Please install Docker first.${NC}"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose not found. Please install Docker Compose first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker installed${NC}"
echo -e "${GREEN}✅ Docker Compose installed${NC}"
echo ""

# Check if Docker daemon is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker daemon is not running. Please start Docker.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker daemon is running${NC}"
echo ""

# Start infrastructure services
echo -e "${BLUE}🐳 Starting infrastructure services...${NC}"
echo ""

cd "$(dirname "$0")/.." || exit 1

docker-compose -f docker/docker-compose.dev.yml up -d

echo ""
echo -e "${YELLOW}⏳ Waiting for services to be healthy...${NC}"
sleep 10

# Check service health
echo ""
echo -e "${BLUE}🏥 Health check...${NC}"
docker-compose -f docker/docker-compose.dev.yml ps

# Create Kafka topics
echo ""
echo -e "${BLUE}📡 Setting up Kafka topics...${NC}"
bash kafka/create-topics.sh

# Display service URLs
echo ""
echo -e "${GREEN}"
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                    ✅ Infrastructure Ready!                    ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo ""
echo -e "${BLUE}📊 Services Available:${NC}"
echo ""
echo -e "  ${GREEN}PostgreSQL:${NC}"
echo -e "    Host: localhost:5432"
echo -e "    Database: cargo_tracking"
echo -e "    User: cargo"
echo -e "    Password: cargo_dev_password_123"
echo ""
echo -e "  ${GREEN}Redis:${NC}"
echo -e "    Host: localhost:6379"
echo -e "    Password: cargo_redis_password"
echo ""
echo -e "  ${GREEN}Kafka:${NC}"
echo -e "    Broker: localhost:9092"
echo -e "    Topics: api-data-topic, alert-events"
echo ""
echo -e "  ${GREEN}Adminer (DB GUI):${NC}"
echo -e "    ${BLUE}http://localhost:8080${NC}"
echo ""
echo -e "  ${GREEN}Mailhog (Email Testing):${NC}"
echo -e "    SMTP: localhost:1025"
echo -e "    Web UI: ${BLUE}http://localhost:8025${NC}"
echo ""
echo -e "  ${GREEN}Kafka UI:${NC}"
echo -e "    ${BLUE}http://localhost:8090${NC}"
echo ""
echo -e "${YELLOW}💡 Next steps:${NC}"
echo -e "  1. Configure your backend .env file"
echo -e "  2. Run database migrations: ${BLUE}cd Backend && npm run db:migrate${NC}"
echo -e "  3. Start development: ${BLUE}make dev${NC}"
echo ""
