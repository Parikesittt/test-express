import { snap, core } from "../utils/midtrans.js";

export const createTransaction = async (req, res, next) => {
    const { amount, first_name, email } = req.body;
    const orderId = `INV-${Date.now()}`;
    const parameter = {
        transaction_details: {
            order_id: orderId,
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
            orderId,
            token: transaction.token,
            redirect_url: transaction.redirect_url,
        })
    } catch (err) {
        next(err);
    }
}

export const checkPaymentStatus = async (req, res) => {
    const { orderId } = req.params;

    try {

        const response = await core.transaction.status(orderId);

        res.json({
            orderId: response.order_id,
            status: response.transaction_status,
            paymentType: response.payment_type,
            grossAmount: response.gross_amount
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

export const handleNotification = async (req, res) => {
    try {
        const notification = req.body;

        const statusResponse = await core.transaction.notification(notification);

        const orderId = statusResponse.order_id;
        const transactionStatus = statusResponse.transaction_status;
        const fraudStatus = statusResponse.fraud_status;
        const paymentType = statusResponse.payment_type;

        let orderStatus = "";
        if (transactionStatus == 'capture') {
            if (fraudStatus == 'challange') {
                orderStatus = 'challange';
            } else if (fraudStatus == 'accept') {
                orderStatus = 'paid';
            }
        } else if (transactionStatus === 'settlement') {
            orderStatus = 'paid';
        } else if (transactionStatus === 'cancel' || transactionStatus === 'deny' || transactionStatus === 'expire') {
            orderStatus = 'failed';
        } else if (transactionStatus === 'pending') {
            orderStatus = 'pending';
        }

        res.status(200).json({
            message: "Notification received",
            orderId: orderId,
            paymentType: paymentType,
            transactionStatus: transactionStatus,
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};