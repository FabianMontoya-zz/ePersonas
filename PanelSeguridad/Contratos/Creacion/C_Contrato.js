﻿/*--------------- region de variables globales --------------------*/
var Matrix_Sucursal = [];
var Matrix_Moneda = [];
var Matrix_Sucursal = [];
var Matrix_Personas = [];
var Matrix_Ciclo = [];
var Matrix_Productos = [];
var Matrix_Financiacion = [];
var Matrix_Direcciones = [];
var Matrix_Tasas = [];

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
    transaccionAjax_MCiclo('MATRIX_CICLO');
    transacionAjax_Productos('MATRIX_PRODUCTOS');
    transacionAjax_Financiacion('MATRIX_FINANCIACION');
    transaccionAjax_MDirecciones('MATRIX_DIRECCIONES');
    transaccionAjax_MTasas('MATRIX_TASAS');

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
            heightStyle: "content",
            collapsible: true
        });
    });

    /*var TE = TasaEfectiva(360, "M", 1, "V", 0.2480);
    console.log("TE = " + TE);
    var TN = TasaNominal(360, "M", 1, "V", TE)
    console.log("TN = " + TN);*/

    $("#Select_Base_Calculo").prop('disabled', true); //Desactivamos el Chosen
    Change_Select_Nit();
    Change_Select_Sucursal();
    Change_Select_Persona();
    Change_Select_Moneda();
    Change_Select_Producto();
    Change_Select_Condicion_Financiacion();
    Change_Select_Unidad_Tiempo();
    Change_Select_Base_Calculo();
    Format_Adress("Txt_Adress_C");
    Restric_long_decimal("TXT_Puntos_Adicionales");
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
    $("#TXT_Fecha_Apertura").datepicker({ dateFormat: 'yy-mm-dd', changeYear: true, changeMonth: true }); //Inicializa Datapicker
    $("#TXT_Fecha_Apertura").datepicker("option", "yearRange", "-99:+0"); //Rango años hacia atras (-99)
    $("#TXT_Fecha_Apertura").datepicker("option", "maxDate", "+0m +0d"); //Rango días (Llega hasta el actual y bloquea los futuros)
    //$("#TXT_Fecha_Activacion").datepicker({ dateFormat: 'yy-mm-dd'});
    //$("#TXT_Fecha_Finalizacion").datepicker({ dateFormat: 'yy-mm-dd', minDate: 0 }); //Bloquea las fechas pasadas, solo fechas futuras
    //$("#TXT_Fecha_Cancelacion").datepicker({ dateFormat: 'yy-mm-dd', minDate: 0 });
    //$("#TXT_Fecha_Ult_Causacion").datepicker({ dateFormat: 'yy-mm-dd', minDate: 0 });
    //$("#TXT_Fecha_Ult_Factura").datepicker({ dateFormat: 'yy-mm-dd', minDate: 0 });
    //$("#TXT_Fecha_Prox_Factura").datepicker({ dateFormat: 'yy-mm-dd', minDate: 0 });
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
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_EmpresaNit").val() == "-1") {
            $("#Img1").css("display", "inline-table");
        } else {
            $("#Img1").css("display", "none");
        }
        var index_ID = this.value;
        Charge_Combos_Depend_Nit(Matrix_Sucursal, "Select_Sucursal_C", index_ID, "");
        Charge_Combo_Persona(Matrix_Personas, "Select_Persona_C", index_ID, "");
        Charge_Combos_Depend_Nit(Matrix_Productos, "Select_Producto", index_ID, "");
        Charge_Combos_Depend_Nit(Matrix_Financiacion, "Select_Condicion_Financiacion", index_ID, "");

        /*Escritura de L_Tasa_Mora*/
        $("#L_Tasa_Mora").html(TasaMora);

        /*Escritura de L_Tasa_Usura*/
        $("#L_Tasa_Usura").html(TasaUsura);
    });
}

function Change_Select_Sucursal() {
    $("#Select_Sucursal_C").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_Sucursal_C").val() == "-1") {
            $("#Img7").css("display", "inline-table");
        } else {
            $("#Img7").css("display", "none");
        }
    });
}

function Change_Select_Persona() {
    $("#Select_Persona_C").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_Persona_C").val() == "-1") {
            $("#Img6").css("display", "inline-table");
        } else {
            $("#Img6").css("display", "none");
        }
        var index_ID = this.value;
        Charge_Combo_Persona(Matrix_Direcciones, "Select_Direccion", index_ID, "");
    });
}

