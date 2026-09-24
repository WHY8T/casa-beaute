// ---------------------------------------------------------------------------
// Placeholder content for Casa Beauté, a cosmetics & parfumerie boutique in
// Sidi Bel Abbès, Algeria (@casabeaute22 on Instagram). Real facts (address,
// Instagram handle) are filled in; phone number, hours and photography are
// still placeholders — swap them here and the whole site updates.
// ---------------------------------------------------------------------------

export const SALON_NAME = 'Casa Beauté'
export const TAGLINE = 'Cosmétiques • Parfumerie'
export const LOGO_URL = '/casa-beaute/logo.png'
export const WHATSAPP_NUMBER = '213XXXXXXXXX'

export const BRANDS = [
  'PRODERMA',
  'Enzo',
  'Remington',
  'Nashi',
  'Sense Laverne',
  'Loreal',
  'Vichy',
  'La Roche-Posay',
]

export const MARQUEE_CTA = 'Visitez la boutique'


export const NAV_LINKS = [
  { label: 'Nouveautés', href: '#gallery' },
  { label: 'Collections', href: '#services' },
  { label: 'Histoire', href: '#story' },
  { label: 'Avis', href: '#reviews' },
  { label: 'Visitez-nous', href: '#contact' },
]

// Product collections in place of treatments — still a genuine five-item
// sequence, so the numbered scroll pattern still earns its place.
export const SERVICES = [
  {
    index: '01',
    name: 'Soins de la peau',
    tagline: 'Nettoyants, sérums & SPF',
    description:
      "Des soins quotidiens construits autour de PRODERMA, aux côtés d'une sélection de marques internationales — nettoyants, sérums, hydratants et protections solaires pour chaque type de peau.",
    highlight: 'En vedette : PRODERMA',
    image: `${import.meta.env.BASE_URL}collections/skincare.jpg`,
  },
  {
    index: '02',
    name: 'Cheveux & Coiffage',
    tagline: 'Outils & soins',
    description:
      'Lisseurs, fers à boucler et brosses signés Enzo, Remington et Nashi, ainsi que les shampoings et soins qui gardent les cheveux en bonne santé entre deux visites au salon.',
    highlight: 'Enzo · Remington · Nashi',
    image: `${import.meta.env.BASE_URL}collections/haircare.jpg`,
  },
  {
    index: '03',
    name: 'Parfumerie',
    tagline: 'Fragrances de créateurs & niche',
    description:
      "Un mur de parfums réunissant grandes maisons et parfumeurs de niche plus rares, pour elle et pour lui — venez sentir avant de vous décider.",
    highlight: 'Maisons internationales',
    image: `${import.meta.env.BASE_URL}collections/parfumerie.jpg`,
  },
  {
    index: '04',
    name: 'Maquillage',
    tagline: 'Teint, yeux & lèvres',
    description:
      "Des fonds de teint adaptés aux vrais sous-tons, ainsi que les essentiels yeux et lèvres des marques internationales que nos habitué·e·s réclament par leur nom.",
    highlight: 'Nouveautés chaque semaine',
    image: `${import.meta.env.BASE_URL}collections/makeup.jpg`,
  },
  {
    index: '05',
    name: 'La Sélection',
    tagline: "Les nouveautés, et ce que tout le monde nous demande",
    description:
      "Une sélection tournante menée par PRODERMA et tout ce qui vient d'arriver en rayon, aux côtés des pièces que nos habitué·e·s redemandent sans cesse.",
    highlight: 'Mise à jour chaque semaine',
    image: null,
  },
]

