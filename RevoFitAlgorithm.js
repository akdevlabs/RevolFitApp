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

function bodyFat(){


    /**
 * Classifies and scores body fat percentage based on age, gender, and ranges.
 * @param {number} age - The age of the person.
 * @param {string} gender - The gender of the person ("Male" or "Female").
 * @param {number} bodyFat - The body fat percentage.
 * @returns {object} - Classification, scoring, and metabolic protection.
 */
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
              { max: 23, classification: "Good", scoring: 7.71439, metabolicProtection: 0.857154 }
              // Add additional ranges
          ]
      },
      female: {
          "13-19": [
              { max: 17, classification: "Excellent", scoring: 9, metabolicProtection: 1 },
              { max: 18, classification: "Good", scoring: 8.4705, metabolicProtection: 0.941167 },
              { max: 19, classification: "Good", scoring: 7.941, metabolicProtection: 0.882333 }
              // Add additional ranges
          ],
          "60+": [
              { max: 25, classification: "Excellent", scoring: 9, metabolicProtection: 1 },
              { max: 26, classification: "Good", scoring: 8.4705, metabolicProtection: 0.941167 },
              { max: 27, classification: "Good", scoring: 7.941, metabolicProtection: 0.882333 }
              // Add additional ranges
          ]
      }
  };

  const ageGroup = age <= 19 ? "13-19" : "60+";
  const genderKey = gender.toLowerCase();

  if (!ranges[genderKey] || !ranges[genderKey][ageGroup]) {
      return { error: "No classification found for the given inputs." };
  }

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

} 

function residualMass(){
/**
 * Calculates residual mass (in Kg) based on body weight and a residual percentage.
 * @param {number} bodyWeight - The total body weight in kilograms.
 * @param {number} residualPercentage - The percentage of residual mass (as a decimal).
 * @returns {number} - The residual mass in kilograms.
 */
function calculateResidualMass(bodyWeight, residualPercentage) {
  if (bodyWeight <= 0 || residualPercentage < 0) {
      throw new Error("Invalid inputs: Body weight must be greater than 0 and residual percentage cannot be negative.");
  }

  return bodyWeight * residualPercentage;
}

// Example usage:
const bodyWeight = 70; // kg
const residualPercentage = 0.241; // Example: 24.1%
const residualMass = calculateResidualMass(bodyWeight, residualPercentage);

console.log(`Residual Mass: ${residualMass.toFixed(2)} kg`);

}

function boneMass(){
/**
 * Calculates bone mass (in Kg) based on weight, height, and gender.
 * @param {number} weight - The weight of the person in kilograms.
 * @param {number} height - The height of the person in meters.
 * @param {string} gender - The gender of the person ("Male" or "Female").
 * @returns {number} - The estimated bone mass in kilograms.
 */
function calculateBoneMass(weight, height, gender) {
  // Gender-specific coefficients (example values)
  const coefficients = {
      Male: 0.2,   // Example coefficient for males
      Female: 0.17 // Example coefficient for females
  };

  if (weight <= 0 || height <= 0) {
      throw new Error("Invalid inputs: Weight and height must be greater than 0.");
  }

  if (!coefficients[gender]) {
      throw new Error("Invalid gender: Please specify 'Male' or 'Female'.");
  }

  const coefficient = coefficients[gender];
  const boneMass = coefficient * weight * height;

  return boneMass;
}

// Example usage:
const weight = 70; // kg
const height = 1.75; // meters
const gender = "Male"; // or "Female"
const boneMass = calculateBoneMass(weight, height, gender);

console.log(`Bone Mass: ${boneMass.toFixed(2)} kg`);

}

function calculateMasaOsea(estatura, diametroBiestiloideo, diametroBiepicondileo) {
  // Calculate estatura squared
  const estaturaCuadrada = estatura ** 2;
  
  // Apply the formula
  const masaOsea = 3.02 * (estaturaCuadrada * diametroBiestiloideo * diametroBiepicondileo);
  
  return masaOsea;
}

function skinMass(){
/**
 * Calculates skin mass (in Kg) based on weight, height, and gender.
 * @param {number} weight - The weight of the person in kilograms.
 * @param {number} height - The height of the person in meters.
 * @param {string} gender - The gender of the person ("Male" or "Female").
 * @returns {number} - The estimated skin mass in kilograms.
 */
function calculateSkinMass(weight, height, gender) {
    // Gender-specific coefficients (example values)
    const coefficients = {
        Male: 0.15,   // Example coefficient for males
        Female: 0.14  // Example coefficient for females
    };

    if (weight <= 0 || height <= 0) {
        throw new Error("Invalid inputs: Weight and height must be greater than 0.");
    }

    if (!coefficients[gender]) {
        throw new Error("Invalid gender: Please specify 'Male' or 'Female'.");
    }

    const coefficient = coefficients[gender];
    const skinMass = coefficient * weight * height;

    return skinMass;
}

// Example usage:
const weight = 70; // kg
const height = 1.75; // meters
const gender = "Male"; // or "Female"
const skinMass = calculateSkinMass(weight, height, gender);

console.log(`Skin Mass: ${skinMass.toFixed(2)} kg`);


}

