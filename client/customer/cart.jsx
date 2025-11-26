import Text from '../components/common/Text';
import Header from '../components/customer/Header';
import CartItems from '../components/customer/CartItems';
import ImageButton from '../components/common/ImageButton';
import backIcon from '../assets/images/back_button.png';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const navigate = useNavigate();
    return (
        <div className="bg-white px-4 py-3 ">
            <div>
                <Header />
            </div>
            <div className="flex flex-col">
                <div className="flex items-center justify-center py-6 w-full relative">
                    <div className="absolute left-5">
                        <ImageButton src={backIcon} width={10} height={10} onClick={() => navigate('/')}></ImageButton>
                    </div>
                    <div className="bg-[#D9F9FF] px-16 py-3 rounded-full">
                        <Text className="text-black font-normal">ตะกร้าสินค้า</Text>
                    </div>
                </div>
                <div className="justify-center pt-5">
                    <CartItems />
                </div>
                <div className="flex justify-between pt-5">
                    <Text className="text-black font-bold">ทั้งหมด 2 รายการ</Text>
                    <Text className="text-black font-bold">รวม 200 บาท</Text>
                </div>
                <div className="flex justify-center pt-5">
                    <button className="bg-[#D9F9FF]  p-10 py-3 w-max rounded-full border-black border">
                        <Text className="text-black font-normal">สร้างออเดอร์</Text>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cart;
