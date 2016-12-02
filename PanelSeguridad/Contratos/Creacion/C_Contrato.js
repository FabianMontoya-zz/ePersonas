/*--------------- region de variables globales --------------------*/
var Matrix_Sucursal = [];
var Matrix_Moneda = [];
var Matrix_Sucursal = [];
var Matrix_Personas = [];

var ArrayC_Contrato = [];
var ArrayEmpresaNit = [];
var Array_Hijo_Cliente = [];
var ArrayEstado = [];

var ID;
var T_Doc;
var Doc;


/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {
    $("#Marco_trabajo_Contrato").css("height", "440px");
    $("#Marco_trabajo_Contrato").css("width", "95%");

    transacionAjax_EmpresaNit('Cliente');
    transaccionAjax_MPersonas('MATRIX_PERSONAS');
    transacionAjax_MMoneda('MATRIX_MONEDA');
    transaccionAjax_MSucursal('MATRIX_SUCURSAL');

    Ocultar_IMGS_Errores();

    //Imagenes de los dialog con mensajes
    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WA").css("display", "none");

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
        height: 600,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
    });

    $("#T_Activo_Grid").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });

    //Dialog para agregar la dirección
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

    Picker_Fechas();    

    $(function () { //Función del acordeon
        $("#Acordeon_Contrato").accordion({
            heightStyle: "content"
        });
    });



    Change_Select_Nit();
    Change_Select_H_Cliente();
    Change_Select_Moneda();
    Format_Adress("Txt_Adress_C");
});

//Ocultamos las imagenes de error al iniciar la pantalla
function Ocultar_IMGS_Errores() {
    $("#Img1").css("display", "none");
    $("#Img2").css("display", "none");
    $("#Img3").css("display", "none");
    $("#Img4").css("display", "none"); //Img del Warning del Alert
    $("#Img5").css("display", "none");

    $("#Img6").css("display", "none");
    $("#Img7").css("display", "none");
    $("#Img8").css("display", "none");
    $("#Img9").css("display", "none");
    $("#Img10").css("display", "none");

    $("#Img11").css("display", "none");
    $("#Img12").css("display", "none");
    $("#Img13").css("display", "none");
    $("#Img14").css("display", "none");
    $("#Img15").css("display", "none");

    $("#Img16").css("display", "none");
    $("#Img17").css("display", "none");
    $("#Img18").css("display", "none");
    $("#Img19").css("display", "none");
    
}

//Función de control del picker de las fechas
function Picker_Fechas() {
    $("#TXT_Fecha_Apertura").datepicker({ dateFormat: 'yy-mm-dd', minDate: 0 });
    $("#TXT_Fecha_Activacion").datepicker({ dateFormat: 'yy-mm-dd', minDate: 0 });
    $("#TXT_Fecha_Finalizacion").datepicker({ dateFormat: 'yy-mm-dd', minDate: 0 });
    $("#TXT_Fecha_Cancelacion").datepicker({ dateFormat: 'yy-mm-dd', minDate: 0 });
    $("#TXT_Fecha_Ult_Causacion").datepicker({ dateFormat: 'yy-mm-dd', minDate: 0 });
    $("#TXT_Fecha_Ult_Factura").datepicker({ dateFormat: 'yy-mm-dd', minDate: 0 });
    $("#TXT_Fecha_Prox_Factura").datepicker({ dateFormat: 'yy-mm-dd', minDate: 0 });
}

//salida del formulario
function btnSalir() {
    window.location = "../../Menu/menu.aspx?User=" + $("#User").html() + "&L_L=" + Link;
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                     PROCESO DE CARGUE                                                                                                                                        ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//carga el combo 
function Change_Select_Nit() {
    $("#Select_EmpresaNit").change(function () {
        var index_ID = this.value;
        Charge_Combos_Depend_Nit(Matrix_Sucursal, "Select_Sucursal_C", index_ID, "");
        Charge_Combo_Persona(Matrix_Personas, "Select_Persona_C", index_ID, "");

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

function Change_Select_Moneda() {
    $("#Select_Moneda_C").change(function () {
        var index_ID = this.value;
        for (item in Matrix_Moneda) {
            if (Matrix_Moneda[item].MonedaCod_ID == index_ID) {
                $("#L_Moneda").html(Matrix_Moneda[item].Sigla);
                $("#L_Moneda_1").html(Matrix_Moneda[item].Sigla);
                $("#L_Moneda_2").html(Matrix_Moneda[item].Sigla);
                $("#L_Moneda_3").html(Matrix_Moneda[item].Sigla);
                $("#L_Moneda_4").html(Matrix_Moneda[item].Sigla);
            }
        }
    });
}

//crear link en la BD
function BtnCrear() {
    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        transacionAjax_C_Contrato_create("crear");
    } else if (validate == 1) {
        var mensaje = "";
        Mensaje_General("¡Falta Completar Campos!", "Debe completar los campos obligatorios. Los campos faltantes se han marcado con una (X)", "W");
    }
}

//validamos campos para la creacion del link y envio de los datos
function validarCamposCrear() {

    var Campo_1 = $("#Select_EmpresaNit").val(); //Img1
    var Campo_2 = $("#Select_Sucursal_C").val(); //Img7
    var Campo_3 = $("#TXT_ID_Colocacion").val(); //Img2
    var Campo_4 = $("#TXT_Descripcion").val(); //Img3
    var Campo_5 = $("#").val(); //Img4
    var Campo_6 = $("#").val(); //Img5
    var Campo_7 = $("#Select_Persona_C").val(); //Img6
    var Campo_8 = $("#Select_Moneda_C").val(); //img8
    var Campo_9 = $("#Select_Producto").val(); //Img9
    var Campo_10 = $("#Select_Condicion_Financiacion").val(); //Img10
    var Campo_11 = $("#Select_Tiempo").val(); //Img11
    var Campo_12 = $("#TXT_Fecha_Apertura").val(); //Img12
    var Campo_13 = $("#TXT_Plazo").val(); //Img13
    var Campo_14 = $("#Select_Ciclo").val(); //Img14
    var Campo_15 = $("#Select_Base_Calculo").val(); //Img15
    var Campo_16 = $("#Select_Correspondencia").val(); //Img16
    var Campo_17 = $("#TXT_Valor_Total").val(); //Img17
    var Campo_5 = $("#TXT_Valor_Financiado").val(); //Img18
    var Campo_5 = $("#TXT_Valor_Opcion_Compra").val(); //Img19

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
        Ocultar_IMGS_Errores();
    }
    return validar;
}

//evento del boton salir
function x() {
    $("#dialog").dialog("close");
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
