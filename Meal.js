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

// Define the function to get items from localStorage
function getFromLocalStorage(key) {
  try {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue); // Parse the JSON string back into an object
    } else {
      console.warn(`No data found in localStorage for key: ${key}`);
      return null; // Return null if no data is found
    }
  } catch (e) {
    console.error("Error retrieving data from localStorage", e);
    return null; // Return null in case of an error
  }
}



// Retrieve data from localStorage
const transferreduserInfo = localStorage.getItem("transferreduserInfo");
const transferredInfo = localStorage.getItem("transferredInfo");
const savedContent = getFromLocalStorage('sContent');

console.log(savedContent);

console.log("Transferred User Info:", transferreduserInfo);
console.log("Transferred Info:", transferredInfo);






function renderPageContent({
  title = "",
  calCount = "",
  platedImgSrc = "",
  recipeTime = "",
  recipeContent = "",
  ingredientBlocks = [],
  ingredientList = [],
}) {
  // Update the title
  const titleElement = document.getElementById("tittle");
  if (titleElement) titleElement.textContent = title;

  const calCountElement = document.getElementById("calCount");
  if (calCountElement) calCountElement.textContent = calCount;

 

  // Update the plated image
  const platedImgElement = document.getElementById("platedImg");
  if (platedImgElement) platedImgElement.src = platedImgSrc;

  // Update the recipe block
  const timeElement = document.getElementById("Time");
  if (timeElement) timeElement.textContent = recipeTime;

  const recipeElement = document.getElementById("Recipe");
  if (recipeElement) recipeElement.innerHTML = recipeContent;

  

  // Update the ingredient list
  const ingListElement = document.getElementById("IngList");
  if (ingListElement) {
    ingListElement.innerHTML = ""; // Clear existing content
    ingredientList.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      ingListElement.appendChild(listItem);
    });
  }
}
  
function renderIngBlocks(){
  // Update the ingredient blocks
  const ingBlocksElement = document.getElementById("Ingblocks");
  if (ingBlocksElement) {
    ingBlocksElement.innerHTML = ""; // Clear existing content
    ingredientBlocks.forEach((block) => {
      // Create a container for each block
      const blockContainer = document.createElement("div");
      blockContainer.style.display = "flex";
      blockContainer.style.alignItems = "center";
      blockContainer.style.marginBottom = "10px";

      // Create the text element
      const textElement = document.createElement("div");
      textElement.textContent = block;
      textElement.style.marginRight = "10px"; // Add some spacing between text and image

      // Create the image element
      const imgElement = document.createElement("img");
      imgElement.src = "path/to/your/image.jpg"; // Replace with the actual image path or URL
      imgElement.alt = block; // Use block text as the alt attribute
      imgElement.style.width = "50px"; // Set a width for the image
      imgElement.style.height = "50px"; // Set a height for the image

      // Append text and image to the container
      blockContainer.appendChild(textElement);
      blockContainer.appendChild(imgElement);

      // Append the container to the parent element
      ingBlocksElement.appendChild(blockContainer);
    });
  }
}


function countItemsInObject(obj) {
  if (typeof obj !== 'object' || obj === null) {
      throw new Error("Input must be a non-null object.");
  }
  return Object.keys(obj).length;
}


