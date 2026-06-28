// ====== SMART LIGHT / DARK MODE WITH MEMORY ======

// 1. Jaise hi page load ho, check karo ki user ne pehle kaun sa theme select kiya tha
document.addEventListener("DOMContentLoaded", function () {
    const savedTheme = localStorage.getItem("theme");
    const themeIcon = document.getElementById("theme-icon");

    // Agar pehle se 'dark' saved hai, toh dark mode ON kar do
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        if (themeIcon) {
            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");
            themeIcon.style.color = "#f1c40f"; // Sun yellow
        }
    }
});

// 2. Button click karne par theme toggle karne aur save karne wala function
function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    const themeIcon = document.getElementById("theme-icon");

    if (document.body.classList.contains("dark-mode")) {
        // Dark mode ON hua: Icon badlo aur memory me 'dark' save karo
        if (themeIcon) {
            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");
            themeIcon.style.color = "#f1c40f";
        }
        localStorage.setItem("theme", "dark");
    } else {
        // Dark mode OFF hua: Icon badlo aur memory me 'light' save karo
        if (themeIcon) {
            themeIcon.classList.remove("fa-sun");
            themeIcon.classList.add("fa-moon");
            themeIcon.style.color = "#ffffff";
        }
        localStorage.setItem("theme", "light");
    }
}


// ====== INLINE BOOKING DROP-DOWN LOGIC ======
function setDestination(destinationValue) {
    var selectDropdown = document.getElementById('modal-select');
    if (selectDropdown) {
        selectDropdown.value = destinationValue;
    }
}

// ====== WEATHER ALERT LOGIC ======
function checkWeatherAlert(destination, status) {
    if(status === 'safe') {
        alert("☀️ " + destination + " Status: Weather is absolutely perfect! Hotels and flights are operating normally. Safe to travel!");
    } else if(status === 'warning') {
        alert("⚠️ " + destination + " Travel Advisory: Heavy rain alert! Roadways might be delayed. Please contact our 24/7 support team before planning your journey.");
    }
}
// ====== FORM SUBMISSION LOGIC (UPDATED WITH CUSTOM MODAL) ======
document.addEventListener("DOMContentLoaded", function () {
    const bookingForm = document.querySelector(".modal-form");

    if (bookingForm) {
        bookingForm.addEventListener("submit", function (event) {
            event.preventDefault();

            // 1. Data read karo
            const userName = bookingForm.querySelector("input[type='text']").value;
            const selectDropdown = document.getElementById("modal-select");
            const destinationName = selectDropdown.options[selectDropdown.selectedIndex].text;
           

            // 2. Custom Success Modal me data fill karo
            document.getElementById("pop-name").innerText = userName;
            document.getElementById("pop-dest").innerText = destinationName;

            // 3. Purana booking modal band karo
            window.location.hash = "";
            const bookingModal = document.getElementById("booking-modal");
            if (bookingModal) bookingModal.style.display = "none";

            // 4. Custom Success Modal ko show karo
            const successModal = document.getElementById("success-modal");
            if (successModal) {
                successModal.style.display = "flex";
            }

            // 5. Form clear karo
            bookingForm.reset();
        });
    }
});

// Success modal ko close karne ka function
function closeSuccessModal() {
    const successModal = document.getElementById("success-modal");
    if (successModal) {
        successModal.style.display = "none";
    }
}
// ====== AI AR HISTORICAL SCANNER LOGIC ======

