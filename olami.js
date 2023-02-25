searchIcon.addEventListener("click",()=>{
    searchIcon.style.display = "none"
    olaBrand.style.display = "none"
    searchBar.style.display = "block"
})
const searchBarr = (event)=>{
    console.log(event.keyCode);
    if (event.keyCode==13) {
        alert("Searching...")
        searchIcon.style.display = "flex"
        olaBrand.style.display = "flex"
        searchBar.style.display = "none"
    }
}
const searchBarrr = ()=>{
        alert("Searching...")
    
}
