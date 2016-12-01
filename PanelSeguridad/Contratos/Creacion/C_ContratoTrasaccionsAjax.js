
/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_EmpresaNit(State) {
    $.ajax({
        url: "C_ContratoAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
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
        data: { "action": State,
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

