-- =====================================================
-- SAPD PagerDispatch Bot Database Schema
-- Version: 3
-- =====================================================

PRAGMA foreign_keys = ON;

-- ==========================================
-- Metadata
-- ==========================================

CREATE TABLE IF NOT EXISTS metadata (

    key TEXT PRIMARY KEY,

    value TEXT NOT NULL

);

-- ==========================================
-- Guild Settings
-- ==========================================

CREATE TABLE IF NOT EXISTS settings (

    guild_id TEXT PRIMARY KEY,

    -- Dispatch Console

    console_channel_id TEXT,
    console_message_id TEXT,
    console_created_at DATETIME,

    -- Channels

    dispatch_alert_channel_id TEXT,
    evaluation_log_channel_id TEXT,

    -- Branding

    department_name TEXT DEFAULT 'San Andreas Police Department',

    department_logo TEXT,

    footer_text TEXT DEFAULT 'SAPD Pager Dispatch',

    embed_color TEXT DEFAULT '#1F6FEB',

    -- Roles

    staff_officer_role_id TEXT,

    command_officer_role_id TEXT,

    supervisor_role_id TEXT,

    police_officer_role_id TEXT,

    detective_role_id TEXT,

    swat_role_id TEXT,

    traffic_role_id TEXT,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP

);

-- ==========================================
-- Dynamic Role Storage
-- ==========================================

CREATE TABLE IF NOT EXISTS roles (

    guild_id TEXT NOT NULL,

    role_key TEXT NOT NULL,

    role_id TEXT NOT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (
        guild_id,
        role_key
    )

);

-- ==========================================
-- Dispatch Counter
-- ==========================================

CREATE TABLE IF NOT EXISTS counters (

    guild_id TEXT PRIMARY KEY,

    next_dispatch_number INTEGER NOT NULL DEFAULT 1

);

-- ==========================================
-- Dispatch Records
-- ==========================================

CREATE TABLE IF NOT EXISTS dispatches (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    guild_id TEXT NOT NULL,

    dispatch_number INTEGER NOT NULL,

    message_id TEXT,

    channel_id TEXT,

    -- DISPATCH / PANIC

    type TEXT NOT NULL DEFAULT 'DISPATCH',

    -- EXTREME / HIGH / LOW / VERY_LOW

    priority TEXT NOT NULL DEFAULT 'LOW',

    location TEXT NOT NULL,

    situation TEXT NOT NULL,

    additional_notes TEXT,

    /*
        JSON Array

        Example:

        [
            "123456789",
            "987654321"
        ]
    */

    requested_units TEXT NOT NULL,

    /*
        JSON Array

        Example:

        [
            {
                "userId":"123",
                "username":"Fowler",
                "status":"RESPOND"
            }
        ]
    */

    responding_units TEXT DEFAULT '[]',

    -- WAITING
    -- EN_ROUTE
    -- ON_SCENE
    -- CLEAR
    -- CLOSED

    status TEXT NOT NULL DEFAULT 'WAITING',

    created_by TEXT NOT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    closed_at DATETIME

);

-- ==========================================
-- Dispatch Responses
-- ==========================================

CREATE TABLE IF NOT EXISTS responses (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    dispatch_id INTEGER NOT NULL,

    user_id TEXT NOT NULL,

    response_type TEXT NOT NULL,

    responded_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(dispatch_id)

        REFERENCES dispatches(id)

        ON DELETE CASCADE

);

-- ==========================================
-- Supervisor Evaluation Logs
-- ==========================================

CREATE TABLE IF NOT EXISTS dispatch_evaluations (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    dispatch_id INTEGER NOT NULL,

    supervisor_id TEXT NOT NULL,

    officers TEXT NOT NULL,

    evaluation TEXT,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(dispatch_id)

        REFERENCES dispatches(id)

        ON DELETE CASCADE

);

-- ==========================================
-- Audit Logs
-- ==========================================

CREATE TABLE IF NOT EXISTS audit_logs (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    guild_id TEXT,

    user_id TEXT,

    action TEXT,

    details TEXT,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP

);