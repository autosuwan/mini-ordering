import { useState, useEffect } from 'react';
import useGetUsers from '../hook/useGetUsers';
import Text from './components/common/Text';
import Header from './components/customer/Header';
import ProductBox from './components/customer/ProductBox';

function App() {
    const { users, loading, error, refetch } = useGetUsers();

    if (error) return <Text className="text-red-500">Error: {error}</Text>;

    return (
        <div className="bg-gray-200 text-white w-full h-screen py-5">
            <div>
                <Header />
            </div>
            <div className="text-center pt-5">
                <Text className="text-black">เมนูภายในร้านค้า</Text>
            </div>
            <div className="justify-center pt-5">
                <ProductBox/>
                <ProductBox/>
                <ProductBox/>
                <ProductBox/>
                <ProductBox/>
            </div>
        </div>
    );
}

export default App;
