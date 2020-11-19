 // hjelpevariable for både view og controller
 var contentDiv = document.getElementById('content');

 // model
 let numbers = [7, 3, 1, 5, 8];
 let chosenBar = 'du har ikke valgt en stolpe'; // Variabel for hvilken stolpe som er valgt
 let inputValue; // Variabel for hva som er skrevet i input-feltet
 let stroke = "";
 let enabledButton = `disabled`
 let errormld = '';
 // view
 show();
 function show() {
     let svgInnerHtml = '';
     for (let i = 0; i < numbers.length; i++) {
         svgInnerHtml += createBar(numbers[i], i + 1);
     }
     contentDiv.innerHTML = `
         <svg id="chart" width="500" viewBox="0 0 80 60" class="stolpe">
             ${svgInnerHtml}
         </svg><br/>
         <p>Valgt stolpe: <span id="valgtStolpe"><i><b>${chosenBar}</b></i></span></p>
         <p id="error">${errormld}</p>
         <br />
         Verdi:
         <input type="number"  min="1" max="10" oninput="inputValue = this.value" />
         <button onclick="createNewBar()">Legg til stolpe</button>
         <button ${enabledButton} onclick="changeBar()">Endre valgt stolpe</button><br />
         <button ${enabledButton} onclick="delBar()">Fjerne valgt stolpe</button>
         `;
 }

 function createBar(number, barNo) {
     const width = 8;
     const spacing = 2;
     let x = (barNo - 1) * (width + spacing);
     let height = number * 10;
     let y = 60 - height;
     let color = calcColor(1, 10, barNo);
     let stroke = chosenBar === barNo ? `stroke: black` : "";
     return `<rect width="${width}" 
                   height="${height}"
                   x="${x}" 
                   y="${y}" 
                   fill="${color}"
                   style="${stroke}" 
                   id="bar${barNo}"
                   onclick="chooseBar(${barNo})"></rect>`;
 }

 function calcColor(min, max, val) {
     var minHue = 240, maxHue = 0;
     var curPercent = (val - min) / (max - min);
     var colString = "hsl(" + ((curPercent * (maxHue - minHue)) + minHue) + ",100%,50%)";
     return colString;
 }

 // controller

 function chooseBar(barNo){
     chosenBar = barNo === chosenBar ? null : barNo;
     if(chosenBar === null){
         enabledButton = 'disabled';
         chosenBar = 'du har ikke valgt en stolpe';
         errormld = '';
     } else{
         enabledButton = '';
         errormld = '';
         inputValue = '';
     }

     show();
 }
 function changeBar(){
     if(inputValue > 10 || inputValue < 1 || isNaN(inputValue)){
         errormld = 'TALL ER IKKE MELLOM 1 OG 10 ELLER ET GYLDIG TEGN!'
     }  else {
         numbers.splice(chosenBar -1, 1, parseInt(inputValue))
         errormld = '';
     }
    
    show()
 }

 function delBar(){
    numbers.splice(chosenBar -1, 1)
    chosenBar = 'du har ikke valgt en stolpe';
    show()
 }

 function createNewBar(){
    if(inputValue > 10 || inputValue < 1 || isNaN(inputValue)){
        errormld = 'TALL ER IKKE MELLOM 1 OG 10 ELLER ET GYLDIG TEGN!'
    } else {
    numbers.push(inputValue);
    errormld = '';
    }
    show();
 }