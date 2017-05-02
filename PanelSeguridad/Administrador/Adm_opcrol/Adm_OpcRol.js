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
      
    /*Llamado de metodos para ocultar elementos al inicio de la operación de la pantalla*/
    Ventanas_Emergentes(); //Ventanas_Emergentes Va primero pues es la que llama al load de espera al inicio de los AJAX
    Ocultar_Errores();
    Ocultar_Tablas();
    /*================== FIN LLAMADO INICIAL DE MÉTODOS DE INICIALIZACIÓN ==============*/
    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
    transacionAjax_EmpresaNit('Cliente'); //Carga Droplist de Empresa NIT    
    transacionAjax_CargaLinks('cargar_Links');

    Change_DDLTipo();
    Change_Select_Nit();
    Change_Select_Nit_2();

});

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                 REGION INICIO DE COMPONENTES                                                                                                    ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
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
    $("#T_NIT_2").css("display", "none");
    $("#Tabla_3").css("display", "none");
    $("#Tabla_5").css("display", "none");
    $("#ImgNIT_2").css("display", "none");
    /*Los demás se ocultan en la SASIF Master*/
}

//Función que oculta las tablas
function Ocultar_Tablas() {
    $(".Dialog_Datos").css("display", "none");
    $("#TablaConsulta").css("display", "none");
}

