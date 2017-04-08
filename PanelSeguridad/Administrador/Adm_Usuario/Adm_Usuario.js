/*--------------- region de variables globales --------------------*/
var ArrayUser = [];
var ArrayCombo = [];
var ArrayComboRol = [];

var ArrayEmpresaNit = [];
var ArrayTdoc = [];
var ArrayPoliticasSeguridad = [];
var ArrayGrupoReportes = [];

/*Variables usadas para verificar datos de usuario al modificar*/
var estado;
var editID;
var editNIT;
var EstadoUsu;
var IntentosFallidos = 0;
var vg_Persona_Exist;
/*== END VAR MODIFY USER ==*/
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {

    /*Llamado de metodos para ocultar elementos al inicio de la operación de la pantalla*/
    Ventanas_Emergentes(); //Ventanas_Emergentes Va primero pues es la que llama al load de espera al inicio de los AJAX
    Ocultar_Errores();
    Ocultar_Tablas();
    /*==================FIN LLAMADO INICIAL DE METODOS DE INICIALIZACIÓN==============*/

    /*Llamado a las diferentes Trasacciones necesarias al iniciar el proceso de carga de la página*/
    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');

    transacionAjax_EmpresaNit('Cliente'); //Carga Droplist de Empresa NIT
    transacionAjax_Documento('Documento'); //Carga los tipos de documento
    /*=======================FIN LLAMADO TRANSACCIONES AJAX======================================*/

    /*Llamado a todos los procesos de Change de los diferentes Select*/
    Change_Select_Nit();
    Change_Select_Nit_2();
    Change_Select_TypeDocument();
    Change_DDLRol();
    Change_Select_Acces_Information();
    Change_Select_PolSegurGrupo();
    Change_Select_AccesInfoDocument();
    Change_Select_AccessDocument();
    Change_Select_Grupo_Documentos_U();
    Change_SelectAccessInfoReports();
    Change_Select_AccessReports();
    Change_Select_GroupReports();
    Change_Select_TypeAccess();
    Change_Select_EstadoUser();
    Date_Document();
    /*==========================FIN CHANGE SELECT'S====================*/
});

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                 REGION INICIO DE COMPONENTES                                                                                                    ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//Función para ocultar las IMG de los errores
function Ocultar_Errores() {

    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WA").css("display", "none");
    $("#ImgDelete").css("display", "none");
    $("#ImgNIT_2").css("display", "none");

    /*====Los demás errores se ocultan en ResetError(); de la SasifMaster.js===*/
}

//funcion para las ventanas emergentes
function Ventanas_Emergentes() {

    Load_Charge_Sasif(); //Carga de "SasifMaster.js" el Control de Carga

    $("#dialog").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true
    });

    $("#dialog_eliminar").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true
    });
}

//Función que oculta las tablas
function Ocultar_Tablas() {
    $("#TablaDatos").css("display", "none");
    $("#TablaConsulta").css("display", "none");
    $("#Detalle").css("display", "none");
    $("#Datos").css("display", "none");
}

//habilita el panel de crear o consulta
function HabilitarPanel(opcion) {

    switch (opcion) {

        case "crear":
            Clear_Detalle();
            $("#TablaDatos").css("display", "inline-table");
            $("#TablaConsulta").css("display", "none");
            $("#Datos").css("display", "inline-table");
            $("#Detalle").css("display", "none");
            $("#Txt_ID").removeAttr("disabled");
            $("#Btnguardar").attr("value", "Guardar");
            estado = opcion;
            Clear();
            var OnlyEmpresa = VerificarNIT("Select_EmpresaNit");

            if (OnlyEmpresa == true) {
                TransaccionesSegunNIT($("#Select_EmpresaNit").val());
            }

            break;

        case "buscar":
            Clear_Detalle();
            $("#TablaDatos").css("display", "none");
            $("#Datos").css("display", "none");
            $("#Detalle").css("display", "inline-table");
            $("#TablaConsulta").css("display", "inline-table");
            $(".container_TGrid").html("");
            estado = opcion;
            Clear();
            break;

        case "modificar":
            Clear_Detalle();
            $("#TablaDatos").css("display", "none");
            $("#Datos").css("display", "inline-table");
            $("#Detalle").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $(".container_TGrid").html("");
            estado = opcion;
            Clear();
            break;

    }
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                 REGION BOTONES                                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//consulta del CRUD (READ)
function BtnConsulta() {

    var filtro;
    var ValidateSelect = ValidarDroplist();
    var opcion;

    if (ValidateSelect == 1) {
        filtro = "N";
        opcion = "ALL";
        transacionAjax_User("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_User("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            console.log("EXITO!");
            transacionAjax_Create_User("crear");
        }
        else {
            transacionAjax_Create_User("modificar");
        }
    }
}

//evento del boton salir
function x() {
    $("#dialog").dialog("close");
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                     PROCESOS DE CHANGES EN CONTROLES                                                                                                                                        ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//al mover el combo de nit 2 para traer los roles
function Change_Select_Nit_2() {
    $("#Select_EmpresaNit_2").change(function () {

        var vl_Nit_index = this.value;
        transacionAjax_CargaRol('cargar_Rol', vl_Nit_index);
    });
}

//al mover el combo de nit traer datos presedentes
function Change_Select_Nit() {
    $("#Select_EmpresaNit").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_EmpresaNit").val() == "-1") {
            $("#ImgNIT").css("display", "inline-table");
        } else {
            $("#ImgNIT").css("display", "none");
        }
        index = this.value;
        TransaccionesSegunNIT(index);
    });
}

