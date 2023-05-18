// Module express permet de créer un serveur web
const express = require('express');
const app = express();
// Module path permet de gérer les chemins de fichiers et de répertoires
const path = require('path');
//  Module cheerio permet d'analyser et extraire les balises souhaitées.
const cheerio = require('cheerio');
// Module fs permet de lire et écrire des fichiers (Déjà installé avec Node.js donc pas besoin de l'installer avec le package.json)
const fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.post('/endpoint', async (req, res) => {
  const variableFromClient = req.body.variable;
  console.log(variableFromClient);
  
  try {
    // Récupère le contenu HTML de la page web
    // Module node-fetch permet de faire des requêtes HTTP
    const fetch = await import('node-fetch');
    const response = await fetch.default(variableFromClient);
    const html = await response.text();

    // Charge le contenu HTML dans cheerio pour faciliter l'analyse
    const $ = cheerio.load(html);

    // Extraction de la balise navrow sets
    const sets = $('.navrow.sets').html();

    // Extraction de la balise navrow minifigs
    const minifigs = $('.navrow.minifigs').html();

    // Extraction de la balise navrow parts
    const parts = $('.navrow.parts').html();

    // Extraction de la balise navrow reviews
    const news = $('.navrow.news').html();

    // Construit l'objet JSON à renvoyer
    const result = {
      sets,
      minifigs,
      parts,
      news,
    };

    // Enregistrement de l'objet JSON dans une variable jsonString
    console.log(result);
    const jsonString = JSON.stringify(result, null, 2);

    // Enregistrer le chemin du fichier JSON
    const filePath = path.join(__dirname, 'public', 'data.json');

    // Supprimer le fichier JSON s'il existe déjà
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }

    // Enregistrer le fichier JSON
    fs.writeFileSync(filePath, jsonString, 'utf-8');
    res.json(result);

  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => {
  console.log('Serveur en écoute sur le port 3000');
});

