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

// Wait for Firebase initialization
await initializeFirebase();

// Retrieve data from localStorage
const transferredInfo = localStorage.getItem("transferredBu");
console.log("Transferred Info:", transferredInfo);

// Function to check if a document exists
async function checkDocumentExists(collectionName, documentId) {
  try {
    if (!db) throw new Error("Firestore is not initialized yet");

    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log(`Document found:`, docSnap.data());
      return docSnap.data();
    } else {
      console.log(`No document found with ID: ${documentId}`);
      return null;
    }
  } catch (error) {
    console.error("Error checking document:", error);
    return null;
  }
}

async function getBuContent() {
  try {
    const docRef = doc(db, "RevoBuissnes", transferredInfo);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const documentData = docSnap.data();
      return documentData; // Return the document data
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
}
getBuContent().then((data) => {
   const TC = data.AppIcons.ReturnIcon

  console.log(TC)
  function setBuIcon(imgSrc, imgAlt) {
    // Find the img element with id 'logo-img'
    const img = document.getElementById('ReturnIcon');

    // Check if the img element exists
    if (img) {
        // Set the image source and alternative text
        img.src = imgSrc;
        img.alt = imgAlt;
    } else {
        console.error("Image element with id 'logo-img' not found.");
    }
}

    setBuIcon(TC, "Return Icon"); 

});


async function getTerminosyCondiciones() {
  try {
    const docRef = doc(db, "RevolApp", 'TermsService');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const documentData = docSnap.data();
      return documentData; // Return the document data
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
}
getTerminosyCondiciones().then((data) => {
   const TC = data
  



   const {HDate, HTittle} = TC.Header
   const {IntroContent, IntroTittle} = TC.Introducción
   const {DesTcontent, DesTittle} = TC.Descripción
   const {ElegText, ElegTittle}   = TC.Elegibilidad
   const {RegTcontent, RegTittle} = TC.Registro
   const {TarTcontent, TarTittle} = TC.Tarifas
   const {UsoTcontent, UsoTittle} = TC.Uso
   const {ProTcontent, ProTittle} = TC.Propiedad
   const {TermTcontent, TermTittle} = TC.Terminación
   const {LimTcontent, LimTittle} = TC.Limitación
   const {CamTcontent, CamTittle} = TC.Cambios
   const {LeyTcontent, LeyTittle} = TC.Ley
   const {WhiteTcontent, WhiteTittle} = TC.White
   const {ConTcontent, ConTittle} = TC.Contacto
   const Thanks = TC.Thanks

   function renderHeader(Date, Tittle, urlTittle,  urlDate){
    const HTittle = document.getElementById(urlTittle);
    const HDate = document.getElementById(urlDate);

    if (HTittle) {
      HTittle.textContent = Tittle;
      HDate.textContent = Date;


    } else {
        console.error('Tittle element with ID "IntroTittle" not found.');
    }

   }

   function renderSections(Tittle, Tcontent, urlTittle, urlText){
    const tittleElement = document.getElementById(urlTittle);
    const textElement = document.getElementById(urlText);

    if (tittleElement) {
        tittleElement.textContent = Tittle;
    } else {
        console.error('Tittle element with ID "IntroTittle" not found.');
    }

    if (textElement) {
        textElement.textContent = Tcontent;
    } else {
        console.error('Text element with ID "IntroText" not found.');
    }




   }
   function renderList(Tittle, items, urlTittle, urlList) {
    const listElement = document.getElementById(urlList);
    const tittleElement = document.getElementById(urlTittle);
    if (!listElement) {
        console.error('Element with ID "RegTlist" not found.');
        return;
    }

    // Clear existing list items
    listElement.innerHTML = '';

    // Create and append list items
    items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        listElement.appendChild(listItem);
    });

    if (tittleElement) {
      tittleElement.textContent = Tittle;
    } else {
        console.error('Tittle element with ID "IntroTittle" not found.');
    }

   }
   function renderThanksMessage(message, urlMessage) {
    const thanksElement = document.getElementById(urlMessage);

    if (!thanksElement) {
        console.error('Element with ID "Thanks" not found.');
        return;
    }

    thanksElement.textContent = message;
   }


   renderHeader(HDate, HTittle, 'HTittle',  'HDate')

   renderSections(IntroTittle, IntroContent, 'IntroTittle', 'IntroText')
   renderSections(DesTittle, DesTcontent, 'DescTittle', 'DescText')
   renderSections(ElegTittle, ElegText, 'ElegTittle', 'ElegText')
   renderSections(ProTittle, ProTcontent, 'ProTittle', 'ProTcontent')
   renderSections(TermTittle, TermTcontent, 'TermTittle', 'TermTcontent')
   renderSections(LimTittle, LimTcontent, 'LimTittle', 'LimTcontent')
   renderSections(CamTittle, CamTcontent, 'CamTittle', 'CamTcontent')
   renderSections(LeyTittle, LeyTcontent, 'LeyTittle', 'LeyTcontent')
   renderSections(WhiteTittle, WhiteTcontent, 'WhiteTittle', 'WhiteTcontent')
   renderSections(ConTittle, ConTcontent, 'ConTittle', 'ConTcontent')


   renderList(RegTittle, RegTcontent, 'RegTittle', 'RegTlist')
   renderList(TarTittle, TarTcontent, 'TarTittle', 'TarTlist')
   renderList(UsoTittle, UsoTcontent, 'UsoTittle', 'UsoTlist')

   renderThanksMessage(Thanks, 'Thanks')


});


async function getColorsTyC() {
  try {
    const docRef = doc(db, "RevoBuissnes", transferredInfo);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const documentData = docSnap.data();
      return documentData; // Return the document data
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
}
getColorsTyC().then((data) => {
  const BuColors = data.BuColors
  const {Base, Prime1, Prime2, Prime3} = BuColors.Colors

  
  function setBGColors(bgColor, sectionId){
    const sectionElement = document.getElementById(sectionId);

    if (!sectionElement) {
        console.error(`Section with ID "${sectionId}" not found.`);
        return;
    }
    sectionElement.style.backgroundColor = bgColor || 'transparent';
    
  }
  setBGColors(Base, 'ReturnBlock')
  

  function renderMainSectionColors(sectionId, colors, bgColor) {
      const sectionElement = document.getElementById(sectionId);

      if (!sectionElement) {
          console.error(`Section with ID "${sectionId}" not found.`);
          return;
      }

      
      sectionElement.style.backgroundColor = bgColor || 'transparent';
      sectionElement.style.color = colors ;
  }
      
  renderMainSectionColors('Content', Base, Prime1) 

});



document.addEventListener('touchstart', function (event) {
  if (event.touches.length > 1) {
    event.preventDefault(); // Prevents zooming
  }
  }, { passive: false });
    "touchstart",
    function (event) {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    },
    { passive: false }
  