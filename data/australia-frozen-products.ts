import type { AustraliaFrozenProductPageData } from "./australia-frozen-product-page";

const assetBase = "/products/australia-frozen";

function slides(
  slug: string,
  filenames: string[],
): AustraliaFrozenProductPageData["carousel"] {
  return filenames.map((filename, index) => ({
    src: `${assetBase}/${slug}/${filename}`,
    alt: `${slug} slide ${index + 1}`,
  }));
}

export const australiaFrozenProductsData: AustraliaFrozenProductPageData[] = [
  {
    slug: "beautiful-bolognese-pasta-bake",
    title: "Bolognese Pasta Bake",
    metaDescription:
      "Bolognese Pasta Bake low in salt, sugar & with no preservatives or artificial colours or flavours. A tasty way towards their 5-a day. At Coles & Woolworths",
    description: [
      "Pasta bake is a classic family favourite and Annabel has paired hers with yet another favourite – Bolognese.",
      "Tender beef is cooked low and slow in a rich tomato sauce with a sprinkling of herbs which provides 2 serves of vegetables for your little one. This silky sauce is stirred through macaroni pasta and topped with tasty cheese, ready for mini diners to devour!",
    ],
    carousel: slides("beautiful-bolognese-pasta-bake", [
      "carousel-1.jpg",
      "carousel-2.jpg",
      "carousel-3.jpg",
      "carousel-4.jpg",
      "carousel-5.jpg",
    ]),
    retailers: {
      woolworths:
        "https://www.woolworths.com.au/shop/productdetails/544364/annabel-karmel-bolognese-pasta-bake",
      coles:
        "https://www.coles.com.au/product/annabel-karmel-meals-bolognaise-pasta-bake-200g-2313244",
      iga: "https://www.igashop.com.au/product/annabel-karmel-pasta-bake-bolognese-431502",
    },
    ingredients: [
      "Tomato Sauce (65%) [Tomatoes (31%) {Tomatoes, Acidity Regulator (330), Firming agent (509)}, Onion, Beef, Water, Carrot, Tomato Paste, Apple Juice Concentrate, Sundried Tomatoes, Cornflour, Capsicum, Parmesan Cheese (**Milk**), Yeast Extract, Garlic, Herbs], Macaroni Pasta (30%) [Water, **Wheat** Semolina], Cheddar Cheese (4%) (**Milk**), Parmesan Cheese (1%) (**Milk**).",
      "**CONTAINS: GLUTEN, WHEAT, MILK.**",
      "**MAY CONTAIN: SULPHITES, ALMOND, BRAZIL NUT, CASHEW, CRUSTACEAN, EGG, FISH, MOLLUSC, PEANUT, SESAME, SOY.**",
      "Attention: Although every care has been taken to remove all bones some may remain.",
    ],
    nutrition: {
      headers: ["", "Per serving", "Per 100g"],
      rows: [
        ["Energy", "960kJ", "480kJ"],
        ["Protein", "11.8g", "5.9g"],
        ["Total Fat", "8g", "4g"],
        ["– saturated", "4g", "2g"],
        ["Carbohydrates", "26g", "13g"],
        ["– sugars", "6.6g", "3.3g"],
        ["Sodium", "238mg", "119mg"],
      ],
    },
  },
  {
    slug: "bolognese-mac-cheese",
    title: "Bolognese Mac & Cheese",
    metaDescription:
      "Two classic family favourites have come together for the ultimate dinner time team-up in this mighty Bolognese Mac & Cheese meal.",
    description: [
      "Two classic family favourites have come together for the ultimate dinner time team-up in this mighty Bolognese Mac & Cheese meal. With a winning combination of creamy, cheesy macaroni pasta and a rich Bolognese sauce with delicious veggies, the latest recipe from Annabel's kitchen is a guaranteed hit.",
    ],
    carousel: slides("bolognese-mac-cheese", ["carousel-1.jpg"]),
    retailers: {
      coles:
        "https://www.coles.com.au/product/annabel-karmel-loaded-mac-and-cheese-200g-1056306",
    },
    ingredients: [
      "Bolognese Meat Sauce (36%)(Crushed Tomato (Tomato, Acidity Regulator (330)), Australian Beef, Onion, Water, Carrot, Tomato Paste, Apple Juice Concentrate, Sundried Tomato (Sulphites), Corn Starch, Red Capsicum, Parmesan Cheese (**Milk**), Garlic, Yeast Extract, Natural Flavour, Herbs), Cooked Pasta (33%), (Water, Durum **Wheat** Semolina), Cheese sauce (31%) (Water, Cheddar Cheese (**Milk**), Butter (**Milk**), Parmesan Cheese (**Milk**), Corn Starch, Milk Solids, **Wheat** Flour, Apple Juice Concentrate, Natural Flavour (**Milk**), Yeast Flakes, Yeast Extract, Onion Powder, Mustard Powder, Garlic Powder, Worcestershire Sauce).",
      "**CONTAINS: MILK, WHEAT, GLUTEN, SULPHITES.**",
      "**MAY CONTAIN: SULPHITES, ALMOND, BRAZIL NUT, CASHEW, CRUSTACEAN, EGG, FISH, MOLLUSC, PEANUT, SESAME, SOY.**",
    ],
    nutrition: {
      headers: ["", "Per serving", "Per 100g"],
      rows: [
        ["Energy", "980kJ", "490kJ"],
        ["Protein", "10.0g", "5.0g"],
        ["Total Fat", "9.2g", "4.6g"],
        ["– of which saturates", "5.4g", "2.7g"],
        ["Carbohydrates", "27.6g", "13.8g"],
        ["– sugars", "5.2g", "2.6g"],
        ["Sodium", "262mg", "131mg"],
      ],
    },
  },
  {
    slug: "comforting-beef-cottage-pie",
    title: "Beef Cottage Pie",
    metaDescription:
      "Cosy, comforting and full of goodness, Annabel's healthy cottage pie for kids contains 3.5 serves of vegetables and comes topped with an irresistible cheesy mash.",
    description: [
      "Cottage pie is a go-to family favourite – and for good reason! Cosy, comforting and full of goodness, it's a winner of a dinner.",
      "Annabel's healthy cottage pie for kids contains 3.5 serves of vegetables and comes topped with an irresistible cheesy mash, as all cottage pies should!",
    ],
    carousel: slides("comforting-beef-cottage-pie", [
      "carousel-1.jpg",
      "carousel-2.jpg",
      "carousel-3.jpg",
      "carousel-4.jpg",
    ]),
    retailers: {
      woolworths:
        "https://www.woolworths.com.au/shop/productdetails/544365/annabel-karmel-cottage-pie-null",
      coles: "https://www.coles.com.au/product/annabel-karmel-meals-cottage-pie-200g-2313346",
      iga: "https://www.igashop.com.au/product/annabel-karmel-meals-cottage-pie-431560",
    },
    ingredients: [
      "Potato & Carrot Mash (55%) (Potato (40%), Carrot (10%), Milk Solids, Vegetable Oil, Cheddar Cheese (**Milk**), Natural Flavours (**Milk**, **Wheat**), Parmesan Cheese (**Milk**), Unsalted Butter (**Milk**), **Wheat** Fibre], Gravy Sauce (45%) [Tomatoes {Tomatoes, Acidity Regulator (330), Firming Agent (509)}, Water, Beef (9%), Vegetables {Onion, Carrot, Red Capsicum (1.5%)}, Cornflour, Sundried Tomatoes, Apple, Tomato Paste, Tomato Sauce (Acidity regulator (260, 330)), Parmesan Cheese (**Milk**), Yeast Extract, Worcestershire Sauce, Garlic, Herbs, Apple Juice Concentrate).",
      "**CONTAINS: GLUTEN, WHEAT, MILK.**",
      "**MAY CONTAIN: SULPHITES, ALMOND, BRAZIL NUT, CASHEW, CRUSTACEAN, EGG, FISH, MOLLUSC, PEANUT, SESAME, SOY.**",
    ],
    nutrition: {
      headers: ["", "Per serving", "Per 100g"],
      rows: [
        ["Energy", "754kJ", "377kJ"],
        ["Protein", "8.8g", "4.4g"],
        ["Total Fat", "8.2g", "4.1g"],
        ["– of which saturates", "3.2g", "1.6g"],
        ["Carbohydrates", "17.8g", "8.9g"],
        ["– sugars", "5g", "2.5g"],
        ["Sodium", "232mg", "116mg"],
      ],
    },
  },
  {
    slug: "delicious-mild-butter-chicken-rice",
    title: "Mild Butter Chicken & Rice",
    metaDescription:
      "Annabel's yummy butter chicken is a must-try with just the right amount of aromatic spice and flavour, served with rice and vegetables.",
    description: [
      "Renowned for getting kids exploring and enjoying new flavours, Annabel's yummy butter chicken is a must-try with just the right amount of aromatic spice and flavour. Tender bite-sized pieces of chicken breast are paired with a mildly spiced creamy butter sauce to bring you this tasty toddler tea.",
      "This flavour-packed chicken dish also comes served with rice and vegetables for your mini food explorer to mix as they wish.",
    ],
    carousel: slides("delicious-mild-butter-chicken-rice", [
      "carousel-1.jpg",
      "carousel-2.jpg",
      "carousel-3.jpg",
      "carousel-4.jpg",
      "carousel-5.jpg",
    ]),
    retailers: {
      woolworths:
        "https://www.woolworths.com.au/shop/productdetails/544693/annabel-karmel-butter-chicken-rice",
      coles: "https://www.coles.com.au/product/annabel-karmel-butter-chicken-200g-2821915",
      iga: "https://www.igashop.com.au/product/annabel-karmel-butter-chicken-rice-749803",
    },
    ingredients: [
      "Rice & Vegetable Mix (52%) [Water, Rice (31%), Vegetables (16%) {Corn, Carrot}, Vegetable Oil, Yeast Extract, Spices], Butter Sauce (40%) (Tomatoes (15%) {Tomatoes, Firming Agent (509), Acidity Regulator (330)}, Water, Cream (**Milk**), Onion, Yoghurt (**Milk**), Cornflour, Honey, Butter (**Milk**), Spices, Garlic, Yeast Extracts (Natural Flavours), Herbs, Paprika Extract, Ginger], Cooked Chicken Breast (8%) [Chicken, Water, Potato Starch, **Wheat** Fibre, Cornflour].",
      "**CONTAINS: GLUTEN, WHEAT, MILK.**",
      "**MAY CONTAIN: SULPHITES, ALMOND, BRAZIL NUT, CASHEW, CRUSTACEAN, EGG, FISH, MOLLUSC, PEANUT, SESAME, SOY.**",
    ],
    nutrition: {
      headers: ["", "Per serving", "Per 100g"],
      rows: [
        ["Energy", "1030kJ", "514kJ"],
        ["Protein", "7.2g", "3.6g"],
        ["Total Fat", "8.4g", "4.2g"],
        ["– saturated", "4.1g", "2.1g"],
        ["Carbohydrates", "35.6g", "17.8g"],
        ["– sugars", "3.6g", "1.8g"],
        ["Sodium", "238mg", "119mg"],
      ],
    },
  },
  {
    slug: "scrumptious-spaghetti-meatballs",
    title: "Spaghetti & Meatballs",
    metaDescription:
      "A super-tasty spaghetti meatballs recipe packed full of veggies. Soft and tender beef meatballs and veg-packed tomato sauce topped with Parmesan cheese.",
    description: [
      "Family favourite alert! Kids love to slurp on spaghetti and meatballs with tomato sauce is always a hit.",
      "Don't miss this dinner time favourite from Annabel's kitchen. Re-fuel after a busy day with our super-tasty spaghetti meatballs recipe which is packed full of those all-important veggies. The combination of soft and tender beef meatballs and veg-packed tomato sauce topped with Parmesan cheese, packs a real flavour punch toddlers will love.",
    ],
    carousel: slides("scrumptious-spaghetti-meatballs", [
      "carousel-1.jpg",
      "carousel-2.jpg",
      "carousel-3.jpg",
      "carousel-4.jpg",
      "carousel-5.jpg",
    ]),
    retailers: {
      woolworths:
        "https://www.woolworths.com.au/shop/productdetails/544369/annabel-karmel-spaghetti-meatballs-null",
      coles:
        "https://www.coles.com.au/product/annabel-karmel-meals-spaghetti-and-meatballs-200g-2313335",
      iga: "https://www.igashop.com.au/product/annabel-karmel-spaghetti-meatballs-957074",
    },
    ingredients: [
      "Tomato & Red Capsicum Sauce (53%) [Water, Tomato Paste, Tomatoes (8%) {Tomatoes, Food Acid (330), Firming Agent (509)}, Onion, Apple Juice Concentrate, Red Capsicum (1.5%), Garlic, Cornflour, Sundried Tomatoes, Carrots, Yeast Extract, Herbs], Beef Meatballs (20%) [Beef, Onion, Breadcrumbs (**Wheat**), Water, Rice Flour, Apple, Natural Flavour (**Milk**), Yeast Extract, Parmesan Cheese (**Milk**), Herbs], Cooked Pasta (25%) [Water, **Wheat** Semolina], Parmesan Cheese (**Milk**).",
      "**CONTAINS GLUTEN, WHEAT, MILK.**",
      "**MAY CONTAIN: SULPHITES, ALMOND, BRAZIL NUT, CASHEW, CRUSTACEAN, EGG, FISH, MOLLUSC, PEANUT, SESAME, SOY.**",
    ],
    nutrition: {
      headers: ["", "Per serving", "Per 100g"],
      rows: [
        ["Energy", "867kJ", "433kJ"],
        ["Protein", "10.5g", "5.3g"],
        ["Total Fat", "5g", "2.5g"],
        ["– saturated", "2.2g", "1.1g"],
        ["Carbohydrates", "28.5g", "14.3g"],
        ["– sugars", "7.5g", "3.8g"],
        ["Sodium", "238mg", "119mg"],
      ],
    },
  },
  {
    slug: "tasty-veggie-pasta-bake",
    title: "Veggie Pasta Bake",
    metaDescription:
      "Annabel's tasty and nutritious pasta sauce is made using tomato, carrot and red capsicum and provides 1.5 serves of vegetables for your little one.",
    description: [
      "Pasta bake is one 'kid-approved' dish! Annabel's tasty and nutritious pasta sauce is made using tomato, carrot and red capsicum and provides 1.5 serves of vegetables for your little one. Paired with a creamy, three cheese sauce, this dish is one which is sure to please those discerning diners.",
      "To make it extra special we use a pasta which is small and short with ridged sides; perfect for tiny hands and mouths.",
    ],
    carousel: slides("tasty-veggie-pasta-bake", [
      "carousel-1.jpg",
      "carousel-2.jpg",
      "carousel-3.jpg",
      "carousel-4.jpg",
    ]),
    retailers: {
      woolworths:
        "https://www.woolworths.com.au/shop/productdetails/544368/annabel-karmel-veggie-pasta-bake-frozen-meal",
      coles:
        "https://www.coles.com.au/product/annabel-karmel-meals-vegetable-and-pasta-bake-200g-2313357",
      iga: "https://www.igashop.com.au/product/annabel-karmel-veggie-pasta-bake-431670",
    },
    ingredients: [
      "Vegetable Sauce (72%) [Tomatoes (21%) (Acidity Regulator (330), Firming Agent (509)), Vegetables (Onion, Carrot (3%), Red Capsicum (1%)), Water, Tomato Paste, Sundried Tomatoes, Parmesan Cheese (3%) (**Milk**), Apple Juice Concentrate, Cornflour, Garlic, Herbs], Cooked Pasta (26%) [**Wheat** Semolina, Water], Topping (2%) [Cheddar Cheese (**Milk**), Parmesan Cheese (**Milk**) Mozzarella Cheese (**Milk**)].",
      "**CONTAINS: GLUTEN, WHEAT, MILK**",
      "**MAY CONTAIN: SULPHITES, ALMOND, BRAZIL NUT, CASHEW, CRUSTACEAN, EGG, FISH, MOLLUSC, PEANUT, SESAME, SOY.**",
    ],
    nutrition: {
      headers: ["", "Per serving", "Per 100g"],
      rows: [
        ["Energy", "692kJ", "346kJ"],
        ["Protein", "7.7g", "3.8g"],
        ["Total Fat", "2.2g", "1.1g"],
        ["– saturated", "1.2g", "0.6g"],
        ["Carbohydrate", "26.6g", "13.3g"],
        ["– sugars", "7.6g", "3.8g"],
        ["Sodium", "238mg", "119mg"],
      ],
    },
  },
  {
    slug: "macaroni-cheese",
    title: "Macaroni Cheese",
    metaDescription:
      "Macaroni pasta paired with a thick and creamy cheese sauce, finished off with perfectly sized broccoli pieces. A sure-fire bet for toddler teatime.",
    description: [
      "Is macaroni cheese one of your toddler's teatime favourites? This yummy meal is a sure-fire bet when it comes to passing the toddler taste test! Macaroni pasta is paired with a thick and creamy cheese sauce, finished off with a pop of colour (and goodness!) with perfectly sized broccoli pieces.",
    ],
    carousel: slides("macaroni-cheese", [
      "carousel-1.jpg",
      "carousel-2.jpg",
      "carousel-3.jpg",
      "carousel-4.jpg",
      "carousel-5.jpg",
    ]),
    retailers: {
      woolworths:
        "https://www.woolworths.com.au/shop/productdetails/544366/annabel-karmel-mac-cheese-pasta-frozen-meal",
      coles: "https://www.coles.com.au/product/annabel-karmel-meals-mac-cheese-200g-2821960",
      iga: "https://www.igashop.com.au/product/annabel-karmel-macaroni-cheese-749780",
    },
    ingredients: [
      "Cheese Sauce (45%) [Water, Cheddar Cheese (**Milk**), Butter (**Milk**), Parmesan Cheese (**Milk**), Corn Flour, Honey, Apple Juice Concentrate, Milk solids, Garlic, **Wheat** flour, Cheese Flavour (**Milk**), Worcestershire Sauce, Yeast Extracts, Mustard Powder, Spices], Cooked Macaroni Pasta (31%) [Water, **Wheat** Semolina], Broccoli (20%), Cheddar Cheese (**Milk**).",
      "**CONTAINS: GLUTEN, WHEAT, MILK.**",
      "**MAY CONTAIN: SULPHITES, ALMOND, BRAZIL NUT, CASHEW, CRUSTACEAN, EGG, FISH, MOLLUSC, PEANUT, SESAME, SOY.**",
    ],
    nutrition: {
      headers: ["", "Per serving", "Per 100g"],
      rows: [
        ["Energy", "948kJ", "474kJ"],
        ["Protein", "9g", "4.5g"],
        ["Total Fat", "9.4g", "4.7g"],
        ["– saturated", "5.8g", "2.9g"],
        ["Carbohydrate", "26.4g", "13.2g"],
        ["– sugars", "4.8g", "2.4g"],
        ["Sodium", "238mg", "119mg"],
      ],
    },
  },
];

export function getAustraliaFrozenProductData(
  slug: string,
): AustraliaFrozenProductPageData | undefined {
  return australiaFrozenProductsData.find((product) => product.slug === slug);
}
