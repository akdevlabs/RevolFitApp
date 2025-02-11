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





console.log("Transferred User Info:", transferreduserInfo);
console.log("Transferred Info:", transferredInfo);
console.log(workoutLocation)





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




async function SetBuBtns() {
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
SetBuBtns().then((data) => {
  const App = data.App;

  const Btns = App.Partnerships;
  const GymBtns = Btns.GymBtns;
  const SupplementBtns = Btns.SupplementBtns;
  const nutritionBtns = Btns.nutritionBtns;
  const ProductBtns = Btns.ProductBtns;
  const HomeBtns = Btns.homeBtns;
  const Incentive = Btns.IncentiveBtns;
  const Event = Btns.EventBtns;



  function setBuIcon(imgSrc, imgAlt, imgId) {
      // Find the img element with id 'logo-img'
      const img = document.getElementById(imgId);
  
      // Check if the img element exists
      if (img) {
          // Set the image source and alternative text
          img.src = imgSrc;
          img.alt = imgAlt;
      } else {
          console.error("Image element with id 'logo-img' not found.");
      }
  }
  
  setBuIcon(GymBtns[0], 'Example image', "GymImg");  
  setBuIcon(ProductBtns[0], 'Example image', "ProductImg");  
  setBuIcon(SupplementBtns[0], 'Example image', "SuplimentImg");  
  setBuIcon(nutritionBtns[0], 'Example image', "NutricionistaImg");


  setBuIcon(Incentive[0], 'Example image', "Incentive"); 
  setBuIcon(HomeBtns[0], 'Example image', "home"); 
  setBuIcon(Event[0], 'Example image', "Events"); 

});



document.addEventListener("DOMContentLoaded", function () {
  const btnBlock = document.getElementById("BtnBlock");
  const blocks = document.querySelectorAll(".blocks");
  const homeButton = document.getElementById("home");

  blocks.forEach(block => {
      block.addEventListener("click", function () {
          console.log("Clicked on:", this.id); // Logs the clicked block's ID
          btnBlock.style.display = "none"; // Hides the BtnBlock section
      });
  });

  homeButton.addEventListener("click", function () {
      btnBlock.style.display = "flex"; // Shows the BtnBlock section again
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
  const { Base, Prime1, Prime2, Prime3, Prime4 } = UBU.Colors;



function changeBackgroundColor(color, SBtn, percentage) {
  const element = document.getElementById(SBtn);
  if (element) {
    element.style.background = `linear-gradient(to right, ${color} ${percentage}%, transparent)`;
  } else {
    console.error("Element not found:", SBtn);
  }
}
function changeBackgroundImg(color, SBtn) {
  const Btn = document.getElementById(SBtn);
  if (Btn) {
    Btn.style.backgroundColor = color;
  } else {
    console.error("Element not found:", SBtn);
  }
}
function changeBackgroundImg(color, className) {
  const elements = document.getElementsByClassName(className);
  if (elements.length > 0) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.backgroundColor = color;
    }
  } else {
    console.error("Elements not found:", className);
  }
}




function setGradient(color1, color2) {
  document.body.style.background = `linear-gradient(to bottom, ${color1}, ${color2})`;
}

function addBorder() {
  const blocks = document.querySelectorAll(".blocks"); // Select all elements with class "blocks"
  blocks.forEach(block => {
      block.style.border = `.5px solid ${Prime4}`; 
  });
}

addBorder()



changeBackgroundColor(top, "gyms", 70);// Example color change
changeBackgroundColor(top, "products", 70); // Example color change
changeBackgroundColor(top, "Supliments", 70); // Example color change
changeBackgroundColor(top, "Nutricionistas", 70); // Example color change
changeBackgroundImg(Prime1, "gyms"); // Example color change
changeBackgroundImg(Prime1, "blocksImgs"); // Change background color to 
setGradient(top, bottom); 

});

async function setTittleColor() {
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
setTittleColor().then((data) => {
  const UBU = data.UBU;

  const { Base, Prime1, Prime2, Prime3 } = UBU.Colors;


  function setTittleColor(BtnUrl) {
    const tittle = document.getElementById(BtnUrl);
    if (tittle) {
      tittle.style.color = Base || '#013948';
    } else {
      console.error(`Element with id "${BtnUrl}" not found.`);
    }
  }



  setTittleColor('tittle') 

});
document.addEventListener('touchstart', function (event) {
  if (event.touches.length > 1) {
    event.preventDefault(); // Prevents zooming
  }
}, { passive: false });
