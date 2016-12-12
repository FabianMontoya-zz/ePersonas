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

/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {

    $("#Marco_trabajo_Contrato").css("height", "490px");
    Picker_Fechas();
    transaccionAjax_MRTSTA("MATRIX_RTSTA");
    transaccionAjax_MPaises_Ciudades('MATRIX_PAIS_CIUDAD');
    transaccionAjax_MPersonas('MATRIX_PERSONAS');
    transaccionAjax_MSucursal('MATRIX_SUCURSAL');
    transacionAjax_ListaClaseFasecolda("LIST_CLASE_F");
    transacionAjax_MMoneda('MATRIX_MONEDA');
    transacionAjax_MFasecolda("MATRIX_FASECOLDA");
    transacionAjax_MMarcaClase_F("MATRIX_MARCA_CLASE_F");
    transacionAjax_MLineaMarcaClase_F("MATRIX_LINEA_MARCA_CLASE_F");

    transacionAjax_EmpresaNit('Cliente')
    transacionAjax_Documento('Documento');
    transacionAjax_Tipo('Tipo');
    // transacionAjax_Estado('Estado');
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
    $("#Img10").css("display", "none");
    $("#Img11").css("display", "none");
    $("#Img12").css("display", "none");
    $("#Img13").css("display", "none");

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

//valida y mustra campos
function BtnBuscarFacecolda() {
    var validar = ValidaCamposConsultaFasecolda();

    switch (validar) {
        case 0:

            break;

        case 1:
            Mensaje_General("¡Campos sin Datos!", "¡Al buscar por Clase, Marca, linea, modelo los campos deben ser diligenciados!", "W");
            break;

        case 2:
            Mensaje_General("¡No existe!", "¡El Codigo digitado no se encuentra en la Tabla Fasecolda!", "W");
            break;

      
    }
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                           REGION DE VALIDACIONES                                                                                                   ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//valida campos de documentos para buscar persona
function ValidaCamposPeople() {
    var valida = 0;
    var C_Nit_ID = $("#Select_EmpresaNit").val();
    var C_TD = $("#Select_Documento").val();
    var C_D = $("#TxtDoc").val();

    if (C_Nit_ID == "-1" || C_TD == "-1" || C_D == "") {
        valida = 1;
        if (C_TD == "-1") { $("#Img_TD").css("display", "inline-table"); } else { $("#Img_TD").css("display", "none"); }
        if (C_D == "") { $("#Img_D").css("display", "inline-table"); } else { $("#Img_D").css("display", "none"); }
        if (C_Nit_ID == "-1") { $("#Img1").css("display", "inline-table"); } else { $("#Img1").css("display", "none"); }
    }
    else {
        $("#Img1").css("display", "none");
        $("#Img_TD").css("display", "none");
        $("#Img_D").css("display", "none");
    }
    return valida;
}

//validamos que tipo de busqueda es y verificamos
function ValidaCamposConsultaFasecolda() {

    var TipoBusqueda;
    var Busqueda;

    var Campo_BF_1 = $("#TxtFasecolda_ID").val();
    var Campo_BF_2 = $("#Select_ClaseF").val();
    var Campo_BF_3 = $("#Select_MarcaF").val();
    var Campo_BF_4 = $("#Select_LineaF").val();
    var Campo_BF_5 = $("#Select_modelo").val();

    switch (Campo_BF_1) {

        case "":
            TipoBusqueda = 0;
            if (Campo_BF_5 == "-1" || Campo_BF_4 == "" || Campo_BF_3 == "" || Campo_BF_4 == "-1" || Campo_BF_3 == "-1" || Campo_BF_2 == "-1") {
                Busqueda = 1;
            }
            else {
                Busqueda = Search_Fasecolda(TipoBusqueda, "", Campo_BF_2, Campo_BF_3, Campo_BF_4, Campo_BF_5);
            }
            break;

        default:
            TipoBusqueda = 1;
            Busqueda = Search_Fasecolda(TipoBusqueda, Campo_BF_1, "", "", "", "");
            break;
    }

    return Busqueda;
}

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
        var StrYear = Modelo.split("_");
        console.log(StrYear[1]);
        for (itemArray in Matrix_Fasecolda) {
            if (Matrix_Fasecolda[itemArray].Clase == Clase &&
                Matrix_Fasecolda[itemArray].Clase == Marca &&
                Matrix_Fasecolda[itemArray].Linea == Linea &&
                Matrix_Fasecolda[itemArray].Year_ + StrYear[1] != "") {
                EncuentraDato = 0;
            }
        }
    } else {
        for (itemArray in Matrix_Fasecolda) {
            if (Matrix_Fasecolda[itemArray].Fasecolda_ID == Cod_id) {
                EncuentraDato = 0;
            }
        }
    }

    return EncuentraDato;
}

//limpiar campos
function Clear() {

    $("#Txt_ID").val("");

}

function Add_Facturas(index) {
    $("#Dialog_Activos").dialog("open");
    $("#Dialog_Activos").dialog("option", "title", "Crear Factura");
    Table_Activos();
}

function Table_Activos() {
    $("#container_TActivos").html("");
}

