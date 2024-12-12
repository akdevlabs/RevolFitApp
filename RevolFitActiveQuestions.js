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





// Submission logic
document.getElementById("EvaluationQuestions").addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = {
    peso: document.getElementById("peso")?.value || null,
    altura: document.getElementById("altura")?.value || null,
    muneca: document.getElementById("muneca")?.value || null,
    rodilla: document.getElementById("rodilla")?.value || null,
    cintura: document.getElementById("cintura")?.value || null,
    cadera: document.getElementById("cadera")?.value || null,
    brazoDerecho: document.getElementById("brazo-derecho")?.value || null,
    piernaDerecha: document.getElementById("pierna-derecha")?.value || null,
    cuello: document.getElementById("cuello")?.value || null,
    ejercicio: document.getElementById("ejercicio-select")?.value || null,
    frecuenciaEjercicio: document.getElementById("ejercicio-select")?.value === "true"
      ? document.getElementById("frequency")?.value
      : null,
    tiempoSinEjercicio: document.getElementById("ejercicio-select")?.value === "false"
      ? document.getElementById("exercise-time")?.value
      : null,
    fuma: document.getElementById("smoke-select")?.value || null,
    frecuenciaFuma: document.getElementById("smoke-select")?.value === "true"
      ? document.getElementById("smoke-frequency")?.value
      : null,
    tiempoSinFumar: document.getElementById("smoke-select")?.value === "false"
      ? document.getElementById("quit-smoking-time")?.value
      : null,
  };

  const chronicDiseases = [
    { id: "Hipertensión", tratadoId: "HipertensiónTratado-select" },
    { id: "Hipercolesteremia", tratadoId: "HipercolesteremiaTratado-select" },
    { id: "Diabetes", tratadoId: "DiabeteTratado-select" },
    { id: "Obesidad", tratadoId: "ObesidadTratado-select" },
    { id: "HígadoGraso", tratadoId: "HígadoGrasoTratado-select" },
    { id: "OtraECNT", tratadoId: "OtraECNTTratado-select" },
  ];

  chronicDiseases.forEach((disease) => {
    const element = document.getElementById(disease.id);
    if (element) {
      const isChecked = element.checked;
      formData[disease.id] = isChecked;
      formData[`${disease.id}Tratado`] = isChecked
        ? document.getElementById(disease.tratadoId)?.value || null
        : null;
    } else {
      console.warn(`Element with ID "${disease.id}" not found.`);
    }
  });

  const autoimmuneDiseases = [
    { id: "Lupus", tratadoId: "LupusTratado-select" },
    { id: "Celíaca", tratadoId: "CelíacaTratado-select" },
    { id: "Cáncer", tratadoId: "CáncerTratado-select" },
    { id: "VIH", tratadoId: "VIHTratado-select" },
    { id: "Artritis", tratadoId: "ArtritisTratado-select" },
    { id: "OEA", tratadoId: "OEATratado-select" },
  ];

  autoimmuneDiseases.forEach((disease) => {
    const element = document.getElementById(disease.id);
    if (element) {
      const isChecked = element.checked;
      formData[disease.id] = isChecked;
      formData[`${disease.id}Tratado`] = isChecked
        ? document.getElementById(disease.tratadoId)?.value || null
        : null;
    } else {
      console.warn(`Element with ID "${disease.id}" not found.`);
    }
  });

  formData.timestamp = new Date().toISOString();

  try {
    // Ensure `transferreduserInfo` and Firebase setup are correctly defined
    const userInfo = transferreduserInfo; 
    const userRef = doc(db, "users", userInfo);
    const evaluationsRef = collection(userRef, "evaluation");

    const newDocRef = await addDoc(evaluationsRef, formData);
    console.log(`New evaluation added with ID: ${newDocRef.id}`);
    alert("Evaluation submitted successfully!");
  } catch (error) {
    console.error("Error submitting the evaluation:", error);
    alert("Error submitting the evaluation. Please try again.");
  }
});





// Select all blocks and ensure only the first one is visible
const blocks = document.querySelectorAll('.Block');
let currentBlockIndex = 0;

