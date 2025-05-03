
// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore, doc, getDoc, collection, addDoc, setDoc, Timestamp, arrayUnion, updateDoc  } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

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

const selectedSlot = localStorage.getItem("selectedSlot");


console.log(transferreduserInfo)



async function ApplyBranding() {
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
ApplyBranding().then((data) => {
 
  const { top, bottom } = data.BuColors.BackgroundColor;
  const { Base, Prime1, Prime2, Prime3, Prime4 } = data.BuColors.Colors;

  function changeBackgroundColor(color, Tcolor, UrlId) {
    const Btn = document.getElementById(UrlId);
    if (Btn) {
      Btn.style.backgroundColor = color;
      Btn.style.color = Tcolor;
    } else {
      console.error("Element not found:", SBtn);
    }
  }
  changeBackgroundColor(Prime1, Base, "Top")
  changeBackgroundColor(Base, Prime1, "Return")
  changeBackgroundColor(Base, Prime1, "Card")

  changeBackgroundColor(Prime1, Base,"SetBtn")
});








// Fetch user document data
async function BtnAction() {
  try {
    const docRef = doc(db, "users", transferreduserInfo);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.error("No such user document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user document:", error);
    return null;
  }
}

// Fetch event/business data and render it
async function ApplyContent() {
  try {
    const businessDocRef = doc(db, "RevoBuissnes", transferredInfo);
    const businessDocSnap = await getDoc(businessDocRef);
    const userData = await BtnAction();

    if (!businessDocSnap.exists()) {
      console.error("No such document in RevoBuissnes!");
      return;
    }

    if (!userData) {
      console.error("Failed to load user data.");
      return;
    }

    const businessData = businessDocSnap.data();
    const Event = selectedSlot;
    const Base = JSON.parse(Event);

    // Utility functions
    const renderText = (text, id) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
      else console.error(`Element with ID '${id}' not found.`);
    };

    const setBgImgs = (src, alt, id) => {
      const img = document.getElementById(id);
      if (img) {
        img.src = src;
        img.alt = alt;
      } else {
        console.error(`Image element with ID '${id}' not found.`);
      }
    };

    const setMapEmbed = (url) => {
      const iframe = document.getElementById("mapFrame");
      if (iframe) iframe.src = url;
    };

    const setMapLink = (url) => {
      const link = document.getElementById("Map-Link");
      if (link) {
        link.onclick = (e) => {
          e.preventDefault();
          window.open(url, "_blank", "width=800,height=600");
        };
      }
    };

    // Apply dynamic content
    setMapEmbed(Base.Map);
    setMapLink(Base.Map);

    renderText(Base.Tittle, "Main-Tittle");
    renderText(Base.Location, "Adress");
    renderText(Base.EventDate.Date[0], "Day");
    renderText(Base.EventDate.Date[1], "Month");
    renderText(Base.EventDate.Time, "Time");

    setBgImgs(Base.EventImgs.Img, "Event Img", "Event-Img");
    setBgImgs(businessData.AppIcons.Map, "Map Img", "Map-Icon");

    renderText(Base.Host, "Host-Name");
    renderText(Base.Description, "Host-Details");
    renderText(Base.EText, "Text-Event");

    renderText(Base.EventHost.Host, "Host-Name");
    renderText(Base.EventHost.HostText, "Host-Details");
    renderText(Base.EventText.EText, "Text-Event");

    setBgImgs(Base.EventHost.HostImg, "host Img", "Host-Headshot");

    function convertFirestoreTimestampToDate(timestamp) {
      if (!timestamp || typeof timestamp.seconds !== "number") {
        console.error("Invalid Firestore timestamp object.");
        return null;
      }
    
      const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
      const day = String(date.getDate()).padStart(2, "0");
      const year = date.getFullYear();
    
      return `${month}/${day}/${year}`;
    }
    

    const formattedDate = convertFirestoreTimestampToDate(Base.Tstamp);
  



    const saveBtn = document.getElementById("SetBtn");

    if (saveBtn) {
      saveBtn.addEventListener("click", async () => {
        console.log("Guardar evento clicked!");

        try {
          const userId = transferreduserInfo;
          const activeId = formattedDate + " " + Base.Tittle;

          const userRef = doc(db, "users", userId);

          await updateDoc(userRef, {
            "Events.SocialEvent": arrayUnion(activeId)
          });

          alert("¡Evento guardado exitosamente!");
        } catch (error) {
          console.error("Error updating Firestore:", error.message || error);
          alert("❌ Ocurrió un error al guardar el evento. Intenta de nuevo.");
        }
      });
    } else {
      console.error("Element with ID 'SetBtn' not found.");
    }


  } catch (error) {
    console.error("Error in ApplyContent:", error);
  }
}

// Start
ApplyContent();




