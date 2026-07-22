export type CategoryId = "clasicas" | "especiales";

export interface Category {
  id: CategoryId;
  label: string;
  /** Texto corto que se muestra bajo el filtro cuando está activo. */
  blurb: string;
}

export interface Pizza {
  slug: string;
  name: string;
  category: CategoryId;
  /** Precio en pesos colombianos, sin separadores. */
  price: number;
  /** Frase corta para la tarjeta. */
  tagline: string;
  /** Descripción larga para el detalle. */
  description: string;
  ingredients: string[];
  /** Foto recortada de la pizza, para la tarjeta. */
  image: string;
  /** Pieza gráfica original completa, para el detalle. */
  poster: string;
  /** Resalta la tarjeta con el sello de "La favorita". */
  featured?: boolean;
  /** Marca la pizza como picante o con alguna advertencia. */
  badges?: string[];
}
