import Text from "../common/Text";
import { useNavigate } from "react-router-dom";

export default function OrderBox({ order, store_id }) {

    const navigate = useNavigate();

    const orderTime = order.created_at
        ? new Date(order.created_at).toLocaleString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
        : '-';

    return (
        <div className="flex flex-row mx-auto gap-4">
            <div className="flex items-center bg-white border w-max border-gray-300 pl-4 pr-10 py-4 rounded-lg">
                <div className="flex flex-col gap-4">
                    <Text className="text-base font-bold text-black">{order.order_id}</Text>
                    <Text className="text-sm text-black">วันที่สร้างออเดอร์ : {orderTime}</Text>
                </div>
            </div>
            <button onClick={() => navigate(`/seller/${store_id}/bill/${order.order_id}`)} className="flex items-center bg-[#F4E4A6] px-4 py-2 rounded-lg border border-black">
                <Text className="text-sm text-black font-bold">ตรวจสอบ</Text>
            </button>
        </div>
    );
}
