const sql = require('mssql/msnodesqlv8');

const config = {
  connectionString:
    "Driver={ODBC Driver 18 for SQL Server};Server=(localdb)\\MSSQLLocalDB;Database=EmployeeDB;Trusted_Connection=yes;"
};

const pool = new sql.ConnectionPool(config);

module.exports = { sql, pool };
