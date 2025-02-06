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


// Retrieve data from localStorage
const transferreduserInfo = localStorage.getItem("transferreduserInfo");
const transferredBuInfo = localStorage.getItem("transferredInfo");

console.log(transferreduserInfo)

console.log(transferredBuInfo)









// Function to check user flow based on registration and evaluation status
async function checkUserFlowAfterLogin(userId) {
  try {
      // Reference the user's document in Firestore
      const userDocRef = doc(db, "users", userId);
      const userDocSnap = await getDoc(userDocRef);

      // Check if the user document exists
      if (userDocSnap.exists()) {
          const userData = userDocSnap.data();

          // Save user info to localStorage if activeA is true
          if (userData.activeA) {
              const userinfo = userData.uid;

              if (userinfo) {
                  localStorage.setItem("transferreduserInfo", userinfo); // Save data in localStorage
                  console.log("User info saved in localStorage:", userinfo);
              } else {
                  alert("User information is missing. Please contact support.");
                  return;
              }
          } else {
              console.log("User is not active. No information stored.");
          }

          // Point 1: Check if registration is finished
          if (!userData.registrationCompleted) {
              console.log("Registration not finished. Redirecting to index6.html.");
              window.location.href = "index6.html";
              return;
          }

          // Point 2: Check if evaluation is finished
          if (!userData.evaluation) {
              console.log("Evaluation not finished. Redirecting to index7.html.");
              window.location.href = "index7.html";
              return;
          }

          // Point 3: Both registration and evaluation are completed
          console.log("User registration and evaluation completed. Redirecting to index9.html.");
            window.location.href = "index9.html";
      } else {
          console.error("No such user document found.");
          alert("Unable to verify user data. Please contact support.");
      }
  } catch (error) {
      console.error("Error checking user flow:", error.message);
      alert("Error checking user data. Please try again later.");
  }
}

checkUserFlowAfterLogin(transferreduserInfo)