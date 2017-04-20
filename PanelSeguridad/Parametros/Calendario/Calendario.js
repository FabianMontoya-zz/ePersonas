/*--------------- Región de variables globales --------------------*/
var ArrayCalendario_Grid = [];
var ArrayCalendario = [];
var ArrayCombo = [];
var ArrayCalendarioDep = [];
var ArrayC_Semana = [];
var ArrayC_Semana_Edit = [];

var MatrizMonday = [];
var MatrizTuesday = [];
var MatrizWednesday = [];
var MatrizThursday = [];
var MatrizFriday = [];
var MatrizSaturday = [];
var MatrizSunday = [];

var Lineas = 0; //Contador de filas que tendrán las matrices

var WorkMonday = true;
var WorkTuesday = true;
var WorkWednesday = true;
var WorkThursday = true;
var WorkFriday = true;
var WorkSaturday = true;
var WorkSunday = true;
var WorkFestivo = false;

var FirstMonday = false;
var FirstTuesday = false;
var FirstWednesday = false;
var FirstThursday = false;
var FirstFriday = false;
var FirstSaturday = false;
var FirstSunday = false;

var validaTipoCalendario = false;

var MensajeHora = "";
var MensajeVacio = "";
var MensajeRepetido = "";
var V_ONE = 0;

var Contador = 0; //Usado para saber cuando horarios se van a ingresar
var ContadorDias = 0; //Usado para saber cuantos horarios debe ingresar la primera vez

var estado;
var editNit_ID;
var index_ID;
var editID;
var TipoCalendar;

//Usadas al modificar los horarios
var editHoraIni = "";
var editHoraFin = "";
var editIndex = "";
var editNumDia = "";
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {
    try {
        $("#Marco_trabajo_Form").css("height", "490px");
        $(".container_TGrid").css("height", "380px");

        /*Llamado de metodos para ocultar elementos al inicio de la operación de la pantalla*/
        Ventanas_Emergentes(); //Ventanas_Emergentes Va primero pues es la que llama al load de espera al inicio de los AJAX
        Ocultar_Errores();
        Ocultar_Tablas();
        /*================== FIN LLAMADO INICIAL DE MÉTODOS DE INICIALIZACIÓN ==============*/

        transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
        transacionAjax_EmpresaNit('Cliente');

        IniciarTimeFormat();
        Change_Select_Nit();
        Change_TipoCalendario();

        Change_StateDay("Select_StateLun");
        Change_StateDay("Select_StateMar");
        Change_StateDay("Select_StateMie");
        Change_StateDay("Select_StateJue");
        Change_StateDay("Select_StateVie");
        Change_StateDay("Select_StateSab");
        Change_StateDay("Select_StateDom");
        Change_StateDay("Select_Festivo");
    } catch (e) {
        Mensaje_General("Error - No se logró hacer el cargue", "Lo sentimos, ocurrió un error y no se logró cargar correctamente la página.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario.ready):\n" + e));
    }
});

//Función que inicializa todos los label que contendran horas
function IniciarTimeFormat() {
    Time_Format("TxtIniLun");
    Time_Format("TxtFinLun");
    Time_Format("TxtIniMar");
    Time_Format("TxtFinMar");
    Time_Format("TxtIniMie");
    Time_Format("TxtFinMie");
    Time_Format("TxtIniJue");
    Time_Format("TxtFinJue");
    Time_Format("TxtIniVie");
    Time_Format("TxtFinVie");
    Time_Format("TxtIniSab");
    Time_Format("TxtFinSab");
    Time_Format("TxtIniDom");
    Time_Format("TxtFinDom");
    //Editor de las horas
    Time_Format("TxtEditIni");
    Time_Format("TxtEditFin");
}

//funcion para las ventanas emergentes
function Ventanas_Emergentes() {

    Load_Charge_Sasif(); //Carga de "SasifMaster.js" el Control de Carga

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

    $("#Dialog_Calendar").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 1220,
        height: 760,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
    });

    $("#Dialog_Calendar_View").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 1220,
        height: 760,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
    });

    $("#Dialog_time").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 323,
        height: 300,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
    });
    $("#Dialog_Edit_time").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 323,
        height: 350,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
    });
}

//Función que oculta todas las IMG de los errores en pantalla
function Ocultar_Errores() {
    ResetError();
    $("#ESelect").css("display", "none");
    $("#Img1").css("display", "none");
    $("#Img2").css("display", "none");
    $("#Img3").css("display", "none");
    $("#Img5").css("display", "none");
    $("#Img6").css("display", "none");
    $("#Img7").css("display", "none");
    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WA").css("display", "none");
}

//Función que oculta las tablas
function Ocultar_Tablas() {
    $(".Table_Header_Block").css("display", "none"); //Table que contiene el capturador de horas
    $(".container_TGrid_Create").css("display", "none"); //Tabla que dibuja el grid con las horas ya capturadas
    $("#TablaConsulta").css("display", "none");
    $("#Tabla_10").css("display", "none");
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                 REGION BOTONES                                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//consulta del del crud(READ)
function BtnConsulta() {
    try {
        var filtro;
        var ValidateSelect = ValidarDroplist();
        var opcion;

        if (ValidateSelect == 1) {
            filtro = "N";
            opcion = "ALL";
            $("#TxtRead").val("");
            transacionAjax_ConsultCalendario("consulta", filtro, opcion);
        }
        else {
            filtro = "S";
            opcion = $("#DDLColumns").val();
            transacionAjax_ConsultCalendario("consulta", filtro, opcion);
        }
    } catch (e) {
        Mensaje_General("Error - No se logró consultar", "Lo sentimos, ocurrió un error y no se logró ejecutar correctamente la acción de busqueda.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario.BtnConsulta):\n" + e));
    }
}

//crear link en la BD
function BtnCrear() {
    try {
        if ($("#Select_TipoCalendario").val() == "1") {
            if (validaTipoCalendario == true) {
                var validate;
                validate = validarCamposCrear();

                if (validate == 0) {
                    var LeghtArray = ArrayC_Semana.length;
                    if (LeghtArray > 0) {
                        if ($("#Btnguardar").val() == "Actualizar") {
                            ValidarStatusEditar();
                            CargeJson();
                        }
                        ValidarDatosHorariosDias();
                        if (WorkFestivo == true) { //Dejamos para el final el guardar si los festivos es laboral o no (N para NO festivo S para que SI es festivo)
                            InsertJson_Day("8", "N", "0", "0");
                        } else {
                            InsertJson_Day("8", "S", "0", "0");
                        }

                        if ($("#Btnguardar").val() == "Guardar") {
                            transacionAjax_Calendario_create("crear");
                        }
                        else if ($("#Btnguardar").val() == "Actualizar") {
                            transacionAjax_Calendario_create("modificar");
                        } else {
                            Mensaje_General("¡Acción NO valida!", "La acción «" + $("#Btnguardar").val() + "» no es una acción valida para el sistema, favor recargar la página para solucionar este error.", "E");
                            setTimeout(console.warn.bind(console, "• Log de error generado (Calendario.BtnCrear):\nSe intentó ejecutar una acción no valida, solo se permite creación o modificación en este módulo."));
                        }
                    } else {
                        Mensaje_General("¡Sin Horarios!", "Debes ingresar por lo menos un horario para este calendario, no puedes guardar un calendario vacio.", "W");
                    }

                }
            } else{
                Mensaje_General("Opción no Disponible", "Lo sentimos, la creación de calendarios progresivos desde este módulo aún no se encuentra disponible, por favor usa la opción disponible en el menú principal.", "W");
                setTimeout(console.error.bind(console, "• Log de error generado (Calendario.BtnCrear):\nSe intentó vulnerar el proceso normal de validación del sistema, pero esto fue controlado, favor deja de intentar modificar el correcto funcionamiento del aplicativo, te lo agradecemos.\nAtt: Grupo Desarrolladores SASIF."));
            }
        } else {
            Mensaje_General("Opción no Disponible", "Lo sentimos, la creación de calendarios progresivos desde este módulo aún no se encuentra disponible, por favor usa la opción disponible en el menú principal.", "W");
        }
    } catch (e) {
        Mensaje_General("Error - No se logró ejecutar Acción", "Lo sentimos, ocurrió un error y no se logró ejecutar correctamente la acción de « " + $("#Btnguardar").val() + " ».", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario.BtnCrear):\n" + e));
    }
}

//elimina de la BD
function BtnElimina() {
    try {
        transacionAjax_Calendario_delete("elimina");
    } catch (e) {
        Mensaje_General("Error - No se logró ejecutar la acción", "Lo sentimos, ocurrió un error y no se logró ejecutar correctamente la acción de « Eliminar ».", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario.BtnElimina):\n" + e));
    }
}

//agrega calendario a un array
function BtnAgregaCalendario() {
    try {
        var validate = ValidaHoras();
        switch (validate) {
            case 0:
                var ChangeStatus = false;
                if ($("#Btnguardar").val() == "Actualizar") {
                    ChangeStatus = ValidarStatusEditar();
                }
                if (V_ONE == 0 && ChangeStatus == false) {
                    Mensaje_General("Error - Campos Vacios", "Debe completar mínimo el horario de uno de los días de la semana.", "W");
                } else {
                    validaTipoC();
                    $("#Select_StateLun").prop('disabled', true).trigger("chosen:updated"); //Bloqueamos los chosen de estado del día
                    $("#Select_StateMar").prop('disabled', true).trigger("chosen:updated");
                    $("#Select_StateMie").prop('disabled', true).trigger("chosen:updated");
                    $("#Select_StateJue").prop('disabled', true).trigger("chosen:updated");
                    $("#Select_StateVie").prop('disabled', true).trigger("chosen:updated");
                    $("#Select_StateSab").prop('disabled', true).trigger("chosen:updated");
                    $("#Select_StateDom").prop('disabled', true).trigger("chosen:updated");
                    $("#Select_Festivo").prop('disabled', true).trigger("chosen:updated");
                }
                break;

            case 1:
                Mensaje_General("Error - Hora Inconsistente", "La hora inicial es mayor que la hora final en los días: " + MensajeHora + "", "E");
                break;

            case 2:
                Mensaje_General("Error - Campos Incompletos", "El campo de hora inicial u hora final no se completó en los días: " + MensajeVacio + "", "W");
                break;
        }
    } catch (e) {
        Mensaje_General("Error - No se logró ejecutar la acción", "Lo sentimos, ocurrió un error y no se logró ejecutar correctamente la acción solicitada.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario.BtnAgregaCalendario):\n" + e));
    }
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                           REGION PANEL DE CONTROL                                                                                                 ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//habilita el panel de crear o consulta
function HabilitarPanel(opcion) {
    try {
        switch (opcion) {

            case "crear":
                $(".Dialog_Datos_Calen").css("display", "inline-table");
                $("#TablaConsulta").css("display", "none");
                $("#Select_EmpresaNit").removeAttr("disabled");
                $("#Txt_ID").removeAttr("disabled");
                $("#Btnguardar").attr("value", "Guardar");
                $('.C_Chosen').trigger('chosen:updated');
                ResetError();
                Clear();
                ClearDetalle();
                estado = opcion;
                $("#Dialog_Calendar").dialog("open");
                $("#Dialog_Calendar").dialog("option", "title", "Crear Calendario");
                break;

            case "buscar":
                $(".Dialog_Datos_Calen").css("display", "none");
                $("#TablaConsulta").css("display", "inline-table");
                $(".container_TGrid").html("");
                estado = opcion;
                Clear();
                ClearDetalle();
                break;

            case "modificar":
                $(".Dialog_Datos_Calen").css("display", "none");
                $("#TablaConsulta").css("display", "inline-table");
                $(".container_TGrid").html("");
                estado = opcion;
                ResetError();
                Clear();
                ClearDetalle();
                break;

            case "eliminar":
                $(".Dialog_Datos_Calen").css("display", "none");
                $("#TablaConsulta").css("display", "inline-table");
                $(".container_TGrid").html("");
                estado = opcion;
                Clear();
                ClearDetalle();
                break;

        }
    } catch (e) {
        Mensaje_General("Error - No se logró ejecutar la acción", "Lo sentimos, ocurrió un error y no se logró ejecutar correctamente la acción solicitada.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario.HabilitarPanel):\n" + e));
    }
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                           REGION DE VALIDACIONES                                                                                                   ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//validamos campos para la creacion del calendario
function validarCamposCrear() {
    try {
        var Campo_1 = $("#Select_EmpresaNit").val();
        var Campo_2 = $("#Txt_ID").val();
        var Campo_3 = $("#TxtDescription").val();
        var Campo_4 = $("#Select_TipoCalendario ").val();

        var validar = 0;

        if (Campo_4 == "-1" || Campo_4 == null || Campo_3 == "" || Campo_2 == "" || Campo_1 == "-1" || Campo_1 == null) {
            validar = 1;
            if (Campo_1 == "-1" || Campo_1 == null) { $("#Img1").css("display", "inline-table"); } else { $("#Img1").css("display", "none"); }
            if (Campo_2 == "") { $("#Img2").css("display", "inline-table"); } else { $("#Img2").css("display", "none"); }
            if (Campo_3 == "") { $("#Img3").css("display", "inline-table"); } else { $("#Img3").css("display", "none"); }
            if (Campo_4 == "-1" || Campo_4 == null) { $("#Img5").css("display", "inline-table"); } else { $("#Img5").css("display", "none"); }
        }
        else {
            $("#Img1").css("display", "none");
            $("#Img2").css("display", "none");
            $("#Img3").css("display", "none");
            $("#Img5").css("display", "none");
        }
        return validar;
    } catch (e) {
        Mensaje_General("Error - No se logró ejecutar la acción", "Lo sentimos, ocurrió un error y no se logró ejecutar correctamente la acción solicitada.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario.validarCamposCrear):\n" + e));
        return null;
    }
}

//validamos campos para la creación del calendario
function validarCamposFechas() {
    try {
        var Campo_1 = $("#TxtF_Start").val();
        var Campo_2 = $("#TxtF_End").val();

        var validar = 0;

        if (Campo_2 == "" || Campo_1 == "") {
            validar = 1;
            if (Campo_1 == "") { $("#Img6").css("display", "inline-table"); } else { $("#Img6").css("display", "none"); }
            if (Campo_2 == "") { $("#Img7").css("display", "inline-table"); } else { $("#Img7").css("display", "none"); }
        }
        else {
            $("#Img6").css("display", "none");
            $("#Img7").css("display", "none");
        }
        return validar;
    } catch (e) {
        Mensaje_General("Error - No se logró ejecutar la acción", "Lo sentimos, ocurrió un error y no se logró ejecutar correctamente la acción solicitada.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario.validarCamposFechas):\n" + e));
        return null;
    }
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

//valida horas ingresadas
function ValidaHoras() {
    try {
        var validate = 0;
        var V_H = 0;
        V_ONE = 0;
        MensajeHora = "";
        MensajeVacio = "";
        //Lunes
        if (WorkMonday == true) {
            if ($("#TxtIniLun").val() != "" || $("#TxtFinLun").val() != "") {
                V_ONE = 1;
                V_H = Validahora($("#TxtIniLun").val(), $("#TxtFinLun").val());

                switch (V_H) {
                    case 1:
                        validate = 1;
                        if (MensajeHora == "") {
                            MensajeHora = MensajeHora + " Lunes";
                        } else {
                            MensajeHora = MensajeHora + ", Lunes";
                        }
                        break;

                    case 2:
                        validate = 2;
                        if (MensajeVacio == "") {
                            MensajeVacio = MensajeVacio + " Lunes";
                        } else {
                            MensajeVacio = MensajeVacio + ", Lunes";
                        }
                        break;
                }
            }
        }

        //Martes
        if (WorkTuesday == true) {
            if ($("#TxtIniMar").val() != "" || $("#TxtFinMar").val() != "") {
                V_ONE = 1;
                V_H = Validahora($("#TxtIniMar").val(), $("#TxtFinMar").val());

                switch (V_H) {
                    case 1:
                        validate = 1;
                        if (MensajeHora == "") {
                            MensajeHora = MensajeHora + " Martes";
                        } else {
                            MensajeHora = MensajeHora + ", Martes";
                        }
                        break;

                    case 2: //Hay alguno vacio
                        validate = 2;
                        if (MensajeVacio == "") {
                            MensajeVacio = MensajeVacio + " Martes";
                        } else {
                            MensajeVacio = MensajeVacio + ", Martes";
                        }
                        break;
                }
            }
        }
        //Miércoles
        if (WorkWednesday == true) {
            if ($("#TxtIniMie").val() != "" || $("#TxtFinMie").val() != "") {
                V_ONE = 1;
                V_H = Validahora($("#TxtIniMie").val(), $("#TxtFinMie").val());

                switch (V_H) {
                    case 1:
                        validate = 1;
                        if (MensajeHora == "") {
                            MensajeHora = MensajeHora + " Miércoles";
                        } else {
                            MensajeHora = MensajeHora + ", Miércoles";
                        }
                        break;
                    case 2:
                        validate = 2;
                        if (MensajeVacio == "") {
                            MensajeVacio = MensajeVacio + " Miércoles";
                        } else {
                            MensajeVacio = MensajeVacio + ", Miércoles";
                        }
                        break;
                }
            }
        }
        //Jueves
        if (WorkThursday == true) {
            if ($("#TxtIniJue").val() != "" || $("#TxtFinJue").val() != "") {
                V_ONE = 1;
                V_H = Validahora($("#TxtIniJue").val(), $("#TxtFinJue").val());

                switch (V_H) {
                    case 1:
                        validate = 1;
                        if (MensajeHora == "") {
                            MensajeHora = MensajeHora + " Jueves";
                        } else {
                            MensajeHora = MensajeHora + ", Jueves";
                        }
                        break;
                    case 2:
                        validate = 2;
                        if (MensajeVacio == "") {
                            MensajeVacio = MensajeVacio + " Jueves";
                        } else {
                            MensajeVacio = MensajeVacio + ", Jueves";
                        }
                        break;
                }
            }
        }
        //Viernes
        if (WorkFriday == true) {
            if ($("#TxtIniVie").val() != "" || $("#TxtFinVie").val() != "") {
                V_ONE = 1;
                V_H = Validahora($("#TxtIniVie").val(), $("#TxtFinVie").val());

                switch (V_H) {
                    case 1:
                        validate = 1;
                        if (MensajeHora == "") {
                            MensajeHora = MensajeHora + " Viernes";
                        } else {
                            MensajeHora = MensajeHora + ", Viernes";
                        }
                        break;
                    case 2:
                        validate = 2;
                        if (MensajeVacio == "") {
                            MensajeVacio = MensajeVacio + " Viernes";
                        } else {
                            MensajeVacio = MensajeVacio + ", Viernes";
                        }
                        break;
                }
            }
        }
        //Sábado
        if (WorkSaturday == true) {
            if ($("#TxtIniSab").val() != "" || $("#TxtFinSab").val() != "") {
                V_ONE = 1;
                V_H = Validahora($("#TxtIniSab").val(), $("#TxtFinSab").val());

                switch (V_H) {
                    case 1:
                        validate = 1;
                        if (MensajeHora == "") {
                            MensajeHora = MensajeHora + " Sábado";
                        } else {
                            MensajeHora = MensajeHora + ", Sábado";
                        }
                        break;
                    case 2:
                        validate = 2;
                        if (MensajeVacio == "") {
                            MensajeVacio = MensajeVacio + " Sábado";
                        } else {
                            MensajeVacio = MensajeVacio + ", Sábado";
                        }
                        break;
                }
            }
        }
        //Domingo
        if (WorkSunday == true) {
            if ($("#TxtIniDom").val() != "" || $("#TxtFinDom").val() != "") {
                V_ONE = 1;
                V_H = Validahora($("#TxtIniDom").val(), $("#TxtFinDom").val());

                switch (V_H) {
                    case 1:
                        validate = 1;
                        if (MensajeHora == "") {
                            MensajeHora = MensajeHora + " Domingo";
                        } else {
                            MensajeHora = MensajeHora + ", Domingo";
                        }
                        break;
                    case 2:
                        validate = 2;
                        if (MensajeVacio == "") {
                            MensajeVacio = MensajeVacio + " Domingo";
                        } else {
                            MensajeVacio = MensajeVacio + ", Domingo";
                        }
                        break;
                }
            }
        }

        return validate;
    } catch (e) {
        Mensaje_General("Error - No se logró validar", "Lo sentimos, ocurrió un error y no se logró ejecutar correctamente la acción de validación de horarios.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario.ValidaHoras):\n" + e));
        return null;
    }
}

