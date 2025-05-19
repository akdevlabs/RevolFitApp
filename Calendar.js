// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  updateDoc, 
  serverTimestamp, 
  collection, 
  addDoc,
  arrayUnion, 
  setDoc  } 
  from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBc3B7SM_Itr9LRCv8N3_tbl9BglxHKo-M",
  authDomain: "revofit-ad7c3.firebaseapp.com",
  projectId: "revofit-ad7c3",
  storageBucket: "revofit-ad7c3.appspot.com",
  messagingSenderId: "643801118133",
  appId: "1:643801118133:web:d679abc998a18f7077d5fc",
  measurementId: "G-E6P96D0M6Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
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
  const UserInfo = await checkDocumentExists("users",transferreduserInfo);
  
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
    setBgImgs(Buissnes.BuLogos.Simple[0], Buissnes.BuLogos.LogoText.description, 'logo')
  }
  function setAllcolors(){
    const UBU = Buissnes.BuColors;
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

    
    function parseEventString(input) {
      // coerce to string so .split() never blows up
      const str = String(input);
      const [datePart, ...eventParts] = str.split(' ');
      const [month, day, year] = datePart
        .split('/')
        .map(n => parseInt(n, 10));
      const key = `${year}-${month}-${day}`;      // "2025-6-19"
      const eventName = eventParts.join(' ');
      return { [key]: [eventName] };
    }
    
    /**
     * Take multiple inputs (array or object) and merge into one calendar object.
     *
     * @param {string[]|object} inputs
     *   - If it's an array, each element is one raw event‐string.
     *   - If it's an object, we use its values as raw event‐strings.
     *
     * @returns {object}  { "YYYY-M-D": [ ...events ] }
     */
    function parseEvents(inputs) {
      // Normalize to a flat array of strings:
      const list = Array.isArray(inputs)
        ? inputs
        : typeof inputs === 'object' && inputs !== null
          ? Object.values(inputs)
          : [inputs];
    
      return list.reduce((calendar, raw) => {
        const parsed = parseEventString(raw);
        for (const dateKey in parsed) {
          // init array if needed
          if (!calendar[dateKey]) calendar[dateKey] = [];
          // append all events for this date
          calendar[dateKey].push(...parsed[dateKey]);
        }
        return calendar;
      }, {});
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

        const SocialEvent = UserInfo.Events.SocialEvent;
        const MealPlanEvent = UserInfo.Events.MealPlanEvent
        const WorkoutEvent = UserInfo.Events.WorkoutEvent
        


        const EventBase = parseEvents(SocialEvent)
    
        const WorkoutBase = parseEvents(WorkoutEvent)
    
        const MealPlanBase = parseEvents(MealPlanEvent)
    
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
        async function openEventPopup(date) {
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
          function formatDateString(input) {
            // Split the input into date and title parts
            const [datePart, ...titleParts] = input.split(" ");
            const [year, month, day] = datePart.split("-");
          
            // Join back the rest as the title
            const title = titleParts.join(" ");
          
            // Format to dd/mm/yyyy
            const formattedDate = `${day}/${month}/${year}`;
          
            // Return the final string
            return `${formattedDate} ${title}`;
          }
        
          addEventButton.onclick = async () => {
            const eventTitle = eventTitleInput.value.trim();
            const eventType = eventTypeSelect.value;
        
            if (!eventTitle) return;
        
            const newEvent = `${date} ${eventTitle}`;
            if (!EventBase[date]) {
              EventBase[date] = [];
            }
            EventBase[date].push(newEvent);
        
            console.log(`Nuevo evento agregado el ${date}: ${newEvent}`);
            renderCalendar();
            overlay.style.display = 'none';
            eventPopup.style.display = 'none';
        
            const userId = transferreduserInfo;
            if (!userId) {
              console.error("No user ID available.");
              return;
            }
        
            let fieldToUpdate;
            switch (eventType) {
              case "Social":
                fieldToUpdate = "SocialEvent";
                break;
              case "Workout":
                fieldToUpdate = "WorkoutEvent";
                break;
              case "MealPlan":
                fieldToUpdate = "MealPlanEvent";
                break;
              default:
                console.error("Tipo de evento desconocido.");
                return;
            }
        
            const eventsDocRef = doc(db, "users", userId);
            const output = formatDateString(newEvent);
            try {
              await updateDoc(eventsDocRef, {
                [`Events.${fieldToUpdate}`]: arrayUnion(output)
              }, { merge: true });
        
              console.log(`Evento agregado en '${fieldToUpdate}': ${output}`);
            } catch (error) {
              console.error("Error al guardar el evento en Firestore:", error);
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
    GetBuFont(Buissnes.font);

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
  const Check = data.AppIcons.MealPlanBtn.Check;
  const IncentiveIcon = data.AppIcons.Partnerships.IncentiveBtn;
  const EventIcon = data.AppIcons.Events.EventBtn;

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
  
  setBuIcon(Check, 'CheckList icon', 'mPlan');  
  setBuIcon(IncentiveIcon[0], 'Partnership Icon', 'MPartnerships'); 
  setBuIcon(EventIcon, 'Event Icon', 'MEvents'); 

});
async function SetControlBar() {
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
SetControlBar().then((data) => {
  const Buissnes = data;

  function createButton({ buttonType, divId, imgSrcIndex, redirectUrl, imgAlt = "Example image" }, Buttons) {
    const buttonGroup = Buttons[buttonType];
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
  function setControlBar() {
    if (
      !Buissnes ||
      !Buissnes.AppIcons ||
      !Buissnes.AppIcons.ControlBar
    ) {
      console.error("ControlBar data is not available.");
      return;
    }

    const { Goals, Home, Settings, Stats ,Calander} = Buissnes.AppIcons.ControlBar;

    const Buttons = {
      homeBtns: Home,
      DateBtns: Calander, // Adjust as needed
      GoalBtns: Goals,
      StatBtns: Stats,
      GearBtns: Settings, // Adjust as needed
    };

    const buttonsConfig = [
      { buttonType: "homeBtns", divId: "home", imgSrcIndex: 0, redirectUrl: "index9.html" },
      { buttonType: "DateBtns", divId: "Date", imgSrcIndex: 1, redirectUrl: "index9.2.html" },
      { buttonType: "GoalBtns", divId: "goals", imgSrcIndex: 0, redirectUrl: "index9.3.html" },
      { buttonType: "StatBtns", divId: "stats", imgSrcIndex: 0, redirectUrl: "index9.4.html" },
      { buttonType: "GearBtns", divId: "gear", imgSrcIndex: 0, redirectUrl: "index9.5.html" },
    ];

    buttonsConfig.forEach((config) => createButton(config, Buttons));
  }

setControlBar()


});













