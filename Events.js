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
const transferredInfo = localStorage.getItem("transferredBu");
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
  
  setBuIcon(data.BuLogos.Simple[0],  data.BuLogos.LogoText.description);  
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
  
  setBuIcon(data.Event.CalanderBtn, 'Example image', "Calander");  
  

});
































// Assuming db and transferredInfo are initialized somewhere above
async function RenderSlots() {
  try {
    const docRef = doc(db, "RevoBuissnes", transferredInfo);
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

RenderSlots().then((data) => {
  if (!data || !data.Events) return;

  const Events = data.Events;
   console.log(Events)

  const like = data.Event.LikeIcon

  function countItems(obj) {
    return Object.keys(obj).length;
  }
  const count = countItems(Events)

  function checkTstamp(tstamp) {
    const eventTime = tstamp instanceof Timestamp ? tstamp.toDate() : new Date(tstamp);
    const currentTime = new Date();
    return eventTime.toDateString() === currentTime.toDateString() || eventTime > currentTime;
  }
  function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  function getGoodSlots(obj) {
    const goodSlots = [];
    for (let i = 1; i <= countItems(obj); i++) {
      const slotKey = `slot${i}`;
      const slot = obj[slotKey];
      if (slot && slot.Tstamp) {
        const tstamp = slot.Tstamp instanceof Timestamp ? slot.Tstamp.toDate() : new Date(slot.Tstamp);
        if (checkTstamp(tstamp)) {
          goodSlots.push({
            ...slot,
            dateObject: tstamp,
            Day: tstamp.getDate(),
            Month: tstamp.getMonth() + 1,
            Time: formatTime(tstamp),
            slotId: slotKey
          });
        }
      }
    }
    return goodSlots.sort((a, b) => a.dateObject - b.dateObject);
  }

  function createSlots(data) {
    const container = document.getElementById("slotsContainer");
    container.innerHTML = "";


    data.forEach((event, index) => {
      const slotId = index + 1;
      const slot = document.createElement("div");
      slot.className = "slot";
      slot.id = `slot${slotId}`;

      slot.innerHTML = `
        <div class="top">
          <div class="DateTimeBlock">
            <div class="dateBlock">
              <span class="SDate" id="S${slotId}Date">${event.EventDate.Date[0]}</span>
              <span class="SMonth" id="S${slotId}Month">${event.EventDate.Date[1]}</span>
            </div>
            <a class="STime" id="S${slotId}Time">${event.EventDate.Time}</a>
          </div>
          <img class="like" id="S${slotId}like" src="${like[1] || ''}" alt="Like">
        </div>
        <div class="center">
          <h1 class="Stittle" id="S${slotId}tittle">${event.Tittle || ''}</h1>
          <h2 class="SLocation" id="S${slotId}Location">${event.Location || ''}</h2>
        </div>
        <div class="bottom">
          <img class="SImg" id="S${slotId}Img" src="${event.EventImgs.Img || ''}" alt="Event Image">
        </div>
      `;

      slot.addEventListener("click", () => {
        localStorage.setItem("selectedSlot", JSON.stringify(event));
        window.location.href = "index9.2.5.html";
      });

      container.appendChild(slot);
    });
  }
  
  function scrollToBottom() {
    const container = document.getElementById("slotsContainer");
    container.scrollTop = container.scrollHeight;
  }

  console.log(count)
  
  createSlots(getGoodSlots(data.Events))
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
 
  const { top, bottom } = data.BuColors.BackgroundColor;
  const { Base, Prime1, Prime2, Prime3, Prime4 } = data.BuColors.Colors;



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
  function setTittleColor(BtnUrl) {
    const tittle = document.getElementById(BtnUrl);
    if (tittle) {
      tittle.style.color = Base  ;
    } else {
      console.error(`Element with id "${BtnUrl}" not found.`);
    }
    
  }

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



  setTittleColor('Toptittle') 



  changeBackgroundImg(Prime1, Base, 'BackBtn'); // Example color change

  setGradient(top, bottom); 
 

});





















document.addEventListener('touchstart', function (event) {
  if (event.touches.length > 1) {
    event.preventDefault(); // Prevents zooming
  }
}, { passive: false });