function TransaccionesSegunNIT(index_NIT_ID) {
    if (index_NIT_ID != "-1") {
        transacionAjax_PoliticasSeguridad('PoliticasSeguridad', index_NIT_ID); //Carga las politicas de seguridad
        transacionAjax_GrupoReportes('GrupoReportes', index_NIT_ID); //Carga los grupos de reportes (Genéricos y de la empresa)
        transacionAjax_GrupoDocumentos('GrupoDocumentos', index_NIT_ID); //Carga los grupos de Documentos (Genéricos y de la empresa)
    }
}

function Change_Select_TypeDocument() {
    $("#Select_TypeDocument").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_TypeDocument").val() == "-1") {
            $("#Img_TypeDoc").css("display", "inline-table");
        } else {
            $("#Img_TypeDoc").css("display", "none");
        }
    });
}

function Change_DDLRol() {
    $("#DDLRol").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#DDLRol").val() == "-1") {
            $("#ImgRol").css("display", "inline-table");
        } else {
            $("#ImgRol").css("display", "none");
        }
    });
}

function Change_Select_Acces_Information() {
    $("#Select_Acces_Information").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_Acces_Information").val() == "-1") {
            $("#ImgAccessInfo").css("display", "inline-table");
        } else {
            $("#ImgAccessInfo").css("display", "none");
        }
    });
}

function Change_Select_PolSegurGrupo() {
    $("#Select_PolSegurGrupo").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_PolSegurGrupo").val() == "-1") {
            $("#ImgPolSeguGrupo").css("display", "inline-table");
        } else {
            $("#ImgPolSeguGrupo").css("display", "none");
        }
    });
}

function Change_Select_PoliticaSeguridad_U() {
    $("#Select_PoliticaSeguridad_U").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_PoliticaSeguridad_U").val() == "-1") {
            $("#ImgPolSecurity").css("display", "inline-table");
        } else {
            $("#ImgPolSecurity").css("display", "none");
        }
    });
}

function Change_Select_AccesInfoDocument() {
    $("#Select_AccesInfoDocument").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_AccesInfoDocument").val() == "-1") {
            $("#ImgAccesInfoDocument").css("display", "inline-table");
        } else {
            $("#ImgAccesInfoDocument").css("display", "none");
        }
    });
}

function Change_Select_AccessDocument() {
    $("#Select_AccessDocument").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_AccessDocument").val() == "-1") {
            $("#ImgAccessDocuments").css("display", "inline-table");
        } else {
            $("#ImgAccessDocuments").css("display", "none");
        }
        ValidarTipoAcceso("Documentos"); //Validamos si selecciona 4 - Grupo de documentos para mostrar selección de grupo
    });
}

function Change_Select_Grupo_Documentos_U() {
    $("#Select_Grupo_Documentos_U").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_Grupo_Documentos_U").val() == "-1") {
            $("#ImgGroupDocuments").css("display", "inline-table");
        } else {
            $("#ImgGroupDocuments").css("display", "none");
        }
    });
}

function Change_SelectAccessInfoReports() {
    $("#SelectAccessInfoReports").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#SelectAccessInfoReports").val() == "-1") {
            $("#ImgAccessInfoReports").css("display", "inline-table");
        } else {
            $("#ImgAccessInfoReports").css("display", "none");
        }
    });
}

function Change_Select_AccessReports() {
    $("#Select_AccessReports").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_AccessReports").val() == "-1") {
            $("#ImgAccessReports").css("display", "inline-table");
        } else {
            $("#ImgAccessReports").css("display", "none");
        }
        ValidarTipoAcceso("Reportes"); //Validamos si selecciona 4 - Grupo de documentos para mostrar selección de grupo
    });
}

function Change_Select_GroupReports() {
    $("#Select_GroupReports").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_GroupReports").val() == "-1") {
            $("#ImgGroupReport").css("display", "inline-table");
        } else {
            $("#ImgGroupReport").css("display", "none");
        }
    });
}

