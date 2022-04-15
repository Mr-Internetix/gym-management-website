


window.addEventListener("DOMContentLoaded",()=>{

// notfy 

var notyf = new Notyf({
    position: {
      x: 'right',
      y: 'top',
    }
  });

const firebaseConfig = {
    // firebase auth config
  };

  // initialize firebase 
  firebase.initializeApp(firebaseConfig);
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

  // signup 

  document
  .getElementById("submit")
  .addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('submit').disabled = true;
    document.getElementById('submit').innerHTML = 'please wait';
    const full_Name = document.getElementById('signupUsername').value.trim().toLowerCase();
    const password = document.getElementById('createPassword').value.trim();
    const userEmail = document.getElementById('createEmail').value.trim();
    const emailcheck = userEmail.slice(-12)
    
  //  console.log(full_Name)
    console.log(full_Name,password,userEmail)
      var problem = false;
    if(emailcheck){
      firebase
        .auth()
        .createUserWithEmailAndPassword(userEmail, password)
        .then(({ user }) => {
            notyf.success("Account Created sucessfully")
            console.log(user);
              let uid = user.uid;
                let name = full_Name;
                let email = user.email;
                let imageUrl = `https://avatars.dicebear.com/api/avataaars/${uid}.svg`;
                const age = document.getElementById('age').value.trim()
                const address = document.getElementById('address').value.trim()
                
               fetch('/adduser',{
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "CSRF-Token": Cookies.get("XSRF-TOKEN"),
                },
                body: JSON.stringify({
                    userid:uid,name, email,imageUrl,email,password,age,address
                })

               })

          return user.getIdToken().then((idToken) => {
            return fetch("/sessionLogin", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "CSRF-Token": Cookies.get("XSRF-TOKEN"),
              },
              body: JSON.stringify({ idToken }),
            });
          });
        })
        .catch(err=>{
            problem = true;
            notyf.error(err)
            document.getElementById('submit').disabled = false;
            document.getElementById('submit').innerHTML = 'Continue';
        })
        .then(() => {
          return firebase.auth().signOut();
        })
        .then(() => {
            if(problem !== true){
              form = document.getElementById('createAccount')
              form.reset()
                // window.location.assign(`/signin`);
                console.log("user created")
                
              }

        });
      return false;
        

    }
    
  });









})
