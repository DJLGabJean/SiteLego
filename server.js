const express = require('express');
const app = express();
const path = require('path');
const cheerio = require('cheerio');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.post('/endpoint', async (req, res) => {
  const variableFromClient = req.body.variable;
  console.log(variableFromClient);
  
  try {
    // Récupère le contenu HTML de la page web
    const fetch = await import('node-fetch');
    const response = await fetch.default(variableFromClient);
    const html = await response.text();

    // Charge le contenu HTML dans cheerio pour faciliter l'analyse
    const $ = cheerio.load(html);

    // Exemple : Extraction du titre de la page
    const pageTitle = $('title').text();

    // Exemple : Extraction des liens de la page
    const links = [];
    $('a').each((index, element) => {
      const href = $(element).attr('href');
      links.push(href);
    });

    // Construit l'objet JSON à renvoyer
    const result = {
      pageTitle,
      links
    };

    // Renvoie l'objet JSON en réponse
    console.log(result);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => {
  console.log('Serveur en écoute sur le port 3000');
});
