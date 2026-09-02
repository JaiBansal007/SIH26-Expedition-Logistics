#!/bin/bash

#==============================================================================
# Cargo Tracking - Infrastructure Health Check
#
# Checks if all infrastructure services are running and healthy
#==============================================================================

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🏥 Cargo Tracking - Infrastructure Health Check${NC}"
echo ""

cd "$(dirname "$0")/.." || exit 1

all_healthy=true

# Check PostgreSQL
echo -n "PostgreSQL:          "
if docker exec cargo-postgres-dev pg_isready -U cargo -d cargo_tracking > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Healthy${NC}"
else
    echo -e "${RED}❌ Not responding${NC}"
    all_healthy=false
fi

# Check Redis
echo -n "Redis:               "
if docker exec cargo-redis-dev redis-cli --raw incr ping > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Healthy${NC}"
else
    echo -e "${RED}❌ Not responding${NC}"
    all_healthy=false
fi

# Check Zookeeper
echo -n "Zookeeper:           "
if docker exec cargo-zookeeper-dev nc -z localhost 2181 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Healthy${NC}"
else
    echo -e "${RED}❌ Not responding${NC}"
    all_healthy=false
fi

# Check Kafka
echo -n "Kafka:               "
if docker exec cargo-kafka-dev kafka-broker-api-versions --bootstrap-server localhost:9092 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Healthy${NC}"
else
    echo -e "${RED}❌ Not responding${NC}"
    all_healthy=false
fi

# Check Adminer
echo -n "Adminer (DB GUI):    "
if curl -s http://localhost:8080 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Available at http://localhost:8080${NC}"
else
    echo -e "${YELLOW}⚠️  Not accessible${NC}"
fi

# Check Mailhog
echo -n "Mailhog:             "
if curl -s http://localhost:8025 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Available at http://localhost:8025${NC}"
else
    echo -e "${YELLOW}⚠️  Not accessible${NC}"
fi

# Check Kafka UI
echo -n "Kafka UI:            "
if curl -s http://localhost:8090 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Available at http://localhost:8090${NC}"
else
    echo -e "${YELLOW}⚠️  Not accessible${NC}"
fi

echo ""

if $all_healthy; then
    echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║  ✅ All core services are healthy!    ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
    exit 0
else
    echo -e "${RED}╔════════════════════════════════════════╗${NC}"
    echo -e "${RED}║  ❌ Some services are not healthy     ║${NC}"
    echo -e "${RED}╚════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${YELLOW}💡 Try running:${NC} docker-compose -f docker/docker-compose.dev.yml restart"
    exit 1
fi
