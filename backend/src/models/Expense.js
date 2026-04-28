const mongoose = require('mongoose');
const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Bills', 'Health', 'Entertainment', 'Other'];

const ExpenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0.01
  },
  category: {
    type: String,
    required: true,
    enum: CATEGORIES
  },
  date: {
    type: Date,
    required: true
  },
  note: {
    type: String,
    maxlength: 200,
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Expense', ExpenseSchema);
