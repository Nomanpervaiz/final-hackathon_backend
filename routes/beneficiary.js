
import express from "express";
import { beneficiaryModel } from "./models/beneficiary";

const router = express.Router();

// Create a new beneficiary
router.post("/beneficiaries", async (req, res) => {
  try {
    const newBeneficiary = await beneficiaryModel.create(req.body);
    res.status(201).json(newBeneficiary);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read all beneficiaries
router.get("/beneficiaries", async (req, res) => {
  try {
    const beneficiaries = await beneficiaryModel.find();
    res.status(200).json(beneficiaries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read a specific beneficiary by ID
router.get("/beneficiaries/:id", async (req, res) => {
  try {
    const beneficiary = await beneficiaryModel.findById(req.params.id);
    if (!beneficiary) {
      return res.status(404).json({ error: "Beneficiary not found" });
    }
    res.status(200).json(beneficiary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a beneficiary by ID
router.put("/beneficiaries/:id", async (req, res) => {
  try {
    const updatedBeneficiary = await beneficiaryModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedBeneficiary) {
      return res.status(404).json({ error: "Beneficiary not found" });
    }
    res.status(200).json(updatedBeneficiary);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a beneficiary by ID
router.delete("/beneficiaries/:id", async (req, res) => {
  try {
    const deletedBeneficiary = await beneficiaryModel.findByIdAndDelete(req.params.id);
    if (!deletedBeneficiary) {
      return res.status(404).json({ error: "Beneficiary not found" });
    }
    res.status(200).json({ message: "Beneficiary deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
