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
      window.location.href = "dashboard.html"; // Redirect after successful login
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

  // Render App Intro Data
  fetchFirestoreData("RevoBuissnes", "RevolFit").then((data) => {
    if (data && data.popup) {
      const { Subtittle, tittle, backgroundImg, btnColor, logo } = data.popup;

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
  });

  // Render App Login Data
  fetchFirestoreData("RevoBuissnes", "RevolFit").then((data) => {
    if (data && data.login) {
      const { backgroundimg, btnColor, backgroundColor, logo, Fcolor } = data.login;

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

      // Populate UI elements
      setButtonBorderColor(btnColor);
      setBackgroundColor(backgroundColor);
      renderImage(backgroundimg, "loginImg");
      renderImage(logo, "loginIcon");
      changeLinkColors(Fcolor);
    }
  });



  
});

document.addEventListener("DOMContentLoaded", () => {
  // Login Functionality remains unchanged...

  // Add Event Listener for pop-up button
  const popupBtn = document.getElementById("pop-upBtn");
  const backgroundImg = document.getElementById("backgroundImg");

  if (popupBtn && backgroundImg) {
    // Toggle display between 'block' and 'none'
    popupBtn.addEventListener("click", () => {
      if (backgroundImg.style.display === "none" || backgroundImg.style.display === "") {
        backgroundImg.style.display = "block";
      } else {
        backgroundImg.style.display = "none";
      }
    });
  }
});