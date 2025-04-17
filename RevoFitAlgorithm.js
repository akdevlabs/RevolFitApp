// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore, doc, getDoc, addDoc, updateDoc, collection} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

let db; // Declare Firestore globally

// Fetch Firebase configuration
async function fetchFirebaseConfig() {
  try {
    console.log("Fetching Firebase config...");
    const response = await fetch("http://localhost:3000/firebase-config"); // Change when deploying
    if (!response.ok) throw new Error("Failed to fetch Firebase config");
    const config = await response.json();
    //console.log("Firebase config received:", config);
    return config;
  } catch (error) {
    console.error("Error fetching Firebase config:", error);
    return null;
  }
}

// Start initialization
initializeFirestore();

// Retrieve data from localStorage
const transferreduserInfo = localStorage.getItem("transferreduserInfo");
const transferredInfo = localStorage.getItem("transferredBu");
// list of tiers (Beginner, Intermediate, Advance)

console.log("Transferred User Info:", transferreduserInfo);
console.log("Transferred Info:", transferredInfo);

// Initialize Firestore
async function initializeFirestore() {
  try {
    const firebaseConfig = await fetchFirebaseConfig();
    if (!firebaseConfig) throw new Error("Firebase config is undefined");

    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log("Firestore successfully initialized");

    await initializeFirestoreFunctions(); // Proceed once Firestore is initialized
  } catch (error) {
    console.error("Error initializing Firestore:", error);
  }
}
// Ensure Firestore-dependent functions run only after initialization
async function initializeFirestoreFunctions() {
  console.log("Initializing Firestore-dependent functions...");
  
  if (!db) {
    console.error("Firestore is not initialized. Retrying in 1 second...");
    setTimeout(initializeFirestoreFunctions, 1000);
    return;
  }

  const transferreduserInfo = localStorage.getItem("transferreduserInfo");
  const transferredInfo = localStorage.getItem("transferredBu");

  if (!transferreduserInfo || !transferredInfo) {
    console.error("Local storage variables missing!");
    return;
  }

  await checkDocumentExists("RevoBuissnes", transferredInfo);
  await processData();
}

// Check if document exists
async function checkDocumentExists(collectionName, documentId) {
  try {
    if (!db) throw new Error("Firestore is not initialized yet");

    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document found:", docSnap.data());
    } else {
      console.log("No document found with ID:", documentId);
    }
  } catch (error) {
    console.error("Error checking document:", error);
  }
}





