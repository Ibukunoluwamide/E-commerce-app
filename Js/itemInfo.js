//get Navbars
let navbars = JSON.parse(localStorage.getItem("Navbars"));
let itemDetails = JSON.parse(localStorage.getItem("iteminfo"));
let cartItem = JSON.parse(localStorage.getItem("cartItem"));

if (itemDetails && navbars) {
  navbars.map((eachItem) => {
    displayLargeNavbar.innerHTML = `${eachItem.largeDeviceNav}`;
    displaySmallNavbar.innerHTML = `${eachItem.smallDeviceNav}`;
    displaySmfooter.innerHTML = `${eachItem.smallDeviceFooter}`;
    offcanvasExample.innerHTML = `${eachItem.offCanvasMenu}`;
    displayLargeFooter.innerHTML = `${eachItem.largeDeviceFooter}`;
  });

  itemDetails.map((eachItem) => {
    displayInfo.innerHTML = `${eachItem.itemText}`;
  });
  image.style.marginLeft = "15%";
} else {
  window.location.href = "index.html";
}


// Add to Cart
let array = [];
if (localStorage.cartItem) {
  array = JSON.parse(localStorage.getItem("cartItem"));
}
let regex = /\D/g;
let itemPriceText = itemPrice.innerText
let convertedPrice = itemPriceText.replace(regex, "");
convertedPrice = Number(convertedPrice)
console.log(convertedPrice);
let index = -1
if (localStorage.addToCartIndex) {
  index = Number(localStorage.getItem('addToCartIndex'))
}
let qty = 1
const addToCart = async () => {
  index++
  localStorage.setItem('addToCartIndex', index)
  //   qty = item.qty
  addToCartChange.innerHTML = `
  <div class="spinner-border text-secondary text-center" role="status">
      <span class="visually-hidden">Loading...</span>
  </div>
  `
  setTimeout(() => {
    addToCartChange.innerHTML = `
      <p class="fs-5 pe-4">  
          <button class="quantity-btn btn btn-outline-warning quantitySub" onclick="quantitySub()" id="quantity-btn-sub">-</button> 
             <b id="quantity">${qty}</b> 
          <button class="quantity-btn btn btn-outline-warning quantityAdd" onclick="quantityAdd()" id="quantity-btn-add">+</button>
      </p>
     `
  }, 2000);

  let spanTag = displayInfo.getElementsByTagName("span").itemPrice;
  let lastChild = displayInfo.lastElementChild;
  if (lastChild == spanTag) {
    let cartItem = {
      itemImage: image.src,
      itemName: itemTitle.innerText,
      itemPrice: itemPrice.innerText,
      convertedPrice,
      qty: 1
    };
    array.push(cartItem);
    localStorage.setItem("cartItem", JSON.stringify(array));
    const Toast = Swal.mixin({
      toast: true,
      position: "top-start",
      iconColor: "white",
      customClass: {
        popup: "colored-toast",
      },
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });

    setTimeout(() => {
      let cartItem = JSON.parse(localStorage.getItem("cartItem"));
      let badge = document.querySelectorAll(".badge");
      if (cartItem) {
        const cartItemTotal = cartItem.reduce((acc, item) => acc + item.qty, 0)
        badge.forEach((eachBadge) => {
          eachBadge.innerHTML = cartItemTotal
        });

      }
    }, 1000);
    await Toast.fire({
      icon: "success",
      title: "Product(s) added to Cart",
    });
  } else {
    let cartItem = {
      itemImage: image.src,
      itemName: itemTitle.innerText,
      itemPrice: itemPrice.innerText,
      itemOldPrice: itemOldPrice.innerText,
      itemPercentage: itemPercent.innerText,
      convertedPrice,
      qty: 1
    };
    array.push(cartItem);
    localStorage.setItem("cartItem", JSON.stringify(array));
    const Toast = Swal.mixin({
      toast: true,
      position: "top-start",
      iconColor: "white",
      customClass: {
        popup: "colored-toast",
      },
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });

    setTimeout(() => {
      let cartItem = JSON.parse(localStorage.getItem("cartItem"));
      let badge = document.querySelectorAll(".badge");
      if (cartItem) {
        const cartItemTotal = cartItem.reduce((acc, item) => acc + item.qty, 0)
        badge.forEach((eachBadge) => {
          eachBadge.innerHTML = cartItemTotal
        });

      }
    }, 1000);

    await Toast.fire({
      icon: "success",
      title: "Product(s) added to Cart",
    });
  }
};

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

//  Item Quantity Calculation

const quantityAdd = () => {
  let cartItem = JSON.parse(localStorage.getItem("cartItem"));
  let badge = document.querySelectorAll(".badge");
  qty++;
  quantity.innerHTML = qty
  cartItem[index].qty++
  cartItem.splice(index, 1, cartItem[index])
  localStorage.setItem('cartItem', JSON.stringify(cartItem))
  if (cartItem) {
    const cartItemTotal = cartItem.reduce((acc, item) => acc + item.qty, 0)
    badge.forEach((eachBadge) => {
      eachBadge.innerHTML = cartItemTotal
    });

  }
};

const quantitySub = () => {
  let cartItem = JSON.parse(localStorage.getItem("cartItem"));
  let badge = document.querySelectorAll(".badge");
  qty--;
  quantity.innerHTML = qty
  cartItem[index].qty--
  if (cartItem[index].qty == 0) {
    qty = 1;
    quantity.innerHTML = qty
    cartItem[index].qty = 1

  }
  cartItem.splice(index, 1, cartItem[index])
  localStorage.setItem('cartItem', JSON.stringify(cartItem))
  if (cartItem) {
    const cartItemTotal = cartItem.reduce((acc, item) => acc + item.qty, 0)
    badge.forEach((eachBadge) => {
      eachBadge.innerHTML = cartItemTotal
    });

  }
};