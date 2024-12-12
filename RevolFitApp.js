// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore, doc, getDoc, collection, addDoc, setDoc  } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBc3B7SM_Itr9LRCv8N3_tbl9BglxHKo-M",
  authDomain: "revofit-ad7c3.firebaseapp.com",
  projectId: "revofit-ad7c3",
  storageBucket: "revofit-ad7c3.appspot.com", // Note: Added '.appspot.com' for storage URL
  messagingSenderId: "643801118133",
  appId: "1:643801118133:web:d679abc998a18f7077d5fc",
  measurementId: "G-E6P96D0M6Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);



// Retrieve data from localStorage
const transferreduserInfo = localStorage.getItem("transferreduserInfo");
const transferredInfo = localStorage.getItem("transferredInfo");


console.log("Transferred User Info:", transferreduserInfo);
console.log("Transferred Info:", transferredInfo);


  async function checkDocumentExists(collectionName, documentId) {
    try {
      // Use `doc` to get a document reference
      const docRef = doc(db, collectionName, documentId);

      // Fetch the document snapshot
      const docSnap = await getDoc(docRef);

      // Check if the document exists and log the result
      if (docSnap.exists()) {
        console.log(`Document found:`, docSnap.data());
      } else {
        console.log(`No document found with ID: ${documentId}`);
      }
    } catch (error) {
      console.error("Error checking document:", error);
    }
  }

  // Call the function with the correct string arguments
  checkDocumentExists("RevoBuissnes", transferredInfo);



  async function getUserinfo() {
    try {
      // Reference a document in the "revoFitweb" collection with ID "landing"
      const docRef = doc(db, 'users', transferreduserInfo);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const documentData = docSnap.data(); // Store document data
        return documentData; // Return the data for external use
      } else {
        console.log("No such document!");
        return null; // Return null if no document is found
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  }
  getUserinfo().then((data) => {
    const nombre = data.nombre; // Retrieve nested data
    const timestamp = data.createdAt; // Retrieve nested data

    
    function createUserNameHeading(userName) {
      // Get the div by its ID
      const userNameDiv = document.getElementById('userName');
    
      // Create an h1 element
      const h1 = document.createElement('h1');
    
      // Set the content of the h1 element to include "Hola," followed by the user's name
      h1.textContent = `Hola, ${userName}`;
    
      // Append the h1 element to the div
      userNameDiv.appendChild(h1);
    }
    // Call the function with the desired username
    createUserNameHeading(nombre);

    function LasttimeUsed(stamp) {
      // Get the div by its ID
      const userNameDiv = document.getElementById('lastTime');
    
      // Create an h1 element
      const h1 = document.createElement('h3');
    
      // Set the content of the h1 element to include "Hola," followed by the user's name
      h1.textContent = stamp;
    
      // Append the h1 element to the div
      userNameDiv.appendChild(h1);
    }
    // Call the function with the desired username
    LasttimeUsed(timestamp);
   
  });




