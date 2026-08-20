import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PisteRelais } from "@/components/likova/PisteRelais";
import { FiletSegmente } from "@/components/likova/FiletSegmente";
import { IllustrationChiffre, type Illustration } from "@/components/visuels/IllustrationChiffre";
import { SEUIL_EMPILE, useEmpile } from "@/hooks/useEmpile";
import "./Chiffres.css";

gsap.registerPlugin(ScrollTrigger);

export interface Chiffre {
  valeur: string;
  /** Le début de la phrase, à gauche. */
  libelle: string;
  /** Sa fin, collée au nombre : les deux se lisent d'un trait. */
  precision: string;
  note?: string;
  illustration: Illustration;
  /** L'emblème de ce que le chiffre compte, quand il en existe un vrai. */
  embleme?: { fichier: string; alt: string; vers: string };
}

/**
 * Les chiffres, un par écran.
 *
 * Le site de référence ne les empile jamais : chaque nombre occupe la fenêtre
 * entière, sur un plan qui dit de quoi il parle, et le filet au-dessus est
 * coupé en autant de segments qu'il y a de chiffres à voir. Empiler quatre
 * bandes l'une sous l'autre, c'est quatre traits qui ne disent rien.
 *
 * La phrase se coupe en deux : son début à gauche, sa fin contre le nombre.
 * On lit « le laboratoire mène ses recherches depuis 2017 » d'un bout à
 * l'autre de l'écran.
 */
export function Chiffres({ chiffres }: { chiffres: Chiffre[] }) {
  // La queue ne sert qu'au volet ; sans volet, elle ne serait que du vide.
  const queue = useEmpile() ? 0 : 2;

  return (
    <section id="chiffres" className="chf">
      {/* Deux écrans de queue : le dernier chiffre tient pendant toute la
          course du volet, qui s'ouvre, patiente, puis se retire par-dessus. */}
      <PisteRelais nombre={chiffres.length} queue={queue} className="chf-scene">
        {(rang) => <Carte chiffre={chiffres[rang]} rang={rang} total={chiffres.length} />}
      </PisteRelais>
    </section>
  );
}

/**
 * Un chiffre en place.
 *
 * À chaque relais, les chiffres remontent un à un depuis leur masque et la
 * phrase les suit. Le mouvement dit ce qu'il fait : un nombre se pose, il ne
 * clignote pas et il ne rebondit pas.
 */
function Carte({ chiffre, rang, total }: { chiffre: Chiffre; rang: number; total: number }) {
  const carteRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Empilé, les quatre chiffres sont montés d'un coup : chacun attend qu'on
      // arrive sur lui, sinon ils se jouent tous au chargement.
      const scene = gsap.timeline(
        window.matchMedia(SEUIL_EMPILE).matches
          ? { scrollTrigger: { trigger: carteRef.current, start: "top 80%", once: true } }
          : {},
      );
      scene.fromTo(
        ".chf-chiffre > span",
        { yPercent: 100 },
        { yPercent: 0, duration: 0.9, ease: "power3.out", stagger: 0.055 },
      );
      scene.fromTo(
        ".chf-dit",
        { yPercent: 60, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.07 },
        0.1,
      );
      return () => {
        scene.scrollTrigger?.kill();
        scene.kill();
      };
    },
    // Le rang, et non la valeur : deux chiffres peuvent porter le même nombre.
    { scope: carteRef, dependencies: [rang] },
  );

  return (
    <div ref={carteRef} className="chf-carte">
      <div className="chf-plan" data-derive="90">
        <IllustrationChiffre illustration={chiffre.illustration} />
      </div>

      <div className="chf-bande" data-derive="24">
        <FiletSegmente total={total} rang={rang} />

        <div className="chf-corps">
          <div className="chf-gauche">
            <p className="chf-dit chf-libelle">{chiffre.libelle}</p>
            {chiffre.note ? <p className="chf-dit chf-note">{chiffre.note}</p> : null}
            {chiffre.embleme ? <Embleme embleme={chiffre.embleme} /> : null}
          </div>

          <div className="chf-droite">
            <p className="chf-dit chf-precision">{chiffre.precision}</p>
            <p className="chf-valeur" aria-label={chiffre.valeur}>
              {Array.from(chiffre.valeur).map((caractere, position) => (
                <span key={`${caractere}-${position}`} className="chf-chiffre" aria-hidden="true">
                  <span>{caractere}</span>
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * L'emblème posé sous la phrase.
 *
 * Le logo du BWAI porte ses lettres en noir : sur le fond nuit elles
 * disparaîtraient. Il lui faut donc sa plaque claire, qui est de toute façon
 * la façon dont le site présente déjà ce qui vient du dehors.
 */
function Embleme({ embleme }: { embleme: NonNullable<Chiffre["embleme"]> }) {
  return (
    <a className="chf-dit chf-embleme" href={embleme.vers} target="_blank" rel="noreferrer">
      <img
        src={`/imgs/logos/${embleme.fichier}-280.webp`}
        srcSet={`/imgs/logos/${embleme.fichier}-280.webp 218w, /imgs/logos/${embleme.fichier}.webp 437w`}
        sizes="10rem"
        width={218}
        height={280}
        alt={embleme.alt}
        loading="lazy"
        decoding="async"
      />
    </a>
  );
}
