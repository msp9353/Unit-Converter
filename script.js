const input = document.getElementById("inputValue");
const select = document.getElementById("unitSelect");
const tableBody = document.querySelector("#resultsTable tbody");

// Conversion functions
function convert(value, unit) {
  let results = {};

  // Weight
  if (unit === "lbs") {
    results = { kg: value*0.453592, g: value*453.592, mg: value*453592, oz: value*16, lbs: value };
  } else if (unit === "kg") {
    results = { lbs: value*2.20462, g: value*1000, mg: value*1000000, oz: value*35.274, kg: value };
  }

  // Length
  if (unit === "ft") {
    results = { in: value*12, yd: value/3, m: value*0.3048, cm: value*30.48, mm: value*304.8, km: value*0.0003048, mi: value/5280, ft: value };
  } else if (unit === "in") {
    results = { ft: value/12, yd: value/36, m: value*0.0254, cm: value*2.54, mm: value*25.4, km: value*0.0000254, mi: value/63360, in: value };
  } else if (unit === "yd") {
    results = { ft: value*3, in: value*36, m: value*0.9144, cm: value*91.44, mm: value*914.4, km: value*0.0009144, mi: value/1760, yd: value };
  } else if (unit === "mi") {
    results = { ft: value*5280, in: value*63360, m: value*1609.34, cm: value*160934, mm: value*1609340, km: value*1.60934, yd: value*1760, mi: value };
  } else if (unit === "m") {
    results = { ft: value/0.3048, in: value/0.0254, yd: value/0.9144, cm: value*100, mm: value*1000, km: value/1000, mi: value/1609.34, m: value };
  } else if (unit === "cm") {
    results = { m: value/100, mm: value*10, ft: value/30.48, in: value/2.54, yd: value/91.44, km: value/100000, mi: value/160934, cm: value };
  } else if (unit === "mm") {
    results = { m: value/1000, cm: value/10, ft: value/304.8, in: value/25.4, yd: value/914.4, km: value/1000000, mi: value/1609340, mm: value };
  } else if (unit === "km") {
    results = { m: value*1000, cm: value*100000, mm: value*1000000, ft: value*3280.84, in: value*39370.1, yd: value*1093.61, mi: value/1.60934, km: value };
  }

  // Volume
  if (unit === "m3") {
    results = { ml: value*1e6, floz: value*33814, ft3: value*35.3147, cup: value*4226.75, gal: value*264.172, qt: value*1056.69, pt: value*2113.38, tbsp: value*67628, tsp: value*202884, m3: value };
  } else if (unit === "ml") {
    results = { m3: value/1e6, floz: value*0.033814, ft3: value/28316.8, cup: value/236.588, gal: value/3785.41, qt: value/946.353, pt: value/473.176, tbsp: value/14.7868, tsp: value/4.92892, ml: value };
  } else if (unit === "floz") {
    results = { ml: value*29.5735, m3: value/33814, ft3: value/957.506, cup: value/8, gal: value/128, qt: value/32, pt: value/16, tbsp: value*2, tsp: value*6, floz: value };
  }
  // (Add remaining volume conversions as needed)

  return results;
}

function updateTable() {
  const value = parseFloat(input.value);
  const unit = select.value;
  if (isNaN(value)) return;

  const results = convert(value, unit);

  tableBody.innerHTML = "";
  let i = 0;
  for (const [key, val] of Object.entries(results)) {
    const row = document.createElement("tr");
    if (i % 2 === 0) row.style.backgroundColor = "#ffffff";
    else row.style.backgroundColor = "#e0e7ff";

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
select.addEventListener("change", updateTable);
