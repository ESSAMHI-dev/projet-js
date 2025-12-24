const express = require('express');

const {
    AddFacture,
    getAllFactures,
    getFacture,
    UpdateFacture,
    DeleteFacture
} = require('../controllers/FactureController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', protect, AddFacture);
router.get('/get', protect, getAllFactures);
router.get('/:id', protect, getFacture);
router.put('/:id', protect, UpdateFacture);
router.delete('/:id', protect, DeleteFacture);

module.exports = router;