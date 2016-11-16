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

    if (State == "modificar") {
        ID = editID;
    } else {
        ID = $("#Txt_Codigo").val();
    }

    $.ajax({
        url: "PaisesAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "ID": ID,
            "Pais": $("#Txt_Pais").val(),
            "Moneda": $("#Select_moneda").val(),
            "SWIFT": $("#TxtSWIFT").val(),
            "Est_LUN": $("#Select_StateLun").val(),
            "Est_MAR": $("#Select_StateMar").val(),
            "Est_MIE": $("#Select_StateMie").val(),
            "Est_JUE": $("#Select_StateJue").val(),
            "Est_VIE": $("#Select_StateVie").val(),
            "Est_SAB": $("#Select_StateSab").val(),
            "Est_DOM": $("#Select_StateDom").val(),
            "HoI1_LUN": $("#TxtIniLun1").val(),
            "HoF1_LUN": $("#TxtFinLun1").val(),
            "HoI2_LUN": $("#TxtIniLun2").val(),
            "HoF2_LUN": $("#TxtFinLun2").val(),
            "HoI3_LUN": $("#TxtIniLun3").val(),
            "HoF3_LUN": $("#TxtFinLun3").val(),
            "HoI4_LUN": $("#TxtIniLun4").val(),
            "HoF4_LUN": $("#TxtFinLun4").val(),
            "HoI1_MAR": $("#TxtIniMar1").val(),
            "HoF1_MAR": $("#TxtFinMar1").val(),
            "HoI2_MAR": $("#TxtIniMar2").val(),
            "HoF2_MAR": $("#TxtFinMar2").val(),
            "HoI3_MAR": $("#TxtIniMar3").val(),
            "HoF3_MAR": $("#TxtFinMar3").val(),
            "HoI4_MAR": $("#TxtIniMar4").val(),
            "HoF4_MAR": $("#TxtFinMar4").val(),
            "HoI1_MIE": $("#TxtIniMie1").val(),
            "HoF1_MIE": $("#TxtFinMie1").val(),
            "HoI2_MIE": $("#TxtIniMie2").val(),
            "HoF2_MIE": $("#TxtFinMie2").val(),
            "HoI3_MIE": $("#TxtIniMie3").val(),
            "HoF3_MIE": $("#TxtFinMie3").val(),
            "HoI4_MIE": $("#TxtIniMie4").val(),
            "HoF4_MIE": $("#TxtFinMie4").val(),
            "HoI1_JUE": $("#TxtIniJue1").val(),
            "HoF1_JUE": $("#TxtFinJue1").val(),
            "HoI2_JUE": $("#TxtIniJue2").val(),
            "HoF2_JUE": $("#TxtFinJue2").val(),
            "HoI3_JUE": $("#TxtIniJue3").val(),
            "HoF3_JUE": $("#TxtFinJue3").val(),
            "HoI4_JUE": $("#TxtIniJue4").val(),
            "HoF4_JUE": $("#TxtFinJue4").val(),
            "HoI1_VIE": $("#TxtIniVie1").val(),
            "HoF1_VIE": $("#TxtFinVie1").val(),
            "HoI2_VIE": $("#TxtIniVie2").val(),
            "HoF2_VIE": $("#TxtFinVie2").val(),
            "HoI3_VIE": $("#TxtIniVie3").val(),
            "HoF3_VIE": $("#TxtFinVie3").val(),
            "HoI4_VIE": $("#TxtIniVie4").val(),
            "HoF4_VIE": $("#TxtFinVie4").val(),
            "HoI1_SAB": $("#TxtIniSab1").val(),
            "HoF1_SAB": $("#TxtFinSab1").val(),
            "HoI2_SAB": $("#TxtIniSab2").val(),
            "HoF2_SAB": $("#TxtFinSab2").val(),
            "HoI3_SAB": $("#TxtIniSab3").val(),
            "HoF3_SAB": $("#TxtFinSab3").val(),
            "HoI4_SAB": $("#TxtIniSab4").val(),
            "HoF4_SAB": $("#TxtFinSab4").val(),
            "HoI1_DOM": $("#TxtIniDom1").val(),
            "HoF1_DOM": $("#TxtFinDom1").val(),
            "HoI2_DOM": $("#TxtIniDom2").val(),
            "HoF2_DOM": $("#TxtFinDom2").val(),
            "HoI3_DOM": $("#TxtIniDom3").val(),
            "HoF3_DOM": $("#TxtFinDom3").val(),
            "HoI4_DOM": $("#TxtIniDom4").val(),
            "HoF4_DOM": $("#TxtFinDom4").val(),
            "user": User
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    $("#dialog").dialog("option", "title", "Disculpenos :(");
                    $("#Mensaje_alert").text("No se realizo El ingreso del Paises!");
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
                    if (estado == "modificar") {
                        $("#dialog").dialog("option", "title", "Exito");
                        $("#Mensaje_alert").text("El Paises fue modificado exitosamente! ");
                        $("#dialog").dialog("open");
                        $("#DE").css("display", "none");
                        $("#SE").css("display", "block");
                        $("#WE").css("display", "none");
                        Clear();
                    }
                    else {
                        $("#dialog").dialog("option", "title", "Exito");
                        $("#Mensaje_alert").text("El Paises fue creado exitosamente! ");
                        $("#dialog").dialog("open");
                        $("#DE").css("display", "none");
                        $("#SE").css("display", "block");
                        $("#WE").css("display", "none");
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
                    $("#dialog").dialog("option", "title", "Disculpenos :(");
                    $("#Mensaje_alert").text("No se elimino el Paises!");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "block");
                    $("#SE").css("display", "none");
                    $("#WE").css("display", "none");
                    $("#dialog_eliminar").dialog("close");
                    break;

                case "Exist_M":
                    $("#dialog").dialog("option", "title", "Integridad referencial");
                    $("#Mensaje_alert").text("No se elimino el Paises, para eliminarlo debe eliminar primero el registro en la tabla Maquina");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "none");
                    $("#SE").css("display", "none");
                    $("#WE").css("display", "block");
                    $("#dialog_eliminar").dialog("close");
                    break;

                case "Exist_O":
                    $("#dialog").dialog("option", "title", "Integridad referencial");
                    $("#Mensaje_alert").text("No se elimino el Paises, para eliminarlo debe eliminar primero el registro en la tabla Empleado");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "none");
                    $("#SE").css("display", "none");
                    $("#WE").css("display", "block");
                    $("#dialog_eliminar").dialog("close");
                    break;

                case "Exist_All":
                    $("#dialog").dialog("option", "title", "Integridad referencial");
                    $("#Mensaje_alert").text("No se elimino el Paises, para eliminarlo debe eliminar primero el registro en la tabla Empleado y en la tabla Maquina");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "none");
                    $("#SE").css("display", "none");
                    $("#WE").css("display", "block");
                    $("#dialog_eliminar").dialog("close");
                    break;

                case "Exito":
                    $("#dialog_eliminar").dialog("close");
                    $("#dialog").dialog("option", "title", "Exito");
                    $("#Mensaje_alert").text("El Paises fue eliminado exitosamente! ");
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