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

// Retrieving the newest workout location
function getNewestWorkoutLocation() {
  const locations = JSON.parse(localStorage.getItem('workoutLocations')) || [];
  // Return the last item if the array exists and isn't empty
  return locations.length ? locations[locations.length - 1] : null;
}



// Define the function to get items from localStorage
function getFromLocalStorage(key) {
  try {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue); // Parse the JSON string back into an object
    } else {
      console.warn(`No data found in localStorage for key: ${key}`);
      return null; // Return null if no data is found
    }
  } catch (e) {
    console.error("Error retrieving data from localStorage", e);
    return null; // Return null in case of an error
  }
}



// Retrieve data from localStorage
const transferreduserInfo = localStorage.getItem("transferreduserInfo");
const transferredInfo = localStorage.getItem("transferredInfo");
const savedContent = getFromLocalStorage('sContent');

console.log(savedContent);

console.log("Transferred User Info:", transferreduserInfo);
console.log("Transferred Info:", transferredInfo);









async function RecipeingredientColor() {
  try {
    const docRef = doc(db, "RevoBuissnes", transferredInfo); // Ensure db and transferredInfo are initialized
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const documentData = docSnap.data();
      return documentData; // Return the document data
    } else {
      console.error("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
}
RecipeingredientColor().then((data) => {
  const UBU = data.UBU;
  const { top, bottom } = UBU.BackgroundColor;
  const { Base, Prime1, Prime2, Prime3 } = UBU.Colors;

  function timeElement(){
    // Set background color for the Time ID
    const timeElement = document.getElementById("Time");
    if (timeElement) {
      timeElement.style.backgroundColor = Base
      timeElement.style.color = Prime2;
    }
  }
  function RecipeBlockTop(){
    // Set background color for the Time ID
  
    const RecipeBlockTop = document.getElementById("RecipeBlockTop");

    if (RecipeBlockTop) {
      RecipeBlockTop.style.backgroundColor = top;
      RecipeBlockTop.style.color = Base;
    }
  }
  function blocks(){
      // Select all elements with the class "blocks"
      const blocks = document.querySelectorAll(".blocks");

      // Iterate through the NodeList and apply the styles
      blocks.forEach(block => {
        block.style.background = top;
      });
  }
  function MBBtn(){
    // Set background color for the Time ID
  
    const MBBtn = document.getElementById("MBBtn");

    if (MBBtn) {
      MBBtn.style.backgroundColor = top;
      MBBtn.style.color = Base;
    }
  }

  MBBtn()
  blocks()
  timeElement()
  RecipeBlockTop()
});




async function backgroundColor() {
  try {
    const docRef = doc(db, "RevoBuissnes", transferredInfo); // Ensure db and transferredInfo are initialized
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const documentData = docSnap.data();
      return documentData; // Return the document data
    } else {
      console.error("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
}
backgroundColor().then((data) => {
  const UBU = data.UBU;
  const { top, bottom } = UBU.BackgroundColor;
  const { Base, Prime1, Prime2, Prime3 } = UBU.Colors;
// Function to change the background gradient dynamically
function setGradient(color1, color2) {
  document.body.style.background = `linear-gradient(to bottom, ${color1}, ${color2})`;
}



setGradient(top, bottom); 

});