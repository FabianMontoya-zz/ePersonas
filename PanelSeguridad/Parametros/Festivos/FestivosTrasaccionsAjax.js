/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_CargaBusqueda(State) {
    $.ajax({
        url: "FestivosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'Festivos'
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
    try {
        $.ajax({
            url: "FestivosAjax.aspx",
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
        setTimeout(console.error.bind(console, "• Log de error generado (Festivos):\n" + e));
    }
}

//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_ChargeCalendarios(State, NIT) {
    try {
        $.ajax({
            url: "FestivosAjax.aspx",
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
        setTimeout(console.error.bind(console, "• Log de error generado (Festivos):\n" + e));
    }
}

/*------------------------------ consulta ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Festivo(State, filtro, opcion) {
    var contenido;

    if (filtro == "N") {
        contenido = "ALL";
    }
    else {
        contenido = $("#TxtRead").val();
    }


    $.ajax({
        url: "FestivosAjax.aspx",
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
                ArrayFestivo = [];
            }
            else {
                ArrayFestivo = JSON.parse(result);
                Table_Festivo();
            }
        },
        error: function () {

        }
    });
}

/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Festivo_create(State) {

    var Nit_ID = $("#Select_EmpresaNit").val();
    var Calendario_ID = "";
    var Year = "";
    var MesDia = "";
    var Fecha = $("#Txt_Año").val().split("-");
    
    Year = Fecha[0];
    MesDia = Fecha[1] + "" + Fecha[2];

    for (var i in Matrix_Calendarios) {
        if (Matrix_Calendarios[i].Index == $("#Select_Calendario_CP").val()) {
            Calendario_ID = Matrix_Calendarios[i].Calendario_ID;
            break;
        }
    }
    
    $.ajax({
        url: "FestivosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "Nit_ID": Nit_ID,
            "Calendario_ID": Calendario_ID,
            "Year": Year,
            "mes_dia": MesDia,
            "user": User
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    Mensaje_General("Disculpenos :(", "No se realizó el ingreso del festivo.", "E");
                    break;

                case "Existe":
                    Mensaje_General("¡Ya Existe!", "El código ingresado ya existe en la base de datos.", "W");
                    break;

                case "Exito":
                    if (estado == "modificar") {
                        Mensaje_General("¡Exito!", "El festivo se ha modificado correctamente.", "S");
                        Clear();
                    }
                    else {
                        Mensaje_General("¡Exito!", "Se ha ingresado el nuevo festivos correctamente.", "S");
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
function transacionAjax_Festivo_delete(State) {
    $.ajax({
        url: "FestivosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "Nit_ID": editNit_ID,
            "Calendario_ID": editCalendario_ID,
            "Year": editYear,
            "Mes_Dia": editMesDia,
            "user": User
        },
        //Transaccion Ajax en proceso
        success: function (result) {

            switch (result) {

                case "Error":
                    $("#dialog_eliminar").dialog("close");
                    Mensaje_General("Disculpenos :(", "Ocurrio un error al intentar eliminar el Festivo.", "E");
                    break;


                case "Exito":
                    $("#dialog_eliminar").dialog("close");
                    Mensaje_General("¡Registro Eliminado!", "El Festivo fue eliminado exitosamente!", "S");
                    $(".container_TGrid").html("");
                    Clear();
                    break;
            }
        },
        error: function () {

        }
    });

}