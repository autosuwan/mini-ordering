import { useState } from "react";
import Text from '../../components/common/Text';
import Header from '../../components/customer/Header';
import ImageButton from '../../components/common/ImageButton';
import backIcon from '../../assets/images/back_button.png';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

function Information() {
    const navigate = useNavigate();
    const { updateCustomerInfo, customerInfo: savedCustomerInfo } = useCart();

    const [customerInfo, setCustomerInfo] = useState({
        name: savedCustomerInfo?.name || '',
        phone: savedCustomerInfo?.phone || '',
        description: savedCustomerInfo?.description || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        if (customerInfo) {
            console.log(customerInfo);
            updateCustomerInfo(customerInfo);
            navigate('../order/payment');
        } else {
            console.log('No customer info');
        }
    }

    return (
        <div className="bg-white px-4 py-3 ">
            <Header />

            <div className="flex flex-col">
                <div className="flex items-center justify-center py-6 w-full relative">
                    <div className="absolute left-5">
                        <ImageButton
                            src={backIcon}
                            width={10}
                            height={10}
                            onClick={() => navigate('/cart')}
                        />
                    </div>
                    <div className="bg-[#D9F9FF] px-16 py-3 rounded-full">
                        <Text className="text-black font-normal">ข้อมูลการสั่งซื้อ</Text>
                    </div>
                </div>

                <div className="flex flex-col gap-4 pt-5">
                    <input
                        type="text"
                        name="name"
                        placeholder="ชื่อ"
                        value={customerInfo.name}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-full px-4 py-2 w-full"
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="เบอร์โทรศัพท์"
                        value={customerInfo.phone}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-full px-4 py-2 w-full"
                    />
                    <textarea
                        name="description"
                        placeholder="หมายเหตุ"
                        value={customerInfo.description}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-2xl px-4 py-2 w-full h-24"
                    />
                </div>

                <div className="flex justify-center pt-8">
                    <button
                        onClick={handleSubmit}
                        className="bg-[#D9F9FF] px-16 py-3 rounded-full border-black border"
                    >
                        <Text className="text-black font-normal">ถัดไป</Text>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Information;
