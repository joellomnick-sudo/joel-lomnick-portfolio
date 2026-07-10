export type LinkItem = {
  label: string;
  href: string;
};

export type ImageFit =
  | "cover"
  | "contain"
  | "portrait"
  | "landscape"
  | "group-photo"
  | "screenshot"
  | "book-cover"
  | "branded-placeholder";

export type PlaceholderVariant =
  | "engineering"
  | "creative"
  | "leadership"
  | "story"
  | "community"
  | "document";

export type CardItem = {
  title: string;
  description: string;
  href?: string;
  image?: string;
  alt?: string;
  imageFit?: ImageFit;
  imageType?: ImageFit;
  visualLabel?: string;
  placeholderVariant?: PlaceholderVariant;
  ctaLabel?: string;
  category?: string;
};

export type SectionItem = {
  title: string;
  description: string;
  bullets?: string[];
  image?: string;
  alt?: string;
  imageFit?: ImageFit;
  imageType?: ImageFit;
  visualLabel?: string;
  placeholderVariant?: PlaceholderVariant;
  category?: string;
};

export const navLinks: LinkItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Engineering", href: "/engineering" },
  { label: "Creative Services", href: "/creative-services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Lionheart", href: "/lionheart" },
  { label: "Leadership", href: "/leadership" },
  { label: "Contact", href: "/contact" },
];

export const identityLabels = [
  "Engineering",
  "Creative Strategy",
  "LomnickPro Services",
  "Leadership",
  "Mentorship",
  "Storytelling",
];

export const homeLanes: CardItem[] = [
  {
    title: "Electrical Engineer",
    description:
      "Building systems, documentation, coordination, and practical technical communication for real projects and real stakeholders.",
  },
  {
    title: "Creative Strategist",
    description:
      "Websites, graphics, resumes, brand presence, and organized visibility for people whose work deserves to be understood.",
  },
  {
    title: "Author of Lionheart",
    description:
      "A memoir project shaped by survival, family, faith, Black identity, engineering, mentorship, and reinvention.",
  },
  {
    title: "Iota & NPHC Leader",
    description:
      "Fraternity and council service rooted in scholarship, leadership, citizenship, fidelity, and brotherhood.",
  },
  {
    title: "Church Media & Mentoring Servant",
    description:
      "Media ministry, trustee service, audit support, and young men's mentoring through Third Street Bethel AME Church.",
  },
  {
    title: "Cultural Arts & Community Connector",
    description:
      "A Richmond-based builder who values cultural memory, wellness, movement, rhythm, and the power of shared space.",
  },
];

export const featuredWork: CardItem[] = [
  {
    title: "Engineering & Project Coordination",
    category: "Engineering",
    description:
      "Electrical design support, construction administration, K-12 public-sector work, and owner-facing communication.",
    href: "/engineering",
    visualLabel: "EIT",
    placeholderVariant: "engineering",
    ctaLabel: "Explore related work",
  },
  {
    title: "LomnickPro Creative Services",
    category: "Creative Services",
    description:
      "Websites, graphics, resumes, branding, and structured visibility for mission-driven clients and organizations.",
    href: "/creative-services",
    visualLabel: "LP",
    placeholderVariant: "creative",
    ctaLabel: "Explore related work",
  },
  {
    title: "Lionheart: The Joel Lomnick Story",
    category: "Memoir",
    description:
      "A personal testimony about becoming whole while still building systems, stories, and legacy.",
    href: "/lionheart",
    visualLabel: "LH",
    placeholderVariant: "story",
    ctaLabel: "Explore the Story",
  },
  {
    title: "Leadership & Community Impact",
    category: "Leadership",
    description:
      "Iota Phi Theta, NPHC-MR, church service, NSBE, mentoring, and culturally grounded community work.",
    href: "/leadership",
    visualLabel: "RISE",
    placeholderVariant: "leadership",
    ctaLabel: "Explore related work",
  },
];

export const aboutSections: SectionItem[] = [
  {
    title: "The Professional",
    description:
      "Joel works across electrical engineering, building systems, project coordination, technical communication, and practical problem solving. His professional lens is disciplined, service-oriented, and grounded in the responsibility that comes with public-facing infrastructure.",
  },
  {
    title: "The Creative",
    description:
      "Through Lomnick Professional Services, he helps people and organizations look as strong as their mission. That work includes website design, graphic design, resumes, branding, presentations, Canva and Wix support, and sharper professional storytelling.",
  },
  {
    title: "The Community Builder",
    description:
      "His service ecosystem includes Iota Phi Theta, NPHC of Metro Richmond, Third Street Bethel AME Church, the Young Men's Mentoring Program, NSBE, Break It Down RVA, and African drum and dance.",
  },
  {
    title: "The Storyteller",
    description:
      "Lionheart frames his memoir work around survival, family, career, identity, faith, mentorship, and reinvention. The story is personal, but its structure is designed to help others name what they have carried and what they can still build.",
  },
];

