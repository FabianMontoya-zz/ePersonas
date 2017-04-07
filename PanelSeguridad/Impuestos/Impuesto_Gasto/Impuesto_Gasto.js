/*--------------- region de variables globales --------------------*/
var ArrayImpuesto_Gasto = [];
var ArrayCombo = [];
var estado;
var editID;
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {

    /*Llamado de metodos para ocultar elementos al inicio de la operación de la pantalla*/
    Ventanas_Emergentes(); //Ventanas_Emergentes Va primero pues es la que llama al load de espera al inicio de los AJAX
    Ocultar_Errores();
    Ocultar_Tablas();
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
    $("#ImgID").css("display", "none");
    $("#Img1").css("display", "none");
    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WA").css("display", "none");
}

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
        transacionAjax_Impuesto_Gasto("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_Impuesto_Gasto("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_Impuesto_Gasto_create("crear");
        }
        else {
            transacionAjax_Impuesto_Gasto_create("modificar");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    transacionAjax_Impuesto_Gasto_delete("elimina");
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

    var vl_Campo_1 = $("#Txt_ID").val();
    var vl_Campo_2 = $("#TxtDescription").val();

    var validar = 0;

    if (vl_Campo_1 == "" || vl_Campo_2 == "") {
        validar = 1;
        if (vl_Campo_1 == "") { $("#ImgID").css("display", "inline-table"); } else { $("#ImgID").css("display", "none"); }
        if (vl_Campo_2 == "") { $("#Img1").css("display", "inline-table"); } else { $("#Img1").css("display", "none"); }
    }
    else {
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
/*----                                                                                                      PROCESOS DE VALIDACION Y GRID IMPUESTOS O GASTOS                                                                                                              ----*/
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

// crea la tabla en el cliente
function Table_Impuesto_Gasto() {

    var html_Impuesto_Gasto;
    var vl_Index_Impuesto;

    switch (estado) {

        case "buscar":
            html_Impuesto_Gasto = "<table id='TImpuesto_Gasto' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Codigo</th><th>Descripción</th></tr></thead><tbody>";
            for (itemArray in ArrayImpuesto_Gasto) {
                if (ArrayImpuesto_Gasto[itemArray].Impuesto_Gasto_ID != 0) {
                    vl_Index_Impuesto = parseInt(ArrayImpuesto_Gasto[itemArray].Index) - 1;
                    html_Impuesto_Gasto += "<tr id= 'TImpuesto_Gasto_" + vl_Index_Impuesto + "'><td>" + ArrayImpuesto_Gasto[itemArray].Impuesto_Gasto_ID + "</td><td>" + ArrayImpuesto_Gasto[itemArray].Descripcion + "</td></tr>";
                }
            }
            break;

        case "modificar":
            html_Impuesto_Gasto = "<table id='TImpuesto_Gasto' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Editar</th><th>Codigo</th><th>Descripción</th></tr></thead><tbody>";
            for (itemArray in ArrayImpuesto_Gasto) {
                if (ArrayImpuesto_Gasto[itemArray].Impuesto_Gasto_ID != 0) {
                    vl_Index_Impuesto = parseInt(ArrayImpuesto_Gasto[itemArray].Index) - 1;
                    html_Impuesto_Gasto += "<tr id= 'TImpuesto_Gasto_" + vl_Index_Impuesto + "'><td><span class='cssToolTip_ver'><img  src='../../images/Editar1.png' width='23px' height='23px' class= 'Editar' name='editar' onmouseover=\"this.src='../../images/EditarOver.png';\" onmouseout=\"this.src='../../images/Editar1.png';\" onclick=\"Editar('" + vl_Index_Impuesto + "')\"></img><span>Editar Impuesto o Gasto</span></span></td><td>" + ArrayImpuesto_Gasto[itemArray].Impuesto_Gasto_ID + "</td><td>" + ArrayImpuesto_Gasto[itemArray].Descripcion + "</td></tr>";
                }
            }
            break;

        case "eliminar":
            html_Impuesto_Gasto = "<table id='TImpuesto_Gasto' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Codigo</th><th>Descripción</th></tr></thead><tbody>";
            for (itemArray in ArrayImpuesto_Gasto) {
                if (ArrayImpuesto_Gasto[itemArray].Impuesto_Gasto_ID != 0) {
                    vl_Index_Impuesto = parseInt(ArrayImpuesto_Gasto[itemArray].Index) - 1;
                    html_Impuesto_Gasto += "<tr id= 'TImpuesto_Gasto_" + vl_Index_Impuesto + "'><td><span class='cssToolTip_ver'><img  src='../../images/Delete.png' width='23px' height='23px' class= 'Eliminar' name='eliminar' onmouseover=\"this.src='../../images/DeleteOver.png';\" onmouseout=\"this.src='../../images/Delete.png';\" onclick=\"Eliminar('" + vl_Index_Impuesto + "')\"></img><span>Eliminar Impuesto o Gasto</span></td><td>" + ArrayImpuesto_Gasto[itemArray].Impuesto_Gasto_ID + "</td><td>" + ArrayImpuesto_Gasto[itemArray].Descripcion + "</td></tr>";
                }
            }
            break;
    }

    html_Impuesto_Gasto += "</tbody></table>";
    $(".container_TGrid").html("");
    $(".container_TGrid").html(html_Impuesto_Gasto);

    $("#TImpuesto_Gasto").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Eliminar(vp_Index) {
    editID = ArrayImpuesto_Gasto[vp_Index].Impuesto_Gasto_ID;
    $("#dialog_eliminar").dialog("option", "title", "Eliminar?");
    $("#dialog_eliminar").dialog("open");
}

// muestra el registro a editar
function Editar(vp_Index) {
    $("#TablaDatos").css("display", "inline-table");
    $("#TablaConsulta").css("display", "none");

    $("#Txt_ID").val(ArrayImpuesto_Gasto[vp_Index].Impuesto_Gasto_ID);
    $("#Txt_ID").attr("disabled", "disabled");
    $("#TxtDescription").val(ArrayImpuesto_Gasto[vp_Index].Descripcion);
    editID = ArrayImpuesto_Gasto[vp_Index].Impuesto_Gasto_ID;
    $("#Btnguardar").attr("value", "Actualizar");
}


//limpiar campos
function Clear() {
    $("#Txt_ID").val("");
    $("#TxtDescription").val("");
    $("#TxtRead").val("");
    $("#DDLColumns").val("-1");
    $('.C_Chosen').trigger('chosen:updated');
}