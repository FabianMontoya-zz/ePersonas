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
            }
        },
        error: function () {

        },
    }).done(function () {
        Charge_Combos_Depend_Nit(Matrix_Calendarios, "Select_Calendario", "", "");

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
      
    if (State == "modificar") {
        ID = editID;
    } else {
        ID = $("#Txt_Codigo").val();
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
            "Calendario_ID": $("#Select_Calendario").val(),
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
                    Mensaje_General("¡Ya Existe!", "El código ingresado ya existe en la base de datos.", "W");
                    break;

                case "Exito":
                    if (estado == "modificar") {
                        Mensaje_General("¡Exito!", "El país se ha modificado correctamente.", "S");
                        Clear();
                    }
                    else {
                        Mensaje_General("¡Exito!", "El país se ha creado correctamente.", "S");
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