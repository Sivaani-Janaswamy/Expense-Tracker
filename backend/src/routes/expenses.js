const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const auth = require('../middleware/auth');

// All routes require authentication
router.use(auth);

// GET /api/expenses - list all
router.get('/', expenseController.getExpenses);

// GET /api/expenses/summary - category summary
router.get('/summary', expenseController.getSummary);

// GET /api/expenses/:id - get one
router.get('/:id', expenseController.getExpense);

// POST /api/expenses - create
router.post(
  '/',
  [
    body('amount').isNumeric().withMessage('Amount required'),
    body('category').notEmpty().withMessage('Category required'),
    body('date').notEmpty().withMessage('Date required'),
  ],
  expenseController.createExpense
);

// PUT /api/expenses/:id - update
router.put(
  '/:id',
  [
    body('amount').optional().isNumeric(),
    body('category').optional().notEmpty(),
    body('date').optional().notEmpty(),
  ],
  expenseController.updateExpense
);

// DELETE /api/expenses/:id - delete
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;
