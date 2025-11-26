import express from "express";
import { fetchTableData } from "../services/grist.js";

const router = express.Router();

// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await fetchTableData('Users');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});

// GET user by ID
router.get('/:id', async (req, res) => {
    try {
        const users = await fetchTableData('Users');
        const user = users.find(u => u.id == req.params.id);
        
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user' });
    }
});

export default router;