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



// list of tiers (Beginner, Intermediate, Advance)




console.log("Transferred User Info:", transferreduserInfo);
console.log("Transferred Info:", transferredInfo);

// Call the function with the correct string arguments
checkDocumentExists("RevoBuissnes", transferredInfo);


function getTierInfoFromStorage() {
  const storedData = localStorage.getItem("SlotChosen"); // Retrieve stored data

  if (storedData) {
    return JSON.parse(storedData); // Convert JSON string back to object
 }
  return null; // Return null if no data found
}

// Example Usage
const tierInfo = getTierInfoFromStorage();


async function checkDocumentExists(collectionName, documentId) {
  try {
    // Use `doc` to get a document reference
    const docRef = doc(db, collectionName, documentId);
  
    // Fetch the document snapshot
    const docSnap = await getDoc(docRef);
  
    // Check if the document exists and log the result
    if (docSnap.exists()) {
      console.log(`Document found:`, docSnap.data());
    } else {
      console.log(`No document found with ID: ${documentId}`);
    }
  } catch (error) {
    console.error("Error checking document:", error);
  }
  } 
async function SetHearderImg() {
  try {
    const docRef = doc(db, "RevolApp", "Content"); // Ensure db and transferredInfo are initialized
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
SetHearderImg().then((data) => {

  
  function setBuIcon(imgSrc, imgAlt) {
      // Find the img element with id 'logo-img'
      const img = document.getElementById('header');
  
      // Check if the img element exists
      if (img) {
          // Set the image source and alternative text
          img.src = imgSrc;
          img.alt = imgAlt;
      } else {
          console.error("Image element with id 'logo-img' not found.");
      }
  }
 
  setBuIcon(data.Images.SubImg, 'Example image'); 

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
  const AppIcons = data.AppIcons;
  
  const UBU = data.UBU;
  const { DarkLogo, LightLogo } = UBU.BuLogos;
  function GetBuFont(fontFamily) {
    document.body.style.fontFamily = fontFamily;
   }
   GetBuFont(data.UBU.font);
  
  function setBuIcon(imgSrc, imgAlt, elementUrl) {
      // Find the img element with id 'logo-img'
      const img = document.getElementById(elementUrl);
  
      // Check if the img element exists
      if (img) {
          // Set the image source and alternative text
          img.src = imgSrc;
          img.alt = imgAlt;
      } else {
          console.error("Image element with id 'logo-img' not found.");
      }
  }

   
  

  setBuIcon(LightLogo, 'Example image', 'logo');  
  setBuIcon(AppIcons.SubIcon, 'Example image', "Return");  
  

});















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





async function fetchData() {
  try {
    const tiersRef = doc(db, "RevolApp", "Tiers");
    const businessRef = doc(db, "RevoBuissnes", transferredInfo);

    const [tiersSnap, businessSnap] = await Promise.all([
      getDoc(tiersRef),
      getDoc(businessRef)
    ]);

    if (!tiersSnap.exists() || !businessSnap.exists()) {
      console.error("One or more documents do not exist!");
      return null;
    }

    return {
      tiers: tiersSnap.data(),
      business: businessSnap.data()
    };
  } catch (error) {
    console.error("Error fetching documents:", error);
    return null;
  }
}

fetchData().then((data) => {
  if (!data) return;
  const Tdata = tierInfo
  const Title = tierInfo.Tittle
  const Time = tierInfo.Time
  const tiers = data.tiers
  const Bdata = data.business
  const UBU = Bdata.UBU;
  const { top, bottom } = UBU.BackgroundColor;
  const { Base, Prime1, Prime2, Prime3, Prime4 } = UBU.Colors;

  
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
      const benefits = tiers.Tier1.Points

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

      const benefits = tiers.Tier2.Points

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
      const benefits = tiers.Tier3.Points

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
});







RenderText("Tier", tierInfo.Tittle);

RenderFullPrice(tierInfo.Cuttemcy ,"Price", tierInfo.Price);



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
enableScrollInDiv();





const mp = new MercadoPago('YOUR_PUBLIC_KEY', { locale: 'es-AR' });




mp.bricks().create("cardPayment", "cardPaymentBrick_container", {
  initialization: {
      amount: 100, // Amount to be charged
  },
  customization: {
      visual: {
          style: "default",
      },
  },
  callbacks: {
      onReady: () => {
          console.log("Brick ready");
      },
      onSubmit: (cardFormData) => {
          return fetch("/process_payment", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(cardFormData),
          })
          .then(response => response.json())
          .then(result => {
              console.log("Payment processed", result);
          })
          .catch(error => console.error(error));
      },
      onError: (error) => {
          console.error("Payment error", error);
      }
  },
});















