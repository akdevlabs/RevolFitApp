// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

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

async function getDataAppIntro() {
  try {
    // Reference a document in the "revoFitweb" collection with ID "landing"
    const docRef = doc(db, 'RevolApp', 'userDefault');
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
getDataAppIntro().then((data) => {
  const AppIntroValue = data.popup; // Retrieve nested data

  // Access title, subtitle, background image, and logo
  const Subtitle = AppIntroValue.Subtittle;
  const title = AppIntroValue.tittle;
  const backgroundImg = AppIntroValue.backgroundImg;
  const btnColor = AppIntroValue.btnColor; // Example for button text
  const logo = AppIntroValue.logo;   // Example for button link

  // Render the button border color
  function setButtonBorderColor(color) {
    const button = document.getElementById("pop-upBtn");
    button.style.border = `5px solid ${color}`; // Set the border color dynamically
    button.style.borderRadius = "5px"; // Optional: Add rounded corners
  }

  // Populate the button border color and other attributes
  setButtonBorderColor(btnColor);

  // Render the background image
  function renderImage(imageUrl) {
    const imgContainer = document.getElementById("pop-upImg");
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = "What We Offer Image";
    img.style.height = "auto"; 
    imgContainer.innerHTML = "";
    imgContainer.appendChild(img);
  }
  function renderLogo(imageUrl) {
    const imgContainer = document.getElementById("pop-upIcon");
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = "What We Offer Image";
    img.style.height = "auto"; 
    imgContainer.innerHTML = "";
    imgContainer.appendChild(img);
  }
  
  // Render title and subtitle
  function renderText(title, subtitle) {
    document.getElementById("tittle").textContent = title;
    document.getElementById("Subtittle").textContent = subtitle;
  }

  // Render button


  // Populate the elements
  renderImage(backgroundImg);
  renderText(title, Subtitle);
  renderLogo(logo);
  
});








function updateStatusBar() {
  const timeElement = document.getElementById('time');
  const batteryElement = document.getElementById('battery');

  // Update time
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  timeElement.textContent = timeString;

  // Simulate battery level (for demonstration purposes)
  const batteryLevel = Math.floor(Math.random() * 100) + 1;
  batteryElement.textContent = `🔋 ${batteryLevel}%`;

  // Update every minute
  setTimeout(updateStatusBar, 60000);
}

// Initialize the status bar
updateStatusBar();