//valida el tio de clendario para el proceso
function validaTipoC() {
    try {
        var Ingresa;
        validaTipoCalendario = false;
        switch ($("#Select_TipoCalendario").val()) {
            case "1":
                CargeJson();
                break;
            case "2":
                Mensaje_General("Opción no Disponible", "Lo sentimos, la creación de calendarios progresivos desde este módulo aún no se encuentra disponible, por favor usa la opción disponible en el menú principal.");
                break;
            default:
                Mensaje_General("Sin Selección Completa", "No se ha seleccionado ningún tipo de Calendario, no podemos proseguir", "W");
                break;
        }
    } catch (e) {
        Mensaje_General("Error - No se logró ejecutar la acción", "Lo sentimos, ocurrió un error y no se logró ejecutar correctamente la acción solicitada.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario.validaTipoC):\n" + e));
    }
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                              REGION DE VALIDACIONES PARA CARGUE CALENDARIOS                                                                                      ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//Función que valida que los nuevos datos de cualquiera de los días no estén repetidos en la matriz
function ValidaDatosMatriz() {
    try {
        var repetido = false;
        MensajeRepetido = "";
        Inicio: do {
            if (WorkMonday == true) {
                if ($("#TxtIniLun").val() != "" && $("#TxtFinLun").val() != "") {
                    repetido = ValidarHoras("1", $("#TxtIniLun").val(), $("#TxtFinLun").val());
                    if (repetido == true) {
                        MensajeRepetido = MensajeRepetido + ", Lunes";
                        break Inicio;
                    }
                }
            }
            if (WorkTuesday == true) {
                if ($("#TxtIniMar").val() != "" && $("#TxtFinMar").val() != "") {
                    repetido = ValidarHoras("2", $("#TxtIniMar").val(), $("#TxtFinMar").val());
                    if (repetido == true) {
                        MensajeRepetido = MensajeRepetido + ", Martes";
                        break Inicio;
                    }
                }
            }
            if (WorkWednesday == true) {
                if ($("#TxtIniMie").val() != "" && $("#TxtFinMie").val() != "") {
                    repetido = ValidarHoras("3", $("#TxtIniMie").val(), $("#TxtFinMie").val());
                    if (repetido == true) {
                        MensajeRepetido = MensajeRepetido + ", Miércoles";
                        break Inicio;
                    }
                }
            }
            if (WorkThursday == true) {
                if ($("#TxtIniJue").val() != "" && $("#TxtFinJue").val() != "") {
                    repetido = ValidarHoras("4", $("#TxtIniJue").val(), $("#TxtFinJue").val());
                    if (repetido == true) {
                        MensajeRepetido = MensajeRepetido + ", Jueves";
                        break Inicio;
                    }
                }
            }
            if (WorkFriday == true) {
                if ($("#TxtIniVie").val() != "" && $("#TxtFinVie").val() != "") {
                    repetido = ValidarHoras("5", $("#TxtIniVie").val(), $("#TxtFinVie").val());
                    if (repetido == true) {
                        MensajeRepetido = MensajeRepetido + ", Viernes";
                        break Inicio;
                    }
                }
            }
            if (WorkSaturday == true) {
                if ($("#TxtIniSab").val() != "" && $("#TxtFinSab").val() != "") {
                    repetido = ValidarHoras("6", $("#TxtIniSab").val(), $("#TxtFinSab").val());
                    if (repetido == true) {
                        MensajeRepetido = MensajeRepetido + ", Sábado";
                        break Inicio;
                    }
                }
            }
            if (WorkSaturday == true) {
                if ($("#TxtIniDom").val() != "" && $("#TxtFinDom").val() != "") {
                    repetido = ValidarHoras("7", $("#TxtIniDom").val(), $("#TxtFinDom").val());
                    if (repetido == true) {
                        MensajeRepetido = MensajeRepetido + ", Domingo";
                        break Inicio;
                    }
                }
            }
        } while (0);
        if (MensajeRepetido != "") {
            MensajeRepetido = MensajeRepetido.substr(1);
        }
        return repetido;
    } catch (e) {
        Mensaje_General("Error - No se logró validar el horario", "Lo sentimos, ocurrió un error y no se logró validar si el horario ya habia sido ingresado, favor verifique los datos.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario.ValidaDatosMatriz):\n" + e));
        return null;
    }
}

//Función que valida si la combinación de horas ya existe en el array armado
function ValidarHoras(numDia, horaIni, horaFini) {
    try {
        var Encontrado = false;
        for (i in ArrayC_Semana) {//Recorremos el array que contiene los datos de los horarios día
            if (ArrayC_Semana[i].Dia == numDia) { //Entramos a revisar solo los datos que contienen el día que se quiere verificar
                if (ArrayC_Semana[i].HoraInicial == horaIni && ArrayC_Semana[i].HoraFinal == horaFini) { //Verificamos si la combinación de horas ya existe
                    Encontrado = true;
                    break;
                }
            }
        }
        return Encontrado;
    } catch (e) {
        Mensaje_General("Error - No se logró ejecutar la acción", "Lo sentimos, ocurrió un error y no se logró validar correctamente los horarios, favor verificar los datos.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario.ValidarHoras):\n" + e));
    }
}

//Función que valida si han cambiado el estado del día en caso de que sea actualizar las matrices
function ValidarStatusEditar() {
    try {
        var anyChange = false;
        //Lunes
        if (WorkMonday == false) {
            for (i in ArrayC_Semana) {
                if (ArrayC_Semana[i].Dia == "1") {//Validamos si antes era laboral
                    if (ArrayC_Semana[i].IndicativoFestivo == "N") {
                        DeleteInArrayC_Semana("1", "A"); //Borramos todos los datos que contengan este día
                        MatrizMonday = [];
                        RellenarMatrices(Lineas); //Borramos la matriz y la rellenamos con ceros para dibujarla
                        anyChange = true;
                        //Hay que borrar primero en el ArrayC_Semana y luego modificar la matriz
                    }
                    break;
                }
            }
        } else if (WorkMonday == true) {
            for (i in ArrayC_Semana) {
                if (ArrayC_Semana[i].Dia == "1") {//Validamos si antes era no laboral
                    if (ArrayC_Semana[i].IndicativoFestivo == "S") {
                        DeleteInArrayC_Semana("1", "B"); //Borramos todos los datos que contengan este día
                        RellenarMatrices(Lineas); //Reiniciamos la Matriz nuevamente con ceros
                        anyChange = true;
                        //Hay que borrar primero en el ArrayC_Semana y luego modificar la matriz
                    }
                    break;
                }
            }
        }
        //Martes
        if (WorkTuesday == false) {
            for (i in ArrayC_Semana) {
                if (ArrayC_Semana[i].Dia == "2") {//Validamos si antes era laboral
                    if (ArrayC_Semana[i].IndicativoFestivo == "N") {
                        DeleteInArrayC_Semana("2", "A"); //Borramos todos los datos que contengan este día
                        MatrizTuesday = [];
                        RellenarMatrices(Lineas); //Borramos la matriz y la rellenamos con ceros para dibujarla
                        anyChange = true;
                        //Hay que borrar primero en el ArrayC_Semana y luego modificar la matriz
                    }
                    break;
                }
            }
        } else if (WorkTuesday == true) {
            for (i in ArrayC_Semana) {
                if (ArrayC_Semana[i].Dia == "2") {//Validamos si antes era no laboral
                    if (ArrayC_Semana[i].IndicativoFestivo == "S") {
                        DeleteInArrayC_Semana("2", "B"); //Borramos todos los datos que contengan este día
                        RellenarMatrices(Lineas); //Reiniciamos la Matriz nuevamente con ceros
                        anyChange = true;
                        //Hay que borrar primero en el ArrayC_Semana y luego modificar la matriz
                    }
                    break;
                }
            }
        }
        //Miércoles
        if (WorkWednesday == false) {
            for (i in ArrayC_Semana) {
                if (ArrayC_Semana[i].Dia == "3") {//Validamos si antes era laboral
                    if (ArrayC_Semana[i].IndicativoFestivo == "N") {
                        DeleteInArrayC_Semana("3", "A"); //Borramos todos los datos que contengan este día
                        MatrizWednesday = [];
                        RellenarMatrices(Lineas); //Borramos la matriz y la rellenamos con ceros para dibujarla
                        anyChange = true;
                        //Hay que borrar primero en el ArrayC_Semana y luego modificar la matriz
                    }
                    break;
                }
            }
        } else if (WorkWednesday == true) {
            for (i in ArrayC_Semana) {
                if (ArrayC_Semana[i].Dia == "3") {//Validamos si antes era no laboral
                    if (ArrayC_Semana[i].IndicativoFestivo == "S") {
                        DeleteInArrayC_Semana("3", "B"); //Borramos todos los datos que contengan este día
                        RellenarMatrices(Lineas); //Reiniciamos la Matriz nuevamente con ceros
                        anyChange = true;
                        //Hay que borrar primero en el ArrayC_Semana y luego modificar la matriz
                    }
                    break;
                }
            }
        }
        //Jueves
        if (WorkThursday == false) {
            for (i in ArrayC_Semana) {
                if (ArrayC_Semana[i].Dia == "4") {//Validamos si antes era laboral
                    if (ArrayC_Semana[i].IndicativoFestivo == "N") {
                        DeleteInArrayC_Semana("4", "A"); //Borramos todos los datos que contengan este día
                        MatrizThursday = [];
                        RellenarMatrices(Lineas); //Borramos la matriz y la rellenamos con ceros para dibujarla
                        anyChange = true;
                        //Hay que borrar primero en el ArrayC_Semana y luego modificar la matriz
                    }
                    break;
                }
            }
        } else if (WorkThursday == true) {
            for (i in ArrayC_Semana) {
                if (ArrayC_Semana[i].Dia == "4") {//Validamos si antes era no laboral
                    if (ArrayC_Semana[i].IndicativoFestivo == "S") {
                        DeleteInArrayC_Semana("4", "B"); //Borramos todos los datos que contengan este día
                        RellenarMatrices(Lineas); //Reiniciamos la Matriz nuevamente con ceros
                        anyChange = true;
                        //Hay que borrar primero en el ArrayC_Semana y luego modificar la matriz
                    }
                    break;
                }
            }
        }
        //Viernes
        if (WorkFriday == false) {
            for (i in ArrayC_Semana) {
                if (ArrayC_Semana[i].Dia == "5") {//Validamos si antes era laboral
                    if (ArrayC_Semana[i].IndicativoFestivo == "N") {
                        DeleteInArrayC_Semana("5", "A"); //Borramos todos los datos que contengan este día
                        MatrizFriday = [];
                        RellenarMatrices(Lineas); //Borramos la matriz y la rellenamos con ceros para dibujarla
                        anyChange = true;
                        //Hay que borrar primero en el ArrayC_Semana y luego modificar la matriz
                    }
                    break;
                }
            }
        } else if (WorkFriday == true) {
            for (i in ArrayC_Semana) {
                if (ArrayC_Semana[i].Dia == "5") {//Validamos si antes era no laboral
                    if (ArrayC_Semana[i].IndicativoFestivo == "S") {
                        DeleteInArrayC_Semana("5", "B"); //Borramos todos los datos que contengan este día
                        RellenarMatrices(Lineas); //Reiniciamos la Matriz nuevamente con ceros
                        anyChange = true;
                        //Hay que borrar primero en el ArrayC_Semana y luego modificar la matriz
                    }
                    break;
                }
            }
        }
        //Sábado
        if (WorkSaturday == false) {
            for (i in ArrayC_Semana) {
                if (ArrayC_Semana[i].Dia == "6") {//Validamos si antes era laboral
                    if (ArrayC_Semana[i].IndicativoFestivo == "N") {
                        DeleteInArrayC_Semana("6", "A"); //Borramos todos los datos que contengan este día
                        MatrizSaturday = [];
                        RellenarMatrices(Lineas); //Borramos la matriz y la rellenamos con ceros para dibujarla
                        anyChange = true;
                        //Hay que borrar primero en el ArrayC_Semana y luego modificar la matriz
                    }
                    break;
                }
            }
        } else if (WorkSaturday == true) {
            for (i in ArrayC_Semana) {
                if (ArrayC_Semana[i].Dia == "6") {//Validamos si antes era no laboral
                    if (ArrayC_Semana[i].IndicativoFestivo == "S") {
                        DeleteInArrayC_Semana("6", "B"); //Borramos todos los datos que contengan este día
                        RellenarMatrices(Lineas); //Reiniciamos la Matriz nuevamente con ceros
                        anyChange = true;
                        //Hay que borrar primero en el ArrayC_Semana y luego modificar la matriz
                    }
                    break;
                }
            }
        }
        //Domingo
        if (WorkSunday == false) {
            for (i in ArrayC_Semana) {
                if (ArrayC_Semana[i].Dia == "7") {//Validamos si antes era laboral
                    if (ArrayC_Semana[i].IndicativoFestivo == "N") {
                        DeleteInArrayC_Semana("7", "A"); //Borramos todos los datos que contengan este día
                        MatrizSunday = [];
                        RellenarMatrices(Lineas); //Borramos la matriz y la rellenamos con ceros para dibujarla
                        anyChange = true;
                        //Hay que borrar primero en el ArrayC_Semana y luego modificar la matriz
                    }
                    break;
                }
            }
        } else if (WorkSunday == true) {
            for (i in ArrayC_Semana) {
                if (ArrayC_Semana[i].Dia == "7") {//Validamos si antes era no laboral
                    if (ArrayC_Semana[i].IndicativoFestivo == "S") {
                        DeleteInArrayC_Semana("7", "B"); //Borramos todos los datos que contengan este día
                        RellenarMatrices(Lineas); //Reiniciamos la Matriz nuevamente con ceros
                        anyChange = true;
                        //Hay que borrar primero en el ArrayC_Semana y luego modificar la matriz
                    }
                    break;
                }
            }
        }
        return anyChange;
    } catch (e) {
        Mensaje_General("Error - No se logró validar Status", "Lo sentimos, ocurrió un error y no se logró validar correctamente el estado de los días de la semana, favor verificar los datos.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario.ValidarStatusEditar):\n" + e));
        return null;
    }
}

