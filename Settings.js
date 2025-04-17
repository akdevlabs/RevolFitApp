import { 
  initializeApp 
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut 
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  updateDoc, 
  serverTimestamp,
  collection, 
  addDoc  
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

let db, auth; // Declare Firestore and Auth globally

// Fetch Firebase configuration
async function fetchFirebaseConfig() {
  try {
    //console.log("Fetching Firebase config...");
    const response = await fetch("http://localhost:3000/firebase-config"); // Change when deploying
    if (!response.ok) throw new Error("Failed to fetch Firebase config");
    return await response.json();
  } catch (error) {
    console.error("Error fetching Firebase config:", error);
    return null;
  }
}

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
    const UBU = Buissnes.UBU;
    const{bottom , center, top} = UBU.BackgroundColor

    const {Base, Prime1, Prime2, Prime3, Prime4, Prime5, Prime6} = UBU.Colors;

    function GetBuFont(fontFamily) {
      document.body.style.fontFamily = fontFamily;
    }
    function setGradient( Ctop, Ccenter, Cbottom ) {
      document.body.style.background = `linear-gradient(to bottom, ${Ctop}, ${Ccenter}, ${Cbottom})`;
    }
    function setTGradient(Block, Ctop, Cbottom) {
      const elements = document.querySelectorAll(Block);

      if (elements.length > 0) {
        elements.forEach((element) => {
          element.style.background = `linear-gradient(to bottom, ${Ctop}, ${Cbottom})`;
        });
      } else {
        console.warn(`No elements found with selector "${Block}".`);
      }
    }

    function SetetextColorPer(Uid, color){
      const element = document.getElementById(Uid);
      element.style.color = color;
    }
    function SetetextColorBlock(Block, color){
      const elements = document.querySelectorAll(Block);
     
      if (elements.length > 0) {
        elements.forEach((element) => {
          element.style.color = color;
        });
      } else {
        console.warn('No elements found with class ".carrot".');
      }
    }
   

    function setBtnColors(selector, color, text, BgColor) {
      const elements = document.querySelectorAll(selector);
    
      if (elements.length > 0) {
        elements.forEach((element) => {
          element.style.color = text;
          element.style.borderRadius = ".5rem";
          element.style.backgroundColor = BgColor;
          element.style.border = `2px solid ${color}`;
        });
      } else {
        console.warn(`No elements found with selector "${selector}".`);
      }
    }
    
    setBtnColors('.bTN-Block', Base, Base, 'transperent');
    setBtnColors('.Action-Btn', Prime1, Base, Base);
    
   
    setAllcolors()

    setGradient( top, center, bottom )
    GetBuFont(Buissnes.UBU.font);
    SetetextColorPer("Mtittle", Prime5)
    SetetextColorBlock(".carrot", Prime5 )
    SetetextColorBlock(".panel-header", Base)

  }



  function SetAllImgs(){
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
    
    setBgImgs(Buissnes.UBU.BuIcon.BuLight, Buissnes.UBU.LogoText.Logo.description, "BuIcon")

    setBgImgs(Buissnes.App.Settings.Profile, "Profile Icon", "User-Icon")
    setBgImgs(Buissnes.App.Settings.Measurement, "Ruler Icon", "units-Icon")
    setBgImgs(Buissnes.App.Settings.Sounds, "Sounds Icon", "Sounds-Icon")
    setBgImgs(Buissnes.App.Settings.Reminders, "Reminder Icon", "Reminder-Icon")

    setBgImgs(Buissnes.App.Settings.Alert, "Alert Icon", "Alert-Icon")
    


    setBgImgs(Buissnes.App.Settings.Message, "Message Icon", "Message-Icon")
    setBgImgs(Buissnes.App.Settings.Model, "Model Icon", "Model-Icon")
    setBgImgs(Buissnes.App.Settings.Report, "Report Icon", "Report-Icon")

    setBgImgs(Buissnes.App.Settings.Membership, "Membership Icon", "Membership-Icon")
    setBgImgs(Buissnes.App.Settings.Reminders, "Reminder Icon", "Reminder-Icon")

    setBgImgs(Buissnes.App.Settings.Logout, "Logout Icon", "Logout-Icon")
  }
  SetAllImgs()
  setAllcolors()

}

applyBranding()




// Get reference to the logout button
const logoutBtn = document.getElementById("Logout-Btn");
// Logout function
function logout() {
  // Clear user data stored in localStorage
  localStorage.removeItem("transferreduserInfo");
  localStorage.removeItem("transferredInfo");

  // Optionally, redirect the user to a login page or home page
  window.location.href = "index.html"; // Replace with your actual login page or homepage URL
}
// Add event listener to the logout button
logoutBtn.addEventListener("click", logout);





async function AnimationPanel(OpenBtn, ActivePanel, Closepanel) {
  try {
    const ActiveBtn = document.getElementById(OpenBtn);
    const APanel = document.getElementById(ActivePanel);
    const CPanel = document.getElementById(Closepanel);

    if (!ActiveBtn || !APanel || !CPanel) {
      console.error('One or more elements are missing');
      return;
    }

    ActiveBtn.addEventListener('click', () => {
      APanel.classList.add('active');
    });

    CPanel.addEventListener('click', () => {
      APanel.classList.remove('active');
    });
  } catch (error) {
    console.error('Error initializing profile panel:', error);
  }
}

