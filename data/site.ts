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
  role?: string;
  whatBuilt?: string;
  whatItProves?: string;
  methods?: string;
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
  challenge?: string;
  role?: string;
  system?: string;
  principle?: string;
  outcome?: string;
};

export const navLinks: LinkItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Engineering", href: "/engineering" },
  { label: "Work & Leadership", href: "/work" },
  { label: "Lionheart", href: "/lionheart" },
  { label: "Contact", href: "/contact" },
];

export const identityLabels = [
  "Electrical Engineering",
  "Creative Strategy",
  "Storytelling",
  "Leadership Systems",
  "Community Mentorship",
];

export const homeLanes: CardItem[] = [
  {
    title: "Engineering & Infrastructure",
    description: "Making complex technical work usable.",
    href: "/engineering",
  },
  {
    title: "Creative Strategy",
    description: "Helping mission-driven people show up with clarity.",
    href: "/work",
  },
  {
    title: "Leadership & Community Systems",
    description: "Building structure around service.",
    href: "/work",
  },
  {
    title: "Writing & Storytelling",
    description: "Turning survival and reflection into language.",
    href: "/lionheart",
  },
  {
    title: "Culture & Mentorship",
    description: "Using rhythm, guidance, and presence to help people rise.",
    href: "/work",
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
    ctaLabel: "Connect About Engineering",
  },
  {
    title: "LomnickPro Creative Services",
    category: "Creative Strategy",
    description:
      "Websites, graphics, professional storytelling, and public-facing structure for mission-driven people.",
    href: "/work",
    visualLabel: "LP",
    placeholderVariant: "creative",
    ctaLabel: "Start a Creative Project",
  },
  {
    title: "Leadership & Community Systems",
    category: "Leadership",
    description:
      "Iota, NPHC-MR, church media, NSBE, mentoring, and culturally grounded service systems.",
    href: "/work",
    visualLabel: "RISE",
    placeholderVariant: "leadership",
    ctaLabel: "Connect About Leadership",
  },
  {
    title: "Lionheart: The Joel Lomnick Story",
    category: "Memoir",
    description:
      "A literary project about survival, faith, identity, career, mentorship, and legacy.",
    href: "/lionheart",
    visualLabel: "LH",
    placeholderVariant: "story",
    ctaLabel: "Explore the Story",
  },
];

export const aboutArc: SectionItem[] = [
  {
    title: "Rochester Foundation",
    category: "01",
    description:
      "Family, faith, responsibility, and learning how to read the room without losing the mission.",
    bullets: ["Family roots", "Early responsibility", "Faith and service"],
  },
  {
    title: "RIT Engineering & NSBE",
    category: "02",
    description:
      "Engineering sharpened the technical lens. NSBE reinforced representation, preparation, academic excellence, and student leadership.",
    bullets: ["Electrical engineering", "Academic excellence", "Student leadership"],
  },
  {
    title: "Albany Brotherhood, Church & Cultural Arts",
    category: "03",
    description:
      "Brotherhood, worship, African drum and dance, and service shaped a leadership style rooted in rhythm, accountability, and care.",
    bullets: ["Brotherhood", "Worship", "Cultural arts"],
  },
  {
    title: "Richmond Rebuilding & Leadership",
    category: "04",
    description:
      "Richmond became the place where engineering, LomnickPro, church media, NPHC, mentoring, and creative strategy became one ecosystem.",
    bullets: ["Public-sector work", "LomnickPro", "Coalition service"],
  },
  {
    title: "Current & Future Legacy",
    category: "05",
    description:
      "The next chapter is about building systems, stories, leaders, and infrastructure that help people rise without turning the work into performance.",
    bullets: ["Lionheart", "Mentorship", "Purposeful infrastructure"],
  },
];

export const aboutPhotos: CardItem[] = [
  {
    title: "Family foundation",
    category: "Foundation",
    description: "Family, care, and legacy warmth.",
    image: "/images/mother-godmother-legacy.jpg",
    alt: "Family legacy photo with Joel Lomnick's mother and godmother.",
    imageFit: "cover",
    imageType: "cover",
  },
  {
    title: "Faith and early service",
    category: "Faith",
    description: "RIT, gospel, and formative service.",
    image: "/images/rit-gospel-ensemble.jpg",
    alt: "RIT Gospel Ensemble formative faith and service photo.",
    imageFit: "group-photo",
    imageType: "group-photo",
  },
  {
    title: "Richmond civic identity",
    category: "Richmond",
    description: "Black history, place, and public memory.",
    image: "/images/rva-maggie-walker-statue-unveiling.jpg",
    alt: "Richmond Maggie Walker statue unveiling civic identity photo.",
    imageFit: "cover",
    imageType: "cover",
  },
];

