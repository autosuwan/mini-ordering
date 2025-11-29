import express from 'express';
import axios from 'axios';
import FormData from 'form-data';
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/verify', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const formData = new FormData();
        formData.append('file', req.file.buffer, {
            filename: req.file.originalname,
            contentType: req.file.mimetype,
        });

        const response = await axios.post('https://developer.easyslip.com/api/v1/verify', formData, {
            headers: {
                ...formData.getHeaders(),
                Authorization: `Bearer ${process.env.EASYSLIP_ACCESS_TOKEN}`,
            },
        });

        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('EasySlip Error:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({
            error: 'Verification failed',
            details: error.response?.data || error.message
        });
    }
});

export default router;