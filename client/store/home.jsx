import { useParams, useNavigate } from 'react-router-dom';
import Text from '../components/common/Text';
import Header from '../components/customer/Header';
import ProductBox from '../components/customer/ProductBox';
import useGetProducts from '../../src/hook/useGetProducts';
import useGetStore from '../../src/hook/useGetStore';
import { useCart } from '../context/CartContext';
import {Alert} from "@heroui/alert";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function Home() {
    const { store_id } = useParams();
    const navigate = useNavigate();
    const { products, loading, error } = useGetProducts(store_id || 1);
    const { store, loading: storeLoading, error: storeError } = useGetStore(store_id || 1);
    const { addToCart, getTotalItems, setStoreId } = useCart();
    const [alert, setAlert] = useState(false);
    const [title, setTitle] = useState('ค้นหาร้านค้า');
    const [inputId, setInputId] = useState('');

    useEffect(() => {
        if (store_id) {
            setStoreId(store_id);
            setTitle('สินค้าในร้าน');
        }
    }, [store_id, setStoreId, setTitle]);

    const handleChange = (e) => {
        setInputId(`/s/${e.target.value}`);
    };

    const handleAddToCart = (product) => {
        addToCart(product, 1);
        setAlert(true);

        setTimeout(() => {
            setAlert(false);
        }, 2000);
    };

    return (
        <div className="bg-white px-4 py-3 w-full min-h-screen">
            {store_id && (
                <Header store_name={store.store_name} cart_length={getTotalItems()} />
            )}

            <div className="flex justify-center py-6">
                <button className="bg-[#F4E4A6] px-16 py-3 rounded-full">
                    <Text className="text-black font-normal">{title}</Text>
                </button>
            </div>
            { store_id && (
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
                                onAdd={() => handleAddToCart(product)}
                            />
                        ))}
                    </>
                )}
            </div>
            )}
            { !store_id && (
                <div className="flex flex-row items-center justify-center gap-6 py-10">
                    <div className="flex justify-center">
                        <input onChange = {handleChange} className="border border-black rounded-full px-4 py-2" type="text" placeholder="Store ID" />
                    </div>
                    <div>
                        <button onClick = {() => navigate(`${inputId}`)} className="bg-[#F4E4A6] px-5 py-2 rounded-full border border-black">ค้นหา</button>
                    </div>
                </div>
            )}

            {alert && (
                <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                <div className="flex items-center justify-center w-full absolute bottom-0 px-5">
                    <div className="flex flex-col w-full">
                        {["success"].map((color) => (
                        <div key={color} className="w-full flex items-center my-3">
                            <Alert color={color} title={`เพิ่มสินค้าลงตะกร้าแล้ว`} />
                        </div>
                        ))}
                    </div>
                </div>
                </motion.div>
            )}
        </div>
    );
}

export default Home;
