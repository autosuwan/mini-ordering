import Text from "../components/common/Text";
import Header from "../components/customer/Header";
import ImageButton from "../components/common/ImageButton";
import { useNavigate } from "react-router-dom";
import backIcon from "../assets/images/back_button.png";

export default function Bill() {
    const navigate = useNavigate();

    // Mock data - ในอนาคตจะดึงจาก API หรือ state management
    const orderNumber = "ORD-2025-001";
    const orderTime = new Date().toLocaleString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    const customerName = "สมชาย ใจดี";
    const customerPhone = "081-234-5678";
    const customerNote = "ขอเพิ่มน้ำตาลด้วยครับ";
    const items = [
        { name: "ฮิโอะบัง", quantity: 2, price: 100, total: 200 },
        { name: "ขนมปัง", quantity: 1, price: 50, total: 50 },
    ];
    const totalAmount = items.reduce((sum, item) => sum + item.total, 0);
    const depositPercent = 50;
    const depositAmount = (totalAmount * depositPercent) / 100;
    const remainingAmount = totalAmount - depositAmount;

    return (
        <div className="bg-white px-4 py-3 w-full min-h-screen">
            <Header />

            <div className="flex flex-col">
                <div className="flex items-center justify-center py-6 w-full relative">
                    <div className="absolute left-5">
                        <ImageButton src={backIcon} width={10} height={10} onClick={() => navigate('/')}></ImageButton>
                    </div>
                    <div className="bg-[#E2FFB1] px-16 py-3 rounded-full">
                        <Text className="text-black font-normal">ใบเสร็จ</Text>
                    </div>
                </div>

                {/* Order Information */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex justify-between mb-2">
                        <Text className="text-gray-600 text-sm">หมายเลขคำสั่งซื้อ:</Text>
                        <Text className="text-black font-bold text-sm">{orderNumber}</Text>
                    </div>
                    <div className="flex justify-between mb-2">
                        <Text className="text-gray-600 text-sm">เวลาที่สั่ง:</Text>
                        <Text className="text-black text-sm">{orderTime}</Text>
                    </div>
                    <div className="flex justify-between mb-2">
                        <Text className="text-gray-600 text-sm">ชื่อ:</Text>
                        <Text className="text-black text-sm">{customerName}</Text>
                    </div>
                    <div className="flex justify-between mb-2">
                        <Text className="text-gray-600 text-sm">เบอร์โทร:</Text>
                        <Text className="text-black text-sm">{customerPhone}</Text>
                    </div>
                    {customerNote && (
                        <div className="mt-3 pt-3 border-t border-gray-300">
                            <Text className="text-gray-600 text-sm mb-1">หมายเหตุ:</Text>
                            <Text className="text-black text-sm">{customerNote}</Text>
                        </div>
                    )}
                </div>

                {/* Order Items */}
                <div className="mb-4">
                    <Text className="text-black font-bold text-lg mb-3">รายการที่สั่ง</Text>
                    <div className="bg-white border border-gray-200 rounded-lg">
                        {items.map((item, index) => (
                            <div
                                key={index}
                                className={`flex justify-between items-center p-4 ${index !== items.length - 1 ? 'border-b border-gray-200' : ''}`}
                            >
                                <div className="flex-1">
                                    <Text className="text-black font-normal">{item.name} x{item.quantity}</Text>
                                    <Text className="text-gray-500 text-sm">{item.price} บาท/ชิ้น</Text>
                                </div>
                                <Text className="text-black font-bold">{item.total} บาท</Text>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Payment Summary */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex justify-between mb-3 pb-3 border-b border-gray-300">
                        <Text className="text-black font-bold">ยอดรวมทั้งหมด</Text>
                        <Text className="text-black font-bold text-lg">{totalAmount} บาท</Text>
                    </div>
                    <div className="flex justify-between mb-2">
                        <Text className="text-green-600 font-normal">มัดจำ ({depositPercent}%)</Text>
                        <Text className="text-green-600 font-bold">{depositAmount} บาท</Text>
                    </div>
                    <div className="flex justify-between">
                        <Text className="text-red-600 font-normal">ยอดคงเหลือ</Text>
                        <Text className="text-red-600 font-bold text-lg">{remainingAmount} บาท</Text>
                    </div>
                </div>

                {/* Note */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                    <Text className="text-yellow-800 text-sm text-center">
                        กรุณาชำระยอดคงเหลือเมื่อรับสินค้า
                    </Text>
                </div>

                {/* Action Button */}
                <div className="flex justify-center pt-4">
                    <button
                        onClick={() => navigate('/')}
                        className="bg-[#E2FFB1] px-16 py-3 rounded-full border-black border"
                    >
                        <Text className="text-black font-normal">กลับหน้าหลัก</Text>
                    </button>
                </div>
            </div>
        </div>
    );
}