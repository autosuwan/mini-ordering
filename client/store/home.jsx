import { useParams } from 'react-router-dom';
import Text from '../components/common/Text';
import Header from '../components/customer/Header';
import ProductBox from '../components/customer/ProductBox';
import useGetProducts from '../../src/hook/useGetProducts';
import useGetStore from '../../src/hook/useGetStore';

function Home() {
    const { store_id } = useParams();
    const { products, loading, error } = useGetProducts(store_id || 1);
    const { store, loading: storeLoading, error: storeError } = useGetStore(store_id || 1);

    return (
        <div className="bg-white px-4 py-3 w-full min-h-screen">
            <Header store_name={store.store_name} />

            <div className="flex justify-center py-6">
                <button className="bg-[#F4E4A6] px-16 py-3 rounded-full">
                    <Text className="text-black font-normal">สินค้าในร้าน</Text>
                </button>
            </div>

            <div className="bg-white">
                {loading && (
                    <div className="text-center py-8">
                        <Text className="text-gray-600">กำลังโหลดสินค้า...</Text>
                    </div>
                )}

                {error && (
                    <div className="text-center py-8">
                        <Text className="text-red-600">เกิดข้อผิดพลาด: {error}</Text>
                    </div>
                )}

                {!loading && !error && products.length === 0 && (
                    <div className="text-center py-8">
                        <Text className="text-gray-600">ไม่มีสินค้าในร้านนี้</Text>
                        <Text className="text-gray-500 text-sm mt-2">Store ID: {store_id || 1}</Text>
                    </div>
                )}

                {!loading && !error && products.length > 0 && (
                    <>
                        {products.map((product) => (
                            <ProductBox
                                key={product.id}
                                product_name={product.product_name}
                                price={product.price}
                                product_img={product.product_image}
                            />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}

export default Home;
