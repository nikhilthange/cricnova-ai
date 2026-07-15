import express from 'express';
const router = express.Router();
const adminController = require('../controllers/admin.controller');

// @route   GET /api/admin/dashboard
// @desc    Get all admin dashboard statistics, analytics, and logs
// @access  Public (for demo purposes, would normally require admin middleware)
router.get('/dashboard', adminController.getDashboardData);

module.exports = router;
