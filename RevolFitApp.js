// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  updateDoc, 
  serverTimestamp, 
  collection, 
  addDoc, 
  setDoc  } 
  from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBc3B7SM_Itr9LRCv8N3_tbl9BglxHKo-M",
  authDomain: "revofit-ad7c3.firebaseapp.com",
  projectId: "revofit-ad7c3",
  storageBucket: "revofit-ad7c3.appspot.com",
  messagingSenderId: "643801118133",
  appId: "1:643801118133:web:d679abc998a18f7077d5fc",
  measurementId: "G-E6P96D0M6Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Initialize Firestore and Auth
async function initializeFirebase() {
  if (db && auth) return; // Prevent duplicate initialization

  try {
    const firebaseConfig = await fetchFirebaseConfig();
    if (!firebaseConfig) throw new Error("Firebase config is undefined");

    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);

   

    await initializeFirestoreFunctions();
  } catch (error) {
    console.error("Error initializing Firebase:", error);
  }
}
//console.log("collection function:", collection);
// Wait for Firebase initialization
await initializeFirebase();

async function initializeFirestoreFunctions() {
  console.log("Initializing Firestore-related functions...");
  // Add any Firestore setup code here if needed.
}

// Retrieve data from localStorage
 const transferreduserInfo = localStorage.getItem("transferreduserInfo");
 const transferredInfo = localStorage.getItem("transferredBu");

 //console.log("Transferred User Info:", transferreduserInfo);
//console.log("Transferred Info:", transferredInfo);


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
   
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      
      return docSnap.data();
    } else {
      // console.log(`No document found with ID: ${documentId}`);
      return null;
    }
  } catch (error) {
    console.error("Error checking document:", error);
    return null;
  }
}
// Check if a business-related document exists
checkDocumentExists("RevoBusiness", transferredInfo);


async function applyBranding() {
  const Buissnes = await checkDocumentExists("RevoBuissnes", transferredInfo);

  function setAllcolors(){
    const { top, center,bottom } = Buissnes.BuColors.BackgroundColor;
    const { Base, Prime1, Prime2, Prime3, Prime4 } = Buissnes.BuColors.Colors;

    function GetBuFont(fontFamily) {
      document.body.style.fontFamily = fontFamily;
    }
    function setGradient( Ctop, Ccenter, Cbottom ) {
      document.body.style.background = `linear-gradient(to bottom, ${Ctop}, ${Ccenter}, ${Cbottom})`;
    }
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
   
    
   


    setGradient( top, center, bottom )
    GetBuFont(Buissnes.Font);
  

  }




  setAllcolors()

}

async function SetContent() {
  const Buissnes = await checkDocumentExists("RevoBuissnes", transferredInfo);
  const Content = await checkDocumentExists("RevolApp", "Content");
  const User = await checkDocumentExists("users", transferreduserInfo);
  const data = User
  const logo = Buissnes.BuLogos.Icons[2];
 
  function createImg(imgSrc, imgAlt) {
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
  function checkStreack(){
    

    console.log(data)

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

    createElementInDiv1('lastTime', 'h3', `Racha: ${resultText}`);

    }
  }
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




  //Pending have to add the calories burnt and all that 
  function RenderResults(){
    const ResultIcons  = Buissnes.AppIcons.ResultIcons
    const Values = data

    const sections = [
      { divId: "cal", imgSrc: ResultIcons.fire, imgAlt: "Fire icon", text: "2100" },
      { divId: "Time", imgSrc: ResultIcons.time, imgAlt: "Time icon", text: "21h" },
      { divId: "weight", imgSrc: ResultIcons.weight, imgAlt: "Weight icon", text: "21h" },
    ];

    sections.forEach(({ divId, imgSrc, imgAlt, text }) => {
      createElementInDiv(divId, "img", { src: imgSrc, alt: imgAlt });
      createElementInDiv(divId, "h1", {}, text);
    });
















  }




  function SetWorkouts(){
    const { Base, Prime1, Prime2, Prime3, Prime4 } = Buissnes.BuColors.Colors;
    const { Gym, Home } = Content.Images.MainHub;


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

    }

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
      imgSrc: Gym,
      text: "Rutina en Gym",
      divId: "Gym",
      location: "Gym",
      redirectUrl: "index9.1.1.html",
    });
  
    createButton({
      imgSrc: Home,
      text: "Rutina en Casa",
      divId: "Home",
      location: "Home",
      redirectUrl: "index9.1.2.html",
    });
  
    const newestLocation = JSON.parse(localStorage.getItem("workoutLocations"))?.slice(-1)[0];
    if (newestLocation) {
      console.log(`Most recently selected: ${newestLocation}`);
    }

    







  }
  function createButton({ buttonType, divId, imgSrcIndex, redirectUrl, imgAlt = "Example image" }, Buttons) {
    const buttonGroup = Buttons[buttonType];
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
  function setControlBar() {
    if (
      !Buissnes ||
      !Buissnes.AppIcons ||
      !Buissnes.AppIcons.ControlBar
    ) {
      console.error("ControlBar data is not available.");
      return;
    }
  
    const { Goals, Home, Settings, Stats ,Calander} = Buissnes.AppIcons.ControlBar;

    const Buttons = {
      homeBtns: Home,
      DateBtns: Calander, // Adjust as needed
      GoalBtns: Goals,
      StatBtns: Stats,
      GearBtns: Settings, // Adjust as needed
    };

  
    const buttonsConfig = [
      { buttonType: "homeBtns", divId: "home", imgSrcIndex: 1, redirectUrl: "index9.html" },
      { buttonType: "DateBtns", divId: "Date", imgSrcIndex: 0, redirectUrl: "index9.2.html" },
      { buttonType: "GoalBtns", divId: "goals", imgSrcIndex: 0, redirectUrl: "index9.3.html" },
      { buttonType: "StatBtns", divId: "stats", imgSrcIndex: 0, redirectUrl: "index9.4.html" },
      { buttonType: "GearBtns", divId: "gear", imgSrcIndex: 0, redirectUrl: "index9.5.html" },
    ];
  
    buttonsConfig.forEach((config) => createButton(config, Buttons));
  }

  setControlBar()
  checkStreack()
  RenderResults()
  SetWorkouts()
  
  createImg(logo, 'Example image');
}

applyBranding()
SetContent()

document.addEventListener('touchstart', function (event) {
  if (event.touches.length > 1) {
    event.preventDefault(); // Prevents zooming
  }
}, { passive: false });





















