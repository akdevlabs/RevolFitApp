import { 
  initializeApp 
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import("https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js").then(({ initializeApp }) => {
  // Initialize Firebase here
});
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut 
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";

import { 
  getFirestore, 
  doc, 
  getDoc, 
  updateDoc, 
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

let db, auth; // Declare Firestore and Auth globally



// Fetch Firebase configuration
async function fetchFirebaseConfig() {
  try {
    console.log("Fetching Firebase config...");
    const response = await fetch("http://localhost:3000/firebase-config"); // Change when deploying
    if (!response.ok) throw new Error("Failed to fetch Firebase config");
    return await response.json();
  } catch (error) {
    console.error("Error fetching Firebase config:", error);
    return null;
  }
}

// Initialize Firestore and Auth
async function initializeFirebase() {
  if (db && auth) return; // Prevent duplicate initialization

  try {
    const firebaseConfig = await fetchFirebaseConfig();
    if (!firebaseConfig) throw new Error("Firebase config is undefined");

    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);

    console.log("Firestore and Auth initialized");

    await initializeFirestoreFunctions();
  } catch (error) {
    console.error("Error initializing Firebase:", error);
  }
}
// Wait for Firebase initialization
await initializeFirebase();




async function initializeFirestoreFunctions() {
  console.log("Initializing Firestore-related functions...");
  // Add any Firestore setup code here if needed.
}

const transferredInfo = localStorage.getItem("transferredBu");
console.log(transferredInfo)






async function checkDocumentExists(collectionName, documentId) {
  try {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log(`Document found:`, docSnap.data());
      return docSnap.data(); // Return the data if the document exists
    } else {
      console.log(`No document found with ID: ${documentId}`);
      return null; // Return null if the document doesn't exist
    }
  } catch (error) {
    console.error("Error checking document:", error);
    return null; // Return null in case of an error
  }
}

async function fetchFirestoreAppData() {
  try {
    const docRef = doc(db, "RevolApp", "Content"); // Ensure 'AppData' is the correct document ID
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No document found in 'RevolApp/AppData'");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document from 'RevolApp/AppData':", error);
    return null;
  }
}

async function applyBranding() {
  const data = await checkDocumentExists('RevoBuissnes', transferredInfo); // Ensure transferredInfo is defined and passed

  if (!data) {
    console.error("No data retrieved from Firestore.");
    return;
  }

  const { Base, Prime1, Prime2 } = data.UBU.Colors;
  const { top, bottom } = data.UBU.BackgroundColor;
  const BuLogo = data.UBU.BuLogos.LightLogo;

  const App = await fetchFirestoreAppData();
  if (!App) {
    console.error("Error fetching App data from Firestore.");
    return;
  }

  console.log(App);

  // Function to set the font family
  function GetBuFont(fontFamily) {
    document.body.style.fontFamily = fontFamily;
  }

  // Function to render images into containers
  function renderImages(imgId, imgAlt, imgName, imageUrl) {
    const imgContainer = document.getElementById(imgId);
    if (!imgContainer) {
      console.warn(`Container with ID '${imgId}' not found.`);
      return;
    }
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = imgAlt;
    img.style.height = "auto";
    img.id = imgName; // Optional ID for img element
    imgContainer.innerHTML = ""; // Clear previous content
    imgContainer.appendChild(img); // Add new image
  }

  // Function to set button colors
  function setBtnColors(Bcolor, color, textColor) {
    const button = document.getElementById("getPassword");
    if (button) {
      button.style.border = `5px solid ${Bcolor}`;
      button.style.borderRadius = "5px";
      button.style.backgroundColor = color;
      button.style.color = textColor;
    }
  }

  // Function to set button border color
  function setButtonBorderColor(color) {
    const button = document.getElementById("getPassword");
    if (button) {
      button.style.border = `5px solid ${color}`;
      button.style.color = color;
      button.style.borderRadius = "5px";
    }
  }

  // Function to set text colors
  function setTextColors(color) {
    const tittle = document.getElementById("FP");
    const text = document.getElementById("RYP");
    
    if (tittle) tittle.style.color = color;
    if (text) text.style.color = color;
  }

  // Function to set background gradient
  function setBackgroundGradient(color1, color2) {
    const button = document.getElementById("FPCB");
    if (button) {
      button.style.background = `linear-gradient(to bottom, ${color1}, ${color2})`;
    } else {
      console.warn("Element with ID 'FPCB' not found.");
    }
  }

  // Function to set color on a button
  function setAColor(color, btnColor) {
    const button = document.getElementById(color);
    if (button) {
      button.style.color = btnColor;
    } else {
      console.warn(`Element with ID '${color}' not found.`);
    }
  }

  // Apply branding

  // Set button border color
  setButtonBorderColor(Prime1);

  // Render background image
  renderImages("forgot-password-Img", "Girl on a pc", "backgroundImg", App.Images.PasswordImg);
  console.log(App.Images.PasswordImg);

  // Render logo
  renderImages("logoBlock", data.UBU.LogoText.description, data.UBU.LogoText.name, BuLogo);

  // Render email icon
  renderImages("emailIcon", "Email Icon", "Email Icon", data.AppIcons.userIcon);

  // Set background color
  setAColor("loginPortal", Prime1);

  // Set background gradient
  setBackgroundGradient(top, bottom);

  // Set text color
  setTextColors(Prime2);

  // Set the font for the body
  GetBuFont(data.UBU.font);
}

