import Text from "../common/Text";
import productImage from "../../assets/images/product_img.jpg";
import ImageButton from "../common/ImageButton";
import addIcon from "../../assets/images/add_button.png";

export default function StoreBox() {
    return (
        <div className="bg-white border-b border-gray-300 px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
                <div className="w-24 h-24 bg-gray-300 rounded-lg flex-shrink-0">
                    <img
                        src={productImage}
                        alt="Product"
                        className="w-full h-full object-cover object-center rounded-lg"
                    />
                </div>
                <div className="flex flex-col">
                    <Text className="text-base font-normal text-black">ฮิโอะบัง</Text>
                    <Text className="text-sm text-black">100 บาท</Text>
                </div>
            </div>
            <div className="flex items-center">
                <ImageButton src={addIcon} width={35} height={35} onClick={() => { }}></ImageButton>
            </div>
        </div>
    );
}
