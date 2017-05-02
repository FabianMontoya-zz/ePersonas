/*--------------- region de variables globales --------------------*/
var ArrayMonedaCot = [];
var ArrayCombo = [];
var ArrayMoneda = [];

var estado;
var editID;
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {

    /*Llamado de metodos para ocultar elementos al inicio de la operación de la pantalla*/
    Ventanas_Emergentes(); //Ventanas_Emergentes Va primero pues es la que llama al load de espera al inicio de los AJAX
    Ocultar_Errores();
    Ocultar_Tablas();
    /*================== FIN LLAMADO INICIAL DE MÉTODOS DE INICIALIZACIÓN ==============*/

    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
    transacionAjax_Moneda('Moneda');

    $(function () {
        $("#Txt_Fecha").datepicker({ dateFormat: 'yy-mm-dd' });
    });

});

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                 REGION INICIO DE COMPONENTES                                                                                                    ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//funcion para las ventanas emergentes
function Ventanas_Emergentes() {

    Load_Charge_Sasif(); //Carga de "SasifMaster.js" el Control de Carga

    //funcion para las ventanas emergentes
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
    $("#ImgID").css("display", "none");
    $("#Img2").css("display", "none");
    $("#Img1").css("display", "none");
    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WA").css("display", "none");

    /*Los demás se ocultan en la SASIF Master*/
}

//Función que oculta las tablas
function Ocultar_Tablas() {
    $(".Dialog_Datos").css("display", "none");
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
        transacionAjax_MonedaCot("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_MonedaCot("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_MonedaCot_create("crear");
        }
        else {
            transacionAjax_MonedaCot_create("modificar");
        }
    }
}

