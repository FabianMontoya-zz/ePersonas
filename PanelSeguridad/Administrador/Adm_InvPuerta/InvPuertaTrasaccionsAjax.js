
/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_EmpresaNit(State) {
    $.ajax({
        url: "InvPuertaAjax.aspx",
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
                charge_CatalogList(ArrayEmpresaNit, "Select_EmpresaNit", "Generico");
            }
        },
        error: function () {

        },
        async: false, // La petición es síncrona
        cache: false // No queremos usar la caché del navegador
    });
}

/*------------------------------ consulta ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_InvPuerta(State, filtro, opcion) {
    var contenido;

    if ($("#TxtRead").val() == "") {
        contenido = "ALL";
    }
    else {
        contenido = $("#TxtRead").val();
    }
    
    $.ajax({
        url: "InvPuertaAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "filtro": filtro,
            "opcion": opcion,
            "contenido": contenido
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayInvPuerta = [];
            }
            else {
                ArrayInvPuerta = JSON.parse(result);
                Table_InvPuerta();
            }
        },
        error: function () {

        }
    });
}

/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_InvPuerta_create(State) {
    $.ajax({
        url: "InvPuertaAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "Nit_ID": $("#Select_EmpresaNit").val(),
            "ID_Tarjeta": $("#TxtIDTarjeta").val(),
            "Vigencia": $("#Select_CheckVigencia").val(),
            "FechaInicial": $("#TxtFechaInicial").val(),
            "FechaFinal": $("#TxtFechaFinal").val(),
            "Nit_Emp_User": Array_G_Usuario[0].Nit_ID,
            "TDoc": Array_G_Usuario[0].TypeDocument,
            "Doc": Array_G_Usuario[0].Documento,
            "user": User.toUpperCase()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    $("#dialog").dialog("option", "title", "Disculpenos :(");
                    $("#Mensaje_alert").text("No se realizo el ingreso de la Tarjeta!");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "block");
                    $("#SE").css("display", "none");
                    $("#WA").css("display", "none");
                    break;

                case "Existe":
                    $("#dialog").dialog("option", "title", "Advertecia!");
                    $("#Mensaje_alert").text("La Tarjeta ya existe en la Base de Datos de esta Empresa! ");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "none");
                    $("#SE").css("display", "none");
                    $("#WE").css("display", "block");
                    Clear();
                    break;

                case "Exito":
                    $("#dialog").dialog("option", "title", "Exito");
                    $("#Mensaje_alert").text("La Tarjeta fue ingresada exitosamente! ");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "none");
                    $("#SE").css("display", "block");
                    $("#WA").css("display", "none");
                    Clear();
                    break;

                case "Asignada":
                    $("#dialog").dialog("option", "title", "Advertecia!");
                    $("#Mensaje_alert").text("La Tarjeta ya fue asignada a una Persona! ");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "none");
                    $("#SE").css("display", "none");
                    $("#WE").css("display", "block");
                    Clear();
                    break;

                case "NO_USER":
                    $("#dialog").dialog("option", "title", "Advertecia!");
                    $("#Mensaje_alert").text("No se puede ingresar la tarjeta este usurio no esta registrado en Clientes! ");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "none");
                    $("#SE").css("display", "none");
                    $("#WE").css("display", "block");
                    Clear();
                    break;
            }

        },
        error: function () {

        }
    });
}

