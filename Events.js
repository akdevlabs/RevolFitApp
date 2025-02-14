// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore, doc, getDoc, collection, addDoc, setDoc, Timestamp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

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

async function SetBuBtns() {
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
SetBuBtns().then((data) => {
  const App = data.App;

  const Btns = App.Btns;

  const Icons = Btns.CalanderBtn;



  function setBuIcon(imgSrc, imgAlt, imgId) {
      // Find the img element with id 'logo-img'
      const img = document.getElementById(imgId);
  
      // Check if the img element exists
      if (img) {
          // Set the image source and alternative text
          img.src = imgSrc;
          img.alt = imgAlt;
      } else {
          console.error("Image element with id 'logo-img' not found.");
      }
  }
  
  setBuIcon(Icons, 'Example image', "Calander");  
  

});


















async function CalanderColors() {
  try {
      const docRef = doc(db, "RevoBuissnes", transferredInfo);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
          return docSnap.data();
      } else {
          console.error("No such document!");
          return null;
      }
  } catch (error) {
      console.error("Error fetching document:", error);
      return null;
  }
}

async function renderWeeklyCalendar() {
  const data = await CalanderColors();
  if (!data) return;

  const UBU = data.UBU;
  const { top, bottom } = UBU.BackgroundColor;
  const { Base, Prime1,Prime2  } = UBU.Colors;

  const daysContainer = document.getElementById("days-container");
  let currentDate = new Date();
  const today = new Date().setHours(0, 0, 0, 0);

  function getWeekDates(date) {
      const startOfWeek = new Date(date);
      startOfWeek.setDate(date.getDate() - ((date.getDay() + 6) % 7)); // Start on Monday
      return Array.from({ length: 7 }, (_, i) => {
          const day = new Date(startOfWeek);
          day.setDate(startOfWeek.getDate() + i);
          return day;
      });
  }

  function updateCalendar() {
      daysContainer.innerHTML = "";
      const weekDates = getWeekDates(currentDate);

      weekDates.forEach(date => {
          const isActive = date.setHours(0, 0, 0, 0) === today;
          const dayElement = document.createElement("div");
          dayElement.className = "day";
          dayElement.id = `day-${date.getDate()}`;
          //dayElement.style.backgroundColor = isActive ? bottom : "transparent";
          dayElement.innerHTML = `<span style="font-size: ${isActive ? '1.6rem' : '1.2rem'}; color: ${isActive ? top : Prime2}; font-weight: ${isActive ? 'bold' : 'normal'};">
                                  ${date.toLocaleString('es-ES', { weekday: 'short' })}
                                </span>
                                <span style="font-size: ${isActive ? '3.5rem' : '1.3rem'}; color: ${isActive ? Base : Prime1}; font-weight: bold;">
                                  ${date.getDate()}
                                </span>`;
          daysContainer.appendChild(dayElement);
      });
  }

  let touchStartX = 0;
  let touchEndX = 0;

  daysContainer.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
  });

  daysContainer.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].clientX;
      handleSwipe();
  });

  function handleSwipe() {
      if (touchEndX < touchStartX) {
          currentDate.setDate(currentDate.getDate() + 7);
      } else if (touchEndX > touchStartX) {
          currentDate.setDate(currentDate.getDate() - 7);
      }
      updateCalendar();
  }

  updateCalendar();
}

document.addEventListener("DOMContentLoaded", renderWeeklyCalendar);