// Show the first block on page load
function initializeBlocks() {
  blocks.forEach((block, index) => {
    block.classList.toggle('active', index === 0);
  });
}

// Function to validate required fields in a block
function validateBlock(blockIndex) {
  const block = blocks[blockIndex];
  const requiredFields = block.querySelectorAll("[required]");
  let isValid = true;

  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      isValid = false;
      field.classList.add("error"); // Add error class for styling
    } else {
      field.classList.remove("error");
    }
  });

  if (!isValid) {
    alert(`Please fill in all required fields in Block ${blockIndex + 1} before proceeding.`);
  }
  return isValid;
}

// Function to show a specific block by index
function showBlock(index) {
  blocks.forEach((block, i) => {
    block.classList.toggle('active', i === index);
  });
}

// Initialize blocks on page load
initializeBlocks();

// Navigation buttons
document.getElementById('BtnTwo').addEventListener('click', () => {
  if (validateBlock(0)) {
    currentBlockIndex = 1;
    showBlock(currentBlockIndex);
  }
});

document.getElementById('BtnThree').addEventListener('click', () => {
  if (validateBlock(1)) {
    currentBlockIndex = 2;
    showBlock(currentBlockIndex);
  }
});

document.getElementById('BtnFour').addEventListener('click', () => {
  if (validateBlock(2)) {
    currentBlockIndex = 3;
    showBlock(currentBlockIndex);
  }
});


// Initialize event listeners on DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  initializeBlocks();

  // Exercise Logic
  const ejercicioSelect = document.getElementById("ejercicio-select");
  const yesExtraQuestion = document.getElementById("yes-extra-question");
  const noExtraQuestion = document.getElementById("no-extra-question");

  yesExtraQuestion.style.display = "none";
  noExtraQuestion.style.display = "none";

  ejercicioSelect.addEventListener("change", function () {
    const selectedValue = ejercicioSelect.value;
    if (selectedValue === "true") {
      yesExtraQuestion.style.display = "flex";
      noExtraQuestion.style.display = "none";
    } else if (selectedValue === "false") {
      yesExtraQuestion.style.display = "none";
      noExtraQuestion.style.display = "flex";
    } else {
      yesExtraQuestion.style.display = "none";
      noExtraQuestion.style.display = "none";
    }
  });

  // Smoking Logic
  const smokeSelect = document.getElementById("smoke-select");
  const yesExtraQuestionSmoke = document.getElementById("yes-extra-question-smoke");
  const noExtraQuestionSmoke = document.getElementById("no-extra-question-smoke");

  yesExtraQuestionSmoke.style.display = "none";
  noExtraQuestionSmoke.style.display = "none";

  smokeSelect.addEventListener("change", function () {
    const selectedValue = smokeSelect.value;
    if (selectedValue === "true") {
      yesExtraQuestionSmoke.style.display = "flex";
      noExtraQuestionSmoke.style.display = "none";
    } else if (selectedValue === "false") {
      yesExtraQuestionSmoke.style.display = "none";
      noExtraQuestionSmoke.style.display = "flex";
    } else {
      yesExtraQuestionSmoke.style.display = "none";
      noExtraQuestionSmoke.style.display = "none";
    }
  });

  // Additional conditions logic
  const conditions = [
    { checkboxId: "Hipercolesteremia", blockId: "HipercolesteremiaTratadoBlock" },
    { checkboxId: "Diabetes", blockId: "DiabeteTratadoBlock" },
    { checkboxId: "Obesidad", blockId: "ObesidadTratadoBlock" },
    { checkboxId: "HígadoGraso", blockId: "HígadoGrasoTratadoBlock" },
    { checkboxId: "OtraECNT", blockId: "OtraECNTTratadoBlock" },
    { checkboxId: "Lupus", blockId: "LupusTratadoBlock" },
    { checkboxId: "Celíaca", blockId: "CelíacaTratadoBlock" },
    { checkboxId: "Cáncer", blockId: "CáncerTratadoBlock" },
    { checkboxId: "VIH", blockId: "VIHTratadoBlock" },
    { checkboxId: "Artritis", blockId: "ArtritisTratadoBlock" },
    { checkboxId: "OEA", blockId: "OEATratadoBlock" },
  ];

  conditions.forEach(({ checkboxId, blockId }) => {
    const checkbox = document.getElementById(checkboxId);
    const block = document.getElementById(blockId);

    checkbox.addEventListener("change", function () {
      block.style.display = checkbox.checked ? "flex" : "none";
    });
  });
});






