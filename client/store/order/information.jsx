import Text from '../../components/common/Text';
import Header from '../../components/customer/Header';
import ImageButton from '../../components/common/ImageButton';
import backIcon from '../../assets/images/back_button.png';
import { useNavigate } from 'react-router-dom';

function Information() {
    const navigate = useNavigate();
    return (
        <div className="bg-white px-4 py-3 ">
            <div>
                <Header />
            </div>
            <div className="flex flex-col">
                <div className="flex items-center justify-center py-6 w-full relative">
                    <div className="absolute left-5">
                        <ImageButton src={backIcon} width={10} height={10} onClick={() => navigate('/cart')}></ImageButton>
                    </div>
                    <div className="bg-[#D9F9FF] px-16 py-3 rounded-full">
                        <Text className="text-black font-normal">ข้อมูลการสั่งซื้อ</Text>
                    </div>
                </div>
                <div className="flex flex-col gap-4 pt-5">
                    <input type="text" placeholder="ชื่อ" className="border border-gray-300 rounded-full px-4 py-2 w-full" />
                    <input type="text" placeholder="เบอร์โทรศัพท์" className="border border-gray-300 rounded-full px-4 py-2 w-full" />
                    <textarea placeholder="หมายเหตุ" className="border border-gray-300 rounded-2xl px-4 py-2 w-full h-24" />
                </div>
                <div className="flex justify-center pt-8">
                    <button onClick={() => navigate('/order/payment')} className="bg-[#D9F9FF] px-16 py-3 rounded-full border-black border">
                        <Text className="text-black font-normal">ถัดไป</Text>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Information;
