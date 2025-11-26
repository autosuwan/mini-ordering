import Text from "../common/Text";
import productImage from "../../assets/images/product_img.jpg";
import removeIcon from "../../assets/images/remove_button.png";
import ImageButton from "../common/ImageButton";

export default function CartItems() {
    return (
        <div className="border border-[#AAAAAA] px-5 py-2 flex justify-between items-center">
            <div className="flex items-center gap-5">
                <img
                src={productImage}
                alt="Product"
                className="w-20 h-20 object-cover object-center"
                />
                <div className="flex-col">
                    <Text className="text-lg text-black">ไก่ทอด x2</Text>
                    <Text className="text-sm text-black">200 บาท</Text>
                </div>
            </div>
            <div className="flex">
                <ImageButton src={removeIcon} width={30} height={10} onClick={() => { }}></ImageButton>
            </div>
        </div>
    );
}