
import Text from '../components/common/Text';
import Header from '../components/customer/Header';
import ProductBox from '../components/customer/ProductBox';

function Home() {

    return (
        <div className="bg-gray-200 text-white w-full h-full py-5">
            <div>
                <Header />
            </div>
            <div className="text-center pt-5">
                <Text className="text-black">เมนูในร้านค้า</Text>
            </div>
            <div className="justify-center pt-5">
                <ProductBox/>
                <ProductBox/>
                <ProductBox/>
                <ProductBox/>
                <ProductBox/>
                <ProductBox/>
                <ProductBox/>
                <ProductBox/>
                <ProductBox/>
                <ProductBox/>
                <ProductBox/>
                <ProductBox/>
            </div>
        </div>
    );
}

export default Home;
