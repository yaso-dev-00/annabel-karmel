const assetBase = '/footer-pages/about';

export const aboutAnnabelKarmelPage = {
  title: 'About Annabel Karmel',
  heroHeading: "A life's mission to nourish every child",
  heroImage: `${assetBase}/hero.jpg`,
  intro: [
    "With expertise spanning over 30 years, London-born mother of three Annabel Karmel MBE reigns as the UK's no. 1 children's cookery author, bestselling international author, and a world-leading expert on devising delicious, nutritious meals for babies and children.",
    'But she was once just another frustrated parent, desperate for her fussy baby son to try new foods. Feeling especially vulnerable having lost her little girl to a viral infection at just three months old, Annabel got creative in the kitchen developing recipes that were anything but bland.',
  ],
  partnerLogosImage: `${assetBase}/partner-logos.png`,
  sections: [
    {
      id: 'cookbooks',
      layout: 'split-teal' as const,
      heading: '6 million cookbooks',
      body: [
        {
          type: 'html' as const,
          html: `In 1991, her revolutionary cookbook <a href="/app-book-category/our-books">The Complete Baby and Toddler Meal Planner</a> was published. It has since sold over 6 million copies, becoming the 2nd bestselling non-fiction hardback of all time.`,
        },
        {
          type: 'text' as const,
          text: "With 50+ published cookbooks, and an MBE in the Queen's Birthday Honours, Annabel is loved and trusted all over the world for raising healthy, happy eaters.",
        },
      ],
      image: `${assetBase}/cookbooks.jpg`,
      imageAlt: 'Annabel Karmel cookbooks',
      imageHref: '/app-book-category/our-books',
      cta: { label: 'EXPLORE', href: '/app-book-category/our-books' },
      reverseMobile: true,
    },
    {
      id: 'app',
      layout: 'split-app' as const,
      heading: 'Award-winning recipe app',
      body: [
        "Annabel's app is filled with over 1,500 simple and nutritious recipes, PLUS new ideas every week.",
        "Perfect for weaning and beyond, it's a daily kitchen essential.",
      ],
      image: `${assetBase}/app.png`,
      imageAlt: 'Annabel Karmel recipe app',
      imageHref: '/the-ultimate-baby-toddler-recipe-app',
      awards: [
        `${assetBase}/award-tech.png`,
        `${assetBase}/award-family-app.png`,
        `${assetBase}/award-gold-2026.jpeg`,
      ],
      cta: { label: 'EXPLORE', href: '/the-ultimate-baby-toddler-recipe-app' },
    },
    {
      id: 'meals',
      layout: 'split-teal' as const,
      heading: 'Expert meals for tots & kids',
      body: [
        'Annabel knows just what it takes to make delicious, goodness-packed meals for toddlers and children, and her quick-cook recipe ranges are the perfect fuel for daily adventures.',
      ],
      image: `${assetBase}/meals.jpg`,
      imageAlt: 'Annabel Karmel chilled meals',
      imageHref: '/product-category/frozen-meals',
      awards: [
        `${assetBase}/award-toddler-gold.png`,
        `${assetBase}/award-toddler-platinum.png`,
        `${assetBase}/award-ma-gold.png`,
      ],
      ctas: [
        {
          label: 'Discover chilled meals',
          href: '/product-category/chilled-meals',
        },
        {
          label: 'Discover frozen meals',
          href: '/product-category/frozen-meals',
        },
      ],
      reverseMobile: true,
    },
    {
      id: 'media',
      layout: 'centered' as const,
      heading: 'Media spokesperson',
      body: [
        'Annabel Karmel regularly features in parenting, lifestyle, and national media in the UK and globally – providing expertise and commentary on all things food, nutrition, and parenting.',
      ],
      cta: { label: 'GET IN TOUCH', href: '/contact' },
    },
    {
      id: 'partnerships',
      layout: 'partnerships' as const,
      heading: 'Brand partnerships',
      body: [
        'From menu consultancy to recipe development, tasty content production, and endorsement, Annabel partners with leading brands to connect them with young families.',
      ],
      mobileImage: `${assetBase}/partnerships-mobile.png`,
      images: [
        `${assetBase}/partnership-1.jpg`,
        `${assetBase}/partnership-2.jpg`,
        `${assetBase}/partnership-3.jpg`,
        `${assetBase}/partnership-4.jpg`,
      ],
      cta: { label: 'GET IN TOUCH', href: '/contact' },
    },
  ],
};
