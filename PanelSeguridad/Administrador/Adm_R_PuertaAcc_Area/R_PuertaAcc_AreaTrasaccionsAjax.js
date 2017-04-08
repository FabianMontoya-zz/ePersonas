/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_CargaBusqueda(State) {
    $.ajax({
        url: "R_PuertaAcc_AreaAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "tabla": 'R_PACCESO_AREA'
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
function transaccionAjax_MPAcceso(State) {
    $.ajax({
        url: "R_PuertaAcc_AreaAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "tabla": 'RUTA'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_PAcceso = [];
            }
            else {
                Matrix_PAcceso = JSON.parse(result);
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MArea(State) {
    $.ajax({
        url: "R_PuertaAcc_AreaAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "tabla": 'RUTA'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Area = [];
            }
            else {
                Matrix_Area = JSON.parse(result);
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
        url: "R_PuertaAcc_AreaAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
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
function transacionAjax_R_PuertaAcc_Area(State, filtro, opcion) {
    var contenido;

    if ($("#TxtRead").val() == "") {
        contenido = "ALL";
    }
    else {
        contenido = $("#TxtRead").val();
    }

    $.ajax({
        url: "R_PuertaAcc_AreaAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "filtro": filtro,
            "opcion": opcion,
            "contenido": contenido,
            "Nit_User": g_NitEmpresa_User
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayR_PuertaAcc_Area = [];
            }
            else {
                ArrayR_PuertaAcc_Area = JSON.parse(result);
                Table_R_PuertaAcc_Area();
            }
        },
        error: function () {

        }
    });
}

/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_R_PuertaAcc_Area_create(State) {

    var ID;
    var Nit_ID;
   
    $.ajax({
        url: "R_PuertaAcc_AreaAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "Nit_ID": $("#Select_EmpresaNit").val(),
            "PAcceso": $("#Select_PAcceso").val(),
            "Area": $("#Select_Area").val(),
            "user": User.toUpperCase()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    Mensaje_General("Disculpenos :(", "No se realizó el ingreso de la relación puerta área.", "E");
                    break;

                case "Existe":
                    Mensaje_General("¡Ya Existe!", "El código ingresado ya existe en la base de datos.", "W");
                    break;

                case "Exito":
                    Mensaje_General("¡Exito!", "La relación puerta área se ha creado correctamente.", "S");
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
function transacionAjax_R_PuertaAcc_Area_delete(State) {

    $.ajax({
        url: "R_PuertaAcc_AreaAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "Nit_ID": editNit_ID,
            "PAcceso": editID,
            "Area": editDocID,
            "user": User
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    $("#dialog_eliminar").dialog("close");
                    Mensaje_General("Disculpenos :(", "Ocurrio un error al intentar eliminar la relación puerta área.", "E");
                    break;

                case "Exito":
                    $("#dialog_eliminar").dialog("close");
                    Mensaje_General("¡Registro Eliminado!", "la relación puerta área se ha eliminado correctamente.", "S");
                    $(".container_TGrid").html("");
                    Clear();
                    break;
            }

        },
        error: function () {

        }
    });

}