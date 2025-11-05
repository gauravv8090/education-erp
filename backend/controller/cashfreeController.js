import Transaction from "../models/transactionModel.js";
import Student from "../models/studentModel.js";

export const cashfreeWebhook = async (req, res) => {
  try {
    const event = req.body; // Cashfree sends JSON payload
    console.log("Webhook received:", event);

    // const { order_status } = event.data || {};

    const order_id = event.data.order.order_id;
    const order_amount = event.data.order.order_amount;
    const cf_payment_id = event.data.payment.cf_payment_id;
    const order_status = event.data.payment.payment_status;

    console.log(order_id, order_status, order_amount, cf_payment_id, "dataaaa")
    // Find the transaction and update it
    const transaction = await Transaction.findOneAndUpdate(
      { orderId: order_id },
      {
        status: order_status,
        referenceId: cf_payment_id,
        paymentMethod: event.data.payment.payment_group,
        transactionTime: new Date(),
      },
      { new: true }
    );

    console.log(transaction, "this is transaction")

    // If transaction found and success → update student record
    if (transaction && order_status === "SUCCESS") {
      await Student.findByIdAndUpdate(transaction.studentId, {
        feesPaid: true,
        amountPaid: order_amount,
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Webhook Error:", error);
    res.status(500).json({ success: false });
  }
};


export const generatePaymentSessionId = async (req, res) => {

    // console.log(req.body, "this is body")
    const {id,pendingFees} = req.body;
    const orderId = "ORD"+ Date.now()
  const data = {
    order_currency: "INR",
    order_amount: pendingFees,
    customer_details: { customer_id: "100", customer_phone: "8090900998" },
    order_meta : {
        notify_url : "https://education-erp-6thr.onrender.com/api/payment/webhook",
        payment_methods : "cc,dc,upi"
    },
    order_id : orderId,
    order_note : "This is my first order",
    return_url: "http://localhost:3000/student-dashboard/profile"
  };
  const url = "https://sandbox.cashfree.com/pg/orders";
  const options = {
    method: "POST",
    headers: {
      "x-client-id": "TEST430329ae80e0f32e41a393d78b923034",
      "x-client-secret": "TESTaf195616268bd6202eeb3bf8dc458956e7192a85",
      "x-api-version": "2025-01-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    await Transaction.create({
  orderId: data.order_id,
  paymentSessionId: data.payment_session_id,
  studentId: id,
  amount: pendingFees,
  status: "PENDING",
});
    //   console.log("this is data",data);
    return res.json({payment_id : data.payment_session_id, order_id : orderId});
  } catch (error) {
    console.error(error);
  }
};


export const checkStatus = async(req, res)=>{
    const orderId = req.params.orderId
    const url = `https://sandbox.cashfree.com/pg/orders/${orderId}`;
const options = {
  method: 'GET',
  headers: {
    'x-api-version': '2025-01-01',
    'x-client-id': 'TEST430329ae80e0f32e41a393d78b923034',
    'x-client-secret': 'TESTaf195616268bd6202eeb3bf8dc458956e7192a85'
  },
  body: undefined
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
  if(data.order_status === "SUCCESS"){
    return res.redirect("http://localhost:3000/student-dashboard/profile?status=success")
}else if(data.order_status === "ACTIVE"){
      return res.redirect("http://localhost:3000/student-dashboard/profile?status=pending")
    }else
        return res.redirect("http://localhost:3000/student-dashboard/profile?status=failure")
} catch (error) {
  console.error(error);
}
}