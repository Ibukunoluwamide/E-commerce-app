let navbarArray = [];
let otcaArray = []
const homeLoad = () => {
  let itemDetails = {
    largeDeviceNav: lgNavbar.innerHTML,
    smallDeviceNav: smNavbar.innerHTML,
    largeDeviceFooter: lgDeviceFooter.innerHTML,
    smallDeviceFooter: smDeviceFooter.innerHTML,
    offCanvasMenu: offcanvasExample.innerHTML,
  };
  navbarArray.push(itemDetails);
  localStorage.setItem("Navbars", JSON.stringify(navbarArray));

  let otcaAdmin = {
    username: "Ola_tech",
    password: "OTCA"
  }
  otcaArray.push(otcaAdmin)
  localStorage.setItem("otcaAdmin", JSON.stringify(otcaArray));
};
let exportedProducts = JSON.parse(localStorage.getItem("exportedProducts"))
if (exportedProducts) {
  exportedItemsContainer.style.display = "block"
  exportedProducts.map((item) => {
    let currencyConverter = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0
    });
    let currencyConverted = currencyConverter.format(item.productPrice);
    exportedItems.innerHTML += `
    <div class="col-6 col-md-2 rounded item" >
     <img src="${item.productImage}" id="image"/>
      <br>
      <br>
      <span style="font-size: 17px;" id="itemTitle">${item.productName}</span>
      <span style="font-size: large;" id="itemPrice">${currencyConverted}</span>
   </div>  
    `

  })
}
let itemArray = [];
let viewItem = document.querySelectorAll(".item");

// console.log(viewItem)
// console.log(eachItem.firstElementChild.src);
viewItem.forEach((eachItem) => {
  // console.log(eachNaira);
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

