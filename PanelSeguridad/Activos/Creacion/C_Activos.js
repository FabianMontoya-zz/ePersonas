/*--------------- region de variables globales --------------------*/
var Matrix_RTSTA = [];
var ArrayEmpresaNit = [];

var ArrayC_Activos = [];
var ArrayMoneda = [];
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
    transacionAjax_Tipo('Tipo');

    transacionAjax_EmpresaNit('Cliente')
    transacionAjax_Estado('Estado');
    transacionAjax_Moneda('Moneda');

    $("#Img7").css("display", "none");
    $("#Img6").css("display", "none");
    $("#Img5").css("display", "none");
    $("#Img3").css("display", "none");
    $("#Img2").css("display", "none");
    $("#Img1").css("display", "none");
    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WE").css("display", "none");

    $("#Tabla_LLave_Inmueble").css("display", "none");
    $("#Tabla_LLave_Vehiculos").css("display", "none");

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
        var TD_ID = this.value;
        //transacionAjax_Hijo_Cliente('Hijo_Cliente', TD_ID);
    });
}

//carga los subtipos
function Change_Select_TA() {
    $("#Select_Tipo").change(function () {
        var index_ID = this.value;
        Charge_Combos_Depend_Nit(Matrix_RTSTA, "Select_SubTipo", index_ID, "");
        if (index_ID != 2) {
            $("#Tabla_LLave_Inmueble").css("display", "inline-table");
            $("#Tabla_LLave_Vehiculos").css("display", "none");
        }
        else {
            $("#Tabla_LLave_Inmueble").css("display", "none");
            $("#Tabla_LLave_Vehiculos").css("display", "inline-table");
        }
    });
}

//sacamos documento y tipo de documento requerido para contrato
function Change_Select_H_Cliente() {
    $("#Select_H_Cliente").change(function () {
        var Str_H_cliente = $("#Select_H_Cliente option:selected").html();
        var SplitCliente = Str_H_cliente.split(" - ");
        T_Doc = SplitCliente[0];
        Doc = SplitCliente[1];
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
