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
    timestamp: new Date().toISOString(),
  };

  try {
    const userId = transferreduserInfo; // Retrieved from localStorage
    if (!userId) {
      throw new Error("User ID is not set in localStorage.");
    }

    const userRef = doc(db, "users", userId);

    console.log(typeof userRef);

    // Add the evaluation data to a sub-collection within the user document
    const evaluationsRef = collection(userRef, "evaluation");
    const newDocRef = await addDoc(evaluationsRef, formData);

    console.log(`New evaluation added with ID: ${newDocRef.id}`);

    // Update the user's main document with a reference or summary of the evaluation
    await updateDoc(userRef, {
      lastEvaluation: formData, // Save a summary of the latest evaluation
      lastEvaluationId: newDocRef.id, // Save the document ID
    });



    // Update the evaluation field in the user's main document
    await updateDoc(userRef, { evaluation: true });
    console.log("Evaluation field updated to true in the user's document.");

    alert("Evaluation submitted and saved successfully!");
    window.location.href = "index9.html";
  } catch (error) {
    console.error("Error submitting the evaluation:", error);
    alert("Error submitting the evaluation. Please try again.");
  }
});



















// Block initialization logic
const blocks = document.querySelectorAll('.Block');
let currentBlockIndex = 0;

function initializeBlocks() {
  blocks.forEach((block, index) => {
    block.classList.toggle('active', index === 0);
  });
}

function validateBlock(blockIndex) {
  const block = blocks[blockIndex];
  const requiredFields = block.querySelectorAll("[required]");
  let isValid = true;

  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      isValid = false;
      field.classList.add("error");
    } else {
      field.classList.remove("error");
    }
  });

  if (!isValid) {
    alert(`Please fill in all required fields in Block ${blockIndex + 1} before proceeding.`);
  }
  return isValid;
}

function showBlock(index) {
  blocks.forEach((block, i) => {
    block.classList.toggle('active', i === index);
  });
}

initializeBlocks();

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
      const ReviewIcons = Evaluation.ReviewIcons;
    
      
      // Mapping of icon data to parent element IDs
      const icons = [
          { src: ReviewIcons.PIcon, alt: 'Weight Icon', parentId: 'pIcon' },
          { src: ReviewIcons.aIcon, alt: 'Height Icon', parentId: 'aIcon' },
          { src: ReviewIcons.RIcon, alt: 'Wrist Icon', parentId: 'rIcon' },
          { src: ReviewIcons.KIcon, alt: 'Knee Icon', parentId: 'kIcon' },
          { src: ReviewIcons.CIcon, alt: 'Waist Icon', parentId: 'wIcon' },
          { src: ReviewIcons.HipIcon, alt: 'Hips Icon', parentId: 'hIcon' },
          { src: ReviewIcons.Ticon, alt: 'Arm Icon', parentId: 'tIcon' },
          { src: ReviewIcons.Licon, alt: 'Leg Icon', parentId: 'lIcon' },
          { src: ReviewIcons.Nicon, alt: 'Neck Icon', parentId: 'nIcon' },
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

    function renderBtnColor(Bcolor, Tcolor){
      // Extract colors
      const backgroundColor = Bcolor|| '#ffffff'; 
      // Default to white if undefined
      const textColor = Tcolor|| '#000000'; 
       // Default to black if undefined

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
      
    setCheckboxAccentColor(Base)
    renderBtnColor(Base, Prime2)
    // HearderMobile Color
    renderBackgroundColors(Prime1, 'mobileImg')
    // FromBackground Color
    renderBackgroundColors(Prime3, 'RegistroBlock')
    // Line top Background Color
    renderBackgroundColors(Base, 'lines')
    // Line Bottom Background Color
    renderBackgroundColors(Base, 'linesL')

    renderBuIcon(BuLight, 'IconLogo' )






 




  }
  renderRight()






})
