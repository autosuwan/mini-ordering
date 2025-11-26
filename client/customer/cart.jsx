
import Text from '../components/common/Text';
import Header from '../components/customer/Header';
import CartItems from '../components/customer/CartItems';

function Cart() {
    return (
        <div className="bg-gray-200 text-white w-full h-screen py-5">
            <div>
                <Header />
            </div>
            <div className="text-center pt-5">
                <Text className="text-black">ตะกร้าสินค้า</Text>
            </div>
            <div className="justify-center pt-5">
                <CartItems />
            </div>
        </div>
    );
}

export default Cart;
