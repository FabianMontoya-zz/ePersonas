/*--------------- region de variables globales --------------------*/
var ArrayMonedaCot = [];
var ArrayCombo = [];
var ArrayMoneda = [];

var estado;
var editID;
/*--------------- region de variables globales --------------------*/

//evento load de los Links
$(document).ready(function () {
    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
    transacionAjax_Moneda('Moneda');

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

    $(function () {
        $("#Txt_Fecha").datepicker({ dateFormat: 'yy-mm-dd' });
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
            break;

        case "buscar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TMonedaCot").html("");
            estado = opcion;
            Clear();
            break;

        case "modificar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TMonedaCot").html("");
            estado = opcion;
            ResetError();
            Clear();
            break;

        case "eliminar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TMonedaCot").html("");
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

// crea la tabla en el cliente
function Table_MonedaCot() {

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
    var html_MonedaCot = "<table id='TMonedaCot' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Codigo</th><th>Fecha</th><th>Valor</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
    for (itemArray in ArrayMonedaCot) {
        if (ArrayMonedaCot[itemArray].MonedaCot_ID != 0) {
            html_MonedaCot += "<tr id= 'TMonedaCot_" + ArrayMonedaCot[itemArray].MonedaCot_ID + "'><td><input type ='radio' class= 'Eliminar' name='eliminar' onclick=\"Eliminar('" + ArrayMonedaCot[itemArray].MonedaCot_ID + "')\"></input></td><td>" + ArrayMonedaCot[itemArray].MonedaCot_ID + " - " + ArrayMonedaCot[itemArray].DescripMoneda + "</td><td>" + valFecha(ArrayMonedaCot[itemArray].Fecha) + "</td><td>" + ArrayMonedaCot[itemArray].ValorCotizacion+ "</td><td>" + ArrayMonedaCot[itemArray].UsuarioCreacion + "</td><td>" + ArrayMonedaCot[itemArray].FechaCreacion + "</td><td>" + ArrayMonedaCot[itemArray].UsuarioActualizacion + "</td><td>" + ArrayMonedaCot[itemArray].FechaActualizacion + "</td></tr>";
        }
    }
    html_MonedaCot += "</tbody></table>";
    $("#container_TMonedaCot").html("");
    $("#container_TMonedaCot").html(html_MonedaCot);

    $(".Eliminar").click(function () {
    });

    $("#TMonedaCot").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Eliminar(index_MonedaCot) {

    for (itemArray in ArrayMonedaCot) {
        if (index_MonedaCot == ArrayMonedaCot[itemArray].MonedaCot_ID) {
            editID = ArrayMonedaCot[itemArray].MonedaCot_ID;
            $("#dialog_eliminar").dialog("option", "title", "Eliminar?");
            $("#dialog_eliminar").dialog("open");
        }
    }

}

//grid con el boton editar
function Tabla_modificar() {
    var html_MonedaCot = "<table id='TMonedaCot' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Editar</th><th>Codigo</th><th>Fecha</th><th>Valor</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
    for (itemArray in ArrayMonedaCot) {
        if (ArrayMonedaCot[itemArray].MonedaCot_ID != 0) {
            html_MonedaCot += "<tr id= 'TMonedaCot_" + ArrayMonedaCot[itemArray].MonedaCot_ID + "'><td><input type ='radio' class= 'Editar' name='editar' onclick=\"Editar('" + ArrayMonedaCot[itemArray].MonedaCot_ID + "')\"></input></td><td>" + ArrayMonedaCot[itemArray].MonedaCot_ID + " - " + ArrayMonedaCot[itemArray].DescripMoneda + "</td><td>" + valFecha(ArrayMonedaCot[itemArray].Fecha) + "</td><td>" + ArrayMonedaCot[itemArray].ValorCotizacion+ "</td><td>" + ArrayMonedaCot[itemArray].UsuarioCreacion + "</td><td>" + ArrayMonedaCot[itemArray].FechaCreacion + "</td><td>" + ArrayMonedaCot[itemArray].UsuarioActualizacion + "</td><td>" + ArrayMonedaCot[itemArray].FechaActualizacion + "</td></tr>";
        }
    }
    html_MonedaCot += "</tbody></table>";
    $("#container_TMonedaCot").html("");
    $("#container_TMonedaCot").html(html_MonedaCot);

    $(".Editar").click(function () {
    });

    $("#TMonedaCot").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

// muestra el registro a editar
function Editar(index_MonedaCot) {

    $("#TablaDatos_D").css("display", "inline-table");
    $("#TablaConsulta").css("display", "none");

    for (itemArray in ArrayMonedaCot) {
        if (index_MonedaCot == ArrayMonedaCot[itemArray].MonedaCot_ID) {
            $("#Select_Moneda").val(ArrayMonedaCot[itemArray].MonedaCot_ID);
            $("#Select_Moneda").attr("disabled", "disabled");
            $("#Txt_Fecha").val(valFecha(ArrayMonedaCot[itemArray].Fecha));
            $("#Txt_Valor").val(ArrayMonedaCot[itemArray].ValorCotizacion);
            editID = ArrayMonedaCot[itemArray].MonedaCot_ID;
            $("#Btnguardar").attr("value", "Actualizar");

            $('.C_Chosen').trigger('chosen:updated');

        }
    }
}

//grid sin botones para ver resultado
function Tabla_consulta() {
    var html_MonedaCot = "<table id='TMonedaCot' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Codigo</th><th>Fecha</th><th>Valor</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
    for (itemArray in ArrayMonedaCot) {
        if (ArrayMonedaCot[itemArray].MonedaCot_ID != 0) {
            html_MonedaCot += "<tr id= 'TMonedaCot_" + ArrayMonedaCot[itemArray].MonedaCot_ID + "'><td>" + ArrayMonedaCot[itemArray].MonedaCot_ID + " - " + ArrayMonedaCot[itemArray].DescripMoneda + "</td><td>" + valFecha(ArrayMonedaCot[itemArray].Fecha) + "</td><td>" + ArrayMonedaCot[itemArray].ValorCotizacion+ "</td><td>" + ArrayMonedaCot[itemArray].UsuarioCreacion + "</td><td>" + ArrayMonedaCot[itemArray].FechaCreacion + "</td><td>" + ArrayMonedaCot[itemArray].UsuarioActualizacion + "</td><td>" + ArrayMonedaCot[itemArray].FechaActualizacion + "</td></tr>";
        }
    }
    html_MonedaCot += "</tbody></table>";
    $("#container_TMonedaCot").html("");
    $("#container_TMonedaCot").html(html_MonedaCot);

    $("#TMonedaCot").dataTable({
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

    $("#Select_Moneda").val("-1");
    $("#Txt_Fecha").val("");
    $("#Txt_Valor").val("");

    $("#TxtRead").val("");
    $("#DDLColumns").val("-1");

    $('.C_Chosen').trigger('chosen:updated');

}
