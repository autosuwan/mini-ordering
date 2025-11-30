import Text from "../../components/common/Text";
import Header from "../../components/seller/Header";
import ImageButton from "../../components/common/ImageButton";
import { useNavigate, useParams } from "react-router-dom";
import backIcon from "../../assets/images/back_button.png";
import useGetStore from "../../src/hook/useGetStore";
import useGetOrder from "../../src/hook/useGetOrder";
import { useState, useEffect } from "react";
import { getOrderItems } from "../../src/api/orderItems";
import { getAllProducts } from "../../src/api/products";

export default function SellerBill() {
    const navigate = useNavigate();
    const { order_id, store_id } = useParams();
    const { store, loading: storeLoading } = useGetStore(store_id);
    const { order, loading: orderLoading, error: orderError } = useGetOrder(order_id);

    const [orderItems, setOrderItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [itemsLoading, setItemsLoading] = useState(true);

    // Fetch order items and products
    useEffect(() => {
        if (!order || !order.items || !store_id) return;

        const fetchData = async () => {
            try {
                setItemsLoading(true);

                // Extract item IDs from the reference list ["L", id1, id2, ...]
                const itemIds = Array.isArray(order.items) && order.items[0] === "L"
                    ? order.items.slice(1)
                    : order.items;

                // Fetch order items and products in parallel
                const [items, prods] = await Promise.all([
                    getOrderItems(itemIds),
                    getAllProducts(store_id)
                ]);

                setOrderItems(items);
                setProducts(prods);
            } catch (error) {
                console.error("Error fetching order details:", error);
            } finally {
                setItemsLoading(false);
            }
        };

        fetchData();
    }, [order, store_id]);

    const handleBack = () => {
        navigate(`/seller/${store_id}`);
    };

    // Show loading state
    if (orderLoading || storeLoading || itemsLoading) {
        return (
            <div className="bg-white px-4 py-3 w-full min-h-screen flex flex-col items-center justify-center">
                <Text className="text-gray-600">กำลังโหลดข้อมูล...</Text>
            </div>
        );
    }

    // Show error state
    if (orderError || !order) {
        return (
            <div className="bg-white px-4 py-3 w-full min-h-screen flex flex-col items-center justify-center">
                <Text className="text-red-500 mb-4">ไม่พบข้อมูลคำสั่งซื้อ</Text>
                <button
                    onClick={handleBack}
                    className="bg-[#FFD7CC] px-8 py-2 rounded-full border-black border"
                >
                    <Text className="text-black">กลับหน้าหลัก</Text>
                </button>
            </div>
        );
    }

    // Calculate totals
    const totalAmount = order.total_price || 0;
    const depositPercent = 50;
    const depositAmount = Math.round(totalAmount * 0.5 * 100) / 100;
    const remainingAmount = totalAmount - depositAmount;

    // Format order time
    const orderTime = order.created_at
        ? new Date(order.created_at).toLocaleString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
        : '-';

    // Map order items with product details
    const itemsWithDetails = orderItems.map(item => {
        const product = products.find(p => p.id === item.product_id);
        return {
            ...item,
            name: product?.product_name || "Unknown Product",
            productPrice: product?.price || 0
        };
    });

    // Determine order status badge
    const getStatusBadge = () => {
        const status = order.status || "pending";
        const statusConfig = {
            pending: { bg: "bg-yellow-100", text: "text-yellow-800", label: "รอดำเนินการ" },
            confirmed: { bg: "bg-blue-100", text: "text-blue-800", label: "ยืนยันแล้ว" },
            completed: { bg: "bg-green-100", text: "text-green-800", label: "เสร็จสิ้น" },
            cancelled: { bg: "bg-red-100", text: "text-red-800", label: "ยกเลิก" }
        };

        const config = statusConfig[status] || statusConfig.pending;

        return (
            <div className={`${config.bg} ${config.text} px-4 py-2 rounded-full inline-block`}>
                <Text className={`${config.text} font-bold text-sm`}>{config.label}</Text>
            </div>
        );
    };

    return (
        <div className="bg-white px-4 py-3 w-full min-h-screen">
            {store_id && (
                <Header store_name={store?.store_name} />
            )}

            <div className="flex flex-col">
                <div className="flex items-center justify-center py-6 w-full relative">
                    <div className="absolute left-5">
                        <ImageButton src={backIcon} width={10} height={10} onClick={handleBack}></ImageButton>
                    </div>
                    <div className="bg-[#F4E4A6] px-16 py-3 rounded-full">
                        <Text className="text-black font-normal">รายละเอียดออเดอร์</Text>
                    </div>
                </div>

                {/* Order Status */}
                <div className="flex justify-center mb-4">
                    {getStatusBadge()}
                </div>

                <div className="flex justify-end">
                    <Text className="text-2xl font-bold pt-5 pb-3 pr-3">รหัสออเดอร์: #{order_id}</Text>
                </div>

                {/* Customer Information */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <Text className="text-black font-bold text-lg mb-3">ข้อมูลลูกค้า</Text>
                    <div className="flex justify-between mb-2">
                        <Text className="text-gray-600 text-sm">ชื่อลูกค้า:</Text>
                        <Text className="text-black font-bold text-sm">{order.customer_name || "-"}</Text>
                    </div>
                    <div className="flex justify-between mb-2">
                        <Text className="text-gray-600 text-sm">เบอร์โทร:</Text>
                        <Text className="text-black text-sm">{order.customer_phone || "-"}</Text>
                    </div>
                    <div className="flex justify-between mb-2">
                        <Text className="text-gray-600 text-sm">เวลาที่สั่ง:</Text>
                        <Text className="text-black text-sm">{orderTime}</Text>
                    </div>
                    {order.note && (
                        <div className="mt-3 pt-3 border-t border-gray-300">
                            <Text className="text-gray-600 text-sm mb-1">หมายเหตุ:</Text>
                            <Text className="text-black text-sm">{order.note}</Text>
                        </div>
                    )}
                </div>

                {/* Order Items */}
                <div className="mb-4">
                    <Text className="text-black font-bold text-lg mb-3">รายการสินค้า</Text>
                    <div className="bg-white border border-gray-200 rounded-lg">
                        {itemsWithDetails.map((item, index) => (
                            <div
                                key={index}
                                className={`flex justify-between items-center p-4 ${index !== itemsWithDetails.length - 1 ? 'border-b border-gray-200' : ''}`}
                            >
                                <div className="flex-1">
                                    <Text className="text-black font-normal">{item.name} x{item.quantity}</Text>
                                    <Text className="text-gray-500 text-sm">{item.price} บาท/ชิ้น</Text>
                                </div>
                                <Text className="text-black font-bold">{item.price * item.quantity} บาท</Text>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Payment Summary */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <Text className="text-black font-bold text-lg mb-3">สรุปยอดเงิน</Text>
                    <div className="flex justify-between mb-3 pb-3 border-b border-gray-300">
                        <Text className="text-black font-bold">ยอดรวมทั้งหมด</Text>
                        <Text className="text-black font-bold text-lg">{totalAmount} บาท</Text>
                    </div>
                    <div className="flex justify-between mb-2">
                        <Text className="text-green-600 font-normal">รับมัดจำแล้ว ({depositPercent}%)</Text>
                        <Text className="text-green-600 font-bold">{depositAmount} บาท</Text>
                    </div>
                    <div className="flex justify-between">
                        <Text className="text-red-600 font-normal">ยอดคงเหลือที่ต้องรับ</Text>
                        <Text className="text-red-600 font-bold text-lg">{remainingAmount} บาท</Text>
                    </div>
                </div>

                {/* Payment Note */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                    <Text className="text-blue-800 text-sm text-center font-bold">
                        💰 เก็บเงินคงเหลือ {remainingAmount} บาท เมื่อส่งมอบสินค้า
                    </Text>
                </div>
            </div>
        </div>
    );
}
