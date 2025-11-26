import Text from '../../components/common/Text';
import Header from '../../components/customer/Header';
import ImageButton from '../../components/common/ImageButton';
import backIcon from '../../assets/images/back_button.png';
import { useNavigate } from 'react-router-dom';
import qrCode from '../../assets/images/qr_code.jpeg';

function Payment() {
    const navigate = useNavigate();
    return (
        <div className="bg-white px-4 py-3 ">
            <div>
                <Header />
            </div>
            <div className="flex flex-col">
                <div className="flex items-center justify-center py-6 w-full relative">
                    <div className="absolute left-5">
                        <ImageButton src={backIcon} width={10} height={10} onClick={() => navigate('/order/information')}></ImageButton>
                    </div>
                    <div className="bg-[#FFD7CC] px-16 py-3 rounded-full">
                        <Text className="text-black font-normal">ชำระเงิน</Text>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center py-10 w-full gap-5">
                    <Text className="text-black font-normal">QR Code สำหรับชำระเงิน</Text>
                    <img src={qrCode} alt="QR Code" className="w-[300px] h-[300px] object-cover object-center rounded-lg" />
                    <div className="flex justify-between gap-24">
                        <Text className="text-[#7A7A7A] font-normal">มัดจำ 50%</Text>
                        <Text className="text-black font-bold">รวม 200 บาท</Text>
                    </div>
                </div>
                <div className="flex justify-center pt-8">
                    <button onClick={() => navigate('/bill')} className="bg-[#FFD7CC] px-16 py-3 rounded-full border-black border">
                        <Text className="text-black font-normal">ส่งสลิป</Text>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Payment;
