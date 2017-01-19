/*--------------- region de variables globales --------------------*/
var Matrix_RTSTA = [];
var ArrayEmpresaNit = [];
var Matrix_Pais = [];
var Matrix_Personas = [];
var Matrix_Sucursal = [];
var Matrix_Moneda = [];

var Array_Marca_F = [];
var Array_Clase_F = [];
var Matrix_Linea_F = [];
var Matrix_Linea_F_ID = [];

var ArrayC_Activos = [];
var Array_Hijo_Cliente = [];
var ArrayEstado = [];

var Persona_Exist;
var ID;
var T_Doc;
var Doc;
var Year_work;
var Index_Year;
var Year_Parametro;
var Con_Linea;
var Con_Clase;

/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {

    $("#Marco_trabajo_Contrato").css("height", "490px");
    $("#V_TFacturas").html(Suma_Valor_Inicial);

    Load_Charge_Sasif();
    Picker_Fechas();
    VentanasEmergentes();
    DiseñaObjetos();

    transaccionAjax_MRTSTA("MATRIX_RTSTA");
    transaccionAjax_MPaises_Ciudades('MATRIX_PAIS_CIUDAD');
    transaccionAjax_MPersonas('MATRIX_PERSONAS');
    transaccionAjax_MSucursal('MATRIX_SUCURSAL');
    transacionAjax_MMoneda('MATRIX_MONEDA');

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
    //CAMPOS  FACTURAS
    Clear_Img_Fact();

    $("#Blo_Inmuebles").css("display", "none");
    $("#Blo_Fasecolda").css("display", "none");
    $("#B_I").css("display", "none");
    $("#B_V").css("display", "none");

    $("#T_Datos_Identificacion_blin").css("display", "none");

    $("#Bloque_datosIngreso").css("display", "none");

    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WA").css("display", "none");

    $("#Seg_1").css("display", "none"); //imagen de validacion de poliza
    
    $("#Tabla_LLave_Inmueble").css("display", "none");
    $("#Tabla_poliza").css("display", "none");
    $("#Tabla_LLave_Vehiculos").css("display", "inline-table");
    $("#Txtkey_1").html("C. Identificación");

    Change_Select_Marca();
    Change_Select_Clase();

    Change_Select_Nit();
    Change_Select_TA(); 
    Change_Select_pais();
    Change_Select_Moneda();
    Change_Select_blindaje();
    Change_Select_Modelo();
    Change_Select_Linea();
    Change_Seguro();
    Change_Compara_Fecha("TxtFecha_Recibo", "TxtFecha_Retiro");

    Format_Adress("Txt_Adress_U");
    Date_Document();
    Calcula_Valor_IVA("Txt_ValFactura", "Text_Val_Sin_IVA", "V_Val_IVA");
    Cargue_Depent_Modelo();

    Compara_Valor_Compra("Txt_ValFactura", "Val", "Text_Val_Sin_IVA", "Val", "Text_Val_Sin_IVA", "sin IVA", " Total", "Blur");
});



/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                 REGION BOTONES                                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//crear link en la BD
function BtnCrear() {
    var validate;
    validate = ValidarGuardado();

    if (validate == 0) {
        if (Persona_Exist == true) {
            switch (Tipo_Activo) {
                case 2:
                    transacionAjax_C_Vehiculos_create("crear_vehiculo");
                    break;

                default:
                    transacionAjax_C_Activos_create("crear");
                    break;
            }
        }
        else {
            Mensaje_General("No existe", "no puede agregar una persona que no existe en el Sistema", "W");

        }
    }
}

//salida del formulario
function btnSalir() {
    window.location = "../../Menu/menu.aspx?User=" + $("#User").html() + "&Key=" + ArrayMenu[0].Nit + "&LINK=" + Link;
}

//evento del boton salir
function x() {
    $("#dialog").dialog("close");
}

