const { body, validationResult } = require("express-validator");
const Recurring = require("../models/Recurring");
const Category = require("../models/Category");

// Validation rules
const recurringValidation = [
    body("type").isIn(['income', 'expense']).withMessage("Type must be 'income' or 'expense'"),
    body("amount").isNumeric().withMessage("Amount must be a number").isFloat({ min: 0 }).withMessage("Amount must be positive"),
    body("frequency").isIn(['daily', 'weekly', 'monthly', 'yearly']).withMessage("Invalid frequency"),
    body("nextRun").isISO8601().withMessage("Valid next run date is required"),
    body("category").optional().isMongoId().withMessage("Invalid category ID"),
    body("description").optional().isString(),
    body("active").optional().isBoolean()
];

// Create recurring transaction
exports.createRecurring = [
    ...recurringValidation,
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
            const { type, amount, frequency, nextRun, category, description, active } = req.body;
            const userId = req.user.id;

            // Verify category if provided
            if (category) {
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
            }

            const newRecurring = new Recurring({
                user: userId,
                type,
                amount,
                frequency,
                nextRun: new Date(nextRun),
                category,
                description,
                active: active !== undefined ? active : true
            });

            await newRecurring.save();
            await newRecurring.populate('category');

            return res.status(201).json({
                success: true,
                data: newRecurring,
                message: "Recurring transaction created successfully"
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

// Get all recurring transactions
exports.getRecurring = async (req, res) => {
    try {
        const userId = req.user.id;
        const { page = 1, limit = 10, type, active } = req.query;

        const query = { user: userId };
        if (type) {
            query.type = type;
        }
        if (active !== undefined) {
            query.active = active === 'true';
        }

        const recurring = await Recurring.find(query)
            .populate('category')
            .sort({ nextRun: 1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const count = await Recurring.countDocuments(query);

        return res.status(200).json({
            success: true,
            data: recurring,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            message: "Recurring transactions retrieved successfully"
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: "Server error", 
            error: error.message 
        });
    }
};

// Get single recurring transaction
exports.getRecurringById = async (req, res) => {
    try {
        const recurring = await Recurring.findById(req.params.id).populate('category');

        if (!recurring) {
            return res.status(404).json({ 
                success: false, 
                message: "Recurring transaction not found" 
            });
        }

        // Check ownership
        if (recurring.user.toString() !== req.user.id) {
            return res.status(403).json({ 
                success: false, 
                message: "Not authorized to access this recurring transaction" 
            });
        }

        return res.status(200).json({
            success: true,
            data: recurring,
            message: "Recurring transaction retrieved successfully"
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: "Server error", 
            error: error.message 
        });
    }
};

// Update recurring transaction
exports.updateRecurring = [
    ...recurringValidation,
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
            const recurring = await Recurring.findById(req.params.id);

            if (!recurring) {
                return res.status(404).json({ 
                    success: false, 
                    message: "Recurring transaction not found" 
                });
            }

            // Check ownership
            if (recurring.user.toString() !== req.user.id) {
                return res.status(403).json({ 
                    success: false, 
                    message: "Not authorized to update this recurring transaction" 
                });
            }

            const { type, amount, frequency, nextRun, category, description, active } = req.body;

            // Verify category if provided
            if (category) {
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
            }

            recurring.type = type;
            recurring.amount = amount;
            recurring.frequency = frequency;
            recurring.nextRun = new Date(nextRun);
            recurring.category = category;
            recurring.description = description;
            if (active !== undefined) recurring.active = active;

            await recurring.save();
            await recurring.populate('category');

            return res.status(200).json({
                success: true,
                data: recurring,
                message: "Recurring transaction updated successfully"
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

// Delete recurring transaction
exports.deleteRecurring = async (req, res) => {
    try {
        const recurring = await Recurring.findById(req.params.id);

        if (!recurring) {
            return res.status(404).json({ 
                success: false, 
                message: "Recurring transaction not found" 
            });
        }

        // Check ownership
        if (recurring.user.toString() !== req.user.id) {
            return res.status(403).json({ 
                success: false, 
                message: "Not authorized to delete this recurring transaction" 
            });
        }

        await Recurring.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Recurring transaction deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: "Server error", 
            error: error.message 
        });
    }
};
