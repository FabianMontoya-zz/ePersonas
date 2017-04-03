/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_CargaBusqueda(State) {
    OpenControl();
    $.ajax({
        url: "CiudadesAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'CIUDADES'
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
function transacionAjax_Pais(State) {
    $.ajax({
        url: "CiudadesAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'CIUDADES'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayPais = [];
            }
            else {
                ArrayPais = JSON.parse(result);
                charge_CatalogList(ArrayPais, "Select_Pais", 1);
            }
        },
        error: function () {

        }
    });
}


/*------------------------------ consulta ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Ciudades(State, filtro, opcion) {
    var contenido;

    if ($("#TxtRead").val() == "") {
        contenido = "ALL";
    }
    else {
        contenido = $("#TxtRead").val();
    }


    $.ajax({
        url: "CiudadesAjax.aspx",
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
                ArrayCiudades = [];
            }
            else {
                ArrayCiudades = JSON.parse(result);
                Table_Ciudades();
            }
        },
        error: function () {

        }
    });
}

/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Ciudades_create(State) {

    var Pais_ID;
    var ID;
    var param;


    if (State == "modificar") {
        Pais_ID = editPais_ID;
        ID = editID;
    } else {
        Pais_ID = $("#Select_Pais").val();
        ID = $("#Txt_ID").val();
    }

    $.ajax({
        url: "CiudadesAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "Pais_ID": Pais_ID,
            "ID": ID,
            "descripcion": $("#TxtDescription").val(),
            "user": User
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    Mensaje_General("Disculpenos :(", "No se realizó la modificación de la Ciudad.", "E");
                    break;

                case "Existe":
                    Mensaje_General("¡Ya Existe!", "El código ingresado ya existe en la base de datos.", "W");
                    break;

                case "Exito":
                    if (estado == "modificar") {
                        Mensaje_General("¡Exito!", "La ciudad  se ha modificado exitosamente!", "S");
                        Clear();
                    }
                    else {
                        Mensaje_General("¡Exito!", "La ciudad  se ha creada exitosamente!", "S");
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
function transacionAjax_Ciudades_delete(State) {

    $.ajax({
        url: "CiudadesAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "Pais_ID": editPais_ID,
            "ID": editID,
            "user": User
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    $("#dialog_eliminar").dialog("close");
                    Mensaje_General("Disculpenos :(", "No se elimino el Ciudades!", "E");
                    break;

                case "Exist_O":
                    $("#dialog_eliminar").dialog("close");
                    Mensaje_General("¡Integridad Referencial!", "No se elimino el Ciudades, para eliminarlo debe eliminar primero el registro en la tabla Personas", "W");
                    $(".container_TGrid").html("");
                    break;

                case "Exito":

                    $("#dialog_eliminar").dialog("close");
                    Mensaje_General("¡Registro Eliminado!", "La Ciudad fue eliminado correctamente! .", "S");
                    $(".container_TGrid").html("");
                    Clear();
                    break;
            }

        },
        error: function () {

        }
    });

}