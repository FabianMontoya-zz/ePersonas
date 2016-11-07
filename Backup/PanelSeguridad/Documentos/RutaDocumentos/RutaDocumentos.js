/*--------------- region de variables globales --------------------*/
var ArrayRutaDocumentos = [];
var ArrayCombo = [];
var ArrayRutaDocumentosDep = [];
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
            $("#container_TRutaDocumentos").html("");
            estado = opcion;
            Clear();
            break;

        case "modificar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TRutaDocumentos").html("");
            estado = opcion;
            ResetError();
            Clear();
            break;

        case "eliminar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TRutaDocumentos").html("");
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
        transacionAjax_RutaDocumentos("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_RutaDocumentos("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_RutaDocumentos_create("crear");
        }
        else {
            transacionAjax_RutaDocumentos_create("modificar");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    transacionAjax_RutaDocumentos_delete("elimina");
}


//validamos campos para la creacion del link
function validarCamposCrear() {

    var Campo_1 = $("#Select_EmpresaNit").val();
    var Campo_2 = $("#Txt_ID").val();
    var Campo_3 = $("#TxtDescription").val();
 
    var validar = 0;

    if ( Campo_3 == "" || Campo_2 == "" || Campo_1 == "-1") {
        validar = 1;

        if (Campo_1 == "-1") {
            $("#Img1").css("display", "inline-table");
        }
        else {
            $("#Img1").css("display", "none");
        }

        if (Campo_2 == "") {
            $("#Img2").css("display", "inline-table");
        }
        else {
            $("#Img2").css("display", "none");
        }
        if (Campo_3 == "") {
            $("#Img3").css("display", "inline-table");
        }
        else {
            $("#Img3").css("display", "none");
        }
    }
    else {
        $("#Img1").css("display", "none");
        $("#Img2").css("display", "none");
        $("#Img3").css("display", "none");
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
function Table_RutaDocumentos() {

    var html_RutaDocumentos;
    var Index_Pos = 0;
    switch (estado) {

        case "buscar":
            html_RutaDocumentos = "<table id='TRutaDocumentos' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Empresa</th><th>Codigo</th><th>Ruta</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayRutaDocumentos) {
                if (ArrayRutaDocumentos[itemArray].RutaDocumentos_ID != 0) {
                    html_RutaDocumentos += "<tr id= 'TRutaDocumentos_" + ArrayRutaDocumentos[itemArray].RutaDocumentos_ID + "'><td>" + ArrayRutaDocumentos[itemArray].Nit_ID + " - " + ArrayRutaDocumentos[itemArray].DescripEmpresa + "</td><td>" + ArrayRutaDocumentos[itemArray].RutaDocumentos_ID + "</td><td>" + ArrayRutaDocumentos[itemArray].Ruta + "</td><td>" + ArrayRutaDocumentos[itemArray].UsuarioCreacion + "</td><td>" + ArrayRutaDocumentos[itemArray].FechaCreacion + "</td><td>" + ArrayRutaDocumentos[itemArray].UsuarioActualizacion + "</td><td>" + ArrayRutaDocumentos[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "modificar":
            html_RutaDocumentos = "<table id='TRutaDocumentos' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Editar</th><th>Empresa</th><th>Codigo</th><th>Ruta</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayRutaDocumentos) {
                if (ArrayRutaDocumentos[itemArray].RutaDocumentos_ID != 0) {
                    Index_Pos = parseInt(ArrayRutaDocumentos[itemArray].Index) - 1;
                    html_RutaDocumentos += "<tr id= 'TRutaDocumentos_" + ArrayRutaDocumentos[itemArray].RutaDocumentos_ID + "'><td><input type ='radio' class= 'Editar' name='editar' onclick=\"Editar('" + Index_Pos + "')\"></input></td><td>" + ArrayRutaDocumentos[itemArray].Nit_ID + " - " + ArrayRutaDocumentos[itemArray].DescripEmpresa + "</td><td>" + ArrayRutaDocumentos[itemArray].RutaDocumentos_ID + "</td><td>" + ArrayRutaDocumentos[itemArray].Ruta + "</td><td>" + ArrayRutaDocumentos[itemArray].UsuarioCreacion + "</td><td>" + ArrayRutaDocumentos[itemArray].FechaCreacion + "</td><td>" + ArrayRutaDocumentos[itemArray].UsuarioActualizacion + "</td><td>" + ArrayRutaDocumentos[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "eliminar":
            html_RutaDocumentos = "<table id='TRutaDocumentos' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Empresa</th><th>Codigo</th><th>Ruta</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayRutaDocumentos) {
                if (ArrayRutaDocumentos[itemArray].RutaDocumentos_ID != 0) {
                    Index_Pos = parseInt(ArrayRutaDocumentos[itemArray].Index) - 1;
                    html_RutaDocumentos += "<tr id= 'TRutaDocumentos_" + ArrayRutaDocumentos[itemArray].RutaDocumentos_ID + "'><td><input type ='radio' class= 'Eliminar' name='eliminar' onclick=\"Eliminar('" + Index_Pos + "')\"></input></td><td>" + ArrayRutaDocumentos[itemArray].Nit_ID + " - " + ArrayRutaDocumentos[itemArray].DescripEmpresa + "</td><td>" + ArrayRutaDocumentos[itemArray].RutaDocumentos_ID + "</td><td>" + ArrayRutaDocumentos[itemArray].Ruta + "</td><td>" + ArrayRutaDocumentos[itemArray].UsuarioCreacion + "</td><td>" + ArrayRutaDocumentos[itemArray].FechaCreacion + "</td><td>" + ArrayRutaDocumentos[itemArray].UsuarioActualizacion + "</td><td>" + ArrayRutaDocumentos[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;
    }

    html_RutaDocumentos += "</tbody></table>";
    $("#container_TRutaDocumentos").html("");
    $("#container_TRutaDocumentos").html(html_RutaDocumentos);

    $(".Eliminar").click(function () {
    });

    $(".Editar").click(function () {
    });

    $("#TRutaDocumentos").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });

}


//muestra el registro a eliminar
function Eliminar(Index_GrpDocumento) {

    editNit_ID = ArrayRutaDocumentos[Index_GrpDocumento].Nit_ID;
    editID = ArrayRutaDocumentos[Index_GrpDocumento].RutaDocumentos_ID;

    $("#dialog_eliminar").dialog("option", "title", "Eliminar?");
    $("#dialog_eliminar").dialog("open");

}

// muestra el registro a editar
function Editar(Index_GrpDocumento) {

    $("#TablaDatos_D").css("display", "inline-table");
    $("#TablaConsulta").css("display", "none");
    
    editNit_ID = ArrayRutaDocumentos[Index_GrpDocumento].Nit_ID;
    editID = ArrayRutaDocumentos[Index_GrpDocumento].RutaDocumentos_ID;

    $("#Select_EmpresaNit").val(ArrayRutaDocumentos[Index_GrpDocumento].Nit_ID);
    $("#Txt_ID").val(ArrayRutaDocumentos[Index_GrpDocumento].RutaDocumentos_ID);
    $("#TxtDescription").val(ArrayRutaDocumentos[Index_GrpDocumento].Ruta);
  
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
 
    $("#TxtRead").val("");
    $("#DDLColumns").val("-1");

    $('.C_Chosen').trigger('chosen:updated');

}