function Change_Select_TypeAccess() {
    $("#Select_TypeAccess").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_TypeAccess").val() == "-1") {
            $("#ImgTypeAccess").css("display", "inline-table");
        } else {
            $("#ImgTypeAccess").css("display", "none");
        }
    });
}

function Change_Select_EstadoUser() {
    $("#Select_EstadoUser").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_EstadoUser").val() == "-1") {
            $("#ImgEstadoUser").css("display", "inline-table");
        } else {
            $("#ImgEstadoUser").css("display", "none");
        }
    });
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                      REGION VALIDACIONES DEL PROCESO                                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//validamos si han escogido una columna
function ValidarDroplist() {
    var flag;
    var contenido = $("#DDLColumns").val();

    if (contenido == '-1') {
        flag = 1;
    }
    else {
        flag = 0;
    }
    return flag;
}

//valida campo y consulta datos de persona
function Date_Document() {

    $("#TxtDocument").blur(function () {

        var vl_valida_people = ValidaCamposPeople();
        if (vl_valida_people == 1) {
            Mensaje_General("campos Incompletos!", "los campos (Nit Empresa),(Tipo de documento) y (documento) NO han sido diligenciados", "E");
        }
        else {
            var vl_C_TD = $("#Select_TypeDocument").val();
            var vl_C_D = $("#TxtDocument").val();
            var vl_Nit = $("#Select_EmpresaNit").val();

            transacionAjax_ShearchPeople("Buscar_Persona", vl_C_TD, vl_C_D, vl_Nit, "TxtName", "Persona_Exist");
        }

    });
}

//validamos campos para la creacion del link
function validarCamposCrear() {

    var validoAll = 0;
    var validoBasicos = false;

    validoBasicos = ValidarBasicos();

    if (validoBasicos == true) {
        validoAll = 0;
    } else {
        validoAll = 1;
    }


    return validoAll;
}

//Función que valida los campos básicos que siempre deben ser llenados
function ValidarBasicos() {

    var valido = false;

    var NIT = $("#Select_EmpresaNit").val(); //ImgNIT
    var ID = $("#Txt_ID").val(); //ImgID
    var typeDocument = $("#Select_TypeDocument").val(); //Img_TypeDoc
    var documento = $("#TxtDocument").val(); //ImgDoc
    var rol = $("#DDLRol").val(); //ImgRol
    var accessInformation = $("#Select_Acces_Information").val(); //ImgAccessInfo
    var PolSegurGrupo = $("#Select_PolSegurGrupo").val(); //ImgPolSeguGrupo
    var PoliticaSeguridad = $("#Select_PoliticaSeguridad_U").val(); //ImgPolSecurity
    var accessInfoDocument = $("#Select_AccesInfoDocument").val(); //ImgAccesInfoDocument
    var accessDocumentos = $("#Select_AccessDocument").val(); //ImgAccessDocuments
    //Validación Adicional si accessDocumentos == 4 Se debe validar Grupo Documentos --> ValidarGRDocuments_GRReportes()
    var accessInfoReportes = $("#SelectAccessInfoReports").val(); //ImgAccessInfoReports -- ValidarGRDocuments_GRReportes()
    var accessReportes = $("#Select_AccessReports").val(); //ImgAccessReports
    //Validación Adicional si accessReportes == 4 Se debe validar Grupo Reportes
    var token = $("#TXT_Token").val(); //ImgToken
    var typeAccess = $("#Select_TypeAccess").val(); //ImgTypeAccess   
    var Rol_NIT = $("#Select_EmpresaNit_2").val(); //ImgNIT_2

    if (NIT == "-1" || NIT == null || ID == "" ||
        typeDocument == "-1" || typeDocument == null ||
        documento == "" ||
        rol == "-1" || rol == null ||
        accessInformation == "-1" || accessInformation == null ||
        PolSegurGrupo == "-1" || PolSegurGrupo == null ||
        PoliticaSeguridad == "-1" || PoliticaSeguridad == null ||
        accessInfoDocument == "-1" || accessInfoDocument == null ||
        accessDocumentos == "-1" || accessDocumentos == null ||
        accessInfoReportes == "-1" || accessInfoReportes == null ||
        accessReportes == "-1" || accessReportes == null ||
        token == "" ||
        typeAccess == "-1" || typeAccess == null ||
        Rol_NIT == "-1" || Rol_NIT == null) {

        Mensaje_General("¡Campos Incompletos! (1)", "Debe completar los campos obligatorios para poder crear un nuevo usuario.", "E");
        /* -- Muestra de errores según dato faltante -- */
        if (Rol_NIT == "-1" || NIT == null) { $("#ImgNIT_2").css("display", "inline-table"); } else { $("#ImgNIT_2").css("display", "none"); }
        if (NIT == "-1" || NIT == null) { $("#ImgNIT").css("display", "inline-table"); } else { $("#ImgNIT").css("display", "none"); }
        if (ID == "") { $("#ImgID").css("display", "inline-table"); } else { $("#ImgID").css("display", "none"); }
        if (typeDocument == "-1" || typeDocument == null) { $("#Img_TypeDoc").css("display", "inline-table"); } else { $("#Img_TypeDoc").css("display", "none"); }
        if (documento == "") { $("#ImgDoc").css("display", "inline-table"); } else { $("#ImgDoc").css("display", "none"); }
        if (rol == "-1" || rol == null) { $("#ImgRol").css("display", "inline-table"); } else { $("#ImgRol").css("display", "none"); }
        if (accessInformation == "-1" || accessInformation == null) { $("#ImgAccessInfo").css("display", "inline-table"); } else { $("#ImgAccessInfo").css("display", "none"); }
        if (PolSegurGrupo == "-1" || PolSegurGrupo == null) { $("#ImgPolSeguGrupo").css("display", "inline-table"); } else { $("#ImgPolSeguGrupo").css("display", "none"); }
        if (PoliticaSeguridad == "-1" || PoliticaSeguridad == null) { $("#ImgPolSecurity").css("display", "inline-table"); } else { $("#ImgPolSecurity").css("display", "none"); }
        if (accessInfoDocument == "-1" || accessInfoDocument == null) { $("#ImgAccesInfoDocument").css("display", "inline-table"); } else { $("#ImgAccesInfoDocument").css("display", "none"); }
        if (accessDocumentos == "-1" || accessDocumentos == null) { $("#ImgAccessDocuments").css("display", "inline-table"); } else { $("#ImgAccessDocuments").css("display", "none"); }
        if (accessInfoReportes == "-1" || accessInfoReportes == null) { $("#ImgAccessInfoReports").css("display", "inline-table"); } else { $("#ImgAccessInfoReports").css("display", "none"); }
        if (accessReportes == "-1" || accessReportes == null) { $("#ImgAccessReports").css("display", "inline-table"); } else { $("#ImgAccessReports").css("display", "none"); }
        if (token == "") { $("#ImgToken").css("display", "inline-table"); } else { $("#ImgToken").css("display", "none"); }
        if (typeAccess == "-1" || typeAccess == null) { $("#ImgTypeAccess").css("display", "inline-table"); } else { $("#ImgTypeAccess").css("display", "none"); }
    }
    else {
        valido = ValidarGRDocuments_GRReportes(accessDocumentos, accessReportes);
    }

    return valido;
}

