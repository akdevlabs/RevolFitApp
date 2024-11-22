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

const user =    "DefaultUser"            //1000000001
const buissnes = "RevolFit"
const cat =  "red"


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
checkDocumentExists("RevoBuissnes", buissnes);


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
      const element = document.querySelector("body"); // Select the target element
      const fontAc = data.font; // Define the font family
      setFontFamily(element, fontAc); // Apply the font family to the selected element

      const AppIntroValue = data.forgot;

      if (!AppIntroValue) {
        console.error("The 'register' field is missing in the document.");
        return;
      }

      const {
        EIcon,
        backgroundColor,
        backgroundImg,
        btnColor,
        logo,
        fColor

      } = AppIntroValue;

      console.log(backgroundImg)



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

      function renderLogo(imgId, imageUrl) {
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
        const button = document.getElementById("FPC");
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
          if (element.tagName !== "INPUT") {
            element.style.color = color; // Set color for non-input elements
          }
        });

        // Ensure input fields have black text
        const inputs = container.querySelectorAll("input");
        inputs.forEach((input) => {
          input.style.color = "black"; // Set input text color to black
        });
      }

      function setTittleColor(color, headerColor) {
        const button = document.getElementById(color);
        if (!button) {
          console.warn("Element with ID 'registerBtn' not found.");
          return;
        }

        button.style.color = headerColor; // Set the button text color
       
      }
      function setBTNColor(color, btnColor) {
        const button = document.getElementById(color);
        if (!button) {
          console.warn("Element with ID 'registerBtn' not found.");
          return;
        }

        button.style.color = btnColor; // Set the button text color
       
      }
      function setAColor(color, btnColor) {
        const button = document.getElementById(color);
        if (!button) {
          console.warn("Element with ID 'registerBtn' not found.");
          return;
        }

        button.style.color = btnColor; // Set the button text color
       
      }
      function setButtonBorderColor(color) {
        const button = document.getElementById("getPassword");
        if (button) {
          button.style.border = `5px solid ${color}`;
          button.style.borderRadius = "5px";
        }
      }
      // Apply branding
      
      setButtonBorderColor(btnColor)
      setBackgroundColor(backgroundColor);
      setAColor("loginPortal", btnColor)
      renderImage("forgot-password-Img", backgroundImg);
      renderLogo("logoBlock", logo)
      setBTNColor("getPassword", btnColor)
      setTittleColor("FPC",  fColor)
      renderIcons("emailIcon", EIcon);
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