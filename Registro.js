// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  updateDoc, 
  serverTimestamp, 
  collection, 
  addDoc, 
  setDoc  } 
  from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

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

// Initialize Firebase
async function initializeFirebase() {
  if (db) return;
  try {
    const firebaseConfig = await fetchFirebaseConfig();
    if (!firebaseConfig) throw new Error("Firebase config is undefined");
    firebaseApp = initializeApp(firebaseConfig);
    db = getFirestore(firebaseApp);
  } catch (error) {
    console.error("Error initializing Firebase:", error);
  }
}

// Check if a document exists in Firestore
async function checkDocumentExists(collectionName, documentId) {
  if (!collectionName || !documentId) {
   // console.error("Collection name or document ID is missing.");
    return null;
  }

  if (!db) {
 //   console.error("Firestore instance is not initialized.");
    return null;
  }

  try {
    const docRef = doc(db, collectionName, documentId);
    //console.log(`Checking document: ${collectionName}/${documentId}`);

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
     // console.log("Document found:", docSnap.data());
      return docSnap.data();
    } else {
    //  console.log(`No document found with ID: ${documentId}`);
      return null;
    }
  } catch (error) {
   // console.error("Error checking document:", error);
    return null;
  }
}

// Apply branding from Firestore
async function applyBranding() {
  const transferredInfo = localStorage.getItem("transferredBu");
  if (!transferredInfo) {
    console.warn("No transferred business info found.");
    return;
  }

  const Buissnes = await checkDocumentExists("RevoBuissnes", transferredInfo);
  console.log("Branding info:", Buissnes);
  const { top, center,bottom } = Buissnes.BuColors.BackgroundColor;
  const { Base, Prime1, Prime2, Prime3, Prime4, Prime5, Prime6 } = Buissnes.BuColors.Colors;

  function GetBuFont(fontFamily) {
    document.body.style.fontFamily = fontFamily;
  }
  function setGradient( Ctop, Ccenter, Cbottom ) {
    document.body.style.background = `linear-gradient(to bottom, ${Ctop}, ${Ccenter}, ${Cbottom})`;
  }
  function renderColors(selector, backgroundColor, textColor) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      element.style.backgroundColor = backgroundColor;
      element.style.color = textColor;

    });
  }
  function renderTextColor(UrlId, color) {
    const elements = document.querySelectorAll(UrlId);
    elements.forEach(element => {
      element.style.color = color;
    });
  }
  function makeTransparent(hexColor, alpha = 0.3) {
    hexColor = hexColor.replace('#', '');
  
    if (hexColor.length === 3) {
      hexColor = hexColor.split('').map(c => c + c).join('');
    }
  
    const r = parseInt(hexColor.substr(0, 2), 16);
    const g = parseInt(hexColor.substr(2, 2), 16);
    const b = parseInt(hexColor.substr(4, 2), 16);
  
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  // Apply the transparency to .Question-block-3
  function applyTransparentBackgroundToBlock(urlId, color , scale) {
    const block = document.querySelector(urlId);
    if (block) {
      const transparentColor = makeTransparent(color, scale); // Replace with your base color
      block.style.backgroundColor = transparentColor;
    }
  }
  function applySexCheckboxStyles() {
    const style = document.createElement('style');
    style.innerHTML = `
      .sex input[type="checkbox"] {
        appearance: none;
        -webkit-appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: ${Prime2};
        cursor: pointer;
        vertical-align: middle;
        margin-right: 8px;
        transition: background-color 0.3s, border-color 0.3s;
        border: 2px solid ${Base};
      }
      .sex input[type="checkbox"]:checked {
        background-color: ${Prime1};
        border-color: ${Base};
      }
    `;
    document.head.appendChild(style);
  }
  function styleInputFields(options) {
    const inputs = document.querySelectorAll('#input-Blocks-1 input');
  
    inputs.forEach(input => {
      // Apply styles to each input
      input.style.borderColor = options.borderColor || '#ccc';
      input.style.borderWidth = options.borderWidth || '1px';
      input.style.borderStyle = 'solid';
      input.style.fontSize = options.fontSize || '16px';
      input.style.backgroundColor = options.backgroundColor || '#fff';
      input.style.color = options.textColor || '#000';
      input.style.padding = options.padding || '8px';
      input.style.borderRadius = options.borderRadius || '4px';
      input.style.width = options.width || '100%'; // Now supports width!
  
      // Style placeholder
      const style = document.createElement('style');
      style.innerHTML = `
        #${input.id}::placeholder {
          color: ${options.placeholderColor || '#999'};
          font-size: ${options.fontSize || '16px'};
        }
      `;
      document.head.appendChild(style);
    });
  }
  function setSelectColors( textColor, ) {
    const selects = document.querySelectorAll('.picker select');
    selects.forEach(select => {
     
      select.style.color = textColor;

      
    });
  }
  // Call it
  setSelectColors( Base);
  function renderPhotoBtns(selector, textColor, backgroundColor) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
      el.style.color = textColor;
  
      el.style.border = `3px solid ${backgroundColor}`;
    });
  }
  // If the element has an id of "Take", use "#Take"
  renderPhotoBtns(".PhotoBtns", Base, Base);

  function setBorders(UrlId, color){
    const box = document.getElementById(UrlId);
    box.style.border = `2px solid ${color}`; 
  }

  function setPSelectColors(selector, textColor, bgColor, borderColor, optionBgColor, optionTextColor, selectedBgColor, selectedTextColor) {
    const selects = document.querySelectorAll(selector);
    
    selects.forEach(select => {
      // Style the select itself
      select.style.color = textColor;
      select.style.backgroundColor = bgColor;
      select.style.border = `2px solid ${borderColor}`;
  
      // Style each option
      Array.from(select.options).forEach(option => {
        option.style.backgroundColor = optionBgColor;
        option.style.color = optionTextColor;
      });
  
      // Update the selected text color manually
      select.addEventListener('change', function () {
        // Manually apply selected color
        select.style.color = selectedTextColor;
        select.style.backgroundColor = selectedBgColor;
      });
    });
  }

  setPSelectColors(
    '#countryCode',
    Base,      // select text color
    Prime2,    // select bg color
    Prime1,    // border color
    Prime2,    // option bg color
    Base,    // option text color
    Prime2,       // selected bg color
    Base,     // selected text color
  );
  function changePlaceholderColor(color) {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
      phoneInput.style.setProperty('--placeholder-color', color);
    }
  }

  changePlaceholderColor(Prime1);


 



  styleInputFields({
    placeholderColor: Prime6 ,
    borderColor: Base,
    borderWidth: '1px',
    fontSize: '18px',
    backgroundColor: Prime2,
    textColor: Prime6 ,
    padding: '6px',
    borderRadius: '12px',
    width: '300px' // or '100%', '50%', etc.
  });

  
  applySexCheckboxStyles()

  applyTransparentBackgroundToBlock('#Start-Block', Prime1, 0.6)
  applyTransparentBackgroundToBlock('#Question-block-3', Base, 0.9)
  applyTransparentBackgroundToBlock('#Name-Content-block', Prime1, 0.8)
  applyTransparentBackgroundToBlock('#Age-Content-block', Prime1, 0.8)
  applyTransparentBackgroundToBlock(".picker", Prime2, 0.6)
  applyTransparentBackgroundToBlock('#Photo-Content-block', Prime1, 0.8)
  applyTransparentBackgroundToBlock('#Country-Content-block', Prime1, 0.8)
  applyTransparentBackgroundToBlock('#Result-Content-block', Prime1, 0.5)
  applyTransparentBackgroundToBlock('#Phone-Content-block', Prime1, 0.5)


  applyTransparentBackgroundToBlock('#input-Blocks-phone-1',  Prime2 , 0.85)
  applyTransparentBackgroundToBlock('#input-Blocks-phone-1',  Prime2 , 0.85)


  

  
  applyTransparentBackgroundToBlock('#Start-Text', Prime1, 0.8)


  setGradient( top, center, bottom )
  GetBuFont(Buissnes.Font);
  renderColors(".Nex-Btn", Base, Prime1)
  renderTextColor("#Q-tittle", Prime1)
  renderTextColor("#M-lable", Prime1)
  renderTextColor("#F-lable", Prime1)
  renderTextColor("#Q-tittle-1", Base)
  renderTextColor("#Q-tittle-2", Base)

  renderTextColor(".resultTittle", Base)
  renderTextColor("#Age", Base)
  renderTextColor("#phoneNumber", Base)
  renderTextColor("#Q-tittle-C", Base)
  renderTextColor("#Start-Text", Base)


  setBorders("Result-Content-block", Base)
  setBorders("input-Blocks-phone-1", Prime1)


  setPSelectColors("#countryCode", Base,  Prime2, Prime1)
}

