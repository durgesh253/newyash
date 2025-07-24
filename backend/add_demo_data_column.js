const { db } = require("./app/models");
const { QueryTypes } = require("sequelize");

async function addDemoDataColumn() {
  try {
    console.log("Adding demo_data column to callhistories table...");
    
    // Check if the column already exists
    const columns = await db.sequelize.query(
      "SHOW COLUMNS FROM callhistories LIKE 'demo_data'",
      { type: QueryTypes.SELECT }
    );
    
    if (columns.length === 0) {
      // Add the demo_data column
      await db.sequelize.query(
        "ALTER TABLE callhistories ADD COLUMN demo_data TEXT",
        { type: QueryTypes.RAW }
      );
      console.log("✅ demo_data column added successfully");
    } else {
      console.log("✅ demo_data column already exists");
    }
    
    console.log("Migration completed successfully");
  } catch (error) {
    console.error("Error adding demo_data column:", error);
  } finally {
    await db.sequelize.close();
  }
}

// Run the migration
addDemoDataColumn(); 