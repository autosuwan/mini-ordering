import Text from "../common/Text";
import removeIcon from "../../assets/images/remove_button.png";
import ImageButton from "../common/ImageButton";

export default function CartItems({ productImage, productName, price, quantity, onRemove }) {
    const imageUrl = productImage || 'https://via.placeholder.com/150?text=No+Image';

    return (
        <div className="bg-white border-b border-gray-300 px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
                <div className="w-24 h-24 bg-gray-300 rounded-lg flex-shrink-0">
                    <img
                        src={imageUrl}
                        alt="Product"
                        className="w-full h-full object-cover object-center rounded-lg"
                    />
                </div>
                <div className="flex flex-col">
                    <Text className="text-base font-normal text-black">{productName} x {quantity} ชิ้น</Text>
                    <Text className="text-sm text-black">{price * quantity} บาท</Text>
                </div>
            </div>
            <div className="flex items-center">
                <ImageButton src={removeIcon} width={35} height={35} onClick={onRemove}></ImageButton>
            </div>
        </div>
    );
}