let navbars = JSON.parse(localStorage.getItem("Navbars"));
navbars.map((eachItem) => {
  displayLargeNavbar.innerHTML = `${eachItem.largeDeviceNav}`;
  displaySmallNavbar.innerHTML = `${eachItem.smallDeviceNav}`;
  offcanvasExample.innerHTML = `${eachItem.offCanvasMenu}`;
  displayLargeFooter.innerHTML = `${eachItem.largeDeviceFooter}`;
  displaySmfooter.innerHTML = `${eachItem.smallDeviceFooter}`;
});
// CART DISPLAY
let cartTotal = 0;
let qty
let itemPriceText = ""
let cartItem = JSON.parse(localStorage.getItem("cartItem"));



if (cartItem == "") {
  cart.style.display = "none";
  localStorage.removeItem("cartItem");
  localStorage.removeItem("addToCartIndex");
  window.location.reload();
}
const cartLoader = () => {
  // console.log(cartItemTotal)
  if (cartItem) {
    const cartItemTotal = cartItem.reduce((acc, item) => acc + item.qty, 0)
    cart.innerHTML = `
    <div style="border-bottom: 1px solid #DEE2E6;">
    <h5 class="p-2" id="cartNo">Cart</h5>
    </div>`;
    cartItem.map((item, index) => {
      qty = Number(item.qty);
      // cartTotal += Number(item.qty)
      // console.log(cartTotal);
      cartNo.innerHTML = `Cart(${cartItemTotal})`;
      if (item.itemPercentage) {
        cart.innerHTML += `
              <div class="d-flex justify-content-between p-2">
              <div class="d-flex gap-1" style="width: 68%;">
                  <div id="displayImage">
                      <img src="${item.itemImage}" style="height: 100px" />
                  </div>
                  <div>${item.itemName}</div>    
              </div>
              <div>
                  <div id="displayPrice" style="font-size: larger;">${item.itemPrice}</div>
                  <div class="d-flex justify-content-between">
                      <em style="text-decoration: line-through;font-size: medium;color: #424242;"
                          id="displayOldPrice">
                          ${item.itemOldPrice}
                      </em><span class="text-warning" id="displayPercent">
                      ${item.itemPercentage}</span>
                  </div>
              </div>
          </div>
            
          <div class="d-flex justify-content-between p-2" >
          <p><button class="btn text-warning" onclick="removeItem(${index})"><i class="bi bi-trash3"></i> Remove</button></p>
          <p class="fs-5 pe-4"> 
          <button class="quantity-btn btn btn-outline-warning quantitySub" onclick="quantitySub(${index})" id="quantity-btn-sub">-</button> 
          <b id="quantity">${item.qty}</b> 
          <button
              class="quantity-btn btn btn-outline-warning quantityAdd" onclick="quantityAdd(${index})" id="quantity-btn-add">+</button>
      
      </p>
          </div>
              `;
      } else {
        cart.innerHTML += `
              <div class="d-flex justify-content-between p-2">
              <div class="d-flex gap-1" style="width: 68%;">
                  <div id="displayImage">
                      <img src="${item.itemImage}" style="height: 100px" />
                  </div>
                  <div id="displayName">${item.itemName}</div>    
              </div>
              <div>
                  <div id="displayPrice" style="font-size: larger;">${item.itemPrice}
                  </div>
              </div>
          </div>
          </div>
            
          <div class="d-flex justify-content-between p-2" >
          <p><button class="btn text-warning" onclick="removeItem(${index})"><i class="bi bi-trash3"></i> Remove</button></p>
          <p class="fs-5 pe-4">  <button class="quantity-btn btn btn-outline-warning quantitySub" onclick="quantitySub(${index})" id="quantity-btn-sub">-</button> 
          <b id="quantity">${item.qty}</b> 
          <button
              class="quantity-btn btn btn-outline-warning quantityAdd" onclick="quantityAdd(${index})" id="quantity-btn-add">+</button>
      </p>
          </div>`;
        displayImage.innerHTML = `<img src="${item.itemImage}" style="height: 100px" /> `;
        displayName.innerHTML = item.itemName;
        displayPrice.innerHTML = item.itemPrice;
      }
      navbars.map((eachItem) => {
        displaySmfooter.innerHTML = `${eachItem.smallDeviceFooter}`;
      });


      // CART SUMMMARY CALCULATION
      // const cartItemTotal = cartItem.reduce((acc, item) => acc + item.qty, 0)
    
      const cartItemPrice = cartItem.reduce((acc, item) => acc + item.convertedPrice * item.qty, 0)
      localStorage.setItem('subTotal',cartItemPrice)
      let currencyConverter = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 0
      });
      let currencyConverted = currencyConverter.format(cartItemPrice);
      cartSummary.innerHTML = `
                  <div style="border-bottom: 1px solid #DEE2E6;">
                      <h5 class="p-2">CART SUMMARY</h5>
                  </div>
                  <div class="d-flex justify-content-between p-2" style="border-bottom: 1px solid #DEE2E6;">
                      <div>Subtotal</div>
                      <div id="displayTotalPrice">${currencyConverted}</div>
                  </div>
                  <div class="p-2">
                      <button class="btn col-12" style="background-color: #f68b1e;color: #fff;" onclick="checkoutbtn()">CHECKOUT</button>
                  </div>
      `;

    });
  } else {
    cart.style.margin = "0.2in auto";
    cart.style.minHeight = "60vh";

    cart.innerHTML = `
    <div class="text-center" style="padding:  1in 0;">
    <div><img src="https://www.jumia.com.ng/assets_he/images/cart.668e6453.svg" /></div>
    <div class="fs-1 pb-2">Your cart is empty!</div>
    <div class="pb-2">You have not added any item to your cart.</div>
       <div> <a href="../html/otca.html"><button class="btn col-7 col-md-5 mt-2 text-white" style="background-color: #E07E1B;">Start Shopping</button>
       </a></div>
       </div>
       `;
    cartSummary.style.display = "none";
  }

  let cartItems = JSON.parse(localStorage.getItem("cartItem"));
