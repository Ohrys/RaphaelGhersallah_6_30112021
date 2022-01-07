# Projet 6 : Piiquante, Créez une API Sécurisée

Projet 6 dans le cadre de la formation OpenClassroom de Développement Web. 
Le but de ce projet est de créer l'API d'un projet déjà existant, afin de rendre fonctionnel les différentes fonctionnalités émises dans le cahier des charges. 
Brièvement ces fonctionnalités sont : 

- La création et la connexion d'un utilisateur 
- La création d'une sauce
- La Lecture d'une ou de toutes les sauces présentes 
- La modification d'une sauce 
- La suppression d'une sauce 
- La possibilité de Liker ou de disliker une sauce. 

Pour faire fonctionner ce projet il est nécessaire d'effectuer certaines actions. 
1. cloner le repository du front : [disponible ici](https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6)
2. Créer un dossier `backend` et cloner ce repository. 
4. Créer un dossier `images` à la racine du `backend`. Il sert à stocker les images uploadé via le mutler. 
5. Créer un fichier `process.env` en lieu et place du `process.env.example` avec les valeurs données ci-dessous. 
6. exécuter à la fois dans le dossier front et dans le dossier backend la commande : 
```
npm start
```
*Dans le dossier front, npm devrait écouter sur le port **8081**.  
Dans le dossier backend, npm devrait écouter sur le port **3000**.* 

## valeurs process.env

```
DB_NAME = myFirstDatabase
DB_USER = root
DB_PSWD = cm9vdA==
TOKEN_SECRET = RANDOM_TOKEN_SECRET
``` 
