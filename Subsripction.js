// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc, serverTimestamp, collection, addDoc, setDoc  } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

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


// Fetch Firebase configuration
async function fetchFirebaseConfig() {
  try {
    console.log("Fetching Firebase config...");
    const response = await fetch("http://localhost:3000/firebase-config"); // Change when deploying
    if (!response.ok) throw new Error("Failed to fetch Firebase config");
    return await response.json();
  } catch (error) {
    console.error("Error fetching Firebase config:", error);
    return null;
  }
}

// Initialize Firestore
async function initializeFirebase() {
  if (db) return; // Prevent duplicate initialization

  try {
    const firebaseConfig = await fetchFirebaseConfig();
    if (!firebaseConfig) throw new Error("Firebase config is undefined");

    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);

    console.log("Firestore initialized");
  } catch (error) {
    console.error("Error initializing Firebase:", error);
  }
}
 // Retrieve data from localStorage
 const transferreduserInfo = localStorage.getItem("transferreduserInfo");
 const transferredInfo = localStorage.getItem("transferredBu");
 const SelectedCurrency = localStorage.getItem("SelectedCurrency");

// Ensure Firebase is initialized before proceeding
initializeFirebase().then(async () => {
  // Retrieve data from localStorage
  const transferreduserInfo = localStorage.getItem("transferreduserInfo");
  const transferredInfo = localStorage.getItem("transferredBu");
  const SelectedCurrency = localStorage.getItem("SelectedCurrency");

  console.log("Transferred User Info:", transferreduserInfo);
  console.log("Transferred Info:", transferredInfo);
  console.log("Transferred currency:", SelectedCurrency);

  // Check if the document exists only if transferredInfo is not null
  if (transferredInfo) {
    await checkDocumentExists("RevoBuissnes", transferredInfo);
  }

  // Apply branding
  await applyBranding();
});

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
    console.log(`Checking document: ${collectionName}/${documentId}`);

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document found:", docSnap.data());
      return docSnap.data();
    } else {
      console.log(`No document found with ID: ${documentId}`);
      return null;
    }
  } catch (error) {
    console.error("Error checking document:", error);
    return null;
  }
}

function getTierInfoFromStorage() {
  const storedData = localStorage.getItem("SlotChosen"); // Retrieve stored data

  if (storedData) {
    return JSON.parse(storedData); // Convert JSON string back to object
 }
  return null; // Return null if no data found
}
const tierInfo = getTierInfoFromStorage();

