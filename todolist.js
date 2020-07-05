// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyCvNIe0NEjtzU9jpNwpASPZ4nJM9Fqopuk",
    authDomain: "todolist-19ec5.firebaseapp.com",
    projectId: "todolist-19ec5"
  });
  
  var db = firebase.firestore();
//aqui guardamos datos en las colleciones de nuestra base de datos ingresados desde el frontend
 function   guardar(){
     let name= document.getElementById("name").value
     let lastName= document.getElementById("lastName").value
     let born= document.getElementById("born").value
     db.collection("users").add({
        first: name,
        last: lastName,
        born: born
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        window.alert("Usuario agregado")
        let name= document.getElementById("name").value=""
        let lastName= document.getElementById("lastName").value=""
        let born= document.getElementById("born").value=""
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
 }

 //leer documentos de una collecion
let tablaUsuarios= document.getElementById("tablaUsuarios")
 db.collection("users").onSnapshot((querySnapshot) => {
    tablaUsuarios.innerHTML=""
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        tablaUsuarios.innerHTML += `
        <tr>
            <th scope="row">${doc.id}</th>
            <td>${doc.data().first}</td>
            <td>${doc.data().last}</td>
            <td>${doc.data().born}</td>
            <td><button class="btn btn-danger" onclick="borrarDocumentos('${doc.id}')">Eliminar</button></td>
            <td><button class="btn btn-warning" onclick="editarDocumento('${doc.id}','${doc.data().first}','${doc.data().last}','${doc.data().born}')">Editar</button></td>
         </tr>  
        
        `
    });
});


//borrar documentos de una caleccion

function borrarDocumentos(id){
    db.collection("users").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
        window.alert("Documento eliminado correctamente")
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}


//funcion para editar documentos

function editarDocumento(id,nombre,apellido,fecha){
    document.getElementById("name").value= nombre
    document.getElementById("lastName").value = apellido
    document.getElementById("born").value = fecha

    let boton=document.getElementById("boton")
    let boton1= document.getElementById("boton1")
    boton.style.display="inline-block"
    boton1.className += "btn btn-info disabled"
    boton.onclick = function(){
            var washingtonRef = db.collection("users").doc(id);
            let name = document.getElementById("name").value
            let lastName = document.getElementById("lastName").value
            let born = document.getElementById("born").value
            // Set the "capital" field of the city 'DC'
            return washingtonRef.update({
                first: name,
                last: lastName,
                born: born
            })
            .then(function() {
                console.log("Document successfully updated!");
                boton.style.display="none"
                boton1.className ="btn btn-info"
                document.getElementById("name").value=""
                document.getElementById("lastName").value=""
                document.getElementById("born").value=""

            })
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    }
}