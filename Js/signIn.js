let userArray = []
let validateEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/

if (localStorage.OtcaUsers) {
    userArray = JSON.parse(localStorage.getItem("OtcaUsers"))
}

const signup = () => {
    if (!firstName.value||!lastName.value||!mail.value||!ph.value||!pw.value||!cpw.value) {
        Swal.fire({
            icon: 'info',
            title: 'Fill in all the required fields.',
            confirmButtonColor: "#2B7EFA"
        })
    }
   else if (validateEmail.test(mail.value) == false) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Email Address',
            confirmButtonColor: "#2B7EFA"
        })
    }
    else if (cpw.value !== pw.value) {
        cpw.classList.add("is-invalid")
        Swal.fire({
            icon: 'error',
            title: 'Password does not match',
            confirmButtonColor: "#2B7EFA"
        })
    }
    else {
        let texts = document.querySelectorAll(".text-danger")
        for (let index = 0; index < texts.length; index++) {
            texts[index].innerText = ""

        }

        mail.classList.remove("is-invalid")

        userDetails = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: mail.value,
            phoneNo: ph.value,
            password: pw.value,
            ConPassword: cpw.value,
        }

        const userExist = userArray.find((user, idx) => (
            user.email == mail.value
        ))

        if (userExist) {
            Swal.fire({
                icon: 'error',
                title: 'Email already exists',
                confirmButtonColor: "#2B7EFA"
            })
        } else {
            userArray.push(userDetails)
            localStorage.setItem("OtcaUsers", JSON.stringify(userArray))
            Swal.fire({
                icon: 'success',
                title: 'Sign up successful!',
                text: 'Log in to continue',
                confirmButtonColor: "#2B7EFA"
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "../html/signin.html"
                }
            })
        }

    }


}

const signInUser = () => {
    let otcaUsers = JSON.parse(localStorage.getItem("OtcaUsers"))
    let found = false
    if (otcaUsers) {
        otcaUsers.map((user, index) => {
            if (user.email == usermail.value && user.password == userpw.value) {
                found = true
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })

                Toast.fire({
                    icon: 'success',
                    title: 'Sign in successful'
                })
                setTimeout(() => {
                    localStorage.setItem("otcaCurrentUserIndex", index)
                    window.location.href = "../html/checkout.html"
                }, 1500);

            }
        })
    }

    if (found == false) {
        Swal.fire({
            icon: 'error',
            title: 'Incorrect email or password',
            confirmButtonColor: "#2B7EFA"
        })
    }

}


//   Navbars
let navbars = JSON.parse(localStorage.getItem("Navbars"));
navbars.map((eachItem) => {
    displayLargeNavbar.innerHTML = `${eachItem.largeDeviceNav}`;
    displaySmallNavbar.innerHTML = `${eachItem.smallDeviceNav}`;
    //   displayLargeFooter.innerHTML = `${eachItem.largeDeviceFooter}`;
    displaySmfooter.innerHTML = `${eachItem.smallDeviceFooter}`;
    offcanvasExample.innerHTML = `${eachItem.offCanvasMenu}`;
});


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

const logOutUser = () => {
    localStorage.removeItem('otcaCurrentUserIndex')
    window.location.href = "../html/signin.html"
}