// Mock Database for Historical Details
const historicalData = {
    "Himachal": {
        title: "The Majestic Rohtang & Dhauladhar Range",
        loc: "Manali, Himachal Pradesh",
        height: "3,978 Meters",
        history: "Historically part of an ancient trade route between Kullu and Ladakh. Known as the 'Gateway to Lahaul and Spiti', these mountains are over 50 million years old, shaped by tectonic collisions, and hold spiritual significance in indigenous folklore."
    },
    "Paris": {
        title: "The Eiffel Tower (La Tour Eiffel)",
        loc: "Champ de Mars, Paris",
        height: "330 Meters",
        history: "Constructed in 1889 for the World's Fair, designed by Gustave Eiffel. Initially despised by artists, it was almost torn down in 1909 but saved for its use as a giant radiotelegraph antenna. It remains a pinnacle of global architectural wonder."
    },
    "Goa": {
        title: "Aguada Fort & Western Ghat Hills",
        loc: "Candolim, Goa",
        height: "Sea Level Plateau",
        history: "Built by the Portuguese in 1612 to guard against Dutch and Maratha invasions. It housed a fresh water spring that supplied water to ships stopping by, making it one of the most vital strategic marine checkpoints in early European colonial history."
    }
};

let streamInstance = null;

// Function to trigger Scanner
function openScanner(destination) {
    const scanner = document.getElementById("scanner-modal");
    const video = document.getElementById("webcam");
    const status = document.getElementById("scan-status");
    const resultBox = document.getElementById("scan-result");

    resultBox.style.display = "none";
    status.innerText = "Initializing AI Camera Engine...";
    scanner.style.display = "flex";

    // 1. Live Camera/Webcam Turn On karo
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then(function (stream) {
            streamInstance = stream;
            video.srcObject = stream;
            
            status.innerText = "🔍 Scanning object details... Analyzing geological features.";
            
            // 2. 3 Second ka mock scan delay chalao (jaise AI process kar rha ho)
            setTimeout(() => {
                showScanResults(destination);
            }, 3500);
        })
        .catch(function (error) {
            status.innerText = "❌ Camera Access Denied or Not Available.";
            console.log("Camera error: ", error);
        });
    }
}

// Data fill karne aur response generate karne ka function
function showScanResults(dest) {
    const status = document.getElementById("scan-status");
    const resultBox = document.getElementById("scan-result");
    
    // Agar custom data nahi h to default Himachal dikhao
    const data = historicalData[dest] || historicalData["Himachal"];

    document.getElementById("res-title").innerText = data.title;
    document.getElementById("res-loc").innerText = data.loc;
    document.getElementById("res-height").innerText = data.height;
    document.getElementById("res-history").innerText = data.history;

    status.innerText = "✅ Object Recognized Successfully!";
    resultBox.style.display = "block";
}

// Scanner band karne ka code (Camera off karna zaroori h taaki battery bache)
function closeScanner() {
    document.getElementById("scanner-modal").style.display = "none";
    if (streamInstance) {
        streamInstance.getTracks().forEach(track => track.stop());
    }
}


// ====== INTERACTIVE AUDIO TOUR GUIDE SYSTEM ======

let audioUtterance = null;
let audioPlaying = false;
let progressInterval = null;
let currentProgressWidth = 0;
let estimatedDuration = 15; // default 15 seconds reading time approximation

