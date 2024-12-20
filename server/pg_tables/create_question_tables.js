const { Pool } = require('pg');

// Configure the PostgreSQL connection
const pool = new Pool({
    user: 'postgres',
    password: 'goodboi19',
    host: 'localhost',
    port: 5432, // default Postgres port
    database: 'comprehensive-assessment-system'
  });

const createTables = async () => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Define your SQL queries to create tables
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS QUESTION (
        id NUMERIC PRIMARY KEY,
        q_type VARCHAR(100) NOT NULL,
        q_content VARCHAR(100) UNIQUE json NULL,
        p_code VARCHAR(8) NOT NULL
        positive_marks NUMERIC NOT NULL,
        negative_marks NUMERIC NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Execute the queries
    await client.query(createTableQuery);

    await client.query('COMMIT');
    console.log('Tables created successfully');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error creating tables', err);
  } finally {
    client.release();
  }
};

createTables().catch(err => console.error('Unexpected error', err));
