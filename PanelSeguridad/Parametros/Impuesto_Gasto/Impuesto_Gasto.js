/*--------------- region de variables globales --------------------*/
var ArrayImpuesto_Gasto = [];
var ArrayCombo = [];
var estado;
var editID;
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {

    $("#Marco_trabajo_Form").css("height", "490px");
    $("#container_TImpuesto_Gasto").css("height", "380px");

    /*Llamado de metodos para ocultar elementos al inicio de la operación de la pantalla*/
    Ventanas_Emergentes(); //Ventanas_Emergentes Va primero pues es la que llama al load de espera al inicio de los AJAX
    Ocultar_Errores();
    Ocultar_Tablas();
    /*==================FIN LLAMADO INICIAL DE METODOS DE INICIALIZACIÓN==============*/

    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
    
});

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
            $("#container_TImpuesto_Gasto").html("");
            estado = opcion;
            Clear();
            break;

        case "modificar":
            $("#TablaDatos").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TImpuesto_Gasto").html("");
            estado = opcion;
            ResetError();
            Clear();
            break;

        case "eliminar":
            $("#TablaDatos").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TImpuesto_Gasto").html("");
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
    OpenControl(); //Abrimos el load de espera con el logo
    transacionAjax_Impuesto_Gasto_delete("elimina");
}


//validamos campos para la creacion del link
function validarCamposCrear() {

    var valID = $("#Txt_ID").val();
    var descrip = $("#TxtDescription").val();

    var validar = 0;

    if (descrip == "" || valID == "") {
        validar = 1;
        if (valID == "") {
            $("#ImgID").css("display", "inline-table");
        }
        else {
            $("#ImgID").css("display", "none");
        }
        if (descrip == "") {
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
function Table_Impuesto_Gasto() {

    var html_Impuesto_Gasto;

    switch (estado) {

        case "buscar":
            html_Impuesto_Gasto = "<table id='TImpuesto_Gasto' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Codigo</th><th>Descripción</th></tr></thead><tbody>";
            for (itemArray in ArrayImpuesto_Gasto) {
                if (ArrayImpuesto_Gasto[itemArray].Impuesto_Gasto_ID != 0) {
                    html_Impuesto_Gasto += "<tr id= 'TImpuesto_Gasto_" + ArrayImpuesto_Gasto[itemArray].Impuesto_Gasto_ID + "'><td>" + ArrayImpuesto_Gasto[itemArray].Impuesto_Gasto_ID + "</td><td>" + ArrayImpuesto_Gasto[itemArray].Descripcion + "</td></tr>";
                }
            }
            break;

        case "modificar":
            html_Impuesto_Gasto = "<table id='TImpuesto_Gasto' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Editar</th><th>Codigo</th><th>Descripción</th></tr></thead><tbody>";
            for (itemArray in ArrayImpuesto_Gasto) {
                if (ArrayImpuesto_Gasto[itemArray].Impuesto_Gasto_ID != 0) {
                    html_Impuesto_Gasto += "<tr id= 'TImpuesto_Gasto_" + ArrayImpuesto_Gasto[itemArray].Impuesto_Gasto_ID + "'><td><span class='cssToolTip_ver'><img  src='../../images/Editar1.png' width='23px' height='23px' class= 'Editar' name='editar' onmouseover=\"this.src='../../images/EditarOver.png';\" onmouseout=\"this.src='../../images/Editar1.png';\" onclick=\"Editar('" + ArrayImpuesto_Gasto[itemArray].Impuesto_Gasto_ID + "')\"></img><span>Editar Impuesto o Gasto</span></span></td><td>" + ArrayImpuesto_Gasto[itemArray].Impuesto_Gasto_ID + "</td><td>" + ArrayImpuesto_Gasto[itemArray].Descripcion + "</td></tr>";
                }
            }
            break;

        case "eliminar":
            html_Impuesto_Gasto = "<table id='TImpuesto_Gasto' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Codigo</th><th>Descripción</th></tr></thead><tbody>";
            for (itemArray in ArrayImpuesto_Gasto) {
                if (ArrayImpuesto_Gasto[itemArray].Impuesto_Gasto_ID != 0) {
                    html_Impuesto_Gasto += "<tr id= 'TImpuesto_Gasto_" + ArrayImpuesto_Gasto[itemArray].Impuesto_Gasto_ID + "'><td><span class='cssToolTip_ver'><img  src='../../images/Delete.png' width='23px' height='23px' class= 'Eliminar' name='eliminar' onmouseover=\"this.src='../../images/DeleteOver.png';\" onmouseout=\"this.src='../../images/Delete.png';\" onclick=\"Eliminar('" + ArrayImpuesto_Gasto[itemArray].Impuesto_Gasto_ID + "')\"></img><span>Eliminar Impuesto o Gasto</span></td><td>" + ArrayImpuesto_Gasto[itemArray].Impuesto_Gasto_ID + "</td><td>" + ArrayImpuesto_Gasto[itemArray].Descripcion + "</td></tr>";
                }
            }
            break;
    }

    html_Impuesto_Gasto += "</tbody></table>";
    $("#container_TImpuesto_Gasto").html("");
    $("#container_TImpuesto_Gasto").html(html_Impuesto_Gasto);

    $("#TImpuesto_Gasto").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Eliminar(index_Impuesto_Gasto) {

    for (itemArray in ArrayImpuesto_Gasto) {
        if (index_Impuesto_Gasto == ArrayImpuesto_Gasto[itemArray].Impuesto_Gasto_ID) {
            editID = ArrayImpuesto_Gasto[itemArray].Impuesto_Gasto_ID;
            $("#dialog_eliminar").dialog("option", "title", "Eliminar?");
            $("#dialog_eliminar").dialog("open");
        }
    }

}

// muestra el registro a editar
function Editar(index_Impuesto_Gasto) {

    $("#TablaDatos").css("display", "inline-table");
    $("#TablaConsulta").css("display", "none");

    for (itemArray in ArrayImpuesto_Gasto) {
        if (index_Impuesto_Gasto == ArrayImpuesto_Gasto[itemArray].Impuesto_Gasto_ID) {
            $("#Txt_ID").val(ArrayImpuesto_Gasto[itemArray].Impuesto_Gasto_ID);
            $("#Txt_ID").attr("disabled", "disabled");
            $("#TxtDescription").val(ArrayImpuesto_Gasto[itemArray].Descripcion);
            editID = ArrayImpuesto_Gasto[itemArray].Impuesto_Gasto_ID;
            $("#Btnguardar").attr("value", "Actualizar");
        }
    }
}

//evento del boton salir
function x() {
    $("#dialog").dialog("close");
}

//limpiar campos
function Clear() {
    $("#Txt_ID").val("");
    $("#TxtDescription").val("");
    $("#TxtRead").val("");
    $("#DDLColumns").val("-1");
}