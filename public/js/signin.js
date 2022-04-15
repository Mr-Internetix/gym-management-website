

window.addEventListener("DOMContentLoaded",()=>{

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

     //login 
     document
     .getElementById("login")
     .addEventListener("submit", (event) => {
         event.preventDefault();
         document.getElementById('login-Btn').disabled = true;
         document.getElementById('login-Btn').innerHTML= 'Please Wait';
         const login = event.target.loginusername.value;
         // console.log(login);
         const password = event.target.password.value;
         console.log(loginusername,password);
         var uid = [];
             firebase
             .auth()
             .signInWithEmailAndPassword(login, password)
             .then(({
                 user
             }) => {
                 // console.log(user.uid);
                 uid[0] = user.uid;
                 console.log(uid[0])
                 localStorage.setItem("uid",uid[0])

                 return user.getIdToken().then((idToken) => {
                     return fetch("/sessionLogin", {
                         method: "POST",
                         headers: {
                             Accept: "application/json",
                             "Content-Type": "application/json",
                             "CSRF-Token": Cookies.get("XSRF-TOKEN"),
                         },
                         body: JSON.stringify({
                             idToken
                         }),
                     });
                 });
             }).catch(err=>{
                 notyf.error(err)
                 document.getElementById('login-Btn').disabled = false;
                 document.getElementById('login-Btn').innerHTML = 'Login';
             })
             .then(() => {
                 return firebase.auth().signOut();
             })
             .then(() => {
                 if(uid.length === 1){
                     window.location.href= `/profile/${uid[0]}`
                 }
             });
         return false;
     });





})