function muscleMass(){
/**
 * Calculates muscle mass and assigns a score based on predefined ranges.
 * @param {number} weight - The weight of the person in kilograms.
 * @param {number} bodyFat - The body fat mass in kilograms.
 * @param {string} gender - The gender of the person ("Male" or "Female").
 * @returns {object} - The muscle mass and corresponding score.
 */
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

// Example usage:
const weight = 70; // kg
const bodyFat = 15; // kg
const gender = "Male"; // or "Female"
const result = calculateMuscleMassAndScore(weight, bodyFat, gender);

console.log(`Muscle Mass: ${result.muscleMass} kg, Score: ${result.score}, Classification: ${result.classification}`);
}

function waistCircumference(){
    /**
 * Calculates the scoring and classification based on waist circumference.
 * @param {number} waistCircumference - The waist circumference in centimeters.
 * @param {string} gender - The gender of the person ("Male" or "Female").
 * @returns {object} - The score and classification.
 */
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

// Example usage:
const waistCircumference = 85; // cm
const gender = "Male"; // or "Female"
const result = calculateWaistCircumferenceScore(waistCircumference, gender);

console.log(`Score: ${result.score}, Classification: ${result.classification}`);

}











/**
 * Calculates oxygen consumption and assigns a score based on predefined ranges.
 * @param {number} distance - The distance covered in meters.
 * @param {number} time - The time taken in minutes.
 * @param {number} weight - The weight of the person in kilograms.
 * @param {string} gender - The gender of the person ("Male" or "Female").
 * @returns {object} - The oxygen consumption and corresponding score.
 */
function calculateOxygenConsumption(distance, time, weight, gender) {
    // Gender-specific coefficients for oxygen consumption (example values)
    const coefficients = {
        Male: 0.2,   // Example coefficient for males
        Female: 0.18 // Example coefficient for females
    };

    // Scoring ranges (example thresholds)
    const scoringRanges = [
        { max: 25, score: 3, classification: "Low" },
        { max: 35, score: 5, classification: "Moderate" },
        { max: 50, score: 7, classification: "Good" },
        { max: Infinity, score: 9, classification: "Excellent" }
    ];

    if (distance <= 0 || time <= 0 || weight <= 0) {
        throw new Error("Invalid inputs: Distance, time, and weight must be greater than 0.");
    }

    if (!coefficients[gender]) {
        throw new Error("Invalid gender: Please specify 'Male' or 'Female'.");
    }

    // Calculate oxygen consumption (VO2 max)
    const coefficient = coefficients[gender];
    const oxygenConsumption = coefficient * (distance / time) * weight;

    // Determine score based on ranges
    let scoreDetails = { score: 0, classification: "Unknown" };

    for (const range of scoringRanges) {
        if (oxygenConsumption <= range.max) {
            scoreDetails = { score: range.score, classification: range.classification };
            break;
        }
    }

    return {
        oxygenConsumption: oxygenConsumption.toFixed(2),
        ...scoreDetails
    };
}

// Example usage:
const distance = 2000; // meters
const time = 10; // minutes
const weight = 70; // kg
const gender = "Male"; // or "Female"
const result = calculateOxygenConsumption(distance, time, weight, gender);

console.log(`Oxygen Consumption: ${result.oxygenConsumption} ml/kg/min, Score: ${result.score}, Classification: ${result.classification}`);







/**
 * Calculates the blood pressure score based on systolic and diastolic values.
 * @param {number} systolic - The systolic blood pressure in mmHg.
 * @param {number} diastolic - The diastolic blood pressure in mmHg.
 * @returns {object} - The blood pressure category, score, and classification.
 */
