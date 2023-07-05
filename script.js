let button = document.querySelectorAll("button");
let display = document.querySelector("#dis");
let operatorFlag = false;
let safe = checkSafeDecimal(display.innerHTML);
let opList = ["/","*","-","+"];
let equation_to_be_operated_on = "";

let compute = {
    '+': function(a, b) {
        return a + b;
    },
    '*': function(a, b) {
        return a * b;
    },
    '/': function(a, b) {
        return a / b;
    },
    '-': function(a, b) {
        return a - b;
    },
    
};


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

function operate(equation)
{
    let arr = equation.split(" ");
    
    let working_answer = parseFloat(arr[0]);
    let operator;

    for(let i = 1; i < arr.length; i++)
    {
        if(opList.includes(arr[i]))
        {
            operator = arr[i];
        }
        else
        {
            working_answer = compute[operator](parseFloat(working_answer),parseFloat(arr[i]));
        }
    }
    
    console.log(typeof working_answer);
    return Math.round(working_answer*1000)/1000;
}



button.forEach(element => 
    {
    element.addEventListener('click', item => 
        {   

            let txt = element.innerHTML; 
            safe = checkSafeDecimal(display.innerHTML);
            let last_letter_is_operator = opList.includes(display.innerHTML.slice(-1));
            let empty_display = display.innerHTML === "";
             
            
            //equals input
            if(txt === "=")
            {
                display.innerHTML = `${operate(equation_to_be_operated_on)}`;
                equation_to_be_operated_on = operate(equation_to_be_operated_on);
            }

            //number input
            if(isFinite(txt))
            {
                equation_to_be_operated_on = equation_to_be_operated_on + txt; 
                display.innerHTML += txt;
                 
            }

            //clear screen input
            else if(txt === "A/C")
            {
                equation_to_be_operated_on = "";
                display.innerHTML = "";
                
            }

            //delete input
            else if(txt === 'del')
            {
                //delete the operator properly with white space for the formatted equation that we can are gonna use for operate function
                if(equation_to_be_operated_on.slice(-1) === " ")
                {
                    equation_to_be_operated_on = equation_to_be_operated_on.slice(0,-3);
                }
                else
                {
                    equation_to_be_operated_on = equation_to_be_operated_on.slice(0,-1);  
                } 
                console.log(equation_to_be_operated_on);

                display.innerHTML = display.innerHTML.slice(0,-1);
                  
            }

            //decimal input
            else if(txt === '.' && safe === true)
            {
                equation_to_be_operated_on = equation_to_be_operated_on + txt; 
                display.innerHTML += txt;
                  
            }

            //operator input
            else if(!last_letter_is_operator && !empty_display && display.innerHTML.slice(-1) !== '.' && txt !== '.' && txt !== '=')
            {
                    equation_to_be_operated_on = equation_to_be_operated_on + " " + txt + " "; 
                    display.innerHTML = display.innerHTML + txt;
                    
            }

        });
        
});