import { bcryptAdapter } from "../../config";

export const seedData = {
  categories: [
    {
      name: "Pasteles",
      description:
        "Variedad de pasteles de crema, chocolate, vainilla y frutilla",
    },
    {
      name: "Licuados",
      description:
        "Bebidas saludables hechas con frutas frescas y otros ingredientes nutritivos",
    },
    {
      name: "Masas",
      description:
        "Productos de repostería como galletas, panqueques y queques",
    },
    {
      name: "Té, Café y Jugos",
      description:
        "Bebidas calientes y frías, incluyendo tés, cafés y jugos naturales",
    },
  ],
  products: [
    {
      name: "Pastel de Crema",
      price: 25.0,
      stock: 50,
      description:
        "Pastel con relleno de mermelada de frutilla, glaseado de crema, durazno y frutilla",
      img: "pastel_de_crema",
      category: "Pasteles",
    },
    {
      name: "Pastel de Chocolate",
      price: 30.0,
      stock: 40,
      description:
        "Pastel con relleno de mermelada de frutilla, glaseado de crema y cubierta de chocolate",
      img: "pastel_de_chocolate",
      category: "Pasteles",
    },
    {
      name: "Pastel de Vainilla",
      price: 28.0,
      stock: 45,
      description:
        "Pastel con relleno de mermelada de frutilla, glaseado de crema y cubierta de vainilla",
      img: "pastel_de_vainilla",
      category: "Pasteles",
    },
    {
      name: "Pastel de Frutilla",
      price: 30.0,
      stock: 35,
      description:
        "Pastel con relleno de mermelada de frutilla, glaseado de crema y retazos de durazno",
      img: "pastel_de_frutilla",
      category: "Pasteles",
    },
    {
      name: "Licuado de Plátano",
      price: 10.0,
      stock: 60,
      description: "Licuado con leche, plátano, chía y pedazos de plátano",
      img: "licuado_de_platano",
      category: "Licuados",
    },
    {
      name: "Licuado de Frutilla",
      price: 12.0,
      stock: 55,
      description: "Licuado con frutilla, plátano, chía y pedazos de frutilla",
      img: "licuado_de_frutilla",
      category: "Licuados",
    },
    {
      name: "Licuado de Papaya",
      price: 10.0,
      stock: 50,
      description: "Licuado con papaya, plátano, chía y pedazos de manzana",
      img: "licuado_de_papaya",
      category: "Licuados",
    },
    {
      name: "Licuado Multivitamínico",
      price: 15.0,
      stock: 40,
      description:
        "Licuado con vitamina C, jugo de naranja, manzana verde, chía y avena",
      img: "licuado_multivitaminico",
      category: "Licuados",
    },
    {
      name: "Galletas",
      price: 8.0,
      stock: 70,
      description:
        "Galletas con masa de almendra, leche de almendras y ralladura de coco",
      img: "galletas",
      category: "Masas",
    },
    {
      name: "Panqueques",
      price: 10.0,
      stock: 50,
      description:
        "Panqueques con masa base, plátano, dulce de albaricoque y miel",
      img: "panqueques",
      category: "Masas",
    },
    {
      name: "Queque de Plátano",
      price: 15.0,
      stock: 45,
      description:
        "Queque hecho con masa de plátano, esencia de vainilla y chispas de chocolate",
      img: "queque_de_platano",
      category: "Masas",
    },
    {
      name: "Queque Marmolado",
      price: 180,
      stock: 40,
      description: "Queque con masa de chocolate y vainilla",
      img: "queque_marmolado",
      category: "Masas",
    },
    {
      name: "Té de Manzanilla",
      price: 5.0,
      stock: 80,
      description: "Infusión relajante de manzanilla",
      img: "te_de_manzanilla",
      category: "Té, Café y Jugos",
    },
    {
      name: "Té de Naranja",
      price: 6.0,
      stock: 75,
      description: "Infusión refrescante de naranja",
      img: "te_de_naranja",
      category: "Té, Café y Jugos",
    },
    {
      name: "Té de Menta",
      price: 5.0,
      stock: 70,
      description: "Infusión de menta, ideal para relajarse",
      img: "te_de_menta",
      category: "Té, Café y Jugos",
    },
    {
      name: "Café Americano",
      price: 8.0,
      stock: 60,
      description: "Café americano, perfecto para las mañanas",
      img: "cafe_americano",
      category: "Té, Café y Jugos",
    },
  ],
};
