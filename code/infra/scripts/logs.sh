#!/bin/bash

#==============================================================================
# View Logs from All Infrastructure Services
#==============================================================================

cd "$(dirname "$0")/.." || exit 1

echo "📋 Streaming logs from all infrastructure services..."
echo "    Press Ctrl+C to stop"
echo ""

docker-compose -f docker/docker-compose.dev.yml logs -f --tail=50
