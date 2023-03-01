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
let itemArray = []
let addToCart = document.querySelectorAll(".item")
// console.log(addToCart)
addToCart.forEach((eachItem)=>{
    eachItem.addEventListener("click",()=>{
        // console.log(eachItem.firstElementChild.src);
         let itemDetails = {
            itemImage: eachItem.firstElementChild.src,
            itemText: eachItem.innerHTML
         }
        itemArray.push(itemDetails)
        console.log(itemArray);
        localStorage.setItem("itemm",JSON.stringify(itemArray))
        window.location.href = "itemInfo.html"
        // alert("carrt")

})
})
