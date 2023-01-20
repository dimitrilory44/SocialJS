## Back-end

Le back-end a été développé avec express JS, sequelize(ORM) et mySQL(base de donnée).

Cloner ce projet avec la commande suivante :

    git clone https://github.com/dimitrilory44/DimitriLory_7_26082021.git
    cd DimitriLory_7_26082021

Changer vers la branche la plus optimisée :

    git checkout frontend/angular
    cd backend

Installer les dépendances avec npm install.

Pour faire persister les données, créer un dossier `config` et un fichier `config.json` avec les informations suivantes :

    {
        "development": {
            "username": "root",
            "password": "votre_mp_root",
            "database": "votre_database_development",
            "host": "127.0.0.1",
            "dialect": "mysql"
        },
        "test": {
            "username": "root",
            "password": "votre_mp_root",
            "database": "votre_database_test",
            "host": "127.0.0.1",
            "dialect": "mysql"
        },
        "production": {
            "username": "root",
            "password": "votre_mp_root",
            "database": "votre_database_production",
            "host": "127.0.0.1",
            "dialect": "mysql"
        }
    }

N'oubliez pas de créer votre database directement sur mySQL. Ici changer la ligne `votre_database_development` par le nom de votre schéma et `votre_mp_root` par le mot de passe de votre `root`

Effectuer la commande suivante afin de créer votre modèle de données :

    sequelize db:migrate

Cette commande permettra de reconstituer la base de donnée dans votre schéma créé précedemment.

Créer par la même occasion votre dossier `images`

Créer votre dossier .env pour stocké votre clef secret à la racine et ajouter le contenu suivant :

`TOKEN_SECRET=VOTRE_CLEF_SECRET`

Démarrer enfin le serveur avec npm run serve.

## Front-end

Placez sur votre dossier frontend avec `cd frontend`

Installer ensuite les dépendances avec `npm install`

Démarrer le server avec `ng serve -o`