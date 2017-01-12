/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_CargaBusqueda(vp_State) {
    //OpenContSucursal();
    $.ajax({
        url: "CicloAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": vp_State,
            "tabla": 'SUCURSAL'
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

/*-------------------- Carga combo NIT ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_EmpresaNit(vp_State) {
    $.ajax({
        url: "CicloAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": vp_State,
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

        }
    });
}

/*------------------------------ consulta ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Sucursal(vp_State, filtro, opcion) {
    var contenido;

    if ($("#TxtRead").val() == "") {
        contenido = "ALL";
    }
    else {
        contenido = $("#TxtRead").val();
    }

    $.ajax({
        url: "CicloAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": vp_State,
            "filtro": filtro,
            "opcion": opcion,
            "contenido": contenido
        },
        //mostrar resultados de la creacion del Sucursal
        success: function (result) {
            if (result == "") {
                ArraySucursales = [];
            }
            else {
                ArraySucursales = JSON.parse(result);
                Table_Sucursal();
            }
        },
        error: function () {

        }
    });
}

/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Sucursal_create(vp_State) {

    var vl_ID;
    var vl_NIT;
    var vl_Descrip;

    if (vp_State == "modificar") {
        vl_ID = editID;
        vl_NIT = editNIT;
    } else {
        vl_ID = $("#Txt_ID").val();
        vl_NIT = $("#Select_EmpresaNit").val();
    }


    $.ajax({
        url: "CicloAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": vp_State,
            "NIT": vl_NIT,
            "ID": vl_ID,
            "descripcion": $("#TxtDescription").val(),
            "sigla": $("#TxtSigla").val(),
            "user": User.toUpperCase()
        },
        //mostrar resultados de la creacion del Sucursal
        success: function (result) {
            switch (result) {

                case "Error":
                    Mensaje_General("Disculpenos :(", "Ocurrió un error y no se realizó el Ingreso de la Nueva Sucursal.", "W");
                    break;

                case "Existe":
                    Mensaje_General("Sucursal Existente", "La Sucursal que desea ingresar ya existe en el sistema, favor revisar.", "E");
                    $("#ImgNIT").css("display", "inline-table");
                    $("#ImgID").css("display", "inline-table");
                    break;

                case "Exito":
                    if (estado == "modificar") {
                        Mensaje_General("¡Exito!", "La Sucursal " + vl_ID + " se ha modificado exitosamente.", "S");
                        HabilitarPanel('modificar');
                    }
                    else {
                        Mensaje_General("¡Exito!", "La Sucursal " + vl_ID + " se ha registrado exitosamente en el sistema.", "S");
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
function transacionAjax_Sucursal_delete(vp_State) {
    vl_ID = editID;
    vl_NIT = editNIT;

    $.ajax({
        url: "CicloAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": vp_State,
            "NIT": vl_NIT,
            "ID": vl_ID,
            "user": User.toUpperCase()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "Error") {
                Mensaje_General("Disculpenos :(", "Ocurrió un error y no se actualizó el estado de la Sucursal.", "W");
            }
            else {
                Mensaje_General("¡Exito!", "El Estado de la Sucursal " + vl_ID + " se ha actualizado correctamente.", "S");
                HabilitarPanel('eliminar');
            }
        },
        error: function () {

        }
    });

}

