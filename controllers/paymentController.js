import { snap } from "../utils/midtrans.js";

export const createTransaction = async (req, res, next) => {
    const { amount, first_name, email } = req.body;
    const parameter = {
        transaction_details: {
            order_id: `INV-${Date.now()}`,
            gross_amount: amount,
        },
        credit_card: {
            secure: true,
        },
        customer_details: {
            first_name,
            email,
        },
    };

    try {
        const transaction = await snap.createTransaction(parameter);
        res.json({
            message: "Transaksi berhasil dibuat",
            token: transaction.token,
            redirect_url: transaction.redirect_url,
        })
    } catch (err) {
        next(err);
    }
}