//Función que valida los grupos de Documentos y Grupos de Reportes si se requiere validar selección
function ValidarGRDocuments_GRReportes(accessDocumentos, accessReportes) {

    var Valido = false;

    var validarTodo = false;
    var validarDocuments = false;
    var validarReports = false;
    var validoGRDocuments = false;
    var validoGRReports = false;

    ResetError(); //Reseteamos todos los errores para ocultar los basicos que ya se completaron

    if (accessDocumentos == 4 || accessReportes == 4) {

        if (accessDocumentos == 4) {

            validarDocuments = true;

            var grupoDocumentos = $("#Select_Grupo_Documentos_U").val(); //ImgGroupDocuments
            if (grupoDocumentos == "-1" || grupoDocumentos == null) {
                $("#ImgGroupDocuments").css("display", "inline-table");
            } else {
                $("#ImgGroupDocuments").css("display", "none");
                validoGRDocuments = true;
            }
        }

        if (accessReportes == 4) {

            validarReports = true;

            var grupoReportes = $("#Select_GroupReports").val(); //ImgGroupReport
            if (grupoReportes == "-1" || grupoReportes == null) {
                $("#ImgGroupReport").css("display", "inline-table");
            } else {
                $("#ImgGroupReport").css("display", "none");
                validoGRReports = true;
            }
        }

        if (validarDocuments == true && validarReports == true) {
            validarTodo = true;
        }

        if (validarTodo == true) {
            if (validoGRDocuments == true && validoGRReports == true) {
                Valido = true;
            }
        } else {
            if (validarDocuments == true && validarReports == false) {
                if (validoGRDocuments == true) {
                    Valido = true;
                }
            } else if (validarDocuments == false && validarReports == true) {
                if (validoGRReports == true) {
                    Valido = true;
                }
            }
        }

    } else {
        Valido = true;
    }

    if (Valido == false) {
        Mensaje_General("¡Campos Incompletos! (2)", "Debe completar los campos obligatorios para poder crear un nuevo usuario.", "E");
    }

    return Valido;
}

