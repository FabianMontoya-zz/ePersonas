/*--------------- region de variables globales --------------------*/
var ArrayInvPuerta = [];
var ArrayCombo = [];
var ArrayInvPuertaDep = [];
var ArraySeguridad = [];

var estado;
var editNit_ID;
var index_ID;
var editID;

var Vigencia = "";
var Nit_Proccess = "";

/*--------------- region de variables globales --------------------*/

//evento load de los Links
$(document).ready(function () {

    transacionAjax_EmpresaNit('Cliente');

    $("#ESelect").css("display", "none");
    $("#Img1").css("display", "none");
    $("#Img2").css("display", "none");
    $("#Img3").css("display", "none");
    $("#Img5").css("display", "none");
    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WE").css("display", "none");
    $("#TR_Fechas").css("display", "none");
    $("#Complementos_c").css("display", "none");

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
        $("#TxtFechaInicial").datepicker({ dateFormat: 'yy-mm-dd' });
        $("#TxtFechaFinal").datepicker({ dateFormat: 'yy-mm-dd' });
    });
    Capture_Tarjeta_ID();
    Change_Select_Vigencia();
    $("#TxtIDTarjeta").focus();
});

function Capture_Tarjeta_ID() {
    $("#TxtIDTarjeta").change(function () {
        var StrID = $(this).val();
        if (StrID.length == 10) {
            ValidaParametros();
            $("#TxtIDTarjeta").attr("disabled", "disabled");
            $("#Complementos_c").css("display", "inline-table");
        }
        else {
            $("#TxtIDTarjeta").removeAttr("disabled");
            $("#Complementos_c").css("display", "none");
        }
    });

}


//verifica si vienen parametros por la ruta 
function ValidaParametros() {

    for (item in ArrayMenu) {
        if (ArrayMenu[item].Tipo == 2) {
            if (ArrayMenu[item].IDlink == Link) {
                Nit_Proccess = ArrayMenu[item].Parametro_1;
                Vigencia = ArrayMenu[item].Parametro_2;
                ModalidadVista();
            }
        }
    }
}

var TypeValida;
//muestra el tipo de vista para el carge de niventario
function ModalidadVista() {
    switch (Nit_Proccess.length) {
        case 0:
            TypeValida = 1;
            $("#Select_EmpresaNit").removeAttr("disabled");
            break;

        default:
            TypeValida = 2;
            $("#Select_EmpresaNit").val(Nit_Proccess);
            $("#Select_EmpresaNit").attr("disabled", "disabled");
            break;
    }
    $('.C_Chosen').trigger('chosen:updated');

    switch (Vigencia) {
        case "N":
            TypeValida = TypeValida + "_1";
            $("#TR_Vigencia").css("display", "none");
            break;

        case "S":
            TypeValida = TypeValida + "_2";
            $("#TR_Vigencia").css("display", "inline-table");
            break;

        default:
            TypeValida = TypeValida + "_0";
            $("#TR_Vigencia").css("display", "inline-table");
            break;
    }
    console.log(TypeValida);
}

//valida campos de fechas
function Change_Select_Vigencia() {
    $("#Select_CheckVigencia").change(function () {
        if ($(this).val() == "S")
            $("#TR_Fechas").css("display", "inline-table");
        else
            $("#TR_Fechas").css("display", "none");

    });

}

//salida del formulario
function btnSalir() {
    window.location = "../../Menu/menu.aspx?User=" + $("#User").html() + "&L_L=" + Link;
}


