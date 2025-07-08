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

    // await db.exec(`
    //   CREATE TABLE IF NOT EXISTS CAR_RENTAL (
    //     id INTEGER PRIMARY KEY AUTOINCREMENT,
    //     name TEXT NOT NULL,
    //     created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    //   );
    // `);

    console.log("✅ CAR_RENTAL table created (if not exists)");
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

createDatabases();
