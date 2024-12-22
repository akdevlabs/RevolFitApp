// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore, doc, getDoc, collection, addDoc,  updateDoc, setDoc  } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

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


// Retrieve data from localStorage
const transferreduserInfo = localStorage.getItem("transferreduserInfo");
const transferredInfo = localStorage.getItem("transferredInfo");

console.log("Transferred User Info:", transferreduserInfo);
console.log("Transferred Info:", transferredInfo);

// Function to check if a document exists
async function checkDocumentExists(collectionName, documentId) {
  try {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log(`Document found:`, docSnap.data());
    } else {
      console.log(`No document found with ID: ${documentId}`);
    }
  } catch (error) {
    console.error("Error checking document:", error);
  }
}

// Check if a business-related document exists
checkDocumentExists("RevoBusiness", transferredInfo);


  
   async function getTerminosyCondiciones() {
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
  getTerminosyCondiciones().then((data) => {
     const TC = data.TC
    
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
    const UBU = data.UBU
    const {Base, Prime1, Prime2, Prime3} = UBU.Colors

    
 

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