// Function to render a carousel into the specified div
function renderCarousel(containerId, items) {
  const container = document.getElementById(containerId);

  if (!container) {
      console.error(`Container with ID '${containerId}' not found.`);
      return;
  }

  // Create carousel wrapper
  const carouselWrapper = document.createElement('div');
  carouselWrapper.className = 'carousel-wrapper';

  // Create inner carousel track
  const carouselTrack = document.createElement('div');
  carouselTrack.className = 'carousel-track';

  // Add items to the carousel track
  items.forEach((item, index) => {
      const carouselItem = document.createElement('div');
      carouselItem.className = 'carousel-item';
      carouselItem.textContent = item; // You can customize this to render images, HTML, etc.
      carouselTrack.appendChild(carouselItem);
  });

  // Add navigation buttons
  const prevButton = document.createElement('button');
  prevButton.className = 'carousel-button prev';
  prevButton.textContent = '<';
  prevButton.onclick = () => moveCarousel(-1);

  const nextButton = document.createElement('button');
  nextButton.className = 'carousel-button next';
  nextButton.textContent = '>';
  nextButton.onclick = () => moveCarousel(1);

  // Add elements to the carousel wrapper
  carouselWrapper.appendChild(prevButton);
  carouselWrapper.appendChild(carouselTrack);
  carouselWrapper.appendChild(nextButton);

  // Clear the container and add the carousel
  container.innerHTML = '';
  container.appendChild(carouselWrapper);

  // Carousel state
  let currentIndex = 0;

  function moveCarousel(direction) {
      const totalItems = items.length;
      currentIndex = (currentIndex + direction + totalItems) % totalItems;

      // Update the transform property to slide the carousel
      const offset = -currentIndex * 100;
      carouselTrack.style.transform = `translateX(${offset}%)`;
  }

  // Apply initial styles
  const styles = document.createElement('style');
  styles.textContent = `
      .carousel-wrapper {
          position: relative;
          overflow: hidden;
          width: 100%;
      }
      .carousel-track {
          display: flex;
          transition: transform 0.5s ease;
      }
      .carousel-item {
          flex: 0 0 100%;
          text-align: center;
      }
      .carousel-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          cursor: pointer;
          padding: 10px;
      }
      .carousel-button.prev {
          left: 10px;
      }
      .carousel-button.next {
          right: 10px;
      }
  `;
  document.head.appendChild(styles);
}








