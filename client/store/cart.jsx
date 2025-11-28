import Text from '../components/common/Text';
import Header from '../components/customer/Header';
import CartItems from '../components/customer/CartItems';
import ImageButton from '../components/common/ImageButton';
import backIcon from '../assets/images/back_button.png';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Cart() {
    const navigate = useNavigate();
    const { cart, removeFromCart, getTotalItems, getTotalPrice, storeId } = useCart();

    return (
        <div className="bg-white px-4 py-3 ">
            <div>
                <Header cart_length={getTotalItems()} />
            </div>
            <div className="flex flex-col">
                <div className="flex items-center justify-center py-6 w-full relative">
                    <div className="absolute left-5">
                        <ImageButton src={backIcon} width={10} height={10} onClick={() => navigate(`/s/${storeId}`)}></ImageButton>
                    </div>
                    <div className="bg-[#D9F9FF] px-16 py-3 rounded-full">
                        <Text className="text-black font-normal">ตะกร้าสินค้า</Text>
                    </div>
                </div>

                <div className="justify-center pt-5">
                    {cart.length === 0 ? (
                        <div className="text-center py-8">
                            <Text className="text-gray-600">ตะกร้าว่างเปล่า</Text>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <CartItems
                                key={item.id}
                                productImage={item.product_image}
                                productName={item.product_name}
                                price={item.price}
                                quantity={item.quantity}
                                onRemove={() => removeFromCart(item.id)}
                            />
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <>
                        <div className="flex justify-between pt-5">
                            <Text className="text-black font-bold">ทั้งหมด {getTotalItems()} รายการ</Text>
                            <Text className="text-black font-bold">รวม {getTotalPrice()} บาท</Text>
                        </div>
                        <div className="flex justify-center pt-5">
                            <button
                                className="bg-[#D9F9FF] p-10 py-3 w-max rounded-full border-black border"
                                onClick={() => navigate('/order/information')}
                            >
                                <Text className="text-black font-normal">สร้างออเดอร์</Text>
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Cart;
