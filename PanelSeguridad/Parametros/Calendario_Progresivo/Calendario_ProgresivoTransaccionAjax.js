/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_CargaBusqueda(State) {
    try {
        $.ajax({
            url: "Calendario_ProgresivoAjax.aspx",
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
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario Progresivo):\n" + e));
    }
}
/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_EmpresaNit(State) {
    try {
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
    } catch (e) {
        Mensaje_General("Error - Transacción Ajax fallida", "Lo sentimos, ocurrió un error y no se logró completar la transacción ajax solicitada, favor verifique los datos.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario Progresivo):\n" + e));
    }
}

//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_ChargeFestivos(State) {
    try {
        MatrizFestivos = [];
        var ID_Calendario_Base = "";
        var Index_Calendar = $("#Select_Calendario_CP").val();

        for (var i in Matrix_Calendarios) {
            if (Index_Calendar == Matrix_Calendarios[i].Index) {
                ID_Calendario_Base = Matrix_Calendarios[i].Calendario_ID;
                break;
            }
        }
        $.ajax({
            url: "Calendario_ProgresivoAjax.aspx",            
            type: "POST",
            //crear json
            data: {
                "action": State,
                "Nit_ID": $("#Select_EmpresaNit").val(),
                "Calendario_ID": ID_Calendario_Base
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
            },
            async: false, // La petición es síncrona
            cache: false // No queremos usar la caché del navegador
        });
    } catch (e) {
        Mensaje_General("Error - Transacción Ajax fallida", "Lo sentimos, ocurrió un error y no se logró completar la transacción ajax para consulta de festivos, favor verifique los datos.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario Progresivo):\n" + e));
    }
}

//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_ChargeCalendarios(State, NIT) {
    try {
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

            },
            async: false, // La petición es síncrona
            cache: false // No queremos usar la caché del navegador
        });
    } catch (e) {
        Mensaje_General("Error - Transacción Ajax fallida", "Lo sentimos, ocurrió un error y no se logró completar la transacción ajax solicitada, favor verifique los datos.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario Progresivo):\n" + e));
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
            url: "Calendario_ProgresivoAjax.aspx",
            type: "POST",
            //crear json
            data: {
                "action": State,
                "filtro": filtro,
                "opcion": opcion,
                "contenido": contenido,
                "TipoCalendario": "2",
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

            },
            async: false, // La petición es síncrona
            cache: false // No queremos usar la caché del navegador
        });
    } catch (e) {
        Mensaje_General("Error - Transacción Ajax fallida", "Lo sentimos, ocurrió un error y no se logró completar la transacción ajax solicitada, favor verifique los datos.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario Progresivo):\n" + e));
    }
}

