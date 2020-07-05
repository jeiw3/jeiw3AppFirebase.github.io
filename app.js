function ingresarUsuario(){
    let usuario= document.getElementById("email").value
    let password = document.getElementById("password").value
    
    //operacion para agregar un nuevo usuario
    firebase.auth().createUserWithEmailAndPassword(usuario, password)
    .then(()=>{verificarCorreo()})
    
    
    .catch(function(error) {
  // Handle Errors here.
    var errorCode = error.code
    var errorMessage = error.message
        
    });
}

//INICIO DE SESION PARA INGRESAR COMO USUARIO EXISTENTE

function ingresar(){
    let usuario= document.getElementById("email2").value
    let password = document.getElementById("password2").value

    firebase.auth().signInWithEmailAndPassword(usuario, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
}

function observador(){
    let mensajeUsuario=document.getElementById("mensajeEstadoSesion")

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          if(emailVerified){
                mensajeUsuario.innerHTML=`Bienvenido ${email}
                 <button onclick="cerrarSesion()">Cerrar Sesión</button>
                `
            }
        } else {
            mensajeUsuario.textContent="No has iniciado sesión"
        }
      });
}

//funcion para enviar correo de verificacion
function verificarCorreo(){
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
    window.alert("Revisa el correo enviado de verificación")
    }).catch(function(error) {
    // An error happened.
    });
}



//funcion para cerrar sesion


function cerrarSesion(){
    firebase.auth().signOut()
    .then(()=>{window.alert("cerrando sesion")})
    .catch((error)=>{console.log(error)})
}
observador()

