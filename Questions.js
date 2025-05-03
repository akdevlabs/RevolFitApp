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

console.log("collection function:", collection);
// Wait for Firebase initialization
await initializeFirebase();

async function initializeFirestoreFunctions() {
  console.log("Initializing Firestore-related functions...");
  // Add any Firestore setup code here if needed.
}

// Retrieve data from localStorage
 const transferreduserInfo = localStorage.getItem("transferreduserInfo");
 const transferredInfo = localStorage.getItem("transferredBu");
 
console.log("Transferred User Info:", transferreduserInfo);
console.log("Transferred Info:", transferredInfo);


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
      console.log(`No document found with ID: ${documentId}`);
      return null;
    }
  } catch (error) {
    console.error("Error checking document:", error);
    return null;
  }
}
// Check if a business-related document exists
checkDocumentExists("RevoBusiness", transferredInfo);


// Ensure transferredInfo is valid before checking Firestore
async function applyBranding() {
  const Buissnes = await checkDocumentExists("RevoBuissnes", transferredInfo);
  const BuLogo = Buissnes.BuLogos.Icons[0];
  const Ltext = Buissnes.BuLogos.LogoText.description;

  const { bottom , center, top } = Buissnes.BuColors.BackgroundColor;
  const { Base, Prime1, Prime2, Prime3, Prime4 } = Buissnes.BuColors.Colors;
  
  function setContent(){
    function setBgImgs(imgSrc, imgAlt, urlId) {
    // Find the img element with id 'logo-img'
    const img = document.getElementById(urlId);

    // Check if the img element exists
    if (img) {
        // Set the image source and alternative text
        img.src = imgSrc;
        img.alt = imgAlt;
    } else {
        console.error("Image element with id 'logo-img' not found.");
    }
    }

   setBgImgs(BuLogo, Ltext, "LogoImg")
   setBgImgs(BuLogo, Ltext, "MultiBlockkImg")
   setBgImgs(BuLogo, Ltext, "MultiQBlockkImg")
   setBgImgs(BuLogo, Ltext, "MultiQ2BlockkImg")
   setBgImgs(BuLogo, Ltext, "MultiQ2BlockkImg")  
  }

  function SetIcons(){
    function setBgImgs(imgSrc, imgAlt, urlId, close, open) {
      // Find the img element by id
      const img = document.getElementById(urlId);

      let closeElement = document.getElementById(close);
      let openElement = document.getElementById(open);
     
      // Check if the img element exists
      if (img) {
          // Set the image source and alternative text
          img.src = imgSrc;
          img.alt = imgAlt;
  
          // Add click event listener
          img.addEventListener('click', function () {
            if (closeElement) {
              closeElement.style.display = "none";
            }
            if (openElement) {
              openElement.style.display = "flex";
            }
          });
      } else {
          console.error(`Image element with id '${urlId}' not found.`);
      }
  }

   setBgImgs(Buissnes.AppIcons.Evaluation[1], "Pen", "Return-pen-0","twelve","zero")
   setBgImgs(Buissnes.AppIcons.Evaluation[1], "Pen", "Return-pen-1","twelve","one")
   setBgImgs(Buissnes.AppIcons.Evaluation[1], "Pen", "Return-pen-2","twelve","two")
   setBgImgs(Buissnes.AppIcons.Evaluation[1], "Pen", "Return-pen-3","twelve","three")
   setBgImgs(Buissnes.AppIcons.Evaluation[1], "Pen", "Return-pen-4","twelve","four")
   setBgImgs(Buissnes.AppIcons.Evaluation[1], "Pen", "Return-pen-5","twelve","five")
   setBgImgs(Buissnes.AppIcons.Evaluation[1], "Pen", "Return-pen-6","twelve","six")
   setBgImgs(Buissnes.AppIcons.Evaluation[1], "Pen", "Return-pen-7","twelve","seven")
   setBgImgs(Buissnes.AppIcons.Evaluation[1], "Pen", "Return-pen-8","twelve","eight")


   setBgImgs(Buissnes.AppIcons.Evaluation[1], "Pen", "Return-pen-9","twelve","nine")
   setBgImgs(Buissnes.AppIcons.Evaluation[1], "Pen", "Return-pen-10","twelve","nine")
   setBgImgs(Buissnes.AppIcons.Evaluation[1], "Pen", "Return-pen-11","twelve","nine")
   setBgImgs(Buissnes.AppIcons.Evaluation[1], "Pen", "Return-pen-12","twelve","nine")
 
   setBgImgs(Buissnes.AppIcons.Evaluation[1], "Pen", "Return-pen-14","twelve","nine")
   setBgImgs(Buissnes.AppIcons.Evaluation[1], "Pen", "Return-pen-15","twelve","nine")


   setBgImgs(Buissnes.AppIcons.Evaluation[1], "Pen", "Return-pen-16","twelve","Ten")
   setBgImgs(Buissnes.AppIcons.Evaluation[1], "Pen", "Return-pen-17","twelve","Ten")
   setBgImgs(Buissnes.AppIcons.Evaluation[1], "Pen", "Return-pen-18","twelve","Ten")
   setBgImgs(Buissnes.AppIcons.Evaluation[1], "Pen", "Return-pen-19","twelve","Ten")
   setBgImgs(Buissnes.AppIcons.Evaluation[1], "Pen", "Return-pen-20","twelve","Ten")


   setBgImgs(Buissnes.AppIcons.Evaluation[1], "Pen", "Return-pen-21","twelve","eleven")
   setBgImgs(Buissnes.AppIcons.Evaluation[1], "Pen", "Return-pen-22","twelve","eleven")
   setBgImgs(Buissnes.AppIcons.Evaluation[1], "Pen", "Return-pen-23","twelve","eleven")
   setBgImgs(Buissnes.AppIcons.Evaluation[1], "Pen", "Return-pen-24","twelve","eleven")
   setBgImgs(Buissnes.AppIcons.Evaluation[1], "Pen", "Return-pen-25","twelve","eleven")
   setBgImgs(Buissnes.AppIcons.Evaluation[1], "Pen", "Return-pen-26","twelve","eleven")
  }

  function setAllcolors(){
    const Evaluation =  Buissnes.Evaluation;
    const {TextCon, tittle} = Evaluation.EtextContent;

    function GetBuFont(fontFamily) {
      document.body.style.fontFamily = fontFamily;
    }
    function setGradient( Ctop, Ccenter, Cbottom ) {
      document.body.style.background = `linear-gradient(to bottom, ${Ctop}, ${Ccenter}, ${Cbottom})`;
    }
    function setBgColor(color, UrlId) {
      const element = document.getElementById(UrlId);
      if (element) {
          element.style.background = `${color}80`; // Adds 50% transparency if color is hex
          element.style.backgroundColor = `rgba(0, 0, 0, 0.5)`; // Fallback for other colors
      }
    }
    function setBgTColor(color, UrlId, transparency = 0.5) {
      const element = document.getElementById(UrlId);
      if (!element) return;

      if (color.startsWith("#")) {
          // Convert HEX to RGBA
          let hex = color.replace("#", "");
          if (hex.length === 3) {
              hex = hex.split("").map((char) => char + char).join(""); // Convert shorthand HEX to full HEX
          }
          const r = parseInt(hex.substring(0, 2), 16);
          const g = parseInt(hex.substring(2, 4), 16);
          const b = parseInt(hex.substring(4, 6), 16);
          element.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${transparency})`;
      } else if (color.startsWith("rgb")) {
          // Convert RGB to RGBA
          element.style.backgroundColor = color.replace("rgb", "rgba").replace(")", `, ${transparency})`);
      } else {
          // If it's a named color or other format, fallback to setting opacity separately
          element.style.backgroundColor = color;
          element.style.opacity = transparency;
      }
    }
   
    function changeSliderProperties(color, color2, Surl ) {
      // Change the background color of the slider track
      document.getElementById(Surl).style.background = color;
    
      // Update the background of the slider's track and thumb using JavaScript
      const sliderTrack = document.getElementById(Surl);
      sliderTrack.style.setProperty('--slider-track-background', color);
      sliderTrack.style.setProperty('--slider-thumb-background', color2);
    }
  
    // CSS in the document
    const style = document.createElement('style');
    style.innerHTML = `
        #height-slider::-webkit-slider-runnable-track {
            height: 10px;
            border-radius: 5px;
            background: var(--slider-track-background, rgb(255, 255, 255)); /* Default */
        }
    
        #height-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            background: var(--slider-thumb-background, rgb(255, 255, 255)); /* Default */
            border-radius: 50%;
            cursor: pointer;
            margin-top: -5px; /* Centers the thumb */
        }
    `;
    document.head.appendChild(style);

    function changeWeightSliderProperties(color, color2, Surl) {
      // Change the background color of the slider track
      document.getElementById(Surl).style.background = color;
    
      // Update the background of the slider's track and thumb using JavaScript
      const sliderTrack = document.getElementById(Surl);
      sliderTrack.style.setProperty('--slider-track-background', color);
      sliderTrack.style.setProperty('--slider-thumb-background', color2);
      const style = document.createElement('style');
      style.innerHTML = `
       
        .Wtoggle-btn {
          display: flex;
          justify-content: center;
          background-color: ${Prime2};
          border-radius: 9999px;
          padding: 4px;
          width: 100px;
          position: relative;
        }
    
        .Wtoggle-active {
          background-color: ${Base};
          color: ${Prime2};
          
        }
          #weight-slider::-webkit-slider-runnable-track {
            height: 10px;
            border-radius: 5px;
            background: var(--slider-track-background, rgb(255, 255, 255)); /* Default */
        }
    
        #weight-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            background: var(--slider-thumb-background, rgb(255, 255, 255)); /* Default */
            border-radius: 50%;
            cursor: pointer;
            margin-top: -5px; /* Centers the thumb */
        }
      `;
      document.head.appendChild(style);
    }
    function SetColors(color, UrlId){
      const Element = document.getElementById(UrlId);
      Element.style.color = color 
    }
    function SetTextColors(color, UrlId){
      const elements = document.getElementsByClassName(UrlId); // No dot before class name
      
      for (let element of elements) {
        element.style.color = color; 
      }
    }
    function createToggleButtonStyles() {
      const style = document.createElement('style');
      style.innerHTML = `

        .tick {
          position: absolute;
          background-color: ${Base};
          height: 2px;
        }
        .small { 
          width: 45px; 
          height: 6px;
        }
        .medium { 
          width: 55px;
          height: 6px;
        }
        .large {
          width: 80px; 
          height: 6px;
          font-size: 14px;
          font-weight: bold;
          color: ${Base};
        }
        .label {
          margin:-1rem 0;
          position: absolute;
          left: 90px;
          font-size: 2.5rem;
          color:${Base};
        }
  
       

        .toggle-btn {
          display: flex;
          justify-content: center;
          background-color: ${Prime2};
          border-radius: 9999px;
          padding: 4px;
          width: 100px;
          position: relative;
        }
    
        .toggle-active {
          background-color: ${Base};
          color: ${Prime2};
          
        }
      `;
      document.head.appendChild(style);
    }
    function createmeasurementBlockStyle() {
      const style = document.createElement('style');
      style.innerHTML = `
        .measurementBlock li {
          color: ${Prime2};
        }
       .measurementBlock li.active {
        font-size: 20px;
        font-weight: bold;
        color: ${Base};
        background-color: ${Prime1};
        border-radius: 5px;
        opacity: 1;
  }
      `;
      document.head.appendChild(style);
    }
    function setBtnColor() {
      const elements = document.getElementsByClassName("NextBtn"); // No dot before class name
      
      for (let element of elements) {
        element.style.background = Base; 
        element.style.color = Prime2; 
        element.style.border = `1px solid ${Prime2}`; 
      }
    }


    function setToggleColors(color) {
      const elements = document.getElementsByClassName("Qtoggle-btn"); 
      
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.border = `2px solid ${color}`;
        elements[i].style.color = color; // Change text color
      }
    
      
    }
    
    setToggleColors(Prime1); // Example usage
    setBtnColor()
    createmeasurementBlockStyle()
    createToggleButtonStyles()
    changeSliderProperties(Base, Prime3, "height-slider");
    changeWeightSliderProperties(Base, Prime3, "weight-slider");
    setBgTColor(Prime1, "Blocktext", 0.9); // Red with 70% opacity
    setBgTColor(Prime1, "WBlocktext", 0.9); // Red with 70% opacity
    setBgTColor(Base, "Startblock", 0.7);
    setBgTColor(Base, "ArmBlock", 0.7);
    setBgTColor(Base, "WaistBlock", 0.7);
    setBgTColor(Base, "HipsBlock", 0.7);
    setBgTColor(Base, "LegBlock", 0.7);
    setBgTColor(Base, "RistBlock", 0.7);
    setBgTColor(Base, "KneeBlock", 0.7);
    setBgTColor(Base, "NeckBlock", 0.7);
    setBgTColor(Base, "MultiBlock", 0.6);
    setBgTColor(Base, "MultiQBlock", 0.8);
    setBgTColor(Base, "MultiQ2Block", 0.8);
    setBgTColor(Base, "MultiQ3Block", 0.8);
    SetColors(Base, "height-display")
    SetColors(Base, "weight-display")
    SetTextColors(Prime2, "Qtittle")
    SetTextColors(Prime2, "Main-Tittle")
    SetTextColors(Prime2, "ResultBlock")
    SetTextColors(Prime2, "Q-dropdown-tittle")
    SetTextColors(Prime2, "Q-Answer-tittle")
    SetColors(Prime2, "instructions")
    SetColors(Base, "tittle")
    SetColors(Prime1, "MT")
    setGradient( top, center, bottom )
    GetBuFont(Buissnes.Font);
  }
 
  SetIcons()
  setAllcolors()
  setContent()
}

applyBranding()

// ----------------- Start Block ------------------ //
async function createRulesStart() {
  const UserInfo = await checkDocumentExists("users", transferreduserInfo);
  const Evaluation = await checkDocumentExists("RevolApp", "Evaluation");

  let header        = Evaluation.header
  let instructions  = Evaluation.instructions

  function renderText(text, urlId) {
    const headerElement = document.getElementById(urlId);
    if (headerElement) {
        headerElement.textContent = text;
    } else {
        console.error("Element with ID 'EvaluaciónHeader' not found.");
    }
  }
  const streak = UserInfo.currentStreak
  if (streak >= 1 && streak <= 10) {
      renderText(header[0], "EvaluaciónHeader");

      renderText(instructions[0], "instructions");
  } else if (streak > 10) {
      renderText(header[1], "EvaluaciónHeader");
      renderText(instructions[1], "instructions");
  } else {
      console.log("Invalid streak value");
  }
}
createRulesStart()

// ----------------- Weight Block ------------------ //
async function createWeightRuler() {
  const ruler = document.getElementById("Wruler");
  ruler.innerHTML = ""; // Clear previous marks
  for (let i = 40; i <= 200; i += 1) {
      let mark = document.createElement("div");
      mark.classList.add("tick");
      mark.style.top = (i - 140) * 15 + "px"; // Increased spacing between ticks
      
      if (i % 10 === 0) {
          mark.classList.add("large");
          let label = document.createElement("div");
          label.classList.add("label");
          label.style.top = (i - 100) * 7 + "px";
          label.innerText = i;
          ruler.appendChild(label);
      } else if (i % 5 === 0) {
          mark.classList.add("medium");
      } else {
          mark.classList.add("small");
      }
      ruler.appendChild(mark);
  }

  const kgBtn = document.getElementById('kg-btn');
  const lbBtn = document.getElementById('lb-btn');
  const Rpeso = document.getElementById('R-peso');
  const weightDisplay = document.getElementById('weight-display');
  const weightSlider = document.getElementById('weight-slider');
  const weightContainer = document.getElementById('Wruler-container');
  const lastSelected = document.getElementById('last-selected');

  let isKg = true;

  function updateToggle() {
      if (isKg) {
          kgBtn.classList.add('toggle-active');
          lbBtn.classList.remove('toggle-active');
      } else {
          lbBtn.classList.add('toggle-active');
          kgBtn.classList.remove('toggle-active');
      }
  }

  kgBtn.addEventListener('click', () => {
      isKg = true;
      updateToggle();
      updateWeight();
  });

  lbBtn.addEventListener('click', () => {
      isKg = false;
      updateToggle();
      updateWeight();
  });

  weightSlider.addEventListener('input', updateWeight);

    
  function updateWeight() {
    let weightValue = weightSlider.value;
    if (isKg) {
        weightDisplay.innerText = `${weightValue} Kg`;
        Rpeso.innerText = `${weightValue} Kg`;
    } else {
        let lbs = Math.round(weightValue * 2.20462);
        weightDisplay.innerText = `${lbs} Lb`;
        Rpeso.innerText = `${weightValue} Kg`;
    }
   
  }

  weightSlider.addEventListener('input', updateWeight);
  weightSlider.addEventListener('change', () => {
    const  lastWeightValue = weightSlider.value;
     // console.log(`Weight: ${lastWeightValue} ${isKg ? 'Kg' : 'Lb'}`);
  });



  updateToggle();
  updateWeight();
}
createWeightRuler();

// ----------------- Hight Block ------------------ //
async function createRuler() {
  const ruler = document.getElementById("ruler");
  ruler.innerHTML = ""; // Clear previous marks

  for (let i = 140; i <= 230; i += 1) {
    let mark = document.createElement("div");
    mark.classList.add("tick");
    mark.style.top = (i - 140) * 15 + "px"; // Increased spacing between ticks

    if (i % 10 === 0) {
      mark.classList.add("large");
      let label = document.createElement("div");
      label.classList.add("label");
      label.style.top = (i - 140) * 15 + "px"; // Match tick mark spacing
      label.innerText = i;
      ruler.appendChild(label);
    } else if (i % 5 === 0) {
      mark.classList.add("medium");
    } else {
      mark.classList.add("small");
    }
    ruler.appendChild(mark);
  }

  const ftBtn = document.getElementById("ft-btn");
  const cmBtn = document.getElementById("cm-btn");
  const Raltura = document.getElementById("R-altura");
  const heightDisplay = document.getElementById("height-display");
  const heightSlider = document.getElementById("height-slider");
  const rulerContainer = document.getElementById("ruler-container");
  const weightSlider = document.getElementById("weight-slider"); // Ensure correct weight slider usage

  let isCm = true;
  let isKg = true; // Assuming a unit toggle exists for weight

  function updateToggle() {
    if (isCm) {
      cmBtn.classList.add("toggle-active");
      ftBtn.classList.remove("toggle-active");
    } else {
      ftBtn.classList.add("toggle-active");
      cmBtn.classList.remove("toggle-active");
    }
  }

  ftBtn.addEventListener("click", () => {
    isCm = false;
    updateToggle();
    updateHeight();
  });

  cmBtn.addEventListener("click", () => {
    isCm = true;
    updateToggle();
    updateHeight();
  });

  heightSlider.addEventListener("input", updateHeight);

  function updateHeight() {
    let heightValue = heightSlider.value;
    if (isCm) {
      heightDisplay.innerText = `${heightValue}.0 cm`;
      Raltura.innerText = `${heightValue}.0 cm` || 165 ;
    } else {
      let feet = Math.floor(heightValue / 30.48);
      let inches = Math.round((heightValue % 30.48) / 2.54);
      heightDisplay.innerText = `${feet}'${inches}" ft`;
      Raltura.innerText = `${feet}'${inches}" ft`|| 165;
    }
    scrollToHeight(heightValue);
  }

  function scrollToHeight(heightValue) {
    const scrollPosition = (heightValue - 180) * 15; // Adjust scroll to match new spacing
    rulerContainer.style.transform = `translateY(-${scrollPosition - rulerContainer.clientHeight / 2}px)`;
  }

  // Weight slider event listeners
  weightSlider.addEventListener("input", updateWeight);
  heightSlider.addEventListener("change", () => {
    const lastheightValue = heightSlider.value;
    //console.log(`Hight: ${lastheightValue} ${isCm ? "cm" : "ft"}`);
  });

  function updateWeight() {
    const weightValue = weightSlider.value;
    //console.log(`Peso: ${weightValue} ${isKg ? "Kg" : "Lb"}`);
  }

  // Initial scroll to match default height
  updateToggle();
  scrollToHeight(heightSlider.value);
}
createRuler();

