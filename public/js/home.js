


window.addEventListener('DOMContentLoaded',()=>{
    document.getElementById('loginBtn').addEventListener('click',()=>{
        window.location.href = "/signin"
    })

    document.getElementById('signupBtn').addEventListener('click',()=>{
        window.location.href = "#contactus"
    })

    document.getElementById('contactUs').addEventListener('click',()=>{
        window.location.href = "#contactus"
    })

    document.getElementById('loginButton').addEventListener('click',()=>{
        window.location.href = "/signin"
    })


    
// notfy 

var notyf = new Notyf({
    position: {
      x: 'right',
      y: 'top',
    }
  });

    // form validation and post request for posting data in database
    let contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit',(e)=>{
        e.preventDefault()
        const name = e.target.name.value;
        const number = e.target.number.value;
        const address = e.target.address.value;
        const city = e.target.city.value;
        const gender = e.target.inputState.selectedOptions[0].value;

        const data = {"name":name , "number":number,"address":address,"city":city,"gender":gender}
        console.log(JSON.stringify(data))
        

        fetch('/api/contact',{
            method:"POST",
            headers:{
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body:JSON.stringify(data)

        }).then(response => response.json())
        .then(data => notyf.success(data.message)).then(contactForm.reset())

        
    })

})
