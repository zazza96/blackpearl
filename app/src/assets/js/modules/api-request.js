import selectRecord from "./selectRecord";

export default queryparam => {
    const url = "https://59ae2c9240f849f6ac.develop.eu-west-2.quickfhir.cloud/FHIR/Patient?" +queryparam;

    const options = {
        headers: {
            'x-api-key': 'eXyaAcJ9fhpLuhB42YwKQOJ7XgmVYOaP',
            'Authorization' : 'Basic ' + 'dGVzdHVzZXJAYmxhY2twZWFyLmNvbTphcmVxdWVzdA=='
        }
    };

    fetch(url, options)
        .then(res => {
            if(res.ok) {
                return res.json();
            } 
        })
        .then(data => {
            const entries = data.entry;
           // console.log(entries.length);
           //if entries exist
            if (entries.length > 0) {
                // loop through entries
                for(let i = 0; i < entries.length; i++) {
                    //get the records needed from the object
                    let family = entries[i].resource.name[0].family;
                    let given = entries[i].resource.name[0].given;
                    let birthdate = entries[i].resource.birthDate;
                    let nhsNumber = entries[i].resource.identifier[0].value;
                    let address = entries[i].resource.address[0].line;
                    let postalCode = entries[i].resource.address[0].postalCode;
                    
                    //construct the table with the results
                    constructResult(family, given, birthdate, nhsNumber, address, postalCode);

                    //create a dropdown menu with the results
                    createSelectBox(given, birthdate, nhsNumber);
                }
            } else {
                //if there are no results from the input
                //hide the table
                document.querySelector('.resultTable').classList.add('hide');

                //Create show no result element in the results area
                document.getElementById('resultsArea').insertAdjacentHTML('beforeend', `<div class="no-result"><p>No record found</p></div>`);
            }

        });
}

function constructResult(family, given, birthdate, nhsNumber, address, postalCode) {

    //create elements
    const tr = document.createElement("tr");
    const nhsrow = document.createElement("td");
    const familyrow = document.createElement("td");
    const givenrow = document.createElement("td");
    const birthdaterow = document.createElement("td");
    const addressrow = document.createElement("td");
    const postalrow = document.createElement("td");

    //add text from api to elements
    nhsrow.textContent = nhsNumber;
    familyrow.textContent = family;
    givenrow.textContent = given;
    birthdaterow.textContent = birthdate;
    addressrow.textContent = address;
    postalrow.textContent = postalCode;

    
    tr.classList.add('row');
    //add elements to row
    tr.insertAdjacentElement('afterbegin', nhsrow);
    tr.insertAdjacentElement('beforeend', familyrow);
    tr.insertAdjacentElement('beforeend', givenrow);
    tr.insertAdjacentElement('beforeend', birthdaterow);
    tr.insertAdjacentElement('beforeend', addressrow);
    tr.insertAdjacentElement('beforeend', postalrow);
    //add row to table
    document.getElementById('patientResult').insertAdjacentElement('beforeend', tr);

    //select functionality
    selectRecord(tr);
}

//create the dropdown options with the information needed to show
function createSelectBox(given, birthdate, nhsNumber) {
    //
    let result = `<option class="patient-option">
    <span>${given} </span>
    <span>${birthdate} </span>
    <span>${nhsNumber} </span>
</option>`;
document.getElementById('patients_dropdown').insertAdjacentHTML('beforeend', result);
}