/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Calendario_create(State) {
    try {
        var validateOption = false; //Valida si es una acción a ejecutar valida
        var ID_Calendario = "";
        var ID_Calendario_Base = "";
        var Nit_ID = "";
        var Index_Calendar = $("#Select_Calendario_CP").val();

        if (State == "modificar") {
            validateOption = true;
            Nit_ID = editNit_ID;
            ID_Calendario = editID;
        }else if (State == "crear") {
            validateOption = true;
            Nit_ID = $("#Select_EmpresaNit").val();
            ID_Calendario = $("#Txt_ID").val();            
        }
        for (var i in Matrix_Calendarios) {
            if (Index_Calendar == Matrix_Calendarios[i].Index) {
                ID_Calendario_Base = Matrix_Calendarios[i].Calendario_ID;
                break;
            }
        }
        var ListH_Calendario = JSON.stringify(ArrayH_Calendario);
        if (validateOption == true) {
            $.ajax({
                url: "Calendario_ProgresivoAjax.aspx",
                type: "POST",
                //crear json
                data: {
                    "action": State,
                    "Nit_ID": Nit_ID,
                    "ID_Calendario": ID_Calendario,
                    "Descripcion": $("#TxtDescription").val(),
                    "TipoCalendario": "2",
                    "ID_Calendario_Base": ID_Calendario_Base,
                    "ListH_Calendario": ListH_Calendario,
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
                            Mensaje_General("¡Código Duplicado!", "El código ingresado para este calendario ya existe en la base de datos, favor verificar.", "W");
                            break;

                        case "Exito":
                            if (estado == "modificar") {
                                Mensaje_General("Actualización Exitosa", "El Calendario «" + ID_Calendario + " - " + $("#TxtDescription").val() + "» se ha modificado exitosamente.", "S");
                                $("#Dialog_Calendar").dialog("close");
                                $(".Dialog_Datos_Calen").css("display", "none");
                                $("#TablaConsulta").css("display", "inline-table");
                                $(".container_TGrid").html("");
                                estado = "modificar";
                                Clear();
                            }
                            else if (estado == "crear") {
                                Mensaje_General("Creación Exitosa", "El Calendario «" + ID_Calendario + " - " + $("#TxtDescription").val() + "» fue creado exitosamente.", "S");
                                Clear();
                            }
                            break;
                    }

                },
                error: function () {

                }
            });
        } else {
            setTimeout(console.warn.bind(console, "• Log de error generado (Calendario Progresivo):\nSe intentó ejecutar la transacción ajax con una opción no valida, solo se puede crear o modificar calendarios en este módulo."));
            Mensaje_General("Transacción Autocancelada", "Lo sentimos, la operación solicitada no se ejecutó, el sistema la canceló automáticamente.", "E");
        }
    } catch (e) {
        Mensaje_General("Error - Transacción Ajax fallida", "Lo sentimos, ocurrió un error y no se logró completar la transacción ajax solicitada, favor verifique los datos.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario Progresivo):\n" + e));
    }
}

/*------------------------------ eliminar ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Calendario_delete(State) {
    try {
        $.ajax({
            url: "Calendario_ProgresivoAjax.aspx",
            type: "POST",
            //crear json
            data: {
                "action": State,
                "Nit_ID": editNit_ID,
                "ID_Calendario": editID,
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
                                        

                    case "Exito":
                        $("#dialog_eliminar").dialog("close");
                        Mensaje_General("Exito", "El Calendario " + editID + " fue eliminado exitosamente.", "S");
                        transacionAjax_ConsultCalendario("consulta", "N", "ALL");
                        Clear();
                        break;
                }

            },
            error: function () {

            }
        });
    } catch (e) {
        Mensaje_General("Error - Transacción Ajax fallida", "Lo sentimos, ocurrió un error y no se logró completar la transacción ajax solicitada, favor verifique los datos.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario Progresivo):\n" + e));
    }
}

/*-------------------- carga arrays por día ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_ArrayC_Semana(State) {
    try {
        //OpenControl();
        var Index_Calendar = $("#Select_Calendario_CP").val();
        var ID_Calendar = "";
        var Nit_ID = "";
        //Buscamos los datos que identifican este calendario
        for (var i in Matrix_Calendarios) {
            if (Index_Calendar == Matrix_Calendarios[i].Index) {
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
    } catch (e) {
        Mensaje_General("Error - Transacción Ajax fallida", "Lo sentimos, ocurrió un error y no se logró completar la transacción ajax solicitada, favor verifique los datos.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario Progresivo):\n" + e));
    }
}

/*-------------------- carga arrays por días del calendario progresivo ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_ArrayH_Calendario(State) {
    try {
        $.ajax({
            url: "Calendario_ProgresivoAjax.aspx",
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
                    edit_ArrayH_Calendario = [];
                }
                else {
                    edit_ArrayH_Calendario = JSON.parse(result);
                    //ValidarLaborales();
                }
            },
            error: function () {

            },
            async: false, // La petición es síncrona
            cache: false // No queremos usar la caché del navegador
        });
    } catch (e) {
        Mensaje_General("Error - Transacción Ajax fallida", "Lo sentimos, ocurrió un error y no se logró completar la transacción ajax solicitada, favor verifique los datos.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario Progresivo):\n" + e));
    }
}