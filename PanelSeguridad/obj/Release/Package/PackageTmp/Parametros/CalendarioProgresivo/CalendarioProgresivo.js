/*--------------- region de variables globales --------------------*/
var ArrayCalendarioProgresivo = [];
var ArrayCombo = [];
var ArrayCalendarioProgresivoDep = [];
var ArraySeguridad = [];

var estado;
var editNit_ID;
var index_ID;
var editID;
/*--------------- region de variables globales --------------------*/

//evento load de los Links
$(document).ready(function () {
    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
    transacionAjax_EmpresaNit('Cliente');

    $("#ESelect").css("display", "none");
    $("#Img1").css("display", "none");
    $("#Img2").css("display", "none");
    $("#Img3").css("display", "none");
    $("#Img5").css("display", "none");
    $("#Img6").css("display", "none");
    
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
        $("#Txtfecha").datepicker({ dateFormat: 'yy-mm-dd' });
        $("#txt_HI").timepicker();
        $("#txt_HF").timepicker();
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
            $("#Select_EmpresaNit").removeAttr("disabled");
            $("#Txt_ID").removeAttr("disabled");
            $("#Btnguardar").attr("value", "Guardar");
            $('.C_Chosen').trigger('chosen:updated');
            ResetError();
            Clear();
            estado = opcion;
            break;

        case "buscar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TGrid").html("");
            estado = opcion;
            Clear();
            break;

        case "modificar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TGrid").html("");
            estado = opcion;
            ResetError();
            Clear();
            break;

        case "eliminar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TGrid").html("");
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
        transacionAjax_CalendarioProgresivo("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_CalendarioProgresivo("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_CalendarioProgresivo_create("crear");
        }
        else {
            transacionAjax_CalendarioProgresivo_create("modificar");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    transacionAjax_CalendarioProgresivo_delete("elimina");
}

