// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore, doc, getDoc, collection, addDoc, setDoc  } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

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


async function checkDocumentExists(collectionName, documentId) {
  try {
    // Use `doc` to get a document reference
    const docRef = doc(db, collectionName, documentId);

    // Fetch the document snapshot
    const docSnap = await getDoc(docRef);

    // Check if the document exists and log the result
    if (docSnap.exists()) {
      console.log(`Document found:`, docSnap.data());
    } else {
      console.log(`No document found with ID: ${documentId}`);
    }
  } catch (error) {
    console.error("Error checking document:", error);
  }
}

  // Call the function with the correct string arguments
  checkDocumentExists("RevoBuissnes", transferredInfo);





















function countdown(){
let timerInterval;
let isRunning = false;
let seconds = 30; // Set the starting time in seconds (e.g., 5 minutes)

const timerElement = document.getElementById('Timer');
const actionButton = document.getElementById('actionBtn');

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function startStopTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        actionButton.textContent = 'Start';
    } else {
        timerInterval = setInterval(() => {
            if (seconds > 0) {
                seconds--;
                timerElement.textContent = formatTime(seconds);
            } else {
                clearInterval(timerInterval);
                actionButton.textContent = 'Completado';
            }
        }, 1000);
        actionButton.textContent = 'Stop';
    }
    isRunning = !isRunning;
}

actionButton.addEventListener('click', startStopTimer);

}

countdown()




// Bottom Icons
async function getDescription() {
  try {
    const docRef = doc(db, "RevolApp", transferredInfo);
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
getDescription().then((data) => {
  const App = data.App;
  const Btns = App.Btns;

  
function createDescription(HText, PText) {
  const descriptionDiv = document.getElementById('description');

  // Create the <h1> element
  const h1 = document.createElement('h1');
  h1.textContent = HText; // Customize the text content

  // Create the <p> element
  const p = document.createElement('p');
  p.textContent = PText; // Customize the text content

  // Append the elements to the description div
  descriptionDiv.appendChild(h1);
  descriptionDiv.appendChild(p);
}

// Call the function to create and append the elements
createDescription();
  
});








// Bottom Icons
async function getBtnIcons() {
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
getBtnIcons().then((data) => {
  const App = data.App;
  const Btns = App.Btns;

  function createButton(buttonType, divId, imgSrcIndex, redirectUrl, imgAlt = "Example image") {
    const buttonGroup = Btns[buttonType];
    const imgSrc = buttonGroup[imgSrcIndex];

    const div = document.getElementById(divId);
    if (!div) {
      console.error(`Div with id '${divId}' not found.`);
      return;
    }

    const img = document.createElement("img");
    img.src = imgSrc;
    img.alt = imgAlt;
    img.addEventListener("click", () => {
      window.location.href = redirectUrl;
    });

    div.appendChild(img);
  }

  const buttonsConfig = [
    { buttonType: "homeBtns", divId: "home", imgSrcIndex: 0, redirectUrl: "index9.html" },
    { buttonType: "DateBtns", divId: "Date", imgSrcIndex: 1, redirectUrl: "index9.2.html" },
    { buttonType: "GoalBtns", divId: "goals", imgSrcIndex: 1, redirectUrl: "index9.3.html" },
    { buttonType: "StatBtns", divId: "stats", imgSrcIndex: 1, redirectUrl: "index9.4.html" },
    { buttonType: "GearBtns", divId: "gear", imgSrcIndex: 1, redirectUrl: "index9.5.html" },
  ];

  buttonsConfig.forEach(({ buttonType, divId, imgSrcIndex, redirectUrl }) => {
    createButton(buttonType, divId, imgSrcIndex, redirectUrl);
  });
});

async function backgroundColor() {
  try {
    const docRef = doc(db, "RevoBuissnes", transferredInfo); // Ensure db and transferredInfo are initialized
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const documentData = docSnap.data();
      return documentData; // Return the document data
    } else {
      console.error("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
}
backgroundColor().then((data) => {
  const UBU = data.UBU;
  const { top, center, bottom } = UBU.BackgroundColor;
  const { Base, Prime1, Prime2, Prime3 } = UBU.Colors;
// Function to change the background gradient dynamically
function setGradient(color1, color2, color3) {
  document.body.style.background = `linear-gradient(to bottom, ${color1}, ${color2}, ${color3})`;
}

// Example usage:
setGradient(top, center, bottom);

});