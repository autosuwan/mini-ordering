import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// ดึงค่า Key จากไฟล์ .env
const API_KEY = process.env.GRIST_API_KEY;
const DOC_ID = process.env.GRIST_DOC_ID;
const BASE_URL = `https://docs.getgrist.com/api/docs/${DOC_ID}/tables`;

// ตั้งค่า axios ให้แนบ Key ไปทุกครั้ง
const gristClient = axios.create({
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  }
});

// ฟังก์ชันดึงข้อมูลจาก Table
export const fetchTableData = async (tableName) => {
  try {
    const response = await gristClient.get(`${BASE_URL}/${tableName}/records`);
    
    // Grist ส่งข้อมูลมาซับซ้อน เราต้องแปลงให้ใช้ง่ายๆ
    // จาก: { records: [{ id: 1, fields: { name: "..." } }] }
    // เป็น: [{ id: 1, name: "..." }]
    return response.data.records.map(record => ({
      id: record.id,
      ...record.fields
    }));
  } catch (error) {
    console.error(`Error fetching ${tableName}:`, error.message);
    return []; // ถ้า error ให้ส่ง array ว่างกลับไป
  }
};