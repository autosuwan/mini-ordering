import { useState } from "react";
import { slipVerify } from "../api/easyslip";

export default function useSlipVerify() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    const verify = async (file) => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const data = await slipVerify(file);
            setResult(data);
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { verify, loading, error, result };
}