function toggleAudioGuide() {
    const playBtn = document.getElementById("audio-play-btn");
    const statusText = document.querySelector(".audio-status-text");
    const textToSpeak = document.getElementById("res-history").innerText;

    // Agar pehle se chal rha h to pause/stop karo
    if (audioPlaying) {
        window.speechSynthesis.cancel();
        clearInterval(progressInterval);
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        statusText.innerText = "⏸️ Audio Paused. Click play to restart.";
        audioPlaying = false;
    } else {
        // Purane bache hue speech ko clear karo
        window.speechSynthesis.cancel();
        clearInterval(progressInterval);

        // Naya Speech Utterance create karo
        audioUtterance = new SpeechSynthesisUtterance(textToSpeak);
        audioUtterance.rate = 0.95; // thoda slow clear sound ke liye
        
        // Dynamic duration estimation based on word count
        const wordCount = textToSpeak.split(" ").length;
        estimatedDuration = (wordCount / 140) * 60; // 140 words per minute average

        let elapsed = 0;
        const progressBar = document.getElementById("audio-progress-bar");
        const timeDisplay = document.getElementById("audio-time");

        // Progress bar controller loop
        progressInterval = setInterval(() => {
            elapsed += 0.5;
            let percentage = (elapsed / estimatedDuration) * 100;
            if (percentage >= 100) {
                percentage = 100;
                clearInterval(progressInterval);
                playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
                statusText.innerText = "✅ Tour Completed.";
                audioPlaying = false;
            }
            progressBar.style.width = percentage + "%";
            
            // Format minutes and seconds
            let mins = Math.floor(elapsed / 60).toString().padStart(2, '0');
            let secs = Math.floor(elapsed % 60).toString().padStart(2, '0');
            timeDisplay.innerText = `${mins}:${secs}`;
        }, 500);

        // Speech start and stop events
        audioUtterance.onend = function() {
            clearInterval(progressInterval);
            progressBar.style.width = "100%";
            playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            statusText.innerText = "✅ Tour Completed.";
            audioPlaying = false;
        };

        // Start Speaking
        window.speechSynthesis.speak(audioUtterance);
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        statusText.innerText = "🎵 Playing AI Tour Guide Audio...";
        audioPlaying = true;
    }
}

// User click karke bar ko manually change kare uske liye function (Optional/Simulation)
function seekAudio(event) {
    const container = document.querySelector(".audio-progress-container");
    const rect = container.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const widthPercentage = (clickX / rect.width) * 100;
    
    document.getElementById("audio-progress-bar").style.width = widthPercentage + "%";
    // Restart audio from rough estimation if playing
    if (audioPlaying) {
        toggleAudioGuide();
        toggleAudioGuide();
    }
}

// Scanner close hone par audio band karne ke liye purane closeScanner() me ye line jodhna zaroori h
const originalCloseScanner = closeScanner;
closeScanner = function() {
    window.speechSynthesis.cancel();
    clearInterval(progressInterval);
    document.getElementById("audio-progress-bar").style.width = "0%";
    document.getElementById("audio-time").innerText = "00:00";
    const playBtn = document.getElementById("audio-play-btn");
    if(playBtn) playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    audioPlaying = false;
    if (typeof originalCloseScanner === "function") originalCloseScanner();
};
// ====== FEATURE 2: INTERACTIVE BUDGET CALCULATOR LOGIC ======
function updateEstimatedPrice() {
    const destSelect = document.getElementById("calc-dest");
    const selectedOption = destSelect.options[destSelect.selectedIndex];
    const basePrice = parseInt(selectedOption.getAttribute("data-price"));
    
    document.getElementById("rate-per-person").innerText = "₹" + basePrice.toLocaleString('en-IN');
    calculateTripBudget();
}

function calculateTripBudget() {
    const destSelect = document.getElementById("calc-dest");
    const selectedOption = destSelect.options[destSelect.selectedIndex];
    const basePrice = parseInt(selectedOption.getAttribute("data-price"));
    
    let people = parseInt(document.getElementById("calc-people").value);
    if (isNaN(people) || people < 1) people = 1;

    const classSelect = document.getElementById("calc-class");
    const classMultiply = parseFloat(classSelect.options[classSelect.selectedIndex].getAttribute("data-multiply"));

    let subtotal = basePrice * people * classMultiply;
    let discount = (people >= 3) ? (subtotal * 0.10) : 0; // 10% group discount
    let tax = (subtotal - discount) * 0.18; // 18% GST
    let finalTotal = (subtotal - discount) + tax;

    document.getElementById("calc-subtotal").innerText = "₹" + Math.round(subtotal).toLocaleString('en-IN');
    document.getElementById("calc-discount").innerText = "-₹" + Math.round(discount).toLocaleString('en-IN');
    document.getElementById("calc-tax").innerText = "₹" + Math.round(tax).toLocaleString('en-IN');
    document.getElementById("calc-final-total").innerText = "₹" + Math.round(finalTotal).toLocaleString('en-IN');
}

