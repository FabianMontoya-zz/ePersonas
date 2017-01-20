/*--------------- region de variables globales --------------------*/
var ArrayTP_Leasing = [];
var ArrayCombo = [];
var estado;
var editID;
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {
    
    $("#Marco_trabajo_Form").css("height", "490px");
    $("#container_TSTP_Leasing").css("height", "380px");

    /*Llamado de metodos para ocultar elementos al inicio de la operación de la pantalla*/
    Ventanas_Emergentes(); //Ventanas_Emergentes Va primero pues es la que llama al load de espera al inicio de los AJAX
    Ocultar_Errores();
    Ocultar_Tablas();

    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');

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
            $("#container_TSTP_Leasing").html("");
            estado = opcion;
            Clear();
            break;

        case "modificar":
            $("#TablaDatos").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TSTP_Leasing").html("");
            estado = opcion;
            ResetError();
            Clear();
            break;

        case "eliminar":
            $("#TablaDatos").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TSTP_Leasing").html("");
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
        transacionAjax_TP_Leasing("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_TP_Leasing("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_TP_Leasing_create("crear");
        }
        else {
            transacionAjax_TP_Leasing_create("modificar");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    OpenControl(); //Abrimos el load de espera con el logo
    transacionAjax_TP_Leasing_delete("elimina");
    opcion = "ALL";
    BtnConsulta();
}


//validamos campos para la creacion del link
function validarCamposCrear() {

    var Campo_1 = $("#Txt_ID").val();
    var Campo_2 = $("#TxtDescripcion").val();
    var validar = 0;

    if (Campo_2 == "" || Campo_1 == "") {
        validar = 1;
        if (Campo_1 == "") {
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
function Table_TP_Leasing() {

    switch (estado) {

        case "buscar":
            Tabla_consulta();
            break;

        case "modificar":
            Tabla_modificar();
            break;

        case "eliminar":
            Tabla_eliminar();
            break;
    }

}

//grid con el boton eliminar
function Tabla_eliminar() {
    var html_TP_Leasing = "<table id='TTP_Leasing' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Codigo</th><th>Descripción</th></tr></thead><tbody>";
    for (itemArray in ArrayTP_Leasing) {
        if (ArrayTP_Leasing[itemArray].STP_Leasing_ID != 0) {
            html_TP_Leasing += "<tr id= 'TTP_Leasing_" + ArrayTP_Leasing[itemArray].STP_Leasing_ID + "'><td><span class='cssToolTip_ver'><img  src='../../images/Delete.png' width='23px' height='23px' class= 'Eliminar' name='eliminar' onmouseover=\"this.src='../../images/DeleteOver.png';\" onmouseout=\"this.src='../../images/Delete.png';\" onclick=\"Eliminar('" + ArrayTP_Leasing[itemArray].STP_Leasing_ID + "')\"></img><span>Eliminar Tipo Producto</span></span></td><td>" + ArrayTP_Leasing[itemArray].STP_Leasing_ID + "</td><td>" + ArrayTP_Leasing[itemArray].Descripcion + "</td></tr>";
        }
    }
    html_TP_Leasing += "</tbody></table>";
    $("#container_TSTP_Leasing").html("");
    $("#container_TSTP_Leasing").html(html_TP_Leasing);

    $(".Eliminar").click(function () {
    });

    $("#TTP_Leasing").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Eliminar(index_TP_Leasing) {

    for (itemArray in ArrayTP_Leasing) {
        if (index_TP_Leasing == ArrayTP_Leasing[itemArray].STP_Leasing_ID) {
            editID = ArrayTP_Leasing[itemArray].STP_Leasing_ID;
            $("#dialog_eliminar").dialog("option", "title", "Eliminar?");
            $("#dialog_eliminar").dialog("open");
        }
    }

}

//grid con el boton editar
function Tabla_modificar() {
    var html_TP_Leasing = "<table id='TTP_Leasing' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Editar</th><th>Codigo</th><th>Descripción</th></tr></thead><tbody>";
    for (itemArray in ArrayTP_Leasing) {
        if (ArrayTP_Leasing[itemArray].STP_Leasing_ID != 0) {
            html_TP_Leasing += "<tr id= 'TTP_Leasing_" + ArrayTP_Leasing[itemArray].STP_Leasing_ID + "'><td><span class='cssToolTip_ver'><img  src='../../images/Editar1.png' width='23px' height='23px' class= 'Editar' name='editar' onmouseover=\"this.src='../../images/EditarOver.png';\" onmouseout=\"this.src='../../images/Editar1.png';\" onclick=\"Editar('" + ArrayTP_Leasing[itemArray].STP_Leasing_ID + "')\"></img><span>Editar Perfil</span></span></td><td>" + ArrayTP_Leasing[itemArray].STP_Leasing_ID + "</td><td>" + ArrayTP_Leasing[itemArray].Descripcion + "</td></tr>";
        }
    }
    html_TP_Leasing += "</tbody></table>";
    $("#container_TSTP_Leasing").html("");
    $("#container_TSTP_Leasing").html(html_TP_Leasing);

    $(".Editar").click(function () {
    });

    $("#TTP_Leasing").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

// muestra el registro a editar
function Editar(index_TP_Leasing) {

    $("#TablaDatos").css("display", "inline-table");
    $("#TablaConsulta").css("display", "none");

    for (itemArray in ArrayTP_Leasing) {
        if (index_TP_Leasing == ArrayTP_Leasing[itemArray].STP_Leasing_ID) {
            $("#Txt_ID").val(ArrayTP_Leasing[itemArray].STP_Leasing_ID);
            $("#Txt_ID").attr("disabled", "disabled");
            $("#TxtDescripcion").val(ArrayTP_Leasing[itemArray].Descripcion);
            editID = ArrayTP_Leasing[itemArray].STP_Leasing_ID;
            $("#Btnguardar").attr("value", "Actualizar");
        }
    }
}

//grid sin botones para ver resultado
function Tabla_consulta() {
    var html_TP_Leasing = "<table id='TTP_Leasing' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Codigo</th><th>Descripción</th></tr></thead><tbody>";
    for (itemArray in ArrayTP_Leasing) {
        if (ArrayTP_Leasing[itemArray].STP_Leasing_ID != 0) {
            html_TP_Leasing += "<tr id= 'TTP_Leasing_" + ArrayTP_Leasing[itemArray].STP_Leasing_ID + "'><td>" + ArrayTP_Leasing[itemArray].STP_Leasing_ID + "</td><td>" + ArrayTP_Leasing[itemArray].Descripcion + "</td></tr>";
        }
    }
    html_TP_Leasing += "</tbody></table>";
    $("#container_TSTP_Leasing").html("");
    $("#container_TSTP_Leasing").html(html_TP_Leasing);

    $("#TTP_Leasing").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//evento del boton salir
function x() {
    $("#dialog").dialog("close");
}

//limpiar campos
function Clear() {
    $("#Txt_ID").val("");
    $("#TxtDescripcion").val("");
    $("#TxtRead").val("");
    $("#DDLColumns").val("-1").trigger("chosen:updated");
}