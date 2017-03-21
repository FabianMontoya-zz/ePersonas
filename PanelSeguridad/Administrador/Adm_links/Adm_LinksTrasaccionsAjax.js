/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_CargaBusqueda(State) {
    $.ajax({
        url: "Adm_LinksAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'LINKS'
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
function transacionAjax_link(State, filtro, opcion) {
    var contenido;

    if ($("#TxtRead").val() == "") {
        contenido = "ALL";
    }
    else {
        contenido = $("#TxtRead").val();
    }


    $.ajax({
        url: "Adm_LinksAjax.aspx",
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
                ArrayLinks = [];
            }
            else {
                ArrayLinks = JSON.parse(result);
                Table_links();
            }
        },
        error: function () {

        }
    });
}

/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_link_create(State) {

    var ID;

    if (State == "modificar") {
        ID = editID;
    } else {
        ID = $("#Txt_ID").val();
    }

    $.ajax({
        url: "Adm_LinksAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "ID": ID,
            "descripcion": $("#TxtDescription").val(),
            "param1": $("#TxtParam1").val(),
            "paran2": $("#TxtParam2").val(),
            "link": $("#TxtRuta").val()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    Mensaje_General("Disculpenos :(", "No se realizo El ingreso del link! ", "E");
                    break;

                case "Existe":
                    Mensaje_General("Ya Existe", "El codigo ingresado ya existe en la base de datos!  ", "W");
                    break;

                case "Exito":
                    if (estado == "modificar") {
                        Mensaje_General("Exito", "El link fue modificado exitosamente!  ", "S");
                        Clear();
                    }
                    else {
                        Mensaje_General("Exito", "El link fue creado exitosamente!  ", "S");
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
function transacionAjax_link_delete(State) {

    $.ajax({
        url: "Adm_LinksAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "ID": editID
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "Error") {
                $("#dialog_eliminar").dialog("close");
                Mensaje_General("Disculpenos :(", "No se realizo la eliminación del link!", "E");
            }
            else {
                $("#dialog_eliminar").dialog("close");
                Mensaje_General("Exito", "El link fue eliminado exitosamente!", "S");
                Clear();
            }
        },
        error: function () {

        }
    });

}