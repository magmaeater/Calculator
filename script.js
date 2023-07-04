let button = document.querySelectorAll("button");
let display = document.querySelector("#dis");
let operatorFlag = false;
let safe = checkSafeDecimal(display.innerHTML);
let opList = ["/","*","-","+"];

//function to check if you can enter decimal in provided equation

function checkSafeDecimal(text)
{
    let decCount = 0;
    let numEntered = false;

    for(i of text)
    {
        if(i === ".")
        {
            decCount++;            
        }
        else if(isFinite(i))
        {
            numEntered = true;
        }
        else if(opList.includes(i) )
        {
            decCount = 0;
            numEntered = false;
        }   
    }

    //only enter dec when numEntered is true and decCount is 0

    if(numEntered === true && decCount === 0)
    {
        return true;
    }
    else
    {
    return false;
    }
}


button.forEach(element => 
    {
    element.addEventListener('click', item => 
        {   

            let txt = element.innerHTML; 
            safe = checkSafeDecimal(display.innerHTML);
            let last_letter_is_operator = opList.includes(display.innerHTML.slice(-1));
            
            //equals input
            if(txt === "=")
            {
                display.innerHTML = "";
            }

            //number input
            if(isFinite(txt))
            {
                display.innerHTML += txt;
                 
            }

            //clear screen input
            else if(txt === "A/C")
            {
                display.innerHTML = "";
                
            }

            //delete input
            else if(txt === 'del')
            {
                display.innerHTML = display.innerHTML.slice(0,-1);
                  
            }

            //decimal input
            else if(txt === '.' && safe === true)
            {
                display.innerHTML += txt;
                  
            }

            //operator input
            else if(!last_letter_is_operator && display.innerHTML.slice(-1) !== '.' && txt !== '.')
            {
                    display.innerHTML += txt;
            }

        });

});