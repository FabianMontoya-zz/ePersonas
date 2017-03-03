/*--------------- region de variables globales --------------------*/
var ArrayEmpresaNit = [];
var ArrayDedos = [];
var arrayNameFiles = [];
var arrayFingersStatus = [];

var RutasOperacion = [];
var RutaTemporal = "";
var RutaRelativa = "";
var RutaDestino = "";

var namePersona = ""

var Persona = false; //Si consultaron correctamente una persona del sistema
var Ejecutable = false; //Indica si el ejecutable ya fué generado
var ArchivosOK = false; //Si se han subido todos los archivos requeridos
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {

    $("#Marco_trabajo_Form").css("height", "490px");
    $("#Marco_trabajo_Huella").css("height", "380px");

    /*Llamado de metodos para ocultar elementos al inicio de la operación de la pantalla*/
    Ventanas_Emergentes(); //Ventanas_Emergentes Va primero pues es la que llama al load de espera al inicio de los AJAX
    Ocultar_Errores();
    Ocultar_Tablas();
    /*==================FIN LLAMADO INICIAL DE METODOS DE INICIALIZACIÓN==============*/
    
    /*Llamado de transacciones AJAX iniciales*/
    transacionAjax_EmpresaNit('Cliente');
    transacionAjax_Documento('Documento');
    transaccionAjax_RutasOperacion('RUTAS_OPERACION');
    /*=============== END ====================*/

    Clear();
    var OnlyEmpresa = VerificarNIT("Select_EmpresaNit");//Bloquear o no el combo de Nit Empresa según acceso de usuario
    if (OnlyEmpresa == true) {
        $("#Select_Documento").prop('disabled', false); //No se agrega el trigger porque se hace al seleccionar el val
        $("#Select_Documento").val("-1").trigger("chosen:updated");
    } 
    Change_Select_Nit();
    Change_Select_Documento();
    Consult_Document();    
});

//Función que oculta todas las IMG de los errores en pantalla
function Ocultar_Errores() {
    ResetError();
    $("#Img_TD").css("display", "none");
    $("#Img_D").css("display", "none");
    /*Se ocultan en la SASIF Master*/
}

//funcion para las ventanas emergentes
function Ventanas_Emergentes() {

    Load_Charge_Sasif(); //Carga de "SasifMaster.js" el ContHuellas de Carga

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

    $("#Dialog_Dedos").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 600,
        height: 365,
        overlay: {
            opacity: 0.5,
            background: "black"
        },
        open: function (event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).show(); }
    });
}

//Función que llama el Dialog de captura de Dedos
function DialogDedos() {
    if (Persona == true) {
        $("#Dialog_Dedos").dialog("open");
    } else {
        Mensaje_General("Sin Persona Relacionada", "Primero debes relacionar una persona existente en el sistema para acceder a esta opción.", "W");

        $("#Img1").css("display", "inline-table");
        $("#Img_TD").css("display", "inline-table");
        $("#Img_D").css("display", "inline-table");
    }
}

//Función que oculta las tablas
function Ocultar_Tablas() {
    $("#T_Files").css("display", "none");
    $("#T_TitleTableFiles").css("display", "none");
    $("#Div_TableFingers").css("display", "none");    
}

//Función que ejecuta la carga de los dedos y la generación del ejecutable
function GenerarEjecutable() {
    if (Ejecutable == false) {
        var Dedos = CargarArrayDedos();
        if (Dedos == true) {
            BloquearChecks();
            $("#Select_EmpresaNit").prop('disabled', true).trigger("chosen:updated");
            $("#Select_Documento").prop('disabled', true).trigger("chosen:updated");
            $("#TxtDoc").prop('disabled', true);

            transacionAjax_Ok("DescargarEjecutable");
            CargarNames();
            ArmarTabla();
        } else {
            Mensaje_General("¡ERROR! - Sin Selección", "Debes seleccionar como mínimo uno de los dedos que capturarás de la persona.", "E");
        }
    } else {
        Mensaje_General("Ejecutable ya generado", "Lo sentimos, no puedes generar dos veces un mismo ejecutable.", "W");
    }
}

