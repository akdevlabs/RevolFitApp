// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  updateDoc, 
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

// Constants
const loginPage = "/index.html"; // Adjust path if necessary
const protectedPage = "/index1.html";

// Dynamically select the document based on your needs
const documentId = "RevolFit"; // Example: "RevolFit", "MetaV", "SHS"







// Utility: Redirect to a specific page
function redirectTo(page) {
  window.location.href = page;
}
// Function: Log in the user
async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User logged in:", user);

    // Save UID to localStorage
    saveUserUIDToLocalStorage(user.uid);

    // Update streak in Firestore
    await updateUserStreak(user.uid);
    
    redirectTo(protectedPage);
  } catch (error) {
    console.error("Error logging in:", error.message);
    alert("Error: " + error.message);
  }
}
// Function: Save user UID to localStorage
function saveUserUIDToLocalStorage(uid) {
  try {
    localStorage.setItem("transferreduserInfo", uid);
    console.log("User UID saved to localStorage:", uid);
  } catch (error) {
    console.error("Error saving UID to localStorage:", error);
  }
}
// Function: Update user streak in Firestore  Error: Firebase: Error (auth/invalid-login-credentials).
async function updateUserStreak(userId) {
  const userDocRef = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    const userData = userDocSnap.data();
    const newStreakCount = (userData.currentStreak || 0) + 1; // Increment streak
    const updatedStreakArray = [...(userData.streakCount || []), newStreakCount]; // Add streak to array

    await updateDoc(userDocRef, {
      currentStreak: newStreakCount,
      streakCount: updatedStreakArray,
      lastLogin: serverTimestamp()
    });
    
    console.log("Streak updated. Current streak:", newStreakCount);
  } else {
    console.error("User document does not exist.");
  }

}
// Function: Log out user once on initial load
async function logoutUserOnce() {
  const hasLoggedOut = sessionStorage.getItem("hasLoggedOut");
  if (!hasLoggedOut) {
    try {
      await signOut(auth);
      console.log("User logged out on first load.");
      sessionStorage.setItem("hasLoggedOut", "true"); // Prevent repeat logout
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }
}
// Function: Handle authentication state
function handleAuthState() {
  onAuthStateChanged(auth, async (user) => {
    const currentPage = window.location.pathname;

    if (currentPage === loginPage && user) {
      console.log("User is already logged in:", user.email);

      // Force sign out for re-authentication
      try {
        await signOut(auth);
       
      } catch (error) {
        console.error("Error during forced sign out:", error.message);
      }
    }
  });
}
// Event Listener: Attach login button listener
function attachLoginListener() {
  document.getElementById("ISbtn").addEventListener("click", () => {
    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (email && password) {
      loginUser(email, password);
    } else {
      alert("Por favor, complete todos los campos.");
    }
  });
}
// Function: Fetch Firestore document data
async function fetchFirestoreData(collection, documentId) {
  try {
    const docRef = doc(db, collection, documentId);
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
// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  logoutUserOnce(); // Log out on first load
  handleAuthState(); // Monitor authentication state
  attachLoginListener(); // Attach event listener for login button
});
// Function to apply branding based on the document (RevolFit, MetaV, SHS)
async function applyBranding(documentId) {
  const data = await fetchFirestoreData("RevoBuissnes", documentId);
  const App = await fetchFirestoreData("RevolApp", "Content");
  const {LoginImg ,PopUpImg}= App.Images

  if (data) {
         
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
      renderImage(PopUpImg, "pop-upImg");
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
                  input.addEventListener('input', () => input.style.color = color);
              }
          });
      }
      
      function updateLinkColors(color) {
          document.querySelectorAll("#form-links a").forEach(link => link.style.color = color);
      }
      
      // Apply styles and updates

      updateImageSrc("passwordImage", lockIcon);
      updateImageSrc("userImage", userIcon);
      addInputEventListener(["username", "password"], Prime2);
      updateElementStyle("login", { color: Prime2 });
      updateElementStyle("ISbtn", { border: `5px solid ${Prime1}`, borderRadius: "5px", color: Prime2 });
      updateElementStyle("login", { backgroundColor: Base });
      renderImage(LoginImg, "loginImg");
      renderImage(data.UBU.BuLogos.LightLogo, "loginIcon");
      updateLinkColors(Prime2);
    }
  
  
}



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