function Change_Select_Moneda() {
    $("#Select_Moneda_C").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_Moneda_C").val() == "-1") {
            $("#Img8").css("display", "inline-table");
        } else {
            $("#Img8").css("display", "none");
        }
        var index_ID = this.value;
        for (item in Matrix_Moneda) {
            if (Matrix_Moneda[item].MonedaCod_ID == index_ID) {
                $("#L_Moneda").html(Matrix_Moneda[item].Sigla);
                $("#L_Moneda_1").html(Matrix_Moneda[item].Sigla);
                $("#L_Moneda_2").html(Matrix_Moneda[item].Sigla);
                $("#L_Moneda_3").html(Matrix_Moneda[item].Sigla);
                $("#L_Moneda_4").html(Matrix_Moneda[item].Sigla);
                $("#L_Moneda_5").html(Matrix_Moneda[item].Sigla);
            } else if (index_ID == "-1") {
                $("#L_Moneda").html("");
                $("#L_Moneda_1").html("");
                $("#L_Moneda_2").html("");
                $("#L_Moneda_3").html("");
                $("#L_Moneda_4").html("");
                $("#L_Moneda_5").html(Matrix_Moneda[item].Sigla);
            }
        }
    });
}

function Change_Select_Producto() {
    $("#Select_Producto").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_Producto").val() == "-1") {
            $("#Img9").css("display", "inline-table");
        } else {
            $("#Img9").css("display", "none");
        }
    });
}

function Change_Select_Condicion_Financiacion() {
    $("#Select_Condicion_Financiacion").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_Condicion_Financiacion").val() == "-1") {
            $("#Img10").css("display", "inline-table");
        } else {
            $("#Img10").css("display", "none");
        }

        var index_ID = this.value; //el value es el index
        index_ID = parseInt(index_ID) - 1;


        var NIT = Matrix_Financiacion[index_ID].Nit_ID;
        var tiempo = Matrix_Financiacion[index_ID].Unidad_Tiempo;
        var baseCalculo = Matrix_Financiacion[index_ID].Base_Calculo;
        var ciclo = Matrix_Financiacion[index_ID].Ciclo_Cobro_FK;
        var Modalidad = Matrix_Financiacion[index_ID].Modalidad_Pago;

        var Periodo_Pago = Matrix_Financiacion[index_ID].Periodo_Pago;
        var Tipo_Cuota = Matrix_Financiacion[index_ID].Tipo_Cuota;
        var Base_Calculo = Matrix_Financiacion[index_ID].Base_Calculo;
        var Tasa = Matrix_Financiacion[index_ID].Tasa_FK;
        var Pto_Adicionales = Matrix_Financiacion[index_ID].Puntos_Adicionales;

        $("#Select_Tiempo").val(tiempo).trigger("chosen:updated");
        $("#Select_Base_Calculo").val(baseCalculo).trigger("chosen:updated");
        $("#Select_Ciclo").val(ciclo).trigger("chosen:updated");
        $("#Select_Ciclo_2").val(ciclo).trigger("chosen:updated");
        CambiarTiempo(tiempo);

        /*Cambio L_Modalidad de pago*/
        if (Modalidad == "A") {
            $("#L_Modalidad_Pago").html("A - Anticipado");
        } else if (Modalidad == "V") {
            $("#L_Modalidad_Pago").html("V - Vencido");
        } else {
            $("#L_Modalidad_Pago").html("");
        }

        /*Cambio L_Periodo_Pago*/
        $("#L_Periodo_Pago").html(Periodo_Pago);

        /*Cambio L_Tipo_Cuota*/
        if (Tipo_Cuota == 1) {
            $("#L_Tipo_Cuota").html("1 - Capital");
        } else if (Tipo_Cuota == 2) {
            $("#L_Tipo_Cuota").html("2 - Solo Interés");
        } else if (Tipo_Cuota == 3) {
            $("#L_Tipo_Cuota").html("3 - Capital + Interés");
        } else if (Tipo_Cuota == 4) {
            $("#L_Tipo_Cuota").html("4 - Capital + Interés + Otros Conceptos");
        } else if (Tipo_Cuota == 5) {
            $("#L_Tipo_Cuota").html("5 - Otros Conceptos");
        } else if (Tipo_Cuota == 6) {
            $("#L_Tipo_Cuota").html("6 - Canon de Arriendo");
        } else if (Tipo_Cuota == 7) {
            $("#L_Tipo_Cuota").html("7 - A Solicitud");
        }

        /*Cambio L_Base_Calculo*/
        if (Base_Calculo == 1) {
            $("#L_Base_Calculo").html("1 - 360/360");
        } else if (Base_Calculo == 2) {
            $("#L_Base_Calculo").html("2 - 365/365");
        }


        var indexTasa;
        for (item in Matrix_Tasas) {
            if (Matrix_Tasas[item].Codigo_ID == Tasa && Matrix_Tasas[item].Nit_ID == NIT) {
                indexTasa = Matrix_Tasas[item].Index;
            }
        }


        /*--------------------*/
        /*Validamos si el número que entra es negativo o no para mostrarlo en el TXT de puntos adicionales*/
        var signo = Pto_Adicionales.toString().substring(0, 1);
        var numero;
        if (signo == "-") {
            /*Si hay signo negativo se cambia el combo del simbolo y se toman solo el número sin el signo*/
            numero = Pto_Adicionales.toString().substring(1, Pto_Adicionales.toString().length);
            $("#Select_Signo_Puntos").val(signo).trigger("chosen:updated");
        } else {
            numero = Pto_Adicionales;
            $("#Select_Signo_Puntos").val("+").trigger("chosen:updated");
        }
        /*Si hay puntos adicionales los escribimos en el TXT, sino, dejamos en blanco*/
        if (numero == 0) {
            $("#TXT_Puntos_Adicionales").val(""); /*Dejamos en blanco si no hay puntos adicionales*/
        } else {
            numero = LlenarCeros(numero, 4);
            $("#TXT_Puntos_Adicionales").val(numero); /*Escribimos los puntos adicionales que trae la financiacion seleccionada*/
        }
        /*--------------------*/

        /*Escritura de L_Codigo_Tasa*/
        $("#L_Tasa").html(Descripcion_Tasa(indexTasa)); /*Mandamos en indice de la matriz de tasas y traemos la descripción armada*/

        /*Escritura L_Periodo*/
        $("#L_Periodo").html(Periodo_Tasa(indexTasa)); /*Mandamos el indice de la matriz de tasas y traemos el Periodo armado*/

        /*Escritura L_Equivalencia_Efectiva*/
        $("#L_Equivalencia_Efectiva").html(Equivalencia_Efectiva(indexTasa)); /*Mandamos el indice de la matriz de tasas y traemos el valor armado con %*/

        /*Escritura L_Equivalencia_Efectiva*/
        $("#L_Nominal_Actual").html(Nominal_Anual(indexTasa)); /*Mandamos el indice de la matriz de tasas y traemos el valor armado con %*/

    });
}

