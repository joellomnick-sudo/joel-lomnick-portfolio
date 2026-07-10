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
  { label: "Creative Services", href: "/creative-services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Lionheart", href: "/lionheart" },
  { label: "Leadership", href: "/leadership" },
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
    category: "Engineering",
    description:
      "Electrical systems coordination, construction documentation, public-sector infrastructure, and owner-facing communication.",
    href: "/engineering",
    visualLabel: "EIT",
    placeholderVariant: "engineering",
  },
  {
    title: "Creative Strategy",
    category: "Creative",
    description:
      "LomnickPro structure for websites, brands, presentations, resumes, and public-facing messaging that builds trust.",
    href: "/creative-services",
    visualLabel: "LP",
    placeholderVariant: "creative",
  },
  {
    title: "Leadership & Community Systems",
    category: "Leadership",
    description:
      "Chapter systems, church media workflows, coalition support, compliance-minded leadership, and succession planning.",
    href: "/leadership",
    visualLabel: "LEAD",
    placeholderVariant: "leadership",
  },
  {
    title: "Writing & Storytelling",
    category: "Story",
    description:
      "Lionheart and the larger practice of turning survival, identity, faith, career, and legacy into disciplined story.",
    href: "/lionheart",
    visualLabel: "LH",
    placeholderVariant: "story",
  },
  {
    title: "Culture & Mentorship",
    category: "Mentorship",
    description:
      "Young men's mentoring, career support, cultural wellness, rhythm, movement, and spaces where people can rise.",
    href: "/contact",
    visualLabel: "RISE",
    placeholderVariant: "community",
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

export const aboutArc: SectionItem[] = [
  {
    title: "Rochester Foundation",
    category: "Origin",
    description:
      "The foundation was built around family, faith, survival, work ethic, and learning how to read the room without losing the mission.",
    bullets: ["Family roots", "Early responsibility", "Faith and service", "Resilience with restraint"],
    visualLabel: "ROC",
    placeholderVariant: "document",
  },
  {
    title: "RIT Engineering & NSBE",
    category: "Formation",
    description:
      "Engineering school sharpened the technical lens, while NSBE leadership reinforced representation, preparation, and academic excellence.",
    bullets: ["Electrical engineering", "Academic excellence", "Programs leadership", "STEM mentorship"],
    visualLabel: "RIT",
    placeholderVariant: "engineering",
  },
  {
    title: "Albany Brotherhood, Church & Cultural Arts",
    category: "Community",
    description:
      "Brotherhood, worship, cultural arts, and service shaped a public leadership style grounded in rhythm, accountability, and care.",
    bullets: ["Iota Phi Theta", "Church service", "African drum and dance", "Cultural memory"],
    visualLabel: "ALB",
    placeholderVariant: "leadership",
  },
  {
    title: "Richmond Rebuilding & Leadership",
    category: "Rebuild",
    description:
      "Richmond became the place where engineering, LomnickPro, church media, NPHC, mentoring, and creative strategy became one ecosystem.",
    bullets: ["Public-sector projects", "LomnickPro", "NPHC-MR", "Church media"],
    visualLabel: "RVA",
    placeholderVariant: "community",
  },
  {
    title: "Current & Future Legacy",
    category: "Legacy",
    description:
      "The next chapter is about building systems, stories, leaders, and infrastructure that help people rise without turning the work into performance.",
    bullets: ["Lionheart", "Mentorship", "Leadership systems", "Purposeful infrastructure"],
    visualLabel: "NEXT",
    placeholderVariant: "story",
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
      "Flyers, identity systems, event graphics, social media layouts, business cards, and presentation visuals with structure behind the style.",
    image: "/images/lomnickpro-work.jpg",
    alt: "Lomnick Professional Services website and branding preview.",
    imageFit: "screenshot",
    imageType: "screenshot",
  },
  {
    title: "Resume, Bio & Professional Storytelling",
    category: "Professional Story",
    description:
      "Safe, polished career documents, bios, and positioning language that communicate value without exposing private details.",
    visualLabel: "BIO",
    placeholderVariant: "document",
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
  {
    title: "Leadership & Mentoring Support",
    category: "Mentoring",
    description:
      "Practical coaching, structure, documentation, and confidence-building support for emerging leaders and young professionals.",
    image: "/images/mentoring-work.jpg",
    alt: "Young men's mentoring program group photo.",
    imageFit: "group-photo",
    imageType: "group-photo",
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
      "Coordinated technical work for real construction environments where clarity, safety, and public trust matter.",
    role: "Electrical Engineer / Project Engineer",
    whatBuilt:
      "Coordinated construction documentation, electrical systems, RFIs, submittals, field notes, and owner-facing communication.",
    whatItProves:
      "Technical discipline, public trust, and buildable clarity in public-sector infrastructure.",
    methods: "Power, lighting, fire alarm, low-voltage, utilities, field coordination",
    href: "/engineering",
    visualLabel: "EIT",
    placeholderVariant: "engineering",
    ctaLabel: "Connect About Engineering",
  },
  {
    title: "LomnickPro Creative Services",
    category: "Creative Strategy",
    description:
      "A creative services platform built around structure, polish, visibility, and trust for mission-driven people.",
    role: "Founder / Creative Strategist",
    whatBuilt:
      "Websites, flyers, brand systems, presentations, resumes, bios, and public-facing messaging.",
    whatItProves:
      "Visual clarity, mission translation, and practical communication without unnecessary noise.",
    methods: "Brand systems, web planning, Canva/Wix-style workflows, messaging strategy",
    href: "/creative-services",
    visualLabel: "LP",
    placeholderVariant: "creative",
    ctaLabel: "Start a Creative Project",
  },
  {
    title: "Omicron Omega Digital Rebuild",
    category: "Fraternity Leadership",
    description:
      "Chapter visibility and digital structure aligned with public professionalism and brotherhood.",
    role: "Vice Polaris / Webmaster / Strategist",
    whatBuilt:
      "Digital presence, recruitment-facing materials, chapter visibility, documentation habits, and succession support.",
    whatItProves:
      "Leadership, Brotherhood, Fidelity, and sustainable chapter systems handled with compliance-minded care.",
    methods: "Website/social media rebuild, public communications, training support, documentation culture",
    href: "/leadership",
    visualLabel: "IOTA",
    placeholderVariant: "leadership",
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
    href: "/leadership",
    visualLabel: "MEDIA",
    placeholderVariant: "community",
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
    href: "/leadership",
    visualLabel: "NPHC",
    placeholderVariant: "community",
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
    visualLabel: "LH",
    placeholderVariant: "story",
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
    href: "/leadership",
    visualLabel: "RISE",
    placeholderVariant: "community",
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
      "Building tradition through structure, visibility, compliance, and brotherhood.",
    challenge:
      "A chapter needs public visibility, internal continuity, and leadership development without exposing private or restricted fraternity work.",
    role:
      "Vice Polaris, Webmaster, Advisor, strategist, and compliance-minded mentor supporting chapter visibility and successor development.",
    system:
      "Website and social media rebuild, public-facing communication habits, education support, documentation culture, and executive council continuity.",
    principle:
      "Scholarship, Leadership, Citizenship, Fidelity, and Brotherhood.",
    outcome:
      "A stronger public presence and a more structured leadership culture that keeps service and brotherhood ahead of personal clout.",
    bullets: [
      "Vice Polaris",
      "Webmaster",
      "Advisor",
      "Compliance-focused education support",
      "Chapter strategist",
      "Succession planning",
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
      "Coalition work requires clarity, neutrality, professionalism, and trust.",
    challenge:
      "A citywide Divine Nine council needs shared public visibility without making the work look like one chapter's platform.",
    role:
      "Webmaster, digital support partner, and Iota representative supporting neutral public-facing presentation.",
    system:
      "Digital visibility, council communications, event support, and web updates that keep the coalition clear and credible.",
    principle:
      "Citizenship, collaboration, neutrality, and professional trust.",
    outcome:
      "NPHC-MR work stays visually and politically distinct from Iota while still showing coordinated service across organizations.",
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
      "Church media is ministry infrastructure.",
    challenge:
      "Worship, announcements, livestream, and service communication need dependable systems, not last-minute improvisation.",
    role:
      "Media ministry servant with trustee, internal audit, and mentoring perspective.",
    system:
      "Livestream support, AV workflows, communications habits, event visuals, and documentation-minded service.",
    principle:
      "Stewardship, accountability, ministry support, and practical excellence.",
    outcome:
      "Media work reads as operational ministry infrastructure rather than a side volunteer hobby.",
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
      "STEM leadership is academic excellence, representation, and preparation.",
    challenge:
      "Students in demanding technical spaces need preparation, representation, and peer leadership that takes excellence seriously.",
    role:
      "Academic Excellence Chair, Programs Chair, Vice President, and STEM mentor formed through the RIT engineering experience.",
    system:
      "Academic support, programs, student leadership, and professional readiness habits.",
    principle:
      "Representation, preparation, academic excellence, and disciplined support.",
    outcome:
      "Engineering identity became connected to service, not just credentials.",
    bullets: ["Academic Excellence Chair", "Programs Chair", "Vice President", "STEM mentor"],
    visualLabel: "NSBE",
    placeholderVariant: "engineering",
  },
  {
    title: "Mentoring",
    category: "Mentorship",
    description:
      "Mentoring is helping people name their value and build enough structure to act on it.",
    challenge:
      "Young men and emerging professionals often have ability before they have language, confidence, or systems around their next move.",
    role:
      "Mentor, career coach, big-brother/father-figure style guide, and practical structure builder.",
    system:
      "Resume coaching, career support, leadership development, personal branding, and confidence-building conversations.",
    principle:
      "People development, emotional intelligence, preparation, and care.",
    outcome:
      "Mentees get clearer language, stronger documents, and enough structure to take the next responsible step.",
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
  {
    title: "Cultural Arts & Wellness",
    category: "Cultural Arts",
    description:
      "Movement, rhythm, and culture are part of how communities heal and remember.",
    challenge:
      "Community wellness needs spaces where people can reconnect with rhythm, movement, memory, and Black joy.",
    role:
      "Cultural participant and community connector supporting wellness through shared practice.",
    system:
      "African drum and dance, Break It Down RVA, line dancing, and culturally rooted gathering spaces.",
    principle:
      "Memory, movement, joy, wellness, and continuity.",
    outcome:
      "Culture becomes part of the leadership ecosystem instead of being treated as an unrelated hobby.",
    bullets: ["Break It Down RVA", "West African drum and dance", "Line dancing", "Community wellness"],
    image: "/images/cultural-arts.jpg",
    alt: "Joel Lomnick participating in African drum and dance cultural arts.",
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