//elimina de la BD
function BtnElimina() {
   transacionAjax_MonedaCot_delete("elimina");
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

    var Campo_1 = $("#Select_Moneda").val();
    var Campo_2 = $("#Txt_Fecha").val();
    var Campo_3 = $("#Txt_Valor").val();

    var validar = 0;

    if (Campo_3 == "" || Campo_2 == "" || Campo_1 == "-1") {
        validar = 1;
        if (Campo_1 == "-1") {
            $("#ImgID").css("display", "inline-table");
        }
        else {
            $("#ImgID").css("display", "none");
        }
        if (Campo_2 == "") {
            $("#Img1").css("display", "inline-table");
        }
        else {
            $("#Img1").css("display", "none");
        }
        if (Campo_3 == "") {
            $("#Img2").css("display", "inline-table");
        }
        else {
            $("#Img2").css("display", "none");
        }
    }
    else {
        $("#Img2").css("display", "none");
        $("#Img1").css("display", "none");
        $("#ImgID").css("display", "none");
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
/*----                                                                                                      PROCESOS DE VALIDACION Y GRID COTIZACION MONEDA                                                                                                              ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//habilita el panel de crear o consulta
function HabilitarPanel(opcion) {

    switch (opcion) {

        case "crear":
            $(".Dialog_Datos").css("display", "inline-table");
            $("#TablaConsulta").css("display", "none");
            $("#Txt_ID").removeAttr("disabled");
            $("#Btnguardar").attr("value", "Guardar");
            ResetError();
            Clear();
            estado = opcion;
            break;

        case "buscar":
            $(".Dialog_Datos").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $(".container_TGrid").html("");
            estado = opcion;
            Clear();
            break;

        case "modificar":
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
            Clear();
            break;

    }
}

// crea la tabla en el cliente
function Table_MonedaCot() {

    var html_MonedaCot;
    var vl_Index_MonedaCot;

    switch (estado) {

        case "buscar":
            html_MonedaCot = "<table id='TMonedaCot' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Codigo</th><th>Fecha</th><th>Valor</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayMonedaCot) {
                if (ArrayMonedaCot[itemArray].MonedaCot_ID != 0) {
                    vl_Index_MonedaCot = parseInt(ArrayMonedaCot[itemArray].Index) - 1;
                    html_MonedaCot += "<tr id= 'TMonedaCot_" + vl_Index_MonedaCot + "'><td>" + ArrayMonedaCot[itemArray].MonedaCot_ID + " - " + ArrayMonedaCot[itemArray].DescripMoneda + "</td><td>" + valFecha(ArrayMonedaCot[itemArray].Fecha) + "</td><td>" + Convert_Decimal_Grid(ArrayMonedaCot[itemArray].ValorCotizacion) + "</td><td>" + ArrayMonedaCot[itemArray].UsuarioCreacion + "</td><td>" + ArrayMonedaCot[itemArray].FechaCreacion + "</td><td>" + ArrayMonedaCot[itemArray].UsuarioActualizacion + "</td><td>" + ArrayMonedaCot[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "modificar":
            html_MonedaCot = "<table id='TMonedaCot' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Editar</th><th>Codigo</th><th>Fecha</th><th>Valor</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayMonedaCot) {
                if (ArrayMonedaCot[itemArray].MonedaCot_ID != 0) {
                    vl_Index_MonedaCot = parseInt(ArrayMonedaCot[itemArray].Index) - 1;
                    html_MonedaCot += "<tr id= 'TMonedaCot_" + vl_Index_MonedaCot + "'><td><span class='cssToolTip_ver'><img  src='../../images/Editar1.png' width='23px' height='23px' class= 'Editar' name='editar' onmouseover=\"this.src='../../images/EditarOver.png';\" onmouseout=\"this.src='../../images/Editar1.png';\" onclick=\"Editar('" + vl_Index_MonedaCot + "')\"></img><span>Editar Cotización Moneda</span></span></td><td>" + ArrayMonedaCot[itemArray].MonedaCot_ID + " - " + ArrayMonedaCot[itemArray].DescripMoneda + "</td><td>" + valFecha(ArrayMonedaCot[itemArray].Fecha) + "</td><td>" + Convert_Decimal_Grid(ArrayMonedaCot[itemArray].ValorCotizacion) + "</td><td>" + ArrayMonedaCot[itemArray].UsuarioCreacion + "</td><td>" + ArrayMonedaCot[itemArray].FechaCreacion + "</td><td>" + ArrayMonedaCot[itemArray].UsuarioActualizacion + "</td><td>" + ArrayMonedaCot[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "eliminar":
            html_MonedaCot = "<table id='TMonedaCot' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Codigo</th><th>Fecha</th><th>Valor</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayMonedaCot) {
                if (ArrayMonedaCot[itemArray].MonedaCot_ID != 0) {
                    vl_Index_MonedaCot = parseInt(ArrayMonedaCot[itemArray].Index) - 1;
                    html_MonedaCot += "<tr id= 'TMonedaCot_" + vl_Index_MonedaCot + "'><td><span class='cssToolTip_ver'><img  src='../../images/Delete.png' width='23px' height='23px' class= 'Eliminar' name='eliminar' onmouseover=\"this.src='../../images/DeleteOver.png';\" onmouseout=\"this.src='../../images/Delete.png';\" onclick=\"Eliminar('" + vl_Index_MonedaCot + "')\"></img><span>Eliminar Cotización Moneda</span></span></td><td>" + ArrayMonedaCot[itemArray].MonedaCot_ID + " - " + ArrayMonedaCot[itemArray].DescripMoneda + "</td><td>" + valFecha(ArrayMonedaCot[itemArray].Fecha) + "</td><td>" + Convert_Decimal_Grid(ArrayMonedaCot[itemArray].ValorCotizacion) + "</td><td>" + ArrayMonedaCot[itemArray].UsuarioCreacion + "</td><td>" + ArrayMonedaCot[itemArray].FechaCreacion + "</td><td>" + ArrayMonedaCot[itemArray].UsuarioActualizacion + "</td><td>" + ArrayMonedaCot[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;
    }

    html_MonedaCot += "</tbody></table>";
    $(".container_TGrid").html("");
    $(".container_TGrid").html(html_MonedaCot);

    $("#TMonedaCot").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Eliminar(vp_Index) {
    editID = ArrayMonedaCot[vp_Index].MonedaCot_ID;
    $("#dialog_eliminar").dialog("option", "title", "Eliminar?");
    $("#dialog_eliminar").dialog("open");
}

// muestra el registro a editar
function Editar(vp_Index) {

    $(".Dialog_Datos").css("display", "inline-table");
    $("#TablaConsulta").css("display", "none");

    $("#Select_Moneda").val(ArrayMonedaCot[vp_Index].MonedaCot_ID);
    $("#Select_Moneda").attr("disabled", "disabled");
    $("#Txt_Fecha").val(valFecha(ArrayMonedaCot[vp_Index].Fecha));
    $("#Txt_Valor").val(Convert_Decimal_Grid(ArrayMonedaCot[vp_Index].ValorCotizacion));
    editID = ArrayMonedaCot[vp_Index].MonedaCot_ID;
    $("#Btnguardar").attr("value", "Actualizar");

    $('.C_Chosen').trigger('chosen:updated');

}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                              MENSAJES, VISUALIZACION Y LIMPIEZA                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//limpiar campos
function Clear() {

    $("#Select_Moneda").val("-1");
    $("#Select_Moneda").removeAttr("disabled");

    $("#Txt_Fecha").val("");
    $("#Txt_Valor").val("");

    $("#TxtRead").val("");
    $("#DDLColumns").val("-1");

    $('.C_Chosen').trigger('chosen:updated');

}