// ---------------  createScrollBox ----------- //
async function createScrollBox(scrollBoxId, Type) {
  const scrollBox = document.getElementById(scrollBoxId);
  if (!scrollBox) return;

  const listItems = scrollBox.getElementsByTagName("li");
  if (listItems.length === 0) return;

  const itemHeight = listItems[0].offsetHeight;
  let lastSelected = null;

  function updateSelection() {
      let selected = null;
      const parentRect = scrollBox.getBoundingClientRect();

      for (let item of listItems) {
          const rect = item.getBoundingClientRect();
          if (rect.top >= parentRect.top && rect.bottom <= parentRect.bottom) {
              selected = item;
              break;
          }
      }

      for (let item of listItems) {
          item.classList.remove("active");
          item.style.transition = "opacity 0.3s";
          item.style.opacity = "0.5";
      }

      if (selected) {
          selected.classList.add("active");
          selected.style.opacity = "1";
          lastSelected = selected;
      }
  }

  function getLastSelectedValue() {
      return lastSelected ? lastSelected.innerText : null;
  }

  scrollBox.addEventListener("wheel", (e) => {
      e.preventDefault();
      scrollBox.scrollBy({ top: e.deltaY > 0 ? itemHeight : -itemHeight, behavior: 'smooth' });
  });

  scrollBox.addEventListener("scroll", () => {
      clearTimeout(scrollBox.timer);
      scrollBox.timer = setTimeout(updateSelection, 5);
  });

  updateSelection();

  setInterval(() => {
      if (lastSelected) {
         // console.log(Type, lastSelected.innerText);
      }
  }, 15000);

  // Return helper function
  return {
      getLastSelectedValue
  };
}
function renderSelectedValue(SB,Rurl) {
  const value = SB.getLastSelectedValue();
  const target = document.getElementById(Rurl);
  if (target && value) {
      target.innerText = value;  // or target.value = value; if it's an input
  }
}

