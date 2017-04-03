/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_CargaBusqueda(State) {
     $.ajax({
        url: "Impuesto_GastoAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "tabla": 'Impuesto_Gasto'
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
function transacionAjax_Impuesto_Gasto(State, filtro, opcion) {
    var contenido;

    if ($("#TxtRead").val() == "") {
        contenido = "ALL";
    }
    else {
        contenido = $("#TxtRead").val();
    }


    $.ajax({
        url: "Impuesto_GastoAjax.aspx",
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
                ArrayImpuesto_Gasto = [];
            }
            else {
                ArrayImpuesto_Gasto = JSON.parse(result);
                Table_Impuesto_Gasto();
            }
        },
        error: function () {

        }
    });
}

/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Impuesto_Gasto_create(State) {

    var ID;
    var param;

    if (State == "modificar") {
        ID = editID;
    } else {
        ID = $("#Txt_ID").val();
    }

    $.ajax({
        url: "Impuesto_GastoAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "ID": ID,
            "descripcion": $("#TxtDescription").val(),
            "user": User
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    Mensaje_General("Disculpenos :(", "No se realizó el ingreso del impuesto.", "E");
                    break;

                case "Existe":
                    Mensaje_General("¡Ya Existe!", "El código ingresado ya existe en la base de datos.", "W");
                    break;

                case "Exito":
                    if (estado == "modificar") {
                        Mensaje_General("¡Exito!", "El impuesto se ha modificado correctamente.", "S");
                        Clear();
                    }
                    else {
                        Mensaje_General("¡Exito!", "El impuesto se ha creado correctamente.", "S");
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
function transacionAjax_Impuesto_Gasto_delete(State) {

    $.ajax({
        url: "Impuesto_GastoAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "ID": editID,
            "user": User
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    $("#dialog_eliminar").dialog("close");
                    Mensaje_General("Disculpenos :(", "Ocurrio un error al intentar eliminar este impuesto.", "E");
                    break;

              
                case "Exito":
                    $("#dialog_eliminar").dialog("close");
                    Mensaje_General("¡Registro Eliminado!", "El impuesto se ha eliminado correctamente.", "S");
                    $(".container_TGrid").html("");
                    Clear();
                    break;
            }

        },
        error: function () {

        }
    });

}