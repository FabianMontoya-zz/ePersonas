/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_CargaBusqueda(State) {
    OpenControl();
    $.ajax({
        url: "C_AccesoPreAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'R_PERSONAS_ACCESOS_PREDETER'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayCombo = [];
            }
            else {
                ArrayCombo = JSON.parse(result);
                charge_CatalogList(ArrayCombo, "DDLColumns", 1);
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MTarjeta(State) {
    $.ajax({
        url: "C_AccesoPreAjax.aspx",
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
        },
        async: false,
        cache: false
    }).done(function () {
        Charge_Combos_Depend_Nit(Matrix_Tarjeta, "Select_Tarjeta_AccPre", $("#Select_EmpresaNit").val(), "");
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MPersona(State) {
    $.ajax({
        url: "C_AccesoPreAjax.aspx",
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
        async: false,
        cache: false
    }).done(function () {
        Charge_Combos_Depend_Nit(Matrix_Persona, "Select_Persona", $("#Select_EmpresaNit").val(), "");
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MPAccesos(State) {
    $.ajax({
        url: "C_AccesoPreAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'RUTA'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_PAccesos = [];
            }
            else {
                Matrix_PAccesos = JSON.parse(result);
            }
        },
        error: function () {
        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MPAcceso_Area(State) {
    $.ajax({
        url: "C_AccesoPreAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'RUTA'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_PAcceso_Area = [];
            }
            else {
                Matrix_PAcceso_Area = JSON.parse(result);
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
        url: "C_AccesoPreAjax.aspx",
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
        url: "C_AccesoPreAjax.aspx",
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
                charge_CatalogList(ArrayEmpresaNit, "Select_EmpresaNit_Ing", 1);

            }
        },
        error: function () {

        },
        //Jhon
        async: false, // La petición es síncrona
        cache: false // No queremos usar la caché del navegador
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Tipo_Ingreso(State) {
    $.ajax({
        url: "C_AccesoPreAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'CLIENTE'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayTipo_ing = [];
            }
            else {
                ArrayTipo_ing = JSON.parse(result);
                charge_CatalogList(ArrayTipo_ing, "Select_TypeIngreso", 1);
            }
        },
        error: function () {

        }
    });
}

/*------------------------------ consulta ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_AccesoPredet(State, filtro, opcion) {
    var contenido;

    if ($("#TxtRead").val() == "") {
        contenido = "ALL";
    }
    else {
        contenido = $("#TxtRead").val();
    }


    $.ajax({
        url: "C_AccesoPreAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "filtro": filtro,
            "opcion": opcion,
            "contenido": contenido,
            "Nit_User": g_NitEmpresa_User
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayAccesoPredet = [];
            }
            else {
                ArrayAccesoPredet = JSON.parse(result);
                Table_Grid();
            }
        },
        error: function () {

        }
    });
}


/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Insert_AccesoPredet(State) {
    var StrPersona = $("#Select_Persona option:selected").html();
    var SPersona = StrPersona.split("  -  ");

    var StrPersona_Enc = $("#Select_Persona_Enc option:selected").html();
    var SPersona_Enc = StrPersona_Enc.split("  -  ");

    if (StrPersona_Enc == "Todos") {
        SPersona_Enc[0] = 0;
        SPersona_Enc[1] = 0;
    }


    var ID;
    var Nit_ID;
    var FI = "";
    var HI = "";
    var FF = "";
    var HF = "";

    if (State == "modificar") {
        Nit_ID = editNit_ID;
        ID = editID;
    }
    else {
        Nit_ID = $("#Select_EmpresaNit").val();
        ID = $("#Txt_ID").val();
    }

    if ($("#Select_CheckVigencia").val() == "S") {
        FI = $("#TxtFinicial").val();
        HI = $("#txt_HIVigencia").val();
        FF = $("#TxtFfinal").val();
        HF = $("#txt_HFVigencia").val();
    }

    $.ajax({
        url: "C_AccesoPreAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "Nit_ID": Nit_ID,
            "TDoc": SPersona[1],
            "Doc": SPersona[0],
            "Tarjeta": $("#Select_Tarjeta_AccPre").val(),
            "Nit_Ing_ID": $("#Select_EmpresaNit_Ing").val(),
            "PuertaAcceso_ID": $("#Select_PAcceso").val(),
            "AreaAcceso_ID": $("#Select_AreaAcceso").val(),
            "TDoc_Enc": SPersona_Enc[1],
            "Doc_Enc": SPersona_Enc[0],
            "FI": FI,
            "HI": HI,
            "FF": FF,
            "HF": HF,
            "CheckVigencia": $("#Select_CheckVigencia").val(),
            "TypeIngreso": $("#Select_TypeIngreso").val(),
            "user": User.toUpperCase()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    $("#dialog").dialog("option", "title", "Disculpenos :(");
                    $("#Mensaje_alert").text("No se realizo  El Acceso Predeterminado!");
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
                    if (estado == "modificar") {
                        $("#dialog").dialog("option", "title", "Exito");
                        $("#Mensaje_alert").text("El Acceso Predeterminado fue Actualizado exitosamente! ");
                        $("#dialog").dialog("open");
                        $("#DE").css("display", "none");
                        $("#SE").css("display", "block");
                        $("#WA").css("display", "none");
                        transaccionAjax_MTarjeta('MATRIX_TARJETA');
                        Clear();
                    }
                    else {
                        $("#dialog").dialog("option", "title", "Exito");
                        $("#Mensaje_alert").text("El Acceso Predeterminado fue generado exitosamente! ");
                        $("#dialog").dialog("open");
                        $("#DE").css("display", "none");
                        $("#SE").css("display", "block");
                        $("#WA").css("display", "none");
                        transaccionAjax_MTarjeta('MATRIX_TARJETA');
                        Clear();
                    }

                    break;
            }

        },
        error: function () {

        }
    });
}

/*------------------------------ eliminar ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Delete_AccesoPredet(State) {

    $.ajax({
        url: "C_AccesoPreAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "Nit_ID": editNit_ID,
            "TDoc": editTDoc,
            "Doc": editDoc,
            "Tarjeta": editTarjeta,
            "Nit_Ing_ID": editNit_Ing_ID,
            "PuertaAcceso_ID": editPuertaAcceso_ID,
            "AreaAcceso_ID": editAreaAcceso_ID,
            "TDoc_Enc": editTDoc_Enc,
            "Doc_Enc": editDoc_Enc,
            "user": User.toUpperCase()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    $("#dialog").dialog("option", "title", "Disculpenos :(");
                    $("#Mensaje_alert").text("No se elimino El Acceso Predeterminado!");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "block");
                    $("#SE").css("display", "none");
                    $("#WA").css("display", "none");
                    $("#dialog_eliminar").dialog("close");
                    break;

                case "Exito":
                    $("#dialog_eliminar").dialog("close");
                    $("#dialog").dialog("option", "title", "Exito");
                    $("#Mensaje_alert").text("El Acceso Predeterminado fue eliminado exitosamente! ");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "none");
                    $("#SE").css("display", "block");
                    $("#WA").css("display", "none");
                    $("#dialog_eliminar").dialog("close");
                    transacionAjax_AccesoPredet("consulta", "N", "ALL");
                    Clear();
                    break;
            }

        },
        error: function () {

        }
    });

}
