import {
  ExternalLink,
  GraduationCap,
  Mail,
  Globe,
} from "lucide-react";
import type { ComponentType } from "react";

type PropsIcone = { size?: number; strokeWidth?: number; "aria-hidden"?: boolean };

function Marque({ chemin, size = 18 }: { chemin: string; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={chemin} /></svg>;
}

const GithubIcon = ({ size }: PropsIcone) => (
  <Marque size={size} chemin="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 5 18 5.3 18 5.3c.7 1.6.3 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
);

const LinkedinIcon = ({ size }: PropsIcone) => (
  <Marque size={size} chemin="M19 0H5a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5ZM8 19H5v-9h3Zm-1.5-10.3A1.75 1.75 0 1 1 6.5 5.2a1.75 1.75 0 0 1 0 3.5ZM19 19h-3v-4.6c0-2.8-3-2.6-3 0V19h-3v-9h3v1.8c1.4-2.6 6-2.8 6 2.4Z" />
);

const YoutubeIcon = ({ size }: PropsIcone) => (
  <Marque size={size} chemin="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4L15.8 12Z" />
);

function choisir(intitule: string, vers: string): ComponentType<PropsIcone> {
  const cle = `${intitule} ${vers}`.toLowerCase();
  if (cle.includes("github.com")) return GithubIcon;
  if (cle.includes("linkedin.com")) return LinkedinIcon;
  if (cle.includes("scholar.google")) return GraduationCap;
  if (cle.includes("mailto:")) return Mail;
  if (cle.includes("youtube.com") || cle.includes("youtu.be")) return YoutubeIcon;
  if (cle.includes("site") || cle.includes("website") || cle.includes("ratheil.info")) return Globe;
  return ExternalLink;
}

/** Un lien externe avec l'icône correspondant réellement au service visé. */
export function LienIcone({ intitule, vers }: { intitule: string; vers: string }) {
  const Icone = choisir(intitule, vers);
  return (
    <a href={vers} target="_blank" rel="noreferrer">
      <Icone size={18} strokeWidth={1.7} aria-hidden={true} />
      <span>{intitule}</span>
    </a>
  );
}
