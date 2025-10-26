const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*' }));
app.use(express.json());

// In-memory data (acts like a temporary DB)
let employees = [
  { id: 1, name: "John", age: 25, department: "HR" },
  { id: 2, name: "Alice", age: 28, department: "IT" }
];

// CREATE
app.post('/employees', (req, res) => {
  const newEmp = { id: employees.length + 1, ...req.body };
  employees.push(newEmp);
  res.json(newEmp);
});

// READ ALL
app.get('/employees', (req, res) => {
  res.json(employees);
});

// READ ONE
app.get('/employees/:id', (req, res) => {
  const emp = employees.find(e => e.id == req.params.id);
  emp ? res.json(emp) : res.status(404).json({ message: "Not found" });
});

// UPDATE
app.put('/employees/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = employees.findIndex(e => e.id === id);
  if (index !== -1) {
    employees[index] = { id, ...req.body };
    res.json(employees[index]);
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
});

// DELETE
app.delete('/employees/:id', (req, res) => {
  employees = employees.filter(e => e.id != req.params.id);
  res.json({ message: "Deleted successfully" });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