// Set content logic and image switching
async function setContent() {
  const transferreduserInfo = localStorage.getItem("transferreduserInfo");
  console.log(transferreduserInfo)
  const transferredInfo = localStorage.getItem("transferredBu");
  const User = await checkDocumentExists("users", transferreduserInfo);
  const content = await checkDocumentExists("RevolApp", "Content");
  const Buissnes = await checkDocumentExists("RevoBuissnes", transferredInfo);
  if (!content) return;
  console.log(Buissnes)
  const BuIcon = Buissnes.BuLogos.Icons
  
  const { Base, Prime1, Prime2, Prime3, Prime4, Prime5, Prime6 } = Buissnes.BuColors.Colors;

  function renderStartcontent() {
    const Header = document.getElementById('EvaluaciónHeader');
    const instructions = document.getElementById('instructions');
    const Streak = User.currentStreak;
    const Intro = Buissnes.Evaluation.EtextContent.Intro;
    const Block1 = Buissnes.Evaluation.EtextContent.Block1;
  
    console.log(User.currentStreak);
  
    function renderText(element, text) {
      element.textContent = text;
    }
  
    if (Streak === 0) {
      renderText(Header, Intro.Tittle);
      renderText(instructions, Intro.Text);
    } else {
      renderText(Header, Block1.Tittle);
      renderText(instructions, Block1.Text);
    }
  }
  function setImgs(imgSrc, imgAlt, urlId) {
    const img = document.getElementById(urlId);
    if (img) {
      img.src = imgSrc;
      img.alt = imgAlt;
    } else {
      console.error(`Image element with id '${urlId}' not found.`);
    }
  }
  function checkGenderAndSetImage(source) {
    const MaleModel = content.Images.Models.Male;
    const FemaleModel = content.Images.Models.Female;
  
    const maleCheckbox = document.getElementById('Male');
    const femaleCheckbox = document.getElementById('Female');
  
    if (source === 'Male') {
      if (maleCheckbox) maleCheckbox.checked = true;
      if (femaleCheckbox) femaleCheckbox.checked = false;
      setImgs(MaleModel, 'Avatar masculino', "Gender-Img");
    } else if (source === 'Female') {
      if (femaleCheckbox) femaleCheckbox.checked = true;
      if (maleCheckbox) maleCheckbox.checked = false;
      setImgs(FemaleModel, 'Avatar femenino', "Gender-Img");
    }
  }
  function checkBox() {
    const maleCheckbox = document.getElementById('Male');
    const femaleCheckbox = document.getElementById('Female');
  
    if (maleCheckbox && femaleCheckbox) {
      // Attach change listeners
      maleCheckbox.addEventListener('change', () => {
        if (maleCheckbox.checked) checkGenderAndSetImage('Male');
        else setImgs(null, '', "Gender-Img"); // Optional: Clear image if unchecked
      });
  
      femaleCheckbox.addEventListener('change', () => {
        if (femaleCheckbox.checked) checkGenderAndSetImage('Female');
        else setImgs(null, '', "Gender-Img"); // Optional: Clear image if unchecked
      });
  
      // Show male image ONLY (don't check any box)
      const MaleModel = content.Images.Models.Male;
      setImgs(MaleModel, 'Avatar masculino', "Gender-Img");
  
      // Make sure neither checkbox is checked
      maleCheckbox.checked = false;
      femaleCheckbox.checked = false;
    } else {
      console.warn("Gender checkboxes not found in DOM.");
    }
  }
  function applySexCheckboxStyles() {
    const style = document.createElement('style');
    style.innerHTML = `
      .sex input[type="checkbox"] {
        appearance: none;
        -webkit-appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: Prime2;
        cursor: pointer;
        vertical-align: middle;
        margin-right: 8px;
        transition: background-color 0.3s, border-color 0.3s;
      }
      .sex input[type="checkbox"]:checked {
        background-color: Prime1;
        border-color: Base;
      }
    `;
    document.head.appendChild(style);
  }
  function renderPbar(selector, backgroundColor){
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      element.style.backgroundColor = backgroundColor;
      
    });
  }
  function renderBirthday() {
    const monthSelect = document.getElementById('month');
    const daySelect = document.getElementById('day');
    const yearSelect = document.getElementById('year');
    const ageDisplay = document.getElementById('Age');
  
    // Populate months
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    months.forEach((month, i) => {
      const option = document.createElement('option');
      option.value = i + 1;
      option.textContent = month;
      monthSelect.appendChild(option);
    });
  
    // Populate days
    for (let d = 1; d <= 31; d++) {
      const option = document.createElement('option');
      option.value = d;
      option.textContent = d;
      daySelect.appendChild(option);
    }
  
    // Populate years
    const currentYear = new Date().getFullYear();
    for (let y = currentYear; y >= 1900; y--) {
      const option = document.createElement('option');
      option.value = y;
      option.textContent = y;
      yearSelect.appendChild(option);
    }
  
    // Optional: center scroll position
    [monthSelect, daySelect, yearSelect].forEach(select => {
      select.selectedIndex = Math.floor(select.options.length / 2);
    });
  
    // Add change event listeners
    [monthSelect, daySelect, yearSelect].forEach(select => {
      select.addEventListener('change', updateAge);
    });
  
    function updateAge() {
      const day = parseInt(daySelect.value);
      const month = parseInt(monthSelect.value) - 1; // Month is 0-based in JS
      const year = parseInt(yearSelect.value);
  
      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        const today = new Date();
        const birthDate = new Date(year, month, day);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
  
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
  
        ageDisplay.textContent = `Age: ${age}`;
      } else {
        ageDisplay.textContent = '';
      }
    }
  }
  function SetIcons(){
    function setBgImgs(imgSrc, imgAlt, urlId, close, open) {
      // Find the img element by id
      const img = document.getElementById(urlId);

      let closeElement = document.getElementById(close);
      let openElement = document.getElementById(open);
     
      // Check if the img element exists
      if (img) {
          // Set the image source and alternative text
          img.src = imgSrc;
          img.alt = imgAlt;
  
          // Add click event listener
          img.addEventListener('click', function () {
            if (closeElement) {
              closeElement.style.display = "none";
            }
            if (openElement) {
              openElement.style.display = "flex";
            }
          });
      } else {
          console.error(`Image element with id '${urlId}' not found.`);
      }
    }

    setBgImgs(Buissnes.AppIcons.Evaluation[0], "Pen", "Return-pen-0","Results-Block","Name-Block")
    setBgImgs(Buissnes.AppIcons.Evaluation[0], "Pen", "Return-pen-1","Results-Block","Name-Block")
    setBgImgs(Buissnes.AppIcons.Evaluation[0], "Pen", "Return-pen-2","Results-Block","Name-Block")

    setBgImgs(Buissnes.AppIcons.Evaluation[0], "Pen", "Return-pen-3","Results-Block","Phone-Block")
    setBgImgs(Buissnes.AppIcons.Evaluation[0], "Pen", "Return-pen-4","Results-Block","Phone-Block")

    setBgImgs(Buissnes.AppIcons.Evaluation[0], "Pen", "Return-pen-5","Results-Block","Age-Block")
    setBgImgs(Buissnes.AppIcons.Evaluation[0], "Pen", "Return-pen-6","Results-Block","Age-Block")
    setBgImgs(Buissnes.AppIcons.Evaluation[0], "Pen", "Return-pen-7","Results-Block","Sex-Block")
    setBgImgs(Buissnes.AppIcons.Evaluation[0], "Pen", "Return-pen-8","Results-Block","PPhoto-Block")
    setBgImgs(Buissnes.AppIcons.Evaluation[0], "Pen", "Return-pen-9","Results-Block","Country-Block")
    setBgImgs(Buissnes.AppIcons.Evaluation[0], "Pen", "Return-pen-10","Results-Block","Country-Block")
    setBgImgs(Buissnes.AppIcons.Evaluation[0], "Pen", "Return-pen-11","Results-Block","Country-Block")


  
  }
  function setBorders(UrlId, color, textC){
    const box = document.getElementById(UrlId);
    box.style.border = `2px solid ${color}`; 
    box.style.color = textC
  }
  let videoStream = null;

  async function EventListenerBlock() {
    const uploadBlock = document.getElementById("Upload-Block");
    const takeBlock = document.getElementById("Take-Block");
  
    const takeBtn = document.getElementById("Take");
    const uploadBtn = document.getElementById("upload");
    const takePhotoBtn = document.getElementById("Take-Photo");
    const retakeBtn = document.getElementById("Retake-Photo");
    const uploadPhotoBtn = document.getElementById("upload-photo");
  
    const video = document.getElementById("video");
    const canvas = document.getElementById("canvas");
    const context = canvas?.getContext("2d");
    const photoOutput = document.getElementById("photo-output");
  
    if (!uploadBlock || !takeBlock || !takeBtn || !uploadBtn || !takePhotoBtn || !retakeBtn || !uploadPhotoBtn || !video || !canvas || !context || !photoOutput) {
      console.warn("Uno o más elementos no fueron encontrados. Verifica los IDs o asegúrate de que el HTML ya esté cargado.");
      return;
    }
  
    // Abrir vista de cámara
    takeBtn.addEventListener("click", () => {
      console.log("Abriendo cámara...");
      uploadBlock.style.display = "none";
      takeBlock.style.display = "flex";
      startCamera();
    });
  
    // Cambiar a modo subir desde dispositivo
    uploadBtn.addEventListener("click", () => {
      console.log("Modo subir desde dispositivo...");
      uploadBlock.style.display = "flex";
      takeBlock.style.display = "none";
      stopCamera();
    });
  
    // Tomar foto
    takePhotoBtn.addEventListener("click", () => {
      console.log("Foto capturada.");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imgData = canvas.toDataURL("image/png");
      photoOutput.innerHTML = `<img src="${imgData}" width="320" height="240"/>`;
      video.style.display = "none";
    });
  
    // Reintentar foto
    retakeBtn.addEventListener("click", () => {
      console.log("Retomando...");
      video.style.display = "block";
      photoOutput.innerHTML = "";
    });
  
    // Subir foto simuladamente
    uploadPhotoBtn.addEventListener("click", () => {
      if (photoOutput.innerHTML.trim() !== "") {
        console.log("Foto subida con éxito.");
        alert("Foto subida con éxito.");
        stopCamera();
        takeBlock.style.display = "none";
        uploadBlock.style.display = "flex";
      } else {
        alert("Primero toma una foto.");
      }
    });
  }
  
  async function startCamera() {
    const video = document.getElementById("video");
    try {
      videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = videoStream;
    } catch (err) {
      console.error("No se puede acceder a la cámara:", err);
      alert("No se puede acceder a tu cámara.");
    }
  }
  
  function stopCamera() {
    const video = document.getElementById("video");
    if (videoStream) {
      videoStream.getTracks().forEach(track => track.stop());
      video.srcObject = null;
      videoStream = null;
      console.log("Cámara detenida.");
    }
  }
  

  
