const { db } = require('../firebase');

const ingredients = async function () {
    const querySnapshot = await db.collection("ingredients").get();
    return querySnapshot.docs.map(doc => doc.data());
}

module.exports = ingredients;