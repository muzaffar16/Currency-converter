// const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/usd/pak/currencies";

// const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const selectCountry = document.querySelectorAll(".convert select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const btn= document.querySelector(".btn");
const msg = document.querySelector(".result")

for(let select of selectCountry){
   
    for (let code in countryList){
       // console.log(code, countryList[code])
       let newOption=document.createElement("option")
       newOption.innerText=code
       newOption.value=code
       if (select.name == "from" && code == "USD") {
        newOption.selected = "selected";
      } else if (select.name == "to" && code == "INR") {
        newOption.selected = "selected";
      }
      select.append(newOption);
    }
    
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target) // mean kis specific option ko select kiya hai 
    })
}

function updateFlag(element){
    // console.log(element)
    let countryName = element.value
    let flagName = countryList[countryName]
    // console.log(flagName)
    let flagUrl = `https://flagsapi.com/${flagName}/flat/64.png`;
    element.parentElement.querySelector("img").src = flagUrl;

}

btn.addEventListener("click",(evt)=>{
    updateMsg()
})

async function updateMsg() {
    // Get the amount input and validate it
    let amount = document.querySelector("input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1 || isNaN(amtVal)) {
        amtVal = 1;
        amount.value = "1";
    }
    
    // Get the selected currencies and convert to lowercase
    let fromCurrValue = fromCurr.value;
    let toCurrValue = toCurr.value;

    // API URL
    let URL = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_9XbXRGWKi3naV8z3Oz9ZCWhjcVnzAkMAryUFMSdr";
        // Fetch the latest currency rates
        let response = await fetch(URL);
        let data = await response.json();
        
        // Get the conversion rates
        let fromRate = data.data[fromCurrValue];
        let toRate = data.data[toCurrValue];

        // Calculate the conversion
        let convertedAmount = (amtVal / fromRate) * toRate;
        //  console.log(convertedAmount)
        // Update the DOM with the conversion result
    //    console.log(msg.innerText)
    msg.innerText = `${amtVal} ${fromCurrValue} = ${convertedAmount} ${toCurrValue}`
        

    
}





