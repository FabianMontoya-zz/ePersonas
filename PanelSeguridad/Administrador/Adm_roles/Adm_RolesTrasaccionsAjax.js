/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_CargaBusqueda(State) {
    OpenControl();
    $.ajax({
        url: "Adm_RolesAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'ROLES'
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
        url: "Adm_RolesAjax.aspx",
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

/*------------------------------ consulta ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Rol(State, filtro, opcion) {
    var contenido;

    if ($("#TxtRead").val() == "") {
        contenido = "ALL";
    }
    else {
        contenido = $("#TxtRead").val();
    }

    $.ajax({
        url: "Adm_RolesAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "filtro": filtro,
            "opcion": opcion,
            "contenido": contenido,
            "Nit_User": g_NitEmpresa_User
        },
        //mostrar resultados de la creacion del rol
        success: function (result) {
            if (result == "") {
                ArrayRoles = [];
            }
            else {
                ArrayRoles = JSON.parse(result);
                Table_rol();
            }
        },
        error: function () {

        }
    });
}

/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Rol_create(State) {

    var ID;
    var param;
    var NIT;

    if (State == "modificar") {
        ID = editID;
        NIT = editNIT;
    } else {
        ID = $("#Txt_ID").val();
        NIT = $("#Select_EmpresaNit").val();
    }


    $.ajax({
        url: "Adm_RolesAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "NIT": NIT,
            "ID": ID,
            "descripcion": $("#TxtDescription").val(),
            "sigla": $("#TxtSigla").val(),
            "user": User.toUpperCase()
        },
        //mostrar resultados de la creacion del rol
        success: function (result) {
            switch (result) {

                case "Error":
                    Mensaje_General("Disculpenos :(", "Ocurrió un error y no se realizó el Ingreso del Nuevo Perfil.", "W");
                    break;

                case "Existe":
                    Mensaje_General("Perfil Existente", "El perfil que desea ingresar ya existe en el sistema, favor revisar.", "E");
                    $("#ImgNIT").css("display", "inline-table");
                    $("#ImgID").css("display", "inline-table");
                    break;

                case "Exito":
                    if (estado == "modificar") {
                        Mensaje_General("¡Exito!", "El perfil " + ID + " se ha modificado exitosamente.", "S");
                        HabilitarPanel('modificar');
                    }
                    else {
                        Mensaje_General("¡Exito!", "El perfil " + ID + " se ha registrado exitosamente en el sistema.", "S");
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
function transacionAjax_Rol_delete(State) {
    ID = editID;
    NIT = editNIT;

    $.ajax({
        url: "Adm_RolesAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "NIT": NIT,
            "ID": ID,
            "user": User.toUpperCase()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "Error") {
                Mensaje_General("Disculpenos :(", "Ocurrió un error y no se actualizó el estado del Perfil.", "W");
            }
            else {
                Mensaje_General("¡Exito!", "El Estado del perfil " + ID + " se ha actualizado correctamente.", "S");
                HabilitarPanel('eliminar');
            }
        },
        error: function () {

        }
    });

}

