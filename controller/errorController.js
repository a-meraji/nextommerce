export default function errorController (code, err, res) {
  console.log(err);
    return res.status(code).json({ message: err});
  };