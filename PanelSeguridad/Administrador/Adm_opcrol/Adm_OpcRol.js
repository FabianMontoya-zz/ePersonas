/*--------------- region de variables globales --------------------*/
var ArrayOpcRol = [];
var ArrayEmpresaNit = [];
var ArrayCombo = [];
var ArrayComboSubRol = [];
var ArrayComboLinks = [];
var estado;
var editID;
var editID_Nit_ID;
var editNIT;
var EditLink;
var editConsecutivo;
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {

    $("#Marco_trabajo_Form").css("height", "490px");
    $("#container_TopcRol").css("height", "380px");

    /*Llamado de metodos para ocultar elementos al inicio de la operación de la pantalla*/
    Ventanas_Emergentes(); //Ventanas_Emergentes Va primero pues es la que llama al load de espera al inicio de los AJAX
    Ocultar_Errores();
    Ocultar_Tablas();
    /*================== FIN LLAMADO INICIAL DE METODOS DE INICIALIZACIÓN ==============*/
    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
    transacionAjax_EmpresaNit('Cliente'); //Carga Droplist de Empresa NIT    

    Change_DDLTipo();
    Change_Select_Nit();

    
});

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

//Función que oculta todas las IMG de los errores en pantalla
function Ocultar_Errores() {
    ResetError();
    $("#ESelect").css("display", "none");
    $("#DE").css("display", "none");
    $("#DS").css("display", "none");
    /*Los demás se ocultan en la SASIF Master*/
}

//Función que oculta las tablas
function Ocultar_Tablas() {
    $("#TablaDatos_D").css("display", "none");
    $("#TablaConsulta").css("display", "none");
}

//fucion que carga desde ddl tipo que tipo es(carpeta o link)
function loadChildrenlinks(obj) {
    var tipo_link = $(obj).val();
    $("#DDLLink_ID").empty();
    transacionAjax_CargaLinks('cargar_Links', tipo_link);
}

//habilita el panel de crear o consulta
function HabilitarPanel(opcion) {

    switch (opcion) {

        case "crear":
            $("#TablaDatos_D").css("display", "inline-table");
            $("#TablaConsulta").css("display", "none");
            $("#DDL_ID").removeAttr("disabled");
            $("#TxtConsecutivo").removeAttr("disabled");
            $("#Btnguardar").attr("value", "Guardar");
            estado = opcion;
            ResetError();
            Clear();

            var OnlyEmpresa = VerificarNIT("Select_EmpresaNit");

            if (OnlyEmpresa == true) {
                TransaccionesSegunNIT($("#Select_EmpresaNit").val());
            }

            break;

        case "buscar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TopcRol").html("");
            estado = opcion;
            ResetError();
            Clear();
            break;
                   
        case "eliminar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TopcRol").html("");
            estado = opcion;
            ResetError();
            Clear();
            break;

    }
}

