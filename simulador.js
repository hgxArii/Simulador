function validarIngresos() {
    let valor = document.getElementById("txtIngresos").value;
    let error = document.getElementById("errorIngresos");

    if (valor.trim() === "") {
        error.textContent = "El campo es obligatorio.";
        return false;
    }

    if (!/^\d*\.?\d*$/.test(valor)) {
        error.textContent = "Solo se permiten números y puntos.";
        return false;
    }

    if (valor.split(".").length > 2) {
        error.textContent = "Solo se permite un punto.";
        return false;
    }

    if (valor.replace(".", "").length > 5) {
        error.textContent = "Máximo 5 dígitos.";
        return false;
    }

    error.textContent = "";
    return true;
}

function validarEgresos() {
    let valor = document.getElementById("txtEgresos").value;
    let error = document.getElementById("errorEgresos");

    if (valor.trim() === "") {
        error.textContent = "El campo es obligatorio.";
        return false;
    }

    if (!/^\d*\.?\d*$/.test(valor)) {
        error.textContent = "Solo se permiten números y puntos.";
        return false;
    }

    if (valor.split(".").length > 2) {
        error.textContent = "Solo se permite un punto.";
        return false;
    }

    if (valor.replace(".", "").length > 5) {
        error.textContent = "Máximo 5 dígitos.";
        return false;
    }

    error.textContent = "";
    return true;
}

function validarMonto() {
    let valor = document.getElementById("txtMonto").value;
    let error = document.getElementById("errorMonto");

    if (valor.trim() === "") {
        error.textContent = "El campo es obligatorio.";
        return false;
    }

    if (!/^\d*\.?\d*$/.test(valor)) {
        error.textContent = "Solo se permiten números y puntos.";
        return false;
    }

    if (valor.split(".").length > 2) {
        error.textContent = "Solo se permite un punto.";
        return false;
    }

    if (valor.replace(".", "").length > 5) {
        error.textContent = "Máximo 5 dígitos.";
        return false;
    }

    error.textContent = "";
    return true;
}

function validarPlazo() {
    let valor = document.getElementById("txtPlazo").value;
    let error = document.getElementById("errorPlazo");

    if (valor.trim() === "") {
        error.textContent = "El campo es obligatorio.";
        return false;
    }

    if (!/^\d*$/.test(valor)) {
        error.textContent = "Solo se permiten números.";
        return false;
    }

    if (valor.length > 2) {
        error.textContent = "Máximo 2 dígitos.";
        return false;
    }

    error.textContent = "";
    return true;
}

function validarTasa() {
    let valor = document.getElementById("txtTasaInteres").value;
    let error = document.getElementById("errorTasaInteres");

    if (valor.trim() === "") {
        error.textContent = "El campo es obligatorio.";
        return false;
    }

    if (!/^\d*\.?\d*$/.test(valor)) {
        error.textContent = "Solo se permiten números y puntos.";
        return false;
    }

    if (valor.split(".").length > 2) {
        error.textContent = "Solo se permite un punto.";
        return false;
    }

    if (valor.replace(".", "").length > 5) {
        error.textContent = "Máximo 5 dígitos.";
        return false;
    }

    error.textContent = "";
    return true;
}

document.getElementById("txtIngresos").addEventListener("input", validarIngresos);
document.getElementById("txtEgresos").addEventListener("input", validarEgresos);
document.getElementById("txtMonto").addEventListener("input", validarMonto);
document.getElementById("txtPlazo").addEventListener("input", validarPlazo);
document.getElementById("txtTasaInteres").addEventListener("input", validarTasa);


function calcular() {

    if (!validarIngresos() ||
        !validarEgresos() ||
        !validarMonto() ||
        !validarPlazo() ||
        !validarTasa()) {
        return;
    }

    let ingresos = parseFloat(document.getElementById("txtIngresos").value);
  let egresos = parseFloat(document.getElementById("txtEgresos").value);

    let disponible = calcularDisponible(ingresos, egresos);
    document.getElementById("spnDisponible").textContent = disponible.toFixed(2);

    let capacidadPago = calcularCapacidadPago(disponible);
    document.getElementById("spnCapacidadPago").textContent = capacidadPago.toFixed(2);

    let monto = parseFloat(document.getElementById("txtMonto").value);
    let plazoAnios = parseInt(document.getElementById("txtPlazo").value);
    let tasa = parseFloat(document.getElementById("txtTasaInteres").value);

    let interes = calcularInteresSimple(monto, tasa, plazoAnios);
    document.getElementById("spnInteresPagar").textContent = interes.toFixed(2);

    let total = calcularTotalPagar(monto, interes);
    document.getElementById("spnTotalPrestamo").textContent = total.toFixed(2);

    let cuotaMensual = calcularCuotaMensual(total, plazoAnios);
    document.getElementById("spnCuotaMensual").textContent = cuotaMensual.toFixed(2);

    let aprobado = aprobarCredito(capacidadPago, cuotaMensual);

    if (aprobado == true) {
        document.getElementById("spnEstadoCredito").textContent = "CREDITO APROBADO";
    } else {
        document.getElementById("spnEstadoCredito").textContent = "CREDITO RECHAZADO";
    }
}

document.getElementById("btnCalcularCredito").addEventListener("click", calcular);