const prefix = '/api/order';

export async function createOrder(order) {
    const response = await fetch(`${prefix}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
    });

    if (!response.ok) {
        throw new Error('Failed to create order');
    }

    return await response.json();
}

export async function getOrders(store_id) {
    const response = await fetch(`${prefix}/store/${store_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch orders');
    }

    return await response.json();
}

export async function getOrder(id) {
    if (!id) throw new Error('Order ID is required');

    try {
        const response = await fetch(`${prefix}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Failed to fetch order: ${text}`);
        }

        return await response.json();
    } catch (err) {
        console.error('getOrder error:', err);
        throw err;
    }
}
