/*--------------- region de variables globales --------------------*/
var ArrayTransacciones = [];
var ArrayCombo = [];
var ArrayEmpresaNit = [];

var estado;
var editID;
var editNit_ID;
/*--------------- region de variables globales --------------------*/

//evento load de los Links
$(document).ready(function () {
    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
    transacionAjax_EmpresaNit('Cliente')
    $("#ESelect").css("display", "none");
    $("#ImgID").css("display", "none");
    $("#Img2").css("display", "none");
    $("#Img1").css("display", "none");
    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WE").css("display", "none");

    $("#TablaDatos_D").css("display", "none");
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
            $("#TablaDatos_D").css("display", "inline-table");
            $("#TablaConsulta").css("display", "none");
            $("#Txt_ID").removeAttr("disabled");
            $("#Btnguardar").attr("value", "Guardar");
            ResetError();
            Clear();
            estado = opcion;

            $("#Select_EmpresaNit").removeAttr("disabled");
            $('.C_Chosen').trigger('chosen:updated');
            break;

        case "buscar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TTransacciones").html("");
            estado = opcion;
            Clear();
            break;

        case "modificar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TTransacciones").html("");
            estado = opcion;
            ResetError();
            Clear();
            break;

        case "eliminar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TTransacciones").html("");
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
        transacionAjax_Transacciones("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_Transacciones("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_Transacciones_create("crear");
        }
        else {
            transacionAjax_Transacciones_create("modificar");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    transacionAjax_Transacciones_delete("elimina");
}


//validamos campos para la creacion del link
function validarCamposCrear() {

    var Campo_1 = $("#Txt_ID").val();
    var Campo_2 = $("#TxtDescripcion").val();
    var Campo_3 = $("#Select_EmpresaNit").val();

    var validar = 0;

    if (Campo_3 == "-1" | Campo_2 == "" || Campo_1 == "") {
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
        if (Campo_3 == "-1") {
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

// crea la tabla en el cliente
function Table_Transacciones() {

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
    var html_Transacciones = "<table id='TTransacciones' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Nit Empresa</th><th>Codigo</th><th>Descripción</th></tr></thead><tbody>";
    for (itemArray in ArrayTransacciones) {
        if (ArrayTransacciones[itemArray].Transacciones_ID != 0) {
            html_Transacciones += "<tr id= 'TTransacciones_" + ArrayTransacciones[itemArray].Transacciones_ID + "'><td><input type ='radio' class= 'Eliminar' name='eliminar' onclick=\"Eliminar('" + ArrayTransacciones[itemArray].Nit_ID + "','" + ArrayTransacciones[itemArray].Transacciones_ID + "')\"></input></td><td>" + ArrayTransacciones[itemArray].Nit_ID + "</td><td>" + ArrayTransacciones[itemArray].Transacciones_ID + "</td><td>" + ArrayTransacciones[itemArray].Descripcion + "</td></tr>";
        }
    }
    html_Transacciones += "</tbody></table>";
    $("#container_TTransacciones").html("");
    $("#container_TTransacciones").html(html_Transacciones);

    $(".Eliminar").click(function () {
    });

    $("#TTransacciones").dataTable({
        "bJQueryUI": true,
        "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Eliminar(index_Nit, index_Transacciones) {

    for (itemArray in ArrayTransacciones) {
        if (index_Nit == ArrayTransacciones[itemArray].Nit_ID && index_Transacciones == ArrayTransacciones[itemArray].Transacciones_ID) {

            editNit_ID = ArrayTransacciones[itemArray].Nit_ID;
            editID = ArrayTransacciones[itemArray].Transacciones_ID;
            $("#dialog_eliminar").dialog("option", "title", "Eliminar?");
            $("#dialog_eliminar").dialog("open");
        }
    }

}

//grid con el boton editar
function Tabla_modificar() {
    var html_Transacciones = "<table id='TTransacciones' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Editar</th><th>Nit Empresa</th><th>Codigo</th><th>Descripción</th></tr></thead><tbody>";
    for (itemArray in ArrayTransacciones) {
        if (ArrayTransacciones[itemArray].Transacciones_ID != 0) {
            html_Transacciones += "<tr id= 'TTransacciones_" + ArrayTransacciones[itemArray].Transacciones_ID + "'><td><input type ='radio' class= 'Editar' name='editar' onclick=\"Editar('" + ArrayTransacciones[itemArray].Nit_ID + "','" + ArrayTransacciones[itemArray].Transacciones_ID + "')\"></input></td><td>" + ArrayTransacciones[itemArray].Nit_ID + "</td><td>" + ArrayTransacciones[itemArray].Transacciones_ID + "</td><td>" + ArrayTransacciones[itemArray].Descripcion + "</td></tr>";
        }
    }
    html_Transacciones += "</tbody></table>";
    $("#container_TTransacciones").html("");
    $("#container_TTransacciones").html(html_Transacciones);

    $(".Editar").click(function () {
    });

    $("#TTransacciones").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

// muestra el registro a editar
function Editar(index_Nit, index_Transacciones) {

    $("#TablaDatos_D").css("display", "inline-table");
    $("#TablaConsulta").css("display", "none");

    for (itemArray in ArrayTransacciones) {
        if (index_Nit == ArrayTransacciones[itemArray].Nit_ID && index_Transacciones == ArrayTransacciones[itemArray].Transacciones_ID) {
            editNit_ID = ArrayTransacciones[itemArray].Nit_ID;
            editID = ArrayTransacciones[itemArray].Transacciones_ID;

            $("#Select_EmpresaNit").val(ArrayTransacciones[itemArray].Nit_ID);

            $("#Txt_ID").val(ArrayTransacciones[itemArray].Transacciones_ID);
            $("#Txt_ID").attr("disabled", "disabled");
            $("#TxtDescripcion").val(ArrayTransacciones[itemArray].Descripcion);
            $("#Btnguardar").attr("value", "Actualizar");
            $("#Select_EmpresaNit").attr("disabled", "disabled");


            $('.C_Chosen').trigger('chosen:updated');

        }
    }
}

//grid sin botones para ver resultado
function Tabla_consulta() {
    var html_Transacciones = "<table id='TTransacciones' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Nit Empresa</th><th>Codigo</th><th>Descripción</th></tr></thead><tbody>";
    for (itemArray in ArrayTransacciones) {
        if (ArrayTransacciones[itemArray].Transacciones_ID != 0) {
            html_Transacciones += "<tr id= 'TTransacciones_" + ArrayTransacciones[itemArray].Transacciones_ID + "'><td>" + ArrayTransacciones[itemArray].Nit_ID + "</td><td>" + ArrayTransacciones[itemArray].Transacciones_ID + "</td><td>" + ArrayTransacciones[itemArray].Descripcion + "</td></tr>";
        }
    }
    html_Transacciones += "</tbody></table>";
    $("#container_TTransacciones").html("");
    $("#container_TTransacciones").html(html_Transacciones);

    $("#TTransacciones").dataTable({
        "bJQueryUI": true,
        "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//evento del boton salir
function x() {
    $("#dialog").dialog("close");
}

//limpiar campos
function Clear() {
    $("#Select_EmpresaNit").val("-1");
    $("#Txt_ID").val("");
    $("#TxtDescripcion").val("");
    $("#TxtRead").val("");
    $("#DDLColumns").val("-1");
    $('.C_Chosen').trigger('chosen:updated');

}