function Change_Select_Unidad_Tiempo() {
    $("#Select_Tiempo").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_Tiempo").val() == "-1") {
            $("#Img11").css("display", "inline-table");
        } else {
            $("#Img11").css("display", "none");
        }

        var index_ID = this.value;
        CambiarTiempo(index_ID);
    });
}

function CambiarTiempo(index_ID) {
    if (index_ID == "D") {
        $("#L_Tiempo").html("Días");
        $("#L_Tiempo_2").html("Días");
    } else if (index_ID == "M") {
        $("#L_Tiempo").html("Meses");
        $("#L_Tiempo_2").html("Meses");
    } else if (index_ID == "S") {
        $("#L_Tiempo").html("Semestres");
        $("#L_Tiempo_2").html("Semestres");
    } else if (index_ID == "A") {
        $("#L_Tiempo").html("Años");
        $("#L_Tiempo_2").html("Años");
    } else {
        $("#L_Tiempo").html("");
        $("#L_Tiempo_2").html("");
    }
}

function Change_Select_Base_Calculo() {
    $("#Select_Base_Calculo").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_Base_Calculo").val() == "-1") {
            $("#Img15").css("display", "inline-table");
        } else {
            $("#Img15").css("display", "none");
        }
    });
}

//crear link en la BD
function BtnCrear() {
    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        //transacionAjax_C_Contrato_create("crear");
        Mensaje_General("¡Colocación Agregada!", "La colocación se ha agregado correctamente.", "S");
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
    //var Campo_5 = $("#").val(); //Img4 - Es el Warning ---           ------           --- No está agregado en la condición
    //var Campo_6 = $("#").val(); //Img5 - No existe [No se está usando está imagen]    --- No está agregado en la condición
    var Campo_7 = $("#Select_Persona_C").val(); //Img6
    var Campo_8 = $("#Select_Moneda_C").val(); //img8
    var Campo_9 = $("#Select_Producto").val(); //Img9
    var Campo_10 = $("#Select_Condicion_Financiacion").val(); //Img10
    var Campo_11 = $("#Select_Tiempo").val(); //Img11
    var Campo_12 = $("#TXT_Fecha_Apertura").val(); //Img12
    var Campo_13 = $("#TXT_Plazo").val(); //Img13
    var Campo_14 = $("#Select_Ciclo").val(); //Img14 -- Campo no obligatorio
    var Campo_15 = $("#Select_Base_Calculo").val(); //Img15
    var Campo_16 = $("#Select_Direccion").val(); //Img16
    var Campo_17 = $("#TXT_Valor_Total").val(); //Img17
    var Campo_18 = $("#TXT_Valor_Financiado").val(); //Img18
    var Campo_19 = $("#TXT_Valor_Opcion_Compra").val(); //Img19

    var validar = 0;

    if (Campo_2 == "-1" || Campo_2 == "-1" || Campo_3 == "" || Campo_4 == "" || Campo_7 == "-1" || Campo_8 == "-1" || Campo_9 == "-1" || Campo_10 == "-1" || Campo_11 == "-1" || Campo_12 == "" || Campo_13 == "" || Campo_14 == "-1" || Campo_15 == "-1" || Campo_16 == "-1" || Campo_17 == "" || Campo_18 == "" || Campo_19 == "") {
        validar = 1;
        //--1--
        if (Campo_1 == "-1" || Campo_1 == "" || Campo_1 == null) {
            $("#Img1").css("display", "inline-table");
        } else {
            $("#Img1").css("display", "none");
        }
        //--2--
        if (Campo_2 == "-1" || Campo_2 == "" || Campo_2 == null) {
            $("#Img7").css("display", "inline-table");
        } else {
            $("#Img7").css("display", "none");
        }
        //--3--
        if (Campo_3 == "") {
            $("#Img2").css("display", "inline-table");
        } else {
            $("#Img2").css("display", "none");
        }
        //--4--
        if (Campo_4 == "") {
            $("#Img3").css("display", "inline-table");
        } else {
            $("#Img3").css("display", "none");
        }
        //--7--
        if (Campo_7 == "-1" || Campo_7 == "" || Campo_7 == null) {
            $("#Img6").css("display", "inline-table");
        } else {
            $("#Img6").css("display", "none");
        }
        //--8--
        if (Campo_8 == "-1" || Campo_8 == "" || Campo_8 == null) {
            $("#Img8").css("display", "inline-table");
        } else {
            $("#Img8").css("display", "none");
        }
        //--9--
        if (Campo_9 == "-1" || Campo_9 == "" || Campo_9 == null) {
            $("#Img9").css("display", "inline-table");
        } else {
            $("#Img9").css("display", "none");
        }
        //--10--
        if (Campo_10 == "-1" || Campo_10 == "" || Campo_10 == null) {
            $("#Img10").css("display", "inline-table");
        } else {
            $("#Img10").css("display", "none");
        }
        //--11--
        if (Campo_11 == "-1" || Campo_11 == "" || Campo_11 == null) {
            $("#Img11").css("display", "inline-table");
        } else {
            $("#Img11").css("display", "none");
        }
        //--12--
        if (Campo_12 == "") {
            $("#Img12").css("display", "inline-table");
        } else {
            $("#Img12").css("display", "none");
        }
        //--13--
        if (Campo_13 == "") {
            $("#Img13").css("display", "inline-table");
        } else {
            $("#Img13").css("display", "none");
        }
        //--14--
        if (Campo_14 == "-1" || Campo_14 == null || Campo_14 == "") { /*No es obligatorio, no se muestra error*/
            Campo_14 = "";
        } else {
            Campo_14 = Campo_14;
        }
        //--15--
        if (Campo_15 == "-1" || Campo_15 == "" || Campo_15 == null) {
            $("#Img15").css("display", "inline-table");
        } else {
            $("#Img15").css("display", "none");
        }
        //--16--
        if (Campo_16 == "-1" || Campo_16 == "" || Campo_16 == null) {
            $("#Img16").css("display", "inline-table");
        } else {
            $("#Img16").css("display", "none");
        }
        //--17--
        if (Campo_17 == "") {
            $("#Img17").css("display", "inline-table");
        } else {
            $("#Img17").css("display", "none");
        }
        //--18--
        if (Campo_18 == "") {
            $("#Img18").css("display", "inline-table");
        } else {
            $("#Img18").css("display", "none");
        }
        //--19--
        if (Campo_19 == "") {
            $("#Img19").css("display", "inline-table");
        } else {
            $("#Img19").css("display", "none");
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
    /*[Todo el código para limpiar los campos]*/
}

function Add_Activos(index) {
    $("#Dialog_Activos").dialog("open");
    $("#Dialog_Activos").dialog("option", "title", "Crear Activo");
    Table_Activos();
}

function Table_Activos() {
    $("#container_TActivos").html("");
}

function Descripcion_Tasa(index) {
    var i = index - 1;
    var descripcion;

    var id = Matrix_Tasas[i].Codigo_ID;
    var desc = Matrix_Tasas[i].Descripcion;

    descripcion = id + " - " + desc;
    return descripcion;
}

function Periodo_Tasa(index) {
    var i = index - 1;
    var Periodo;

    var per = Matrix_Tasas[i].Periodo;
    var tipo = Matrix_Tasas[i].Tipo;

    Periodo = per + "." + tipo + ".";

    return Periodo;
}

function Equivalencia_Efectiva(index) {
    var i = index - 1;
    var valor;

    valor = Matrix_Tasas[i].Equivalencia_Efectiva.toString();
    valor = valor + "%";

    return valor;
}

function Nominal_Anual(index) {
    var i = index - 1;
    var valor;

    valor = Matrix_Tasas[i].Nominal_Anual.toString();
    valor = valor + "%";

    return valor;
}

function TasaUsura() {
    var valor;
    var id;
    var num;

    id = Matrix_Tasas[1].Codigo_ID.toString();
    num = Matrix_Tasas[1].Equivalencia_Efectiva.toString();
    valor = id + " - " + num + "%";

    return valor;
}

function TasaMora() {
    var valor;
    var id;
    var num;

    id = Matrix_Tasas[0].Codigo_ID.toString();
    num = Matrix_Tasas[0].Equivalencia_Efectiva.toString();
    valor = id + " - " + num + "%";

    return valor;

    return valor;
}

function LlenarCeros(valor, longitud) {

    var numero;
    var A_Decimal = valor.toString().split(".");

    if (A_Decimal[1].length == 4) {
        A_Decimal[1] = A_Decimal[1];
    }
    else {
        while (A_Decimal[1].length < longitud) {
            A_Decimal[1] = A_Decimal[1] + "0";
        }
    }

    numero = A_Decimal[0] + "." + A_Decimal[1];

    return numero;
}

/*Función que hace el cálculo de la Tasa Efectiva en base a una Tasa Nominal*/
function TasaEfectiva(base, unidad_tiempo, numero, tipo, nominal) {
    /*
        Base = 1 - 360 || 2 - 365
        Unidad Tiempo: A - Años || D - Días || M - Meses || S - Semestre || T - Trimestre
        Número: Es la cantidad expresado en la unidad de tiempo
        Tipo: A - Anticipado || V - Vencido
    */
    var Base;
    var dias;
    var Periodo;
    var TE;
    var TN;
    var part1;
    var part2;

    TE = 0;
    TN = nominal;
    Base = base;

    if (Base == 360 || Base == 365) {

        if (unidad_tiempo == "D") {
            dias = numero;
        } else if (unidad_tiempo == "M") {
            dias = mesesDias(numero, Base);
        } else if (unidad_tiempo == "T") {
            dias = trimestresDias(numero);
        } else if (unidad_tiempo == "S") {
            dias = semestresDias(numero);
        } else if (unidad_tiempo == "A") {
            dias = añosDias(numero, Base);
        } else {
            Mensaje_General("¡Unidad de Tiempo inexistente!", "La Unidad de Tiempo utilizada no es valida, recuerde que solo se permiten cálculos para unidades en Días (D), Meses (M), Trimestres (T), Semestres (S) y Años (A).", "E");
            TE = 0;
        }

        Periodo = Base / dias;

        switch (tipo) {
            case "A":
                Mensaje_General("¡Tipo No disponible! - Tasa Efectiva", "Aún no está disponible el cálculo sobre tipo (A) Anticipado.", "W");
                TE = 0;
                break;
            case "V":
                part1 = (1 + (TN / Periodo));
                part2 = Math.pow(part1, Periodo);
                TE = part2 - 1;
                break;
            default:
                Mensaje_General("¡Tipo inexistente! - Tasa Efectiva", "El tipo utilizado no es valido para hacer el cálculo de su Tasa Efectiva, recuerde que solo se permite 'A' para anticipado y 'V' para vencido.", "E");
                TE = 0;
                break;
        }

    } else {
        Mensaje_General("¡Base inexistente! - Tasa Efectiva", "La base utilizada para calcular su Tasa Efectiva no es valida, recuerde que solo se permiten cálculos base 360 o 365.", "E");
        TE = 0;
    }
    return TE;
}

/*Función que hace el cálculo de la Tasa Nominal en base a una Tasa Efectiva*/
function TasaNominal(base, unidad_tiempo, numero, tipo, efectiva) {
    /*
        Base = 1 - 360 || 2 - 365
        Unidad Tiempo: A - Años || D - Días || M - Meses || S - Semestre || T - Trimestre
        Número: Es la cantidad expresado en la unidad de tiempo EJ: 3 Meses, 2 Semestres, 1 año... etc.
        Tipo: A - Anticipado || V - Vencido
    */
    var Base;
    var dias;
    var Periodo;
    var TE;
    var TN;
    var exponencial;
    var part1;
    var part2;
    var part3;

    TN = 0;
    TE = efectiva;
    Base = base;

    if (Base == 360 || Base == 365) {

        if (unidad_tiempo == "D") {
            dias = numero;
        } else if (unidad_tiempo == "M") {
            dias = mesesDias(numero, Base);
        } else if (unidad_tiempo == "T") {
            dias = trimestresDias(numero);
        } else if (unidad_tiempo == "S") {
            dias = semestresDias(numero);
        } else if (unidad_tiempo == "A") {
            dias = añosDias(numero, Base);
        } else {
            Mensaje_General("¡Unidad de Tiempo inexistente!", "La Unidad de Tiempo utilizada no es valida, recuerde que solo se permiten cálculos para unidades en Días (D), Meses (M), Trimestres (T), Seme\nstres (S) y Años (A).", "E");
            TN = 0;
        }

        Periodo = Base / dias;

        switch (tipo) {
            case "A":
                Mensaje_General("¡Tipo no disponible! - Tasa Nominal", "Aún no está disponible el cálculo sobre tipo (A) Anticipado.", "W");
                TN = 0;
                break;
            case "V":
                part1 = (1 + TE);
                exponencial = dias / base;
                part2 = Math.pow(part1, exponencial);
                part3 = part2 - 1;
                TN = part3 * Periodo;
                break;
            default:
                Mensaje_General("¡Tipo inexistente! - Tasa Nominal", "El tipo utilizado no es valido para hacer el cálculo de su Tasa Nominal, recuerde que solo se permite 'A' para anticipado y 'V' para vencido.", "E");
                TN = 0;
                break;
        }

    } else {
        Mensaje_General("¡Base inexistente! - Tasa Nominal", "La base utilizada para calcular su Tasa Nominal no es valida, recuerde que solo se permiten cálculos base 360 o 365.", "E");
        TN = 0;
    }
    return TN;
}

/*Función que hace la conversión de Meses a días en base 360 y 365*/
function mesesDias(meses, base) {
    var dias;
    switch (base) {
        case 360:
            dias = meses * 30;
            break;
        case 365:
            Mensaje_General("¡Base no disponible! - Convert Months to Days", "La base 365 no está disponible para utilziarse en este momento.", "W");
            break;
        default:
            Mensaje_General("¡Base inexistente! - Convert Months to Days", "La base utilizada para convertir los meses a días no es valida, recuerde que solo se hacen conversiones en base 360 o 365.", "E");
            dias = 0;
            break;
    }
    return dias;
}

/*Función que hace la conversión de Trimestres a días en base 360*/
function trimestresDias(trimestres) {
    var dias;
    dias = trimestres * 90;
    return dias;
}

/*Función que hace la conversión de Semestres a días en base 360*/
function semestresDias(semestres) {
    var dias;
    dias = semestres * 180;
    return dias;
}

/*Función que hace la conversión de Años a días en base 360 y 365*/
function añosDias(años, base) {
    var dias;
    switch (base) {
        case 360:
            dias = años * 360;
            break;
        case 365:
            dias = años * 365;
            break;
        default:
            Mensaje_General("¡Base inexistente! - Convert Years to Days", "La base utilizada para convertir los años a días no es valida, recuerde que solo se hacen conversiones en base 360 o 365.", "E");
            dias = 0;
            break;
    }
    return dias;
}