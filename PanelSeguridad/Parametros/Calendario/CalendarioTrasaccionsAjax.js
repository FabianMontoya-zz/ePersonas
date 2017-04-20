
/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_CargaBusqueda(State) {
    try {
        $.ajax({
            url: "CalendarioAjax.aspx",
            type: "POST",
            //crear json
            data: {
                "action": State,
                "tabla": 'Calendario'
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
    } catch (e) {
        Mensaje_General("Error - Transacción Ajax fallida", "Lo sentimos, ocurrió un error y no se logró completar la transacción ajax solicitada, favor verifique los datos.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario):\n" + e));
    }
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_EmpresaNit(State) {
    try {
        $.ajax({
            url: "CalendarioAjax.aspx",
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
    } catch (e) {
        Mensaje_General("Error - Transacción Ajax fallida", "Lo sentimos, ocurrió un error y no se logró completar la transacción ajax solicitada, favor verifique los datos.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario):\n" + e));
    }
}

//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Calendario(State) {
    try {
        Matrix_Calendarios = [];
        $.ajax({
            url: "CalendarioAjax.aspx",
            type: "POST",
            //crear json
            data: {
                "action": State,
                "tabla": 'CALENDARIOS',
                "Nit": $("#Select_EmpresaNit").val()
            },
            //Transaccion Ajax en proceso
            success: function (result) {
                if (result == "") {
                    Matrix_Calendarios = [];
                }
                else {
                    Matrix_Calendarios = JSON.parse(result);
                }
            },
            error: function () {

            },
            async: false,
            cache: false
        }).done(function () {
            CargaCalendarios(Matrix_Calendarios, "Select_Calendario", "");
        });
    } catch (e) {
        Mensaje_General("Error - Transacción Ajax fallida", "Lo sentimos, ocurrió un error y no se logró completar la transacción ajax solicitada, favor verifique los datos.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario):\n" + e));
    }
}

/*------------------------------ consulta ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_ConsultCalendario(State, filtro, opcion) {
    try {
        var contenido;

        if (filtro == "N") {
            contenido = "ALL";
        }
        else {
            contenido = $("#TxtRead").val();
        }

        $.ajax({
            url: "CalendarioAjax.aspx",
            type: "POST",
            //crear json
            data: {
                "action": State,
                "filtro": filtro,
                "opcion": opcion,
                "contenido": contenido,
                "TipoCalendario": "N",
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
    } catch (e) {
        Mensaje_General("Error - Transacción Ajax fallida", "Lo sentimos, ocurrió un error y no se logró completar la transacción ajax solicitada, favor verifique los datos.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario):\n" + e));
    }
}

/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Calendario_create(State) {
    try {
        var ID;
        var Nit_ID;

        if (State == "modificar") {
            Nit_ID = editNit_ID;
            ID = editID;
        }else {
            Nit_ID = $("#Select_EmpresaNit").val();
            ID = $("#Txt_ID").val();
        }

        ListC_Semana = JSON.stringify(ArrayC_Semana);
        $.ajax({
            url: "CalendarioAjax.aspx",
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
                            Mensaje_General("¡Error!", "¡UPS!, ocurrió un error y no logró completar la modificación del Calendario, favor verificar los datos.", "E");
                        } else if (estado == "crear") {
                            Mensaje_General("¡Error!", "¡UPS!, ocurrió un error y no logró completar el ingreso del Calendario, favor verificar los datos.", "E");
                        }
                        break;

                    case "Existe":
                        Mensaje_General("¡Código Duplicado!", "El código ingresado para este calendario ya existe en la base de datos, favor revisar.", "W");
                        break;

                    case "Exito":
                        if (estado == "modificar") {
                            Mensaje_General("Exito", "El Calendario « " + ID + " - " + $("#TxtDescription").val() + " » fue modificado exitosamente.", "S");
                            $("#Dialog_Calendar").dialog("close");
                            $(".Dialog_Datos_Calen").css("display", "none");
                            $("#TablaConsulta").css("display", "inline-table");
                            $(".container_TGrid").html("");
                            estado = "modificar";
                            ResetError();
                            Clear();
                        }
                        else if (estado == "crear") {
                            Mensaje_General("Exito", "El Calendario «" + ID + " - " + $("#TxtDescription").val() + " » fue creado exitosamente.", "S");
                            Clear();
                        }
                        break;
                }

            },
            error: function () {

            }
        });
    } catch (e) {
        Mensaje_General("Error - Transacción Ajax fallida", "Lo sentimos, ocurrió un error y no se logró completar la transacción ajax solicitada, favor verifique los datos.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario):\n" + e));
    }
}

/*------------------------------ eliminar ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Calendario_delete(State) {
    try {
        $.ajax({
            url: "CalendarioAjax.aspx",
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
                        Mensaje_General("Disculpenos :(", "Ocurrió un error y no se pudo eliminar el Calendario « " + editID + " », por favor intente más tarde.", "E");

                        break;

                    case "Exist_O":
                        $("#dialog_eliminar").dialog("close");
                        Mensaje_General("Integridad referencial", "No se elimino el Calendario, para eliminarlo debe eliminar primero el registro en la tabla de los días del calendario asignado", "W");

                        break;

                    case "Exito":
                        $("#dialog_eliminar").dialog("close");
                        Mensaje_General("Exito", "El Calendario « " + editID + " » fue eliminado exitosamente.", "S");
                        $(".Dialog_Datos_Calen").css("display", "none");
                        $("#TablaConsulta").css("display", "inline-table");
                        $(".container_TGrid").html("");
                        estado = "eliminar";
                        Clear();
                        break;
                }

            },
            error: function () {

            }
        });
    } catch (e) {
        Mensaje_General("Error - Transacción Ajax fallida", "Lo sentimos, ocurrió un error y no se logró completar la transacción ajax solicitada, favor verifique los datos.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario):\n" + e));
    }
}

/*-------------------- carga arrays por día ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_ArrayC_Semana(State) {
    try {
        OpenControl();
        $.ajax({
            url: "CalendarioAjax.aspx",
            type: "POST",
            //crear json
            data: {
                "action": State,
                "ID_Calendario": editID,
                "Nit_ID": editNit_ID
            },
            //Transaccion Ajax en proceso
            success: function (result) {
                if (result == "") {
                    ArrayC_Semana_Edit = [];
                }
                else {
                    ArrayC_Semana_Edit = JSON.parse(result);
                }
            },
            error: function () {

            },
            async: false, // La petición es síncrona
            cache: false // No queremos usar la caché del navegador
        });
    } catch (e) {
        Mensaje_General("Error - Transacción Ajax fallida", "Lo sentimos, ocurrió un error y no se logró completar la transacción ajax solicitada, favor verifique los datos.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario):\n" + e));
    }
}