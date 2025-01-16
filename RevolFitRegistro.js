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

    // Check if the census checkbox is checked
    const isCensusChecked = document.getElementById("isCensus").checked;

    alert("Form submitted successfully!");
    // Redirect based on checkbox status
    if (isCensusChecked) {
        window.location.href = "index7.1.html";
    } else {
        window.location.href = "index7.html";
    }
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

document.addEventListener('DOMContentLoaded', () => {
  const isCensusCheckbox = document.getElementById('isCensusCheckbox');
  const censusContent = document.getElementById('CensusContent');

  isCensusCheckbox.addEventListener('change', () => {
    if (isCensusCheckbox.checked) {
      censusContent.classList.remove('hiddenCensusContent');
      censusContent.classList.add('visibleCensusContent');
    } else {
      censusContent.classList.remove('visibleCensusContent');
      censusContent.classList.add('hiddenCensusContent');
    }
  });
});


async function getItemsFromDB() {
  try {
    // Reference a document in the "revoFitweb" collection with ID "landing"
    const docRef = doc(db, 'RevoBuissnes', transferredInfo);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const documentData = docSnap.data(); // Store document data
      return documentData; // Return the data for external use
    } else {
      console.log("No such document!");
      return null; // Return null if no document is found
    }
  } catch (error) {
    console.error("Error fetching document:", error);
  }
}
getItemsFromDB().then((data) => {
  const UBU = data.UBU;
  
  const BuIcon = UBU.BuIcon;
  const{BuDark, BuLight} = BuIcon

  const Evaluation = data.Evaluation;
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
 
  renderLeft()



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






})