//Función que revisa si se han seleccionado dedos y los que se hayan seleccionado los carga al array
function CargarArrayDedos() {
    var Result = false;
    //Pulgares
    if ($("#Check_PulgarIZ").prop("checked")) {
        ArrayDedos.push($("#Check_PulgarIZ").val());
        Result = true;
    }
    if ($("#Check_PulgarDER").prop("checked")) {
        ArrayDedos.push($("#Check_PulgarDER").val());
        Result = true;
    }
    //Indices
    if ($("#Check_IndiceIZ").prop("checked")) {
        ArrayDedos.push($("#Check_IndiceIZ").val());
        Result = true;
    }
    if ($("#Check_IndiceDER").prop("checked")) {
        ArrayDedos.push($("#Check_IndiceDER").val());
        Result = true;
    }
    //Dedos Medios
    if ($("#Check_MedioIZ").prop("checked")) {
        ArrayDedos.push($("#Check_MedioIZ").val());
        Result = true;
    }
    if ($("#Check_MedioDER").prop("checked")) {
        ArrayDedos.push($("#Check_MedioDER").val());
        Result = true;
    }
    //Anulares
    if ($("#Check_AnularIZ").prop("checked")) {
        ArrayDedos.push($("#Check_AnularIZ").val());
        Result = true;
    }
    if ($("#Check_AnularDER").prop("checked")) {
        ArrayDedos.push($("#Check_AnularDER").val());
        Result = true;
    }
    //Meñiques
    if ($("#Check_MeniqueIZ").prop("checked")) {
        ArrayDedos.push($("#Check_MeniqueIZ").val());
        Result = true;
    }
    if ($("#Check_MeniqueDER").prop("checked")) {
        ArrayDedos.push($("#Check_MeniqueDER").val());
        Result = true;
    }
    return Result;
}

//Función que bloquea los checks de los dedos
function BloquearChecks() {
    $("#Check_PulgarIZ").prop('disabled', true);
    $("#Check_PulgarDER").prop('disabled', true);
    $("#Check_IndiceIZ").prop('disabled', true);
    $("#Check_IndiceDER").prop('disabled', true);
    $("#Check_MedioIZ").prop('disabled', true);
    $("#Check_MedioDER").prop('disabled', true);
    $("#Check_AnularIZ").prop('disabled', true);
    $("#Check_AnularDER").prop('disabled', true);
    $("#Check_MeniqueIZ").prop('disabled', true);
    $("#Check_MeniqueDER").prop('disabled', true);
}

//Función que reinicia los checks de los dedos a su forma default
function ReiniciarChecks() {
    $("#Check_PulgarIZ").prop('disabled', false);
    $("#Check_PulgarDER").prop('disabled', false);
    $("#Check_IndiceIZ").prop('disabled', false);
    $("#Check_IndiceDER").prop('disabled', false);
    $("#Check_MedioIZ").prop('disabled', false);
    $("#Check_MedioDER").prop('disabled', false);
    $("#Check_AnularIZ").prop('disabled', false);
    $("#Check_AnularDER").prop('disabled', false);
    $("#Check_MeniqueIZ").prop('disabled', false);
    $("#Check_MeniqueDER").prop('disabled', false);
    $("#Check_PulgarIZ").prop("checked", false);
    $("#Check_PulgarDER").prop("checked", false);
    $("#Check_IndiceIZ").prop("checked", false);
    $("#Check_IndiceDER").prop("checked", false);
    $("#Check_MedioIZ").prop("checked", false);
    $("#Check_MedioDER").prop("checked", false);
    $("#Check_AnularIZ").prop("checked", false);
    $("#Check_AnularDER").prop("checked", false);
    $("#Check_MeniqueIZ").prop("checked", false);
    $("#Check_MeniqueDER").prop("checked", false);
}

