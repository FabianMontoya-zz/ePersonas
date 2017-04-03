/*--------------- region de variables globales --------------------*/
var Matrix_Direcciones = [];
var ArraySucursales = [];
var ArrayEmpresaNit = [];
var ArrayCombo = [];
var estado;
var editID;
var editNIT;
var Nit_ID_proccess;

/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {

    $("#Marco_trabajo_Form").css("height", "490px");

    /*Llamado de metodos para ocultar elementos al inicio de la operación de la pantalla*/
    Ventanas_Emergentes(); //Ventanas_Emergentes Va primero pues es la que llama al load de espera al inicio de los AJAX
    Ocultar_Errores();
    Ocultar_Tablas();
    /*==================FIN LLAMADO INICIAL DE METODOS DE INICIALIZACIÓN==============*/

    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
    transacionAjax_EmpresaNit('Cliente');

    Change_Select_Nit();

});

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                 REGION INICIO DE COMPONENTES                                                                                                    ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//Función que oculta todas las IMG de los errores en pantalla
function Ocultar_Errores() {
    ResetError();
    $("#ESelect").css("display", "none");
    $("#ImgDirec").css("display", "none");
    $("#ImgCal").css("display", "none");
    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WA").css("display", "none");
}

//funcion para las ventanas emergentes
function Ventanas_Emergentes() {

    Load_Charge_Sasif(); //Carga de "SasifMaster.js" el ContSucursal de Carga

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
        transacionAjax_Sucursal("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_Sucursal("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_Sucursal_create("crear");
        }
        else {
            transacionAjax_Sucursal_create("modificar");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    transacionAjax_Sucursal_delete("elimina");
}

//evento del boton salir
function x() {
    $("#dialog").dialog("close");
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                      REGION VALIDACIONES DEL PROCESO                                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//validamos campos para la creacion del Sucursal
function validarCamposCrear() {

    var validar = 0;
    var vl_Campo_1 = $("#Select_EmpresaNit").val(); //ImgNIT
    var vl_Campo_2 = $("#Txt_ID").val();
    var vl_Campo_3 = $("#TxtDescription").val();
    var vl_Campo_4 = $("#Select_Direccion").val(); //ImgDirec
    var vl_Campo_5 = $("#Select_Calendario").val(); //ImgCal

    if (vl_Campo_1 == "-1" || vl_Campo_1 == null ||
        vl_Campo_2 == "" ||
        vl_Campo_3 == "" ||
        vl_Campo_4 == "-1" || vl_Campo_4 == null ||
        vl_Campo_5 == "-1" || vl_Campo_5 == null) {

        validar = 1;
        /* -- Muestra de errores según dato faltante -- */
        if (vl_Campo_1 == "-1" || vl_Campo_1 == null) { $("#ImgNIT").css("display", "inline-table"); } else { $("#ImgNIT").css("display", "none"); }
        if (vl_Campo_2 == "") { $("#ImgID").css("display", "inline-table"); } else { $("#ImgID").css("display", "none"); }
        if (vl_Campo_3 == "") { $("#Img1").css("display", "inline-table"); } else { $("#Img1").css("display", "none"); }
        if (vl_Campo_4 == "-1" || vl_Campo_4 == null) { $("#ImgDirec").css("display", "inline-table"); } else { $("#ImgDirec").css("display", "none"); }
        if (vl_Campo_5 == "-1" || vl_Campo_5 == null) { $("#ImgCal").css("display", "inline-table"); } else { $("#ImgCal").css("display", "none"); }

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
/*----                                                                                                      PROCESOS DE VALIDACION Y GRID SUCURSAL                                                                                                              ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//habilita el panel de crear o consulta
function HabilitarPanel(opcion) {

    switch (opcion) {

        case "crear":
            $("#TablaDatos").css("display", "inline-table");
            $("#TablaConsulta").css("display", "none");
            $("#Select_EmpresaNit").removeAttr("disabled");
            $("#Txt_ID").removeAttr("disabled");
            $("#Btnguardar").attr("value", "Guardar");
            $("#Select_Direccion").val("-1").trigger("chosen:updated");
            $('.C_Chosen').trigger('chosen:updated');
            ResetError();
            Clear();
            estado = opcion;
            break;

            var OnlyEmpresa = VerificarNIT("Select_EmpresaNit");

            if (OnlyEmpresa == true) {
                TransaccionesSegunNIT($("#Select_EmpresaNit").val());
            }

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

//proceso de change para el select nit
function Change_Select_Nit() {
    $("#Select_EmpresaNit").change(function () {
        Nit_ID_proccess = $(this).val();
        TransaccionesSegunNIT(Nit_ID_proccess);
    });
}

//transacciones que dependen del nit
function TransaccionesSegunNIT(vp_index_ID) {
    if (vp_index_ID != "-1") {
        transaccionAjax_MDirecciones("Matrix_Direcciones", vp_index_ID);
        transacionAjax_Calendario('MatrixCalendarios', vp_index_ID);

    }
}

// crea la tabla en el cliente
function Table_Sucursal() {

    var html_TSucursal;
    var vl_Index_Sucursal;

    switch (estado) {

        case "buscar":
            html_TSucursal = "<table id='TSucursal' border='1'  cellpadding='1' cellspacing='1' style='width: 100%'><thead><tr><th>NIT Empresa</th><th>Código</th><th>Sucursal</th><th>Dirección Asociada</th><th>Calendario</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Usuario Actualización</th><th>Fecha Última Actualización</th></tr></thead><tbody>";
            for (itemArray in ArraySucursales) {
                vl_Index_Sucursal = parseInt(ArraySucursales[itemArray].Index) - 1;
                html_TSucursal += "<tr id= 'TSucursal_" + vl_Index_Sucursal + "'><td>" + ArraySucursales[itemArray].Nit_ID + "</td><td>" + ArraySucursales[itemArray].Sucursal_ID + "</td><td>" + ArraySucursales[itemArray].Descripcion + "</td><td>" + ArraySucursales[itemArray].Direcccion_ID + " - " + ArraySucursales[itemArray].DescripDireccion + "</td><td>" + ArraySucursales[itemArray].Calendario_ID + " - " + ArraySucursales[itemArray].DescripCalendario + "</td><td style='white-space: nowrap;'> " + ArraySucursales[itemArray].UsuarioCreacion + " </td><td  style='white-space: nowrap;'> " + ArraySucursales[itemArray].FechaCreacion + " </td><td style='white-space: nowrap;'> " + ArraySucursales[itemArray].UsuarioActualizacion + " </td><td  style='white-space: nowrap;'> " + ArraySucursales[itemArray].FechaActualizacion + " </td></tr>";
            }
            break;

        case "modificar":
            html_TSucursal = "<table id='TSucursal' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Editar</th><th>NIT Empresa</th><th>Código</th><th>Sucursal</th><th>Dirección Asociada</th><th>Calendario</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Usuario Actualización</th><th>Fecha Última Actualización</th></tr></thead><tbody>";
            for (itemArray in ArraySucursales) {
                vl_Index_Sucursal = parseInt(ArraySucursales[itemArray].Index) - 1;
                html_TSucursal += "<tr id= 'TSucursal_" + vl_Index_Sucursal + "'><td><span class='cssToolTip_ver'><img  src='../../images/Editar1.png' width='23px' height='23px' class= 'Editar' name='editar' onmouseover=\"this.src='../../images/EditarOver.png';\" onmouseout=\"this.src='../../images/Editar1.png';\" onclick=\"Editar('" + vl_Index_Sucursal + "')\"></img><span>Editar Sucursal</span></span></td><td>" + ArraySucursales[itemArray].Nit_ID + "</td><td>" + ArraySucursales[itemArray].Sucursal_ID + "</td><td style='white-space: nowrap;'>" + ArraySucursales[itemArray].Descripcion + "</td><td>" + ArraySucursales[itemArray].Direcccion_ID + " - " + ArraySucursales[itemArray].DescripDireccion + "</td><td>" + ArraySucursales[itemArray].Calendario_ID + " - " + ArraySucursales[itemArray].DescripCalendario + "</td><td style='white-space: nowrap;'> " + ArraySucursales[itemArray].UsuarioCreacion + " </td><td  style='white-space: nowrap;'> " + ArraySucursales[itemArray].FechaCreacion + " </td><td style='white-space: nowrap;'> " + ArraySucursales[itemArray].UsuarioActualizacion + " </td><td  style='white-space: nowrap;'> " + ArraySucursales[itemArray].FechaActualizacion + " </td></tr>";
            }
            break;

        case "eliminar":
            html_TSucursal = "<table id='TSucursal' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>NIT Empresa</th><th>Código</th><th>Sucursal</th><th>Dirección Asociada</th><th>Calendario</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Usuario Actualización</th><th>Fecha Última Actualización</th></tr></thead><tbody>";
            for (itemArray in ArraySucursales) {
                vl_Index_Sucursal = parseInt(ArraySucursales[itemArray].Index) - 1;
                html_TSucursal += "<tr id= 'TSucursal_" + vl_Index_Sucursal + "'><td><span class='cssToolTip_ver'><img  src='../../images/Delete.png' width='23px' height='23px' class= 'Eliminar' name='eliminar' onmouseover=\"this.src='../../images/DeleteOver.png';\" onmouseout=\"this.src='../../images/Delete.png';\" onclick=\"Eliminar('" + vl_Index_Sucursal + "')\"></img><span>Eliminar Sucursal</span></span></td><td>" + ArraySucursales[itemArray].Nit_ID + "</td><td>" + ArraySucursales[itemArray].Sucursal_ID + "</td><td style='white-space: nowrap;'>" + ArraySucursales[itemArray].Descripcion + "</td><td>" + ArraySucursales[itemArray].Direcccion_ID + " - " + ArraySucursales[itemArray].DescripDireccion + "</td><td>" + ArraySucursales[itemArray].Calendario_ID + " - " + ArraySucursales[itemArray].DescripCalendario + "</td><td style='white-space: nowrap;'> " + ArraySucursales[itemArray].UsuarioCreacion + " </td><td  style='white-space: nowrap;'> " + ArraySucursales[itemArray].FechaCreacion + " </td><td style='white-space: nowrap;'> " + ArraySucursales[itemArray].UsuarioActualizacion + " </td><td  style='white-space: nowrap;'> " + ArraySucursales[itemArray].FechaActualizacion + " </td></tr>";
            }
            break;
    }
    html_TSucursal += "</tbody></table>";
    $(".container_TGrid").html("");
    $(".container_TGrid").html(html_TSucursal);

    $("#TSucursal").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Eliminar(vp_Index) {
    editID = ArraySucursales[vp_Index].Sucursal_ID;
    editNIT = ArraySucursales[vp_Index].Nit_ID;
    $("#dialog_eliminar").dialog("option", "title", "¿Cambiar Estado a Perfil?");
    $("#dialog_eliminar").dialog("open");
}

// muestra el registro a editar
function Editar(vp_Index) {

    $("#TablaDatos").css("display", "inline-table");
    $("#TablaConsulta").css("display", "none");

    $("#Select_EmpresaNit").val(ArraySucursales[vp_Index].Nit_ID).trigger("chosen:updated");
    $("#Txt_ID").val(ArraySucursales[vp_Index].Sucursal_ID);
    $("#TxtDescription").val(ArraySucursales[vp_Index].Descripcion);
    $("#Txt_ID").attr("disabled", "disabled");
    $("#Select_EmpresaNit").prop('disabled', true).trigger("chosen:updated");

    editNIT = ArraySucursales[vp_Index].Nit_ID;
    editID = ArraySucursales[vp_Index].Sucursal_ID;

    TransaccionesSegunNIT(editNIT);
    
    setTimeout("CargaCombos('" + ArraySucursales[vp_Index].Calendario_ID + "', '" + ArraySucursales[vp_Index].Direcccion_ID + "')", 400);
$("#Btnguardar").attr("value", "Actualizar");
}

//carga combos que dependen de una transaccion
function CargaCombos(vp_Calendario, vp_Direccion) {

    if (vp_Calendario == 0) {
        $('#Select_Calendario').val('-1').trigger('chosen:updated');
    }
    else {
        $('#Select_Calendario').val(vp_Calendario).trigger('chosen:updated');
    }

    if (vp_Direccion == 0) {
        $('#Select_Direccion').val('-1').trigger('chosen:updated');
    }
    else {
        $('#Select_Direccion').val(vp_Direccion).trigger('chosen:updated');
    }
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                              MENSAJES, VISUALIZACION Y LIMPIEZA                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//limpiar campos
function Clear() {
    $("#Select_EmpresaNit").prop('disabled', false); //No se agrega el trigger porque se hace al seleccionar el val
    $("#Select_EmpresaNit").val("-1").trigger("chosen:updated");
    $("#Txt_ID").val("");
    $("#TxtDescription").val("");
    $("#TxtSigla").val("");
    $("#TxtRead").val("");
    $("#DDLColumns").val("-1").trigger("chosen:updated");
    $("#Select_Direccion").empty().trigger("chosen:updated");
    $("#Select_Calendario").empty().trigger("chosen:updated");

    VerificarNIT("Select_EmpresaNit");


    var OnlyEmpresa = VerificarNIT("Select_EmpresaNit");

    if (OnlyEmpresa == true) {
        TransaccionesSegunNIT($("#Select_EmpresaNit").val());
    }

}