export const GALLERY = [
  { id: 1, label: 'Coffret cadeau, prêt à offrir', tag: 'Coffrets cadeaux', price: '2 400 DA', description: 'Un coffret cadeau soigneusement composé, emballé et prêt à offrir.' },
  { id: 2, label: 'Sélection soins PRODERMA', tag: 'Soins de la peau', price: '3 200 DA', description: 'Notre sélection PRODERMA, choisie pour des résultats réels.' },
  { id: 3, label: 'Outils de coiffage Enzo en boutique', tag: 'Cheveux', price: '4 500 DA', description: 'Outils de coiffage professionnels signés Enzo, testés en boutique.' },
  { id: 4, label: 'Mur de parfums', tag: 'Parfumerie', price: '3 800 DA', description: 'Parfums de créateurs et de niche, pour elle et pour lui.' },
  { id: 5, label: 'Coffret cadeau Sense Laverne', tag: 'Coffrets cadeaux', price: '2 900 DA', description: 'Un coffret de luxe Sense Laverne, emballé pendant que vous patientez.' },
  { id: 6, label: 'Nouvelle collection maquillage', tag: 'Maquillage', price: '1 800 DA', description: 'Les nouveautés maquillage de la saison, adaptées aux vrais sous-tons.' },
  { id: 7, label: 'Rayon cheveux & outils', tag: 'Cheveux', price: '2 100 DA', description: 'Des soins capillaires du quotidien pour des cheveux sains entre deux visites.' },
  { id: 8, label: 'Essentiels solaires', tag: 'Soins de la peau', price: '1 500 DA', description: 'SPF et essentiels solaires pour chaque type de peau.' },
]

export const STORY = {
  eyebrow: 'Sidi Bel Abbès',
  heading: 'Une boutique de cosmétiques bâtie sur des marques de confiance.',
  paragraphs: [
    `${SALON_NAME} réunit PRODERMA et une sélection de marques internationales de soins, cheveux, parfums et maquillage sous un même toit à Sidi Bel Abbès — un rayon que nous achèterions nous-mêmes, pas seulement que nous vendons.`,
    "Nous gardons volontairement une gamme resserrée : chaque produit en rayon a été choisi, pas seulement stocké, pour qu'une question sur ce qui fonctionne vraiment obtienne une réponse honnête plutôt qu'un argument de vente.",
  ],
  stats: [
    { value: '1 078+', label: 'Communauté sur Instagram' },
    { value: '20+', label: 'Marques internationales' },
    { value: '8', label: "Années d'histoire en construction" },
  ],
  // Editorial video/photo strip. Each tile plays `video` on loop (muted,
  // no controls) with `poster` as the fallback/loading image. Drop matching
  // files into public/story/ using these exact names and it just works —
  // leave `video` as null to show a plain photo tile instead.
  media: [
    {
      video: `${import.meta.env.BASE_URL}story/clip.mp4`,
      poster: `${import.meta.env.BASE_URL}story/clip-poster.jpg`,
      caption: 'Le rituel, étape par étape',
    },

  ],
}

export const TESTIMONIALS = [
  {
    quote:
      'Enfin un endroit à Sidi Bel Abbès qui a vraiment PRODERMA en stock et qui connaît les produits, pas juste qui les revend.',
    name: 'Amina K.',
    service: 'Soins de la peau',
  },
  {
    quote:
      "J'ai acheté mon lisseur Enzo ici après avoir posé cent questions dessus. Aucun regret.",
    name: 'Yasmine R.',
    service: 'Cheveux & Coiffage',
  },
  {
    quote:
      "Coffret Sense Laverne emballé en cinq minutes pour un cadeau d'anniversaire. On aurait dit que j'avais tout préparé pendant des semaines.",
    name: 'Sofiane B.',
    service: 'Coffrets cadeaux',
  },
  {
    quote:
      "La sélection de parfums est vraiment différente de toutes les autres parfumeries de la ville. J'y ai trouvé mon nouveau parfum signature.",
    name: 'Meriem T.',
    service: 'Parfumerie',
  },
]

export const CONTACT = {
  heading: 'Venez découvrir le rayon en personne.',
  sub: "Écrivez-nous sur Instagram pour toute question de stock, ou passez à la boutique à Sidi Bel Abbès.",
  phone: '(XX) XX XX XX XX',
  email: 'hello@casabeaute22.example',
  address: 'Quartier Maqam El Chahid, à côté de l\u2019EHP Hasnaoui, Sidi Bel Abbès 22000',
  mapsUrl: 'https://maps.app.goo.gl/m3q6XBuqvR7LANDw5?g_st=ic',
  instagram: '@casabeaute22',
  instagramUrl: 'https://www.instagram.com/casabeaute22',
  hours: [
    { day: 'Lun – Sam', time: '9h00 – 19h00' },
    { day: 'Dimanche', time: 'Fermé' },
  ],
}