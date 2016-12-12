
/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_EmpresaNit(State) {
    $.ajax({
        url: "C_ContratoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'CLIENTE'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayEmpresaNit = [];
            }
            else {
                ArrayEmpresaNit = JSON.parse(result);
                charge_CatalogList(ArrayEmpresaNit, "Select_EmpresaNit", 1);
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MSucursal(State) {
    $.ajax({
        url: "C_ContratoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'CIUDADES'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Sucursal = [];
            }
            else {
                Matrix_Sucursal = JSON.parse(result);
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_MMoneda(State) {
    $.ajax({
        url: "C_ContratoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'TIPO'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Moneda = [];
            }
            else {
                Matrix_Moneda = JSON.parse(result);
                Charge_Combos_Depend_Nit(Matrix_Moneda, "Select_Moneda_C", "", "");
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Documento(State) {
    $.ajax({
        url: "C_ContratoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'IMPUESTO_GASTO'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayTdoc = [];
            }
            else {
                ArrayTdoc = JSON.parse(result);
                charge_CatalogList(ArrayTdoc, "Select_Documento_C", 1);
                charge_CatalogList(ArrayTdoc, "Select_Documento_C2", 1);
            }
        },
        error: function () {

        }
    });
}

//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_ShearchPeople(State, TD, D, NIT, Vista) {
    $.ajax({
        url: "C_ContratoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "TD": TD,
            "D": D,
            "NIT": NIT
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {
                case "NO":
                    Mensaje_General("¡Datos Inexistentes!", "La persona que desea relacionar no está inscrita en el sistema. Por favor revisar los datos.", "W");
                    $("#" + Vista).html("------");
                    Persona2 = false;
                    break;

                default:
                    $("#" + Vista).html(result);
                    namePersona = result;
                    Persona2 = true;
                    break;
            }
        },
        error: function () {

        }
    });
}

//*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Productos(State) {
    $.ajax({
        url: "C_ContratoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'Producto'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Productos = [];
            }
            else {
                Matrix_Productos = JSON.parse(result);
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Financiacion(State) {
    $.ajax({
        url: "C_ContratoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'Financiacion'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Financiacion = [];
            }
            else {
                Matrix_Financiacion = JSON.parse(result);
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MCiclo(State) {
    $.ajax({
        url: "C_ContratoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'Ciclo'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Ciclo = [];
            }
            else {
                Matrix_Ciclo = JSON.parse(result);
                Charge_Combos_Depend_Nit(Matrix_Ciclo, "Select_Ciclo", "", "");
                Charge_Combos_Depend_Nit(Matrix_Ciclo, "Select_Ciclo_2", "", "");

            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MDirecciones(State, TD, D) {
    $.ajax({
        url: "C_ContratoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'Direcciones',
            "TD": TD,
            "D": D,
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Direcciones = [];
            }
            else {
                Matrix_Direcciones = JSON.parse(result);
                Charge_Combo_Persona(Matrix_Direcciones, "Select_Direccion", "", "");
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MTasas(State) {
    $.ajax({
        url: "C_ContratoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'Tasas'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Tasas = [];
            }
            else {
                Matrix_Tasas = JSON.parse(result);
            }
        },
        error: function () {

        }
    });
}

/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_C_Contrato_create(State) {
    var SC;

    if ($("#TxtSecuenciaCargue").val() == "")
        SC = 0;
    else
        SC = $("#TxtSecuenciaCargue").val();

    $.ajax({
        url: "C_ContratoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "Nit_ID": $("#Select_EmpresaNit").val(),
            "ID": $("#Txt_ID").val(),
            "Descripcion": $("#TxtDescripcion").val(),
            "TDoc": T_Doc,
            "Doc": Doc,
            "Moneda": $("#Select_Moneda").val(),
            "Es_Contract": $("#Select_Estado").val(),
            "SecuenciaCargue": SC,
            "VContrato": $("#Td_Vr_Contr").html(),
            "VFinanciado": $("#Td_Vr_Finan").html(),
            "VOpCompra": $("#Td_Vr_OpCompra").html(),
            "SCapital": $("#Td_S_Capital").html(),
            "SInteres": $("#Td_S_Interes").html(),
            "SMora": $("#Td_S_Mora").html(),
            "SOtros": $("#Td_S_Otros").html(),
            "user": User
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    $("#dialog").dialog("option", "title", "Disculpenos :(");
                    $("#Mensaje_alert").text("No se realizo el ingreso del Contrato!");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "block");
                    $("#SE").css("display", "none");
                    $("#WA").css("display", "none");
                    break;

                case "Existe":
                    $("#dialog").dialog("option", "title", "Ya Existe");
                    $("#Mensaje_alert").text("El codigo ingresado ya existe en la base de datos!");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "None");
                    $("#SE").css("display", "none");
                    $("#WE").css("display", "block");
                    break;

                case "Exito":
                    $("#dialog").dialog("option", "title", "Exito");
                    $("#Mensaje_alert").text("El Contrato fue creado exitosamente! ");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "none");
                    $("#SE").css("display", "block");
                    $("#WA").css("display", "none");
                    Clear();
                    break;
            }

        },
        error: function () {

        }
    });
}