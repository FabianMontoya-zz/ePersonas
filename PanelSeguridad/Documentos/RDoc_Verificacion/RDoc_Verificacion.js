/*--------------- region de variables globales --------------------*/
var Matrix_GrpDoc = [];
var Matrix_Doc = [];

var ArrayRDoc_Verificacion = [];
var ArrayCombo = [];
var ArrayRDoc_VerificacionDep = [];
var ArraySeguridad = [];

var estado;
var editNit_ID;
var index_ID;
var editID;
var editDocID;
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {
    transaccionAjax_MGrpDoc('MATRIX_GRPDOC');
    transaccionAjax_MDoc('MATRIX_DOC');
    Change_Select_Nit();
    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
    transacionAjax_EmpresaNit('Cliente');

    $("#ESelect").css("display", "none");
    $("#Img1").css("display", "none");
    $("#Img2").css("display", "none");
    $("#Img3").css("display", "none");
    $("#Img5").css("display", "none");
    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WA").css("display", "none");

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

//carga el combo de Area dependiente
function Change_Select_Nit() {
    $("#Select_EmpresaNit").change(function () {
        var index_ID = $(this).val();
        Charge_Combos_Depend_Nit(Matrix_Doc, "Select_Documento_1", index_ID, "");
        Charge_Combos_Depend_Nit(Matrix_Doc, "Select_Documento_2", index_ID, "");
    });
}

//salida del formulario
function btnSalir() {
    window.location = "../../Menu/menu.aspx?User=" + $("#User").html() + "&Key=" + ArrayMenu[0].Nit + "&LINK=" + Link;
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
            $("#container_TRDoc_Verificacion").html("");
            estado = opcion;
            Clear();
            break;

        case "eliminar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TRDoc_Verificacion").html("");
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
        transacionAjax_RDoc_Verificacion("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_RDoc_Verificacion("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_RDoc_Verificacion_create("crear");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    transacionAjax_RDoc_Verificacion_delete("elimina");
}


//validamos campos para la creacion del link
function validarCamposCrear() {

    var Campo_1 = $("#Select_EmpresaNit").val();
    var Campo_2 = $("#Select_Documento_1").val();
    var Campo_3 = $("#Select_Documento_2").val();

    var validar = 0;

    if (Campo_3 == "-1" || Campo_2 == "-1" || Campo_1 == "-1") {
        validar = 1;

        if (Campo_1 == "-1") {
            $("#Img1").css("display", "inline-table");
        }
        else {
            $("#Img1").css("display", "none");
        }

        if (Campo_2 == "-1") {
            $("#Img2").css("display", "inline-table");
        }
        else {
            $("#Img2").css("display", "none");
        }
        if (Campo_3 == "-1") {
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
function Table_RDoc_Verificacion() {

    var html_RDoc_Verificacion;
    var Index_Pos = 0;
    switch (estado) {

        case "buscar":
            html_RDoc_Verificacion = "<table id='TRDoc_Verificacion' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Empresa</th><th>Documento</th><th>Documento Verificación</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayRDoc_Verificacion) {
                if (ArrayRDoc_Verificacion[itemArray].RDoc_Verificacion_ID != 0) {
                    html_RDoc_Verificacion += "<tr id= 'TRDoc_Verificacion_" + ArrayRDoc_Verificacion[itemArray].GrpDoc_ID + "'><td>" + ArrayRDoc_Verificacion[itemArray].Nit_ID + " - " + ArrayRDoc_Verificacion[itemArray].DescripEmpresa + "</td><td>" + ArrayRDoc_Verificacion[itemArray].Doc_ID + " - " + ArrayRDoc_Verificacion[itemArray].DescripDoc + "</td><td>" + ArrayRDoc_Verificacion[itemArray].Doc_ID_Verif + " - " + ArrayRDoc_Verificacion[itemArray].DescripDoc_Verif + "</td><td>" + ArrayRDoc_Verificacion[itemArray].UsuarioCreacion + "</td><td>" + ArrayRDoc_Verificacion[itemArray].FechaCreacion + "</td><td>" + ArrayRDoc_Verificacion[itemArray].UsuarioActualizacion + "</td><td>" + ArrayRDoc_Verificacion[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "eliminar":
            html_RDoc_Verificacion = "<table id='TRDoc_Verificacion' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Empresa</th><th>Documento</th><th>Documento Verificación</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayRDoc_Verificacion) {
                if (ArrayRDoc_Verificacion[itemArray].RDoc_Verificacion_ID != 0) {
                    Index_Pos = parseInt(ArrayRDoc_Verificacion[itemArray].Index) - 1;
                    html_RDoc_Verificacion += "<tr id= 'TRDoc_Verificacion_" + ArrayRDoc_Verificacion[itemArray].GrpDoc_ID + "'><td><input type ='radio' class= 'Eliminar' name='eliminar' onclick=\"Eliminar('" + Index_Pos + "')\"></input></td><td>" + ArrayRDoc_Verificacion[itemArray].Nit_ID + " - " + ArrayRDoc_Verificacion[itemArray].DescripEmpresa + "</td><td>" + ArrayRDoc_Verificacion[itemArray].Doc_ID + " - " + ArrayRDoc_Verificacion[itemArray].DescripDoc + "</td><td>" + ArrayRDoc_Verificacion[itemArray].Doc_ID_Verif + " - " + ArrayRDoc_Verificacion[itemArray].DescripDoc_Verif + "</td><td>" + ArrayRDoc_Verificacion[itemArray].UsuarioCreacion + "</td><td>" + ArrayRDoc_Verificacion[itemArray].FechaCreacion + "</td><td>" + ArrayRDoc_Verificacion[itemArray].UsuarioActualizacion + "</td><td>" + ArrayRDoc_Verificacion[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;
    }

    html_RDoc_Verificacion += "</tbody></table>";
    $("#container_TRDoc_Verificacion").html("");
    $("#container_TRDoc_Verificacion").html(html_RDoc_Verificacion);

    $(".Eliminar").click(function () {
    });

    $(".Editar").click(function () {
    });

    $("#TRDoc_Verificacion").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Eliminar(Index_GrpDocumento) {
    editNit_ID = ArrayRDoc_Verificacion[Index_GrpDocumento].Nit_ID;
    editID = ArrayRDoc_Verificacion[Index_GrpDocumento].Doc_ID;
    editDocID = ArrayRDoc_Verificacion[Index_GrpDocumento].Doc_ID_Verif;

    $("#dialog_eliminar").dialog("option", "title", "Eliminar?");
    $("#dialog_eliminar").dialog("open");
}

//evento del boton salir
function x() {
    $("#dialog").dialog("close");
}

//limpiar campos
function Clear() {
    $("#Select_EmpresaNit").val("-1");
    $("#Select_Documento_1").val("-1");
    $("#Select_Documento_2").val("-1");

    $("#TxtRead").val("");
    $("#DDLColumns").val("-1");

    $('.C_Chosen').trigger('chosen:updated');

}