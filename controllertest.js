 
function chooseBar(barNo){
    chosenBar = barNo === chosenBar ? null : barNo;
    if(chosenBar === null){
        enabledButton = 'disabled';
        errormld = '';
    } else{
        enabledButton = '';
        errormld = '';
    }

    show();
}
function changeBar(){
    if(inputValue > 10){
        errormld = 'TALL ER STØRRE EN 10'
    } else {
        numbers.splice(chosenBar -1, 1, parseInt(inputValue))
        errormld = '';
    }
   
   show()
}

function delBar(){
   numbers.splice(chosenBar -1, 1)
   show()
}

function createNewBar(){
   if(inputValue > 10){
       errormld = 'TALL ER STØRRE EN 10'
   } else {
   numbers.push(inputValue);
   errormld = '';
   }
   show();
}