// Fetch multiple documents
async function fetchData() {
  try {
    if (!db) throw new Error("Firestore is not initialized yet");

    const transferreduserInfo = localStorage.getItem("transferreduserInfo");
    const transferredInfo = localStorage.getItem("transferredBu");

    if (!transferreduserInfo || !transferredInfo) throw new Error("Local storage variables are missing");

    const [ReportSnap, businessSnap, UsersSnap, ContentSnap] = await Promise.all([
      getDoc(doc(db, "RevolApp", "Report")),
      getDoc(doc(db, "RevoBuissnes", transferredInfo)),
      getDoc(doc(db, "users", transferreduserInfo)),
      getDoc(doc(db, "RevolApp", "Content"))
    ]);

    if (!ReportSnap.exists() || !businessSnap.exists() || !UsersSnap.exists() || !ContentSnap.exists()) {
      throw new Error("One or more documents do not exist");
    }

    return {
      Report: ReportSnap.data(),
      business: businessSnap.data(),
      Users: UsersSnap.data(),
      Content: ContentSnap.data()
    };
  } catch (error) {
    console.error("Error fetching documents:", error);
    return null;
  }
}
// Process fetched data
async function processData() {
  const data = await fetchData();
  if (!data) return;
 
  const business = data.business
  const Report = business.AppIcons.Report
  const HeaderIcons = Report.HeaderIcons
  const Users = data.Users
  const Content = data.Content



 
  const UBU = business.UBU
  const { top, bottom } = UBU.BackgroundColor;
  const {Base, Prime1, Prime2, Prime3, Prime4, Prime5, Prime6} = UBU.Colors

  const ReturnIcon = business.AppIcons.ReturnIcon
  
  

 
  //---------- Header/Btns -----------//
  function setImgs(imgSrc, imgAlt, url) {
    // Find the img element with id 'logo-img'
    const img = document.getElementById(url);

    // Check if the img element exists
    if (img) {
        // Set the image source and alternative text
        img.src = imgSrc;
        img.alt = imgAlt;
    } else {
        console.error("Image element with id 'logo-img' not found.");
    }
  }
  function setBackgroundColor(color, url) {
    const Background = document.getElementById(url);

    if (Background) {
      Background.style.background = color;
    }
  }
  function setBackgroundColorBtn(color, className) {
    const elements = document.getElementsByClassName(className);

    for (let element of elements) {
        element.style.background = color;
    }
  }
  function setBorders(color, url, size){
    const Border = document.getElementById(url);

    if (Border) {
      Border.style.border = `${size} solid ${color}`;
    }
  }
  function setMultiBorders(color, className, size) {
    const elements = document.getElementsByClassName(className);

    for (let element of elements) {
        element.style.border = `${size}px solid ${color}`;
    }
  }

  function setGradient(color1, color2, url) {
    const Background = document.getElementById(url);
    Background.style.background = `linear-gradient(to bottom, ${color1}, ${color2})`;
  }
  function setTextColor(color, url){
    const Text = document.getElementById(url);

    if (Text) {
      Text.style.color = color;
    }
  }
  function setReportBg(color) {
    document.body.style.background = color;
  }


  


  //---------- UserInfo -----------//
  const userInfo = Users;
  const lastEvaluation = userInfo.lastEvaluation;
  console.log(lastEvaluation)


  function extractNumber(str) {
    // Remove all non-digit and non-decimal characters
    const cleaned = str.replace(/[^0-9.]/g, '');
    // Convert to number
    return cleaned.includes('.') ? parseFloat(cleaned) : parseInt(cleaned, 10);
  }
  

  // userInfo
  const age = userInfo.age; // Age as a number
  const gender = userInfo.genero; // Gender as a string


  // lastEvaluation

  const waist  = extractNumber(lastEvaluation.cintura);
  const neck   = extractNumber(lastEvaluation.cuello); 
  const weight = extractNumber(lastEvaluation.peso); 
  const height = extractNumber(lastEvaluation.altura); 
  const rist   = extractNumber(lastEvaluation.muneca);
  const hip    = extractNumber(lastEvaluation.cadera); 
  const knee   = extractNumber(lastEvaluation.rodilla); 


  const restingHR = 60; // bpm



 
  const drinksPerWeek    = lastEvaluation.frecuenciaBebe; // Example input
  const cigarettesPerDay = lastEvaluation.frecuenciaFuma; // Example input
  const smokingYears     = lastEvaluation.añosFumando; // Example input
  const frequency        = lastEvaluation. frecuenciaEjercicio

  const intensity = "moderate"; // Example: moderate intensity

  const { nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, genero} = userInfo;

  
  

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



  function calculateBodyFatForMen(waistCircumference, neckCircumference, heightCm, bodyWeightKg){
    // Constants for calculations
    const constant1 = 2.54;
    const constant2 = 86.01;
    const constant3 = 70.041;
    const constant4 = 36.76;

    // Step 1: Calculate intermediate values
    const F = waistCircumference / constant1; // Waist circumference divided by constant 1
    const G = neckCircumference / constant1; // Neck circumference divided by constant 1
    const H = heightCm / constant1;          // Height in cm divided by constant 1

    const I = F - G;                         // Difference between F and G

    // Logarithmic calculations
    const J = Math.log10(I);                 // Log base 10 of F-G
    const K = Math.log10(H);                 // Log base 10 of height

    // Body fat percentage calculation
    const AQ = (constant2 * J) - (constant3 * K) + constant4; // Body fat percentage formula

    // Fat weight calculation
    const AT = (AQ * bodyWeightKg) / 100;    // Fat weight in kilograms

    // Return results as an object
    return {
        bodyFatPercentage: AQ.toFixed(2),    // Body fat percentage
        fatWeightKg: AT.toFixed(2)           // Fat weight in kilograms
    };
  }






  function calculateBodyFatForWomen(waistCircumference, neckCircumference, heightCm, hipCircumference, bodyWeightKg) {
    // Constants for calculations
    const constant1 = 2.54;
    const constant2 = 163.205;
    const constant3 = 97.684;
    const constant4 = 78.384;

    // Step 1: Calculate intermediate values
    const F = neckCircumference / constant1; // Neck circumference divided by constant 1
    const G = hipCircumference / constant1; // Hip circumference divided by constant 1
    const H = waistCircumference / constant1; // Waist circumference divided by constant 1
    const I = heightCm / constant1;          // Height in cm divided by constant 1

    const J = H + G - F;                     // Sum of H and G minus F

    // Logarithmic calculations
    const K = Math.log10(J);                 // Log base 10 of J
    const L = Math.log10(I);                 // Log base 10 of height

    // Body fat percentage calculation
    const AR = (constant2 * K) - (constant3 * L) - constant4; // Body fat percentage formula

    // Fat weight calculation
    const AS = (AR * bodyWeightKg) / 100;    // Fat weight in kilograms

    // Return results as an object
    return {
        bodyFatPercentage: AR.toFixed(2),    // Body fat percentage
        fatWeightKg: AS.toFixed(2)           // Fat weight in kilograms
    };
  }


  
  function getScoring(age, gender, bodyFatPercentage) {
    /**
     * Calculate the scoring and classification based on age, gender, and body fat percentage.
     *
     * @param {number} age - Age of the subject.
     * @param {string} gender - Gender of the subject ('male' or 'female').
     * @param {number} bodyFatPercentage - Body fat percentage of the subject.
     * @returns {object} - An object containing the scoring and classification.
     */

    // Define the classification table as an object
    const classificationTable = {
        '13-19': {
            male: [
                { threshold: 12, classification: 'Excellent', score: 9 },
                { threshold: 13, classification: 'VeryGood', score: 8.36 },
                { threshold: 14, classification: 'VeryGood', score: 7.71 },
                { threshold: 15, classification: 'VeryGood', score: 7.07 },
                { threshold: 16, classification: 'Good', score: 6.43 },
                { threshold: 17, classification: 'Good', score: 5.79 },
                { threshold: 18, classification: 'Good', score: 5.14 },
                { threshold: 19, classification: 'Average', score: 4.5 },
                { threshold: 20, classification: 'Average', score: 3.86 },
                { threshold: 21, classification: 'Average', score: 3.21 },
                { threshold: 22, classification: 'Average', score: 2.57 },
                { threshold: 23, classification: 'Poor', score: 1.93 },
                { threshold: 24, classification: 'Poor', score: 1.29 },
                { threshold: 25, classification: 'Poor', score: 0.64 },
                { threshold: Infinity, classification: 'Unusable', score: 0 }
            ],
            female: [
                { threshold: 17, classification: 'Excellent', score: 9 },
                { threshold: 18, classification: 'VeryGood', score: 8.47 },
                { threshold: 19, classification: 'VeryGood', score: 7.94 },
                { threshold: 20, classification: 'VeryGood', score: 7.41 },
                { threshold: 21, classification: 'Good', score: 6.88 },
                { threshold: 22, classification: 'Good', score: 6.35 },
                { threshold: 23, classification: 'Good', score: 5.82 },
                { threshold: 24, classification: 'Good', score: 5.29 },
                { threshold: 25, classification: 'Average', score: 4.76 },
                { threshold: 26, classification: 'Average', score: 4.23 },
                { threshold: 27, classification: 'Average', score: 3.71 },
                { threshold: 28, classification: 'Average', score: 3.18 },
                { threshold: 29, classification: 'Average', score: 2.65 },
                { threshold: 30, classification: 'Average', score: 2.12 },
                { threshold: 31, classification: 'Poor', score: 1.59 },
                { threshold: 32, classification: 'Poor', score: 1.06 },
                { threshold: 33, classification: 'Poor', score: 0.53 },
                { threshold: Infinity, classification: 'Unusable', score: 0 }
            ]
        },
        '20-29': {
            male: [
                { threshold: 11, classification: 'Excellent', score: 9 },
                { threshold: 12, classification: 'VeryGood', score: 8.36 },
                { threshold: 13, classification: 'VeryGood', score: 7.71 },
                { threshold: 14, classification: 'VeryGood', score: 7.07 },
                { threshold: 15, classification: 'Good', score: 6.43 },
                { threshold: 16, classification: 'Good', score: 5.79 },
                { threshold: 17, classification: 'Good', score: 5.14 },
                { threshold: 18, classification: 'Average', score: 4.5 },
                { threshold: 19, classification: 'Average', score: 3.86 },
                { threshold: 20, classification: 'Average', score: 3.21 },
                { threshold: 21, classification: 'Average', score: 2.57 },
                { threshold: 22, classification: 'Poor', score: 1.93 },
                { threshold: 23, classification: 'Poor', score: 1.29 },
                { threshold: 24, classification: 'Poor', score: 0.64 },
                { threshold: Infinity, classification: 'Unusable', score: 0 }
            ],
            Female: [
                { threshold: 16, classification: 'Excellent', score: 9 },
                { threshold: 17, classification: 'VeryGood', score: 8.47 },
                { threshold: 18, classification: 'VeryGood', score: 7.94 },
                { threshold: 19, classification: 'VeryGood', score: 7.41 },
                { threshold: 20, classification: 'Good', score: 6.88 },
                { threshold: 21, classification: 'Good', score: 6.35 },
                { threshold: 22, classification: 'Good', score: 5.82 },
                { threshold: 23, classification: 'Good', score: 5.29 },
                { threshold: 24, classification: 'Average', score: 4.76 },
                { threshold: 25, classification: 'Average', score: 4.23 },
                { threshold: 26, classification: 'Average', score: 3.71 },
                { threshold: 27, classification: 'Average', score: 3.18 },
                { threshold: 28, classification: 'Average', score: 2.65 },
                { threshold: 29, classification: 'Poor', score: 2.12 },
                { threshold: 30, classification: 'Poor', score: 1.59 },
                { threshold: 31, classification: 'Poor', score: 1.06 },
                { threshold: Infinity, classification: 'Unusable', score: 0 }
            ]
        },
        '30-39': {
        male: [
            { threshold: 12, classification: 'Excellent', score: 9 },
            { threshold: 13, classification: 'VeryGood', score: 8.36 },
            { threshold: 14, classification: 'VeryGood', score: 7.71 },
            { threshold: 15, classification: 'Good', score: 7.07 },
            { threshold: 16, classification: 'Good', score: 6.43 },
            { threshold: 17, classification: 'Good', score: 5.79 },
            { threshold: 18, classification: 'Average', score: 5.14 },
            { threshold: 19, classification: 'Average', score: 4.5 },
            { threshold: 20, classification: 'Average', score: 3.86 },
            { threshold: 21, classification: 'Average', score: 3.21 },
            { threshold: 22, classification: 'Poor', score: 2.57 },
            { threshold: 23, classification: 'Poor', score: 1.93 },
            { threshold: 24, classification: 'Poor', score: 1.29 },
            { threshold: Infinity, classification: 'Unusable', score: 0 }
        ],
        female: [
            { threshold: 17, classification: 'Excellent', score: 9 },
            { threshold: 18, classification: 'VeryGood', score: 8.47 },
            { threshold: 19, classification: 'VeryGood', score: 7.94 },
            { threshold: 20, classification: 'Good', score: 7.41 },
            { threshold: 21, classification: 'Good', score: 6.88 },
            { threshold: 22, classification: 'Good', score: 6.35 },
            { threshold: 23, classification: 'Average', score: 5.82 },
            { threshold: 24, classification: 'Average', score: 5.29 },
            { threshold: 25, classification: 'Average', score: 4.76 },
            { threshold: 26, classification: 'Average', score: 4.23 },
            { threshold: 27, classification: 'Average', score: 3.71 },
            { threshold: 28, classification: 'Average', score: 3.18 },
            { threshold: 29, classification: 'Average', score: 2.65 },
            { threshold: 30, classification: 'Poor', score: 2.12 },
            { threshold: 31, classification: 'Poor', score: 1.59 },
            { threshold: 32, classification: 'Poor', score: 1.06 },
            { threshold: Infinity, classification: 'Unusable', score: 0 }
        ]
        },
        '40-49': {
        male: [
            { threshold: 14, classification: 'Excellent', score: 9 },
            { threshold: 15, classification: 'VeryGood', score: 8.36 },
            { threshold: 16, classification: 'VeryGood', score: 7.71 },
            { threshold: 17, classification: 'Good', score: 7.07 },
            { threshold: 18, classification: 'Good', score: 6.43 },
            { threshold: 19, classification: 'Good', score: 5.79 },
            { threshold: 20, classification: 'Average', score: 5.14 },
            { threshold: 21, classification: 'Average', score: 4.5 },
            { threshold: 22, classification: 'Average', score: 3.86 },
            { threshold: 23, classification: 'Average', score: 3.21 },
            { threshold: 24, classification: 'Poor', score: 2.57 },
            { threshold: 25, classification: 'Poor', score: 1.93 },
            { threshold: 26, classification: 'Poor', score: 1.29 },
            { threshold: Infinity, classification: 'Unusable', score: 0 }
        ],
        female: [
            { threshold: 18, classification: 'Excellent', score: 9 },
            { threshold: 19, classification: 'VeryGood', score: 8.47 },
            { threshold: 20, classification: 'VeryGood', score: 7.94 },
            { threshold: 21, classification: 'Good', score: 7.41 },
            { threshold: 22, classification: 'Good', score: 6.88 },
            { threshold: 23, classification: 'Good', score: 6.35 },
            { threshold: 24, classification: 'Average', score: 5.82 },
            { threshold: 25, classification: 'Average', score: 5.29 },
            { threshold: 26, classification: 'Average', score: 4.76 },
            { threshold: 27, classification: 'Average', score: 4.23 },
            { threshold: 28, classification: 'Average', score: 3.71 },
            { threshold: 29, classification: 'Average', score: 3.18 },
            { threshold: 30, classification: 'Average', score: 2.65 },
            { threshold: 31, classification: 'Poor', score: 2.12 },
            { threshold: 32, classification: 'Poor', score: 1.59 },
            { threshold: 33, classification: 'Poor', score: 1.06 },
            { threshold: Infinity, classification: 'Unusable', score: 0 }
        ]
        },
        '50-59': {
          male: [
              { threshold: 15, classification: 'Excellent', score: 9 },
              { threshold: 16, classification: 'VeryGood', score: 8.36 },
              { threshold: 17, classification: 'VeryGood', score: 7.71 },
              { threshold: 18, classification: 'Good', score: 7.07 },
              { threshold: 19, classification: 'Good', score: 6.43 },
              { threshold: 20, classification: 'Average', score: 5.79 },
              { threshold: 21, classification: 'Average', score: 5.14 },
              { threshold: 22, classification: 'Average', score: 4.5 },
              { threshold: 23, classification: 'Average', score: 3.86 },
              { threshold: 24, classification: 'Average', score: 3.21 },
              { threshold: 25, classification: 'Poor', score: 2.57 },
              { threshold: 26, classification: 'Poor', score: 1.93 },
              { threshold: 27, classification: 'Poor', score: 1.29 },
              { threshold: Infinity, classification: 'Unusable', score: 0 }
          ],
          female: [
              { threshold: 19, classification: 'Excellent', score: 9 },
              { threshold: 20, classification: 'VeryGood', score: 8.47 },
              { threshold: 21, classification: 'VeryGood', score: 7.94 },
              { threshold: 22, classification: 'Good', score: 7.41 },
              { threshold: 23, classification: 'Good', score: 6.88 },
              { threshold: 24, classification: 'Good', score: 6.35 },
              { threshold: 25, classification: 'Average', score: 5.82 },
              { threshold: 26, classification: 'Average', score: 5.29 },
              { threshold: 27, classification: 'Average', score: 4.76 },
              { threshold: 28, classification: 'Average', score: 4.23 },
              { threshold: 29, classification: 'Average', score: 3.71 },
              { threshold: 30, classification: 'Average', score: 3.18 },
              { threshold: 31, classification: 'Average', score: 2.65 },
              { threshold: 32, classification: 'Poor', score: 2.12 },
              { threshold: 33, classification: 'Poor', score: 1.59 },
              { threshold: 34, classification: 'Poor', score: 1.06 },
              { threshold: Infinity, classification: 'Unusable', score: 0 }
          ]
        },
        '60+': {
        male: [
            { threshold: 16, classification: 'Excellent', score: 9 },
            { threshold: 17, classification: 'VeryGood', score: 8.36 },
            { threshold: 18, classification: 'VeryGood', score: 7.71 },
            { threshold: 19, classification: 'Good', score: 7.07 },
            { threshold: 20, classification: 'Good', score: 6.43 },
            { threshold: 21, classification: 'Average', score: 5.79 },
            { threshold: 22, classification: 'Average', score: 5.14 },
            { threshold: 23, classification: 'Average', score: 4.5 },
            { threshold: 24, classification: 'Average', score: 3.86 },
            { threshold: 25, classification: 'Average', score: 3.21 },
            { threshold: 26, classification: 'Poor', score: 2.57 },
            { threshold: 27, classification: 'Poor', score: 1.93 },
            { threshold: 28, classification: 'Poor', score: 1.29 },
            { threshold: Infinity, classification: 'Unusable', score: 0 }
        ],
        female: [
            { threshold: 20, classification: 'Excellent', score: 9 },
            { threshold: 21, classification: 'VeryGood', score: 8.47 },
            { threshold: 22, classification: 'VeryGood', score: 7.94 },
            { threshold: 23, classification: 'Good', score: 7.41 },
            { threshold: 24, classification: 'Good', score: 6.88 },
            { threshold: 25, classification: 'Good', score: 6.35 },
            { threshold: 26, classification: 'Average', score: 5.82 },
            { threshold: 27, classification: 'Average', score: 5.29 },
            { threshold: 28, classification: 'Average', score: 4.76 },
            { threshold: 29, classification: 'Average', score: 4.23 },
            { threshold: 30, classification: 'Average', score: 3.71 },
            { threshold: 31, classification: 'Average', score: 3.18 },
            { threshold: 32, classification: 'Average', score: 2.65 },
            { threshold: 33, classification: 'Poor', score: 2.12 },
            { threshold: 34, classification: 'Poor', score: 1.59 },
            { threshold: 35, classification: 'Poor', score: 1.06 },
            { threshold: Infinity, classification: 'Unusable', score: 0 }
        ]
        }
    };

    // Determine the age group
    const ageGroup = Object.keys(classificationTable).find(range => {
        const [min, max] = range.split('-').map(Number);
        return age >= min && age <= max;
    });

    if (!ageGroup) {
        return { error: 'Age out of range.' };
    }

    const genderTable = classificationTable[ageGroup][gender.toLowerCase()];
    if (!genderTable) {
        return { error: 'Invalid gender provided.' };
    }

    // Find the classification based on body fat percentage
    for (const { threshold, classification, score } of genderTable) {
        if (bodyFatPercentage < threshold) {
            return { score, classification };
        }
    }

    return { error: 'No matching classification found.' };
  }
  function calculateResidualMassWomen(weightKg) {
    // Constants for residual mass calculation for women
    const CONSTANT1 = 20.9; // Constant 1 (residual mass % for women)
    const CONSTANT2 = 100; // Constant 2 (percentage divisor)

    // Calculate residual mass in kilograms
    const residualMassKg = (weightKg * CONSTANT1) / CONSTANT2;
  
    console.log("1"+residualMassKg)
    // Calculate residual mass as a percentage
    const residualMassPercentage = (residualMassKg * CONSTANT2) / weightKg;
    console.log(residualMassPercentage)
    // Return the results as an object
    return {
        residualMassKg: residualMassKg, // Rounded to 3 decimal places
        residualMassPercentage: residualMassPercentage // Rounded to 1 decimal place
    };
  }
  function calculateResidualMassMale(weight) {
    const constantMass = 24.21; // CONSTANTE 1 MASA RESIDUAL HOMBRE
    const constantPercentage = 100; // CONSTANTE 1 MASA RESIDUAL HOMBRE

    // Calculate residual mass in kilograms
    const residualMassKg = (weight * constantMass) / constantPercentage;

    // Calculate residual mass as a percentage
    const residualMassPercentage = (residualMassKg * 100) / weight;

    return {
        residualMassKg: residualMassKg.toFixed(4), // Rounded to 4 decimal places
        residualMassPercentage: residualMassPercentage.toFixed(2) // Rounded to 2 decimal places
    };
  }
  // Function to calculate bone mass for a man
  function calculateBoneMass(weight, heightCm, wristCircumference, kneeCircumference) {
    // Constants
    const R = 3.02; // Constant 1 for bone mass in men and women
    const S = 100; // Factor divisor for "C" bone mass in men and women
    const AD = 400; // Constant 2 for bone mass in men and women
    const AF = 0.712; // Example power factor, adjust as needed
    
    // Calculations
    const heightM = heightCm / 100; // Convert height to meters
    const T = Math.pow(heightM, 2); // T is AG squared

    const W = .38; // Example multiplier for wrist circumference, adjust as needed
    const Z = wristCircumference * W; 
    const AB = Z / S;


    const Y = .23; // Example multiplier for knee circumference, adjust as needed
    const AA = kneeCircumference * Y;
    const AC = AA / S;

  
    // Bone mass calculation
    const AH = R * (T * AB * AC * AD);
    const boneMassKg = Math.pow(AH, AF); // Bone mass in kilograms
    const boneMassPercentage = (boneMassKg / weight) * 100; // Bone mass in percentage

  
    return {
        boneMassKg,
        boneMassPercentage,
       
    };
  }
  function calculateSkinMassMale(heightCm, weightKg) {

    
    // Constants
    const AI = 0.0235; // Constant for skin calculation
    const AJ = 0.42246; // Exponent for height in cm
    const AK = 0.51456; // Exponent for weight in kg
    const skinDensity = 1.05; // Skin density (obtained from dissection data)
    const TSK = 2.07; // Skin thickness for men (obtained from cadaver data)
  
    // Calculations
    const heightExponent = Math.pow(heightCm, AJ); // C^AJ
    const weightExponent = Math.pow(weightKg, AK); // P^AK
  
    const AN = AI * heightExponent * weightExponent; // AI * (C^AJ) * (P^AK)
  
    const skinMassKg = (AN * skinDensity) * TSK; // Final skin mass in kg
    const skinMassPercentage = (skinMassKg / weightKg) * 100; // Skin mass as percentage of total weight
  
    return {
        skinMassKg: skinMassKg.toFixed(6),
        skinMassPercentage: skinMassPercentage.toFixed(6)
    };
  }
  function calculateSkinMassForWomen(heightCm, weightKg) {
    // Constants
    const AI = 0.0235; // Constant for skin mass calculation
    const AJ = 0.42246; // Power for height in cm
    const AK = 0.51456; // Power for weight in kg
    const densityOfSkin = 1.05; // Skin density (obtained from dissection)
    const TSK = 1.96; // Skin thickness for women (obtained from cadavers)
  
    // Calculations
    const heightPower = Math.pow(heightCm, AJ); // "C" raised to "AJ"
    console.log("hp"+" "+heightPower)

    const weightPower = Math.pow(weightKg, AK); // "P" raised to "AK"
   
    const skinMass = AI * heightPower * weightPower; // Mass of skin (kg)

    const fullskinMass = skinMass*densityOfSkin*TSK

    const fullskinMassPercentage =  (fullskinMass*100)/weight 
   
    // Return the results
    return {
      skinMassKg: fullskinMass.toFixed(6),
      skinMassPercentage: fullskinMassPercentage.toFixed(6)
    };
  }
  function calculateBodyMetricsForGender(totalWeight, fatKg, residualKg, boneKg, skinKg) {
  
    const muscleWeight = totalWeight - (fatKg + residualKg + boneKg + skinKg);

    return {
      muscleWeight: muscleWeight.toFixed(2),
      musclePercentage: ((muscleWeight / totalWeight) * 100).toFixed(2),
    };
  }


  function calculateWaistCircumferenceScore(waistCircumference, gender) {
    // Gender-specific scoring ranges (example values)
    const scoringRanges = {
        Male: [
            { max: 90, score: 9, classification: "Excellent" },
            { max: 100, score: 7, classification: "Good" },
            { max: 110, score: 5, classification: "Average" },
            { max: Infinity, score: 3, classification: "Poor" }
        ],
        Female: [
            { max: 80, score: 9, classification: "Excellent" },
            { max: 90, score: 7, classification: "Good" },
            { max: 100, score: 5, classification: "Average" },
            { max: Infinity, score: 3, classification: "Poor" }
        ]
    };

    if (waistCircumference <= 0) {
        throw new Error("Invalid input: Waist circumference must be greater than 0.");
    }

    if (!scoringRanges[gender]) {
        throw new Error("Invalid gender: Please specify 'Male' or 'Female'.");
    }

    // Determine score and classification based on ranges
    const ranges = scoringRanges[gender];
    let result = { score: 0, classification: "Unknown" };

    for (const range of ranges) {
        if (waistCircumference <= range.max) {
            result = { score: range.score, classification: range.classification };
            break;
        }
    }

    return result;
  }



  function calculateMetabolicAge(weight, height, age, gender) {
    if (weight <= 0 || height <= 0 || age <= 0) {
        throw new Error("Invalid inputs: Weight, height, and age must be greater than 0.");
    }

    // BMR calculation based on Harris-Benedict equations
    let bmr;
    if (gender.toLowerCase() === "male") {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else if (gender.toLowerCase() === "female") {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    } else {
        throw new Error("Invalid gender: Please specify 'male' or 'female'.");
    }

    // Estimate metabolic age using average BMR for the given chronological age
    const averageBMRForAge = 1500; // Replace with an actual reference value
    const metabolicAge = Math.round((bmr / averageBMRForAge) * age);

    return metabolicAge;
  }
  function calculateMuscleMassAndScore(weight, bodyFat, gender) {
    // Gender-specific coefficients for muscle mass calculation (example values)
    const coefficients = {
        Male: 0.45,   // Example coefficient for males
        Female: 0.42  // Example coefficient for females
    };

    // Scoring ranges (example thresholds)
    const scoringRanges = {
        Male: [
            { max: 30, score: 5, classification: "Low" },
            { max: 40, score: 7, classification: "Normal" },
            { max: 50, score: 9, classification: "Excellent" }
        ],
        Female: [
            { max: 25, score: 5, classification: "Low" },
            { max: 35, score: 7, classification: "Normal" },
            { max: 45, score: 9, classification: "High" }
        ]
    };

    if (weight <= 0 || bodyFat < 0) {
        throw new Error("Invalid inputs: Weight must be greater than 0, and body fat cannot be negative.");
    }

    if (!coefficients[gender] || !scoringRanges[gender]) {
        throw new Error("Invalid gender: Please specify 'Male' or 'Female'.");
    }

    // Calculate muscle mass
    const coefficient = coefficients[gender];
    const muscleMass = coefficient * (weight - bodyFat);

    // Determine score based on ranges
    const ranges = scoringRanges[gender];
    let scoreDetails = { score: 0, classification: "Unknown" };

    for (const range of ranges) {
        if (muscleMass <= range.max) {
            scoreDetails = { score: range.score, classification: range.classification };
            break;
        }
    }

    return {
        muscleMass: muscleMass.toFixed(2),
        ...scoreDetails
    };
  }
  function calculateHeartRateZones(age, restingHR) {
    // Estimate maximum heart rate
    const maxHR = 220 - age;

    if (age <= 0 || restingHR <= 0) {
        throw new Error("Invalid inputs: Age and resting heart rate must be greater than 0.");
    }

    // Calculate zones as percentages of maxHR
    const zones = {
        Recovery: {
            min: Math.round(0.5 * (maxHR - restingHR) + restingHR),
            max: Math.round(0.6 * (maxHR - restingHR) + restingHR)
        },
        Aerobic: {
            min: Math.round(0.6 * (maxHR - restingHR) + restingHR),
            max: Math.round(0.7 * (maxHR - restingHR) + restingHR)
        },
        Anaerobic: {
            min: Math.round(0.7 * (maxHR - restingHR) + restingHR),
            max: Math.round(0.85 * (maxHR - restingHR) + restingHR)
        },
        MaxEffort: {
            min: Math.round(0.85 * (maxHR - restingHR) + restingHR),
            max: Math.round(maxHR)
        }
    };

    return {
        maxHR,
        zones
    };
  }
  function calculateAlcoholScore(drinksPerWeek) {
    // Define scoring ranges
    const scoringRanges = [
        { max: 0, score: 9, riskLevel: "None" },
        { max: 2, score: 7, riskLevel: "Low" },
        { max: 7, score: 5, riskLevel: "Moderate" },
        { max: 14, score: 3, riskLevel: "High" },
        { max: Infinity, score: 1, riskLevel: "Very High" }
    ];

    if (drinksPerWeek < 0) {
        throw new Error("Invalid input: Drinks per week must be a non-negative number.");
    }

    // Determine score and risk level
    for (const range of scoringRanges) {
        if (drinksPerWeek <= range.max) {
            return {
                score: range.score,
                riskLevel: range.riskLevel
            };
        }
    }

    // Default response (shouldn't reach here)
    return {
        score: 0,
        riskLevel: "Unknown"
    };
  }
  function calculateSmokingScore(cigarettesPerDay) {
    // Define scoring ranges
    const scoringRanges = [
        { max: 0, score: 9, riskLevel: "None" },
        { max: 5, score: 7, riskLevel: "Low" },
        { max: 15, score: 5, riskLevel: "Moderate" },
        { max: 25, score: 3, riskLevel: "High" },
        { max: Infinity, score: 1, riskLevel: "Very High" }
    ];

    if (cigarettesPerDay < 0) {
        throw new Error("Invalid input: Cigarettes per day must be a non-negative number.");
    }

    // Determine score and risk level
    for (const range of scoringRanges) {
        if (cigarettesPerDay <= range.max) {
            return {
                score: range.score,
                riskLevel: range.riskLevel
            };
        }
    }

    // Default response (shouldn't reach here)
    return {
        score: 0,
        riskLevel: "Unknown"
    };
  }
  function calculateSmokingScoreWithPackYears(cigarettesPerDay, smokingYears) {
    const packYears = (cigarettesPerDay / 20) * smokingYears;

    const scoringRanges = [
        { max: 0, score: 9, riskLevel: "None" },
        { max: 5, score: 7, riskLevel: "Low" },
        { max: 15, score: 5, riskLevel: "Moderate" },
        { max: 25, score: 3, riskLevel: "High" },
        { max: Infinity, score: 1, riskLevel: "Very High" }
    ];

    if (cigarettesPerDay < 0 || smokingYears < 0) {
        throw new Error("Invalid inputs: Cigarettes per day and smoking years must be non-negative numbers.");
    }

    let scoreDetails = { score: 0, riskLevel: "Unknown" };
    for (const range of scoringRanges) {
        if (cigarettesPerDay <= range.max) {
            scoreDetails = { score: range.score, riskLevel: range.riskLevel };
            break;
        }
    }

    return {
        ...scoreDetails,
        packYears: packYears.toFixed(2)
    };
  }
  function calculateExerciseScore(frequency, intensity) {
    // Define scoring ranges
    const intensityMultipliers = {
        low: 0.5,
        moderate: 1,
        high: 1.5
    };

    const scoringRanges = [
        { max: 0, score: 1, activityLevel: "Sedentary" },
        { max: 2, score: 3, activityLevel: "Low" },
        { max: 4, score: 5, activityLevel: "Moderate" },
        { max: 6, score: 7, activityLevel: "High" },
        { max: Infinity, score: 9, activityLevel: "VeryHigh"}
    ];

    if (frequency < 0 || !intensityMultipliers[intensity]) {
        throw new Error("Invalid inputs: Frequency must be non-negative, and intensity must be 'low', 'moderate', or 'high'.");
    }

    // Adjust frequency by intensity multiplier
    const adjustedFrequency = frequency * intensityMultipliers[intensity];

    // Determine score and activity level
    for (const range of scoringRanges) {
        if (adjustedFrequency <= range.max) {
            return {
                score: range.score,
                activityLevel: range.activityLevel
            };
        }
    }

    // Default response (shouldn't reach here)
    return {
        score: 0,
        activityLevel: "Unknown"
    };
  }



  //---------- Render Report Functions -----------//
  function updateProgressBar(value, progPer, progText) {
    const progressCircle = document.getElementById(progPer);
    const progressText = document.getElementById(progText);
    const radius = 45;
    let bodyFat = value; // Example percentage
    let maxStroke = 283;

    let offset = maxStroke - (bodyFat / 100) * maxStroke;
    progressCircle.style.strokeDashoffset = offset;
    progressText.textContent = `${bodyFat}%`;


  }
  function renderEdadMeta(value) {
    const MEN = Report.AgeIcons.Men;
    const WOMEN = Report.AgeIcons.Woman;

    function setImgs(imgSrc, imgAlt, category) {
      const img = document.getElementById(category);
      // Check if the img element exists
      if (img) {
        // Set the image source and alternative text
        img.src = imgSrc;
        img.alt = imgAlt;
    } else {
        console.error("Image element with id 'logo-img' not found.");
    }
    }

    function renderMen() {
      const ranges = [
        { min: 9, max: 12, index: 0 },
        { min: 12, max: 15, index: 1 },
        { min: 15, max: 30, index: 2 },
        { min: 30, max: 45, index: 3 },
        { min: 45, max: 65, index: 4 },
        { min: 65, max: 85, index: 5 },
        { min: 85, max: 100, index: 6 }
      ];
      
      for (const range of ranges) {
        if (value >= range.min && value < range.max) {
          setImgs(MEN[range.index], `Range: ${range.min}-${range.max}`, "ImgAge");
          return;
        }
      }
      console.log("Out of range");
    }

    function renderWomen() {
      const ranges = [
        { min: 9, max: 12, index: 0 },
        { min: 12, max: 15, index: 1 },
        { min: 15, max: 30, index: 2 },
        { min: 30, max: 45, index: 3 },
        { min: 45, max: 65, index: 4 },
        { min: 65, max: 85, index: 5 },
        { min: 85, max: 100, index: 6 }
      ];
      
      for (const range of ranges) {
        if (value >= range.min && value < range.max) {
          setImgs(WOMEN[range.index], `Range: ${range.min}-${range.max}`, "ImgAge");
          return;
        }
      }
      console.log("Out of range");
    }

    if (gender === "Male") {
      renderMen();
    } else if (gender === "Female") {
      renderWomen();
    } else {
      console.log("Invalid gender");
    }
  }
  function setProgressColor(color, Tcolor, Bgcolor, Dcolor) {
    // Select all elements with the class 'progress'
    const progressElements = document.querySelectorAll('.progress');
    const textElements = document.querySelectorAll('.progress-text');
    const backgroundElements = document.querySelectorAll('.background');
    const descriptionElements = document.querySelectorAll('.description');


    // Loop through each element and set the stroke color
    progressElements.forEach(element => {
    element.style.stroke = color;
    });

    textElements.forEach(element => {
    element.style.fill = Tcolor;
    });

    backgroundElements.forEach(element => {
      element.style.stroke = Bgcolor;
    });

    descriptionElements.forEach(element => {
      element.style.color = Dcolor;
    });

  }
  function renderTextKg(bodyFatValue, Bfurl) {
    // Select the span element by its ID
    const bodyFatElement = document.getElementById(Bfurl);

    // Set the content of the span element to the body fat value
    bodyFatElement.textContent = bodyFatValue;
  }
  function renderActividadFísica(value) {
    const Actividad = Report.ActividadFísica

    function setImgs(imgSrc, imgAlt, category) {
      const img = document.getElementById(category);
      // Check if the img element exists
      if (img) {
        // Set the image source and alternative text
        img.src = imgSrc;
        img.alt = imgAlt;
    } else {
        console.error("Image element with id 'logo-img' not found.");
    }
      
    }

    if (value === "Sedentary") {
      setImgs(Actividad[0], "Sedentary", "NDAFimg")
    }else if (value === "Low") {
      setImgs(Actividad[1], "Low", "NDAFimg")
    }else if (value === "Moderate") {
      setImgs(Actividad[2], "Moderate", "NDAFimg")
    }else if (value === "High") {
      setImgs(Actividad[3], "High", "NDAFimg")
    }else if (value === "VeryHigh") {
      setImgs(Actividad[4], "VeryHigh", "NDAFimg")
    } else {
      console.log("Invalid Value");
    }
  }

  function renderCintura(value) {
    const Actividad = Report.ActividadFísica

    function setImgs(imgSrc, imgAlt, category) {
      const img = document.getElementById(category);
      // Check if the img element exists
      if (img) {
        // Set the image source and alternative text
        img.src = imgSrc;
        img.alt = imgAlt;
    } else {
        console.error("Image element with id 'logo-img' not found.");
    }
    }

    if (value === "Sedentary") {
      setImgs(Actividad[0], "Sedentary", "Cinturaimg")
    }else if (value === "Poor") {
      setImgs(Actividad[1], "Poor", "Cinturaimg")
    }else if (value === "Average") {
      setImgs(Actividad[2], "Average", "Cinturaimg")
    }else if (value === "Good") {
      setImgs(Actividad[3], "Good", "Cinturaimg")
    }else if (value === "Excellent") {
      setImgs(Actividad[4], "Excellent", "Cinturaimg")
    } else {
      console.log("Invalid Value");
    }
  }








  function getFatPercent(){
    if (!transferreduserInfo) {
      console.error("User ID is not set in localStorage.");
      return;
    }

    const userId = transferreduserInfo;

    if (!gender || !waist || !neck || !height || !weight || !age || !rist || !knee) {
      console.error("One or more required user parameters are missing.");
      return;
    }

    let fat;

    if (gender === "Male") {
      fat = calculateBodyFatForMen(waist, neck, height, weight);
     
      
      
    } else {
      if (!hip) {
        console.error("Hip measurement is required for female calculations.");
        return;
      }
      fat = calculateBodyFatForWomen(waist, neck, height, hip, weight);
      
    }

 
   return(fat.bodyFatPercentage)


  }








  async function renderBtnsContent() {
    if (!transferreduserInfo) {
      console.error("User ID is not set in localStorage.");
      return;
    }

    const userId = transferreduserInfo;

    if (!gender || !waist || !neck || !height || !weight || !age || !rist || !knee) {
      console.error("One or more required user parameters are missing.");
      return;
    }

    let fat, Residual, BoneMass, SkinMass, muscleMass, WaistCircum, RestingHR, Exerc;

    if (gender === "Male") {
      fat = calculateBodyFatForMen(waist, neck, height, weight);
      Residual = calculateResidualMassMale(weight);
      BoneMass = calculateBoneMass(weight, height, rist, knee);
      SkinMass = calculateSkinMassMale(height, weight);
      WaistCircum = calculateWaistCircumferenceScore(waist, gender);
      RestingHR = calculateHeartRateZones(age, restingHR);
      Exerc = calculateExerciseScore(frequency, intensity);
    } else {
      if (!hip) {
        console.error("Hip measurement is required for female calculations.");
        return;
      }
      fat = calculateBodyFatForWomen(waist, neck, height, hip, weight);
      Residual = calculateResidualMassWomen(weight);
      BoneMass = calculateBoneMass(weight, height, rist, knee);
      SkinMass = calculateSkinMassForWomen(height, weight);
      WaistCircum = calculateWaistCircumferenceScore(waist, gender);
      RestingHR = calculateHeartRateZones(age, restingHR);
      Exerc = calculateExerciseScore(frequency, intensity);
    }

    const MetabolicAge = calculateMetabolicAge(weight, height, age, gender);
    muscleMass = calculateBodyMetricsForGender(
      Number(weight),
      Number(fat.fatWeightKg),
      Number(Residual.residualMassKg),
      Number(BoneMass.boneMassKg),
      Number(SkinMass.skinMassKg)
    );

    //console.log(`Metabolic Age: ${MetabolicAge}`);
    //console.log(`Body Fat: ${fat.bodyFatPercentage}`);
   // console.log(`Residual Mass: ${Residual.residualMassPercentage}`);
   // console.log(`Bone Mass: ${BoneMass.boneMassPercentage}`);
    //console.log(`Skin Mass: ${SkinMass.skinMassPercentage}`);
    //console.log(`Muscle Mass: ${muscleMass.musclePercentage}`);

    getFatPercent(fat.bodyFatPercentage)


    renderEdadMeta(MetabolicAge)
    updateProgressBar(fat.bodyFatPercentage, "fatMassPer", "fatText")
    updateProgressBar(Residual.residualMassPercentage, "residualMassPer", "residualText")
    updateProgressBar(SkinMass.skinMassPercentage, "skinMassPer", "skinText")
    updateProgressBar(BoneMass.boneMassPercentage, "boneMassPer", "boneText")
    updateProgressBar(muscleMass.musclePercentage, "muscleMassPer", "muscleText")
    


    

    renderTextKg(`${fat.fatWeightKg} kg`, "bodyfatKg");
    renderTextKg(`${Residual.residualMassKg} kg`, "residualMassKg");
    renderTextKg(`${BoneMass.boneMassKg} kg`, "boneMassKg");
    renderTextKg(`${SkinMass.skinMassKg} kg`, "skinMassKg");
    renderTextKg(`${muscleMass.muscleWeight} kg`, "muscleMassKg");
    renderTextKg(`${MetabolicAge} Años`, "MetabolicAgeKg");


    renderTextKg(`${RestingHR.maxHR} bpm`, "RHR");
    renderTextKg(`${WaistCircum.score}`, "Cintura");
    renderTextKg(`${Exerc.activityLevel}`, "NDAF");
   

    renderActividadFísica(Exerc.activityLevel)
    renderCintura(WaistCircum.classification)




    async function shouldUpdateDatabase() {
      try {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          console.error("User document does not exist.");
          return true; // If no user record exists, create one
        }

        const userData = userSnap.data();
        const lastTimestamp = userData?.lastBodyFatEvaluation?.createdAt;

        if (!lastTimestamp) {
          console.log("No previous evaluation found, creating a new one.");
          return true;
        }

        const now = new Date();
        const lastUpdate = new Date(lastTimestamp.seconds * 1000); // Convert Firestore timestamp
        const diffInDays = (now - lastUpdate) / (1000 * 3600 * 24);

        return diffInDays >= 30; // Returns true only if 30+ days have passed
      } catch (error) {
        console.error("Error checking last update timestamp:", error);
        return false;
      }
    }

    async function updateDatabase() {
      try {
        const userRef = doc(db, "users", userId);
        const evaluationsRef = collection(userRef, "bodyFatEvaluations");

        const fatEvaluationData = {
          bodyFatPercentage: fat.bodyFatPercentage,
          residualMassPercentage: Residual.residualMassPercentage,
          boneMassPercentage: BoneMass.boneMassPercentage,
          skinMassPercentage: SkinMass.skinMassPercentage,
          fatWeightKg: fat.fatWeightKg,
          residualMassKg: Residual.residualMassKg,
          boneMassKg: BoneMass.boneMassKg,
          skinMassKg: SkinMass.skinMassKg,
          muscleMassPercentage: muscleMass.musclePercentage,
          muscleMassKg: muscleMass.muscleWeight,
          createdAt: new Date(),
        };

        // Add new evaluation
        const newDocRef = await addDoc(evaluationsRef, fatEvaluationData);
        console.log(`New body fat evaluation added with ID: ${newDocRef.id}`);

        // Update user's main document
        await updateDoc(userRef, {
          lastBodyFatEvaluation: fatEvaluationData,
          lastBodyFatEvaluationId: newDocRef.id,
        });

        console.log("User document updated with latest evaluation.");
      } catch (error) {
        console.error("Error saving body fat evaluation:", error);
      }
    }

    if (await shouldUpdateDatabase()) {
      await updateDatabase();
    } else {
      console.log("Skipping database update: Last update was less than 30 days ago.");
    }

    return fat;
  }
  renderBtnsContent()



  const level = getScoring(age, gender, getFatPercent()).classification  // "Excellent"


  function checkStatusLevel(){
    setBackgroundColor(Base, "ReturnIcon")
    

    if(level === "Unusable"){
      setImgs(HeaderIcons.Unusable, "A Fresh Start!", "UserImg")
      setGradient('#A0A0A0', '#EDEDED', "header")
      setBackgroundColor(Prime2, "ImgBlock")
      setBorders('#A0A0A0', "ImgBlock", '10px')
      setMultiBorders('#A0A0A0', 'btn', 1);
      setMultiBorders('#A0A0A0', 'hiddendiv', 1);

    }else if(level === "Poor"){
      setImgs(HeaderIcons.Poor, "First Steps Taken!", "UserImg")
      setGradient('#FF6961', '#EDEDED', "header")
      setBackgroundColor(Prime2, "ImgBlock")
      setBorders('#FF6961', "ImgBlock", '10px')
      setMultiBorders('#FF6961', 'btn', 1);
      setMultiBorders('#FF6961', 'hiddendiv', 1);

    }else if(level === "Average"){
      setImgs(HeaderIcons.Average, "Momentum Building!" , "UserImg")
      setGradient('#FFA500', '#EDEDED', "header")
      setBackgroundColor(Prime2, "ImgBlock")
      setBorders('#FFA500', "ImgBlock", '10px')
      setMultiBorders('#FFA500', 'btn', 1);
      setMultiBorders('#FFA500', 'hiddendiv', 1);

    }else if(level === "Good"){
      setImgs(HeaderIcons.Good, "Stronger Every Day!", "UserImg")
      setGradient('#FFD700', '#EDEDED', "header")
      setBackgroundColor(Prime2, "ImgBlock")
      setBorders('#FFD700', "ImgBlock", '10px')
      setMultiBorders('#FFD700', 'btn', 1);
      setMultiBorders('#FFD700', 'hiddendiv', 1);

     
    }else if(level === "VeryGood"){
      setImgs(HeaderIcons.VeryGood, "Sky’s the Limit!", "UserImg")
      setGradient('#32CD32', '#EDEDED', "header")
      setBackgroundColor(Prime2, "ImgBlock")
      setBorders('#32CD32', "ImgBlock", '10px')
      setMultiBorders('#32CD32', 'btn', 1);
      setMultiBorders('#32CD32', 'hiddendiv', 1);

    }else if(level === "Excellent"){
      setImgs(HeaderIcons.Excellent, "You Did It!", "UserImg")
      setGradient('#007BFF', '#EDEDED', "header")
      setBackgroundColor(Prime2, "ImgBlock")
      setBorders('#007BFF', "ImgBlock", '10px')
      setMultiBorders('#007BFF', 'btn', 1);
      setMultiBorders('#007BFF', 'hiddendiv', 1);
    }
    
  }










  


 











 



 




  function renderReport(gender, waist, neck, height, weight, age, hip, knee, rist, restingHR, frequency, intensity, smokingYears, cigarettesPerDay, drinksPerWeek) {
    let reportContent = "";
  
    if (gender === "Male") {
      const resultWithPackYears = calculateSmokingScoreWithPackYears(10, smokingYears);
      reportContent += `<p>Score: ${resultWithPackYears.score}, Risk Level: ${resultWithPackYears.riskLevel}, Pack-Years: ${resultWithPackYears.packYears}</p>`;
  
      const Presult = calculateSmokingScore(cigarettesPerDay);
      reportContent += `<p>Score: ${Presult.score}, Risk Level: ${Presult.riskLevel}</p>`;
  
      const Dresult = calculateAlcoholScore(drinksPerWeek);
      reportContent += `<p>Score: ${Dresult.score}, Risk Level: ${Dresult.riskLevel}</p>`;
  
    } else if (gender === "Female") {
      const resultWithPackYears = calculateSmokingScoreWithPackYears(10, smokingYears);
      reportContent += `<p>Score: ${resultWithPackYears.score}, Risk Level: ${resultWithPackYears.riskLevel}, Pack-Years: ${resultWithPackYears.packYears}</p>`;
  
      const Presult = calculateSmokingScore(cigarettesPerDay);
      reportContent += `<p>Score: ${Presult.score}, Risk Level: ${Presult.riskLevel}</p>`;
  
      const Dresult = calculateAlcoholScore(drinksPerWeek);
      reportContent += `<p>Score: ${Dresult.score}, Risk Level: ${Dresult.riskLevel}</p>`;
  
    } else {
      reportContent = "<p>Gender not recognized. Please provide either 'Male' or 'Female'.</p>";
    }
  
    // Render the report content to the div with id 'Report'
    document.getElementById("Report").innerHTML = reportContent;
  }
  
  // Call the function (example usage)
 // renderReport(gender, waist, neck, height, weight, age, hip, knee, rist, restingHR, frequency, intensity, smokingYears, cigarettesPerDay, drinksPerWeek);
  




  setProgressColor(Base, "#333", '#eee', '#666')
  checkStatusLevel()
  setTextColor(Base, "BtnBlock")
  setReportBg('#EDEDED');
  setImgs(ReturnIcon, "Return Btn", "ReturnIcon")
  setBackgroundColorBtn(Prime2, "btn")
  setBackgroundColorBtn(Prime2, "hiddendiv")







}
document.getElementById('DPBtn').addEventListener('click', function() {
  const DPBtn = document.getElementById('DPBtn');
  const Personales = document.getElementById('Personales');
  if (Personales.style.display === 'none' || Personales.style.display === '') {
    Personales.style.display = 'flex';
    DPBtn.style.borderRadius = `1rem 1rem 0 0 `
    Personales.style.borderRadius = `0 0 1rem 1rem`

  } else {
    Personales.style.display = 'none';
    DPBtn.style.borderRadius = `1rem`
  }
});