// ====== FEATURE 3: REAL-TIME LIVE TRACKER SIMULATOR LOGIC ======
const mockTrackerData = {
    "Goa": { name: "Goa Flight (SG-201)", type: "plane", start: "Delhi (DEL)", end: "Goa (GOI)", status: "ON TIME", badge: "online", info: "Flight is cruising smoothly at 35,000 feet. Enroute near Mumbai airspace." },
    "Himachal": { name: "Himachal Express (12401)", type: "train", start: "Delhi (NDLS)", end: "Manali via Kalka", status: "DELAYED (15m)", badge: "delayed", info: "Train is running late by 15 mins due to low visibility near hilly tracks." },
    "Kerala": { name: "Kerala Airways (AI-405)", type: "plane", start: "Mumbai (BOM)", end: "Kochi (COK)", status: "ON TIME", badge: "online", info: "Descent started. Preparing to land safely at Kochi International Airport." },
    "Paris": { name: "Paris AirFrance (AF-225)", type: "plane", start: "Delhi (DEL)", end: "Paris (CDG)", status: "ON TIME", badge: "online", info: "International trans-continental flight crossing over European airspace." },
    "Maldives": { name: "Maldives Island Hopper", type: "plane", start: "Kochi (COK)", end: "Male (MLE)", status: "ON TIME", badge: "online", info: "Boarding completed. Taxiing towards runway 27L." },
    "Kyoto": { name: "Kyoto Bullet Train (SHIN-77)", type: "train", start: "Tokyo", end: "Kyoto Central", status: "ON TIME", badge: "online", info: "Hyper speed cruising active. Arriving at next station in 4 minutes." }
};

function startLiveTracking() {
    const selectedDest = document.getElementById("tracker-dest").value;
    const data = mockTrackerData[selectedDest];

    const displayCard = document.getElementById("tracker-display");
    const fillLine = document.getElementById("route-fill");
    const movingIcon = document.getElementById("route-icon");
    const badge = document.getElementById("track-badge");

    displayCard.style.display = "block";
    document.getElementById("track-vehicle-name").innerText = data.name;
    document.getElementById("route-start").innerText = data.start;
    document.getElementById("route-end").innerText = data.end;
    
    badge.innerText = data.status;
    badge.className = `badge ${data.badge}`;
    movingIcon.className = data.type === "plane" ? "fa-solid fa-plane route-moving-icon" : "fa-solid fa-train route-moving-icon";

    fillLine.style.width = "0%";
    movingIcon.style.left = "0%";
    document.getElementById("track-info-text").innerText = "🔄 Establishing connection with satellite transponders...";

    setTimeout(() => {
        let randomProgress = Math.floor(Math.random() * 40) + 45; 
        fillLine.style.width = randomProgress + "%";
        movingIcon.style.left = randomProgress + "%";
        document.getElementById("track-info-text").innerText = data.info;
    }, 600);
}

// Window load trigger
window.addEventListener('DOMContentLoaded', () => {
    if(document.getElementById("calc-dest")) { calculateTripBudget(); }
});
// ... tumhaara purana live tracking ka code chal raha hai ...
setTimeout(() => {
    // Pehle check karo ki kya fillLine aur movingIcon sach mein page par hain
    if (typeof fillLine !== 'undefined' && typeof movingIcon !== 'undefined') {
        let randomProgress = Math.floor(Math.random() * 40) + 45;
        fillLine.style.width = randomProgress + "%";
        movingIcon.style.left = randomProgress + "%";
    }
    
    // Yeh line humesha chalni chahiye agar track-info-text element ho
    let trackText = document.getElementById("track-info-text");
    if (trackText && typeof data !== 'undefined') {
        trackText.innerText = data.info;
    }
}, 600);
   
 // <--- Yeh live tracking function ka aakhri bracket hai

