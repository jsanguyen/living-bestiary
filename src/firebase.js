import * as firebase from 'firebase/app';

// Add the Firebase products that you want to use
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCV9KfwbzwDzs3SQYt1hMxgI0xVSXabCZc",
    authDomain: "living-bestiary-ad674.firebaseapp.com",
    databaseURL: "https://living-bestiary-ad674.firebaseio.com",
    projectId: "living-bestiary-ad674",
    storageBucket: "living-bestiary-ad674.appspot.com",
    messagingSenderId: "701445157334",
    appId: "1:701445157334:web:62519179dcff8a6011b477",
    measurementId: "G-R5T1YLE3PB"
};



// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();


export const getData = (col) => {

    console.log("Doing work")

    return db.collection(col).limit(10)
        .get().then(snap => {
            return snap.docs.map(doc => doc)
        })
}

export const getDocID = (doc) => {

    console.log(doc)

    return db.collection('monsters').where('monster.slug', '==', doc).get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.');
                return;
            }

            snapshot.forEach(doc => {
                return doc.id;
            });
        })
        .catch(err => {
            return(err);
        });



}


export const paginateData = (col, doc) =>{



    let docRef = db.collection(col).doc(doc);

    return docRef.get().then(snapshot => {
        let startAtSnapshot = db.collection(col)
            .startAt(snapshot);

        return startAtSnapshot.limit(10).get()
            .then(snap => {
            return snap.docs.map(doc => doc)
        });
    });

}

export const getDoc = (col, info) =>{

    return db.collection(col).doc(info)
        .get().then(doc => {
            if (!doc.exists) {
                console.log('No document!');
            } else {
                console.log( doc)
               return doc.data
            }
        })
        .catch(err => {
            console.log( err);
        });
}
