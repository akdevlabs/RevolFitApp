// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore, doc, getDoc, collection, addDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

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

async function getDataAppStart() {
  try {
    // Reference a document in the "revoFitweb" collection with ID "landing"
    const docRef = doc(db, 'RevolApp', 'DefaultUser');
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
async function getDataAppImgs() {
  try {
    // Reference a document in the "revoFitweb" collection with ID "landing"
    const docRef = doc(db, 'RevoBuissnes', 'RevolFit');
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
// Fetch and log the data
getDataAppStart().then((data) => {
  const AppIntroValue = data.Start; // Retrieve nested data
  const userImg = AppIntroValue.userImg; // Retrieve nested data
  // Store or retrieve first use date from Firestore or localStorage
  const firstUseDateKey = 'firstUseDate'; // Key for localStorage
  let firstUseDate = localStorage.getItem(firstUseDateKey); // Get first use date from localStorage

  // If no first use date is stored, set it to today
  if (!firstUseDate) {
    firstUseDate = new Date().toISOString().split('T')[0]; // Store only the date part (YYYY-MM-DD)
    localStorage.setItem(firstUseDateKey, firstUseDate); // Save first use date to localStorage
  }

  // Calculate streak in days or mark it as Day 1 for first use
  function calculateStreak() {
    const currentDate = new Date();
    const firstUse = new Date(firstUseDate);
    
    // If it's the first use, return "Day 1"
    if (firstUseDate === new Date().toISOString().split('T')[0]) {
      return "Day 1"; // If it's the same day as first use, it's Day 1
    }

    // Calculate the difference in time (in milliseconds) and convert it to days
    const timeDifference = currentDate - firstUse;
    const streakDays = Math.floor(timeDifference / (1000 * 3600 * 24)); // Convert ms to days
    return `Day ${streakDays + 1}`; // Add 1 to the streak day to match the first use as Day 1
  }

  // Function to render the streak
  function renderStreak() {
    const streakElement = document.getElementById('lastTime'); // Change ID to 'lastTime'
    const streak = calculateStreak();

    if (streakElement) {
      streakElement.textContent = `App streak: ${streak}`; // Render streak
    } else {
      console.log("Element with ID #lastTime not found in the DOM!");
    }
  }

  // Function to update timestamp in Firestore
  async function updateTimestampInFirestore() {
    try {
      const newTimestamp = new Date().toISOString(); // Generate a new timestamp
      
      // Update Firestore document
      const docRef = doc(db, "RevolApp", "DefaultUser");
      await setDoc(docRef, { LDOU: newTimestamp }, { merge: true });

      // Update `AppIntroValue.LDOU` locally
      AppIntroValue.LDOU = newTimestamp;

      console.log(`Timestamp ${newTimestamp} successfully updated in Firestore and locally.`);
    } catch (error) {
      console.error("Error updating timestamp in Firestore:", error);
    }
  }

  // Example array
  const items = AppIntroValue.frase;
  let currentIndex = 0; // Start index

  // Function to render one item from the array
  function renderNextItem() {
    const nameElement = document.getElementById('AppTittle');
    if (nameElement) {
      nameElement.innerHTML = ""; // Clear previous content

      // Check if the index is within bounds
      if (currentIndex < items.length) {
        const h1 = document.createElement("h1");
        h1.textContent = items[currentIndex]; // Display the current item
        nameElement.appendChild(h1); // Append new item
        currentIndex++; // Move to the next item
      } else {
        // Once items are finished, start from the beginning
        currentIndex = 0;
        renderNextItem(); // Recursively call to restart from the first item
      }
    } else {
      console.log("Element with ID #AppTittle not found in the DOM!");
    }
  }

  // Detect app usage and render first item immediately when the app becomes visible
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      updateTimestampInFirestore(); // Update Firestore and local value
      renderNextItem(); // Render next item or start from the first one
      renderStreak(); // Render streak whenever app is in use
    }
  });

  // Fetch and render user name, keeping it visible
  function FetchRenderUserName() {
    const name = AppIntroValue.name;

    // Create h2 element and set its content to title
    const h2 = document.createElement("h2");
    h2.textContent = `Hola ${name}`;

    const nameElement = document.getElementById('userName');
    if (nameElement) {
      nameElement.innerHTML = ""; // Clear previous content
      nameElement.appendChild(h2);
      nameElement.style.position = 'relative'; // Keeps the element in the DOM and visible
    } else {
      console.log("Element with ID #AppTittle not found in the DOM!");
    }
  }

  function renderImage(imageUrl) {
    const imgContainer = document.getElementById("userImg");
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = "What We Offer Image";
    img.style.height = "auto"; 
    imgContainer.innerHTML = "";
    imgContainer.appendChild(img);
  }



  renderImage(userImg)
  
  // Render the first item when the app first loads or when the page is activated
  renderNextItem();  // This renders the first item on initial load
  FetchRenderUserName();  // Render the user name and keep it visible
  renderStreak(); // Render streak on initial load
});

getDataAppImgs().then((data) => {
  const AppIntroValue = data.icon; // Retrieve nested data
  function renderImage(imageUrl) {
    const imgContainer = document.getElementById("Icon");
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = "What We Offer Image";
    img.style.height = "auto"; 
    imgContainer.innerHTML = "";
    imgContainer.appendChild(img);
  }
  renderImage(AppIntroValue)
});

