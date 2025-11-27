import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const API_KEY = process.env.GRIST_API_KEY;
const DOC_ID = process.env.GRIST_DOC_ID;

// Proxy endpoint to fetch Grist attachments
router.get('/:attachmentId', async (req, res) => {
    try {
        const { attachmentId } = req.params;
        const url = `https://docs.getgrist.com/api/docs/${DOC_ID}/attachments/${attachmentId}/download`;

        // Fetch image from Grist with Authorization header
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            },
            responseType: 'arraybuffer'
        });

        // Forward the image to the client
        res.set('Content-Type', response.headers['content-type']);
        res.send(response.data);

    } catch (error) {
        console.error('Error fetching attachment:', error.message);
        res.status(404).send('Image not found');
    }
});

export default router;
