/*--------------- region de variables globales --------------------*/
var ArrayTP_Activo = [];
var ArrayCombo = [];
var ArrayTipo = [];
var ArraySubTipo = [];

var estado;
var edit_TipoID;
var edit_SubTipoID;

/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {

    $("#Marco_trabajo_Form").css("height", "490px");
    $("#container_TTP_Activo").css("height", "380px");

    /*Llamado de metodos para ocultar elementos al inicio de la operación de la pantalla*/
    Ventanas_Emergentes(); //Ventanas_Emergentes Va primero pues es la que llama al load de espera al inicio de los AJAX
    Ocultar_Errores();
    Ocultar_Tablas();
    /*==================FIN LLAMADO INICIAL DE METODOS DE INICIALIZACIÓN==============*/

    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
    transacionAjax_Tipo('Tipo');
    transacionAjax_SubTipo('SubTipo');

});

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
            $("#container_TTP_Activo").html("");
            estado = opcion;
            Clear();
            break;

        case "eliminar":
            $("#TablaDatos").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TTP_Activo").html("");
            estado = opcion;
            Clear();
            break;

    }
}

//consulta del del crud(READ)
function BtnConsulta() {

    var filtro;
    var ValidateSelect = ValidarDroplist();
    var opcion;

    OpenControl(); //Abrimos el load de espera con el logo

    if (ValidateSelect == 1) {
        filtro = "N";
        opcion = "ALL";
        transacionAjax_TP_Activo("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_TP_Activo("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_TP_Activo_create("crear");
        }
        else {
            transacionAjax_TP_Activo_create("modificar");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    OpenControl(); //Abrimos el load de espera con el logo
    transacionAjax_TP_Activo_delete("elimina");
}


//validamos campos para la creacion del link
function validarCamposCrear() {

    var Campo_1 = $("#Select_Tipo").val();
    var Campo_2 = $("#Select_SubTipo").val();
    var validar = 0;

    if (Campo_2 == "-1" || Campo_1 == "-1") {
        validar = 1;
        if (Campo_1 == "-1") {
            $("#ImgID").css("display", "inline-table");
        }
        else {
            $("#ImgID").css("display", "none");
        }
        if (Campo_2 == "-1") {
            $("#Img1").css("display", "inline-table");
        }
        else {
            $("#Img1").css("display", "none");
        }

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

// crea la tabla en el cliente
function Table_TP_Activo() {

    var html_TP_Activo;

    switch (estado) {

        case "buscar":
            html_TP_Activo = "<table id='TTP_Activo' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Tipo de Producto</th><th>Sub tipo De producto</th></tr></thead><tbody>";
            for (itemArray in ArrayTP_Activo) {
                if (ArrayTP_Activo[itemArray].Tipo_ID != 0) {
                    html_TP_Activo += "<tr id= 'TTP_Activo_" + ArrayTP_Activo[itemArray].Tipo_ID + "'><td>" + ArrayTP_Activo[itemArray].Tipo_ID + " - " + ArrayTP_Activo[itemArray].DescripTipo + "</td><td>" + ArrayTP_Activo[itemArray].SubTipo_ID + " - " + ArrayTP_Activo[itemArray].DescripSubTipo + "</td></tr>";
                }
            }
            break;

        case "eliminar":
            html_TP_Activo = "<table id='TTP_Activo' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Tipo de Producto</th><th>Sub tipo De producto</th></tr></thead><tbody>";
            for (itemArray in ArrayTP_Activo) {
                if (ArrayTP_Activo[itemArray].Tipo_ID != 0) {
                    html_TP_Activo += "<tr id= 'TTP_Activo_" + ArrayTP_Activo[itemArray].Tipo_ID + "'><td><span class='cssToolTip_ver'><img  src='../../images/Delete.png' width='23px' height='23px' class= 'Eliminar' name='eliminar' onmouseover=\"this.src='../../images/DeleteOver.png';\" onmouseout=\"this.src='../../images/Delete.png';\" onclick=\"Eliminar('" + ArrayTP_Activo[itemArray].Tipo_ID + "','" + ArrayTP_Activo[itemArray].SubTipo_ID + "')\"></img><span>Eliminar Relación T/S Activos</span></span></td><td>" + ArrayTP_Activo[itemArray].Tipo_ID + " - " + ArrayTP_Activo[itemArray].DescripTipo + "</td><td>" + ArrayTP_Activo[itemArray].SubTipo_ID + " - " + ArrayTP_Activo[itemArray].DescripSubTipo + "</td></tr>";
                }
            }
            break;
    }

    html_TP_Activo += "</tbody></table>";
    $("#container_TTP_Activo").html("");
    $("#container_TTP_Activo").html(html_TP_Activo);

    $("#TTP_Activo").dataTable({
        "bJQueryUI": true,
        "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Eliminar(index_Tipo_ID, index_SubTipo_ID) {

    for (itemArray in ArrayTP_Activo) {
        if (index_Tipo_ID == ArrayTP_Activo[itemArray].Tipo_ID && index_SubTipo_ID == ArrayTP_Activo[itemArray].SubTipo_ID) {
            edit_TipoID = ArrayTP_Activo[itemArray].Tipo_ID;
            edit_SubTipoID = ArrayTP_Activo[itemArray].SubTipo_ID;

            $("#dialog_eliminar").dialog("option", "title", "Eliminar?");
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
    $("#Select_Tipo").val("-1");
    $("#Select_SubTipo").val("-1");
    $("#TxtRead").val("");
    $("#DDLColumns").val("-1");
    $('.C_Chosen').trigger('chosen:updated');

}