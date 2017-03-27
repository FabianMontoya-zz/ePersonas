/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_CargaBusqueda(State) {
    $.ajax({
        url: "MonedaCodAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'MONEDA_COD'
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
function transacionAjax_MonedaCod(State, filtro, opcion) {
    var contenido;

    if ($("#TxtRead").val() == "") {
        contenido = "ALL";
    }
    else {
        contenido = $("#TxtRead").val();
    }


    $.ajax({
        url: "MonedaCodAjax.aspx",
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
                ArrayMonedaCod = [];
            }
            else {
                ArrayMonedaCod = JSON.parse(result);
                Table_MonedaCod();
            }
        },
        error: function () {

        }
    });
}

/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_MonedaCod_create(State) {

    var ID;
    var param;

    if (State == "modificar") {
        ID = editID;
    } else {
        ID = $("#Txt_ID").val();
    }

    $.ajax({
        url: "MonedaCodAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "ID": ID,
            "descripcion": $("#Txt_Descripcion").val(),
            "sigla": $("#Txt_Sigla").val(),
            "user": User.toUpperCase()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    Mensaje_General("Disculpenos :(", "No se realizó el ingreso de la moneda.", "E");
                    break;

                case "Existe":
                    Mensaje_General("¡Ya Existe!", "El código ingresado ya existe en la base de datos.", "W");
                    break;

                case "Exito":
                    if (estado == "modificar") {
                        Mensaje_General("¡Exito!", "La moneda se ha modificado correctamente.", "S");
                        Clear();
                    }
                    else {
                        Mensaje_General("¡Exito!", "La moneda se ha ingresado correctamente.", "S");
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
function transacionAjax_MonedaCod_delete(State) {

    $.ajax({
        url: "MonedaCodAjax.aspx",
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
                    Mensaje_General("Disculpenos :(", "Ocurrio un error al intentar eliminar esta moneda.", "E");

                    break;

                case "Exito":
                    $("#dialog_eliminar").dialog("close");
                    Mensaje_General("¡Registro Eliminado!", "La moneda se ha eliminado correctamente.", "S");
                    $(".container_TGrid").html("");

                    Clear();
                    break;
            }

        },
        error: function () {

        }
    });

}