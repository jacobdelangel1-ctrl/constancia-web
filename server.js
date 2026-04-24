const express = require("express");
const QRCode = require("qrcode");
const app = express();

// 🔐 Validación básica RFC (México)
function validarRFC(rfc) {
  return /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/.test(rfc);
}

// 🧠 Escapar HTML
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// 🧾 Base de datos simulada
const db = {
  "GAHH970828RN3": {
    nombre: "ANGEL HERNANDEZ",
    regimen: "Plataformas Digitales",
    domicilio: "CAMPECHE, MEXICO",
    estatus: "ACTIVO"
  }
};

app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

// 🔥 Ruta principal
app.get("/sat", async (req, res) => {
  let rfc = (req.query.rfc || "").toUpperCase();
  let idcif = req.query.idcif || "NO DEFINIDO";

  const valido = validarRFC(rfc);

  const data = db[rfc] || {
    nombre: "NO REGISTRADO",
    regimen: "SIN INFORMACIÓN",
    domicilio: "NO DISPONIBLE",
    estatus: "INACTIVO"
  };

  // 📱 QR con el mismo link
  const url = `https://${req.headers.host}/sat?rfc=${rfc}&idcif=${idcif}`;
  const qr = await QRCode.toDataURL(url);

  res.send(`
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consulta Fiscal</title>

    <style>
      body {
        margin: 0;
        font-family: Arial;
        background: #eef2f7;
      }

      .card {
        max-width: 750px;
        margin: 30px auto;
        background: white;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      }

      .header {
        background: linear-gradient(135deg, #0f172a, #1e293b);
        color: white;
        padding: 25px;
      }

      .header h1 {
        margin: 0;
      }

      .content {
        padding: 25px;
      }

      .box {
        border: 1px solid #e5e7eb;
        border-radius: 10px;
        padding: 15px;
        margin-bottom: 15px;
        background: #f9fafb;
      }

      .label {
        font-size: 12px;
        color: #6b7280;
      }

      .value {
        font-size: 18px;
        font-weight: bold;
      }

      .status {
        display: inline-block;
        padding: 6px 12px;
        border-radius: 20px;
        background: ${data.estatus === "ACTIVO" ? "#dcfce7" : "#fee2e2"};
        color: ${data.estatus === "ACTIVO" ? "#166534" : "#991b1b"};
        font-weight: bold;
        margin-top: 10px;
      }

      .qr {
        text-align: center;
        margin-top: 20px;
      }

      .qr img {
        width: 120px;
      }

      .error {
        color: red;
        font-weight: bold;
      }
    </style>
  </head>

  <body>

    <div class="card">

      <div class="header">
        <h1>Consulta Fiscal</h1>
      </div>

      <div class="content">

        <div class="box">
          <div class="label">RFC</div>
          <div class="value">${escapeHtml(rfc)}</div>
          ${!valido ? '<div class="error">RFC inválido</div>' : ''}
        </div>

        <div class="box">
          <div class="label">ID CIF</div>
          <div class="value">${escapeHtml(idcif)}</div>
        </div>

        <div class="box">
          <div class="label">Nombre</div>
          <div class="value">${data.nombre}</div>
        </div>

        <div class="box">
          <div class="label">Régimen</div>
          <div class="value">${data.regimen}</div>
        </div>

        <div class="box">
          <div class="label">Domicilio</div>
          <div class="value">${data.domicilio}</div>
        </div>

        <div class="status">${data.estatus}</div>

        <div class="qr">
          <p>Escanear QR</p>
          <img src="${qr}">
        </div>

      </div>

    </div>

  </body>
  </html>
  `);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor listo 🚀");
});