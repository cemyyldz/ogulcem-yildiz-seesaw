const seesaw = document.querySelector('.seesaw-wrapper');
const seesawElement = document.querySelector('.seesaw');
let weights = [];
let nextWeight = Math.floor(Math.random() * 10) + 1;
let history = [];

seesaw.addEventListener('click', (e) => {
  const rect = seesawElement.getBoundingClientRect();
  const clickX = e.clientX - rect.left;

  const weightValue = nextWeight;
  nextWeight = Math.floor(Math.random() * 10) + 1;

  const seesawWidth = seesaw.offsetWidth;
  const pivotX = seesawWidth / 2;
  const distanceFromCenter = clickX - pivotX;
  const absDistance = Math.abs(Math.floor(distanceFromCenter));

  const weightDiv = document.createElement('div');
  weightDiv.classList.add('weight');
  weightDiv.style.left = `${clickX - 10}px`;
  weightDiv.style.bottom = '20px';
  weightDiv.textContent = weightValue + "kg";


  seesawElement.appendChild(weightDiv);
  weights.push({ x: clickX, weight: weightValue });
  localStorage.setItem("weightsData", JSON.stringify(weights));



  history.push({ weight: weightValue, distance: absDistance });
  localStorage.setItem('historyData', JSON.stringify(history));



  const historyList = document.getElementById("history-list");
  if (historyList) {
    const item = document.createElement('div');
    item.className = 'history-item';
    item.textContent = `Eklenen ağırlık: ${weightValue} kg | Merkeze uzaklık: ${Math.abs(Math.floor(distanceFromCenter))} px`;
    historyList.appendChild(item);
    historyList.scrollTop = historyList.scrollHeight; 
  }



  document.getElementById("last-weight").textContent = weightValue;
  document.getElementById("last-distance").textContent = absDistance;





  updateSeesaw();


  console.log(`Yeni ağırlık:${weightValue}kg,X:${absDistance}px`);
});

function updateSeesaw() {
  const seesawWidth = seesaw.offsetWidth;
  const pivotX = seesawWidth / 2;

  let leftTorque = 0;
  let rightTorque = 0;
  let leftWeightSum = 0;
  let rightWeightSum = 0;

  weights.forEach(obj => {
    const distance = obj.x - pivotX;
    if (distance < 0) {
      leftWeightSum += obj.weight;
      leftTorque += obj.weight * Math.abs(distance)
    } else {
      rightWeightSum += obj.weight;
      rightTorque += obj.weight * distance;
    }
  });

  let angle = (rightTorque - leftTorque) / 10;
  angle = Math.max(-30, Math.min(30, angle));

  seesawElement.style.transform = `rotate(${angle}deg)`;
  localStorage.setItem("currentAngle", angle);


  document.getElementById("left-weight").textContent = `Sol: ${leftWeightSum} kg | Sıradaki: ${nextWeight} kg`;
  document.getElementById("right-weight").textContent = `Sağ: ${rightWeightSum} kg | Açı: ${angle.toFixed(1)}°`;
}

function loadFromStorage() {
  const savedWeights = localStorage.getItem("weightsData");
  const savedAngle = localStorage.getItem("currentAngle");
  const savedHistory = localStorage.getItem("historyData");

  if (savedWeights) {
    weights = JSON.parse(savedWeights);

    weights.forEach(obj => {
      const weightDiv = document.createElement('div');
      weightDiv.classList.add('weight');
      weightDiv.style.left = `${obj.x - 10}px`;
      weightDiv.style.bottom = `20px`;
      weightDiv.textContent = obj.weight + "kg";
      seesawElement.appendChild(weightDiv);
    });
  }
  if (savedAngle) {
    seesawElement.style.transform = `rotate(${savedAngle}deg)`;
  }
  if (savedHistory) {
    history = JSON.parse(savedHistory);
    const historyList = document.getElementById("history-list");
    if (historyList) {
      historyList.innerHTML = "";
      history.forEach(item => {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.textContent = `Eklenen ağırlık: ${item.weight} kg | Merkeze uzaklık: ${item.distance} px`;
        historyList.appendChild(div);
      });
    }
  }


  updateSeesaw();
}
loadFromStorage();

document.getElementById("reset-btn").addEventListener("click", resetSeesaw);

function resetSeesaw() {
  weights = [];
  history = [];

  localStorage.removeItem("weightsData");
  localStorage.removeItem("currentAngle");
  localStorage.removeItem('historyData');


  document.querySelectorAll(".weight").forEach(w => w.remove());

  seesawElement.style.transform = "rotate(0deg)";
  nextWeight = Math.floor(Math.random() * 10) + 1;

  document.getElementById("left-weight").textContent = `Sol: 0 kg | Sıradaki: ${nextWeight} kg`;
  document.getElementById("right-weight").textContent = `Açı: 0 kg | Açı: 0°`;

  document.getElementById("last-weight").textContent = "-";
  document.getElementById("last-distance").textContent = "-";
  document.getElementById("history-list").innerHTML = "";

  console.log("Reset işlemi başarılı");

}