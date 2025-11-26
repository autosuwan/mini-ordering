import Text from '../components/common/Text';
import Header from '../components/customer/Header';
import ProductBox from '../components/customer/ProductBox';

function Home() {
    return (
        <div className="bg-white px-4 py-3 w-full min-h-screen">
            <Header />

            <div className="flex justify-center py-6">
                <button className="bg-[#F4E4A6] px-16 py-3 rounded-full">
                    <Text className="text-black font-normal">สินค้าในร้าน</Text>
                </button>
            </div>

            <div className="bg-gray-100">
                <ProductBox />
                <ProductBox />
                <ProductBox />
                <ProductBox />
                <ProductBox />
                <ProductBox />
                <ProductBox />
                <ProductBox />
                <ProductBox />
                <ProductBox />
                <ProductBox />
                <ProductBox />
            </div>
        </div>
    );
}

export default Home;