//consulta del del crud(READ)
function BtnConsulta() {

    var filtro;
    var ValidateSelect = ValidarDroplist();
    var opcion;

    OpenControl();

    if (ValidateSelect == 1) {
        filtro = "N";
        opcion = "ALL";
        transacionAjax_opcRol("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_opcRol("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_opcRol_create("crear");
        }
        else {
            transacionAjax_opcRol_create("modificar");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    transacionAjax_opcRol_delete("elimina");
}

//validamos campos para la creacion del link
function validarCamposCrear() {

    var NIT = $("#Select_EmpresaNit").val(); //ImgNIT
    var valID = $("#DDL_ID").val();
    var consecutivo = $("#TxtConsecutivo").val();
    var tipo = $("#DDLTipo").val();
    var sub_rol = $("#DDLSubRol_Rol").val();
    var link = $("#DDLLink_ID").val();

    var validar = 0;

    if (NIT == "-1" || NIT == null || tipo == "-1" || tipo == null || sub_rol == "-1" || sub_rol == null || link == "-1" || link == null ||
        consecutivo == "" || valID == "-1" || valID == null) {
        validar = 1;
        /* -- Muestra de errores según dato faltante -- */
        if (NIT == "-1" || NIT == null) {
            $("#ImgNIT").css("display", "inline-table");
        } else {
            $("#ImgNIT").css("display", "none");
        }
        //
        if (valID == "-1" || valID == null) {
            $("#ImgID").css("display", "inline-table");
        }
        else {
            $("#ImgID").css("display", "none");
        }
        //
        if (tipo == "-1" || tipo == null) {
            $("#Img2").css("display", "inline-table");
        }
        else {
            $("#Img2").css("display", "none");
        }
        //
        if (sub_rol == "-1" || sub_rol == null) {
            $("#Img3").css("display", "inline-table");
        }
        else {
            $("#Img3").css("display", "none");
        }
        //
        if (link == "-1" || link == null) {
            $("#Img5").css("display", "inline-table");
        }
        else {
            $("#Img5").css("display", "none");
        }
        //
        if (consecutivo == "") {
            $("#Img1").css("display", "inline-table");
        }
        else {
            $("#Img1").css("display", "none");
        }
    }
    else {
        Ocultar_Errores();
    }
    return validar;
}

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

// crea la tabla en el cliente
function Table_opcRol() {

    var html_Topcrol;

    switch (estado) {

        case "buscar":
            html_Topcrol = "<table id='TOpcRol' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>NIT Empresa</th><th style='white-space: nowrap;'>NIT Empresa Código</th><th>Código</th><th>Consecutivo</th><th>Tipo</th><th style='white-space: nowrap;'>NIT Empresa Sub-Rol/Rol</th><th style='white-space: nowrap;'>Sub-Rol/Rol</th><th>Llave Tabla Links</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Usuario Actualización</th><th>Fecha Última Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayOpcRol) {
                html_Topcrol += "<tr id= 'TOpcRol_" + ArrayOpcRol[itemArray].Index + "'><td>" + ArrayOpcRol[itemArray].Nit_ID + "</td><td>" + ArrayOpcRol[itemArray].OPRol_Nit_ID + "</td><td>" + ArrayOpcRol[itemArray].OPRol_ID + "</td><td>" + ArrayOpcRol[itemArray].Consecutivo + "</td><td style='white-space: nowrap;'>" + ArrayOpcRol[itemArray].Tipo + "</td><td>" + ArrayOpcRol[itemArray].Subrol_rol_Nit_ID + "</td><td>" + ArrayOpcRol[itemArray].Subrol_rol + "</td><td> " + ArrayOpcRol[itemArray].Link_ID + " </td><td style='white-space: nowrap;'> " + ArrayOpcRol[itemArray].UsuarioCreacion + " </td><td  style='white-space: nowrap;'> " + ArrayOpcRol[itemArray].FechaCreacion + " </td><td style='white-space: nowrap;'> " + ArrayOpcRol[itemArray].UsuarioActualizacion + " </td><td  style='white-space: nowrap;'> " + ArrayOpcRol[itemArray].FechaActualizacion + " </td></tr>";
            }
            break;
   
        case "eliminar":
            var html_Topcrol = "<table id='TOpcRol' border='1' cellpadding='1' cellspacing='1' style='width: 100%'><thead><tr><th>Eliminar</th><th>NIT Empresa</th><th style='white-space: nowrap;'>NIT Empresa Código</th><th>Código</th><th>Consecutivo</th><th>Tipo</th><th style='white-space: nowrap;'>NIT Empresa Sub-Rol/Rol</th><th style='white-space: nowrap;'>Sub-Rol/Rol</th><th>Llave Tabla Links</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Usuario Actualización</th><th>Fecha Última Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayOpcRol) {

                html_Topcrol += "<tr id= 'TOpcRol_" + ArrayOpcRol[itemArray].Index + "'><td style='white-space: nowrap;'><span class='cssToolTip_ver'><img  src='../../images/Delete.png' width='23px' height='23px' class= 'Eliminar' name='eliminar' onmouseover=\"this.src='../../images/DeleteOver.png';\" onmouseout=\"this.src='../../images/Delete.png';\" onclick=\"Eliminar('" + ArrayOpcRol[itemArray].Index + "')\"></img><span>Eliminar Opción Perfil</span></span></td><td>" + ArrayOpcRol[itemArray].Nit_ID + "</td><td>" + ArrayOpcRol[itemArray].OPRol_Nit_ID + "</td><td>" + ArrayOpcRol[itemArray].OPRol_ID + "</td><td>" + ArrayOpcRol[itemArray].Consecutivo + "</td><td>" + ArrayOpcRol[itemArray].Tipo + "</td><td>" + ArrayOpcRol[itemArray].Subrol_rol_Nit_ID + "</td><td>" + ArrayOpcRol[itemArray].Subrol_rol + "</td><td> " + ArrayOpcRol[itemArray].Link_ID + " </td><td style='white-space: nowrap;'> " + ArrayOpcRol[itemArray].UsuarioCreacion + " </td><td  style='white-space: nowrap;'> " + ArrayOpcRol[itemArray].FechaCreacion + " </td><td style='white-space: nowrap;'> " + ArrayOpcRol[itemArray].UsuarioActualizacion + " </td><td  style='white-space: nowrap;'> " + ArrayOpcRol[itemArray].FechaActualizacion + " </td></tr>";
            }
            break;
    }

    html_Topcrol += "</tbody></table>";
    $("#container_TopcRol").html("");
    $("#container_TopcRol").html(html_Topcrol);

    $("#TOpcRol").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Eliminar(index_consecutivo) {

    for (itemArray in ArrayOpcRol) {
        if (ArrayOpcRol[itemArray].Index == index_consecutivo) {
            editNIT = ArrayOpcRol[itemArray].Nit_ID;
            editID_Nit_ID = ArrayOpcRol[itemArray].OPRol_Nit_ID;
            editID = ArrayOpcRol[itemArray].OPRol_ID;
            editConsecutivo = ArrayOpcRol[itemArray].Consecutivo;
            $("#dialog_eliminar").dialog("option", "title", "¿Desea Eliminar?");
            $("#dialog_eliminar").dialog("open");
        }
    }

}

//evento del boton salir
function x() {
    $("#dialog").dialog("close");
}

//limpiar campos
function Clear() {
    Ocultar_Errores();
    $("#Select_EmpresaNit").prop('disabled', false); //No se agrega el trigger porque se hace al seleccionar el val
    $("#Select_EmpresaNit").val("-1").trigger("chosen:updated");
    $("#DDL_ID").val("-1");
    $("#DDL_ID").empty().trigger("chosen:updated");
    $("#TxtConsecutivo").val("");
    $("#DDLTipo").val("-1");
    $("#DDLSubRol_Rol").val("-1");
    $("#DDLSubRol_Rol").empty().trigger("chosen:updated");
    $("#DDLLink_ID").val("-1");
    $("#DDLLink_ID").empty().trigger("chosen:updated");
    $("#TxtRead").val("");
    $("#DDLColumns").val("-1");

    $('.C_Chosen').trigger('chosen:updated');

}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                     PROCESOS DE CHANGES EN CONTROLES                                                                                                                                        ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

function Change_Select_Nit() {
    $("#Select_EmpresaNit").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_EmpresaNit").val() == "-1") {
            $("#ImgNIT").css("display", "inline-table");
        } else {
            OpenControl();
            $("#ImgNIT").css("display", "none");
            $("#Select_EmpresaNit").prop('disabled', true).trigger("chosen:updated");
        }
        index_NIT_ID = this.value;
        TransaccionesSegunNIT(index_NIT_ID);
    });
}

function TransaccionesSegunNIT(index_NIT_ID) {
    if (index_NIT_ID != "-1") {
        transacionAjax_CargaRol('Carga_Rol', index_NIT_ID);
    }
}

//funcion que dispara elcombo del tipo
function Change_DDLTipo() {
    $("#DDLTipo").change(function () {
        var Seleccion = $("#DDLTipo").val();
        if (Seleccion != "-1") {
            OpenControl();
            ArrayComboLinks = [];
            loadChildrenlinks($(this));
        } else {
            $("#DDLLink_ID").empty().trigger("chosen:updated");
            ArrayComboLinks = [];
        }
    });
}