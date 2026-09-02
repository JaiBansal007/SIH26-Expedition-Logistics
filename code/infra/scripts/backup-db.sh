#!/bin/bash

#==============================================================================
# Backup PostgreSQL Database
#
# Creates a timestamped backup of the development database
#==============================================================================

set -e

BACKUP_DIR="$(dirname "$0")/../backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/cargo_tracking_$TIMESTAMP.sql"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m'

echo -e "${YELLOW}📦 Creating database backup...${NC}"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Create backup
docker exec cargo-postgres-dev pg_dump -U cargo -d cargo_tracking > "$BACKUP_FILE"

# Compress the backup
gzip "$BACKUP_FILE"

echo -e "${GREEN}✅ Backup created: ${BACKUP_FILE}.gz${NC}"
echo ""
echo -e "${YELLOW}💡 To restore this backup, run:${NC}"
echo -e "   ./scripts/restore-db.sh ${BACKUP_FILE}.gz"
echo ""

# Keep only last 7 backups
cd "$BACKUP_DIR" && ls -t cargo_tracking_*.sql.gz | tail -n +8 | xargs -r rm
echo -e "${YELLOW}🧹 Cleaned up old backups (keeping last 7)${NC}"
