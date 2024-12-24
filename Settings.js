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






// Get reference to the logout button
const logoutBtn = document.getElementById("logoutBtn");

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





function createDropdown(containerId, options) {
  // Get the container div by its ID
  const container = document.getElementById(containerId);

  // Check if the container exists
  if (!container) {
      console.error(`Container with ID "${containerId}" not found.`);
      return;
  }

  // Create the dropdown element (select)
  const dropdown = document.createElement('select');

  // Iterate over the options array to create dropdown options
  options.forEach(optionText => {
      const option = document.createElement('option');
      option.value = optionText;
      option.textContent = optionText;
      dropdown.appendChild(option);
  });

  // Append the dropdown to the container
  container.appendChild(dropdown);
}

// Example Usage:
// HTML: <div id="dropdown-container"></div>
// JavaScript:
//createDropdown('dropdown-container', ['Option 1', 'Option 2', 'Option 3']);





async function getBuInfo() {
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

getBuInfo().then((data) => {
  const UBU = data.UBU; // Retrieve nested data
  
  const {Base, Prime1, Prime2, Prime3} = UBU.Colors;


function BuIcon(){
  const BuLogos = UBU.BuLogos
  const LightLogo = BuLogos.LightLogo
  


  function createBuIcon(imgSrc, imgAlt) {
    // Find the div with id 'cal'
    const div = document.getElementById('BuIcon');
  
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
  createBuIcon(LightLogo , 'Example image');
}
BuIcon()

function BtnColor(color,Tcolor) {
  const buttons = [
    document.getElementById('btn1'),
    document.getElementById('btn2'),
    document.getElementById('btn3'),
    document.getElementById('logoutBtn'),
  ];

  buttons.forEach(button => {
    if (button) {
      button.style.backgroundColor = color;
      button.style.color = Tcolor;
    }
  });
}

BtnColor(Base, Prime2)
});






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
  const App = data.App; // Retrieve nested data
  const Btns = App.Btns

  function getHomeBtn(){
  const homeBtns = Btns.homeBtns
  const blue  = homeBtns[0]
  const white = homeBtns[1]

  function createfireIcon(imgSrc, imgAlt) {
    // Find the div with id 'cal'
    const div = document.getElementById('home');
  
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
    // Add an event listener to redirect when the image is clicked
    img.addEventListener('click', function() {
      window.location.href = 'index9.html'; // Redirect to index10.html
    });
    // Append the image to the div
    div.appendChild(img);
  }
  
  
  createfireIcon(blue, 'Example image');
  }
  function getDateBtn() {
    const DateBtns = Btns.DateBtns;
    const blue = DateBtns[0];
    const white = DateBtns[1];

    function createfireIcon(imgSrc, imgAlt) {
        // Find the div with id 'Date'
        const div = document.getElementById('Date');
        
        // Check if the div exists
        if (!div) {
            console.error("Div with id 'Date' not found.");
            return;
        }
        
        // Create an image element
        const img = document.createElement('img');
        
        // Set the image source and alternative text
        img.src = imgSrc;
        img.alt = imgAlt;
        
        // Add an event listener to redirect when the image is clicked
        img.addEventListener('click', function() {
            window.location.href = 'index10.html'; // Redirect to index10.html
        });

        // Append the image to the div
        div.appendChild(img);
    }

    createfireIcon(white, 'Example image');
}
  function getGoalBtn(){
    const GoalBtns = Btns.GoalBtns
    const blue  = GoalBtns[0]
    const white = GoalBtns[1]
  
    function createfireIcon(imgSrc, imgAlt) {
      // Find the div with id 'cal'
      const div = document.getElementById('goals');
    
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
      // Add an event listener to redirect when the image is clicked
      img.addEventListener('click', function() {
        window.location.href = 'index11.html'; // Redirect to index10.html
      });
      // Append the image to the div
      div.appendChild(img);
    }
    
    
    createfireIcon(white , 'Example image');
  }
  function getStatBtn(){
    const StatBtns = Btns.StatBtns
    const blue  = StatBtns[0]
    const white = StatBtns[1]
  
    function createfireIcon(imgSrc, imgAlt) {
      // Find the div with id 'cal'
      const div = document.getElementById('stats');
    
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
      
      // Add an event listener to redirect when the image is clicked
      img.addEventListener('click', function() {
        window.location.href = 'index12.html'; // Redirect to index10.html
      });
      // Append the image to the div
      div.appendChild(img);
    }
    
    
    createfireIcon(white , 'Example image');
  }
  function getGearBtn(){
    const GearBtns = Btns.GearBtns
    const blue  = GearBtns[0]
    const white = GearBtns[1]
  
    function createfireIcon(imgSrc, imgAlt) {
      // Find the div with id 'cal'
      const div = document.getElementById('gear');
    
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

      // Add an event listener to redirect when the image is clicked
      img.addEventListener('click', function() {
        window.location.href = 'index9.5.html'; // Redirect to index10.html
      });
    
      // Append the image to the div
      div.appendChild(img);
    }
    
    
    createfireIcon(white , 'Example image');
  }









  getHomeBtn()
  getDateBtn()
  getGoalBtn()
  getStatBtn()
  getGearBtn()


});