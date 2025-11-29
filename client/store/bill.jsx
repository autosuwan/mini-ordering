import Text from "../components/common/Text";
import Header from "../components/customer/Header";
import ImageButton from "../components/common/ImageButton";
import { useNavigate, useParams } from "react-router-dom";
import backIcon from "../assets/images/back_button.png";
import { usePayment } from "../context/PaymentContext";
import useGetStore from "../src/hook/useGetStore";
import useGetOrder from "../src/hook/useGetOrder";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import { getOrderItems } from "../src/api/orderItems";
import { getAllProducts } from "../src/api/products";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@heroui/react";

export default function Bill() {
    const navigate = useNavigate();
    const params = useParams();
    const { paymentData, clearPayment } = usePayment();
    const { storeId } = useCart();
    const { store, loading: storeLoading } = useGetStore(storeId);
    const { order, loading: orderLoading, error: orderError } = useGetOrder(params.order_id);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [orderItems, setOrderItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [itemsLoading, setItemsLoading] = useState(true);

    // Fetch order items and products
    useEffect(() => {
        if (!order || !order.items || !storeId) return;

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
                    getAllProducts(storeId)
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
    }, [order, storeId]);

    const handleFinish = () => {
        clearPayment();
        navigate('/');
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
                    onClick={() => navigate('/')}
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

    return (
        <div className="bg-white px-4 py-3 w-full min-h-screen">
            <Header />

            <div className="flex flex-col">
                <div className="flex items-center justify-center py-6 w-full relative">
                    <div className="absolute left-5">
                        {/* Disable back button or redirect to home to prevent re-submitting */}
                        <ImageButton src={backIcon} width={10} height={10} onClick={handleFinish}></ImageButton>
                    </div>
                    <div className="bg-[#E2FFB1] px-16 py-3 rounded-full">
                        <Text className="text-black font-normal">ใบเสร็จ</Text>
                    </div>
                </div>

                {/* Payment Success Message */}
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 text-center">
                    <Text className="font-bold">ชำระเงินมัดจำสำเร็จ!</Text>
                    <Text className="text-sm">ขอบคุณที่ใช้บริการครับ</Text>
                </div>
                <div className="flex justify-end">
                    <Text className="text-2xl font-bold pt-5 pb-3 pr-3">รหัสออเดอร์: ${params.order_id}</Text>
                </div>

                {/* Order Information */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex justify-between mb-2">
                        <Text className="text-gray-600 text-sm">ร้านค้า:</Text>
                        <Text className="text-black font-bold text-sm">{store?.store_name || "Loading..."}</Text>
                    </div>
                    <div className="flex justify-between mb-2">
                        <Text className="text-gray-600 text-sm">เวลาที่สั่ง:</Text>
                        <Text className="text-black text-sm">{orderTime}</Text>
                    </div>
                    <div className="flex justify-between mb-2">
                        <Text className="text-gray-600 text-sm">ชื่อลูกค้า:</Text>
                        <Text className="text-black text-sm">{order.customer_name || "-"}</Text>
                    </div>
                    <div className="flex justify-between mb-2">
                        <Text className="text-gray-600 text-sm">เบอร์โทร:</Text>
                        <Text className="text-black text-sm">{order.customer_phone || "-"}</Text>
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
                    <Text className="text-black font-bold text-lg mb-3">รายการที่สั่ง</Text>
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
                    <div className="flex justify-between mb-3 pb-3 border-b border-gray-300">
                        <Text className="text-black font-bold">ยอดรวมทั้งหมด</Text>
                        <Text className="text-black font-bold text-lg">{order.total_price} บาท</Text>
                    </div>
                    <div className="flex justify-between mb-2">
                        <Text className="text-green-600 font-normal">ชำระแล้ว (มัดจำ {depositPercent}%)</Text>
                        <Text className="text-green-600 font-bold">{depositAmount} บาท</Text>
                    </div>
                    <div className="flex justify-between">
                        <Text className="text-red-600 font-normal">ยอดคงเหลือที่ต้องชำระ</Text>
                        <Text className="text-red-600 font-bold text-lg">{remainingAmount} บาท</Text>
                    </div>
                </div>

                {/* Slip Info (Optional Debug) */}
                {/* <div className="mb-4 p-2 bg-gray-100 rounded text-xs overflow-auto">
                    <pre>{JSON.stringify(paymentData, null, 2)}</pre>
                </div> */}

                {/* Note */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                    <Text className="text-yellow-800 text-sm text-center">
                        กรุณาชำระยอดคงเหลือ {remainingAmount} บาท เมื่อรับสินค้า
                    </Text>
                </div>

                {/* Action Button */}
                <Text className="text-red-600 text-center">* กรุณาบันทึกภาพใบเสร็จเพื่อใช้เป็นหนักฐานในการรับสินค้า</Text>
                <div className="flex justify-center pt-4 pb-8">
                    <Button
                        onPress={onOpen}
                        className="bg-[#E2FFB1] px-16 py-3 rounded-full border-black border"
                    >
                        <Text className="text-black font-normal">เสร็จสิ้น</Text>
                    </Button>
                </div>

                {/* Confirmation Modal */}
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">
                                    <Text className="text-xl font-bold">ยืนยันการเสร็จสิ้น</Text>
                                </ModalHeader>
                                <ModalBody>
                                    <Text>คุณได้บันทึกภาพใบเสร็จเรียบร้อยแล้วใช่หรือไม่?</Text>
                                    <Text className="text-red-600 text-sm">
                                        * สามารถใช้รหัสออเดอร์ในการดูใบเสร็จอีกครั้ง
                                    </Text>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        ยกเลิก
                                    </Button>
                                    <Button
                                        color="primary"
                                        onPress={() => {
                                            handleFinish();
                                            onClose();
                                        }}
                                    >
                                        ยืนยัน
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
        </div>
    );
}