/*--------------- region de variables globales --------------------*/
var Matrix_Personas = [];
var Matrix_RTSTA = [];
var Matrix_Pais = [];
var Matrix_Fasecolda = [];
var Matrix_MarcaClase_F = [];
var Matrix_LineaMarcaClase_F = [];

var Lista_Clase_F = [];

var ArrayC_Activos = [];

var ArrayActivos = [];
var ArrayVehiculos = [];
var ListActivos = [];
var ListVehiculos = [];

var Clase_Index;
var Year_work;
var Index_Year;

var ContActivos = 0;

var Persona_A;

/*--------------- region de variables globales --------------------*/

$(document).ready(function () {
    transaccionAjax_MPersonas('MATRIX_PERSONAS');
    transaccionAjax_MRTSTA("MATRIX_RTSTA");
    transaccionAjax_MPaises_Ciudades('MATRIX_PAIS_CIUDAD');
    transacionAjax_MFasecolda("MATRIX_FASECOLDA");
    transacionAjax_MMarcaClase_F("MATRIX_MARCA_CLASE_F");
    transacionAjax_MLineaMarcaClase_F("MATRIX_LINEA_MARCA_CLASE_F");
    transacionAjax_ListaClaseFasecolda("LIST_CLASE_F");

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
    //CAMPOS  FACTURAS
    Clear_Img_Fact();

    $("#Blo_Inmuebles").css("display", "none");
    $("#Blo_Fasecolda").css("display", "none");
    $("#B_I").css("display", "none");
    $("#B_V").css("display", "none");

    $("#T_Datos_Identificacion_blin").css("display", "none");

    $("#Bloque_datosIngreso").css("display", "none");

    $("#Tabla_LLave_Inmueble").css("display", "none");
    $("#Tabla_LLave_Vehiculos").css("display", "inline-table");
    $("#Txtkey_1").html("C. Identificación");

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
        height: 420,
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
    Change_Select_TA();
    Change_Select_pais();
    Change_Select_blindaje();
    Change_Select_Modelo();

    Picker_Fechas_A();

    Date_Document_A();
    Format_Adress("Txt_Adress_U");
    Calcula_Valor_IVA("Txt_ValFactura", "Text_Val_Sin_IVA", "V_Val_IVA");
    $("#Select_Sucursal").prop('disabled', true);
    $("#Select_Moneda").prop('disabled', true);
});

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                 REGION BOTONES                                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//valida y muestra campos
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

    var validaCampos = ValidaMinimo();

    if (validaCampos == 0) {
        $("#Dialog_Factura").dialog("open");
        $("#Dialog_Factura").dialog("option", "title", "Crear Factura");

        $("#L_Empresa_Act").html($("#Select_EmpresaNit option:selected").html());
        $("#L_K1_Act").html($("#TxtRef_1").val().toUpperCase());
        $("#L_K2_Act").html($("#TxtRef_2").val().toUpperCase());
        $("#L_K3_Act").html($("#TxtRef_3").val().toUpperCase());
        $("#L_K4_Act").html($("#TxtRef_Other").val().toUpperCase());
        $("#Select_Moneda_F").val($("#Select_Moneda").val());
        $("#Select_Moneda_F").attr("disabled", "disabled");

        $('.C_Chosen').trigger('chosen:updated');
    }
    else {
        Mensaje_General("No puede crear Facturas!", "Debe almenos seleccionar nit, tipo de activo y una referencia", "W");
    }
}

//crear link en la BD
function BtnCrear_Act() {
    var validate;
    validate = ValidarGuardado();

    if (Persona_A == true) {

        if (validate == 0) {
            transacionAjax_Consult_Activos_existe("ConsultarActivo", "ACTIVOS", index_NIT_ID, $("#TxtRef_1").val(), $("#TxtRef_2").val(), $("#TxtRef_3").val());
        } else {
        }

    } else {
        Mensaje_General("¡Persona Inexistentes!", "No puedes registrar un activo a nombre de una persona que no esté registrada en el sistema.", "W");
    }
}


/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                     PROCESO DE CARGUE                                                                                                                                        ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//Función de control del picker de las fechas
function Picker_Fechas_A() {
    $("#TxtFecha_Recibo").datepicker({ dateFormat: 'yy-mm-dd' });
    $("#TxtFecha_Retiro").datepicker({ dateFormat: 'yy-mm-dd' });
    $("#Txt_Fecha_fact").datepicker({ dateFormat: 'yy-mm-dd' });
}

