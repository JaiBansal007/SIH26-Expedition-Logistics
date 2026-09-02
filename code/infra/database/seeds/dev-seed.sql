-- ============================================================================
-- Development Seed Data
--
-- Sample data for local development and testing
-- Run this manually: psql -U cargo -d cargo_tracking -f seeds/dev-seed.sql
-- ============================================================================

-- This file will be populated after your Drizzle migrations run

DO $$
BEGIN
    RAISE NOTICE '📦 Development seed data ready';
    RAISE NOTICE 'ℹ️  Populate this file after running Drizzle migrations';
END $$;
