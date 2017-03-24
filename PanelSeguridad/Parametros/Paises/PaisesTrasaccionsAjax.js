/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_CargaBusqueda(State) {
    OpenControl();
    $.ajax({
        url: "PaisesAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'PAISES'
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
function transacionAjax_Moneda(State) {
    $.ajax({
        url: "PaisesAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": "Moneda"
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Moneda = [];
            }
            else {
                Matrix_Moneda = JSON.parse(result);
                CargaMonedas(Matrix_Moneda, "Select_moneda", "");
            }
        },
        error: function () {

        }
    });
}

//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Calendario(State) {
    $.ajax({
        url: "PaisesAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'CALENDARIOS'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Calendarios = [];
            }
            else {
                Matrix_Calendarios = JSON.parse(result);
                CargaCalendarios(Matrix_Calendarios, "Select_Calendario", "");
            }
        },
        error: function () {

        }
    });
}

/*------------------------------ consulta ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Paises(State, filtro, opcion) {
    var contenido;

    if ($("#TxtRead").val() == "") {
        contenido = "ALL";
    }
    else {
        contenido = $("#TxtRead").val();
    }


    $.ajax({
        url: "PaisesAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "filtro": filtro,
            "opcion": opcion,
            "contenido": contenido
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayPaises = [];
            }
            else {
                ArrayPaises = JSON.parse(result);
                Table_Paises();
            }
        },
        error: function () {

        }
    });
}

/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Paises_create(State) {

    var ID;
    var param;
    var moneda;
    var calendario_id;

    if (State == "modificar") {
        ID = editID;
    } else {
        ID = $("#Txt_Codigo").val();
    }


    for (item in Matrix_Calendarios) {
        if (Matrix_Calendarios[item].Index == $("#Select_Calendario").val()) {
            calendario_id = Matrix_Calendarios[item].Calendario_ID;
            break;
        }
    }


    $.ajax({
        url: "PaisesAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "ID": ID,
            "Pais": $("#Txt_Pais").val(),
            "Moneda": $("#Select_moneda").val(),
            "SWIFT": $("#TxtSWIFT").val(),
            "Calendario_ID": calendario_id,
            "user": User
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    if (estado == "modificar") {
                        Mensaje_General("Disculpenos :(", "No se realizó la modificación del País.", "E");
                    } else {
                        Mensaje_General("Disculpenos :(", "No se realizó el ingreso del País.", "E");
                    }
                    break;

                case "Existe":
                    Mensaje_General("¡Código Duplicado!", "El código ingresado ya existe en la base de datos.", "W");
                    break;

                case "Exito":
                    if (estado == "modificar") {
                        Mensaje_General("¡País Modificado!", "El país se ha modificado correctamente.", "S");
                        Clear();
                    }
                    else {
                        Mensaje_General("¡País Registrado!", "Se ha ingresado el nuevo país correctamente.", "S");
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
function transacionAjax_Paises_delete(State) {
    $.ajax({
        url: "PaisesAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "ID": editID,
            "pais": $("#Txt_Pais").val(),
            "user": User
        },
        //Transaccion Ajax en proceso
        success: function (result) {

            switch (result) {

                case "Error":
                    $("#dialog_eliminar").dialog("close");
                    Mensaje_General("Disculpenos :(", "Ocurrio un error al intentar eliminar este país.", "E");
                    break;

                case "Exito":
                    $("#dialog_eliminar").dialog("close");
                    Mensaje_General("¡Registro Eliminado!", "El país  se ha eliminado correctamente.", "S");
                    $(".container_TGrid").html("");
                    Clear();
                    break;
            }
        },
        error: function () {

        }
    });

}