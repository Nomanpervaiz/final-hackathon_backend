import express from 'express';
import Joi from 'joi';
import { LoanModel } from '../models/LoanModel.js';
import { authenticateUser } from '../middleware/authenticateUser.js';


const router = express.Router();


const loanValidationSchema = Joi.object({
    userId: Joi.string().required(),
    category: Joi.string().required(),
    subcategory: Joi.string().required(),
    loanAmount: Joi.number().positive().required(), // Ensure positive loan amount
    loanPeriod: Joi.number().integer().min(1).required(), // Minimum loan period is 1 month
    guarantors: Joi.array()
        .items(
            Joi.object({
                name: Joi.string().required(),
                email: Joi.string().email().required(),
                cnic: Joi.string()
                    //   .pattern(/^[0-9]{5}-[0-9]{7}-[0-9]$/) // CNIC format validation
                    .required()
                    .messages({
                        'string.pattern.base': 'CNIC must be in #####-#######-# format',
                    }),
                location: Joi.string().required(),
            })
        )
        .min(1)
        .required(),
    status: Joi.string().valid('Pending', 'Approved', 'Rejected').default('Pending'),
});


// ye route loan request create karrha hai
router.post('/create', authenticateUser, async (req, res) => {

    const { error, value } = loanValidationSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            error: true,
            message: 'Validation error',
            errors: error.details.map((err) => err.message),
        });
    }

    const { userId, category, subcategory, loanAmount, loanPeriod, guarantors } = value;
    const isLoanRequestExist = await LoanModel.findOne({ userId: userId })

    if (isLoanRequestExist) {
        return res.status(400).json({
            error: true,
            message: 'Loan request already exists',
        });
    }
    try {
        const newLoan = new LoanModel({
            userId,
            category,
            subcategory,
            loanAmount,
            loanPeriod,
            guarantors,
        });

        await newLoan.save();
        res.status(201).json({
            error: false,
            message: 'Loan request created successfully',
            loan: newLoan,
        });
    } catch (error) {
        console.error('Error creating loan request:', error);
        res.status(500).json({
            error: true,
            message: 'Error creating loan request',
            error: error.message,
        });
    }
});

// ye sari loan requests derha hai 
router.get('/', authenticateUser, async (req, res) => {
    try {
        const loans = await LoanModel.find().populate('userId');
        res.status(200).json({ error: false, message: "Loan Request Fetch successfully", data: loans });
    } catch (error) {
        res.status(500).json({ error: true, message: 'Error fetching loan requests', error: error.message });
    }
});


// Single user ki loan ki request
router.get('/:id', authenticateUser ,async (req, res) => {
    const { id } = req.params;

    try {
        const loan = await LoanModel.findById(id).populate('userId'); 
        if (!loan) {
            return res.status(404).json({ error: true, message: 'Loan request not found' });
        }
        res.status(200).json({ error: false, message : "loan request fetched" });
    } catch (error) {
        res.status(500).json({ error: true, message: 'Error fetching loan request', error: error.message });
    }
});

// ye wala route user ka status uodate karne ke liye hai
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const loan = await LoanModel.findByIdAndUpdate(id, { status }, { new: true });
        if (!loan) {
            return res.status(404).json({ error: true, message: 'Loan request not found' });
        }
        res.status(200).json({ error: false, message: 'Loan status updated successfully', loan });
    } catch (error) {
        res.status(500).json({ error: true, message: 'Error updating loan status', error: error.message });
    }
});

// ye route loan request delete krne ke liye hai
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const loan = await LoanModel.findByIdAndDelete(id);
        if (!loan) {
            return res.status(404).json({ success: false, message: 'Loan request not found' });
        }
        res.status(200).json({ success: true, message: 'Loan request deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting loan request', error: error.message });
    }
});

export default router;
