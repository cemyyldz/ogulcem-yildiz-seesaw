const seesaw=document.querySelector('.seesaw-wrapper');
const seesawElement=document.querySelector('.seesaw');
seesaw.addEventListener('click',(e) => {
  const rect=seesaw.getBoundingClientRect();
  const clickX =e.clientX - rect.left;

  const weightValue=Math.floor(Math.random()*10)+1;
  
  const weightDiv=document.createElement('div');
  weightDiv.classList.add('weight')
  weightDiv.style.left=`$[clickX-10}px`;
  weightDiv.style.bottom='20px';
  weightDiv.textContent=weightValue;

  seesaw.appendChild(weightDiv);

  console.log(`Yeni ağırlık:${weightValue}kg,X:${clickX}px`);
});