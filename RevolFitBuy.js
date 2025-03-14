// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore, doc, getDoc, collection, addDoc, setDoc  } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBc3B7SM_Itr9LRCv8N3_tbl9BglxHKo-M",
  authDomain: "revofit-ad7c3.firebaseapp.com",
  projectId: "revofit-ad7c3",
  storageBucket: "revofit-ad7c3.appspot.com",
  messagingSenderId: "643801118133",
  appId: "1:643801118133:web:d679abc998a18f7077d5fc",
  measurementId: "G-E6P96D0M6Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);


// Retrieve data from localStorage
const transferreduserInfo = localStorage.getItem("transferreduserInfo");
const transferredInfo = localStorage.getItem("transferredInfo");
const SelectedCurrency = localStorage.getItem('SelectedCurrency');

console.log("Transferred User Info:", transferreduserInfo);
console.log("Transferred Info:", transferredInfo);
console.log("Transferred currency:", SelectedCurrency);
// Call the function with the correct string arguments
checkDocumentExists("RevoBuissnes", transferredInfo);

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
      const img = document.getElementById('hImg');
  
      // Check if the img element exists
      if (img) {
          // Set the image source and alternative text
          img.src = imgSrc;
          img.alt = imgAlt;
      } else {
          console.error("Image element with id 'logo-img' not found.");
      }
  }
 
  setBuIcon(data.Images.SubImg, 'Climing rope'); 


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

  const { DarkLogo, LightLogo } = data.UBU.BuLogos;
  

  function setBuIcon(imgSrc, imgAlt) {
      // Find the img element with id 'logo-img'
      const img = document.getElementById('buLogo');
  
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

async function SetColors() {
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
SetColors().then((data) => {
  const UBU = data.UBU;
  const { top, bottom } = UBU.BackgroundColor;
  const { Base, Prime1, Prime2, Prime3, Prime4 } = UBU.Colors;
 
  function GetBuFont(fontFamily) {
    document.body.style.fontFamily = fontFamily;
   }
   GetBuFont(data.UBU.font);

  function changeBackgroundColor(color, Bgurl, opacity = 0.5) {
    const Bg = document.getElementById(Bgurl);
    
    // Convert hex color to RGBA with transparency
    function hexToRGBA(hex, alpha) {
        let r = parseInt(hex.substring(1, 3), 16);
        let g = parseInt(hex.substring(3, 5), 16);
        let b = parseInt(hex.substring(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    // If the color is in HEX format, convert it to RGBA
    if (color.startsWith("#")) {
        color = hexToRGBA(color, opacity);
    }

    Bg.style.backgroundColor = color;
  }
  function setGradient(color1, color2) {
    document.body.style.background = `linear-gradient(to bottom, ${color1}, ${color2})`;
  }
  function setTextColor(color, HtextUrl){
    const headerText = document.getElementById(HtextUrl);
    if (headerText) {
      headerText.style.color = color;
    }
  }


  changeBackgroundColor(Prime4, "hearderText", 0.4);
 
  setTextColor(Prime1, 'title')
  setTextColor(Prime1, 'subtitle')
  

//changeBackgroundImg(Prime1, Base, 'BackBtn'); // Example color change

  setGradient(top, bottom); 
  
});

function checkTransferredInfo() {
  const planDiv = document.getElementById("Slot0");

  if (transferredInfo === "RevolFit") {
    planDiv.style.display = "block";  
  } else {
    planDiv.style.display = "none";
      
  }
}

// Call the function to check and hide or show the plan div
checkTransferredInfo();

























for (let i = 0; i <= 3; i++) {
  document.getElementById(`Slot${i}`).addEventListener("click", function () {
    const shidden = document.getElementById(`S${i === 0 ? "" : i}Hidden`);
    
    // Toggle display property
    shidden.style.display = shidden.style.display === "none" ? "block" : "none";
  });
}
















async function getBuCurrency() {
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
getBuCurrency().then((data) => {
 const Bucurrency = data.Subscription.Currency


});







async function getSlotInfo() {
  try {
      const docRef = doc(db, "RevolApp", "Tiers");
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
const exchangeRates = {
  "USD": 1,
  "CAD": 1.4215,
  "MXN": 21.4363,
  "ARS": 1060.0000,
  "BRL": 5.7457,
  "CLP": 943.9600,
  "COP": 4115.1200,
  "PEN": 3.7457
};
const currencySymbols = {
  "USD": "USD",
  "CAD": "CAD",
  "MXN": "MXN",
  "ARS": "ARS",
  "BRL": "BRL",
  "CLP": "CLP",
  "COP": "COP",
  "PEN": "PEN"
};
function convertPrices(T1Price, T2Price, T3Price) {
  const currencySelect = document.getElementById("currency");
  const selectedCurrency = currencySelect.value;
  const exchangeRate = exchangeRates[selectedCurrency] || 1; // Default to 1 if USD
  const currencySymbol = currencySymbols[selectedCurrency] || "$"; // Default to "$" if not found

  const convertedT1 = (T1Price * exchangeRate).toFixed(2);
  const convertedT2 = (T2Price * exchangeRate).toFixed(2);
  const convertedT3 = (T3Price * exchangeRate).toFixed(2);

  return {
      T1: convertedT1,
      T2: convertedT2,
      T3: convertedT3,
      C1: currencySymbol,
      C2: currencySymbol,
      C3: currencySymbol
  };
}
document.getElementById("convert").addEventListener("click", function() {
  // Assuming data contains the original prices in USD
  const data = {
      Tier1: { MonthlyCost: 13 },
      Tier2: { MonthlyCost: 22 },
      Tier3: { MonthlyCost: 40 }
  };
  
  const convertedPrices = convertPrices(data.Tier1.MonthlyCost, data.Tier2.MonthlyCost, data.Tier3.MonthlyCost);
  console.log("Converted Prices:", convertedPrices);

  document.getElementById("S1price").textContent = `$${convertedPrices.T1}`;
  document.getElementById("S2price").textContent = `$${convertedPrices.T2}`;
  document.getElementById("S3price").textContent = `$${convertedPrices.T3}`;
  document.getElementById("S1currency").textContent = convertedPrices.C1;
  document.getElementById("S2currency").textContent = convertedPrices.C2;
  document.getElementById("S3currency").textContent = convertedPrices.C3;
});
// Main logic
getSlotInfo().then((data) => {
  if (!data) return;
  
  const T1Price = data.Tier1.MonthlyCost;
  const T2Price = data.Tier2.MonthlyCost;
  const T3Price = data.Tier3.MonthlyCost;
  
  function RenderInfo(Text, Url){
    const Info  = document.getElementById(Url);

    Info.textContent = Text

  }

  // Function to render items as <li> elements with icons within the <ul>
  // Counter to generate unique IDs
  let counter = 0;

  // Function to render items as <li> elements with icons and unique IDs within the <ul>
  function renderListItems(items, url) {
    // Get the <ul> element by its ID
    const ul = document.getElementById(url);
 
    // Iterate over the items array
    items.forEach(item => {
      // Increment the counter for unique ID generation
      counter++;
 
      // Create a new <li> element
      const li = document.createElement('li');
      // Set a unique ID for the <li>
      li.id = `feature-${counter}`;
 
      // Create a new <i> element for the Font Awesome icon
      const icon = document.createElement('i');
      // Add the Font Awesome classes to the <i> element
      icon.className = 'fas fa-check';
      // Set a unique ID for the <i>
      icon.id = `icon-${counter}`;
 
      // Append the icon to the <li>
      li.appendChild(icon);
      // Add a space between the icon and the text
      li.appendChild(document.createTextNode(' '));
      // Set the text content of the <li>
      li.appendChild(document.createTextNode(item));
 
      // Append the <li> to the <ul>
      ul.appendChild(li);


    });
  }
   

    

  // Call the function to render the list items
  renderListItems(data.Tier0.Points, 'SfeatureList');
  renderListItems(data.Tier1.Points, 'S1featureList');
  renderListItems(data.Tier2.Points, 'S2featureList');
  renderListItems(data.Tier3.Points, 'S3featureList');

  // Initial render in USD
  RenderInfo(`$${T1Price}`, "S1price");
  RenderInfo(`$${T2Price}`, "S2price");
  RenderInfo(`$${T3Price}`, "S3price");

  RenderInfo(data.Tier0.Tittle, "STittle");
  RenderInfo(data.Tier1.Tittle, "S1Tittle");
  RenderInfo(data.Tier2.Tittle, "S2Tittle");
  RenderInfo(data.Tier3.Tittle, "S3Tittle");

  RenderInfo(data.Tier1.Coin, "S1currency");
  RenderInfo(data.Tier2.Coin, "S2currency");
  RenderInfo(data.Tier3.Coin, "S3currency");

  RenderInfo(data.Tier0.Btn, "SBtn");
  RenderInfo(data.Tier1.Btn, "S1Btn");
  RenderInfo(data.Tier2.Btn, "S2Btn");
  RenderInfo(data.Tier3.Btn, "S3Btn");
  




















});

































async function SetToggleColors() {
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
SetToggleColors().then((data) => {
  const UBU = data.UBU;
  const { top, bottom } = UBU.BackgroundColor;
  const { Base, Prime1, Prime2, Prime3, Prime4 } = UBU.Colors;

  function SetBGColor(Bgurl, color, Bcolor){
    const Bg = document.getElementById(Bgurl);
    Bg.style.background = color;
    Bg.style.border = `solid .5px ${Bcolor}`;
  }
  SetBGColor("toggle-container", Prime1, Prime4)
  SetBGColor("toggle-bg", Base)
  
});

document.addEventListener("DOMContentLoaded", function() {
  const toggleBtn = document.getElementById("toggleBtn");
  const toggleBg = document.querySelector(".toggle-bg");
  const monthlyText = document.querySelector(".toggle-option.monthly");
  const yearlyText = document.querySelector(".toggle-option.yearly");
  const S1time = document.getElementById("S1time");
  const S2time = document.getElementById("S2time");
  const S3time = document.getElementById("S3time");
  const S1price = document.getElementById("S1price");
  const S2price = document.getElementById("S2price");
  const S3price = document.getElementById("S3price");

  function extractNumber(text) {
    return parseFloat(text.replace(/[^0-9.]/g, "")) || 0;
  }

  function updateBasePrices() {
    return {
      S1: extractNumber(S1price.textContent),
      S2: extractNumber(S2price.textContent),
      S3: extractNumber(S3price.textContent)
    };
  }

  function updateToggle() {
    const basePrices = updateBasePrices(); // Get latest prices before applying changes

    if (toggleBtn.checked) {
      toggleBg.style.left = "50%";
      monthlyText.style.color = "#888";
      yearlyText.style.color = "white";
      S1time.textContent = "/Annual";
      S2time.textContent = "/Annual";
      S3time.textContent = "/Annual";
      
      S1price.textContent = `$${(basePrices.S1-(basePrices.S1*.10)).toFixed(2)}`;
      S2price.textContent = `$${(basePrices.S2-(basePrices.S2*.15)).toFixed(2)}`;
      S3price.textContent = `$${(basePrices.S3-(basePrices.S3*.20)).toFixed(2)}`;
    } else {
      toggleBg.style.left = "5px";
      monthlyText.style.color = "white";
      yearlyText.style.color = "#888";
      S1time.textContent = "/Mensual";
      S2time.textContent = "/Mensual";
      S3time.textContent = "/Mensual";
      
      S1price.textContent = `$${((basePrices.S1)/(1-.10)).toFixed(2)}`;
      S2price.textContent = `$${((basePrices.S2)/(1-.15)).toFixed(2)}`;
      S3price.textContent = `$${((basePrices.S3)/(1-.20)).toFixed(2)}`;
    }
  }

  toggleBtn.addEventListener("change", updateToggle);
  updateToggle();
});










async function SetPricingColors() {
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
SetPricingColors().then((data) => {
  const UBU = data.UBU;
  const { top, bottom } = UBU.BackgroundColor;
  const { Base, Prime1, Prime2, Prime3, Prime4, Prime5, Prime6} = UBU.Colors;
  
  function changePlanBackgroundColor(color,borderColor, Tcolor, BgUrl) {
    // Select all elements with class "plan"
    const plans = document.querySelectorAll(BgUrl);
    
    // Loop through each element and change its background color
    plans.forEach(plan => {
        plan.style.backgroundColor = color;
        plan.style.color = Tcolor;
        plan.style.border = `.1px solid ${borderColor}`;
       
    });
  }
  function changebadgeColor(color, Tcolor, Bgurl) {
    const plan = document.getElementById(Bgurl);
      plan.style.backgroundColor = color;
      plan.style.color = Tcolor;
  }
  function changeTextColor(color, Turl) {
    // Select all elements with class "plan"
    const plans = document.querySelectorAll(Turl);
    
    // Loop through each element and change its background color
    plans.forEach(plan => {
        plan.style.color = color;
        
    });
  }
  function changeAllIconsColor(color) {
    document.querySelectorAll("i").forEach(icon => {
        icon.style.color = color;
    });
  }


  function changeColors( Tcolor, BgUrl) {
   
   // Select all elements with class "plan"

   const plans = document.querySelectorAll(BgUrl); 
   // Loop through each element and change its background color
   plans.forEach(plan => {

     plan.style.color = Tcolor;

      
   });




}

changeAllIconsColor(Prime1)
  changeColors(Base , ".featureList")
  changeTextColor(Base, '.Ptittle')
  changeTextColor(Base, '.price')
  changeTextColor(Prime6, '.PriceBlock')
  


  changePlanBackgroundColor(Prime3, Prime4,' ','.plan')
  changePlanBackgroundColor(Prime1, Base, Base,".pBtn")
  changebadgeColor(Prime1, Base,"popular-badge")
  
});






document.getElementById("SBtn").addEventListener("click", function() {
  const Tittle = document.getElementById("STittle");
  const price = document.getElementById("Sprice");
  const Time = document.getElementById("Stime");
  const Scurrency = document.getElementById("Scurrency");
  const featureList = document.getElementById("S3featureList");
  
  function extractNumber(text) {
    return parseFloat(text.replace(/[^0-9.]/g, "")) || 0;
  }
  function extractText(text) {
    return text ? text.textContent.trim() : null;
  }


  function updateBasePrices() {
    return {
      Tittle:   extractText(Tittle),
      Price:    extractNumber(price.textContent),
      Cuttemcy: extractText(Scurrency),
      Time:     extractText(Time),
      List:     extractText(featureList)

    };
  }
  function GetTierInfo() {
    const basePrices = updateBasePrices(); // Get latest prices
    localStorage.setItem("SlotChosen", JSON.stringify(basePrices)); // Store as JSON
    console.log(basePrices);
  }
  GetTierInfo()
  console.log("Contact Sales button clicked!");
   window.location.href = "index4.1.html"; // Change to your actual page URL
});

document.getElementById("S1Btn").addEventListener("click", function() {
    const Tittle = document.getElementById("S1Tittle");
    const price = document.getElementById("S1price");
    const Time = document.getElementById("S1time");
    const Scurrency = document.getElementById("S1currency");
    const featureList = document.getElementById("S1featureList");

    
    function extractNumber(text) {
      return parseFloat(text.replace(/[^0-9.]/g, "")) || 0;
    }
    function extractText(text) {
      return text ? text.textContent.trim() : null;
    }


    function updateBasePrices() {
      return {
        Tittle:   extractText(Tittle),
        Price:    extractNumber(price.textContent),
        Cuttemcy: extractText(Scurrency),
        Time:     extractText(Time),
        List:     extractText(featureList)
      };
    }
    function GetTierInfo() {
      const basePrices = updateBasePrices(); // Get latest prices
      localStorage.setItem("SlotChosen", JSON.stringify(basePrices)); // Store as JSON
      console.log(basePrices);
    }
    GetTierInfo()
    console.log("Contact Sales button clicked!");
     window.location.href = "index4.1.html"; // Change to your actual page URL
  });

document.getElementById("S2Btn").addEventListener("click", function() {
    const Tittle = document.getElementById("S2Tittle");
    const price = document.getElementById("S2price");
    const Time = document.getElementById("S2time");
    const Scurrency = document.getElementById("S2currency");
    const featureList = document.getElementById("S2featureList");
    
    function extractNumber(text) {
      return parseFloat(text.replace(/[^0-9.]/g, "")) || 0;
    }
    function extractText(text) {
      return text ? text.textContent.trim() : null;
    }


    function updateBasePrices() {
      return {
        Tittle:   extractText(Tittle),
        Price:    extractNumber(price.textContent),
        Cuttemcy: extractText(Scurrency),
        Time:     extractText(Time),
        List:     extractText(featureList)

      };
    }
    function GetTierInfo() {
      const basePrices = updateBasePrices(); // Get latest prices
      localStorage.setItem("SlotChosen", JSON.stringify(basePrices)); // Store as JSON
      console.log(basePrices);
    }
    GetTierInfo()
    console.log("Contact Sales button clicked!");
     window.location.href = "index4.1.html"; // Change to your actual page URL
  });

document.getElementById("S3Btn").addEventListener("click", function() {
    const Tittle = document.getElementById("S3Tittle");
    const price = document.getElementById("S3price");
    const Time = document.getElementById("S3time");
    const Scurrency = document.getElementById("S3currency");
    const featureList = document.getElementById("S3featureList");
    
    function extractNumber(text) {
      return parseFloat(text.replace(/[^0-9.]/g, "")) || 0;
    }
    function extractText(text) {
      return text ? text.textContent.trim() : null;
    }


    function updateBasePrices() {
      return {
        Tittle:   extractText(Tittle),
        Price:    extractNumber(price.textContent),
        Cuttemcy: extractText(Scurrency),
        Time:     extractText(Time),
        List:     extractText(featureList)

      };
    }
    function GetTierInfo() {
      const basePrices = updateBasePrices(); // Get latest prices
      localStorage.setItem("SlotChosen", JSON.stringify(basePrices)); // Store as JSON
      console.log(basePrices);
    }
    GetTierInfo() 
    console.log("Contact Sales button clicked!");
     window.location.href = "index4.1.html"; // Change to your actual page URL
  });
















// Update flag image when currency selection changes
const currencySelect = document.getElementById("currency");
const flagImg = document.getElementById("currency-flag");

currencySelect.addEventListener("click", function() {
  const selectedOption = currencySelect.options[currencySelect.selectedIndex];
  flagImg.src = `https://flagcdn.com/w40/${selectedOption.dataset.flag}.png`;
});







