import { Link } from "react-router-dom";
import { useLang } from "@/i18n/lang";
import { PiedDePage } from "@/components/layout/PiedDePage";
import "./Accueil.css";

const contenu = {
  fr: {
    repere: "LRSIA · IFRI · Université d'Abomey-Calavi",
    titre: ["Intelligence artificielle", "et optimisation", "pour l'impact sociétal"],
    introduction:
      "La Ratheil Research Team étudie des méthodes d'apprentissage, de programmation par contraintes et d'optimisation combinatoire à partir de problèmes rencontrés au Bénin.",
    recherche: "Voir nos recherches",
    equipe: "Découvrir l'équipe",
    axesTitre: "Domaines d'application",
    axes: [
      { titre: "Agriculture", dit: "Rendements, maladies des cultures et ravageurs" },
      { titre: "Santé", dit: "Maladies rénales et cardiovasculaires, épilepsie" },
      { titre: "Éducation", dit: "Analyse des apprentissages et outils pédagogiques" },
      { titre: "Logistique", dit: "Tournées de véhicules, planification et ordonnancement" },
    ],
    propos:
      "L'équipe est animée par le Dr Vinasétan Ratheil Houndji au sein du Laboratoire de Recherche en Sciences Informatiques et Applications.",
    apropos: "À propos de l'équipe",
  },
  en: {
    repere: "LRSIA · IFRI · Université d'Abomey-Calavi",
    titre: ["Artificial intelligence", "and optimisation", "for societal impact"],
    introduction:
      "The Ratheil Research Team studies machine learning, constraint programming and combinatorial optimisation through problems encountered in Benin.",
    recherche: "Explore our research",
    equipe: "Meet the team",
    axesTitre: "Application areas",
    axes: [
      { titre: "Agriculture", dit: "Yields, crop diseases and pests" },
      { titre: "Health", dit: "Kidney and cardiovascular disease, epilepsy" },
      { titre: "Education", dit: "Learning analytics and teaching tools" },
      { titre: "Logistics", dit: "Vehicle routing, planning and scheduling" },
    ],
    propos:
      "The team is led by Dr Vinasétan Ratheil Houndji within the Laboratory for Research in Computer Science and Applications.",
    apropos: "About the team",
  },
};

/** Une page d'accueil courte : identité, programme scientifique et accès directs. */
export function Accueil() {
  const { lang, path } = useLang();
  const dit = contenu[lang];

  return (
    <>
      <div className="acc">
        <section id="ouverture" className="acc-hero">
          <p className="acc-repere">{dit.repere}</p>
          <h1>
            {dit.titre.map((ligne) => <span key={ligne}>{ligne}</span>)}
          </h1>
          <div className="acc-intro">
            <p>{dit.introduction}</p>
            <nav className="acc-actions" aria-label={lang === "en" ? "Main links" : "Accès principaux"}>
              <Link to={path("/research")}>{dit.recherche}</Link>
              <Link to={path("/people")}>{dit.equipe}</Link>
            </nav>
          </div>
        </section>

        <section className="acc-axes">
          <h2>{dit.axesTitre}</h2>
          <ol>
            {dit.axes.map((axe, rang) => (
              <li key={axe.titre}>
                <span className="acc-index">{String(rang + 1).padStart(2, "0")}</span>
                <h3>{axe.titre}</h3>
                <p>{axe.dit}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="acc-propos">
          <p>{dit.propos}</p>
          <Link to={path("/about")}>{dit.apropos}</Link>
        </section>
      </div>
      <PiedDePage />
    </>
  );
}
