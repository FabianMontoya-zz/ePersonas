/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_CargaBusqueda(State) {
   $.ajax({
        url: "Adm_OpcRolAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
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
                charge_CatalogList(ArrayEmpresaNit, "Select_EmpresaNit_2", "Generico");
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
function transacionAjax_CargaRol(vp_State, vp_Nit_ID, vp_Type) {
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
            }
        },
        error: function () {

        }

    }).done(function () {

        if (vp_Type == "P") {
            Charge_Combos_Depend_Nit(ArrayComboSubRol, "DDL_Padre", "","");
        }
        else {
            Charge_Combos_Depend_Nit(ArrayComboSubRol, "DDL_Hijo", "","");
        }
    });
}

/*-------------------- carga subrol---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_CargaLinks(vp_State) {

    $.ajax({
        url: "Adm_OpcRolAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": vp_State
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayComboLinks = [];
            }
            else {
                ArrayComboLinks = JSON.parse(result);
            }
        },
        error: function () {
        }
    }).done(function () {
        Charge_Combos_Depend_Nit(ArrayComboLinks, "DDLLink_ID", "","");
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
        data: {
            "action": State,
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
    var vl_Nit_Hijo;
    var vl_Hijo;
    var vl_pagina;
    var vl_Tipo = $("#DDLTipo").val();

    if (vl_Tipo == 1) {
        vl_Nit_Hijo = $("#Select_EmpresaNit_2").val();
        vl_Hijo = $("#DDL_Hijo").val();
        vl_pagina = $("#DDL_Padre").val();
    }
    else {
        vl_Nit_Hijo = $("#Select_EmpresaNit").val();
        vl_Hijo = $("#DDL_Padre").val();
        vl_pagina = $("#DDLLink_ID").val();
    }

    $.ajax({
        url: "Adm_OpcRolAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "NIT_Padre": $("#Select_EmpresaNit").val(),
            "Padre": $("#DDL_Padre").val(),
            "consecutivo": $("#TxtConsecutivo").val(),
            "tipo": vl_Tipo,
            "Nit_ID_Hijo": vl_Nit_Hijo,
            "Hijo": vl_Hijo,
            "link_ID":  vl_pagina,
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
        data: {
            "action": State,
            "ID": ID,
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