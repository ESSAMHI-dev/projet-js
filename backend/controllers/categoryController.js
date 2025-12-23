const { body, validationResult } = require("express-validator");
const Category = require("../models/Category");

// Validation rules
const categoryValidation = [
    body("name").trim().notEmpty().withMessage("Category name is required"),
    body("type").isIn(['income', 'expense']).withMessage("Type must be 'income' or 'expense'"),
    body("color").optional().isString()
];

// Create category
exports.createCategory = [
    ...categoryValidation,
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
            const { name, type, color } = req.body;
            const userId = req.user.id;

            const newCategory = new Category({
                name,
                type,
                color: color || '#000000',
                user: userId
            });

            await newCategory.save();

            return res.status(201).json({
                success: true,
                data: newCategory,
                message: "Category created successfully"
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

// Get all categories
exports.getCategories = async (req, res) => {
    try {
        const userId = req.user.id;
        const { page = 1, limit = 10, type } = req.query;

        const query = { user: userId };
        if (type) {
            query.type = type;
        }

        const categories = await Category.find(query)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const count = await Category.countDocuments(query);

        return res.status(200).json({
            success: true,
            data: categories,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            message: "Categories retrieved successfully"
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: "Server error", 
            error: error.message 
        });
    }
};

// Get single category
exports.getCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ 
                success: false, 
                message: "Category not found" 
            });
        }

        // Check ownership
        if (category.user.toString() !== req.user.id) {
            return res.status(403).json({ 
                success: false, 
                message: "Not authorized to access this category" 
            });
        }

        return res.status(200).json({
            success: true,
            data: category,
            message: "Category retrieved successfully"
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: "Server error", 
            error: error.message 
        });
    }
};

// Update category
exports.updateCategory = [
    ...categoryValidation,
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
            const category = await Category.findById(req.params.id);

            if (!category) {
                return res.status(404).json({ 
                    success: false, 
                    message: "Category not found" 
                });
            }

            // Check ownership
            if (category.user.toString() !== req.user.id) {
                return res.status(403).json({ 
                    success: false, 
                    message: "Not authorized to update this category" 
                });
            }

            const { name, type, color } = req.body;
            category.name = name;
            category.type = type;
            if (color) category.color = color;

            await category.save();

            return res.status(200).json({
                success: true,
                data: category,
                message: "Category updated successfully"
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

// Delete category
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ 
                success: false, 
                message: "Category not found" 
            });
        }

        // Check ownership
        if (category.user.toString() !== req.user.id) {
            return res.status(403).json({ 
                success: false, 
                message: "Not authorized to delete this category" 
            });
        }

        await Category.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Category deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: "Server error", 
            error: error.message 
        });
    }
};
