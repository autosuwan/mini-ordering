const prefix = "/api/easyslip"

export async function slipVerify(file) {
    if (!file) {
        throw new Error("File is required");
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${prefix}/verify`, {
        method: "POST",
        body: formData,
    })

    if (!response.ok) {
        const message = await response.text();
        throw new Error(`Failed to verify slip: ${message}`);
    }

    return await response.json();
}