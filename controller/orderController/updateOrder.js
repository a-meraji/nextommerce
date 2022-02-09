import errorController from "../errorController";
import Order from "../../models/OrderModel";

// update order sent status to true or false
// sent represent order delivery status
export default async function updateOrderStatus(req, res) {
  const { status, id } = req.body;
  try {
    Order.findByIdAndUpdate(
      id,
      {
        sent: status,
      },
      function (err, docs) {
        if (err) {
          errorController(500, err, res);
        } else {
          return res.status(200).send({ docs, message: "updated" });
        }
      }
    );
  } catch (err) {
    errorController(500, err, res);
  }
}