export const beliefStatements = [
  "Build systems that outlive the meeting.",
  "Make the mission visible without making it noisy.",
  "Tell the truth with structure and restraint.",
  "Mentor the next builder before the room needs them.",
];

export const engineeringCards: SectionItem[] = [
  {
    title: "Electrical Systems Coordination",
    description:
      "Code-aware design support across power distribution, lighting, fire alarm, low-voltage, utilities, and existing building conditions.",
  },
  {
    title: "Construction Documentation",
    description:
      "Buildable drawings, scope narratives, field notes, and document coordination that help teams make decisions with confidence.",
  },
  {
    title: "RFIs, Submittals & Field Coordination",
    description:
      "Construction-phase support that turns questions, reviews, and site observations into clear next steps.",
  },
  {
    title: "Public-Sector Infrastructure",
    description:
      "K-12 and public environments where safety, trust, phasing, budget, and owner communication matter as much as the technical answer.",
  },
  {
    title: "Owner-Facing Communication",
    description:
      "Plain-language technical communication for owners, architects, consultants, contractors, and stakeholders who need usable clarity.",
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
      "Purposeful websites and digital ecosystems for churches, chapters, nonprofits, entrepreneurs, and mission-driven people.",
    image: "/images/website-design-work.jpg",
    alt: "Website design and digital presence work sample.",
    imageFit: "screenshot",
    imageType: "screenshot",
  },
  {
    title: "Branding & Graphic Design",
    category: "Branding",
    description:
      "Flyers, identity systems, event graphics, social layouts, business cards, and presentation visuals with structure behind the style.",
    image: "/images/LomnickPro-Business-Card.jpg",
    alt: "Lomnick Professional Services branded business card.",
    imageFit: "screenshot",
    imageType: "screenshot",
  },
  {
    title: "Resume, Bio & Professional Storytelling",
    category: "Professional Story",
    description:
      "Safe, polished career documents, bios, and positioning language that communicate value without exposing private details.",
    image: "/images/bio-storytelling.jpg",
    alt: "Professional storytelling and biography development work.",
    imageFit: "cover",
    imageType: "cover",
  },
  {
    title: "Project Planning & Technical Communication",
    category: "Technical Communication",
    description:
      "Scope narratives, meeting notes, project plans, and plain-language technical communication that make decisions easier.",
    visualLabel: "SCOPE",
    placeholderVariant: "engineering",
  },
  {
    title: "Community Program Strategy",
    category: "Community Strategy",
    description:
      "Structure for service programs, mentoring efforts, chapter initiatives, campaigns, and public-facing community work.",
    visualLabel: "PLAN",
    placeholderVariant: "community",
  },
];

export const portfolioCategories = [
  "Engineering / Infrastructure",
  "Creative Strategy",
  "Fraternity Leadership",
  "Church Media",
  "Coalition Leadership",
  "Storytelling",
  "Mentorship / Culture",
];