// Apply branding
async function applyBranding() {
  const Content = await checkDocumentExists("RevolApp", "Content");
  const Tiers = await checkDocumentExists("RevolApp", "Tiers");
  const Buissnes = await checkDocumentExists("RevoBuissnes", transferredInfo);
  const BuLogo = Buissnes.BuLogos.Simple[3];
  const { top, bottom } = Buissnes.BuColors.BackgroundColor;
  const { Base, Prime1, Prime2, Prime3, Prime4 } = Buissnes.BuColors.Colors;
  
  function setImgs(imgSrc, imgAlt, urlId) {
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
  function GetBuFont(fontFamily) {
   document.body.style.fontFamily = fontFamily;
  }
  function RenderText(elementId, text) {
    let element = document.getElementById(elementId);
    if (element) {
      element.textContent = text;
    } else {
      console.error("Element not found:", elementId);
    }
  }
  function RenderFullPrice(currency, elementId, text) {
    let element = document.getElementById(elementId);
  
    if(currency=== "USD"){
      const h1 = document.createElement("h1");
      h1.textContent = `$${text}`;
      
      const h3 = document.createElement("h3");
      h3.textContent = "USD";
      
      element.appendChild(h1);
      element.appendChild(h3);
  
    }else if(currency=== "CAD"){
      const h1 = document.createElement("h1");
      h1.textContent = `$${text}`;
      
      const h3 = document.createElement("h3");
      h3.textContent = "CAD";
      
      element.appendChild(h1);
      element.appendChild(h3);
  
  
    }else if(currency=== "MXN"){
      const h1 = document.createElement("h1");
      h1.textContent = `$${text}`;
      
      const h3 = document.createElement("h3");
      h3.textContent = "MXN";
      
      element.appendChild(h1);
      element.appendChild(h3);
    }else if(currency=== "ARS"){
      const h1 = document.createElement("h1");
      h1.textContent = `$${text}`;
      
      const h3 = document.createElement("h3");
      h3.textContent = "ARS";
      
      element.appendChild(h1);
      element.appendChild(h3);
  
    }else if(currency=== "BRL"){
      const h1 = document.createElement("h1");
      h1.textContent = `$${text}`;
      
      const h3 = document.createElement("h3");
      h3.textContent = "BRL";
      
      element.appendChild(h1);
      element.appendChild(h3);
  
    }else if(currency=== "CLP"){
      const h1 = document.createElement("h1");
      h1.textContent = `$${text}`;
      
      const h3 = document.createElement("h3");
      h3.textContent = "CLP";
      
      element.appendChild(h1);
      element.appendChild(h3);
  
    }else if(currency=== "COP"){
      const h1 = document.createElement("h1");
      h1.textContent = `$${text}`;
      
      const h3 = document.createElement("h3");
      h3.textContent = "COP";
      
      element.appendChild(h1);
      element.appendChild(h3);
  
    }else if(currency=== "PEN"){
      const h1 = document.createElement("h1");
      h1.textContent = `$${text}`;
      
      const h3 = document.createElement("h3");
      h3.textContent = "PEN";
      
      element.appendChild(h1);
      element.appendChild(h3);
  
    }
  }
  function fetchTierData() {
   const Tdata = tierInfo
   const Title = tierInfo.Tittle
   const Time = tierInfo.Time
   const tiers = Tiers.tiers
   
   function setGradient(color1, color2) {
    document.body.style.background = `linear-gradient(to bottom, ${color1}, ${color2})`;
   }

   function setBackgroundColor(color, Tcolor, Url) {
    const Bg = document.getElementById(Url);
    if (Bg) {
      Bg.style.background = color;
      Bg.style.color = Tcolor;
      Bg.style.border = `1px solid ${Prime2}`;
    }
   }

   function setBackground(color, Url) {
    const Bg = document.getElementById(Url);
    if (Bg) {
      Bg.style.background = color;
      Bg.style.border = `1px solid ${Prime2}`;
    }
   }

   function RenderDiscount(Title, Time, elementId, element2Id, color, Url, Ccolor, Dcolor) {
    let element = document.getElementById(elementId);
    let element2 = document.getElementById(element2Id);
    const Bg = document.getElementById(Url);
    if (!element || !Bg) return;

    if (Title === "Supera") {
      if (Time === "/Mensual") {
        const h1 = document.createElement("h1");
        h1.textContent = "🔥 ¡El Plan Anual = Los Mayores Ahorros!";

        

        Bg.style.background = "";
        Bg.style.fontSize = ".4rem";
        Bg.style.margin = ".5rem 0";
        element.appendChild(h1);
        
      } else {
        const h1 = document.createElement("h1");
        h1.textContent = "-10%";
        Bg.style.background = color;
        Bg.style.width = "4rem";
        Bg.style.height = "1.8rem";
        Bg.style.color  = Dcolor;
        Bg.style.fontSize = ".4rem";
        element.appendChild(h1);
      }
      const benefits = Tiers.Tier1.Points

      const ul = document.createElement("ul");
      ul.style.listStyle = "none"; // Remove default bullets
      

      benefits.forEach(benefit => {
        const li = document.createElement("li");
        const checkmark = document.createElement("span");
        checkmark.classList.add("checkmark");
        checkmark.innerHTML = "✔";
        checkmark.style.color = Ccolor; // Apply color to the checkmark
    
        li.appendChild(checkmark);
        li.innerHTML += ` ${benefit}`;
        ul.appendChild(li);
      });
    
      element2.appendChild(ul);


    }else if(Title === "Domina") {
      if (Time === "/Mensual") {
        const h1 = document.createElement("h1");
        h1.textContent = "🔥 ¡El Plan Anual = Los Mayores Ahorros!";
        Bg.style.background = "";
        Bg.style.fontSize = ".4rem";
        Bg.style.margin = ".5rem 0";
        element.appendChild(h1);
      } else {
        const h1 = document.createElement("h1");
        h1.textContent = "-15%";
        Bg.style.background = color;
        Bg.style.width = "4rem";
        Bg.style.height = "1.8rem";
        Bg.style.fontSize = ".4rem";
        Bg.style.color  = Dcolor;
        element.appendChild(h1);
      }

      const benefits = Tiers.Tier2.Points

      const ul = document.createElement("ul");
      ul.style.listStyle = "none"; // Remove default bullets
      

      benefits.forEach(benefit => {
            const li = document.createElement("li");
            const checkmark = document.createElement("span");
            checkmark.classList.add("checkmark");
            checkmark.innerHTML = "✔";
            checkmark.style.color = Ccolor; // Apply color to the checkmark
        
            li.appendChild(checkmark);
            li.innerHTML += ` ${benefit}`;
            ul.appendChild(li);
          });  

      element2.appendChild(ul);
    }else if(Title === "Conquista") {
      if (Time === "/Mensual") {
        const h1 = document.createElement("h1");
        h1.textContent = "🔥 ¡El Plan Anual = Los Mayores Ahorros!";
        Bg.style.background = "";
        Bg.style.fontSize = ".4rem";
        Bg.style.margin = ".5rem 0";
        element.appendChild(h1);
      } else {
        const h1 = document.createElement("h1");
        h1.textContent = "-20%";
        Bg.style.background = color;
        Bg.style.width = "4rem";
        Bg.style.height = "1.8rem";
        Bg.style.fontSize = ".4rem";
        Bg.style.color = Dcolor;
        element.appendChild(h1);
      }
      const benefits = Tiers.Tier3.Points

      const ul = document.createElement("ul");
      ul.style.listStyle = "none"; // Remove default bullets
      

      benefits.forEach(benefit => {
            const li = document.createElement("li");
            const checkmark = document.createElement("span");
            checkmark.classList.add("checkmark");
            checkmark.innerHTML = "✔";
            checkmark.style.color = Ccolor; // Apply color to the checkmark
        
            li.appendChild(checkmark);
            li.innerHTML += ` ${benefit}`;
            ul.appendChild(li);
          });  

      element2.appendChild(ul);
    }
   }
   function setTextcolor(Tcolor, Url){
    const Bg = document.getElementById(Url);
    if (Bg) {
      Bg.style.color = Tcolor;
    }
   }
 

   setTextcolor(Base, "Price")
   RenderDiscount(Title, Time, "Discount", "Features", "#E01E1E", "Discount", Base, Prime2);
   setGradient(top, bottom);
   setBackgroundColor(Base, Prime2, "Tier");
   setBackground(Prime2, "CBlock");

  }
  function enableScrollInDiv() {
    const scrollBlock = document.getElementById("ScrollBlock");
    if (!scrollBlock) {
        console.error("Element with ID 'ScrollBlock' not found.");
        return;
    }
  
    scrollBlock.addEventListener("wheel", (event) => {
        event.preventDefault();
        scrollBlock.scrollTop += event.deltaY;
    });
  }
  // Call the function to enable scrolling
  fetchTierData()
  RenderText("Tier", tierInfo.Tittle);
  RenderFullPrice(tierInfo.Cuttemcy ,"Price", tierInfo.Price);
  enableScrollInDiv();
  GetBuFont(Buissnes.Font);
  setImgs(Content.Images.SubImg, 'Climing rope','header'); 
  setImgs(BuLogo, 'Example image',"logo"); 
  setImgs(Buissnes.AppIcons.ReturnIcon, Buissnes.BuLogos.LogoText.description,"Return");  
}