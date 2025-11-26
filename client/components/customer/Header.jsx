import { useNavigate } from "react-router-dom";
import Text from "../common/Text";
import ImageButton from "../common/ImageButton";
import cartIcon from "../../assets/images/cart.png";

export default function Header() {
    const navigate = useNavigate();

    return (
        <div className="border-b border-black">
            <div className="px-3 pb-4 justify-between flex">
                <Text className="text-2xl font-bold text-black">Store Name</Text>
                <ImageButton src={cartIcon} width={30} height={10} onClick={() => navigate('/cart')}></ImageButton>
            </div>
        </div>
    );
}