function calculateBloodPressureScore(systolic, diastolic) {
    // Blood pressure ranges and scores
    const scoringRanges = [
        { systolicMax: 119, diastolicMax: 79, score: 9, classification: "Normal" },
        { systolicMax: 129, diastolicMax: 79, score: 7, classification: "Elevated" },
        { systolicMax: 139, diastolicMax: 89, score: 5, classification: "Hypertension Stage 1" },
        { systolicMax: Infinity, diastolicMax: Infinity, score: 3, classification: "Hypertension Stage 2" },
        { systolicMin: 180, diastolicMin: 120, score: 1, classification: "Hypertensive Crisis" }
    ];

    if (systolic <= 0 || diastolic <= 0) {
        throw new Error("Invalid inputs: Systolic and diastolic values must be greater than 0.");
    }

    // Determine the category and score
    for (const range of scoringRanges) {
        const isInCrisis = systolic >= (range.systolicMin || 0) && diastolic >= (range.diastolicMin || 0);
        const isInRange =
            systolic <= range.systolicMax &&
            diastolic <= range.diastolicMax;

        if (isInRange || isInCrisis) {
            return {
                score: range.score,
                classification: range.classification
            };
        }
    }

    // Default if no range matches
    return {
        score: 0,
        classification: "Unknown"
    };
}

// Example usage:
const systolic = 125; // mmHg
const diastolic = 85; // mmHg
const result = calculateBloodPressureScore(systolic, diastolic);

console.log(`Score: ${result.score}, Classification: ${result.classification}`);




/**
 * Calculates heart rate training zones based on age and resting heart rate.
 * @param {number} age - The age of the individual.
 * @param {number} restingHR - The resting heart rate of the individual.
 * @returns {object} - The calculated heart rate zones.
 */
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

// Example usage:
const age = 30; // years
const restingHR = 60; // bpm
const result = calculateHeartRateZones(age, restingHR);

console.log(`Max HR: ${result.maxHR} bpm`);
console.log("Heart Rate Zones:");
console.log(`Recovery Zone: ${result.zones.Recovery.min}–${result.zones.Recovery.max} bpm`);
console.log(`Aerobic Zone: ${result.zones.Aerobic.min}–${result.zones.Aerobic.max} bpm`);
console.log(`Anaerobic Zone: ${result.zones.Anaerobic.min}–${result.zones.Anaerobic.max} bpm`);
console.log(`Maximum Effort Zone: ${result.zones.MaxEffort.min}–${result.zones.MaxEffort.max} bpm`);










/**
 * Calculates the alcohol consumption score based on drinks per week.
 * @param {number} drinksPerWeek - The number of alcoholic drinks consumed per week.
 * @returns {object} - The alcohol consumption score and risk level.
 */
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

// Example usage:
const drinksPerWeek = 5; // Example input
const result = calculateAlcoholScore(drinksPerWeek);

console.log(`Score: ${result.score}, Risk Level: ${result.riskLevel}`);








/**
 * Calculates the smoking score based on cigarettes smoked per day.
 * @param {number} cigarettesPerDay - Number of cigarettes smoked daily.
 * @returns {object} - The smoking score and risk level.
 */
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

// Example usage:
const cigarettesPerDay = 10; // Example input
const result = calculateSmokingScore(cigarettesPerDay);

console.log(`Score: ${result.score}, Risk Level: ${result.riskLevel}`);



/**
 * Calculates smoking score and pack-years based on cigarettes smoked daily and smoking years.
 * @param {number} cigarettesPerDay - Number of cigarettes smoked daily.
 * @param {number} smokingYears - Number of years the individual has smoked.
 * @returns {object} - The smoking score, risk level, and pack-years.
 */
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

// Example usage:
const smokingYears = 10; // Example input
const resultWithPackYears = calculateSmokingScoreWithPackYears(10, smokingYears);

console.log(`Score: ${resultWithPackYears.score}, Risk Level: ${resultWithPackYears.riskLevel}, Pack-Years: ${resultWithPackYears.packYears}`);



/**
 * Calculates the exercise score based on weekly frequency and activity intensity.
 * @param {number} frequency - The number of exercise sessions per week.
 * @param {string} intensity - The intensity of the activity ("low", "moderate", "high").
 * @returns {object} - The exercise score and activity level.
 */
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

// Example usage:
const frequency = 3; // Example: 3 times per week
const intensity = "moderate"; // Example: moderate intensity
const result = calculateExerciseScore(frequency, intensity);

console.log(`Score: ${result.score}, Activity Level: ${result.activityLevel}`);




/**
 * Calculates the metabolic age based on BMR and chronological age.
 * @param {number} weight - The weight of the individual in kilograms.
 * @param {number} height - The height of the individual in centimeters.
 * @param {number} age - The chronological age of the individual.
 * @param {string} gender - The gender of the individual ("male" or "female").
 * @returns {number} - The estimated metabolic age.
 */
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

// Example usage:
const weight = 70; // kg
const height = 175; // cm
const age = 30; // years
const gender = "male"; // "male" or "female"

const metabolicAge = calculateMetabolicAge(weight, height, age, gender);

console.log(`Metabolic Age: ${metabolicAge} years`);

