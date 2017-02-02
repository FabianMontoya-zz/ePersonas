
/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MTarjeta(State) {
    $.ajax({
        url: "R_Persona_TarjetaAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'RUTA'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Tarjeta = [];
            }
            else {
                Matrix_Tarjeta = JSON.parse(result);
            }
        },
        error: function () {

        }
    }).done(function () {
        var OnlyEmpresa = VerificarNIT("Select_EmpresaNit");

        if (OnlyEmpresa == true) {
            TransaccionesSegunNIT($("#Select_EmpresaNit").val());
        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MPersona(State) {
    $.ajax({
        url: "R_Persona_TarjetaAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'RUTA'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Persona = [];
            }
            else {
                Matrix_Persona = JSON.parse(result);
            }
        },
        error: function () {
        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MRTP(State) {
    $.ajax({
        url: "R_Persona_TarjetaAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'RUTA'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_RTP = [];
            }
            else {
                Matrix_RTP = JSON.parse(result);
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_EmpresaNit(State) {
    $.ajax({
        url: "R_Persona_TarjetaAjax.aspx",
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
                charge_CatalogList(ArrayEmpresaNit, "Select_EmpresaNit", "Generico");
            }
        },
        error: function () {

        },
        async: false, // La petición es síncrona
        cache: false // No queremos usar la caché del navegador
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Bloqueo(State) {
    $.ajax({
        url: "R_Persona_TarjetaAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'bloqueo'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayBloqueo = [];
            }
            else {
                ArrayBloqueo = JSON.parse(result);
                charge_CatalogList(ArrayBloqueo, "Select_Bloqueo", 1);
            }
        },
        error: function () {

        }
    });
}


/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_UpdateBloqueo(State) {
    var StrPersona = $("#Select_Persona option:selected").html();
    var SPersona = StrPersona.split("  -  ");

    undefined
    $.ajax({
        url: "R_Persona_TarjetaAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "Tarjeta": $("#Select_Tarjeta_Blo").val(),
            "Estado": "3",
            "Bloqueo": $("#Select_Bloqueo").val(),
            "Observaciones": $("#TxtA_Observacion").val(),
            "user": User.toUpperCase()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    $("#dialog").dialog("option", "title", "Disculpenos :(");
                    $("#Mensaje_alert").text("No se realizo el Bloqueo de la tarjeta!");
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
                    $("#Mensaje_alert").text("El Bloqueo de la tarjeta fue generada exitosamente! ");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "none");
                    $("#SE").css("display", "block");
                    $("#WA").css("display", "none");
                    transaccionAjax_MTarjeta('MATRIX_TARJETA');
                    Clear();
                    break;
            }

        },
        error: function () {

        }
    });
}

