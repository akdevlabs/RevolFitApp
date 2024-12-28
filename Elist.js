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
const workoutLocation = localStorage.getItem('workoutLocation');
const Exersise = "block1";



console.log(workoutLocation)


console.log("Transferred User Info:", transferreduserInfo);
console.log("Transferred Info:", transferredInfo);
console.log(workoutLocation)



// Function to determine the workout type
function checkValue() {
  const value = workoutLocation;
  console.log(value)
  if (value === "gym"){
    return("GymWorkout")
  }else{
    return("homeWorkout")
  }

}

// Function to fetch workouts
async function getWorkouts() {
  try {
    // Get the appropriate document reference based on the location
    const docRef = doc(db, "RevolApp", checkValue());
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
  // Access the Block property from the data object
  const Exersiseses = data[Exersise];

  function renderGymList(workout) {
    if (!workout) return; // Skip if the workout is undefined

    // Target the GymList section in the DOM
    const gymListSection = document.getElementById("GymList");

    // Create a container for the workout
    const workoutContainer = document.createElement("div");
    workoutContainer.className = "workout-container";

    // Add the workout title
    const title = document.createElement("h2");
    title.textContent = workout.Tittle; // Updated property name
    workoutContainer.appendChild(title);

    // Add reps and time
    const reps = document.createElement("p");
    reps.textContent = `Reps: ${workout.Reps}`;
    workoutContainer.appendChild(reps);

    const time = document.createElement("p");
    time.textContent = `Time: ${workout.time}`;
    workoutContainer.appendChild(time);

    // Add the sets list
    const setsList = document.createElement("ul");
    setsList.className = "sets-list";
    workout.Sets.forEach((set) => {
      const listItem = document.createElement("li");
      listItem.textContent = set;
      setsList.appendChild(listItem);
    });
    workoutContainer.appendChild(setsList);

    // Add the instructions
    const instructionsTitle = document.createElement("h3");
    instructionsTitle.textContent = "Instructions";
    workoutContainer.appendChild(instructionsTitle);

    const instructionsList = document.createElement("ul");
    instructionsList.className = "instructions-list";
    workout.instructions.forEach((instruction) => {
      const listItem = document.createElement("li");
      listItem.textContent = instruction;
      instructionsList.appendChild(listItem);
    });
    workoutContainer.appendChild(instructionsList);

    // Append the workout container to the GymList section
    gymListSection.appendChild(workoutContainer);
  }

  // Iterate over all workouts in the Exersiseses object and render them
  Object.values(Exersiseses).forEach((workout) => {
    renderGymList(workout);
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