document.getElementById('BFBtn').addEventListener('click', function() {
  const BFBtn = document.getElementById('BFBtn');
  const BodyFat = document.getElementById('BodyFat');
  if (BodyFat.style.display === 'none' || BodyFat.style.display === '') {
    BodyFat.style.display = 'flex';
    BFBtn.style.borderRadius = `1rem 1rem 0 0 `
    BodyFat.style.borderRadius = `0 0 1rem 1rem`
  } else {
    BodyFat.style.display = 'none';
    BFBtn.style.borderRadius = `1rem`
  }
});

document.getElementById('RMBtn').addEventListener('click', function() {
  const RMBtn = document.getElementById('RMBtn');
  const residualMass = document.getElementById('residualMass');
  if (residualMass.style.display === 'none' || residualMass.style.display === '') {
    residualMass.style.display = 'flex';
    RMBtn.style.borderRadius = `1rem 1rem 0 0 `
    residualMass.style.borderRadius = `0 0 1rem 1rem`

  } else {
    residualMass.style.display = 'none';
    RMBtn.style.borderRadius = `1rem`
  }
});

document.getElementById('SMBtn').addEventListener('click', function() {
  const SMBtn = document.getElementById('SMBtn');
  const skinMass = document.getElementById('skinMass');
  if (skinMass.style.display === 'none' || skinMass.style.display === '') {
    skinMass.style.display = 'flex';
    SMBtn.style.borderRadius = `1rem 1rem 0 0 `
    skinMass.style.borderRadius = `0 0 1rem 1rem`

  } else {
    skinMass.style.display = 'none';
    SMBtn.style.borderRadius = `1rem`
  }
});

