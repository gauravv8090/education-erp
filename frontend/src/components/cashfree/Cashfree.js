import { load } from "@cashfreepayments/cashfree-js";
import { Button } from "@mui/material";
import axios from "axios";

function Checkout({id,pendingFees}) {
  let cashfree;
  var initializeSDK = async function () {
    cashfree = await load({
      mode: "sandbox",
    });
  };
  initializeSDK();

  const doPayment = async () => {

      const res = await axios.post("https://education-erp-6thr.onrender.com/api/payment",{id,pendingFees});
    //   console.log(res)
    //   return

    let checkoutOptions = {
      paymentSessionId: res.data.payment_id,
      redirectTarget: "_self",
      returnUrl : `https://education-erp-6thr.onrender.com/api/payment/checkStatus/${res.data.order_id}`
    };
    cashfree.checkout(checkoutOptions);
  };

  return (
    <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={doPayment}
              >
                Pay Fees
              </Button>
  );
}
export default Checkout;