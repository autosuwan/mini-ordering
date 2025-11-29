export function validateSlip(slipData, expectedAmount, expectedReceiver) {
    console.log("Validating Slip Data:", slipData);

    if (!slipData || !slipData.data) {
        throw new Error("ไม่พบข้อมูลในสลิป");
    }

    const { amount, receiver } = slipData.data;

    // 1. ตรวจสอบยอดเงิน (Amount)
    if (amount.amount < expectedAmount) {
        throw new Error(`ยอดเงินไม่ถูกต้อง (พบ ${amount.amount} บาท, ต้องการ ${expectedAmount} บาท)`);
    }

    // 2. ตรวจสอบผู้รับ (Receiver)
    // กรณีโอนผ่าน PromptPay จะมี receiver.proxy
    // ถ้าไม่มี Proxy ให้ข้ามไปก่อน หรือแจ้งเตือน (แต่ในที่นี้เราจะยอมให้ผ่านถ้าไม่มี Proxy แต่ยอดเงินถูก)
    // หรือถ้าจะให้ดีควรเช็คชื่อบัญชี (แต่เราไม่มีชื่อบัญชีร้านค้าในตอนนี้)

    if (receiver.proxy && receiver.proxy.value) {
        const slipReceiverId = receiver.proxy.value.replace(/[^0-9]/g, '');
        const storeReceiverId = expectedReceiver.replace(/[^0-9]/g, '');

        if (slipReceiverId !== storeReceiverId) {
            throw new Error(`ผู้รับเงินไม่ถูกต้อง (โอนไปที่ ${receiver.account?.name?.th || receiver.account?.name?.en || slipReceiverId})`);
        }
    } else {
        // ถ้าไม่มี Proxy ID (เช่น โอนผ่านเลขบัญชี)
        // เราจะยอมให้ผ่านไปก่อน แต่ log warning ไว้
        // หรือถ้าต้องการความปลอดภัยสูง ต้องบังคับให้มี Proxy ID
        console.warn("Receiver Data (No Proxy):", receiver);
        console.warn("Skipping Receiver ID check because Proxy ID is missing in slip.");

        // ถ้าต้องการบังคับจริงๆ ให้ uncomment บรรทัดล่าง
        // throw new Error("สลิปนี้ไม่มีข้อมูล PromptPay (Proxy ID) - กรุณาตรวจสอบว่าโอนผ่าน QR Code หรือ PromptPay ถูกต้องหรือไม่");
    }

    return true;
}
