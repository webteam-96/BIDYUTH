// Single source of truth for all site content.
// Anything marked PLACEHOLDER needs real content before launch.

export type Phase = {
  id: string;
  label: string;
  /** ISO datetime (IST). null = open-ended (regular). */
  deadline: string | null;
  /** ISO datetime the phase opens (used only for open-ended phases). */
  startsAt?: string;
  /** Fee in INR incl. GST. null = to be announced. */
  price: number | null;
  deadlineLabel: string;
  /** Force this phase active regardless of today's date. */
  activeOverride?: boolean;
};

export const URLS = {
  // PLACEHOLDER: registration form is built separately
  REGISTRATION_URL: 'https://example.com/register',
  // PLACEHOLDER: partner enquiry form or mailto
  PARTNER_ENQUIRY_URL: 'mailto:partners@example.com?subject=Bidyuth%202027%20Partner%20Enquiry',
  // PLACEHOLDER: Kaizen Events app store links
  APP_ANDROID: '#',
  APP_IOS: '#',
  MAPS_LINK: 'https://www.google.com/maps/search/?api=1&query=Palace+Grounds+Bengaluru',
  MAPS_EMBED: 'https://www.google.com/maps?q=Palace+Grounds,+Bengaluru&output=embed',
};

export const EVENT = {
  name: 'BIDYUTH',
  year: '2027',
  fullName: 'Bidyuth 2027',
  organiser: 'Forum of Business By Brahmins',
  organiserShort: 'BBB',
  tagline: 'The flagship event of BBB',
  dateLabel: '29th & 30th January 2027',
  dateShort: '29–30 JAN 2027',
  venue: 'Palace Grounds',
  city: 'Bengaluru',
  venueFull: 'Palace Grounds, Bengaluru',
  logos: {
    // PLACEHOLDER logos
    bbb: './logos/bbb.svg',
    kaizen: './logos/kaizen.svg',
  },
};

