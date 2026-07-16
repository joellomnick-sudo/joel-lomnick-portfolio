import type { PublicAssetId } from "@/data/publicAssets";

export type PhotoRecord = {
  assetId: PublicAssetId;
  page: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  aspectRatio: string;
  objectFit: "cover" | "contain";
  objectPosition: string;
  mayCrop: boolean;
  useContain: boolean;
};

export const photoInventory: PhotoRecord[] = [
  { assetId: "home-headshot", page: "home", alt: "Joel M. Lomnick seated in a black suit at a conference table.", caption: "Richmond-based engineer, storyteller, mentor, and community builder.", width: 501, height: 626, aspectRatio: "501 / 626", objectFit: "cover", objectPosition: "50% 32%", mayCrop: true, useContain: false },
  { assetId: "about-family-legacy", page: "about", alt: "Joel Lomnick with his mother during a family celebration.", caption: "Family, survival, responsibility, and the people who taught Joel how to care for a room.", width: 415, height: 899, aspectRatio: "415 / 899", objectFit: "contain", objectPosition: "center", mayCrop: false, useContain: true },
  { assetId: "about-gospel-ensemble", page: "about", alt: "RIT Gospel Ensemble members gathered after a performance.", caption: "Faith, Black belonging, and service during the RIT years.", width: 540, height: 405, aspectRatio: "4 / 3", objectFit: "contain", objectPosition: "center", mayCrop: false, useContain: true },
  { assetId: "about-african-dance-albany", page: "about", alt: "Joel Lomnick and a fellow artist in West African attire in Albany, New York.", caption: "Culture, grief, brotherhood, and reinvention in the Capital Region.", width: 767, height: 525, aspectRatio: "767 / 525", objectFit: "contain", objectPosition: "center", mayCrop: false, useContain: true },
  { assetId: "about-richmond-rebuild", page: "about", alt: "Joel Lomnick holding a Maggie L. Walker program in Richmond.", caption: "Richmond became a place to rebuild professional life and reconnect service with joy.", width: 395, height: 537, aspectRatio: "395 / 537", objectFit: "contain", objectPosition: "center", mayCrop: false, useContain: true },
  { assetId: "engineering-coordination", page: "engineering", alt: "Joel Lomnick participating in a generic engineering coordination discussion at a whiteboard.", caption: "A safe public image of collaborative engineering thinking; no client documents are shown.", width: 1140, height: 600, aspectRatio: "19 / 10", objectFit: "cover", objectPosition: "50% 48%", mayCrop: true, useContain: false },
  { assetId: "community-nsbe", page: "community-leadership", alt: "Joel Lomnick with fellow National Society of Black Engineers leaders.", caption: "Academic excellence, STEM outreach, and support for Black engineering students.", width: 604, height: 453, aspectRatio: "4 / 3", objectFit: "contain", objectPosition: "center", mayCrop: false, useContain: true },
  { assetId: "community-iota", page: "community-leadership", alt: "Joel Lomnick with Iota Phi Theta brothers at a community gathering.", caption: "Brotherhood, service, succession, and chapter continuity.", width: 1199, height: 899, aspectRatio: "4 / 3", objectFit: "contain", objectPosition: "center", mayCrop: false, useContain: true },
  { assetId: "community-nphc", page: "community-leadership", alt: "Joel Lomnick with a National Pan-Hellenic Council colleague.", caption: "Coalition service and relationship-centered public work.", width: 338, height: 561, aspectRatio: "338 / 561", objectFit: "contain", objectPosition: "center", mayCrop: false, useContain: true },
  { assetId: "community-church-media", page: "community-leadership", alt: "Church media workstation supporting worship livestream and communication.", caption: "Media ministry as access, hospitality, and service.", width: 830, height: 624, aspectRatio: "4 / 3", objectFit: "contain", objectPosition: "center", mayCrop: false, useContain: true },
  { assetId: "community-mentoring", page: "community-leadership", alt: "Joel Lomnick encouraging young people during a mentoring outing.", caption: "Confidence, accountability, and helping young men recognize their value.", width: 514, height: 380, aspectRatio: "257 / 190", objectFit: "contain", objectPosition: "center", mayCrop: false, useContain: true },
  { assetId: "community-djembe", page: "community-leadership", alt: "Joel Lomnick with a djembe in West African attire.", caption: "Rhythm as culture, memory, joy, discipline, and wellness.", width: 533, height: 666, aspectRatio: "533 / 666", objectFit: "contain", objectPosition: "center", mayCrop: false, useContain: true },
  { assetId: "community-line-dance", page: "community-leadership", alt: "Joel Lomnick with members of the Break It Down RVA line-dance community.", caption: "Movement, joy, wellness, and intergenerational connection.", width: 1065, height: 799, aspectRatio: "4 / 3", objectFit: "contain", objectPosition: "center", mayCrop: false, useContain: true },
  { assetId: "lionheart-cover", page: "lionheart", alt: "Cover of Lionheart: The Joel Lomnick Story, Volume 1.", caption: "A memoir about survival, identity, faith, reinvention, and becoming.", width: 501, height: 799, aspectRatio: "501 / 799", objectFit: "contain", objectPosition: "center", mayCrop: false, useContain: true },
];
