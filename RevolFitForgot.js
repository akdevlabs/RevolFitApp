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

const transferredInfo = localStorage.getItem("transferredInfo");
console.log(transferredInfo)






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