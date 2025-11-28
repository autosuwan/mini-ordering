import { useNavigate } from "react-router-dom";
import Text from "../common/Text";
import ImageButton from "../common/ImageButton";
import cartIcon from "../../assets/images/cart.png";
import orderIcon from "../../assets/images/order_icon.png";

export default function Header({ store_name, cart_length }) {
    const navigate = useNavigate();

    return (
        <div className="bg-white px-4 py-3">
            <div className="flex justify-between items-start">

                {store_name ? (
                    <div className="flex-1">
                        <Text className="text-xs text-gray-600">ยินดีต้อนรับสู่ร้าน</Text>
                        <Text className="text-lg font-bold text-black">{store_name}</Text>
                    </div>
                ) : (
                    <div className="flex-1"></div>
                )}

                <div className="flex gap-4 items-center">
                    <ImageButton
                        src={orderIcon}
                        width={30}
                        height={30}
                        onClick={() => { }}
                    />
                    <div className="relative">
                        <ImageButton
                            src={cartIcon}
                            width={30}
                            height={30}
                            onClick={() => navigate('/cart')}
                        />
                        {cart_length > 0 && (
                            <div className="absolute -top-1 -right-3 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center">
                                <Text className="text-xs text-white font-bold">{cart_length}</Text>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
