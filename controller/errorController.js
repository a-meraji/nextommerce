export default async function errorController (code, err, res) {
    return res.status(code).send({ message: err});
  };