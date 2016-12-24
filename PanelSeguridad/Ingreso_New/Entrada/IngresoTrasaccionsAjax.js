/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                          MATRICES DE CARGA                                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                          LISTAS DE CARGA                                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Documento(State) {
    $.ajax({
        url: "IngresoAjax.aspx",
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
        url: "IngresoAjax.aspx",
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
                        if (Tarjeta_Proccess==1)
                            transacionAjax_Search_Foto("Buscar_Foto", Array_People[0].TypeDocument_ID, Array_People[0].Document_ID);
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
        url: "IngresoAjax.aspx",
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
                Valida_Access_Minimo();
            }
        },
        error: function () {

        }
    });
}
