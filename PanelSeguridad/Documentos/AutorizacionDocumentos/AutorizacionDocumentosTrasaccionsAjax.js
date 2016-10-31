/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_RutasOperacion(State) {
    $.ajax({
        url: "AutorizacionDocumentosAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "tabla": 'RUTA'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                RutasOperacion = [];
            }
            else {
                RutasOperacion = JSON.parse(result);
                RutaTemporal = RutasOperacion[0].RutaDocumentoTemporal;
                RutaRelativa = RutasOperacion[0].RutaRelativaDocumento;
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MDocumento(State) {
    $.ajax({
        url: "AutorizacionDocumentosAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "tabla": 'RUTA'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Documento = [];
            }
            else {
                Matrix_Documento = JSON.parse(result);
            }
        },
        error: function () {

        }
    });
}


/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MRDocVerif(State) {
    $.ajax({
        url: "AutorizacionDocumentosAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "tabla": 'RUTA'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Doc_Verificacion = [];
            }
            else {
                Matrix_Doc_Verificacion = JSON.parse(result);
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MDocWork(State) {
    $.ajax({
        url: "AutorizacionDocumentosAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "tabla": 'RUTA'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_DocWork = [];
            }
            else {
                Matrix_DocWork = JSON.parse(result);
            }
        },
        error: function () {

        }
    });
}


/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MVerificacion(State) {
    $.ajax({
        url: "AutorizacionDocumentosAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "tabla": 'RUTA'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Verificacion = [];
            }
            else {
                Matrix_Verificacion = JSON.parse(result);
                charge_CatalogList(Matrix_Verificacion, "Select_Estado", 1);
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
        url: "AutorizacionDocumentosAjax.aspx",
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


/*------------------------------ consulta ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_AutorizacionDocumentos(State, filtro, opcion) {
    var contenido;

    if ($("#TxtRead").val() == "") {
        contenido = "ALL";
    }
    else {
        contenido = $("#TxtRead").val();
    }


    $.ajax({
        url: "AutorizacionDocumentosAjax.aspx",
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
                ArrayAutorizacionDocumentos = [];
            }
            else {
                ArrayAutorizacionDocumentos = JSON.parse(result);
                Table_AutorizacionDocumentos();
            }
        },
        error: function () {

        }
    });
}


/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MConsecutivo(State) {
    $.ajax({
        url: "AutorizacionDocumentosAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "tabla": 'RUTA'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Consecutivo = [];
                $("#dialog").dialog("option", "title", "Exito");
                $("#Mensaje_alert").text("El documento no se puede crear no hay consecutivos! ");
                $("#dialog").dialog("open");
                $("#DE").css("display", "none");
                $("#SE").css("display", "none");
                $("#WE").css("display", "block");
            }
            else {
                Matrix_Consecutivo = JSON.parse(result);
            }
        },
        error: function () {

        }
    });
}


/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transaccionAjax_Update_Verificacion(State) {

    var StrNit = $("#Vis_MultiEmpresa_3").val();
    var A_Nit = StrNit.split(" - ");
    var Nit = A_Nit[0];
    Nit = Nit.replace("_", "");

    $.ajax({
        url: "AutorizacionDocumentosAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "Nit_ID": Nit,
            "Documento": $("#Vis_Documento_3").val(),
            "NameDocumento": Doc_name_save,
            "Verificacion_ID": $("#Select_TVerificacion").val(),
            "FVerificacion": $("#TxtFVerificacion").val(),
            "Observacion": $("#TxtA_Observacion").val(),
            "user": User.toUpperCase()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    $("#dialog").dialog("option", "title", "Disculpenos :(");
                    $("#Mensaje_alert").text("No se realizo el ingreso del AutorizacionDocumentos!");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "block");
                    $("#SE").css("display", "none");
                    $("#WE").css("display", "none");
                    break;

                case "Exito":
                    if (Array_Documento_Hijo.length == 0) {
                        $("#dialog").dialog("option", "title", "Exito");
                        $("#Mensaje_alert").text("La ValidacionDocumentos fue Actualizada exitosamente! ");
                        $("#dialog").dialog("open");
                        $("#DE").css("display", "none");
                        $("#SE").css("display", "block");
                        $("#WE").css("display", "none");
                        $("#Dialog_Visor_View").dialog("close");
                        $("#Dialog_Visor").dialog("close");
                        $("#Dialog_Valida_Document").dialog("close");
                        Clear();
                    } else {
                        transacionAjax_UpdateConsecutivo("Update_Consecutivo", ConsecutivoNuevo);
                    }
                    break;
            }

        },
        error: function () {

        }
    });
}

/*                  PASO 1 CON DOCUMENTOS ANEXOS                  */
/*------------------------------ crear documento ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_UpdateConsecutivo(State, Consecutivo) {

    Consecutivo = Consecutivo + 1;
    $.ajax({
        url: "AutorizacionDocumentosAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "Consecutivo": Consecutivo,
            "Nit_ID": Nit_ID_proccess
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            transacionAjax_ListDocument_Anexos("Update_D_Exist_D_Asociados");
        },
        error: function () {

        }
    });

}

/*                  PASO 2 CON DOCUMENTOS ANEXOS                  */
/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_ListDocument_Anexos(State) {

    //recorer array para el ingreso de los documentos hijos
    listDocAnexos = JSON.stringify(Array_Documento_Hijo);

    $.ajax({
        url: "AutorizacionDocumentosAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "listDocAnexos": listDocAnexos
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    $("#dialog").dialog("option", "title", "Disculpenos :(");
                    $("#Mensaje_alert").text("No se realizo el ingreso del Validación Documentos!");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "block");
                    $("#SE").css("display", "none");
                    $("#WE").css("display", "none");
                    break;

                case "Exito":
                    $("#dialog").dialog("option", "title", "Exito");
                    $("#Mensaje_alert").text("La Validacion Documentos fue Actualizada exitosamente, ademas se anexaron documentos de validación! ");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "none");
                    $("#SE").css("display", "block");
                    $("#WE").css("display", "none");
                    $("#Dialog_Visor_View").dialog("close");
                    $("#Dialog_Visor").dialog("close");
                    $("#Dialog_Valida_Document").dialog("close");
                    Clear();
                    transaccionAjax_MDocWork('MATIRXDOC_WORK');
                    break;
            }

        },
        error: function () {

        }
    });
}

/*------------------------------ crear documento ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_DeleteDocument(State, Ruta, nombre) {

    $.ajax({
        url: "AutorizacionDocumentosAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "Ruta": Ruta,
            "Doc_name": nombre
        },
        //Transaccion Ajax en proceso
        success: function (result) {
        },
        error: function () {

        }
    });
}
