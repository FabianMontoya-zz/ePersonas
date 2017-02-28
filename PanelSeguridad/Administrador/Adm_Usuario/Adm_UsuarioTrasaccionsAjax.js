/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_CargaBusqueda(State) {
    OpenControl();
    $.ajax({
        url: "Adm_UsuarioAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'USUARIOS'
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
        url: "Adm_UsuarioAjax.aspx",
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
                charge_CatalogList(ArrayEmpresaNit, "Select_EmpresaNit", 1); //Carga el Combo con el genérico
            }
        },
        error: function () {

        },
        //Jhon
        async: false, // La petición es síncrona
        cache: false // No queremos usar la caché del navegador 
    });
}

/*-------------------- carga tipos de Documentos ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Documento(State) {
    $.ajax({
        url: "Adm_UsuarioAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'Clientes'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayTdoc = [];
            }
            else {
                ArrayTdoc = JSON.parse(result);
                charge_CatalogList(ArrayTdoc, "Select_TypeDocument", 1);
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga rol---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_CargaRol(State) {
    $.ajax({
        url: "Adm_UsuarioAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State

        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayComboRol = [];
            }
            else {
                ArrayComboRol = JSON.parse(result);
                CargaRoles(ArrayComboRol, "DDLRol", "");
            }
        },
        error: function () {

        }
    });
}

/*-------------------- Carga Politicas Seguridad ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_PoliticasSeguridad(State, nit_ID) {

    var Nit = nit_ID;
    $.ajax({
        url: "Adm_UsuarioAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "NIT": Nit
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayPoliticasSeguridad = [];
            }
            else {
                ArrayPoliticasSeguridad = JSON.parse(result);
                CargaPoliticasSeguridad(ArrayPoliticasSeguridad, "Select_PoliticaSeguridad_U", "");
            }
        },
        error: function () {

        },
        async: false,
        cache: false
    });
}

/*-------------------- Carga Grupos Reportes ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_GrupoReportes(State, nit_ID) {

    var Nit = nit_ID;
    $.ajax({
        url: "Adm_UsuarioAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "NIT": Nit
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayGrupoReportes = [];
            }
            else {
                ArrayGrupoReportes = JSON.parse(result);
                CargaGrupoReportes(ArrayGrupoReportes, "Select_GroupReports", "");
            }
        },
        error: function () {

        },
        async: false,
        cache: false
    });
}

/*-------------------- Carga Grupos Documentos ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_GrupoDocumentos(State, nit_ID) {

    var Nit = nit_ID;
    $.ajax({
        url: "Adm_UsuarioAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "NIT": Nit
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayGrupoDocumentos = [];
            }
            else {
                ArrayGrupoDocumentos = JSON.parse(result);
                CargaGrupoDocumentos(ArrayGrupoDocumentos, "Select_Grupo_Documentos_U", "");
            }
        },
        error: function () {

        },
        async: false,
        cache: false
    });
}

/*------------------------------ consulta de los usuarios en la BD ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_User(State, filtro, opcion) {
    var contenido;

    if ($("#TxtRead").val() == "") {
        contenido = "ALL";
    }
    else {
        contenido = $("#TxtRead").val();
    }


    $.ajax({
        url: "Adm_UsuarioAjax.aspx",
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
                ArrayUser = [];
            }
            else {
                ArrayUser = JSON.parse(result);
                Table_User();
            }
        },
        error: function () {

        },
        async: false,
        cache: false
    });
}

/*------------------------------ CRUD Insertar/Modificar Usuario ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Create_User(State) {

    var ID;
    var NIT;
    var param;
    var estado;
    var intentos;

    var GRDocumentos = "";
    var GRDocumentos_Nit = "";

    var GRReportes = "";
    var GRReportes_Nit = "";

    if (State == "modificar") {
        ID = editID;
        NIT = editNIT;
        /*Se verifica si cambian el estado del usuario a activo y no estaba activo para reiniciar los intentos fallidos*/
        if (EstadoUsu != 0) {
            if ($("#Select_EstadoUser").val() == 0) {
                estado = $("#Select_EstadoUser").val();
                intentos = 0;
            } else {
                estado = $("#Select_EstadoUser").val();
                intentos = IntentosFallidos;
            }
        } else {
            estado = $("#Select_EstadoUser").val();
            intentos = IntentosFallidos;
        }

    } else {
        ID = $("#Txt_ID").val();
        NIT = $("#Select_EmpresaNit").val();
        estado = 0;
        intentos = 0;
    }

    var Str_C_R = $("#DDLRol option:selected").html();
    var SplitCR = Str_C_R.split(" - ");
    var NIT_Rol = SplitCR[0];
    var Rol = SplitCR[1];

    var PolSeguridad = ArrayPoliticasSeguridad[$("#Select_PoliticaSeguridad_U").val() - 1].Politica_ID;


    if ($("#Select_AccessDocument").val() == 4) {
        var Index_GRDocumentos = $("#Select_Grupo_Documentos_U").val();
        GRDocumentos = ArrayGrupoDocumentos[Index_GRDocumentos - 1].Grp_Documento_ID;
        GRDocumentos_Nit = ArrayGrupoDocumentos[Index_GRDocumentos - 1].Nit_ID;
    }

    if ($("#Select_AccessReports").val() == 4) {
        var Index_GRReportes = $("#Select_GroupReports").val();
        GRReportes = ArrayGrupoReportes[Index_GRReportes - 1].Grupo_ID;
        GRReportes_Nit = ArrayGrupoReportes[Index_GRReportes - 1].Nit_ID;
    }


    $.ajax({
        url: "Adm_UsuarioAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "NIT": NIT,
            "UsuarioID": ID.toUpperCase(),
            "TypeDocument": $("#Select_TypeDocument").val(),
            "Documento": $("#TxtDocument").val(),
            "Nombre": $("#TxtName").val().toUpperCase(),
            "Rol_NIT_ID": NIT_Rol.trim(),
            "RolID": Rol.trim(),
            "AccessInformation": $("#Select_Acces_Information").val(),
            "PolSegurityGroup": $("#Select_PolSegurGrupo").val(),
            "PoliticaSeguridad": PolSeguridad,
            "AccessDocumentos": $("#Select_AccessDocument").val(),
            "GroupDocuments_Nit_ID": GRDocumentos_Nit,
            "GroupDocuments": GRDocumentos,
            "AccessInfoDocument": $("#Select_AccesInfoDocument").val(),
            "AccessReportes": $("#Select_AccessReports").val(),
            "GroupReports_Nit_ID": GRReportes_Nit,
            "GroupReports": GRReportes,
            "AccessInfoReportes": $("#SelectAccessInfoReports").val(),
            "Token": $("#TXT_Token").val(),
            "Intentos_Fallidos": intentos,
            "TypeAccess": $("#Select_TypeAccess").val(),
            "Estado": estado,
            "Huella": "",
            "user": User.toUpperCase()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    Mensaje_General("Disculpenos :(", "Ocurrió un error al ingresar el nuevo usuario. El usuario no se registró.", "E");
                    break;

                case "Existe":
                    Mensaje_General("Usuario Existente", "El usuario que desea ingresar a esta empresa ya está registrado en la base de datos. Favor verificar.", "W");
                    $("#ImgNIT").css("display", "inline-table");
                    $("#ImgID").css("display", "inline-table");
                    break;

                case "Exito":
                    if (State == "modificar") {
                        Mensaje_General("Exito", "El Usuario " + ID.toUpperCase() + " fue modificado exitosamente.", "S");
                        HabilitarPanel('modificar');
                    }
                    else {
                        Mensaje_General("Exito", "El Usuario " + ID.toUpperCase() + " fue registrado exitosamente. Recuerde que para primer ingreso la contraseña es la misma que el usuario.", "S");
                        Clear();
                    }
                    break;
            }

        },
        error: function () {

        },
        async: false,
        cache: false
    });
}

/*------------------------------ eliminar ---------------------------*/
//No hay eliminación, solo se le cambia el estado al usuario

//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_ShearchPeople(vp_State, vp_TD, vp_D, vp_NIT, vp_Vista, vp_Variable) {
    $.ajax({
        url: "Adm_UsuarioAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": vp_State,
            "TD": vp_TD,
            "D": vp_D,
            "NIT": vp_NIT
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {
                case "NO":
                    Mensaje_General("No existe", "Los datos diligenciados No coinciden con las personas registradas en el sitema", "W");
                    $("#" + vp_Vista).html("------");
                    if (vp_Variable == "Persona_Exist") {
                        vg_Persona_Exist = false;
                    }
                    break;

                default:
                    $("#" + vp_Vista).html(result);
                    if (vp_Variable == "Persona_Exist") {
                        vg_Persona_Exist = true;
                    }
                    break;
            }
        },
        error: function () {

        }
    });
}