// ----------------- Arm Block ------------------ //
const armScrollBox = await createScrollBox("scrollBox", "Arm:");
setInterval(renderSelectedValue(armScrollBox,"R-Perímetro-brazo-derecho"), 1000); 
// ----------------- Waist Block ------------------ //
const WaistScrollBox = await createScrollBox("CscrollBox", "Waist:");
setInterval(renderSelectedValue(WaistScrollBox,"R-Perímetro-de-cintura"), 1000); 
// ----------------- Hips Block ------------------ //
const HipScrollBox = await createScrollBox("HscrollBox", "Hips:");
setInterval(renderSelectedValue(HipScrollBox,"R-Perímetro-de-cadera"), 1000); 
// ----------------- Leg Block ------------------ //
const LegScrollBox = await createScrollBox("LscrollBox", "Leg:");
setInterval(renderSelectedValue(LegScrollBox,"R-Perímetro-de-pierna"), 1000); 
// ----------------- Rist Block ------------------ //
const WristScrollBox = await createScrollBox("RscrollBox", "Wrist:");
setInterval(renderSelectedValue(WristScrollBox,"R-Perímetro-de-muñec"), 1000); 
// ----------------- Knee Block ------------------ //
const KneeScrollBox = await createScrollBox("KscrollBox", "Knee:");
setInterval(renderSelectedValue(KneeScrollBox,"R-Perímetro-de-rodilla"), 1000); 
// ----------------- Neck Block ------------------ //
const NeckScrollBox = await createScrollBox("NscrollBox", "Neck:");
setInterval(renderSelectedValue(NeckScrollBox,"R-Perímetro-de-cuello"), 1000); 





