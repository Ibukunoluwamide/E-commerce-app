//   Navbars
let navbars = JSON.parse(localStorage.getItem("Navbars"));
navbars.map((eachItem) => {
  displayLargeNavbar.innerHTML = `${eachItem.largeDeviceNav}`;
  displaySmallNavbar.innerHTML = `${eachItem.smallDeviceNav}`;
  displayLargeFooter.innerHTML = `${eachItem.largeDeviceFooter}`;
  displaySmfooter.innerHTML = `${eachItem.smallDeviceFooter}`;
  offcanvasExample.innerHTML = `${eachItem.offCanvasMenu}`;
});

let itemArray = [];
let addToCart = document.querySelectorAll(".item");
addToCart.forEach((eachItem) => {
  eachItem.addEventListener("click", () => {
    let itemDetails = {
      itemText: eachItem.innerHTML,
    };
    itemArray.push(itemDetails);
    localStorage.setItem("iteminfo", JSON.stringify(itemArray));
    window.location.href = "itemInfo.html";
  });
});


let cartItem = JSON.parse(localStorage.getItem("cartItem"));
let totalCart = 0;
let badge = document.querySelectorAll(".badge");
if (cartItem) {
  const cartItemTotal = cartItem.reduce((acc, item) => acc + item.qty, 0)
  badge.forEach((eachBadge) => {
    eachBadge.innerHTML = cartItemTotal
  });

}
const signIn = () => {
  window.location.href = "../html/signIn.html";
};