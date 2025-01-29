const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcrypt')


//------------------------------------------ partie model -----------------------------------------------------
const User = require('./models/TestUser')



//------------------------------------------ partie model ----------------------------------------------------- 


// mise en place du module pour récupérer les valeurs du fichier .env 
dotenv.config()

// store des variables d'environement
const env = {
    PORT:process.env.PORT,
    PORT_FRONT:process.env.PORT_FRONT,
    MONGO_URI_LOCAL:process.env.MONGO_URI_LOCAL,
    DB_NAME:process.env.DB_NAME
} 

const app = express()

// initialisation de la variable qui va contenir le port sur la quel notre app va tourner, le OU ogique va nous permmettre d'avoir un port si process.env n'est pas défini, cela est utile en mode production
const PORT = env.PORT || 8080


// connection a la base de donnée avec mongoose
mongoose
    .connect(env.MONGO_URI_LOCAL, {dbName:env.DB_NAME})
    .then(() => console.log("Lien avec mingoDb réussi ! :)"))
    .catch(error => console.log(error))

// gestions de l'erreur CORS avec le middlware cors, cette erreur vient du fait que l'on va faire tourner un front et un back sur la même machine 
app.use(cors({
    origin: "http://localhost:3000", 
    credentials:true
}))




app.get('/', async(req, res ) => {
    try {
        const user = new User({
            nom:"james",
            prenom:"ahmedaly"
        })  
        // on save les nouvellles informations ! :D
        const result = await user.save()   
        
        // Petit message de succès, parceque c'est toujours cool de réussir un truc :)
        res.status(201).json({
            message:"Données ajouter avec succès! 🙌",
            data: result
        })
    } catch (error) {
        res.status(500).json({
            message: "Une erreur est survenue lors de l'ajout des données :(",
            error: error.message
        });
        
    }

})

app.listen(PORT , () => {
    console.log(`le serveur écoute sur : http://localhost/${PORT}`)
})