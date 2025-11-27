const prefix = "/api/stores";

export async function getStoreByStoreId(store_id) {
    if (!store_id) {
        throw new Error("store_id is required");
    }

    const response = await fetch(`${prefix}/${store_id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(`Failed to show products: ${message}`);
    }

    return await response.json();
}
