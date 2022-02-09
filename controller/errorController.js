export default function errorController (code, err, res) {
  console.log(err);
  var error = err;
  if(err.message){error=err.message}
    return res.status(code).json({ message: error});
  };