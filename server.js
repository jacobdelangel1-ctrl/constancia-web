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
  res.send(`
    <!doctype html>
    <html lang="es">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Registro fiscal</title>
      <style>
        body {
          margin: 0;
          font-family: Arial, Helvetica, sans-serif;
          background: #f3f4f6;
          color: #111827;
        }
        .wrap {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .card {
          width: 100%;
          max-width: 720px;
          background: #ffffff;
          border-radius: 18px;
          box-shadow: 0 10px 30px rgba(0,0,0,.08);
          overflow: hidden;
          border: 1px solid #e5e7eb;
        }
        .header {
          padding: 28px 28px 18px;
          background: linear-gradient(135deg, #111827, #374151);
          color: #fff;
        }
        .header h1 {
          margin: 0 0 8px;
          font-size: 26px;
        }
        .header p {
          margin: 0;
          opacity: .9;
          line-height: 1.5;
        }
        .content {
          padding: 28px;
        }
        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .field {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          padding: 16px;
        }
        .label {
          font-size: 12px;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: #6b7280;
          margin-bottom: 8px;
        }
        .value {
          font-size: 20px;
          font-weight: 700;
          word-break: break-word;
        }
        .note {
          margin-top: 18px;
          font-size: 14px;
          color: #6b7280;
          line-height: 1.5;
        }
        form {
          display: grid;
          grid-template-columns: 1fr 1fr auto;
          gap: 12px;
          margin-top: 20px;
        }
        input {
          width: 100%;
          padding: 14px 16px;
          border-radius: 12px;
          border: 1px solid #d1d5db;
          font-size: 16px;
          outline: none;
          box-sizing: border-box;
        }
        input:focus {
          border-color: #111827;
        }
        button {
          border: 0;
          border-radius: 12px;
          padding: 14px 18px;
          background: #111827;
          color: #fff;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
        }
        button:hover {
          opacity: .92;
        }
        .footer {
          padding: 18px 28px 28px;
          color: #9ca3af;
          font-size: 12px;
        }
        @media (max-width: 720px) {
          .grid, form {
            grid-template-columns: 1fr;
          }
          button {
            width: 100%;
          }
        }
      </style>
    </head>
    <body>
      <div class="wrap">
        <div class="card">
          <div class="header">
            <h1>Registro fiscal</h1>
            <p>Consulta rápida de datos ingresados por URL o con el formulario.</p>
          </div>

          <div class="content">
            <div class="grid">
              <div class="field">
                <div class="label">RFC</div>
                <div class="value">${escapeHtml(req.query.rfc || "Escribe tu RFC abajo")}</div>
              </div>

              <div class="field">
                <div class="label">ID CIF</div>
                <div class="value">${escapeHtml(req.query.idcif || "Escribe tu ID CIF abajo")}</div>
              </div>
            </div>

            <form method="get" action="/registro">
              <input type="text" name="rfc" placeholder="RFC" value="${escapeHtml(req.query.rfc || "")}">
              <input type="text" name="idcif" placeholder="ID CIF" value="${escapeHtml(req.query.idcif || "")}">
              <button type="submit">Ver registro</button>
            </form>

            <div class="note">
              Usa la ruta <strong>/registro</strong> con parámetros como:
              <strong>?rfc=GAHH970828RN3&idcif=15100646867</strong>
            </div>
          </div>

          <div class="footer">
            Página informativa personalizada.
          </div>
        </div>
      </div>
    </body>
    </html>
  `);
});

app.get("/registro", (req, res) => {
  const rfc = req.query.rfc ? escapeHtml(req.query.rfc) : "No proporcionado";
  const idcif = req.query.idcif ? escapeHtml(req.query.idcif) : "No proporcionado";

  res.send(`
    <!doctype html>
    <html lang="es">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Registro fiscal</title>
      <style>
        body {
          margin: 0;
          font-family: Arial, Helvetica, sans-serif;
          background: #f3f4f6;
          color: #111827;
        }
        .wrap {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .card {
          width: 100%;
          max-width: 760px;
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 10px 30px rgba(0,0,0,.08);
          overflow: hidden;
          border: 1px solid #e5e7eb;
        }
        .top {
          padding: 26px 28px;
          background: linear-gradient(135deg, #0f172a, #1f2937);
          color: white;
        }
        .top h1 {
          margin: 0 0 8px;
          font-size: 28px;
        }
        .top p {
          margin: 0;
          opacity: .9;
        }
        .content {
          padding: 28px;
        }
        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .item {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          padding: 18px;
        }
        .label {
          font-size: 12px;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: #6b7280;
          margin-bottom: 8px;
        }
        .value {
          font-size: 22px;
          font-weight: 700;
          word-break: break-word;
        }
        .status {
          margin-top: 16px;
          display: inline-block;
          padding: 8px 12px;
          border-radius: 999px;
          background: #dcfce7;
          color: #166534;
          font-weight: 700;
          font-size: 13px;
        }
        .note {
          margin-top: 18px;
          font-size: 14px;
          color: #6b7280;
          line-height: 1.5;
        }
        .back {
          display: inline-block;
          margin-top: 20px;
          text-decoration: none;
          color: #111827;
          font-weight: 700;
        }
        @media (max-width: 720px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
      </style>
    </head>
    <body>
      <div class="wrap">
        <div class="card">
          <div class="top">
            <h1>Registro fiscal</h1>
            <p>Vista de datos ingresados</p>
          </div>
          <div class="content">
            <div class="grid">
              <div class="item">
                <div class="label">RFC</div>
                <div class="value">${rfc}</div>
              </div>
              <div class="item">
                <div class="label">ID CIF</div>
                <div class="value">${idcif}</div>
              </div>
            </div>

            <div class="status">ACTIVO</div>

            <div class="note">
              Esta es una página informativa personalizada para mostrar datos capturados por URL.
            </div>

            <a class="back" href="/">← Volver</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor listo en el puerto ${PORT}`);
});