//valida campos de documentos para buscar persona
function ValidaCamposPeople() {
    var valida = 0;
    var C_Nit_ID = $("#Select_EmpresaNit").val();
    var C_TD = $("#Select_TypeDocument").val();
    var C_D = $("#TxtDocument").val();

    if (C_Nit_ID == "-1" || C_TD == "-1" || C_D == "") {
        valida = 1;
        if (C_TD == "-1") { $("#Img_TypeDoc").css("display", "inline-table"); } else { $("#Img_TypeDoc").css("display", "none"); }
        if (C_D == "") { $("#ImgDoc").css("display", "inline-table"); } else { $("#ImgDoc").css("display", "none"); }
        if (C_Nit_ID == "-1") { $("#ImgNIT").css("display", "inline-table"); } else { $("#ImgNIT").css("display", "none"); }
    }
    else {
        $("#ImgNIT").css("display", "none");
        $("#ImgDoc").css("display", "none");
        $("#Img_TypeDoc").css("display", "none");
    }
    return valida;
}

//Función que valida que tipo de acceso a información se requiere y muestra o no los combos de Grupo Documentos - Reportes
function ValidarTipoAcceso(AccessTo) {

    var valor = 0;

    switch (AccessTo) {
        case "Documentos":

            valor = $("#Select_AccessDocument").val();
            if (valor == 4) {
                $("#T_GrupoDocuments").show();
            } else {
                $("#Select_Grupo_Documentos_U").val("-1").trigger('chosen:updated');
                $("#T_GrupoDocuments").hide(); //Se coloca de ultimas para que los cambios que se quieran hacer tengan efecto            
            }

            break;
        case "Reportes":

            valor = $("#Select_AccessReports").val();
            if (valor == 4) {
                $("#T_GrupoReportes").show();
            } else {
                $("#Select_GroupReports").val("-1").trigger('chosen:updated');
                $("#T_GrupoReportes").hide(); //Se coloca de ultimas para que los cambios que se quieran hacer tengan efecto
            }

            break;
    }

    $('.C_Chosen').trigger('chosen:updated');

}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                  TABLA DE AREA                                                                                  ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
// crea la tabla en el cliente
function Table_User() {

    var html_TUser;
    var Index_User;

    switch (estado) {

        case "buscar":
            html_TUser = "<table id='TUser' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Ver</th><th>NIT Empresa</th><th>Usuario</th><th>Tipo Documento</th><th>Documento</th><th>Nombre</th><th>Rol</th></th></th><th>Estado</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Usuario Actualización</th><th>Fecha Última Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayUser) {
                Index_User = parseInt(ArrayUser[itemArray].Index) - 1;
                html_TUser += "<tr id= 'TUser_" + Index_User + "'><td><span class='cssToolTip_ver'><img  src='../../images/N_Search_Red.png' width='23px' height='23px' class= 'Editar' name='editar' onmouseover=\"this.src='../../images/N_Search_Black.png';\" onmouseout=\"this.src='../../images/N_Search_Red.png';\" onclick=\"Editar('" + Index_User + "')\"></img><span>Editar Usuario</span></span></td><td>" + ArrayUser[itemArray].Nit_ID + "</td><td>" + ArrayUser[itemArray].Usuario_ID + "</td><td>" + ArrayUser[itemArray].TypeDocument + " - " + ArrayUser[itemArray].DescripDocumento + "</td><td>" + ArrayUser[itemArray].Documento + "</td><td style='white-space: nowrap;'>" + ArrayUser[itemArray].Nombre + "</td><td>" + ArrayUser[itemArray].Rol_ID + "</td><td> " + ArrayUser[itemArray].Estado + " - " + ArrayUser[itemArray].DescripEstado + " </td><td>" + ArrayUser[itemArray].UsuarioCreacion + "</td><td style='white-space: nowrap;'>" + ArrayUser[itemArray].FechaCreacion + "</td><td>" + ArrayUser[itemArray].UsuarioActualizacion + "</td><td style='white-space: nowrap;'>" + ArrayUser[itemArray].FechaActualizacion + "</td></tr>";
            }
            break;

        case "modificar":
            html_TUser = "<table id='TUser' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Editar</th><th>NIT Empresa</th><th>Usuario</th><th>Tipo Documento</th><th>Documento</th><th>Nombre</th><th>Rol</th></th></th><th>Estado</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Usuario Actualización</th><th>Fecha Última Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayUser) {
                Index_User = parseInt(ArrayUser[itemArray].Index) - 1;
                html_TUser += "<tr id= 'TUser_" + Index_User + "'><td><span class='cssToolTip_ver'><img  src='../../images/Editar1.png' width='23px' height='23px' class= 'Editar' name='editar' onmouseover=\"this.src='../../images/EditarOver.png';\" onmouseout=\"this.src='../../images/Editar1.png';\" onclick=\"Editar('" + Index_User + "')\"></img><span>Editar Usuario</span></span></td><td>" + ArrayUser[itemArray].Nit_ID + "</td><td>" + ArrayUser[itemArray].Usuario_ID + "</td><td>" + ArrayUser[itemArray].TypeDocument + " - " + ArrayUser[itemArray].DescripDocumento + "</td><td>" + ArrayUser[itemArray].Documento + "</td><td style='white-space: nowrap;'>" + ArrayUser[itemArray].Nombre + "</td><td>" + ArrayUser[itemArray].Rol_ID + "</td><td> " + ArrayUser[itemArray].Estado + " - " + ArrayUser[itemArray].DescripEstado + " </td><td>" + ArrayUser[itemArray].UsuarioCreacion + "</td><td style='white-space: nowrap;'>" + ArrayUser[itemArray].FechaCreacion + "</td><td>" + ArrayUser[itemArray].UsuarioActualizacion + "</td><td style='white-space: nowrap;'>" + ArrayUser[itemArray].FechaActualizacion + "</td></tr>";
            }
            break;

    }
    html_TUser += "</tbody></table>";
    $(".container_TGrid").html("");
    $(".container_TGrid").html(html_TUser);

    $("#TUser").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

