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


// Fetch census info
async function getCensoInfo() {
  try {
    const docRef = doc(db, 'users', transferreduserInfo);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
}

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
    RHR: document.getElementById("heartRate")?.value || null,
    frecuenciaEjercicio: document.getElementById("ejercicio-select")?.value === "true" ? document.getElementById("frequency")?.value : null,
    tiempoSinEjercicio: document.getElementById("ejercicio-select")?.value === "false" ? document.getElementById("exercise-time")?.value : null,
    fuma: document.getElementById("smoking-select")?.value || null,
    añosFumando: document.getElementById("smoking-select")?.value === "true" ? document.getElementById("smoking-years-select")?.value : null,
    tiempoSinFumar: document.getElementById("smoking-select")?.value === "false" ? document.getElementById("quit-smoking-time")?.value : null,
    cerveza: document.getElementById("beer")?.value || null,
    vinoEspumante: document.getElementById("wine")?.value || null,
    destilados: document.getElementById("spirits")?.value || null,
    timestamp: new Date().toISOString(),
  };

  try {
    const userId = transferreduserInfo;
    if (!userId) {
      throw new Error("User ID is not set in localStorage.");
    }

    const userRef = doc(db, "users", userId);
    const evaluationsRef = collection(userRef, "evaluation");
    const newDocRef = await addDoc(evaluationsRef, formData);

    console.log(`New evaluation added with ID: ${newDocRef.id}`);

    await updateDoc(userRef, {
      lastEvaluation: formData,
      lastEvaluationId: newDocRef.id,
      evaluation: true,
    });
    
    console.log("Evaluation field updated to true in the user's document.");
    localStorage.setItem("userInfo", JSON.stringify(formData));

    // Fetch census information and redirect accordingly
    const data = await getCensoInfo();
    if (data) {
      const isCensusChecked = data.isCensus;
      alert("Form submitted successfully!");
      window.location.href = isCensusChecked ? "index.html" : "index9.html";
    }
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







async function getUserinfo() {
  try {
    // Reference a document in the "revoFitweb" collection with ID "landing"
    const docRef = doc(db, 'users', transferreduserInfo);
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
document.addEventListener("DOMContentLoaded", () => {
  getUserinfo().then((userInfo) => {
    const { nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, genero } = userInfo;

    function weightErrorBlock(){
    const pesoInput = document.getElementById("peso");
    const errorMsg = document.getElementById("error-msg");
    if (!pesoInput || !errorMsg) {
      console.error("Elementos no encontrados en el DOM.");
      return;
    }
    pesoInput.addEventListener("input", function () {
      const peso = parseFloat(this.value);
      let min = 0, max = 0;

      if (genero === "Male") {
        min = 50;
        max = 200;
      } else if (genero === "Female") {
        min = 40;
        max = 150;
      } else {
        console.error("Género no reconocido:", genero);
        return;
      }

      if (!isNaN(peso) && peso >= min && peso <= max) {
        this.setCustomValidity("");
        errorMsg.style.display = "none";
      } else {
        this.setCustomValidity("Peso fuera del rango permitido");
        errorMsg.textContent = `El peso debe estar entre ${min}kg y ${max}kg.`;
        errorMsg.style.display = "block";
      }
    });
    }


    function heightErrorBlock() {
      const heightInput = document.getElementById("altura");
      const errorMsg = document.getElementById("error-msg-height");
      
      if (!heightInput || !errorMsg) {
        console.error("Elementos no encontrados en el DOM.");
        return;
      }
    
      heightInput.addEventListener("input", function () {
        const height = parseFloat(this.value);
        let min = 0, max = 0;
    
        if (genero === "Male") {
          min = 145; // Minimum reasonable male height in cm (5'0")
          max = 215; // Maximum reasonable male height in cm (7'0")
        } else if (genero === "Female") {
          min = 140; // Minimum reasonable female height in cm (4'7")
          max = 210; // Maximum reasonable female height in cm (6'7")
        } else {
          console.error("Género no reconocido:", genero);
          return;
        }
    
        if (!isNaN(height) && height >= min && height <= max) {
          this.setCustomValidity("");
          errorMsg.style.display = "none";
        } else {
          this.setCustomValidity("Altura fuera del rango permitido");
          errorMsg.textContent = `La altura debe estar entre ${min}cm y ${max}cm.`;
          errorMsg.style.display = "block";
        }
      });
    }


    function wristErrorBlock() {
      const wristInput = document.getElementById("muneca");
      const errorMsg = document.getElementById("error-msg-wrist");
    
      if (!wristInput || !errorMsg) {
        console.error("Elementos no encontrados en el DOM.");
        return;
      }
    
      wristInput.addEventListener("input", function () {
        const wrist = parseFloat(this.value);
        let min = 0, max = 0;
    
        if (genero === "Male") {
          min = 1.5; // Minimum reasonable male wrist size in cm
          max = 22; // Maximum reasonable male wrist size in cm
        } else if (genero === "Female") {
          min = 10; // Minimum reasonable female wrist size in cm
          max = 20; // Maximum reasonable female wrist size in cm
        } else {
          console.error("Género no reconocido:", genero);
          return;
        }
    
        if (!isNaN(wrist) && wrist >= min && wrist <= max) {
          this.setCustomValidity("");
          errorMsg.style.display = "none";
        } else {
          this.setCustomValidity("Tamaño de muñeca fuera del rango permitido");
          errorMsg.textContent = `El tamaño de muñeca debe estar entre ${min}cm y ${max}cm.`;
          errorMsg.style.display = "block";
        }
      });
    }


    function kneeErrorBlock() {
      const kneeInput = document.getElementById("rodilla");
      const errorMsg = document.getElementById("error-msg-Knee");
    
      if (!kneeInput || !errorMsg) {
        console.error("Elementos no encontrados en el DOM.");
        return;
      }
    
      kneeInput.addEventListener("input", function () {
        const knee = parseFloat(this.value);
        let min = 0, max = 0;
    
        if (genero === "Male") {
          min = 29; // Minimum reasonable male knee width in cm
          max = 60; // Maximum reasonable male knee width in cm
        } else if (genero === "Female") {
          min = 25; // Minimum reasonable female knee width in cm
          max = 58; // Maximum reasonable female knee width in cm
        } else {
          console.error("Género no reconocido:", genero);
          return;
        }
    
        if (!isNaN(knee) && knee >= min && knee <= max) {
          this.setCustomValidity("");
          errorMsg.style.display = "none";
        } else {
          this.setCustomValidity("Tamaño de rodilla fuera del rango permitido");
          errorMsg.textContent = `El tamaño de la rodilla debe estar entre ${min}cm y ${max}cm.`;
          errorMsg.style.display = "block";
        }
      });
    }
  
    function waistErrorBlock() {
      const waistInput = document.getElementById("cintura");
      const errorMsg = document.getElementById("error-msg-waist");
    
      if (!waistInput || !errorMsg) {
        console.error("Elementos no encontrados en el DOM.");
        return;
      }
    
      waistInput.addEventListener("input", function () {
        const waist = parseFloat(this.value);
        let min = 0, max = 0;
    
        if (genero === "Male") {
          min = 55; // Minimum reasonable male waist size in cm
          max = 150; // Maximum reasonable male waist size in cm
        } else if (genero === "Female") {
          min = 50; // Minimum reasonable female waist size in cm
          max = 150; // Maximum reasonable female waist size in cm
        } else {
          console.error("Género no reconocido:", genero);
          return;
        }
    
        if (!isNaN(waist) && waist >= min && waist <= max) {
          this.setCustomValidity("");
          errorMsg.style.display = "none";
        } else {
          this.setCustomValidity("Tamaño de cintura fuera del rango permitido");
          errorMsg.textContent = `El tamaño de la cintura debe estar entre ${min}cm y ${max}cm.`;
          errorMsg.style.display = "block";
        }
      });
    }

    function hipsErrorBlock() {
      const hipsInput = document.getElementById("cadera");
      const errorMsg = document.getElementById("error-msg-hips");
    
      if (!hipsInput || !errorMsg) {
        console.error("Elementos no encontrados en el DOM.");
        return;
      }
    
      hipsInput.addEventListener("input", function () {
        const hips = parseFloat(this.value);
        let min = 0, max = 0;
    
        if (genero === "Male") {
          min = 75; // Minimum reasonable male hips size in cm
          max = 176; // Maximum reasonable male hips size in cm
        } else if (genero === "Female") {
          min = 77; // Minimum reasonable female hips size in cm
          max = 150; // Maximum reasonable female hips size in cm
        } else {
          console.error("Género no reconocido:", genero);
          return;
        }
    
        if (!isNaN(hips) && hips >= min && hips <= max) {
          this.setCustomValidity("");
          errorMsg.style.display = "none";
        } else {
          this.setCustomValidity("Tamaño de cadera fuera del rango permitido");
          errorMsg.textContent = `El tamaño de la cadera debe estar entre ${min}cm y ${max}cm.`;
          errorMsg.style.display = "block";
        }
      });
    }
    
    function rightArmErrorBlock() {
      const rightArmInput = document.getElementById("brazo-derecho");
      const errorMsg = document.getElementById("error-msg-arm");
    
      if (!rightArmInput || !errorMsg) {
        console.error("Elementos no encontrados en el DOM.");
        return;
      }
    
      rightArmInput.addEventListener("input", function () {
        const rightArm = parseFloat(this.value);
        let min = 0, max = 0;
    
        if (genero === "Male") {
          min = 19; // Minimum reasonable male right arm size in cm
          max = 65; // Maximum reasonable male right arm size in cm
        } else if (genero === "Female") {
          min = 15; // Minimum reasonable female right arm size in cm
          max = 66; // Maximum reasonable female right arm size in cm
        } else {
          console.error("Género no reconocido:", genero);
          return;
        }
    
        if (!isNaN(rightArm) && rightArm >= min && rightArm <= max) {
          this.setCustomValidity("");
          errorMsg.style.display = "none";
        } else {
          this.setCustomValidity("Tamaño del brazo derecho fuera del rango permitido");
          errorMsg.textContent = `El tamaño del brazo derecho debe estar entre ${min}cm y ${max}cm.`;
          errorMsg.style.display = "block";
        }
      });
    }

    function rightLegErrorBlock() {
      const rightLegInput = document.getElementById("pierna-derecha");
      const errorMsg = document.getElementById("error-msg-leg");
    
      if (!rightLegInput || !errorMsg) {
        console.error("Elementos no encontrados en el DOM.");
        return;
      }
    
      rightLegInput.addEventListener("input", function () {
        const rightLeg = parseFloat(this.value);
        let min = 0, max = 0;
    
        if (genero === "Male") {
          min = 33; // Minimum reasonable male right leg size in cm
          max = 75; // Maximum reasonable male right leg size in cm
        } else if (genero === "Female") {
          min = 30; // Minimum reasonable female right leg size in cm
          max = 77; // Maximum reasonable female right leg size in cm
        } else {
          console.error("Género no reconocido:", genero);
          return;
        }
    
        if (!isNaN(rightLeg) && rightLeg >= min && rightLeg <= max) {
          this.setCustomValidity("");
          errorMsg.style.display = "none";
        } else {
          this.setCustomValidity("Tamaño de pierna derecha fuera del rango permitido");
          errorMsg.textContent = `El tamaño de la pierna derecha debe estar entre ${min}cm y ${max}cm.`;
          errorMsg.style.display = "block";
        }
      });
    }


    function neckErrorBlock() {
      const neckInput = document.getElementById("cuello");
      const errorMsg = document.getElementById("error-msg-neck");
    
      if (!neckInput || !errorMsg) {
        console.error("Elementos no encontrados en el DOM.");
        return;
      }
    
      neckInput.addEventListener("input", function () {
        const neck = parseFloat(this.value);
        let min = 0, max = 0;
    
        if (genero === "Male") {
          min = 35; // Minimum reasonable male neck size in cm
          max = 45; // Maximum reasonable male neck size in cm
        } else if (genero === "Female") {
          min = 30; // Minimum reasonable female neck size in cm
          max = 40; // Maximum reasonable female neck size in cm
        } else {
          console.error("Género no reconocido:", genero);
          return;
        }
    
        if (!isNaN(neck) && neck >= min && neck <= max) {
          this.setCustomValidity("");
          errorMsg.style.display = "none";
        } else {
          this.setCustomValidity("Tamaño de cuello fuera del rango permitido");
          errorMsg.textContent = `El tamaño del cuello debe estar entre ${min}cm y ${max}cm.`;
          errorMsg.style.display = "block";
        }
      });
    }
    











    neckErrorBlock()
    rightLegErrorBlock()
    rightArmErrorBlock()

    hipsErrorBlock()
    waistErrorBlock()
    kneeErrorBlock()
    wristErrorBlock()
    heightErrorBlock()

    weightErrorBlock()
  })




});

document.addEventListener("DOMContentLoaded", function () {
  function setupDropdownListener(mainSelectId, yesExtraId, noExtraId, mainQuestionId) {
      const mainSelect = document.getElementById(mainSelectId);
      const yesExtra = document.getElementById(yesExtraId);
      const noExtra = document.getElementById(noExtraId);
      const mainQuestion = document.getElementById(mainQuestionId);

      if (!mainSelect || !yesExtra || !noExtra || !mainQuestion) return;

      mainSelect.addEventListener("change", function () {
          if (mainSelect.value === "true") {
              yesExtra.style.display = "flex";
              noExtra.style.display = "none";
          } else if (mainSelect.value === "false") {
              yesExtra.style.display = "flex";
              noExtra.style.display = "none";
          } else {
              yesExtra.style.display = "none";
              noExtra.style.display = "none";
          }

          if (mainSelect.value) {
              mainQuestion.style.display = "none";
          } else {
              mainQuestion.style.display = "flex";
          }
      });
  }
  function setupDropdownListeneralcohol() {
    const mainSelectBlock = document.getElementById("main-question-drink");
    const mainSelect = document.getElementById("drink-select");
    const drinkTittle = document.getElementById("drink-consumption");
    const ChooseDrink = document.getElementById("ChooseDrink");
    const drinkAmount = document.getElementById("drink-category-amount");
    const yesExtra = document.getElementById("yes-extra-question-drink");
    const noExtra = document.getElementById("no-extra-question-drink");
    const drinkSelect =document.getElementById("Drink");
    

    if (!mainSelect || !drinkTittle || !ChooseDrink || !drinkAmount || !yesExtra || !noExtra || !drinkSelect) return;

    mainSelect.addEventListener("change", function () {
        if (mainSelect.value === "true") {
            mainSelectBlock.style.display = "none";
            drinkTittle.style.display = "flex";
            ChooseDrink.style.display = "flex";
            drinkAmount.style.display = "none";
            yesExtra.style.display    = "none";
            noExtra.style.display     = "none";
        
        
          } else {
            mainSelectBlock.style.display = "none";
            noExtra.style.display = "flex";
            

        }
    });

    drinkSelect.addEventListener("change", function () {
        if (["Cerveza", "Vino", "Destilados"].includes(drinkSelect.value)) {
            mainSelectBlock.style.display = "none";
            drinkTittle.style.display     = "none";
            drinkTittle.style.display     = "none";
            ChooseDrink.style.display      = "none";
            drinkAmount.style.display = "flex"; // Show the amount selection if the drink is selected
        } else {
            ChooseDrink.style.display = "flex";; // Hide the amount selection if other options are selected
        }
    });
  }

  setupDropdownListeneralcohol();









  function setupDropdownListenersmoking() {
    const mainSelectBlock = document.getElementById("main-question-drink");
    const smoking = document.getElementById("smoking-select");
    const yesExtra = document.getElementById("yes-smoking-extra");
    const noExtra = document.getElementById("no-smoking-extra");
    

    if (!mainSelectBlock || !smoking || !yesExtra || !noExtra ) return;

    smoking.addEventListener("change", function () {
        if (smoking.value === "true") {
            mainSelectBlock.style.display = "none";
            yesExtra.style.display        = "flex";
            noExtra.style.display         = "none";
        }else {
            mainSelectBlock.style.display = "none";
            yesExtra.style.display        = "none";
            noExtra.style.display         = "flex";
        }

       
    });
}








setupDropdownListenersmoking();





  setupDropdownListener("ejercicio-select", "yes-extra-question", "no-extra-question", "main-question-ejercicio");
  
});

document.addEventListener("DOMContentLoaded", function () {
 // Generalized function for checkbox logic
 function handleCheckboxToggle(checkboxId, blockId) {
  const checkbox = document.getElementById(checkboxId);
  const block = document.getElementById(blockId);

  if (checkbox && block) {
    block.style.display = "none";

    checkbox.addEventListener("change", function () {
      block.style.display = checkbox.checked ? "flex" : "none";
    });
  }
}

// Apply checkbox logic for conditions
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

conditions.forEach(({ checkboxId, blockId }) => handleCheckboxToggle(checkboxId, blockId));
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

  function GetBuFont(fontFamily) {
    document.body.style.fontFamily = fontFamily;
   }
   GetBuFont(data.UBU.font);

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
     //Render background color
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
          { src: ReviewIcons.HrIcon, alt: 'Heart Rate Icon', parentId: 'hrIcon' },
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
