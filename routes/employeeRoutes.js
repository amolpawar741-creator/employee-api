const express = require('express');
const router = express.Router();
const { sql, pool } = require('../db');

pool.connect();

// CREATE
router.post('/v', async (req, res) => {
  const { name, email, salary } = req.body;

  await pool.request()
    .input('Name', sql.NVarChar, name)
    .input('Email', sql.NVarChar, email)
    .input('Salary', sql.Decimal(10,2), salary)
    .execute('AddEmployee');

  res.json({ message: 'Employee added' });
});

// READ
router.get('/', async (req, res) => {
  const result = await pool.request().execute('GetEmployees');
  res.json(result.recordset);
});

// UPDATE
router.put('/:id', async (req, res) => {
  const { name, email, salary } = req.body;

  await pool.request()
    .input('Id', sql.Int, req.params.id)
    .input('Name', sql.NVarChar, name)
    .input('Email', sql.NVarChar, email)
    .input('Salary', sql.Decimal(10,2), salary)
    .execute('UpdateEmployee');

  res.json({ message: 'Updated' });
});

// DELETE
router.delete('/:id', async (req, res) => {
  await pool.request()
    .input('Id', sql.Int, req.params.id)
    .execute('DeleteEmployee');

  res.json({ message: 'Deleted' });
});

module.exports = router;
