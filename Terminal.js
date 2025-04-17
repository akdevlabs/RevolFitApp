import { 
    initializeApp 
  } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
  
  import { 
    getAuth
  } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
  
  import { 
    getFirestore, 
    doc, 
    getDoc
  } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
  
  let db, auth;
  
  async function fetchFirebaseConfig() {
    try {
      console.log("Fetching Firebase config...");
      const response = await fetch("http://localhost:3000/firebase-config");
      if (!response.ok) throw new Error("Failed to fetch Firebase config");
      return await response.json();
    } catch (error) {
      console.error("Error fetching Firebase config:", error);
      return null;
    }
  }
  
  async function initializeFirebase() {
    if (db && auth) return;
  
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
  
  async function checkUserFlowAfterLogin(userId) {
    try {
      if (!db) {
        await initializeFirebase();
      }
  
      const userDocRef = doc(db, "users", userId);
      const userDocSnap = await getDoc(userDocRef);
  
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        
  
        if (userData.activeA) {
          localStorage.setItem("transferreduserInfo", userData.uid);
          
        }
  
        if (!userData.registrationCompleted) {
          console.log("Registration not finished. Redirecting to index6.html.");
          window.location.href = "index6.html";
          return;
        }
  
        if (!userData.evaluation) {
          console.log("Evaluation not finished. Redirecting to index7.html.");
          window.location.href = "index7.html";
          return;
        }
  
        //console.log("User registration and evaluation completed. Redirecting to index9.html.");
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
  
  (async () => {
    await initializeFirebase();
    const transferredUserInfo = localStorage.getItem("transferreduserInfo");
    if (transferredUserInfo) {
      checkUserFlowAfterLogin(transferredUserInfo);
    } else {
      console.log("No user info found in localStorage.");
    }
  })();
  