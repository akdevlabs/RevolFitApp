// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
import { getFirestore, doc, setDoc,getDoc } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBc3B7SM_Itr9LRCv8N3_tbl9BglxHKo-M",
  authDomain: "revofit-ad7c3.firebaseapp.com",
  projectId: "revofit-ad7c3",
  storageBucket: "revofit-ad7c3.appspot.com",
  messagingSenderId: "643801118133",
  appId: "1:643801118133:web:d679abc998a18f7077d5fc",
  measurementId: "G-E6P96D0M6Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);




function clearInfo() {
  localStorage.removeItem("transferredInfo"); // Clear the saved data
  window.location.href = "page1.html"; // Redirect back to the first page
}











// Ensure the DOM is loaded before attaching event listeners
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
      if (!data) {
        console.error("No data retrieved from Firestore.");
        return;
      }
     

      function setFontFamily(element, fontFamily) {
        element.style.fontFamily = fontFamily; // Set the font family on the given element
      }
      
      // Example usage
      const element = document.querySelector('body'); // Select the target element
      const fontAc= data.font; // Define the font family
      setFontFamily(element, fontAc); // Apply the font family to the selected element




      const AppIntroValue = data.register;

      if (!AppIntroValue) {
        console.error("The 'register' field is missing in the document.");
        return;
      }

      const { backgroundImg, CPIcon, EIcon, PIcon, backgroundColor,logo,font, color, textColor, textBcolor} = AppIntroValue;

    
      // Function to render images into containers
      function renderImage(imgId, imageUrl) {
        const imgContainer = document.getElementById(imgId);
        if (!imgContainer) {
          console.warn(`Container with ID '${imgId}' not found.`);
          return;
        }
        const img = document.createElement("img");
        img.src = imageUrl;
        img.alt = "What We Offer Image";
        img.style.height = "auto";
        img.id = "userIm"; // Optional ID for img element
        imgContainer.innerHTML = ""; // Clear previous content
        imgContainer.appendChild(img); // Add new image
      }
      function renderLogoImage(imgId, imageUrl) {
        const imgContainer = document.getElementById(imgId);
        if (!imgContainer) {
          console.warn(`Container with ID '${imgId}' not found.`);
          return;
        }
        const img = document.createElement("img");
        img.src = imageUrl;
        img.alt = "What We Offer Image";
        img.style.height = "auto";
        img.id = "logo"; // Optional ID for img element
        imgContainer.innerHTML = ""; // Clear previous content
        imgContainer.appendChild(img); // Add new image
      }

      // Function to render icons
      function renderIcons(imgId, imageUrl) {
        const imgElement = document.getElementById(imgId);
        if (!imgElement) {
          console.warn(`Element with ID '${imgId}' not found.`);
          return;
        }
        imgElement.src = imageUrl;
      }

      // Function to set background color
      function setBackgroundColor(color) {
        const button = document.getElementById("registerContent");
        if (!button) {
          console.warn("Element with ID 'registerContent' not found.");
          return;
        }
        button.style.backgroundColor = color; // Set the background color dynamically
      }


      function setTextColor(color, excludeId) {
        const container = document.getElementById("registerForm");
        if (!container) {
          console.warn("Element with ID 'registerForm' not found.");
          return;
        }
      
        // Change the color of all child elements except the one with the specified ID
        const elements = container.querySelectorAll("*:not(#" + excludeId + ")");
        elements.forEach((element) => {
          element.style.color = color;
        });
      }
      
      function setBtnColor(color, textColor) {
        const button = document.getElementById("registerBtn");
        if (!button) {
          console.warn("Element with ID 'registerBtn' not found.");
          return;
        }
      
        button.style.color = textColor; // Set the button text color
        button.style.backgroundColor = color; // Set the button background color
      }
      
      // Combined function for setting colors
      function updateColors(btnBgColor, btnTextColor, textColor) {
        setBtnColor(btnBgColor, btnTextColor); // Set button colors
        setTextColor(textColor, "registerBtn"); // Set other text colors, excluding the button
      }
      
    


 
      // Apply branding
      setTextColor(textColor)
      setBtnColor(color, textBcolor)
      setBackgroundColor(backgroundColor);
      renderLogoImage("registerIcon", logo)
      renderImage("registerImg", backgroundImg);
      renderIcons("confirmPasswordImage", CPIcon);
      renderIcons("passwordImage", PIcon);
      renderIcons("emailImage", EIcon);
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










