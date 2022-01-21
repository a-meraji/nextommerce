import connectDB from "../../../middleware/db/mongodb";
import Order from "../../../models/OrderModel";

const reqHandler = (req, res) => {
  const method = req.method;
  if (method === "POST") createOrder(req, res);
  else if (method === "GET") readOrders(req, res);
  else if (method === "PATCH") updateOrderStatus(req, res);
  else {
    res.status(422).send({ message: "req_method_not_supported" });
  }
};
export default connectDB(reqHandler);

const createOrder = async (req, res) => {
  const { name, lastname, address, phone, cart, cost, amount } = req.body;
  if (name && lastname && address && phone && cart && cost && amount) {
    try {
      const order = new Order({
        name,
        lastname,
        address,
        phone,
        cart,
        cost,
        amount,
        sent:false,
      });

      const createdOrder = await order.save();
      return res.status(200).send({ message: "saved", createdOrder });
    } catch (error) {
      errorHandler(error,res);
    }
  } else {
    return res.status(422).send({
      message: "incomplete data"
    });
  }
};

const readOrders = async (req, res) => {
  const { key, value } = req.query;
  var conditions = {};
if(key!='undefined' && value!='undefined'){
  const keysArr = key.split("_");
  const valuesArr = value.split("_");
  for (var i = 0; i < keysArr.length; i++) {
    if(keysArr[i]==="createdAt"){
      const newRange = valuesArr[i].split("to");
      conditions[keysArr[i]] = {$gte: newRange[0], $lt: newRange[1]};

      }
      else{
        conditions[keysArr[i]] = valuesArr[i];
      }
  }
}

  try {
    const orders = await Order.find(conditions);
    return res.status(200).send({ orders });
  } catch (err) {
    errorHandler(err, res);
  }
};

const updateOrderStatus = async (req, res) => {
  const { status, id } = req.body;
  try {
    Order.findByIdAndUpdate(
      id,
      {
        sent: status,
      },
      function (err, docs) {
        if (err) {
          errorHandler(err, res);
        } else {
          return res.status(200).send({ docs, message: "updated" });
        }
      }
    );
  } catch (err) {
    errorHandler(err, res);
  }
};

const errorHandler = (err, res) => {
  return res.status(500).send({ message: err.message });
};
