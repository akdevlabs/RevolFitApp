// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

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

// Initialize Firebase
async function initializeFirebase() {
  if (db && auth) return; // Prevent duplicate initialization

  try {
    const firebaseConfig = await fetchFirebaseConfig();
    if (!firebaseConfig) throw new Error("Firebase config is undefined");

    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);

    console.log("Firestore and Auth initialized");
  } catch (error) {
    console.error("Error initializing Firebase:", error);
  }
}

// Function to handle account creation
async function registerAccount() {
  // Get input values
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();
  const termsAccepted = document.getElementById("terms").checked;

  // Validate inputs
  if (!email || !password || !confirmPassword) {
    alert("Por favor, complete todos los campos.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  if (!termsAccepted) {
    alert("Debe aceptar los términos y condiciones.");
    return;
  }

  try {
    // Create user with Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log("User created:", user);

    if (!user || !user.uid) {
      throw new Error("User creation failed or UID is undefined.");
    }

    // Prepare user data for Firestore
    const userData = {
      email: user.email,
      uid: user.uid,
      createdAt: new Date().toISOString(),
      Registration: false,
      evaluation: false,
      TermsAndConditions: termsAccepted,
    };

    // Save user data in Firestore
    await setDoc(doc(db, "users", user.uid), userData);

    console.log("User data saved in Firestore:", userData);

    alert("Cuenta creada con éxito.");
    window.location.href = "index.html"; // Redirect to a success page
  } catch (error) {
    console.error("Error creating user:", error);
    alert(`Error al crear la cuenta: ${error.message}`);
  }
}

// Function to fetch Firestore document data
async function fetchFirestoreData(collection, documentId) {
  try {
    if (!db) throw new Error("Firestore is not initialized yet");

    const docRef = doc(db, collection, documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log(`Document data from ${collection}:`, docSnap.data());
      return docSnap.data();
    } else {
      console.error(`No document found in collection ${collection}`);
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

  if (!data || !App) {
    console.error("Branding data missing.");
    return;
  }

  const { Base, Prime1, Prime2 } = data.BuColors.Colors;
  const { lockIcon, userIcon } = data.AppIcons;

  const BuLogo = data.BuLogos.Simple[3];
  const LoginImg = App.Images.LoginImg;

  // Apply styles
  function GetBuFont(fontFamily) {
    document.body.style.fontFamily = fontFamily;
  }
  GetBuFont(data.Font);

  function renderImage(imgId, imageUrl, altText) {
    const imgContainer = document.getElementById(imgId);
    if (!imgContainer) return;
    imgContainer.innerHTML = `<img src="${imageUrl}" alt="${altText}" style="height: auto;" id="userIm">`;
  }

  function renderIcons(imgId, imageUrl) {
    const imgElement = document.getElementById(imgId);
    if (imgElement) imgElement.src = imageUrl;
  }

  function setElementStyle(id, style) {
    const element = document.getElementById(id);
    if (element) Object.assign(element.style, style);
  }
  function atagColor() {
    
      let style = document.createElement("style");
      style.innerHTML = `
        a {
          background-color: transparent;
          text-decoration: none;
        }
        a:link {
          color: ${Prime2};
        }
        a:visited {
          color: ${Prime2};
        }
        a:hover {
          color: ${Prime2};
          text-decoration: underline;
        }
        a:active {
          color: ${Prime2};
          text-decoration: underline;
        }
      `;
      document.head.appendChild(style);

  
  };
  
  atagColor()
  // Apply branding styles
  setElementStyle("register", { backgroundColor: Base });
  setElementStyle("registerBtn", { backgroundColor: Prime1, color: Base });
  setElementStyle("registerForm", { color: Prime2 });

  renderImage("registerImg", LoginImg, "Branding image");
  renderImage("registerIcon", BuLogo, "Brand logo");
  renderIcons("confirmPasswordImage", lockIcon);
  renderIcons("passwordImage", lockIcon);
  renderIcons("emailImage", userIcon);
}

// Load branding dynamically when the page loads
document.addEventListener("DOMContentLoaded", async () => {
  await initializeFirebase();

  const info = localStorage.getItem("transferredBu");
  if (info) {
    applyBranding(info.trim());
  } else {
    console.error("No document ID found in localStorage.");
  }

  const registerBtn = document.getElementById("registerBtn");
  if (registerBtn) {
    registerBtn.addEventListener("click", registerAccount);
  }
});

// Prevent zooming on touchscreens
document.addEventListener(
  "touchstart",
  (event) => {
    if (event.touches.length > 1) event.preventDefault();
  },
  { passive: false }
);
