const { body, validationResult } = require("express-validator");
const Budget = require("../models/Budget");
const Category = require("../models/Category");

// Validation rules
const budgetValidation = [
    body("category").notEmpty().withMessage("Category is required"),
    body("period").isIn(['monthly', 'weekly']).withMessage("Period must be 'monthly' or 'weekly'"),
    body("amount").isNumeric().withMessage("Amount must be a number").isFloat({ min: 0 }).withMessage("Amount must be positive"),
    body("startDate").isISO8601().withMessage("Valid start date is required"),
    body("endDate").isISO8601().withMessage("Valid end date is required")
];

// Create budget
exports.createBudget = [
    ...budgetValidation,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false, 
                message: "Validation failed", 
                errors: errors.array() 
            });
        }

        try {
            const { category, period, amount, startDate, endDate } = req.body;
            const userId = req.user.id;

            // Verify category exists and belongs to user
            const categoryDoc = await Category.findById(category);
            if (!categoryDoc) {
                return res.status(404).json({ 
                    success: false, 
                    message: "Category not found" 
                });
            }

            if (categoryDoc.user.toString() !== userId) {
                return res.status(403).json({ 
                    success: false, 
                    message: "Not authorized to use this category" 
                });
            }

            const newBudget = new Budget({
                user: userId,
                category,
                period,
                amount,
                startDate: new Date(startDate),
                endDate: new Date(endDate)
            });

            await newBudget.save();
            await newBudget.populate('category');

            return res.status(201).json({
                success: true,
                data: newBudget,
                message: "Budget created successfully"
            });
        } catch (error) {
            return res.status(500).json({ 
                success: false, 
                message: "Server error", 
                error: error.message 
            });
        }
    }
];

// Get all budgets
exports.getBudgets = async (req, res) => {
    try {
        const userId = req.user.id;
        const { page = 1, limit = 10, period } = req.query;

        const query = { user: userId };
        if (period) {
            query.period = period;
        }

        const budgets = await Budget.find(query)
            .populate('category')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const count = await Budget.countDocuments(query);

        return res.status(200).json({
            success: true,
            data: budgets,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            message: "Budgets retrieved successfully"
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: "Server error", 
            error: error.message 
        });
    }
};

// Get single budget
exports.getBudget = async (req, res) => {
    try {
        const budget = await Budget.findById(req.params.id).populate('category');

        if (!budget) {
            return res.status(404).json({ 
                success: false, 
                message: "Budget not found" 
            });
        }

        // Check ownership
        if (budget.user.toString() !== req.user.id) {
            return res.status(403).json({ 
                success: false, 
                message: "Not authorized to access this budget" 
            });
        }

        return res.status(200).json({
            success: true,
            data: budget,
            message: "Budget retrieved successfully"
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: "Server error", 
            error: error.message 
        });
    }
};

// Update budget
exports.updateBudget = [
    ...budgetValidation,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false, 
                message: "Validation failed", 
                errors: errors.array() 
            });
        }

        try {
            const budget = await Budget.findById(req.params.id);

            if (!budget) {
                return res.status(404).json({ 
                    success: false, 
                    message: "Budget not found" 
                });
            }

            // Check ownership
            if (budget.user.toString() !== req.user.id) {
                return res.status(403).json({ 
                    success: false, 
                    message: "Not authorized to update this budget" 
                });
            }

            const { category, period, amount, startDate, endDate } = req.body;

            // Verify category exists and belongs to user
            const categoryDoc = await Category.findById(category);
            if (!categoryDoc) {
                return res.status(404).json({ 
                    success: false, 
                    message: "Category not found" 
                });
            }

            if (categoryDoc.user.toString() !== req.user.id) {
                return res.status(403).json({ 
                    success: false, 
                    message: "Not authorized to use this category" 
                });
            }

            budget.category = category;
            budget.period = period;
            budget.amount = amount;
            budget.startDate = new Date(startDate);
            budget.endDate = new Date(endDate);

            await budget.save();
            await budget.populate('category');

            return res.status(200).json({
                success: true,
                data: budget,
                message: "Budget updated successfully"
            });
        } catch (error) {
            return res.status(500).json({ 
                success: false, 
                message: "Server error", 
                error: error.message 
            });
        }
    }
];

// Delete budget
exports.deleteBudget = async (req, res) => {
    try {
        const budget = await Budget.findById(req.params.id);

        if (!budget) {
            return res.status(404).json({ 
                success: false, 
                message: "Budget not found" 
            });
        }

        // Check ownership
        if (budget.user.toString() !== req.user.id) {
            return res.status(403).json({ 
                success: false, 
                message: "Not authorized to delete this budget" 
            });
        }

        await Budget.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Budget deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: "Server error", 
            error: error.message 
        });
    }
};
