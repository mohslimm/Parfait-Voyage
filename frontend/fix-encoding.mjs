import fs from 'fs/promises';
import path from 'path';

const searchDirs = [
  './src/app/admin',
  './src/components/admin',
  './src/data',
  './src/store'
];

const replacements = {
  'Ã©': 'é',
  'Ã¨': 'è',
  'Ã ': 'à',
  'Ãª': 'ê',
  'Ã§': 'ç',
  'Ã´': 'ô',
  'Ã®': 'î',
  'Ã¢': 'â',
  'Ã¯': 'ï',
  'Ã»': 'û',
  'Ã‰': 'É',
  'Ãˆ': 'È',
  'Ã€': 'À',
  'Â·': '·',
  'Ã': 'é', // Fallback for some truncated cases
};

async function processDirectory(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await processDirectory(fullPath);
      } else if (entry.isFile() && (fullPath.endsWith('.jsx') || fullPath.endsWith('.js') || fullPath.endsWith('.ts') || fullPath.endsWith('.tsx'))) {
        await processFile(fullPath);
      }
    }
  } catch (err) {
    if (err.code !== 'ENOENT') {
      console.error(`Error reading directory ${dir}:`, err);
    }
  }
}

async function processFile(filePath) {
  try {
    let content = await fs.readFile(filePath, 'utf8');
    let hasChanges = false;
    
    // First pass for exact multi-byte matches
    for (const [bad, good] of Object.entries(replacements)) {
      if (bad === 'Ã') continue; // Skip the single character one for now
      if (content.includes(bad)) {
        content = content.split(bad).join(good);
        hasChanges = true;
      }
    }
    
    // Manual fallback for the specific ones I know got messed up
    if (content.includes('Ã©')) { content = content.replaceAll('Ã©', 'é'); hasChanges = true; }
    if (content.includes('Ã¨')) { content = content.replaceAll('Ã¨', 'è'); hasChanges = true; }
    if (content.includes('dÃ©tails')) { content = content.replaceAll('dÃ©tails', 'détails'); hasChanges = true; }
    if (content.includes('DÃ©part')) { content = content.replaceAll('DÃ©part', 'Départ'); hasChanges = true; }
    if (content.includes('GÃ©rez')) { content = content.replaceAll('GÃ©rez', 'Gérez'); hasChanges = true; }
    if (content.includes('CrÃ©ation')) { content = content.replaceAll('CrÃ©ation', 'Création'); hasChanges = true; }
    if (content.includes('SimplifiÃ©')) { content = content.replaceAll('SimplifiÃ©', 'Simplifié'); hasChanges = true; }
    if (content.includes('nÃ©cessite')) { content = content.replaceAll('nÃ©cessite', 'nécessite'); hasChanges = true; }
    if (content.includes('dÃ©veloppement')) { content = content.replaceAll('dÃ©veloppement', 'développement'); hasChanges = true; }
    if (content.includes('Ã©dition')) { content = content.replaceAll('Ã©dition', 'édition'); hasChanges = true; }
    if (content.includes('RÃ©servations')) { content = content.replaceAll('RÃ©servations', 'Réservations'); hasChanges = true; }
    if (content.includes('RÃ©servation')) { content = content.replaceAll('RÃ©servation', 'Réservation'); hasChanges = true; }
    if (content.includes('rÃ©servations')) { content = content.replaceAll('rÃ©servations', 'réservations'); hasChanges = true; }
    if (content.includes('rÃ©servation')) { content = content.replaceAll('rÃ©servation', 'réservation'); hasChanges = true; }
    if (content.includes('RÃ©fÃ©rence')) { content = content.replaceAll('RÃ©fÃ©rence', 'Référence'); hasChanges = true; }
    if (content.includes('CopiÃ©')) { content = content.replaceAll('CopiÃ©', 'Copié'); hasChanges = true; }
    if (content.includes('Ã ')) { content = content.replaceAll('Ã ', 'à'); hasChanges = true; }
    if (content.includes('ParamÃ¨tres')) { content = content.replaceAll('ParamÃ¨tres', 'Paramètres'); hasChanges = true; }
    if (content.includes('gÃ©nÃ©rale')) { content = content.replaceAll('gÃ©nÃ©rale', 'générale'); hasChanges = true; }
    if (content.includes('enregistrÃ©s')) { content = content.replaceAll('enregistrÃ©s', 'enregistrés'); hasChanges = true; }
    if (content.includes('succÃ¨s')) { content = content.replaceAll('succÃ¨s', 'succès'); hasChanges = true; }
    if (content.includes('GÃ©nÃ©rales')) { content = content.replaceAll('GÃ©nÃ©rales', 'Générales'); hasChanges = true; }
    if (content.includes('DÃ©pensÃ©')) { content = content.replaceAll('DÃ©pensÃ©', 'Dépensé'); hasChanges = true; }
    if (content.includes('DerniÃ¨re')) { content = content.replaceAll('DerniÃ¨re', 'Dernière'); hasChanges = true; }
    if (content.includes('ActivitÃ©')) { content = content.replaceAll('ActivitÃ©', 'Activité'); hasChanges = true; }
    if (content.includes('TÃ©lÃ©phone')) { content = content.replaceAll('TÃ©lÃ©phone', 'Téléphone'); hasChanges = true; }
    if (content.includes('donnÃ©es')) { content = content.replaceAll('donnÃ©es', 'données'); hasChanges = true; }
    if (content.includes('CatÃ©gorie')) { content = content.replaceAll('CatÃ©gorie', 'Catégorie'); hasChanges = true; }
    if (content.includes('DurÃ©e')) { content = content.replaceAll('DurÃ©e', 'Durée'); hasChanges = true; }
    if (content.includes('DubaÃ¯')) { content = content.replaceAll('DubaÃ¯', 'Dubaï'); hasChanges = true; }
    if (content.includes('Ãvolution')) { content = content.replaceAll('Ãvolution', 'Évolution'); hasChanges = true; }
    if (content.includes('RÃ©partition')) { content = content.replaceAll('RÃ©partition', 'Répartition'); hasChanges = true; }
    if (content.includes('catÃ©gorie')) { content = content.replaceAll('catÃ©gorie', 'catégorie'); hasChanges = true; }
    if (content.includes('rÃ©centes')) { content = content.replaceAll('rÃ©centes', 'récentes'); hasChanges = true; }
    if (content.includes('ActivitÃ©')) { content = content.replaceAll('ActivitÃ©', 'Activité'); hasChanges = true; }
    if (content.includes('rÃ©cente')) { content = content.replaceAll('rÃ©cente', 'récente'); hasChanges = true; }
    if (content.includes('confirmÃ©e')) { content = content.replaceAll('confirmÃ©e', 'confirmée'); hasChanges = true; }
    if (content.includes('supprimÃ©e')) { content = content.replaceAll('supprimÃ©e', 'supprimée'); hasChanges = true; }
    if (content.includes('supprimÃ©')) { content = content.replaceAll('supprimÃ©', 'supprimé'); hasChanges = true; }
    if (content.includes('DupliquÃ©')) { content = content.replaceAll('DupliquÃ©', 'Dupliqué'); hasChanges = true; }
    if (content.includes('prÃ©cÃ©dente')) { content = content.replaceAll('prÃ©cÃ©dente', 'précédente'); hasChanges = true; }
    if (content.includes('financiÃ¨res')) { content = content.replaceAll('financiÃ¨res', 'financières'); hasChanges = true; }
    if (content.includes('RÃ©els')) { content = content.replaceAll('RÃ©els', 'Réels'); hasChanges = true; }
    if (content.includes('rÃ©sas')) { content = content.replaceAll('rÃ©sas', 'résas'); hasChanges = true; }
    if (content.includes('RÃ©seaux')) { content = content.replaceAll('RÃ©seaux', 'Réseaux'); hasChanges = true; }
    if (content.includes('SÃ©curitÃ©')) { content = content.replaceAll('SÃ©curitÃ©', 'Sécurité'); hasChanges = true; }
    if (content.includes('AccÃ¨s')) { content = content.replaceAll('AccÃ¨s', 'Accès'); hasChanges = true; }
    if (content.includes('crÃ©Ã©')) { content = content.replaceAll('crÃ©Ã©', 'créé'); hasChanges = true; }
    if (content.includes('dÃ¨s')) { content = content.replaceAll('dÃ¨s', 'dès'); hasChanges = true; }
    if (content.includes('prolongÃ©e')) { content = content.replaceAll('prolongÃ©e', 'prolongée'); hasChanges = true; }
    if (content.includes('siÃ¨ge')) { content = content.replaceAll('siÃ¨ge', 'siège'); hasChanges = true; }
    if (content.includes('CrÃ©ateurs')) { content = content.replaceAll('CrÃ©ateurs', 'Créateurs'); hasChanges = true; }
    if (content.includes('spÃ©cialisÃ©e')) { content = content.replaceAll('spÃ©cialisÃ©e', 'spécialisée'); hasChanges = true; }
    if (content.includes('sÃ©jours')) { content = content.replaceAll('sÃ©jours', 'séjours'); hasChanges = true; }
    if (content.includes('AlgÃ©rie')) { content = content.replaceAll('AlgÃ©rie', 'Algérie'); hasChanges = true; }
    if (content.includes('Ãmir')) { content = content.replaceAll('Ãmir', 'Émir'); hasChanges = true; }
    if (content.includes('PrÃ©fÃ©rences')) { content = content.replaceAll('PrÃ©fÃ©rences', 'Préférences'); hasChanges = true; }
    if (content.includes('VÃ©rifier')) { content = content.replaceAll('VÃ©rifier', 'Vérifier'); hasChanges = true; }

    if (hasChanges) {
      await fs.writeFile(filePath, content, 'utf8');
      console.log(`Fixed encoding in ${filePath}`);
    }
  } catch (err) {
    console.error(`Error processing file ${filePath}:`, err);
  }
}

async function run() {
  for (const dir of searchDirs) {
    await processDirectory(path.resolve(dir));
  }
  console.log('Encoding fix complete.');
}

run();
