/*--------------- region de variables globales --------------------*/
var ArrayConsecutivos_General = [];
var ArrayCombo = [];
var ArrayConsecutivos_GeneralDep = [];
var ArraySeguridad = [];

var estado;
var editNit_ID;
var index_ID;
var editID;
/*--------------- region de variables globales --------------------*/

//evento load de los Links
$(document).ready(function () {
    transacionAjax_CargaBusqueda_CG('cargar_droplist_busqueda');
    
     $("#ESelect").css("display", "none");
    $("#Img1").css("display", "none");
    $("#Img2").css("display", "none");
    $("#Img3").css("display", "none");
    $("#Img5").css("display", "none");
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
            $("#container_TConsecutivos_General").html("");
            estado = opcion;
            Clear();
            break;

        case "modificar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TConsecutivos_General").html("");
            estado = opcion;
            ResetError();
            Clear();
            break;

        case "eliminar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TConsecutivos_General").html("");
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
        transacionAjax_Consecutivos_General("consulta_G", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_Consecutivos_General("consulta_G", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_Consecutivos_General_create("crear_G");
        }
        else {
            transacionAjax_Consecutivos_General_create("modificar_G");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    transacionAjax_Consecutivos_General_delete("elimina_G");
}


//validamos campos para la creacion del link
function validarCamposCrear() {

    var Campo_1 = $("#Select_EmpresaNit").val();
    var Campo_2 = $("#Txt_ID").val();
    var Campo_3 = $("#TxtDescription").val();
    var Campo_4 = $("#TxtConsecutivo").val();

    var validar = 0;

    if (Campo_4 == "" || Campo_3 == "" || Campo_2 == "" || Campo_1 == "-1") {
        validar = 1;

        if (Campo_1 == "-1")
            $("#Img1").css("display", "inline-table");
        else
            $("#Img1").css("display", "none");

        if (Campo_2 == "")
            $("#Img2").css("display", "inline-table");
        else
            $("#Img2").css("display", "none");

        if (Campo_3 == "")
            $("#Img3").css("display", "inline-table");
        else
            $("#Img3").css("display", "none");

        if (Campo_4 == "")
            $("#Img5").css("display", "inline-table");
        else
            $("#Img5").css("display", "none");
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
function Table_Consecutivos_General() {

    var html_Consecutivos_General;
    var Index_Pos = 0;
    switch (estado) {

        case "buscar":
            html_Consecutivos_General = "<table id='TConsecutivos_General' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Descripción</th><th>Codigo</th><th>Consecutivo</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayConsecutivos_General) {
                if (ArrayConsecutivos_General[itemArray].Consecutivos_General_ID != 0) {
                    html_Consecutivos_General += "<tr id= 'TConsecutivos_General_" + ArrayConsecutivos_General[itemArray].Consecutivos_General_ID + "'><td>" + ArrayConsecutivos_General[itemArray].Descripcion + "</td><td>" + ArrayConsecutivos_General[itemArray].Consecutivo_ID + "</td><td>" + ArrayConsecutivos_General[itemArray].Consecutivo + "</td><td>" + ArrayConsecutivos_General[itemArray].UsuarioCreacion + "</td><td>" + ArrayConsecutivos_General[itemArray].FechaCreacion + "</td><td>" + ArrayConsecutivos_General[itemArray].UsuarioActualizacion + "</td><td>" + ArrayConsecutivos_General[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "modificar":
            html_Consecutivos_General = "<table id='TConsecutivos_General' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Editar</th><th>Descripción</th><th>Codigo</th><th>Consecutivo</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayConsecutivos_General) {
                if (ArrayConsecutivos_General[itemArray].Consecutivos_General_ID != 0) {
                    Index_Pos = parseInt(ArrayConsecutivos_General[itemArray].Index) - 1;
                    html_Consecutivos_General += "<tr id= 'TConsecutivos_General_" + ArrayConsecutivos_General[itemArray].Consecutivos_General_ID + "'><td><input type ='radio' class= 'Editar' name='editar' onclick=\"Editar('" + Index_Pos + "')\"></input></td><td>" + ArrayConsecutivos_General[itemArray].Descripcion + "</td><td>" + ArrayConsecutivos_General[itemArray].Consecutivo_ID + "</td><td>" + ArrayConsecutivos_General[itemArray].Consecutivo + "</td><td>" + ArrayConsecutivos_General[itemArray].UsuarioCreacion + "</td><td>" + ArrayConsecutivos_General[itemArray].FechaCreacion + "</td><td>" + ArrayConsecutivos_General[itemArray].UsuarioActualizacion + "</td><td>" + ArrayConsecutivos_General[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "eliminar":
            html_Consecutivos_General = "<table id='TConsecutivos_General' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Descripción</th><th>Codigo</th><th>Consecutivo</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayConsecutivos_General) {
                if (ArrayConsecutivos_General[itemArray].Consecutivos_General_ID != 0) {
                    Index_Pos = parseInt(ArrayConsecutivos_General[itemArray].Index) - 1;
                    html_Consecutivos_General += "<tr id= 'TConsecutivos_General_" + ArrayConsecutivos_General[itemArray].Consecutivos_General_ID + "'><td><input type ='radio' class= 'Eliminar' name='eliminar' onclick=\"Eliminar('" + Index_Pos + "')\"></input></td><td>" + ArrayConsecutivos_General[itemArray].Descripcion + "</td><td>" + ArrayConsecutivos_General[itemArray].Consecutivo_ID + "</td><td>" + ArrayConsecutivos_General[itemArray].Consecutivo + "</td><td>" + ArrayConsecutivos_General[itemArray].UsuarioCreacion + "</td><td>" + ArrayConsecutivos_General[itemArray].FechaCreacion + "</td><td>" + ArrayConsecutivos_General[itemArray].UsuarioActualizacion + "</td><td>" + ArrayConsecutivos_General[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;
    }

    html_Consecutivos_General += "</tbody></table>";
    $("#container_TConsecutivos_General").html("");
    $("#container_TConsecutivos_General").html(html_Consecutivos_General);

    $(".Eliminar").click(function () {
    });

    $(".Editar").click(function () {
    });

    $("#TConsecutivos_General").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });

}


//muestra el registro a eliminar
function Eliminar(Index) {

    editNit_ID = ArrayConsecutivos_General[Index].Nit_ID;
    editID = ArrayConsecutivos_General[Index].Consecutivo_ID;

    $("#dialog_eliminar").dialog("option", "title", "Eliminar?");
    $("#dialog_eliminar").dialog("open");

}

// muestra el registro a editar
function Editar(Index) {

    $("#TablaDatos_D").css("display", "inline-table");
    $("#TablaConsulta").css("display", "none");

    editNit_ID = ArrayConsecutivos_General[Index].Nit_ID;
    editID = ArrayConsecutivos_General[Index].Consecutivo_ID;

    $("#Select_EmpresaNit").val(ArrayConsecutivos_General[Index].Nit_ID);
    $("#Txt_ID").val(ArrayConsecutivos_General[Index].Consecutivo_ID);
    $("#TxtDescription").val(ArrayConsecutivos_General[Index].Descripcion);
    $("#TxtConsecutivo").val(ArrayConsecutivos_General[Index].Consecutivo);

    $("#Select_EmpresaNit").attr("disabled", "disabled");
    $("#Txt_ID").attr("disabled", "disabled");

    $("#Btnguardar").attr("value", "Actualizar");

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

    $("#TxtConsecutivo").val("");
    $("#TxtRead").val("");
    $("#DDLColumns").val("-1");

    $('.C_Chosen').trigger('chosen:updated');

}