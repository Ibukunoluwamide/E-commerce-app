let newProducts = JSON.parse(localStorage.getItem('newProducts'))
let productsArray = []
if (localStorage.newProducts) {
    productsArray = JSON.parse(localStorage.getItem('newProducts'))
}
console.log(newProducts);
addProduct.addEventListener('click', async () => {
    let imageURL = ""
     console.log(productImage.files[0]);
 
    if (!productName.value || !productPrice.value || !productCategory.value || !productImage.value || !totalproductItem.value) {
        Swal.fire({
            icon: 'error',
            title: 'Fill in all the required space',
            confirmButtonColor: "#2B7EFA"
        })
    }
    else if (totalproductItem.value == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Total Product Item',
            confirmButtonColor: "#2B7EFA"
        })

    }
    else {
        const imageFile = productImage.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.addEventListener('load', () => {
            // console.log(reader.result);
          imageURL = reader.result
          let newProduct = {
              productName: productName.value,
              productPrice: productPrice.value,
              productCategory: productCategory.value,
              productImage: reader.result,
              totalproductItem: totalproductItem.value
            }
            console.log(imageURL);
            productsArray.push(newProduct)
        });
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
        })

        await Toast.fire({
            icon: 'info',
            title: 'Uploading...'
        })
        localStorage.setItem('newProducts', JSON.stringify(productsArray))
        await Toast.fire({
            icon: 'success',
            title: 'Uploaded successfully!',
        })
        setTimeout( () => {
            window.location.reload()
        }, 500);
    }
})


const productsLoader = () => {
    if (newProducts) {
        exportProducts.innerHTML = `
        <div class="text-end p-1">
        <button class="btn btn-warning text-white" onclick="exportProductsBtn()">EXPORT PRODUCTS</button>
        </div>
        `
        viewProducts.innerHTML = `
        <tr class="table table-secondary">
          <th>S/N</th>
          <th>Name</th>
          <th>Image</th>
          <th>Category</th>
          <th>Price</th>
          <th>Total Item</th>
          <th><i class="fa-solid fa-eraser"></i></th>
        </tr>
        `
        newProducts.map((item, index) => {
            let currencyConverter = new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
            });
            let currencyConverted = currencyConverter.format(item.productPrice);
            viewProducts.innerHTML += `
            <tr>
            <td>${index + 1}</td>
            <td>${item.productName}</td>
            <td>
            <img src="${item.productImage}" width="50px" height="50px" />
            </td>
            <td>${item.productCategory}</td>
            <td>${currencyConverted}</td>
            <td>${item.totalproductItem}</td>
            <td>
            <i class="fa fa-pen-to-square" onclick="editProduct(${index})" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
            <i class="fa-solid fa-trash" onclick="deleteProduct(${index})"></i>
            </td>
            </tr>
            `
        })
    }

}
productsLoader()

if (newProducts == "" || !newProducts) {
    vpillsviewProducts.innerHTML = `
    <div class="alert alert-primary fs-4 text-center" role="alert">
        <i class="fa fa-circle-info"></i>
        No uploaded Products!
    </div>
    `
    localStorage.removeItem("newProducts");
}

const deleteProduct = (index) => {
    if (newProducts.length == 1) {
        newProducts.splice(index, 1)
        localStorage.setItem("newProducts", JSON.stringify(newProducts));
        window.location.reload()
    } else {
        newProducts.splice(index, 1)
        localStorage.setItem("newProducts", JSON.stringify(newProducts));
        productsLoader()
    }
}
const editProduct = (index) => {
    // console.log(index);;
    editproductName.value = newProducts[index].productName
    // editproductImage.value = newProducts[index].productImage
    editproductCategory.value = newProducts[index].productCategory
    editproductPrice.value = newProducts[index].productPrice
    edittotalproductItem.value = newProducts[index].totalproductItem
    localStorage.setItem('editIndex', index)
}
const updateProduct = () => {
    let index = Number(localStorage.getItem('editIndex'))
    // console.log(index);;
    if (!editproductName.value || !editproductPrice.value || !editproductCategory.value || !edittotalproductItem.value || !editproductImage.value) {
        Swal.fire({
            icon: 'error',
            title: 'Fill in all the required space',
            confirmButtonColor: "#2B7EFA"
        })
    }
    else if (edittotalproductItem.value == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Total Product Item',
            confirmButtonColor: "#2B7EFA"
        })

    }
    else {
        const imageFile = editproductImage.files[0];
        if (imageFile) {
            const reader = new FileReader();
            reader.readAsDataURL(imageFile);
            reader.addEventListener('load', () => {
                let productUpdated = {
                    productName: editproductName.value,
                    productImage: reader.result,
                    productCategory: editproductCategory.value,
                    productPrice: editproductPrice.value,
                    totalproductItem: edittotalproductItem.value
                }
                newProducts.splice(index, 1, productUpdated)
                localStorage.setItem('newProducts', JSON.stringify(newProducts))
                productsLoader()
            });
        }
        // console.log(newProducts)
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
        })

        Toast.fire({
            icon: 'success',
            title: 'Product Updated!'
        })
    }

}

const exportProductsBtn = async()=>{
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
    })

    await Toast.fire({
        icon: 'info',
        title: 'Exporting...'
    })
    await Toast.fire({
        icon: 'success',
        title: 'Products has been successfully exported!'
    })
   localStorage.setItem("exportedProducts",JSON.stringify(newProducts))
   setTimeout(() => {
       window.location.href = "../index.html"
   }, 1000);
}

let logOutBtn = document.querySelectorAll('#logOut')
logOutBtn.forEach((text) => {
    text.addEventListener('click', () => {
        window.location.href = "../index.html"
    })
})