//valida y mustra campos
function BtnBuscarFacecolda() {

    if ($("#Btn_ShearchFacecolda").val() == "Nueva Consulta") {
        $("#Btn_ShearchFacecolda").attr("value", "Consulta Facecolda");
        $("#Cambio_modelo").css("width", "29%");
        Clear_Ima_F();
        Enable_Consult_Fasecolda();
        Clear_Consulta_Fasecolda();
    }
    else {
        var validar = ValidaCamposConsultaFasecolda();

        switch (validar) {
            case 0:
                Clear_Ima_F();
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

//ingresa factura
function BtnFactura() {
    var validaCampos = ValidaCamposFactura();
    var R1;
    var R2;
    var R3;
    var tipo_A = $("#Select_Tipo").val();

    switch (validaCampos) {
        case 0:
            if (tipo_A == "1") {
                R1 = $("#TxtRef_1").val();
                R2 = $("#TxtRef_2").val();
                R3 = $("#TxtRef_3").val();
                transacionAjax_Consult_Factura_Existe("ConsultarFactura", "FACT_ORD_COMPRA", Nit_Proccess, R1, R2, R3, $("#Factura_ID").val());
            }
            else {
                R1 = $("#TxtRef_Other").val();
                R2 = "";
                R3 = "";
                transacionAjax_Consult_Factura_Existe("ConsultarFactura", "FACT_ORD_COMPRA", Nit_Proccess, R1, R2, R3, $("#Factura_ID").val());
            }
            break;
        case 1:
            Mensaje_General("Factura Incompleta!", "Tiene que diligenciar todos los campos de la factura!", "E");
            break;
    }
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                     PROCESO DE CARGUE                                                                                                                                        ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//se instancian las ventanes emergentes del proceso de activos
function VentanasEmergentes() {

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
        height: 420,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
    });
}

//se instancias elementos alterdo de la paghina tablas  acordeon etc
function DiseñaObjetos() {
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
}

//Función de control del picker de las fechas
function Picker_Fechas() {
    $("#TxtFecha_Recibo").datepicker({ dateFormat: 'yy-mm-dd', changeYear: true, changeMonth: true});
    $("#TxtFecha_Retiro").datepicker({ dateFormat: 'yy-mm-dd', changeYear: true, changeMonth: true });
    $("#TxtFecha_Retiro").datepicker("option", "disabled", true);
    $("#Txt_Fecha_fact").datepicker({ dateFormat: 'yy-mm-dd', changeYear: true, changeMonth: true });

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

            transacionAjax_ShearchPeople("Buscar_Persona", C_TD, C_D, Nit, "V_Responsable", "Persona_Exist");
        }

    });
}