// Call the applyBranding function
applyBranding();


document.addEventListener("DOMContentLoaded", () => {
  window.onload = function () {
    const info = localStorage.getItem("transferredInfo");

    console.log("Document ID retrieved from localStorage:", info);

    // Function to fetch Firestore document data
    async function fetchFirestoreData(collection, document) {
      try {
        const docRef = doc(db, collection, document);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          return docSnap.data();
        } else {
          console.error(`No such document in collection ${collection}`);
          return null;
        }
      } catch (error) {
        console.error(`Error fetching document from ${collection}:`, error);
        return null;
      }
    }
    // Function to apply branding based on the document (RevoFit, MetaV, SHS)
    async function applyBranding(documentId) {
      const data = await fetchFirestoreData("RevoBuissnes", documentId);
      const App = await fetchFirestoreData("RevolApp", "Content");
      const {Base, Prime1, Prime2}= data.UBU.Colors
      const {top, bottom}= data.UBU.BackgroundColor
      const BuLogo = data.UBU.BuLogos.LightLogo

      if (!data) {
        console.error("No data retrieved from Firestore.");
        return;
      }
      function GetBuFont(fontFamily) {
        document.body.style.fontFamily = fontFamily;
       }
      // Function to render images into containers
      function renderImages(imgId, imgAlt, imgName, imageUrl){
        const imgContainer = document.getElementById(imgId);
        if (!imgContainer) {
          console.warn(`Container with ID '${imgId}' not found.`);
          return;
        }
        const img = document.createElement("img");
        img.src = imageUrl;
        img.alt = imgAlt;
        img.style.height = "auto";
        img.id = imgName; // Optional ID for img element
        imgContainer.innerHTML = ""; // Clear previous content
        imgContainer.appendChild(img); // Add new image
      }
      // Function to set background color
      function setBtnColors(Bcolor, color, textColor) {
        const button = document.getElementById("getPassword");
        if (!button) {
        button.style.border = `5px solid ${Bcolor}`;
        button.style.borderRadius = "5px";
        
        button.style.backgroundColor = color; // Set the background color dynamically
        button.style.color = textColor;
        }
      }
      function setButtonBorderColor(color) {
        const button = document.getElementById("getPassword");
        if (button) {
          button.style.border = `5px solid ${color}`;
          button.style.color = color;
          button.style.borderRadius = "5px";
        }
      }
      // Apply branding
      setButtonBorderColor(Prime1, Prime1)
      // Function to set text color
      function setTextColors(color) {
        const tittle = document.getElementById("FP");
        const text = document.getElementById("RYP");
        
        tittle.style.color = color; // Set the background color dynamically
        text.style.color = color;
      }
      // Function to set background color
      function setBackgroundGradient(color1, color2) {
        const button = document.getElementById("FPCB");
        if (!button) {
          console.warn("Element with ID 'FPCB' not found.");
          return;
        }
        button.style.background = `linear-gradient(to bottom, ${color1}, ${color2})`; // Apply gradient
      }
      function setAColor(color, btnColor) {
        const button = document.getElementById(color);
        if (!button) {
          console.warn("Element with ID 'registerBtn' not found.");
          return;
        }

        button.style.color = btnColor; // Set the button text color
       
      }


      // render background Img
      renderImages("forgot-password-Img", "Girl on a pc", "backgroundImg", App.Images.PasswordImg)
      console.log(App.Images.PasswordImg)
      // render Logo
      renderImages("logoBlock", data.UBU.LogoText.description, data.UBU.LogoText.name, BuLogo)
      // render Icons
      renderImages("emailIcon", "Email Icon", "Email Icon", data.AppIcons.userIcon)
       // Set Background color
      setAColor("loginPortal", Prime1)
      // Set Background color
      setBackgroundGradient(top, bottom);
      // Set Text color
      setTextColors(Prime2)
      GetBuFont(data.UBU.font);
    }

    // Dynamically select the document based on your needs
    if (info) {
      const documentId = info.trim(); // Example: "RevoFit", "MetaV", "SHS"
      applyBranding(documentId);
    } else {
      console.error("No document ID found in localStorage.");
    }
  };

  
  
});

document.addEventListener('touchstart', function (event) {
  if (event.touches.length > 1) {
    event.preventDefault(); // Prevents zooming
  }
}, { passive: false });