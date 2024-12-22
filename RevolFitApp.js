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
    const timestamp = data.createdAt; // Retrieve nested data

    
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

    function LasttimeUsed(stamp) {
      // Get the div by its ID
      const userNameDiv = document.getElementById('lastTime');
    
      // Create an h1 element
      const h1 = document.createElement('h3');
    
      // Set the content of the h1 element to include "Hola," followed by the user's name
      h1.textContent = stamp;
    
      // Append the h1 element to the div
      userNameDiv.appendChild(h1);
    }
    // Call the function with the desired username
    LasttimeUsed(timestamp);
   
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
    const App    = data.App;
    const motivationText   = App.motFrases;
  
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
      const h1 = document.createElement('h1');
    
      // Set the text content of the h1 element
      h1.textContent = textContent;
    
      // Append the h1 to the div
      div.appendChild(h1);
    }
    
    creatMotivation(selectedPhrase)
    
    
  });
  











 // Function to fetch document data
 async function getbUiCON() {
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
 // Fetch and use the document data
 getbUiCON().then((data) => {
  const App    = data.App;
  const BuIcon   = App.BuIcon;
  const BuLight   = BuIcon.BuLight;

function createfireIcon(imgSrc, imgAlt) {
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


createfireIcon(BuLight, 'Example image');


});
 








async function getUserimg() {
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
getUserimg().then((data) => {
  const userImg = data.userImg; // Retrieve nested data
  

  
  function createfireIcon(imgSrc, imgAlt) {
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
  
  
  createfireIcon(userImg, 'Example image');
  
});
















// General function to fetch document data
async function fetchDocumentData(docPath, transferredInfo) {
  try {
      const docRef = doc(db, docPath, transferredInfo);
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

// General function to create and append an element (image or h1) to a specified div
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

// Fetch and use the document data
fetchDocumentData("RevoBuissnes", transferredInfo).then

(data => {
  if (!data) return;

  const appData = data.App;
  const ResultIcons = appData.ResultIcons;






  // Cal section
  createElementInDiv("cal", "img", { 
    src: ResultIcons.fire, 
    alt: "Fire icon" });
  createElementInDiv("cal", "h1", {}, "2100");

  // Time section
  createElementInDiv("Time", "img", { 
    src: ResultIcons.time, 
    alt: "Time icon" });
  createElementInDiv("Time", "h1", {}, "21h");

  // Weight section
  createElementInDiv("weight", "img", { 
    src: ResultIcons.weight, 
    alt: "Weight icon" });
  createElementInDiv("weight", "h1", {}, "21h");
});









 



async function getResultsContainerColors() {
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

// Fetch and use the document data
getResultsContainerColors().then((data) => {
  if (!data || !data.App) {
    console.error("Invalid data structure or missing App property.");
    return;
  }

  const App = data.App;
  const Colors = App.Colors;
  const Base = Colors.Base;
  const Prime1 = Colors.Prime1;
  const Prime2 = Colors.Prime2;

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
});






async function getBtnblockColors() {
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
// Fetch and use the document data
getBtnblockColors().then((data) => {
  if (!data || !data.App) {
    console.error("Invalid data structure or missing App property.");
    return;
  }

  const App = data.App;
  const Colors  = App.Colors;
  const Prime1   = Colors.Prime1;




  function renderCalShadowBox() {
    // Select the div element with the ID 'cal'
    const calDiv = document.getElementById('startBtn');

    // Check if the element exists to avoid runtime errors
    if (!calDiv) {
        console.error("Element with ID 'cal' not found.");
        return;
    }

    // Apply shadow box styling
    
    calDiv.style.color = Prime1 ;
    calDiv.style.boxShadow = `0px 4px 10px ${Prime1}`;
    calDiv.style.backgroundColor = 'trasperant'; // Set dynamic background color
    calDiv.style.border = `5px solid ${Prime1 }`; // Set dynamic border color
  }
 
  renderCalShadowBox()

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
        window.location.href = 'index13.html'; // Redirect to index10.html
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