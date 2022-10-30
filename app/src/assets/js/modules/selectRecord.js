export default el=>{
    el.addEventListener('click', _=>{
        //add selected class to element if it doesn't contain it
        if(!el.classList.contains('selected')){
            el.classList.add('selected');
        } else {
            //or else remove the class
            el.classList.remove('selected');
        }
    });
}
