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
    phone: document.getElementById("phone").value,
    ciudad: document.getElementById("ciudad").value,
    pais: document.getElementById("pais").value,
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

    // Check if registrationCompleted is true in the database
    const updatedDocSnap = await getDoc(docRef);
    if (updatedDocSnap.exists() && updatedDocSnap.data().registrationCompleted) {
      // Hide RegistroBlock
      const registroBlock = document.getElementById("RegistroBlock");
      registroBlock.classList.add("hidden");

      // Show Evaluation
      const evaluationContent = document.getElementById("Evaluation");
      evaluationContent.classList.remove("hidden");
      evaluationContent.classList.add("show");
    }

    // Optionally save data in localStorage
    localStorage.setItem(userInfo, JSON.stringify(formData));

    alert("Form submitted successfully!");
  } catch (error) {
    console.error("Error updating document:", error);
    alert("Error submitting the form. Please try again.");
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
  currentBlockIndex = 1;
  showBlock(currentBlockIndex);
});

document.getElementById('BtnThree').addEventListener('click', () => {
  currentBlockIndex = 2;
  showBlock(currentBlockIndex);
});

document.getElementById('BtnFour').addEventListener('click', () => {
  currentBlockIndex = 3;
  showBlock(currentBlockIndex);
});

// Submission logic
document.getElementById("EvaluationQuestions").addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = {
    peso: document.getElementById("peso").value,
    altura: document.getElementById("altura").value,
    muneca: document.getElementById("muneca").value,
    rodilla: document.getElementById("rodilla").value,
    cintura: document.getElementById("cintura").value,
    cadera: document.getElementById("cadera").value,
    brazoDerecho: document.getElementById("brazo-derecho").value,
    piernaDerecha: document.getElementById("pierna-derecha").value,
    cuello: document.getElementById("cuello").value,
    ejercicio: document.getElementById("ejercicio-select").value,
    frecuenciaEjercicio: document.getElementById("ejercicio-select").value === "true"
      ? document.getElementById("frequency").value
      : null,
    tiempoSinEjercicio: document.getElementById("ejercicio-select").value === "false"
      ? document.getElementById("exercise-time").value
      : null,
    fuma: document.getElementById("smoke-select").value,
    frecuenciaFuma: document.getElementById("smoke-select").value === "true"
      ? document.getElementById("smoke-frequency").value
      : null,
    tiempoSinFumar: document.getElementById("smoke-select").value === "false"
      ? document.getElementById("quit-smoking-time").value
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
    const isChecked = document.getElementById(disease.id).checked;
    formData[disease.id] = isChecked;
    formData[`${disease.id}Tratado`] = isChecked
      ? document.getElementById(disease.tratadoId).value
      : null;
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
    const isChecked = document.getElementById(disease.id).checked;
    formData[disease.id] = isChecked;
    formData[`${disease.id}Tratado`] = isChecked
      ? document.getElementById(disease.tratadoId).value
      : null;
  });

  formData.timestamp = new Date().toISOString();

  try {
    const userInfo = transferreduserInfo; // Ensure this variable is defined
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








  // Function to toggle the display of hidden questions
  document.querySelectorAll('.form-group-check').forEach(group => {
    const checkbox = group.querySelector('input[type="checkbox"]');
    const hiddenQuestion = group.querySelector('.hiddenQuestion');
    
    if (checkbox && hiddenQuestion) {
      checkbox.addEventListener('change', () => {
        hiddenQuestion.style.display = checkbox.checked ? 'block' : 'none';
      });
    }
  });






// Get the button element

function startCamera() {
  const video = document.getElementById('video');

  // Request access to the camera
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      // Attach the stream to the video element
      video.srcObject = stream;
    })
    .catch((err) => {
      console.error('Error accessing the camera:', err);
    });
}


