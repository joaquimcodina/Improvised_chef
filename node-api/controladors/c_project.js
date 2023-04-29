const home = require('./c_home');

const {recipesName, randomRecipe} = require('./c_recipes');
const {ingredientsName, getIngredientsSearched} = require('./c_ingredients');
const {getUserInfo, getUserProfile, getUserRecipeList, getUserIngredientList, addUserIngredient, addUserRecipe, removeUserIngredient, getUserShoppingList, addUserShoppingList, removeUserShoppingList, myKitchen,
    removeUserRecipe, searchWithIngredients
} = require('./c_users');
const {registerWithEmail, signOutV, loginWithGoogle, loginWithEmail, resetPasswordEmail} = require('./c_auth');

const controller = {
    home: function(req, res) { 
        return res.status(200).send(home);
    },

    login: async function(req, res) { 
        const params = req.body;
        const email = params.email;
        const password = params.password;
        const resposta = await loginWithEmail(email, password);
        if(resposta.id != null && resposta.loguejat) {
            return res.status(200).send({
                loguejat: true,
                email: email,
                id: resposta.id
            })
        }
        return res.status(200).send({  //200 conforme la peticio sha fet pero no ha donat el resultat esperat
            loguejat: false, id: resposta.id
        })
    },

    register: async function(req, res) {
        const params = req.body;
        const fullName = params.name;
        const userName = params.userName;
        const email = params.email;
        const password = params.password;
        const boolean = await registerWithEmail(fullName, userName, email, password);
        if(boolean.loguejat){
            return res.status(200).send({
                loguejat: 'true',
                email: email,
                id: boolean.id
            })
        }
        else{
            return res.status(200).send({ //POSO 200 O 400?¿?¿?¿
                loguejat: 'false'
            }) 
        }
    },

    loginGoogle: async function(req, res){
        const body = req.body;
        const params = await loginWithGoogle(body);
        if(params.loguejat){
            return res.status(200).send({
                loguejat: 'true',
                email: params.email,
                id: params.id
            })
        }
        else{
            return res.status(200).send({ //poso 200 ja que tot ha anat correcte l'unic que no s'ha loguejat
                loguejat: 'false'
            })
        }
    },

    resetPassword: async function(req, res){
        const params = await resetPasswordEmail(req.body.email);
        if(params === "Password reset email send correctly"){
            return res.status(200).send({message: params})
        }
        else{
            return res.status(500).send({message: params})
        }

    },

    logout: async function(req, res){
        console.log(req.body);
        await signOutV(req.body)
    },

    randomRecipe: async function(req, res) {
        return await randomRecipe(req);
    },

    recipesName: async function(req, res) {
        return await recipesName(req, res);
    },

    ingredientsName: async function(req, res) {
        return await ingredientsName(req, res);
    },

    getUserInfo: async function(req, res) {
        return await getUserProfile(req, res);
    },

    getUserProfile: async function(req, res) {
        return await getUserInfo(req, res);
    },

    myKitchen: async function(req, res) {
        return await myKitchen(req, res);
    },

    getUserIngredientList: async function(req, res) {
        return await getUserIngredientList(req, res);
    },

    addUserIngredient: async function(req, res) {
        return await addUserIngredient(req, res);
    },

    removeUserIngredient: async function(req, res) {
        return await removeUserIngredient(req, res);
    },

    getUserShoppingList: async function(req, res) {
        return await getUserShoppingList(req, res);
    },

    addUserShoppingList: async function(req, res) {
        return await addUserShoppingList(req, res);
    },

    removeUserShoppingList: async function(req, res) {
        return await removeUserShoppingList(req, res);
    },

    getUserRecipeList: async function(req, res) {
        return await getUserRecipeList(req, res);
    },

    addUserRecipe: async function(req, res) {
        return await addUserRecipe(req, res);
    },
    removeUserRecipe: async function(req, res) {
        return await removeUserRecipe(req, res);
    },

    getIngredientSearched: async function(req, res) {
        return res.status(200).send(await getIngredientsSearched(req, res));
    },
    searchWithIngredients: async function(req, res) {
        return await searchWithIngredients(req, res);
    }
}

module.exports = controller;