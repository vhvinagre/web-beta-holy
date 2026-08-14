export const QUALITY_CHIPS = ["100% Natural", "Alto en Fibra", "Libre Azúcar Añadida"];

export const PRODUCTS = [
    {
        slug: "galletas",
        name: "Galletas de Dátil",
        heroLines: ["GALLETAS", "DE DÁTIL"],
        color: "#4B4FA0",
        price: 6990,
        isNew: true,
        kind: "box",
        tagline: "caja con ventana",
        description:
            "Nuestras galletas de horno lento parten del dátil, no del azúcar. Avena, mantequilla y trozos de verdad en una caja con ventana, para que veas lo que hay.",
        flavors: [
            { id: "arandano", name: "Arándano", image: "/img/galletas-arandano.png", accent: "#8B94F0", blurb: "Arándanos de verdad, acidez justa." },
            { id: "cacao", name: "Cacao", image: "/img/galletas-cacao.png", accent: "#A06B47", blurb: "Cacao amargo que equilibra el dátil." },
            { id: "zanahoria", name: "Zanahoria", image: "/img/galletas-zanahoria.png", accent: "#F09A4B", blurb: "Tipo queque de zanahoria, especias suaves." },
        ],
        ingredients: ["Dátil", "Avena integral", "Mantequilla", "Huevo", "Harina de trigo", "Arándano, cacao o zanahoria según variedad", "Sal de mar"],
        nutrition: [
            ["Energía", "142 kcal"],
            ["Fibra", "3,1 g"],
            ["Azúcares totales", "9,4 g"],
            ["Azúcar añadida", "0 g"],
            ["Porción", "2 galletas (30 g)"],
        ],
    },
    {
        slug: "barritas",
        name: "Barritas de Dátil",
        heroLines: ["BARRITAS", "DE DÁTIL"],
        color: "#A9862F",
        price: 2490,
        isNew: false,
        kind: "bar",
        tagline: "prensadas, sin horno",
        description:
            "Dátil prensado con frutos secos y semillas, sin horno ni apuros. Cabe en el bolsillo, rinde en la media tarde y se lee de corrido: pocos ingredientes, todos conocidos.",
        flavors: [
            { id: "berries", name: "Berries", image: "/img/barrita-berries.png", accent: "#7D8CE8", blurb: "Berries deshidratados, toque ácido." },
            { id: "avellana", name: "Avellana", image: "/img/barrita-avellana.png", accent: "#E08A52", blurb: "Avellana tostada, la más cremosa." },
            { id: "semillas", name: "Semillas", image: "/img/barrita-semillas.png", accent: "#EFC65C", blurb: "Chía y sésamo, crunch completo." },
        ],
        ingredients: ["Dátil", "Almendras", "Nueces", "Semillas de chía y sésamo", "Berries deshidratados según variedad", "Sal de mar"],
        nutrition: [
            ["Energía", "118 kcal"],
            ["Fibra", "2,8 g"],
            ["Azúcares totales", "11,2 g"],
            ["Azúcar añadida", "0 g"],
            ["Porción", "1 barrita (28 g)"],
        ],
    },
    {
        slug: "pasta-avellana",
        name: "Pasta de Dátil + Avellana",
        heroLines: ["PASTA DE DÁTIL", "+ AVELLANA"],
        color: "#B5652E",
        price: 8490,
        isNew: false,
        kind: "jar",
        tagline: "untable de dos ingredientes",
        description:
            "Dos ingredientes y nada más: dátil y avellana, molidos lento hasta quedar cremosos. Úntala en pan, súmala al desayuno o cómela a cucharadas. Sin azúcar añadida, sin aceites extra.",
        image: "/img/pasta-avellana.png",
        ingredients: ["Dátil (60%)", "Avellana tostada (40%)"],
        nutrition: [
            ["Energía", "96 kcal"],
            ["Fibra", "1,9 g"],
            ["Azúcares totales", "8,7 g"],
            ["Azúcar añadida", "0 g"],
            ["Porción", "1 cucharada (18 g)"],
        ],
    },
    {
        slug: "jarabe",
        name: "Jarabe de Dátil + Miel",
        heroLines: ["JARABE DE DÁTIL", "+ MIEL"],
        color: "#6E4423",
        price: 9990,
        isNew: true,
        kind: "bottle",
        tagline: "botella gota a gota, tapa de madera",
        description:
            "Dátil y miel de abeja chilena en una botella gota a gota con tapa de madera. Endulza el té, los panqueques o el yogurt con dulzor de verdad. Nuevo lanzamiento.",
        image: "/img/jarabe-datil-miel.png",
        ingredients: ["Dátil", "Miel de abeja chilena", "Agua"],
        nutrition: [
            ["Energía", "64 kcal"],
            ["Fibra", "0,8 g"],
            ["Azúcares totales", "15,1 g"],
            ["Azúcar añadida", "0 g"],
            ["Porción", "1 cucharada (20 g)"],
        ],
    },
];

export const getProduct = (slug) => PRODUCTS.find((p) => p.slug === slug);

export const getDefaultImage = (product) => (product.flavors ? product.flavors[0].image : product.image);

export const clp = (n) => "$" + n.toLocaleString("es-CL");
