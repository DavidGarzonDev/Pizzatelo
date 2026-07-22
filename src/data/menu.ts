import type { Category, Pizza } from "@/types/menu";

export const categories: Category[] = [
  {
    id: "clasicas",
    label: "Clásicas",
    blurb: "Las de toda la vida, hechas como debe ser.",
  },
  {
    id: "especiales",
    label: "Especiales",
    blurb: "Combinaciones de la casa con maduro, carnes y quesos.",
  },
];

export const pizzas: Pizza[] = [
  {
    slug: "especial",
    name: "Especial",
    category: "especiales",
    price: 25000,
    tagline: "Carne BBQ, maduro y tocineta",
    description:
      "Nuestra pizza insignia. Carne desmechada en salsa BBQ, maduro dulce y tocineta crocante sobre una base de mozzarella derretida.",
    ingredients: ["Carne BBQ", "Maduro", "Tocineta", "Mozzarella", "Salsa de tomate"],
    image: "/images/pizzas/especial.jpg",
    poster: "/images/posters/especial.jpg",
    featured: true,
  },
  {
    slug: "pollo-champinones",
    name: "Pollo Champiñones",
    category: "especiales",
    price: 25000,
    tagline: "Pollo desmechado y champiñones frescos",
    description:
      "Pollo desmechado jugoso con champiñones frescos laminados y bastante queso mozzarella. Suave, cremosa y con mucho relleno.",
    ingredients: ["Pollo desmechado", "Champiñones frescos", "Mozzarella", "Salsa de tomate"],
    image: "/images/pizzas/pollo-champinones.jpg",
    poster: "/images/posters/pollo-champinones.jpg",
  },
  {
    slug: "samba",
    name: "Samba",
    category: "especiales",
    price: 22000,
    tagline: "Tocineta, maduro y parmesano",
    description:
      "El contraste perfecto entre lo dulce y lo salado: maduro caramelizado, tocineta crocante y una lluvia de queso parmesano.",
    ingredients: ["Tocineta", "Maduro", "Queso parmesano", "Mozzarella", "Salsa de tomate"],
    image: "/images/pizzas/samba.jpg",
    poster: "/images/posters/samba.jpg",
  },
  {
    slug: "hawaiana",
    name: "Hawaiana",
    category: "clasicas",
    price: 22000,
    tagline: "Jamón y piña",
    description:
      "La eterna discusión, resuelta a nuestro favor. Jamón, trozos de piña y queso mozzarella sobre salsa de tomate.",
    ingredients: ["Jamón", "Piña", "Mozzarella", "Salsa de tomate"],
    image: "/images/pizzas/hawaiana.jpg",
    poster: "/images/posters/hawaiana.jpg",
  },
  {
    slug: "pepperoni",
    name: "Pepperoni",
    category: "clasicas",
    price: 22000,
    tagline: "Clásica, deliciosa y llena de sabor",
    description:
      "La que nunca falla. Rodajas generosas de pepperoni sobre mozzarella y salsa de tomate, horneada hasta dorar los bordes.",
    ingredients: ["Pepperoni", "Mozzarella", "Salsa de tomate"],
    image: "/images/pizzas/pepperoni.jpg",
    poster: "/images/posters/pepperoni.jpg",
    featured: true,
  },
];

export function getPizza(slug: string): Pizza | undefined {
  return pizzas.find((p) => p.slug === slug);
}