//trae parametro y cargar el combo de años
function Captura_parametro() {
    var Year_actual;
    for (item in ArrayMenu) {
        if (ArrayMenu[item].IDlink == Link) {
            Year_Parametro = parseInt(ArrayMenu[item].Parametro_1);
        }
    }
    return Year_actual;
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                     PROCESO BUSQUEDA FASECOLDA                                                                                  ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//buscar en fasecolda
function Search_Fasecolda(Type, Cod_id, Modelo) {

    var EncuentraDato = 2;
    if (Type == 0) {

        for (itemArray in Matrix_Linea_F) {
            if (Matrix_Linea_F[itemArray].Fasecolda_ID == Cod_id) {
                EncuentraDato = 0;
                $("#TxtFasecolda_ID").val(Matrix_Linea_F[itemArray].Fasecolda_ID);
                MostrarValor_Cilindraje_Fasecolda(Matrix_Linea_F, Modelo, "Matrix");

                $("#Btn_ShearchFacecolda").attr("value", "Nueva Consulta");
                Disable_Consult_Fasecolda();
            }
        }
    }
    else {

        for (itemArray in Matrix_Linea_F_ID) {
            if (Matrix_Linea_F_ID[itemArray].Fasecolda_ID == Cod_id) {
                EncuentraDato = 0;
                $("#Select_MarcaF").val(Matrix_Linea_F_ID[itemArray].Marca);
                Index_Year = parseInt(Matrix_Linea_F_ID[itemArray].Index) - 1;
                transacionAjax_Clase_F("LIST_CLASE_F", Matrix_Linea_F_ID[itemArray].Marca);
                transacionAjax_Linea_F("MATRIX_LINEA_F", Matrix_Linea_F_ID[itemArray].Marca, Matrix_Linea_F_ID[itemArray].Clase, "ID");

                Con_Clase = Matrix_Linea_F_ID[itemArray].Clase;
                Con_Linea = Matrix_Linea_F_ID[itemArray].Linea;
                MostrarValor_Cilindraje_Fasecolda(Matrix_Linea_F_ID, Modelo, "ID");

                Disable_Consult_Fasecolda();
                $("#Btn_ShearchFacecolda").attr("value", "Nueva Consulta");

            }
        }
    }

    return EncuentraDato;
}

//ajusta y muestra el valor fasecolda y el cilindraje
function MostrarValor_Cilindraje_Fasecolda(Matrix, Str_val, Proccess) {

    if (Proccess == "Matrix")
        Index_ID_Fasecolda = Index_ID_Fasecolda - 1;
    else
        Index_ID_Fasecolda = 0;

    var Str_Valor = "";
    var StrYear = Str_val.split("_");

    Str_Valor = Matrix[Index_ID_Fasecolda]["Year_" + StrYear[1]];
    Str_Valor = Str_Valor + "000";
    $("#V_Valor_F").html(dinner_format_grid(Str_Valor, ""));
    $("#Txt_Cilindraje").val(Matrix[Index_ID_Fasecolda]["Cilindraje"]);
}

//muesta los valores de los combos
function CargarValoresCombos() {
    $("#Select_ClaseF").val(Con_Clase).attr('selected', true).trigger('chosen:updated');
    $('#Select_LineaF').find('option:contains("' + Con_Linea + '")').attr('selected', true).trigger('chosen:updated');
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                              MENSAJES, VISUALIZACION Y LIMPIEZA                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//limpiar campos activos
function Clear_Limpiar() {
    $("#Select_EmpresaNit").val("-1");
    $("#Select_Documento").val("-1");
    $("#Select_Tipo").val("-1");
    $("#Select_Moneda").val("-1");
    $("#Select_CompraBien").val("0");
    $("#Select_Asegurado").val("N");
    $("#Select_TipoAdmin").val("1");
    $("#Select_Pais_U").val("-1");
    $("#Select_Pais_R").val("-1");
    $("#Select_TipoEscritura").val("1");

    $('#Select_Sucursal').empty();
    $('#Select_SubTipo').empty();
    $('#Select_Ciudad_U').empty();
    $('#Select_Ciudad_R').empty();
    $('#Select_Persona_R').empty();

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
    $("#V_Sigla_1").html("");
    $("#V_Sigla_2").html("");
    $("#V_Sigla_3").html("");
    $("#V_Sigla_4").html("");
    $("#V_Sigla_5").html("");
    $("#V_TFacturas").html("");

    $("#Blo_Inmuebles").css("display", "none");
    $("#Blo_Fasecolda").css("display", "none");

    $("#Text_Num_Notaria").val("");
    $("#Txt_Num_poliza").val("");
    $("#Tabla_poliza").css("display", "none");
    Suma_Valor_Inicial = 0;

    $("#Select_EmpresaNit").removeAttr("disabled");
    $('.C_Chosen').trigger('chosen:updated');
}

//limpiar campos fasecolda
function Clear_Consulta_Fasecolda() {

    $("#TxtFasecolda_ID").val("");
    $("#Select_MarcaF").val("-1");
    $("#Select_modelo").empty();
    $('#Select_ClaseF').empty();
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
    $("#Inmu_3").css("display", "none");
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


