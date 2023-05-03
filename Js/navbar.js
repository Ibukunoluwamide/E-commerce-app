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

let otcaCurrentUserIndex = localStorage.getItem("otcaCurrentUserIndex")
let otcaUsers = JSON.parse(localStorage.getItem("OtcaUsers"))
if (otcaUsers) {
  if (otcaCurrentUserIndex) {
    console.log(otcaUsers[otcaCurrentUserIndex]);
    document.querySelectorAll(".signInChange").forEach((eachText) => {
      eachText.innerHTML = `
      <b><i class="bi bi-person-fill-check fs-5"></i> Hi, ${otcaUsers[otcaCurrentUserIndex].firstName}</b>
      `
    })
    document.querySelectorAll(".logOutChange").forEach((eachText) => {
      eachText.innerHTML = `
         <b class="w-100 fs-5" style="color:  #f68b1e; cursor:pointer;" onclick="logOutUser()">LOGOUT</b>
      `
    })
  }
}

const logOutUser = ()=>{
  localStorage.removeItem('otcaCurrentUserIndex')
   window.location.href = "../html/signin.html"
}