// muestra el registro a editar
function Editar(index_User) {

    $("#TablaDatos").css("display", "inline-table");
    $("#TablaConsulta").css("display", "none");

    $("#Select_EmpresaNit").val(ArrayUser[index_User].Nit_ID).trigger("chosen:updated");
    $("#Select_EmpresaNit").prop('disabled', true);
    $("#Select_EmpresaNit_2").val(ArrayUser[index_User].Rol_Nit_ID).trigger("chosen:updated");
    $("#Txt_ID").val(ArrayUser[index_User].Usuario_ID);
    $("#Txt_ID").prop("disabled", true);

    editNIT = ArrayUser[index_User].Nit_ID;
    TransaccionesSegunNIT(editNIT); //Llenamos los combos dependientes de NIT
    editID = ArrayUser[index_User].Usuario_ID;
    $("#TxtName").html(ArrayUser[index_User].Nombre);
    $("#Select_TypeDocument").val(ArrayUser[index_User].TypeDocument).trigger("chosen:updated");
    $("#TxtDocument").val(ArrayUser[index_User].Documento);
    //Rol se llena en BuscarValuesArray            
    $("#Select_Acces_Information").val(ArrayUser[index_User].Acceso_Informacion).trigger("chosen:updated");
    $("#Select_PolSegurGrupo").val(ArrayUser[index_User].Nivel_Politica_Seguridad_Grupo).trigger("chosen:updated");
    //PoliticaSeguridad se llena en BuscarValuesArray
    $("#Select_AccesInfoDocument").val(ArrayUser[index_User].Acceso_Informacion_Documentos).trigger("chosen:updated");
    $("#Select_AccessDocument").val(ArrayUser[index_User].Acceso_Documentos).trigger("chosen:updated");
    //Grupo Documentos se llena en BuscarValuesArray            
    $("#SelectAccessInfoReports").val(ArrayUser[index_User].Acceso_Informacion_Reportes).trigger("chosen:updated");
    $("#Select_AccessReports").val(ArrayUser[index_User].Acceso_Reportes).trigger("chosen:updated");
    //Grupo Reportes se llena en BuscarValuesArray
    $("#TXT_Token").val(ArrayUser[index_User].Token);
    $("#Select_TypeAccess").val(ArrayUser[index_User].Tipo_Acceso).trigger("chosen:updated");
    $("#Select_EstadoUser").val(ArrayUser[index_User].Estado).trigger("chosen:updated");
    EstadoUsu = ArrayUser[index_User].Estado;
    IntentosFallidos = ArrayUser[index_User].Intentos_Fallidos;
    $("#Btnguardar").attr("value", "Actualizar");

    BuscarValuesArray(ArrayUser[index_User]);
    ValidarTipoAcceso("Documentos");
    ValidarTipoAcceso("Reportes");

    $('.C_Chosen').trigger('chosen:updated');

    setTimeout("Detalle(" + index_User + ");", 300);
}

