const Expense = require('../models/Expense');
const mongoose = require('mongoose');

// Get all expenses for user
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get single expense by id
exports.getExpense = async (req, res) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id, user: req.user });
    if (!expense) return res.status(404).json({ msg: 'Expense not found' });
    res.json(expense);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Create expense
exports.createExpense = async (req, res) => {
  try {
    const { amount, category, date, note } = req.body;
    const expense = new Expense({
      user: req.user,
      amount,
      category,
      date,
      note
    });
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update expense
exports.updateExpense = async (req, res) => {
  try {
    const { amount, category, date, note } = req.body;
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      { amount, category, date, note },
      { new: true }
    );
    if (!expense) return res.status(404).json({ msg: 'Expense not found' });
    res.json(expense);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Delete expense
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, user: req.user });
    if (!expense) return res.status(404).json({ msg: 'Expense not found' });
    res.json({ msg: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get category-wise summary
exports.getSummary = async (req, res) => {
  try {
    const summary = await Expense.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.user) } },
      { $group: { _id: '$category', total: { $sum: '$amount' } } },
      { $project: { category: '$_id', total: 1, _id: 0 } }
    ]);
    res.json(summary);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
