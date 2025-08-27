import { PizzaSize, Product } from "../types";

export const pizzaSizes: PizzaSize[] = [
  {
    id: "personal",
    name: "Personal",
    portions: 4,
    price: 15000,
    maxFlavors: 2,
  },
  { id: "pequeña", name: "Pequeña", portions: 6, price: 25000, maxFlavors: 2 },
  { id: "mediana", name: "Mediana", portions: 8, price: 35000, maxFlavors: 2 },
  { id: "grande", name: "Grande", portions: 10, price: 50000, maxFlavors: 3 },
  {
    id: "familiar",
    name: "Familiar",
    portions: 12,
    price: 70000,
    maxFlavors: 3,
  },
  {
    id: "extragrande",
    name: "Extra Grande",
    portions: 16,
    price: 90000,
    maxFlavors: 4,
  },
];

export const pizzaFlavorCategories = [
  {
    name: "Pizzas Clásicas",
    flavors: [
      {
        name: "Campesina",
        description:
          "Pollo, chorizo, tocineta, champiñones y cebolla caramelizada",
        imageUrl: "/pizzas/pizza.jpg",
      },
      {
        name: "Leñador",
        description: "Carne molida, chorizo, jamón, tocineta y queso extra",
        imageUrl: "/pizzas/pizza.jpg",
      },
      {
        name: "Costillas BBQ",
        description:
          "Costillas desmechadas en salsa BBQ, cebolla morada y cilantro",
        imageUrl: "/pizzas/pizza.jpg",
      },
      {
        name: "Americana",
        description: "Pepperoni, jamón, salami y queso mozzarella",
        imageUrl: "/pizzas/pizza.jpg",
      },
      {
        name: "Margarita",
        description: "Tomate fresco, albahaca, mozzarella y aceite de oliva",
        imageUrl: "/pizzas/pizza.jpg",
      },
    ],
  },
  {
    name: "Pizzas de Pollo",
    flavors: [
      {
        name: "Pollo Especial",
        description:
          "Pollo a la plancha, champiñones, pimentón y hierbas finas",
        imageUrl: "/pizzas/pizza.jpg",
      },
      {
        name: "Champiñones",
        description: "Champiñones frescos, cebolla, ajo y queso parmesano",
        imageUrl: "/pizzas/pizza.jpg",
      },
      {
        name: "Pollo Tocineta",
        description: "Pollo desmenuzado, tocineta crujiente y cebolla grillada",
        imageUrl: "/pizzas/pizza.jpg",
      },
      {
        name: "Pollo BBQ",
        description: "Pollo en salsa BBQ, cebolla morada, maíz y cilantro",
        imageUrl: "/pizzas/pizza.jpg",
      },
    ],
  },
  {
    name: "Pizzas de Carne",
    flavors: [
      {
        name: "Carne Mexicana",
        description: "Carne molida, jalapeños, frijoles, maíz y salsa picante",
        imageUrl: "/pizzas/pizza.jpg",
      },
      {
        name: "Boloñesa",
        description: "Salsa boloñesa casera, carne molida y queso parmesano",
        imageUrl: "/pizzas/pizza.jpg",
      },
      {
        name: "Mixta",
        description: "Jamón, salami, champiñones, pimentón y aceitunas",
        imageUrl: "/pizzas/pizza.jpg",
      },
      {
        name: "Ranchera",
        description: "Carne desmechada, frijoles, aguacate y salsa ranchera",
        imageUrl: "/pizzas/pizza.jpg",
      },
    ],
  },
  {
    name: "Pizzas Dulces",
    flavors: [
      {
        name: "Dulce Hawaiana",
        description: "Jamón dulce, piña fresca, cereza y queso mozzarella",
        imageUrl: "/pizzas/pizza.jpg",
      },
    ],
  },
];