document.addEventListener("DOMContentLoaded", function () {
  // Exercise Logic
  const ejercicioSelect = document.getElementById("ejercicio-select");
  const yesExtraQuestion = document.getElementById("yes-extra-question");
  const noExtraQuestion = document.getElementById("no-extra-question");

  yesExtraQuestion.style.display = "none";
  noExtraQuestion.style.display = "none";

  ejercicioSelect.addEventListener("change", function () {
    const selectedValue = ejercicioSelect.value;
    if (selectedValue === "true") {
      yesExtraQuestion.style.display = "flex";
      noExtraQuestion.style.display = "none";
    } else if (selectedValue === "false") {
      yesExtraQuestion.style.display = "none";
      noExtraQuestion.style.display = "flex";
    } else {
      yesExtraQuestion.style.display = "none";
      noExtraQuestion.style.display = "none";
    }
  });

  // Smoking Logic
  const smokeSelect = document.getElementById("smoke-select");
  const yesExtraQuestionSmoke = document.getElementById("yes-extra-question-smoke");
  const noExtraQuestionSmoke = document.getElementById("no-extra-question-smoke");

  yesExtraQuestionSmoke.style.display = "none";
  noExtraQuestionSmoke.style.display = "none";

  smokeSelect.addEventListener("change", function () {
    const selectedValue = smokeSelect.value;
    if (selectedValue === "true") {
      yesExtraQuestionSmoke.style.display = "flex";
      noExtraQuestionSmoke.style.display = "none";
    } else if (selectedValue === "false") {
      yesExtraQuestionSmoke.style.display = "none";
      noExtraQuestionSmoke.style.display = "flex";
    } else {
      yesExtraQuestionSmoke.style.display = "none";
      noExtraQuestionSmoke.style.display = "none";
    }
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const conditions = [
    { checkboxId: "Hipercolesteremia", blockId: "HipercolesteremiaTratadoBlock" },
    { checkboxId: "Diabetes", blockId: "DiabeteTratadoBlock" },
    { checkboxId: "Obesidad", blockId: "ObesidadTratadoBlock" },
    { checkboxId: "HígadoGraso", blockId: "HígadoGrasoTratadoBlock" },
    { checkboxId: "OtraECNT", blockId: "OtraECNTTratadoBlock" },
  ];

  conditions.forEach(({ checkboxId, blockId }) => {
    const checkbox = document.getElementById(checkboxId);
    const block = document.getElementById(blockId);

    checkbox.addEventListener("change", function () {
      if (checkbox.checked) {
        block.style.display = "flex";
      } else {
        block.style.display = "none";
      }
    });
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const conditions = [
    { checkboxId: "Lupus", blockId: "LupusTratadoBlock" },
    { checkboxId: "Celíaca", blockId: "CelíacaTratadoBlock" },
    { checkboxId: "Cáncer", blockId: "CáncerTratadoBlock" },
    { checkboxId: "VIH", blockId: "VIHTratadoBlock" },
    { checkboxId: "Artritis", blockId: "ArtritisTratadoBlock" },
    { checkboxId: "OEA", blockId: "OEATratadoBlock" },
  ];

  conditions.forEach(({ checkboxId, blockId }) => {
    const checkbox = document.getElementById(checkboxId);
    const block = document.getElementById(blockId);

    checkbox.addEventListener("change", function () {
      if (checkbox.checked) {
        block.style.display = "flex";
      } else {
        block.style.display = "none";
      }
    });
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
    


    if (lineBlockR) {
      lineBlockR.style.backgroundColor = lines;
     
    } else {
        console.error('Element with ID "TextContent" not found.');
    }
  }
  
  function renderBtnColor(){
    const lines = AppIntroValue.Bcolors;
    const sideTextColor = AppIntroValue.sideTextColor;
    const BtnColor = document.getElementById('rSendBtn');
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
async function getBtncolors() {
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
getBtncolors().then((data) => {
  const AppIntroValue = data.Evaluation; // Retrieve nested data

  function renderBtnColor() {
      // Extract colors
      const backgroundColor = AppIntroValue?.Bcolors || '#ffffff'; // Default to white if undefined
      const textColor = AppIntroValue?.Rbackground || '#000000';  // Default to black if undefined

      // List of button IDs
      const buttonIds = ['BtnTwo', 'BtnThree', 'BtnFour'];

      // Apply styles to each button
      buttonIds.forEach((id) => {
          const button = document.getElementById(id);
          if (button) {
              button.style.backgroundColor = backgroundColor;
              button.style.color = textColor;
          } else {
              console.error(`Element with ID "${id}" not found.`);
          }
      });
  }

  renderBtnColor();
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
async function getEIcons() {
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
getEIcons().then((data) => {
  const AppIntroValue = data.Evaluation; // Retrieve nested data

  // Mapping of icon data to parent element IDs
  const icons = [
      { src: AppIntroValue.PIcon, alt: 'Weight Icon', parentId: 'pIcon' },
      { src: AppIntroValue.aIcon, alt: 'Height Icon', parentId: 'aIcon' },
      { src: AppIntroValue.RIcon, alt: 'Wrist Icon', parentId: 'rIcon' },
      { src: AppIntroValue.KIcon, alt: 'Knee Icon', parentId: 'kIcon' },
      { src: AppIntroValue.CIcon, alt: 'Waist Icon', parentId: 'wIcon' },
      { src: AppIntroValue.HipIcon, alt: 'Hips Icon', parentId: 'hIcon' },
      { src: AppIntroValue.Ticon, alt: 'Arm Icon', parentId: 'tIcon' },
      { src: AppIntroValue.Licon, alt: 'Leg Icon', parentId: 'lIcon' },
      { src: AppIntroValue.Nicon, alt: 'Neck Icon', parentId: 'nIcon' },
  ];

  // Reusable function to create and append icons
  function createIcon(src, alt, parentId, styles = {}) {
      const img = document.createElement('img');
      img.src = src;
      img.alt = alt;

      // Apply styles to the image
      Object.entries(styles).forEach(([key, value]) => {
          img.style[key] = value;
      });

      // Find and validate the parent element
      const parent = document.getElementById(parentId);
      if (parent && parent.classList.contains('qIcon')) {
          parent.appendChild(img);
      } else {
          console.error(
              `Parent element with ID "${parentId}" and class "qIcon" not found.`
          );
      }
  }

  // Loop through the icons array and create each icon
  icons.forEach(({ src, alt, parentId }) => {
      createIcon(src, alt, parentId, { width: '60px', height: '60px' });
  });
});









async function getCheckboxColor() {
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
getCheckboxColor().then((data) => {
const AppIntroValue = data.Evaluation; // Retrieve nested data
const boxColor = AppIntroValue.BtnColor;


function setCheckboxAccentColor(color) {
  // Create a <style> element if it doesn't already exist
  let styleElement = document.getElementById('dynamicCheckboxStyles');
  
  if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'dynamicCheckboxStyles';
      document.head.appendChild(styleElement);
  }

  // Update the style content
  styleElement.textContent = `
      input[type="checkbox"] {
          accent-color: ${color};
      }
  `;
}

// Example usage:
setCheckboxAccentColor(boxColor);
 


});


document.getElementById("rSendBtn").addEventListener("click", async (event) => {
  event.preventDefault();

  // Your form submission logic here
  const formData = {
    peso: document.getElementById("peso")?.value || null,
    altura: document.getElementById("altura")?.value || null,
    muneca: document.getElementById("muneca")?.value || null,
    // Add other fields here...
  };

  try {
    // Submit logic (if any)
    console.log("Form submitted successfully:", formData);
    
    // After successful submission, redirect to index9.html
    window.location.href = "index9.html";
  } catch (error) {
    console.error("Error during submission:", error);
    alert("Submission failed. Please try again.");
  }
});
