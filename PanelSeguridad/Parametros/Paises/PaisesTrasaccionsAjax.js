/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_CargaBusqueda(State) {
    $.ajax({
        url: "PaisesAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
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
        data: { "action": State,
            "tabla": 'PAISES'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayMoneda = [];
            }
            else {
                ArrayMoneda = JSON.parse(result);
                charge_CatalogList(ArrayMoneda, "Select_moneda", 1);
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
        data: { "action": State,
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

    if ($("#Select_moneda").val() == null) {
        moneda = 0;
    } else {
        moneda = $("#Select_moneda").val();
    }

    if ($("#Select_Calendario").val() == null) {
        calendario_id = 0;
    } else {
        calendario_id = $("#Select_Calendario").val();
    }
        

    $.ajax({
        url: "PaisesAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "ID": ID,
            "Pais": $("#Txt_Pais").val(),
            "Moneda": moneda,
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
        data: { "action": State,
            "ID": editID,
            "pais": $("#Txt_Pais").val(),
            "user": User
        },
        //Transaccion Ajax en proceso
        success: function (result) {

            switch (result) {

                case "Error":                   
                    Mensaje_General("Disculpenos :(", "Ocurrio un error al intentar eliminar este país.", "E");
                    break;

                case "Exito":                   
                    Mensaje_General("¡Registro Eliminado!", "El país se ha eliminado correctamente.", "S");
                    Clear();
                    break;
            }
        },
        error: function () {

        }
    });

}