//habilita el panel de crear o consulta
function HabilitarPanel(opcion) {

    switch (opcion) {

        case "crear":
            $(".Dialog_Datos").css("display", "inline-table");
            $("#TablaConsulta").css("display", "none");
            $("#DDL_Padre").removeAttr("disabled");
            $("#TxtConsecutivo").removeAttr("disabled");
            $("#Btnguardar").attr("value", "Guardar");
            estado = opcion;
            ResetError();
            Clear();

            var OnlyEmpresa = VerificarNIT("Select_EmpresaNit");

            if (OnlyEmpresa == true) {
                TransaccionesSegunNIT($("#Select_EmpresaNit").val(), "P");
            }

            break;

        case "buscar":
            $(".Dialog_Datos").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $(".container_TGrid").html("");
            estado = opcion;
            ResetError();
            Clear();
            break;

        case "eliminar":
            $(".Dialog_Datos").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $(".container_TGrid").html("");
            estado = opcion;
            ResetError();
            Clear();
            break;

    }
}
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                 REGION BOTONES                                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//consulta del del crud(READ)
function BtnConsulta() {

    var filtro;
    var ValidateSelect = ValidarDroplist();
    var opcion;

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

//evento del boton salir
function x() {
    $("#dialog").dialog("close");
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                      REGION VALIDACIONES DEL PROCESO                                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//validamos campos para la creacion del link
function validarCamposCrear() {

    var vl_C_Nit_Padre = $("#Select_EmpresaNit").val(); //ImgNIT
    var vl_C_Padre = $("#DDL_Padre").val();
    var vl_C_Concecutivo = $("#TxtConsecutivo").val();
    var vl_C_Tipo = $("#DDLTipo").val();
    var vl_C_Nit_Hijo = $("#Select_EmpresaNit_2").val(); //ImgNIT_2
    var vl_C_Hijo = $("#DDL_Hijo").val();
    var vl_C_Link = $("#DDLLink_ID").val();

    var vl_Validar = 0;

    if (vl_C_Tipo == "1") {

        if (vl_C_Nit_Padre == "-1" || vl_C_Nit_Padre == null ||
       vl_C_Padre == "-1" || vl_C_Padre == null ||
       vl_C_Concecutivo == "" ||
       vl_C_Tipo == "-1" || vl_C_Tipo == null ||
       vl_C_Nit_Hijo == "-1" || vl_C_Nit_Hijo == null ||
       vl_C_Hijo == "-1" || vl_C_Hijo == null
       ) {
            vl_Validar = 1;
            /* -- Muestra de errores según dato faltante -- */
            if (vl_C_Nit_Padre == "-1" || vl_C_Nit_Padre == null) { $("#ImgNIT").css("display", "inline-table"); } else { $("#ImgNIT").css("display", "none"); }
            if (vl_C_Padre == "-1" || vl_C_Padre == null) { $("#ImgID").css("display", "inline-table"); } else { $("#ImgID").css("display", "none"); }
            if (vl_C_Concecutivo == "") { $("#Img1").css("display", "inline-table"); } else { $("#Img1").css("display", "none"); }
            if (vl_C_Tipo == "-1" || vl_C_Tipo == null) { $("#Img2").css("display", "inline-table"); } else { $("#Img2").css("display", "none"); }
            if (vl_C_Nit_Hijo == "-1" || vl_C_Nit_Hijo == null) { $("#ImgNIT_2").css("display", "inline-table"); } else { $("#ImgNIT_2").css("display", "none"); }
            if (vl_C_Hijo == "-1" || vl_C_Hijo == null) { $("#Img3").css("display", "inline-table"); } else { $("#Img3").css("display", "none"); }
        }
        else {
            Ocultar_Errores();
        }
    }
    else {
        if (vl_C_Nit_Padre == "-1" || vl_C_Nit_Padre == null ||
      vl_C_Padre == "-1" || vl_C_Padre == null ||
      vl_C_Concecutivo == "" ||
      vl_C_Tipo == "-1" || vl_C_Tipo == null ||
      vl_C_Link == "-1" || vl_C_Link == null
      ) {
            vl_Validar = 1;
            /* -- Muestra de errores según dato faltante -- */
            if (vl_C_Nit_Padre == "-1" || vl_C_Nit_Padre == null) { $("#ImgNIT").css("display", "inline-table"); } else { $("#ImgNIT").css("display", "none"); }
            if (vl_C_Padre == "-1" || vl_C_Padre == null) { $("#ImgID").css("display", "inline-table"); } else { $("#ImgID").css("display", "none"); }
            if (vl_C_Concecutivo == "") { $("#Img1").css("display", "inline-table"); } else { $("#Img1").css("display", "none"); }
            if (vl_C_Tipo == "-1" || vl_C_Tipo == null) { $("#Img2").css("display", "inline-table"); } else { $("#Img2").css("display", "none"); }
            if (vl_C_Link == "-1" || vl_C_Link == null) { $("#Img5").css("display", "inline-table"); } else { $("#Img5").css("display", "none"); }
        }
        else {
            Ocultar_Errores();
        }
    }
    return vl_Validar;
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

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                  TABLA DE OPCION ROLES                                                                                  ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
// crea la tabla en el cliente
function Table_opcRol() {

    var html_Topcrol;
    var vl_descripcion;
    switch (estado) {

        case "buscar":
            html_Topcrol = "<table id='TOpcRol' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>NIT Empresa Padre</th><th>Padre</th><th>Consecutivo</th><th>Tipo</th><th style='white-space: nowrap;'>NIT Empresa Hijo</th><th style='white-space: nowrap;'>Hijo</th><th>Pagina de Referencia</th><th>Usuario Creación</th><th>Fecha Creación</th></tr></thead><tbody>";
            for (itemArray in ArrayOpcRol) {

                if (ArrayOpcRol[itemArray].DescripPagina != "") {
                    vl_descripcion = ArrayOpcRol[itemArray].Link_ID + " - " + ArrayOpcRol[itemArray].DescripPagina;
                }
                else {
                    vl_descripcion = ArrayOpcRol[itemArray].Link_ID + " - " + ArrayOpcRol[itemArray].DescripRol;
                }
                html_Topcrol += "<tr id= 'TOpcRol_" + ArrayOpcRol[itemArray].Index + "'><td>" + ArrayOpcRol[itemArray].Nit_ID + "</td><td>" + ArrayOpcRol[itemArray].OPRol_ID + "</td><td>" + ArrayOpcRol[itemArray].Consecutivo + "</td><td style='white-space: nowrap;'>" + ArrayOpcRol[itemArray].Tipo + " - " + ArrayOpcRol[itemArray].DescripTipo + "</td><td>" + ArrayOpcRol[itemArray].Subrol_rol_Nit_ID + "</td><td>" + ArrayOpcRol[itemArray].Subrol_rol + "</td><td> " + vl_descripcion + " </td><td style='white-space: nowrap;'> " + ArrayOpcRol[itemArray].UsuarioCreacion + " </td><td  style='white-space: nowrap;'> " + ArrayOpcRol[itemArray].FechaCreacion + " </td></tr>";
            }
            break;

        case "eliminar":
            var html_Topcrol = "<table id='TOpcRol' border='1' cellpadding='1' cellspacing='1' style='width: 100%'><thead><tr><th>Eliminar</th><th>NIT Empresa Padre</th><th>Padre</th><th>Consecutivo</th><th>Tipo</th><th style='white-space: nowrap;'>NIT Empresa Hijo</th><th style='white-space: nowrap;'>Hijo</th><th>Pagina de Referencia</th><th>Usuario Creación</th><th>Fecha Creación</th></tr></thead><tbody>";
            for (itemArray in ArrayOpcRol) {

                if (ArrayOpcRol[itemArray].DescripPagina != "") {
                    vl_descripcion = ArrayOpcRol[itemArray].Link_ID + " - " + ArrayOpcRol[itemArray].DescripPagina;
                }
                else {
                    vl_descripcion = ArrayOpcRol[itemArray].Link_ID + " - " + ArrayOpcRol[itemArray].DescripRol;
                }
                html_Topcrol += "<tr id= 'TOpcRol_" + ArrayOpcRol[itemArray].Index + "'><td style='white-space: nowrap;'><span class='cssToolTip_ver'><img  src='../../images/Delete.png' width='23px' height='23px' class= 'Eliminar' name='eliminar' onmouseover=\"this.src='../../images/DeleteOver.png';\" onmouseout=\"this.src='../../images/Delete.png';\" onclick=\"Eliminar('" + ArrayOpcRol[itemArray].Index + "')\"></img><span>Eliminar Opción Perfil</span></span></td><td>" + ArrayOpcRol[itemArray].Nit_ID + "</td><td>" + ArrayOpcRol[itemArray].OPRol_ID + "</td><td>" + ArrayOpcRol[itemArray].Consecutivo + "</td><td>" + ArrayOpcRol[itemArray].Tipo + " - " + ArrayOpcRol[itemArray].DescripTipo + "</td><td>" + ArrayOpcRol[itemArray].Subrol_rol_Nit_ID + "</td><td>" + ArrayOpcRol[itemArray].Subrol_rol + "</td><td> " + vl_descripcion + " </td><td style='white-space: nowrap;'> " + ArrayOpcRol[itemArray].UsuarioCreacion + " </td><td  style='white-space: nowrap;'> " + ArrayOpcRol[itemArray].FechaCreacion + " </td></tr>";
            }
            break;
    }

    html_Topcrol += "</tbody></table>";
    $(".container_TGrid").html("");
    $(".container_TGrid").html(html_Topcrol);

    $("#TOpcRol").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Eliminar(index) {
    index = parseInt(index) - 1;
    editNIT = ArrayOpcRol[index].Nit_ID;
    editID = ArrayOpcRol[index].OPRol_ID;
    editConsecutivo = ArrayOpcRol[index].Consecutivo;
    $("#dialog_eliminar").dialog("option", "title", "¿Desea Eliminar?");
    $("#dialog_eliminar").dialog("open");
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
        }
        var vl_index_NIT_ID = this.value;
        TransaccionesSegunNIT(vl_index_NIT_ID, "P");
    });
}

function Change_Select_Nit_2() {
    $("#Select_EmpresaNit_2").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_EmpresaNit_2").val() == "-1") {
            $("#ImgNIT_2").css("display", "inline-table");
        } else {
            $("#ImgNIT_2").css("display", "none");
        }
        vl_index_NIT_ID = this.value;
        TransaccionesSegunNIT(vl_index_NIT_ID, "H");
    });
}

