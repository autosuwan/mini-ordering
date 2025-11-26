import { useNavigate } from "react-router-dom";
import Text from "../common/Text";
import ImageButton from "../common/ImageButton";
import cartIcon from "../../assets/images/cart.png";
import orderIcon from "../../assets/images/order_icon.png";

export default function Header() {
    const navigate = useNavigate();

    return (
        <div className="bg-white px-4 py-3">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <Text className="text-xs text-gray-600">ยินดีต้อนรับสู่ร้าน</Text>
                    <Text className="text-lg font-bold text-black">KFG, Mum JokMok</Text>
                </div>
                <div className="flex gap-4 items-center">
                    <ImageButton src={orderIcon} width={30} height={30} onClick={() => { }}></ImageButton>
                    <ImageButton src={cartIcon} width={30} height={30} onClick={() => navigate('/cart')}></ImageButton>
                </div>
            </div>
        </div>
    );
}