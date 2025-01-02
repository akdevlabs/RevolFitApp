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



async function calanderColor() {
  try {
    const docRef = doc(db, "RevoBuissnes", transferredInfo); // Ensure db and transferredInfo are initialized
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const documentData = docSnap.data();
      return documentData;
    } else {
      console.error("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
}

calanderColor().then((data) => {
  const UBU = data.UBU;

  const { Base, Prime1, Prime2,Prime3 } = UBU.Colors;

  function SetCalanderColors(){

    function setHeaderBackgroundColor() {
      const header = document.getElementById('header');
      if (header) {
        header.style.backgroundColor = Base ||'#013948';
        header.style.color = Prime2 || '#fff';
      } else {
        console.error('Element with id "header" not found.');
      }
    }

    function setcalendarBackgroundColor() {
      const calendar = document.getElementById('calendar');
      if (calendar) {
        calendar.style.backgroundColor = Prime2 ||'#fff';
        calendar.style.border = `1px solid '${Prime3}'`;

      } else {
        console.error('Element with id "calendar" not found.');
      }
    }

    
    function setcalendarBackgroundColor() {
      const calendar = document.getElementById('calendar');
      if (calendar) {
        calendar.style.backgroundColor = Prime2 ||'#fff';
        calendar.style.border = `1px solid '${Prime3}'`;
        calendar.style.boxShadow = `0px 6px 6px ${Prime1 || 'rgba(0, 0, 0, 0.2)'}`
        calendar.style.border = `2px solid ${Prime1 || '#000'}`;
      } else {
        console.error('Element with id "calendar" not found.');
      }
    }

    function setDayBackgroundColor() {
      const day = document.getElementById('day');
      if (day) {
        day.style.backgroundColor = Prime1 ||'#013948';

      } else {
        console.error('Element with id "header" not found.');
      }
    }
    
    // Call the function to apply the background color
    setDayBackgroundColor();
    setcalendarBackgroundColor();
    setHeaderBackgroundColor();






  }
  function renderCalanderBlock() {
    const monthYearElement = document.getElementById('month-year');
    const datesElement = document.getElementById('dates');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    const eventPopup = document.getElementById('event-popup');
    const overlay = document.getElementById('overlay');
    const addEventButton = document.getElementById('add-event');
    const eventTitleInput = document.getElementById('event-title');
    const eventTypeSelect = document.getElementById('event-type');
    const eventList = document.getElementById('event-list');

    let currentDate = new Date();
    const EventBase = {
      "2025-1-1": ["Año Nuevo"],
      "2025-1-14": ["Reunión a las 10 AM", "Almuerzo con Sarah"],
      "2025-1-20": ["Fecha límite del proyecto"]
    };

    const WorkoutBase = {
      "2025-1-5": ["Entrenamiento de cardio"],
      "2025-1-10": ["Día de pierna"],
      "2025-1-15": ["Sesión de yoga"],
      "2025-1-20": ["Sesión de HIIT"],
    };

    const MealPlanBase = {
      "2025-1-3": ["Desayuno: Avena", "Almuerzo: Ensalada de pollo a la parrilla", "Cena: Salmón con verduras"],
      "2025-1-10": ["Desayuno: Tazón de batido", "Almuerzo: Sándwich de pavo", "Cena: Espaguetis a la boloñesa"],
      "2025-1-15": ["Desayuno: Tostada de aguacate", "Almuerzo: Ensalada César", "Cena: Salteado de pollo"],
      "2025-1-20": ["Desayuno: Panqueques", "Almuerzo: Wrap de atún", "Cena: Bistec con papas"],
    };

    function renderCalendar() {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();

      const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ];

      monthYearElement.textContent = `${monthNames[month]} ${year}`;
      monthYearElement.style.backgroundColor = Base || '#013948';
      monthYearElement.style.color = Prime2 || '#fff';

      datesElement.innerHTML = '';
      const firstDayIndex = new Date(year, month, 1).getDay();
      const lastDate = new Date(year, month + 1, 0).getDate();

      for (let i = 0; i < firstDayIndex; i++) {
        const emptyDiv = document.createElement('div');
        datesElement.appendChild(emptyDiv);
      }

      for (let i = 1; i <= lastDate; i++) {
        const dateElement = document.createElement('div');
        dateElement.className = 'date';
        dateElement.textContent = i;
        dateElement.style.padding = '10px';
        dateElement.style.backgroundColor = Prime3 || '#e9e8e8';
        dateElement.style.textAlign = 'center';
        dateElement.style.cursor = 'pointer';
        dateElement.style.position = 'relative';
        dateElement.style.fontSize = '12px';

        const dateKey = `${year}-${month + 1}-${i}`;
        if (EventBase[dateKey] || WorkoutBase[dateKey] || MealPlanBase[dateKey]) {
          dateElement.classList.add('event');
          dateElement.style.backgroundColor = Base || '#013948';
          dateElement.style.color = '#fff';
          dateElement.style.borderRadius = '3px';
          dateElement.style.padding = '2px 5px';
          dateElement.style.marginTop = '5px';
        }

        dateElement.addEventListener('click', () => openEventPopup(dateKey));
        datesElement.appendChild(dateElement);
      }
    }

    function openEventPopup(date) {
      overlay.style.display = 'block';
      eventPopup.style.display = 'block';

      eventList.innerHTML = '';
      if (EventBase[date]) {
        EventBase[date].forEach(event => {
          const eventItem = document.createElement('div');
          eventItem.textContent = `Evento: ${event}`;
          eventList.appendChild(eventItem);
        });
      }

      if (WorkoutBase[date]) {
        WorkoutBase[date].forEach(workout => {
          const workoutItem = document.createElement('div');
          workoutItem.textContent = `Ejercicio: ${workout}`;
          eventList.appendChild(workoutItem);
        });
      }

      if (MealPlanBase[date]) {
        MealPlanBase[date].forEach(meal => {
          const mealItem = document.createElement('div');
          mealItem.textContent = `Comida: ${meal}`;
          eventList.appendChild(mealItem);
        });
      }

      if (!EventBase[date] && !WorkoutBase[date] && !MealPlanBase[date]) {
        eventList.textContent = 'No hay eventos para esta fecha.';
      }

      addEventButton.onclick = () => {
        const eventTitle = eventTitleInput.value;
        const eventType = eventTypeSelect.value;
        if (eventTitle) {
          const newEvent = `${eventType}: ${eventTitle}`;
          if (!EventBase[date]) {
            EventBase[date] = [];
          }
          EventBase[date].push(newEvent);

          console.log(`Nuevo evento agregado el ${date}: ${newEvent}`);
          renderCalendar();
          overlay.style.display = 'none';
          eventPopup.style.display = 'none';
        }
      };
    }

    overlay.addEventListener('click', () => {
      overlay.style.display = 'none';
      eventPopup.style.display = 'none';
    });

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
  SetCalanderColors()
  renderCalanderBlock();
});



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

  setBtnBackgroundColor('mealplan');
  setBtnBackgroundColor('Partnerships');
  setBtnBackgroundColor('Events');
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