// ====== STEP 2: IS BRACKET KE THEEK NICHE YEH DATA LIKHO ======
const mockItineraryData = {
    "Goa": {
        "3": "<b>Day 1:</b> North Goa beach hopping & sunset cruise.<br><br><b>Day 2:</b> Visit Aguada Fort and water sports.<br><br><b>Day 3:</b> South Goa churches visit and departure.",
        "5": "<b>Day 1-3:</b> Beaches, forts, and clubbing.<br><br><b>Day 4:</b> Explore Dudhsagar waterfalls.<br><br><b>Day 5:</b> Palolem beach relaxing."
    },
    "Himachal": {
        "3": "<b>Day 1:</b> Explore Mall Road & Hadimba Temple.<br><br><b>Day 2:</b> Snow activities at Solang Valley.<br><br><b>Day 3:</b> Jogini Waterfalls trek and return.",
        "5": "<b>Day 1-2:</b> Manali sightseeing and hot springs.<br><br><b>Day 3:</b> Solang Valley & Rohtang Pass.<br><br><b>Day 4:</b> Kasol & Parvati Valley trek.<br><br><b>Day 5:</b> Riverside relaxing and departure."
    },
    "Paris": {
        "3": "<b>Day 1:</b> Eiffel Tower & Seine River cruise.<br><br><b>Day 2:</b> Louvre Museum tour.<br><br><b>Day 3:</b> Palace of Versailles day trip.",
        "5": "<b>Day 1-3:</b> Eiffel Tower, Louvre, and Montmartre.<br><br><b>Day 4:</b> Full-day trip to Disneyland Paris.<br><br><b>Day 5:</b> Shopping and airport departure."
    }
};
function generateAIItinerary() {
    // 1. Budget dropdown se current selected destination ko pakdo
    const destSelect = document.getElementById("calc-dest") || document.getElementById("modal-select");
    const currentDest = destSelect ? destSelect.value : "Goa"; // Default Goa agar kuch na mile
    const selectedDays = document.getElementById("itinerary-days").value;

    // 3. UI Elements ko target karo
    const outputBox = document.getElementById("itinerary-output");
    const titleBox = document.getElementById("itinerary-title");
    const timelineBox = document.getElementById("itinerary-timeline");

    // 4. Data dhoond kar display karo
    if (mockItineraryData[currentDest] && mockItineraryData[currentDest][selectedDays]) {
        titleBox.innerHTML = `✨ Custom ${selectedDays}-Day Plan for <b>${currentDest}</b>`;
        timelineBox.innerHTML = mockItineraryData[currentDest][selectedDays];
        outputBox.style.display = "block"; // Card ko show karo


        
         // Button dabate hi sabko ek sath show karo
         document.getElementById("weather-status").style.display = "block";
         document.getElementById("packing-list").style.display = "block";
         if(document.getElementById("map-section")) {
            document.getElementById("map-section").style.display = "block";
         }


         // ====== ALL INPUTS CONNECTED HERE ======
         updatePackingChecklist(currentDest);
         fetchLiveWeather(currentDest);
         updateLiveMap(currentDest);


        // ====== GRID LAYOUT CODE YAHAN PASTE KARO ======
        const weatherSection = document.getElementById("weather-status");
       if (weatherSection) {
           weatherSection.style.display = "grid";
           weatherSection.style.gridTemplateColumns = "1fr 1fr"; 
             weatherSection.style.gap = "20px";
        }

       
        outputBox.scrollIntoView({ behavior: 'smooth' });
    } else {
        alert("Select a valid destination from the planner first!");
 }
} 
// ====== LIVE WEATHER API INTEGRATION ======
async function fetchLiveWeather(destination) {
    const card = document.querySelector(".weather-card");
    if (!card) return;

    const tempEl = card.querySelector(".temp");
    const descEl = card.querySelector(".weather-desc");
    const iconEl = card.querySelector(".weather-icon");

    const apiKey = "b71575c65acabce9526011c7515cf509"; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${destination}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");
        
        const data = await response.json();
        const temp = Math.round(data.main.temp);
        const condition = data.weather[0].description;
        const icon = data.weather[0].icon;

        if (tempEl) tempEl.innerText = `${temp}°C`;
        if (descEl) {
            descEl.innerText = condition;
            descEl.style.textTransform = "capitalize";
        }
        if (iconEl) {
            iconEl.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" style="width: 35px; height: 35px; vertical-align: middle;" alt="weather">`;
        }
    } catch (error) {
        console.log("Weather fetch error:", error);
    }
} 
// ====== SMART PACKING ASSISTANT DATABASE ======
const packingItemsData = {
    "Goa": ["☀️ Sunscreen (SPF 50+)", "🕶️ Sunglasses & Swimwear", "🩴 Comfortable Slippers/Sandals", "🏖️ Cotton/Beach Wear Clothing", "🔋 Power Bank & Waterproof Pouch"],
    "Himachal": ["🧥 Heavy Jacket / Windcheater", "🧣 Thermal Innerwear & Gloves", "🧦 Thick Woolen Socks", "🥾 Trekking/Sports Shoes", "💊 Motion Sickness & Cold Medicines"],
    "Paris": ["💳 International Forex Card", "🧥 Stylish Trench Coat / Layered Clothes", "👟 Comfortable Walking Shoes", "🔌 Universal Travel Adapter", "📸 Camera / Smartphone Gimbal"]
};

