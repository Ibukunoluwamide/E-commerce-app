let userArray = []
let validateName = /^[A-Z a-z]{1,} [A-Z a-z]{1,}$/
let validateEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
let validatePhoneNo = /^[\d]{11}/
let validatePassword = /[^~,]{6,}/

if (localStorage.OtcaUsers) {
    userArray = JSON.parse(localStorage.getItem("OtcaUsers"))
}

const signup = () => {
    console.log(userArray)
    if (validateName.test(fullName.value) == false) {
        fullName.classList.add("is-invalid")
        alertName.innerText = "Invalid Full Name"
    }
    else if (validateEmail.test(mail.value) == false) {
        mail.classList.add("is-invalid")
        alertEmail.innerText = "Invalid Email Address"
    }
    else if (validatePhoneNo.test(ph.value) == false) {
        ph.classList.add("is-invalid")
        alertPh.innerText = "Invalid Phone Number"
    }
    else if (validatePassword.test(pw.value) == false) {
        pw.classList.add("is-invalid")
        alertPw.innerText = "Minimum of 6 letters or number or symbols"
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
        fullName.classList.remove("is-invalid")
        mail.classList.remove("is-invalid")
        ph.classList.remove("is-invalid")
        pw.classList.remove("is-invalid")
        cpw.classList.remove("is-invalid")
        fullName.classList.add("is-valid")
        mail.classList.add("is-valid")
        ph.classList.add("is-valid")
        pw.classList.add("is-valid")
        cpw.classList.add("is-valid")

        userDetails = {
            fullName: fullName.value,
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
            console.log(userArray);
            localStorage.setItem("OtcaUsers", JSON.stringify(userArray))
            Swal.fire({
                icon: 'success',
                title: 'Sign up successful!',
                text: 'Sign in to continue',
                confirmButtonColor: "#2B7EFA"
            })
        }

    }


}

const signIn = () => {
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
                    timer: 3000,
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
                }, 3000);

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