import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/products.js';
import userRoutes from './routes/users.js';
import attachmentRoutes from './routes/attachments.js';
import storeRoutes from './routes/store.js';
import easyslipRoutes from './easyslip/api/route.js';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/attachments', attachmentRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/easyslip', easyslipRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});