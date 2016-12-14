/*--------------- region de variables globales --------------------*/
var Matrix_RTSTA = [];
var ArrayEmpresaNit = [];
var Matrix_Pais = [];
var Matrix_Personas = [];
var Matrix_Sucursal = [];
var Matrix_Moneda = [];
var Matrix_Fasecolda = [];
var Matrix_MarcaClase_F = [];
var Matrix_LineaMarcaClase_F = [];

var Lista_Clase_F = [];

var ArrayC_Activos = [];
var Array_Hijo_Cliente = [];
var ArrayEstado = [];

var ID;
var T_Doc;
var Doc;
var Clase_Index;
var Year_work;
var Index_Year;

/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {

    $("#Marco_trabajo_Contrato").css("height", "490px");
    Picker_Fechas();
    transaccionAjax_MRTSTA("MATRIX_RTSTA");
    transaccionAjax_MPaises_Ciudades('MATRIX_PAIS_CIUDAD');
    transaccionAjax_MPersonas('MATRIX_PERSONAS');
    transaccionAjax_MSucursal('MATRIX_SUCURSAL');
    transacionAjax_MMoneda('MATRIX_MONEDA');
    transacionAjax_MFasecolda("MATRIX_FASECOLDA");
    transacionAjax_MMarcaClase_F("MATRIX_MARCA_CLASE_F");
    transacionAjax_MLineaMarcaClase_F("MATRIX_LINEA_MARCA_CLASE_F");
    transacionAjax_ListaClaseFasecolda("LIST_CLASE_F");

    transacionAjax_EmpresaNit('Cliente')
    transacionAjax_Documento('Documento');
    transacionAjax_Colores("Colores");
    transacionAjax_Tipo('Tipo');

    //CAMPOS GENERALES
    Clear_Ima_G();
    //CAMPOS LLAVES
    Clear_Ima_K();
    //CAMPOS INMUEBLE
    Clear_Ima_I();
    //CAMPOS  VEHICULOS
    Clear_Ima_F();
    //CAMPOS  BLINDAJES
    Clear_Ima_Bli();

    $("#Blo_Inmuebles").css("display", "none");
    $("#Blo_Fasecolda").css("display", "none");
    $("#T_Datos_Identificacion_blin").css("display", "none");

    $("#Bloque_datosIngreso").css("display", "none");

    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WA").css("display", "none");

    $("#Tabla_LLave_Inmueble").css("display", "none");
    $("#Tabla_LLave_Vehiculos").css("display", "inline-table");
    $("#Txtkey_1").html("C. Identificación");

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

    $("#Dialog_Factura").dialog({
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

    $("#T_Factura_Grid").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });

    $(function () { //Función del acordeon
        $("#Acordeon_Activo").accordion({
            heightStyle: "content",
            collapsible: true
        });
    });

    Change_Select_Clase();
    Change_Select_Marca();
    Change_Select_Nit();
    Change_Select_TA();
    Change_Select_pais();
    Change_Select_Moneda();
    Change_Select_blindaje();
    Change_Select_Modelo();

    Format_Adress("Txt_Adress_U");
    Date_Document();

});

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                 REGION BOTONES                                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//crear link en la BD
function BtnCrear() {
    var validate;
    validate = ValidarGuardado();

    if (validate == 0) {
        switch (Tipo_Activo) {
            case 2:
                transacionAjax_C_Vehiculos_create("crear_vehiculo");
                break;

            default:
                transacionAjax_C_Activos_create("crear");
                break;
        }


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

//valida y mustra campos
function BtnBuscarFacecolda() {

    if ($("#Btn_ShearchFacecolda").val() == "Nueva Consulta") {
        $("#Btn_ShearchFacecolda").attr("value", "Consulta Facecolda");
        Clear_Ima_F();
        Enable_Consult_Fasecolda();
        Clear_Consulta_Fasecolda();
    }
    else {
        var validar = ValidaCamposConsultaFasecolda();

        switch (validar) {
            case 0:
                Clear_Ima_F();
                MostrarValor_Cilindraje_Fasecolda(Index_Modelo);
                $("#Bloque_datosIngreso").css("display", "inline-table");

                break;

            case 1:
                Mensaje_General("¡Campos sin Datos!", "¡Al buscar por Clase, Marca, linea, modelo los campos deben ser diligenciados!", "W");
                break;

            case 2:
                Mensaje_General("¡No existe!", "¡El Codigo digitado no se encuentra en la Tabla Fasecolda!", "W");
                break;
        }
    }
}

//abre el dialog de agregar faturas
function Add_Facturas(index) {
    $("#Dialog_Factura").dialog("open");
    $("#Dialog_Factura").dialog("option", "title", "Crear Factura");
    Table_Activos();
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                     PROCESO DE CARGUE                                                                                                                                        ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//Función de control del picker de las fechas
function Picker_Fechas() {
    $("#TxtFecha_Recibo").datepicker({ dateFormat: 'yy-mm-dd' });
    $("#TxtFecha_Retiro").datepicker({ dateFormat: 'yy-mm-dd' });
}

//valida campo y consulta datos de persona
function Date_Document() {

    $("#TxtDoc").blur(function () {

        var valida_people = ValidaCamposPeople();
        if (valida_people == 1) {
            Mensaje_General("campos Incompletos!", "los campos (Nit Empresa),(Tipo de documento) y (documento) NO han sido diligenciados", "E");
        }
        else {
            var C_TD = $("#Select_Documento").val();
            var C_D = $("#TxtDoc").val();
            var Nit = $("#Select_EmpresaNit").val();

            transacionAjax_ShearchPeople("Buscar_Persona", C_TD, C_D, Nit);
        }

    });
}

//trae parametro y cargar el combo de años
function Captura_parametro() {
    var Year_actual;
    for (item in ArrayMenu) {
        if (ArrayMenu[item].IDlink == Link) {
            Year_actual = parseInt(ArrayMenu[item].Parametro_1);

            var ActualYear = $("#Hours").html();
            var A_Date = ActualYear.split("-");
            var Year_F = parseInt(A_Date[0]) - parseInt(Year_actual);

            CargaYear("Select_modelo", 24, Year_F, "", "Year_");
        }
    }
    return Year_actual;
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                     PROCESO BUSQUEDA FASECOLDA                                                                                  ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//buscar en faseclda
function Search_Fasecolda(Type, Cod_id, Clase, Marca, Linea, Modelo) {

    var EncuentraDato = 2;
    if (Type == 0) {

        for (itemArray in Matrix_Fasecolda) {
            if (Matrix_Fasecolda[itemArray].Clase == Clase &&
                Matrix_Fasecolda[itemArray].Marca == Marca &&
                Matrix_Fasecolda[itemArray].Fasecolda_ID == Linea) {
                EncuentraDato = 0;
                $("#TxtFasecolda_ID").val(Matrix_Fasecolda[itemArray].Fasecolda_ID);

                MostrarValor_Cilindraje_Fasecolda(Modelo);
                $("#Btn_ShearchFacecolda").attr("value", "Nueva Consulta");
                Disable_Consult_Fasecolda();
            }
        }
    }
    else {

        for (itemArray in Matrix_Fasecolda) {
            if (Matrix_Fasecolda[itemArray].Fasecolda_ID == Cod_id) {
                EncuentraDato = 0;
                $("#Select_ClaseF").val(Matrix_Fasecolda[itemArray].Clase);
                Charge_Combos_Depend_Nit(Matrix_MarcaClase_F, "Select_MarcaF", Matrix_Fasecolda[itemArray].Clase, Matrix_Fasecolda[itemArray].Marca);
                Charge_Combos_Depend_Verificacion(Matrix_LineaMarcaClase_F, "Select_LineaF", Matrix_Fasecolda[itemArray].Marca, Matrix_Fasecolda[itemArray].Clase, Matrix_Fasecolda[itemArray].Fasecolda_ID);
                Index_Year = itemArray;

                MostrarValor_Cilindraje_Fasecolda(Modelo);
                $("#Btn_ShearchFacecolda").attr("value", "Nueva Consulta");
                Disable_Consult_Fasecolda();
            }
        }
    }

    return EncuentraDato;
}

//ajusta y muestra el valor fasecolda y el cilindraje
function MostrarValor_Cilindraje_Fasecolda(Str_val) {

    var Str_Valor = "";
    var StrYear = Str_val.split("_");

    Str_Valor = Matrix_Fasecolda[Index_Year]["Year_" + StrYear[1]];
    Str_Valor = Str_Valor + "000";
    $("#V_Valor_F").html(dinner_format_grid(Str_Valor, ""));
    $("#Txt_Cilindraje").val(Matrix_Fasecolda[Index_Year]["Cilindraje"]);
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                              MENSAJES, VISUALIZACION Y LIMPIEZA                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//limpiar campos fasecolda
function Clear_Consulta_Fasecolda() {

    $("#TxtFasecolda_ID").val("");
    $("#Select_ClaseF").val("-1");
    $("#Select_modelo").val("-1");
    $('#Select_MarcaF').empty();
    $('#Select_LineaF').empty();

    $("#Txt_Cilindraje").val("");
    $("#V_Valor_F").html("");

    $('.C_Chosen').trigger('chosen:updated');
}

//limpiar Imagenes fasecolda
function Clear_Ima_F() {
    $("#Fase_10").css("display", "none");
    $("#Fase_9").css("display", "none");
    $("#Fase_8").css("display", "none");
    $("#Fase_7").css("display", "none");
    $("#Fase_6").css("display", "none");
    $("#Fase_5").css("display", "none");
    $("#Fase_4").css("display", "none");
    $("#Fase_3").css("display", "none");
    $("#Fase_2").css("display", "none");
    $("#Fase_1").css("display", "none");
}

//limpiar Imagenes Generales
function Clear_Ima_G() {
    $("#Img_TD").css("display", "none");
    $("#Img_D").css("display", "none");
    $("#Img1").css("display", "none");
    $("#Img2").css("display", "none");
    $("#Img3").css("display", "none");
    $("#Img5").css("display", "none");
    $("#Img6").css("display", "none");
    $("#Img7").css("display", "none");
    $("#Img8").css("display", "none");
    $("#Img9").css("display", "none");
}

//limpiar Imagenes llaves
function Clear_Ima_K() {
    $("#K_1").css("display", "none");
    $("#K_2").css("display", "none");
    $("#K_3").css("display", "none");
    $("#K_4").css("display", "none");
}

//limpiar Imagenes inmuebles
function Clear_Ima_I() {
    $("#Inmu_1").css("display", "none");
    $("#Inmu_2").css("display", "none");
}

//limpiar Imagenes blindaje
function Clear_Ima_Bli() {
    $("#Img_N_blin").css("display", "none");
    $("#Img_TD_blin").css("display", "none");
    $("#Img_D_blin").css("display", "none");
}



//Bloquea controles 
function Disable_Consult_Fasecolda() {
    $("#TxtFasecolda_ID").attr("disabled", "disabled");
    $("#Select_ClaseF").attr("disabled", "disabled");
    $("#Select_MarcaF").attr("disabled", "disabled");
    $("#Select_LineaF").attr("disabled", "disabled");
    $("#Select_modelo").attr("disabled", "disabled");

    $('.C_Chosen').trigger('chosen:updated');
}

//Desbloquea controles 
function Enable_Consult_Fasecolda() {
    $("#TxtFasecolda_ID").removeAttr("disabled");
    $("#Select_ClaseF").removeAttr("disabled");
    $("#Select_MarcaF").removeAttr("disabled");
    $("#Select_LineaF").removeAttr("disabled");
    $("#Select_modelo").removeAttr("disabled");

    $('.C_Chosen').trigger('chosen:updated');
}


