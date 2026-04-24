const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

app.get("/sat", (req, res) => {
  const rfc = req.query.rfc || "TEST";
  const idcif = req.query.idcif || "TEST";

  res.send(`
    <h1>OK</h1>
    <p>${rfc}</p>
    <p>${idcif}</p>
  `);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor listo");
});