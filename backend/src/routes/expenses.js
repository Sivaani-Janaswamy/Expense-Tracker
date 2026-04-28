const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Bills', 'Health', 'Entertainment', 'Other'];
const getToday = () => {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
};

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
    body('amount').isFloat({ gt: 0 }).withMessage('Amount must be greater than 0'),
    body('category').isIn(CATEGORIES).withMessage('Category is invalid'),
    body('date').isISO8601().withMessage('Date must be a valid date').custom((value) => {
      if (value > getToday()) {
        throw new Error('Date cannot be in the future');
      }
      return true;
    }),
    body('note').optional().isLength({ max: 200 }).withMessage('Note cannot exceed 200 characters'),
  ],
  validate,
  expenseController.createExpense
);

// PUT /api/expenses/:id - update
router.put(
  '/:id',
  [
    body('amount').optional().isFloat({ gt: 0 }).withMessage('Amount must be greater than 0'),
    body('category').optional().isIn(CATEGORIES).withMessage('Category is invalid'),
    body('date').optional().isISO8601().withMessage('Date must be a valid date').custom((value) => {
      if (value > getToday()) {
        throw new Error('Date cannot be in the future');
      }
      return true;
    }),
    body('note').optional().isLength({ max: 200 }).withMessage('Note cannot exceed 200 characters'),
  ],
  validate,
  expenseController.updateExpense
);

// DELETE /api/expenses/:id - delete
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;