AnimationPanel('Profile-Btn', 'Profile-Panel', 'Close-Panel')
AnimationPanel('M-Unites-Btn', 'Mesurment-panel', 'M-Close-Panel')
AnimationPanel('Sounds-Btn', 'Sound-panel', 'S-Close-Panel')
AnimationPanel('Reminder-Btn', 'Reminder-panel', 'R-Close-Panel')
AnimationPanel('Alert-Btn', 'Alert-panel', 'A-Close-Panel')
AnimationPanel('Message-Btn', 'Message-panel', 'MS-Close-Panel')
AnimationPanel('Model-Btn', 'Model-panel', 'MO-Close-Panel')
AnimationPanel('Report-Btn', 'Report-panel', 'RP-Close-Panel')
AnimationPanel('Membership-Btn', 'Membership-panel', 'ME-Close-Panel')

async function SetPanelContent(){
  const Sounds = await checkDocumentExists("RevolApp", "Sounds");
  const Buissnes = await checkDocumentExists("RevoBuissnes", transferredInfo);
  const Users = await checkDocumentExists("users", transferreduserInfo);

  const UBU = Buissnes.UBU;
  const{bottom , center, top} = UBU.BackgroundColor

  const {Base, Prime1, Prime2, Prime3, Prime4, Prime5, Prime6} = UBU.Colors;

 
//console.log(Sounds)
//console.log(Buissnes)
//console.log(Users)

  function SetColorPanel() {
    
    function BgPanelColor() {
      const elements = document.querySelectorAll(".Panel");
      const gradientBackground = `linear-gradient(335deg, ${Prime2}, ${Prime1})`;
    
      if (elements.length > 0) {
        elements.forEach(element => {
          element.style.background = gradientBackground; // use 'background' instead of 'backgroundColor'
        });
      } else {
        console.warn("No elements found with class \".Panel\".");
      }
    }
    function setTextColor() {
      const elements = document.querySelectorAll(".panel-content-Block");
      const elementsText = document.querySelectorAll(".Text-Info");
      const elementsTextresult = document.querySelectorAll(".Text-result");
     
      // Assuming Prime1 and Base are defined somewhere as valid color values
      const gradientBackground = `linear-gradient(335deg, ${Prime1}, ${Base})`;
    
      if (elements.length > 0) {
        elements.forEach((element) => {
          element.style.background = gradientBackground;
          element.style.color = Prime2;
          element.style.border = `1px solid ${Base}`;
        });
      } else {
        console.warn('No elements found with class ".panel-content-Block".');
      }
    
      if (elementsText.length > 0) {
        elementsText.forEach((el) => {
          el.style.color = Prime2;
        
        });
      } else {
        console.warn('No elements found with class ".Text-Info".');
      }

      if (elementsTextresult.length > 0) {
        elementsTextresult.forEach((el) => {
          el.style.color = Base;
        });
      } else {
        console.warn('No elements found with class ".elementsTextresult".');
      }
    }
    function SectionBgcolor(Uid, color, bColor){
      const element = document.getElementById(Uid);
      element.style.background = color;
      element.style.border = `2px solid ${bColor} `;
    }
    function makeCheckboxCircle(id, options = {}, otherCheckboxId) {
      const checkbox = document.getElementById(id);
      if (checkbox) {
        // Basic style
        checkbox.style.width = options.size || '25px';
        checkbox.style.height = options.size || '25px';
        checkbox.style.border = options.border || '2px solid #000';
        checkbox.style.borderRadius = '50%';
        checkbox.style.backgroundColor = options.backgroundColor || '#fff';
        checkbox.style.accentColor = options.accentColor || '#000';
        checkbox.style.cursor = 'pointer';
        checkbox.style.appearance = 'none';
        checkbox.style.outline = 'none';
        checkbox.style.display = 'inline-block';
        checkbox.style.position = 'relative';
    
        // Add a shadow checkmark when checked
        checkbox.addEventListener('change', function () {
          if (checkbox.checked) {
            checkbox.style.boxShadow = `inset 0 0 0 6px ${options.accentColor || '#000'}`;
          } else {
            checkbox.style.boxShadow = 'none';
          }
    
          console.log(`${id} is now ${checkbox.checked ? 'checked' : 'unchecked'}`);
    
          // If this checkbox is checked, uncheck the other checkbox
          if (checkbox.checked && otherCheckboxId) {
            const otherCheckbox = document.getElementById(otherCheckboxId);
            if (otherCheckbox) {
              otherCheckbox.checked = false; // Uncheck the other one
              otherCheckbox.style.boxShadow = 'none'; // Remove shadow from the other
            }
          }
        });
      }
    }
    
    // Apply to both checkboxes, passing the other checkbox id as a parameter
    makeCheckboxCircle('checkbox-lb-in', {
      size: '28px',
      border: `3px solid ${Prime1}`,
      backgroundColor: `${Base}`,
      accentColor: `${Prime1}`
    }, 'checkbox-kg-cm'); // If 'checkbox-lb-in' is clicked, uncheck 'checkbox-kg-cm'

    makeCheckboxCircle('checkbox-kg-cm', {
      size: '28px',
      border: `3px solid ${Prime1}`,
      backgroundColor: `${Base}`,
      accentColor: `${Prime1}`
    }, 'checkbox-lb-in'); // If 'checkbox-kg-cm' is clicked, uncheck 'checkbox-lb-in'
        
   





    
    BgPanelColor()
    setTextColor()
    SectionBgcolor("CB", Prime1, Prime4)
    SectionBgcolor("TS", Prime1, Prime4)
    SectionBgcolor("CBM", Prime1, Prime4)
    


  }
  function RenderProfilePanel(){
    function ImgBorder(){
      const elements = document.getElementById("User-Img");
      elements.style.border = `10px solid ${Base}`;
    }
    function RenderfullName(urlId, addFname, addlastname, addSlastname){
      const dateBElement = document.getElementById(urlId);
      if (dateBElement) {
        dateBElement.textContent =  addFname +" "+addlastname+" "+addSlastname;
      } else {
        console.warn(`Element with ID "${urlId}" not found.`);
      }
    }
    function Rendertext(urlId, addText) {
      const dateBElement = document.getElementById(urlId);
      if (dateBElement) {
        dateBElement.textContent = addText;
      } else {
        console.warn(`Element with ID "${urlId}" not found.`);
      }
    }

    ImgBorder()
    // Call the function with parameters
    RenderfullName("User-Name", Users.nombre, Users.apellidoPaterno, Users.apellidoMaterno)
    Rendertext("R-gender", Users.genero);
    Rendertext("R-Age", Users.age);
    Rendertext("R-Weight", Users.lastEvaluation.peso);
    Rendertext("R-Hight", Users.lastEvaluation.altura);
    Rendertext("R-Email", Users.email);
    Rendertext("R-Plan", Users.Pla);
    
  }
  async function SetMondayToggleColors() {
    try {
      const userId = transferreduserInfo;
      if (!userId) {
        console.error("User ID not found.");
        return;
      }
  
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      const userDoc = docSnap.exists() ? docSnap.data() : null;
  
      const YMBtn = document.getElementById("yes-monday-btn");
      const NMBtn = document.getElementById("no-monday-btn");
      const toggleIndicator = document.querySelector(".toggle-indicator");
      const toggleBtn = document.querySelector(".toggle-btn");
  
      if (!YMBtn || !NMBtn || !toggleIndicator || !toggleBtn) {
        console.error("Toggle elements not found in the DOM.");
        return;
      }
  
      // Color settings (all handled via JS)
      const colors = {
        background: Prime3,
        indicator: Base,
        activeText: Prime2,
        inactiveText: Base,
        activeBg: Base,
        inactiveBg: "transparent",
      };
  
      let active = userDoc?.mondayAlert ?? true;
  
      //console.log(active)

      function applyStyles() {
        toggleBtn.style.backgroundColor = colors.background;
        toggleIndicator.style.backgroundColor = colors.indicator;
        toggleIndicator.style.transform = active ? "translateX(0%)" : "translateX(100%)";
  
        YMBtn.style.color = active ? colors.activeText : colors.inactiveText;
        YMBtn.style.backgroundColor = active ? colors.activeBg : colors.inactiveBg;
  
        NMBtn.style.color = !active ? colors.activeText : colors.inactiveText;
        NMBtn.style.backgroundColor = !active ? colors.activeBg : colors.inactiveBg;
      }
  
      async function saveMondayAlert(value) {
        try {
          await updateDoc(doc(db, "users", userId), {
            mondayAlert: value,
          });
          console.log("Monday Alert saved:", value);
        } catch (error) {
          console.error("Error saving Monday Alert:", error);
        }
      }
  
      function updateMondayAlert(value) {
        active = value;
        applyStyles();
        saveMondayAlert(active);
        // Optional: updateHeight(); ← only if you’ve defined this
      }
  
      YMBtn.addEventListener("click", () => updateMondayAlert(true));
      NMBtn.addEventListener("click", () => updateMondayAlert(false));
  
      applyStyles(); // Initial UI render
  
    } catch (error) {
      console.error("Error in SetMondayToggleColors:", error);
    }
  }
  async function SetTuesdayToggleColors() {
    try {
      const userId = transferreduserInfo;
      if (!userId) {
        console.error("User ID not found.");
        return;
      }
  
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      const userDoc = docSnap.exists() ? docSnap.data() : null;
  
      const YMBtn = document.getElementById("yes-Tuesday-btn");
      const NMBtn = document.getElementById("no-Tuesday-btn");
      const toggleIndicator = document.getElementById("toggle-indicator-Tuesday");
      const toggleBtn = document.getElementById("toggle-btn-Tuesday");
  
      if (!YMBtn || !NMBtn || !toggleIndicator || !toggleBtn) {
        console.error("Toggle elements not found in the DOM.");
        return;
      }
  
      // Color settings (all handled via JS)
      const colors = {
        background: Prime3,
        indicator: Base,
        activeText: Prime2,
        inactiveText: Base,
        activeBg: Base,
        inactiveBg: "transparent",
      };
  
      let active = userDoc?.tuesdayAlert ?? true;
  
    //console.log(active)

      function applyStyles() {
        toggleBtn.style.backgroundColor = colors.background;
        toggleIndicator.style.backgroundColor = colors.indicator;
        toggleIndicator.style.transform = active ? "translateX(0%)" : "translateX(100%)";
  
        YMBtn.style.color = active ? colors.activeText : colors.inactiveText;
        YMBtn.style.backgroundColor = active ? colors.activeBg : colors.inactiveBg;
  
        NMBtn.style.color = !active ? colors.activeText : colors.inactiveText;
        NMBtn.style.backgroundColor = !active ? colors.activeBg : colors.inactiveBg;
      }
  
      async function saveTuesdayAlert(value) {
        try {
          await updateDoc(doc(db, "users", userId), {
            tuesdayAlert: value,
          });
          console.log("tuesday Alert saved:", value);
        } catch (error) {
          console.error("Error saving tuesday Alert:", error);
        }
      }
  
      function updateTuesdayAlert(value) {
        active = value;
        applyStyles();
        saveTuesdayAlert(active);
        // Optional: updateHeight(); ← only if you’ve defined this
      }
  
      YMBtn.addEventListener("click", () => updateTuesdayAlert(true));
      NMBtn.addEventListener("click", () => updateTuesdayAlert(false));
  
      applyStyles(); // Initial UI render
  
    } catch (error) {
      console.error("Error in SetMondayToggleColors:", error);
    }
  }
  async function SetWensdayToggleColors() {
    try {
      const userId = transferreduserInfo;
      if (!userId) {
        console.error("User ID not found.");
        return;
      }
  
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      const userDoc = docSnap.exists() ? docSnap.data() : null;
  
      const YMBtn = document.getElementById("yes-Wensday-btn");
      const NMBtn = document.getElementById("no-Wensday-btn");
      const toggleIndicator = document.getElementById("toggle-indicator-Wensday");
      const toggleBtn = document.getElementById("toggle-btn-Wensday");
  
      if (!YMBtn || !NMBtn || !toggleIndicator || !toggleBtn) {
        console.error("Toggle elements not found in the DOM.");
        return;
      }
  
      // Color settings (all handled via JS)
      const colors = {
        background: Prime3,
        indicator: Base,
        activeText: Prime2,
        inactiveText: Base,
        activeBg: Base,
        inactiveBg: "transparent",
      };
  
      let active = userDoc?.WensdayAlert ?? true;
  
    //console.log(active)

      function applyStyles() {
        toggleBtn.style.backgroundColor = colors.background;
        toggleIndicator.style.backgroundColor = colors.indicator;
        toggleIndicator.style.transform = active ? "translateX(0%)" : "translateX(100%)";
  
        YMBtn.style.color = active ? colors.activeText : colors.inactiveText;
        YMBtn.style.backgroundColor = active ? colors.activeBg : colors.inactiveBg;
  
        NMBtn.style.color = !active ? colors.activeText : colors.inactiveText;
        NMBtn.style.backgroundColor = !active ? colors.activeBg : colors.inactiveBg;
      }
  
      async function saveWensdayAlert(value) {
        try {
          await updateDoc(doc(db, "users", userId), {
            WensdayAlert: value,
          });
          console.log("Wensday Alert saved:", value);
        } catch (error) {
          console.error("Error saving Wensday Alert:", error);
        }
      }
  
      function updateWensdayAlert(value) {
        active = value;
        applyStyles();
        saveWensdayAlert(active);
        // Optional: updateHeight(); ← only if you’ve defined this
      }
  
      YMBtn.addEventListener("click", () => updateWensdayAlert(true));
      NMBtn.addEventListener("click", () => updateWensdayAlert(false));
  
      applyStyles(); // Initial UI render
  
    } catch (error) {
      console.error("Error in SetWensdayToggleColors:", error);
    }
  }
  async function SetThursdayToggleColors() {
    try {
      const userId = transferreduserInfo;
      if (!userId) {
        console.error("User ID not found.");
        return;
      }
  
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      const userDoc = docSnap.exists() ? docSnap.data() : null;
  
      const YMBtn = document.getElementById("yes-Thursday-btn");
      const NMBtn = document.getElementById("no-Thursday-btn");
      const toggleIndicator = document.getElementById("toggle-indicator-Thursday");
      const toggleBtn = document.getElementById("toggle-btn-Thursday");
  
      if (!YMBtn || !NMBtn || !toggleIndicator || !toggleBtn) {
        console.error("Toggle elements not found in the DOM.");
        return;
      }
  
      // Color settings (all handled via JS)
      const colors = {
        background: Prime3,
        indicator: Base,
        activeText: Prime2,
        inactiveText: Base,
        activeBg: Base,
        inactiveBg: "transparent",
      };
  
      let active = userDoc?.ThursdayAlert ?? true;
  
    //console.log(active)

      function applyStyles() {
        toggleBtn.style.backgroundColor = colors.background;
        toggleIndicator.style.backgroundColor = colors.indicator;
        toggleIndicator.style.transform = active ? "translateX(0%)" : "translateX(100%)";
  
        YMBtn.style.color = active ? colors.activeText : colors.inactiveText;
        YMBtn.style.backgroundColor = active ? colors.activeBg : colors.inactiveBg;
  
        NMBtn.style.color = !active ? colors.activeText : colors.inactiveText;
        NMBtn.style.backgroundColor = !active ? colors.activeBg : colors.inactiveBg;
      }
  
      async function saveThursdayAlert(value) {
        try {
          await updateDoc(doc(db, "users", userId), {
            ThursdayAlert: value,
          });
          console.log("Thursday Alert saved:", value);
        } catch (error) {
          console.error("Error saving Thursday Alert:", error);
        }
      }
  
      function updateThursdayAlert(value) {
        active = value;
        applyStyles();
        saveThursdayAlert(active);
        // Optional: updateHeight(); ← only if you’ve defined this
      }
  
      YMBtn.addEventListener("click", () => updateThursdayAlert(true));
      NMBtn.addEventListener("click", () => updateThursdayAlert(false));
  
      applyStyles(); // Initial UI render
  
    } catch (error) {
      console.error("Error in SetThursdayToggleColors:", error);
    }
  }
  async function SetFridayToggleColors() {
    try {
      const userId = transferreduserInfo;
      if (!userId) {
        console.error("User ID not found.");
        return;
      }
  
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      const userDoc = docSnap.exists() ? docSnap.data() : null;
  
      const YMBtn = document.getElementById("yes-Friday-btn");
      const NMBtn = document.getElementById("no-Friday-btn");
      const toggleIndicator = document.getElementById("toggle-indicator-Friday");
      const toggleBtn = document.getElementById("toggle-btn-Friday");
  
      if (!YMBtn || !NMBtn || !toggleIndicator || !toggleBtn) {
        console.error("Toggle elements not found in the DOM.");
        return;
      }
  
      // Color settings (all handled via JS)
      const colors = {
        background: Prime3,
        indicator: Base,
        activeText: Prime2,
        inactiveText: Base,
        activeBg: Base,
        inactiveBg: "transparent",
      };
  
      let active = userDoc?.FridayAlert ?? true;
  
    //console.log(active)

      function applyStyles() {
        toggleBtn.style.backgroundColor = colors.background;
        toggleIndicator.style.backgroundColor = colors.indicator;
        toggleIndicator.style.transform = active ? "translateX(0%)" : "translateX(100%)";
  
        YMBtn.style.color = active ? colors.activeText : colors.inactiveText;
        YMBtn.style.backgroundColor = active ? colors.activeBg : colors.inactiveBg;
  
        NMBtn.style.color = !active ? colors.activeText : colors.inactiveText;
        NMBtn.style.backgroundColor = !active ? colors.activeBg : colors.inactiveBg;
      }
  
      async function saveFridayAlert(value) {
        try {
          await updateDoc(doc(db, "users", userId), {
            FridayAlert: value,
          });
          console.log("Friday Alert saved:", value);
        } catch (error) {
          console.error("Error saving Friday Alert:", error);
        }
      }
  
      function updateFridayAlert(value) {
        active = value;
        applyStyles();
        saveFridayAlert(active);
        // Optional: updateHeight(); ← only if you’ve defined this
      }
  
      YMBtn.addEventListener("click", () => updateFridayAlert(true));
      NMBtn.addEventListener("click", () => updateFridayAlert(false));
  
      applyStyles(); // Initial UI render
  
    } catch (error) {
      console.error("Error in SetFridayToggleColors:", error);
    }
  }
  async function SetSaturdayToggleColors() {
    try {
      const userId = transferreduserInfo;
      if (!userId) {
        console.error("User ID not found.");
        return;
      }
  
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      const userDoc = docSnap.exists() ? docSnap.data() : null;
  
      const YMBtn = document.getElementById("yes-Saturday-btn");
      const NMBtn = document.getElementById("no-Saturday-btn");
      const toggleIndicator = document.getElementById("toggle-indicator-Saturday");
      const toggleBtn = document.getElementById("toggle-btn-Saturday");
  
      if (!YMBtn || !NMBtn || !toggleIndicator || !toggleBtn) {
        console.error("Toggle elements not found in the DOM.");
        return;
      }
  
      // Color settings (all handled via JS)
      const colors = {
        background: Prime3,
        indicator: Base,
        activeText: Prime2,
        inactiveText: Base,
        activeBg: Base,
        inactiveBg: "transparent",
      };
  
      let active = userDoc?.SaturdayAlert ?? true;
  
    //console.log(active)

      function applyStyles() {
        toggleBtn.style.backgroundColor = colors.background;
        toggleIndicator.style.backgroundColor = colors.indicator;
        toggleIndicator.style.transform = active ? "translateX(0%)" : "translateX(100%)";
  
        YMBtn.style.color = active ? colors.activeText : colors.inactiveText;
        YMBtn.style.backgroundColor = active ? colors.activeBg : colors.inactiveBg;
  
        NMBtn.style.color = !active ? colors.activeText : colors.inactiveText;
        NMBtn.style.backgroundColor = !active ? colors.activeBg : colors.inactiveBg;
      }
  
      async function saveSaturdayAlert(value) {
        try {
          await updateDoc(doc(db, "users", userId), {
            SaturdayAlert: value,
          });
          console.log("Saturday Alert saved:", value);
        } catch (error) {
          console.error("Error saving Saturday Alert:", error);
        }
      }
  
      function updateSaturdayAlert(value) {
        active = value;
        applyStyles();
        saveSaturdayAlert(active);
        // Optional: updateHeight(); ← only if you’ve defined this
      }
  
      YMBtn.addEventListener("click", () => updateSaturdayAlert(true));
      NMBtn.addEventListener("click", () => updateSaturdayAlert(false));
  
      applyStyles(); // Initial UI render
  
    } catch (error) {
      console.error("Error in SetSaturdayToggleColors:", error);
    }
  }
  async function SetSundayToggleColors() {
    try {
      const userId = transferreduserInfo;
      if (!userId) {
        console.error("User ID not found.");
        return;
      }
  
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      const userDoc = docSnap.exists() ? docSnap.data() : null;
  
      const YMBtn = document.getElementById("yes-Sunday-btn");
      const NMBtn = document.getElementById("no-Sunday-btn");
      const toggleIndicator = document.getElementById("toggle-indicator-Sunday");
      const toggleBtn = document.getElementById("toggle-btn-Sunday");
  
      if (!YMBtn || !NMBtn || !toggleIndicator || !toggleBtn) {
        console.error("Toggle elements not found in the DOM.");
        return;
      }
  
      // Color settings (all handled via JS)
      const colors = {
        background: Prime3,
        indicator: Base,
        activeText: Prime2,
        inactiveText: Base,
        activeBg: Base,
        inactiveBg: "transparent",
      };
  
      let active = userDoc?.SundayAlert ?? true;
  
    //console.log(active)

      function applyStyles() {
        toggleBtn.style.backgroundColor = colors.background;
        toggleIndicator.style.backgroundColor = colors.indicator;
        toggleIndicator.style.transform = active ? "translateX(0%)" : "translateX(100%)";
  
        YMBtn.style.color = active ? colors.activeText : colors.inactiveText;
        YMBtn.style.backgroundColor = active ? colors.activeBg : colors.inactiveBg;
  
        NMBtn.style.color = !active ? colors.activeText : colors.inactiveText;
        NMBtn.style.backgroundColor = !active ? colors.activeBg : colors.inactiveBg;
      }
  
      async function saveSundayAlert(value) {
        try {
          await updateDoc(doc(db, "users", userId), {
            SundayAlert: value,
          });
          console.log("Sunday Alert saved:", value);
        } catch (error) {
          console.error("Error saving Sunday Alert:", error);
        }
      }
  
      function updateSundayAlert(value) {
        active = value;
        applyStyles();
        saveSundayAlert(active);
        // Optional: updateHeight(); ← only if you’ve defined this
      }
  
      YMBtn.addEventListener("click", () => updateSundayAlert(true));
      NMBtn.addEventListener("click", () => updateSundayAlert(false));
  
      applyStyles(); // Initial UI render
  
    } catch (error) {
      console.error("Error in SetSundayToggleColors:", error);
    }
  }
  async function SetCheckboxRules() {
  const userId = transferreduserInfo;
  if (!userId) {
    console.error("User ID not found.");
    return;
  }

  const Content = await checkDocumentExists("users", userId);
  let ActiveSound = Content?.selectedSound || 'Beep-Alert';

  const soundMap = {
    'Beep-Alert': Sounds.BeepBee,
    'Bell-Alert': Sounds.ClassicBell,
    'Pop-Alert': Sounds.ExplosionPop,
    'Click-Alert': Sounds.ImpactClick,
    'Pager-Beep-Alert': Sounds.PagerBeep,
    'Siren-Alert': Sounds.SirenBlip,
    'Buzz-Alert': Sounds.WarningBuzz,
    'Chirp-Alert': Sounds.WhistleChirp
  };

  const checkboxes = document.querySelectorAll('.checkbox-options');

  async function saveSelectedSound(value) {
    try {
      await updateDoc(doc(db, "users", userId), {
        selectedSound: value,
      });
      console.log("Selected sound saved to Firestore:", value);
    } catch (error) {
      console.error("Error saving selected sound:", error);
    }
  }

  checkboxes.forEach(cb => {
    cb.style.appearance = 'none';
    cb.style.width = '24px';
    cb.style.height = '24px';
    cb.style.border = `2px solid ${Prime4}`;
    cb.style.borderRadius = '8px';
    cb.style.backgroundColor = Prime2;
    cb.style.transition = 'all 0.3s ease';
  });

  function styleCheckbox(checkbox, isSelected) {
    if (isSelected) {
      checkbox.style.backgroundColor = Base;
      checkbox.style.borderColor = Prime5;
      checkbox.style.borderRadius = '50%';
    } else {
      checkbox.style.backgroundColor = Prime2;
      checkbox.style.borderColor = Base;
      checkbox.style.borderRadius = '8px';
      checkbox.style.boxShadow = 'none';
    }
  }

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', async () => {
      if (checkbox.checked) {
        checkboxes.forEach(cb => {
          if (cb !== checkbox) {
            cb.checked = false;
            styleCheckbox(cb, false);
          }
        });

        styleCheckbox(checkbox, true);

        const soundSrc = soundMap[checkbox.id];
        if (soundSrc) {
          try {
            const audio = new Audio(soundSrc);
            await audio.play();
          } catch (e) {
            console.warn("Playback prevented by browser:", e);
          }
        }

        console.log(`Active alert: ${checkbox.id}`);
        await saveSelectedSound(checkbox.id);
      } else {
        styleCheckbox(checkbox, false);
      }
    });
  });

  // Set saved selection visually only (no autoplay)
  const activeCheckbox = document.getElementById(ActiveSound);
  if (activeCheckbox) {
    activeCheckbox.checked = true;
    styleCheckbox(activeCheckbox, true);
  }

  // Allow one-time preview on first click of the Sound-panel only
  const soundPanel = document.getElementById('Sound-panel');
  if (soundPanel) {
    soundPanel.addEventListener('click', () => {
      const previewSound = soundMap[ActiveSound];
      if (previewSound) {
        const audio = new Audio(previewSound);
        audio.play().catch(err => {
          console.warn("Preview failed:", err);
        });
      }
    }, { once: true });
  }
  }
  async function SetCheckboxModelRules() {
  const userId = transferreduserInfo;
  if (!userId) {
    console.error("User ID not found.");
    return;
  }

  const ImgContent = await checkDocumentExists("RevolApp", "Content");
  const Content = await checkDocumentExists("users", userId);
  let ActiveImage = Content?.selectedModel || 'Male-Model';

  const imageMap = {
    'Male-Model': ImgContent?.Images?.Models?.Male,
    'Female-Model': ImgContent?.Images?.Models?.Female,
    'Male-Plus-Model': ImgContent?.Images?.Models?.Male,
    'Female-Plus-Model': ImgContent?.Images?.Models?.Female,
  };

  const checkboxes = document.querySelectorAll('.model-checkbox-options');

  const previewImage = document.getElementById('model-preview-image');
  if (!previewImage) {
    console.error("Preview image element with ID 'model-preview-image' not found.");
    return;
  }

  function setbackgroundcolors() {
    const previewImage = document.getElementById('Background-color-block');
    if (previewImage) {
      previewImage.style.backgroundColor = Base;
      previewImage.style.height = '33rem';
      previewImage.style.aspectRatio = '1';
      previewImage.style.clipPath = 'polygon(50% 0%, 89% 49%, 50% 100%, 10% 51%)';
    } else {
      console.error("Element with ID 'Background-color-block' not found.");
    }
  }

  setbackgroundcolors()
  
  async function saveSelectedModel(value) {
    try {
      await updateDoc(doc(db, "users", userId), {
        selectedModel: value,
      });
      console.log("Selected Model saved to Firestore:", value);
    } catch (error) {
      console.error("Error saving selected Model:", error);
    }
  }

  function styleCheckbox(checkbox, isSelected) {
    if (isSelected) {
      checkbox.style.backgroundColor = Base;
      checkbox.style.borderColor = Prime5;
      checkbox.style.borderRadius = '50%';
    } else {
      checkbox.style.backgroundColor = Prime2;
      checkbox.style.borderColor = Base;
      checkbox.style.borderRadius = '8px';
      checkbox.style.boxShadow = 'none';
    }
  }

  checkboxes.forEach(cb => {
    cb.style.appearance = 'none';
    cb.style.width = '24px';
    cb.style.height = '24px';
    cb.style.border = `2px solid ${Prime4}`;
    cb.style.borderRadius = '8px';
    cb.style.backgroundColor = Prime2;
    cb.style.transition = 'all 0.3s ease';

    cb.addEventListener('change', async () => {
      if (cb.checked) {
        checkboxes.forEach(otherCb => {
          if (otherCb !== cb) {
            otherCb.checked = false;
            styleCheckbox(otherCb, false);
          }
        });

        styleCheckbox(cb, true);

        const imageSrc = imageMap[cb.id];
        if (imageSrc) {
          previewImage.src = imageSrc;
        }

        console.log(`Active model: ${cb.id}`);
        await saveSelectedModel(cb.id);
      } else {
        styleCheckbox(cb, false);
      }
    });
  });

  // Set saved selection visually and show image
  const activeCheckbox = document.getElementById(ActiveImage);
  if (activeCheckbox) {
    activeCheckbox.checked = true;
    styleCheckbox(activeCheckbox, true);
    const imageSrc = imageMap[ActiveImage];
    if (imageSrc) {
      previewImage.src = imageSrc;
    }
    // console.log(`Active model on load: ${ActiveImage}`);
  }
  }
  async function SetMembershipContent() {
    const userId = transferreduserInfo;
    
    if (!userId) {
      console.error("User ID not found.");
      return;
    }
  
    try {
      const Tiers = await checkDocumentExists("RevolApp", "Tiers");
      const userInfo = await checkDocumentExists("users", userId);
  
      if (!Tiers) {
        console.warn("Tiers document not found.");
      }
  
      if (!userInfo) {
        console.warn("User info not found.");
      }

      const exchangeRates = {
        "USD": 1,
        "CAD": 1.4215,
        "MXN": 21.4363,
        "ARS": 1060.0000,
        "BRL": 5.7457,
        "CLP": 943.9600,
        "COP": 4115.1200,
        "PEN": 3.7457
      }

      const amount = {
        Tier1:  13,
        Tier2:  22,
        Tier3:  40 
      };
     
      // Do something with Tiers and userInfo here
      //console.log("Tiers:", Tiers);
      //console.log("User Info:", userInfo);

      function CheckCurrency(Tier) {
        const Coin = userInfo.selectedcoin || "USD"; // Default to USD if not set
      
        if (Tier === "Tier0") {
          return "Gratis";
        }
      
        const usdAmount = amount[Tier];
      
        if (!usdAmount || !exchangeRates[Coin]) {
          console.error("Invalid tier or currency");
          return null;
        }
      
        const convertedAmount = usdAmount * exchangeRates[Coin];
        const formattedAmount = convertedAmount.toFixed(2);
      
        // Custom symbol/formatting logic
        const currencyFormats = {
          USD: (val) => `USD ${val}`,
          CAD: (val) => `CAD ${val}`,
          MXN: (val) => `$${val} MXN`,
          ARS: (val) => `$${val} ARS`,
          BRL: (val) => `R$${val}`,
          CLP: (val) => `$${val} CLP`,
          COP: (val) => `$${val} COP`,
          PEN: (val) => `S/${val}`
        };
      
        const formatter = currencyFormats[Coin];
        return formatter ? formatter(formattedAmount) : `${formattedAmount} ${Coin}`;
      }
      

      function SetBorders(urlId){
        const element = document.getElementById(urlId);
        element.style.border= `5px solid ${Prime5}`
      }
      function renderIconImg(imgSrc, imgAlt, urlId){
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
      function BuyBtn(UrlId, userTier, displayedTier) {
        const element = document.getElementById(UrlId);
      
        if (userTier === displayedTier) {
          element.innerHTML = 'Plan actual';
        } else if (displayedTier > userTier) {
          element.innerHTML = 'Actualizar suscripción'; // Upgrade
        } else {
          element.innerHTML = 'Reducir plan'; // Downgrade
        }
      }

      function extractNumber(str) {
        return parseInt(str.replace(/\D/g, ''), 10);
      }
      

      function activeTierImg() {
        
        const tier =userInfo.Membership
        const tierNumber = extractNumber(tier);
        console.log( tier)
        const userTier = tierNumber 
        const crown = Buissnes.App.Settings.Membership;
      
        for (let i = 0; i <= 3; i++) {
          const tierId = `Tier${i}`;
          const btnId = `Btn-${i}`;
          const actionBtnId = `Action-Btn-${i}`;
          const iconId = `ActiveTier-${i}`;
      
          if (`Tier${userTier}` === tierId) {
            SetBorders(btnId);
            renderIconImg(crown, "Crown", iconId);
          }
      
          BuyBtn(actionBtnId, userTier, i);
        }

      }



      
      function renderContent(titleId, price, pointsId, titleContent, priceContent, pointsArray) {
        const titleElement = document.getElementById(titleId);
        const priceElement = document.getElementById(price);
        const pointsElement = document.getElementById(pointsId);
       
      
        // Set the content of the title and level
        titleElement.innerHTML = titleContent;
        priceElement.innerHTML = priceContent;
      
      
        // Create a <ul> and populate it with <li> elements
        const ul = document.createElement('ul');
        pointsArray.forEach(point => {
          const li = document.createElement('li');
          li.textContent = point;
          ul.appendChild(li);
        });
      
        // Clear previous content and append the new list
        pointsElement.innerHTML = '';
        pointsElement.appendChild(ul);
      }

      function checkCurrentTier() {
        const CurrentTier = userInfo.Membership;
        const {Tier0,Tier1,Tier2,Tier3} = Tiers
        
        const tierBtn = document.getElementById("tier-btn-0");
        tierBtn.style.display = "none";


        console.log(CheckCurrency("Tier0"))

    
        if (CurrentTier === "Tier0") {
            tierBtn.style.display = "block";
            console.log("User is on Free Tier");
            renderContent("Membership-tittle-0", "price-0", "points-0",  Tier0.Tittle,  CheckCurrency("Tier0"), Tier0.Points)
            renderContent("Membership-tittle-1", "price-1", "points-1",  Tier1.Tittle, CheckCurrency("Tier1"), Tier1.Points)
            renderContent("Membership-tittle-2", "price-2", "points-2",  Tier2.Tittle, CheckCurrency("Tier2"), Tier2.Points)
            renderContent("Membership-tittle-3", "price-3", "points-3",  Tier3.Tittle, CheckCurrency("Tier3"), Tier3.Points)
        } else if (CurrentTier === "Tier1") {
            console.log("User is on Basic Tier");
            renderContent("Membership-tittle-1", "price-1", "points-1",  Tier1.Tittle, CheckCurrency("Tier1"), Tier1.Points)
            renderContent("Membership-tittle-2", "price-2", "points-2",  Tier2.Tittle, CheckCurrency("Tier2"), Tier2.Points)
            renderContent("Membership-tittle-3", "price-3", "points-3",  Tier3.Tittle, CheckCurrency("Tier3"), Tier3.Points)
        } else if (CurrentTier === "Tier2") {

            // Handle Tier2 logic
            console.log("User is on Medium Tier");
            renderContent("Membership-tittle-1", "price-1", "points-1",  Tier1.Tittle, CheckCurrency("Tier1"), Tier1.Points)
            renderContent("Membership-tittle-2", "price-2", "points-2",  Tier2.Tittle, CheckCurrency("Tier2"), Tier2.Points)
            renderContent("Membership-tittle-3", "price-3", "points-3",  Tier3.Tittle, CheckCurrency("Tier3"), Tier3.Points)
        } else {
            // Handle Premium or unknown tier
            console.log("User is on Premium or an unknown tier");
            renderContent("Membership-tittle-1", "price-1", "points-1",  Tier1.Tittle, CheckCurrency("Tier1"), Tier1.Points)
            renderContent("Membership-tittle-2", "price-2", "points-2",  Tier2.Tittle, CheckCurrency("Tier2"), Tier2.Points)
            renderContent("Membership-tittle-3", "price-3", "points-3",  Tier3.Tittle, CheckCurrency("Tier3"), Tier3.Points)
        }
      }


      checkCurrentTier()
      activeTierImg()

    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  }
  async function evntListnerBtns(){


    const tierBtn = document.getElementById("tier-btn-0");
    const tierBtn1 = document.getElementById("tier-btn-1");
    const tierBtn2 = document.getElementById("tier-btn-2");
    const tierBtn3 = document.getElementById("tier-btn-3");


    tierBtn.addEventListener('click', function() {
      const tierC = document.getElementById("visable-tier-0");
    
      if (tierC.style.display === "flex") {
        tierC.style.display = "none";
        console.log("Hidden");
      } else {
        tierC.style.display = "flex";
        console.log("Shown");
      }
    });
    
    
    tierBtn1.addEventListener('click', function() {
      const tierC = document.getElementById("visable-tier-1");
    
      if (tierC.style.display === "flex") {
        tierC.style.display = "none";
        console.log("Hidden");
      } else {
        tierC.style.display = "flex";
        console.log("Shown");
      }
    })
    
    
    
    tierBtn2.addEventListener('click', function() {
      const tierC = document.getElementById("visable-tier-2");
    
      if (tierC.style.display === "flex") {
        tierC.style.display = "none";
        console.log("Hidden");
      } else {
        tierC.style.display = "flex";
        console.log("Shown");
      }
    })
    
    
    
    tierBtn3.addEventListener('click', function() {
      const tierC = document.getElementById("visable-tier-3");
    
      if (tierC.style.display === "flex") {
        tierC.style.display = "none";
        console.log("Hidden");
      } else {
        tierC.style.display = "flex";
        console.log("Shown");
      }
    })
    
  }
  
  
  
  
  
  evntListnerBtns()
  
 
  
  



  SetCheckboxModelRules()
  SetMembershipContent()

  SetCheckboxRules();
  SetColorPanel();
  RenderProfilePanel()

 
  SetMondayToggleColors()
  SetTuesdayToggleColors()
  SetWensdayToggleColors()
  SetThursdayToggleColors()
  SetFridayToggleColors()
  SetSaturdayToggleColors()
  SetSundayToggleColors()




}
SetPanelContent()







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
    { buttonType: "homeBtns", divId: "home", imgSrcIndex: 1, redirectUrl: "index9.html" },
    { buttonType: "DateBtns", divId: "Date", imgSrcIndex: 1, redirectUrl: "index9.2.html" },
    { buttonType: "GoalBtns", divId: "goals", imgSrcIndex: 1, redirectUrl: "index9.3.html" },
    { buttonType: "StatBtns", divId: "stats", imgSrcIndex: 1, redirectUrl: "index9.4.html" },
    { buttonType: "GearBtns", divId: "gear", imgSrcIndex: 0, redirectUrl: "index9.5.html" },
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
  //console.log("Available colors:", Colors);
});

document.addEventListener('touchstart', function (event) {
  if (event.touches.length > 1) {
    event.preventDefault(); // Prevents zooming
  }
}, { passive: false });