//Función que valida que en ArrayC_Semana haya por lo menos un dato para cada día
//Si se ingresó horarios para ese día se borra el dato que se adiciona automáticamente cuando no se agregan horarios
function ValidarDatosHorariosDias() {
    try {
        var Encuentra = false;
        var datoIni = false;
        //Lunes
        if (WorkMonday == true) {
            for (var i in ArrayC_Semana) {
                //Buscamos si ya habiamos agregado el dato inicial del día
                if (ArrayC_Semana[i].Dia == "1" && ArrayC_Semana[i].IndicativoFestivo == "N" && ArrayC_Semana[i].HoraInicial == "0" && ArrayC_Semana[i].HoraFinal == "0") { //Verificamos si hay algún horario agregado a este día
                    datoIni = true;
                }
                //Buscamos si se agregó un horario diferente al horario inicial que pudimos o no haber agregado
                if (ArrayC_Semana[i].Dia == "1" && ArrayC_Semana[i].IndicativoFestivo == "N" && ArrayC_Semana[i].HoraInicial != "0" && ArrayC_Semana[i].HoraFinal != "0") { //Verificamos si hay algún horario agregado a este día
                    Encuentra = true;
                    break;
                }
            }
            if (Encuentra == false && datoIni == false) { //Si no hay registros y no se ha agregado el dato único agregamos solo uno que indicará que ese día será laboral
                InsertJson_Day("1", "N", "0", "0");
            } else if (Encuentra == true && datoIni == true) { //Si han agregado horarios, borramos el registro extra agregado con el horario 0:0
                for (var i in ArrayC_Semana) {
                    if (ArrayC_Semana[i].Dia == "1" && ArrayC_Semana[i].IndicativoFestivo == "N" && ArrayC_Semana[i].HoraInicial == "0" && ArrayC_Semana[i].HoraFinal == "0") { //Verificamos si hay algún horario agregado a este día
                        ArrayC_Semana.splice(i, 1);
                        break;
                    }
                }
            }
            Encuentra = false;
            datoIni = false;
        }
        //Martes
        if (WorkTuesday == true) {
            for (var i in ArrayC_Semana) {
                //Buscamos si ya habiamos agregado el dato inicial del día
                if (ArrayC_Semana[i].Dia == "2" && ArrayC_Semana[i].IndicativoFestivo == "N" && ArrayC_Semana[i].HoraInicial == "0" && ArrayC_Semana[i].HoraFinal == "0") { //Verificamos si hay algún horario agregado a este día
                    datoIni = true;
                }
                //Buscamos si se agregó un horario diferente al horario inicial que pudimos o no haber agregado
                if (ArrayC_Semana[i].Dia == "2" && ArrayC_Semana[i].IndicativoFestivo == "N" && ArrayC_Semana[i].HoraInicial != "0" && ArrayC_Semana[i].HoraFinal != "0") { //Verificamos si hay algún horario agregado a este día
                    Encuentra = true;
                    break;
                }
            }
            if (Encuentra == false && datoIni == false) { //Si no hay registros y no se ha agregado el dato único agregamos solo uno que indicará que ese día será laboral
                InsertJson_Day("2", "N", "0", "0");
            } else if (Encuentra == true && datoIni == true) { //Si han agregado horarios, borramos el registro extra agregado con el horario 0:0
                for (var i in ArrayC_Semana) {
                    if (ArrayC_Semana[i].Dia == "2" && ArrayC_Semana[i].IndicativoFestivo == "N" && ArrayC_Semana[i].HoraInicial == "0" && ArrayC_Semana[i].HoraFinal == "0") { //Verificamos si hay algún horario agregado a este día
                        ArrayC_Semana.splice(i, 1);
                        break;
                    }
                }
            }
            Encuentra = false;
            datoIni = false;
        }
        //Miércoles
        if (WorkWednesday == true) {
            for (var i in ArrayC_Semana) {
                //Buscamos si ya habiamos agregado el dato inicial del día
                if (ArrayC_Semana[i].Dia == "3" && ArrayC_Semana[i].IndicativoFestivo == "N" && ArrayC_Semana[i].HoraInicial == "0" && ArrayC_Semana[i].HoraFinal == "0") { //Verificamos si hay algún horario agregado a este día
                    datoIni = true;
                }
                //Buscamos si se agregó un horario diferente al horario inicial que pudimos o no haber agregado
                if (ArrayC_Semana[i].Dia == "3" && ArrayC_Semana[i].IndicativoFestivo == "N" && ArrayC_Semana[i].HoraInicial != "0" && ArrayC_Semana[i].HoraFinal != "0") { //Verificamos si hay algún horario agregado a este día
                    Encuentra = true;
                    break;
                }
            }
            if (Encuentra == false && datoIni == false) { //Si no hay registros y no se ha agregado el dato único agregamos solo uno que indicará que ese día será laboral
                InsertJson_Day("3", "N", "0", "0");
            } else if (Encuentra == true && datoIni == true) { //Si han agregado horarios, borramos el registro extra agregado con el horario 0:0
                for (var i in ArrayC_Semana) {
                    if (ArrayC_Semana[i].Dia == "3" && ArrayC_Semana[i].IndicativoFestivo == "N" && ArrayC_Semana[i].HoraInicial == "0" && ArrayC_Semana[i].HoraFinal == "0") { //Verificamos si hay algún horario agregado a este día
                        ArrayC_Semana.splice(i, 1);
                        break;
                    }
                }
            }
            Encuentra = false;
            datoIni = false;
        }
        //Jueves
        if (WorkThursday == true) {
            for (var i in ArrayC_Semana) {
                //Buscamos si ya habiamos agregado el dato inicial del día
                if (ArrayC_Semana[i].Dia == "4" && ArrayC_Semana[i].IndicativoFestivo == "N" && ArrayC_Semana[i].HoraInicial == "0" && ArrayC_Semana[i].HoraFinal == "0") { //Verificamos si hay algún horario agregado a este día
                    datoIni = true;
                }
                //Buscamos si se agregó un horario diferente al horario inicial que pudimos o no haber agregado
                if (ArrayC_Semana[i].Dia == "4" && ArrayC_Semana[i].IndicativoFestivo == "N" && ArrayC_Semana[i].HoraInicial != "0" && ArrayC_Semana[i].HoraFinal != "0") { //Verificamos si hay algún horario agregado a este día
                    Encuentra = true;
                    break;
                }
            }
            if (Encuentra == false && datoIni == false) { //Si no hay registros y no se ha agregado el dato único agregamos solo uno que indicará que ese día será laboral
                InsertJson_Day("4", "N", "0", "0");
            } else if (Encuentra == true && datoIni == true) { //Si han agregado horarios, borramos el registro extra agregado con el horario 0:0
                for (var i in ArrayC_Semana) {
                    if (ArrayC_Semana[i].Dia == "4" && ArrayC_Semana[i].IndicativoFestivo == "N" && ArrayC_Semana[i].HoraInicial == "0" && ArrayC_Semana[i].HoraFinal == "0") { //Verificamos si hay algún horario agregado a este día
                        ArrayC_Semana.splice(i, 1);
                        break;
                    }
                }
            }
            Encuentra = false;
            datoIni = false;
        }
        //Viernes
        if (WorkFriday == true) {
            for (var i in ArrayC_Semana) {
                //Buscamos si ya habiamos agregado el dato inicial del día
                if (ArrayC_Semana[i].Dia == "5" && ArrayC_Semana[i].IndicativoFestivo == "N" && ArrayC_Semana[i].HoraInicial == "0" && ArrayC_Semana[i].HoraFinal == "0") { //Verificamos si hay algún horario agregado a este día
                    datoIni = true;
                }
                //Buscamos si se agregó un horario diferente al horario inicial que pudimos o no haber agregado
                if (ArrayC_Semana[i].Dia == "5" && ArrayC_Semana[i].IndicativoFestivo == "N" && ArrayC_Semana[i].HoraInicial != "0" && ArrayC_Semana[i].HoraFinal != "0") { //Verificamos si hay algún horario agregado a este día
                    Encuentra = true;
                    break;
                }
            }
            if (Encuentra == false && datoIni == false) { //Si no hay registros y no se ha agregado el dato único agregamos solo uno que indicará que ese día será laboral
                InsertJson_Day("5", "N", "0", "0");
            } else if (Encuentra == true && datoIni == true) { //Si han agregado horarios, borramos el registro extra agregado con el horario 0:0
                for (var i in ArrayC_Semana) {
                    if (ArrayC_Semana[i].Dia == "5" && ArrayC_Semana[i].IndicativoFestivo == "N" && ArrayC_Semana[i].HoraInicial == "0" && ArrayC_Semana[i].HoraFinal == "0") { //Verificamos si hay algún horario agregado a este día
                        ArrayC_Semana.splice(i, 1);
                        break;
                    }
                }
            }
            Encuentra = false;
            datoIni = false;
        }
        //Sábado
        if (WorkSaturday == true) {
            for (var i in ArrayC_Semana) {
                //Buscamos si ya habiamos agregado el dato inicial del día
                if (ArrayC_Semana[i].Dia == "6" && ArrayC_Semana[i].IndicativoFestivo == "N" && ArrayC_Semana[i].HoraInicial == "0" && ArrayC_Semana[i].HoraFinal == "0") { //Verificamos si hay algún horario agregado a este día
                    datoIni = true;
                }
                //Buscamos si se agregó un horario diferente al horario inicial que pudimos o no haber agregado
                if (ArrayC_Semana[i].Dia == "6" && ArrayC_Semana[i].IndicativoFestivo == "N" && ArrayC_Semana[i].HoraInicial != "0" && ArrayC_Semana[i].HoraFinal != "0") { //Verificamos si hay algún horario agregado a este día
                    Encuentra = true;
                    break;
                }
            }
            if (Encuentra == false && datoIni == false) { //Si no hay registros y no se ha agregado el dato único agregamos solo uno que indicará que ese día será laboral
                InsertJson_Day("6", "N", "0", "0");
            } else if (Encuentra == true && datoIni == true) { //Si han agregado horarios, borramos el registro extra agregado con el horario 0:0
                for (var i in ArrayC_Semana) {
                    if (ArrayC_Semana[i].Dia == "6" && ArrayC_Semana[i].IndicativoFestivo == "N" && ArrayC_Semana[i].HoraInicial == "0" && ArrayC_Semana[i].HoraFinal == "0") { //Verificamos si hay algún horario agregado a este día
                        ArrayC_Semana.splice(i, 1);
                        break;
                    }
                }
            }
            Encuentra = false;
            datoIni = false;
        }
        //Domingo
        if (WorkSunday == true) {
            for (var i in ArrayC_Semana) {
                //Buscamos si ya habiamos agregado el dato inicial del día
                if (ArrayC_Semana[i].Dia == "7" && ArrayC_Semana[i].IndicativoFestivo == "N" && ArrayC_Semana[i].HoraInicial == "0" && ArrayC_Semana[i].HoraFinal == "0") { //Verificamos si hay algún horario agregado a este día
                    datoIni = true;
                }
                //Buscamos si se agregó un horario diferente al horario inicial que pudimos o no haber agregado
                if (ArrayC_Semana[i].Dia == "7" && ArrayC_Semana[i].IndicativoFestivo == "N" && ArrayC_Semana[i].HoraInicial != "0" && ArrayC_Semana[i].HoraFinal != "0") { //Verificamos si hay algún horario agregado a este día
                    Encuentra = true;
                    break;
                }
            }
            if (Encuentra == false && datoIni == false) { //Si no hay registros y no se ha agregado el dato único agregamos solo uno que indicará que ese día será laboral
                InsertJson_Day("7", "N", "0", "0");
            } else if (Encuentra == true && datoIni == true) { //Si han agregado horarios, borramos el registro extra agregado con el horario 0:0
                for (var i in ArrayC_Semana) {
                    if (ArrayC_Semana[i].Dia == "7" && ArrayC_Semana[i].IndicativoFestivo == "N" && ArrayC_Semana[i].HoraInicial == "0" && ArrayC_Semana[i].HoraFinal == "0") { //Verificamos si hay algún horario agregado a este día
                        ArrayC_Semana.splice(i, 1);
                        break;
                    }
                }
            }
            Encuentra = false;
            datoIni = false;
        }


    } catch (e) {
        Mensaje_General("Error - No se logró validar horas", "Lo sentimos, ocurrió un error y no se logró validar correctamente los datos que se ingresarán en la base de datos, favor verificar los datos.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario.ValidarDatosHorariosDias):\n" + e));
        return null;
    }
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                              PROCESO DE CARGUE GRID CALENDARIO                                                                                   ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//construye el Json con los datos proporcionados para la vista
function CargeJson() {
    try {
        var Repetido = ValidaDatosMatriz();
        if (Repetido == false) {
            Lineas = Lineas + 1;
            //Lunes (1)
            if (WorkMonday == true) { //Si es laboral validamos normal           
                var JSONDay = {
                    "Index": Lineas,
                    "IniLun": ValidaCamposJson($("#TxtIniLun").val()),
                    "FinLun": ValidaCamposJson($("#TxtFinLun").val())
                };
                MatrizMonday.push(JSONDay);
                if ($("#TxtIniLun").val() != "" && $("#TxtFinLun").val() != "") {
                    InsertJson_Day("1", "N", $("#TxtIniLun").val(), $("#TxtFinLun").val());
                }
            } else if (WorkMonday == false && FirstMonday == false) { //Si no laboral y es la primera vez
                var JSONDay = {
                    "Index": Lineas,
                    "IniLun": "0",
                    "FinLun": "0"
                };
                MatrizMonday.push(JSONDay);
                InsertJson_Day("1", "S", "0", "0");
                FirstMonday = true;
            } else { //Si no laboral y no es la primera vez
                var JSONDay = {
                    "Index": Lineas,
                    "IniLun": "0",
                    "FinLun": "0"
                };
                MatrizMonday.push(JSONDay);
            }
            //--------
            //Martes (2)
            if (WorkTuesday == true) { //Si es laboral validamos normal           
                var JSONDay = {
                    "Index": Lineas,
                    "IniMar": ValidaCamposJson($("#TxtIniMar").val()),
                    "FinMar": ValidaCamposJson($("#TxtFinMar").val())
                };
                MatrizTuesday.push(JSONDay);
                if ($("#TxtIniMar").val() != "" && $("#TxtFinMar").val() != "") {
                    InsertJson_Day("2", "N", $("#TxtIniMar").val(), $("#TxtFinMar").val());
                }

            } else if (WorkTuesday == false && FirstTuesday == false) { //Si no laboral y es la primera vez
                var JSONDay = {
                    "Index": Lineas,
                    "IniMar": "0",
                    "FinMar": "0"
                };
                MatrizTuesday.push(JSONDay);
                InsertJson_Day("2", "S", "0", "0");
                FirstTuesday = true;
            } else { //Si no laboral y no es la primera vez
                var JSONDay = {
                    "Index": Lineas,
                    "IniMar": "0",
                    "FinMar": "0"
                };
                MatrizTuesday.push(JSONDay);
            }
            //--------
            //Miércoles (3)
            if (WorkWednesday == true) { //Si es laboral validamos normal           
                var JSONDay = {
                    "Index": Lineas,
                    "IniMie": ValidaCamposJson($("#TxtIniMie").val()),
                    "FinMie": ValidaCamposJson($("#TxtFinMie").val())
                };
                MatrizWednesday.push(JSONDay);
                if ($("#TxtIniMie").val() != "" && $("#TxtFinMie").val() != "") {
                    InsertJson_Day("3", "N", $("#TxtIniMie").val(), $("#TxtFinMie").val());
                }

            } else if (WorkWednesday == false && FirstWednesday == false) { //Si no laboral y es la primera vez
                var JSONDay = {
                    "Index": Lineas,
                    "IniMie": "0",
                    "FinMie": "0"
                };
                MatrizWednesday.push(JSONDay);
                InsertJson_Day("3", "S", "0", "0");
                FirstWednesday = true;
            } else { //Si no laboral y no es la primera vez
                var JSONDay = {
                    "Index": Lineas,
                    "IniMie": "0",
                    "FinMie": "0"
                };
                MatrizWednesday.push(JSONDay);
            }
            //--------
            //Jueves (4)
            if (WorkThursday == true) { //Si es laboral validamos normal           
                var JSONDay = {
                    "Index": Lineas,
                    "IniJue": ValidaCamposJson($("#TxtIniJue").val()),
                    "FinJue": ValidaCamposJson($("#TxtFinJue").val())
                };
                MatrizThursday.push(JSONDay);
                if ($("#TxtIniJue").val() != "" && $("#TxtFinJue").val() != "") {
                    InsertJson_Day("4", "N", $("#TxtIniJue").val(), $("#TxtFinJue").val());
                }
            } else if (WorkThursday == false && FirstThursday == false) { //Si no laboral y es la primera vez
                var JSONDay = {
                    "Index": Lineas,
                    "IniJue": "0",
                    "FinJue": "0"
                };
                MatrizThursday.push(JSONDay);
                InsertJson_Day("4", "S", "0", "0");
                FirstThursday = true;
            } else { //Si no laboral y no es la primera vez
                var JSONDay = {
                    "Index": Lineas,
                    "IniJue": "0",
                    "FinJue": "0"
                };
                MatrizThursday.push(JSONDay);
            }
            //--------
            //Viernes (5)
            if (WorkFriday == true) { //Si es laboral validamos normal           
                var JSONDay = {
                    "Index": Lineas,
                    "IniVie": ValidaCamposJson($("#TxtIniVie").val()),
                    "FinVie": ValidaCamposJson($("#TxtFinVie").val())
                };
                MatrizFriday.push(JSONDay);
                if ($("#TxtIniVie").val() != "" && $("#TxtFinVie").val() != "") {
                    InsertJson_Day("5", "N", $("#TxtIniVie").val(), $("#TxtFinVie").val());
                }
            } else if (WorkFriday == false && FirstFriday == false) { //Si no laboral y es la primera vez
                var JSONDay = {
                    "Index": Lineas,
                    "IniVie": "0",
                    "FinVie": "0"
                };
                MatrizFriday.push(JSONDay);
                InsertJson_Day("5", "S", "0", "0");
                FirstFriday = true;
            } else { //Si no laboral y no es la primera vez
                var JSONDay = {
                    "Index": Lineas,
                    "IniVie": "0",
                    "FinVie": "0"
                };
                MatrizFriday.push(JSONDay);
            }
            //--------
            //Sábado (6)
            if (WorkSaturday == true) { //Si es laboral validamos normal           
                var JSONDay = {
                    "Index": Lineas,
                    "IniSab": ValidaCamposJson($("#TxtIniSab").val()),
                    "FinSab": ValidaCamposJson($("#TxtFinSab").val())
                };
                MatrizSaturday.push(JSONDay);
                if ($("#TxtIniSab").val() != "" && $("#TxtFinSab").val() != "") {
                    InsertJson_Day("6", "N", $("#TxtIniSab").val(), $("#TxtFinSab").val());
                }
            } else if (WorkSaturday == false && FirstSaturday == false) { //Si no laboral y es la primera vez
                var JSONDay = {
                    "Index": Lineas,
                    "IniSab": "0",
                    "FinSab": "0"
                };
                MatrizSaturday.push(JSONDay);
                InsertJson_Day("6", "S", "0", "0");
                FirstSaturday = true;
            } else { //Si no laboral y no es la primera vez
                var JSONDay = {
                    "Index": Lineas,
                    "IniSab": "0",
                    "FinSab": "0"
                };
                MatrizSaturday.push(JSONDay);
            }
            //--------
            //Domingo (7)
            if (WorkSunday == true) { //Si es laboral validamos normal           
                var JSONDay = {
                    "Index": Lineas,
                    "IniDom": ValidaCamposJson($("#TxtIniDom").val()),
                    "FinDom": ValidaCamposJson($("#TxtFinDom").val())
                };
                MatrizSunday.push(JSONDay);
                if ($("#TxtIniDom").val() != "" && $("#TxtFinDom").val() != "") {
                    InsertJson_Day("7", "N", $("#TxtIniDom").val(), $("#TxtFinDom").val());
                }

            } else if (WorkSunday == false && FirstSunday == false) { //Si no laboral y es la primera vez
                var JSONDay = {
                    "Index": Lineas,
                    "IniDom": "0",
                    "FinDom": "0"
                };
                MatrizSunday.push(JSONDay);
                InsertJson_Day("7", "S", "0", "0");
                FirstSunday = true;
            } else { //Si no laboral y no es la primera vez
                var JSONDay = {
                    "Index": Lineas,
                    "IniDom": "0",
                    "FinDom": "0"
                };
                MatrizSunday.push(JSONDay);
            }
            CargarMatricesHorarios();
            Clear_Agregar();
            validaTipoCalendario = true;
        } else {
            Mensaje_General("Error - Horario Existe", "No puedes ingresar dos veces una misma combinación de horarios, esto sucedio en los siguientes días: " + MensajeRepetido + "", "W");
        }
    } catch (e) {
        Mensaje_General("Error - No se logró hacer el cargue", "Lo sentimos, ocurrió un error y no se logró hacer el cargue de los horarios que desea ingresar, favor verifique los datos.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario.CargeJson):\n" + e));
    }
}

//Función que crea el array que contendrá los datos para dibujar en la tabla de horarios
function CargarMatricesHorarios() {
    try {
        ArrayCalendario_Grid = [];
        ArrayCalendario_Grid.push(MatrizMonday);
        ArrayCalendario_Grid.push(MatrizTuesday);
        ArrayCalendario_Grid.push(MatrizWednesday);
        ArrayCalendario_Grid.push(MatrizThursday);
        ArrayCalendario_Grid.push(MatrizFriday);
        ArrayCalendario_Grid.push(MatrizSaturday);
        ArrayCalendario_Grid.push(MatrizSunday);
        $(".container_TGrid_Create").offsetHeight;
        $(".container_TGrid_Create").html("");
        TGridCalendar();
    } catch (e) {
        Mensaje_General("Error - No se logró ejecutar la acción", "Lo sentimos, ocurrió un error y no se logró cargar correctamente la matriz principal, favor verifique los datos.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario.CargarMatricesHorarios):\n" + e));
    }
}

//Carga JSON para Tabla de Semanas
function InsertJson_Day(vp_NumberDay, vp_Estado_Day, vp_H_In, vp_H_Fi) {
    var JsonDayCalendar = {
        "Dia": vp_NumberDay,
        "IndicativoFestivo": vp_Estado_Day,
        "HoraInicial": vp_H_In,
        "HoraFinal": vp_H_Fi
    };
    ArrayC_Semana.push(JsonDayCalendar);
}

//valida campos vacios por cero
function ValidaCamposJson(vp_Campo) {
    var vl_CampoValue = 0;

    if (vp_Campo != "") {
        vl_CampoValue = vp_Campo;
    }
    return vl_CampoValue;
}

