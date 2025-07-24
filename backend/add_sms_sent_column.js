const { db } = require("./app/models");
const { QueryTypes } = require("sequelize");

async function addSmsSentColumn() {
  try {
    console.log("Adding sms_sent column to callhistories table...");
    
    // Check if the column already exists
    const columns = await db.sequelize.query(
      "SHOW COLUMNS FROM callhistories LIKE 'sms_sent'",
      { type: QueryTypes.SELECT }
    );
    
    if (columns.length === 0) {
      // Add the sms_sent column
      await db.sequelize.query(
        "ALTER TABLE callhistories ADD COLUMN sms_sent BOOLEAN DEFAULT FALSE",
        { type: QueryTypes.RAW }
      );
      console.log("✅ sms_sent column added successfully");
    } else {
      console.log("✅ sms_sent column already exists");
    }
    
    console.log("Migration completed successfully");
  } catch (error) {
    console.error("Error adding sms_sent column:", error);
  } finally {
    await db.sequelize.close();
  }
}

// Run the migration
addSmsSentColumn(); 