//Validamos campos para la creacion del Huellas
function validarCamposCrear() {
    var validar = false;
    VerificarFiles();
    if (Persona == true && ArchivosOK == true && Ejecutable == true) {
        validar = true;
    } else if (Persona == false) {
        Mensaje_General("Sin Persona Relacionada", "Primero debes relacionar una persona existente en el sistema para acceder a esta opción.", "E");
        $("#Img1").css("display", "inline-table");
        $("#Img_TD").css("display", "inline-table");
        $("#Img_D").css("display", "inline-table");
    } else if (ArchivosOK == false) {
        Mensaje_General("Archivos no Cargados", "Primero debes cargar todos los archivos solicitados para ejecutar esta función.", "W");
    } else if (Ejecutable == false) {
        Mensaje_General("Archivos no Cargados", "Debes hacer la generación del ejecutable y posterior carga de los archivos para acceder a esta opción.", "W");
    }

    return validar;
}

//Función llamada para guardar todo en BD
function GuardarHuellas() {
    var valido = validarCamposCrear();
    if (valido == true) {
        transacionAjax_Huellas_Create("Crear_Huellas");
    }
}

//Evento del boton salir
function x() {
    $("#dialog").dialog("close");
}

//Reinicia todos los campos del formulario
function Clear() {
    Ocultar_Errores();
    Ocultar_Tablas();
    ReiniciarChecks();
    $("#Select_EmpresaNit").prop('disabled', false); //No se agrega el trigger porque se hace al seleccionar el val
    $("#Select_EmpresaNit").val("-1").trigger("chosen:updated");
    $("#Select_Documento").prop('disabled', true); //No se agrega el trigger porque se hace al seleccionar el val
    $("#Select_Documento").val("-1").trigger("chosen:updated");
    $("#TxtDoc").val("");
    $("#TxtDoc").prop('disabled', true);
    $("#V_Persona").html("");
    $("#fileupload").val("");
    ArrayDedos = [];
    arrayNameFiles = [];
    arrayFingersStatus = [];
    Persona = false; 
    Ejecutable = false; 
    ArchivosOK = false;
    namePersona = ""
}

//valida campo y consulta datos de persona
function Consult_Document() {

    $("#TxtDoc").blur(function () {
        var valida_people = ValidaCamposPeople();
        if (valida_people == 1) {
            Mensaje_General("¡Campos Incompletos!", "Los campos [NIT Empresa], [Documento] e [Identificación] deben ser diligenciados para consultar la persona.", "E");
            Persona = false;
        }
        else {
            var C_TD = $("#Select_Documento").val();
            var C_D = $("#TxtDoc").val();
            var Nit = $("#Select_EmpresaNit").val();

            transacionAjax_ShearchPeople("Buscar_Persona", C_TD, C_D, Nit, "V_Persona");
        }

    });
}

