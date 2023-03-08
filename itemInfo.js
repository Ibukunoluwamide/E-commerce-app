
let totalQuantity = 1
quantity.innerHTML = 1
let navbars = JSON.parse(localStorage.getItem("Navbars"))
let itemDetails = JSON.parse(localStorage.getItem("iteminfo"))
// console.log(itemDetails);
itemDetails.map((eachItem) => {
    console.log(eachItem.itemText);
    displayInfo.innerHTML = `${eachItem.itemText}`
    displayLargeNavbar.innerHTML = `${eachItem.largeDeviceNav}`
    displaySmfooter.innerHTML = `${eachItem.smallDeviceFooter}`
    offcanvasExample.innerHTML = `${eachItem.offCanvasMenu}`
    
})
image.style.marginLeft = "15%"
navbars.map((eachItem) => {
    displayLargeNavbar.innerHTML = `${eachItem.largeDeviceNav}`
    displaySmfooter.innerHTML = `${eachItem.smallDeviceFooter}`
    offcanvasExample.innerHTML = `${eachItem.offCanvasMenu}`
    
})

const quantityAdd = () => {
    quantity.innerHTML = totalQuantity + 1
    totalQuantity++
    quantity.innerHTML = totalQuantity
}
const quantitySub = () => {
    quantity.innerHTML = totalQuantity - 1
    totalQuantity--
    quantity.innerHTML = totalQuantity
    console.log(quantity.innerHTML);
    if (totalQuantity == 0) {
        totalQuantity = 1
        quantity.innerHTML = totalQuantity
    }
}

searchIcon.addEventListener("click", () => {
    searchIcon.style.display = "none"
    olaBrand.style.display = "none"
    searchBar.style.display = "block"
})
const searchBarr = (event) => {
    console.log(event.keyCode);
    if (event.keyCode == 13) {
        alert("Searching...")
        searchIcon.style.display = "flex"
        olaBrand.style.display = "flex"
        searchBar.style.display = "none"
    }
}
const searchBarrr = () => {
    alert("Searching...")

}
const addToCart = () => {
 let array = []   
 let cartItem = {
       itemImage : image.src,
       itemName: itemTitle.innerText,
       itemPrice :itemPrice.innerText,
       itemOldPrice :itemOldPrice.innerText,
       itemPercentage : itemPercent.innerText
 }
 array.push(cartItem)
 console.log(array);
 localStorage.setItem("cartItem",JSON.stringify(array))
    Swal.fire({
        icon: 'success',
        text: `${quantity.innerHTML} item(s) has been added`,
        confirmButtonColor: '#0f8cdf'
      })
}