let badge = document.querySelectorAll(".badge");
if (cartItems) {
  const cartItemTotal = cartItems.reduce((acc, item) => acc + item.qty, 0)
  badge.forEach((eachBadge) => {
    eachBadge.innerHTML = cartItemTotal
  });

}
}
cartLoader()

const removeItem = (index) => {
  let addToCartIndex = Number(localStorage.getItem("addToCartIndex") )
  if (cartItem.length == 1) {
    cartItem.splice(index, 1);
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
    window.location.reload()

  } else {
    cartItem.splice(index, 1);
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
    addToCartIndex--
    localStorage.setItem('addToCartIndex',addToCartIndex--)
    cartLoader()
  }
};



const checkoutbtn = () => {
  let otcaCurrentUserIndex = localStorage.getItem("otcaCurrentUserIndex")
  if (otcaCurrentUserIndex) {
    window.location.href = "../html/checkout.html";
  } else {
    window.location.href = "../html/signIn.html";
  }
}

const signIn = () => {
  window.location.href = "../html/signIn.html";
};



//  Item Quantity Calculation
const quantityAdd = (index) => {
  qty[index]++;
  quantity.innerHTML = qty
  cartItem[index].qty++
  cartItem.splice(index, 1, cartItem[index])
  localStorage.setItem('cartItem', JSON.stringify(cartItem))
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
  Toast.fire({
    icon: "success",
    title: "Product added to successfully",
  }); 
  cartLoader()
  
};

const quantitySub = (index) => {
  qty[index]--;
  quantity.innerHTML = qty
  cartItem[index].qty--
  if (cartItem[index].qty == 0) {
    qty[index] = 1;
    cartItem[index].qty = 1

  }
  cartItem.splice(index, 1, cartItem[index])
  localStorage.setItem('cartItem', JSON.stringify(cartItem))
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
  Toast.fire({
    icon: "success",
    title: "Item quantity has been updated",
  });
  cartLoader()

};


