const express = require("express");
const QRCode = require("qrcode");
const app = express();

app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

app.get("/sat", async (req, res) => {
  const rfc = req.query.rfc || "NO DEFINIDO";
  const idcif = req.query.idcif || "NO DEFINIDO";

  // 🔗 LINK REAL SAT
  const urlSAT = `https://siat.sat.gob.mx/app/qr/faces/pages/mobile/validadorqr.jsf?D1=10&D2=1&D3=${idcif}`;

  let qr = "";
  try {
    qr = await QRCode.toDataURL(urlSAT);
  } catch (e) {
    qr = "";
  }

  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consulta Fiscal</title>

    <style>
      body {
        margin: 0;
        font-family: Arial;
        background: #eef2f7;
      }

      .card {
        max-width: 700px;
        margin: 30px auto;
        background: white;
        border-radius: 15px;
        padding: 20px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      }

      .title {
        font-size: 24px;
        margin-bottom: 20px;
        font-weight: bold;
      }

      .box {
        background: #f9fafb;
        border: 1px solid #e5e7eb;
        padding: 15px;
        border-radius: 10px;
        margin-bottom: 10px;
      }

      .label {
        font-size: 12px;
        color: #6b7280;
      }

      .value {
        font-size: 18px;
        font-weight: bold;
      }

      .btn {
        display: block;
        text-align: center;
        background: #111827;
        color: white;
        padding: 12px;
        border-radius: 10px;
        margin-top: 15px;
        text-decoration: none;
        font-weight: bold;
      }

      .qr {
        text-align: center;
        margin-top: 20px;
      }

      .qr img {
        width: 140px;
      }
    </style>
  </head>

  <body>

    <div class="card">

      <div class="title">Consulta Fiscal</div>

      <div class="box">
        <div class="label">RFC</div>
        <div class="value">${rfc}</div>
      </div>

      <div class="box">
        <div class="label">ID CIF</div>
        <div class="value">${idcif}</div>
      </div>

      <!-- BOTÓN -->
      <a class="btn" href="${urlSAT}" target="_blank">
        Validar en SAT
      </a>

      <!-- QR -->
      ${qr ? `
      <div class="qr">
        <p>Escanear QR</p>
        <img src="${qr}">
      </div>
      ` : ""}

    </div>

  </body>
  </html>
  `);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor listo 🚀");
});