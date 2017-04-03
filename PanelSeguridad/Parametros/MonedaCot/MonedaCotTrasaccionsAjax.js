/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_CargaBusqueda(State) {
    $.ajax({
        url: "MonedaCotAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'MONEDA_COTIZA'
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
        url: "MonedaCotAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "Index": "Index",
            "tabla": 'MONEDA_COTIZA'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayMoneda = [];
            }
            else {
                ArrayMoneda = JSON.parse(result);
                charge_CatalogList(ArrayMoneda, "Select_Moneda", 1);
            }
        },
        error: function () {

        }
    });
}

/*------------------------------ consulta ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_MonedaCot(State, filtro, opcion) {
    var contenido;

    if ($("#TxtRead").val() == "") {
        contenido = "ALL";
    }
    else {
        contenido = $("#TxtRead").val();
    }


    $.ajax({
        url: "MonedaCotAjax.aspx",
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
                ArrayMonedaCot = [];
            }
            else {
                ArrayMonedaCot = JSON.parse(result);
                Table_MonedaCot();
            }
        },
        error: function () {

        }
    });
}

/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_MonedaCot_create(State) {

    var ID;
    var param;

    if (State == "modificar") {
        ID = editID;
    } else {
        ID = $("#Select_Moneda").val();
    }

    $.ajax({
        url: "MonedaCotAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "ID": ID,
            "Fecha": $("#Txt_Fecha").val(),
            "Valor": Convert_Decimal($("#Txt_Valor").val()),
            "user": User.toUpperCase()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    Mensaje_General("Disculpenos :(", "No se realizó el ingreso de la cotización de la moneda.", "E");
                    break;

                case "Existe":
                    Mensaje_General("¡Ya Existe!", "El código ingresado ya existe en la base de datos.", "W");
                    break;

                case "Exito":
                    if (estado == "modificar") {
                        Mensaje_General("¡Exito!", "La cotización de la moneda se ha modificado correctamente.", "S");
                        Clear();
                    }
                    else {
                        Mensaje_General("¡Exito!", "La cotización de la moneda se ha creado correctamente.", "S");
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
function transacionAjax_MonedaCot_delete(State) {

    $.ajax({
        url: "MonedaCotAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "ID": editID,
            "user": User.toUpperCase()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    $("#dialog_eliminar").dialog("close");
                    Mensaje_General("Disculpenos :(", "Ocurrio un error al intentar eliminar la cotizacion de la moneda.", "E");
                    break;

                case "Exito":
                    $("#dialog_eliminar").dialog("close");
                    Mensaje_General("¡Registro Eliminado!", "La cotización de esta moneda se ha eliminado correctamente.", "S");
                    $(".container_TGrid").html("");
                    Clear();
                    break;
            }

        },
        error: function () {

        }
    });

}