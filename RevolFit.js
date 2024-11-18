// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

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

async function getDataAppIntro() {
  try {
    // Reference a document in the "revoFitweb" collection with ID "landing"
    const docRef = doc(db, 'RevolAppLogin', 'Default');
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
async function getDataAppLogin() {
  try {
    // Reference a document in the "revoFitweb" collection with ID "landing"
    const docRef = doc(db, 'RevolAppLogin', 'Default');
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
// Fetch and log the data
getDataAppIntro().then((data) => {
  const AppIntroValue = data.popup; // Retrieve nested data

  // Access title, subtitle, background image, and logo
  const Subtitle = AppIntroValue.Subtittle;
  const title = AppIntroValue.tittle;
  const backgroundImg = AppIntroValue.backgroundImg;
  const btnColor = AppIntroValue.btnColor; // Example for button text
  const logo = AppIntroValue.logo;   // Example for button link

  // Render the button border color
  function setButtonBorderColor(color) {
    const button = document.getElementById("pop-upBtn");
    button.style.border = `5px solid ${color}`; // Set the border color dynamically
    button.style.borderRadius = "5px"; // Optional: Add rounded corners
  }

  // Populate the button border color and other attributes
  setButtonBorderColor(btnColor);

  // Render the background image
  function renderImage(imageUrl) {
    const imgContainer = document.getElementById("pop-upImg");
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = "What We Offer Image";
    img.style.height = "auto"; 
    imgContainer.innerHTML = "";
    imgContainer.appendChild(img);
  }
  function renderLogo(imageUrl) {
    const imgContainer = document.getElementById("pop-upIcon");
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = "What We Offer Image";
    img.style.height = "auto"; 
    imgContainer.innerHTML = "";
    imgContainer.appendChild(img);
  }
  
  // Render title and subtitle
  function renderText(title, subtitle) {
    document.getElementById("tittle").textContent = title;
    document.getElementById("Subtittle").textContent = subtitle;
  }

  // Render button


  // Populate the elements
  renderImage(backgroundImg);
  renderText(title, Subtitle);
  renderLogo(logo);
  
});

getDataAppLogin().then((data) => {
  const AppIntroValue = data.login; // Retrieve nested data

  // Access title, subtitle, background image, and logo

  const backgroundImg = AppIntroValue.backgroundimg;
  const btnColor = AppIntroValue.btnColor; // Example for button text
  const backgroundColor = AppIntroValue.backgroundColor; // Example for button text
  const logo = AppIntroValue.logo; 
  const Fcolor = AppIntroValue.Fcolor; 
  // Example for button link

  // Render the button border color
  function setButtonBorderColor(color) {
    const button = document.getElementById("ISbtn");
    button.style.border = `5px solid ${color}`; // Set the border color dynamically
    button.style.borderRadius = "5px"; // Optional: Add rounded corners
  }
  function sbackgroundColor(color) {
    const button = document.getElementById("loginContent");
    button.style.backgroundColor = color; // Set the border color dynamically
    
  }


  // Populate the button border color and other attributes
  setButtonBorderColor(btnColor);
  sbackgroundColor(backgroundColor)
 
  // Render the background image
  function renderImage(imageUrl) {
    const imgContainer = document.getElementById("loginImg");
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = "What We Offer Image";
    img.style.height = "auto"; 
    imgContainer.innerHTML = "";
    imgContainer.appendChild(img);
  }

    // Render the background image
    function renderIcon(imageUrl) {
      const imgContainer = document.getElementById("loginIcon");
      const img = document.createElement("img");
      img.src = imageUrl;
      img.alt = "What We Offer Image";
      img.style.height = "auto"; 
      imgContainer.innerHTML = "";
      imgContainer.appendChild(img);
    }
 

  function changeLinkColors() {
    // Select all <a> tags within the div with id="form-links"
    const links = document.querySelectorAll("#form-links a");



    // Loop through each link and change its color
    links.forEach(link => {
        link.style.color = Fcolor;
    });
}


  // Populate the elements
  renderImage(backgroundImg);
  changeLinkColors()
  renderIcon(logo)

  const popupBtn = document.getElementById('pop-upBtn');
  const popup = document.getElementById('backgroundImg');

  // Add a click event listener to the button
  popupBtn.addEventListener('click', () => {
      // Toggle the visibility of the pop-up
      if (popup.style.display === "none" || popup.style.display === "") {
          popup.style.display = "block";
      } else {
          popup.style.display = "none";
      }
  });
  
});




