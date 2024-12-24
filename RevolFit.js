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

// Constants
const loginPage = "/index.html"; // Adjust path if necessary
const protectedPage = "/index1.html";




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



    if (data) {
      const {login, webSite, UBU, Portal} = data;
     
      const BuIcon = UBU.BuLogos
      const BuLogo = BuIcon.LightLogo
      
      const {Base, Prime1, Prime2}= UBU.Colors

      const font  = UBU.font
     
      const Popup = Portal.popup
      const Login = Portal.login
      
    


      if (webSite) {
        
        function setFontFamily(element, fontFamily) {
          element.style.fontFamily = fontFamily; // Set the font family on the given element
        }
        
        // Example usage
        const element = document.querySelector('body'); // Select the target element
        const setFont = font; // Define the font family
        setFontFamily(element, font); // Apply the font family to the selected element
      }
      // Render Popup Data
      if (Popup) {
        const {PImgs, PopupText} = Popup;

        const tittle    = PopupText.tittle
        const Subtittle    = PopupText.Subtittle
        const BackImg = PImgs.backgroundImg


    
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
          const container = document.getElementById("pop-upText");
          if (container) {
            container.style.backgroundColor = color;
          }
        }
     
        // Populate UI elements
        setBackgroundColorT(Base)
        setButtonBorderColor(Prime1);
        renderImage(BackImg, "pop-upImg");
        renderImage(BuLogo, "pop-upIcon");
        renderText(tittle, Subtittle, Prime2, Prime2);
      }

      // Render Login DataLogin
      if (Login) {
        const {Icons, LImgs} = Login;
        const lockIcon = Icons.lockIcon
        const userIcon = Icons.userIcon
        const BackImg = LImgs.backgroundimg


        function setButtonBorderColor(color,Tcolor) {
          const button = document.getElementById("ISbtn");
          if (button) {
            button.style.border = `5px solid ${color}`;
            button.style.borderRadius = "5px";
            button.style.color = Tcolor;
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
        function loginTextColor(colors) {
          const login = document.getElementById("login");
          
          login.style.color = colors;
    
        }
        function changeTextColorInput(color){
          const usernameInput = document.getElementById('username');
          const passwordInput = document.getElementById('password');
          

          // Add an event listener for the "input" event
          usernameInput.addEventListener('input', () => {
            usernameInput.style.color = color;
          });
          passwordInput.addEventListener('input', () => {
            passwordInput.style.color = color;
          });

        }
        

        // Populate UI elements
        renderImageIcon("passwordImage", lockIcon);
        renderImageIcon("userImage", userIcon)
        changeTextColorInput(Prime2)
        loginTextColor(Prime2)
        setButtonBorderColor(Prime1,Prime2);
        setBackgroundColor(Base);
        renderImage(BackImg, "loginImg");
        renderImage(BuLogo, "loginIcon");
        changeLinkColors(Prime2);
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







