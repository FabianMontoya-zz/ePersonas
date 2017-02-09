
/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MTarjeta(State) {
    $.ajax({
        url: "R_Persona_TarjetaAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'RUTA',
            "Nit": $("#Select_EmpresaNit").val()
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
        console.log("AjAx");
        Charge_Combos_Depend_Nit(Matrix_Tarjeta, "Select_Tarjeta_DBlo", $("#Select_EmpresaNit").val(), "");
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
            "tabla": 'RUTA',
            "Nit": $("#Select_EmpresaNit").val()
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
            "tabla": 'RUTA',
            "Nit": $("#Select_EmpresaNit").val()
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
    }).done(function () {
        var OnlyEmpresa = VerificarNIT("Select_EmpresaNit");

        if (OnlyEmpresa == true) {
            TransaccionesSegunNIT($("#Select_EmpresaNit").val());
        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Des_Bloqueo(State) {
    $.ajax({
        url: "R_Persona_TarjetaAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'Des_Bloqueo'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayDes_Bloqueo = [];
            }
            else {
                ArrayDes_Bloqueo = JSON.parse(result);
                charge_CatalogList(ArrayDes_Bloqueo, "Select_Des_Bloqueo", 1);
            }
        },
        error: function () {

        }
    });
}

/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_UpdateDes_Bloqueo(State) {

    $.ajax({
        url: "R_Persona_TarjetaAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "Tarjeta": $("#Select_Tarjeta_DBlo").val(),
            "Estado": "0",
            "Bloqueo": "0",
            "Observaciones": $("#TxtA_Observacion").val(),
            "user": User.toUpperCase()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    Mensaje_General("Disculpenos :(", "No se realizo el Des_Bloqueo de la tarjeta!", "E");
                    break;

                case "Exito":
                    Mensaje_General("Exito", "El Des_Bloqueo de la tarjeta fue generada exitosamente!, se ha pasado a estado en (custodia) para volver a signar a cualquier persona de la Organización", "S");
                    transaccionAjax_MTarjeta('MATRIX_TARJETA');
                    Clear();
                    break;

                case "NO_USER":
                    Mensaje_General("Usuario No Existe!", "El Des_Bloqueo de la tarjeta No se Realizo!, El usuario de Logeo no Existe como persona en la Base de Datos!", "W");
                    transaccionAjax_MTarjeta('MATRIX_TARJETA');
                    Clear();
                    break;
            }

        },
        error: function () {

        }
    });
}