export const products: Product[] = [
  // Hamburguesas
  {
    id: "ham1",
    name: "Leñador Sencilla",
    category: "hamburguesas",
    price: 12000,
    description: "Carne, queso, vegetales frescos y nuestra salsa especial",
    imageUrl: "/hamburguesas/10059.jpg",
  },
  {
    id: "ham2",
    name: "Mixta",
    category: "hamburguesas",
    price: 15000,
    description: "Carne de res, pollo, queso, tocineta y vegetales frescos",
    imageUrl: "/hamburguesas/10059.jpg",
  },
  {
    id: "ham3",
    name: "Doble Carne",
    category: "hamburguesas",
    price: 18000,
    description: "Doble porción de carne, doble queso y todas nuestras salsas",
    imageUrl: "/hamburguesas/10059.jpg",
  },
  {
    id: "ham4",
    name: "Triple Golpe",
    category: "hamburguesas",
    price: 22000,
    description: "Triple carne, triple queso, tocineta y huevo frito",
    imageUrl: "/hamburguesas/10059.jpg",
  },
  {
    id: "ham5",
    name: "La Criolla",
    category: "hamburguesas",
    price: 16000,
    description: "Carne, queso, aguacate, plátano maduro y salsa tártara",
    imageUrl: "/hamburguesas/10059.jpg",
  },

  // Picadas
  {
    id: "pic1",
    name: "Sencilla",
    category: "picadas",
    price: 25000,
    description: "Carne, pollo, chorizo, papas a la francesa y patacones",
    imageUrl: "/picadas/10077.jpg",
  },
  {
    id: "pic2",
    name: "Especial",
    category: "picadas",
    price: 35000,
    description:
      "Carne, pollo, chorizo, costillas, morcilla, chicharrón y papas",
    imageUrl: "/picadas/10077.jpg",
  },

  // Perros calientes
  {
    id: "per1",
    name: "Sencillo",
    category: "perros",
    price: 8000,
    description: "Salchicha, pan, queso rallado, papas y salsas",
    imageUrl: "/perros/10069.jpg",
  },
  {
    id: "per2",
    name: "Mechi Pollo",
    category: "perros",
    price: 12000,
    description: "Salchicha, pollo mechado, queso gratinado y papas trituradas",
    imageUrl: "/perros/10069.jpg",
  },
  {
    id: "per3",
    name: "Club House",
    category: "perros",
    price: 15000,
    description: "Doble salchicha, tocineta, huevo de codorniz y queso cheddar",
    imageUrl: "/perros/10069.jpg",
  },

  // Especiales
  {
    id: "esp1",
    name: "Salchipapa",
    category: "especiales",
    price: 12000,
    description: "Salchicha, papas a la francesa, queso gratinado y salsas",
    imageUrl: "/especiales/chuleta de cerdo.jpg",
  },
  {
    id: "esp2",
    name: "Choripapa",
    category: "especiales",
    price: 14000,
    description: "Chorizo, papas a la francesa, queso gratinado y salsas",
    imageUrl: "/especiales/chuleta de cerdo.jpg",
  },
  {
    id: "esp3",
    name: "Leña Papa",
    category: "especiales",
    price: 16000,
    description: "Carne desmechada, papas a la francesa y queso gratinado",
    imageUrl: "/especiales/chuleta de cerdo.jpg",
  },
  {
    id: "esp4",
    name: "Hacha Brava",
    category: "especiales",
    price: 18000,
    description: "Pollo, carne, chorizo, papas a la francesa y salsa de ajo",
    imageUrl: "/especiales/chuleta de cerdo.jpg",
  },
  {
    id: "esp5",
    name: "La Leña Breva",
    category: "especiales",
    price: 20000,
    description:
      "Mix de carnes, maíz tierno, queso mozzarella y papas criollas",
    imageUrl: "/especiales/chuleta de cerdo.jpg",
  },
];

export const categories = {
  pizzas: "Pizzas",
  hamburguesas: "Hamburguesas",
  picadas: "Picadas",
  perros: "Perros Calientes",
  especiales: "Especiales",
};
