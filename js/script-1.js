function registrar(){
    var nuevoUser = document.getElementById('nuevoUser').value;
    var nuevoPass = document.getElementById('nuevoPass').value;

    localStorage.setItem('nuevoUser',nuevoUser);
    localStorage.setItem('nuevoPass',nuevoPass);

    window.location = "index.html";
}