"""Genera public/images/og.jpg — la imagen de vista previa al compartir el link.

Renderiza un HTML con la tipografía y paleta de la marca, lo captura a
1200x630 con Playwright y lo exporta como JPEG. Uso:

    python3 scripts/og_build.py            # escribe el HTML temporal
    node scripts/og_shot.mjs               # captura y exporta el JPEG

Si cambias el titular, los chips o la pizza, edita las constantes de abajo
y vuelve a correr ambos pasos.
"""
import base64
import io
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUB = os.path.join(ROOT, "public", "images")
OUT_HTML = os.path.join(ROOT, "scripts", ".og.html")

# --- contenido editable -----------------------------------------------------
HEADLINE_HTML = "Cocina<br>oculta"
CHIPS = ["Mediana · 30 cm", "Domicilios", "Desde $22.000"]  # el último se pinta en verde
PIZZA_FILE = "pizzas/especial.jpg"
# ---------------------------------------------------------------------------


def data_uri(path: str, mime: str) -> str:
    with open(path, "rb") as fh:
        return f"data:{mime};base64,{base64.b64encode(fh.read()).decode()}"


logo = data_uri(os.path.join(PUB, "logo.png"), "image/png")
pizza = data_uri(os.path.join(PUB, PIZZA_FILE), "image/jpeg")

chips_html = ""
for i, chip in enumerate(CHIPS):
    cls = "chip price" if i == len(CHIPS) - 1 else "chip"
    chips_html += f'<div class="{cls}">{chip}</div>'

html = f"""<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  * {{ margin: 0; padding: 0; box-sizing: border-box; }}
  body {{
    width: 1200px; height: 630px; overflow: hidden;
    background: #060506; color: #f5ebd7;
    font-family: Inter, sans-serif; position: relative;
  }}
  .glow-grape {{
    position: absolute; left: -160px; top: -120px;
    width: 620px; height: 620px; border-radius: 50%;
    background: rgba(123,58,158,0.42); filter: blur(120px);
  }}
  .glow-basil {{
    position: absolute; left: 180px; bottom: -260px;
    width: 520px; height: 520px; border-radius: 50%;
    background: rgba(124,174,42,0.20); filter: blur(120px);
  }}
  .frame {{
    position: absolute; inset: 18px; border-radius: 28px;
    border: 2px solid rgba(123,58,158,0.55);
  }}
  .wrap {{
    position: relative; height: 100%;
    display: grid; grid-template-columns: 1fr 450px; align-items: center;
    padding: 62px 70px 62px 76px;
  }}
  .lockup {{ display: flex; align-items: center; gap: 16px; }}
  .lockup img {{ width: 74px; height: 74px; object-fit: contain; }}
  .lockup .name {{ font-family: Anton, sans-serif; font-size: 34px; letter-spacing: 0.01em; line-height: 1; }}
  .lockup .city {{ font-size: 13px; letter-spacing: 0.42em; color: #96c93d; margin-top: 5px; }}
  h1 {{
    font-family: Anton, sans-serif; font-size: 104px; line-height: 0.92;
    margin-top: 30px; text-transform: uppercase;
    background: linear-gradient(180deg, #fffaf0 0%, #f5ebd7 50%, #d9c8a8 100%);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }}
  .chips {{ display: flex; flex-wrap: wrap; gap: 12px; margin-top: 38px; }}
  .chip {{
    border: 1.5px solid rgba(123,58,158,0.8); border-radius: 999px;
    padding: 11px 22px; font-size: 19px; font-weight: 600; color: #f5ebd7;
  }}
  .chip.price {{ background: #7cae2a; border-color: #7cae2a; color: #060506; }}
  .photo {{
    position: relative; width: 450px; height: 450px;
    display: flex; align-items: center; justify-content: center;
  }}
  .photo::before {{
    content: ""; position: absolute; width: 380px; height: 380px;
    border-radius: 50%; background: rgba(123,58,158,0.5); filter: blur(70px);
  }}
  .photo img {{
    position: relative; width: 430px; height: 430px; border-radius: 50%;
    object-fit: cover; border: 6px solid rgba(150,201,61,0.85);
    box-shadow: 0 30px 70px rgba(0,0,0,0.75);
  }}
</style>
</head>
<body>
  <div class="glow-grape"></div>
  <div class="glow-basil"></div>
  <div class="frame"></div>
  <div class="wrap">
    <div>
      <div class="lockup">
        <img src="{logo}" alt="">
        <div>
          <div class="name">PIZZATELO</div>
          <div class="city">YUMBO</div>
        </div>
      </div>
      <h1>{HEADLINE_HTML}</h1>
      <div class="chips">{chips_html}</div>
    </div>
    <div class="photo"><img src="{pizza}" alt=""></div>
  </div>
</body>
</html>
"""

io.open(OUT_HTML, "w", encoding="utf-8").write(html)
print("HTML escrito:", OUT_HTML)
