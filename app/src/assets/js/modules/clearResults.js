export default _=>{
    const rows = document.querySelectorAll('tr.row');
    const options = document.querySelectorAll('.patient-option');
    //remove all rows if there are existing rows
    if (rows.length > 0) {
        for(let r = 0; r < rows.length; r++) {
            rows[r].remove();
        }
    }
    //remove options if they exist
    if (options.length > 0) {
        for(let o = 0; o < options.length; o++) {
            options[o].remove();
        }
    }
    //remove the hide class in case the previous results resulted in No Result
    if(document.querySelector('.resultTable').classList.contains('hide')) document.querySelector('.resultTable').classList.remove('hide');
    if(document.querySelector('.no-result'))document.querySelector('.no-result').remove(); //remove the no result if the previous search had no results
}
    