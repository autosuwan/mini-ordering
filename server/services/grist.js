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

// ฟังก์ชันแปลง Grist attachment เป็น URL
const convertAttachmentToUrl = (attachment, tableName, recordId, columnName) => {
  if (!attachment || !Array.isArray(attachment) || attachment.length === 0) {
    return null;
  }

  // Grist attachment format: [attachmentId, ...]
  const attachmentId = attachment[1]; // attachment[0] is usually "L", attachment[1] is the ID

  if (!attachmentId) return null;

  // Use local proxy endpoint instead of direct Grist URL
  return `/api/attachments/${attachmentId}`;
};

// ฟังก์ชันดึงข้อมูลจาก Table
export const fetchTableData = async (tableName) => {
  try {
    const response = await gristClient.get(`${BASE_URL}/${tableName}/records`);

    // Grist ส่งข้อมูลมาซับซ้อน เราต้องแปลงให้ใช้ง่ายๆ
    // จาก: { records: [{ id: 1, fields: { name: "..." } }] }
    // เป็น: [{ id: 1, name: "..." }]
    return response.data.records.map(record => {
      const fields = { ...record.fields };

      // แปลง product_image attachment เป็น URL
      if (fields.product_image && Array.isArray(fields.product_image)) {
        fields.product_image = convertAttachmentToUrl(
          fields.product_image,
          tableName,
          record.id,
          'product_image'
        );
      }

      return {
        id: record.id,
        ...fields
      };
    });
  } catch (error) {
    console.error(`Error fetching ${tableName}:`, error.message);
    return []; // ถ้า error ให้ส่ง array ว่างกลับไป
  }
};

// ฟังก์ชันเพิ่มข้อมูลลง Table
export const addRecords = async (tableName, records) => {
  try {
    // Grist expects format: { records: [{ fields: { ... } }] }
    const payload = {
      records: records.map(record => ({ fields: record }))
    };

    const response = await gristClient.post(`${BASE_URL}/${tableName}/records`, payload);

    // Response format: { records: [{ id: 1 }, { id: 2 }] }
    return response.data.records.map(r => r.id);
  } catch (error) {
    console.error(`Error adding records to ${tableName}:`, error.response?.data || error.message);
    throw error;
  }
};