// import jsonData from './data.json' assert { type: "json" };
// console.log("Contenu du fichier JSON actuel : ",jsonData);


function afficherDonnees() {
	const searchForm = document.querySelector('#search-form');
			
	searchForm.addEventListener('submit', function(event) {
		event.preventDefault();
		const searchTerm = event.target.querySelector('input').value.replace(/\s+/g, '+');
		console.log(searchTerm);
		const url = `https://brickset.com/search?query=${searchTerm}&scope=All`;


		const dataToSend = {variable: url };
		// Envoi de la variable dataToSend vers le serveur NodeJS


		fetch('http://localhost:3000/endpoint', {
		// Envoie d'une requête POST au serveur NodeJS
			method: 'POST',
			headers: {
			'Content-Type': 'application/json'
			},
			body: JSON.stringify(dataToSend)
		})
		.then(response => {
			console.log("Envoie de la variable au serveur NodeJS réussit!")
			return fetch('http://localhost:3000/data.json');
		})
		.then(response => {
			// Gérer la réception des données du serveur
			console.log("Réception des données du fichier data.json réussit!")
			return response.json();
			
		})
		.then(data => {
			// Gérer les données reçues
			console.log("Gestion des données reçues réussit!")
			const setsContainer = document.getElementById('navrow-sets');
			const minifigsContainer = document.getElementById('navrow-minifigs');
			const partsContainer = document.getElementById('navrow-parts');
			const newsContainer = document.getElementById('navrow-news');

			setsContainer.innerHTML = data.sets;
			minifigsContainer.innerHTML = data.minifigs;
			partsContainer.innerHTML = data.parts;
			newsContainer.innerHTML = data.news;
			console.log("Récupération des données du fichier data.json réussit!")
		})

		.catch(error => {
			// Gérer les erreurs
			console.log("Une erreur s'est produite :", error);
		});
	});
}
window.addEventListener('DOMContentLoaded', afficherDonnees);