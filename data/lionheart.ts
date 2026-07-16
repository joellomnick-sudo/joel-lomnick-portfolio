import type { PublicAssetId } from "@/data/publicAssets";

export type LionheartSection = {
  page: number;
  kicker: string;
  title: string;
  paragraphs: readonly string[];
};

export type LionheartVolume = {
  slug: "volume-1-preview" | "volume-2-preview";
  title: string;
  label: string;
  description: string;
  assetId: PublicAssetId;
  sections: readonly LionheartSection[];
};

export const lionheartVolumes: readonly LionheartVolume[] = [
  {
    slug: "volume-1-preview",
    title: "Lionheart Volume 1",
    label: "Volume 1 Preview",
    description: "Before the Roar: selected first-person excerpts from the completed first volume.",
    assetId: "lionheart-volume-1-preview",
    sections: [
      {
        page: 2,
        kicker: "A public sneak preview",
        title: "Before the Roar",
        paragraphs: [
          "This ten-page edition presents selected first-person excerpts and lightly condensed transitions from the completed first volume. It introduces the voice, emotional weight, and movement of the memoir without replacing the full book. Names, events, and experiences are presented as remembered by the author.",
          "Content note: This preview includes descriptions of domestic violence and childhood trauma.",
          "In my world, survival was not a choice; it was the rent you paid just to keep breathing. Survival came with non-negotiable codes passed down to keep Black kids alive in a world that was not built for us. My biological family was my first pride - the cradle and the crucible, lifting me one moment and testing me the next.",
          "Engineering eventually gave me something the chaos could not: structure. Systems, circuits, and logic did not lie. If you wired it right, the lights came on, and that honesty felt like relief. But no degree, paycheck, or title could answer every question at home. Identity, faith, ministry, and mentorship kept pressing their way into the same life until all of it braided into one name: Lionheart. Strong but not stone. Tender but not weak. Scarred but not silent.",
        ],
      },
      {
        page: 3,
        kicker: "1981 - Rochester, New York",
        title: "The First Blueprint",
        paragraphs: [
          "I was born Joel M. Lomnick in Rochester, New York, with lungs strong enough to make nurses wince and a mother tough enough to raise me with grit, faith, and the discipline she carried from earning an accounting degree. My mother, Cathy, could hold the world up on a small salary and still make you feel like royalty. She helped people find homes while fighting to keep one steady for her own boys.",
          "My father, Wilfred, was a complicated man - an electrician, carpenter, and Army veteran who carried brilliance in one hand and volatility in the other. Loving him meant holding your breath, waiting to see which version of him came through the door. Our house on Stanley Street was crowded, loud, funny, and vibrantly alive. In that house, I learned how to read a room, find a corner of peace, and shine with almost nothing. Survival was not an extracurricular activity in our household. It was the curriculum.",
        ],
      },
      {
        page: 4,
        kicker: "November 6, 1995 - Sterling Street",
        title: "The Night Childhood Ended",
        paragraphs: [
          "November 6, 1995. A Monday night. My brother Jasen and I were asleep when my mother's scream sliced through the dark: Joey! Jasen! Help! We ran down the hall, and when we reached her room, the world split in two. My father was on top of my mother with a butcher knife in his hand, and her shirt was already blood-soaked.",
          "My brother froze in terror, but for me, fear did not matter - survival took over. I launched myself at my father's back and started swinging, fully aware he could turn the knife on me at any second. One thought crystallized in my mind: if I die tonight, I die saving my mother. So be it.",
          "The police report reduced everything to a few bland words, failing to capture the blood on the sheets, my little brother sobbing in the doorway, or the moment my childhood ended. The next morning, I went to school with my mask firmly in place: the good student, the athlete, the jokester. Nobody knew I had fought my own father to keep my mother alive the night before.",
        ],
      },
      {
        page: 5,
        kicker: "August 1999 - Rochester Institute of Technology",
        title: "Trash Bags and Mini-Fridges",
        paragraphs: [
          "August 1999. My mother, brother, and I rolled into RIT like we were staging a heist. Everything I owned was stuffed in trash bags, beat-up suitcases, and taped boxes, while white families around us unloaded U-Hauls filled with matching dorm sets and mini-fridges. My mother carried exhaustion, pride, and the unspoken question of how long we could afford this.",
          "Then the first red D landed on my desk. Joel 'Most Likely to Succeed' Lomnick stared at it like it belonged to somebody else, realizing that physics, calculus, and programming demanded languages I had not yet learned. I could go entire days without seeing another Black student in class. But when I finally found Unity House, it felt like breathing again. The music, spades tables, and familiar food reminded me that I was not only a dot in a lecture hall - I was part of a people.",
        ],
      },
      {
        page: 6,
        kicker: "Gospel, NSBE, and Black belonging",
        title: "The Rooms That Kept Me Alive",
        paragraphs: [
          "If Unity House gave me family, Gospel Ensemble gave me sanctuary. I entered my first rehearsal expecting to watch, but instead, the room shook with harmony, laughter, and survival. Students packed shoulder to shoulder, turning sterile campus walls into a cathedral. The ensemble became a training ground for leadership, where I moved from assistant director to president and blended technology with community.",
          "NSBE taught me another critical form of survival: how to organize, prepare, advocate, and leave the door open behind me. Together, those rooms helped keep me in school long enough to become the engineer everybody had predicted - and the leader I had not yet imagined. Gospel gave me spirit, and NSBE gave me strategy.",
        ],
      },
      {
        page: 7,
        kicker: "2003-2007 - Rhythm and public voice",
        title: "The Drum Spoke First",
        paragraphs: [
          "The first time I entered a West African drum and dance rehearsal, the room felt older than the building. The drums were not background music; they were instructions. Every rhythm told the dancers where to land, when to answer, and how to become part of something larger than themselves. I learned to stop protecting myself from the moment and let the rhythm move through me.",
          "Performance became another kind of engineering - timing, structure, and trust - except this system sweated, shouted, laughed, and remembered. Rhythm became memory, language, and ministry.",
          "On Sunday mornings, WITR gave me another room. The studio was no bigger than a dorm, but behind the microphone, it felt infinite. Elders requested songs, mothers asked for prayer, and gospel traveled into kitchens across Rochester. I learned to let silence breathe and trust that my voice could carry people.",
        ],
      },
      {
        page: 8,
        kicker: "2005 - Rochester Institute of Technology",
        title: "A Degree and an Empty Seat",
        paragraphs: [
          "Graduation should have been a mountaintop, but grief has a way of tinting even the brightest days. My grandmother Marzell died weeks before I finished RIT. I walked across the stage as a first-generation engineer carrying the Lomnick name onto a diploma, but one of the people I most wanted to see it was gone.",
          "The degree proved that I had survived the equations, the isolation, the financial strain, the failures, and the expectation that I would become the success story everyone had predicted. But achievement did not erase absence. The celebration carried an empty seat.",
        ],
      },
      {
        page: 9,
        kicker: "2005-2007 - Corn Hill crossroads",
        title: "The Promised Land Never Arrived",
        paragraphs: [
          "I moved into a new loft in Corn Hill, expecting the family to celebrate. Instead came painful whispers questioning why I lived somewhere so expensive, while I was already helping with the mortgage, car note, and schoolbooks. The loft was proof I had survived, yet the promised land never arrived.",
          "Kodak was collapsing, and engineering work gave me discipline but not direction. Rochester had given me culture, survival, and voice, but it was also suffocating me. The degree had opened a door, but it had not handed me a map. Achievement had changed what people expected from me without changing how much grief, obligation, and uncertainty I carried. By 2007, I understood that staying could become another kind of surrender.",
        ],
      },
      {
        page: 10,
        kicker: "The road turns east",
        title: "Same Unfinished Heart",
        paragraphs: [
          "Volume 1 ends at the edge of departure. By 2007, Rochester could no longer hold every version of me. The family story was unfinished, and faith was complicated. Engineering had given me a profession, but not yet a home inside myself.",
          "I left my Corn Hill loft in the care of someone I loved like a younger brother, packed what I could carry, and pointed my life toward Troy. New city. New household. Same unfinished heart. The road continues in Volume 2: The Reinvention Years.",
        ],
      },
    ],
  },
  {
    slug: "volume-2-preview",
    title: "Lionheart Volume 2",
    label: "Volume 2 Preview",
    description: "Before the Road Opens Again: selected excerpts from the developing second volume.",
    assetId: "lionheart-volume-2-preview",
    sections: [
      {
        page: 2,
        kicker: "A public sneak preview",
        title: "Before the Road Opens Again",
        paragraphs: [
          "This ten-page edition presents selected first-person excerpts and condensed transitions from the developing second volume. It introduces the voice, emotional weight, humor, contradictions, and movement of the story without replacing the full manuscript.",
          "Volume 2 begins where Volume 1 ends: with me leaving Rochester in 2007 and trying to build a new life in Troy, New York. From there, the story moves through Albany, Schenectady, and Richmond, Virginia, arriving at July 2026 with the work of becoming still unfinished. Dates, names, sequence, and wording may continue to change as the full manuscript is revised and verified.",
          "Content note: This preview includes grief, housing instability, relationship trauma, identity conflict, and references to childhood and family hardship. I did not leave Rochester empty-handed. The ghosts packed themselves.",
        ],
      },
      {
        page: 3,
        kicker: "2007 - Troy, New York",
        title: "The Chrysalis",
        paragraphs: [
          "By 2007, Rochester had become both sanctuary and sarcophagus. It had raised me, educated me, embarrassed me, protected me, and nearly suffocated me. Rochester had given me family, culture, Gospel Ensemble, NSBE, African drum and dance, engineering, radio, chosen brothers, and enough grief to require its own moving truck. So I left.",
          "I arrived in Troy with a new engineering position, a U-Haul full of mismatched furniture, and the dangerous belief that changing cities might change me. The hills were steeper. The winters were colder. The buildings looked like they remembered every factory that had closed and every family that had packed up and gone somewhere warmer. Troy did not look like reinvention. It looked like old brick, narrow streets, complicated parking, and rent due on the first.",
          "The apartment I shared with someone I loved like family became part home, part therapy office, part creative studio, and part emergency planning room. We were two Black men trying to make adulthood look intentional. Most days, it looked like improvisation. We were not simply sharing an apartment. We were trying to become people we had never seen modeled.",
        ],
      },
      {
        page: 4,
        kicker: "July 2008 - Grief crosses the Thruway",
        title: "When the Phone Rang",
        paragraphs: [
          "My mother died in July 2008. There is no clever opening for that sentence. No joke. No engineering metaphor. No gospel flourish strong enough to make the words less final. Cathy Lomnick - the woman who had kept boys fed on numbers that did not add up, who could help other families find housing while fighting to keep our own household from collapsing, who survived poverty, illness, judgment, and nearly everything else life threw at her - was suddenly gone.",
          "Death did not arrive like the movies. There was no perfectly scored montage. There were telephone calls, arrangements, decisions, relatives, unfinished conversations, and that strange administrative cruelty grief brings with it.",
          "One month later, a musician I had come to regard as a brother lost his mother too. Grief fused us together. I became manager, promoter, strategist, cheerleader, driver, adviser, protector, believer, and occasionally the person asking why absolutely nothing had started on time. I poured myself into helping somebody else become visible. Partly because I believed in him. Partly because helping him gave me somewhere to put the love that no longer had a mother to receive it.",
        ],
      },
      {
        page: 5,
        kicker: "2008-2014 - Albany and Schenectady",
        title: "Grief Learned to Dance",
        paragraphs: [
          "Albany taught me that grief could wear church clothes. I entered a historic Black congregation carrying engineering credentials, gospel experience, cultural ambition, and enough unresolved pain to power the sanctuary for a month. I sang, served, created programs, supported ministries, and learned how influence moved through a church long before anyone admitted politics had entered the room.",
          "Church gave me purpose, but it also gave me another stage on which to perform fine. The sanctuary was sacred. The people inside it were still people. That distinction cost me several lessons.",
          "Culture remained one of the places I returned to when words could not hold everything. African drum and dance brought rhythm back to a body that had become too accustomed to bracing for impact. Writing became another form of movement. I created characters bold enough to say what I still whispered. Albany did not make me peaceful. It made me rooted enough to keep becoming.",
        ],
      },
      {
        page: 6,
        kicker: "July 9, 2011 - New York City",
        title: "Brotherhood Became Work",
        paragraphs: [
          "In 2011, I entered Iota Phi Theta Fraternity, Incorporated, looking for brotherhood, tradition, Black male connection, and a place where men could challenge one another without pretending we were invulnerable. I found those things. I also found meetings. Many, many meetings.",
          "Fraternity life gave me brothers, ritual, responsibility, history, and another complicated room in which identity could be both affirmed and concealed. I learned the five foundational principles - Scholarship, Leadership, Citizenship, Fidelity, and Brotherhood - and slowly learned that reciting principles was much easier than building a life around them.",
          "Titles came later: Advisor. Strategist. Webmaster. Vice Polaris. Intake leader. Mentor. Over time, I stopped judging chapters by how loudly they performed loyalty. The real question was whether the organization could protect younger men, survive leadership transitions, and leave something useful behind. The letters looked good on jackets. The principles looked better in practice.",
        ],
      },
      {
        page: 7,
        kicker: "2014 - Richmond, Virginia",
        title: "The Floor Vanished",
        paragraphs: [
          "I arrived in Richmond in 2014 with a promised job, a U-Haul full of belongings, and a gas tank full of faith. Then the job disappeared. No onboarding. No desk. No clean explanation that made the situation less devastating. The professional floor I expected to stand on simply vanished.",
          "For approximately six weeks, my car became bedroom, confessional, sanctuary, closet, dining room, and the place where I planned each next move. Planet Fitness became my bathroom. My retirement account became oxygen. Parking lots became strategic decisions: bright enough to feel safe, dark enough not to attract questions. I told almost nobody. Pride can be a survival tool until it becomes another locked door.",
          "Homelessness did not erase my degree. It made the degree feel like an accusation. My younger brother helped me secure an apartment. Then came a contract engineering position in Charlottesville. The commute was punishing. The pay was low. The work was fragile. But even an exhausting road could feel like proof that the ground might eventually hold.",
        ],
      },
      {
        page: 8,
        kicker: "The Richmond years",
        title: "The Rooms That Gave Me Back to Myself",
        paragraphs: [
          "Richmond became a collection of rooms. Not every room was safe. Not every room lasted. But several gave pieces of me back. The church balcony became a place where technology and ministry met. Wires, cameras, microphones, computers, livestream software, sound checks, and Sunday worship all occupied the same sacred space. Media ministry was not decoration. It was connection.",
          "The dance floor returned joy to my body. West African drum and dance carried memory. Line dancing carried laughter. Community could be built one count at a time - five, six, seven, eight - without requiring every movement to become a metaphor for trauma. Sometimes a grapevine is just a grapevine. Sometimes joy does not require a dissertation.",
          "Mentoring gave the work a future tense. Sitting with Black boys, college students, younger professionals, fraternity members, engineers, and emerging leaders, I recognized brilliance that often arrived disguised as silence, humor, anger, nervousness, or overconfidence. I could not rewrite my childhood, but I could help somebody else enter adulthood with more preparation, vocabulary, documentation, backup, and encouragement than I had.",
        ],
      },
      {
        page: 9,
        kicker: "Love, home, identity, and visibility",
        title: "The House Inside Me",
        paragraphs: [
          "Richmond gave me love. Not one clean, uncomplicated version. It gave me relationships that felt like rescue, relationships that felt like home, and relationships that revealed how often I had confused being needed with being safe. I had learned how to build households before I learned how to rest inside them. Building a home is not the same as occupying one. Loyalty is not the same as fear. Being useful is not the same as being cherished.",
          "For years, I treated bisexuality like a private technical condition: real, consequential, and never to be discussed outside a controlled room. Respectability provided protection, but it also required reduction. I had to stop editing myself so aggressively that only the most publicly convenient version survived. Masculinity did not disappear when tenderness entered the room. Faith did not evaporate because questions remained. Leadership did not require emotional starvation.",
          "As the walls between the rooms of my life came down, engineering, Lomnick Professional Services, Lionheart, church media, fraternity leadership, mentoring, and cultural work began to appear as one life instead of unrelated identities. I did not become fearless. I became less willing to abandon myself.",
        ],
      },
      {
        page: 10,
        kicker: "July 2026 - The story remains open",
        title: "Still Building. Still Healing. Still Becoming.",
        paragraphs: [
          "Volume 2 is not a victory lap. There is no final scene where every debt disappears, every relationship becomes healthy, every health concern resolves, every project succeeds, and the PE license descends from Heaven surrounded by a choir of angels holding NCEES-approved calculators. That would be convenient. It would also be a lie.",
          "Survival, success, service, intimacy, faith, ambition, health, money, grief, leadership, and legacy do not resolve in a straight line. Some chapters remain active. The man at the end of Volume 2 has not solved himself. He has simply become more honest about the work.",
          "The road from Rochester to Troy, from Troy to Albany, from Albany to Richmond, and from survival toward legacy has been funny, painful, spiritual, technical, romantic, reckless, generous, expensive, healing, frustrating, and occasionally held together by prayer, a full tank of gas, and the last available credit limit. In other words, it has been mine. The road continues beyond the last page.",
        ],
      },
    ],
  },
] as const;

export function getLionheartVolume(slug: string): LionheartVolume | undefined {
  return lionheartVolumes.find((volume) => volume.slug === slug);
}
