import apiRequest from "./api-request";
import clearResults from "./clearResults";

export default ()=>{
    document.getElementById('search_btn').addEventListener('click',e =>{
        //these are the only specific ones needed
        const birthdate = document.getElementById('birth-day');
        const birthmonth = document.getElementById('birth-month');
        const birthyear = document.getElementById('birth-year');

        //initalise query param as empty string
        let queryparam = "";

        e.preventDefault(); //prevent page from reloading
        clearResults(); //clear results before making api calls and re-showing them

        const allInputs = document.querySelectorAll('.nhsuk-form-group > input');

        //loop through all inputs
        for(let i = 0; i < allInputs.length; i++) {
            if(allInputs[i].value != ""){ //if the input is not empty
                if(allInputs[i].name == "nhs-number") { //if the input is the nhs number
                    queryparam = 'identifier=https://fhir.nhs.uk/Id/nhs-number%7C' + allInputs[i].value;
                }
                if (queryparam != "" && allInputs[i].name == "family") { //if family is filled and is the first field that's filled in
                    //concatenate family
                    queryparam += '&family=' + allInputs[i].value;
                } else if(queryparam == "" && allInputs[i].name == "family") queryparam = 'family=' + allInputs[i].value; //none of the previous fields are filled in and family is the first to be, then add family to the string
                if (queryparam != "" && allInputs[i].name == "given-name") { //if given-name is filled and is the first field that's filled in
                   //concatenate family
                    queryparam += '&given=' + allInputs[i].value;
                } else if(queryparam == "" && allInputs[i].name == "given-name") queryparam = 'given=' + allInputs[i].value; //none of the previous fields are filled in and given is the first to be, then add family to the string
                //dob
                if (queryparam != "" && allInputs[i].name == "birth-day" || allInputs[i].name == "birth-year" || allInputs[i].name == "birth-month") {
                    if(!queryparam.includes("birthdate") && birthdate.value != "" && birthmonth.value != "" && birthyear.value != "") {
                        queryparam += '&birthdate=' + birthyear.value + '-' + birthmonth.value + '-' + birthdate.value;
                    } 
                }  else if(queryparam == "" && allInputs[i].name == "birth-day" || allInputs[i].name == "birth-year" || allInputs[i].name == "birth-month") {
                    if(!queryparam.includes("birthdate") && birthdate.value != "" && birthmonth.value != "" && birthyear.value != "") {
                        queryparam += 'birthdate=' + birthyear.value + '-' + birthmonth.value + '-' + birthdate.value;
                        
                    } 
                }
            }
            
        }
        //once loop is complete, make api request
        apiRequest(queryparam);
    })
}