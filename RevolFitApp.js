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
// list of tiers (Beginner, Intermediate, Advance)




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


// Fetch user info from the database
async function getUserinfo() {
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
// Function to dynamically create and append an element to a specified div
function createElementInDiv1(divId, elementType, textContent = "") {
  const div = document.getElementById(divId);

  if (!div) {
    console.error(`Div with id '${divId}' not found.`);
    return;
  }

  const element = document.createElement(elementType);
  if (textContent) {
    element.textContent = textContent;
  }

  div.appendChild(element);
}
// Process user data and populate UI
getUserinfo().then((data) => {
  if (!data) return;

  const { nombre, streakCount } = data;

  // Create user greeting
  createElementInDiv1('userName', 'h1', `Hola, ${nombre}`);

  // Process streak data and determine the last usage time
  if (streakCount && streakCount.length > 0) {
    const lastStreak = streakCount[streakCount.length - 1];

    let resultText;
    if (lastStreak === 1) {
      resultText = `${lastStreak} día`;
    } else if (lastStreak <= 7) {
      resultText = `${lastStreak} días`;
    } else {
      const weeks = Math.floor(lastStreak / 7);
      resultText = weeks === 1 ? `${weeks} semana` : `${weeks} semanas`;
    }

    createElementInDiv('lastTime', 'h3', `Racha: ${resultText}`);
  }
});

 // PENDING  NEED MORE POINTS IN THE DATABASE 
async function getMotivationText() {
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

getMotivationText().then((data) => {
  const App    = data.App;
  const motivationText   = App.motFrases;

  function chooseFromArray(value, array) {
    /**
     * Chooses an element from the array based on the provided value.
     *
     * @param {number} value - The value to determine the index.
     * @param {Array} array - The array to choose from.
     * @returns {*} The selected element from the array, or null if the value is out of range.
     */
    if (value >= 0 && value < array.length) {
        return array[value];
    } else {
        return null;
    }
}


// Example usage with App.motFrases PENDING  

const variable = 0; // This can be any integer
const selectedPhrase = chooseFromArray(variable, motivationText);



  function creatMotivation(textContent) {
    // Find the div with id 'cal'
    const div = document.getElementById('motivation');
  
    // Check if the div exists
    if (!div) {
        console.error("Div with id 'cal' not found.");
        return;
    }
  
    // Create an h1 element
    const h1 = document.createElement('h1');
  
    // Set the text content of the h1 element
    h1.textContent = textContent;
  
    // Append the h1 to the div
    div.appendChild(h1);
  }
  
  creatMotivation(selectedPhrase)
  
  
});

 // Function to fetch document data
async function getbUiCON() {
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

 // Fetch and use the document data
getbUiCON().then((data) => {
  const App    =data.UBU;
  const BuIcon   = App.BuIcon;
  const BuLight   = BuIcon.BuLight;

function createfireIcon(imgSrc, imgAlt) {
  // Find the div with id 'cal'
  const div = document.getElementById('Icon');

  // Check if the div exists
  if (!div) {
      console.error("Div with id 'Icon' not found.");
      return;
  }

  // Create an image element
  const img = document.createElement('img');

  // Set the image source and alternative text
  img.src = imgSrc;
  img.alt = imgAlt;

  // Append the image to the div
  div.appendChild(img);
}


createfireIcon(BuLight, 'Example image');


});

// General function to fetch document data
async function fetchDocumentData(docPath, transferredInfo) {
  try {
      const docRef = doc(db, docPath, transferredInfo);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
          return docSnap.data(); // Return the document data
      } else {
          console.log("No such document!");
          return null;
      }
  } catch (error) {
      console.error("Error fetching document:", error);
      return null;
  }
}

// General function to create and append an element (image or h1) to a specified div
function createElementInDiv(divId, elementType, attributes = {}, textContent = "") {
  const div = document.getElementById(divId);

  if (!div) {
    console.error(`Div with id '${divId}' not found.`);
    return;
  }

  const element = document.createElement(elementType);

  // Set attributes if provided
  Object.keys(attributes).forEach(attr => {
    element[attr] = attributes[attr];
  });

  // Set text content if provided
  if (textContent) {
    element.textContent = textContent;
  }

  div.appendChild(element);
}

// Fetch and use the document data
fetchDocumentData("RevoBuissnes", transferredInfo).then((data) => {
  if (!data) return;

  const appData = data.App;
  const { ResultIcons } = appData;

  const sections = [
    { divId: "cal", imgSrc: ResultIcons.fire, imgAlt: "Fire icon", text: "2100" },
    { divId: "Time", imgSrc: ResultIcons.time, imgAlt: "Time icon", text: "21h" },
    { divId: "weight", imgSrc: ResultIcons.weight, imgAlt: "Weight icon", text: "21h" },
  ];

  sections.forEach(({ divId, imgSrc, imgAlt, text }) => {
    createElementInDiv(divId, "img", { src: imgSrc, alt: imgAlt });
    createElementInDiv(divId, "h1", {}, text);
  });
});

async function getWorkouts() {
  try {
    const docRef = doc(db, "RevoBuissnes", transferredInfo); // Ensure db and transferredInfo are initialized
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.error("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
}

getWorkouts().then((data) => {
  if (!data) return;

  const { Base, Prime1, Prime2 } = data.UBU.Colors;
  const { Gym, Home } = data.App.workoutBtns;

  let previousSelectedButton = null;

  const styles = {
    button: `
      width: 10rem; height: 10rem; border: none; border-radius: 2rem;
      background-size: cover; background-position: center; background-color: transparent;
    `,
    label: `
      display: inline-block; background-color: ${Base}; color: ${Prime2};
      padding: 5px 10px; border-radius: 5px; position: relative;
      top: 50%; transform: translateY(-50%);
    `,
    link: `
      display: block; margin-top: 10px; text-decoration: none; color: ${Base}; font-weight: bold;
    `,
  };

  function createButton({ imgSrc, text, divId, location, redirectUrl }) {
    const workoutDiv = document.getElementById(divId);
    if (!workoutDiv) {
      console.error(`Div with ID '${divId}' does not exist.`);
      return;
    }

    const button = document.createElement("button");
    button.style = styles.button;
    button.style.backgroundImage = `url('${imgSrc}')`;
    button.innerHTML = `<span style="${styles.label}">${text}</span>`;

    button.addEventListener("click", () => {
      handleButtonClick(location, divId, redirectUrl, button);
    });

    workoutDiv.appendChild(button);
  }

  function handleButtonClick(location, divId, redirectUrl, button) {
    console.log(`Button clicked: ${location}`);
    addWorkoutLocation(location);

    if (!document.getElementById("See")) {
      createLink(divId, redirectUrl);
    }

    highlightButton(button);
  }

  function createLink(divId, redirectUrl) {
    const workoutDiv = document.getElementById(divId);
    if (!workoutDiv) return;

    const link = document.createElement("a");
    link.id = "See";
    link.href = redirectUrl;
    link.innerText = "See All";
    link.style = styles.link;

    workoutDiv.appendChild(link);
  }

  function highlightButton(button) {
    if (previousSelectedButton) {
      previousSelectedButton.style.boxShadow = "none";
    }
    button.style.boxShadow = `0 0 15px 5px ${Prime2}`;
    fillBackgroundProgressively();
    previousSelectedButton = button;
  }

  function fillBackgroundProgressively() {
    const startBtn = document.getElementById("startBtn");
    if (!startBtn) return;

    startBtn.style = `
      position: relative; overflow: hidden; color: ${Prime2}; z-index: 1;
    `;

    const progressBar = document.createElement("div");
    progressBar.style = `
      position: absolute; top: 0; left: 0; height: 100%; width: 0;
      background-color: ${Prime1}; transition: width 3s linear; z-index: -1;
    `;

    startBtn.appendChild(progressBar);
    setTimeout(() => {
      progressBar.style.width = "100%";
    }, 100);
  }

  function addWorkoutLocation(location) {
    const locations = JSON.parse(localStorage.getItem("workoutLocations")) || [];
    locations.push(location);
    localStorage.setItem("workoutLocations", JSON.stringify(locations));
  }

  function renderCalShadowBox() {
    const calDiv = document.getElementById("startBtn");
    if (!calDiv) return;

    calDiv.style = `
      color: ${Prime1}; box-shadow: 0px 4px 10px ${Prime1};
      background-color: transparent; border: 5px solid ${Prime1};
      transition: background-color 3s ease-in-out;
    `;
  }

  renderCalShadowBox();

  // Create buttons dynamically
  createButton({
    imgSrc: Gym.backgroundImg,
    text: "Rutina en Gym",
    divId: "Gym",
    location: "Gym",
    redirectUrl: "index9.1.1.html",
  });

  createButton({
    imgSrc: Home.backgroundImg,
    text: "Rutina en Casa",
    divId: "Home",
    location: "Home",
    redirectUrl: "index9.1.2.html",
  });

  const newestLocation = JSON.parse(localStorage.getItem("workoutLocations"))?.slice(-1)[0];
  if (newestLocation) {
    console.log(`Most recently selected: ${newestLocation}`);
  }
});

async function getResultsContainerColors() {
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
// Fetch and use the document data
getResultsContainerColors().then((data) => {
  if (!data || !data.App) {
    console.error("Invalid data structure or missing App property.");
    return;
  }
  
  const App = data.UBU;
  const Colors = App.Colors;
  const Base = Colors.Base;
  const Prime1 = Colors.Prime1;
  const Prime2 = Colors.Prime2;

  function applyShadowBoxStyles(elementId, { color, boxShadowColor, backgroundColor, borderColor }) {
    // Select the element by ID
    const element = document.getElementById(elementId);

    // Check if the element exists
    if (!element) {
      console.error(`Element with ID '${elementId}' not found.`);
      return;
    }

    // Apply styles dynamically
    element.style.color = color;
    element.style.boxShadow = `0px 4px 10px ${boxShadowColor}`;
    element.style.backgroundColor = backgroundColor;
    element.style.border = `2px solid ${borderColor}`;
  }
  function changeTextColors(newColor) {
    const appTop = document.getElementById("AppTop");
    if (appTop) {
      const textElements = appTop.querySelectorAll("*"); // Selects all child elements
      textElements.forEach(element => {
        element.style.color = newColor; // Changes text color
      });
    } else {
      console.error("Element with id 'AppTop' not found.");
    }
  }
  
  // Example usage:
  changeTextColors(Base);

  // Render shadow boxes with dynamic colors
  applyShadowBoxStyles('cal', {
    color: Prime2,
    boxShadowColor: Prime1,
    backgroundColor: Base,
    borderColor: Prime1,
  });

  applyShadowBoxStyles('Time', {
    color: Prime2,
    boxShadowColor: Prime1,
    backgroundColor: Base,
    borderColor: Prime1,
  });

  applyShadowBoxStyles('weight', {
    color: Prime2,
    boxShadowColor: Prime1,
    backgroundColor: Base,
    borderColor: Prime1,
  });
});

// Bottom Icons
async function getBtnIcons() {
  try {
    const docRef = doc(db, "RevoBuissnes", transferredInfo);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data(); // Return the document data
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
}

function createButton({ buttonType, divId, imgSrcIndex, redirectUrl, imgAlt = "Example image" }, Btns) {
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

getBtnIcons().then((data) => {
  if (!data) return;

  const { Btns } = data.App;

  const buttonsConfig = [
    { buttonType: "homeBtns", divId: "home", imgSrcIndex: 0, redirectUrl: "index9.html" },
    { buttonType: "DateBtns", divId: "Date", imgSrcIndex: 1, redirectUrl: "index9.2.html" },
    { buttonType: "GoalBtns", divId: "goals", imgSrcIndex: 1, redirectUrl: "index9.3.html" },
    { buttonType: "StatBtns", divId: "stats", imgSrcIndex: 1, redirectUrl: "index9.4.html" },
    { buttonType: "GearBtns", divId: "gear", imgSrcIndex: 1, redirectUrl: "index9.5.html" },
  ];

  buttonsConfig.forEach((config) => createButton(config, Btns));
});

async function fetchDocument(collection, documentId) {
  try {
    const docRef = doc(db, collection, documentId); // Ensure db is initialized
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data(); // Return the document data
    } else {
      console.error("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
}

function setGradient({ top, center, bottom }) {
  document.body.style.background = `linear-gradient(to bottom, ${top}, ${center}, ${bottom})`;
}

fetchDocument("RevoBuissnes", transferredInfo).then((data) => {
  if (!data) return;

  const { UBU } = data;
  const { BackgroundColor, Colors } = UBU;

  // Apply the background gradient
  setGradient(BackgroundColor);

  // Use Colors if needed (Base, Prime1, Prime2, Prime3)
  console.log("Available colors:", Colors);
});

document.addEventListener('touchstart', function (event) {
  if (event.touches.length > 1) {
    event.preventDefault(); // Prevents zooming
  }
}, { passive: false });

