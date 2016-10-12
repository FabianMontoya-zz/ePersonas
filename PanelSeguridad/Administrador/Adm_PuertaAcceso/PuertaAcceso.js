/*--------------- region de variables globales --------------------*/
var ArrayPuertaAcceso = [];
var ArrayCombo = [];
var ArrayPuertaAccesoDep = [];
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
            $("#container_TPuertaAcceso").html("");
            estado = opcion;
            Clear();
            break;

        case "modificar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TPuertaAcceso").html("");
            estado = opcion;
            ResetError();
            Clear();
            break;

        case "eliminar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TPuertaAcceso").html("");
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
        transacionAjax_PuertaAcceso("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_PuertaAcceso("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_PuertaAcceso_create("crear");
        }
        else {
            transacionAjax_PuertaAcceso_create("modificar");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    transacionAjax_PuertaAcceso_delete("elimina");
}


//validamos campos para la creacion del link
function validarCamposCrear() {

    var Campo_1 = $("#Select_EmpresaNit").val();
    var Campo_2 = $("#Txt_ID").val();

    var validar = 0;
    if (Campo_2 == "" || Campo_1 == "-1") {
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
      
    }
    else {
        $("#Img1").css("display", "none");
        $("#Img2").css("display", "none");
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
function Table_PuertaAcceso() {

    var html_PuertaAcceso;
    var Index_Pos = 0;
    switch (estado) {

        case "buscar":
            html_PuertaAcceso = "<table id='TPuertaAcceso' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Empresa</th><th>Codigo</th><th>Descripcion</th><th>Cod Numerico</th><th>Cod Alfa-Numerico</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayPuertaAcceso) {
                if (ArrayPuertaAcceso[itemArray].PuertaAcceso_ID != 0) {
                    html_PuertaAcceso += "<tr id= 'TPuertaAcceso_" + ArrayPuertaAcceso[itemArray].PuertaAcceso_ID + "'><td>" + ArrayPuertaAcceso[itemArray].Nit_ID + " - " + ArrayPuertaAcceso[itemArray].DescripEmpresa + "</td><td>" + ArrayPuertaAcceso[itemArray].PuertaAcceso_ID + "</td><td>" + ArrayPuertaAcceso[itemArray].Descripcion + "</td><td>" + ArrayPuertaAcceso[itemArray].Cod_Numeric + "</td><td>" + ArrayPuertaAcceso[itemArray].Cod_AlfaNumeric + "</td><td>" + ArrayPuertaAcceso[itemArray].UsuarioCreacion + "</td><td>" + ArrayPuertaAcceso[itemArray].FechaCreacion + "</td><td>" + ArrayPuertaAcceso[itemArray].UsuarioActualizacion + "</td><td>" + ArrayPuertaAcceso[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "modificar":
            html_PuertaAcceso = "<table id='TPuertaAcceso' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Editar</th><th>Empresa</th><th>Codigo</th><th>Descripcion</th><th>Cod Numerico</th><th>Cod Alfa-Numerico</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayPuertaAcceso) {
                if (ArrayPuertaAcceso[itemArray].PuertaAcceso_ID != 0) {
                    Index_Pos = parseInt(ArrayPuertaAcceso[itemArray].Index) - 1;
                    html_PuertaAcceso += "<tr id= 'TPuertaAcceso_" + ArrayPuertaAcceso[itemArray].PuertaAcceso_ID + "'><td><input type ='radio' class= 'Editar' name='editar' onclick=\"Editar('" + Index_Pos + "')\"></input></td><td>" + ArrayPuertaAcceso[itemArray].Nit_ID + " - " + ArrayPuertaAcceso[itemArray].DescripEmpresa + "</td><td>" + ArrayPuertaAcceso[itemArray].PuertaAcceso_ID + "</td><td>" + ArrayPuertaAcceso[itemArray].Descripcion + "</td><td>" + ArrayPuertaAcceso[itemArray].Cod_Numeric + "</td><td>" + ArrayPuertaAcceso[itemArray].Cod_AlfaNumeric + "</td><td>" + ArrayPuertaAcceso[itemArray].UsuarioCreacion + "</td><td>" + ArrayPuertaAcceso[itemArray].FechaCreacion + "</td><td>" + ArrayPuertaAcceso[itemArray].UsuarioActualizacion + "</td><td>" + ArrayPuertaAcceso[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "eliminar":
            html_PuertaAcceso = "<table id='TPuertaAcceso' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Empresa</th><th>Codigo</th><th>Descripcion</th><th>Cod Numerico</th><th>Cod Alfa-Numerico</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayPuertaAcceso) {
                if (ArrayPuertaAcceso[itemArray].PuertaAcceso_ID != 0) {
                    Index_Pos = parseInt(ArrayPuertaAcceso[itemArray].Index) - 1;
                    html_PuertaAcceso += "<tr id= 'TPuertaAcceso_" + ArrayPuertaAcceso[itemArray].PuertaAcceso_ID + "'><td><input type ='radio' class= 'Eliminar' name='eliminar' onclick=\"Eliminar('" + Index_Pos + "')\"></input></td><td>" + ArrayPuertaAcceso[itemArray].Nit_ID + " - " + ArrayPuertaAcceso[itemArray].DescripEmpresa + "</td><td>" + ArrayPuertaAcceso[itemArray].PuertaAcceso_ID + "</td><td>" + ArrayPuertaAcceso[itemArray].Descripcion + "</td><td>" + ArrayPuertaAcceso[itemArray].Cod_Numeric + "</td><td>" + ArrayPuertaAcceso[itemArray].Cod_AlfaNumeric + "</td><td>" + ArrayPuertaAcceso[itemArray].UsuarioCreacion + "</td><td>" + ArrayPuertaAcceso[itemArray].FechaCreacion + "</td><td>" + ArrayPuertaAcceso[itemArray].UsuarioActualizacion + "</td><td>" + ArrayPuertaAcceso[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;
    }

    html_PuertaAcceso += "</tbody></table>";
    $("#container_TPuertaAcceso").html("");
    $("#container_TPuertaAcceso").html(html_PuertaAcceso);

    $(".Eliminar").click(function () {
    });

    $(".Editar").click(function () {
    });

    $("#TPuertaAcceso").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });

}


//muestra el registro a eliminar
function Eliminar(Index_GrpDocumento) {

    editNit_ID = ArrayPuertaAcceso[Index_GrpDocumento].Nit_ID;
    editID = ArrayPuertaAcceso[Index_GrpDocumento].PuertaAcceso_ID;

    $("#dialog_eliminar").dialog("option", "title", "Eliminar?");
    $("#dialog_eliminar").dialog("open");

}

// muestra el registro a editar
function Editar(Index_GrpDocumento) {

    $("#TablaDatos_D").css("display", "inline-table");
    $("#TablaConsulta").css("display", "none");

    editNit_ID = ArrayPuertaAcceso[Index_GrpDocumento].Nit_ID;
    editID = ArrayPuertaAcceso[Index_GrpDocumento].PuertaAcceso_ID;

    $("#Select_EmpresaNit").val(ArrayPuertaAcceso[Index_GrpDocumento].Nit_ID);
    $("#Txt_ID").val(ArrayPuertaAcceso[Index_GrpDocumento].PuertaAcceso_ID);
    $("#TxtDescription").val(ArrayPuertaAcceso[Index_GrpDocumento].Descripcion);
    $("#TxtCNumeric").val(ArrayPuertaAcceso[Index_GrpDocumento].Cod_Numeric);
    $("#TxtCAlfaNumeric").val(ArrayPuertaAcceso[Index_GrpDocumento].Cod_AlfaNumeric);
    
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
    $("#TxtCNumeric").val("");
    $("#TxtCAlfaNumeric").val("");
    
    $("#TxtRead").val("");
    $("#DDLColumns").val("-1");

    $('.C_Chosen').trigger('chosen:updated');

}