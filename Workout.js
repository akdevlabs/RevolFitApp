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



// Function to determine the workout type
function checkworkoutLocationValue() {
  const value = workoutLocation;
  if (value === "Gym"){
    return("GymWorkout")
  }else{
    return("homeWorkout")
  }

}

console.log(checkworkoutLocationValue())

// Function to fetch workouts
async function getWorkouts() {
  try {
    // Get the appropriate document reference based on the location
    const docRef = doc(db, "RevolApp", checkworkoutLocationValue());
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



// Use the function and handle the result
getWorkouts().then((data) => {
  // Define Tier and Block (replace with actual logic to set these values)
  const Tier = "Beginner"; // Example: Replace with dynamic logic
  const Block = "Block1"; // Example: Replace with dynamic logic
  const Routine = "Routine1"; // Example: Replace with dynamic logic

  // Function to get tier-specific data
  function checkTierValue() {
      if (Tier === "Beginner") {
          return (data.Beginner); // Access the 'Beginner' property
      } else if (Tier === "Intermediate") {
          return data.Intermediate; // Access the 'Intermediate' property
      } else if (Tier === "Advance") {
          return data.Advance; // Access the 'Advance' property
      } else {
          console.error(`Tier ${Tier} not recognized.`);
          return null;
      }
  }
  
  // Function to determine the block value
  function checkBlockValue() {
      return Block; // Return the currently selected block
  }

  // Function to get the active block data
  function getActiveBlock() {
      const TierValue = checkTierValue(); // Get the value for the current tier
      const block = checkBlockValue(); // Determine the block
      
      // Ensure the block exists in the selected tier
      if (TierValue && TierValue[block]) {
          return TierValue[block]; // Return the active block data
      } else {
          console.error(`Block ${block} not found in tier ${Tier}`);
          return null; // Handle case where the block doesn't exist
      }
  }

  // Function to determine the routine value
  function checkRoutineValue() {
      return Routine; // Return the currently selected routine
  }

  // Function to get the active routine data
  function getActiveRoutine() {
      const activeBlock = getActiveBlock(); // Get the active block data
      const routine = checkRoutineValue(); // Determine the routine

      // Ensure the routine exists in the active block
      if (activeBlock && activeBlock[routine]) {
          return activeBlock[routine]; // Return the active routine data
      } else {
          console.error(`Routine ${routine} not found in block.`);
          return null; // Handle case where the routine doesn't exist
      }
  }

  // Call the function to get and log the active routine
  const activeRoutine = getActiveRoutine();

  if (activeRoutine) {
      console.log("Active Routine Data:", activeRoutine);
  }

 
  function RenderstepBystep(){

      


  }

RenderstepBystep()
  
  
 
});












































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



// Bottom Icons
async function getBuLogo() {
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
getBuLogo().then((data) => {
  const UBU = data.UBU;
  const {DarkLogo, LightLogo} = UBU.BuLogos;

  function createfireIcon(imgSrc, imgAlt) {
    // Find the div with id 'cal'
    const div = document.getElementById('Logo');
  
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
  
  
  createfireIcon(LightLogo, 'Example image');
  
    
});




async function getVideo() {
  try {
    const docRef = doc(db, "RevolApp", checkValue());
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
getVideo().then((data) => {
  const {Crunch} = data.block1;
  const Vid = Crunch.Video;
  
  console.log(Vid)

  function setVideoSource(src) {
    const videoSource = document.getElementById("videoSource");
    const video = document.getElementById("customVideo");
    videoSource.src = src;
    video.load();
  }
  setVideoSource(Vid)
  document.getElementById('playButton').addEventListener('click', function() {
    document.getElementById('customVideo').play();
  });
  
    
});












  function countdown() {
    let timerInterval;
    let isRunning = false;
    let minutes = 2; // Set the starting time in minutes (e.g., 2 minutes)
    let seconds = minutes * 60; // Convert minutes to seconds

    const timerElement = document.getElementById('Timer');
    const actionButton = document.getElementById('actionBtn');

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')} min`; // Added 'min' here
    }

    function startStopTimer() {
        if (isRunning) {
            clearInterval(timerInterval);
            actionButton.textContent = 'Empezar';
        } else {
            timerInterval = setInterval(() => {
                if (seconds > 0) {
                    seconds--;
                    timerElement.textContent = formatTime(seconds);
                } else {
                    clearInterval(timerInterval);
                    actionButton.textContent = 'Completado';
                }
            }, 1000);
            actionButton.textContent = 'Pausar';
        }
        isRunning = !isRunning;
    }

    actionButton.addEventListener('click', startStopTimer);

    // Initialize the timer display with "min"
    timerElement.textContent = formatTime(seconds);
}

countdown();






// Bottom Icons
async function getDescription() {
  try {
    const docRef = doc(db, "RevolApp", transferredInfo);
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
getDescription().then((data) => {
  const App = data.App;
  const Btns = App.Btns;

  
function createDescription(HText, PText) {
  const descriptionDiv = document.getElementById('description');

  // Create the <h1> element
  const h1 = document.createElement('h1');
  h1.textContent = HText; // Customize the text content

  // Create the <p> element
  const p = document.createElement('p');
  p.textContent = PText; // Customize the text content

  // Append the elements to the description div
  descriptionDiv.appendChild(h1);
  descriptionDiv.appendChild(p);
}

// Call the function to create and append the elements

  
});


// Bottom Icons
async function getStartBtnColors() {
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
getStartBtnColors().then((data) => {
  
  const UBU = data.UBU;

  const { Base, Prime1, Prime2 } = UBU.Colors;



  function addbtnColors(){
    const actionBtn = document.getElementById('actionBtn');

    actionBtn .style.color = Base;
    actionBtn.style.border = `5px solid ${Base}`; 
    actionBtn.style.backgroundColor = 'transparent'; 
    actionBtn.style.boxShadow = `0 0 15px 5px ${Base}`;

  }
  addbtnColors()


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
  const { top, center, bottom } = UBU.BackgroundColor;
  const { Base, Prime1, Prime2, Prime3 } = UBU.Colors;
// Function to change the background gradient dynamically
function setGradient(color1, color2, color3) {
  document.body.style.background = `linear-gradient(to bottom, ${color1}, ${color2}, ${color3})`;
}

// Example usage:
setGradient(top, center, bottom);

});
document.addEventListener('touchstart', function (event) {
  if (event.touches.length > 1) {
    event.preventDefault(); // Prevents zooming
  }
}, { passive: false });