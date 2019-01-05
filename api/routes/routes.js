const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Budget = require('../models/budget');

//  GET - Show Budget
router.get('/', async (req, res, next) => {
    try {
        const docs = await Budget.find({});
        if (docs.length > 0) {
            res.status(200).json(docs);
        } else res.status(404).json({
            message: "No documents available"
        })
    } catch (error) {
        res.status(500).json({
            error: error,
            message: "No documents available"
        });
    }
});

//  POST - Add Budget Item
router.post('/', async (req, res, next) => {
    //  Gather the body elements
    const {
        name,
        amount,
        category,
        al_identifier
    } = req.body;

    //  Create new budget entry from data
    const budget = new Budget({
        _id: new mongoose.Types.ObjectId(),
        name,
        amount,
        category,
        al_identifier
    });
    //  Try to save the new budget item
    try {
        const budgetItem = await budget.save();
        res.status(201).json({
            message: "Item has been added",
            budget
        });
        next();
    } catch (error) {
        return error;
    }
});

//  PUT - Update Budget ITem
router.patch('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const updater = await Budget.findOneAndUpdate({
            _id: id
        }, req.body);
        if (updater != null) {
            res.status(200).json({
                message: "Item has been updated.",
                updated: req.body
            });
        } else {
            res.status(404).json({
                message: "ERROR: Item not found."
            });
        }

    } catch (error) {
        return error;
    }
});

//  DELETE - Remove Budget Item
router.delete('/:id', async (req, res, next) => {
    //  Try to remove the provided item
    try {
        const removeBudget = await Budget.findOneAndRemove({
            _id: req.params.id
        });
        if (removeBudget != null) {
            res.status(200).json({
                message: "Item has been removed from budget."
            });
        } else {
            res.status(404).json({
                message: "ERROR: Item not found."
            })
        }
    } catch (error) {
        return error;
    }
});

module.exports = router;