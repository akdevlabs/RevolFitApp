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



// Dynamically select the document based on your needs
const documentId = "RevolFit"; // Example: "RevolFit", "MetaV", "SHS"
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



async function initializeFirestoreFunctions() {
  console.log("Initializing Firestore-related functions...");
  // Add any Firestore setup code here if needed.
}
// Check if document exists
async function checkDocumentExists(collectionName, documentId) {
  try {
    if (!db) throw new Error("Firestore is not initialized yet");

    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document found:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No document found with ID:", documentId);
      return null;
    }
  } catch (error) {
    console.error("Error checking document:", error);
  }
}

// Function: Log in the user
async function loginUser(email, password) {
  try {
    if (!auth) {
      console.error("Auth is not initialized yet.");
      return;
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log("User logged in:", user);
    saveUserUIDToLocalStorage(user.uid);
    await updateUserStreak(user.uid);
    localStorage.setItem("transferredBu", documentId);
    // Redirect user to index1.html
    window.location.href = "/index1.html";
  } catch (error) {
    console.error("Error logging in:", error.message);
    alert("Error: " + error.message);
  }
}


// Function: Save user UID to localStorage
function saveUserUIDToLocalStorage(uid) {
  try {
    localStorage.setItem("transferreduserInfo", uid);
   
    console.log("User UID saved:", uid);
  } catch (error) {
    console.error("Error saving UID:", error);
  }
}

// Function: Update user streak in Firestore
async function updateUserStreak(userId) {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const newStreakCount = (userData.currentStreak || 0) + 1;
      const updatedStreakArray = [...(userData.streakCount || []), newStreakCount];

      await updateDoc(userDocRef, {
        currentStreak: newStreakCount,
        streakCount: updatedStreakArray,
        lastLogin: serverTimestamp(),
      });

      console.log("Streak updated:", newStreakCount);
    } else {
      console.error("User document does not exist.");
    }
  } catch (error) {
    console.error("Error updating streak:", error);
  }
}

// Function: Log out user on first load
async function logoutUserOnce() {
  if (!auth) return;

  const hasLoggedOut = sessionStorage.getItem("hasLoggedOut");
  if (!hasLoggedOut) {
    try {
      await signOut(auth);
      console.log("User logged out on first load.");
      sessionStorage.setItem("hasLoggedOut", "true");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }
}

// Handle authentication state
function handleAuthState() {
  if (!auth) {
    console.error("Auth is not initialized yet. Retrying...");
    setTimeout(handleAuthState, 1000);
    return;
  }

  onAuthStateChanged(auth, async (user) => {
    const currentPage = window.location.pathname;
    if (currentPage === "/index.html" && user) {
      console.log("User already logged in:", user.email);

      try {
        await signOut(auth);
      } catch (error) {
        console.error("Error during forced sign out:", error.message);
      }
    }
  });
}

// Attach login button listener
document.addEventListener("DOMContentLoaded", () => {
  attachLoginListener();
});

function attachLoginListener() {
  const loginButton = document.getElementById("ISbtn");
  if (loginButton) {
      loginButton.addEventListener("click", async () => {
          const email = document.getElementById("username").value;
          const password = document.getElementById("password").value;

          if (email && password) {
              try {
                  await loginUser(email, password);
              } catch (error) {
                  console.error("Login failed:", error);
                  alert("Login failed: " + error.message);
              }
          } else {
              alert("Please enter email and password.");
          }
      });
  }
}


// Function: Fetch Firestore document data
async function fetchFirestoreData(collection, documentId) {
  try {
    const docRef = doc(db, collection, documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log(`No document found in ${collection}`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching document from ${collection}:`, error);
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
  }
}




// Initialize everything on page load
document.addEventListener("DOMContentLoaded", async () => {
  await initializeFirebase();
  handleAuthState();
  attachLoginListener();
  applyBranding(documentId);
});

// Function: Apply branding
async function applyBranding(DId) {
  const data = await checkDocumentExists('RevoBuissnes', DId);
  const App = await fetchFirestoreAppData()
  
  console.log(App.Images.LoginImg)

  if (data) {
    console.log("Branding data:", data);
    // Apply branding logic here
    const {Base, Prime1, Prime2}= data.UBU.Colors
    const Popup = data.Portal.popup
    const { lockIcon, userIcon } = data.AppIcons

    function GetBuFont(fontFamily) {
      document.body.style.fontFamily = fontFamily;
    }
    GetBuFont(data.UBU.font);
    // Render Popup Data
    if (Popup) {
      const  PopupText = Popup.PopupText;
      // Dynamic rendering functions
      function setButtonBorderColor(color) {
          const button = document.getElementById("pop-upBtn");
          if (button) {
            button.style.border = `5px solid ${color}`;
            button.style.borderRadius = "5px";
            button.style.color = Prime2;
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
      function renderText(title, subtitle, color, color2 ) {
          document.getElementById("tittle").textContent = title;
          document.getElementById("Subtittle").textContent = subtitle;
          document.getElementById("tittle").style.color = color;
          document.getElementById("Subtittle").style.color = color2;
      }
      function setBackgroundColorT(color) {
          const container = document.getElementById("backgroundImg");
          if (container) {
            container.style.backgroundColor = color;
          }
      }
     
        // Populate UI elements
      setBackgroundColorT(Base)
      setButtonBorderColor(Prime1);
      renderImage(App.Images.PopUpImg, "pop-upImg");


      renderImage(data.UBU.BuLogos.LightLogo, "pop-upIcon");
      renderText(PopupText.tittle, PopupText.Subtittle, Prime2, Prime2);
    }
    // Render Login DataLogin
    function updateElementStyle(id, styles) {
      const element = document.getElementById(id);
      if (element) {
          Object.assign(element.style, styles);
      }
    }
  
    function renderImage(imageUrl, containerId) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `<img src="${imageUrl}" alt="Image" style="height:auto;">`;
        }
    }
  
    function updateImageSrc(imgId, imgSrc) {
        const imgElement = document.getElementById(imgId);
        if (imgElement) imgElement.src = imgSrc;
    }
  

    
    function addInputEventListener(ids, color) {
      ids.forEach(id => {
          const input = document.getElementById(id);
          if (input) {
              input.addEventListener('input', () => {
                  input.style.color = color; 
                  input.removeAttribute("disabled"); // Ensure input is enabled
              });
          }
      });
  }
    
    function updateLinkColors(color) {
        document.querySelectorAll("#form-links a").forEach(link => link.style.color = color);
    }
    
    // Apply styles and updates
    updateImageSrc("passwordImage", lockIcon);
    updateImageSrc("userImage", userIcon);
    addInputEventListener(["username", "password"], Base);
    updateElementStyle("login", { color: Prime2 });
    updateElementStyle("ISbtn", { border: `5px solid ${Prime1}`, borderRadius: "5px", color: Prime2 });
    updateElementStyle("login", { backgroundColor: Base });
    renderImage(App.Images.LoginImg, "loginImg");
    renderImage(data.UBU.BuLogos.LightLogo, "loginIcon");
    updateLinkColors(Prime2);
  }
}







 


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

document.addEventListener('touchstart', function (event) {
  if (event.touches.length > 1) {
    event.preventDefault(); // Prevents zooming
  }
}, { passive: false });

// Lock scrolling
function lockScroll() {
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.width = '100%';
}

// Unlock scrolling
function unlockScroll() {
  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.width = '';
}

// Example usage
lockScroll(); // Call to lock
// unlockScroll(); // Call to unlock