EventListenerBlock();


  async function EventListenerNextBtns() {
    const transferredInfo = localStorage.getItem("transferredBu");
  
    const StartBtn = document.getElementById("Start-Next-Btn");
    const NameBtn = document.getElementById("Next-Btn-1");
    const phoneBtn = document.getElementById("Next-Btn-7");
    const AgeBtn = document.getElementById("Next-Btn-2");
    const SexBtn = document.getElementById("Next-Btn-3");
    const PhotoBtn = document.getElementById("Next-Btn-4");
    const CountryBtn = document.getElementById("Next-Btn-5");
    const SendBtn = document.getElementById("SendBtn");
    
  
    const IntroBlock = document.getElementById("Intro-Block");
    const NameBlock = document.getElementById("Name-Block");
    const PhoneBlock = document.getElementById("Phone-Block");
    const AgeBlock = document.getElementById("Age-Block");
    const SexBlock = document.getElementById("Sex-Block");
    const PhotoBlock = document.getElementById("PPhoto-Block");
    const CountryBlock = document.getElementById("Country-Block");
    const ResultsBlock = document.getElementById("Results-Block");
  
    function renderInfo(Text, UrlId) {
      const span = document.getElementById(UrlId);
      if (span) {
        span.textContent = Text;
      } else {
        console.warn(`Element with id "${UrlId}" not found.`);
      }
    }
  
    function logFormValues() {
      const nombre = document.getElementById('nombre').value;
      const apellidoPaterno = document.getElementById('apellido-paterno').value;
      const apellidoMaterno = document.getElementById('apellido-materno').value;
  
      renderInfo(nombre, "R-First-Name");
      renderInfo(apellidoPaterno, "R-Apellido-Paterno");
      renderInfo(apellidoMaterno, "R-Apellido-Materno");
  
      console.log('Nombre:', nombre);
      console.log('Apellido Paterno:', apellidoPaterno);
      console.log('Apellido Materno:', apellidoMaterno);
    }

    function logphoneValues() {
      const AreaCode = document.getElementById('countryCode').value;
      const PNumber = document.getElementById('phone').value;
  
      renderInfo(AreaCode, "R-A-Code");
      renderInfo(PNumber, "R-Phone");
  
      console.log('Código:', AreaCode);
      console.log('Phone:', PNumber);
    }
  
    function logBirthday() {
      const today = new Date();
      


      const month = document.getElementById('month').value;
      const day = document.getElementById('day').value;
      const year = document.getElementById('year').value;
      const date = `${month}/${day}/${year}`;


      const Age = today.getFullYear() - year;
      

  
      renderInfo(date, "R-B-Date");
      renderInfo(Age, "R-Age");


      console.log(today);
      console.log('Birthday:', Age);
      console.log('Month:', month);
      console.log('Day:', day);
      console.log('Year:', year);
    }
  
    function logGender() {
      const isMale = document.getElementById('Male').checked;
      const isFemale = document.getElementById('Female').checked;
  
      if (isMale) {
        renderInfo('Masculino', "R-Sex");
        console.log('Masculino');
      } else if (isFemale) {
        renderInfo('Femenino', "R-Sex");
        console.log('Femenino');
      } else {
        console.log('None selected');
      }
    }
  
    function logAddressValues() {
      const country = document.getElementById('pais').value;
      const zip = document.getElementById('Zip').value;
      const city = document.getElementById('Cuidad').value;
  
      renderInfo(country, "R-Pais");
      renderInfo(zip, "R-Zip");
      renderInfo(city, "R-City");
  
      console.log("Country:", country);
      console.log("Zip Code:", zip);
      console.log("City:", city);
    }
  
    if (
      !StartBtn || !NameBtn || !AgeBtn || !SexBtn || !PhotoBtn || !CountryBtn || !SendBtn ||
      !IntroBlock || !NameBlock || !AgeBlock || !SexBlock || !PhotoBlock || !CountryBlock
    ) {
      console.warn("Uno o más elementos del flujo de navegación no fueron encontrados.");
      return;
    }
  
    StartBtn.addEventListener("click", () => {
      IntroBlock.style.display = "none";
      NameBlock.style.display = "flex";
    });
  
    NameBtn.addEventListener("click", () => {
      logFormValues();
      NameBlock.style.display = "none";
      PhoneBlock.style.display = "flex";
      
    });

    phoneBtn.addEventListener("click", () => {
      logphoneValues()
      PhoneBlock.style.display = "none";
      AgeBlock.style.display = "flex";
    });

    AgeBtn.addEventListener("click", () => {
      logBirthday();
      AgeBlock.style.display = "none";
      SexBlock.style.display = "flex";
    });
  
    SexBtn.addEventListener("click", () => {
      logGender();
      SexBlock.style.display = "none";
      PhotoBlock.style.display = "flex";
    });
  
    PhotoBtn.addEventListener("click", () => {
      PhotoBlock.style.display = "none";
      CountryBlock.style.display = "flex";
    });
  
    CountryBtn.addEventListener("click", () => {
      logAddressValues();
      CountryBlock.style.display = "none";
      ResultsBlock.style.display = "flex";
    });
  
    SendBtn.addEventListener("click", async (event) => {
      event.preventDefault();
   
      const month = document.getElementById("month").value;
      const day = document.getElementById("day").value;
      const year = document.getElementById("year").value;
  
      function getAge(birthDateString) {
        const today = new Date();
        const birthDate = new Date(birthDateString);
      
        let age = today.getFullYear() - birthDate.getFullYear();
      
        // Adjust if birthday hasn't happened yet this year
        const hasHadBirthdayThisYear =
          today.getMonth() > birthDate.getMonth() ||
          (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
      
        if (!hasHadBirthdayThisYear) {
          age--;
        }
      
        return age;
      }
      
      // Example:
      console.log(getAge(year)); //

      const formData = {
        nombre: document.getElementById("nombre").value,
        apellidoPaterno: document.getElementById("apellido-paterno").value,
        apellidoMaterno: document.getElementById("apellido-materno").value,
        countryCode: document.getElementById("countryCode").value,
        phone: document.getElementById("phone").value,
        age: getAge(year),
        fechaNacimiento: `${month}/${day}/${year}`,
        genero: document.getElementById("Male")?.value || document.getElementById("Female")?.value,
        // photo:document.getElementById("R-Photo").value,
        
        pais: document.getElementById("pais").value,
        Zip: document.getElementById("Zip").value,
        Cuidad: document.getElementById("Cuidad").value,
        Bu: transferredInfo,
        registrationCompleted: true,
      };
  
      try {
      
        const userInfo = localStorage.getItem("transferreduserInfo");
        console.log(userInfo)
        const docRef = doc(db, "users", userInfo);

  
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          await updateDoc(docRef, formData);
          console.log("Document updated successfully!");
        } else {
          await setDoc(docRef, formData);
          console.log("Document created successfully!");
        }
  
        localStorage.setItem(userInfo, JSON.stringify(formData));
        alert("Form submitted successfully!");
        window.location.href = "index7.html";
  
      } catch (error) {
        console.error("Error updating document:", error);
        alert("Error submitting the form. Please try again.");
      }
    });
  }











  EventListenerNextBtns()
  SetIcons()
  checkBox()
  renderPbar(".bar", Prime6)
  renderPbar("#Active-Bar-1", Prime5)
  applySexCheckboxStyles();

  setImgs(BuIcon[0], Buissnes.BuLogos.LogoText.description, "Logo-Img-start")
  setImgs(BuIcon[0], Buissnes.BuLogos.LogoText.description, "Logo-Img")
  setImgs(BuIcon[0], Buissnes.BuLogos.LogoText.description, "Logo-Img-age")
  setImgs(BuIcon[0], Buissnes.BuLogos.LogoText.description, "Logo-Img-Photo")
  setImgs(BuIcon[0], Buissnes.BuLogos.LogoText.description, "Logo-Img-Country")
  setImgs(BuIcon[0], Buissnes.BuLogos.LogoText.description, "Logo-Img-Phone")
  
  setBorders('phone', Prime1, Base)
  renderBirthday()
  renderStartcontent()
}




document.body.style.overflow = 'hidden';

// Initialize everything
initializeFirebase().then(async () => {
  //console.log("Initializing app...");

  const transferreduserInfo = localStorage.getItem("transferreduserInfo");
  const transferredInfo = localStorage.getItem("transferredBu");
  const SelectedCurrency = localStorage.getItem("SelectedCurrency");

  console.log("Transferred User Info:", transferreduserInfo);
  console.log("Transferred Info:", transferredInfo);
  //console.log("Transferred currency:", SelectedCurrency);
  await setContent();
  await applyBranding();
 
});

