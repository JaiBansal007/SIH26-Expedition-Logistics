#!/bin/bash

#==============================================================================
# Restore PostgreSQL Database
#
# Restores a database from a backup file
#==============================================================================

set -e

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m'

if [ -z "$1" ]; then
    echo -e "${RED}❌ Usage: ./restore-db.sh <backup_file>${NC}"
    echo ""
    echo "Available backups:"
    ls -lh "$(dirname "$0")/../backups/" 2>/dev/null || echo "  No backups found"
    exit 1
fi

BACKUP_FILE="$1"

if [ ! -f "$BACKUP_FILE" ]; then
    echo -e "${RED}❌ Backup file not found: $BACKUP_FILE${NC}"
    exit 1
fi

echo -e "${YELLOW}⚠️  WARNING: This will replace the current database!${NC}"
read -p "Continue? [y/N]: " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${GREEN}✅ Cancelled${NC}"
    exit 0
fi

echo -e "${YELLOW}📦 Restoring database from backup...${NC}"

# Decompress if gzipped
if [[ "$BACKUP_FILE" == *.gz ]]; then
    echo "Decompressing..."
    gunzip -c "$BACKUP_FILE" | docker exec -i cargo-postgres-dev psql -U cargo -d cargo_tracking
else
    docker exec -i cargo-postgres-dev psql -U cargo -d cargo_tracking < "$BACKUP_FILE"
fi

echo -e "${GREEN}✅ Database restored successfully!${NC}"