// ----------------- Q1 Block ------------------ //
async function createQ1Dropdown() {
  try {
    if (typeof transferreduserInfo === "undefined") {
      console.error("Error: transferreduserInfo is not defined.");
      return;
    }

    const UserInfo = await checkDocumentExists("users", transferreduserInfo);

    if (!UserInfo || !UserInfo.genero) {
      console.error("Error: User info or gender is missing.");
      return;
    }

    const sex = UserInfo.genero;
    const BpmM = document.getElementById("BpmM");
    const BpmF = document.getElementById("BpmF");
    const RBPM = document.getElementById("R-BPM");

    if (!BpmM || !BpmF) {
      console.error("Error: Elements BpmM or BpmF not found in the document.");
      return;
    }

    if (sex === "Male") {
      BpmF.style.display = "none";
      BpmM.style.display = "flex";
    } else {
      BpmM.style.display = "none";
      BpmF.style.display = "flex";
    }

    

  if (BpmM) {
    BpmM.addEventListener("change", function () {
      //console.log("Selected Male BPM:", BpmM.value);
      RBPM.innerText = BpmM.value;
    });
  }

  if (BpmF) {
    BpmF.addEventListener("change", function () {
      //console.log("Selected Female BPM:", BpmF.value);
      RBPM.innerText = BpmF.value;
    });
  }
  } catch (error) {
    console.error("Error in createQ1Dropdown:", error);
  }
}
createQ1Dropdown();
// ----------------- Q2 Block ------------------ //
async function createQ2toggle() {
  const Q2      = document.getElementById('Q2');
  const yesBtn  = document.getElementById('yes-Exercies-btn');
  const noBtn   = document.getElementById('no-Exercies-btn');
  const yesQ    = document.getElementById('yes-Q2-question');
  const noQ     = document.getElementById('no-Q2-question');

 
  let isYes = true;



  function updateToggle() {
      if (isYes) {
        yesBtn.classList.add('toggle-active');
        noBtn.classList.remove('toggle-active');
        
        //console.log("Exercies Yes");
        setTimeout(() => {
          Q2.style.display = "none";
          yesQ.style.display = "flex";
        }, 700); // 5 seconds delay
       
      } else {
        noBtn.classList.add('toggle-active');
        yesBtn.classList.remove('toggle-active');
       // console.log("Exercies No");
        setTimeout(() => {
          Q2.style.display = "none";
          noQ.style.display = "flex";
        }, 700); // 5 seconds delay

        
      }
  }

  yesBtn.addEventListener('click', () => {
      isYes = true;
      updateToggle();
      
  });

  noBtn.addEventListener('click', () => {
      isYes = false;
      updateToggle();
      RENT.innerText = "No";
  });

  const ExerciesYes = document.getElementById("Exercies-frequency");
  const ExerciesNo = document.getElementById("Exercies-time");
  const RBPMA = document.getElementById("R-Exercies-A");
  const QS2 = document.getElementById("QS2");

  if (ExerciesYes) {
    ExerciesYes.addEventListener("change", function () {
      QS2.innerText = "Frecuencia";
      function checkIfpererl(){
        if(ExerciesYes.value === 1){
          return("vez a la semana")
        }else{
          return("veces a la semana")
        }
      }
      
      RBPMA.innerText = `${ExerciesYes.value} ${checkIfpererl()}`;
    });
  }

  if (ExerciesNo) {
    ExerciesNo.addEventListener("change", function () {
      QS2.innerText = "Entrenamiento";
      function checkIfpererl(){
        if(ExerciesNo.value === 1){
          return("vez a la semana")
        }else{
          return("veces a la semana")
        }
      }
      RBPMA.innerText = `${ExerciesNo.value} ${checkIfpererl()}`;
    });
  }


}
createQ2toggle()
// ----------------- Q3 Block ------------------ //
async function createQ3toggle() {
  const Q3 = document.getElementById('Q3');
  const yesBtn = document.getElementById('yes-alcohol-btn');
  const noBtn = document.getElementById('no-alcohol-btn');
  const yesQ = document.getElementById('yes-Q3-question');
  const yesQE = document.getElementById('yes-Q3-extra-question');
  const noQ = document.getElementById('no-Q3-question');
  const RDrink = document.getElementById("R-Drink");

  let isYes = true;

  function updateToggle() {
      if (isYes) {
        yesBtn.classList.add('toggle-active');
        noBtn.classList.remove('toggle-active');
        //console.log("Alcohol Yes");
        setTimeout(() => {
          Q3.style.display = "none";
          yesQ.style.display = "flex";
        }, 700); // 5 seconds delay

      } else {
        noBtn.classList.add('toggle-active');
        yesBtn.classList.remove('toggle-active'); 
       // console.log("Alcohol No");
        setTimeout(() => {
          Q3.style.display = "none";
          noQ.style.display = "flex";
        }, 700); // 5 seconds delay
      }
  }

  yesBtn.addEventListener('click', () => {
      isYes = true;
      updateToggle();
      
  });

  noBtn.addEventListener('click', () => {
      isYes = false;
      updateToggle();
     
      RDrink.innerText = "No";
     
  });

  document.getElementById("Drink").addEventListener("change", function() {
    if (this.value) {
        yesQ.style.display = "none";
        yesQE.style.display = "flex";
       // console.log("Selected option:", this.value);
    }
  });

  const Drink = document.getElementById("Drink");
  const DrinkingFrequency = document.getElementById("drink-frequency");
  const DrinkingTime = document.getElementById("Drinking-time");
  const RDrinkT = document.getElementById("R-Drink-T");
  const QS2 = document.getElementById("QS2");

  if (Drink) {
    Drink.addEventListener("change", function () {
      RDrink.innerText = Drink.value;
    });
  }

  if (DrinkingFrequency) {
    DrinkingFrequency.addEventListener("change", function () {
      QS2.innerText = "Frecuencia";  

      function checkIfpererl(){
        if(DrinkingFrequency.value === 1){
          return("vez a la semana")
        }else{
          return("veces a la semana")
        }
      }

      RDrinkT.innerText =`${DrinkingFrequency.value} ${checkIfpererl()}`;

    });
  }

  if (DrinkingTime) {
    DrinkingTime.addEventListener("change", function () {
      QS2.innerText = "Consumo de alcohol";
      RDrinkT.innerText = DrinkingTime.value;
    });
  }
}
createQ3toggle()
// ----------------- Q4 Block ------------------ //
async function createQ4toggle() {
  const Q4      = document.getElementById('Q4');

  const yesBtn  = document.getElementById('yes-Fumas-btn');
  const noBtn   = document.getElementById('no-Fumas-btn');

  const yesQ    = document.getElementById('yes-Q4-question');
  const noQ     = document.getElementById('no-Q4-question');

  const smokingyears = document.getElementById("smoking-years-select");
  const quitsmoking  = document.getElementById("quit-smoking-time");

  const QSM4 = document.getElementById("QS4");
  const RENT = document.getElementById("R-Fumas");
  const RENT2 = document.getElementById("R-Fumas-2");

  let isYes = true;

  function updateToggle() {
    if (isYes) {
      yesBtn.classList.add('toggle-active');
      noBtn.classList.remove('toggle-active');
     // console.log("Smoke Yes");
      setTimeout(() => {
        Q4.style.display = "none";
        yesQ.style.display = "flex";
      }, 700); // 5 seconds delay
    } else {
      noBtn.classList.add('toggle-active');
      yesBtn.classList.remove('toggle-active');
    //  console.log("Smoke No");
      setTimeout(() => {
        Q4.style.display = "none";
        noQ.style.display = "flex";
      }, 700); // 5 seconds delay
    }
}

  yesBtn.addEventListener('click', () => {
      isYes = true;
      updateToggle();
      RENT.innerText = "Si";
  });

  noBtn.addEventListener('click', () => {
      isYes = false;
      updateToggle();
      RENT.innerText = "No";
     
  });

  if (smokingyears) {
    smokingyears.addEventListener("change", function () {
        QSM4.innerText = "Años fumaste";
        RENT2.innerText = smokingyears.value;
    });
  }
  if (quitsmoking) {
    quitsmoking.addEventListener("change", function () {
      QSM4.innerText = "Dejaste o nunca";
      RENT2.innerText = quitsmoking.value;
    });
  }
}
createQ4toggle()
// ----------------- Q5 Block ------------------ //
async function createQ5toggle() {
  const Q5      = document.getElementById('Q5');
  const yesBtn  = document.getElementById('yes-Hipercolesteremia-btn');
  const noBtn   = document.getElementById('no-Hipercolesteremia-btn');
  const yesQ    = document.getElementById('yes-Q5-question');
  const tratamientoYes = document.getElementById("yes-Hipercolesteremia-tratamiento-btn");
  const tratamientoNo = document.getElementById("no-Hipercolesteremia-tratamiento-btn");
  const RENT = document.getElementById("R-ENT-1");
 
  let isYes = true;

  function updateToggle() {
    if (isYes) {
      yesBtn.classList.add('toggle-active');
      noBtn.classList.remove('toggle-active');
      //console.log("Smoke Yes");
      setTimeout(() => {
        Q5.style.display = "none";
        yesQ.style.display = "flex";
      }, 700); // 5 seconds delay
    } else {
      noBtn.classList.add('toggle-active');
      yesBtn.classList.remove('toggle-active');
     // console.log("Smoke No");
    }
  }

  yesBtn.addEventListener('click', () => {
      isYes = true;
      updateToggle();
  });

  noBtn.addEventListener('click', () => {
      isYes = false;
      updateToggle();
      RENT.innerText = "No";
     
  });

  function updateSecondToggle() {
    if (isYes) {
      tratamientoYes.classList.add('toggle-active');
      tratamientoNo.classList.remove('toggle-active');
  
    } else {
      tratamientoNo.classList.add('toggle-active');
      tratamientoYes.classList.remove('toggle-active');

    }
  }

  tratamientoYes.addEventListener('click', () => {
    isYes = true;
    updateSecondToggle()
    RENT.innerText = `tratamiento`;
    
  });

  tratamientoNo.addEventListener('click', () => {
      isYes = false;
      updateSecondToggle()
      RENT.innerText = `No tratamiento`;
  });
}
createQ5toggle()
// ----------------- Q6 Block ------------------ //
async function createQ6toggle() {
  const Q      = document.getElementById('Q6');
  const yesBtn  = document.getElementById('yes-Diabetes-btn');
  const noBtn   = document.getElementById('no-Diabetes-btn');
  const yesQ    = document.getElementById('yes-Q6-question');
  const tratamientoYes = document.getElementById('yes-Diabetes-tratamiento-btn');
  const tratamientoNo = document.getElementById('no-Diabetes-tratamiento-btn');
  const RENT = document.getElementById("R-ENT-2");

 
  let isYes = true;

  function updateToggle() {
    if (isYes) {
      yesBtn.classList.add('toggle-active');
      noBtn.classList.remove('toggle-active');
      //console.log("Smoke Yes");
      setTimeout(() => {
        Q.style.display = "none";
        yesQ.style.display = "flex";
      }, 700); // 5 seconds delay
    } else {
      noBtn.classList.add('toggle-active');
      yesBtn.classList.remove('toggle-active');
     // console.log("Smoke No");
    }
}

  yesBtn.addEventListener('click', () => {
      isYes = true;
      updateToggle();
      
  });

  noBtn.addEventListener('click', () => {
    isYes = false;
    updateToggle();
    RENT.innerText = "No";
  });

  function updateSecondToggle() {
    if (isYes) {
      tratamientoYes.classList.add('toggle-active');
      tratamientoNo.classList.remove('toggle-active');
  
    } else {
      tratamientoNo.classList.add('toggle-active');
      tratamientoYes.classList.remove('toggle-active');

    }
  }

  tratamientoYes.addEventListener('click', () => {
    isYes = true;
    updateSecondToggle()
    RENT.innerText = `tratamiento`;
    
  });

  tratamientoNo.addEventListener('click', () => {
    isYes = false;
    updateSecondToggle()
    RENT.innerText = `No tratamiento`;
  });
}
createQ6toggle()
// ----------------- Q7 Block ------------------ //
async function createQ7toggle() {
  const Q      = document.getElementById('Q7');
  const yesBtn  = document.getElementById('yes-Obesidad-btn');
  const noBtn   = document.getElementById('no-Obesidad-btn');
  const yesQ    = document.getElementById('yes-Q7-question');
  const tratamientoYes = document.getElementById('yes-Obesidad-tratamiento-btn');
  const tratamientoNo = document.getElementById('no-Obesidad-tratamiento-btn');
  const RENT = document.getElementById("R-ENT-3");
  
  let isYes = true;

  function updateToggle() {
    if (isYes) {
      yesBtn.classList.add('toggle-active');
      noBtn.classList.remove('toggle-active');
      //console.log("Smoke Yes");
      setTimeout(() => {
        Q.style.display = "none";
        yesQ.style.display = "flex";
      }, 700); // 5 seconds delay
    } else {
      noBtn.classList.add('toggle-active');
      yesBtn.classList.remove('toggle-active');
      //console.log("Smoke No");
    }
}

  yesBtn.addEventListener('click', () => {
      isYes = true;
      updateToggle();
      
  });

  noBtn.addEventListener('click', () => {
      isYes = false;
      updateToggle();
      RENT.innerText = "No";
  });

  function updateSecondToggle() {
    if (isYes) {
      tratamientoYes.classList.add('toggle-active');
      tratamientoNo.classList.remove('toggle-active');
  
    } else {
      tratamientoNo.classList.add('toggle-active');
      tratamientoYes.classList.remove('toggle-active');

    }
  }

  tratamientoYes.addEventListener('click', () => {
    isYes = true;
    updateSecondToggle()
    RENT.innerText = `tratamiento`;
  });

  tratamientoNo.addEventListener('click', () => {
      isYes = false;
      updateSecondToggle()
      RENT.innerText = `No tratamiento`;
  });
}
createQ7toggle()
// ----------------- Q8 Block ------------------ //
async function createQ8toggle() {
  const Q      = document.getElementById('Q8');
  const yesBtn  = document.getElementById('yes-Hígado-Graso-btn');
  const noBtn   = document.getElementById('no-Hígado-Graso-btn');
  const yesQ    = document.getElementById('yes-Q8-question');
  const tratamientoYes = document.getElementById('yes-Hígado-Graso-tratamiento-btn');
  const tratamientoNo = document.getElementById('no-Hígado-Graso-tratamiento-btn');
  const RENT = document.getElementById("R-ENT-4");
  
  let isYes = true;

  function updateToggle() {
    if (isYes) {
      yesBtn.classList.add('toggle-active');
      noBtn.classList.remove('toggle-active');
      //console.log("Smoke Yes");
      setTimeout(() => {
        Q.style.display = "none";
        yesQ.style.display = "flex";
      }, 700); // 5 seconds delay
    } else {
      noBtn.classList.add('toggle-active');
      yesBtn.classList.remove('toggle-active');
     // console.log("Smoke No");
    }
}

  yesBtn.addEventListener('click', () => {
      isYes = true;
      updateToggle();
      
  });

  noBtn.addEventListener('click', () => {
      isYes = false;
      updateToggle();
      RENT.innerText = "No";
  });

  function updateSecondToggle() {
    if (isYes) {
      tratamientoYes.classList.add('toggle-active');
      tratamientoNo.classList.remove('toggle-active');
  
    } else {
      tratamientoNo.classList.add('toggle-active');
      tratamientoYes.classList.remove('toggle-active');

    }
  }

  tratamientoYes.addEventListener('click', () => {
    isYes = true;
    updateSecondToggle()
    RENT.innerText = `tratamiento`;
  });

  tratamientoNo.addEventListener('click', () => {
      isYes = false;
      updateSecondToggle()
      RENT.innerText = `No tratamiento`;
  });
}
createQ8toggle()
// ----------------- Q9 Block ------------------ //
async function createQ9toggle() {
  const Q      = document.getElementById('Q9');
  const yesBtn  = document.getElementById('yes-Otra-ENT-btn');
  const noBtn   = document.getElementById('no-Otra-ENT-btn');
  const yesQ    = document.getElementById('yes-Q9-question');
  const tratamientoYes = document.getElementById('yes-Otra-ENT-tratamiento-btn');
  const tratamientoNo = document.getElementById('no-Otra-ENT-tratamiento-btn');
  const RENT = document.getElementById("R-ENT-5");
  
  let isYes = true;

  function updateToggle() {
    if (isYes) {
      yesBtn.classList.add('toggle-active');
      noBtn.classList.remove('toggle-active');
     // console.log("Smoke Yes");
      setTimeout(() => {
        Q.style.display = "none";
        yesQ.style.display = "flex";
      }, 700); // 5 seconds delay
    } else {
      noBtn.classList.add('toggle-active');
      yesBtn.classList.remove('toggle-active');
     // console.log("Smoke No");
    }
}

  yesBtn.addEventListener('click', () => {
      isYes = true;
      updateToggle();
      
  });

  noBtn.addEventListener('click', () => {
      isYes = false;
      updateToggle();
      RENT.innerText = "No";
  });

  function updateSecondToggle() {
    if (isYes) {
      tratamientoYes.classList.add('toggle-active');
      tratamientoNo.classList.remove('toggle-active');
  
    } else {
      tratamientoNo.classList.add('toggle-active');
      tratamientoYes.classList.remove('toggle-active');

    }
  }

  tratamientoYes.addEventListener('click', () => {
    isYes = true;
    updateSecondToggle()
    RENT.innerText = `tratamiento`;
  });

  tratamientoNo.addEventListener('click', () => {
      isYes = false;
      updateSecondToggle()
      RENT.innerText = `No tratamiento`;
  });
}
createQ9toggle()
// ----------------- Q10 Block ------------------ //
async function createQ10toggle() {
  const Q      = document.getElementById('Q10');
  const yesBtn  = document.getElementById('yes-Lupus-btn');
  const noBtn   = document.getElementById('no-Lupus-btn');
  const yesQ    = document.getElementById('yes-Q10-question');
  const tratamientoYes = document.getElementById('yes-Lupus-tratamiento-btn');
  const tratamientoNo = document.getElementById('no-Lupus-tratamiento-btn');
  const RENT = document.getElementById("R-ENT-6");
  
  let isYes = true;

  function updateToggle() {
    if (isYes) {
      yesBtn.classList.add('toggle-active');
      noBtn.classList.remove('toggle-active');
      //console.log("Smoke Yes");
      setTimeout(() => {
        Q.style.display = "none";
        yesQ.style.display = "flex";
      }, 700); // 5 seconds delay
    } else {
      noBtn.classList.add('toggle-active');
      yesBtn.classList.remove('toggle-active');
      //console.log("Smoke No");
    }
}

  yesBtn.addEventListener('click', () => {
      isYes = true;
      updateToggle();
      
  });

  noBtn.addEventListener('click', () => {
      isYes = false;
      updateToggle();
      RENT.innerText = "No";
  });

  function updateSecondToggle() {
    if (isYes) {
      tratamientoYes.classList.add('toggle-active');
      tratamientoNo.classList.remove('toggle-active');
  
    } else {
      tratamientoNo.classList.add('toggle-active');
      tratamientoYes.classList.remove('toggle-active');

    }
  }

  tratamientoYes.addEventListener('click', () => {
    isYes = true;
    updateSecondToggle()
    RENT.innerText = `tratamiento`;
  });

  tratamientoNo.addEventListener('click', () => {
      isYes = false;
      updateSecondToggle()
      RENT.innerText = `No tratamiento`;
  });
}
createQ10toggle()
// ----------------- Q11 Block ------------------ //
async function createQ11toggle() {
  const Q      = document.getElementById('Q11');
  const yesBtn  = document.getElementById('yes-Celíaca-btn');
  const noBtn   = document.getElementById('no-Celíaca-btn');
  const yesQ    = document.getElementById('yes-Q11-question');
  const tratamientoYes = document.getElementById('yes-Celíaca-tratamiento-btn');
  const tratamientoNo = document.getElementById('no-Celíaca-tratamiento-btn');
  const RENT = document.getElementById("R-ENT-7");
  
  let isYes = true;

  function updateToggle() {
    if (isYes) {
      yesBtn.classList.add('toggle-active');
      noBtn.classList.remove('toggle-active');
      //console.log("Smoke Yes");
      setTimeout(() => {
        Q.style.display = "none";
        yesQ.style.display = "flex";
      }, 700); // 5 seconds delay
    } else {
      noBtn.classList.add('toggle-active');
      yesBtn.classList.remove('toggle-active');
      //console.log("Smoke No");
    }
}

  yesBtn.addEventListener('click', () => {
      isYes = true;
      updateToggle();
      
  });

  noBtn.addEventListener('click', () => {
      isYes = false;
      updateToggle();
      RENT.innerText = "No";
  });

  function updateSecondToggle() {
    if (isYes) {
      tratamientoYes.classList.add('toggle-active');
      tratamientoNo.classList.remove('toggle-active');
  
    } else {
      tratamientoNo.classList.add('toggle-active');
      tratamientoYes.classList.remove('toggle-active');

    }
  }

  tratamientoYes.addEventListener('click', () => {
    isYes = true;
    updateSecondToggle()
    RENT.innerText = `tratamiento`;
  });

  tratamientoNo.addEventListener('click', () => {
      isYes = false;
      updateSecondToggle()
      RENT.innerText = `No tratamiento`;
  });
}
createQ11toggle()
// ----------------- Q12 Block ------------------ //
async function createQ12toggle() {
  const Q      = document.getElementById('Q12');
  const yesBtn  = document.getElementById('yes-Cáncer-btn');
  const noBtn   = document.getElementById('no-Cáncer-btn');
  const yesQ    = document.getElementById('yes-Q12-question');
  const tratamientoYes = document.getElementById('yes-Cáncer-tratamiento-btn');
  const tratamientoNo = document.getElementById('no-Cáncer-tratamiento-btn');
  const RENT = document.getElementById("R-ENT-8");
  
  let isYes = true;

  function updateToggle() {
    if (isYes) {
      yesBtn.classList.add('toggle-active');
      noBtn.classList.remove('toggle-active');
      //console.log("Smoke Yes");
      setTimeout(() => {
        Q.style.display = "none";
        yesQ.style.display = "flex";
      }, 700); // 5 seconds delay
    } else {
      noBtn.classList.add('toggle-active');
      yesBtn.classList.remove('toggle-active');
      //console.log("Smoke No");
    }
}

  yesBtn.addEventListener('click', () => {
      isYes = true;
      updateToggle();
      
  });

  noBtn.addEventListener('click', () => {
      isYes = false;
      updateToggle();
      RENT.innerText = "No";
  });

  function updateSecondToggle() {
    if (isYes) {
      tratamientoYes.classList.add('toggle-active');
      tratamientoNo.classList.remove('toggle-active');
  
    } else {
      tratamientoNo.classList.add('toggle-active');
      tratamientoYes.classList.remove('toggle-active');

    }
  }

  tratamientoYes.addEventListener('click', () => {
    isYes = true;
    updateSecondToggle()
    RENT.innerText = `tratamiento`;
  });

  tratamientoNo.addEventListener('click', () => {
      isYes = false;
      updateSecondToggle()
      RENT.innerText = `No tratamiento`;
  });
}
createQ12toggle()
// ----------------- Q13 Block ------------------ //
async function createQ13toggle() {
  const Q      = document.getElementById('Q13');
  const yesBtn  = document.getElementById('yes-VIH-btn');
  const noBtn   = document.getElementById('no-VIH-btn');
  const yesQ    = document.getElementById('yes-Q13-question');
  const tratamientoYes = document.getElementById('yes-VIH-tratamiento-btn');
  const tratamientoNo = document.getElementById('no-VIH-tratamiento-btn');
  const RENT = document.getElementById("R-ENT-9");
  
  let isYes = true;

  function updateToggle() {
    if (isYes) {
      yesBtn.classList.add('toggle-active');
      noBtn.classList.remove('toggle-active');
      //console.log("Smoke Yes");
      setTimeout(() => {
        Q.style.display = "none";
        yesQ.style.display = "flex";
      }, 700); // 5 seconds delay
    } else {
      noBtn.classList.add('toggle-active');
      yesBtn.classList.remove('toggle-active');
      //console.log("Smoke No");
    }
}

  yesBtn.addEventListener('click', () => {
      isYes = true;
      updateToggle();
      
  });

  noBtn.addEventListener('click', () => {
      isYes = false;
      updateToggle();
      RENT.innerText = "No";
  });

  function updateSecondToggle() {
    if (isYes) {
      tratamientoYes.classList.add('toggle-active');
      tratamientoNo.classList.remove('toggle-active');
  
    } else {
      tratamientoNo.classList.add('toggle-active');
      tratamientoYes.classList.remove('toggle-active');

    }
  }

  tratamientoYes.addEventListener('click', () => {
    isYes = true;
    updateSecondToggle()
    RENT.innerText = `tratamiento`;
  });

  tratamientoNo.addEventListener('click', () => {
      isYes = false;
      updateSecondToggle()
      RENT.innerText = `No tratamiento`;
  });
}
createQ13toggle()
// ----------------- Q14 Block ------------------ //
async function createQ14toggle() {
  const Q      = document.getElementById('Q14');
  const yesBtn  = document.getElementById('yes-Artritis-btn');
  const noBtn   = document.getElementById('no-Artritis-btn');
  const yesQ    = document.getElementById('yes-Q14-question');
  const tratamientoYes = document.getElementById('yes-Artritis-tratamiento-btn');
  const tratamientoNo = document.getElementById('no-Artritis-tratamiento-btn');
  const RENT = document.getElementById("R-ENT-10");
  
  let isYes = true;

  function updateToggle() {
    if (isYes) {
      yesBtn.classList.add('toggle-active');
      noBtn.classList.remove('toggle-active');
      //console.log("Smoke Yes");
      setTimeout(() => {
        Q.style.display = "none";
        yesQ.style.display = "flex";
      }, 700); // 5 seconds delay
    } else {
      noBtn.classList.add('toggle-active');
      yesBtn.classList.remove('toggle-active');
      //console.log("Smoke No");
    }
}

  yesBtn.addEventListener('click', () => {
      isYes = true;
      updateToggle();
      
  });

  noBtn.addEventListener('click', () => {
      isYes = false;
      updateToggle();
      RENT.innerText = "No";
  });

  function updateSecondToggle() {
    if (isYes) {
      tratamientoYes.classList.add('toggle-active');
      tratamientoNo.classList.remove('toggle-active');
  
    } else {
      tratamientoNo.classList.add('toggle-active');
      tratamientoYes.classList.remove('toggle-active');

    }
  }

  tratamientoYes.addEventListener('click', () => {
    isYes = true;
    updateSecondToggle()
    RENT.innerText = `tratamiento`;
  });

  tratamientoNo.addEventListener('click', () => {
      isYes = false;
      updateSecondToggle()
      RENT.innerText = `No tratamiento`;
  });
}
createQ14toggle()
// ----------------- Q15 Block ------------------ //
async function createQ15toggle() {
  const Q      = document.getElementById('Q15');
  const yesBtn  = document.getElementById('yes-Otra-enfermedad-btn');
  const noBtn   = document.getElementById('no-Otra-enfermedad-btn');
  const yesQ    = document.getElementById('yes-Q15-question');
  const tratamientoYes = document.getElementById('yes-Otra-enfermedad-tratamiento-btn');
  const tratamientoNo = document.getElementById('no-Otra-enfermedad-tratamiento-btn');
  const RENT = document.getElementById("R-ENT-11");
  
  let isYes = true;

  function updateToggle() {
    if (isYes) {
      yesBtn.classList.add('toggle-active');
      noBtn.classList.remove('toggle-active');
      //console.log("Smoke Yes");
      setTimeout(() => {
        Q.style.display = "none";
        yesQ.style.display = "flex";
      }, 700); // 5 seconds delay
    } else {
      noBtn.classList.add('toggle-active');
      yesBtn.classList.remove('toggle-active');
      //console.log("Smoke No");
    }
}

  yesBtn.addEventListener('click', () => {
      isYes = true;
      updateToggle();
      
  });

  noBtn.addEventListener('click', () => {
      isYes = false;
      updateToggle();
      RENT.innerText = "No";
  });

  function updateSecondToggle() {
    if (isYes) {
      tratamientoYes.classList.add('toggle-active');
      tratamientoNo.classList.remove('toggle-active');
  
    } else {
      tratamientoNo.classList.add('toggle-active');
      tratamientoYes.classList.remove('toggle-active');

    }
  }

  tratamientoYes.addEventListener('click', () => {
    isYes = true;
    updateSecondToggle()
    RENT.innerText = `tratamiento`;
  });

  tratamientoNo.addEventListener('click', () => {
      isYes = false;
      updateSecondToggle()
      RENT.innerText = `No tratamiento`;
  });
}
createQ15toggle()
function MultiBlockValue() {
  const questions = ['Q2', 'Q3', 'Q4'];
  const selections = {};

  function setupButtons(questionId, yesBtnId, noBtnId) {
    const yesBtn = document.getElementById(yesBtnId);
    const noBtn = document.getElementById(noBtnId);

    if (!yesBtn || !noBtn) return;

    yesBtn.addEventListener('click', () => {
      selections[questionId] = 'Sí';
      clearBorder(questionId);
      //console.log(`${questionId}: Sí`);
    });

    noBtn.addEventListener('click', () => {
      selections[questionId] = 'No';
      clearBorder(questionId);
      //console.log(`${questionId}: No`);
    });
  }

  function renderBorderAlert(questionId) {
    const container = document.getElementById(questionId);
    if (container) {
      container.style.border = '2px solid red';
    }
  }

  function clearBorder(questionId) {
    const container = document.getElementById(questionId);
    if (container) {
      container.style.border = 'none';
    }
  }

  function handleMultiBtnClick() {
    let allSelected = true;

    for (const q of questions) {
      if (!selections[q]) {
        renderBorderAlert(q);
        allSelected = false;
      }
    }

    if (!allSelected) {
      alert('Por favor, responde todas las preguntas antes de continuar.');
    } else {
      //console.log('Respuestas:', selections);
      // You can proceed with processing here
    }
  }

  // Setup each question toggle
  setupButtons('Q2', 'yes-Exercies-btn', 'no-Exercies-btn');
  setupButtons('Q3', 'yes-alcohol-btn', 'no-alcohol-btn');
  setupButtons('Q4', 'yes-Fumas-btn', 'no-Fumas-btn');

  // Attach to main button
  document.getElementById('MultiBtn').addEventListener('click', handleMultiBtnClick);
}
MultiBlockValue();
function ValidateAllExtraQuestions() {
  const selectQuestions = [
    { selectId: 'Exercies-frequency', containerId: 'yes-Q2-question' },
    { selectId: 'Drink', containerId: 'yes-Q3-question' },
    { selectId: 'drink-frequency', containerId: 'yes-Q3-extra-question' },
    { selectId: 'frequency', containerId: 'yes-Q4-question' },
    { selectId: 'Exercies-time', containerId: 'no-Q2-question' },
    { selectId: 'Drinking-time', containerId: 'no-Q3-question' },
    { selectId: 'exercise-time', containerId: 'no-Q4-question' },
    { selectId: 'BpmM', containerId: 'Q1' }, // Male resting heart rate
    { selectId: 'BpmF', containerId: 'Q1' }  // Female resting heart rate
  ];

  function renderBorderAlert(containerId) {
    const element = document.getElementById(containerId);
    if (element) {
      element.style.border = '2px solid red';
    }
  }

  function clearBorder(containerId) {
    const element = document.getElementById(containerId);
    if (element) {
      element.style.border = 'none';
    }
  }

  function handleExtraValidation() {
    let allValid = true;
    const answers = {};

    selectQuestions.forEach(({ selectId, containerId }) => {
      const select = document.getElementById(selectId);
      if (select && !select.value) {
        renderBorderAlert(containerId);
        allValid = false;
      } else {
        clearBorder(containerId);
        if (select) {
          answers[selectId] = select.value;
        }
      }
    });

    if (allValid) {
      //console.log('Respuestas adicionales:', answers);
      // ✅ Continue with your logic (e.g., send data or move to next step)
    }
  }

  // Add validation to the main button
  document.getElementById('MultiBtn').addEventListener('click', handleExtraValidation);
}
// Run it
ValidateAllExtraQuestions();