document.getElementById('BMBtn').addEventListener('click', function() {
  const BMBtn = document.getElementById('BMBtn');
  const boneMass = document.getElementById('boneMass');
  if (boneMass.style.display === 'none' || boneMass.style.display === '') {
    boneMass.style.display = 'flex';
    BMBtn.style.borderRadius = `1rem 1rem 0 0 `
    boneMass.style.borderRadius = `0 0 1rem 1rem`

  } else {
    boneMass.style.display = 'none';
    BMBtn.style.borderRadius = `1rem`
  }
});

document.getElementById('MMBtn').addEventListener('click', function() {
  const MMBtn = document.getElementById('MMBtn');
  const MuscleMass = document.getElementById('MuscleMass');
  if (MuscleMass.style.display === 'none' || MuscleMass.style.display === '') {
    MuscleMass.style.display = 'flex';
    MMBtn.style.borderRadius = `1rem 1rem 0 0 `
    MuscleMass.style.borderRadius = `0 0 1rem 1rem`

  } else {
    MuscleMass.style.display = 'none';
    MMBtn.style.borderRadius = `1rem`
  }
});

document.getElementById('EMBtn').addEventListener('click', function() {
  const EMBtn = document.getElementById('EMBtn');
  const MetabolicAge = document.getElementById('MetabolicAge');
  if (MetabolicAge.style.display === 'none' || MetabolicAge.style.display === '') {
    MetabolicAge.style.display = 'flex';
    EMBtn.style.borderRadius = `1rem 1rem 0 0 `
    MetabolicAge.style.borderRadius = `0 0 1rem 1rem`

  } else {
    MetabolicAge.style.display = 'none';
    EMBtn.style.borderRadius = `1rem`
  }
});

document.getElementById('DBtn').addEventListener('click', function() {
  const DBtn = document.getElementById('DBtn');
  const Datos = document.getElementById('Datos');
  if (Datos.style.display === 'none' || Datos.style.display === '') {
    Datos.style.display = 'flex';
    DBtn.style.borderRadius = `1rem 1rem 0 0 `
    Datos.style.borderRadius = `0 0 1rem 1rem`

  } else {
    Datos.style.display = 'none';
    DBtn.style.borderRadius = `1rem`
  }
});

document.addEventListener('touchstart', function (event) {
  if (event.touches.length > 1) {
    event.preventDefault(); // Prevents zooming
  }
}, { passive: false });