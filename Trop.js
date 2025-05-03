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


// Retrieving the newest workout location
function getNewestWorkoutLocation() {
  const locations = JSON.parse(localStorage.getItem('workoutLocations')) || [];
  // Return the last item if the array exists and isn't empty
  return locations.length ? locations[locations.length - 1] : null;
}

// Retrieve data from localStorage
const transferreduserInfo = localStorage.getItem("transferreduserInfo");
const transferredInfo = localStorage.getItem("transferredBu");
const workoutLocation = getNewestWorkoutLocation();

console.log("Transferred User Info:", transferreduserInfo);
console.log("Transferred Info:", transferredInfo);
console.log(workoutLocation)

// Data to check



async function SetaColor() {
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
SetaColor().then((data) => {
  const { top, bottom } = data.BuColors.BackgroundColor;
  const { Base, Prime1, Prime2, Prime3 } = data.BuColors.Colors;
  function setGradient(color1, color2) {
    document.body.style.background = `linear-gradient(to bottom, ${color1}, ${color2})`;
  }
  function setTittleColor(BtnUrl) {
    const tittle = document.getElementById(BtnUrl);
    if (tittle) {
      tittle.style.color = Base || '#013948';
    } else {
      console.error(`Element with id "${BtnUrl}" not found.`);
    }
  }
  setTittleColor('Troptittle') 
  setGradient(top, bottom); 
});

async function SetBulogo() {
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
SetBulogo().then((data) => {
  function setBuIcon(imgSrc, imgAlt) {
      // Find the img element with id 'logo-img'
      const img = document.getElementById('logo');
  
      // Check if the img element exists
      if (img) {
          // Set the image source and alternative text
          img.src = imgSrc;
          img.alt = imgAlt;
      } else {
          console.error("Image element with id 'logo-img' not found.");
      }
  }
  
  setBuIcon(data.BuLogos.Simple[0], data.BuLogos.LogoText.description);  
});

async function SetTrophies() {
  try {
    const docRef = doc(db, "RevolApp", "Logros"); // Ensure db and transferredInfo are initialized
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

async function SetColors() {
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

Promise.all([SetTrophies(), SetColors()]).then(([data, colorData]) => {
  if (!data || !colorData) return;

  const App = data;
  const {
    Footsteps,
    CCheckmarks,
    FitGraph,
    Clock,
    Dumbbell,
    BalancedScales,
    Timer,
    Stretching,
    FullBody,
    Trophy
  } = App;

  const { Prime1, Prime2 } = colorData;

  function renderSlotContent(logroData, slot, Tvalue) {
    const logrosBlock = document.getElementById(slot);
    if (!logrosBlock) return;

    const logroItem = document.createElement('div');
    logroItem.className = 'SlotTittle';

    const color = logroData.Active ? Prime2 : Prime1;
    const AIcon = logroData.Active ? 0 : 1;

    if (Tvalue.Icon) {
      const iconElement = document.createElement('img');
      iconElement.src = Tvalue.Icon[AIcon];
      logroItem.appendChild(iconElement);
    }

    const titleElement = document.createElement('h3');
    titleElement.textContent = Tvalue.Tittle;
    titleElement.style.color = color;
    logroItem.appendChild(titleElement);

    logrosBlock.appendChild(logroItem);
  }

  const logrosData = {
    Footsteps: { Active: true },
    CCheckmarks: { Active: true },
    FitGraph: { Active: true },
    Clock: { Active: true },
    Dumbbell: { Active: true },
    BalancedScales: { Active: true },
    Timer: { Active: true },
    Stretching: { Active: false },
    FullBody: { Active: false  },
    Trophy: { Active: false  },
  }; // Assuming this contains the Active flags

  renderSlotContent(logrosData.Footsteps, 'slot1', Footsteps);
  renderSlotContent(logrosData.CCheckmarks, 'slot2', CCheckmarks);
  renderSlotContent(logrosData.FitGraph, 'slot3', FitGraph);
  renderSlotContent(logrosData.Clock, 'slot4', Clock);
  renderSlotContent(logrosData.Dumbbell, 'slot5', Dumbbell);
  renderSlotContent(logrosData.BalancedScales, 'slot6', BalancedScales);
  renderSlotContent(logrosData.Timer, 'slot7', Timer);
  renderSlotContent(logrosData.Stretching, 'slot8', Stretching);
  renderSlotContent(logrosData.FullBody, 'slot9', FullBody);
  renderSlotContent(logrosData.Trophy, 'slot10', Trophy);
});















async function SetControlBar() {
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


SetControlBar().then((data) => {
  const Buissnes = data;

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
      { buttonType: "homeBtns", divId: "home", imgSrcIndex: 0, redirectUrl: "index9.html" },
      { buttonType: "DateBtns", divId: "Date", imgSrcIndex: 0, redirectUrl: "index9.2.html" },
      { buttonType: "GoalBtns", divId: "goals", imgSrcIndex: 1, redirectUrl: "index9.3.html" },
      { buttonType: "StatBtns", divId: "stats", imgSrcIndex: 0, redirectUrl: "index9.4.html" },
      { buttonType: "GearBtns", divId: "gear", imgSrcIndex: 0, redirectUrl: "index9.5.html" },
    ];

    buttonsConfig.forEach((config) => createButton(config, Buttons));
  }

setControlBar()

});





document.addEventListener('touchstart', function (event) {
  if (event.touches.length > 1) {
    event.preventDefault(); // Prevents zooming
  }
}, { passive: false });