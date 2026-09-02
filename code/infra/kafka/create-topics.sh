#!/bin/bash

#==============================================================================
# Create Kafka Topics
#
# This script creates all required Kafka topics for the application
# Run automatically by setup-dev.sh or manually after Kafka is running
#==============================================================================

set -e

KAFKA_BROKER="${KAFKA_BROKER:-localhost:9092}"

echo "📡 Creating Kafka topics..."
echo "   Broker: $KAFKA_BROKER"
echo ""

# Wait for Kafka to be ready
echo "⏳ Waiting for Kafka to be ready..."
timeout=60
elapsed=0
while ! docker exec cargo-kafka-dev kafka-broker-api-versions --bootstrap-server localhost:9092 > /dev/null 2>&1; do
    sleep 2
    elapsed=$((elapsed + 2))
    if [ $elapsed -ge $timeout ]; then
        echo "❌ Kafka did not become ready in time"
        exit 1
    fi
done
echo "✅ Kafka is ready!"
echo ""

# Create topics
echo "Creating topics..."

# GPS Data Topic
docker exec cargo-kafka-dev kafka-topics \
    --create \
    --if-not-exists \
    --bootstrap-server localhost:9092 \
    --topic api-data-topic \
    --partitions 3 \
    --replication-factor 1 \
    --config retention.ms=604800000 \
    --config compression.type=gzip

echo "✅ Topic created: api-data-topic (GPS data stream)"

# Alert Events Topic
docker exec cargo-kafka-dev kafka-topics \
    --create \
    --if-not-exists \
    --bootstrap-server localhost:9092 \
    --topic alert-events \
    --partitions 1 \
    --replication-factor 1 \
    --config retention.ms=2592000000

echo "✅ Topic created: alert-events (Alert notifications)"

# List all topics
echo ""
echo "📋 All topics:"
docker exec cargo-kafka-dev kafka-topics \
    --list \
    --bootstrap-server localhost:9092

echo ""
echo "✅ Kafka topics created successfully!"
