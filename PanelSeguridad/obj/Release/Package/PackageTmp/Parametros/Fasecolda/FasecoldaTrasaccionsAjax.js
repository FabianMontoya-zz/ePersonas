/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_CargaBusqueda(State) {
    $.ajax({
        url: "FasecoldaAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "tabla": 'Fasecolda'
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
function transacionAjax_Fasecolda(State, filtro, opcion) {
    var contenido;

    if ($("#TxtRead").val() == "") {
        contenido = "ALL";
    }
    else {
        contenido = $("#TxtRead").val();
    }


    $.ajax({
        url: "FasecoldaAjax.aspx",
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
                ArrayFasecolda = [];
            }
            else {
                ArrayFasecolda = JSON.parse(result);
                Table_Fasecolda();
            }
        },
        error: function () {

        }
    });
}

/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Fasecolda_create(State) {

    var E_ID;

    if (State == "modificar") {
        E_ID = Edit_ID;
    }
    else {
        E_ID = $("#Txt_ID").val();
    }

    $.ajax({
        url: "FasecoldaAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "ID": E_ID,
            "Clase": $("#TxtDescripcion").val(),
            "Marca": $("#TxtMarca").val(),
            "Linea": $("#TxtLinea").val(),
            "Cilindraje": $("#TxtCilindraje").val(),
            "Year_1": F_NumericBD($("#TxtYear_1").val()),
            "Year_2": F_NumericBD($("#TxtYear_2").val()),
            "Year_3": F_NumericBD($("#TxtYear_3").val()),
            "Year_4": F_NumericBD($("#TxtYear_4").val()),
            "Year_5": F_NumericBD($("#TxtYear_5").val()),
            "Year_6": F_NumericBD($("#TxtYear_6").val()),
            "Year_7": F_NumericBD($("#TxtYear_7").val()),
            "Year_8": F_NumericBD($("#TxtYear_8").val()),
            "Year_9": F_NumericBD($("#TxtYear_9").val()),
            "Year_10": F_NumericBD($("#TxtYear_10").val()),
            "Year_11": F_NumericBD($("#TxtYear_11").val()),
            "Year_12": F_NumericBD($("#TxtYear_12").val()),
            "Year_13": F_NumericBD($("#TxtYear_13").val()),
            "Year_14": F_NumericBD($("#TxtYear_14").val()),
            "Year_15": F_NumericBD($("#TxtYear_15").val()),
            "Year_16": F_NumericBD($("#TxtYear_16").val()),
            "Year_17": F_NumericBD($("#TxtYear_17").val()),
            "Year_18": F_NumericBD($("#TxtYear_18").val()),
            "Year_19": F_NumericBD($("#TxtYear_19").val()),
            "Year_20": F_NumericBD($("#TxtYear_20").val()),
            "Year_21": F_NumericBD($("#TxtYear_21").val()),
            "Year_22": F_NumericBD($("#TxtYear_22").val()),
            "Year_23": F_NumericBD($("#TxtYear_23").val()),
            "Year_24": F_NumericBD($("#TxtYear_24").val()),
            "Year_25": F_NumericBD($("#TxtYear_25").val()),
            "Estado":  $("#Select_Estado").val(),
            "user": User
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    $("#dialog").dialog("option", "title", "Disculpenos :(");
                    $("#Mensaje_alert").text("No se realizo el ingreso del Fasecolda!");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "block");
                    $("#SE").css("display", "none");
                    $("#WE").css("display", "none");
                    break;

                case "Existe":
                    $("#dialog").dialog("option", "title", "Ya Existe");
                    $("#Mensaje_alert").text("El codigo ingresado ya existe en la base de datos!");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "None");
                    $("#SE").css("display", "none");
                    $("#WE").css("display", "block");
                    break;

                case "Exito":
                    $("#dialog").dialog("option", "title", "Exito");
                    $("#Mensaje_alert").text("El Fasecolda fue creado exitosamente! ");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "none");
                    $("#SE").css("display", "block");
                    $("#WE").css("display", "none");
                    Clear();
                    break;
            }

        },
        error: function () {

        }
    });
}

/*------------------------------ eliminar ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Fasecolda_delete(State) {

    $.ajax({
        url: "FasecoldaAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "ID": Edit_ID,
            "user": User
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    $("#dialog").dialog("option", "title", "Disculpenos :(");
                    $("#Mensaje_alert").text("No se elimino el Fasecolda!");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "block");
                    $("#SE").css("display", "none");
                    $("#WE").css("display", "none");
                    $("#dialog_eliminar").dialog("close");
                    break;

                case "Exist_O":
                    $("#dialog").dialog("option", "title", "Integridad referencial");
                    $("#Mensaje_alert").text("No se elimino el Fasecolda, para eliminarlo debe eliminar primero el registro en la tabla Empleado");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "none");
                    $("#SE").css("display", "none");
                    $("#WE").css("display", "block");
                    $("#dialog_eliminar").dialog("close");
                    break;

                case "Exito":
                    $("#dialog_eliminar").dialog("close");
                    $("#dialog").dialog("option", "title", "Exito");
                    $("#Mensaje_alert").text("El Fasecolda fue eliminado exitosamente! ");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "none");
                    $("#SE").css("display", "block");
                    $("#WE").css("display", "none");
                    $("#dialog_eliminar").dialog("close");
                    Clear();
                    break;
            }

        },
        error: function () {

        }
    });

}