export const beliefStatements = [
  "Build systems that outlive you.",
  "Make the mission visible.",
  "Tell the truth with structure.",
  "Mentor the next builder.",
];

export const engineeringCards: SectionItem[] = [
  {
    title: "Stratus / Ascent Engineering Group",
    description:
      "Project Engineer II, Electrical Engineer, and EIT supporting design, documentation, coordination, and construction-phase communication.",
  },
  {
    title: "Electrical Engineering & Building Systems",
    description:
      "Power distribution, lighting, fire alarm, low-voltage coordination, and renovation work across complex existing conditions.",
  },
  {
    title: "Construction Administration",
    description:
      "RFI responses, submittal review, field observation, and clear written communication that keeps project teams aligned.",
  },
  {
    title: "K-12 and Public-Sector Projects",
    description:
      "Owner-sensitive documentation and coordination for schools and public environments where clarity, budget, safety, and trust matter.",
  },
  {
    title: "Power, Lighting, Fire Alarm, Low-Voltage, Utility Coordination",
    description:
      "Electrical scopes handled with attention to interdisciplinary dependencies, stakeholder needs, and field realities.",
  },
];

export const engineeringSkills = [
  "Power Distribution",
  "Lighting & Controls",
  "Fire Alarm Coordination",
  "Low-Voltage Coordination",
  "Utility Coordination",
  "Existing Building Renovations",
  "RFI Responses",
  "Submittal Review",
  "Field Observation",
  "Owner Communication",
  "Interdisciplinary Coordination",
  "Technical Writing",
];

export const serviceCards: CardItem[] = [
  {
    title: "Website Design & Digital Presence",
    category: "Websites",
    description:
      "Clean, purposeful websites for individuals, churches, fraternities, nonprofits, and small businesses.",
    image: "/images/website-design-work.jpg",
    alt: "Website design and digital presence work sample.",
    imageFit: "screenshot",
    imageType: "screenshot",
  },
  {
    title: "Branding & Graphic Design",
    category: "Branding",
    description:
      "Flyers, visual identity, event graphics, social media layouts, business cards, and presentation visuals.",
    image: "/images/lomnickpro-work.jpg",
    alt: "Lomnick Professional Services website and branding preview.",
    imageFit: "screenshot",
    imageType: "screenshot",
  },
  {
    title: "Resume, Bio & Professional Storytelling",
    category: "Professional Story",
    description:
      "Career documents and personal branding that help people communicate their value clearly.",
    visualLabel: "BIO",
    placeholderVariant: "document",
  },
  {
    title: "Project Planning & Technical Communication",
    category: "Technical Communication",
    description:
      "Scope narratives, meeting notes, planning documents, and plain-language technical communication.",
    visualLabel: "SCOPE",
    placeholderVariant: "engineering",
  },
  {
    title: "Community Program Strategy",
    category: "Community Strategy",
    description:
      "Support for service programs, mentoring efforts, chapter initiatives, and public-facing campaigns.",
    visualLabel: "PLAN",
    placeholderVariant: "community",
  },
  {
    title: "Leadership & Mentoring Support",
    category: "Mentoring",
    description:
      "Practical coaching, structure, and documentation for emerging leaders and young professionals.",
    image: "/images/mentoring-work.jpg",
    alt: "Young men's mentoring program group photo.",
    imageFit: "group-photo",
    imageType: "group-photo",
  },
];

export const portfolioCategories = [
  "Websites",
  "Graphics",
  "Community",
  "Professional Development",
  "Engineering Communication",
  "Storytelling",
];

