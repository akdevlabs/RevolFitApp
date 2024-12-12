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
    // Redirect to index7.html
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


async function getHeaderTittle() {
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
getHeaderTittle().then((data) => {
  const AppIntroValue = data.Evaluation; // Retrieve nested data
  const Logo = AppIntroValue.Icon; // Retrieve nested data

  function renderRegBackColor(){
    const aHc = AppIntroValue.appHcolor;
    
    const BtnColor = document.getElementById('mobileImg');
    if (BtnColor) {
      BtnColor.style.backgroundColor = aHc ;    
    } else {
        console.error('Element with ID "TextContent" not found.');
    }
  }
  function renderBuIcon(imgId, newSrc) {
    const imgElement = document.getElementById(imgId);
    if (imgElement) {
        imgElement.src = newSrc;
    } else {
        console.error(`Image element with ID "${imgId}" not found.`);
    }
  }  

  renderRegBackColor()
  renderBuIcon("IconLogo" , Logo);
});
async function getBucolors() {
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
getBucolors().then((data) => {
  const AppIntroValue = data.Evaluation; // Retrieve nested data

  function renderLinerightleft(){
    const lines = AppIntroValue.Bcolors;
    const lineBlockR = document.getElementById('lines');
    const lineBlockL = document.getElementById('linesL');


    if (lineBlockR) {
      lineBlockR.style.backgroundColor = lines;
      lineBlockL.style.backgroundColor = lines;
    } else {
        console.error('Element with ID "TextContent" not found.');
    }
  }
  
  function renderBtnColor(){
    const lines = AppIntroValue.Bcolors;
    const sideTextColor = AppIntroValue.sideTextColor;
    const BtnColor = document.getElementById('SendBtn');
    if (BtnColor) {
      BtnColor.style.backgroundColor = lines;
      BtnColor.style.color = sideTextColor;

   
        
    } else {
        console.error('Element with ID "TextContent" not found.');
    }
  }

  function renderRegBackColor(){
    const Rbackgroundcolor = AppIntroValue.Rbackground;

    const Rbackground = document.getElementById('RegistroBlock');
    
    if (Rbackground) {
      Rbackground.style.backgroundColor = Rbackgroundcolor;
    } else {
      console.error('Element with ID "TextContent" not found.');
    }
  }


  renderRegBackColor()
  renderLinerightleft()
  renderBtnColor()
});



async function getSideInformation() {
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
getSideInformation().then((data) => {
const AppIntroValue = data.Evaluation; // Retrieve nested data


 


function renderLeftcontent(){
  const title = AppIntroValue.tittle;
  const titleText = AppIntroValue.TextCont;

  // Create elements for title, title text, question, input, and button
  const h1 = document.createElement("h1");
  const p = document.createElement("p");
  // Set text and attributes for the elements
  h1.textContent = title;
  p.textContent = titleText;

  const courseBannerElement = document.getElementById('TextContent');
  if (courseBannerElement) {
    courseBannerElement.appendChild(h1);
    courseBannerElement.appendChild(p);}
}
function renderSide(){
  const sideColor = AppIntroValue.Bcolors;
  const sideTextColor = AppIntroValue.sideTextColor;
  

  
  const textContent = document.getElementById('TextContent');
  if (textContent) {
      textContent.style.backgroundColor = sideColor;
      textContent.style.color = sideTextColor;
      console.log(`Background color changed to ${sideColor}`);
  } else {
      console.error('Element with ID "TextContent" not found.');
  }
 


}

renderLeftcontent()
renderSide()
});





function startCamera() {
  const video = document.getElementById('video');
  const capture = document.getElementById('capture');
  const HiddeCamText = document.getElementById('HiddeCamText');
  
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      video.srcObject = stream;
      video.style.display = 'block'; 
      capture.style.display = 'block'; 
      HiddeCamText.style.display = 'none'; 

      // Show the video element
    })
    .catch((err) => {
      console.error('Error accessing the camera:', err);
      alert('Unable to access the camera. Please check your device permissions.');
    });
}

function capturePhoto() {
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  // Set canvas dimensions to match the video
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  // Draw the current video frame onto the canvas
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Convert canvas to a data URL (image)
  const imageData = canvas.toDataURL('image/png');

  // Optional: Show or use the captured image
  console.log('Captured Image:', imageData);
  alert('Photo captured!');
}

// Add a click event to start the camera
document.getElementById('startCamera').addEventListener('click', startCamera);

// Add a click event to capture the photo
document.getElementById('capture').addEventListener('click', capturePhoto);
// Function to save the captured photo