// ====== SMART PACKING ASSISTANT FUNCTION ======
function updatePackingChecklist(destination) {
    const listContainer = document.getElementById("packing-list");
    if (!listContainer) return;

    const items = packingItemsData[destination] || packingItemsData["Goa"];
    listContainer.innerHTML = "";

    items.forEach((item, index) => {
        const itemRow = document.createElement("label");
        itemRow.style.cssText = "display: flex; align-items: center; gap: 12px; padding: 10px 14px; background: white; border-radius: 8px; border: 1px solid #e2e8f0; cursor: pointer; font-size: 15px; color: #334155; margin-bottom: 8px;";
        
        itemRow.innerHTML = `
            <input type="checkbox" id="pack-${index}" style="width: 18px; height: 18px; cursor: pointer;">
            <span>${item}</span>
        `;

        const checkbox = itemRow.querySelector("input");
        checkbox.addEventListener("change", function() {
            if (this.checked) {
                itemRow.style.background = "#f1f5f9";
                itemRow.style.textDecoration = "line-through";
                itemRow.style.color = "#94a3b8";
            } else {
                itemRow.style.background = "white";
                itemRow.style.textDecoration = "none";
                itemRow.style.color = "#334155";
            }
        });

        listContainer.appendChild(itemRow);
    });
}

// ====== LIVE WEATHER API INTEGRATION (SAFE WORKAROUND) ======
async function fetchLiveWeather(destination) {
    // Yeh pure page par jo pehla weather card (Goa ka) hai, use pakdega
    const card = document.querySelector(".weather-card");
    if (!card) return;

    // Card ke andar ke elements ko unki class se dhoondega (layout ko chhede bina)
    const tempEl = card.querySelector(".temp");
    const descEl = card.querySelector(".weather-desc");
    const iconEl = card.querySelector(".weather-icon");

    const apiKey = "b71575c65acabce9526011c7515cf509"; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${destination}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");
        
        const data = await response.json();
        const temp = Math.round(data.main.temp);
        const condition = data.weather[0].description;
        const icon = data.weather[0].icon;

        // 1. Sirf temperature ka number badlo (Layout perfect rahega)
        if (tempEl) tempEl.innerText = `${temp}°C`;
        
        // 2. Sirf mausam ka description badlo
        if (descEl) {
            descEl.innerText = condition;
            descEl.style.textTransform = "capitalize";
        }

        // 3. Purane font icon ki jagah live weather ka chota sa image icon laga do
        if (iconEl) {
            iconEl.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" style="width: 35px; height: 35px; vertical-align: middle; margin-left: 5px;" alt="weather">`;
            iconEl.style.display = "inline-block";
        }
    } catch (error) {
        console.log("Weather fetch error:", error);
    }
}
// Line 557
// ====== LIVE MAP INTEGRATION ======
let myMap; // Map ka global variable
let currentMarker; // Marker ka variable