//Función que crea la tabla donde se mostrarán los horarios ingresados
function TGridCalendar() {
    try {
        $(".container_TGrid_Create").css("display", "none"); //Tabla que dibuja el grid con las horas ya capturadas
        var html_Calendario = "";

        html_Calendario = "<table id='TCalendarios' style='width: 100%'><tbody>";
        //Comenzamos a anidar tablas
        //Tabla Lunes
        html_Calendario += "<tr><td id='ID_Lunes' align='left' > <table id='TLunes' border='1' cellpadding='1' cellspacing='1' style='width: 100%'><thead><tr><th colspan='2' class='Grid_Head' >Lunes</th></tr><tr><th colspan='2' class='Grid_Head' >Hora</th></tr><tr><th>Inicial</th><th>Final</th></tr></thead><tbody>";
        //-----------
        //Lunes [0]
        for (i in ArrayCalendario_Grid[0]) {
            html_Calendario += "<tr id= 'TLunes_" + ArrayCalendario_Grid[0][i].Index + "'><td><span class='cssToolTip_Boton'>" + ArrayCalendario_Grid[0][i].IniLun + "<span><input type='radio' class='Ver' name='option' onclick=\"EditHoraDia('" + ArrayCalendario_Grid[0][i].Index + "','1');\" >Editar<br><input type='radio' class='Ver' name='option' onclick=\"DeleteHoraDia('" + ArrayCalendario_Grid[0][i].Index + "','1');\">Eliminar</span></span></td><td>" + ArrayCalendario_Grid[0][i].FinLun + "</td></tr>";
        }
        html_Calendario += "</tbody></table></td>"; //Cerramos tabla Lunes
        //------------
        //Tabla Martes
        html_Calendario += "<td id='ID_Martes' align='left' > <table id='TMartes' border='1' cellpadding='1' cellspacing='1' style='width: 100%'   ><thead><tr><th colspan='2' class='Grid_Head' >Martes</th></tr><tr><th colspan='2' class='Grid_Head' >Hora</th></tr><tr><th>Inicial</th><th>Final</th></tr></thead><tbody>";
        //Martes [1]
        for (i in ArrayCalendario_Grid[1]) {
            html_Calendario += "<tr id= 'TMartes_" + ArrayCalendario_Grid[1][i].Index + "'><td><span class='cssToolTip_Boton'>" + ArrayCalendario_Grid[1][i].IniMar + "<span><input type='radio' class='Ver' name='option' onclick=\"EditHoraDia('" + ArrayCalendario_Grid[1][i].Index + "','2');\">Editar<br><input type='radio' class='Ver' name='option' onclick=\"DeleteHoraDia('" + ArrayCalendario_Grid[1][i].Index + "','2');\">Eliminar</span></span></td><td>" + ArrayCalendario_Grid[1][i].FinMar + "</td></tr>";
        }
        html_Calendario += "</tbody></table></td>"; //Cerramos tabla Martes
        //------------
        //Tabla Miércoles
        html_Calendario += "<td id='ID_Miercoles' align='left' > <table id='TMiercoles' border='1' cellpadding='1' cellspacing='1' style='width: 100%'   ><thead><tr><th colspan='2' class='Grid_Head' >Miércoles</th></tr><tr><th colspan='2' class='Grid_Head' >Hora</th></tr><tr><th>Inicial</th><th>Final</th></tr></thead><tbody>";
        //Miércoles [2]
        for (i in ArrayCalendario_Grid[2]) {
            html_Calendario += "<tr id= 'TMiercoles_" + ArrayCalendario_Grid[2][i].Index + "'><td><span class='cssToolTip_Boton'>" + ArrayCalendario_Grid[2][i].IniMie + "<span><input type='radio' class='Ver' name='option' onclick=\"EditHoraDia('" + ArrayCalendario_Grid[2][i].Index + "','3');\">Editar<br><input type='radio' class='Ver' name='option' onclick=\"DeleteHoraDia('" + ArrayCalendario_Grid[2][i].Index + "','3');\">Eliminar</span></span></td><td>" + ArrayCalendario_Grid[2][i].FinMie + "</td></tr>";
        }
        html_Calendario += "</tbody></table></td>"; //Cerramos tabla Miércoles
        //------------
        //Tabla Jueves
        html_Calendario += "<td id='ID_Jueves' align='left' > <table id='TJueves' border='1' cellpadding='1' cellspacing='1' style='width: 100%'   ><thead><tr><th colspan='2' class='Grid_Head' >Jueves</th></tr><tr><th colspan='2' class='Grid_Head' >Hora</th></tr><tr><th>Inicial</th><th>Final</th></tr></thead><tbody>";
        //Jueves [3]
        for (i in ArrayCalendario_Grid[3]) {
            html_Calendario += "<tr id= 'TJueves_" + ArrayCalendario_Grid[3][i].Index + "'><td><span class='cssToolTip_Boton'>" + ArrayCalendario_Grid[3][i].IniJue + "<span><input type='radio' class='Ver' name='option' onclick=\"EditHoraDia('" + ArrayCalendario_Grid[3][i].Index + "','4');\">Editar<br><input type='radio' class='Ver' name='option' onclick=\"DeleteHoraDia('" + ArrayCalendario_Grid[3][i].Index + "','4');\">Eliminar</span></span></td><td>" + ArrayCalendario_Grid[3][i].FinJue + "</td></tr>";
        }
        html_Calendario += "</tbody></table></td>"; //Cerramos tabla Jueves
        //------------
        //Tabla Viernes
        html_Calendario += "<td id='ID_Viernes' align='left' > <table id='TViernes' border='1' cellpadding='1' cellspacing='1' style='width: 100%'   ><thead><tr><th colspan='2' class='Grid_Head' >Viernes</th></tr><tr><th colspan='2' class='Grid_Head' >Hora</th></tr><tr><th>Inicial</th><th>Final</th></tr></thead><tbody>";
        //Viernes [4]
        for (i in ArrayCalendario_Grid[4]) {
            html_Calendario += "<tr id= 'TViernes_" + ArrayCalendario_Grid[4][i].Index + "'><td><span class='cssToolTip_Boton'>" + ArrayCalendario_Grid[4][i].IniVie + "<span><input type='radio' class='Ver' name='option' onclick=\"EditHoraDia('" + ArrayCalendario_Grid[4][i].Index + "','5');\">Editar<br><input type='radio' class='Ver' name='option' onclick=\"DeleteHoraDia('" + ArrayCalendario_Grid[4][i].Index + "','5');\">Eliminar</span></span></td><td>" + ArrayCalendario_Grid[4][i].FinVie + "</td></tr>";
        }
        html_Calendario += "</tbody></table></td>"; //Cerramos tabla Viernes
        //------------
        //Tabla Sábado
        html_Calendario += "<td id='ID_Sabado' align='left' > <table id='TSabado' border='1' cellpadding='1' cellspacing='1' style='width: 100%'   ><thead><tr><th colspan='2' class='Grid_Head' >Sábado</th></tr><tr><th colspan='2' class='Grid_Head' >Hora</th></tr><tr><th>Inicial</th><th>Final</th></tr></thead><tbody>";
        //Sábado [5]
        for (i in ArrayCalendario_Grid[5]) {
            html_Calendario += "<tr id= 'TSabado_" + ArrayCalendario_Grid[5][i].Index + "'><td><span class='cssToolTip_Boton'>" + ArrayCalendario_Grid[5][i].IniSab + "<span><input type='radio' class='Ver' name='option' onclick=\"EditHoraDia('" + ArrayCalendario_Grid[5][i].Index + "','6');\">Editar<br><input type='radio' class='Ver' name='option' onclick=\"DeleteHoraDia('" + ArrayCalendario_Grid[5][i].Index + "','6');\">Eliminar</span></span></td><td>" + ArrayCalendario_Grid[5][i].FinSab + "</td></tr>";
        }
        html_Calendario += "</tbody></table></td>"; //Cerramos tabla Sábado
        //------------
        //Tabla Domingo
        html_Calendario += "<td id='ID_Domingo' align='left' > <table id='TDomingo' border='1' cellpadding='1' cellspacing='1' style='width: 100%'   ><thead><tr><th colspan='2' class='Grid_Head' >Domingo</th></tr><tr><th colspan='2' class='Grid_Head' >Hora</th></tr><tr><th class='Grid_Head'>Inicial</th><th class='Grid_Head'>Final</th></tr></thead><tbody>";
        //Domingo [6]
        for (i in ArrayCalendario_Grid[6]) {
            html_Calendario += "<tr id= 'TDomingo_" + ArrayCalendario_Grid[6][i].Index + "'><td><span class='cssToolTip_Boton'>" + ArrayCalendario_Grid[6][i].IniDom + "<span><input type='radio' class='Ver' name='option' onclick=\"EditHoraDia('" + ArrayCalendario_Grid[6][i].Index + "','7');\">Editar<br><input type='radio' class='Ver' name='option' onclick=\"DeleteHoraDia('" + ArrayCalendario_Grid[6][i].Index + "','7');\">Eliminar</span></span></td><td>" + ArrayCalendario_Grid[6][i].FinDom + "</td></tr>";
        }
        html_Calendario += "</tbody></table></td>"; //Cerramos tabla Domingo


        html_Calendario += "</tr></tbody></table>";//Cerramos tabla principal

        //$(".container_TGrid_Create").html("");
        $(".container_TGrid_Create").html(html_Calendario);

        //
        $("#TLunes").dataTable({
            "bPaginate": false,
            "bFilter": false,
            "bInfo": false,
            "paging": false,
            "ordering": false,
            "info": false,
            "bJQueryUI": true,
            "iDisplayLength": 1000,
            "bDestroy": true
        });
        //
        $("#TMartes").dataTable({
            "bPaginate": false,
            "bFilter": false,
            "bInfo": false,
            "paging": false,
            "ordering": false,
            "info": false,
            "bJQueryUI": true,
            "iDisplayLength": 1000,
            "bDestroy": true
        });
        //
        $("#TMiercoles").dataTable({
            "bPaginate": false,
            "bFilter": false,
            "bInfo": false,
            "paging": false,
            "ordering": false,
            "info": false,
            "bJQueryUI": true,
            "iDisplayLength": 1000,
            "bDestroy": true
        });
        //
        $("#TJueves").dataTable({
            "bPaginate": false,
            "bFilter": false,
            "bInfo": false,
            "paging": false,
            "ordering": false,
            "info": false,
            "bJQueryUI": true,
            "iDisplayLength": 1000,
            "bDestroy": true
        });
        //
        $("#TViernes").dataTable({
            "bPaginate": false,
            "bFilter": false,
            "bInfo": false,
            "paging": false,
            "ordering": false,
            "info": false,
            "bJQueryUI": true,
            "iDisplayLength": 1000,
            "bDestroy": true
        });
        //
        $("#TSabado").dataTable({
            "bPaginate": false,
            "bFilter": false,
            "bInfo": false,
            "paging": false,
            "ordering": false,
            "info": false,
            "bJQueryUI": true,
            "iDisplayLength": 1000,
            "bDestroy": true
        });
        //
        $("#TDomingo").dataTable({
            "bPaginate": false,
            "bFilter": false,
            "bInfo": false,
            "paging": false,
            "ordering": false,
            "info": false,
            "bJQueryUI": true,
            "iDisplayLength": 1000,
            "bDestroy": true
        });

        $(".container_TGrid_Create").css("display", "inline-table"); //Tabla que dibuja el grid con las horas ya capturadas
    } catch (e) {
        Mensaje_General("Error - No se logró dibujar tabla", "Lo sentimos, ocurrió un error y no se logró dibujar la tabla con los horarios ingresados, favor verifique los datos.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario.TGridCalendar):\n" + e));
    }
}

