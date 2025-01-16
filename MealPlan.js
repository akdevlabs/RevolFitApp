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
const transferredInfo = localStorage.getItem("transferredInfo");
const workoutLocation = getNewestWorkoutLocation();
const Exersise = "block1";

const Tier = "Beginner"
const Block = 'Block1'
const Routine = 'Routine1'




console.log("Transferred User Info:", transferreduserInfo);
console.log("Transferred Info:", transferredInfo);
console.log(workoutLocation)






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
  const UBU = data.UBU;
  const { DarkLogo, LightLogo } = UBU.BuLogos;
  
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
  
  setBuIcon(LightLogo, 'Example image');  
});



async function SetNavBtns() {
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
SetNavBtns().then((data) => {
  const app = data.App

 const { List, Option,  Plate,  Vega } = app.MealPlanBtn;
  
  function setBuIcon(imgSrc, imgAlt, urlBtns) {
      // Find the img element with id 'logo-img'
      const img = document.getElementById(urlBtns);
  
      // Check if the img element exists
      if (img) {
          // Set the image source and alternative text
          img.src = imgSrc;
          img.alt = imgAlt;
      } else {
          console.error("Image element with id 'logo-img' not found.");
      }
  }
  
  
    // Set icons for specific IDs
    setBuIcon(List, "List Icon", "LCicon");
    setBuIcon(Plate, "Option Icon", "OCicon"); // Example for additional icons
    setBuIcon(Option, "Plate Icon", "Dicon");
    setBuIcon(Vega, "Vega Icon", "Vicon");
  


  
});








document.getElementById("MO").addEventListener("click", function (event) {
  event.preventDefault(); // Prevent default action if it's a link
  const hiddenDiv = document.getElementById("HMO");
  if (hiddenDiv.style.display === "none") {
    hiddenDiv.style.display = "flex"; // Show the div
    hiddenDiv.style.margin = ".2rem 0"; // Show the div
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
  function renderSlotContent(Dtype, type, title, DTurl, time, DtIurl, imgSrc, imgBlock) {
    // Select the elements by their IDs
    const typeElement = document.getElementById(Dtype);
    const titleElement = document.getElementById(DTurl);
    const timeElement = document.getElementById(DtIurl);
    const imgElement = document.getElementById(imgBlock);


    // Set the content for each element
    typeElement.textContent = type;
    titleElement.textContent = title;
    timeElement.textContent = time +" "+ 'minutos';

    // Set the image source
    imgElement.src = imgSrc;
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
  
        renderContent(breakfast.tittle, "Btittle", breakfast.time, "Btime", breakfast.img, "BImg" )
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
  
        renderSlotContent("BS1type", "Desayuno", DBreakfast.slot1.tittle, "BS1tittle", DBreakfast.slot1.time, "BS1time", DBreakfast.slot1.img, "BS1Img" )
        renderSlotContent("BS2type", "Desayuno", DBreakfast.slot2.tittle, "BS2tittle", DBreakfast.slot2.time, "BS2time", DBreakfast.slot2.img, "BS2Img")
        renderSlotContent("BS3type", "Desayuno", DBreakfast.slot3.tittle, "BS3tittle", DBreakfast.slot3.time, "BS3time", DBreakfast.slot3.img, "BS3Img")

      }

      function renderDLunchBlock(){
  
        renderSlotContent("LS1type", "Almuerzo", DLunch.slot1.tittle, "LS1tittle", DLunch.slot1.time, "LS1time", DLunch.slot1.img, "LS1Img" )
        renderSlotContent("LS2type", "Almuerzo", DLunch.slot2.tittle, "LS2tittle", DLunch.slot2.time, "LS2time", DLunch.slot2.img, "LS2Img")
        renderSlotContent("LS3type", "Almuerzo", DLunch.slot3.tittle, "LS3tittle", DLunch.slot3.time, "LS3time", DLunch.slot3.img, "LS3Img")

      }

      function renderDinnerBlock(){
  
        renderSlotContent("DS1type", "Cena", DDinner.slot1.tittle, "DS1tittle", DDinner.slot1.time, "DS1time", DDinner.slot1.img, "DS1Img" )
        renderSlotContent("DS2type", "Cena", DDinner.slot2.tittle, "DS2tittle", DDinner.slot2.time, "DS2time", DDinner.slot2.img, "DS2Img")
        renderSlotContent("DS3type", "Cena", DDinner.slot3.tittle, "DS3tittle", DDinner.slot3.time, "DS3time", DDinner.slot3.img, "DS3Img")

      }

      function renderDSnackBlock(){
  
        renderSlotContent("SS1type", "Snack", DSnack.slot1.tittle, "SS1tittle", DSnack.slot1.time, "SS1time", DSnack.slot1.img, "SS1Img" )
        renderSlotContent("SS2type", "Snack", DSnack.slot2.tittle, "SS2tittle", DSnack.slot2.time, "SS2time", DSnack.slot2.img, "SS2Img")
        renderSlotContent("SS3type", "Snack", DSnack.slot3.tittle, "SS3tittle", DSnack.slot3.time, "SS3time", DSnack.slot3.img, "SS3Img")

      }



      function renderVBreakfastBlock(){
  
        renderSlotContent("BS1type", "Desayuno", VBreakfast.slot1.tittle, "VBS1tittle", VBreakfast.slot1.time, "VBS1time", VBreakfast.slot1.img, "VBS1Img" )
        renderSlotContent("BS2type", "Desayuno", VBreakfast.slot2.tittle, "VBS2tittle", VBreakfast.slot2.time, "VBS2time", VBreakfast.slot2.img, "VBS2Img")
        renderSlotContent("BS3type", "Desayuno", VBreakfast.slot3.tittle, "VBS3tittle", VBreakfast.slot3.time, "VBS3time", VBreakfast.slot3.img, "VBS3Img")

      }
      function renderVLunchBlock(){
  
        renderSlotContent("LS1type", "Almuerzo", VLunch.slot1.tittle, "VLS1tittle", VLunch.slot1.time, "VLS1time", VLunch.slot1.img, "VLS1Img" )
        renderSlotContent("LS2type", "Almuerzo", VLunch.slot2.tittle, "VLS2tittle", VLunch.slot2.time, "VLS2time", VLunch.slot2.img, "VLS2Img")
        renderSlotContent("LS3type", "Almuerzo", VLunch.slot3.tittle, "VLS3tittle", VLunch.slot3.time, "VLS3time", VLunch.slot3.img, "VLS3Img")

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
