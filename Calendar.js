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






function renderCalanderBlock(){
  const monthYearElement = document.getElementById('month-year');
  const datesElement = document.getElementById('dates');
  const prevMonthButton = document.getElementById('prev-month');
  const nextMonthButton = document.getElementById('next-month');
  const eventPopup = document.getElementById('event-popup');
  const overlay = document.getElementById('overlay');
  const addEventButton = document.getElementById('add-event');
  const eventTitleInput = document.getElementById('event-title');
  const eventTypeSelect = document.getElementById('event-type');

  let currentDate = new Date();
  const EventBase = {
      "2025-1-1": ["New Year's Day"],
      "2025-1-14": ["Meeting at 10 AM", "Lunch with Sarah"],
      "2025-1-20": ["Project Deadline"]
  };

  const WorkoutBase = {
      "2025-1-5": ["Cardio Workout"],
      "2025-1-10": ["Leg Day"],
      "2025-1-15": ["Yoga Session"],
      "2025-1-20": ["HIIT Session"],
  };

  const MealPlanBase = {
      "2025-1-3": ["Breakfast: Oatmeal", "Lunch: Grilled Chicken Salad", "Dinner: Salmon with Veggies"],
      "2025-1-10": ["Breakfast: Smoothie Bowl", "Lunch: Turkey Sandwich", "Dinner: Spaghetti Bolognese"],
      "2025-1-15": ["Breakfast: Avocado Toast", "Lunch: Caesar Salad", "Dinner: Chicken Stir-fry"],
      "2025-1-20": ["Breakfast: Pancakes", "Lunch: Tuna Wrap", "Dinner: Steak with Potatoes"],
  };

  function renderCalendar() {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();

      monthYearElement.textContent = currentDate.toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric'
      });

      datesElement.innerHTML = '';
      const firstDayIndex = new Date(year, month, 1).getDay();
      const lastDate = new Date(year, month + 1, 0).getDate();

      for (let i = 0; i < firstDayIndex; i++) {
          datesElement.innerHTML += '<div></div>';
      }

      for (let i = 1; i <= lastDate; i++) {
          const dateElement = document.createElement('div');
          dateElement.className = 'date';
          dateElement.textContent = i;
          const dateKey = `${year}-${month + 1}-${i}`;

          if (EventBase[dateKey]) {
              EventBase[dateKey].forEach(event => {
                  const eventElement = document.createElement('div');
                  eventElement.className = 'event';
                  eventElement.textContent = event;
                  dateElement.appendChild(eventElement);
              });
          }

          if (WorkoutBase[dateKey]) {
              WorkoutBase[dateKey].forEach(workout => {
                  const workoutElement = document.createElement('div');
                  workoutElement.className = 'event';
                  workoutElement.textContent = workout;
                  dateElement.appendChild(workoutElement);
              });
          }

          if (MealPlanBase[dateKey]) {
              MealPlanBase[dateKey].forEach(meal => {
                  const mealElement = document.createElement('div');
                  mealElement.className = 'event';
                  mealElement.textContent = meal;
                  dateElement.appendChild(mealElement);
              });
          }

          dateElement.addEventListener('click', () => openEventPopup(dateKey));
          datesElement.appendChild(dateElement);
      }
  }

  function openEventPopup(date) {
      overlay.style.display = 'block';
      eventPopup.style.display = 'block';
      addEventButton.onclick = () => {
          const eventTitle = eventTitleInput.value;
          const eventType = eventTypeSelect.value;
          if (eventTitle) {
              console.log(`Event added: ${eventType} - ${eventTitle}`);
              if (!EventBase[date]) {
                  EventBase[date] = [];
              }
              EventBase[date].push(`${eventType}: ${eventTitle}`);
              closeEventPopup();
              renderCalendar();
          }
      };
  }

  function closeEventPopup() {
      overlay.style.display = 'none';
      eventPopup.style.display = 'none';
      eventTitleInput.value = '';
  }

  overlay.addEventListener('click', closeEventPopup);
  prevMonthButton.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar();
  });

  nextMonthButton.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar();
  });

  renderCalendar();
}

renderCalanderBlock()

















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