export const NAV = {
  links: [
    { label: 'About', href: '#about' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Partner', href: '#partner' },
    { label: 'FAQ', href: '#faq' },
  ],
  cta: 'Register',
};

export const PRELOADER = { label: 'Charging', aria: 'Loading Bidyuth 2027' };

export const HERO = {
  meta: ['Palace Grounds, Bengaluru', 'Flagship event of BBB'],
  line: '3000 minds. One current.',
  cta: 'Register Now',
  countdownLabel: 'Early bird ends in',
  badge: 'Early Bird',
  date: { range: '29–30', monthYear: 'January 2027', iso: '2027-01-29' },
};

export const MARQUEE = ['3000+ DELEGATES', '23 CITIES', '14 STATES', '2 DAYS', 'PALACE GROUNDS'];

export const ABOUT = {
  label: 'About',
  // words flagged `hl` get the tangerine spark underline
  manifesto: [
    { t: 'Once a year, the Forum of Business By Brahmins plugs into one place.' },
    { t: '3000+', hl: true },
    { t: 'business owners from 23 cities and 14 states meet at Palace Grounds for two days of pure' },
    { t: 'business,', hl: true },
    { t: 'real referrals and' },
    { t: 'connections', hl: true },
    { t: 'that keep paying long after the lights go down. This is Bidyuth. Get charged.' },
  ],
};

export const STATS = {
  title: 'One current across India',
  items: [
    { value: 3000, suffix: '+', label: 'Delegates' },
    { value: 23, suffix: '', label: 'Cities' },
    { value: 14, suffix: '', label: 'States' },
    { value: 2, suffix: '', label: 'Days' },
  ],
  hub: 'Bengaluru',
  // PLACEHOLDER: replace with the actual 23 participating cities. [lon, lat]
  cities: [
    { name: 'Bengaluru', at: [77.59, 12.97] },
    { name: 'Mumbai', at: [72.88, 19.07] },
    { name: 'Delhi', at: [77.2, 28.6] },
    { name: 'Chennai', at: [80.27, 13.08] },
    { name: 'Hyderabad', at: [78.47, 17.38] },
    { name: 'Kolkata', at: [88.36, 22.57] },
    { name: 'Pune', at: [73.86, 18.52] },
    { name: 'Ahmedabad', at: [72.57, 23.02] },
    { name: 'Jaipur', at: [75.8, 26.9] },
    { name: 'Lucknow', at: [80.95, 26.85] },
    { name: 'Bhopal', at: [77.4, 23.26] },
    { name: 'Nagpur', at: [79.09, 21.15] },
    { name: 'Mysuru', at: [76.64, 12.3] },
    { name: 'Mangaluru', at: [74.86, 12.91] },
    { name: 'Hubballi', at: [75.12, 15.36] },
    { name: 'Kochi', at: [76.27, 9.93] },
    { name: 'Thiruvananthapuram', at: [76.94, 8.52] },
    { name: 'Coimbatore', at: [76.96, 11.0] },
    { name: 'Visakhapatnam', at: [83.22, 17.69] },
    { name: 'Bhubaneswar', at: [85.82, 20.3] },
    { name: 'Guwahati', at: [91.74, 26.14] },
    { name: 'Chandigarh', at: [76.78, 30.73] },
    { name: 'Indore', at: [75.86, 22.72] },
  ] as { name: string; at: [number, number] }[],
};

export const FEATURES = {
  label: 'Highlights',
  title: 'Plugged in from',
  titleAccent: 'minute one',
  items: [
    { title: 'Live KYT dashboard', body: 'Opportunities, top givers and best chapters, live on the main LED.' },
    { title: 'KYT appointments', body: 'Book one-to-one slots with fellow delegates.' },
    { title: 'QR code badge', body: 'One scan for entry, kit collection and meals.' },
    { title: 'Instant confirmation', body: 'Your QR badge on Email and WhatsApp the moment you pay.' },
    { title: 'Digital business cards', body: 'Exchange cards with every delegate you meet.' },
    { title: 'Delegate-only app', body: 'Participants, schedule, speakers, gallery and KYT in one app.' },
  ],
  dashboard: {
    title: 'Live KYT Dashboard',
    caption: 'Live on the main LED during the KYT session',
    // PLACEHOLDER demo values for the mock
    counter: { label: 'Opportunities passed', value: 1284 },
    leaders: [
      { label: 'Top giver', value: 'TBA' },
      { label: 'Top receiver', value: 'TBA' },
      { label: 'Best chapter', value: 'TBA' },
      { label: 'Best zone', value: 'TBA' },
    ],
  },
};

export const PRICING = {
  label: 'Pricing',
  title: 'Charge early.',
  titleAccent: 'Pay less.',
  sub: 'Early bird pricing · all fees incl. GST',
  closed: 'Closed',
  activeLabel: 'Live now',
  upcoming: 'Next',
  noteLabel: 'Note',
  dotsLabel: 'Show pricing phase',
  endsIn: 'Ends in',
  note: 'Registration fee does not include lodging. Lodging support will be extended separately after registration.',
  cta: 'Register Now',
  phases: [
    { id: 'eb1', label: 'Early Bird 1', deadline: '2026-11-30T23:59:59+05:30', deadlineLabel: 'On or before 30 Nov 2026', price: 3555 },
    { id: 'eb2', label: 'Early Bird 2', deadline: '2026-12-15T23:59:59+05:30', deadlineLabel: 'On or before 15 Dec 2026', price: 4555 },
    { id: 'eb3', label: 'Early Bird 3', deadline: '2026-12-31T23:59:59+05:30', deadlineLabel: 'On or before 31 Dec 2026', price: 6999 },
    { id: 'regular', label: 'Regular', deadline: null, startsAt: '2027-01-01T00:00:00+05:30', deadlineLabel: 'From 1 Jan 2027', price: null },
  ] as Phase[],
  tba: 'To be announced',
};

export const SPEAKERS = {
  label: 'Speakers',
  mobileTitle: 'Speakers announcing soon',
  title: 'Voices with',
  titleAccent: 'voltage',
  // PLACEHOLDER: 6 speaker cards
  items: Array.from({ length: 6 }, () => ({
    name: 'Announcing soon',
    image: '' as string, // PLACEHOLDER: photo path (WebP/AVIF)
    srcSet: '' as string, // PLACEHOLDER: e.g. 'speaker-480.webp 480w, speaker-800.webp 800w'
  })),
};

export const SCHEDULE = {
  label: 'Schedule',
  title: 'Two days.',
  titleAccent: 'Full charge.',
  placeholderNote: 'Tentative agenda — final timings to be announced.',
  tablistLabel: 'Event days',
  detailPlaceholder: 'Session details to be announced.', // PLACEHOLDER per-session details
  // PLACEHOLDER agenda
  days: [
    {
      id: 'd1',
      tab: 'Day 1',
      date: '29 Jan 2027',
      sessions: [
        { time: '08:00', title: 'Registration & QR badge check-in', type: 'Arrival' },
        { time: '10:00', title: 'Inauguration', type: 'Main stage' },
        { time: '11:30', title: 'Keynote — TBA', type: 'Keynote' },
        { time: '13:00', title: 'Lunch & networking', type: 'Networking' },
        { time: '14:30', title: 'KYT Session — live on the LED wall', type: 'KYT' },
        { time: '17:00', title: 'Stall walk & partner showcase', type: 'Expo' },
        { time: '19:30', title: 'Evening networking', type: 'Networking' },
      ],
    },
    {
      id: 'd2',
      tab: 'Day 2',
      date: '30 Jan 2027',
      sessions: [
        { time: '09:00', title: 'Morning KYT appointments', type: 'KYT' },
        { time: '11:00', title: 'Keynote — TBA', type: 'Keynote' },
        { time: '12:30', title: 'Panel — TBA', type: 'Panel' },
        { time: '13:30', title: 'Lunch & networking', type: 'Networking' },
        { time: '15:00', title: 'Awards — top giver, receiver, chapter, zone', type: 'Main stage' },
        { time: '17:00', title: 'Valedictory', type: 'Main stage' },
      ],
    },
  ],
};

export const VENUE = {
  label: 'Venue',
  region: 'Karnataka',
  coords: '12.998° N · 77.592° E',
  big: 'PALACE GROUNDS',
  city: 'Bengaluru',
  body: 'One of Bengaluru’s grandest event grounds — open, central and built for crowds of thousands.',
  address: 'Palace Grounds, Jayamahal Road, Vasanth Nagar, Bengaluru, Karnataka', // PLACEHOLDER: confirm gate / hall
  mapsCta: 'Open in Google Maps',
  // PLACEHOLDER: venue photography (WebP/AVIF)
  images: [
    { src: '', srcSet: '', alt: 'Palace Grounds — main lawn (placeholder)' },
    { src: '', srcSet: '', alt: 'Palace Grounds — event hall (placeholder)' },
    { src: '', srcSet: '', alt: 'Palace Grounds — entrance (placeholder)' },
  ],
};

export const PARTNERS = {
  label: 'Partner',
  title: 'Plug your brand',
  titleAccent: 'into 3000+ businesses',
  cta: 'Enquire Now',
  note: 'GST invoices available for all bookings — GSTIN and billing details are captured at booking.',
  items: [
    { title: 'Stalls', body: 'Multiple categories and sizes on the expo floor, right in the delegate flow.' },
    { title: 'Standees', body: 'Premium locations across the venue — entry, lounges and meal zones.' },
    { title: 'Digital & Physical Presence', body: 'On-screen visibility on the main LED wall plus on-ground branding.' },
    { title: 'Sponsorship', body: 'Packages with headline branding, stage mentions and delegate benefits.' },
  ],
};

export const APP = {
  title: 'Exclusive to',
  titleAccent: 'registered delegates.',
  body: 'Your whole event in one app — find people, book KYT slots, flash your badge and swap cards.',
  badge: 'Powered by Kaizen Events',
  chips: ['Participants', 'KYT', 'QR Badge', 'Gallery', 'Business Cards'],
  screens: [
    { title: 'Participants', line: 'Browse every registered delegate' },
    { title: 'KYT', line: 'Book one-to-one slots' },
    { title: 'QR Badge', line: 'Scan at entry, kit and meals' },
    { title: 'Business Cards', line: 'Exchange cards with a tap' },
  ],
};

export const TECH = {
  label: 'Official Technology Partner',
  name: 'Kaizen Infotech Solutions Pvt. Ltd.',
  url: 'https://example.com', // PLACEHOLDER
};

export const FAQ = {
  label: 'FAQ',
  title: 'Questions,',
  titleAccent: 'answered',
  items: [
    { q: 'Does the fee include lodging?', a: 'No, lodging support is extended separately after registration.' },
    { q: 'How will I get confirmation?', a: 'Instant Email + WhatsApp confirmation with QR badge after payment.' },
    { q: 'Can I get a GST invoice?', a: 'Yes, enter GSTIN and billing details during registration.' },
    { q: 'What payment methods are accepted?', a: 'Credit/debit cards (incl. corporate, AMEX, international), net banking, UPI, wallets.' },
    { q: 'Who can use the event app?', a: 'Only registered delegates.' },
    { q: 'How do meals and entry work?', a: 'Your QR badge is scanned at entry, kit counter and meal counters.' },
  ],
};

export const FINAL = {
  big: 'GET CHARGED.',
  sub: 'Get charged for business.',
  cta: 'Register Now',
};

export const COMMITTEE = {
  label: 'Organising committee',
  // PLACEHOLDER committee grid
  members: Array.from({ length: 8 }, (_, i) => ({ name: 'To be announced', role: `Committee member ${i + 1}` })),
};

export const CONTACT = {
  // PLACEHOLDER contacts + socials
  email: 'info@example.com',
  phone: '+91 00000 00000',
  socials: [
    { label: 'Instagram', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Facebook', href: '#' },
    { label: 'YouTube', href: '#' },
  ],
  backToTop: 'Back to top',
  contactLabel: 'Contact',
  followLabel: 'Follow',
  copyright: '© 2027 Forum of Business By Brahmins. All rights reserved.',
};

/** Interface strings (screen-reader labels, controls). */
export const UI = {
  skip: 'Skip to content',
  navLabel: 'Primary',
  menuOpen: 'Menu',
  menuClose: 'Close',
  home: 'Bidyuth 2027 home',
  mobileBar: 'Register',
  countdownUnits: ['days', 'hrs', 'min', 'sec'],
  countdownAria: (d: number, h: number, m: number) => `${d} days ${h} hours ${m} minutes remaining`,
};
