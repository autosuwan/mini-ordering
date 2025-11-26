import { useState, useEffect } from 'react';
import useGetUsers from '../hook/useGetUsers';

function App() {
    const { users, loading, error, refetch } = useGetUsers();

    if (loading) return <p>Loading users...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>Users</h1>
            <button onClick={refetch}>Refresh</button>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.username || user.uid}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
