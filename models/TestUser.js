const mongoose = require('mongoose')

// création du modèle test 
const TestUserSchema = new mongoose.Schema({
    nom:{
        type:String,
        require:true
    },
    prenom:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model('Users', TestUserSchema)