// Assuming db and transferredInfo are initialized somewhere above
async function RenderSlots() {
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

// The RenderSlots function will fetch the data and then process it
RenderSlots().then((data) => {
  if (!data) return; // Exit if no data is returned

  const Events = data.Events;

  // Function to count the items in an object
  function countItems(obj) {
    return Object.keys(obj).length;
  }

  // Function to check the timestamp validity
  function checkTstamp(tstamp) {
    const eventTime = tstamp instanceof Timestamp ? tstamp.toDate() : new Date(tstamp);
    const readableTime = formatTimestamp(eventTime);
    console.log(`Formatted Tstamp: ${readableTime}`);
    const currentTime = new Date();
    
    // Check if the event time is today or in the future
    return eventTime.toDateString() === currentTime.toDateString() || eventTime > currentTime;
  }

  // Function to format the timestamp
  function formatTimestamp(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;  // Month is 0-indexed, so add 1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
  }
   // Function to format the timestamp
   function formatTimestampDay() {
    const day = date.getDate();
    return `${day}`;
  }


  
  // Function to get valid slots
  function getGoodSlots(obj) {
    const itemCount = countItems(obj);
    const goodSlots = [];

    for (let i = 1; i <= itemCount; i++) {
      const slotKey = `slot${i}`;
      if (obj[slotKey] && obj[slotKey].Tstamp) {
        const tstamp = obj[slotKey].Tstamp;
        if (checkTstamp(tstamp)) {
          goodSlots.push({
            ...obj[slotKey],
            day: new Date(tstamp).getDate(), // Extract day from timestamp
            month: new Date(tstamp).getMonth() + 1 // Extract month from timestamp (1-indexed)
          });
        }
      }
    }

    return goodSlots;
  }

  // Function to render the slots
  function createSlots(data) {
    const container = document.getElementById("slotsContainer");
    container.innerHTML = "";  // Clear any existing slots

    data.forEach((event, index) => {
      const slotId = index + 1;
      
      const slot = document.createElement("div");
      slot.className = "slot";
      slot.id = `slot${slotId}`;
      
      slot.innerHTML = `
        <div class="top">
          <div class="DateTimeBlock">
            <div class="dateBlock">
              <span class="SDate" id="S${slotId}Date">${event.Day}</span> <!-- Day of the event -->
              <span class="SMonth" id="S${slotId}Month">${event.Month}</span> <!-- Month of the event -->
            </div>
            <a class="STime" id="S${slotId}Time">${event.Time}</a>
          </div>
          <img class="like" id="S${slotId}like" src="${event.likeIcon}" alt="Like">
        </div>
        
        <div class="center">
          <h1 class="Stittle" id="S${slotId}tittle">${event.Tittle}</h1>
          <h2 class="SLocation" id="S${slotId}Location">${event.Location}</h2>
        </div>
        
        <div class="bottom">
          <img class="SImg" id="S${slotId}Img" src="${event.Img}" alt="Event Image">
        </div>
      `;
      
      container.appendChild(slot);
    });
  }
  function scrollToBottom() {
    const container = document.getElementById("slotsContainer");
    container.scrollTop = container.scrollHeight; // Scroll to the bottom
  }
  // Get only the good slots and render them
  const goodSlots = getGoodSlots(Events);
  createSlots(goodSlots);
  scrollToBottom();
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
  const { Base, Prime1, Prime2, Prime3, Prime4 } = UBU.Colors;



function changeBackgroundImg(color, Tcolor, SBtn) {
  const Btn = document.getElementById(SBtn);
  if (Btn) {
    Btn.style.backgroundColor = color;
    Btn.style.color = Tcolor;
  } else {
    console.error("Element not found:", SBtn);
  }
}
function setGradient(color1, color2) {
  document.body.style.background = `linear-gradient(to bottom, ${color1}, ${color2})`;
}
function changeBackgroundImg(color, SBtn) {
  const Btn = document.getElementById(SBtn);
  if (Btn) {
    Btn.style.backgroundColor = color;
  } else {
    console.error("Element not found:", SBtn);
  }
}



changeBackgroundImg(Prime1, Base, 'BackBtn'); // Example color change
changeBackgroundImg(Base, 'Calander')
setGradient(top, bottom); 
 

});

async function setTittleColor() {
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
setTittleColor().then((data) => {
  const UBU = data.UBU;

  const { Base, Prime1, Prime2, Prime3 } = UBU.Colors;


  function setTittleColor(BtnUrl) {
    const tittle = document.getElementById(BtnUrl);
    if (tittle) {
      tittle.style.color = Base  ;
    } else {
      console.error(`Element with id "${BtnUrl}" not found.`);
    }
    
  }



  setTittleColor('Toptittle') 




});
document.addEventListener('touchstart', function (event) {
  if (event.touches.length > 1) {
    event.preventDefault(); // Prevents zooming
  }
}, { passive: false });
