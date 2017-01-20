/*--------------- region de variables globales --------------------*/
var Matrix_PAcceso = [];
var Matrix_Area = [];

var ArrayR_PuertaAcc_Area = [];
var ArrayCombo = [];
var ArrayR_PuertaAcc_AreaDep = [];
var ArraySeguridad = [];

var estado;
var editNit_ID;
var index_ID;
var editID;
var editDocID;
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {
    transaccionAjax_MPAcceso('MATRIX_PACCESO');
    transaccionAjax_MArea('MATRIX_AREA');
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
        Charge_Combos_Depend_Nit(Matrix_PAcceso, "Select_PAcceso", index_ID, "");
        Charge_Combos_Depend_Nit(Matrix_Area, "Select_Area", index_ID, "");
    });
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
            $("#container_TR_PuertaAcc_Area").html("");
            estado = opcion;
            Clear();
            break;

        case "eliminar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TR_PuertaAcc_Area").html("");
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
        transacionAjax_R_PuertaAcc_Area("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_R_PuertaAcc_Area("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_R_PuertaAcc_Area_create("crear");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    transacionAjax_R_PuertaAcc_Area_delete("elimina");
}


//validamos campos para la creacion del link
function validarCamposCrear() {

    var Campo_1 = $("#Select_EmpresaNit").val();
    var Campo_2 = $("#Select_PAcceso").val();
    var Campo_3 = $("#Select_Area").val();

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
function Table_R_PuertaAcc_Area() {

    var html_R_PuertaAcc_Area;
    var Index_Pos = 0;
    switch (estado) {

        case "buscar":
            html_R_PuertaAcc_Area = "<table id='TR_PuertaAcc_Area' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Empresa</th><th>Puerta de Acceso</th><th>Área</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayR_PuertaAcc_Area) {
                if (ArrayR_PuertaAcc_Area[itemArray].R_PuertaAcc_Area_ID != 0) {
                    html_R_PuertaAcc_Area += "<tr id= 'TR_PuertaAcc_Area_" + ArrayR_PuertaAcc_Area[itemArray].PuertaAcceso_ID + "'><td>" + ArrayR_PuertaAcc_Area[itemArray].Nit_ID + " - " + ArrayR_PuertaAcc_Area[itemArray].DescripEmpresa + "</td><td>" + ArrayR_PuertaAcc_Area[itemArray].PuertaAcceso_ID + " - " + ArrayR_PuertaAcc_Area[itemArray].DescripPAcceso + "</td><td>" + + ArrayR_PuertaAcc_Area[itemArray].Area_ID + " - " + ArrayR_PuertaAcc_Area[itemArray].DescripArea+ "</td><td>" + ArrayR_PuertaAcc_Area[itemArray].UsuarioCreacion + "</td><td>" + ArrayR_PuertaAcc_Area[itemArray].FechaCreacion + "</td><td>" + ArrayR_PuertaAcc_Area[itemArray].UsuarioActualizacion + "</td><td>" + ArrayR_PuertaAcc_Area[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "eliminar":
            html_R_PuertaAcc_Area = "<table id='TR_PuertaAcc_Area' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Empresa</th><th>Puerta de Acceso</th><th>Área</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayR_PuertaAcc_Area) {
                if (ArrayR_PuertaAcc_Area[itemArray].R_PuertaAcc_Area_ID != 0) {
                    Index_Pos = parseInt(ArrayR_PuertaAcc_Area[itemArray].Index) - 1;
                    html_R_PuertaAcc_Area += "<tr id= 'TR_PuertaAcc_Area_" + ArrayR_PuertaAcc_Area[itemArray].PuertaAcceso_ID + "'><td><input type ='radio' class= 'Eliminar' name='eliminar' onclick=\"Eliminar('" + Index_Pos + "')\"></input></td><td>" + ArrayR_PuertaAcc_Area[itemArray].Nit_ID + " - " + ArrayR_PuertaAcc_Area[itemArray].DescripEmpresa + "</td><td>" + ArrayR_PuertaAcc_Area[itemArray].PuertaAcceso_ID + " - " + ArrayR_PuertaAcc_Area[itemArray].DescripPAcceso + "</td><td>" + + ArrayR_PuertaAcc_Area[itemArray].Area_ID + " - " + ArrayR_PuertaAcc_Area[itemArray].DescripArea+ "</td><td>" + ArrayR_PuertaAcc_Area[itemArray].UsuarioCreacion + "</td><td>" + ArrayR_PuertaAcc_Area[itemArray].FechaCreacion + "</td><td>" + ArrayR_PuertaAcc_Area[itemArray].UsuarioActualizacion + "</td><td>" + ArrayR_PuertaAcc_Area[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;
    }

    html_R_PuertaAcc_Area += "</tbody></table>";
    $("#container_TR_PuertaAcc_Area").html("");
    $("#container_TR_PuertaAcc_Area").html(html_R_PuertaAcc_Area);

    $(".Eliminar").click(function () {
    });

    $(".Editar").click(function () {
    });

    $("#TR_PuertaAcc_Area").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Eliminar(Index_GrpDocumento) {

    editNit_ID = ArrayR_PuertaAcc_Area[Index_GrpDocumento].Nit_ID;
    editID = ArrayR_PuertaAcc_Area[Index_GrpDocumento].PuertaAcceso_ID ;
    editDocID = ArrayR_PuertaAcc_Area[Index_GrpDocumento].Area_ID;

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
    $("#Select_PAcceso").val("-1");
    $("#Select_Area").val("-1");

    $("#TxtRead").val("");
    $("#DDLColumns").val("-1");

    $('.C_Chosen').trigger('chosen:updated');

}