//valida campos de documentos para buscar persona
function ValidaCamposPeople() {
    var valida = 0;
    var C_Nit_ID = $("#Select_EmpresaNit").val();
    var C_TD = $("#Select_Documento").val();
    var C_D = $("#TxtDoc").val();

    if (C_Nit_ID == "-1" || C_TD == "-1" || C_D == "") {
        valida = 1;
        if (C_TD == "-1") {
            $("#Img_TD").css("display", "inline-table");
        }
        else {
            $("#Img_TD").css("display", "none");
        }
        if (C_D == "") {
            $("#Img_D").css("display", "inline-table");
        }
        else {
            $("#Img_D").css("display", "none");
        }
        if (C_Nit_ID == "-1") {
            $("#Img1").css("display", "inline-table");
        }
        else {
            $("#Img1").css("display", "none");
        }
    }
    else {
        $("#Img1").css("display", "none");
        $("#Img_TD").css("display", "none");
        $("#Img_D").css("display", "none");
    }
    return valida;
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                     PROCESOS DE CARGA DE ARCHIVOS HUELLAS                                                                                                                                    ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//Función Inicial para la carga de los archivos
function CargaArchivos(ID_FileInput) {
    if (Ejecutable == true) {
        UpLoad_MultipleFiles('Huellas', ID_FileInput, 'Huellas');
    } else {
        Mensaje_General("Ejecutable no Generado", "No puedes ejecutar esta opción ya que no se ha generado el respectivo ejecutable necesario para validar esta operación", "E");
        $("#" + ID_FileInput).val("");
    }
}

//Función que genera los nombres con los que deben quedar los archivos que van a cargar
function CargarNames() {
    if (Ejecutable == true) {
        for (item in ArrayDedos) {
            arrayNameFiles.push(ArrayDedos[item] + "_" + $("#Select_Documento").val() + "_" + $("#TxtDoc").val());
            var JSONFingers = { Index: item, Nombre: ArrayDedos[item] + "_" + $("#Select_Documento").val() + "_" + $("#TxtDoc").val() + ".fpt", Estado: "Wait" };
            arrayFingersStatus.push(JSONFingers);
        }
    } else {
        Mensaje_General("Ejecutable no Generado", "No puedes ejecutar esta opción ya que no se ha generado el respectivo ejecutable necesario para validar esta operación", "E");
    }
}

//Función que valida si todos los archivos requeridos ya fueron subidos
function VerificarFiles() {
    ArchivosOK = true;
    for (item in arrayFingersStatus) {
        if (arrayFingersStatus[item].Estado == "Wait") {
            ArchivosOK = false;
            break;
        }
    }
}

//Función que valida que archivos ya se subieron y actualiza el estado en el array
function CheckFiles(ArraySubidosOK) {
    for (item in arrayFingersStatus) {
        for (i in ArraySubidosOK) {
            if (arrayFingersStatus[item].Nombre == ArraySubidosOK[i]) {
                arrayFingersStatus[item].Estado = "Ready";
            }
        }
    }
}

//Función que se encarga de armar la tabla validando si se cargarón o no los archivos
function ArmarTabla() {
    var html_TFingers = "<table id='TUser' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Archivo Requerido</th><th>Estado</th></tr></thead><tbody>";
    for (itemArray in arrayFingersStatus) {
        if (arrayFingersStatus[itemArray].Estado == "Wait") {
            html_TFingers += "<tr id= 'TFingers_" + arrayFingersStatus[itemArray].Index + "'><td style='white-space: nowrap;'>" + arrayFingersStatus[itemArray].Nombre + "</td><td style='white-space: nowrap;' align='center'><span class='cssToolTip_ver'><img alt='Wait' title='' style='height: 21px; width: 21px;' src='../../images/waiting.png' /><span>En espera de carga</span></span></td></tr>";
        } else if (arrayFingersStatus[itemArray].Estado == "Ready") {
            html_TFingers += "<tr id= 'TFingers_" + arrayFingersStatus[itemArray].Index + "'><td style='white-space: nowrap;'>" + arrayFingersStatus[itemArray].Nombre + "</td><td style='white-space: nowrap;' align='center'><span class='cssToolTip_ver'><img alt='Ready' title='' style='height: 21px; width: 21px;' src='../../images/C_GREEN.png' /><span>Archivo listo</span></span></td></tr>";
        }
    }

    html_TFingers += "</tbody></table>";
    $("#Div_TableFingers").css("display", "inline");
    $("#Div_TableFingers").html("");
    $("#Div_TableFingers").html(html_TFingers);

    $("#TUser").dataTable({
        "bJQueryUI": true, "iDisplayLength": 900,
        "bDestroy": true
    });
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                     PROCESOS DE CHANGES EN Huellas                                                                                                                                     ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

function Change_Select_Nit() {
    $("#Select_EmpresaNit").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_EmpresaNit").val() == "-1") {
            $("#Img1").css("display", "inline-table");
            $("#Select_Documento").prop('disabled', true); //No se agrega el trigger porque se hace al seleccionar el val
            $("#Select_Documento").val("-1").trigger("chosen:updated");

        } else {
            $("#Img1").css("display", "none");
            $("#Select_Documento").prop('disabled', false); //No se agrega el trigger porque se hace al seleccionar el val
            $("#Select_Documento").val("-1").trigger("chosen:updated");
        }
        Persona = false;
        $("#TxtDoc").val("");
        $("#TxtDoc").prop('disabled', true);
        $("#V_Persona").html(" ");
    });
}

function Change_Select_Documento() {
    $("#Select_Documento").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_Documento").val() == "-1") {
            $("#Img_TD").css("display", "inline-table");
            $("#TxtDoc").prop('disabled', true);
        } else {
            $("#Img_TD").css("display", "none");
            $("#TxtDoc").prop('disabled', false);
        }
        Persona = false;
        $("#TxtDoc").val("");
        $("#V_Persona").html(" ");
    });
}
