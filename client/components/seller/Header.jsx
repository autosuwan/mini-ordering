import { useNavigate } from "react-router-dom";
import Text from "../common/Text";

export default function Header({ store_name }) {
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
            </div>
        </div>
    );
}