// Line 561
function initLiveMap() {
    // 1. Agar page par Leaflet/Map library nahi hai, toh yahin se return ho jao
    if (typeof L === 'undefined') {
        console.log("Map library not loaded on this page, skipping map init.");
        return;
    }

    // 2. Agar page par live-map ka div hi nahi hai ya map pehle se bana hai, toh bhi return ho jao
    const mapContainer = document.getElementById("live-map");
    if (!mapContainer || myMap) return;

    // Teeno shehron ke Latitude aur Longitude coordinates
    const destinationCoordinates = {
        "Goa": [15.2993, 74.1240],
        "Himachal": [31.1048, 77.1734],
        "Paris": [48.8566, 2.3522]
    };

    // 3. Default Goa ke coordinates par map shuru karo
    myMap = L.map('live-map').setView(destinationCoordinates["Goa"], 9);

    // OpenStreetMap ke sundar tiles load karo
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(myMap);

    // Pehla default marker lagao
    currentMarker = L.marker(destinationCoordinates["Goa"]).addTo(myMap)
        .bindPopup('<b>Welcome to Goa!</b><br>Your travel plan is ready.')
        .openPopup();
}

// Destination badalne par Map ko update karne ka function
function updateLiveMap(destination) {
    // Agar map abhi tak initialize nahi hua hai, toh pehle use shuru karo
    if (!myMap) {
        initLiveMap();
    }

    const coords = destinationCoordinates[destination] || destinationCoordinates["Goa"];

    if (myMap) {
        // Map ko naye shehar par smooth fly karke le jao
        myMap.flyTo(coords, 10, { duration: 1.5 });

        // Purana marker hata kar naya marker lagao
        if (currentMarker) myMap.removeLayer(currentMarker);
        
        currentMarker = L.marker(coords).addTo(myMap)
            .bindPopup(`<b>Explore ${destination}!</b><br>Live location loaded.`)
            .openPopup();
    }
}

// Page load hote hi map ka basic structure taiyar rakho
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(initLiveMap, 1000); // 1 second baad safe load hoga
});
// Step-by-step smooth scroll logic
document.addEventListener("DOMContentLoaded", () => {
    const nextBtn = document.getElementById("btn-next-itinerary");
    
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            // 1. Pehle budget calculation ya itinerary generator function ko call karo (agar zarurat ho)
            if (typeof calculateTripBudget === 'function') {
                calculateTripBudget();
            }
            
            // 2. Ab user ko smoothly scroll karke Packing Assistant section par le jao
            const packingSection = document.querySelector(".assistance-section") || document.getElementById("smart-assistance");
            if (packingSection) {
                packingSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    }
});
// Step-by-step smooth scroll connection
document.addEventListener("DOMContentLoaded", () => {
    const nextBtn = document.getElementById("btn-next-itinerary");
    
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            // Page ko smoothly niche packing assistant section par lekar jao
            // Agar tumhare div par koi alag class ya ID hai toh use match kar sakte hain
            const packingSection = document.getElementById("smart-assistance") || document.querySelector(".assistance-section");
            
            if (packingSection) {
                packingSection.scrollIntoView({ behavior: "smooth" });
            } else {
                // Agar elements par upar waali ID nahi mili, toh window direct thoda niche scroll ho jayegi
                window.scrollBy({ top: 500, behavior: 'smooth' });
            }
        });
    }
});
