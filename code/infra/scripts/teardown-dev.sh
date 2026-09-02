#!/bin/bash

#==============================================================================
# Cargo Tracking - Teardown Development Environment
#
# This script stops and removes all development infrastructure
#==============================================================================

set -e

# Colors
RED='\033[0;31m'
YELLOW='\033[0;33m'
GREEN='\033[0;32m'
NC='\033[0m'

echo -e "${YELLOW}"
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║     Cargo Tracking - Teardown Development Infrastructure      ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo ""

cd "$(dirname "$0")/.." || exit 1

# Ask for confirmation
read -p "$(echo -e ${YELLOW}⚠️  This will stop and remove all containers and volumes. Continue? [y/N]: ${NC})" -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${GREEN}✅ Cancelled${NC}"
    exit 0
fi

echo ""
echo -e "${YELLOW}🧹 Stopping and removing containers...${NC}"
docker-compose -f docker/docker-compose.dev.yml down -v

echo ""
echo -e "${GREEN}✅ Infrastructure teardown complete!${NC}"
echo ""
echo -e "${YELLOW}💡 To start again, run:${NC} ./scripts/setup-dev.sh"
echo ""
