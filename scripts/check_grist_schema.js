import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const API_KEY = process.env.GRIST_API_KEY;
const DOC_ID = process.env.GRIST_DOC_ID;
const BASE_URL = `https://docs.getgrist.com/api/docs/${DOC_ID}/tables`;

async function checkTable(tableName) {
    try {
        console.log(`Checking table: ${tableName}`);
        const response = await axios.get(`${BASE_URL}/${tableName}/columns`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });

        console.log(`Columns in ${tableName}:`);
        response.data.columns.forEach(col => {
            console.log(`- ${col.id} (${col.type})`);
        });
    } catch (error) {
        console.error(`Error checking ${tableName}:`, error.response?.data || error.message);
    }
}

async function main() {
    await checkTable('Orders');
    await checkTable('OrderItems');
}

main();
