import Text from "../common/Text";
import productImage from "../../assets/images/product_img.jpg";
import ImageButton from "../common/ImageButton";
import addIcon from "../../assets/images/add_button.png";

export default function StoreBox() {
    return (
        <div className="border border-[#AAAAAA] px-5 py-2 flex justify-between items-center">
            <div className="flex items-center gap-5">
                <img
                src={productImage}
                alt="Product"
                className="w-20 h-20 object-cover object-center"
                />
                <div className="flex-col">
                    <Text className="text-lg text-black">ไก่ทอด</Text>
                    <Text className="text-sm text-black">100 บาท</Text>
                </div>
            </div>
            <div className="justify-end">
                <ImageButton src={addIcon} width={30} height={10} onClick={() => { }}></ImageButton>
            </div>
        </div>
    );
}