//Función que se encarga de buscar dentro de los array los index para llenar los combos dependientes de NIT
function BuscarValuesArray(ArrayUsuario) {
    /*Llenamos el ROL*/
    var rol = ArrayUsuario.Rol_ID;
    var rolNit = ArrayUsuario.Rol_Nit_ID;

    transacionAjax_CargaRol('cargar_Rol', rolNit);

    for (itemRol in ArrayComboRol) {
        if (rol == ArrayComboRol[itemRol].Rol_ID && rolNit == ArrayComboRol[itemRol].Nit_ID) {
            $("#DDLRol").val(ArrayComboRol[itemRol].Index).trigger("chosen:updated");
            break;
        }
    }
    /*==== END ROL ====*/

    /*Llenamos Políticas de Seguridad*/

    var PoliticaSegu = ArrayUsuario.Politica_Seguridad;
    for (itemPol in ArrayPoliticasSeguridad) {
        if (PoliticaSegu == ArrayPoliticasSeguridad[itemPol].Politica_ID) {
            $("#Select_PoliticaSeguridad_U").val(ArrayPoliticasSeguridad[itemPol].Index).trigger("chosen:updated");
            break;
        }
    }
    /*==== END SECURITY POL ====*/

    /*Llenamos Grupo Documentos*/
    if (ArrayUsuario.Acceso_Documentos == 4) {
        var NITGrupoD = ArrayUsuario.Grupo_Documentos_Nit_ID;
        var GrupoD = ArrayUsuario.Grupo_Documentos;

        for (itemGrupoD in ArrayGrupoDocumentos) {
            if (GrupoD == ArrayGrupoDocumentos[itemGrupoD].Grp_Documento_ID && NITGrupoD == ArrayGrupoDocumentos[itemGrupoD].Nit_ID) {
                $("#Select_Grupo_Documentos_U").val(ArrayGrupoDocumentos[itemGrupoD].Index).trigger("chosen:updated");
                break;
            }
        }
    }
    /*==== END DOCUMENTS GROUP ====*/

    /*Llenamos Grupo Reportes*/

    if (ArrayUsuario.Acceso_Reportes == 4) {
        var NITGrupoR = ArrayUsuario.Grupo_Reportes_Nit_ID;
        var GrupoR = ArrayUsuario.Grupo_Reportes;

        for (itemGrupoR in ArrayGrupoReportes) {
            if (GrupoR == ArrayGrupoReportes[itemGrupoR].Grupo_ID && NITGrupoR == ArrayGrupoReportes[itemGrupoR].Nit_ID) {
                $("#Select_GroupReports").val(ArrayGrupoDocumentos[itemGrupoR].Index).trigger("chosen:updated");
                break;
            }
        }
    }
    /*==== END REPORTS GROUP ====*/

}

