/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_CargaBusqueda(State) {
    $.ajax({
        url: "FestivosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'Festivos'
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
function transacionAjax_Festivo(State, filtro, opcion) {
    var contenido;

    if ($("#TxtRead").val() == "") {
        contenido = "ALL";
    }
    else {
        contenido = $("#TxtRead").val();
    }


    $.ajax({
        url: "FestivosAjax.aspx",
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
                ArrayFestivo = [];
            }
            else {
                ArrayFestivo = JSON.parse(result);
                Table_Festivo();
            }
        },
        error: function () {

        }
    });
}

/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Festivo_create(State) {

    var ID;
    var param;

    if (State == "modificar") {
        ID = editID;
    } else {
        ID = $("#Txt_Año").val();
    }

    $.ajax({
        url: "FestivosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "ID": ID,
            "mes_dia": $("#Txt_mes_Dia").val(),
            "user": User
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    Mensaje_General("Disculpenos :(", "No se realizó el ingreso del festivo.", "E");
                    break;

                case "Existe":
                    Mensaje_General("¡Ya Existe!", "El código ingresado ya existe en la base de datos.", "W");
                    break;

                case "Exito":
                    if (estado == "modificar") {
                        Mensaje_General("¡Exito!", "El festivo se ha modificado correctamente.", "S");
                        Clear();
                    }
                    else {
                        Mensaje_General("¡Exito!", "Se ha ingresado el nuevo festivos correctamente.", "S");
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
function transacionAjax_Festivo_delete(State) {
    $.ajax({
        url: "FestivosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "ID": editID,
            "mes_dia": editDia,
            "user": User
        },
        //Transaccion Ajax en proceso
        success: function (result) {

            switch (result) {

                case "Error":
                    $("#dialog_eliminar").dialog("close");
                    Mensaje_General("Disculpenos :(", "Ocurrio un error al intentar eliminar el Festivo.", "E");
                    break;


                case "Exito":
                    $("#dialog_eliminar").dialog("close");
                    Mensaje_General("¡Registro Eliminado!", "El Festivo fue eliminado exitosamente!", "S");
                    $(".container_TGrid").html("");
                    Clear();
                    break;
            }
        },
        error: function () {

        }
    });

}