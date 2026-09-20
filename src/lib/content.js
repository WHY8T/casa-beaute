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

export const MARQUEE_CTA = 'Visit the boutique'


export const NAV_LINKS = [
  { label: 'Collections', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Story', href: '#story' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Visit', href: '#contact' },
]

// Product collections in place of treatments — still a genuine five-item
// sequence, so the numbered scroll pattern still earns its place.
export const SERVICES = [
  {
    index: '01',
    name: 'Skincare',
    tagline: 'Cleansers, serums & SPF',
    description:
      'Daily skincare built around PRODERMA alongside a curated shelf of international brands — cleansers, serums, moisturisers and sun care for every skin type.',
    highlight: 'Featuring PRODERMA',
    image: `${import.meta.env.BASE_URL}collections/skincare.jpg`,
  },
  {
    index: '02',
    name: 'Haircare & Styling',
    tagline: 'Tools & treatments',
    description:
      'Straighteners, curling wands and brushes from Enzo, Remington and Nashi, plus the shampoos and treatments that keep hair healthy between salon visits.',
    highlight: 'Enzo · Remington · Nashi',
    image: `${import.meta.env.BASE_URL}collections/haircare.jpg`,
  },
  {
    index: '03',
    name: 'Parfumerie',
    tagline: 'Designer & niche fragrance',
    description:
      'A fragrance wall spanning designer houses and harder-to-find niche perfumers, for her and for him — come in and smell before you commit.',
    highlight: 'International houses',
    image: `${import.meta.env.BASE_URL}collections/parfumerie.jpg`,
  },
  {
    index: '04',
    name: 'Makeup',
    tagline: 'Complexion, eyes & lips',
    description:
      'Foundations matched to real undertones, plus the eye and lip essentials from the international beauty brands our regulars ask for by name.',
    highlight: 'New arrivals weekly',
    image: `${import.meta.env.BASE_URL}collections/makeup.jpg`,
  },
  {
    index: '05',
    name: 'The Edit',
    tagline: 'New in, and what everyone keeps asking for',
    description:
      'A rotating spotlight that leads with PRODERMA and whatever just landed on the shelf, alongside the pieces our regulars keep coming back for.',
    highlight: 'Updated weekly',
    image: null,
  },
]

export const GALLERY = [
  { id: 1, label: 'Gift box, ready to wrap', tag: 'Gift Sets', price: '2 400 DA', description: 'A curated gift box, wrapped and ready to give.' },
  { id: 2, label: 'PRODERMA skincare edit', tag: 'Skincare', price: '3 200 DA', description: 'Our PRODERMA picks, chosen for real results.' },
  { id: 3, label: 'Enzo styling tools in-store', tag: 'Haircare', price: '4 500 DA', description: 'Professional styling tools from Enzo, tested in-store.' },
  { id: 4, label: 'Fragrance wall', tag: 'Parfumerie', price: '3 800 DA', description: 'Designer and niche fragrances, for her and for him.' },
  { id: 5, label: 'Sense Laverne gift box', tag: 'Gift Sets', price: '2 900 DA', description: 'A luxury Sense Laverne set, wrapped while you wait.' },
  { id: 6, label: 'New season makeup', tag: 'Makeup', price: '1 800 DA', description: 'This season\'s makeup arrivals, matched to real undertones.' },
  { id: 7, label: 'Haircare & tools shelf', tag: 'Haircare', price: '2 100 DA', description: 'Everyday haircare to keep hair healthy between visits.' },
  { id: 8, label: 'Sun care essentials', tag: 'Skincare', price: '1 500 DA', description: 'SPF and sun care essentials for every skin type.' },
]

export const STORY = {
  eyebrow: 'Sidi Bel Abbès',
  heading: 'A cosmetics boutique built on brands worth trusting.',
  paragraphs: [
    `${SALON_NAME} brings together PRODERMA and a curated set of international skincare, haircare, fragrance and makeup brands under one roof in Sidi Bel Abbès — a shelf we'd shop ourselves, not just sell.`,
    'We keep the range tight on purpose: every product on the shelf has been chosen, not just stocked, so a question about what actually works gets a straight answer instead of a sales pitch.',
  ],
  stats: [
    { value: '1,078+', label: 'Community on Instagram' },
    { value: '20+', label: 'International brands' },
    { value: '8', label: 'Years-in-progress story' },
  ],
}

export const TESTIMONIALS = [
  {
    quote:
      'Finally a place in Sidi Bel Abbès that actually carries PRODERMA and knows the products, not just resells them.',
    name: 'Amina K.',
    service: 'Skincare',
  },
  {
    quote:
      'Bought my Enzo straightener here after they let me ask a hundred questions about it first. Zero regrets.',
    name: 'Yasmine R.',
    service: 'Haircare & Styling',
  },
  {
    quote:
      'Got a Sense Laverne set wrapped in five minutes for a birthday gift. Looked like I\u2019d planned it for weeks.',
    name: 'Sofiane B.',
    service: 'Gift Sets',
  },
  {
    quote:
      'The fragrance selection is genuinely different from every other parfumerie in town. Found my new signature scent here.',
    name: 'Meriem T.',
    service: 'Parfumerie',
  },
]

export const CONTACT = {
  heading: 'Come find the shelf in person.',
  sub: 'Message us on Instagram for stock questions, or stop by the boutique in Sidi Bel Abbès.',
  phone: '(XX) XX XX XX XX',
  email: 'hello@casabeaute22.example',
  address: 'Quartier Maqam El Chahid, à côté de l\u2019EHP Hasnaoui, Sidi Bel Abbès 22000',
  mapsUrl: 'https://maps.app.goo.gl/m3q6XBuqvR7LANDw5?g_st=ic',
  instagram: '@casabeaute22',
  instagramUrl: 'https://www.instagram.com/casabeaute22',
  hours: [
    { day: 'Mon – Sat', time: '9:00 – 19:00' },
    { day: 'Sunday', time: 'Closed' },
  ],
}