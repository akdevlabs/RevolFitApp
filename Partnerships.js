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
const transferredInfo = localStorage.getItem("transferredBu");
const workoutLocation = getNewestWorkoutLocation();

console.log("Transferred User Info:", transferreduserInfo);
console.log("Transferred Info:", transferredInfo);
console.log(workoutLocation)

async function applyBranding() {
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
applyBranding().then((data) => {
  const App = data.AppIcons.Partnerships;
  const { bottom, center, top } = data.BuColors.BackgroundColor;
  const { Base, Prime1, Prime2, Prime3, Prime4, Prime5, Prime6 } = data.BuColors.Colors;

  function GetBuFont(fontFamily) {
    document.body.style.fontFamily = fontFamily;
  }
  function setImages(UrlId, imgSrc, imgAlt) {
    const img = document.getElementById(UrlId);
    if (img) {
      img.src = imgSrc;
      img.alt = imgAlt;
    } else {
      console.error(`Image element with id '${UrlId}' not found.`);
    }
  }
  function setGradient(color1, color2) {
    document.body.style.background = `linear-gradient(to bottom, ${color1}, ${color2})`;
  }
  function setBtnColors(selector, color, text, BgColor) {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      elements.forEach((element) => {
        element.style.color = text;
        element.style.borderRadius = ".5rem";
        element.style.backgroundColor = BgColor;
        element.style.border = `2px solid ${color}`;
      });
    } else {
      console.warn(`No elements found with selector "${selector}".`);
    }
  }
  function changeBackgroundColor(color, SBtn, percentage) {
    const element = document.getElementById(SBtn);
    if (element) {
      element.style.background = `linear-gradient(to right, ${color} ${percentage}%, transparent)`;
    } else {
      console.error("Element not found:", SBtn);
    }
  }
  function changeBackgroundColorByClass(color, className) {
    const elements = document.getElementsByClassName(className);
    if (elements.length > 0) {
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = color;
      }
    } else {
      console.error("Elements not found:", className);
    }
  }
  function addBorder() {
    const blocks = document.querySelectorAll(".blocks");
    blocks.forEach(block => {
      block.style.border = `.5px solid ${Prime4}`;
    });
  }
  function applyTransparentBackgroundToBlock(urlId, color, scale) {
    const block = document.querySelector(urlId);
    if (block) {
      const transparentColor = makeTransparent(color, scale);
      block.style.backgroundColor = transparentColor;
    }
  }
  function makeTransparent(color, scale) {
    const rgba = hexToRgba(color);
    return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${scale})`;
  }
  function hexToRgba(hex) {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }
    return { r, g, b };
  }
  function setTittleColor(className) {
    const titles = document.querySelectorAll(className);
    if (titles.length > 0) {
      titles.forEach((title) => {
        title.style.color = Base || '#013948';
      });
    } else {
      console.error(`Elements with selector "${className}" not found.`);
    }
  }

  // === EXECUTION SECTION ===
  GetBuFont(data.Font);
  applyTransparentBackgroundToBlock('#Start-Block', Prime6, 0.5);
  setImages("Return", data.AppIcons.ReturnIcon, "Return Icon");
  setImages("logo", data.BuLogos.Simple[1], data.BuLogos.LogoText.description);
  setImages("GymImg", App.GymBtns, "Weight Icon");
  setImages("ProductImg", App.ProductBtns, "Product Icon");
  setImages("SuplimentImg", App.SupplementBtns, "Supplement Icon");
  setImages("NutricionistaImg", App.NutritionBtns, "Nutrition Icon");
  addBorder();
  changeBackgroundColor(top, "gyms", 70);
  changeBackgroundColor(top, "products", 70);
  changeBackgroundColor(top, "Supliments", 70);
  changeBackgroundColor(top, "Nutricionistas", 70);
  changeBackgroundColorByClass(Prime1, "gyms");
  changeBackgroundColorByClass(Prime1, "blocksImgs");
  setGradient(top, bottom);
  setTittleColor('.Tittles') 
});





async function SetContent() {
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
SetContent().then((data) => {
  const Partnerships = data.Partnerships;

  function rendercontent(data) {
    const container = document.getElementById(data.urlBlock);
    if (!container) return;
  
    const imgElement = container.querySelector(data.urlImg);
    const spanElement = container.querySelector(data.urlspan);
    const titleElement = container.querySelector(data.urltitle);
  
    if (imgElement)   imgElement.src = data.image || "";
    if (spanElement)  
      spanElement.textContent = "Descuento:" +" "+ data.Discount+"%"|| "";
      spanElement.style.color = data.spanColor;


    if (titleElement) 
      
      titleElement.textContent = data.title || "";
      titleElement.style.color = data.tittleColor;
  
    if (data.backgroundColor) {
        container.style.backgroundColor = data.backgroundColor;
    }
    if (data.borderColor) {
        container.style.border = `2px solid ${data.borderColor}`;
    }
  
    if (data.link) {
        container.style.cursor = "pointer";
        container.addEventListener("click", () => {
            
            window.open(data.link, "_blank");
        });
    }
  }
  function renderGym(){
    const {slot1, slot2, slot3 ,slot4} = Partnerships.Gyms

    const S1colors = slot1.colors
    const S2colors = slot2.colors
    const S3colors = slot3.colors
    const S4colors = slot4.colors

    // Example usage:
    rendercontent({
      urlBlock: "GymBslot1",
      urlImg:   "#GBS1Img",
      urltitle: "#GBS1tittle",
      urlspan:  "#GBS1Discount",
      image:    slot1.logo,
      title:    slot1.tittle,
      link:     slot1.link,
      Discount: slot1.Discount,
      spanColor: S1colors[1],
      tittleColor: S1colors[1],
      backgroundColor: S1colors[0],
      borderColor: S1colors[1]

    });
    rendercontent({
      urlBlock: "GymBslot2",
      urlImg:   "#GBS2Img",
      urltitle: "#GBS2tittle",
      urlspan:  "#GBS2Discount",
      image:    slot2.logo,
      title:    slot2.tittle,
      link:     slot2.link,
      Discount: slot2.Discount,
      spanColor: S2colors[1],
      tittleColor: S2colors[1],
      backgroundColor: S2colors[0],
      borderColor: S2colors[1]

    });
    rendercontent({
      urlBlock: "GymBslot3",
      urlImg:   "#GBS3Img",
      urltitle: "#GBS3tittle",
      urllink:  "#GBS3Link",
      urlspan:  "#GBS3Discount",
      image:    slot3.logo,
      title:    slot3.tittle,
      link:     slot3.link, 
      Discount: slot3.Discount,
      spanColor: S3colors[1],
      tittleColor: S3colors[1],
      backgroundColor: S3colors[0],
      borderColor: S3colors[1]

    });
    rendercontent({
      urlBlock: "GymBslot4",
      urlImg:   "#GBS4Img",
      urltitle: "#GBS4tittle",
      urllink:  "#GBS4Link",
      urlspan:  "#GBS4Discount",
      image:    slot4.logo,
      title:    slot4.tittle,
      link:     slot4.link,
      Discount: slot4.Discount,
      spanColor: S4colors[1],
      tittleColor: S4colors[1],
      backgroundColor: S4colors[0],
      borderColor: S4colors[1]

    });
  }
  function renderProducts(){
    const {slot1, slot2, slot3 ,slot4} = Partnerships.Products

    const S1colors = slot1.colors
    const S2colors = slot2.colors
    const S3colors = slot3.colors
    const S4colors = slot4.colors
    




    // Example usage:
    rendercontent({
      urlBlock: "ProductBslot1",
      urlImg:   "#PBS1Img",
      urltitle: "#PBS1tittle",
      urllink:  "#PBS1Link",
      urlspan:  "#PBS1Discount",
      image:    slot1.logo,
      title:    slot1.tittle,
      link:     slot1.link,
      Discount: slot1.Discount,
      spanColor: S1colors[1],
      tittleColor: S1colors[1],
      backgroundColor: S1colors[0],
      borderColor: S1colors[1]


    });
    rendercontent({
      urlBlock: "ProductBslot2",
      urlImg:   "#PBS2Img",
      urltitle: "#PBS2tittle",
      urllink:  "#PBS2Link",
      urlspan:  "#PBS2Discount",
      image:    slot2.logo,
      title:    slot2.tittle,
      link:     slot2.link,
      Discount: slot2.Discount,
      spanColor: S2colors[1],
      tittleColor: S2colors[1],
      backgroundColor: S2colors[0],
      borderColor: S2colors[1]

    });


    rendercontent({
      urlBlock: "ProductBslot3",
      urlImg:   "#PBS3Img",
      urltitle: "#PBS3tittle",
      urllink:  "#PBS3Link",
      urlspan:  "#PBS3Discount",
      image:    slot3.logo,
      title:    slot3.tittle,
      link:     slot3.link,
      Discount: slot3.Discount,
      spanColor: S3colors[1],
      tittleColor: S3colors[1],
      backgroundColor: S3colors[0],
      borderColor: S3colors[1]

    });
    rendercontent({
      urlBlock: "ProductBslot4",
      urlImg:   "#PBS4Img",
      urltitle: "#PBS4tittle",
      urllink:  "#PBS4Link",
      urlspan:  "#PBS4Discount",
      image:    slot4.logo,
      title:    slot4.tittle,
      link:     slot4.link,
      Discount: slot4.Discount,  
      spanColor: S4colors[1],
      tittleColor: S4colors[1],
      backgroundColor: S4colors[0],
      borderColor: S4colors[1]

    });
    
  }
  function renderSupliments(){
    const {slot1, slot2, slot3 ,slot4} = Partnerships.Supliments

    
    const S1colors = slot1.colors
    const S2colors = slot2.colors
    const S3colors = slot3.colors
    const S4colors = slot4.colors
    




    // Example usage:
    rendercontent({
      urlBlock: "SuplimentBslot1",
      urlImg:   "#SBS1Img",
      urltitle: "#SBS1tittle",
      urllink:  "#SBS1Link",
      urlspan:  "#SBS1Discount",
      image:    slot1.logo,
      title:    slot1.tittle,
      link:     slot1.link,
      Discount: slot1.Discount, 
      spanColor: S1colors[1],
      tittleColor: S1colors[1],
      backgroundColor: S1colors[0],
      borderColor: S1colors[1]


    });
    rendercontent({
      urlBlock: "SuplimentBslot2",
      urlImg:   "#SBS2Img",
      urltitle: "#SBS2tittle",
      urllink:  "#SBS2Link",
      urlspan:  "#SBS2Discount",
      image:    slot2.logo,
      title:    slot2.tittle,
      link:     slot2.link,
      Discount: slot2.Discount,
      spanColor: S2colors[1],
      tittleColor: S2colors[1],
      backgroundColor: S2colors[0],
      borderColor: S2colors[1]


    });

    rendercontent({
      urlBlock: "SuplimentBslot3",
      urlImg:   "#SBS3Img",
      urltitle: "#SBS3tittle",
      urllink:  "#SBS3Link",
      urlspan:  "#SBS3Discount",
      image:    slot3.logo,
      title:    slot3.tittle,
      link:     slot3.link,
      Discount: slot3.Discount, 
      spanColor: S3colors[1],
      tittleColor: S3colors[1],
      backgroundColor: S3colors[0],
      borderColor: S3colors[1]

    });

    rendercontent({
      urlBlock: "SuplimentBslot4",
      urlImg:   "#SBS4Img",
      urltitle: "#SBS4tittle",
      urllink:  "#SBS4Link",
      urlspan:  "#SBS4Discount",
      image:    slot4.logo,
      title:    slot4.tittle,
      link:     slot4.link,
      Discount: slot4.Discount,
      spanColor: S4colors[1],
      tittleColor: S4colors[1],
      backgroundColor: S4colors[0],
      borderColor: S4colors[1]


    });



  }
  function renderNutricion(){
    const {slot1, slot2, slot3 ,slot4} = Partnerships.Nutricion

    const S1colors = slot1.colors
    const S2colors = slot2.colors
    const S3colors = slot3.colors
    const S4colors = slot4.colors
    

    // Example usage:
    rendercontent({
      urlBlock: "NutricionBslot1",
      urlImg:   "#NBS1Img",
      urltitle: "#NBS1tittle",
      urlspan:  "#NBS1Discount",
      image:    slot1.logo,
      title:    slot1.tittle,
      link:     slot1.link,
      Discount: slot1.Discount,
      spanColor: S1colors[1],
      tittleColor: S1colors[1],
      backgroundColor: S1colors[0],
      borderColor: S1colors[1]


    });
    rendercontent({
      urlBlock: "NutricionBslot2",
      urlImg:   "#NBS2Img",
      urltitle: "#NBS2tittle",
      urlspan:  "#NBS2Discount",
      image:    slot2.logo,
      title:    slot2.tittle,
      link:     slot2.link,
      Discount: slot2.Discount,
      spanColor: S2colors[1],
      tittleColor: S2colors[1],
      backgroundColor: S2colors[0],
      borderColor: S2colors[1]


    });
    rendercontent({
      urlBlock: "NutricionBslot3",
      urlImg:   "#NBS3Img",
      urltitle: "#NBS3tittle",
      urlspan:  "#NBS3Discount",
      image:    slot3.logo,
      title:    slot3.tittle,
      link:     slot3.link, 
      Discount: slot3.Discount,
      spanColor: S3colors[1],
      tittleColor: S3colors[1],
      backgroundColor: S3colors[0],
      borderColor: S3colors[1]


    });
    rendercontent({
      urlBlock: "NutricionBslot4",
      urlImg:   "#NBS4Img",
      urltitle: "#NBS4tittle",
      urlspan:  "#NBS4Discount",
      image:    slot4.logo,
      title:    slot4.tittle,
      link:     slot4.link,
      Discount: slot4.Discount,
      spanColor: S4colors[1],
      tittleColor: S4colors[1],
      backgroundColor: S4colors[0],
      borderColor: S4colors[1]


    });
    
  }

  renderGym()
  renderProducts()
  renderSupliments()
  renderNutricion()
 
});


document.addEventListener("DOMContentLoaded", function () {
  function changeTitle(text) {
      document.getElementById("tittle").textContent = text;
  }
  
  function showBlock(showId) {
      document.getElementById("BtnBlock").style.display = "none";
      document.getElementById(showId).style.display = "flex";
  }



 // Call the function to create the elements

 const btnBlock = document.getElementById("BtnBlock");
 const blocks = document.querySelectorAll(".blocks");
 const homeButton = document.getElementById("Return");

 blocks.forEach(block => {
     block.addEventListener("click", function () {
         console.log("Clicked on:", this.id); // Logs the clicked block's ID
         if(this.id === "Gym"){
           homeButton.style.display = "block";
           document.getElementById("GymBlock").style.display = "flex";
          
         }else if(this.id === "Product"){
            homeButton.style.display = "block";
            document.getElementById("ProductBlock").style.display = "flex";
 
         }else if(this.id === "Supliment"){
           homeButton.style.display = "block";
           document.getElementById("SuplimentBlock").style.display = "flex";

         }else if(this.id === "Nutricion"){
           homeButton.style.display = "block";
           document.getElementById("NutricionistaBlock").style.display = "flex";
         }




         btnBlock.style.display = "none"; // Hides the BtnBlock section
     });
 });

    

  
  document.getElementById("Return").addEventListener("click", function () {
      changeTitle("Colaboraciones");
      showBlock("BtnBlock");
      document.getElementById("GymBlock").style.display = "none";
      document.getElementById("ProductBlock").style.display = "none";
      document.getElementById("SuplimentBlock").style.display = "none";
      document.getElementById("NutricionistaBlock").style.display = "none";
      btnBlock.style.display = "block"; 
      homeButton.style.display = "none";
  });
});



document.addEventListener('touchstart', function (event) {
  if (event.touches.length > 1) {
    event.preventDefault(); // Prevents zooming
  }
}, { passive: false });
