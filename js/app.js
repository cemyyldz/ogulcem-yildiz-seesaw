const seesaw=document.querySelector('.seesaw-wrapper');
const seesawElement=document.querySelector('.seesaw');
let weights=[];
let nextWeight = Math.floor(Math.random() * 10) + 1;

seesaw.addEventListener('click',(e) => {
  const rect=seesawElement.getBoundingClientRect();
  const clickX =e.clientX - rect.left;

  const weightValue = nextWeight;
  nextWeight = Math.floor(Math.random() * 10) + 1;
  
  const weightDiv=document.createElement('div');
  weightDiv.classList.add('weight');
  weightDiv.style.left=`${clickX-10}px`;
  weightDiv.style.bottom='20px';
  weightDiv.textContent=weightValue + "kg";


  seesawElement.appendChild(weightDiv);
  weights.push({x: clickX,weight:weightValue});
  localStorage.setItem("weightsData",JSON.stringify(weights));
  
  const seesawWidth = seesaw.offsetWidth;
  const pivotX = seesawWidth / 2;
  const distanceFromCenter = clickX - pivotX;

  document.getElementById("last-weight").textContent = weightValue;
  document.getElementById("last-distance").textContent = Math.abs(Math.floor(distanceFromCenter));
  
  
  
  updateSeesaw();


  console.log(`Yeni ağırlık:${weightValue}kg,X:${clickX}px`);
});

function updateSeesaw(){
  const seesawWidth=seesaw.offsetWidth;
  const pivotX=seesawWidth / 2;

  let leftTorque = 0;
  let rightTorque = 0;
  let leftWeightSum =0;
  let rightWeightSum = 0;

  weights.forEach(obj => {
    const distance = obj.x - pivotX;
    if(distance<0){
      leftWeightSum +=obj.weight;
      leftTorque += obj.weight *Math.abs(distance)
    } else {
      rightWeightSum +=obj.weight;
      rightTorque += obj.weight *distance;
    }
  });

  let angle = (rightTorque - leftTorque)/10;
  angle = Math.max(-30,Math.min(30,angle));

  seesawElement.style.transform = `rotate(${angle}deg)`;
  localStorage.setItem("currentAngle",angle);

  document.getElementById("left-weight").textContent = `Left: ${leftWeightSum} kg | Sıradaki: ${nextWeight} kg`;
  document.getElementById("right-weight").textContent = `Right: ${rightWeightSum} kg | Açı: ${angle.toFixed(1)}°`;
}

function loadFromStorage(){
  const savedWeights = localStorage.getItem("weightsData");
  const savedAngle = localStorage.getItem("currentAngle");

  if(savedWeights){
    weights =JSON.parse(savedWeights);

    weights.forEach(obj =>{
      const weightDiv =document.createElement('div');
      weightDiv.classList.add('weight');
      weightDiv.style.left=`${obj.x-10}px`;
      weightDiv.style.bottom=`20px`;
      weightDiv.textContent=obj.weight + "kg";
      seesawElement.appendChild(weightDiv);
    });
  }
  if(savedAngle){
    seesawElement.style.transform=`rotate(${savedAngle}deg)`;
  }
  updateSeesaw();
}
loadFromStorage();

document.getElementById("reset-btn").addEventListener("click",resetSeesaw);

function resetSeesaw(){
  weights=[];

  localStorage.removeItem("weightsData");
  localStorage.removeItem("currentAngle");

  document.querySelectorAll(".weight").forEach(w=>w.remove());

  seesawElement.style.transform ="rotate(0deg)";
  nextWeight = Math.floor(Math.random() * 10) + 1;

  document.getElementById("left-weight").textContent = `Left: 0 kg | Sıradaki: ${nextWeight} kg`;
  document.getElementById("right-weight").textContent = `Right: 0 kg | Açı: 0°`;

  document.getElementById("last-weight").textContent = "-";
  document.getElementById("last-distance").textContent = "-";

  console.log("Reset işlemi başarılı");

}