//consulta del del crud(READ)
function BtnConsulta() {

    var filtro;
    var ValidateSelect = ValidarDroplist();
    var opcion;

    if (ValidateSelect == 1) {
        filtro = "N";
        opcion = "ALL";
        transacionAjax_InvPuerta("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_InvPuerta("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_InvPuerta_create("crear");
        }
        else {
            transacionAjax_InvPuerta_create("modificar");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    transacionAjax_InvPuerta_delete("elimina");
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
function Table_InvPuerta() {

    var html_InvPuerta;
    var Index_Pos = 0;
    switch (estado) {

        case "buscar":
            html_InvPuerta = "<table id='TInvPuerta' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Empresa</th><th>Codigo</th><th>Descripcion</th><th>Cod Numerico</th><th>Cod Alfa-Numerico</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayInvPuerta) {
                if (ArrayInvPuerta[itemArray].InvPuerta_ID != 0) {
                    html_InvPuerta += "<tr id= 'TInvPuerta_" + ArrayInvPuerta[itemArray].InvPuerta_ID + "'><td>" + ArrayInvPuerta[itemArray].Nit_ID + " - " + ArrayInvPuerta[itemArray].DescripEmpresa + "</td><td>" + ArrayInvPuerta[itemArray].InvPuerta_ID + "</td><td>" + ArrayInvPuerta[itemArray].Descripcion + "</td><td>" + ArrayInvPuerta[itemArray].Cod_Numeric + "</td><td>" + ArrayInvPuerta[itemArray].Cod_AlfaNumeric + "</td><td>" + ArrayInvPuerta[itemArray].UsuarioCreacion + "</td><td>" + ArrayInvPuerta[itemArray].FechaCreacion + "</td><td>" + ArrayInvPuerta[itemArray].UsuarioActualizacion + "</td><td>" + ArrayInvPuerta[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "modificar":
            html_InvPuerta = "<table id='TInvPuerta' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Editar</th><th>Empresa</th><th>Codigo</th><th>Descripcion</th><th>Cod Numerico</th><th>Cod Alfa-Numerico</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayInvPuerta) {
                if (ArrayInvPuerta[itemArray].InvPuerta_ID != 0) {
                    Index_Pos = parseInt(ArrayInvPuerta[itemArray].Index) - 1;
                    html_InvPuerta += "<tr id= 'TInvPuerta_" + ArrayInvPuerta[itemArray].InvPuerta_ID + "'><td><input type ='radio' class= 'Editar' name='editar' onclick=\"Editar('" + Index_Pos + "')\"></input></td><td>" + ArrayInvPuerta[itemArray].Nit_ID + " - " + ArrayInvPuerta[itemArray].DescripEmpresa + "</td><td>" + ArrayInvPuerta[itemArray].InvPuerta_ID + "</td><td>" + ArrayInvPuerta[itemArray].Descripcion + "</td><td>" + ArrayInvPuerta[itemArray].Cod_Numeric + "</td><td>" + ArrayInvPuerta[itemArray].Cod_AlfaNumeric + "</td><td>" + ArrayInvPuerta[itemArray].UsuarioCreacion + "</td><td>" + ArrayInvPuerta[itemArray].FechaCreacion + "</td><td>" + ArrayInvPuerta[itemArray].UsuarioActualizacion + "</td><td>" + ArrayInvPuerta[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "eliminar":
            html_InvPuerta = "<table id='TInvPuerta' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Empresa</th><th>Codigo</th><th>Descripcion</th><th>Cod Numerico</th><th>Cod Alfa-Numerico</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayInvPuerta) {
                if (ArrayInvPuerta[itemArray].InvPuerta_ID != 0) {
                    Index_Pos = parseInt(ArrayInvPuerta[itemArray].Index) - 1;
                    html_InvPuerta += "<tr id= 'TInvPuerta_" + ArrayInvPuerta[itemArray].InvPuerta_ID + "'><td><input type ='radio' class= 'Eliminar' name='eliminar' onclick=\"Eliminar('" + Index_Pos + "')\"></input></td><td>" + ArrayInvPuerta[itemArray].Nit_ID + " - " + ArrayInvPuerta[itemArray].DescripEmpresa + "</td><td>" + ArrayInvPuerta[itemArray].InvPuerta_ID + "</td><td>" + ArrayInvPuerta[itemArray].Descripcion + "</td><td>" + ArrayInvPuerta[itemArray].Cod_Numeric + "</td><td>" + ArrayInvPuerta[itemArray].Cod_AlfaNumeric + "</td><td>" + ArrayInvPuerta[itemArray].UsuarioCreacion + "</td><td>" + ArrayInvPuerta[itemArray].FechaCreacion + "</td><td>" + ArrayInvPuerta[itemArray].UsuarioActualizacion + "</td><td>" + ArrayInvPuerta[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;
    }

    html_InvPuerta += "</tbody></table>";
    $("#container_TInvPuerta").html("");
    $("#container_TInvPuerta").html(html_InvPuerta);

    $(".Eliminar").click(function () {
    });

    $(".Editar").click(function () {
    });

    $("#TInvPuerta").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });

}


//muestra el registro a eliminar
function Eliminar(Index_GrpDocumento) {

    editNit_ID = ArrayInvPuerta[Index_GrpDocumento].Nit_ID;
    editID = ArrayInvPuerta[Index_GrpDocumento].InvPuerta_ID;

    $("#dialog_eliminar").dialog("option", "title", "Eliminar?");
    $("#dialog_eliminar").dialog("open");

}

// muestra el registro a editar
function Editar(Index_GrpDocumento) {

    $("#TablaDatos_D").css("display", "inline-table");
    $("#TablaConsulta").css("display", "none");

    editNit_ID = ArrayInvPuerta[Index_GrpDocumento].Nit_ID;
    editID = ArrayInvPuerta[Index_GrpDocumento].InvPuerta_ID;

    $("#Select_EmpresaNit").val(ArrayInvPuerta[Index_GrpDocumento].Nit_ID);
    $("#Txt_ID").val(ArrayInvPuerta[Index_GrpDocumento].InvPuerta_ID);
    $("#TxtDescription").val(ArrayInvPuerta[Index_GrpDocumento].Descripcion);
    $("#TxtCNumeric").val(ArrayInvPuerta[Index_GrpDocumento].Cod_Numeric);
    $("#TxtCAlfaNumeric").val(ArrayInvPuerta[Index_GrpDocumento].Cod_AlfaNumeric);

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