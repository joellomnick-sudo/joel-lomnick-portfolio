import type { PublicAssetId } from "@/data/publicAssets";

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Engineering", href: "/engineering" },
  { label: "LomnickPro", href: "/lomnickpro" },
  { label: "Community & Leadership", href: "/community-leadership" },
  { label: "Lionheart", href: "/lionheart" },
  { label: "Contact", href: "/contact" },
];

export const caseStudies = [
  {
    id: "real-estate",
    title: "Real Estate Agent Website & Brand Support",
    assetId: "case-study-real-estate" as PublicAssetId,
    alt: "Anonymous real estate website and brand support case-study infographic.",
    summary: "A neighborhood-centered professional needed a public presence that felt credible, warm, and rooted in community trust.",
    transcript: {
      need: "A stronger public presence, cleaner messaging, and more trust-building visuals.",
      built: "A coordinated digital identity with a clean website direction, visual identity support, and public-facing marketing materials.",
      deliverables: ["Website refresh", "Brand visuals", "Flyers and business cards", "Mobile-friendly contact path", "Social media graphics"],
      impact: "Better first impressions, clearer neighborhood visibility, and more confidence in public outreach.",
    },
  },
  {
    id: "church",
    title: "Church Communications & Media System",
    assetId: "case-study-church" as PublicAssetId,
    alt: "Anonymous church communications and media system case-study infographic.",
    summary: "A ministry needed one clearer way to welcome people, share service information, and support volunteers behind the scenes.",
    transcript: {
      need: "Stronger communication for worship services, announcements, events, and media support.",
      built: "A ministry communication system organized around clarity, visuals, livestream support, and easier public connection.",
      deliverables: ["Service graphics", "Announcement system", "Livestream support", "Volunteer media workflow", "Event communication"],
      impact: "A more welcoming public presence, clearer service information, and stronger alignment between message and media.",
    },
  },
  {
    id: "community-business",
    title: "Community Business Brand & Visibility Support",
    assetId: "case-study-community" as PublicAssetId,
    alt: "Anonymous community business brand and visibility support case-study infographic.",
    summary: "Meaningful local work needed branding and communication strong enough to earn attention without losing its community roots.",
    transcript: {
      need: "Clearer messaging, stronger branding, and a more polished public presentation.",
      built: "A simple visibility system that made the work feel organized, trusted, and easy to understand.",
      deliverables: ["Brand support", "Website visuals", "Flyers and promotions", "Proposal materials", "Social-ready graphics"],
      impact: "More confidence in public presentation, stronger word-of-mouth support, and better visibility for good work.",
    },
  },
  {
    id: "fraternity",
    title: "Fraternal Chapter Digital Rebuild",
    assetId: "case-study-fraternity" as PublicAssetId,
    alt: "Anonymous fraternal chapter digital rebuild case-study infographic.",
    summary: "A service-centered chapter needed a more dependable digital presence for members, events, outreach, and continuity.",
    transcript: {
      need: "Clearer public communication, stronger event promotion, and a more professional digital presence.",
      built: "A chapter-facing and public-facing communication system designed to support service, visibility, and outreach.",
      deliverables: ["Website structure", "Event flyers", "Digital announcements", "Community outreach visuals", "Clean information flow"],
      impact: "Stronger public visibility, better event communication, and greater community trust through consistency.",
    },
  },
] as const;