// muestra el registro a editar
function Detalle(index_User) {

    $("#TablaDatos").css("display", "inline-table");
    $("#TablaConsulta").css("display", "none");

    $("#Ver_EmpresaNit").html($("#Select_EmpresaNit option:selected").html());
    $("#Ver_EmpresaNit_2").html($("#Select_EmpresaNit_2 option:selected").html());
    $("#Ver_ID").html(ArrayUser[index_User].Usuario_ID);

    $("#Ver_Name").html(ArrayUser[index_User].Nombre);
    $("#Ver_TypeDocument").html($("#Select_TypeDocument option:selected").html());
    $("#Ver_Document").html(ArrayUser[index_User].Documento);
    //Rol se llena en BuscarhtmluesArray            
    $("#Ver_Acces_Information").html($("#Select_Acces_Information option:selected").html());
    $("#Ver_PolSegurGrupo").html($("#Select_PolSegurGrupo option:selected").html());
    //PoliticaSeguridad se llena en BuscarhtmluesArray
    $("#Ver_AccesInfoDocument").html($("#Select_AccesInfoDocument option:selected").html());
    $("#Ver_AccessDocument").html($("#Select_AccessDocument option:selected").html());
    //Grupo Documentos se llena en BuscarhtmluesArray            
    $("#Ver_AccessInfoReports").html($("#SelectAccessInfoReports option:selected").html());
    $("#Ver_AccessReports").html($("#Select_AccessReports option:selected").html());
    //Grupo Reportes se llena en BuscarhtmluesArray
    $("#Ver_Token").html(ArrayUser[index_User].Token);
    $("#Ver_TypeAccess").html($("#Select_TypeAccess option:selected").html());
    $("#Ver_EstadoUser").html($("#Select_EstadoUser option:selected").html());

    $("#Ver_Rol").html($("#DDLRol option:selected").html());
    $("#Ver_PoliticaSeguridad_U").html($("#Select_PoliticaSeguridad_U option:selected").html());

    var vl_Valor_Doc = $("#Select_AccessDocument").val();
    if (vl_Valor_Doc == 4) {
        $("#Ver_Grupo_Documentos_U").html($("#Select_Grupo_Documentos_U option:selected").html());
    } else {
        $("#Ver_Grupo_Documentos_U").html("No Aplica");
    }

    var vl_Valor_Report = $("#Select_AccessReports").val();
    if (vl_Valor_Report == 4) {
        $("#Ver_GroupReports").html($("#Select_GroupReports option:selected").html());
    } else {
        $("#Ver_GroupReports").html("No Aplica");
    }

}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                              MENSAJES, VISUALIZACION Y LIMPIEZA                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//limpiar campos
function Clear() {

    /*Mostramos todo para poder trabajar sobre todos los campos y limpiarlos*/
    $("#TD_Estado1").show();
    $("#TD_Estado2").show();
    $("#TD_Estado3").show();

    $("#T_GrupoDocuments").show();
    $("#T_GrupoReportes").show();

    $("#TD_TypeAcceso1").css("width", "10.4%");
    $("#TD_TypeAcceso2").css("width", "18%");
    $("#TD_TypeAcceso2").css("padding-left", "0.1em");
    $("#TD_TypeAcceso3").css("padding-bottom", "25px");
    $("#TD_TypeAcceso3").css("width", "13%");

    $("#TD_Estado1").css("width", "6%");
    $("#TD_Estado2").css("width", "20%");
    $("#TD_Estado3").css("padding-bottom", "25px");
    $("#TD_Estado3").css("width", "23%");
    /*==== END MOSTRAR ====*/

    ResetError();

    $("#Select_EmpresaNit").prop('disabled', false); //No se agrega el trigger porque se hace al seleccionar el val
    $("#Select_EmpresaNit").val("-1").trigger("chosen:updated");
    $("#Select_EmpresaNit_2").val("-1").trigger("chosen:updated");
    $("#Txt_ID").val("");
    $("#TxtName").html("");
    $("#Select_TypeDocument").val("-1").trigger("chosen:updated");
    $("#TxtDocument").val("");
    $("#DDLRol").val("-1");
    $("#Select_Acces_Information").val("-1").trigger("chosen:updated");
    $("#Select_PolSegurGrupo").val("-1").trigger("chosen:updated");
    $("#Select_PoliticaSeguridad_U").empty().trigger("chosen:updated");
    $("#Select_AccesInfoDocument").val("-1").trigger("chosen:updated");
    $("#Select_AccessDocument").val("-1").trigger("chosen:updated");
    $("#Select_Grupo_Documentos_U").empty().trigger("chosen:updated");
    $("#SelectAccessInfoReports").val("-1").trigger("chosen:updated");
    $("#Select_AccessReports").val("-1").trigger("chosen:updated");
    $("#Select_GroupReports").empty().trigger("chosen:updated");
    $("#Select_TypeAccess").val("-1").trigger("chosen:updated");
    $("#Select_EstadoUser").val("-1").trigger("chosen:updated");
    $("#TXT_Token").val("");

    if (estado == "crear") {
        /*Ocultamos Campos que no se deben mostrar al Crear y resizamos los css para que se muestre correctamente*/
        $("#TD_Estado1").hide();
        $("#TD_Estado2").hide();
        $("#TD_Estado3").hide();

        $("#T_GrupoDocuments").hide();
        $("#T_GrupoReportes").hide();

        $("#TD_TypeAcceso1").css("width", "10.5%");
        $("#TD_TypeAcceso2").css("width", "18%");
        $("#TD_TypeAcceso2").css("padding-left", "0.1em");
        $("#TD_TypeAcceso3").css("padding-bottom", "25px");
        $("#TD_TypeAcceso3").css("width", "65%");
        /*==== END ====*/
    } else if (estado == "modificar") {
        /* Mostramos los campos que si se deben mostrar a la hora de actualizar*/
        $("#TD_Estado1").show();
        $("#TD_Estado2").show();
        $("#TD_Estado3").show();

        $("#TD_TypeAcceso1").css("width", "10.4%");
        $("#TD_TypeAcceso2").css("width", "18%");
        $("#TD_TypeAcceso2").css("padding-left", "0.1em");
        $("#TD_TypeAcceso3").css("padding-bottom", "25px");
        $("#TD_TypeAcceso3").css("width", "13%");

        $("#TD_Estado1").css("width", "6%");
        $("#TD_Estado2").css("width", "20%");
        $("#TD_Estado3").css("padding-bottom", "25px");
        $("#TD_Estado3").css("width", "23%");

        /*==== END ====*/
    }


    $("#TxtRead").val("");
    $("#DDLColumns").val("-1");

    $('.C_Chosen').trigger('chosen:updated');
    var OnlyEmpresa = VerificarNIT("Select_EmpresaNit");

    if (OnlyEmpresa == true) {
        TransaccionesSegunNIT($("#Select_EmpresaNit").val());
    }
}

//limpiar campos de consulta
function Clear_Detalle() {
    $("#Ver_EmpresaNit").html("");
    $("#Ver_EmpresaNit_2").html("");
    $("#Ver_ID").html("");
    $("#Ver_Name").html("");
    $("#Ver_TypeDocument").html("");
    $("#Ver_Document").html("");
    $("#Ver_Acces_Information").html("");
    $("#Ver_PolSegurGrupo").html("");
    $("#Ver_AccesInfoDocument").html("");
    $("#Ver_AccessDocument").html("");
    $("#Ver_AccessInfoReports").html("");
    $("#Ver_AccessReports").html("");
    $("#Ver_Token").html("");
    $("#Ver_TypeAccess").html("");
    $("#Ver_EstadoUser").html("");
    $("#Ver_Rol").html("");
    $("#Ver_PoliticaSeguridad_U").html("");
    $("#Ver_Grupo_Documentos_U").html("");
    $("#Ver_GroupReports").html("");
}

