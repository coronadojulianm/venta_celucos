function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Verificar las credenciales (puedes agregar tus propias validaciones aquí)
    if ((username == localStorage.getItem("nuevoUser")) && (password == localStorage.getItem("nuevoPass"))) {
        alert("Bienvenido "+ username)
        // Mostrar la sección de ventas y ocultar el formulario de inicio de sesión
        document.getElementById("login").style.display = "none";
        document.getElementById("sales").style.display = "block";

        // Restaurar los datos de ventas anteriores
        showReport();
        showBestSeller();
    } else {
        alert("Datos invalidos")
        alert("Credenciales incorrectas. Por favor, intenta de nuevo.");
    }
}

function sell() {
    var product = document.getElementById("product").value;
    var productName = "";
    var productPrice = 0;

    // Obtener el nombre y precio del producto seleccionado
    switch (product) {
        case "1":
            productName = "Samsung";
            productPrice = 600000;
            break;
        case "2":
            productName = "Motorola";
            productPrice = 500000;
            break;
        case "3":
            productName = "Huawei";
            productPrice = 400000;
            break;
    }

    // Obtener las ventas actuales del almacenamiento local
    var sales = JSON.parse(localStorage.getItem("sales")) || [];

    // Agregar la nueva venta a la lista
    sales.push({
        product: productName,
        price: productPrice
    });

    // Guardar las ventas actualizadas en el almacenamiento local
    localStorage.setItem("sales", JSON.stringify(sales));

    // Mostrar el reporte actualizado
    showReport();
    showBestSeller();
}

function showReport() {
    var sales = JSON.parse(localStorage.getItem("sales")) || [];
    var report = document.getElementById("report");

    // Limpiar el reporte anterior
    report.innerHTML = "";

    if (sales.length === 0) {
        report.innerHTML = "No hay ventas registradas.";
    } else {
        var totalSales = 0;
        var productCounts = {};

        // Contar la cantidad de ventas para cada producto
        sales.forEach(function (sale) {
            if (!productCounts[sale.product]) {
                productCounts[sale.product] = 1;
            } else {
                productCounts[sale.product]++;
            }
        });

        // Generar filas para cada venta
        sales.forEach(function (sale, index) {
            var row = document.createElement("div");
            var discountedPrice = sale.price;

            // Aplicar descuento si la cantidad es superior a 10
            if (productCounts[sale.product] > 10) {
                discountedPrice = sale.price * 0.95; // 5% de descuento
                row.innerHTML = "Venta " + (index + 1) + ": " + sale.product + " - $" + discountedPrice.toLocaleString() + " (con descuento)";
            } else {
                row.innerHTML = "Venta " + (index + 1) + ": " + sale.product + " - $" + sale.price.toLocaleString();
            }

            report.appendChild(row);

            totalSales += discountedPrice;
        });

        // Mostrar el total de ventas
        var totalRow = document.createElement("div");
        totalRow.innerHTML = "<strong>Total: $" + totalSales.toLocaleString() + "</strong>";
        report.appendChild(totalRow);
    }
}

function showBestSeller() {
    var sales = JSON.parse(localStorage.getItem("sales")) || [];
    var productCounts = {};
    var bestSeller = "";
    var maxCount = 0;

    // Contar la cantidad de ventas para cada producto
    sales.forEach(function (sale) {
        if (!productCounts[sale.product]) {
            productCounts[sale.product] = 1;
        } else {
            productCounts[sale.product]++;
        }

        // Actualizar el producto más vendido
        if (productCounts[sale.product] > maxCount) {
            bestSeller = sale.product;
            maxCount = productCounts[sale.product];
        }
    });

    var bestSellerElement = document.getElementById("best-seller");
    bestSellerElement.innerHTML = "Celular más vendido: " + bestSeller;
}

function logout() {
    // Limpiar el almacenamiento local y reiniciar la página
    localStorage.removeItem("sales");
    localStorage.removeItem("bestSeller"); // Agrega esta línea para eliminar el registro del celular más vendido
    location.reload();
}