document.getElementById("Send-Results-Btn").addEventListener("click", async (event) => {
  event.preventDefault();

  function getResultsFromPage() {
    return {
      peso: document.getElementById("R-peso")?.innerText || null,
      altura: document.getElementById("R-altura")?.innerText || null,
      muneca: document.getElementById("R-Perímetro-de-muñec")?.innerText || null,
      rodilla: document.getElementById("R-Perímetro-de-rodilla")?.innerText || null,
      cintura: document.getElementById("R-Perímetro-de-cintura")?.innerText || null,
      cadera: document.getElementById("R-Perímetro-de-cadera")?.innerText || null,
      brazoDerecho: document.getElementById("R-Perímetro-brazo-derecho")?.innerText || null,
      piernaDerecha: document.getElementById("R-Perímetro-de-pierna")?.innerText || null,
      cuello: document.getElementById("R-Perímetro-de-cuello")?.innerText || null,
      ejercicio: document.getElementById("R-Exercies-A")?.innerText || null,
      RHR: document.getElementById("R-BPM")?.innerText || null,
      frecuenciaEjercicio: document.getElementById("R-Exercies-A")?.innerText === "Sí" ? document.getElementById("R-Drink-T")?.innerText : null,
      tiempoSinEjercicio: document.getElementById("R-Exercies-A")?.innerText === "No" ? document.getElementById("R-Drink-T")?.innerText : null,
      fuma: document.getElementById("R-Fumas")?.innerText || null,
      añosFumando: document.getElementById("R-Fumas")?.innerText === "Sí" ? document.getElementById("R-Fumas-2")?.innerText : null,
      tiempoSinFumar: document.getElementById("R-Fumas")?.innerText === "No" ? document.getElementById("R-Fumas-2")?.innerText : null,
      cerveza: document.getElementById("R-Drink")?.innerText || null,
      vinoEspumante: null,
      destilados: null,
      enfermedades: {
        hipercolesteremia: document.getElementById("R-ENT-1")?.innerText || null,
        diabetes: document.getElementById("R-ENT-2")?.innerText || null,
        obesidad: document.getElementById("R-ENT-3")?.innerText || null,
        higadoGraso: document.getElementById("R-ENT-4")?.innerText || null,
        otraENT: document.getElementById("R-ENT-5")?.innerText || null,
        lupus: document.getElementById("R-ENT-6")?.innerText || null,
        celiaca: document.getElementById("R-ENT-7")?.innerText || null,
        cancer: document.getElementById("R-ENT-8")?.innerText || null,
        vih: document.getElementById("R-ENT-9")?.innerText || null,
        artritis: document.getElementById("R-ENT-10")?.innerText || null,
        otraEnfermedad: document.getElementById("R-ENT-11")?.innerText || null,
      },
      timestamp: new Date().toISOString(),
    };
  }

  const formData = getResultsFromPage();
  console.log(formData);

  try {
    const userId = transferreduserInfo;
    if (!userId) throw new Error("User ID is not set.");

    const userRef = doc(db, "users", userId);
    const evaluationsRef = collection(userRef, "evaluation");
    const newDocRef = await addDoc(evaluationsRef, formData);

    console.log(`New evaluation added with ID: ${newDocRef.id}`);

    await updateDoc(userRef, {
      lastEvaluation: formData,
      lastEvaluationId: newDocRef.id,
      evaluation: true,
    });

    localStorage.setItem("userInfo", JSON.stringify(formData));

    alert("Form submitted successfully!");
    // Replace this with your logic
    window.location.href = "index9.html"; 
  } catch (error) {
    console.error("Error submitting the evaluation:", error);
    alert("Error submitting the evaluation. Please try again.");
  }
});


