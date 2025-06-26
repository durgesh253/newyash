// migrate_call_columns.js

const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("voice_agent_db", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

async function migrateCallColumns() {
  console.log("🚀 Starting migration to add missing columns to callhistories table...");

  try {
    const columnsToAdd = [
      { name: "caller_name", definition: "VARCHAR(255) NULL AFTER user_id" },
      { name: "caller_email", definition: "VARCHAR(255) NULL AFTER caller_name" },
      { name: "language", definition: "VARCHAR(100) NULL AFTER caller_email" },
      { name: "accent", definition: "VARCHAR(100) NULL AFTER language" },
      { name: "voice_type", definition: "VARCHAR(100) NULL AFTER accent" },
    ];

    for (const column of columnsToAdd) {
      const [results] = await sequelize.query(`
        SELECT COUNT(*) as count
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = 'callhistories' 
          AND TABLE_SCHEMA = 'voice_agent_db'
          AND COLUMN_NAME = '${column.name}'
      `);

      if (results[0].count === 0) {
        console.log(`🛠 Adding column '${column.name}'...`);
        await sequelize.query(`ALTER TABLE callhistories ADD COLUMN ${column.name} ${column.definition}`);
      } else {
        console.log(`✅ Column '${column.name}' already exists. Skipping.`);
      }
    }

    console.log("🎉 Migration completed successfully.");
  } catch (error) {
    console.error("❌ Migration failed:", error);
  } finally {
    await sequelize.close();
    console.log("🔒 Database connection closed");
  }
}

migrateCallColumns();