export const portfolioItems: CardItem[] = [
  {
    title: "Public-Sector Electrical Coordination",
    category: "Engineering / Infrastructure",
    description:
      "Coordinated technical work for construction environments where clarity, safety, and public trust matter.",
    role: "Electrical Engineer / Project Engineer",
    whatBuilt:
      "Construction documentation, electrical systems coordination, RFIs, submittals, field notes, and owner-facing communication.",
    whatItProves:
      "Technical discipline, public trust, and buildable clarity in public-sector infrastructure.",
    methods: "Power, lighting, fire alarm, low-voltage, utilities, field coordination",
    href: "/engineering",
    ctaLabel: "Connect About Engineering",
  },
  {
    title: "LomnickPro Creative Services",
    category: "Creative Strategy",
    description:
      "A creative services platform built around structure, polish, visibility, and trust for mission-driven people.",
    role: "Founder / Creative Strategist",
    whatBuilt:
      "Websites, flyers, brand systems, presentations, bios, and public-facing messaging.",
    whatItProves:
      "Visual clarity, mission translation, and practical communication without unnecessary noise.",
    methods: "Brand systems, web planning, messaging strategy, digital presence",
    href: "/contact",
    ctaLabel: "Start a Creative Project",
  },
  {
    title: "Omicron Omega Digital Rebuild",
    category: "Fraternity Leadership",
    description:
      "Chapter visibility and digital structure aligned with public professionalism and brotherhood.",
    role: "Vice Polaris / Webmaster / Strategist",
    whatBuilt:
      "Digital presence, recruitment-facing materials, public visibility, documentation habits, and succession support.",
    whatItProves:
      "Leadership, Brotherhood, Fidelity, and sustainable chapter systems handled with compliance-minded care.",
    methods: "Website/social rebuild, public communication, training support, documentation culture",
    href: "/contact",
    ctaLabel: "Connect About Leadership",
  },
  {
    title: "Third Street Bethel Media Systems",
    category: "Church Media / Ministry Operations",
    description:
      "Media support treated as ministry infrastructure: reliable, visible, and accountable.",
    role: "Media Team / Trustee / Internal Audit / Mentor",
    whatBuilt:
      "Worship support, livestream workflows, communications structure, ministry visibility, and service documentation.",
    whatItProves:
      "Service, stewardship, and technical communication inside faith institutions.",
    methods: "AV support, livestream workflows, governance mindset, young men's mentoring",
    href: "/contact",
    ctaLabel: "Discuss Church Media Support",
  },
  {
    title: "NPHC-MR Digital / Conference Strategy",
    category: "Coalition Leadership",
    description:
      "Coalition-facing support where neutrality, professionalism, and shared trust are the point.",
    role: "Webmaster / Digital Support / Iota Representative",
    whatBuilt:
      "Public-facing digital support and strategic planning support for collaborative Divine Nine work.",
    whatItProves:
      "Citizenship, neutrality, professionalism, and coalition trust across organizations.",
    methods: "Council communications, event visibility, public presentation, strategic support",
    href: "/contact",
    ctaLabel: "Connect About Leadership",
  },
  {
    title: "Lionheart Memoir Project",
    category: "Writing / Storytelling",
    description:
      "A literary framework for the story behind the builder, held with emotional honesty and restraint.",
    role: "Author",
    whatBuilt:
      "A memoir framework turning survival, identity, faith, career, mentorship, and legacy into story.",
    whatItProves:
      "Voice, emotional truth, reflection, literary discipline, and legacy-minded storytelling.",
    methods: "Memoir structure, thematic framing, testimony, revision, voice development",
    href: "/lionheart",
    ctaLabel: "Explore the Story",
  },
  {
    title: "Mentorship & Cultural Wellness",
    category: "Mentorship / Culture",
    description:
      "Support systems for young men, emerging professionals, and community wellness through rhythm and movement.",
    role: "Mentor / Cultural Participant / Community Builder",
    whatBuilt:
      "Career support, confidence-building, young men's mentoring, and culturally rooted wellness practice.",
    whatItProves:
      "People development, emotional intelligence, Black joy, and legacy work that lives beyond a single program.",
    methods: "Mentorship, career coaching, cultural arts, line dancing, community wellness",
    href: "/contact",
    ctaLabel: "Request Mentoring or Career Support",
  },
];

export const lionheartThemes = [
  "Survival",
  "Family",
  "Identity",
  "Career",
  "Faith",
  "Mentorship",
  "Legacy",
];

