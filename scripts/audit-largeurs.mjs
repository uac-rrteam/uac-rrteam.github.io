// Capture chaque page a plusieurs largeurs et signale les debordements
// horizontaux, ce qui est le premier symptome d'une mise en page qui ne tient
// pas dans l'ecran.
//
//   npm run dev            (dans un autre terminal, ou BASE=... pour un autre port)
//   npm install --no-save puppeteer-core
//   node scripts/audit-largeurs.mjs
//
// Les captures partent dans le dossier temporaire, une par page et par largeur ;
// SORTIE=<dossier> pour les ranger ailleurs, PLEINE=oui pour la page entiere.
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'
import puppeteer from 'puppeteer-core'

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
const BASE = process.env.BASE ?? 'http://localhost:5300'
const sortie = process.env.SORTIE ?? join(process.env.TEMP ?? '.', 'rr-audit')
mkdirSync(sortie, { recursive: true })

const ECRANS = [
  { nom: '320', largeur: 320, hauteur: 640 },
  { nom: '360', largeur: 360, hauteur: 740 },
  { nom: '414', largeur: 414, hauteur: 896 },
  { nom: '768', largeur: 768, hauteur: 1024 },
  { nom: '860', largeur: 860, hauteur: 1000 },
  { nom: '1024', largeur: 1024, hauteur: 768 },
  { nom: '1280', largeur: 1280, hauteur: 800 },
  { nom: '1440', largeur: 1440, hauteur: 900 },
  { nom: '1920', largeur: 1920, hauteur: 1080 },
]

const PAGES = [
  ['accueil', '/fr'],
  ['recherche', '/fr/research'],
  ['evenements', '/fr/events'],
  ['blog', '/fr/blog'],
  ['apropos', '/fr/about'],
  ['equipe', '/fr/people'],
]

const nav = await puppeteer.launch({ executablePath: EDGE, headless: 'new' })
const page = await nav.newPage()
const fautes = []
page.on('pageerror', (e) => fautes.push(String(e)))

const rapport = []

for (const [nom, chemin] of PAGES) {
  for (const ecran of ECRANS) {
    await page.setViewport({ width: ecran.largeur, height: ecran.hauteur })
    await page.goto(BASE + chemin, { waitUntil: 'domcontentloaded' })
    await new Promise((r) => setTimeout(r, 1800))

    const releve = await page.evaluate(() => {
      const vue = document.documentElement.clientWidth
      const debordent = []
      for (const element of document.querySelectorAll('body *')) {
        const cadre = element.getBoundingClientRect()
        if (cadre.width === 0 || cadre.height === 0) continue
        const style = getComputedStyle(element)
        if (style.position === 'fixed') continue
        if (cadre.right > vue + 1 || cadre.left < -1) {
          debordent.push({
            balise: element.tagName.toLowerCase(),
            classe: (element.className || '').toString().slice(0, 48),
            gauche: Math.round(cadre.left),
            droite: Math.round(cadre.right),
          })
        }
      }
      // On ne garde que les plus hauts de chaque branche : un parent qui deborde
      // entraine tous ses enfants, et la liste devient illisible.
      return {
        vue,
        page: document.documentElement.scrollWidth,
        hauteur: document.documentElement.scrollHeight,
        debordent: debordent.slice(0, 12),
      }
    })

    if (releve.page > releve.vue + 1) {
      rapport.push({ page: nom, ecran: ecran.nom, ...releve })
    }

    await page.screenshot({
      path: join(sortie, `${nom}-${ecran.nom}.jpg`),
      type: 'jpeg',
      quality: 70,
      fullPage: process.env.PLEINE === 'oui',
    })
  }
  console.log('vu', nom)
}

console.log('\n=== debordements horizontaux ===')
for (const ligne of rapport) {
  console.log(`${ligne.page} @ ${ligne.ecran} : page ${ligne.page_ ?? ligne.page} largeur ${ligne.vue} -> ${ligne.page}`)
}
console.log(JSON.stringify(rapport, null, 1))
console.log('fautes', [...new Set(fautes)].slice(0, 5))
await nav.close()
