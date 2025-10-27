const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Temporary array as database
let employees = [
  { id:3,name: "Guru", role: "HR" }
];
let id = 1;

// ➕ Add employee
app.post("/employees", (req, res) => {
  const { name, role } = req.body;
  const newEmployee = { id: id++, name, role };
  employees.push(newEmployee);
  res.json({ message: "Employee added successfully", employee: newEmployee });
});

// 📋 Get all employees
app.get("/employees", (req, res) => {
  res.json(employees);
});

// ✏️ Update employee
app.put("/employees/:id", (req, res) => {
  const empId = parseInt(req.params.id);
  const { name, role } = req.body;
  const emp = employees.find((e) => e.id === empId);

  if (emp) {
    emp.name = name;
    emp.role = role;
    res.json({ message: "Employee updated successfully", employee: emp });
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
});

// 🗑️ Delete employee
app.delete("/employees/:id", (req, res) => {
  const empId = parseInt(req.params.id);
  const index = employees.findIndex((e) => e.id === empId);

  if (index !== -1) {
    employees.splice(index, 1);
    res.json({ message: "Employee deleted successfully" });
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
