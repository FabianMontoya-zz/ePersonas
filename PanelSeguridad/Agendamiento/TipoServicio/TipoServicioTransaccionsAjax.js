/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_CargaBusqueda(State) {
    OpenControl();
    $.ajax({
        url: "TipoServicioAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'TIPO_SERVICIO'
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

        },
    }).done(function () {
        var vl_OnlyEmpresa = VerificarNIT("Select_EmpresaNit");

        if (vl_OnlyEmpresa == true) {
            Nit_ID_proccess = $("#Select_EmpresaNit").val();
            TransaccionesSegunNIT(Nit_ID_proccess);
        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_EmpresaNit(State) {
    $.ajax({
        url: "TipoServicioAjax.aspx",
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

        },
        async: false, // La petición es síncrona
        cache: false // No queremos usar la caché del navegador
    }).done(function () {

    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_RutasOperacion(State) {
    $.ajax({
        url: "TipoServicioAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
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

        },
    }).done(function () {
        var vl_OnlyEmpresa = VerificarNIT("Select_EmpresaNit");

        if (vl_OnlyEmpresa == true) {
            Nit_ID_proccess = $("#Select_EmpresaNit").val();
            TransaccionesSegunNIT(Nit_ID_proccess);
        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Formato(State) {
    $.ajax({
        url: "TipoServicioAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'CLIENTE'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayFormato = [];
            }
            else {
                ArrayFormato = JSON.parse(result);
                charge_CatalogList(ArrayFormato, "Select_Formato", 1);
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
        url: "TipoServicioAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'TIPO',
            "Nit": $("#Select_EmpresaNit").val()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Moneda = [];
            }
            else {
                Matrix_Moneda = JSON.parse(result);
            }
        },
        error: function () {

        },
        async: false,
        cache: false
    }).done(function () {
        Charge_Combos_Depend_Nit(Matrix_Moneda, "Select_Moneda_Cod", $("#Select_EmpresaNit").val(), "");
    });
}

//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Calendario(State, vp_Nit) {
    $.ajax({
        url: "TipoServicioAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'CALENDARIOS',
            "Nit": vp_Nit
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Calendarios = [];
            }
            else {
                Matrix_Calendarios = JSON.parse(result);
                
                CargaCalendarios(Matrix_Calendarios, "Select_Calendario_TS", "");
            }
        },
        error: function () {

        },
        async: false,
        cache: false
    }).done(function () {
        CargaCalendarios(Matrix_Calendarios, "Select_Calendario_TS", "");
    });
}

/*------------------------------ consulta ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_TipoServicio(State, filtro, opcion) {
    var contenido;

    if ($("#TxtRead").val() == "") {
        contenido = "ALL";
    }
    else {
        contenido = $("#TxtRead").val();
    }

    $.ajax({
        url: "TipoServicioAjax.aspx",
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
                ArrayTipoServicio = [];
            }
            else {
                ArrayTipoServicio = JSON.parse(result);
                Table_Servicio();
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MDocumento(vp_State, vp_Nit) {
    $.ajax({
        url: "TipoServicioAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": vp_State,
            "Nit": vp_Nit
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

        },
    }).done(function () {
    });
}

/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_TipoServicio_create(State) {

    var ID;
    var Nit_ID;
    var TipoServicioDepen = 0;
    var Politica = 0;
    var calendario_id;

    if (State == "modificar") {
        Nit_ID = editNit_ID;
        ID = editID;
    }
    else {
        Nit_ID = $("#Select_EmpresaNit").val();
        ID = $("#Txt_ID").val();
    }

    if ($("#Select_Calendario_TS").val() == null) {
        calendario_id = 0;
    } else {
        calendario_id = $("#Select_Calendario_TS").val();
    }

    $.ajax({
        url: "TipoServicioAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "Nit_ID": Nit_ID,
            "ID": ID,
            "nombre": $("#TxtNombre").val(),
            "Tipo": $("#Select_TipoServicio").val(),
            "Refe": $("#Text_Referencia").val(),
            "Mon": $("#Select_Moneda_Cod").val(),
            "Cos": $("#TxtCosto").val(),
            "Val": $("#TxtValor").val(),
            "Det": $("#Txt_Detalle").val(),
            "Cap": $("#Text_Capacidad").val(),
            "Blo": $("#Text_Bloqueo").val(),
            "Cal": $("#Select_Calculo").val(),
            "TimSes": $("#Text_Tiempo_Sesion").val(),
            "TiemEn": $("#Text_Tiempo_Entre_Sesiones").val(),
            "MaxA": $("#Tiempo_Max_Agenda").val(),
            "Ima": $("#IF_Visor").val(),
            "calendario": calendario_id,
            "user": User.toUpperCase()

        },
        //Transaccion Ajax en proceso
        success: function (result) {

            switch (result) {

                case "Error":
                    if (estado == "modificar") {
                        Mensaje_General("Disculpenos :(", "No se realizo la modificación del Tipo Servicio!", "E");
                    } else {
                        Mensaje_General("Disculpenos :(", "No se realizo el ingreso del TipoServicio!", "E");
                    }
                    break;

                case "Existe":
                    Mensaje_General("Ya Existe", "El codigo ingresado ya existe en la base de datos!", "W");
                    break;

                case "Exito":
                    if (estado == "modificar") {
                        Mensaje_General("Exito", "El TipoServicio fue modificado exitosamente!", "S");
                        Clear();
                        HabilitarPanel("modificar")
                    }
                    else {
                        Mensaje_General("Exito", "El TipoServicio fue creado exitosamente!", "S");
                        Clear();
                        HabilitarPanel("modificar")
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
function transacionAjax_TipoServicio_delete(State) {

    $.ajax({
        url: "TipoServicioAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "Nit_ID": editNit_ID,
            "ID": editID,
            "user": User
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    Mensaje_General("Disculpenos :(", "No se elimino el TipoServicio!", "E");
                    $("#dialog_eliminar").dialog("close");
                    break;

                case "Exist_O":
                    Mensaje_General("Integridad referencial", "No se elimino el TipoServicio, para eliminarlo debe eliminar primero el registro en la tabla Empleado", "W");
                    $("#dialog_eliminar").dialog("close");
                    break;

                case "Exito":
                    $("#dialog_eliminar").dialog("close");
                    Mensaje_General("Exito", "El TipoServicio fue eliminado exitosamente!", "S");
                    transacionAjax_TipoServicio("consulta", "N", "ALL");
                    Clear();
                    break;
            }

        },
        error: function () {

        }
    });

}