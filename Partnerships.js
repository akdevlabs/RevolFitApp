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

  const Btns = App.Partnerships;
  const GymBtns = Btns.GymBtns;
  const SupplementBtns = Btns.SupplementBtns;
  const nutritionBtns = Btns.nutritionBtns;
  const ProductBtns = Btns.ProductBtns;
  const HomeBtns = Btns.homeBtns;
  const Incentive = Btns.IncentiveBtns;
  const Event = Btns.EventBtns;



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
  
  setBuIcon(GymBtns[0], 'Example image', "GymImg");  
  setBuIcon(ProductBtns[0], 'Example image', "ProductImg");  
  setBuIcon(SupplementBtns[0], 'Example image', "SuplimentImg");  
  setBuIcon(nutritionBtns[0], 'Example image', "NutricionistaImg");


  setBuIcon(Incentive[0], 'Example image', "Incentive"); 
  setBuIcon(HomeBtns[0], 'Example image', "home"); 
  setBuIcon(Event[0], 'Example image', "Events"); 

});


async function GetpartnerInfo() {
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
GetpartnerInfo().then((data) => {
  const Partnerships = data.Partnerships;

  function createContBlock(UrlId, Ch1, Lcont, ImgSrc, color1) {
    // Get the existing GymBlock div
    let gymBlock = document.getElementById(UrlId);
    
    // Create a new div inside GymBlock
    let newDiv = document.createElement("div");
    newDiv.id = "newGymContent";
    newDiv.style.backgroundColor = color1; // Apply the dynamic background color
    gymBlock.appendChild(newDiv);
    
    let link = document.createElement("a");
    link.innerText = Lcont;
    link.href = "#";
    link.classList.add("gym-link");
    
    // Create an h1 element
    let heading = document.createElement("h1");
    heading.innerText = Ch1;
    heading.classList.add("gym-heading");
    
    // Create an img element
    let image = document.createElement("img");
    image.src = ImgSrc;
    image.alt = "Gym Image";
    image.classList.add("gym-image");
    
    // Append elements to the new div
    newDiv.appendChild(heading);
    newDiv.appendChild(image);
    newDiv.appendChild(link);
    
    // Add CSS styles
    let style = document.createElement("style");
    style.innerHTML = `
      #newGymContent {
        padding: 20px;
        border-radius: 8px;
        text-align: center;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      .gym-heading {
        font-size: 24px;
        color: #333;
        margin-bottom: 10px;
      }
      .gym-link {
        font-size: 16px;
        color: #007BFF;
        text-decoration: none;
      }
      .gym-link:hover {
        text-decoration: underline;
      }
      .gym-image {
        width: 100%;
        max-width: 300px;
        height: auto;
        margin-bottom: 10px;
        border-radius: 8px;
      }
    `;
    document.head.appendChild(style);
  }

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
            window.location.href = data.link;
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
      document.getElementById("SecondBlock").style.display = "none";
      document.getElementById("ThirdBlock").style.display = "none";
      
      document.getElementById(showId).style.display = "flex";
  }



 // Call the function to create the elements

 const btnBlock = document.getElementById("BtnBlock");
 const blocks = document.querySelectorAll(".blocks");
 const homeButton = document.getElementById("home");

 blocks.forEach(block => {
     block.addEventListener("click", function () {
         console.log("Clicked on:", this.id); // Logs the clicked block's ID
         if(this.id === "Gym"){
           console.log("red")
           document.getElementById("GymBlock").style.display = "block";
          
         }else if(this.id === "Product"){
          console.log("blue")
            document.getElementById("ProductBlock").style.display = "block";
 
         }else if(this.id === "Supliment"){
           console.log("green")
           document.getElementById("SuplimentBlock").style.display = "block";

         }else if(this.id === "Nutricion"){
           console.log("yellow")
           document.getElementById("NutricionistaBlock").style.display = "block";
         }




         btnBlock.style.display = "none"; // Hides the BtnBlock section
     });
 });

    

  
  document.getElementById("Incentive").addEventListener("click", function () {
      changeTitle("Incentive");
      showBlock("SecondBlock");
      document.getElementById("GymBlock").style.display = "none";
      document.getElementById("ProductBlock").style.display = "none";
      document.getElementById("SuplimentBlock").style.display = "none";
      document.getElementById("NutricionistaBlock").style.display = "none";
      btnBlock.style.display = "none"; 
  });
  
  document.getElementById("Events").addEventListener("click", function () {
      changeTitle("Events");
      showBlock("ThirdBlock");
      document.getElementById("GymBlock").style.display = "none";
      document.getElementById("ProductBlock").style.display = "none";
      document.getElementById("SuplimentBlock").style.display = "none";
      document.getElementById("NutricionistaBlock").style.display = "none";
      btnBlock.style.display = "none"; 
  });
  
  document.getElementById("home").addEventListener("click", function () {
      changeTitle("Colaboraciones");
      showBlock("BtnBlock");
      document.getElementById("GymBlock").style.display = "none";
      document.getElementById("ProductBlock").style.display = "none";
      document.getElementById("SuplimentBlock").style.display = "none";
      document.getElementById("NutricionistaBlock").style.display = "none";
      btnBlock.style.display = "flex"; 
  });
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



function changeBackgroundColor(color, SBtn, percentage) {
  const element = document.getElementById(SBtn);
  if (element) {
    element.style.background = `linear-gradient(to right, ${color} ${percentage}%, transparent)`;
  } else {
    console.error("Element not found:", SBtn);
  }
}
function changeBackgroundImg(color, SBtn) {
  const Btn = document.getElementById(SBtn);
  if (Btn) {
    Btn.style.backgroundColor = color;
  } else {
    console.error("Element not found:", SBtn);
  }
}
function changeBackgroundImg(color, className) {
  const elements = document.getElementsByClassName(className);
  if (elements.length > 0) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.backgroundColor = color;
    }
  } else {
    console.error("Elements not found:", className);
  }
}




function setGradient(color1, color2) {
  document.body.style.background = `linear-gradient(to bottom, ${color1}, ${color2})`;
}
function addBorder() {
  const blocks = document.querySelectorAll(".blocks"); // Select all elements with class "blocks"
  blocks.forEach(block => {
      block.style.border = `.5px solid ${Prime4}`;
      
  });
}

addBorder();



changeBackgroundColor(top, "gyms", 70);// Example color change
changeBackgroundColor(top, "products", 70); // Example color change
changeBackgroundColor(top, "Supliments", 70); // Example color change
changeBackgroundColor(top, "Nutricionistas", 70); // Example color change
changeBackgroundImg(Prime1, "gyms"); // Example color change
changeBackgroundImg(Prime1, "blocksImgs"); // Change background color to 
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
      tittle.style.color = Base || '#013948';
    } else {
      console.error(`Element with id "${BtnUrl}" not found.`);
    }
    
  }



  setTittleColor('tittle') 
  setTittleColor('gyms') 
  setTittleColor('products') 
  setTittleColor('Supliments') 
  setTittleColor('Nutricionistas') 



});
document.addEventListener('touchstart', function (event) {
  if (event.touches.length > 1) {
    event.preventDefault(); // Prevents zooming
  }
}, { passive: false });
