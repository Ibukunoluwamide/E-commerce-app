let subTotal = JSON.parse(localStorage.getItem("subTotal"))
let cartItems = JSON.parse(localStorage.getItem("cartItem"));
let otcaUser = JSON.parse(localStorage.getItem("OtcaUsers"))
let otcaCurrentUserIdx = localStorage.getItem("otcaCurrentUserIndex")
fn.value = otcaUser[otcaCurrentUserIdx].firstName
ln.value = otcaUser[otcaCurrentUserIdx].lastName
ph.value = otcaUser[otcaCurrentUserIdx].phoneNo
let currencyConverter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  minimumFractionDigits: 0
});
let currencyConvertedSubTotal = currencyConverter.format(subTotal);
let currencyConvertedTotal = currencyConverter.format(Number(subTotal) + Number(2500));
document.querySelectorAll('.displaySubTotalPrice').forEach((item) => {
  item.innerHTML = currencyConvertedSubTotal

})
document.querySelectorAll('.displayTotalPrice')
document.querySelectorAll('.displayTotalPrice').forEach((item) => {
  item.innerHTML = currencyConvertedTotal

})
pickup.addEventListener("change", () => {
  document.querySelectorAll(".shippingAmount").forEach((item) => {
    item.innerHTML = "₦0.00"
  })

  document.querySelectorAll('.displaySubTotalPrice').forEach((item) => {
    item.innerHTML = currencyConvertedSubTotal

  })
  document.querySelectorAll('.displayTotalPrice')
  document.querySelectorAll('.displayTotalPrice').forEach((item) => {
    item.innerHTML = currencyConvertedSubTotal

  })

})
doorDel.addEventListener("change", () => {
  document.querySelectorAll(".shippingAmount").forEach((item) => {
    item.innerHTML = "₦2,500.00"
  })

  document.querySelectorAll('.displaySubTotalPrice').forEach((item) => {
    item.innerHTML = currencyConvertedSubTotal

  })
  document.querySelectorAll('.displayTotalPrice')
  document.querySelectorAll('.displayTotalPrice').forEach((item) => {
    item.innerHTML = currencyConvertedTotal

  })

})


//   Order Summary
let cartTotal = 0;
if (cartItems) {
  cartItems.map((item, index) => {
    cartTotal += Number(item.qty);
    // console.log(cartTotal);
    cartNo.innerHTML = `YOUR ORDER(${cartTotal})`;
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
          <p></p>
          <p class="fs-5 pe-4">${item.qty}</p>
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
          <p></p>
          <p class="fs-5 pe-4">${item.qty}</p>
          </div>`;
    }
  })
}



