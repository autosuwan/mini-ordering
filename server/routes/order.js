import express from 'express';
import { fetchTableData } from '../services/grist.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const order = await fetchTableData('Orders');
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders" });
    }
})