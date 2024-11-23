// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

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


// Ensure the DOM is loaded before attaching event listeners
document.addEventListener("DOMContentLoaded", () => {

  
  // Login Functionality
  async function loginUser(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", userCredential.user);
      window.location.href = "index4.html"; // Redirect after successful login
    } catch (error) {
      console.error("Error logging in:", error.message);
      alert("Error: " + error.message);
    }
  }

  // Attach login button listener
  document.getElementById("ISbtn").addEventListener("click", () => {
    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (email && password) {
      loginUser(email, password);
    } else {
      alert("Por favor, complete todos los campos.");
    }
  });

  // Monitor authentication state
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User is logged in:", user.email);
    } else {
      console.log("No user is logged in.");
    }
  });

  // Function to fetch Firestore document data
  async function fetchFirestoreData(collection, document) {
    try {
      const docRef = doc(db, collection, document);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log(`No such document in collection ${collection}`);
        return null;
      }
    } catch (error) {
      console.error(`Error fetching document from ${collection}:`, error);
    }
  }

  // Function to apply branding based on the document (RevolFit, MetaV, SHS)
  async function applyBranding(documentId) {
    const data = await fetchFirestoreData("RevoBuissnes", documentId);
    if (data) {
      const { popup, login, webSite} = data;


      if (webSite) {
        const {fireIcon, font, glassIcon, icon, weightIcon} = webSite;
     


        function setFontFamily(element, fontFamily) {
          element.style.fontFamily = fontFamily; // Set the font family on the given element
        }
        
        // Example usage
        const element = document.querySelector('body'); // Select the target element
        const setFont = font; // Define the font family
        setFontFamily(element, font); // Apply the font family to the selected element
      }
      // Render Popup Data
      if (popup) {
        const { Subtittle, tittle, backgroundImg, btnColor, logo, } = popup;

        // Dynamic rendering functions
        function setButtonBorderColor(color) {
          const button = document.getElementById("pop-upBtn");
          if (button) {
            button.style.border = `5px solid ${color}`;
            button.style.borderRadius = "5px";
          }
        }

        function renderImage(imageUrl, containerId) {
          const container = document.getElementById(containerId);
          if (container) {
            const img = document.createElement("img");
            img.src = imageUrl;
            img.alt = "Image";
            img.style.height = "auto";
            container.innerHTML = "";
            container.appendChild(img);
          }
        }

        function renderText(title, subtitle) {
          document.getElementById("tittle").textContent = title;
          document.getElementById("Subtittle").textContent = subtitle;
        }

     
        // Populate UI elements
       
        setButtonBorderColor(btnColor);
        renderImage(backgroundImg, "pop-upImg");
        renderImage(logo, "pop-upIcon");
        renderText(tittle, Subtittle);
      }

      // Render Login Data
      if (login) {
        const { backgroundimg, btnColor, backgroundColor, logo, Fcolor, lockIcon, userIcon, } = login;

        function setButtonBorderColor(color) {
          const button = document.getElementById("ISbtn");
          if (button) {
            button.style.border = `5px solid ${color}`;
            button.style.borderRadius = "5px";
          }
        }

        function setBackgroundColor(color) {
          const container = document.getElementById("loginContent");
          if (container) {
            container.style.backgroundColor = color;
          }
        }

        function setBackgroundColorT(color) {
          const container = document.getElementById("pop-upText");
          if (container) {
            container.style.backgroundColor = color;
          }
        }

        function renderImage(imageUrl, containerId) {
          const container = document.getElementById(containerId);
          if (container) {
            const img = document.createElement("img");
            img.src = imageUrl;
            img.alt = "Image";
            img.style.height = "auto";
            container.innerHTML = "";
            container.appendChild(img);
          }
        }

        function changeLinkColors(color) {
          const links = document.querySelectorAll("#form-links a");
          links.forEach((link) => {
            link.style.color = color;
          });
        }

        function renderImageIcon(imgId, imgSrc) {
          // Select the <img> element by its ID
          const imgElement = document.getElementById(imgId);

          // Check if the element exists
          if (imgElement) {
              // Update the src attribute
              imgElement.src = imgSrc;
          } else {
              console.error(`No element found with ID: ${imgId}`);
          }
        }

        function renderImageIcon2(imgId, imgSrc) {
          // Select the <img> element by its ID
          const imgElement = document.getElementById(imgId);

          // Check if the element exists
          if (imgElement) {
              // Update the src attribute
              imgElement.src = imgSrc;
          } else {
              console.error(`No element found with ID: ${imgId}`);
          }
      }
  

      // Example usage
    
      renderImageIcon("passwordImage", lockIcon);
      renderImageIcon2("userImage", userIcon)
        // Populate UI elements
        setBackgroundColorT(backgroundColor)
        
        setButtonBorderColor(btnColor);
        setBackgroundColor(backgroundColor);
        renderImage(backgroundimg, "loginImg");
        renderImage(logo, "loginIcon");
        changeLinkColors(Fcolor);
      }
    }
  }

  // Dynamically select the document based on your needs
  const documentId = "RevolFit"; // Example: "RevolFit", "MetaV", "SHS"
  applyBranding(documentId);
  
  function transferInfo() {
    const info = documentId
    if (info) {
      localStorage.setItem("transferredInfo", info); // Save data in localStorage

    } else {
      alert("Please enter some text before proceeding!");
    }
  }
  transferInfo()


  // Add Event Listener for pop-up button to toggle background image visibility
  const popupBtn = document.getElementById("pop-upBtn");
  const backgroundImg = document.getElementById("backgroundImg");

  if (popupBtn && backgroundImg) {
    popupBtn.addEventListener("click", () => {
      backgroundImg.style.display =
        backgroundImg.style.display === "none" || backgroundImg.style.display === ""
          ? "block"
          : "none";
    });
  }



});
