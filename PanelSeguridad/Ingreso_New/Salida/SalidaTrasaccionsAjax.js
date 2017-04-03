/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                          LISTAS DE CARGA                                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Documento(State) {
    $.ajax({
        url: "SalidaAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'IMPUESTO_GASTO'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayTdoc = [];
            }
            else {
                ArrayTdoc = JSON.parse(result);
                charge_CatalogList(ArrayTdoc, "Select_Documento", 1);
            }
        },
        error: function () {

        }
    });
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                          CONSULTAS EN PROCESO                                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_ShearchPeopleAccess(State, TD, D, NIT, Tarjeta_ID) {

    if (Tarjeta_ID != "") {
        TD = 0;
        D = 0;
    }
    else {
        Tarjeta_ID = 0;
    }

    $.ajax({
        url: "SalidaAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "TD": TD,
            "D": D,
            "NIT": NIT,
            "Tarjeta_ID": Tarjeta_ID
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Array_People = [];
            }
            else {
                Array_People = JSON.parse(result);
                switch (Array_People.length) {
                    case 0:
                        Mensaje_General("No existe", "Los datos diligenciados No coinciden con las personas registradas en el sitema", "W");
                        break;

                    case 1:

                        if (Tarjeta_Proccess == 1) {
                            transacionAjax_Search_Foto("Buscar_Foto", Array_People[0].TypeDocument_ID, Array_People[0].Document_ID);
                        }
                        else
                            transacionAjax_Search_Foto("Buscar_Foto", TD, D);
                        break;

                    default:
                        Mensaje_General("existe en varias Empresas", "La persona a ingresar esta registrada en varias empresas ", "W");
                        break;
                }
            }

        },
        error: function () {

        }
    });
}

//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Search_Foto(State, TD, D) {
    $.ajax({
        url: "SalidaAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "TD": TD,
            "D": D
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            Datos_principales();
            if (result == "") {
                Array_Foto = [];
            }
            else {
                Array_Foto = JSON.parse(result);
                SearchFoto();
                transacionAjax_Consult_Ingress("Revisa_Ingreso", Array_People[0].TypeDocument_ID, Array_People[0].Document_ID, Array_People[0].Nit_ID);

            }
        },
        error: function () {

        }
    });
}

//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Consult_Ingress(State, TD, D, NIT) {
    $.ajax({
        url: "SalidaAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "TD": TD,
            "D": D,
            "NIT": NIT
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            En_Planta = result;
            if (En_Planta != 0)
                Mensaje_General("Esta en planta", "La persona se encuentra registrada en el ingreso", "W");
            else
                Valida_Access_Minimo();
        },
        error: function () {

        }
    });
}

//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Consult_Registros_Ingreso(State, TD, D, NIT) {
    $.ajax({
        url: "SalidaAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "TD": TD,
            "D": D,
            "NIT": NIT
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Array_SalidaLog = [];
            }
            else {
                Array_SalidaLog = JSON.parse(result);
            }
        },
        error: function () {

        }
    }).done(function () {
        Tabla_Salida();
    });
}



/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                         SALIDA DE LA PERSONA                                                                                                             ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_LogAcceso_Update(State) {

    $.ajax({
        url: "SalidaAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "Nit": Nit_ID_Proccess,
            "TDoc": $("#Select_Documento").val(),
            "Doc": $("#TxtDoc").val(),
             "user": User.toUpperCase()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    Mensaje_General("Disculpenos :(", "falla en el registro ,no puede registrar la Salida", "E");
                    break;

                case "Exito":
                    Mensaje_General("Exito", "se ha registrado la salida", "S");
                    Clear();
                    break;
            }
        },
        error: function () {
        }
    });
}

