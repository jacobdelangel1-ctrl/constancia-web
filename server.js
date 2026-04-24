const express = require("express");
const app = express();

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

// 🔥 NUEVA RUTA /sat
app.get("/sat", (req, res) => {
  const rfc = escapeHtml(req.query.rfc || "NO DEFINIDO");
  const idcif = escapeHtml(req.query.idcif || "NO DEFINIDO");

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
        font-family: Arial, sans-serif;
        background: #eef2f7;
      }

      .container {
        max-width: 700px;
        margin: 40px auto;
        background: white;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      }

      .header {
        background: linear-gradient(135deg, #0f172a, #1e293b);
        color: white;
        padding: 30px;
      }

      .header h1 {
        margin: 0;
        font-size: 28px;
      }

      .content {
        padding: 25px;
      }

      .box {
        background: #f8fafc;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        padding: 15px;
        margin-bottom: 15px;
      }

      .label {
        font-size: 12px;
        color: #6b7280;
        margin-bottom: 5px;
      }

      .value {
        font-size: 20px;
        font-weight: bold;
        word-break: break-word;
      }

      .link {
        color: blue;
        text-decoration: underline;
      }

      .status {
        display: inline-block;
        background: #dcfce7;
        color: #166534;
        padding: 6px 12px;
        border-radius: 20px;
        font-weight: bold;
        margin-top: 10px;
      }

      .footer {
        text-align: center;
        font-size: 13px;
        color: #9ca3af;
        padding: 15px;
      }
    </style>
  </head>

  <body>

    <div class="container">
      
      <div class="header">
        <h1>Consulta Fiscal</h1>
      </div>

      <div class="content">

        <div class="box">
          <div class="label">RFC</div>
          <div class="value">${rfc}</div>
        </div>

        <div class="box">
          <div class="label">ID CIF</div>
          <div class="value">
            <a class="link" href="#">${idcif}</a>
          </div>
        </div>

        <div class="status">ACTIVO</div>

      </div>

      <div class="footer">
        Consulta generada por sistema web
      </div>

    </div>

  </body>
  </html>
  `);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor listo 🚀");
});