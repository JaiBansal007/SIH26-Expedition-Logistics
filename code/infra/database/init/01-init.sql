-- ============================================================================
-- Cargo Tracking - Database Initialization Script
-- ============================================================================

-- Create read-only user (for reporting/analytics)
CREATE USER IF NOT EXISTS 'cargo_readonly'@'%' IDENTIFIED BY 'readonly_password_123';
GRANT SELECT ON cargo_tracking.* TO 'cargo_readonly'@'%';
FLUSH PRIVILEGES;

-- Log successful initialization
SELECT '✅ Cargo Tracking database initialized successfully' AS log_message;
SELECT '🔒 Read-only user created: cargo_readonly' AS log_message;