export const communityStories = [
  {
    title: "National Society of Black Engineers",
    assetId: "community-nsbe" as PublicAssetId,
    imageClassName: "max-w-[30rem]",
    alt: "Joel Lomnick with fellow National Society of Black Engineers leaders at a regional gathering.",
    caption: "Engineering became more human when academic excellence and community responsibility lived in the same room.",
    href: "https://nsbe.org/",
    linkLabel: "Visit NSBE",
    body: "At RIT, NSBE gave me more than a professional network. It gave me a place to practice leadership while carrying the pressure of engineering school. I served as Academic Excellence Chair, Programs Chair, and Vice President, helped with STEM outreach, and learned that supporting Black engineering students means caring about confidence, preparation, belonging, and the next person coming behind you.",
  },
  {
    title: "Iota Phi Theta Fraternity, Incorporated",
    assetId: "community-iota" as PublicAssetId,
    imageClassName: "max-w-[30rem]",
    alt: "Joel Lomnick seated with members of Iota Phi Theta Fraternity at a community event.",
    caption: "Brotherhood is strongest when service, succession, and honest accountability travel together.",
    href: "https://www.rvaiotas.org/",
    linkLabel: "Visit Richmond Iotas",
    body: "Iota taught me to build for continuity, not applause. Through Omicron Omega leadership, Vice Polaris service, chapter technology and communications, advising, and intake leadership, I have tried to leave clearer systems and more prepared brothers behind. Scholarship, Leadership, Citizenship, Fidelity, and Brotherhood are not footer words to me; they are habits that have to survive a change in title.",
  },
  {
    title: "National Pan-Hellenic Council of Metro Richmond",
    assetId: "community-nphc" as PublicAssetId,
    imageClassName: "max-w-[20rem]",
    alt: "Joel Lomnick with a National Pan-Hellenic Council colleague in Richmond.",
    caption: "Coalition work asks for visibility without sacrificing relationships.",
    href: "https://nphcmr.org/",
    linkLabel: "Visit NPHC Metro Richmond",
    body: "Coalition work taught me how much public professionalism depends on private trust. As a webmaster and digital-support volunteer, I have helped Divine Nine organizations communicate across different traditions, protect relationships, and show the public what cooperation can look like when our shared purpose matters more than any one organization.",
  },
  {
    title: "Faith, Media, and Community Service",
    assetId: "community-church-media" as PublicAssetId,
    imageClassName: "max-w-[30rem]",
    alt: "Church media workstation used by Joel Lomnick to support worship livestreams and communication.",
    caption: "Worship technology can be access, hospitality, memory, and ministry all at once.",
    href: "http://www.thirdstreetbethel.org/",
    linkLabel: "Visit Third Street Bethel AME Church",
    body: "Church service has placed me in the balcony, behind the switcher, at trustee meetings, inside internal-audit work, and beside young men who needed steady adults. Media ministry and livestream support are not separate from care. Clear audio, a readable announcement, and a reliable broadcast can help someone participate who could not otherwise be in the room.",
  },
  {
    title: "Mentoring and Professional Development",
    assetId: "community-mentoring" as PublicAssetId,
    imageClassName: "max-w-[30rem]",
    alt: "Joel Lomnick encouraging young people during a mentoring outing at an anime convention.",
    caption: "A young person should leave a mentoring conversation more aware of their own value.",
    body: "My mentoring work often begins with practical things: a resume, an interview, a difficult choice, or a goal that still feels too big to say aloud. Underneath those tasks are confidence, emotional intelligence, accountability, and the ability to imagine a future. I want young men to recognize their value before the world tries to price it for them.",
  },
  {
    title: "West African Drum and Dance",
    assetId: "community-djembe" as PublicAssetId,
    imageClassName: "max-w-[21rem]",
    alt: "Joel Lomnick with a djembe, reflecting his participation in West African drum and dance.",
    caption: "Rhythm has carried culture, memory, discipline, grief, and joy across every city I have called home.",
    href: "https://www.instagram.com/akomadegado/",
    linkLabel: "Visit Akoma de Gado",
    body: "From Rochester to Albany and Troy to Richmond, West African drum and dance has helped me understand community through the body. Rhythm is not decoration. It is listening, timing, memory, discipline, and joy practiced with other people. It has been one of the places where grief could move and belonging could return.",
  },
  {
    title: "Break It Down RVA",
    assetId: "community-line-dance" as PublicAssetId,
    imageClassName: "max-w-[30rem]",
    alt: "Joel Lomnick with members of the Break It Down RVA line-dance community outdoors.",
    caption: "Joy is serious community work, especially when movement brings generations into the same rhythm.",
    href: "https://www.breakitdownrva.com/",
    linkLabel: "Visit Break It Down RVA",
    body: "Line dance gives people a reason to move, laugh, learn, and come back. In Black community spaces, that kind of intergenerational connection matters. Break It Down RVA reminds me that wellness can be social, movement can be memory, and leadership sometimes looks like helping the person beside you find the count.",
  },
] as const;

export const contactInquiryTypes = [
  "Electrical engineering or technical communication",
  "LomnickPro website or branding",
  "Flyer, proposal, or presentation",
  "Speaking or workshop",
  "Mentoring or professional development",
  "Community, church, fraternity, or coalition collaboration",
  "Lionheart or writing inquiry",
  "Other",
] as const;
