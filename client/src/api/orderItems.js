const prefix = "/api/orderItems";

export async function createOrderItem(orderItem) {
    const response = await fetch(`${prefix}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderItem),
    });

    if (!response.ok) {
        throw new Error('Failed to create order item');
    }

    return await response.json();
}

export async function getOrderItems(ids) {
    if (!ids || ids.length === 0) {
        return [];
    }

    const response = await fetch(`${prefix}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch order items');
    }

    const allItems = await response.json();

    // Filter by IDs
    return allItems.filter(item => ids.includes(item.id));
}