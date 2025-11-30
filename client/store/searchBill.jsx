import Text from '../components/common/Text';
import Header from '../components/customer/Header';
import CartItems from '../components/customer/CartItems';
import ImageButton from '../components/common/ImageButton';
import backIcon from '../assets/images/back_button.png';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

function SearchBill() {
    const navigate = useNavigate();
    const [inputId, setInputId] = useState('');
    const { getTotalItems, storeId } = useCart();

    const handleChange = (e) => {
        setInputId(`/bill/${e.target.value}`);
    };

    return (
        <div className="bg-white px-4 py-3">
            <div>
                <Header cart_length={getTotalItems()} />
            </div>
            <div className="flex flex-col">
                <div className="flex items-center justify-center py-6 w-full relative">
                    <div className="absolute left-5">
                        <ImageButton src={backIcon} width={10} height={10} onClick={() => navigate(`/s/${storeId}`)}></ImageButton>
                    </div>
                    <div className="bg-[#D9F9FF] px-16 py-3 rounded-full">
                        <Text className="text-black font-normal">ค้นหาออเดอร์</Text>
                    </div>
                </div>
            </div>
            <div className="flex flex-row items-center justify-center gap-6 py-10">
                <div className="flex justify-center">
                    <input onChange = {handleChange} className="border border-black rounded-full px-4 py-2" type="text" placeholder="รหัสออเดอร์" />
                </div>
                <div>
                    <button onClick = {() => navigate(`${inputId}`)} className="bg-[#D9F9FF] px-5 py-2 rounded-full border border-black">ค้นหา</button>
                </div>
            </div>
        </div>
    );
}

export default SearchBill;
