import Header from "../../components/seller/Header";
import Text from "../../components/common/Text";
import useGetStore from "../../src/hook/useGetStore";
import { useParams } from "react-router-dom";
import useGetAllOrder from "../../src/hook/useGetAllOrder";
import OrderBox from "../../components/seller/OrderBox";
import { DatePicker } from "@heroui/react";
import { useState, useMemo, useEffect } from "react";
import { CalendarDate } from "@internationalized/date";


function SellerHome() {
    const { store_id } = useParams();
    const { store, loading: storeLoading } = useGetStore(store_id);
    const { orders, loading: ordersLoading } = useGetAllOrder(store_id);
    const [selectedDate, setSelectedDate] = useState(null);

    // Set default date to today
    useEffect(() => {
        const today = new Date();
        setSelectedDate(new CalendarDate(
            today.getFullYear(),
            today.getMonth() + 1, // JavaScript months are 0-indexed
            today.getDate()
        ));
    }, []);

    // Filter orders by selected date
    const filteredOrders = useMemo(() => {
        if (!selectedDate) {
            return orders;
        }

        // Convert selected date to comparable format (YYYY-MM-DD)
        const selectedDateStr = `${selectedDate.year}-${String(selectedDate.month).padStart(2, '0')}-${String(selectedDate.day).padStart(2, '0')}`;

        return orders.filter((order) => {
            // Assuming order has a created_at or order_date field
            const orderDate = new Date(order.created_at || order.order_date);
            const orderDateStr = orderDate.toISOString().split('T')[0];
            return orderDateStr === selectedDateStr;
        });
    }, [orders, selectedDate]);

    return (
        <div className="bg-white px-4 py-3 w-full min-h-screen">
            {store_id && (
                <Header store_name={store.store_name} />
            )}
            <div className="flex justify-center py-6">
                <button className="bg-[#F4E4A6] px-16 py-3 rounded-full">
                    <Text className="text-black font-normal">รายการออเดอร์</Text>
                </button>
            </div>

            {/* Date Filter Section */}
            <div className="w-full flex flex-col gap-4 mb-6">
                <div className="flex justify-center w-full flex-wrap md:flex-nowrap gap-4">
                    <DatePicker
                        label="กรองตามวันที่"
                        variant="bordered"
                        value={selectedDate}
                        onChange={setSelectedDate}
                        className="max-w-xs"
                    />
                    {selectedDate && (
                        <button
                            onClick={() => setSelectedDate(null)}
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            <Text className="text-black">ล้างตัวกรอง</Text>
                        </button>
                    )}
                </div>
                <div className="flex justify-center">
                    <Text className="text-gray-600 text-sm">
                        แสดง {filteredOrders.length} จาก {orders.length} ออเดอร์
                    </Text>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                {filteredOrders.map((order) => (
                    <OrderBox key={order.id} order={order} store_id={store_id} />
                ))}
            </div>
        </div>
    );
}

export default SellerHome;
