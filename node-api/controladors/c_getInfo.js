const { db } = require('../firebase/firebase-config');
const {query, collection, where, getDocs, getDoc} = require("firebase/firestore");

const getInfo = async function (req, res) {
    try{
        let docs = [];
        const users = collection(db, "users");
        const userInfo = query(users, where("email", "==", req.query.email));
        const querySnapshot = await getDocs(userInfo);
        querySnapshot.docs.forEach((doc) => {
          const docData = doc.data();
          const selectedFields = {
              profilePic: docData.profilePic,
              fullName: docData.fullName,
              userName: docData.userName,
          };
              result.push(selectedFields);
        });
        return result;
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al fer fetch de random recipes!');
    }
  
};

module.exports = getInfo;