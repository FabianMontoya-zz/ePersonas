/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_CargaBusqueda(vp_State) {
    OpenControl(); 
    $.ajax({
        url: "CicloAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": vp_State,
            "tabla": 'CICLO'
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

/*------------------------------ consulta ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Ciclo(vp_State, filtro, opcion) {
    var contenido;

    if ($("#TxtRead").val() == "") {
        contenido = "ALL";
    }
    else {
        contenido = $("#TxtRead").val();
    }

    $.ajax({
        url: "CicloAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": vp_State,
            "filtro": filtro,
            "opcion": opcion,
            "contenido": contenido
        },
        //mostrar resultados de la creacion del Ciclo
        success: function (result) {
            if (result == "") {
                ArrayCiclo = [];
            }
            else {
                ArrayCiclo = JSON.parse(result);
                Table_Ciclo();
            }
        },
        error: function () {

        }
    });
}

/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Ciclo_create(vp_State) {

    var vl_ID;
    var vl_Descrip;

    if (vp_State == "modificar") {
        vl_ID = editID;
    } else {
        vl_ID = $("#Txt_ID").val();
    }

    $.ajax({
        url: "CicloAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": vp_State,
            "ID": vl_ID,
            "descripcion": $("#TxtDescription").val(),
            "sigla": $("#TxtSigla").val(),
            "user": User.toUpperCase(),
            "fechaCorte": $("#TxtFechaCorte").val(),
            "fechaPago": $("#TextFechaPago").val()
        },
        //mostrar resultados de la creacion del Ciclo
        success: function (result) {
            switch (result) {

                case "Error":
                    Mensaje_General("Disculpenos :(", "Ocurrió un error y no se realizó el Ingreso del Nuevo Ciclo.", "W");
                    break;

                case "Existe":
                    Mensaje_General("Ciclo Existente", "El Ciclo que desea ingresar ya existe en el sistema, favor revisar.", "E");
                    $("#ImgNIT").css("display", "inline-table");
                    $("#ImgID").css("display", "inline-table");
                    break;

                case "Exito":
                    if (estado == "modificar") {
                        Mensaje_General("¡Exito!", "El Ciclo " + vl_ID + " se ha modificado exitosamente.", "S");
                        HabilitarPanel('modificar');
                    }
                    else {
                        Mensaje_General("¡Exito!", "El Ciclo " + vl_ID + " se ha registrado exitosamente en el sistema.", "S");
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
function transacionAjax_Ciclo_delete(vp_State) {
    vl_ID = editID;

    $.ajax({
        url: "CicloAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": vp_State,
            "ID": vl_ID,
            "user": User.toUpperCase()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "Error") {
                Mensaje_General("Disculpenos :(", "Ocurrió un error y no se actualizó el estado de la Ciclo.", "W");
            }
            else {
                Mensaje_General("¡Exito!", "El Estado de la Ciclo " + vl_ID + " se ha actualizado correctamente.", "S");
                HabilitarPanel('eliminar');
            }
        },
        error: function () {

        }
    });

}

