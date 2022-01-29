import errorController from "../errorController";
import Order from "../../models/OrderModel";

export default async function readOrders(req, res) {
  // search query in key value format recived
  // keys passed in a string seperated with "_"
  // values are in the same order and format of keys
  const { key, value } = req.query;
  var conditions = {};
  if (key != "undefined" && value != "undefined") {
    const keysArr = key.split("_");
    const valuesArr = value.split("_");
    // make condition object to pass to Order.find().
    // condition = {key:value,...}
    for (var i = 0; i < keysArr.length; i++) {
      // just "createdAt" key needs special query to make a date range
      if (keysArr[i] === "createdAt") {
        const newRange = valuesArr[i].split("to");
        conditions[keysArr[i]] = { $gte: newRange[0], $lt: newRange[1] };
      } else {
        conditions[keysArr[i]] = valuesArr[i];
      }
    }
  }
  try {
    const orders = await Order.find(conditions);
    return res.status(200).send({ orders, message: "found" });
  } catch (err) {
    errorController(500, err.message, res);
  }
}
