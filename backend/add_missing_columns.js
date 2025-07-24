const { db } = require("./app/models");
const { QueryTypes } = require("sequelize");

async function addMissingColumns() {
  try {
    console.log("Adding missing columns to callhistories table...");
    
    // Check and add demo_data column
    console.log("1. Checking demo_data column...");
    const demoDataColumns = await db.sequelize.query(
      "SHOW COLUMNS FROM callhistories LIKE 'demo_data'",
      { type: QueryTypes.SELECT }
    );
    
    if (demoDataColumns.length === 0) {
      await db.sequelize.query(
        "ALTER TABLE callhistories ADD COLUMN demo_data TEXT",
        { type: QueryTypes.RAW }
      );
      console.log("✅ demo_data column added successfully");
    } else {
      console.log("✅ demo_data column already exists");
    }
    
    // Check and add sms_sent column
    console.log("2. Checking sms_sent column...");
    const smsSentColumns = await db.sequelize.query(
      "SHOW COLUMNS FROM callhistories LIKE 'sms_sent'",
      { type: QueryTypes.SELECT }
    );
    
    if (smsSentColumns.length === 0) {
      await db.sequelize.query(
        "ALTER TABLE callhistories ADD COLUMN sms_sent BOOLEAN DEFAULT FALSE",
        { type: QueryTypes.RAW }
      );
      console.log("✅ sms_sent column added successfully");
    } else {
      console.log("✅ sms_sent column already exists");
    }
    
    console.log("🎉 All migrations completed successfully!");
    console.log("📱 SMS will now only be sent once per call");
    
  } catch (error) {
    console.error("❌ Error adding columns:", error);
  } finally {
    await db.sequelize.close();
  }
}

// Run the migration
addMissingColumns(); 