export const portfolioItems: CardItem[] = [
  {
    title: "LomnickPro Creative Services",
    category: "Branding / Digital Strategy",
    description:
      "Personal creative services platform supporting websites, graphics, resumes, and community storytelling.",
    href: "/creative-services",
    visualLabel: "LP",
    placeholderVariant: "creative",
    ctaLabel: "Explore related work",
  },
  {
    title: "Omicron Omega / Iota Phi Theta Support",
    category: "Fraternity / Leadership / Digital Presence",
    description:
      "Website, graphics, communications, and strategic visibility support for chapter operations and public presence.",
    href: "/leadership",
    visualLabel: "IOTA",
    placeholderVariant: "leadership",
    ctaLabel: "Explore related work",
  },
  {
    title: "NPHC of Metro Richmond",
    category: "Council / Website Support",
    description:
      "Digital support and website presence for Richmond-area Divine Nine collaboration.",
    href: "/leadership",
    visualLabel: "NPHC",
    placeholderVariant: "community",
    ctaLabel: "Explore related work",
  },
  {
    title: "Third Street Bethel AME Church Media",
    category: "Church / Media / Community",
    description:
      "Worship media, event visuals, reports, and digital communication support.",
    href: "/leadership",
    visualLabel: "MEDIA",
    placeholderVariant: "community",
    ctaLabel: "Explore related work",
  },
  {
    title: "Cathy Lomnick Sepsis Foundation",
    category: "Nonprofit / Website",
    description:
      "Website and awareness support connected to family legacy and public health advocacy.",
    href: "/creative-services",
    visualLabel: "CLSF",
    placeholderVariant: "creative",
    ctaLabel: "Explore related work",
  },
  {
    title: "Frills & Finds Consignment",
    category: "Small Business / Website",
    description: "Digital presence support for a small business brand.",
    href: "/creative-services",
    visualLabel: "F&F",
    placeholderVariant: "creative",
    ctaLabel: "Explore related work",
  },
  {
    title: "Resume & Professional Development Support",
    category: "Mentoring / Career",
    description:
      "Resumes, cover letters, bios, and portfolio support for young professionals and mentees.",
    href: "/creative-services",
    visualLabel: "BIO",
    placeholderVariant: "document",
    ctaLabel: "Explore related work",
  },
  {
    title: "Flyers & Community Campaigns",
    category: "Graphic Design / Events",
    description:
      "Event flyers, service graphics, church visuals, fraternity promotions, and community announcements.",
    href: "/creative-services",
    visualLabel: "ARTS",
    placeholderVariant: "community",
    ctaLabel: "Explore related work",
  },
  {
    title: "Lionheart",
    category: "Writing / Memoir / Storytelling",
    description:
      "A personal memoir project about survival, family, engineering, faith, identity, mentorship, and reinvention.",
    href: "/lionheart",
    visualLabel: "LH",
    placeholderVariant: "story",
    ctaLabel: "Explore the Story",
  },
];

export const lionheartThemes = [
  "Survival",
  "Family",
  "Career",
  "Identity",
  "Faith",
  "Mentorship",
  "Legacy",
];

export const leadershipSections: SectionItem[] = [
  {
    title: "Iota Phi Theta / Omicron Omega",
    category: "Fraternity Leadership",
    description:
      "Fraternity service shaped by scholarship, leadership, citizenship, fidelity, and brotherhood.",
    bullets: [
      "Vice Polaris",
      "Webmaster",
      "Advisor",
      "Intake leader and compliance-focused mentor",
      "Chapter strategist",
    ],
    image: "/images/iota-phi-theta.JPG",
    alt: "Joel Lomnick with Iota Phi Theta fraternity brothers.",
    imageFit: "group-photo",
    imageType: "group-photo",
  },
  {
    title: "NPHC of Metro Richmond",
    category: "Council Service",
    description:
      "Digital support and collaborative representation for Richmond-area Divine Nine work.",
    bullets: ["Webmaster", "Digital support", "Iota representative", "Divine Nine collaboration"],
    image: "/images/nphc-mr.jpg",
    alt: "National Pan-Hellenic Council of Metro Richmond group photo.",
    imageFit: "group-photo",
    imageType: "group-photo",
  },
  {
    title: "Third Street Bethel AME Church",
    category: "Church Media",
    description:
      "Church service across media, governance, accountability, and mentorship.",
    bullets: [
      "Media Ministry",
      "Trustee Board",
      "Internal Audit Committee",
      "Young Men's Mentoring Program",
    ],
    image: "/images/church-media-work.jpg",
    alt: "Church media production setup for livestream and worship support.",
    imageFit: "landscape",
    imageType: "landscape",
  },
  {
    title: "National Society of Black Engineers",
    category: "STEM Leadership",
    description:
      "STEM leadership and student support rooted in academic excellence and professional readiness.",
    bullets: ["Academic Excellence Chair", "Programs Chair", "Vice President", "STEM mentor"],
    visualLabel: "NSBE",
    placeholderVariant: "engineering",
  },
  {
    title: "Cultural Arts & Wellness",
    category: "Cultural Arts",
    description:
      "Community wellness through cultural expression, movement, rhythm, and shared memory.",
    bullets: ["Break It Down RVA", "West African drum and dance", "Line dancing", "Community wellness"],
    image: "/images/cultural-arts.jpg",
    alt: "Joel Lomnick participating in African drum and dance cultural arts.",
    imageFit: "portrait",
    imageType: "portrait",
  },
  {
    title: "Mentoring",
    category: "Mentorship",
    description:
      "Support for young people and emerging professionals learning to name their value and lead with confidence.",
    bullets: [
      "Young men's mentoring",
      "Resume and career coaching",
      "Leadership development",
      "Personal branding",
      "Professional confidence",
    ],
    visualLabel: "MENTOR",
    placeholderVariant: "leadership",
  },
];

export const contactCards = [
  { title: "Email", value: "jlomnick@lomnickpro.com", href: "mailto:jlomnick@lomnickpro.com" },
  { title: "Phone", value: "(804) 885-0256", href: "tel:+18048850256" },
  { title: "Location", value: "Richmond, Virginia" },
  { title: "Consultation", value: "30-minute virtual consultation" },
];

export const footerValues = [
  "Scholarship",
  "Leadership",
  "Citizenship",
  "Fidelity",
  "Brotherhood",
];
