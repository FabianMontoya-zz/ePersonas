/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_CargaBusqueda(State) {
    $.ajax({
        url: "ConsecutivosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'CONSECUTIVOS'
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
function transacionAjax_EmpresaNit(State) {
    $.ajax({
        url: "ConsecutivosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'CLIENTE'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayEmpresaNit = [];
            }
            else {
                ArrayEmpresaNit = JSON.parse(result);
                charge_CatalogList(ArrayEmpresaNit, "Select_EmpresaNit", "Generico");
            }
        },
        error: function () {

        },
        //Jhon
        async: false, // La petición es síncrona
        cache: false // No queremos usar la caché del navegador
    });
}

/*------------------------------ consulta ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Consecutivos(State, filtro, opcion) {
    var contenido;

    if ($("#TxtRead").val() == "") {
        contenido = "ALL";
    }
    else {
        contenido = $("#TxtRead").val();
    }

    $.ajax({
        url: "ConsecutivosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "filtro": filtro,
            "opcion": opcion,
            "contenido": contenido,
            "Nit_User": g_NitEmpresa_User
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayConsecutivos = [];
            }
            else {
                ArrayConsecutivos = JSON.parse(result);
                Table_Consecutivos();
            }
        },
        error: function () {

        }
    });
}

/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Consecutivos_create(State) {

    var ID;
    var Nit_ID;
    var Consecutivos = 0;
    var Politica = 0;


    if (State == "modificar") {
        Nit_ID = editNit_ID;
        ID = editID;
    }
    else {
        Nit_ID = $("#Select_EmpresaNit").val();
        ID = $("#Txt_ID").val();
    }

    $.ajax({
        url: "ConsecutivosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "Nit_ID": Nit_ID,
            "ID": ID,
            "descripcion": $("#TxtDescription").val(),
            "Consecutivo": $("#TxtConsecutivo").val(),
            "user": User.toUpperCase()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    Mensaje_General("Disculpenos :(", "No se realizó el ingreso del Consecutivo!", "E");
                    break;

                case "Existe":
                    Mensaje_General("¡Ya Existe!", "El código ingresado ya existe en la base de datos.", "W");
                    break;

                case "Exito":
                    if (estado == "modificar") {
                        Mensaje_General("¡Exito!", "El consecutivo se ha modificado correctamente.", "S");
                        Clear();
                    }
                    else {
                        Mensaje_General("¡Exito!", "El consecutivo se ha creado correctamente.", "S");
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
function transacionAjax_Consecutivos_delete(State) {

    $.ajax({
        url: "ConsecutivosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "Nit_ID": editNit_ID,
            "ID": editID,
            "user": User
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    $("#dialog_eliminar").dialog("close");
                    Mensaje_General("Disculpenos :(", "Ocurrio un error al intentar eliminar este consecutivo.", "E");
                    break;


                case "Exito":
                    $("#dialog_eliminar").dialog("close");
                    Mensaje_General("¡Registro Eliminado!", "El consecutivo  se ha eliminado correctamente.", "S");
                    $(".container_TGrid").html("");
                    Clear();
                    break;
            }

        },
        error: function () {

        }
    });
}

/*--------------------------------------------------------------------------------------------------------------------------------------------*/
/*                                                       CONSECUTIVO GENERALES                                                                   */
/*--------------------------------------------------------------------------------------------------------------------------------------------*/

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_CargaBusqueda_CG(State) {
    $.ajax({
        url: "ConsecutivosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'CONSECUTIVOS_GENERAL'
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
function transacionAjax_Consecutivos_General(State, filtro, opcion) {
    var contenido;

    if ($("#TxtRead").val() == "") {
        contenido = "ALL";
    }
    else {
        contenido = $("#TxtRead").val();
    }

    $.ajax({
        url: "ConsecutivosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "filtro": filtro,
            "opcion": opcion,
            "contenido": contenido,
            "Nit_User": g_NitEmpresa_User
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayConsecutivos_General = [];
            }
            else {
                ArrayConsecutivos_General = JSON.parse(result);
                Table_Consecutivos_General();
            }
        },
        error: function () {

        }
    });
}

/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Consecutivos_General_create(State) {

    var ID;
    var Consecutivos = 0;
    var Politica = 0;


    if (State == "modificar") {
        ID = editID;
    }
    else {
        ID = $("#Txt_ID").val();
    }

    $.ajax({
        url: "ConsecutivosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "ID": ID,
            "descripcion": $("#TxtDescription").val(),
            "Consecutivo": $("#TxtConsecutivo").val(),
            "user": User.toUpperCase()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    Mensaje_General("Disculpenos :(", "No se realizó el ingreso del Consecutivo!", "E");
                    break;

                case "Existe":
                    Mensaje_General("¡Ya Existe!", "El código ingresado ya existe en la base de datos.", "W");
                    break;

                case "Exito":
                    if (estado == "modificar") {
                        Mensaje_General("¡Exito!", "El consecutivo se ha modificado correctamente.", "S");
                        Clear();
                    }
                    else {
                        Mensaje_General("¡Exito!", "El consecutivo se ha creado correctamente.", "S");
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
function transacionAjax_Consecutivos_General_delete(State) {

    $.ajax({
        url: "ConsecutivosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "ID": editID,
            "user": User
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    $("#dialog_eliminar").dialog("close");
                    Mensaje_General("Disculpenos :(", "Ocurrio un error al intentar eliminar este consecutivo.", "E");
                    break;


                case "Exito":
                    $("#dialog_eliminar").dialog("close");
                    Mensaje_General("¡Registro Eliminado!", "El consecutivo  se ha eliminado correctamente.", "S");
                    $(".container_TGrid").html("");
                    Clear();
                    break;
            }

        },
        error: function () {

        }
    });
}
