/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_CargaBusqueda(State) {
    $.ajax({
        url: "Calendario_ProgresivoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'CalendarioProgresivo'
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
function transacionAjax_EmpresaNit(State) {
    $.ajax({
        url: "Calendario_ProgresivoAjax.aspx",
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

//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_ChargeFestivos(State) {
    MatrizFestivos = [];
    $.ajax({
        url: "Calendario_ProgresivoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                MatrizFestivos = [];
            }
            else {
                MatrizFestivos = JSON.parse(result);
            }
        },
        error: function () {
            Mensaje_General("Error al consultar Festivos", "Lo sentimos, ocurrió un error mientras se cargaban los días festivos y la operación se ha cancelado. Intente más tarde la operación.", "E");
        }
    });
}

//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_ChargeCalendarios(State, NIT) {
    Matrix_Calendarios = [];
    $.ajax({
        url: "Calendario_ProgresivoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "Nit": NIT
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Calendarios = [];
            }
            else {
                Matrix_Calendarios = JSON.parse(result);
                CargaCalendarios(Matrix_Calendarios, "Select_Calendario_CP", "");
            }
        },
        error: function () {

        }
    });
}

/*------------------------------ consulta ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Calendario(State, filtro, opcion) {
    var contenido;

    if ($("#TxtRead").val() == "") {
        contenido = "ALL";
    }
    else {
        contenido = $("#TxtRead").val();
    }

    $.ajax({
        url: "Calendario_ProgresivoAjax.aspx",
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
                ArrayCalendario = [];
            }
            else {
                ArrayCalendario = JSON.parse(result);
                Table_Calendario();
            }
        },
        error: function () {

        }
    });
}

/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Calendario_create(State) {

    var ID;
    var Nit_ID;

    if (State == "modificar") {
        Nit_ID = editNit_ID;
        ID = editID;
    }
    else {
        Nit_ID = $("#Select_EmpresaNit").val();
        ID = $("#Txt_ID").val();
    }

    ListC_Semana = JSON.stringify(ArrayC_Semana);
    $.ajax({
        url: "Calendario_ProgresivoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "Nit_ID": Nit_ID,
            "ID": ID,
            "Descripcion": $("#TxtDescription").val(),
            "TipoCalendario": $("#Select_TipoCalendario").val(),
            "List_Semana": ListC_Semana,
            "user": User.toUpperCase()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    if (estado == "modificar") {
                        Mensaje_General("Disculpenos :(", "No se realizo la modificación del Calendario!", "E");
                    } else {
                        Mensaje_General("Disculpenos :(", "No se realizo el ingreso del Calendario!", "E");
                    }
                    break;

                case "Existe":
                    Mensaje_General("Ya Existe", "El codigo ingresado ya existe en la base de datos!", "W");
                    break;

                case "Exito":
                    if (estado == "modificar") {
                        Mensaje_General("Exito", "El Calendario " + ID + " - " + $("#TxtDescription").val() + " fue modificado exitosamente!", "S");
                        $("#Dialog_Calendar").dialog("close");
                        $(".Dialog_Datos_Calen").css("display", "none");
                        $("#TablaConsulta").css("display", "inline-table");
                        $(".container_TGrid").html("");
                        estado = "modificar";
                        ResetError();
                        Clear();
                    }
                    else {
                        Mensaje_General("Exito", "El Calendario " + ID + " - " + $("#TxtDescription").val() + " fue creado exitosamente!", "S");
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
function transacionAjax_Calendario_delete(State) {

    $.ajax({
        url: "Calendario_ProgresivoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "Nit_ID": editNit_ID,
            "ID": editID,
            "TipoCalendario": TipoCalendar,
            "user": User
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    $("#dialog_eliminar").dialog("close");
                    Mensaje_General("Disculpenos :(", "Ocurrió un error y no se pudo eliminar el Calendario " + editID + ", por favor intente más tarde.", "E");
                    
                    break;

                case "Exist_O":
                    $("#dialog_eliminar").dialog("close");
                    Mensaje_General("Integridad referencial", "No se elimino el Calendario, para eliminarlo debe eliminar primero el registro en la tabla de los días del calendario asignado", "W");
                    
                    break;

                case "Exito":
                    $("#dialog_eliminar").dialog("close");
                    Mensaje_General("Exito", "El Calendario " + editID + " fue eliminado exitosamente.", "S");
                    transacionAjax_Calendario("consulta", "N", "ALL");
                    Clear();
                    break;
            }

        },
        error: function () {

        }
    });

}

/*-------------------- carga arrays por día ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_ArrayC_Semana(State) {
    //OpenControl();
    var Index_Calendar = $("#Select_Calendario_CP").val();
    var ID_Calendar = "";
    var Nit_ID = "";
    //Buscamos los datos que identifican este calendario
    for (var i in Matrix_Calendarios) {
        if(Index_Calendar == Matrix_Calendarios[i].Index){
            ID_Calendar = Matrix_Calendarios[i].Calendario_ID;
            Nit_ID = Matrix_Calendarios[i].Nit_ID;
            break;
        }
    }
    $.ajax({
        url: "Calendario_ProgresivoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "ID_Calendario": ID_Calendar,
            "Nit_ID": Nit_ID
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayC_Semana = [];
            }
            else {
                ArrayC_Semana = JSON.parse(result);
                ValidarLaborales();
            }
        },
        error: function () {

        },
        async: false, // La petición es síncrona
        cache: false // No queremos usar la caché del navegador
    });
}