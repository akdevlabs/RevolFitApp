import { 
  initializeApp 
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
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
// Wait for Firebase initialization
await initializeFirebase();

async function initializeFirestoreFunctions() {
  console.log("Initializing Firestore-related functions...");
  // Add any Firestore setup code here if needed.
}
 // Retrieve data from localStorage
 const transferreduserInfo = localStorage.getItem("transferreduserInfo");
 const transferredInfo = localStorage.getItem("transferredBu");
 
console.log("Transferred User Info:", transferreduserInfo);
console.log("Transferred Info:", transferredInfo);


// Check if a document exists in Firestore
async function checkDocumentExists(collectionName, documentId) {
  if (!collectionName || !documentId) {
    console.error("Collection name or document ID is missing.");
    return null;
  }

  if (!db) {
    console.error("Firestore instance is not initialized.");
    return null;
  }

  try {
    const docRef = doc(db, collectionName, documentId);
    console.log(`Checking document: ${collectionName}/${documentId}`);

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document found:", docSnap.data());
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
// Check if a business-related document exists
checkDocumentExists("RevoBusiness", transferredInfo);

// Form submission handler
document.getElementById("userForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  // Collect form data
  const formData = {
    nombre: document.getElementById("nombre").value,
    apellidoPaterno: document.getElementById("apellido-paterno").value,
    apellidoMaterno: document.getElementById("apellido-materno").value,
    age: document.getElementById("age").value,
    fechaNacimiento: document.getElementById("fecha-nacimiento").value,
    genero: document.getElementById("genero").value,
    countryCode: document.getElementById("countryCode").value, // Added country code
    phone: document.getElementById("phone").value,
    pais: document.getElementById("pais").value,
    Zip: document.getElementById("Zip").value,
    Cuidad: document.getElementById("Cuidad").value,
    Bu:transferredInfo,
   
    isBusiness: document.getElementById("isBusiness").checked,
    isCensus: document.getElementById("isCensus").checked,
    registrationCompleted: true, // New field to indicate registration is complete
  };

  // If business-related information is provided
  if (formData.isBusiness) {
    formData.businessDetails = {
      nombreNegocio: document.getElementById("nombreNegocio").value,
      emailNegocio: document.getElementById("emailNegocio").value,
      idNegocio: document.getElementById("idNegocio").value,
      roleNegocio: document.getElementById("roleNegocio").value,
      puntoVenta: document.getElementById("PV").value,
    };
  }

  
  try {
    const userInfo = transferreduserInfo; // Ensure this variable is defined elsewhere
    const docRef = doc(db, "users", userInfo);

    // Check if the document exists
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        // Update the document with new information
        await updateDoc(docRef, formData);
        console.log("Document updated successfully!");
    } else {
        // Create a new document if it doesn't exist
        await setDoc(docRef, formData);
        console.log("Document created successfully!");
    }

    // Optionally save data in localStorage
    localStorage.setItem(userInfo, JSON.stringify(formData));



    alert("Form submitted successfully!");
    // Redirect based on checkbox status
    window.location.href = "index7.html";
   
} catch (error) {
    console.error("Error updating document:", error);
    alert("Error submitting the form. Please try again.");
}



});

document.addEventListener('DOMContentLoaded', () => {
  const isBusinessCheckbox = document.getElementById('isBusiness');
  const businessContent = document.getElementById('BusinessContent');

  isBusinessCheckbox.addEventListener('change', () => {
    if (isBusinessCheckbox.checked) {
      businessContent.classList.remove('hidden');
      businessContent.classList.add('visible');
    } else {
      businessContent.classList.remove('visible');
      businessContent.classList.add('hidden');
    }
  });
});

async function applyBranding() {
  const Content = await checkDocumentExists("RevolApp", "Content");
  const Tiers = await checkDocumentExists("RevolApp", "Tiers");
  const Buissnes = await checkDocumentExists("RevoBuissnes", transferredInfo);


  const UBU = Buissnes.UBU;
  const BuIcon = UBU.BuIcon;
  const{BuDark, BuLight} = BuIcon

  const Evaluation =  Buissnes.Evaluation;
  const {TextCon, tittle} = Evaluation.EtextContent;

  const {Base, Prime1, Prime2, Prime3} = UBU.Colors;

  function renderLeft(){

    function RenderTextInfo(title, titleText, urlId){

      // Create elements for title, title text, question, input, and button
      const h1 = document.createElement("h1");
      const p = document.createElement("p");
      // Set text and attributes for the elements
      h1.textContent = title;
      p.textContent = titleText;

      const courseBannerElement = document.getElementById(urlId);
      if (courseBannerElement) {
      courseBannerElement.appendChild(h1);
      courseBannerElement.appendChild(p);
      }

    }

    function renderBackgroundColors(color, Tcolor, urlId){
      const LeftBgColor = document.getElementById(urlId);
      if (LeftBgColor) {
        LeftBgColor.style.backgroundColor = color;  
        LeftBgColor.style.color = Tcolor;  
        
      } else {
          console.error('Element with ID "TextContent" not found.');
      }
    }

    // Render Text & Tittle color
    RenderTextInfo(tittle, TextCon, 'TextContent')
    // Render background color
    renderBackgroundColors(Base, Prime2, 'TextContent')

  }

  function renderRight(){


    function renderBackgroundColors(color, urlId){
      const LeftBgColor = document.getElementById(urlId);
      if (LeftBgColor) {
        LeftBgColor.style.backgroundColor = color;    
      } else {
          console.error('Element with ID "TextContent" not found.');
      }
    }
    function renderBuIcon(newSrc, imgId) {
      const imgElement = document.getElementById(imgId);
      if (imgElement) {
          imgElement.src = newSrc;
      } else {
          console.error(`Image element with ID "${imgId}" not found.`);
      }
    }
    function renderBtnColor(color, urlId, Tcolor){
      const BtnColor = document.getElementById(urlId);
      if (BtnColor) {
        BtnColor.style.backgroundColor = color;
        BtnColor.style.color = Tcolor;
  
     
          
      } else {
          console.error('Element with ID "TextContent" not found.');
      }
    }

    // HearderMobile Color
    renderBackgroundColors(Prime1, 'mobileImg')
    // FromBackground Color
    renderBackgroundColors(Prime3, 'RegistroBlock')
    // Line top Background Color
    renderBackgroundColors(Base, 'lines')
    // Line Bottom Background Color
    renderBackgroundColors(Base, 'linesL')

    renderBuIcon(BuLight, 'IconLogo' )
    // Send Btn Color
    renderBtnColor(Base, 'SendBtn', Prime2)




  }

  renderRight()
  renderLeft()
}

applyBranding()

document.addEventListener('touchstart', function (event) {
  if (event.touches.length > 1) {
    event.preventDefault(); // Prevents zooming
  }
}, { passive: false });
