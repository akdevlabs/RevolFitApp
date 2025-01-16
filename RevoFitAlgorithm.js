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
// list of tiers (Beginner, Intermediate, Advance)




console.log("Transferred User Info:", transferreduserInfo);
console.log("Transferred Info:", transferredInfo);

let myArray = [];

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
  const userInfo = data;
  const { nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, genero, age } = userInfo;

  
  

  function renderFullName() {
    // Construct the full name
    const fullName = `${nombre} ${apellidoPaterno} ${apellidoMaterno}`;

    // Update Full Name
    const fullNameElement = document.getElementById("FullName");
    if (fullNameElement) {
      fullNameElement.textContent = fullName;
    }

    // Update Birth Date
    const dateBElement = document.getElementById("DateB");
    if (dateBElement) {
      dateBElement.textContent = fechaNacimiento;
    }

    // Update Gender
    const sexElement = document.getElementById("Sex");
    if (sexElement) {
      sexElement.textContent = genero;
    }

    // Update Age
    const ageElement = document.getElementById("Age");
    if (ageElement) {
      ageElement.textContent = age;
    }
  }

  renderFullName();
});




async function getUserResults() {
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
getUserResults().then((data) => { 
  const userInfo = data;
  const lastEvaluation = userInfo.lastEvaluation;


console.log(data)




  const age = userInfo.age; // Age as a number
  const gender = userInfo.genero; // Gender as a string
  const bodyFat = 15; // Body fat as a number
  const bodyWeight = lastEvaluation.peso
  const residualPercentage = 0.241; // Example: 24.1%
  const height = lastEvaluation.altura
  const restingHR = 60; // bpm
  const diametroBiepicondileo = 1.75; // meters
  const diametroBiestiloideo = 1.75; // meters
  const waistCircumference = lastEvaluation.cintura; // cm
  const drinksPerWeek = lastEvaluation.frecuenciaBebe; // Example input
  const cigarettesPerDay = lastEvaluation.frecuenciaFuma; // Example input
  const smokingYears = lastEvaluation.añosFumando; // Example input
  const frequency = lastEvaluation. frecuenciaEjercicio

  const intensity = "moderate"; // Example: moderate intensity







  function classifyBodyFat(age, gender, bodyFat) {
    const ranges = {
      male: {
        "13-19": [
          { max: 12, classification: "Excellent", scoring: 9, metabolicProtection: 1 },
          { max: 13, classification: "Good", scoring: 8.3572, metabolicProtection: 0.928578 },
          { max: 14, classification: "Good", scoring: 7.71439, metabolicProtection: 0.857154 }
          // Add additional ranges
        ],
        "60+": [
          { max: 21, classification: "Excellent", scoring: 9, metabolicProtection: 1 },
          { max: 22, classification: "Good", scoring: 8.3572, metabolicProtection: 0.928578 },
          { max: 23, classification: "Bad", scoring: 7.71439, metabolicProtection: 0.857154 }
          // Add additional ranges
        ]
      },
      female: {
        "13-19": [
          { max: 17, classification: "Excellent", scoring: 9, metabolicProtection: 1 },
          { max: 18, classification: "Good", scoring: 8.4705, metabolicProtection: 0.941167 },
          { max: 19, classification: "Bad", scoring: 7.941, metabolicProtection: 0.882333 }
          // Add additional ranges
        ],
        "60+": [
          { max: 25, classification: "Excellent", scoring: 9, metabolicProtection: 1 },
          { max: 26, classification: "Good", scoring: 8.4705, metabolicProtection: 0.941167 },
          { max: 27, classification: "Bad", scoring: 7.941, metabolicProtection: 0.882333 }
          // Add additional ranges
        ]
      }
    };
  
    // Determine the age group
    const ageGroup = age <= 19 ? "13-19" : "60+";
    const genderKey = gender.toLowerCase();
  
    // Validate ranges and inputs
    if (!ranges[genderKey] || !ranges[genderKey][ageGroup]) {
      return { error: "No classification found for the given inputs." };
    }
  
    // Find the classification
    for (const range of ranges[genderKey][ageGroup]) {
      if (bodyFat <= range.max) {
        return {
          classification: range.classification,
          scoring: range.scoring,
          metabolicProtection: range.metabolicProtection
        };
      }
    }
  
    return { error: "Body fat percentage out of range." };
  }
  // Call the function and log the result
  const CBF = classifyBodyFat(age, gender, bodyFat)

  
  function renderImage(imageUrl, altText = "Image") {
    // Get the div with id "scoring"
    const scoringDiv = document.getElementById('scoring');
    
    if (!scoringDiv) {
      console.error('Div with id "scoring" not found');
      return;
    }
    
    // Create an image element
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = altText;
    img.style.margin = "10px"; // Optional: Add spacing between images
    
    // Append the image to the div
    scoringDiv.appendChild(img);
  }
  
  function renderCBF() {
   
  
    // Classification logic
    const classification = CBF.classification; // Replace with your dynamic value
    
    if (classification === "Excellent") {
      renderImage('images/WebApp/Evaluation/EColor.svg', 'Example Image');
      renderImage('images/WebApp/Evaluation/BLight.svg', 'Example Image');
      renderImage('images/WebApp/Evaluation/ProLight.svg', 'Example Image');
      renderImage('images/WebApp/Evaluation/PLight.svg', 'Example Image');
      renderImage('images/WebApp/Evaluation/MLight.svg', 'Example Image');
    } else if (classification === "Good") {

      renderImage('images/WebApp/Evaluation/ELight.svg', 'Example Image');
      renderImage('images/WebApp/Evaluation/BColor.svg', 'Example Image');
      renderImage('images/WebApp/Evaluation/ProLight.svg', 'Example Image');
      renderImage('images/WebApp/Evaluation/PLight.svg', 'Example Image');
      renderImage('images/WebApp/Evaluation/MLight.svg', 'Example Image');
    } else {

      renderImage('images/WebApp/Evaluation/ELight.svg', 'Example Image');
      renderImage('images/WebApp/Evaluation/BLight.svg', 'Example Image');
      renderImage('images/WebApp/Evaluation/ProLight.svg', 'Example Image');
      renderImage('images/WebApp/Evaluation/PLight.svg', 'Example Image');
      renderImage('images/WebApp/Evaluation/MColor.svg', 'Example Image');
    }
  }
  




  function renderMPProgress() {
      const maxScore = 9;
      const currentScore = CBF.scoring
  
       // Calculate the progress percentage
       const progressPercentage = (currentScore / maxScore) * 100;

       // Get the progress-fill element
       const progressFill = document.getElementById("metabolicProtection");
   
       // Set the width style based on the progress percentage
       if (progressFill) {
           progressFill.style.width = `${progressPercentage}%`;
       }
   }
   
   // Call the function to render the progress bar
   renderMPProgress();
  // Call renderCBF to execute the code
  renderCBF();
  


  console.log(classifyBodyFat(age, gender, bodyFat));
  
  













});























async function getProgressBarColor() {
  try {
    // Reference a document in the "revoFitweb" collection with ID "landing"
    const docRef = doc(db, 'RevoBuissnes', transferredInfo);
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

getProgressBarColor().then((data) => {
  const UBU = data.UBU;
  const {Base, Prime1, Prime2, Prime3} = UBU.Colors;

  function changeBackgroundColor(color, urlId ) {
    const element = document.getElementById(urlId );
    if (element) {
        element.style.backgroundColor = color;
    } else {
        console.error('Element with id "metabolicProtection" not found.');
    }
  }

// Example usage:
changeBackgroundColor(Base, 'metabolicProtection'); 
changeBackgroundColor(Prime2, 'progressbar');
  



})


document.getElementById('BFB').addEventListener('click', function () {
  const bfBlock = document.getElementById('BFBlock');
  bfBlock.classList.toggle('visible');
});


// Bottom Icons
async function getBtnIcons() {
  try {
    const docRef = doc(db, "RevoBuissnes", transferredInfo);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const documentData = docSnap.data();
      return documentData; // Return the document data
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
}
getBtnIcons().then((data) => {
  const App = data.App;
  const Btns = App.Btns;

  function createButton(buttonType, divId, imgSrcIndex, redirectUrl, imgAlt = "Example image") {
    const buttonGroup = Btns[buttonType];
    const imgSrc = buttonGroup[imgSrcIndex];

    const div = document.getElementById(divId);
    if (!div) {
      console.error(`Div with id '${divId}' not found.`);
      return;
    }

    const img = document.createElement("img");
    img.src = imgSrc;
    img.alt = imgAlt;
    img.addEventListener("click", () => {
      window.location.href = redirectUrl;
    });

    div.appendChild(img);
  }

  const buttonsConfig = [
    { buttonType: "homeBtns", divId: "home", imgSrcIndex: 0, redirectUrl: "index9.html" },
    { buttonType: "DateBtns", divId: "Date", imgSrcIndex: 1, redirectUrl: "index9.2.html" },
    { buttonType: "GoalBtns", divId: "goals", imgSrcIndex: 1, redirectUrl: "index9.3.html" },
    { buttonType: "StatBtns", divId: "stats", imgSrcIndex: 1, redirectUrl: "index9.4.html" },
    { buttonType: "GearBtns", divId: "gear", imgSrcIndex: 1, redirectUrl: "index9.5.html" },
  ];

  buttonsConfig.forEach(({ buttonType, divId, imgSrcIndex, redirectUrl }) => {
    createButton(buttonType, divId, imgSrcIndex, redirectUrl);
  });
});