//validamos campos para la creacion del link
function validarCamposCrear() {

    var Campo_1 = $("#Select_EmpresaNit").val();
    var Campo_2 = $("#Txt_ID").val();
    var Campo_3 = $("#TxtDescription").val();
    var Campo_4 = $("#Select_TipoCalendarioProgresivo ").val();

    var validar = 0;

    if (Campo_4 == "-1" || Campo_3 == "" || Campo_2 == "" || Campo_1 == "-1") {
        validar = 1;
        if (Campo_1 == "-1") { $("#Img1").css("display", "inline-table"); } else { $("#Img1").css("display", "none"); }
        if (Campo_2 == "") { $("#Img2").css("display", "inline-table"); } else { $("#Img2").css("display", "none"); }
        if (Campo_3 == "") { $("#Img3").css("display", "inline-table"); } else { $("#Img3").css("display", "none"); }
        if (Campo_4 == "-1") { $("#Img5").css("display", "inline-table"); } else { $("#Img5").css("display", "none"); }
    }
    else {
        $("#Img1").css("display", "none");
        $("#Img2").css("display", "none");
        $("#Img3").css("display", "none");
        $("#Img5").css("display", "none");
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
function Table_CalendarioProgresivo() {
    var html_CalendarioProgresivo;

    switch (estado) {

        case "buscar":
            html_CalendarioProgresivo = "<table id='TCalendarioProgresivo' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Empresa</th><th>Codigo</th><th>Descripción</th><th>Tipo CalendarioProgresivo</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayCalendarioProgresivo) {
                if (ArrayCalendarioProgresivo[itemArray].CalendarioProgresivo_ID != 0) {
                    html_CalendarioProgresivo += "<tr id= 'TCalendarioProgresivo_" + ArrayCalendarioProgresivo[itemArray].CalendarioProgresivo_ID + "'><td>" + ArrayCalendarioProgresivo[itemArray].Nit_ID + " - " + ArrayCalendarioProgresivo[itemArray].DescripEmpresa + "</td><td>" + ArrayCalendarioProgresivo[itemArray].CalendarioProgresivo_ID + "</td><td>" + ArrayCalendarioProgresivo[itemArray].Descripcion + "</td><td>" + ArrayCalendarioProgresivo[itemArray].TipoCalendarioProgresivo + " - " + ArrayCalendarioProgresivo[itemArray].DescripTipoCalendarioProgresivo + "</td><td>" + ArrayCalendarioProgresivo[itemArray].UsuarioCreacion + "</td><td>" + ArrayCalendarioProgresivo[itemArray].FechaCreacion + "</td><td>" + ArrayCalendarioProgresivo[itemArray].UsuarioActualizacion + "</td><td>" + ArrayCalendarioProgresivo[itemArray].FechaActualizacion + "</td></tr>";
                }
            } break;

        case "modificar":
            html_CalendarioProgresivo = "<table id='TCalendarioProgresivo' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Editar</th><th>Empresa</th><th>Codigo</th><th>Descripción</th><th>Tipo CalendarioProgresivo</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayCalendarioProgresivo) {
                if (ArrayCalendarioProgresivo[itemArray].CalendarioProgresivo_ID != 0) {
                    html_CalendarioProgresivo += "<tr id= 'TCalendarioProgresivo_" + ArrayCalendarioProgresivo[itemArray].CalendarioProgresivo_ID + "'><td><input type ='radio' class= 'Editar' name='editar' onclick=\"Editar('" + ArrayCalendarioProgresivo[itemArray].Nit_ID + "','" + ArrayCalendarioProgresivo[itemArray].CalendarioProgresivo_ID + "')\"></input></td><td>" + ArrayCalendarioProgresivo[itemArray].Nit_ID + " - " + ArrayCalendarioProgresivo[itemArray].DescripEmpresa + "</td><td>" + ArrayCalendarioProgresivo[itemArray].CalendarioProgresivo_ID + "</td><td>" + ArrayCalendarioProgresivo[itemArray].Descripcion + "</td><td>" + ArrayCalendarioProgresivo[itemArray].TipoCalendarioProgresivo + " - " + ArrayCalendarioProgresivo[itemArray].DescripTipoCalendarioProgresivo + "</td><td>" + ArrayCalendarioProgresivo[itemArray].UsuarioCreacion + "</td><td>" + ArrayCalendarioProgresivo[itemArray].FechaCreacion + "</td><td>" + ArrayCalendarioProgresivo[itemArray].UsuarioActualizacion + "</td><td>" + ArrayCalendarioProgresivo[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "eliminar":
            html_CalendarioProgresivo = "<table id='TCalendarioProgresivo' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Empresa</th><th>Codigo</th><th>Descripción</th><th>Tipo CalendarioProgresivo</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayCalendarioProgresivo) {
                if (ArrayCalendarioProgresivo[itemArray].CalendarioProgresivo_ID != 0) {
                    html_CalendarioProgresivo += "<tr id= 'TCalendarioProgresivo_" + ArrayCalendarioProgresivo[itemArray].CalendarioProgresivo_ID + "'><td><input type ='radio' class= 'Eliminar' name='eliminar' onclick=\"Eliminar('" + ArrayCalendarioProgresivo[itemArray].Nit_ID + "','" + ArrayCalendarioProgresivo[itemArray].CalendarioProgresivo_ID + "')\"></input></td><td>" + ArrayCalendarioProgresivo[itemArray].Nit_ID + " - " + ArrayCalendarioProgresivo[itemArray].DescripEmpresa + "</td><td>" + ArrayCalendarioProgresivo[itemArray].CalendarioProgresivo_ID + "</td><td>" + ArrayCalendarioProgresivo[itemArray].Descripcion + "</td><td>" + ArrayCalendarioProgresivo[itemArray].TipoCalendarioProgresivo + " - " + ArrayCalendarioProgresivo[itemArray].DescripTipoCalendarioProgresivo + "</td><td>" + ArrayCalendarioProgresivo[itemArray].UsuarioCreacion + "</td><td>" + ArrayCalendarioProgresivo[itemArray].FechaCreacion + "</td><td>" + ArrayCalendarioProgresivo[itemArray].UsuarioActualizacion + "</td><td>" + ArrayCalendarioProgresivo[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;
    }

    html_CalendarioProgresivo += "</tbody></table>";
    $("#container_TGrid").html("");
    $("#container_TGrid").html(html_CalendarioProgresivo);

    $(".Eliminar").click(function () {
    });

    $(".Editar").click(function () {
    });

    $("#TCalendarioProgresivo").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Eliminar(index_Nit, index_CalendarioProgresivo) {

    for (itemArray in ArrayCalendarioProgresivo) {
        if (index_Nit == ArrayCalendarioProgresivo[itemArray].Nit_ID && index_CalendarioProgresivo == ArrayCalendarioProgresivo[itemArray].CalendarioProgresivo_ID) {

            editNit_ID = ArrayCalendarioProgresivo[itemArray].Nit_ID;
            editID = ArrayCalendarioProgresivo[itemArray].CalendarioProgresivo_ID;
            $("#dialog_eliminar").dialog("option", "title", "Eliminar?");
            $("#dialog_eliminar").dialog("open");
        }
    }

}

// muestra el registro a editar
function Editar(index_Nit, index_CalendarioProgresivo) {

    $("#TablaDatos_D").css("display", "inline-table");
    $("#TablaConsulta").css("display", "none");

    for (itemArray in ArrayCalendarioProgresivo) {
        if (index_Nit == ArrayCalendarioProgresivo[itemArray].Nit_ID && index_CalendarioProgresivo == ArrayCalendarioProgresivo[itemArray].CalendarioProgresivo_ID) {

            editNit_ID = ArrayCalendarioProgresivo[itemArray].Nit_ID;
            editID = ArrayCalendarioProgresivo[itemArray].CalendarioProgresivo_ID;

            $("#Select_EmpresaNit").val(ArrayCalendarioProgresivo[itemArray].Nit_ID);
            $("#Txt_ID").val(ArrayCalendarioProgresivo[itemArray].CalendarioProgresivo_ID);

            $("#Select_EmpresaNit").attr("disabled", "disabled");
            $("#Txt_ID").attr("disabled", "disabled");

            $("#TxtDescription").val(ArrayCalendarioProgresivo[itemArray].Descripcion);
            $("#Select_TipoCalendarioProgresivo").val(ArrayCalendarioProgresivo[itemArray].TipoCalendarioProgresivo);

            $("#Btnguardar").attr("value", "Actualizar");

            $('.C_Chosen').trigger('chosen:updated');
        }
    }
}


//funcion de carga de la dependecia para edicion
function ChargeDependencia(index) {
    $('#Select_CalendarioProgresivoDepent').val(index);
    $('.C_Chosen').trigger('chosen:updated');
}

//evento del boton salir
function x() {
    $("#dialog").dialog("close");
}

//limpiar campos
function Clear() {
    $("#Select_EmpresaNit").val("-1");
    $("#Txt_ID").val("");
    $("#TxtDescription").val("");
    $("#Select_TipoCalendarioProgresivo").val("-1");

    $("#TxtRead").val("");
    $("#DDLColumns").val("-1");

    $('.C_Chosen').trigger('chosen:updated');

}