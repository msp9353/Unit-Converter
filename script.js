// Unit arrays with full names
const weightUnits = ["pounds","kilograms","grams","milligrams","ounces"];
const lengthUnits = ["feet","inches","yards","miles","meters","centimeters","millimeters","kilometers"];
const volumeUnits = ["cubic meters","milliliters","fluid ounces","cubic feet","cups","gallons","quarts","pints","tablespoons","teaspoons"];

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
  if (weightUnits.includes(unit)) {
    let valueInKg;
    switch(unit){
      case "pounds": valueInKg = value * 0.453592; break;
      case "kilograms": valueInKg = value; break;
      case "grams": valueInKg = value / 1000; break;
      case "milligrams": valueInKg = value / 1e6; break;
      case "ounces": valueInKg = value * 0.0283495; break;
    }
    results = {
      "kilograms": valueInKg,
      "grams": valueInKg*1000,
      "milligrams": valueInKg*1e6,
      "pounds": valueInKg*(1/0.453592),
      "ounces": valueInKg*35.274
    };
  }

  // Length
  if (lengthUnits.includes(unit)) {
    let valueInM;
    switch(unit){
      case "feet": valueInM = value*0.3048; break;
      case "inches": valueInM = value*0.0254; break;
      case "yards": valueInM = value*0.9144; break;
      case "miles": valueInM = value*1609.34; break;
      case "meters": valueInM = value; break;
      case "centimeters": valueInM = value/100; break;
      case "millimeters": valueInM = value/1000; break;
      case "kilometers": valueInM = value*1000; break;
    }
    results = {
      "feet": valueInM/0.3048,
      "inches": valueInM/0.0254,
      "yards": valueInM/0.9144,
      "miles": valueInM/1609.34,
      "meters": valueInM,
      "centimeters": valueInM*100,
      "millimeters": valueInM*1000,
      "kilometers": valueInM/1000
    };
  }

  // Volume
  if (volumeUnits.includes(unit)) {
    let valueInM3;
    switch(unit){
      case "cubic meters": valueInM3 = value; break;
      case "milliliters": valueInM3 = value/1e6; break;
      case "fluid ounces": valueInM3 = value*2.9574e-5; break;
      case "cubic feet": valueInM3 = value*0.0283168; break;
      case "cups": valueInM3 = value*0.000236588; break;
      case "gallons": valueInM3 = value*0.00378541; break;
      case "quarts": valueInM3 = value*0.000946353; break;
      case "pints": valueInM3 = value*0.000473176; break;
      case "tablespoons": valueInM3 = value*1.47868e-5; break;
      case "teaspoons": valueInM3 = value*4.92892e-6; break;
    }
    results = {
      "cubic meters": valueInM3,
      "milliliters": valueInM3*1e6,
      "fluid ounces": valueInM3/2.9574e-5,
      "cubic feet": valueInM3/0.0283168,
      "cups": valueInM3/0.000236588,
      "gallons": valueInM3/0.00378541,
      "quarts": valueInM3/0.000946353,
      "pints": valueInM3/0.000473176,
      "tablespoons": valueInM3/1.47868e-5,
      "teaspoons": valueInM3/4.92892e-6
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
    valCell.textContent = val.toLocaleString(undefined, {maximumFractionDigits: 2});

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
