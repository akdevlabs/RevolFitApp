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
const Exersise = "block1";

const Tier = "Beginner"
const Block = 'Block1'
const Routine = 'Routine1'




console.log("Transferred User Info:", transferreduserInfo);
console.log("Transferred Info:", transferredInfo);
console.log(workoutLocation)



async function applyBranding() {
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
applyBranding().then((data) => {

  const { bottom, center, top } = data.BuColors.BackgroundColor;
  const { Base, Prime1, Prime2, Prime3, Prime4, Prime5, Prime6 } = data.BuColors.Colors;

  function GetBuFont(fontFamily) {
    document.body.style.fontFamily = fontFamily;
  }
  function setGradient(color1, color2) {
    document.body.style.background = `linear-gradient(to bottom, ${color1}, ${color2})`;
  }
  
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









  GetBuFont(data.Font);
  setGradient(top, bottom); 
  setBuIcon(data.BuLogos.Simple[0],  data.BuLogos.LogoText);  
});




async function SetContent() {
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



SetContent().then((data) => {
  const { List, Meal,  Plate,  Vega } = data.AppIcons.MealPlanBtn;
  const Buissnes = data;

  function setImages(imgSrc, imgAlt, urlBtns) {
    if (!imgSrc) {
      console.error(`Missing image source for id '${urlBtns}'`);
      return;
    }
  
    const img = document.getElementById(urlBtns);
    if (img) {
      img.src = imgSrc;
      img.alt = imgAlt;
    } else {
      console.error(`Image element with id '${urlBtns}' not found.`);
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
      { buttonType: "homeBtns", divId: "home", imgSrcIndex: 0, redirectUrl: "index9.html" },
      { buttonType: "DateBtns", divId: "Date", imgSrcIndex: 1, redirectUrl: "index9.2.html" },
      { buttonType: "GoalBtns", divId: "goals", imgSrcIndex: 0, redirectUrl: "index9.3.html" },
      { buttonType: "StatBtns", divId: "stats", imgSrcIndex: 0, redirectUrl: "index9.4.html" },
      { buttonType: "GearBtns", divId: "gear", imgSrcIndex: 0, redirectUrl: "index9.5.html" },
    ];
  
    buttonsConfig.forEach((config) => createButton(config, Buttons));
  }
  setControlBar()




  // Set icons for specific IDs
  setImages(List, "List Icon", "LCicon");
  setImages(Plate, "Plate Icon", "OCicon"); 
  setImages(Meal, "Plate Icon", "Dicon");
  setImages(Vega, "Vega Icon", "Vicon");

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
getUserinfo().then((data) => {
const nombre = data.nombre; // Retrieve nested data

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


});


document.getElementById("MO").addEventListener("click", function (event) {
  event.preventDefault(); // Prevent default action if it's a link
  const hiddenDiv = document.getElementById("HMO");
  if (hiddenDiv.style.display === "none") {
    hiddenDiv.style.display = "flex"; // Show the div
  } else {
    hiddenDiv.style.display = "none"; // Hide the div
  }
  });
  








  document.addEventListener("DOMContentLoaded", function () {

    async function SetMealPlan() {
      try {
        const docRef = doc(db, "RevolApp", "MealPlans"); // Ensure db and transferredInfo are initialized
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
    
    
    // Function to render content into the h1, a elements, and the image block
    function renderContent(title, DTurl, time, DtIurl, imgSrc, imgBlock) {
      // Select the elements by their IDs
      
      const titleElement = document.getElementById(DTurl);
      const timeElement = document.getElementById(DtIurl);
      const imgElement = document.getElementById(imgBlock);
      
    
      // Set the content for each element
      titleElement.textContent = title;
      timeElement.textContent = time +" "+ 'minutos';
    
      // Set the image source
      imgElement.src = imgSrc;
    }
    // Function to render content into the h1, a elements, and the image block
    function renderSlotContent(Dtype, type, title, titleId, time, timeId, imgSrc, imgId, typeBlockId, Wtype) {
    // Select the elements by their IDs
    const typeElement = document.getElementById(Dtype);
    const titleElement = document.getElementById(titleId);
    const timeElement = document.getElementById(timeId);
    const imgElement = document.getElementById(imgId);
    const typeBlockElement = document.getElementById(typeBlockId);
    
    // Validate each element exists before setting the content
    if (typeElement) typeElement.textContent = type;
    if (titleElement) titleElement.textContent = title;
    if (timeElement) timeElement.textContent = time + " minutos";
    if (typeBlockElement) typeBlockElement.textContent = Wtype;
    if (imgElement) imgElement.src = imgSrc;
    }
    
    SetMealPlan().then((data) => {
      const {Diversidad,Vegan,Vegetariano} = data;
    
        const DBreakfast = Diversidad.Breakfast
        const DDinner    = Diversidad.Dinner
        const DLunch     = Diversidad.Lunch
        const DSnack     = Diversidad.Snack
        
        const VeBreakfast = Vegan.Breakfast
        const VeDinner    = Vegan.Dinner
        const VeLunch     = Vegan.Lunch
        const VeSnack     = Vegan.Snack
    
        const VBreakfast = Vegetariano.Breakfast
        const VDinner    = Vegetariano.Dinner
        const VLunch     = Vegetariano.Lunch
        const VSnack     = Vegetariano.Snack
    
    
        
     
    
        function renderDiversidadStartMeals(){
          const breakfast = DBreakfast.slot1
          const dinner    = DDinner.slot1
          const lunch     = DLunch.slot1
          const snack     = DSnack.slot1
    
          renderContent(breakfast.tittle, "Btittle", breakfast.time, "Btime", breakfast.img, "BImg",)
    
    
          renderContent(lunch.tittle, "Ltittle", lunch.time, "Ltime", lunch.img, "LImg" )
          renderContent(dinner.tittle, "Dtittle", dinner.time, "Dtime", dinner.img, "DImg")
          renderContent(snack.tittle, "Stittle", snack.time, "Stime", snack.img, "SImg")
        }
        function renderVegetarianoStartMeals(){
          const breakfast = VBreakfast.slot1
          const dinner    = VDinner.slot1
          const lunch     = VLunch.slot1
          const snack     = VSnack.slot1
    
          renderContent(breakfast.tittle, "VBtittle", breakfast.time, "VBtime", breakfast.img, "VBImg" )
          renderContent(lunch.tittle, "VLtittle", lunch.time, "VLtime", lunch.img, "VLImg" )
          renderContent(dinner.tittle, "VDtittle", dinner.time, "VDtime", dinner.img, "VDImg")
          renderContent(snack.tittle, "VStittle", snack.time, "VStime", snack.img, "VSImg")
        }
        function renderDBreakfastBlock(){
    
          renderSlotContent("BS1type", "Desayuno", DBreakfast.slot1.tittle, "BS1tittle", DBreakfast.slot1.time, "BS1time", DBreakfast.slot1.img, "BS1Img", "BS1WC", DBreakfast.slot1.WeightClass)
    
    
          renderSlotContent("BS2type", "Desayuno", DBreakfast.slot2.tittle, "BS2tittle", DBreakfast.slot2.time, "BS2time", DBreakfast.slot2.img, "BS2Img", "BS2WC", DBreakfast.slot2.WeightClass)
    
    
          renderSlotContent("BS3type", "Desayuno", DBreakfast.slot3.tittle, "BS3tittle", DBreakfast.slot3.time, "BS3time", DBreakfast.slot3.img, "BS3Img", "BS3WC", DBreakfast.slot3.WeightClass)
    
        }
        function renderDLunchBlock(){
    
          renderSlotContent("LS1type", "Almuerzo", DLunch.slot1.tittle, "LS1tittle", DLunch.slot1.time, "LS1time", DLunch.slot1.img, "LS1Img", "LS1WC", DLunch.slot1.WeightClass)
    
    
          renderSlotContent("LS2type", "Almuerzo", DLunch.slot2.tittle, "LS2tittle", DLunch.slot2.time, "LS2time", DLunch.slot2.img, "LS2Img", "LS2WC", DLunch.slot2.WeightClass)
    
    
          renderSlotContent("LS3type", "Almuerzo", DLunch.slot3.tittle, "LS3tittle", DLunch.slot3.time, "LS3time", DLunch.slot3.img, "LS3Img", "LS3WC", DLunch.slot3.WeightClass)
    
        }
        function renderDinnerBlock(){
    
          renderSlotContent("DS1type", "Cena", DDinner.slot1.tittle, "DS1tittle", DDinner.slot1.time, "DS1time", DDinner.slot1.img, "DS1Img" , "DS1WC", DDinner.slot1.WeightClass)
    
    
          renderSlotContent("DS2type", "Cena", DDinner.slot2.tittle, "DS2tittle", DDinner.slot2.time, "DS2time", DDinner.slot2.img, "DS2Img", "DS2WC", DDinner.slot1.WeightClass)
    
    
          renderSlotContent("DS3type", "Cena", DDinner.slot3.tittle, "DS3tittle", DDinner.slot3.time, "DS3time", DDinner.slot3.img, "DS3Img", "DS3WC", DDinner.slot1.WeightClass)
    
    
        }
        function renderDSnackBlock(){
    
          renderSlotContent("SS1type", "Snack", DSnack.slot1.tittle, "SS1tittle", DSnack.slot1.time, "SS1time", DSnack.slot1.img, "SS1Img", "SS1WC", DDinner.slot1.WeightClass)
    
          renderSlotContent("SS2type", "Snack", DSnack.slot2.tittle, "SS2tittle", DSnack.slot2.time, "SS2time", DSnack.slot2.img, "SS2Img", "SS2WC", DSnack.slot1.WeightClass)
    
          renderSlotContent("SS3type", "Snack", DSnack.slot3.tittle, "SS3tittle", DSnack.slot3.time, "SS3time", DSnack.slot3.img, "SS3Img", "SS3WC", DSnack.slot1.WeightClass)
    
        }
    
    
    
        function renderVBreakfastBlock(){
    
          renderSlotContent("VBS1type", "Desayuno", VBreakfast.slot1.tittle, "VBS1tittle", VBreakfast.slot1.time, "VBS1time", VBreakfast.slot1.img, "VBS1Img" , "VBS1WC", VBreakfast.slot1.WeightClass)
    
          renderSlotContent("VBS2type", "Desayuno", VBreakfast.slot2.tittle, "VBS2tittle", VBreakfast.slot2.time, "VBS2time", VBreakfast.slot2.img, "VBS2Img", "VBS2WC", VBreakfast.slot1.WeightClass)
    
          renderSlotContent("VBS3type", "Desayuno", VBreakfast.slot3.tittle, "VBS3tittle", VBreakfast.slot3.time, "VBS3time", VBreakfast.slot3.img, "VBS3Img", "VBS3WC", VBreakfast.slot1.WeightClass)
    
        }
        function renderVLunchBlock(){
    
          renderSlotContent("VLS1type", "Almuerzo", VLunch.slot1.tittle, "VLS1tittle", VLunch.slot1.time, "VLS1time", VLunch.slot1.img, "VLS1Img" )
          renderSlotContent("VLS2type", "Almuerzo", VLunch.slot2.tittle, "VLS2tittle", VLunch.slot2.time, "VLS2time", VLunch.slot2.img, "VLS2Img")
          renderSlotContent("VLS3type", "Almuerzo", VLunch.slot3.tittle, "VLS3tittle", VLunch.slot3.time, "VLS3time", VLunch.slot3.img, "VLS3Img")
    
        }
        function renderVDinnerBlock(){
    
    
          renderSlotContent("VDS1type", "Cena", VDinner.slot1.tittle, "VDS1tittle", VDinner.slot1.time, "VDS1time", VDinner.slot1.img, "VDS1Img" )
          renderSlotContent("VDS2type", "Cena", VDinner.slot2.tittle, "VDS2tittle", VDinner.slot2.time, "VDS2time", VDinner.slot2.img, "VDS2Img")
          renderSlotContent("VDS3type", "Cena",VDinner.slot3.tittle, "VDS3tittle", VDinner.slot3.time, "VDS3time", VDinner.slot3.img, "VDS3Img")
    
        }
        function renderVSnackBlock(){
    
          renderSlotContent("VSS1type", "Snack", VSnack.slot1.tittle, "VSS1tittle", VSnack.slot1.time, "VSS1time", VSnack.slot1.img, "VSS1Img" )
          renderSlotContent("VSS2type", "Snack", VSnack.slot2.tittle, "VSS2tittle", VSnack.slot2.time, "VSS2time", VSnack.slot2.img, "VSS2Img")
          renderSlotContent("VSS3type", "Snack", VSnack.slot3.tittle, "VSS3tittle", VSnack.slot3.time, "VSS3time", VSnack.slot3.img, "VSS3Img")
    
        }
    
    
    
    
    
    
    
    
    
        renderDiversidadStartMeals()
        renderVegetarianoStartMeals()
        renderDBreakfastBlock()
        renderDLunchBlock()
        renderDinnerBlock()
        renderDSnackBlock()
    
        renderVBreakfastBlock()
        renderVLunchBlock()
        renderVDinnerBlock()
        renderVSnackBlock()
    });
    const DMealPlan = document.getElementById("DMealPlanDishes")
    const VMealPlan = document.getElementById("Vegetarian")
    const Slot1 = document.getElementById("DBSlotContent")
    const Slot2 = document.getElementById("DLSlotContent")
    const Slot3 = document.getElementById("DDSlotContent")
    const Slot4 = document.getElementById("DSSlotContent")
    
    const Slot5 = document.getElementById("VBSlotContent")
    const Slot6 = document.getElementById("VLSlotContent")
    const Slot7 = document.getElementById("VDSlotContent")
    const Slot8 = document.getElementById("VSSlotContent")
    
    
    // Button event listeners
      document.getElementById("btn1").addEventListener("click", () => {
      
        DMealPlan.style.display = 'block'
        VMealPlan.style.display = 'none'
        Slot1.style.display = 'none'
        Slot2.style.display = 'none'
        Slot3.style.display = 'none'
        Slot4.style.display = 'none'
        Slot5.style.display = 'none'
        Slot6.style.display = 'none'
        Slot7.style.display = 'none'
        Slot8.style.display = 'none'
    });
    
    document.getElementById("btn2").addEventListener("click", () => {
      DMealPlan.style.display = 'none'
      VMealPlan.style.display = 'block'
      Slot1.style.display = 'none'
      Slot2.style.display = 'none'
      Slot3.style.display = 'none'
      Slot4.style.display = 'none'
      Slot5.style.display = 'none'
      Slot6.style.display = 'none'
      Slot7.style.display = 'none'
      Slot8.style.display = 'none'
    
      
    });
    
    document.getElementById("DBreakfast").addEventListener("click", () => {
    
     
      DMealPlan.style.display = 'none'
      VMealPlan.style.display = 'none'
      Slot1.style.display = 'block'
      Slot2.style.display = 'none'
      Slot3.style.display = 'none'
      Slot4.style.display = 'none'
    });
    
    document.getElementById("DLunch").addEventListener("click", () => {
    
      DMealPlan.style.display = 'none'
      VMealPlan.style.display = 'none'
      Slot1.style.display = 'none'
      Slot2.style.display = 'block'
      Slot3.style.display = 'none'
      Slot4.style.display = 'none'
    });
    
    document.getElementById("DDinner").addEventListener("click", () => {
    
      DMealPlan.style.display = 'none'
      VMealPlan.style.display = 'none'
      Slot1.style.display = 'none'
      Slot2.style.display = 'none'
      Slot3.style.display = 'block'
      Slot4.style.display = 'none'
    });
    
    document.getElementById("DSnack").addEventListener("click", () => {
    
      DMealPlan.style.display = 'none'
      VMealPlan.style.display = 'none'
      Slot1.style.display = 'none'
      Slot2.style.display = 'none'
      Slot3.style.display = 'none'
      Slot4.style.display = 'block'
    });
    
    document.getElementById("VBreakfast").addEventListener("click", () => {
    
      DMealPlan.style.display = 'none'
      VMealPlan.style.display = 'none'
      Slot1.style.display = 'none'
      Slot2.style.display = 'none'
      Slot3.style.display = 'none'
      Slot4.style.display = 'none'
    
      Slot5.style.display = 'block'
      Slot6.style.display = 'none'
      Slot7.style.display = 'none'
      Slot8.style.display = 'none'
    });
    
    document.getElementById("VLunch").addEventListener("click", () => {
    
      DMealPlan.style.display = 'none'
      VMealPlan.style.display = 'none'
      Slot1.style.display = 'none'
      Slot2.style.display = 'none'
      Slot3.style.display = 'none'
      Slot4.style.display = 'none'
    
      Slot5.style.display = 'none'
      Slot6.style.display = 'block'
      Slot7.style.display = 'none'
      Slot8.style.display = 'none'
    });
    
    document.getElementById("VDinner").addEventListener("click", () => {
    
      DMealPlan.style.display = 'none'
      VMealPlan.style.display = 'none'
      Slot1.style.display = 'none'
      Slot2.style.display = 'none'
      Slot3.style.display = 'none'
      Slot4.style.display = 'none'
    
      Slot5.style.display = 'none'
      Slot6.style.display = 'none'
      Slot7.style.display = 'block'
      Slot8.style.display = 'none'
    });
    
    document.getElementById("VSnack").addEventListener("click", () => {
    
      DMealPlan.style.display = 'none'
      VMealPlan.style.display = 'none'
      Slot1.style.display = 'none'
      Slot2.style.display = 'none'
      Slot3.style.display = 'none'
      Slot4.style.display = 'none'
    
      Slot5.style.display = 'none'
      Slot6.style.display = 'none'
      Slot7.style.display = 'none'
      Slot8.style.display = 'block'
    });
    
    
    
    
    });
    
    // Define the function to save to localStorage
    function saveToLocalStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      console.log(`Saved to localStorage: ${key}`, value);
    } catch (e) {
      console.error("Error saving to localStorage", e);
    }
    }
    
    // Generalized function to add click event listeners
    function addClickListener(buttonId, slotContent) {
    document.addEventListener("DOMContentLoaded", () => {
      const button = document.getElementById(buttonId);
      if (button) {
        button.addEventListener("click", () => {
          saveToLocalStorage('sContent', slotContent);
          console.log(`Navigating to index9.2.2.html for ${buttonId}...`);
          window.location.href = "index9.2.2.html";
        });
      } else {
        console.error(`Button with ID "${buttonId}" not found!`);
      }
    });
    }
    
    
    // Slot configurations
    const slots = [
    
    { id: "BSlot1", content: { type: "BS1type", meal: "Desayuno", title: "DBreakfast.slot1.tittle", titleKey: "BS1tittle", time: "DBreakfast.slot1.time", timeKey: "BS1time", img: "DBreakfast.slot1.img", imgKey: "BS1Img" } },
    { id: "BSlot2", content: { type: "BS2type", meal: "Desayuno", title: "DBreakfast.slot2.tittle", titleKey: "BS2tittle", time: "DBreakfast.slot2.time", timeKey: "BS2time", img: "DBreakfast.slot2.img", imgKey: "BS2Img" } },
    { id: "BSlot3", content: { type: "BS3type", meal: "Desayuno", title: "DBreakfast.slot3.tittle", titleKey: "BS3tittle", time: "DBreakfast.slot3.time", timeKey: "BS3time", img: "DBreakfast.slot3.img", imgKey: "BS3Img" } },
    
    
    { id: "LSlot1", content: { type: "LS1type", meal: "Almuerzo", title: "DLunch.slot1.tittle", titleKey: "LS1tittle", time: "DLunch.slot1.time", timeKey: "LS1time", img: "DLunch.slot1.img", imgKey: "LS1Img" } },
    { id: "LSlot2", content: { type: "LS2type", meal: "Almuerzo", title: "DLunch.slot2.tittle", titleKey: "LS2tittle", time: "DLunch.slot2.time", timeKey: "LS2time", img: "DLunch.slot2.img", imgKey: "LS2Img" } },
    { id: "LSlot3", content: { type: "LS3type", meal: "Almuerzo", title: "DLunch.slot3.tittle", titleKey: "LS3tittle", time: "DLunch.slot3.time", timeKey: "LS3time", img: "DLunch.slot3.img", imgKey: "LS3Img" } },
    
    
    { id: "DSlot1", content: { type: "DS1type", meal: "Cena", title: "DDinner.slot1.tittle", titleKey: "DS1tittle", time: "DDinner.slot1.time", timeKey: "DS1time", img: "DDinner.slot1.img", imgKey: "DS1Img" } },
    { id: "DSlot2", content: { type: "DS2type", meal: "Cena", title: "DDinner.slot2.tittle", titleKey: "DS2tittle", time: "DDinner.slot2.time", timeKey: "DS2time", img: "DDinner.slot2.img", imgKey: "DS2Img" } },
    { id: "DSlot3", content: { type: "DS3type", meal: "Cena", title: "DDinner.slot3.tittle", titleKey: "DS3tittle", time: "DDinner.slot3.time", timeKey: "DS3time", img: "DDinner.slot3.img", imgKey: "DS3Img" } },
    
    
    { id: "SSlot1", content: { type: "SS1type", meal: "Snack", title: "DSnack.slot1.tittle", titleKey: "SS1tittle", time: "DSnack.slot1.time", timeKey: "SS1time", img: "DSnack.slot1.img", imgKey: "SS1Img" } },
    { id: "SSlot2", content: { type: "SS2type", meal: "Snack", title: "DSnack.slot2.tittle", titleKey: "SS2tittle", time: "DSnack.slot2.time", timeKey: "SS2time", img: "DSnack.slot2.img", imgKey: "SS2Img" } },
    { id: "SSlot3", content: { type: "SS3type", meal: "Snack", title: "DSnack.slot3.tittle", titleKey: "SS3tittle", time: "DSnack.slot3.time", timeKey: "SS3time", img: "DSnack.slot3.img", imgKey: "SS3Img" } },
    // Add vegetarian options or others as needed
    
    
    
    { id: "VBSlot1", content: { type: "VBS1type", meal: "Desayuno", title: "VBreakfast.slot1.tittle", titleKey: "VBS1tittle", time: "VBreakfast.slot1.time", timeKey: "VBS1time", img: "VBreakfast.slot1.img", imgKey: "VBS1Img" } },
    { id: "VBSlot2", content: { type: "VBS2type", meal: "Desayuno", title: "VBreakfast.slot2.tittle", titleKey: "VBS2tittle", time: "VBreakfast.slot2.time", timeKey: "VBS2time", img: "VBreakfast.slot2.img", imgKey: "VBS2Img" } },
    { id: "VBSlot3", content: { type: "VBS3type", meal: "Desayuno", title: "VBreakfast.slot3.tittle", titleKey: "VBS3tittle", time: "VBreakfast.slot3.time", timeKey: "VBS3time", img: "VBreakfast.slot3.img", imgKey: "VBS3Img" } },
    
    
    
    { id: "VLSlot1", content: { type: "VLS1type", meal: "Almuerzo", title: "VLunch.slot1.tittle", titleKey: "VLS1tittle", time: "VLunch.slot1.time", timeKey: "VLS1time", img: "VLunch.slot1.img", imgKey: "VLS1Img" } },
    { id: "VLSlot2", content: { type: "VLS2type", meal: "Almuerzo", title: "VLunch.slot2.tittle", titleKey: "VLS2tittle", time: "VLunch.slot2.time", timeKey: "VLS2time", img: "VLunch.slot2.img", imgKey: "VLS2Img" } },
    { id: "VLSlot3", content: { type: "VLS3type", meal: "Almuerzo", title: "VLunch.slot3.tittle", titleKey: "VLS3tittle", time: "VLunch.slot3.time", timeKey: "VLS3time", img: "VLunch.slot3.img", imgKey: "VLS3Img" } },
    
    
    
    { id: "VDSlot1", content: { type: "VDS1type", meal: "Cena", title: "VDinner.slot1.tittle", titleKey: "VDS1tittle", time: "VDinner.slot1.time", timeKey: "VDS1time", img: "VDinner.slot1.img", imgKey: "VDS1Img" } },
    { id: "VDSlot2", content: { type: "VDS2type", meal: "Cena", title: "VDinner.slot2.tittle", titleKey: "VDS2tittle", time: "VDinner.slot2.time", timeKey: "VDS2time", img: "VDinner.slot2.img", imgKey: "VDS2Img" } },
    { id: "VDSlot3", content: { type: "VDS3type", meal: "Cena", title: "VDinner.slot3.tittle", titleKey: "VDS3tittle", time: "VDinner.slot3.time", timeKey: "VDS3time", img: "VDinner.slot3.img", imgKey: "VDS3Img" } },
    
    
    
    
    
    { id: "VSSlot1", content: { type: "VSS1type", meal: "Snack", title: "VSnack.slot1.tittle", titleKey: "VSS1tittle", time: "VSnack.slot1.time", timeKey: "VSS1time", img: "VSnack.slot1.img", imgKey: "VSS1Img" } },
    { id: "VSSlot2", content: { type: "VSS2type", meal: "Snack", title: "VSnack.slot2.tittle", titleKey: "VSS2tittle", time: "VSnack.slot2.time", timeKey: "VSS2time", img: "VSnack.slot2.img", imgKey: "VSS2Img" } },
    { id: "VSSlot3", content: { type: "VSS3type", meal: "Snack", title: "VSnack.slot3.tittle", titleKey: "VSS3tittle", time: "VSnack.slot3.time", timeKey: "VSS3time", img: "VSnack.slot3.img", imgKey: "VSS3Img" } },
    
    
    
    
    
    
    
    ];
    
    // Add listeners for each slot
    slots.forEach(slot => addClickListener(slot.id, slot.content));
    
    
    
    
    
    
    
    
    
    
    
    







