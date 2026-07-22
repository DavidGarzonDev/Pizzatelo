# Pizzatelo · Menú interactivo

Menú web de **Pizzatelo Yumbo**: catálogo de pizzas con filtros, buscador, ficha
de detalle y pedido directo por WhatsApp.

## Stack

- **Next.js 15** (App Router) — se despliega en Vercel sin configuración
- **TypeScript** en modo estricto
- **Tailwind CSS v4** con la paleta de la marca en `src/app/globals.css`
- Página estática (SSG): no necesita base de datos ni variables de entorno

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
```

Otros comandos:

```bash
npm run build      # build de producción
npm run start      # sirve el build
npm run typecheck  # revisa tipos sin compilar
npm run lint       # ESLint
```

## Estructura

```
src/
├── app/
│   ├── layout.tsx        # fuentes, metadatos y SEO
│   ├── page.tsx          # composición de la página + datos estructurados
│   └── globals.css       # paleta, tipografías y animaciones
├── components/
│   ├── Header.tsx        # navegación fija con menú móvil
│   ├── Hero.tsx          # portada
│   ├── MenuExplorer.tsx  # filtros, buscador y grilla (cliente)
│   ├── PizzaCard.tsx     # tarjeta de cada pizza
│   ├── PizzaDialog.tsx   # ficha de detalle
│   ├── Payments.tsx      # métodos de pago con copiar al portapapeles
│   ├── Hours.tsx         # horarios y llamada a la acción
│   ├── Footer.tsx
│   ├── WhatsAppFab.tsx   # botón flotante
│   └── ui/Reveal.tsx     # animación al entrar en pantalla
├── config/site.ts        # ⭐ teléfonos, cuentas, horarios y redes
├── data/menu.ts          # ⭐ las pizzas: nombre, precio, ingredientes
├── lib/                  # formato de precios y enlaces de WhatsApp
└── types/menu.ts
```

## Cómo actualizar el menú

Todo el contenido editable vive en dos archivos:

- **`src/config/site.ts`** — número de WhatsApp, cuentas de pago, horarios, redes.
- **`src/data/menu.ts`** — las pizzas. Para agregar una nueva, copia un bloque
  existente y cambia los campos:

  ```ts
  {
    slug: "vegetariana",              // identificador único, sin espacios
    name: "Vegetariana",
    category: "clasicas",             // "clasicas" | "especiales"
    price: 22000,                     // sin puntos ni símbolos
    tagline: "Verduras frescas al horno",
    description: "Texto largo para la ficha de detalle.",
    ingredients: ["Pimentón", "Cebolla", "Champiñones", "Mozzarella"],
    image: "/images/pizzas/vegetariana.png",    // foto recortada, cuadrada
    poster: "/images/posters/vegetariana.jpg",  // pieza gráfica completa
  }
  ```

Las imágenes van en `public/images/pizzas/` (foto cuadrada para la tarjeta) y
`public/images/posters/` (la pieza gráfica original para el detalle).

## Despliegue en Vercel

El proyecto no necesita variables de entorno ni ajustes especiales.

1. Sube el código a GitHub.
2. En Vercel: **Add New → Project → Import** este repositorio.
3. Vercel detecta **Next.js** automáticamente. Deja todos los valores por
   defecto (Root Directory `./`, Build Command y Output Directory automáticos).
4. **Deploy**.

Cada `git push` a `main` publica una nueva versión.

Después del despliegue, actualiza `url` en `src/config/site.ts` con el dominio
real para que los enlaces al compartir en redes muestren la vista previa correcta.
