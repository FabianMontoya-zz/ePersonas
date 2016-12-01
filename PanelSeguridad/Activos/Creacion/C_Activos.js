/*--------------- region de variables globales --------------------*/
var Matrix_RTSTA = [];
var ArrayEmpresaNit = [];
var Matrix_Pais = [];
var Matrix_Personas = [];
var Matrix_Sucursal = [];
var Matrix_Moneda = []

var ArrayC_Activos = [];
var Array_Hijo_Cliente = [];
var ArrayEstado = [];

var ID;
var T_Doc;
var Doc;
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {

    $("#Marco_trabajo_Contrato").css("height", "520px;");
    transaccionAjax_MRTSTA("MATRIX_RTSTA");
    transaccionAjax_MPaises_Ciudades('MATRIX_PAIS_CIUDAD');
    transaccionAjax_MPersonas('MATRIX_PERSONAS');
    transaccionAjax_MSucursal('MATRIX_SUCURSAL');

    transacionAjax_EmpresaNit('Cliente')
    transacionAjax_Tipo('Tipo');
    transacionAjax_MMoneda('MATRIX_MONEDA');

    // transacionAjax_Estado('Estado');
    $("#Img1").css("display", "none");
    $("#Img2").css("display", "none");
    $("#Img3").css("display", "none");
    $("#Img5").css("display", "none");
    $("#Img6").css("display", "none");
    $("#Img7").css("display", "none");

    $("#Img8").css("display", "none");
    $("#Img9").css("display", "none");
    $("#Img10").css("display", "none");
    $("#Img11").css("display", "none");
    $("#Img12").css("display", "none");
    $("#Img13").css("display", "none");

    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WA").css("display", "none");

    $("#Tabla_LLave_Inmueble").css("display", "none");
    $("#Tabla_LLave_Vehiculos").css("display", "inline-table");
    $("#Txtkey_1").html("Codigo Generico");

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

    $("#Dialog_Format_Adress").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 1000,
        height: 250,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
    });

    $("#Dialog_Activos").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 1100,
        height: 620,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
    });

    $("#T_Activo_Grid").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });

    Change_Select_Nit();
    Change_Select_TA();
    Change_Select_pais();
    Change_Select_Moneda();
    Format_Adress("Txt_Adress_U");

});

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                 REGION BOTONES                                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//crear link en la BD
function BtnCrear() {
    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        transacionAjax_C_Activos_create("crear");
    }
}

//salida del formulario
function btnSalir() {
    window.location = "../../Menu/menu.aspx?User=" + $("#User").html() + "&L_L=" + Link;
}

//evento del boton salir
function x() {
    $("#dialog").dialog("close");
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                           REGION DE VALIDACIONES                                                                                                   ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//validamos campos para la creacion del formulario
function validarCamposCrear() {

    var Campo_1 = $("#Select_EmpresaNit").val();
    var Campo_2 = $("#Txt_ID").val();
    var Campo_3 = $("#TxtDescripcion").val();
    var Campo_4 = $("#Select_H_Cliente").val();
    var Campo_5 = $("#Select_Estado").val();
    var Campo_6 = $("#Select_Moneda").val();

    var validar = 0;

    if (Campo_6 == "-1" || Campo_5 == "-1" || Campo_4 == "-1" || Campo_3 == "" || Campo_2 == "" || Campo_1 == "-1") {
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
        if (Campo_4 == "-1") {
            $("#Img5").css("display", "inline-table");
        }
        else {
            $("#Img5").css("display", "none");
        }
        if (Campo_5 == "-1") {
            $("#Img6").css("display", "inline-table");
        }
        else {
            $("#Img6").css("display", "none");
        }
        if (Campo_6 == "-1") {
            $("#Img7").css("display", "inline-table");
        }
        else {
            $("#Img7").css("display", "none");
        }

    }
    else {
        $("#Img7").css("display", "none");
        $("#Img6").css("display", "none");
        $("#Img5").css("display", "none");
        $("#Img3").css("display", "none");
        $("#Img2").css("display", "none");
        $("#Img1").css("display", "none");
    }
    return validar;
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                     PROCESO DE CARGUE                                                                                                                                        ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//carga el combo 
function Change_Select_Nit() {
    $("#Select_EmpresaNit").change(function () {
        var index_ID = this.value;
        Charge_Combos_Depend_Nit(Matrix_Sucursal, "Select_Sucursal", index_ID, "");

    });
}

function Change_Select_Moneda() {
    $("#Select_Moneda").change(function () {
        var index_ID = this.value;
        for (item in Matrix_Moneda) {
            if (Matrix_Moneda[item].MonedaCod_ID == index_ID) {
                $("#V_Sigla_1").html(Matrix_Moneda[item].Sigla);
                $("#V_Sigla_2").html(Matrix_Moneda[item].Sigla);
            }
        }
    });
}



//carga los subtipos
function Change_Select_TA() {
    $("#Select_Tipo").change(function () {
        var index_ID = this.value;
        Charge_Combos_Depend_Nit(Matrix_RTSTA, "Select_SubTipo", index_ID, "");

        switch (index_ID) {
            case "1":
                $("#Tabla_LLave_Inmueble").css("display", "inline-table");
                $("#Tabla_LLave_Vehiculos").css("display", "none");
                break;

            case "2":
                $("#Tabla_LLave_Inmueble").css("display", "none");
                $("#Tabla_LLave_Vehiculos").css("display", "inline-table");
                $("#Txtkey_1").html("Placa");
                break;

            default:
                $("#Tabla_LLave_Inmueble").css("display", "none");
                $("#Tabla_LLave_Vehiculos").css("display", "inline-table");
                $("#Txtkey_1").html("Codigo Generico");
                break;
        }

    });
}


//limpiar campos
function Clear() {

    $("#Txt_ID").val("");

}

function Add_Activos(index) {
    $("#Dialog_Activos").dialog("open");
    $("#Dialog_Activos").dialog("option", "title", "Crear Activo");
    Table_Activos();
}



function Table_Activos() {

    $("#container_TActivos").html("");

}

