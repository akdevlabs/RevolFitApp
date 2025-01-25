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


console.log(lastEvaluation)



  // userInfo
  const age = userInfo.age; // Age as a number
  const gender = userInfo.genero; // Gender as a string



  // lastEvaluation
  const Weight = lastEvaluation.peso

  const waist  = lastEvaluation.cintura;
  const neck   = lastEvaluation.cuello; 
  const weight = lastEvaluation.peso; 
  const height = lastEvaluation.altura;
  const hip    = lastEvaluation.cadera;  
  const knee   = lastEvaluation.rodilla;  

  
 
 
  const restingHR = 60; // bpm



 
  const drinksPerWeek = lastEvaluation.frecuenciaBebe; // Example input
  const cigarettesPerDay = lastEvaluation.frecuenciaFuma; // Example input
  const smokingYears = lastEvaluation.añosFumando; // Example input
  const frequency = lastEvaluation. frecuenciaEjercicio

  const intensity = "moderate"; // Example: moderate intensity


  

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
                { threshold: 12, classification: 'Excelente', score: 9 },
                { threshold: 13, classification: 'Buena', score: 8.36 },
                { threshold: 14, classification: 'Buena', score: 7.71 },
                { threshold: 15, classification: 'Buena', score: 7.07 },
                { threshold: 16, classification: 'Media', score: 6.43 },
                { threshold: 17, classification: 'Media', score: 5.79 },
                { threshold: 18, classification: 'Media', score: 5.14 },
                { threshold: 19, classification: 'Media', score: 4.5 },
                { threshold: 20, classification: 'Media', score: 3.86 },
                { threshold: 21, classification: 'Media', score: 3.21 },
                { threshold: 22, classification: 'Regular', score: 2.57 },
                { threshold: 23, classification: 'Regular', score: 1.93 },
                { threshold: 24, classification: 'Regular', score: 1.29 },
                { threshold: 25, classification: 'Regular', score: 0.64 },
                { threshold: Infinity, classification: 'Mala', score: 0 }
            ],
            female: [
                { threshold: 17, classification: 'Excelente', score: 9 },
                { threshold: 18, classification: 'Buena', score: 8.47 },
                { threshold: 19, classification: 'Buena', score: 7.94 },
                { threshold: 20, classification: 'Buena', score: 7.41 },
                { threshold: 21, classification: 'Buena', score: 6.88 },
                { threshold: 22, classification: 'Media', score: 6.35 },
                { threshold: 23, classification: 'Media', score: 5.82 },
                { threshold: 24, classification: 'Media', score: 5.29 },
                { threshold: 25, classification: 'Media', score: 4.76 },
                { threshold: 26, classification: 'Media', score: 4.23 },
                { threshold: 27, classification: 'Media', score: 3.71 },
                { threshold: 28, classification: 'Media', score: 3.18 },
                { threshold: 29, classification: 'Media', score: 2.65 },
                { threshold: 30, classification: 'Regular', score: 2.12 },
                { threshold: 31, classification: 'Regular', score: 1.59 },
                { threshold: 32, classification: 'Regular', score: 1.06 },
                { threshold: 33, classification: 'Regular', score: 0.53 },
                { threshold: Infinity, classification: 'Mala', score: 0 }
            ]
        },
        '20-29': {
            male: [
                { threshold: 11, classification: 'Excelente', score: 9 },
                { threshold: 12, classification: 'Buena', score: 8.36 },
                { threshold: 13, classification: 'Buena', score: 7.71 },
                { threshold: 14, classification: 'Buena', score: 7.07 },
                { threshold: 15, classification: 'Media', score: 6.43 },
                { threshold: 16, classification: 'Media', score: 5.79 },
                { threshold: 17, classification: 'Media', score: 5.14 },
                { threshold: 18, classification: 'Media', score: 4.5 },
                { threshold: 19, classification: 'Media', score: 3.86 },
                { threshold: 20, classification: 'Media', score: 3.21 },
                { threshold: 21, classification: 'Regular', score: 2.57 },
                { threshold: 22, classification: 'Regular', score: 1.93 },
                { threshold: 23, classification: 'Regular', score: 1.29 },
                { threshold: 24, classification: 'Regular', score: 0.64 },
                { threshold: Infinity, classification: 'Mala', score: 0 }
            ],
            Female: [
                { threshold: 16, classification: 'Excelente', score: 9 },
                { threshold: 17, classification: 'Buena', score: 8.47 },
                { threshold: 18, classification: 'Buena', score: 7.94 },
                { threshold: 19, classification: 'Buena', score: 7.41 },
                { threshold: 20, classification: 'Buena', score: 6.88 },
                { threshold: 21, classification: 'Media', score: 6.35 },
                { threshold: 22, classification: 'Media', score: 5.82 },
                { threshold: 23, classification: 'Media', score: 5.29 },
                { threshold: 24, classification: 'Media', score: 4.76 },
                { threshold: 25, classification: 'Media', score: 4.23 },
                { threshold: 26, classification: 'Media', score: 3.71 },
                { threshold: 27, classification: 'Media', score: 3.18 },
                { threshold: 28, classification: 'Media', score: 2.65 },
                { threshold: 29, classification: 'Regular', score: 2.12 },
                { threshold: 30, classification: 'Regular', score: 1.59 },
                { threshold: 31, classification: 'Regular', score: 1.06 },
                { threshold: Infinity, classification: 'Mala', score: 0 }
            ]
        },
        '30-39': {
        male: [
            { threshold: 12, classification: 'Excelente', score: 9 },
            { threshold: 13, classification: 'Buena', score: 8.36 },
            { threshold: 14, classification: 'Buena', score: 7.71 },
            { threshold: 15, classification: 'Buena', score: 7.07 },
            { threshold: 16, classification: 'Media', score: 6.43 },
            { threshold: 17, classification: 'Media', score: 5.79 },
            { threshold: 18, classification: 'Media', score: 5.14 },
            { threshold: 19, classification: 'Media', score: 4.5 },
            { threshold: 20, classification: 'Media', score: 3.86 },
            { threshold: 21, classification: 'Media', score: 3.21 },
            { threshold: 22, classification: 'Regular', score: 2.57 },
            { threshold: 23, classification: 'Regular', score: 1.93 },
            { threshold: 24, classification: 'Regular', score: 1.29 },
            { threshold: Infinity, classification: 'Mala', score: 0 }
        ],
        female: [
            { threshold: 17, classification: 'Excelente', score: 9 },
            { threshold: 18, classification: 'Buena', score: 8.47 },
            { threshold: 19, classification: 'Buena', score: 7.94 },
            { threshold: 20, classification: 'Buena', score: 7.41 },
            { threshold: 21, classification: 'Buena', score: 6.88 },
            { threshold: 22, classification: 'Media', score: 6.35 },
            { threshold: 23, classification: 'Media', score: 5.82 },
            { threshold: 24, classification: 'Media', score: 5.29 },
            { threshold: 25, classification: 'Media', score: 4.76 },
            { threshold: 26, classification: 'Media', score: 4.23 },
            { threshold: 27, classification: 'Media', score: 3.71 },
            { threshold: 28, classification: 'Media', score: 3.18 },
            { threshold: 29, classification: 'Media', score: 2.65 },
            { threshold: 30, classification: 'Regular', score: 2.12 },
            { threshold: 31, classification: 'Regular', score: 1.59 },
            { threshold: 32, classification: 'Regular', score: 1.06 },
            { threshold: Infinity, classification: 'Mala', score: 0 }
        ]
        },
        '40-49': {
        male: [
            { threshold: 14, classification: 'Excelente', score: 9 },
            { threshold: 15, classification: 'Buena', score: 8.36 },
            { threshold: 16, classification: 'Buena', score: 7.71 },
            { threshold: 17, classification: 'Buena', score: 7.07 },
            { threshold: 18, classification: 'Media', score: 6.43 },
            { threshold: 19, classification: 'Media', score: 5.79 },
            { threshold: 20, classification: 'Media', score: 5.14 },
            { threshold: 21, classification: 'Media', score: 4.5 },
            { threshold: 22, classification: 'Media', score: 3.86 },
            { threshold: 23, classification: 'Media', score: 3.21 },
            { threshold: 24, classification: 'Regular', score: 2.57 },
            { threshold: 25, classification: 'Regular', score: 1.93 },
            { threshold: 26, classification: 'Regular', score: 1.29 },
            { threshold: Infinity, classification: 'Mala', score: 0 }
        ],
        female: [
            { threshold: 18, classification: 'Excelente', score: 9 },
            { threshold: 19, classification: 'Buena', score: 8.47 },
            { threshold: 20, classification: 'Buena', score: 7.94 },
            { threshold: 21, classification: 'Buena', score: 7.41 },
            { threshold: 22, classification: 'Buena', score: 6.88 },
            { threshold: 23, classification: 'Media', score: 6.35 },
            { threshold: 24, classification: 'Media', score: 5.82 },
            { threshold: 25, classification: 'Media', score: 5.29 },
            { threshold: 26, classification: 'Media', score: 4.76 },
            { threshold: 27, classification: 'Media', score: 4.23 },
            { threshold: 28, classification: 'Media', score: 3.71 },
            { threshold: 29, classification: 'Media', score: 3.18 },
            { threshold: 30, classification: 'Media', score: 2.65 },
            { threshold: 31, classification: 'Regular', score: 2.12 },
            { threshold: 32, classification: 'Regular', score: 1.59 },
            { threshold: 33, classification: 'Regular', score: 1.06 },
            { threshold: Infinity, classification: 'Mala', score: 0 }
        ]
        },
        '50-59': {
          male: [
              { threshold: 15, classification: 'Excelente', score: 9 },
              { threshold: 16, classification: 'Buena', score: 8.36 },
              { threshold: 17, classification: 'Buena', score: 7.71 },
              { threshold: 18, classification: 'Buena', score: 7.07 },
              { threshold: 19, classification: 'Media', score: 6.43 },
              { threshold: 20, classification: 'Media', score: 5.79 },
              { threshold: 21, classification: 'Media', score: 5.14 },
              { threshold: 22, classification: 'Media', score: 4.5 },
              { threshold: 23, classification: 'Media', score: 3.86 },
              { threshold: 24, classification: 'Media', score: 3.21 },
              { threshold: 25, classification: 'Regular', score: 2.57 },
              { threshold: 26, classification: 'Regular', score: 1.93 },
              { threshold: 27, classification: 'Regular', score: 1.29 },
              { threshold: Infinity, classification: 'Mala', score: 0 }
          ],
          female: [
              { threshold: 19, classification: 'Excelente', score: 9 },
              { threshold: 20, classification: 'Buena', score: 8.47 },
              { threshold: 21, classification: 'Buena', score: 7.94 },
              { threshold: 22, classification: 'Buena', score: 7.41 },
              { threshold: 23, classification: 'Media', score: 6.88 },
              { threshold: 24, classification: 'Media', score: 6.35 },
              { threshold: 25, classification: 'Media', score: 5.82 },
              { threshold: 26, classification: 'Media', score: 5.29 },
              { threshold: 27, classification: 'Media', score: 4.76 },
              { threshold: 28, classification: 'Media', score: 4.23 },
              { threshold: 29, classification: 'Media', score: 3.71 },
              { threshold: 30, classification: 'Media', score: 3.18 },
              { threshold: 31, classification: 'Media', score: 2.65 },
              { threshold: 32, classification: 'Regular', score: 2.12 },
              { threshold: 33, classification: 'Regular', score: 1.59 },
              { threshold: 34, classification: 'Regular', score: 1.06 },
              { threshold: Infinity, classification: 'Mala', score: 0 }
          ]
        },
        '60+': {
        male: [
            { threshold: 16, classification: 'Excelente', score: 9 },
            { threshold: 17, classification: 'Buena', score: 8.36 },
            { threshold: 18, classification: 'Buena', score: 7.71 },
            { threshold: 19, classification: 'Buena', score: 7.07 },
            { threshold: 20, classification: 'Media', score: 6.43 },
            { threshold: 21, classification: 'Media', score: 5.79 },
            { threshold: 22, classification: 'Media', score: 5.14 },
            { threshold: 23, classification: 'Media', score: 4.5 },
            { threshold: 24, classification: 'Media', score: 3.86 },
            { threshold: 25, classification: 'Media', score: 3.21 },
            { threshold: 26, classification: 'Regular', score: 2.57 },
            { threshold: 27, classification: 'Regular', score: 1.93 },
            { threshold: 28, classification: 'Regular', score: 1.29 },
            { threshold: Infinity, classification: 'Mala', score: 0 }
        ],
        female: [
            { threshold: 20, classification: 'Excelente', score: 9 },
            { threshold: 21, classification: 'Buena', score: 8.47 },
            { threshold: 22, classification: 'Buena', score: 7.94 },
            { threshold: 23, classification: 'Buena', score: 7.41 },
            { threshold: 24, classification: 'Media', score: 6.88 },
            { threshold: 25, classification: 'Media', score: 6.35 },
            { threshold: 26, classification: 'Media', score: 5.82 },
            { threshold: 27, classification: 'Media', score: 5.29 },
            { threshold: 28, classification: 'Media', score: 4.76 },
            { threshold: 29, classification: 'Media', score: 4.23 },
            { threshold: 30, classification: 'Media', score: 3.71 },
            { threshold: 31, classification: 'Media', score: 3.18 },
            { threshold: 32, classification: 'Media', score: 2.65 },
            { threshold: 33, classification: 'Regular', score: 2.12 },
            { threshold: 34, classification: 'Regular', score: 1.59 },
            { threshold: 35, classification: 'Regular', score: 1.06 },
            { threshold: Infinity, classification: 'Mala', score: 0 }
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

    // Calculate residual mass as a percentage
    const residualMassPercentage = (residualMassKg * CONSTANT2) / weightKg;

    // Return the results as an object
    return {
        residualMassKg: residualMassKg.toFixed(3), // Rounded to 3 decimal places
        residualMassPercentage: residualMassPercentage.toFixed(1), // Rounded to 1 decimal place
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
  function calculateBoneMass({ weight, heightCm, wristCircumference, kneeCircumference }) {
    // Constants
    const R = 3.02; // Constant 1
    const S = 100;  // Factor divisor for "C"
    const AD = 400; // Constant 2
    const AF = 0.712; // Constant for final power calculation

    // Derived values
    const heightMeters = heightCm / S; // Height in meters (AG)
    const T = Math.pow(heightMeters, 2); // AG squared (height factor)
    const V = wristCircumference; // Wrist circumference (V)
    const W = 0.38; // Factor for wrist circumference
    const X = kneeCircumference; // Knee circumference (X)
    const Y = 0.23; // Factor for knee circumference

    // Calculations
    const Z = V * W; // Z = V * W
    const AA = X * Y; // AA = X * Y
    const AB = Z / S; // AB = Z / 100
    const AC = AA / S; // AC = AA / 100
    const AH = R * (T * AB * AC * AD); // AH = R * (T * AB * AC * AD)
    const boneMassKg = Math.pow(AH, AF); // Bone mass in kg = AH ^ AF
    const boneMassPercentage = (boneMassKg / weight) * 100; // Bone mass percentage

    // Return results
    return {
      boneMassKg: boneMassKg.toFixed(2),
      boneMassPercentage: boneMassPercentage.toFixed(2)
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
    const weightPower = Math.pow(weightKg, AK); // "P" raised to "AK"
    const skinMass = AI * heightPower * weightPower; // Mass of skin (kg)
    const skinMassPercentage = (skinMass / weightKg) * 100; // Skin mass percentage
  
    // Return the results
    return {
      skinMassKg: skinMass.toFixed(6),
      skinMassPercentage: skinMassPercentage.toFixed(6)
    };
  }
  function calculateBodyMetricsForGender(data) {
    const {
      totalWeight,
      fatKg,
      residualKg,
      boneKg,
      skinKg,
    } = data;
  
    // Calculate muscle weight
    const muscleWeight = totalWeight - (fatKg + residualKg + boneKg + skinKg);
  
    return {
      totalWeight,
      fatKg,
      fatPercentage: ((fatKg / totalWeight) * 100).toFixed(2),
      residualKg,
      residualPercentage: ((residualKg / totalWeight) * 100).toFixed(2),
      boneKg,
      bonePercentage: ((boneKg / totalWeight) * 100).toFixed(2),
      skinKg,
      skinPercentage: ((skinKg / totalWeight) * 100).toFixed(2),
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
            { max: 50, score: 9, classification: "High" }
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
      { max: Infinity, score: 9, activityLevel: "Very High" }
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


















function renderReport(gender, waist, neck, height, weight, age, hip, knee, restingHR, frequency, intensity, smokingYears, cigarettesPerDay, drinksPerWeek) {
  let reportContent = "";

  if (gender === "Male") {
    const calculateBodyFatMen = calculateBodyFatForMen(waist, neck, height, weight);
    reportContent += `<p>Body Fat Percentage: ${calculateBodyFatMen.bodyFatPercentage}%</p>`;
    reportContent += `<p>Fat Weight: ${calculateBodyFatMen.fatWeightKg} kg</p>`;

    const scoring = getScoring(age, gender, calculateBodyFatMen.bodyFatPercentage);
    reportContent += `<p>Scoring: ${scoring}</p>`;

    const residualMass = calculateResidualMassMale(weight);
    reportContent += `<p>Residual Mass (kg): ${residualMass.residualMassKg}</p>`;
    reportContent += `<p>Residual Mass (%): ${residualMass.residualMassPercentage}</p>`;

    const boneMass = calculateBoneMass({ weight, height, waist, knee });
    reportContent += `<p>Bone Mass in Kilograms: ${boneMass.boneMassKg}</p>`;
    reportContent += `<p>Bone Mass Percentage: ${boneMass.boneMassPercentage}</p>`;

    const skinMass = calculateSkinMassMale(height, weight);
    reportContent += `<p>Skin Mass (kg): ${skinMass.skinMassKg}</p>`;
    reportContent += `<p>Skin Mass (%): ${skinMass.skinMassPercentage}</p>`;

    const maleData = {
      weight,
      fatKg: calculateBodyFatMen.bodyFatPercentage,
      residualKg: residualMass.residualMassKg,
      boneKg: boneMass.boneMassKg,
      skinKg: skinMass.skinMassKg,
    };

    const maleMetrics = calculateBodyMetricsForGender(maleData);
    reportContent += `<p>Male Metrics: ${JSON.stringify(maleMetrics)}</p>`;

    const cResult = calculateWaistCircumferenceScore(waist, gender);
    reportContent += `<p>Score1: ${cResult.score}, Classification: ${cResult.classification}</p>`;

    // Additional data
    const Hresult = calculateHeartRateZones(age, restingHR);
    reportContent += `<p>Max HR: ${Hresult.maxHR} bpm</p>`;
    reportContent += `<p>Heart Rate Zones:</p>`;
    reportContent += `<p>Recovery Zone: ${Hresult.zones.Recovery.min}–${Hresult.zones.Recovery.max} bpm</p>`;
    reportContent += `<p>Aerobic Zone: ${Hresult.zones.Aerobic.min}–${Hresult.zones.Aerobic.max} bpm</p>`;
    reportContent += `<p>Anaerobic Zone: ${Hresult.zones.Anaerobic.min}–${Hresult.zones.Anaerobic.max} bpm</p>`;
    reportContent += `<p>Maximum Effort Zone: ${Hresult.zones.MaxEffort.min}–${Hresult.zones.MaxEffort.max} bpm</p>`;

    const metabolicAge = calculateMetabolicAge(weight, height, age, gender);
    reportContent += `<p>Metabolic Age: ${metabolicAge} years</p>`;

    const ExerciseScore = calculateExerciseScore(frequency, intensity);
    reportContent += `<p>Score: ${ExerciseScore.score}, Activity Level: ${ExerciseScore.activityLevel}</p>`;

    const resultWithPackYears = calculateSmokingScoreWithPackYears(10, smokingYears);
    reportContent += `<p>Score: ${resultWithPackYears.score}, Risk Level: ${resultWithPackYears.riskLevel}, Pack-Years: ${resultWithPackYears.packYears}</p>`;

    const Presult = calculateSmokingScore(cigarettesPerDay);
    reportContent += `<p>Score: ${Presult.score}, Risk Level: ${Presult.riskLevel}</p>`;

    const Dresult = calculateAlcoholScore(drinksPerWeek);
    reportContent += `<p>Score: ${Dresult.score}, Risk Level: ${Dresult.riskLevel}</p>`;

  } else if (gender === "Female") {
    const bodyFat = calculateBodyFatForWomen(waist, neck, height, hip, weight);
    reportContent += `<p>Body Fat Percentage: ${bodyFat.bodyFatPercentage}%</p>`;
    reportContent += `<p>Fat Weight: ${bodyFat.fatWeightKg} kg</p>`;

    const scoring = getScoring(age, gender, bodyFat.bodyFatPercentage);
    reportContent += `<p>Scoring: ${scoring}</p>`;

    const residualMass = calculateResidualMassWomen(weight);
    reportContent += `<p>Residual Mass (kg): ${residualMass.residualMassKg}</p>`;
    reportContent += `<p>Residual Mass (%): ${residualMass.residualMassPercentage}</p>`;

    const boneMass = calculateBoneMass({ weight, height, waist, knee });
    reportContent += `<p>Bone Mass in Kilograms: ${boneMass.boneMassKg}</p>`;
    reportContent += `<p>Bone Mass Percentage: ${boneMass.boneMassPercentage}</p>`;

    const skinMass = calculateSkinMassForWomen(height, weight);
    reportContent += `<p>Skin Mass (kg): ${skinMass.skinMassKg}</p>`;
    reportContent += `<p>Skin Mass (%): ${skinMass.skinMassPercentage}</p>`;

    const femaleData = {
      weight,
      fatKg: bodyFat.bodyFatPercentage,
      residualKg: residualMass.residualMassKg,
      boneKg: boneMass.boneMassKg,
      skinKg: skinMass.skinMassKg,
    };

    const femaleMetrics = calculateBodyMetricsForGender(femaleData);
    reportContent += `<p>Female Metrics: ${JSON.stringify(femaleMetrics)}</p>`;

    const cResult = calculateWaistCircumferenceScore(waist, gender);
    reportContent += `<p>Score1: ${cResult.score}, Classification: ${cResult.classification}</p>`;

    // Additional data
    const Hresult = calculateHeartRateZones(age, restingHR);
    reportContent += `<p>Max HR: ${Hresult.maxHR} bpm</p>`;
    reportContent += `<p>Heart Rate Zones:</p>`;
    reportContent += `<p>Recovery Zone: ${Hresult.zones.Recovery.min}–${Hresult.zones.Recovery.max} bpm</p>`;
    reportContent += `<p>Aerobic Zone: ${Hresult.zones.Aerobic.min}–${Hresult.zones.Aerobic.max} bpm</p>`;
    reportContent += `<p>Anaerobic Zone: ${Hresult.zones.Anaerobic.min}–${Hresult.zones.Anaerobic.max} bpm</p>`;
    reportContent += `<p>Maximum Effort Zone: ${Hresult.zones.MaxEffort.min}–${Hresult.zones.MaxEffort.max} bpm</p>`;

    const metabolicAge = calculateMetabolicAge(weight, height, age, gender);
    reportContent += `<p>Metabolic Age: ${metabolicAge} years</p>`;

    const ExerciseScore = calculateExerciseScore(frequency, intensity);
    reportContent += `<p>Score: ${ExerciseScore.score}, Activity Level: ${ExerciseScore.activityLevel}</p>`;

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
renderReport(gender, waist, neck, height, weight, age, hip, knee, restingHR, frequency, intensity, smokingYears, cigarettesPerDay, drinksPerWeek);






});

  document.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
      event.preventDefault(); // Prevents zooming
    }
  }, { passive: false });
























document.addEventListener('touchstart', function (event) {
  if (event.touches.length > 1) {
    event.preventDefault(); // Prevents zooming
  }
}, { passive: false });
