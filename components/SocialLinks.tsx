import { ArrowUpRight } from "lucide-react";
const socialLinks = [
 { label: "LinkedIn", href: "https://www.linkedin.com/in/joel-lomnick-eit-68774a35" },
 { label: "Facebook", href: "https://www.facebook.com/joel.lomnick" },
 { label: "Instagram", href: "https://www.instagram.com/olunirun/" },
];
function SocialIcon({name}:{name:string}) { return <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">{name==="LinkedIn"?<><rect x="3" y="9" width="4" height="12" rx=".4"/><circle cx="5" cy="5" r="2.2"/><path d="M10 9h4v1.6c.8-1.2 2-1.9 3.6-1.9 3.1 0 4.4 2 4.4 5V21h-4v-6.6c0-1.5-.5-2.4-1.8-2.4-1.5 0-2.2 1-2.2 2.8V21h-4z"/></>:name==="Facebook"?<path d="M14 22v-9h3l.5-4H14V6.5c0-1.2.4-2 2-2h1.8V1.2C17.5 1.1 16.4 1 15.1 1 12.3 1 10 2.7 10 6v3H7v4h3v9z"/>:<><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.2"/></>}</svg>; }
export function SocialLinks() { return <div className="social-links flex flex-wrap gap-x-5 gap-y-2">{socialLinks.map(({label,href}) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex min-h-11 items-center gap-2 text-base font-semibold underline underline-offset-4 hover:text-mutedGold"><SocialIcon name={label}/><span>{label}</span><ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>)}</div>; }
