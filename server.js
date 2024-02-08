// Importation des modules
const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
const path = require('path');


// Initialisation de l'application Express
const app = express();

// Middleware pour parser les données du formulaire
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware pour servir les fichiers statiques
app.use(express.static(__dirname));


app.get('/', (req, res) => {
    console.log('Accès à la racine');
    res.redirect('/index.html');
});


// Route pour gérer les données du formulaire
app.post('/submit-form', (req, res) => {
    const { location, email, date, Style } = req.body;

    // Construction du message e-mail
    const msg = {
        to: 'alexis.zecevic@gmail.com', // Remplacez par votre adresse e-mail
        from: 'noreply@example.com',
        subject: 'Nouveau formulaire soumis',
        text: `
            Location: ${location}
            Email: ${email}
            Date: ${date}
            Style: ${Style}
        `,
    };

    // Envoi de l'e-mail
    sgMail.send(msg)
        .then(() => {
            res.send('Formulaire soumis avec succès !');
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Une erreur s\'est produite lors de l\'envoi du formulaire.');
        });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});