function setBgImgs(imgSrc, imgAlt, urlId) {
  // Find the img element with id 'logo-img'
  const img = document.getElementById(urlId);

  // Check if the img element exists
  if (img) {
      // Set the image source and alternative text
      img.src = imgSrc;
      img.alt = imgAlt;
  } else {
      console.error("Image element with id 'logo-img' not found.");
  }
}
   
// ---------------- Next Btn Block ---------------- //
document.getElementById("Btn").addEventListener("click", function() {
  let StartElement = document.getElementById("Start");
  let zeroElement = document.getElementById("zero");
  if (StartElement) {
      StartElement.style.display = "none";
  }
  if (zeroElement) {
      zeroElement.style.display = "flex"
  }
});
document.getElementById("WBtn").addEventListener("click", function() {
  let zeroElement = document.getElementById("zero");
  let oneElement = document.getElementById("one");
  if (zeroElement) {
      zeroElement.style.display = "none";
  }
  if (oneElement) {
      oneElement.style.display = "flex";
  }
});
document.getElementById("HBtn").addEventListener("click", async function () {
  try {
      // Ensure transferreduserInfo is defined before use
      if (typeof transferreduserInfo === "undefined") {
          console.error("Error: transferreduserInfo is not defined.");
          return;
      }

      // Fetch user info and content data
      const UserInfo = await checkDocumentExists("users", transferreduserInfo);
      const Content = await checkDocumentExists("RevolApp", "Content");

      if (!UserInfo || !Content) {
          console.error("Error: Failed to retrieve user or content data.");
          return;
      }

      const sex = UserInfo.genero;
      const Arm = Content.Images?.Evaluation?.Arm;
      
      
      if (!Arm) {
          console.error("Error: Arm images data is missing in Content.");
          return;
      }

      let oneElement = document.getElementById("one");
      let twoElement = document.getElementById("two");

      if (oneElement) {
          oneElement.style.display = "none";
      }

      if (twoElement) {
          twoElement.style.display = "flex";

          if (typeof setBgImgs === "function") {
              if (sex === "Male") {
                  setBgImgs(Arm.Male, "Arm", "ArmImg");
              } else {
                  setBgImgs(Arm.Female, "Arm", "ArmImg");
              }
          } else {
              console.error("Error: setBgImgs function is not defined.");
          }
      }
  } catch (error) {
      console.error("An error occurred:", error);
  }
});
document.getElementById("ABtn").addEventListener("click", async function () {
  try {
    // Ensure transferreduserInfo is defined before use
    if (typeof transferreduserInfo === "undefined") {
        console.error("Error: transferreduserInfo is not defined.");
        return;
    }

    // Fetch user info and content data
    const UserInfo = await checkDocumentExists("users", transferreduserInfo);
    const Content = await checkDocumentExists("RevolApp", "Content");

    if (!UserInfo || !Content) {
        console.error("Error: Failed to retrieve user or content data.");
        return;
    }

    const sex = UserInfo.genero;
    const Waist = Content.Images?.Evaluation?.Waist;

    if (!Waist) {
        console.error("Error: Waist images data is missing in Content.");
        return;
    }

    let twoElement = document.getElementById("two");
    let threeElement = document.getElementById("three");
    if (twoElement){
      twoElement.style.display = "none";
    }

    if (threeElement) {
      threeElement.style.display = "flex";

        if (typeof setBgImgs === "function") {
            if (sex === "Male") {
              setBgImgs(Waist.Male, "Waist", "cinturaImg")
            } else {
              setBgImgs(Waist.Female, "Waist", "cinturaImg")
            }
        } else {
            console.error("Error: setBgImgs function is not defined.");
        }
    }
} catch (error) {
    console.error("An error occurred:", error);
}

});
document.getElementById("CBtn").addEventListener("click", async function () {
  try {
     // Ensure transferreduserInfo is defined before use
     if (typeof transferreduserInfo === "undefined") {
        console.error("Error: transferreduserInfo is not defined.");
        return;
      }

      // Fetch user info and content data
      const UserInfo = await checkDocumentExists("users", transferreduserInfo);
      const Content = await checkDocumentExists("RevolApp", "Content");

      if (!UserInfo || !Content) {
          console.error("Error: Failed to retrieve user or content data.");
          return;
      }

      const sex = UserInfo.genero;
      const Hips = Content.Images?.Evaluation?.Hips;
      const Leg   = Content.Images?.Evaluation?.Leg;


   


     let threeElement = document.getElementById("three");
     let fourElement = document.getElementById("four");
     let fiveElement = document.getElementById("five");
 
 
     if (threeElement) threeElement.style.display = "none";
 
     if (sex === "Male") {
       if (fiveElement) fiveElement.style.display = "flex";
       setBgImgs(Leg.Male, "Waist", "piernaImg")
     } else {
       if (fourElement) fourElement.style.display = "flex";
       setBgImgs(Hips.Female, "Waist", "hipsImg")
     }
   } catch (error) {
     console.error("Error fetching user info:", error);
   }
});
document.getElementById("PBtn").addEventListener("click", async function () {
  try {
    // Ensure transferreduserInfo is defined before use
    if (typeof transferreduserInfo === "undefined") {
        console.error("Error: transferreduserInfo is not defined.");
        return;
    }

    // Fetch user info and content data
    const UserInfo = await checkDocumentExists("users", transferreduserInfo);
    const Content = await checkDocumentExists("RevolApp", "Content");

    if (!UserInfo || !Content) {
        console.error("Error: Failed to retrieve user or content data.");
        return;
    }

    const sex = UserInfo.genero;
    const Leg = Content.Images?.Evaluation?.Leg;

    if (!Leg) {
        console.error("Error: Leg images data is missing in Content.");
        return;
    }

    let fiveElement = document.getElementById("five");
    let sixElement = document.getElementById("six");
    if (fiveElement){
      fiveElement.style.display = "none";
    }

    if (sixElement) {
      sixElement.style.display = "flex";

        if (typeof setBgImgs === "function") {
            if (sex === "Male") {
              setBgImgs(Leg.Male, "Leg", "RistImg")
            } else {
              setBgImgs(Leg.Female, "Leg", "RistImg")
            }
        } else {
            console.error("Error: setBgImgs function is not defined.");
        }
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
});
document.getElementById("RBtn").addEventListener("click", async function () {
  try {
    // Ensure transferreduserInfo is defined before use
    if (typeof transferreduserInfo === "undefined") {
        console.error("Error: transferreduserInfo is not defined.");
        return;
    }

    // Fetch user info and content data
    const UserInfo = await checkDocumentExists("users", transferreduserInfo);
    const Content = await checkDocumentExists("RevolApp", "Content");

    if (!UserInfo || !Content) {
        console.error("Error: Failed to retrieve user or content data.");
        return;
    }

    const sex = UserInfo.genero;
    const Knees = Content.Images?.Evaluation?.Knees;

    if (!Knees) {
        console.error("Error: Knees images data is missing in Content.");
        return;
    }

   
    let sixElement = document.getElementById("six");
    let sevenElement = document.getElementById("seven");
    if (sixElement){
      sixElement.style.display = "none";
    }

    if (sevenElement) {
      sevenElement.style.display = "flex";

        if (typeof setBgImgs === "function") {
            if (sex === "Male") {
              setBgImgs(Knees.Male, "Knees", "KneeImg")
            } else {
              setBgImgs(Knees.Female, "Knees", "KneeImg")
            }
        } else {
            console.error("Error: setBgImgs function is not defined.");
        }
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
});
document.getElementById("KBtn").addEventListener("click", async function () {
  try {
    // Ensure transferreduserInfo is defined before use
    if (typeof transferreduserInfo === "undefined") {
        console.error("Error: transferreduserInfo is not defined.");
        return;
    }

    // Fetch user info and content data
    const UserInfo = await checkDocumentExists("users", transferreduserInfo);
    const Content = await checkDocumentExists("RevolApp", "Content");

    if (!UserInfo || !Content) {
        console.error("Error: Failed to retrieve user or content data.");
        return;
    }

    const sex = UserInfo.genero;
    const Neck = Content.Images?.Evaluation?.Neck;

    if (!Neck) {
        console.error("Error: Neck images data is missing in Content.");
        return;
    }

    let sevenElement = document.getElementById("seven");
    let eightElement = document.getElementById("eight");
    
    if (sevenElement){
      sevenElement.style.display = "none";
    }

    if (eightElement) {
      eightElement.style.display = "flex";

        if (typeof setBgImgs === "function") {
            if (sex === "Male") {
              setBgImgs(Neck.Male, "Knees", "KneeImg")
            } else {
              setBgImgs(Neck.Female, "Knees", "KneeImg")
            }
        } else {
            console.error("Error: setBgImgs function is not defined.");
        }
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
});
document.getElementById("NBtn").addEventListener("click", async function () {

    let eightElement = document.getElementById("eight");
    let nineElement = document.getElementById("nine");
    if (eightElement) {
      eightElement.style.display = "none";
    }
    if (nineElement) {
       nineElement.style.display = "flex"
    }
});
document.getElementById("MultiBtn").addEventListener("click", async function () {

  let nineElement = document.getElementById("nine");
  let TenElement = document.getElementById("Ten");

  if (nineElement) {
    nineElement.style.display = "none";
  }
  if (TenElement) {
    TenElement.style.display = "flex"
  }
});
document.getElementById("Multi1Btn").addEventListener("click", async function () {

    let TenElement = document.getElementById("Ten");
    let elevenElement = document.getElementById("eleven");
    if (TenElement) {
      TenElement.style.display = "none";
    }
    if (elevenElement) {
      elevenElement.style.display = "flex"
    }
});
document.getElementById("Multi2Btn").addEventListener("click", async function () {

  let elevenElement = document.getElementById("eleven");
  let twelveElement = document.getElementById("twelve");
  if (elevenElement) {
    elevenElement.style.display = "none";
  }
  if (twelveElement) {
    twelveElement.style.display = "flex";
  }
});