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

 





  function getExerciseContent() {
    const obj = activeRoutine;
    const Exercises = obj.Exercises;
    console.log(Exercises)

    function renderExerciseContent() {
      // Clear prior renders
      const existingContainer = document.querySelector(".exercise-container");
      if (existingContainer) {
        existingContainer.remove();
      }
  
      const container = document.createElement("div");
      container.className = "exercise-container";
  
      Object.keys(Exercises).forEach((exercise) => {
        const exerciseData = Exercises[exercise];
  
        const exerciseElement = document.createElement("div");
        exerciseElement.className = "exercise-item";
  
        const title = document.createElement("h3");
        title.textContent = exercise;
        exerciseElement.appendChild(title);
  
        if (exerciseData.Description) {
          const description = document.createElement("p");
          description.textContent = exerciseData.Description;
          exerciseElement.appendChild(description);
        }
  
        if (exerciseData.Sets) {
          const setsContainer = document.createElement("div");
          setsContainer.textContent = "Sets: ";
          setsContainer.style.display = "inline";
  
          exerciseData.Sets.forEach((set, index) => {
            const span = document.createElement("span");
            span.textContent = set;
            span.style.marginRight = "10px";
  
            setsContainer.appendChild(span);
          });
  
          exerciseElement.appendChild(setsContainer);
        }
  
        if (exerciseData.Definition) {
          const definitionList = document.createElement("ul");
          definitionList.textContent = "Definition:";
          exerciseData.Definition.forEach((def) => {
            const listItem = document.createElement("li");
            listItem.textContent = def;
            
            definitionList.appendChild(listItem);
          });
          exerciseElement.appendChild(definitionList);
        }
  
        container.appendChild(exerciseElement);
      });
  
      document.body.appendChild(container);
    }
  
    renderExerciseContent();
  }
  
  getExerciseContent();
  
  
 
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

function setTextColor(){

  // Set the color for h2 elements
  const h2Elements = document.querySelectorAll("h2");
  h2Elements.forEach((h2) => {
      h2.style.color = Prime1;
  });

  const h3Elements = document.querySelectorAll("h3");
  h3Elements.forEach((h3) => {
      h3.style.color = Prime1;
  });

  // Set the color for p elements
  const pElements = document.querySelectorAll("p");
  pElements.forEach((p) => {
      p.style.color = Prime2;
  });

  // Set the color for ul elements
  const ulElements = document.querySelectorAll("ul");
  ulElements.forEach((ul) => {
      ul.style.color = Base;
  });

  // Set the color for li elements
  const liElements = document.querySelectorAll("li");
  liElements.forEach((li) => {
      li.style.color = Prime3;
  });

  // Set the background color for each div
  const divElements = document.querySelectorAll("div");
  divElements.forEach((div) => {
      div.style.backgroundColor = Base;
  });
}












setTextColor()






setGradient(top, bottom); 

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



