import { useEffect, useState } from "react";
import Text from '../../components/common/Text';
import Header from '../../components/customer/Header';
import ImageButton from '../../components/common/ImageButton';
import backIcon from '../../assets/images/back_button.png';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { anyId } from 'promptparse/generate';
import useGetStore from '../../../src/hook/useGetStore';

function Payment() {
    const navigate = useNavigate();
    const { cart, storeId } = useCart();
    const [qrPayload, setQrPayload] = useState("");

    const { store, loading: storeLoading, error: storeError } = useGetStore(storeId);

    // คำนวณยอดรวมและมัดจำ
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deposit = Math.round(totalAmount * 0.5 * 100) / 100; // มัดจำ 50% แบบ 2 ตำแหน่งทศนิยม

    useEffect(() => {
        if (store?.prompt_pay_id) {
            try {
                const target = store.prompt_pay_id.replace(/[^0-9]/g, '');
                let type = 'MSISDN'; // Default to Mobile

                if (target.length === 13) {
                    type = 'NATID';
                } else if (target.length === 15) {
                    type = 'EWALLETID';
                }

                const payload = anyId({
                    type,
                    target,
                    amount: deposit
                });
                setQrPayload(payload);
                console.log("QR Payload:", payload);
            } catch (e) {
                console.error("Error generating QR payload:", e);
            }
        }
    }, [store, deposit]);

    if (storeLoading) return <Text className="text-center py-10">กำลังโหลดข้อมูลร้าน...</Text>;
    if (storeError || !store) return <Text className="text-center py-10 text-red-600">เกิดข้อผิดพลาดโหลดร้าน</Text>;

    return (
        <div className="bg-white px-4 py-3 ">
            <Header />

            <div className="flex flex-col">
                {/* Header ส่วนบน */}
                <div className="flex items-center justify-center py-6 w-full relative">
                    <div className="absolute left-5">
                        <ImageButton
                            src={backIcon}
                            width={10}
                            height={10}
                            onClick={() => navigate('/order/information')}
                        />
                    </div>
                    <div className="bg-[#FFD7CC] px-16 py-3 rounded-full">
                        <Text className="text-black font-normal">ชำระเงิน</Text>
                    </div>
                </div>

                {/* QR Code */}
                <div className="flex flex-col items-center justify-center py-10 w-full gap-5">
                    <Text className="text-black font-normal">QR Code สำหรับชำระเงิน</Text>

                    {qrPayload ? (
                        <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&ecc=M&data=${encodeURIComponent(qrPayload)}`}
                            alt="QR Code"
                            className="w-[300px] h-[300px] object-cover object-center rounded-lg"
                        />
                    ) : (
                        <Text>กำลังสร้าง QR...</Text>
                    )}

                    <div className="flex justify-between gap-24 w-full max-w-xs">
                        <Text className="text-[#7A7A7A] font-normal">มัดจำ 50%</Text>
                        <Text className="text-black font-bold">{deposit.toFixed(2)} บาท</Text>
                    </div>
                </div>

                {/* ปุ่มส่งสลิป */}
                <div className="flex justify-center pt-8">
                    <button
                        onClick={() => navigate('/bill')}
                        className="bg-[#FFD7CC] px-16 py-3 rounded-full border-black border"
                    >
                        <Text className="text-black font-normal">ส่งสลิป</Text>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Payment;
