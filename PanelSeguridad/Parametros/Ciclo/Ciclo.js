/*--------------- region de variables globales --------------------*/ArrayCiclo
var ArrayCiclo = [];
var ArrayCombo = [];
var estado;
var editID;
var editNIT;
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {

    /*Llamado de metodos para ocultar elementos al inicio de la operación de la pantalla*/
    Ventanas_Emergentes(); //Ventanas_Emergentes Va primero pues es la que llama al load de espera al inicio de los AJAX
    Ocultar_Errores();
    Ocultar_Tablas();
    Picker_Fechas();
    /*==================FIN LLAMADO INICIAL DE METODOS DE INICIALIZACIÓN==============*/

    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');

});

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                 REGION INICIO DE COMPONENTES                                                                                                    ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//Función que oculta todas las IMG de los errores en pantalla
function Ocultar_Errores() {
    ResetError();
    $("#ESelect").css("display", "none");
    $("#DE").css("display", "none");
    $("#DS").css("display", "none");
    /*Se ocultan en la SASIF Master*/
}

//funcion para las ventanas emergentes
function Ventanas_Emergentes() {

    Load_Charge_Sasif(); //Carga de "SasifMaster.js" el ContCiclo de Carga

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
}

//Función de control del picker de las fechas
function Picker_Fechas() {
    $("#TxtFechaCorte").datepicker({ dateFormat: 'yy-mm-dd', dialogClass: "Dialog_Sasif" });
    $("#TextFechaPago").datepicker({ dateFormat: 'yy-mm-dd', dialogClass: "Dialog_Sasif" });
    Change_FechaCorte();
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
        transacionAjax_Ciclo("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_Ciclo("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_Ciclo_create("crear");
        }
        else {
            transacionAjax_Ciclo_create("modificar");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    transacionAjax_Ciclo_delete("elimina");
}

//evento del boton salir
function x() {
    $("#dialog").dialog("close");
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                      REGION VALIDACIONES DEL PROCESO                                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//validamos campos para la creacion del Ciclo
function validarCamposCrear() {

    var vl_Campo_1 = $("#Txt_ID").val(); //ImgID
    var vl_Campo_2 = $("#TxtDescription").val(); //Img1
    var vl_Campo_3 = $("#TxtFechaCorte").val(); //Img2
    var vl_Campo_4 = $("#TextFechaPago").val(); //Img3
    var validar = 0;

    if (vl_Campo_1 == "" ||
        vl_Campo_2 == "" ||
        vl_Campo_3 == "" ||
        vl_Campo_4 == "") {
        validar = 1;

        if (vl_Campo_1 == "") { $("#ImgID").css("display", "inline-table"); } else { $("#ImgID").css("display", "none"); }
        if (vl_Campo_2 == "") { $("#Img1").css("display", "inline-table"); } else { $("#Img1").css("display", "none"); }
        if (vl_Campo_3 == "") { $("#Img2").css("display", "inline-table"); } else { $("#Img2").css("display", "none"); }
        if (vl_Campo_4 == "") { $("#Img3").css("display", "inline-table"); } else { $("#Img3").css("display", "none"); }
    }
    else {
        ResetError();
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

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                      PROCESOS DE VALIDACION Y GRID CICLOS                                                                                                              ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//habilita el panel de crear o consulta
function HabilitarPanel(opcion) {

    switch (opcion) {

        case "crear":
            $("#TablaDatos").css("display", "inline-table");
            $("#TablaConsulta").css("display", "none");
            $("#Txt_ID").removeAttr("disabled");
            $("#Btnguardar").attr("value", "Guardar");
            ResetError();
            Clear();
            estado = opcion;
            break;

        case "buscar":
            $("#TablaDatos").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $(".container_TGrid").html("");
            estado = opcion;
            Clear();
            break;

        case "modificar":
            $("#TablaDatos").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $(".container_TGrid").html("");
            estado = opcion;
            ResetError();
            Clear();
            break;

        case "eliminar":
            $("#TablaDatos").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $(".container_TGrid").html("");
            estado = opcion;
            Clear();
            break;

    }
}

//Función que detecta el change del TXT de la fecha inicial
function Change_FechaCorte() {
    $("#TxtFechaCorte").change(function () {
        $("#TextFechaPago").val("");
        var dateFormat = 'yy-mm-dd';
        var date = $.datepicker.parseDate(dateFormat, $("#TxtFechaCorte").val());
        $("#TextFechaPago").datepicker({ dateFormat: 'yy-mm-dd', changeYear: true, changeMonth: true }); //Inicializa Datapicker
        $("#TextFechaPago").datepicker("option", "minDate", date);
        $("#TextFechaPago").datepicker("option", "yearRange", "+0:+3");
        $("#TextFechaPago").css("display", "inline-table");
    });
}

// crea la tabla en el cliente
function Table_Ciclo() {

    var html_TCiclo;
    var vl_Index_Ciclo;

    switch (estado) {

        case "buscar":
            html_TCiclo = "<table id='TCiclo' border='1'  cellpadding='1' cellspacing='1' style='width: 100%'><thead><tr><th>Código</th><th>Descripción</th><th>Fecha de Corte</th><th>Fecha de Pago</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Usuario Actualización</th><th>Fecha Última Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayCiclo) {
                vl_Index_Ciclo = parseInt(ArrayCiclo[itemArray].Index) - 1;
                html_TCiclo += "<tr id= 'TCiclo_" + vl_Index_Ciclo + "'><td>" + ArrayCiclo[itemArray].ID_Ciclo + "</td><td>" + ArrayCiclo[itemArray].Descripcion + "</td><td>" + ArrayCiclo[itemArray].Fecha_Corte + "</td><td>" + ArrayCiclo[itemArray].Fecha_Pago + "</td><td style='white-space: nowrap;'> " + ArrayCiclo[itemArray].UsuarioCreacion + " </td><td  style='white-space: nowrap;'> " + ArrayCiclo[itemArray].FechaCreacion + " </td><td style='white-space: nowrap;'> " + ArrayCiclo[itemArray].UsuarioActualizacion + " </td><td  style='white-space: nowrap;'> " + ArrayCiclo[itemArray].FechaActualizacion + " </td></tr>";
            }
            break;

        case "modificar":
            html_TCiclo = "<table id='TCiclo' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Editar</th><th>Código</th><th>Descripción</th><th>Fecha de Corte</th><th>Fecha de Pago</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Usuario Actualización</th><th>Fecha Última Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayCiclo) {
                vl_Index_Ciclo = parseInt(ArrayCiclo[itemArray].Index) - 1;
                html_TCiclo += "<tr id= 'TCiclo_" + vl_Index_Ciclo + "'><td><span class='cssToolTip_ver'><img  src='../../images/Editar1.png' width='23px' height='23px' class= 'Editar' name='editar' onmouseover=\"this.src='../../images/EditarOver.png';\" onmouseout=\"this.src='../../images/Editar1.png';\" onclick=\"Editar('" + vl_Index_Ciclo + "')\"></img><span>Editar Ciclo</span></span></td><td>" + ArrayCiclo[itemArray].ID_Ciclo + "</td><td style='white-space: nowrap;'>" + ArrayCiclo[itemArray].Descripcion + "</td><td style='white-space: nowrap;'>" + ArrayCiclo[itemArray].Fecha_Corte + "</td><td style='white-space: nowrap;'>" + ArrayCiclo[itemArray].Fecha_Pago + "</td><td style='white-space: nowrap;'> " + ArrayCiclo[itemArray].UsuarioCreacion + " </td><td  style='white-space: nowrap;'> " + ArrayCiclo[itemArray].FechaCreacion + " </td><td style='white-space: nowrap;'> " + ArrayCiclo[itemArray].UsuarioActualizacion + " </td><td  style='white-space: nowrap;'> " + ArrayCiclo[itemArray].FechaActualizacion + " </td></tr>";
            }
            break;

        case "eliminar":
            html_TCiclo = "<table id='TCiclo' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Código</th><th>Descripción</th><th>Fecha de Corte</th><th>Fecha de Pago</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Usuario Actualización</th><th>Fecha Última Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayCiclo) {
                if (ArrayCiclo[itemArray].Estado != 2) {
                    vl_Index_Ciclo = parseInt(ArrayCiclo[itemArray].Index) - 1;
                    html_TCiclo += "<tr id= 'TCiclo_" + vl_Index_Ciclo + "'><td><span class='cssToolTip_ver'><img  src='../../images/Delete.png' width='23px' height='23px' class= 'Eliminar' name='eliminar' onmouseover=\"this.src='../../images/DeleteOver.png';\" onmouseout=\"this.src='../../images/Delete.png';\" onclick=\"Eliminar('" + vl_Index_Ciclo + "')\"></img><span>Eliminar Ciclo</span></span></td><td>" + ArrayCiclo[itemArray].ID_Ciclo + "</td><td style='white-space: nowrap;'>" + ArrayCiclo[itemArray].Descripcion + "</td><td style='white-space: nowrap;'>" + ArrayCiclo[itemArray].Fecha_Corte + "</td><td style='white-space: nowrap;'>" + ArrayCiclo[itemArray].Fecha_Pago + "</td><td style='white-space: nowrap;'> " + ArrayCiclo[itemArray].UsuarioCreacion + " </td><td  style='white-space: nowrap;'> " + ArrayCiclo[itemArray].FechaCreacion + " </td><td style='white-space: nowrap;'> " + ArrayCiclo[itemArray].UsuarioActualizacion + " </td><td  style='white-space: nowrap;'> " + ArrayCiclo[itemArray].FechaActualizacion + " </td></tr>";
                }
            }
            break;
    }

    html_TCiclo += "</tbody></table>";
    $(".container_TGrid").html("");
    $(".container_TGrid").html(html_TCiclo);

    $("#TCiclo").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Eliminar(vp_Index) {
    editID = ArrayCiclo[vp_Index].ID_Ciclo;
    $("#dialog_eliminar").dialog("option", "title", "¿Cambiar Estado a Perfil?");
    $("#dialog_eliminar").dialog("open");

}

// muestra el registro a editar
function Editar(vp_Index) {

    $("#TablaDatos").css("display", "inline-table");
    $("#TablaConsulta").css("display", "none");

    $("#Txt_ID").val(ArrayCiclo[vp_Index].ID_Ciclo);
    $("#TxtFechaCorte").val(ArrayCiclo[vp_Index].Fecha_Corte);
    editID = ArrayCiclo[vp_Index].ID_Ciclo;

    $("#Txt_ID").attr("disabled", "disabled");
    $("#TxtFechaCorte").prop('disabled', true);
    $("#TxtDescription").val(ArrayCiclo[vp_Index].Descripcion);
    $("#TextFechaPago").val(ArrayCiclo[vp_Index].Fecha_Pago);
    $("#Btnguardar").attr("value", "Actualizar");

}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                              MENSAJES, VISUALIZACION Y LIMPIEZA                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//limpiar campos
function Clear() {

    $("#Txt_ID").val("");
    $("#TxtFechaCorte").prop('disabled', false);
    $("#TxtDescription").val("");
    $("#TxtSigla").val("");
    $("#TxtRead").val("");
    $("#DDLColumns").val("-1");
    $("#TxtFechaCorte").val("");
    $("#TextFechaPago").val("");
    $('.C_Chosen').trigger('chosen:updated');
}

