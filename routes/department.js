import express from "express";
import { DepartmentModel } from "./models/DepartmentModel.js"; // Adjust path as per your project structure

const router = express.Router();

// Create a new department
router.post("/departments", async (req, res) => {
  try {
    const { name, staff, activityLogs } = req.body;
    const department = new DepartmentModel({ name, staff, activityLogs });
    await department.save();
    res.status(201).json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all departments
router.get("/departments", async (req, res) => {
  try {
    const departments = await DepartmentModel.find();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single department by ID
router.get("/departments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const department = await DepartmentModel.findById(id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a department by ID
router.put("/departments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDepartment = await DepartmentModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedDepartment) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.status(200).json(updatedDepartment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a department by ID
router.delete("/departments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDepartment = await DepartmentModel.findByIdAndDelete(id);
    if (!deletedDepartment) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.status(200).json({ message: "Department deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a staff member to a department
router.post("/departments/:id/staff", async (req, res) => {
  try {
    const { id } = req.params;
    const { staffId, name, role } = req.body;

    const department = await DepartmentModel.findById(id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    department.staff.push({ staffId, name, role });
    await department.save();
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove a staff member from a department
router.delete("/departments/:id/staff/:staffId", async (req, res) => {
  try {
    const { id, staffId } = req.params;

    const department = await DepartmentModel.findById(id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    department.staff = department.staff.filter((staff) => staff.staffId !== staffId);
    await department.save();
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Log an activity
router.post("/departments/:id/activity", async (req, res) => {
  try {
    const { id } = req.params;
    const { action, details } = req.body;

    const department = await DepartmentModel.findById(id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    department.activityLogs.push({ action, details });
    await department.save();
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
