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
  const App      = data.App;
  const MealPlan = App.MealPlan;


  const motivationText   = MealPlan.Mtext;

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
    const h1 = document.createElement('h4');
  
    // Set the text content of the h1 element
    h1.textContent = textContent;
  
    // Append the h1 to the div
    div.appendChild(h1);
  }
  
  creatMotivation(selectedPhrase)
  
  
});







const Desayuno = "Desayuno"
const Almuerzo = "Almuerzo"
const Cena     = "Cena"
const Snack    = "Snack"


const mealTime = "45 mins"



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




function createMealPlanDishes(MealN, MealT ) {
  // Get the parent section
  const mealPlanSection = document.getElementById("MealPlanDishes");

  // Create the main div
  const mainDiv = document.createElement("div");
  mainDiv.classList.add("meal-plan-container");

  // Create the first inner div
  const textDiv = document.createElement("div");
  textDiv.classList.add("text-container");

  // Create and append h1
  const title = document.createElement("h1");
  title.textContent = MealN;
  textDiv.appendChild(title);

  // Create and append a tag
  const link = document.createElement("a");
  link.href = "#";
  link.textContent = MealT;
  textDiv.appendChild(link);

  // Create the second inner div
  const imgDiv = document.createElement("div");
  imgDiv.classList.add("image-container");

  // Create and append img
  const img = document.createElement("img");
  img.src = "https://via.placeholder.com/150"; // Placeholder image
  img.alt = "Meal Plan Dish";
  imgDiv.appendChild(img);

  // Append inner divs to main div
  mainDiv.appendChild(textDiv);
  mainDiv.appendChild(imgDiv);

  // Append the main div to the section
  mealPlanSection.appendChild(mainDiv);
}
createMealPlanDishes(Desayuno, mealTime)

createMealPlanDishes(Almuerzo, mealTime)

createMealPlanDishes(Cena, mealTime)

createMealPlanDishes(Snack, mealTime)

async function setBtnColor() {
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
setBtnColor().then((data) => {
  const UBU = data.UBU;

  const { Base, Prime1, Prime2, Prime3 } = UBU.Colors;

  function setBtnBackgroundColor(BtnUrl) {
    const Btn = document.getElementById(BtnUrl);
    if (Btn) {
      Btn.style.backgroundColor = Base || '#013948';
      Btn.style.color = Prime2 || '#fff';
      Btn.style.boxShadow = `0px 4px 6px ${Prime1 || 'rgba(0, 0, 0, 0.2)'}`;
      Btn.style.border = `2px solid ${Prime1 || '#000'}`;
    } else {
      console.error(`Element with id "${BtnUrl}" not found.`);
    }
  }

  function setTittleColor(BtnUrl) {
    const tittle = document.getElementById(BtnUrl);
    if (tittle) {
      tittle.style.color = Base || '#013948';
    } else {
      console.error(`Element with id "${BtnUrl}" not found.`);
    }
  }



  setTittleColor('Caltittle') 
  setBtnBackgroundColor('mealplan');
  setBtnBackgroundColor('Partnerships');
  setBtnBackgroundColor('Events');
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
