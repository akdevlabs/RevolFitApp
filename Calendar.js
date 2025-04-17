import { 
  initializeApp 
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut 
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  updateDoc, 
  serverTimestamp,
  collection, 
  addDoc  
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

let db, auth; // Declare Firestore and Auth globally

// Fetch Firebase configuration
async function fetchFirebaseConfig() {
  try {
   // console.log("Fetching Firebase config...");
    const response = await fetch("http://localhost:3000/firebase-config"); // Change when deploying
    if (!response.ok) throw new Error("Failed to fetch Firebase config");
    return await response.json();
  } catch (error) {
    console.error("Error fetching Firebase config:", error);
    return null;
  }
}

// Initialize Firestore and Auth
async function initializeFirebase() {
  if (db && auth) return; // Prevent duplicate initialization

  try {
    const firebaseConfig = await fetchFirebaseConfig();
    if (!firebaseConfig) throw new Error("Firebase config is undefined");

    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);

   

    await initializeFirestoreFunctions();
  } catch (error) {
    console.error("Error initializing Firebase:", error);
  }
}

//console.log("collection function:", collection);
// Wait for Firebase initialization
await initializeFirebase();

async function initializeFirestoreFunctions() {
 // console.log("Initializing Firestore-related functions...");
  // Add any Firestore setup code here if needed.
}

// Retrieve data from localStorage
 const transferreduserInfo = localStorage.getItem("transferreduserInfo");
 const transferredInfo = localStorage.getItem("transferredBu");
 
//console.log("Transferred User Info:", transferreduserInfo);
//console.log("Transferred Info:", transferredInfo);

// Check if a document exists in Firestore
async function checkDocumentExists(collectionName, documentId) {
  if (!collectionName || !documentId) {
    console.error("Collection name or document ID is missing.");
    return null;
  }

  if (!db) {
    console.error("Firestore instance is not initialized.");
    return null;
  }

  try {
    const docRef = doc(db, collectionName, documentId);
   
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      
      return docSnap.data();
    } else {
      //console.log(`No document found with ID: ${documentId}`);
      return null;
    }
  } catch (error) {
    console.error("Error checking document:", error);
    return null;
  }
}
// Check if a business-related document exists
checkDocumentExists("RevoBusiness", transferredInfo);

// Retrieving the newest workout location
function getNewestWorkoutLocation() {
  const locations = JSON.parse(localStorage.getItem('workoutLocations')) || [];
  // Return the last item if the array exists and isn't empty
  return locations.length ? locations[locations.length - 1] : null;
}

const workoutLocation = getNewestWorkoutLocation();
const Exersise = "block1";
const Tier = "Beginner"
const Block = 'Block1'
const Routine = 'Routine1'

//console.log("Transferred User Info:", transferreduserInfo);
//console.log("Transferred Info:", transferredInfo);
//console.log(workoutLocation)

async function applyBranding() {
  const Buissnes = await checkDocumentExists("RevoBuissnes", transferredInfo);

  function setContent(){
    function setBgImgs(imgSrc, imgAlt, urlId) {
      // Find the img element with id 'logo-img'
      const img = document.getElementById(urlId);
  
      // Check if the img element exists
      if (img) {
          // Set the image source and alternative text
          img.src = imgSrc;
          img.alt = imgAlt;
      } else {
          console.error("Image element with id 'logo-img' not found.");
      }
    }
    setBgImgs(Buissnes.UBU.BuLogos.DarkLogo, Buissnes.UBU.LogoText.Logo.description, 'logo')
  }
  function setAllcolors(){
    const UBU = Buissnes.UBU;
    const{bottom , center, top} = UBU.BackgroundColor
  

    const Evaluation =  Buissnes.Evaluation;
    const {TextCon, tittle} = Evaluation.EtextContent;

    const {Base, Prime1, Prime2, Prime3, Prime4, Prime5, Prime6} = UBU.Colors;

    function GetBuFont(fontFamily) {
      document.body.style.fontFamily = fontFamily;
    }
    function setGradient( Ctop, Ccenter, Cbottom ) {
      document.body.style.background = `linear-gradient(to bottom, ${Ctop}, ${Ccenter}, ${Cbottom})`;
    }
  
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





    calanderColor()
    SetCalanderColors()
    renderCalanderBlock();
    setGradient( top, center, bottom )
    GetBuFont(Buissnes.UBU.font);

  }


  setContent()
  setAllcolors()
}

applyBranding()

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

function checkworkoutLocationValue() {
  const value = workoutLocation;
  return value === "Gym" ? "GymWorkout" : "homeWorkout";
}
//console.log(checkworkoutLocationValue());

// Function to fetch workouts
async function getWorkouts() {
  try {
    const workoutDocId = checkworkoutLocationValue();
    const docRef = doc(db, "RevolApp", workoutDocId); // ✅ Create reference directly
    const docSnap = await getDoc(docRef);             // ✅ Use getDoc on the reference

    if (docSnap.exists()) {
      return docSnap.data();                          // ✅ Return document data
    } else {
      console.error("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
}

async function SetMealPlanBtn() {
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
SetMealPlanBtn().then((data) => {
  const App = data.App;
  const MealPlanBtn = App.MealPlanBtn;
  const EventBtn = App.Btns;
  const Icon = MealPlanBtn.Icon;
  const EventIcon = EventBtn.EventBtns;
  const IncentiveIcon = EventBtn.IncentiveBtns;

  function setBuIcon(imgSrc, imgAlt, urlImg)  {
      // Find the img element with id 'logo-img'
      const img = document.getElementById(urlImg);
  
      // Check if the img element exists
      if (img) {
          // Set the image source and alternative text
          img.src = imgSrc;
          img.alt = imgAlt;
      } else {
          console.error("Image element with id 'logo-img' not found.");
      }
  }
  
  setBuIcon(Icon, 'Example image', 'mPlan');  
  setBuIcon(IncentiveIcon[0], 'Example image', 'MPartnerships'); 
  setBuIcon(EventIcon[0], 'Example image', 'MEvents'); 

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
    { buttonType: "homeBtns", divId: "home", imgSrcIndex: 1, redirectUrl: "index9.html" },
    { buttonType: "DateBtns", divId: "Date", imgSrcIndex: 0, redirectUrl: "index9.2.html" },
    { buttonType: "GoalBtns", divId: "goals", imgSrcIndex: 1, redirectUrl: "index9.3.html" },
    { buttonType: "StatBtns", divId: "stats", imgSrcIndex: 1, redirectUrl: "index9.4.html" },
    { buttonType: "GearBtns", divId: "gear", imgSrcIndex: 1, redirectUrl: "index9.5.html" },
  ];

  buttonsConfig.forEach(({ buttonType, divId, imgSrcIndex, redirectUrl }) => {
    createButton(buttonType, divId, imgSrcIndex, redirectUrl);
  });
});

document.addEventListener('touchstart', function (event) {
  if (event.touches.length > 1) {
    event.preventDefault(); // Prevents zooming
  }
}, { passive: false });