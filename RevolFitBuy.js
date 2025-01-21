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

// Function to fetch subscriptions data
async function getSubscriptionsData() {
  try {
    const docRef = doc(db, "revoFitweb", "subscriptions");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.error("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
  }
}

// Render Tier Function
function renderTier(tierData, tierId, tierClass) {
  const { tittle, icon, points, monthCost, backgroundColor } = tierData;

  // Set background color for the tier container
  const tierContainer = document.querySelector(`.${tierClass}`);
  if (tierContainer) {
    tierContainer.style.backgroundColor = backgroundColor;
  }

  // Set image source
  const iconImg = document.getElementById(`${tierId}icon`);
  if (iconImg) {
    iconImg.src = icon;
  }

  // Render Title
  const titleContainer = document.getElementById(`${tierId}Tittle`);
  if (titleContainer) {
    titleContainer.innerHTML = `
      <h3>Plan</h3>
      <h1>${tittle}</h1>
    `;
  }

  // Render Points List
  const pointsContainer = document.getElementById(`${tierId}list`);
  const renderMoreBtn = document.getElementById(`render-more-btn${tierId}`);
  if (pointsContainer) {
    pointsContainer.innerHTML = "";
    const ul = document.createElement("ul");
    points.slice(0, 2).forEach((point) => {
      const li = document.createElement("li");
      li.textContent = point;
      ul.appendChild(li);
    });
    pointsContainer.appendChild(ul);

    // Configure "Render More" Button
    if (points.length > 2) {
      renderMoreBtn.style.display = "inline-block";
      renderMoreBtn.onclick = () => {
        ul.innerHTML = "";
        points.forEach((point) => {
          const li = document.createElement("li");
          li.textContent = point;
          ul.appendChild(li);
        });
        renderMoreBtn.style.display = "none";
      };
    } else {
      renderMoreBtn.style.display = "none";
    }
  }

  // Render Cost
  const costContainer = document.getElementById(`${tierId}pirce`);
  if (costContainer) {
    costContainer.innerHTML = `
      <h2>${monthCost}</h2>
      <span>/</span>
      <span>Monthly</span>
    `;
  }
}

// Fetch data and render tiers
getSubscriptionsData().then((data) => {
  if (!data) return;

  renderTier(data.Clásico, "TC", "Tier-Clasic");
  renderTier(data.Oro, "TO", "Tier-Gold");
  renderTier(data.Platino, "TP", "Tier-Platinum");
});


document.addEventListener('touchstart', function (event) {
  if (event.touches.length > 1) {
    event.preventDefault(); // Prevents zooming
  }
}, { passive: false });