async function SetMealPlan() {
  try {
    const docRef = doc(db, "RevolApp", "MealPlans"); // Ensure db and transferredInfo are initialized
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
  

SetMealPlan().then((data) => {
  const { Diversidad, Vegan, Vegetariano } = data;

  // Extracting meal plan details
  const DBreakfast = Diversidad.Breakfast;
  const DDinner = Diversidad.Dinner;
  const DLunch = Diversidad.Lunch;
  const DSnack = Diversidad.Snack;

  const VeBreakfast = Vegan.Breakfast;
  const VeDinner = Vegan.Dinner;
  const VeLunch = Vegan.Lunch;
  const VeSnack = Vegan.Snack;

  const VBreakfast = Vegetariano.Breakfast;
  const VDinner = Vegetariano.Dinner;
  const VLunch = Vegetariano.Lunch;
  const VSnack = Vegetariano.Snack;

  // The active data to be rendered
  const ActiveDB = DBreakfast;
  
  console.log(DBreakfast);
  console.log(ActiveDB);

  function getTittle(){
    const ActiveDB = savedContent.title;

    if( ActiveDB === "DBreakfast.slot1.tittle"){
      return(DBreakfast.slot1.tittle)
    }else if( ActiveDB === "DBreakfast.slot2.tittle"){
      return(DBreakfast.slot2.tittle)
    }else if( ActiveDB === "DBreakfast.slot3.tittle"){
      return(DBreakfast.slot3.tittle)
    }else if( ActiveDB === "DLunch.slot1.tittle"){
      return(DLunch.slot1.tittle)
    }else if( ActiveDB === "DLunch.slot2.tittle"){
      return(DLunch.slot2.tittle)
    }else if( ActiveDB === "DLunch.slot3.tittle"){
      return(DLunch.slot3.tittle)
    }else if( ActiveDB === "DDinner.slot1.tittle"){
      return(DDinner.slot1.tittle)
    }else if( ActiveDB === "DDinner.slot2.tittle"){
      return(DDinner.slot2.tittle)
    }else if( ActiveDB === "DDinner.slot3.tittle"){
      return(DDinner.slot3.tittle)
    }else if( ActiveDB === "DSnack.slot1.tittle"){
      return(DSnack.slot1.tittle)
    }else if( ActiveDB === "DSnack.slot2.tittle"){
      return(DSnack.slot2.tittle)
    }else if( ActiveDB === "DSnack.slot3.tittle"){
      return(DSnack.slot3.tittle)
    }else if( ActiveDB === "VBreakfast.slot1.tittle"){
      return(VBreakfast.slot1.tittle)
    }else if( ActiveDB === "VBreakfast.slot2.tittle"){
      return(VBreakfast.slot2.tittle)
    }else if( ActiveDB === "VBreakfast.slot3.tittle"){
      return(VBreakfast.slot3.tittle)
    }else if( ActiveDB === "VLunch.slot1.tittle"){
      return(VLunch.slot1.tittle)
    }else if( ActiveDB === "VLunch.slot2.tittle"){
      return(VLunch.slot2.tittle)
    }else if( ActiveDB === "VLunch.slot3.tittle"){
      return(VLunch.slot3.tittle)
    }else if( ActiveDB === "VDinner.slot1.tittle"){
      return(VDinner.slot1.tittle)
    }else if( ActiveDB === "VDinner.slot1.tittle"){
      return(VDinner.slot2.tittle)
    }else if( ActiveDB === "VDinner.slot1.tittle"){
      return(VDinner.slot3.tittle)
    }else if( ActiveDB === "VSnack.slot1.tittle"){
      return(VSnack.slot1.tittle)
    }else if( ActiveDB === "VSnack.slot2.tittle"){
      return(VSnack.slot2.tittle)
    }else if( ActiveDB === "VSnack.slot3.tittle"){
      return(VSnack.slot3.tittle)
    }

  }
  function getplatedImg(){
    const ActiveDB = savedContent.img;

    if( ActiveDB === "DBreakfast.slot1.img"){
      return(DBreakfast.slot1.img)
    }else if( ActiveDB === "DBreakfast.slot2.img"){
      return(DBreakfast.slot2.img)
    }else if( ActiveDB === "DBreakfast.slot3.img"){
      return(DBreakfast.slot3.img)
    
    }else if( ActiveDB === "DLunch.slot1.img"){
      return(DLunch.slot1.img)
    }else if( ActiveDB === "DLunch.slot2.img"){
      return(DLunch.slot2.img)
    }else if( ActiveDB === "DLunch.slot3.img"){
      return(DLunch.slot3.img)
    
    }else if( ActiveDB === "DDinner.slot1.img"){
      return(DDinner.slot1.img)
    }else if( ActiveDB === "DDinner.slot2.img"){
      return(DDinner.slot2.img)
    }else if( ActiveDB === "DDinner.slot3.img"){
      return(DDinner.slot3.img)
    
    }else if( ActiveDB === "DSnack.slot1.img"){
      return(DSnack.slot1.img)
    }else if( ActiveDB === "DSnack.slot2.img"){
      return(DSnack.slot2.img)
    }else if( ActiveDB === "DSnack.slot3.img"){
      return(DSnack.slot3.img)
    
    }else if( ActiveDB === "VBreakfast.slot1.img"){
      return(VBreakfast.slot1.img)
    }else if( ActiveDB === "VBreakfast.slot2.img"){
      return(VBreakfast.slot2.img)
    }else if( ActiveDB === "VBreakfast.slot3.img"){
      return(VBreakfast.slot3.img)
    
    }else if( ActiveDB === "VLunch.slot1.img"){
      return(VLunch.slot1.img)
    }else if( ActiveDB === "VLunch.slot2.img"){
      return(VLunch.slot2.img)
    }else if( ActiveDB === "VLunch.slot3.img"){
      return(VLunch.slot3.img)
    
    }else if( ActiveDB === "VDinner.slot1.img"){
      return(VDinner.slot1.img)
    }else if( ActiveDB === "VDinner.slot1.img"){
      return(VDinner.slot2.img)
    }else if( ActiveDB === "VDinner.slot1.img"){
      return(VDinner.slot3.img)
    
    }else if( ActiveDB === "VSnack.slot1.img"){
      return(VSnack.slot1.img)
    }else if( ActiveDB === "VSnack.slot2.img"){
      return(VSnack.slot2.img)
    }else if( ActiveDB === "VSnack.slot3.img"){
      return(VSnack.slot3.img)
    }

  }
  function getTime(){
    const ActiveDB = savedContent.time;

    if( ActiveDB === "DBreakfast.slot1.time"){
      return(DBreakfast.slot1.time +" "+ "Minutos")
    }else if( ActiveDB === "DBreakfast.slot2.time"){
      return(DBreakfast.slot2.time +" "+ "Minutos")
    }else if( ActiveDB === "DBreakfast.slot3.time"){
      return(DBreakfast.slot3.time +" "+ "Minutos")
    
    }else if( ActiveDB === "DLunch.slot1.time"){
      return(DLunch.slot1.time +" "+ "Minutos")
    }else if( ActiveDB === "DLunch.slot2.time"){
      return(DLunch.slot2.time +" "+ "Minutos")
    }else if( ActiveDB === "DLunch.slot3.time"){
      return(DLunch.slot3.time +" "+ "Minutos")
    
    }else if( ActiveDB === "DDinner.slot1.time"){
      return(DDinner.slot1.time +" "+ "Minutos")
    }else if( ActiveDB === "DDinner.slot2.time"){
      return(DDinner.slot2.time +" "+ "Minutos")
    }else if( ActiveDB === "DDinner.slot3.time"){
      return(DDinner.slot3.time +" "+ "Minutos")


    }else if( ActiveDB === "DSnack.slot1.time"){
      return(DSnack.slot1.time +" "+ "Minutos")
    }else if( ActiveDB === "DSnack.slot2.time"){
      return(DSnack.slot2.time +" "+ "Minutos")
    }else if( ActiveDB === "DSnack.slot3.time"){
      return(DSnack.slot3.time +" "+ "Minutos")
    
    }else if( ActiveDB === "VBreakfast.slot1.time"){
      return(VBreakfast.slot1.time +" "+ "Minutos")
    }else if( ActiveDB === "VBreakfast.slot2.time"){
      return(VBreakfast.slot2.time +" "+ "Minutos")
    }else if( ActiveDB === "VBreakfast.slot3.time"){
      return(VBreakfast.slot3.time)
    
    }else if( ActiveDB === "VLunch.slot1.time"){
      return(VLunch.slot1.time +" "+ "Minutos")
    }else if( ActiveDB === "VLunch.slot2.time"){
      return(VLunch.slot2.time +" "+ "Minutos")
    }else if( ActiveDB === "VLunch.slot3.time"){
      return(VLunch.slot3.time +" "+ "Minutos")
    
    }else if( ActiveDB === "VDinner.slot1.time"){
      return(VDinner.slot1.time +" "+ "Minutos")
    }else if( ActiveDB === "VDinner.slot1.time"){
      return(VDinner.slot2.time +" "+ "Minutos")
    }else if( ActiveDB === "VDinner.slot1.time"){
      return(VDinner.slot3.time +" "+ "Minutos")
    
    }else if( ActiveDB === "VSnack.slot1.time"){
      return(VSnack.slot1.time +" "+ "Minutos")
    }else if( ActiveDB === "VSnack.slot2.time"){
      return(VSnack.slot2.time +" "+ "Minutos")
    }else if( ActiveDB === "VSnack.slot3.time"){
      return(VSnack.slot3.time +" "+ "Minutos")
    }

  }
  function getCal(){
    const ActiveDB = savedContent.type;

    if( ActiveDB === "BS1type"){
      return(DBreakfast.slot1.Cal)
    }else if( ActiveDB === "BS2type"){
      return(DBreakfast.slot2.Cal)
    }else if( ActiveDB === "BS3type"){
      return(DBreakfast.slot3.Cal)
    
    }else if( ActiveDB === "LS1type"){
      return(DLunch.slot1.Cal)
    }else if( ActiveDB === "LS2type"){
      return(DLunch.slot2.Cal)
    }else if( ActiveDB === "LS3type"){
      return(DLunch.slot3.Cal)
    
    }else if( ActiveDB === "DS1type"){
      return(DDinner.slot1.Cal)
    }else if( ActiveDB === "DS2type"){
      return(DDinner.slot2.Cal)
    }else if( ActiveDB === "DS3type"){
      return(DDinner.slot3.Cal)
    
    }else if( ActiveDB === "SS1type"){
      return(DSnack.slot1.Cal)
    }else if( ActiveDB === "SS2type"){
      return(DSnack.slot2.Cal)
    }else if( ActiveDB === "SS3type"){
      return(DSnack.slot3.Cal)
    
    }else if( ActiveDB === "VBreakfast.slot1.img"){
      return(VBreakfast.slot1.Cal)
    }else if( ActiveDB === "VBreakfast.slot2.img"){
      return(VBreakfast.slot2.Cal)
    }else if( ActiveDB === "VBreakfast.slot3.img"){
      return(VBreakfast.slot3.Cal)
    
    }else if( ActiveDB === "VLunch.slot1.img"){
      return(VLunch.slot1.Cal)
    }else if( ActiveDB === "VLunch.slot2.img"){
      return(VLunch.slot2.Cal)
    }else if( ActiveDB === "VLunch.slot3.img"){
      return(VLunch.slot3.Cal)
    
    }else if( ActiveDB === "VDinner.slot1.img"){
      return(VDinner.slot1.Cal)
    }else if( ActiveDB === "VDinner.slot1.img"){
      return(VDinner.slot2.Cal)
    }else if( ActiveDB === "VDinner.slot1.img"){
      return(VDinner.slot3.Cal)
    
    }else if( ActiveDB === "VSnack.slot1.img"){
      return(VSnack.slot1.Cal)
    }else if( ActiveDB === "VSnack.slot2.img"){
      return(VSnack.slot2.Cal)
    }else if( ActiveDB === "VSnack.slot3.img"){
      return(VSnack.slot3.Cal)
    }

  }
  function getIngredients(){
    const ActiveDB = savedContent.type;
    console.log(ActiveDB);
    if( ActiveDB === "BS1type"){
      return(DBreakfast.slot1.Ingredients)
    }else if( ActiveDB === "BS2type"){
      return(DBreakfast.slot2.Ingredients)
    }else if( ActiveDB === "BS3type"){
      return(DBreakfast.slot3.Ingredients)
    
    }else if( ActiveDB === "LS1type"){
      return(DLunch.slot1.Ingredients)
    }else if( ActiveDB === "LS2type"){
      return(DLunch.slot2.Ingredients)
    }else if( ActiveDB === "LS3type"){
      return(DLunch.slot3.Ingredients)
    
    }else if( ActiveDB === "DS1type"){
      return(DDinner.slot1.Ingredients)
    }else if( ActiveDB === "DS2type"){
      return(DDinner.slot2.Ingredients)
    }else if( ActiveDB === "DS3type"){
      return(DDinner.slot3.Ingredients)
    
    }else if( ActiveDB === "SS1type"){
      return(DSnack.slot1.Ingredients)
    }else if( ActiveDB === "SS2type"){
      return(DSnack.slot2.Ingredients)
    }else if( ActiveDB === "SS3type"){
      return(DSnack.slot3.Ingredients)
    
    }else if( ActiveDB === "VBreakfast.slot1.img"){
      return(VBreakfast.slot1.Ingredients)
    }else if( ActiveDB === "VBreakfast.slot2.img"){
      return(VBreakfast.slot2.Ingredients)
    }else if( ActiveDB === "VBreakfast.slot3.img"){
      return(VBreakfast.slot3.Ingredients)
    
    }else if( ActiveDB === "VLunch.slot1.img"){
      return(VLunch.slot1.Ingredients)
    }else if( ActiveDB === "VLunch.slot2.img"){
      return(VLunch.slot2.Ingredients)
    }else if( ActiveDB === "VLunch.slot3.img"){
      return(VLunch.slot3.Ingredients)
    
    }else if( ActiveDB === "VDinner.slot1.img"){
      return(VDinner.slot1.Ingredients)
    }else if( ActiveDB === "VDinner.slot1.img"){
      return(VDinner.slot2.Ingredients)
    }else if( ActiveDB === "VDinner.slot1.img"){
      return(VDinner.slot3.Ingredients)
    
    }else if( ActiveDB === "VSnack.slot1.img"){
      return(VSnack.slot1.Ingredients)
    }else if( ActiveDB === "VSnack.slot2.img"){
      return(VSnack.slot2.Ingredients)
    }else if( ActiveDB === "VSnack.slot3.img"){
      return(VSnack.slot3.Ingredients)

  }

  }
  

  function getngredientBlocks(){
    const ActiveDB = savedContent.type;


    const Ingredients = DBreakfast.slot1.Ingredients;
    const Icount =countItemsInObject(Ingredients)
    console.log(Ingredients);
    console.log(Icount);

    function logWithPrefix() {
      for (let i = 1; i <= Icount; i++) {
        console.log(`I${i}`);
      }
    }
    


    console.log(logWithPrefix());

    // Example usage
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
    renderCarousel('Ingblocks', items);



    console.log(ActiveDB);
    if( ActiveDB === "BS1type"){

       // Output: 3


      
    }else if( ActiveDB === "BS2type"){
      return(DBreakfast.slot2.Ingredients)
    }else if( ActiveDB === "BS3type"){
      return(DBreakfast.slot3.Ingredients)
    
    }else if( ActiveDB === "LS1type"){
      return(DLunch.slot1.Ingredients)
    }else if( ActiveDB === "LS2type"){
      return(DLunch.slot2.Ingredients)
    }else if( ActiveDB === "LS3type"){
      return(DLunch.slot3.Ingredients)
    
    }else if( ActiveDB === "DS1type"){
      return(DDinner.slot1.Ingredients)
    }else if( ActiveDB === "DS2type"){
      return(DDinner.slot2.Ingredients)
    }else if( ActiveDB === "DS3type"){
      return(DDinner.slot3.Ingredients)
    
    }else if( ActiveDB === "SS1type"){
      return(DSnack.slot1.Ingredients)
    }else if( ActiveDB === "SS2type"){
      return(DSnack.slot2.Ingredients)
    }else if( ActiveDB === "SS3type"){
      return(DSnack.slot3.Ingredients)
    
    }else if( ActiveDB === "VBreakfast.slot1.img"){
      return(VBreakfast.slot1.Ingredients)
    }else if( ActiveDB === "VBreakfast.slot2.img"){
      return(VBreakfast.slot2.Ingredients)
    }else if( ActiveDB === "VBreakfast.slot3.img"){
      return(VBreakfast.slot3.Ingredients)
    
    }else if( ActiveDB === "VLunch.slot1.img"){
      return(VLunch.slot1.Ingredients)
    }else if( ActiveDB === "VLunch.slot2.img"){
      return(VLunch.slot2.Ingredients)
    }else if( ActiveDB === "VLunch.slot3.img"){
      return(VLunch.slot3.Ingredients)
    
    }else if( ActiveDB === "VDinner.slot1.img"){
      return(VDinner.slot1.Ingredients)
    }else if( ActiveDB === "VDinner.slot1.img"){
      return(VDinner.slot2.Ingredients)
    }else if( ActiveDB === "VDinner.slot1.img"){
      return(VDinner.slot3.Ingredients)
    
    }else if( ActiveDB === "VSnack.slot1.img"){
      return(VSnack.slot1.Ingredients)
    }else if( ActiveDB === "VSnack.slot2.img"){
      return(VSnack.slot2.Ingredients)
    }else if( ActiveDB === "VSnack.slot3.img"){
      return(VSnack.slot3.Ingredients)

  }

  }
getngredientBlocks()

  // Use the ActiveDB content dynamically in renderPageContent
  renderPageContent({
    title: getTittle(),
    calCount: getCal(), 
    platedImgSrc: getplatedImg(),
    recipeTime: getTime(),
    recipeContent: ActiveDB.recipeContent, 
    ingredientBlocks: ActiveDB.ingredientBlocks, 
    ingredientList: getIngredients(),
  });
  
});
  









function aatta(){
  //firePopSrc = "",
  // Update the fire icon and calorie count
  const firePopElement = document.getElementById("firePop");
  if (firePopElement) firePopElement.src = firePopSrc;



  //saveIconSrc = "",
  // Update the save icon
  const saveIconElement = document.getElementById("Save");
  if (saveIconElement) saveIconElement.src = saveIconSrc;
}






















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
  const { Base, Prime1, Prime2, Prime3 } = UBU.Colors;
// Function to change the background gradient dynamically
function setGradient(color1, color2) {
  document.body.style.background = `linear-gradient(to bottom, ${color1}, ${color2})`;
}



setGradient(top, bottom); 

});