//valida campo y consulta datos de persona
function Date_Document_A() {

    $("#TxtDoc").blur(function () {

        var valida_people = ValidaCamposPeople_A();
        if (valida_people == 1) {
            Mensaje_General("campos Incompletos!", "los campos (Nit Empresa), (Tipo de documento) y (documento) NO han sido diligenciados", "E");
        }
        else {
            var C_TD = $("#Select_Documento").val();
            var C_D = $("#TxtDoc").val();
            var Nit = $("#Select_EmpresaNit").val();

            transacionAjax_ShearchPeople("Buscar_Persona", C_TD, C_D, Nit, "V_Responsable", "Persona_A");
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

function Cargar_Variables() {
    var sucursal = $("#Select_Sucursal_C").val();
    var moneda = $("#Select_Moneda_C").val();

    $("#L_Empresa_A").html($("#Select_EmpresaNit option:selected").html());
    $("#L_Colocacion_A").html($("#TXT_ID_Colocacion").val());

    $("#Select_Sucursal").val(sucursal).trigger("chosen:updated");
    $("#Select_Moneda").val(moneda).trigger("chosen:updated");

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
//limpiar campos activos
function Clear_Limpiar() {

    $("#Select_Documento").val("-1");
    $("#Select_Tipo").val("-1");
    $("#Select_CompraBien").val("0");
    $("#Select_Asegurado").val("N");
    $("#Select_TipoAdmin").val("1");
    $("#Select_Pais_U").val("-1");
    $("#Select_Pais_R").val("-1");
    $("#Select_TipoEscritura").val("1");

    $('#Select_SubTipo').empty();
    $('#Select_Ciudad_U').empty();
    $('#Select_Ciudad_R').empty();

    $("#TxtRef_1").val("");
    $("#TxtRef_2").val("");
    $("#TxtRef_3").val("");
    $("#TxtRef_Other").val("");
    $("#TxtDoc").val("");
    $("#txtDescripcion").val("");
    $("#TxtValor_Bien").val("");
    $("#TxtValor_Compra").val("");
    $("#Txt_Adress_U").val("");
    $("#Txt_NunImobiliaria").val("");
    $("#TxtFecha_Recibo").val("");
    $("#TxtFecha_Retiro").val("");

    $("#V_Responsable").html("");

    $("#V_TFacturas").html("");

    $("#Blo_Inmuebles").css("display", "none");
    $("#Blo_Fasecolda").css("display", "none");

    $('.C_Chosen').trigger('chosen:updated');
}

//limpiar campos fasecolda
function Clear_Consulta_Fasecolda() {

    $("#TxtFasecolda_ID").val("");
    $("#Select_ClaseF").val("-1");
    $("#Select_modelo").val("-1");
    $('#Select_MarcaF').empty();
    $('#Select_LineaF').empty();

    $("#Txt_Cilindraje").val("");
    $("#V_Valor_F").html("");
    $("#TxtN_Motor").val("");
    $("#Txt_NSerie").val("");
    $("#Txt_NChasis").val("");
    $("#Txt_NVIN").val("");
    $("#TxtValor_Chasis").val("");
    $("#Txt_Capacidad").val("");
    $("#Txt_Potencia").val("");
    $("#Txt_Carroceria").val("");
    $("#Txt_TCarroceria").val("");
    $("#Text_NGPS").val("");
    $("#Txt_Nivel_Blin").val("");
    $("#TxtDoc_Blin").val("");

    $("#Select_TServicio").val("-1");
    $("#Select_MServicio").val("1");
    $("#Select_Combustible").val("-1");
    $("#Select_Color").val("-1");
    $("#Select_Blindaje").val("-1");
    $("#Select_Documento_Blin").val("-1");

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
    $("#Img_TD_A").css("display", "none");
    $("#Img_D_A").css("display", "none");
    $("#Img_G1").css("display", "none");
    $("#Img_G2").css("display", "none");
    $("#Img_G3").css("display", "none");
    $("#Img_G4").css("display", "none");
    $("#Img_G5").css("display", "none");
    $("#Img_G6").css("display", "none");
    $("#Img_G7").css("display", "none");
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

//limpiar Imagenes Facturas
function Clear_Img_Fact() {
    $("#Img_Fac_1").css("display", "none");
    $("#Img_Fac_2").css("display", "none");
    $("#Img_Fac_3").css("display", "none");
    $("#Img_Fac_4").css("display", "none");
    $("#Img_Fac_5").css("display", "none");
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