//Función usada para borrar todos los datos que se tengan sobre un día especifico en ArrayC_Semana
function DeleteInArrayC_Semana(diaDelete, tipo) {
    var rango = ArrayC_Semana.length;
    var x = 0;
    switch (tipo) {
        case "A": //Cuando va de Laboral a No laboral
            do { //Forzamos a recorrer el array con cuantas veces ingresó la primera vez para que busque correctamente
                for (var j in ArrayC_Semana) { //Borramos todos los datos que contengan este día
                    if (ArrayC_Semana[j].Dia == diaDelete && ArrayC_Semana[j].IndicativoFestivo == "N") {
                        ArrayC_Semana.splice(j, 1);
                    }
                }
                x = x + 1;
            } while (x <= rango);
            break;
        case "B": //Cuando va de No laboral a Laboral
            do { //Forzamos a recorrer el array con cuantas veces ingresó la primera vez para que busque correctamente
                for (var j in ArrayC_Semana) { //Borramos todos los datos que contengan este día
                    if (ArrayC_Semana[j].Dia == diaDelete && ArrayC_Semana[j].IndicativoFestivo == "S") {
                        ArrayC_Semana.splice(j, 1);
                    }
                }
                x = x + 1;
            } while (x <= rango);
            break;
    }

}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                              MODIFICAR HORARIOS DEL CALENDARIO                                                                                  ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//Función que permite editar una hora que ya ha sido ingresada en el array
function EditHoraDia(IndexDia, numDia) {
    //IndexDia se usa para hacer la referencia a la Matriz del día, por ejemplo MatrizMonday y en la matriz que dibuja la grilla, para saber el primer indice de esta matriz
    //Se toma de la Matriz ArrayCalendario_Grid[NumDía][i].index
    //numDia se usa para buscar la referencia a el día en el que se va abuscar ese indice y tambien como uno de los parametros para buscar en el arrayC_Semana
    try {
        editHoraIni = "";
        editHoraFin = "";
        editIndex = "";
        editNumDia = "";

        editIndex = IndexDia;
        editNumDia = numDia;
        EDIT: do {
            if (editNumDia == "1") { //Lunes
                if (WorkMonday == true) {
                    for (i in MatrizMonday) {
                        if (MatrizMonday[i].Index == editIndex) {
                            editHoraIni = MatrizMonday[i].IniLun;
                            editHoraFin = MatrizMonday[i].FinLun;
                            break;
                        }
                    }
                } else {
                    Mensaje_General("Día NO Laboral", "No puedes modificar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                    break EDIT;
                }
            } else if (editNumDia == "2") { //Martes
                if (WorkTuesday == true) {
                    for (i in MatrizTuesday) {
                        if (MatrizTuesday[i].Index == editIndex) {
                            editHoraIni = MatrizTuesday[i].IniMar;
                            editHoraFin = MatrizTuesday[i].FinMar;
                            break;
                        }
                    }
                } else {
                    Mensaje_General("Día NO Laboral", "No puedes modificar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                    break EDIT;
                }
            } else if (editNumDia == "3") { //Miércoles
                if (WorkWednesday == true) {
                    for (i in MatrizWednesday) {
                        if (MatrizWednesday[i].Index == editIndex) {
                            editHoraIni = MatrizWednesday[i].IniMie;
                            editHoraFin = MatrizWednesday[i].FinMie;
                            break;
                        }
                    }
                } else {
                    Mensaje_General("Día NO Laboral", "No puedes modificar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                    break EDIT;
                }
            } else if (editNumDia == "4") { //Jueves
                if (WorkThursday == true) {
                    for (i in MatrizThursday) {
                        if (MatrizThursday[i].Index == editIndex) {
                            editHoraIni = MatrizThursday[i].IniJue;
                            editHoraFin = MatrizThursday[i].FinJue;
                            break;
                        }
                    }
                } else {
                    Mensaje_General("Día NO Laboral", "No puedes modificar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                    break EDIT;
                }
            } else if (editNumDia == "5") { //Viernes
                if (WorkFriday == true) {
                    for (i in MatrizFriday) {
                        if (MatrizFriday[i].Index == editIndex) {
                            editHoraIni = MatrizFriday[i].IniVie;
                            editHoraFin = MatrizFriday[i].FinVie;
                            break;
                        }
                    }
                } else {
                    Mensaje_General("Día NO Laboral", "No puedes modificar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                    break EDIT;
                }
            } else if (editNumDia == "6") { //Sábado
                if (WorkSaturday == true) {
                    for (i in MatrizSaturday) {
                        if (MatrizSaturday[i].Index == editIndex) {
                            editHoraIni = MatrizSaturday[i].IniSab;
                            editHoraFin = MatrizSaturday[i].FinSab;
                            break;
                        }
                    }
                } else {
                    Mensaje_General("Día NO Laboral", "No puedes modificar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                    break EDIT;
                }
            } else if (editNumDia == "7") { //Domingo
                if (WorkSunday == true) {
                    for (i in MatrizSunday) {
                        if (MatrizSunday[i].Index == editIndex) {
                            editHoraIni = MatrizSunday[i].IniDom;
                            editHoraFin = MatrizSunday[i].FinDom;
                            break;
                        }
                    }
                } else {
                    Mensaje_General("Día NO Laboral", "No puedes modificar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                    break EDIT;
                }
            }
            //Abrimos el Dialogo y colocamos las horas
            $("#TxtEditIni").val("");
            $("#TxtEditFin").val("");
            if (editHoraIni != "0" || editHoraFin != "0") {
                $("#TxtEditIni").val(editHoraIni);
                $("#TxtEditFin").val(editHoraFin);
            }

            $("#TxtEditIni").focus();

            $("#Dialog_Edit_time").dialog("open");
            $("#Dialog_Edit_time").dialog("option", "title", "Modificar Horario");
            break EDIT;
        } while (0);
    } catch (e) {
        Mensaje_General("Error - No se logró desplegar editar", "Lo sentimos, ocurrió un error y no se logró ejecutar la acción de Editar el horario, favor verifique los datos.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario.EditHoraDia):\n" + e));
    }
}

//Función que valida que los horarios sean correctos en la edición de horarios
function ValidarHorasEdit() {
    var validoEdit = 0;

    if ($("#TxtEditIni").val() != "" || $("#TxtEditFin").val() != "") {
        V_H = Validahora($("#TxtEditIni").val(), $("#TxtEditFin").val());

        switch (V_H) {
            case 1:
                validoEdit = 1;
                break;

            case 2:
                validoEdit = 2;
                break;
        }
    } else {
        Mensaje_General("ERROR - Campos Vacios", "No puedes dejar los campos vacios, debe ingresar un horario valido.", "E");
        validoEdit = 3;
    }

    return validoEdit;
}

//Función que valida que el horario a modificar no exista dentro del array ya creado
function ValidarMatrizEditHorario() {
    try {
        var repetido = false;
        EDIT: do {
            if (editNumDia == "1") { //Lunes
                if (WorkMonday == true) {
                    repetido = ValidarHoras(editNumDia, $("#TxtEditIni").val(), $("#TxtEditFin").val());
                    if (repetido == true) {
                        break EDIT;
                    }
                } else {
                    Mensaje_General("Día NO Laboral", "No puedes modificar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                    break EDIT;
                }
            } else if (editNumDia == "2") { //Martes
                if (WorkTuesday == true) {
                    repetido = ValidarHoras(editNumDia, $("#TxtEditIni").val(), $("#TxtEditFin").val());
                    if (repetido == true) {
                        break EDIT;
                    }
                } else {
                    Mensaje_General("Día NO Laboral", "No puedes modificar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                    break EDIT;
                }
            } else if (editNumDia == "3") { //Miércoles
                if (WorkWednesday == true) {
                    repetido = ValidarHoras(editNumDia, $("#TxtEditIni").val(), $("#TxtEditFin").val());
                    if (repetido == true) {
                        break EDIT;
                    }
                } else {
                    Mensaje_General("Día NO Laboral", "No puedes modificar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                    break EDIT;
                }
            } else if (editNumDia == "4") { //Jueves
                if (WorkThursday == true) {
                    repetido = ValidarHoras(editNumDia, $("#TxtEditIni").val(), $("#TxtEditFin").val());
                    if (repetido == true) {
                        break EDIT;
                    }
                } else {
                    Mensaje_General("Día NO Laboral", "No puedes modificar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                    break EDIT;
                }
            } else if (editNumDia == "5") { //Viernes
                if (WorkFriday == true) {
                    repetido = ValidarHoras(editNumDia, $("#TxtEditIni").val(), $("#TxtEditFin").val());
                    if (repetido == true) {
                        break EDIT;
                    }
                } else {
                    Mensaje_General("Día NO Laboral", "No puedes modificar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                    break EDIT;
                }
            } else if (editNumDia == "6") { //Sábado
                if (WorkSaturday == true) {
                    repetido = ValidarHoras(editNumDia, $("#TxtEditIni").val(), $("#TxtEditFin").val());
                    if (repetido == true) {
                        break EDIT;
                    }
                } else {
                    Mensaje_General("Día NO Laboral", "No puedes modificar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                    break EDIT;
                }
            } else if (editNumDia == "7") { //Domingo
                if (WorkSunday == true) {
                    frepetido = ValidarHoras(editNumDia, $("#TxtEditIni").val(), $("#TxtEditFin").val());
                    if (repetido == true) {
                        break EDIT;
                    }
                } else {
                    Mensaje_General("Día NO Laboral", "No puedes modificar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                    break EDIT;
                }
            }
            break EDIT;
        } while (0);
        return repetido;
    } catch (e) {
        Mensaje_General("Error - No se logró validar", "Lo sentimos, ocurrió un error y no se logró validar correctamente el horario de este día, favor verificar la información.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario.ValidarMatrizEditHorario):\n" + e));
    }
}

//Función que valida el nuevo horario al editarlo antes de mandar a modificar los arrays
function EditArraysTime() {
    try {
        var validate = ValidarHorasEdit();
        switch (validate) {
            case 0:
                var Repetido = ValidarMatrizEditHorario();
                if (Repetido == false) {

                    ModifyArrays();
                    CargarMatricesHorarios(); //Dibujamos nuevamente la tabla

                } else {
                    Mensaje_General("Error - Horario Existe", "No puedes ingresar dos veces una misma combinación de horarios para el este día.", "W");
                }
                break;

            case 1:
                Mensaje_General("Error - Hora Inconsistente", "La hora inicial es mayor que la hora final.", "E");
                break;

            case 2:
                Mensaje_General("Error - Campos Incompletos", "El campo de hora inicial u hora final no se completó.", "W");
                break;
        }
    } catch (e) {
        Mensaje_General("Error - No se logró editar horario", "Lo sentimos, ocurrió un error y no se logró Editar correctamente el horario, favor verifique los datos.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario.EditArraysTime):\n" + e));
    }
}

//Función que modifca los arrays con los nuevos datos
function ModifyArrays() {
    try {
        var NewIni = $("#TxtEditIni").val();
        var NewFin = $("#TxtEditFin").val();

        MODIFY: do {
            if (editNumDia == "1") { //Lunes
                if (WorkMonday == true) {
                    for (i in MatrizMonday) {
                        if (MatrizMonday[i].Index == editIndex) { //Cambiamos Matriz del Día
                            MatrizMonday[i].IniLun = NewIni;
                            MatrizMonday[i].FinLun = NewFin;
                            if (editHoraIni != "0" || editHoraFin != "0") {//Validamos si habia sido guardado en el array de semana
                                for (x in ArrayC_Semana) { //Cambiamos el Dato en la Matriz que guardará en la BD
                                    if (ArrayC_Semana[x].Dia == editNumDia && ArrayC_Semana[x].HoraInicial == editHoraIni && ArrayC_Semana[x].HoraFinal == editHoraFin) {
                                        ArrayC_Semana[x].HoraInicial = NewIni;
                                        ArrayC_Semana[x].HoraFinal = NewFin;
                                        break;
                                    }
                                }
                            } else { //Sino, lo agregamos, dado que se cambia el horario
                                InsertJson_Day(editNumDia, "N", NewIni, NewFin);
                            }
                            break;
                        }
                    }
                } else {
                    Mensaje_General("Día NO Laboral", "No puedes modificar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                    break MODIFY;
                }
            } else if (editNumDia == "2") { //Martes
                if (WorkTuesday == true) {
                    for (i in MatrizTuesday) {
                        if (MatrizTuesday[i].Index == editIndex) {
                            MatrizTuesday[i].IniMar = NewIni;
                            MatrizTuesday[i].FinMar = NewFin;
                            if (editHoraIni != "0" || editHoraFin != "0") {//Validamos si habia sido guardado en el array de semana
                                for (x in ArrayC_Semana) { //Cambiamos el Dato en la Matriz que guardará en la BD
                                    if (ArrayC_Semana[x].Dia == editNumDia && ArrayC_Semana[x].HoraInicial == editHoraIni && ArrayC_Semana[x].HoraFinal == editHoraFin) {
                                        ArrayC_Semana[x].HoraInicial = NewIni;
                                        ArrayC_Semana[x].HoraFinal = NewFin;
                                        break;
                                    }
                                }
                            } else { //Sino, lo agregamos, dado que se cambia el horario
                                InsertJson_Day(editNumDia, "N", NewIni, NewFin);
                            }
                            break;
                        }
                    }
                } else {
                    Mensaje_General("Día NO Laboral", "No puedes modificar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                    break MODIFY;
                }
            } else if (editNumDia == "3") { //Miércoles
                if (WorkWednesday == true) {
                    for (i in MatrizWednesday) {
                        if (MatrizWednesday[i].Index == editIndex) {
                            MatrizWednesday[i].IniMie = NewIni;
                            MatrizWednesday[i].FinMie = NewFin;
                            if (editHoraIni != "0" || editHoraFin != "0") {//Validamos si habia sido guardado en el array de semana
                                for (x in ArrayC_Semana) { //Cambiamos el Dato en la Matriz que guardará en la BD
                                    if (ArrayC_Semana[x].Dia == editNumDia && ArrayC_Semana[x].HoraInicial == editHoraIni && ArrayC_Semana[x].HoraFinal == editHoraFin) {
                                        ArrayC_Semana[x].HoraInicial = NewIni;
                                        ArrayC_Semana[x].HoraFinal = NewFin;
                                        break;
                                    }
                                }
                            } else { //Sino, lo agregamos, dado que se cambia el horario
                                InsertJson_Day(editNumDia, "N", NewIni, NewFin);
                            }
                            break;
                        }
                    }
                } else {
                    Mensaje_General("Día NO Laboral", "No puedes modificar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                    break MODIFY;
                }
            } else if (editNumDia == "4") { //Jueves
                if (WorkThursday == true) {
                    for (i in MatrizThursday) {
                        if (MatrizThursday[i].Index == editIndex) {
                            MatrizThursday[i].IniJue = NewIni;
                            MatrizThursday[i].FinJue = NewFin;
                            if (editHoraIni != "0" || editHoraFin != "0") {//Validamos si habia sido guardado en el array de semana
                                for (x in ArrayC_Semana) { //Cambiamos el Dato en la Matriz que guardará en la BD
                                    if (ArrayC_Semana[x].Dia == editNumDia && ArrayC_Semana[x].HoraInicial == editHoraIni && ArrayC_Semana[x].HoraFinal == editHoraFin) {
                                        ArrayC_Semana[x].HoraInicial = NewIni;
                                        ArrayC_Semana[x].HoraFinal = NewFin;
                                        break;
                                    }
                                }
                            } else { //Sino, lo agregamos, dado que se cambia el horario
                                InsertJson_Day(editNumDia, "N", NewIni, NewFin);
                            }
                            break;
                        }
                    }
                } else {
                    Mensaje_General("Día NO Laboral", "No puedes modificar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                    break MODIFY;
                }
            } else if (editNumDia == "5") { //Viernes
                if (WorkFriday == true) {
                    for (i in MatrizFriday) {
                        if (MatrizFriday[i].Index == editIndex) {
                            MatrizFriday[i].IniVie = NewIni;
                            MatrizFriday[i].FinVie = NewFin;
                            if (editHoraIni != "0" || editHoraFin != "0") {//Validamos si habia sido guardado en el array de semana
                                for (x in ArrayC_Semana) { //Cambiamos el Dato en la Matriz que guardará en la BD
                                    if (ArrayC_Semana[x].Dia == editNumDia && ArrayC_Semana[x].HoraInicial == editHoraIni && ArrayC_Semana[x].HoraFinal == editHoraFin) {
                                        ArrayC_Semana[x].HoraInicial = NewIni;
                                        ArrayC_Semana[x].HoraFinal = NewFin;
                                        break;
                                    }
                                }
                            } else { //Sino, lo agregamos, dado que se cambia el horario
                                InsertJson_Day(editNumDia, "N", NewIni, NewFin);
                            }
                            break;
                        }
                    }
                } else {
                    Mensaje_General("Día NO Laboral", "No puedes modificar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                    break MODIFY;
                }
            } else if (editNumDia == "6") { //Sábado
                if (WorkSaturday == true) {
                    for (i in MatrizSaturday) {
                        if (MatrizSaturday[i].Index == editIndex) {
                            MatrizSaturday[i].IniSab = NewIni;
                            MatrizSaturday[i].FinSab = NewFin;
                            if (editHoraIni != "0" || editHoraFin != "0") {//Validamos si habia sido guardado en el array de semana
                                for (x in ArrayC_Semana) { //Cambiamos el Dato en la Matriz que guardará en la BD
                                    if (ArrayC_Semana[x].Dia == editNumDia && ArrayC_Semana[x].HoraInicial == editHoraIni && ArrayC_Semana[x].HoraFinal == editHoraFin) {
                                        ArrayC_Semana[x].HoraInicial = NewIni;
                                        ArrayC_Semana[x].HoraFinal = NewFin;
                                        break;
                                    }
                                }
                            } else { //Sino, lo agregamos, dado que se cambia el horario
                                InsertJson_Day(editNumDia, "N", NewIni, NewFin);
                            }
                            break;
                        }
                    }
                } else {
                    Mensaje_General("Día NO Laboral", "No puedes modificar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                    break MODIFY;
                }
            } else if (editNumDia == "7") { //Domingo
                if (WorkSunday == true) {
                    for (i in MatrizSunday) {
                        if (MatrizSunday[i].Index == editIndex) {
                            MatrizSunday[i].IniDom = NewIni;
                            MatrizSunday[i].FinDom = NewFin;
                            if (editHoraIni != "0" || editHoraFin != "0") {//Validamos si habia sido guardado en el array de semana
                                for (x in ArrayC_Semana) { //Cambiamos el Dato en la Matriz que guardará en la BD
                                    if (ArrayC_Semana[x].Dia == editNumDia && ArrayC_Semana[x].HoraInicial == editHoraIni && ArrayC_Semana[x].HoraFinal == editHoraFin) {
                                        ArrayC_Semana[x].HoraInicial = NewIni;
                                        ArrayC_Semana[x].HoraFinal = NewFin;
                                        break;
                                    }
                                }
                            } else { //Sino, lo agregamos, dado que se cambia el horario
                                InsertJson_Day(editNumDia, "N", NewIni, NewFin);
                            }
                            break;
                        }
                    }
                } else {
                    Mensaje_General("Día NO Laboral", "No puedes modificar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                    break MODIFY;
                }
            }
            $("#Dialog_Edit_time").dialog("close");
            break MODIFY;
        } while (0);
    } catch (e) {
        Mensaje_General("Error - No se logró Modificar", "Lo sentimos, ocurrió un error y no se logró Modificar correctamente el horarios, favor verifique los datos.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario.ModifyArrays):\n" + e));
    }
}
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                              ELIMINAR HORARIOS DEL CALENDARIO                                                                                  ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//Función que permite eliminar una hora que ya ha sido ingresada en el array
function DeleteHoraDia(IndexDia, numDia) {
    //IndexDia se usa para hacer la referencia a la Matriz del día, por ejemplo MatrizMonday y en la matriz que dibuja la grilla, para saber el primer indice de esta matriz
    //Se toma de la Matriz ArrayCalendario_Grid[NumDía][i].index
    //numDia se usa para buscar la referencia a el día en el que se va abuscar ese indice
    try {
        editHoraIni = "";
        editHoraFin = "";
        editIndex = "";
        editNumDia = "";

        editIndex = IndexDia;
        editNumDia = numDia;
        EDIT: do {
            if (editNumDia == "1") { //Lunes
                if (WorkMonday == true) {
                    for (i in MatrizMonday) {
                        if (MatrizMonday[i].Index == editIndex) {
                            editHoraIni = MatrizMonday[i].IniLun;
                            editHoraFin = MatrizMonday[i].FinLun;
                            break;
                        }
                    }
                } else {
                    Mensaje_General("Día NO Laboral", "No puedes eliminar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                    break EDIT;
                }
            } else if (editNumDia == "2") { //Martes
                if (WorkTuesday == true) {
                    for (i in MatrizTuesday) {
                        if (MatrizTuesday[i].Index == editIndex) {
                            editHoraIni = MatrizTuesday[i].IniMar;
                            editHoraFin = MatrizTuesday[i].FinMar;
                            break;
                        }
                    }
                } else {
                    Mensaje_General("Día NO Laboral", "No puedes eliminar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                    break EDIT;
                }
            } else if (editNumDia == "3") { //Miércoles
                if (WorkWednesday == true) {
                    for (i in MatrizWednesday) {
                        if (MatrizWednesday[i].Index == editIndex) {
                            editHoraIni = MatrizWednesday[i].IniMie;
                            editHoraFin = MatrizWednesday[i].FinMie;
                            break;
                        }
                    }
                } else {
                    Mensaje_General("Día NO Laboral", "No puedes eliminar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                    break EDIT;
                }
            } else if (editNumDia == "4") { //Jueves
                if (WorkThursday == true) {
                    for (i in MatrizThursday) {
                        if (MatrizThursday[i].Index == editIndex) {
                            editHoraIni = MatrizThursday[i].IniJue;
                            editHoraFin = MatrizThursday[i].FinJue;
                            break;
                        }
                    }
                } else {
                    Mensaje_General("Día NO Laboral", "No puedes eliminar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                    break EDIT;
                }
            } else if (editNumDia == "5") { //Viernes
                if (WorkFriday == true) {
                    for (i in MatrizFriday) {
                        if (MatrizFriday[i].Index == editIndex) {
                            editHoraIni = MatrizFriday[i].IniVie;
                            editHoraFin = MatrizFriday[i].FinVie;
                            break;
                        }
                    }
                } else {
                    Mensaje_General("Día NO Laboral", "No puedes eliminar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                    break EDIT;
                }
            } else if (editNumDia == "6") { //Sábado
                if (WorkSaturday == true) {
                    for (i in MatrizSaturday) {
                        if (MatrizSaturday[i].Index == editIndex) {
                            editHoraIni = MatrizSaturday[i].IniSab;
                            editHoraFin = MatrizSaturday[i].FinSab;
                            break;
                        }
                    }
                } else {
                    Mensaje_General("Día NO Laboral", "No puedes eliminar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                    break EDIT;
                }
            } else if (editNumDia == "7") { //Domingo
                if (WorkSunday == true) {
                    for (i in MatrizSunday) {
                        if (MatrizSunday[i].Index == editIndex) {
                            editHoraIni = MatrizSunday[i].IniDom;
                            editHoraFin = MatrizSunday[i].FinDom;
                            break;
                        }
                    }
                } else {
                    Mensaje_General("Día NO Laboral", "No puedes eliminar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                    break EDIT;
                }
            }
            if (editHoraIni != "0" || editHoraFin != "0") {
                DeleteArraysTime();
                CargarMatricesHorarios(); //Dibujamos nuevamente la tabla
            }

            break EDIT;
        } while (0);
    } catch (e) {
        Mensaje_General("Error - No se eliminó el horario", "Lo sentimos, ocurrió un error y no se logró ejecutar correctamente la acción de eliminar el horario, favor verifique los datos.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario.DeleteHoraDia):\n" + e));
    }
}

//función que modifica y elimina los datos de los arrays
function DeleteArraysTime() {
    var NewIni = "0";
    var NewFin = "0";
    try {
        MODIFY: do {
            if (editNumDia == "1") { //Lunes
                if (WorkMonday == true) {
                    for (i in MatrizMonday) {
                        if (MatrizMonday[i].Index == editIndex) { //Cambiamos Matriz del Día
                            MatrizMonday[i].IniLun = NewIni;
                            MatrizMonday[i].FinLun = NewFin;
                            if (editHoraIni != "0" || editHoraFin != "0") {//Validamos si habia sido guardado en el array de semana
                                for (x in ArrayC_Semana) { //Cambiamos el Dato en la Matriz que guardará en la BD
                                    if (ArrayC_Semana[x].Dia == editNumDia && ArrayC_Semana[x].HoraInicial == editHoraIni && ArrayC_Semana[x].HoraFinal == editHoraFin) {
                                        ArrayC_Semana.splice(x, 1);
                                        break;
                                    }
                                }
                            } else { //Sino, lo dejamos igual
                                //No se hace nada, pues el dato no existe
                            }
                            break;
                        }
                    }
                } else {
                    Mensaje_General("Día NO Laboral", "No puedes eliminar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                    break MODIFY;
                }
            } else if (editNumDia == "2") { //Martes
                if (WorkTuesday == true) {
                    for (i in MatrizTuesday) {
                        if (MatrizTuesday[i].Index == editIndex) {
                            MatrizTuesday[i].IniMar = NewIni;
                            MatrizTuesday[i].FinMar = NewFin;
                            if (editHoraIni != "0" || editHoraFin != "0") {//Validamos si habia sido guardado en el array de semana
                                for (x in ArrayC_Semana) { //Cambiamos el Dato en la Matriz que guardará en la BD
                                    if (ArrayC_Semana[x].Dia == editNumDia && ArrayC_Semana[x].HoraInicial == editHoraIni && ArrayC_Semana[x].HoraFinal == editHoraFin) {
                                        ArrayC_Semana.splice(x, 1);
                                        break;
                                    }
                                }
                            } else { //Sino, lo dejamos igual
                                //No se hace nada, pues el dato no existe
                            }
                            break;
                        }
                    }
                } else {
                    Mensaje_General("Día NO Laboral", "No puedes eliminar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                    break MODIFY;
                }
            } else if (editNumDia == "3") { //Miércoles
                if (WorkWednesday == true) {
                    for (i in MatrizWednesday) {
                        if (MatrizWednesday[i].Index == editIndex) {
                            MatrizWednesday[i].IniMie = NewIni;
                            MatrizWednesday[i].FinMie = NewFin;
                            if (editHoraIni != "0" || editHoraFin != "0") {//Validamos si habia sido guardado en el array de semana
                                for (x in ArrayC_Semana) { //Cambiamos el Dato en la Matriz que guardará en la BD
                                    if (ArrayC_Semana[x].Dia == editNumDia && ArrayC_Semana[x].HoraInicial == editHoraIni && ArrayC_Semana[x].HoraFinal == editHoraFin) {
                                        ArrayC_Semana.splice(x, 1);
                                        break;
                                    }
                                }
                            } else { //Sino, lo dejamos igual
                                //No se hace nada, pues el dato no existe
                            }
                            break;
                        }
                    }
                } else {
                    Mensaje_General("Día NO Laboral", "No puedes eliminar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                    break MODIFY;
                }
            } else if (editNumDia == "4") { //Jueves
                if (WorkThursday == true) {
                    for (i in MatrizThursday) {
                        if (MatrizThursday[i].Index == editIndex) {
                            MatrizThursday[i].IniJue = NewIni;
                            MatrizThursday[i].FinJue = NewFin;
                            if (editHoraIni != "0" || editHoraFin != "0") {//Validamos si habia sido guardado en el array de semana
                                for (x in ArrayC_Semana) { //Cambiamos el Dato en la Matriz que guardará en la BD
                                    if (ArrayC_Semana[x].Dia == editNumDia && ArrayC_Semana[x].HoraInicial == editHoraIni && ArrayC_Semana[x].HoraFinal == editHoraFin) {
                                        ArrayC_Semana.splice(x, 1);
                                        break;
                                    }
                                }
                            } else { //Sino, lo dejamos igual
                                //No se hace nada, pues el dato no existe
                            }
                            break;
                        }
                    }
                } else {
                    Mensaje_General("Día NO Laboral", "No puedes eliminar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                    break MODIFY;
                }
            } else if (editNumDia == "5") { //Viernes
                if (WorkFriday == true) {
                    for (i in MatrizFriday) {
                        if (MatrizFriday[i].Index == editIndex) {
                            MatrizFriday[i].IniVie = NewIni;
                            MatrizFriday[i].FinVie = NewFin;
                            if (editHoraIni != "0" || editHoraFin != "0") {//Validamos si habia sido guardado en el array de semana
                                for (x in ArrayC_Semana) { //Cambiamos el Dato en la Matriz que guardará en la BD
                                    if (ArrayC_Semana[x].Dia == editNumDia && ArrayC_Semana[x].HoraInicial == editHoraIni && ArrayC_Semana[x].HoraFinal == editHoraFin) {
                                        ArrayC_Semana.splice(x, 1);
                                        break;
                                    }
                                }
                            } else { //Sino, lo dejamos igual
                                //No se hace nada, pues el dato no existe
                            }
                            break;
                        }
                    }
                } else {
                    Mensaje_General("Día NO Laboral", "No puedes eliminar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                    break MODIFY;
                }
            } else if (editNumDia == "6") { //Sábado
                if (WorkSaturday == true) {
                    for (i in MatrizSaturday) {
                        if (MatrizSaturday[i].Index == editIndex) {
                            MatrizSaturday[i].IniSab = NewIni;
                            MatrizSaturday[i].FinSab = NewFin;
                            if (editHoraIni != "0" || editHoraFin != "0") {//Validamos si habia sido guardado en el array de semana
                                for (x in ArrayC_Semana) { //Cambiamos el Dato en la Matriz que guardará en la BD
                                    if (ArrayC_Semana[x].Dia == editNumDia && ArrayC_Semana[x].HoraInicial == editHoraIni && ArrayC_Semana[x].HoraFinal == editHoraFin) {
                                        ArrayC_Semana.splice(x, 1);
                                        break;
                                    }
                                }
                            } else { //Sino, lo dejamos igual
                                //No se hace nada, pues el dato no existe
                            }
                            break;
                        }
                    }
                } else {
                    Mensaje_General("Día NO Laboral", "No puedes eliminar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                    break MODIFY;
                }
            } else if (editNumDia == "7") { //Domingo
                if (WorkSunday == true) {
                    for (i in MatrizSunday) {
                        if (MatrizSunday[i].Index == editIndex) {
                            MatrizSunday[i].IniDom = NewIni;
                            MatrizSunday[i].FinDom = NewFin;
                            if (editHoraIni != "0" || editHoraFin != "0") {//Validamos si habia sido guardado en el array de semana
                                for (x in ArrayC_Semana) { //Cambiamos el Dato en la Matriz que guardará en la BD
                                    if (ArrayC_Semana[x].Dia == editNumDia && ArrayC_Semana[x].HoraInicial == editHoraIni && ArrayC_Semana[x].HoraFinal == editHoraFin) {
                                        ArrayC_Semana.splice(x, 1);
                                        break;
                                    }
                                }
                            } else { //Sino, lo dejamos igual
                                //No se hace nada, pues el dato no existe
                            }
                            break;
                        }
                    }
                } else {
                    Mensaje_General("Día NO Laboral", "No puedes eliminar un horario para un día no laboral, únicamente los de los días laborales.", "W");
                    break MODIFY;
                }
            }
            break MODIFY;
        } while (0);
    } catch (e) {
        Mensaje_General("Error - No se logró eliminar", "Lo sentimos, ocurrió un error y no se logró eliminar correctamente el horario solicitado, favor verificar los datos.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario.DeleteArraysTime):\n" + e));
    }
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                              PROCESO DE CARGUE GRID CALENDARIO                                                                                   ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//limpieza de campos despues de agregar un calendario al grid
function Clear_Agregar() {
    $("#TxtIniLun").val("");
    $("#TxtFinLun").val("");
    $("#TxtIniMar").val("");
    $("#TxtFinMar").val("");
    $("#TxtIniMie").val("");
    $("#TxtFinMie").val("");
    $("#TxtIniJue").val("");
    $("#TxtFinJue").val("");
    $("#TxtIniVie").val("");
    $("#TxtFinVie").val("");
    $("#TxtIniSab").val("");
    $("#TxtFinSab").val("");
    $("#TxtIniDom").val("");
    $("#TxtFinDom").val("");

    $('.C_Chosen').trigger('chosen:updated');
}

// crea la tabla de consulta
function Table_Calendario() {
    try {
        var html_TableCalendario = "";
        $(".container_TGrid").html("");

        switch (estado) {

            case "buscar":
                html_TableCalendario = "<table id='TCalendario' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Ver</th><th>NIT Empresa</th><th>Código</th><th>Descripción</th><th>Tipo Calendario</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Usuario Actualización</th><th>Fecha Actualización</th></tr></thead><tbody>";
                for (itemArray in ArrayCalendario) {
                    if (ArrayCalendario[itemArray].Calendario_ID != 0) {
                        html_TableCalendario += "<tr id= 'TCalendario_" + ArrayCalendario[itemArray].Calendario_ID + "'><td><span class='cssToolTip_ver'><img  src='../../images/N_Search_Red.png' width='23px' height='23px' class= 'Editar' name='editar' onmouseover=\"this.src='../../images/N_Search_Black.png';\" onmouseout=\"this.src='../../images/N_Search_Red.png';\" onclick=\"Editar('" + ArrayCalendario[itemArray].Nit_ID + "','" + ArrayCalendario[itemArray].Calendario_ID + "')\"></img><span>Ver Calendario</span></span></td><td style='white-space: nowrap;'>" + ArrayCalendario[itemArray].Nit_ID + " - " + ArrayCalendario[itemArray].DescripEmpresa + "</td><td>" + ArrayCalendario[itemArray].Calendario_ID + "</td><td style='white-space: nowrap;'>" + ArrayCalendario[itemArray].Descripcion + "</td><td style='white-space: nowrap;'>" + ArrayCalendario[itemArray].TipoCalendario + " - " + ArrayCalendario[itemArray].DescripTipoCalendario + "</td><td>" + ArrayCalendario[itemArray].UsuarioCreacion + "</td><td style='white-space: nowrap;'>" + ArrayCalendario[itemArray].FechaCreacion + "</td><td>" + ArrayCalendario[itemArray].UsuarioActualizacion + "</td><td style='white-space: nowrap;'>" + ArrayCalendario[itemArray].FechaActualizacion + "</td></tr>";
                    }
                }
                break;

            case "modificar":
                html_TableCalendario = "<table id='TCalendario' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Editar</th><th>NIT Empresa</th><th>Código</th><th>Descripción</th><th>Tipo Calendario</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Usuario Actualización</th><th>Fecha Actualización</th></tr></thead><tbody>";
                for (itemArray in ArrayCalendario) {
                    if (ArrayCalendario[itemArray].Calendario_ID != 0) {
                        html_TableCalendario += "<tr id= 'TCalendario_" + ArrayCalendario[itemArray].Calendario_ID + "'><td><span class='cssToolTip_ver'><img src='../../images/Editar1.png' width='23px' height='23px' class= 'Editar' name='editar' onmouseover=\"this.src='../../images/EditarOver.png';\" onmouseout=\"this.src='../../images/Editar1.png';\" onclick=\"Editar('" + ArrayCalendario[itemArray].Nit_ID + "','" + ArrayCalendario[itemArray].Calendario_ID + "')\"></img><span>Editar Calendario</span></span></td><td style='white-space: nowrap;'>" + ArrayCalendario[itemArray].Nit_ID + " - " + ArrayCalendario[itemArray].DescripEmpresa + "</td><td>" + ArrayCalendario[itemArray].Calendario_ID + "</td><td style='white-space: nowrap;'>" + ArrayCalendario[itemArray].Descripcion + "</td><td style='white-space: nowrap;'>" + ArrayCalendario[itemArray].TipoCalendario + " - " + ArrayCalendario[itemArray].DescripTipoCalendario + "</td><td>" + ArrayCalendario[itemArray].UsuarioCreacion + "</td><td style='white-space: nowrap;'>" + ArrayCalendario[itemArray].FechaCreacion + "</td><td>" + ArrayCalendario[itemArray].UsuarioActualizacion + "</td><td style='white-space: nowrap;'>" + ArrayCalendario[itemArray].FechaActualizacion + "</td></tr>";
                    }
                }
                break;

            case "eliminar":
                html_TableCalendario = "<table id='TCalendario' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>NIT Empresa</th><th>Código</th><th>Descripción</th><th>Tipo Calendario</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Usuario Actualización</th><th>Fecha Actualización</th></tr></thead><tbody>";
                for (itemArray in ArrayCalendario) {
                    if (ArrayCalendario[itemArray].Calendario_ID != 0) {
                        html_TableCalendario += "<tr id= 'TCalendario_" + ArrayCalendario[itemArray].Calendario_ID + "'><td><span class='cssToolTip_ver'><img  src='../../images/Delete.png' width='23px' height='23px' class= 'Eliminar' name='eliminar' onmouseover=\"this.src='../../images/DeleteOver.png';\" onmouseout=\"this.src='../../images/Delete.png';\" onclick=\"Eliminar('" + ArrayCalendario[itemArray].Nit_ID + "','" + ArrayCalendario[itemArray].Calendario_ID + "')\"></img><span>Eliminar Calendario</span></span></td><td style='white-space: nowrap;'>" + ArrayCalendario[itemArray].Nit_ID + " - " + ArrayCalendario[itemArray].DescripEmpresa + "</td><td>" + ArrayCalendario[itemArray].Calendario_ID + "</td><td style='white-space: nowrap;'>" + ArrayCalendario[itemArray].Descripcion + "</td><td style='white-space: nowrap;'>" + ArrayCalendario[itemArray].TipoCalendario + " - " + ArrayCalendario[itemArray].DescripTipoCalendario + "</td><td>" + ArrayCalendario[itemArray].UsuarioCreacion + "</td><td style='white-space: nowrap;'>" + ArrayCalendario[itemArray].FechaCreacion + "</td><td>" + ArrayCalendario[itemArray].UsuarioActualizacion + "</td><td style='white-space: nowrap;'>" + ArrayCalendario[itemArray].FechaActualizacion + "</td></tr>";
                    }
                }
                break;
        }

        html_TableCalendario += "</tbody></table>";
        $(".container_TGrid").html("");
        $(".container_TGrid").html(html_TableCalendario);

        $("#TCalendario").dataTable({
            "bJQueryUI": true,
            "iDisplayLength": 1000,
            "bDestroy": true
        });
    } catch (e) {
        Mensaje_General("Error - No se logró DIbujar tabla", "Lo sentimos, ocurrió un error y no se logró dibujar correctamente la información solicitada.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario.Table_Calendario):\n" + e));
    }
}

//muestra el registro a eliminar
function Eliminar(index_Nit, index_Calendario) {
    try {
        for (itemArray in ArrayCalendario) {
            if (index_Nit == ArrayCalendario[itemArray].Nit_ID && index_Calendario == ArrayCalendario[itemArray].Calendario_ID) {
                editNit_ID = ArrayCalendario[itemArray].Nit_ID;
                editID = ArrayCalendario[itemArray].Calendario_ID;
                TipoCalendar = ArrayCalendario[itemArray].TipoCalendario;
                $("#dialog_eliminar").dialog("option", "title", "¿Eliminar Calendario?");
                $("#dialog_eliminar").dialog("open");
            }
        }
    } catch (e) {
        Mensaje_General("Error - No se logró ejecutar la acción", "Lo sentimos, ocurrió un error y no se logró desplegar correctamente el dialogo de eliminación.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario.Eliminar):\n" + e));
    }
}

// muestra el registro a editar
function Editar(index_Nit, index_Calendario) {
    try {
        $(".Dialog_Datos_Calen").css("display", "inline-table");
        $("#TablaConsulta").css("display", "none");
                
        OpenControl();
        for (itemArray in ArrayCalendario) {
            if (index_Nit == ArrayCalendario[itemArray].Nit_ID && index_Calendario == ArrayCalendario[itemArray].Calendario_ID) {

                editNit_ID = ArrayCalendario[itemArray].Nit_ID;
                editID = ArrayCalendario[itemArray].Calendario_ID;

                transacionAjax_ArrayC_Semana("MatrizDiasSemana");

                $("#Select_EmpresaNit").val(ArrayCalendario[itemArray].Nit_ID);
                $("#Txt_ID").val(ArrayCalendario[itemArray].Calendario_ID);

                $("#Select_EmpresaNit").attr("disabled", "disabled");
                $("#Txt_ID").attr("disabled", "disabled");

                $("#TxtDescription").val(ArrayCalendario[itemArray].Descripcion);
                $("#Select_TipoCalendario").val(ArrayCalendario[itemArray].TipoCalendario);

                VerifyTextID("Ok"); //Decir se llenó el campo
                VerifyTextDescription("Ok"); //Decir se llenó el campo                

                $('.C_Chosen').trigger('chosen:updated');
            }
        }
        
        $(".Table_Header_Block").css("display", "inline-table"); //Table que contiene el capturador de horas
        if (estado == "buscar") { //Si se va a mostrar el detalle
            $("#Dialog_Calendar").dialog("close");
            $("#Dialog_Calendar_View").dialog("open");
            $("#Dialog_Calendar_View").dialog("option", "title", "Vista Calendario");
            $("#Btnguardar").attr("value", "No Action");
            Detalle(index_Nit, index_Calendario);
        } else { //Sino, es una actualización, se sigue normal
            $("#Dialog_Calendar_View").dialog("close");
            $("#Dialog_Calendar").dialog("open");
            $("#Dialog_Calendar").dialog("option", "title", "Actualizar Calendario");
            $("#Btnguardar").attr("value", "Actualizar");
            validaTipoCalendario = true;
            ArmarMatricesDias();
        }

    } catch (e) {
        Mensaje_General("Error - No se logró ejecutar la acción", "Lo sentimos, ocurrió un error y no se logró ejecutar correctamente la acción solicitada.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario.Editar):\n" + e));
    }
}

// Función que muestra el detalle del calendario en VER
function Detalle(index_Nit, index_Calendario) {
    try {        
        for (itemArray in ArrayCalendario) {
            if (index_Nit == ArrayCalendario[itemArray].Nit_ID && index_Calendario == ArrayCalendario[itemArray].Calendario_ID) {
                
                $("#Ver_Select_EmpresaNit").html($("#Select_EmpresaNit option:selected").html());
                $("#Ver_Txt_ID").html(ArrayCalendario[itemArray].Calendario_ID);

                $("#Ver_TxtDescription").html(ArrayCalendario[itemArray].Descripcion);
                $("#Ver_Select_TipoCalendario").html($("#Select_TipoCalendario option:selected").html());
          
            }
        }
        ArmarMatricesDias_Ver();
        $("#Ver_Select_StateLun").prop('disabled', true).trigger("chosen:updated"); //Bloqueamos los chosen de estado del día
        $("#Ver_Select_StateMar").prop('disabled', true).trigger("chosen:updated");
        $("#Ver_Select_StateMie").prop('disabled', true).trigger("chosen:updated");
        $("#Ver_Select_StateJue").prop('disabled', true).trigger("chosen:updated");
        $("#Ver_Select_StateVie").prop('disabled', true).trigger("chosen:updated");
        $("#Ver_Select_StateSab").prop('disabled', true).trigger("chosen:updated");
        $("#Ver_Select_StateDom").prop('disabled', true).trigger("chosen:updated");
        $("#Ver_Select_Festivo").prop('disabled', true).trigger("chosen:updated");
    } catch (e) {
        Mensaje_General("Error - No se logró ejecutar la acción", "Lo sentimos, ocurrió un error y no se logró ejecutar correctamente la acción solicitada.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario.Detalle):\n" + e));
    }
}

//limpiar campos
function Clear() {
    try {
        ClearArraySemana();
        validaTipoCalendario = false;
        MensajeHora = "";
        MensajeVacio = "";
        MensajeRepetido = "";
        V_ONE = 0;

        $("#Select_EmpresaNit").val("-1");
        $("#Txt_ID").val("");
        $("#Txt_ID").prop('disabled', true);
        $("#TxtDescription").val("");
        $("#TxtDescription").prop('disabled', true);
        VerifyTextID(""); //Decir que se borró todo
        VerifyTextDescription(""); //Para decir que borramos todo

        $("#TxtRead").val("");
        $("#DDLColumns").val("-1");

        $('.C_Chosen').trigger('chosen:updated');

        var Only_Empresa = VerificarNIT("Select_EmpresaNit");

        if (Only_Empresa == true) {
            $("#Txt_ID").prop('disabled', false);
        }
    } catch (e) {
        Mensaje_General("Error - No se logró ejecutar la acción", "Lo sentimos, ocurrió un error y no se logró limpiar todos los campos correctamente.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario.Clear):\n" + e));
    }
}

//Función que borra todos los datos usados para el array de horarios semana
function ClearArraySemana() {
    ArrayCalendario_Grid = [];
    ArrayC_Semana = [];

    MatrizMonday = [];
    MatrizTuesday = [];
    MatrizWednesday = [];
    MatrizThursday = [];
    MatrizFriday = [];
    MatrizSaturday = [];
    MatrizSunday = [];

    Lineas = 0; //Contador de filas que tendrán las matrices

    WorkMonday = true;
    WorkTuesday = true;
    WorkWednesday = true;
    WorkThursday = true;
    WorkFriday = true;
    WorkSaturday = true;
    WorkSunday = true;
    WorkFestivo = false;

    FirstMonday = false;
    FirstTuesday = false;
    FirstWednesday = false;
    FirstThursday = false;
    FirstFriday = false;
    FirstSaturday = false;
    FirstSunday = false;

    $("#Select_StateLun").prop('disabled', false);
    $("#Select_StateLun").val("N").trigger("chosen:updated");
    $("#TxtIniLun").prop('disabled', false);
    $("#TxtFinLun").prop('disabled', false);
    $("#TxtIniLun").val("");
    $("#TxtFinLun").val("");
    $("#Select_StateMar").prop('disabled', false);
    $("#Select_StateMar").val("N").trigger("chosen:updated");
    $("#TxtIniMar").prop('disabled', false);
    $("#TxtFinMar").prop('disabled', false);
    $("#TxtIniMar").val("");
    $("#TxtFinMar").val("");
    $("#Select_StateMie").prop('disabled', false);
    $("#Select_StateMie").val("N").trigger("chosen:updated");
    $("#TxtIniMie").prop('disabled', false);
    $("#TxtFinMie").prop('disabled', false);
    $("#TxtIniMie").val("");
    $("#TxtFinMie").val("");
    $("#Select_StateJue").prop('disabled', false);
    $("#Select_StateJue").val("N").trigger("chosen:updated");
    $("#TxtIniJue").prop('disabled', false);
    $("#TxtFinJue").prop('disabled', false);
    $("#TxtIniJue").val("");
    $("#TxtFinJue").val("");
    $("#Select_StateVie").prop('disabled', false);
    $("#Select_StateVie").val("N").trigger("chosen:updated");
    $("#TxtIniVie").prop('disabled', false);
    $("#TxtFinVie").prop('disabled', false);
    $("#TxtIniVie").val("");
    $("#TxtFinVie").val("");
    $("#Select_StateSab").prop('disabled', false);
    $("#Select_StateSab").val("N").trigger("chosen:updated");
    $("#TxtIniSab").prop('disabled', false);
    $("#TxtFinSab").prop('disabled', false);
    $("#TxtIniSab").val("");
    $("#TxtFinSab").val("");
    $("#Select_StateDom").prop('disabled', false);
    $("#Select_StateDom").val("N").trigger("chosen:updated");
    $("#TxtIniDom").prop('disabled', false);
    $("#TxtFinDom").prop('disabled', false);
    $("#TxtIniDom").val("");
    $("#TxtFinDom").val("");
    $("#Select_Festivo").prop('disabled', false);
    $("#Select_Festivo").val("S").trigger("chosen:updated");
}


//limpiar campos
function ClearDetalle() {
    try {
        MensajeHora = "";
        MensajeVacio = "";
        MensajeRepetido = "";
        V_ONE = 0;

        $("#Ver_Select_EmpresaNit").html("");
        $("#Ver_Txt_ID").html("");
        $("#Ver_TxtDescription").html("");
        $("#Ver_Select_TipoCalendario").html("");
        $(".container_TGrid_Create").offsetHeight;
        $(".container_TGrid_Create").html("");
    } catch (e) {
        Mensaje_General("Error - No se logró ejecutar la acción", "Lo sentimos, ocurrió un error y no se logró limpiar todos los campos correctamente.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario.Clear):\n" + e));
    }
}

//Proceso para detectar que han llenado en ID
function VerifyTextID(value) {
    if (value.length == 0) {
        $("#TxtDescription").val("");
        $("#TxtDescription").prop('disabled', true);
        VerifyTextDescription(""); //Para decir que borramos todo
    } else {
        $("#TxtDescription").prop('disabled', false);
    }
}

//Proceso para detectar que han llenado en Descripción
function VerifyTextDescription(value) {
    if (value.length == 0) {
        $("#Select_TipoCalendario").prop('disabled', true); //No se agrega el trigger porque se hace al seleccionar el val
        $("#Select_TipoCalendario").val("-1").trigger("chosen:updated");
        $("#Tabla_10").css("display", "none");
        $(".Table_Header_Block").css("display", "none"); //Table que contiene el capturador de horas
        $(".container_TGrid_Create").css("display", "none"); //Tabla que dibuja el grid con las horas ya capturadas
    } else {
        $("#Select_TipoCalendario").prop('disabled', false).trigger("chosen:updated");
    }
}

//Función encargada de filtrar el array semana traido de la BD y cargar las respectivas matrices de los días
function ArmarMatricesDias() {
    try {
        var Lun = 0;
        var Mar = 0;
        var Mie = 0;
        var Jue = 0;
        var Vie = 0;
        var Sab = 0;
        var Dom = 0;

        for (i in ArrayC_Semana_Edit) {
            switch (ArrayC_Semana_Edit[i].Dia) {
                case "1":
                    Lun = Lun + 1;
                    var JSONDay = {
                        "Index": Lun,
                        "IniLun": ArrayC_Semana_Edit[i].HoraInicial,
                        "FinLun": ArrayC_Semana_Edit[i].HoraFinal
                    };
                    MatrizMonday.push(JSONDay);
                    if (ArrayC_Semana_Edit[i].IndicativoFestivo == "N") {
                        WorkMonday = true;
                    } else {
                        WorkMonday = false;
                        FirstMonday = true;
                        $("#Select_StateLun").val("S").trigger("chosen:updated");
                        $("#TxtIniLun").prop('disabled', true);
                        $("#TxtFinLun").prop('disabled', true);
                    }
                    InsertJson_Day(ArrayC_Semana_Edit[i].Dia, ArrayC_Semana_Edit[i].IndicativoFestivo, ArrayC_Semana_Edit[i].HoraInicial, ArrayC_Semana_Edit[i].HoraFinal);
                    break;
                case "2":
                    Mar = Mar + 1;
                    var JSONDay = {
                        "Index": Mar,
                        "IniMar": ArrayC_Semana_Edit[i].HoraInicial,
                        "FinMar": ArrayC_Semana_Edit[i].HoraFinal
                    };
                    MatrizTuesday.push(JSONDay);
                    if (ArrayC_Semana_Edit[i].IndicativoFestivo == "N") {
                        WorkTuesday = true;
                    } else {
                        WorkTuesday = false;
                        FirstTuesday = true;
                        $("#Select_StateMar").val("S").trigger("chosen:updated");
                        $("#TxtIniMar").prop('disabled', true);
                        $("#TxtFinMar").prop('disabled', true);
                    }
                    InsertJson_Day(ArrayC_Semana_Edit[i].Dia, ArrayC_Semana_Edit[i].IndicativoFestivo, ArrayC_Semana_Edit[i].HoraInicial, ArrayC_Semana_Edit[i].HoraFinal);
                    break;
                case "3":
                    Mie = Mie + 1;
                    var JSONDay = {
                        "Index": Mie,
                        "IniMie": ArrayC_Semana_Edit[i].HoraInicial,
                        "FinMie": ArrayC_Semana_Edit[i].HoraFinal
                    };
                    MatrizWednesday.push(JSONDay);
                    if (ArrayC_Semana_Edit[i].IndicativoFestivo == "N") {
                        WorkWednesday = true;
                    } else {
                        WorkWednesday = false;
                        FirstWednesday = true;
                        $("#Select_StateMie").val("S").trigger("chosen:updated");
                        $("#TxtIniMie").prop('disabled', true);
                        $("#TxtFinMie").prop('disabled', true);
                    }
                    InsertJson_Day(ArrayC_Semana_Edit[i].Dia, ArrayC_Semana_Edit[i].IndicativoFestivo, ArrayC_Semana_Edit[i].HoraInicial, ArrayC_Semana_Edit[i].HoraFinal);
                    break;
                case "4":
                    Jue = Jue + 1;
                    var JSONDay = {
                        "Index": Jue,
                        "IniJue": ArrayC_Semana_Edit[i].HoraInicial,
                        "FinJue": ArrayC_Semana_Edit[i].HoraFinal
                    };
                    MatrizThursday.push(JSONDay);
                    if (ArrayC_Semana_Edit[i].IndicativoFestivo == "N") {
                        WorkThursday = true;
                    } else {
                        WorkThursday = false;
                        FirstThursday = true;
                        $("#Select_StateJue").val("S").trigger("chosen:updated");
                        $("#TxtIniJue").prop('disabled', true);
                        $("#TxtFinJue").prop('disabled', true);
                    }
                    InsertJson_Day(ArrayC_Semana_Edit[i].Dia, ArrayC_Semana_Edit[i].IndicativoFestivo, ArrayC_Semana_Edit[i].HoraInicial, ArrayC_Semana_Edit[i].HoraFinal);
                    break;
                case "5":
                    Vie = Vie + 1;
                    var JSONDay = {
                        "Index": Vie,
                        "IniVie": ArrayC_Semana_Edit[i].HoraInicial,
                        "FinVie": ArrayC_Semana_Edit[i].HoraFinal
                    };
                    MatrizFriday.push(JSONDay);
                    if (ArrayC_Semana_Edit[i].IndicativoFestivo == "N") {
                        WorkFriday = true;
                    } else {
                        WorkFriday = false;
                        FirstFriday = true;
                        $("#Select_StateVie").val("S").trigger("chosen:updated");
                        $("#TxtIniVie").prop('disabled', true);
                        $("#TxtFinVie").prop('disabled', true);
                    }
                    InsertJson_Day(ArrayC_Semana_Edit[i].Dia, ArrayC_Semana_Edit[i].IndicativoFestivo, ArrayC_Semana_Edit[i].HoraInicial, ArrayC_Semana_Edit[i].HoraFinal);
                    break;
                case "6":
                    Sab = Sab + 1;
                    var JSONDay = {
                        "Index": Sab,
                        "IniSab": ArrayC_Semana_Edit[i].HoraInicial,
                        "FinSab": ArrayC_Semana_Edit[i].HoraFinal
                    };
                    MatrizSaturday.push(JSONDay);
                    if (ArrayC_Semana_Edit[i].IndicativoFestivo == "N") {
                        WorkSaturday = true;
                    } else {
                        WorkSaturday = false;
                        FirstSaturday = true;
                        $("#Select_StateSab").val("S").trigger("chosen:updated");
                        $("#TxtIniSab").prop('disabled', true);
                        $("#TxtFinSab").prop('disabled', true);
                    }
                    InsertJson_Day(ArrayC_Semana_Edit[i].Dia, ArrayC_Semana_Edit[i].IndicativoFestivo, ArrayC_Semana_Edit[i].HoraInicial, ArrayC_Semana_Edit[i].HoraFinal);
                    break;
                case "7":
                    Dom = Dom + 1;
                    var JSONDay = {
                        "Index": Dom,
                        "IniDom": ArrayC_Semana_Edit[i].HoraInicial,
                        "FinDom": ArrayC_Semana_Edit[i].HoraFinal
                    };
                    MatrizSunday.push(JSONDay);
                    if (ArrayC_Semana_Edit[i].IndicativoFestivo == "N") {
                        WorkSunday = true;
                    } else {
                        WorkSunday = false;
                        FirstSunday = true;
                        $("#Select_StateDom").val("S").trigger("chosen:updated");
                        $("#TxtIniDom").prop('disabled', true);
                        $("#TxtFinDom").prop('disabled', true);
                    }
                    InsertJson_Day(ArrayC_Semana_Edit[i].Dia, ArrayC_Semana_Edit[i].IndicativoFestivo, ArrayC_Semana_Edit[i].HoraInicial, ArrayC_Semana_Edit[i].HoraFinal);
                    break;
                case "8":
                    if (ArrayC_Semana_Edit[i].IndicativoFestivo == "N") {
                        WorkFestivo = true;
                        $("#Select_Festivo").val("N").trigger("chosen:updated");
                    } else {
                        WorkFestivo = false;
                        $("#Select_Festivo").val("S").trigger("chosen:updated");
                    }
                    break;
            }
        }
        var NumFilas = [];
        NumFilas.push(Vie);
        NumFilas.push(Sab);
        NumFilas.push(Dom);
        NumFilas.push(Lun);
        NumFilas.push(Mar);
        NumFilas.push(Mie);
        NumFilas.push(Jue);
        //Funciones que ordenan los números
        function deMenorAMayor(elem1, elem2) { return elem1 - elem2; }
        function deMayorAMenor(elem1, elem2) { return elem2 - elem1; }
        NumFilas = NumFilas.sort(deMayorAMenor);
        //Tomamos el número que salió ser el mayor

        var Mayor = NumFilas[0];
        RellenarMatrices(Mayor);
        CargarMatricesHorarios();
        Lineas = Mayor;
        $(".container_TGrid_Create").css("display", "inline-table"); //Tabla que dibuja el grid con las horas ya capturadas
    } catch (e) {
        Mensaje_General("Error - No se logró ejecutar la acción", "Lo sentimos, ocurrió un error y no se logró armar correctamente los datos necesarios para los días.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario.ArmarMatricesDias):\n" + e));
    }
}

//Función que completa las matrices de los días en función con un número al que deben estar
function RellenarMatrices(numMax) {
    try {
        var index = 0;
        //Lunes
        if (MatrizMonday.length < numMax) {
            index = 0;
            while (index != numMax) {
                index = (MatrizMonday.length) + 1;
                var JSONDay = {
                    "Index": index,
                    "IniLun": "0",
                    "FinLun": "0"
                };
                MatrizMonday.push(JSONDay);

            }
        }
        //Martes
        if (MatrizTuesday.length < numMax) {
            index = 0;
            while (index != numMax) {
                index = (MatrizTuesday.length) + 1;
                var JSONDay = {
                    "Index": index,
                    "IniMar": "0",
                    "FinMar": "0"
                };
                MatrizTuesday.push(JSONDay);

            }
        }
        //Miércoles
        if (MatrizWednesday.length < numMax) {
            index = 0;
            while (index != numMax) {
                index = (MatrizWednesday.length) + 1;
                var JSONDay = {
                    "Index": index,
                    "IniMie": "0",
                    "FinMie": "0"
                };
                MatrizWednesday.push(JSONDay);

            }
        }
        //Jueves
        if (MatrizThursday.length < numMax) {
            index = 0;
            while (index != numMax) {
                index = (MatrizThursday.length) + 1;
                var JSONDay = {
                    "Index": index,
                    "IniJue": "0",
                    "FinJue": "0"
                };
                MatrizThursday.push(JSONDay);

            }
        }
        //Viernes
        if (MatrizFriday.length < numMax) {
            index = 0;
            while (index != numMax) {
                index = (MatrizFriday.length) + 1;
                var JSONDay = {
                    "Index": index,
                    "IniVie": "0",
                    "FinVie": "0"
                };
                MatrizFriday.push(JSONDay);

            }
        }
        //Sábado
        if (MatrizSaturday.length < numMax) {
            index = 0;
            while (index != numMax) {
                index = (MatrizSaturday.length) + 1;
                var JSONDay = {
                    "Index": index,
                    "IniSab": "0",
                    "FinSab": "0"
                };
                MatrizSaturday.push(JSONDay);

            }
        }
        //Domingo
        if (MatrizSunday.length < numMax) {
            index = 0;
            while (index != numMax) {
                index = (MatrizSunday.length) + 1;
                var JSONDay = {
                    "Index": index,
                    "IniDom": "0",
                    "FinDom": "0"
                };
                MatrizSunday.push(JSONDay);

            }
        }
    } catch (e) {
        Mensaje_General("Error - No se logró ejecutar la acción", "Lo sentimos, ocurrió un error y no se logró trasladar la información correctamente.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario.RellenarMatrices):\n" + e));
    }
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                               FUNCIONES PARA HACER EL VER                                                                                                                                 ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//Función encargada de filtrar el array semana traido de la BD y cargar las respectivas matrices de los días
function ArmarMatricesDias_Ver() {
    try {
        var Lun = 0;
        var Mar = 0;
        var Mie = 0;
        var Jue = 0;
        var Vie = 0;
        var Sab = 0;
        var Dom = 0;

        for (i in ArrayC_Semana_Edit) {
            switch (ArrayC_Semana_Edit[i].Dia) {
                case "1":
                    Lun = Lun + 1;
                    var JSONDay = {
                        "Index": Lun,
                        "IniLun": ArrayC_Semana_Edit[i].HoraInicial,
                        "FinLun": ArrayC_Semana_Edit[i].HoraFinal
                    };
                    MatrizMonday.push(JSONDay);
                    if (ArrayC_Semana_Edit[i].IndicativoFestivo == "N") {
                        WorkMonday = true;
                    } else {
                        WorkMonday = false;
                        FirstMonday = true;
                        $("#Ver_Select_StateLun").val("S").trigger("chosen:updated");
                    }
                    InsertJson_Day(ArrayC_Semana_Edit[i].Dia, ArrayC_Semana_Edit[i].IndicativoFestivo, ArrayC_Semana_Edit[i].HoraInicial, ArrayC_Semana_Edit[i].HoraFinal);
                    break;
                case "2":
                    Mar = Mar + 1;
                    var JSONDay = {
                        "Index": Mar,
                        "IniMar": ArrayC_Semana_Edit[i].HoraInicial,
                        "FinMar": ArrayC_Semana_Edit[i].HoraFinal
                    };
                    MatrizTuesday.push(JSONDay);
                    if (ArrayC_Semana_Edit[i].IndicativoFestivo == "N") {
                        WorkTuesday = true;
                    } else {
                        WorkTuesday = false;
                        FirstTuesday = true;
                        $("#Ver_Select_StateMar").val("S").trigger("chosen:updated");
                    }
                    InsertJson_Day(ArrayC_Semana_Edit[i].Dia, ArrayC_Semana_Edit[i].IndicativoFestivo, ArrayC_Semana_Edit[i].HoraInicial, ArrayC_Semana_Edit[i].HoraFinal);
                    break;
                case "3":
                    Mie = Mie + 1;
                    var JSONDay = {
                        "Index": Mie,
                        "IniMie": ArrayC_Semana_Edit[i].HoraInicial,
                        "FinMie": ArrayC_Semana_Edit[i].HoraFinal
                    };
                    MatrizWednesday.push(JSONDay);
                    if (ArrayC_Semana_Edit[i].IndicativoFestivo == "N") {
                        WorkWednesday = true;
                    } else {
                        WorkWednesday = false;
                        FirstWednesday = true;
                        $("#Ver_Select_StateMie").val("S").trigger("chosen:updated");
                    }
                    InsertJson_Day(ArrayC_Semana_Edit[i].Dia, ArrayC_Semana_Edit[i].IndicativoFestivo, ArrayC_Semana_Edit[i].HoraInicial, ArrayC_Semana_Edit[i].HoraFinal);
                    break;
                case "4":
                    Jue = Jue + 1;
                    var JSONDay = {
                        "Index": Jue,
                        "IniJue": ArrayC_Semana_Edit[i].HoraInicial,
                        "FinJue": ArrayC_Semana_Edit[i].HoraFinal
                    };
                    MatrizThursday.push(JSONDay);
                    if (ArrayC_Semana_Edit[i].IndicativoFestivo == "N") {
                        WorkThursday = true;
                    } else {
                        WorkThursday = false;
                        FirstThursday = true;
                        $("#Ver_Select_StateJue").val("S").trigger("chosen:updated");
                    }
                    InsertJson_Day(ArrayC_Semana_Edit[i].Dia, ArrayC_Semana_Edit[i].IndicativoFestivo, ArrayC_Semana_Edit[i].HoraInicial, ArrayC_Semana_Edit[i].HoraFinal);
                    break;
                case "5":
                    Vie = Vie + 1;
                    var JSONDay = {
                        "Index": Vie,
                        "IniVie": ArrayC_Semana_Edit[i].HoraInicial,
                        "FinVie": ArrayC_Semana_Edit[i].HoraFinal
                    };
                    MatrizFriday.push(JSONDay);
                    if (ArrayC_Semana_Edit[i].IndicativoFestivo == "N") {
                        WorkFriday = true;
                    } else {
                        WorkFriday = false;
                        FirstFriday = true;
                        $("#Ver_Select_StateVie").val("S").trigger("chosen:updated");
                    }
                    InsertJson_Day(ArrayC_Semana_Edit[i].Dia, ArrayC_Semana_Edit[i].IndicativoFestivo, ArrayC_Semana_Edit[i].HoraInicial, ArrayC_Semana_Edit[i].HoraFinal);
                    break;
                case "6":
                    Sab = Sab + 1;
                    var JSONDay = {
                        "Index": Sab,
                        "IniSab": ArrayC_Semana_Edit[i].HoraInicial,
                        "FinSab": ArrayC_Semana_Edit[i].HoraFinal
                    };
                    MatrizSaturday.push(JSONDay);
                    if (ArrayC_Semana_Edit[i].IndicativoFestivo == "N") {
                        WorkSaturday = true;
                    } else {
                        WorkSaturday = false;
                        FirstSaturday = true;
                        $("#Ver_Select_StateSab").val("S").trigger("chosen:updated");
                    }
                    InsertJson_Day(ArrayC_Semana_Edit[i].Dia, ArrayC_Semana_Edit[i].IndicativoFestivo, ArrayC_Semana_Edit[i].HoraInicial, ArrayC_Semana_Edit[i].HoraFinal);
                    break;
                case "7":
                    Dom = Dom + 1;
                    var JSONDay = {
                        "Index": Dom,
                        "IniDom": ArrayC_Semana_Edit[i].HoraInicial,
                        "FinDom": ArrayC_Semana_Edit[i].HoraFinal
                    };
                    MatrizSunday.push(JSONDay);
                    if (ArrayC_Semana_Edit[i].IndicativoFestivo == "N") {
                        WorkSunday = true;
                    } else {
                        WorkSunday = false;
                        FirstSunday = true;
                        $("#Ver_Select_StateDom").val("S").trigger("chosen:updated");
                    }
                    InsertJson_Day(ArrayC_Semana_Edit[i].Dia, ArrayC_Semana_Edit[i].IndicativoFestivo, ArrayC_Semana_Edit[i].HoraInicial, ArrayC_Semana_Edit[i].HoraFinal);
                    break;
                case "8":
                    if (ArrayC_Semana_Edit[i].IndicativoFestivo == "N") {
                        WorkFestivo = true;
                        $("#Ver_Select_Festivo").val("N").trigger("chosen:updated");
                    } else {
                        WorkFestivo = false;
                        $("#Ver_Select_Festivo").val("S").trigger("chosen:updated");
                    }
                    break;
            }
        }
        var NumFilas = [];
        NumFilas.push(Vie);
        NumFilas.push(Sab);
        NumFilas.push(Dom);
        NumFilas.push(Lun);
        NumFilas.push(Mar);
        NumFilas.push(Mie);
        NumFilas.push(Jue);
        //Funciones que ordenan los números
        function deMenorAMayor(elem1, elem2) { return elem1 - elem2; }
        function deMayorAMenor(elem1, elem2) { return elem2 - elem1; }
        NumFilas = NumFilas.sort(deMayorAMenor);
        //Tomamos el número que salió ser el mayor

        var Mayor = NumFilas[0];
        RellenarMatrices_Ver(Mayor);
        CargarMatricesHorarios_Ver();
        Lineas = Mayor;
        $("#Div_Ver").css("display", "inline-table"); //Tabla que dibuja el grid con las horas ya capturadas
    } catch (e) {
        Mensaje_General("Error - No se logró ejecutar la acción", "Lo sentimos, ocurrió un error y no se logró armar correctamente los datos necesarios para los días.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario.ArmarMatricesDias_Ver):\n" + e));
    }
}

//Función que completa las matrices de los días en función con un número al que deben estar
function RellenarMatrices_Ver(numMax) {
    try {
        var index = 0;
        //Lunes
        if (MatrizMonday.length < numMax) {
            index = 0;
            while (index != numMax) {
                index = (MatrizMonday.length) + 1;
                var JSONDay = {
                    "Index": index,
                    "IniLun": "-",
                    "FinLun": "-"
                };
                MatrizMonday.push(JSONDay);

            }
        }
        //Martes
        if (MatrizTuesday.length < numMax) {
            index = 0;
            while (index != numMax) {
                index = (MatrizTuesday.length) + 1;
                var JSONDay = {
                    "Index": index,
                    "IniMar": "-",
                    "FinMar": "-"
                };
                MatrizTuesday.push(JSONDay);

            }
        }
        //Miércoles
        if (MatrizWednesday.length < numMax) {
            index = 0;
            while (index != numMax) {
                index = (MatrizWednesday.length) + 1;
                var JSONDay = {
                    "Index": index,
                    "IniMie": " -",
                    "FinMie": " -"
                };
                MatrizWednesday.push(JSONDay);

            }
        }
        //Jueves
        if (MatrizThursday.length < numMax) {
            index = 0;
            while (index != numMax) {
                index = (MatrizThursday.length) + 1;
                var JSONDay = {
                    "Index": index,
                    "IniJue": "-",
                    "FinJue": "-"
                };
                MatrizThursday.push(JSONDay);

            }
        }
        //Viernes
        if (MatrizFriday.length < numMax) {
            index = 0;
            while (index != numMax) {
                index = (MatrizFriday.length) + 1;
                var JSONDay = {
                    "Index": index,
                    "IniVie": "-",
                    "FinVie": "-"
                };
                MatrizFriday.push(JSONDay);

            }
        }
        //Sábado
        if (MatrizSaturday.length < numMax) {
            index = 0;
            while (index != numMax) {
                index = (MatrizSaturday.length) + 1;
                var JSONDay = {
                    "Index": index,
                    "IniSab": "-",
                    "FinSab": "-"
                };
                MatrizSaturday.push(JSONDay);

            }
        }
        //Domingo
        if (MatrizSunday.length < numMax) {
            index = 0;
            while (index != numMax) {
                index = (MatrizSunday.length) + 1;
                var JSONDay = {
                    "Index": index,
                    "IniDom": "-",
                    "FinDom": "-"
                };
                MatrizSunday.push(JSONDay);

            }
        }
    } catch (e) {
        Mensaje_General("Error - No se logró ejecutar la acción", "Lo sentimos, ocurrió un error y no se logró trasladar la información correctamente.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario.RellenarMatrices_Ver):\n" + e));
    }
}

//Función que crea el array que contendrá los datos para dibujar en la tabla de horarios
function CargarMatricesHorarios_Ver() {
    try {
        ArrayCalendario_Grid = [];
        ArrayCalendario_Grid.push(MatrizMonday);
        ArrayCalendario_Grid.push(MatrizTuesday);
        ArrayCalendario_Grid.push(MatrizWednesday);
        ArrayCalendario_Grid.push(MatrizThursday);
        ArrayCalendario_Grid.push(MatrizFriday);
        ArrayCalendario_Grid.push(MatrizSaturday);
        ArrayCalendario_Grid.push(MatrizSunday);
        $("#Div_Ver").offsetHeight;
        $("#Div_Ver").html("");
        TGridCalendar_Ver();
    } catch (e) {
        Mensaje_General("Error - No se logró ejecutar la acción", "Lo sentimos, ocurrió un error y no se logró cargar correctamente la matriz principal, favor verifique los datos.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario.CargarMatricesHorarios_Ver):\n" + e));
    }
}

//Función que crea la tabla donde se mostrarán los horarios ingresados
function TGridCalendar_Ver() {
    try {
        $("#Div_Ver").css("display", "none"); //Tabla que dibuja el grid con las horas ya capturadas
        var html_Calendario = "";

        html_Calendario = "<table id='TCalendariosVer' style='width: 100%'><tbody>";
        //Comenzamos a anidar tablas
        //Tabla Lunes
        html_Calendario += "<tr><td id='ID_LunesVer' align='left' > <table id='TLunesVer' border='1' cellpadding='1' cellspacing='1' style='width: 100%'><thead><tr><th colspan='2' class='Grid_Head' >Lunes</th></tr><tr><th colspan='2' class='Grid_Head' >Hora</th></tr><tr><th>Inicial</th><th>Final</th></tr></thead><tbody>";
        //-----------
        //Lunes [0]
        for (i in ArrayCalendario_Grid[0]) {
            html_Calendario += "<tr id= 'TLunesVer_" + ArrayCalendario_Grid[0][i].Index + "'><td>" + ArrayCalendario_Grid[0][i].IniLun + "</td><td>" + ArrayCalendario_Grid[0][i].FinLun + "</td></tr>";
        }
        html_Calendario += "</tbody></table></td>"; //Cerramos tabla Lunes
        //------------
        //Tabla Martes
        html_Calendario += "<td id='ID_MartesVer' align='left' > <table id='TMartesVer' border='1' cellpadding='1' cellspacing='1' style='width: 100%'   ><thead><tr><th colspan='2' class='Grid_Head' >Martes</th></tr><tr><th colspan='2' class='Grid_Head' >Hora</th></tr><tr><th>Inicial</th><th>Final</th></tr></thead><tbody>";
        //Martes [1]
        for (i in ArrayCalendario_Grid[1]) {
            html_Calendario += "<tr id= 'TMartesVer_" + ArrayCalendario_Grid[1][i].Index + "'><td>" + ArrayCalendario_Grid[1][i].IniMar + "</td><td>" + ArrayCalendario_Grid[1][i].FinMar + "</td></tr>";
        }
        html_Calendario += "</tbody></table></td>"; //Cerramos tabla Martes
        //------------
        //Tabla Miércoles
        html_Calendario += "<td id='ID_MiercolesVer' align='left' > <table id='TMiercolesVer' border='1' cellpadding='1' cellspacing='1' style='width: 100%'   ><thead><tr><th colspan='2' class='Grid_Head' >Miércoles</th></tr><tr><th colspan='2' class='Grid_Head' >Hora</th></tr><tr><th>Inicial</th><th>Final</th></tr></thead><tbody>";
        //Miércoles [2]
        for (i in ArrayCalendario_Grid[2]) {
            html_Calendario += "<tr id= 'TMiercolesVer_" + ArrayCalendario_Grid[2][i].Index + "'><td>" + ArrayCalendario_Grid[2][i].IniMie + "</td><td>" + ArrayCalendario_Grid[2][i].FinMie + "</td></tr>";
        }
        html_Calendario += "</tbody></table></td>"; //Cerramos tabla Miércoles
        //------------
        //Tabla Jueves
        html_Calendario += "<td id='ID_JuevesVer' align='left' > <table id='TJuevesVer' border='1' cellpadding='1' cellspacing='1' style='width: 100%'   ><thead><tr><th colspan='2' class='Grid_Head' >Jueves</th></tr><tr><th colspan='2' class='Grid_Head' >Hora</th></tr><tr><th>Inicial</th><th>Final</th></tr></thead><tbody>";
        //Jueves [3]
        for (i in ArrayCalendario_Grid[3]) {
            html_Calendario += "<tr id= 'TJuevesVer_" + ArrayCalendario_Grid[3][i].Index + "'><td>" + ArrayCalendario_Grid[3][i].IniJue + "</td><td>" + ArrayCalendario_Grid[3][i].FinJue + "</td></tr>";
        }
        html_Calendario += "</tbody></table></td>"; //Cerramos tabla Jueves
        //------------
        //Tabla Viernes
        html_Calendario += "<td id='ID_ViernesVer' align='left' > <table id='TViernesVer' border='1' cellpadding='1' cellspacing='1' style='width: 100%'   ><thead><tr><th colspan='2' class='Grid_Head' >Viernes</th></tr><tr><th colspan='2' class='Grid_Head' >Hora</th></tr><tr><th>Inicial</th><th>Final</th></tr></thead><tbody>";
        //Viernes [4]
        for (i in ArrayCalendario_Grid[4]) {
            html_Calendario += "<tr id= 'TViernesVer_" + ArrayCalendario_Grid[4][i].Index + "'><td>" + ArrayCalendario_Grid[4][i].IniVie + "</td><td>" + ArrayCalendario_Grid[4][i].FinVie + "</td></tr>";
        }
        html_Calendario += "</tbody></table></td>"; //Cerramos tabla Viernes
        //------------
        //Tabla Sábado
        html_Calendario += "<td id='ID_SabadoVer' align='left' > <table id='TSabadoVer' border='1' cellpadding='1' cellspacing='1' style='width: 100%'   ><thead><tr><th colspan='2' class='Grid_Head' >Sábado</th></tr><tr><th colspan='2' class='Grid_Head' >Hora</th></tr><tr><th>Inicial</th><th>Final</th></tr></thead><tbody>";
        //Sábado [5]
        for (i in ArrayCalendario_Grid[5]) {
            html_Calendario += "<tr id= 'TSabadoVer_" + ArrayCalendario_Grid[5][i].Index + "'><td>" + ArrayCalendario_Grid[5][i].IniSab + "</td><td>" + ArrayCalendario_Grid[5][i].FinSab + "</td></tr>";
        }
        html_Calendario += "</tbody></table></td>"; //Cerramos tabla Sábado
        //------------
        //Tabla Domingo
        html_Calendario += "<td id='ID_DomingoVer' align='left' > <table id='TDomingoVer' border='1' cellpadding='1' cellspacing='1' style='width: 100%'   ><thead><tr><th colspan='2' class='Grid_Head' >Domingo</th></tr><tr><th colspan='2' class='Grid_Head' >Hora</th></tr><tr><th class='Grid_Head'>Inicial</th><th class='Grid_Head'>Final</th></tr></thead><tbody>";
        //Domingo [6]
        for (i in ArrayCalendario_Grid[6]) {
            html_Calendario += "<tr id= 'TDomingoVer_" + ArrayCalendario_Grid[6][i].Index + "'><td>" + ArrayCalendario_Grid[6][i].IniDom + "</td><td>" + ArrayCalendario_Grid[6][i].FinDom + "</td></tr>";
        }
        html_Calendario += "</tbody></table></td>"; //Cerramos tabla Domingo


        html_Calendario += "</tr></tbody></table>";//Cerramos tabla principal

        
        $("#Div_Ver").html(html_Calendario);

        //
        $("#TLunesVer").dataTable({
            "bPaginate": false,
            "bFilter": false,
            "bInfo": false,
            "paging": false,
            "ordering": false,
            "info": false,
            "bJQueryUI": true,
            "iDisplayLength": 1000,
            "bDestroy": true
        });
        //
        $("#TMartesVer").dataTable({
            "bPaginate": false,
            "bFilter": false,
            "bInfo": false,
            "paging": false,
            "ordering": false,
            "info": false,
            "bJQueryUI": true,
            "iDisplayLength": 1000,
            "bDestroy": true
        });
        //
        $("#TMiercolesVer").dataTable({
            "bPaginate": false,
            "bFilter": false,
            "bInfo": false,
            "paging": false,
            "ordering": false,
            "info": false,
            "bJQueryUI": true,
            "iDisplayLength": 1000,
            "bDestroy": true
        });
        //
        $("#TJuevesVer").dataTable({
            "bPaginate": false,
            "bFilter": false,
            "bInfo": false,
            "paging": false,
            "ordering": false,
            "info": false,
            "bJQueryUI": true,
            "iDisplayLength": 1000,
            "bDestroy": true
        });
        //
        $("#TViernesVer").dataTable({
            "bPaginate": false,
            "bFilter": false,
            "bInfo": false,
            "paging": false,
            "ordering": false,
            "info": false,
            "bJQueryUI": true,
            "iDisplayLength": 1000,
            "bDestroy": true
        });
        //
        $("#TSabadoVer").dataTable({
            "bPaginate": false,
            "bFilter": false,
            "bInfo": false,
            "paging": false,
            "ordering": false,
            "info": false,
            "bJQueryUI": true,
            "iDisplayLength": 1000,
            "bDestroy": true
        });
        //
        $("#TDomingoVer").dataTable({
            "bPaginate": false,
            "bFilter": false,
            "bInfo": false,
            "paging": false,
            "ordering": false,
            "info": false,
            "bJQueryUI": true,
            "iDisplayLength": 1000,
            "bDestroy": true
        });

        $("#Div_Ver").css("display", "inline-table"); //Tabla que dibuja el grid con las horas ya capturadas
    } catch (e) {
        Mensaje_General("Error - No se logró dibujar tabla", "Lo sentimos, ocurrió un error y no se logró dibujar la tabla con los horarios ingresados, favor verifique los datos.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario.TGridCalendar_Ver):\n" + e));
    }
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                     PROCESOS DE CHANGES                                                                                                                                    ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//Proceso de Change para el NIT Empresa
function Change_Select_Nit() {
    $("#Select_EmpresaNit").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_EmpresaNit").val() == "-1") {
            $("#Img1").css("display", "inline-table");
            $("#Txt_ID").val("");
            $("#Txt_ID").prop('disabled', true);
            $("#TxtDescription").val("");
            $("#TxtDescription").prop('disabled', true);
            VerifyTextID(""); //Decir que se borró todo
            VerifyTextDescription(""); //Para decir que borramos todo
        } else {
            $("#Img1").css("display", "none");
            $("#Txt_ID").prop('disabled', false);
        }
    });
}

//Proceso de Change para el Tipo Calendario
function Change_TipoCalendario() {
    $("#Select_TipoCalendario").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_TipoCalendario").val() == "-1") {
            $("#Img5").css("display", "inline-table");
            $("#Tabla_10").css("display", "none");
            $(".Table_Header_Block").css("display", "none"); //Table que contiene el capturador de horas
            $(".container_TGrid_Create").css("display", "none");
        } else {
            ClearArraySemana();
            $("#Img5").css("display", "none");
            $(".Table_Header_Block").css("display", "inline-table"); //Table que contiene el capturador de horas
            $("#TxtF_Start").val("");
            $("#TxtF_End").val("");
            $(".container_TGrid_Create").css("display", "none");
            index_ID = $(this).val();
            switch (index_ID) {
                case "1":
                    $("#Tabla_10").css("display", "none");
                    validaTipoCalendario = true;
                    break;

                case "2":
                    validaTipoCalendario = false;
                    Mensaje_General("Calendarios Progresivos", "Lo sentimos, por el momento, si desea crear un calendario progresivo debe utilizar la opción disponible en el menú principal.", "W");
                    $(".Table_Header_Block").css("display", "none"); //Table que contiene el capturador de horas
                    $(".container_TGrid_Create").css("display", "none");
                    //$("#Tabla_10").css("display", "inline-table");
                    break;
            }
        }
    });
}

//Función que recibe por parametro el choosen del estado de cada día para hacer los cambios respectivos
function Change_StateDay(Obj) {
    $("#" + Obj).change(function () {
        //Validamos si no va a ser laboral y bloqueamos las horas de ese día
        if ($(this).val() == "S") {
            switch (Obj) {
                case "Select_StateLun":
                    $("#TxtIniLun").prop('disabled', true);
                    $("#TxtFinLun").prop('disabled', true);
                    $("#TxtIniLun").val("");
                    $("#TxtFinLun").val("");
                    WorkMonday = false;
                    break;
                case "Select_StateMar":
                    $("#TxtIniMar").prop('disabled', true);
                    $("#TxtFinMar").prop('disabled', true);
                    $("#TxtIniMar").val("");
                    $("#TxtFinMar").val("");
                    WorkTuesday = false;
                    break;
                case "Select_StateMie":
                    $("#TxtIniMie").prop('disabled', true);
                    $("#TxtFinMie").prop('disabled', true);
                    $("#TxtIniMie").val("");
                    $("#TxtFinMie").val("");
                    WorkWednesday = false;
                    break;
                case "Select_StateJue":
                    $("#TxtIniJue").prop('disabled', true);
                    $("#TxtFinJue").prop('disabled', true);
                    $("#TxtIniJue").val("");
                    $("#TxtFinJue").val("");
                    WorkThursday = false;
                    break;
                case "Select_StateVie":
                    $("#TxtIniVie").prop('disabled', true);
                    $("#TxtFinVie").prop('disabled', true);
                    $("#TxtIniVie").val("");
                    $("#TxtFinVie").val("");
                    WorkFriday = false;
                    break;
                case "Select_StateSab":
                    $("#TxtIniSab").prop('disabled', true);
                    $("#TxtFinSab").prop('disabled', true);
                    $("#TxtIniSab").val("");
                    $("#TxtFinSab").val("");
                    WorkSaturday = false;
                    break;
                case "Select_StateDom":
                    $("#TxtIniDom").prop('disabled', true);
                    $("#TxtFinDom").prop('disabled', true);
                    $("#TxtIniDom").val("");
                    $("#TxtFinDom").val("");
                    WorkSunday = false;
                    break;
                case "Select_Festivo":
                    WorkFestivo = false;
                    break;


            }
            //Sino desbloqueamos si antes se habia bloqueado y cambiamos la variable
        } else if ($(this).val() == "N") {
            switch (Obj) {
                case "Select_StateLun":
                    $("#TxtIniLun").prop('disabled', false);
                    $("#TxtFinLun").prop('disabled', false);
                    $("#TxtIniLun").val("");
                    $("#TxtFinLun").val("");
                    WorkMonday = true;
                    break;
                case "Select_StateMar":
                    $("#TxtIniMar").prop('disabled', false);
                    $("#TxtFinMar").prop('disabled', false);
                    $("#TxtIniMar").val("");
                    $("#TxtFinMar").val("");
                    WorkTuesday = true;
                    break;
                case "Select_StateMie":
                    $("#TxtIniMie").prop('disabled', false);
                    $("#TxtFinMie").prop('disabled', false);
                    $("#TxtIniMie").val("");
                    $("#TxtFinMie").val("");
                    WorkWednesday = true;
                    break;
                case "Select_StateJue":
                    $("#TxtIniJue").prop('disabled', false);
                    $("#TxtFinJue").prop('disabled', false);
                    $("#TxtIniJue").val("");
                    $("#TxtFinJue").val("");
                    WorkThursday = true;
                    break;
                case "Select_StateVie":
                    $("#TxtIniVie").prop('disabled', false);
                    $("#TxtFinVie").prop('disabled', false);
                    $("#TxtIniVie").val("");
                    $("#TxtFinVie").val("");
                    WorkFriday = true;
                    break;
                case "Select_StateSab":
                    $("#TxtIniSab").prop('disabled', false);
                    $("#TxtFinSab").prop('disabled', false);
                    $("#TxtIniSab").val("");
                    $("#TxtFinSab").val("");
                    WorkSaturday = true;
                    break;
                case "Select_StateDom":
                    $("#TxtIniDom").prop('disabled', false);
                    $("#TxtFinDom").prop('disabled', false);
                    $("#TxtIniDom").val("");
                    $("#TxtFinDom").val("");
                    WorkSunday = true;
                    break;
                case "Select_Festivo":
                    WorkFestivo = true;
                    break;
            }
        }
    });
}