export const leadershipSections: SectionItem[] = [
  {
    title: "Iota Phi Theta / Omicron Omega",
    category: "Fraternity Leadership",
    description:
      "Building tradition through structure, public visibility, compliance-minded documentation, and brotherhood.",
    role:
      "Vice Polaris, Webmaster, Advisor, strategist, and mentor supporting chapter visibility and successor development.",
    system:
      "Website and social media rebuild, public communication habits, education support, documentation culture, and executive council continuity.",
    principle:
      "Scholarship, Leadership, Citizenship, Fidelity, and Brotherhood.",
    outcome:
      "A stronger public presence and a more structured leadership culture that keeps service and brotherhood ahead of personal clout.",
    image: "/images/omicron-omega-young-professionals.jpg",
    alt: "Omicron Omega young professionals representing polished Iota leadership.",
    imageFit: "group-photo",
    imageType: "group-photo",
  },
  {
    title: "NPHC of Metro Richmond",
    category: "Council Service",
    description:
      "Coalition work requires clarity, neutrality, professionalism, and trust.",
    role:
      "Webmaster, digital support partner, and Iota representative supporting neutral public-facing presentation.",
    system:
      "Digital visibility, council communications, event support, and web updates that keep the coalition clear and credible.",
    principle:
      "Citizenship, collaboration, neutrality, and professional trust.",
    outcome:
      "Council work stays visually and politically distinct while still showing coordinated service across organizations.",
    image: "/images/nphc-mr-presidents.jpg",
    alt: "National Pan-Hellenic Council of Metro Richmond presidents group photo.",
    imageFit: "group-photo",
    imageType: "group-photo",
  },
  {
    title: "Third Street Bethel AME Church Media",
    category: "Church Media",
    description:
      "Church media is ministry infrastructure.",
    role:
      "Media ministry servant with trustee, internal audit, and mentoring perspective.",
    system:
      "Livestream support, AV workflows, communication habits, event visuals, and documentation-minded service.",
    principle:
      "Stewardship, accountability, ministry support, and practical excellence.",
    outcome:
      "Media work reads as operational ministry infrastructure rather than a side volunteer hobby.",
    image: "/images/church-media-work.jpg",
    alt: "Church media production setup for livestream and worship support.",
    imageFit: "landscape",
    imageType: "landscape",
  },
  {
    title: "NSBE / STEM Leadership",
    category: "STEM Leadership",
    description:
      "STEM leadership is academic excellence, representation, and preparation.",
    role:
      "Academic Excellence Chair, Programs Chair, Vice President, and STEM mentor formed through the RIT engineering experience.",
    system:
      "Academic support, programs, student leadership, and professional readiness habits.",
    principle:
      "Representation, preparation, academic excellence, and disciplined support.",
    outcome:
      "Engineering identity became connected to service, not just credentials.",
    image: "/images/NSBE-Regional1-Board-Award.jpg",
    alt: "NSBE regional board award representing STEM leadership.",
    imageFit: "contain",
    imageType: "contain",
  },
  {
    title: "Mentoring",
    category: "Mentorship",
    description:
      "Mentoring is helping people name their value and build enough structure to act on it.",
    role:
      "Mentor, career coach, big-brother/father-figure style guide, and practical structure builder.",
    system:
      "Career support, leadership development, personal branding, and confidence-building conversations.",
    principle:
      "People development, emotional intelligence, preparation, and care.",
    outcome:
      "Mentees get clearer language, stronger documents, and enough structure to take the next responsible step.",
    image: "/images/mentorship-anime-convention.jpg",
    alt: "Mentorship and anime convention relational mentoring photo.",
    imageFit: "group-photo",
    imageType: "group-photo",
  },
  {
    title: "Cultural Arts & Wellness",
    category: "Cultural Arts",
    description:
      "Movement, rhythm, and culture are part of how communities heal and remember.",
    role:
      "Cultural participant and community connector supporting wellness through shared practice.",
    system:
      "African drum and dance, Break It Down RVA, line dancing, and culturally rooted gathering spaces.",
    principle:
      "Memory, movement, joy, wellness, and continuity.",
    outcome:
      "Culture becomes part of the leadership ecosystem instead of being treated as an unrelated hobby.",
    image: "/images/joel-djembe-drum-african.jpg",
    alt: "Joel Lomnick with a djembe drum representing cultural arts and wellness.",
    imageFit: "portrait",
    imageType: "portrait",
  },
];

export const contactCards = [
  { title: "Email", value: "jlomnick@lomnickpro.com", href: "mailto:jlomnick@lomnickpro.com" },
  { title: "Phone", value: "(804) 885-0256", href: "tel:+18048850256" },
  { title: "Location", value: "Richmond, Virginia" },
  { title: "Consultation", value: "30-minute virtual consultation" },
];

export const contactCategories = [
  "Engineering / professional inquiry",
  "Creative services",
  "Website or digital presence",
  "Speaking or workshop request",
  "Resume or career support",
  "Community, church, or fraternity collaboration",
  "Lionheart or writing inquiry",
];

export const footerValues = [
  "Scholarship",
  "Leadership",
  "Citizenship",
  "Fidelity",
  "Brotherhood",
];
