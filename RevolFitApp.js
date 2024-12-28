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
getUserinfo().then((data) => {
    const nombre = data.nombre; // Retrieve nested data
    const streakCount = data.streakCount; // Retrieve nested data

    
    function createUserNameHeading(userName) {
      // Get the div by its ID
      const userNameDiv = document.getElementById('userName');
    
      // Create an h1 element
      const h1 = document.createElement('h1');
    
      // Set the content of the h1 element to include "Hola," followed by the user's name
      h1.textContent = `Hola, ${userName}`;
    
      // Append the h1 element to the div
      userNameDiv.appendChild(h1);
    }
    // Call the function with the desired username
    createUserNameHeading(nombre);





    function LasttimeUsed(streaks) {
      // Get the div by its ID
      const userNameDiv = document.getElementById('lastTime');

      // Get the last item from the array
      const lastStreak = streaks[streaks.length - 1];

      // Determine the appropriate time unit
      let resultText;
      if (lastStreak === 1) {
        resultText = `${lastStreak} dia`;
      } else if (lastStreak <= 7) {
        resultText = `${lastStreak} dias`;
      } else {
        const weeks = Math.floor(lastStreak / 7);
        if (weeks === 1) {
          resultText = `${weeks} semana`;
        } else {
          resultText = `${weeks} semanas`;
        }
      }

      // Create an h3 element
      const h3 = document.createElement('h3');

      // Set the content of the h3 element
      h3.textContent = `Racha: ${resultText}`;

      // Append the h3 element to the div
      userNameDiv.appendChild(h3);
    }

    // Example usage: Call the function with an array of streak counts

    LasttimeUsed(streakCount);

   
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
fetchDocumentData("RevoBuissnes", transferredInfo).then
(data => {
  if (!data) return;

  const appData = data.App;
  const ResultIcons = appData.ResultIcons;






  // Cal section
  createElementInDiv("cal", "img", { 
    src: ResultIcons.fire, 
    alt: "Fire icon" });
  createElementInDiv("cal", "h1", {}, "2100");

  // Time section
  createElementInDiv("Time", "img", { 
    src: ResultIcons.time, 
    alt: "Time icon" });
  createElementInDiv("Time", "h1", {}, "21h");

  // Weight section
  createElementInDiv("weight", "img", { 
    src: ResultIcons.weight, 
    alt: "Weight icon" });
  createElementInDiv("weight", "h1", {}, "21h");
});



async function getWorkouts() {
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

getWorkouts().then((data) => {
  // Validate the data structure
  if (!data || !data.App || !data.UBU || !data.App.workoutBtns) {
      console.error("Invalid data structure or missing properties.");
      return;
  }

  const App = data.App;
  const UBU = data.UBU;

  const workoutBtns = App.workoutBtns;
  const { Gym, Home } = workoutBtns;

  // Validate Gym and Home objects
  if (!Gym || !Gym.backgroundImg || !Home || !Home.backgroundImg) {
      console.error("Missing background image data for Gym or Home.");
      return;
  }

  const GBG = Gym.backgroundImg;
  const HBG = Home.backgroundImg;

  const { Base, Prime1, Prime2 } = UBU.Colors;

  // Function to convert hex color to RGBA
  function hexToRgba(hex, alpha = 0.5) {
      const bigint = parseInt(hex.slice(1), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // Function to render a workout button
  function renderWorkoutButton(Src, h1Text, divId, locationType) {
      // Find the div with the specified ID
      const div = document.getElementById(divId);

      if (!div) {
          console.error(`Div with id '${divId}' not found.`);
          return;
      }

      // Check if the image URL is valid
      const img = new Image();
      img.src = Src;
      img.onload = () => {
          console.log(`Image ${Src} loaded successfully.`);
      };
      img.onerror = () => {
          console.error(`Failed to load image: ${Src}`);
      };

      // Create a button element
      const button = document.createElement('button');
      button.style.backgroundImage = `url(${Src})`;
      button.style.backgroundSize = 'cover';
      button.style.backgroundPosition = 'center';
      button.style.color = Prime2;
      button.style.boxShadow = `0px 4px 10px ${Prime1}`;
      button.style.backgroundColor = Prime1;
      button.style.border = `2px solid ${Prime1}`;
      button.style.cursor = 'pointer';
      button.style.padding = '0';
      button.style.width = '100%'; // Adjust based on your layout
      button.style.height = '200px'; // Adjust based on your layout

      // Add an event listener for click actions
      button.addEventListener('click', () => {
          localStorage.setItem('workoutLocation', locationType);
          window.location.href = `index9.1.html`;
      });

      // Create an h1 element for the button label
      const h1 = document.createElement('h1');
      h1.textContent = h1Text;
      h1.style.margin = '0';
      h1.style.color = Prime2;
      h1.style.backgroundColor = hexToRgba(Base, 0.8);
      h1.style.padding = '.7rem';
      h1.style.textAlign = 'center';

      // Append the h1 to the button
      button.appendChild(h1);

      // Append the button to the div
      div.appendChild(button);
  }

  // Render buttons for Gym and Home
  renderWorkoutButton(GBG, 'Rutina En el Gym', 'Gym', 'gym');
  renderWorkoutButton(HBG, 'Rutina En Casa', 'Home', 'home');
}).catch((error) => {
  console.error("An error occurred while fetching workouts:", error);
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

async function getBtnblockColors() {
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
getBtnblockColors().then((data) => {
  if (!data || !data.App) {
    console.error("Invalid data structure or missing App property.");
    return;
  }
  
  const App = data.UBU; 
  const Colors  = App.Colors;
  const Prime1   = Colors.Prime1;




  function renderCalShadowBox() {
    // Select the div element with the ID 'cal'
    const calDiv = document.getElementById('startBtn');

    // Check if the element exists to avoid runtime errors
    if (!calDiv) {
        console.error("Element with ID 'cal' not found.");
        return;
    }

    // Apply shadow box styling
    
    calDiv.style.color = Prime1 ;
    calDiv.style.boxShadow = `0px 4px 10px ${Prime1}`;
    calDiv.style.backgroundColor = 'trasperant'; // Set dynamic background color
    calDiv.style.border = `5px solid ${Prime1 }`; // Set dynamic border color
  }
 
  renderCalShadowBox()

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
  const { top, bottom } = UBU.BackgroundColor;
  const { Base, Prime1, Prime2, Prime3 } = UBU.Colors;
// Function to change the background gradient dynamically
function setGradient(color1, color2) {
  document.body.style.background = `linear-gradient(to bottom, ${color1}, ${color2})`;
}

setGradient(top, bottom); 

});
