/*--------------- region de variables globales --------------------*/
var ArrayImpuesto_Gasto = [];
var ArrayCombo = [];
var estado;
var editID;
/*--------------- region de variables globales --------------------*/

//evento load de los Links
$(document).ready(function () {
    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
    $("#ESelect").css("display", "none");
    $("#ImgID").css("display", "none");
    $("#Img1").css("display", "none");
    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WE").css("display", "none");


    $("#TablaDatos").css("display", "none");
    $("#TablaConsulta").css("display", "none");

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

});

//salida del formulario
function btnSalir() {
    window.location = "../../Menu/menu.aspx?User=" + $("#User").html() + "&L_L=" + Link;
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
    var html_Impuesto_Gasto = "<table id='TImpuesto_Gasto' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Codigo</th><th>Descripción</th></tr></thead><tbody>";
    for (itemArray in ArrayImpuesto_Gasto) {
        if (ArrayImpuesto_Gasto[itemArray].Impuesto_Gasto_ID != 0) {
            html_Impuesto_Gasto += "<tr id= 'TImpuesto_Gasto_" + ArrayImpuesto_Gasto[itemArray].Impuesto_Gasto_ID + "'><td><input type ='radio' class= 'Eliminar' name='eliminar' onclick=\"Eliminar('" + ArrayImpuesto_Gasto[itemArray].Impuesto_Gasto_ID + "')\"></input></td><td>" + ArrayImpuesto_Gasto[itemArray].Impuesto_Gasto_ID + "</td><td>" + ArrayImpuesto_Gasto[itemArray].Descripcion + "</td></tr>";
        }
    }
    html_Impuesto_Gasto += "</tbody></table>";
    $("#container_TImpuesto_Gasto").html("");
    $("#container_TImpuesto_Gasto").html(html_Impuesto_Gasto);

    $(".Eliminar").click(function () {
    });

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

//grid con el boton editar
function Tabla_modificar() {
    var html_Impuesto_Gasto = "<table id='TImpuesto_Gasto' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Editar</th><th>Codigo</th><th>Descripción</th></tr></thead><tbody>";
    for (itemArray in ArrayImpuesto_Gasto) {
        if (ArrayImpuesto_Gasto[itemArray].Impuesto_Gasto_ID != 0) {
            html_Impuesto_Gasto += "<tr id= 'TImpuesto_Gasto_" + ArrayImpuesto_Gasto[itemArray].Impuesto_Gasto_ID + "'><td><input type ='radio' class= 'Editar' name='editar' onclick=\"Editar('" + ArrayImpuesto_Gasto[itemArray].Impuesto_Gasto_ID + "')\"></input></td><td>" + ArrayImpuesto_Gasto[itemArray].Impuesto_Gasto_ID + "</td><td>" + ArrayImpuesto_Gasto[itemArray].Descripcion + "</td></tr>";
        }
    }
    html_Impuesto_Gasto += "</tbody></table>";
    $("#container_TImpuesto_Gasto").html("");
    $("#container_TImpuesto_Gasto").html(html_Impuesto_Gasto);

    $(".Editar").click(function () {
    });

    $("#TImpuesto_Gasto").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
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

//grid sin botones para ver resultado
function Tabla_consulta() {
    var html_Impuesto_Gasto = "<table id='TImpuesto_Gasto' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Codigo</th><th>Descripción</th></tr></thead><tbody>";
    for (itemArray in ArrayImpuesto_Gasto) {
        if (ArrayImpuesto_Gasto[itemArray].Impuesto_Gasto_ID != 0) {
            html_Impuesto_Gasto += "<tr id= 'TImpuesto_Gasto_" + ArrayImpuesto_Gasto[itemArray].Impuesto_Gasto_ID + "'><td>" + ArrayImpuesto_Gasto[itemArray].Impuesto_Gasto_ID + "</td><td>" + ArrayImpuesto_Gasto[itemArray].Descripcion + "</td></tr>";
        }
    }
    html_Impuesto_Gasto += "</tbody></table>";
    $("#container_TImpuesto_Gasto").html("");
    $("#container_TImpuesto_Gasto").html(html_Impuesto_Gasto);

    $("#TImpuesto_Gasto").dataTable({
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
    $("#TxtDescription").val("");
    $("#TxtRead").val("");
    $("#DDLColumns").val("-1");
}