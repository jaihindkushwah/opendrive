const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const path = require("path");

async function createDatabases() {
  try {
    const db = await open({
      filename: path.resolve(__dirname, "./database.db"),
      driver: sqlite3.Database,
    });

    await db.exec(`
      CREATE TABLE IF NOT EXISTS USER (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT "user",
        isVerified BOOLEAN DEFAULT false,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await db.exec(`
      CREATE TABLE IF NOT EXISTS LISTINGS (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        title TEXT NOT NULL,
        description TEXT,
        brand TEXT,
        model TEXT,
        year INTEGER,
        price_per_day REAL,
        location TEXT,
        status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES USER(id)
      );
    `);

    await db.exec(`
      CREATE TABLE IF NOT EXISTS LISTING_AUDIT_LOGS (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        listing_id INTEGER NOT NULL,
        admin_id INTEGER NOT NULL,
        action TEXT NOT NULL, -- 'approve', 'reject', 'edit'
        old_data TEXT, -- store JSON before edit
        new_data TEXT, -- store JSON after edit
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (listing_id) REFERENCES LISTINGS(id),
        FOREIGN KEY (admin_id) REFERENCES USER(id)
      );
    `);

    console.log("✅ USER, LISTINGS, and LISTING_AUDIT_LOGS tables created (if not exists)");
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

createDatabases();
