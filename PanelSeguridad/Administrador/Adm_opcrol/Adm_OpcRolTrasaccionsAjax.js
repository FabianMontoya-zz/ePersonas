/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_CargaBusqueda(State) {
    OpenControl();
    $.ajax({
        url: "Adm_OpcRolAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "tabla": 'OPTION_ROL'
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
function transacionAjax_EmpresaNit(State) {
    $.ajax({
        url: "Adm_OpcRolAjax.aspx",
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
        async: false, // La petición es síncrona
        cache: false // No queremos usar la caché del navegador
    });
}

/*-------------------- carga subrol---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_CargaRol(vp_State, vp_Nit_ID) {
    $.ajax({
        url: "Adm_OpcRolAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": vp_State,
            "NIT": vp_Nit_ID

        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayComboSubRol = [];
            }
            else {
                ArrayComboSubRol = JSON.parse(result);
                CargaRoles(ArrayComboSubRol, "DDLSubRol_Rol", "");
                CargaRoles(ArrayComboSubRol, "DDL_ID", "");
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga subrol---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_CargaLinks(State, tipo_link) {

    $.ajax({
        url: "Adm_OpcRolAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "tipo_link": tipo_link

        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayComboLinks = [];
            }
            else {
                ArrayComboLinks = JSON.parse(result);
                CargaLinks(ArrayComboLinks, "DDLLink_ID", "");
            }
        },
        error: function () {

        }
    });

}

/*------------------------------ consulta ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_opcRol(State, filtro, opcion) {
    var contenido;

    if ($("#TxtRead").val() == "") {
        contenido = "ALL";
    }
    else {
        contenido = $("#TxtRead").val();
    }


    $.ajax({
        url: "Adm_OpcRolAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "filtro": filtro,
            "opcion": opcion,
            "contenido": contenido,
            "Nit_User": g_NitEmpresa_User
        },
        //mostrar resultados de la creacion de la opcion rol
        success: function (result) {
            if (result == "") {
                ArrayOpcRol = [];
            }
            else {
                ArrayOpcRol = JSON.parse(result);
                Table_opcRol();
            }
        },
        error: function () {

        }
    });
}

/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_opcRol_create(State) {

    var ID;
    var Nit_ID;
    var ID_SubRol_Rol;
    var Nit_ID_SubRol_Rol;
    var Index_Padre;
    var Index_SubRol_Rol;
    var param;

    Index_Padre = $("#DDL_ID").val();
    Index_SubRol_Rol = $("#DDLSubRol_Rol").val();

    for (Item in ArrayComboSubRol) {
        if (ArrayComboSubRol[Item].Index == Index_Padre) {
            ID = ArrayComboSubRol[Item].Rol_ID;
            Nit_ID = ArrayComboSubRol[Item].Nit_ID;
            break;
        }
    }

    for (Item in ArrayComboSubRol) {
        if (ArrayComboSubRol[Item].Index == Index_SubRol_Rol) {
            ID_SubRol_Rol = ArrayComboSubRol[Item].Rol_ID;
            Nit_ID_SubRol_Rol = ArrayComboSubRol[Item].Nit_ID;
            break;
        }
    }
   


    $.ajax({
        url: "Adm_OpcRolAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "ID": ID,
            "ID_Nit_ID": Nit_ID,
            "NIT": $("#Select_EmpresaNit").val(),
            "consecutivo": $("#TxtConsecutivo").val(),
            "tipo": $("#DDLTipo").val(),
            "Nit_ID_subrol_rol": Nit_ID_SubRol_Rol,
            "subrol_rol": ID_SubRol_Rol,
            "link_ID": $("#DDLLink_ID").val(),
            "user": User.toUpperCase()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    Mensaje_General("Disculpenos :(", "Ocurrió un error y no se realizó el Ingreso de la Opción Perfil.", "W");
                    break;

                case "Existe":
                    Mensaje_General("¡Opción Perfil Existente!", "La Opción Perfil que desea ingresar ya existe en el sistema, favor revisar.", "E");
                    $("#ImgNIT").css("display", "inline-table");
                    $("#ImgID").css("display", "inline-table");
                    $("#Img1").css("display", "inline-table");
                    break;

                case "Exito":
                    if (estado == "modificar") {
                        Mensaje_General("¡Exito!", "La Opción Perfil se ha modificado exitosamente.", "S");
                        //HabilitarPanel('modificar');
                    }
                    else {
                        Mensaje_General("¡Exito!", "La Opción Perfil se ha registrado exitosamente en el sistema.", "S");
                        HabilitarPanel('crear');
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
function transacionAjax_opcRol_delete(State) {

    var NIT;
    var ID_Nit_ID;
    var ID;
    var Consecutive;

    NIT = editNIT;
    ID_Nit_ID = editID_Nit_ID;
    ID = editID;
    Consecutive = editConsecutivo

    $.ajax({
        url: "Adm_OpcRolAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "ID": ID,
            "ID_Nit_ID": ID_Nit_ID,
            "NIT": NIT,
            "Consecutivo": Consecutive
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "Error") {
                Mensaje_General("Disculpenos :(", "Ocurrió un error y no se eliminó la Opción Perfil.", "W");
            }
            else {
                Mensaje_General("¡Exito!", "La Opción Perfil se ha eliminado correctamente.", "S");
                $("#dialog_eliminar").dialog("close");
                HabilitarPanel('eliminar');
            }
        },
        error: function () {

        }
    });

}