function TransaccionesSegunNIT(vp_index_NIT_ID, vp_Type) {
    if (vp_index_NIT_ID != "-1") {
        transacionAjax_CargaRol('Carga_Rol', vp_index_NIT_ID, vp_Type);
    }
}

//funcion que dispara elcombo del tipo
function Change_DDLTipo() {
    $("#DDLTipo").change(function () {
        var Seleccion = $(this).val();

        switch (Seleccion) {
            case "1":
                $("#T_NIT_2").css("display", "inline-table");
                $("#Tabla_3").css("display", "inline-table");
                $("#Tabla_5").css("display", "none");
                break;

            case "2":
                $("#T_NIT_2").css("display", "none");
                $("#Tabla_3").css("display", "none");
                $("#Tabla_5").css("display", "inline-table");
                break;

            case "-1":
                $("#T_NIT_2").css("display", "none");
                $("#Tabla_3").css("display", "none");
                $("#Tabla_5").css("display", "none");
                break;

        }
    });
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                              MENSAJES, VISUALIZACION Y LIMPIEZA                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//limpiar campos
function Clear() {
    Ocultar_Errores();
    $("#Select_EmpresaNit").prop('disabled', false); //No se agrega el trigger porque se hace al seleccionar el val
    $("#Select_EmpresaNit").val("-1").trigger("chosen:updated");
    $("#DDL_Padre").val("-1");
   // $("#DDL_Padre").empty().trigger("chosen:updated");
    $("#TxtConsecutivo").val("");
    $("#DDLTipo").val("-1");
    $("#DDL_Hijo").val("-1");
   // $("#DDL_Hijo").empty().trigger("chosen:updated");
    $("#DDLLink_ID").val("-1");
    $("#TxtRead").val("");
    $("#DDLColumns").val("-1");

    $('.C_Chosen').trigger('chosen:updated');

    var OnlyEmpresa = VerificarNIT("Select_EmpresaNit");

    if (OnlyEmpresa == true) {
        TransaccionesSegunNIT($("#Select_EmpresaNit").val(), "P");
    }

}
