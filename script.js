const weightUnits = ["lbs","kg","g","mg","oz"];
const lengthUnits = ["ft","in","yd","mi","m","cm","mm","km"];
const volumeUnits = ["m3","ml","floz","ft3","cup","gal","qt","pt","tbsp","tsp"];

const unitSelect = document.getElementById("unitSelect");
const input = document.getElementById("inputValue");
const tableBody = document.querySelector("#resultsTable tbody");

// Populate dropdown based on type
function setUnits(type) {
  let units;
  if(type === "weight") units = weightUnits;
  else if(type === "length") units = lengthUnits;
  else if(type === "volume") units = volumeUnits;

  unitSelect.innerHTML = "";
  units.forEach(u => {
    const option = document.createElement("option");
    option.value = u;
    option.textContent = u;
    unitSelect.appendChild(option);
  });

  updateTable();
}

// Highlight active button
function setActiveButton(id) {
  document.querySelectorAll(".type-btn").forEach(b => b.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// Button event listeners
document.getElementById("weightBtn").addEventListener("click", () => { setUnits("weight"); setActiveButton("weightBtn"); });
document.getElementById("lengthBtn").addEventListener("click", () => { setUnits("length"); setActiveButton("lengthBtn"); });
document.getElementById("volumeBtn").addEventListener("click", () => { setUnits("volume"); setActiveButton("volumeBtn"); });

// Conversion function
function convert(value, unit) {
  let results = {};

  // Weight
  if (["lbs","kg","g","mg","oz"].includes(unit)) {
    const lbsToKg = 0.453592;
    const kgToLbs = 1 / lbsToKg;
    let valueInKg;
    switch(unit){
      case "lbs": valueInKg = value * lbsToKg; break;
      case "kg": valueInKg = value; break;
      case "g": valueInKg = value / 1000; break;
      case "mg": valueInKg = value / 1e6; break;
      case "oz": valueInKg = value * 0.0283495; break;
    }
    results = {
      kg: valueInKg,
      g: valueInKg*1000,
      mg: valueInKg*1e6,
      lbs: valueInKg*kgToLbs,
      oz: valueInKg*35.274
    };
  }

  // Length
  if (["ft","in","yd","mi","m","cm","mm","km"].includes(unit)) {
    let valueInM;
    switch(unit){
      case "ft": valueInM = value*0.3048; break;
      case "in": valueInM = value*0.0254; break;
      case "yd": valueInM = value*0.9144; break;
      case "mi": valueInM = value*1609.34; break;
      case "m": valueInM = value; break;
      case "cm": valueInM = value/100; break;
      case "mm": valueInM = value/1000; break;
      case "km": valueInM = value*1000; break;
    }
    results = {
      ft: valueInM/0.3048,
      in: valueInM/0.0254,
      yd: valueInM/0.9144,
      mi: valueInM/1609.34,
      m: valueInM,
      cm: valueInM*100,
      mm: valueInM*1000,
      km: valueInM/1000
    };
  }

  // Volume
  if (["m3","ml","floz","ft3","cup","gal","qt","pt","tbsp","tsp"].includes(unit)) {
    let valueInM3;
    switch(unit){
      case "m3": valueInM3 = value; break;
      case "ml": valueInM3 = value/1e6; break;
      case "floz": valueInM3 = value*2.9574e-5; break;
      case "ft3": valueInM3 = value*0.0283168; break;
      case "cup": valueInM3 = value*0.000236588; break;
      case "gal": valueInM3 = value*0.00378541; break;
      case "qt": valueInM3 = value*0.000946353; break;
      case "pt": valueInM3 = value*0.000473176; break;
      case "tbsp": valueInM3 = value*1.47868e-5; break;
      case "tsp": valueInM3 = value*4.92892e-6; break;
    }
    results = {
      m3: valueInM3,
      ml: valueInM3*1e6,
      floz: valueInM3/2.9574e-5,
      ft3: valueInM3/0.0283168,
      cup: valueInM3/0.000236588,
      gal: valueInM3/0.00378541,
      qt: valueInM3/0.000946353,
      pt: valueInM3/0.000473176,
      tbsp: valueInM3/1.47868e-5,
      tsp: valueInM3/4.92892e-6
    };
  }

  return results;
}

// Update the table
function updateTable() {
  const value = parseFloat(input.value);
  const unit = unitSelect.value;
  if (isNaN(value)) return;

  const results = convert(value, unit);
  tableBody.innerHTML = "";
  let i = 0;
  for (const [key,val] of Object.entries(results)) {
    const row = document.createElement("tr");
    row.style.backgroundColor = i%2===0 ? "#ffffff" : "#e0e7ff";

    const unitCell = document.createElement("td");
    unitCell.textContent = key;
    const valCell = document.createElement("td");
    valCell.textContent = val.toFixed(4);

    row.appendChild(unitCell);
    row.appendChild(valCell);
    tableBody.appendChild(row);
    i++;
  }
}

input.addEventListener("input", updateTable);
unitSelect.addEventListener("change", updateTable);

// Initialize default
setUnits("weight");
