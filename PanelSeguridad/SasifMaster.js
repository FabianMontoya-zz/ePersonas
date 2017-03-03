/*--------------- region de variables globales --------------------*/
//capturamos la url
var URLPage = window.location.search.substring(1);
var URLVariables = URLPage.split('&');

var User;
var Link;
var Encrip;
var g_NitEmpresa_User;
var NameTemporal;
var Doc_name;
var Mensaje_NO_Permitido = "";

var Control_Work;
var Suma_Valor_Inicial = 0;

var Matrix_Mes = [];
Matrix_Mes[0] = [1, "Enero", 31];
Matrix_Mes[1] = [2, "Febrero", 28];
Matrix_Mes[2] = [3, "Marzo", 31];
Matrix_Mes[3] = [4, "Abril", 30];
Matrix_Mes[4] = [5, "Mayo", 31];
Matrix_Mes[5] = [6, "Junio", 30];
Matrix_Mes[6] = [7, "Julio", 31];
Matrix_Mes[7] = [8, "Agosto", 31];
Matrix_Mes[8] = [9, "Septiembre", 30];
Matrix_Mes[9] = [10, "Octubre", 31];
Matrix_Mes[10] = [11, "Noviembre", 30];
Matrix_Mes[11] = [12, "Diciembre", 31];
/*--------------- region de variables globales --------------------*/

$(document).ready(function () {
    clearConsole();

    fecha();

    $(".C_Chosen").chosen({
        width: "100%",
        placeholder: 'Select an option',
        search_contains: true
    });

    $('.Numeric').keyup(function () {
        this.value = (this.value + '').replace(/[^0-9]/g, '');
    });

    $('.Decimal').keyup(function () {
        this.value = (this.value + '').replace(/[^0-9\.]/g, '');
    });

    $('.Letter').keyup(function () {
        this.value = (this.value + '').replace(/[^a-zA-Z\s\ñ\Ñ\ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç]+/g, '');
    });

    $('.Numeric_letter_Especial').keyup(function () {
        this.value = (this.value + '').replace(/[^0-9a-zA-Z\ñ\Ñ\ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç]/g, '');
    });

    $('.Numeric_letter').keyup(function () {
        this.value = (this.value + '').replace(/[^0-9a-zA-Z]/g, '');
    });

    $('.Hours').focus(function () {
        this.value = "";
    });

    ready();
    
});

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                 BOTONES GLOBALES                                                                                                            ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//Bandera que usamos para indicar por consola que todo se completó correctamente
function ready() {

    var Digital = new Date();

    var Day = Digital.getDate();
    var Month = Digital.getMonth();
    var Year = Digital.getFullYear();

    if (Day <= 9) {
        Day = "0" + Day;
    }

    var hours = Digital.getHours();
    var minutes = Digital.getMinutes();
    var seconds = Digital.getSeconds();


    if (hours <= 9){
        hours = "0" + hours;}
    if (minutes <= 9){
        minutes = "0" + minutes;}
    if (seconds <= 9){
        seconds = "0" + seconds;}

    setTimeout(console.log.bind(console, "" + Day + "/" + Matrix_Mes[Month][1] + "/" + Year + " " + hours + ":" + minutes + ":" + seconds + "")); //No muestra la ruta donde se genera el console
    setTimeout(console.log.bind(console, "%cAll is ready, enjoy!", "color: #b70d0d; font-size: x-large")); //No muestra la ruta donde se genera el console
    setTimeout(console.log.bind(console, "%cDesarrollado por SASIF® 2016. Todos los derechos reservados.\nContacto sistemas@sasif.com.co | Bogotá D.C. - Colombia \n© SASIF S.A.S. "+ Year + "", "color: #b70d0d; font-size: x"));

    Reload();    
}

/*Función que recarga la página y exige que se traigan los nuevos cambios desde el servidor*/
/*Funciona solamente cuando se cierra y nuevamente se abre el navegador*/
function Reload() {
    /*
     * Obtenemos la última parte de la URL. Por ejemplo, en una URL como:
     * https://unadireccion.com/blog
     * se obtendrá 'blog'
    */
    (function () {
        let page = location.href.substring(location.href.lastIndexOf('/') + 1);
        let isRedirected = sessionStorage.getItem(page); //Variable por sesión de navegador

        if (!isRedirected) {
            sessionStorage.setItem(page, true);
            window.location.reload(true);
        }
    })();      
}

////Función que borra el log generado en la consola según el navegador
function clearConsole() {
    if (typeof console._commandLineAPI !== 'undefined') {
        console.API = console._commandLineAPI;
    } else if (typeof console._inspectorCommandLineAPI !== 'undefined') {
        console.API = console._inspectorCommandLineAPI;
    } else if (typeof console.clear !== 'undefined') {
        console.API = console;
    }
    if (console.API) {
        setTimeout(console.API.clear.bind(console)); //No muestra la ruta donde se genera el console        
    }
    setTimeout(console.clear.bind());
}

//salida del formulario
function btnSalir() {

    switch (Link) {
        case "O_CLIENTE": //cliente
            //transacionAjax_EraseDocument('EraseDocument');
            break;
        case "P_AUTODOC": //autorizacion documentos
            //transacionAjax_EraseDocument('EraseDocument');
            break;
    }

    window.location = "../../Menu/menu.aspx?User=" + $("#User").html() + "&Key=" + ArrayMenu[0].Nit + "&LINK=" + Link;
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                 INICIO DE PROCESOS                                                                                                            ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//capturar el link y usuario para el proceso
function ConsultaParametrosURL() {
    if (URLVariables.length <= 2) {
        User = URLVariables[0].replace("User=", "");
        Encrip = URLVariables[1].replace("Key=", "");
    }
    else {
        User = URLVariables[0].replace("User=", "");
        Encrip = URLVariables[1].replace("Key=", "");
        Link = URLVariables[2].replace("LINK=", "");
    }

    $("#User").html(User.toUpperCase());

    return User;
}

//integra los mensajes de error en la pagina
function RevisarMensajes() {
    $(".SpamEG").html(ArrayMensajes[0].Mensajes_ID + ": " + ArrayMensajes[0].Descripcion);
    $(".SpamEC").html(ArrayMensajes[1].Mensajes_ID + ": " + ArrayMensajes[1].Descripcion);
    $(".SpamEFY").html(ArrayMensajes[2].Mensajes_ID + ": " + ArrayMensajes[2].Descripcion);
    $(".SpamEFM").html(ArrayMensajes[3].Mensajes_ID + ": " + ArrayMensajes[3].Descripcion);
    $(".SpamEGOP").html(ArrayMensajes[9].Mensajes_ID + ": " + ArrayMensajes[9].Descripcion);
}

//integra las Ayudas en la pagina
function RevisarAyudas() {
    $(".Spam_AN").html(ArrayAyudas[0].Ayudas_ID + ": " + ArrayAyudas[0].Descripcion);
    $(".Spam_ANL").html(ArrayAyudas[1].Ayudas_ID + ": " + ArrayAyudas[1].Descripcion);
    $(".Spam_AST").html(ArrayAyudas[2].Ayudas_ID + ": " + ArrayAyudas[2].Descripcion);
    $(".Spam_A_CC").html(ArrayAyudas[3].Ayudas_ID + ": " + ArrayAyudas[3].Descripcion);
    $(".Spam_A_NIT").html(ArrayAyudas[4].Ayudas_ID + ": " + ArrayAyudas[4].Descripcion);

    $(".Spam_ACE_mail").html(ArrayAyudas[5].Ayudas_ID + ": " + ArrayAyudas[5].Descripcion);
    $(".Spam_AT1").html(ArrayAyudas[6].Ayudas_ID + ": " + ArrayAyudas[6].Descripcion);
    $(".Spam_AT2").html(ArrayAyudas[7].Ayudas_ID + ": " + ArrayAyudas[7].Descripcion);
    $(".Spam_ACI").html(ArrayAyudas[8].Ayudas_ID + ": " + ArrayAyudas[8].Descripcion);
    $(".Spam_AT3").html(ArrayAyudas[9].Ayudas_ID + ": " + ArrayAyudas[9].Descripcion);

    $(".Spam_AF").html(ArrayAyudas[10].Ayudas_ID + ": " + ArrayAyudas[10].Descripcion);
    $(".Spam_ADec").html(ArrayAyudas[11].Ayudas_ID + ": " + ArrayAyudas[11].Descripcion);
    $(".Spam_AVal").html(ArrayAyudas[12].Ayudas_ID + ": " + ArrayAyudas[12].Descripcion);
    $(".Spam_AForF").html(ArrayAyudas[13].Ayudas_ID + ": " + ArrayAyudas[13].Descripcion);
    $(".Spam_AH").html(ArrayAyudas[14].Ayudas_ID + ": " + ArrayAyudas[14].Descripcion);

    $(".Spam_AEXIT_MOD").html(ArrayAyudas[15].Ayudas_ID + ": " + ArrayAyudas[15].Descripcion);
    $(".Spam_ALink").html(ArrayAyudas[16].Ayudas_ID + ": " + ArrayAyudas[16].Descripcion);
    $(".Spam_U").html(ArrayAyudas[17].Ayudas_ID + ": " + ArrayAyudas[17].Descripcion);
    $(".Spam_C").html(ArrayAyudas[18].Ayudas_ID + ": " + ArrayAyudas[18].Descripcion);
    $(".Spam_AT4").html(ArrayAyudas[19].Ayudas_ID + ": " + ArrayAyudas[19].Descripcion);

    $(".Spam_ACliente").html(ArrayAyudas[20].Ayudas_ID + ": " + ArrayAyudas[20].Descripcion);
    $(".Spam_AT5").html(ArrayAyudas[21].Ayudas_ID + ": " + ArrayAyudas[21].Descripcion);
    $(".Spam_ARel").html(ArrayAyudas[22].Ayudas_ID + ": " + ArrayAyudas[22].Descripcion);
    $(".SpamALEC").html(ArrayAyudas[23].Ayudas_ID + ": " + ArrayAyudas[23].Descripcion);
    $(".Spam_A_Addres").html(ArrayAyudas[24].Ayudas_ID + ": " + ArrayAyudas[24].Descripcion);

    $(".Spam_AWords").html(ArrayAyudas[25].Ayudas_ID + ": " + ArrayAyudas[25].Descripcion);

    $(".Spam_CT1").html(ArrayAyudas[6].Descripcion);
    $(".Spam_CT2").html(ArrayAyudas[7].Descripcion);
    $(".Spam_CT4").html(ArrayAyudas[19].Descripcion);
    $(".Spam_CT5").html(ArrayAyudas[21].Descripcion);
}

//llamado de mensajes
function Mensaje_General(Title, Msn, Type) {
    $("#dialog").dialog("open");
    $("#dialog").dialog("option", "title", Title);
    $("#Mensaje_alert").text(Msn);

    switch (Type) {
        case "E":
            $("#DE").css("display", "block");
            $("#SE").css("display", "none");
            $("#WA").css("display", "none");
            break;

        case "W":
            $("#DE").css("display", "none");
            $("#SE").css("display", "none");
            $("#WA").css("display", "block");
            break;

        case "S":
            $("#DE").css("display", "none");
            $("#SE").css("display", "block");
            $("#WA").css("display", "none");
            break;
    }
}

//escondemos los iconos obligatorios
function ResetError() {
    $("#ImgC_Doc").css("display", "none");
    $("#ImgMul").css("display", "none");
    $("#ImgPais").css("display", "none");
    $("#ImgID").css("display", "none");
    $("#Img1").css("display", "none");
    $("#Img2").css("display", "none");
    $("#Img3").css("display", "none");
    $("#Img5").css("display", "none");
    $("#Img9").css("display", "none");
    $("#Img10").css("display", "none");
    $("#Img11").css("display", "none");
    $("#Img12").css("display", "none");

    /*Errores Administración Adm_Usuario*/
    $("#ImgNIT").css("display", "none");
    $("#ImgID").css("display", "none");
    $("#ImgName").css("display", "none");
    $("#Img_TypeDoc").css("display", "none");
    $("#ImgDoc").css("display", "none");

    $("#ImgRol").css("display", "none");
    $("#ImgAccessInfo").css("display", "none");
    $("#ImgPolSeguGrupo").css("display", "none");
    $("#ImgPolSecurity").css("display", "none");
    $("#ImgAccesInfoDocument").css("display", "none");

    $("#ImgAccessDocuments").css("display", "none");
    $("#ImgGroupDocuments").css("display", "none");
    $("#ImgAccessInfoReports").css("display", "none");
    $("#ImgAccessReports").css("display", "none");
    $("#ImgGroupReport").css("display", "none");

    $("#ImgToken").css("display", "none");
    $("#ImgTypeAccess").css("display", "none");
    $("#ImgEstadoUser").css("display", "none");

    /*===FIN ERRORES ADMINSITRACIÓN Adm_Usuario ===*/
}

//Función que bloquea el retorno entre páginas
function No_Back_Button() {
    window.location.hash = "no-back-button";
    window.location.hash = "Again-No-back-button" //chrome    
    window.onhashchange = function () { window.location.hash = "no-back-button"; }

    document.onkeydown = mykeyhandler;

    function mykeyhandler(event) {

        //keyCode 116 = F5 
        //keyCode 122 = F11
        //keyCode 16 = Shift
        //keyCode 8 = Backspace
        //keyCode 37 = LEFT ROW
        //keyCode 78 = N
        //keyCode 39 = RIGHT ROW
        //keyCode 67 = C
        //keyCode 73 = I
        //keyCode 82 = R
        //keyCode 83 = S
        //keyCode 86 = V
        //keyCode 85 = U 
        //keyCode 87 = W 
        //keyCode 45 = Insert

        event = event || window.event;
        var tgt = event.target || event.srcElement;
        if ((event.altKey && event.keyCode == 37) || (event.altKey && event.keyCode == 39) ||
        (event.ctrlKey && event.keyCode == 78) || (event.ctrlKey && event.keyCode == 82) ||
        (event.ctrlKey && event.keyCode == 83) || (event.ctrlKey && event.keyCode == 85) ||
        (event.ctrlKey && event.keyCode == 45) || (event.shiftKey && event.keyCode == 45) ||
        (event.ctrlKey && event.keyCode == 87) || (event.ctrlKey && event.shiftKey && event.keyCode == 73)) {
            event.cancelBubble = true;
            event.returnValue = false;
            alert("¡Función no permitida!");
            return false;
        }

        if (event.keyCode == 18 && tgt.type != "text" && tgt.type != "password" && tgt.type != "textarea") {
            return false;
        }

        if (event.keyCode == 8 && tgt.type != "text" && tgt.type != "password" && tgt.type != "textarea") {
            return false;
        }

        if ((event.keyCode == 116) ||
            (event.keyCode == 123) || //Línea F12
            (event.keyCode == 122)) {
            if (navigator.appName == "Microsoft Internet Explorer") {
                window.event.keyCode = 0;
            }
            return false;
        }
    }

    function mouseDown(e) {
        var ctrlPressed = 0;
        var altPressed = 0;
        var shiftPressed = 0;
        if (parseInt(navigator.appVersion) > 3) {
            if (navigator.appName == "Netscape") {
                var mString = (e.modifiers + 32).toString(2).substring(3, 6);
                shiftPressed = (mString.charAt(0) == "1");
                ctrlPressed = (mString.charAt(1) == "1");
                altPressed = (mString.charAt(2) == "1");
                self.status = "modifiers=" + e.modifiers + " (" + mString + ")"
            }
            else {
                shiftPressed = event.shiftKey;
                altPressed = event.altKey;
                ctrlPressed = event.ctrlKey;
            }
            if (shiftPressed || altPressed || ctrlPressed)
                alert("Función no permitida");
        }
        return true;
    }

    if (parseInt(navigator.appVersion) > 3) {
        document.onmousedown = mouseDown;
        if (navigator.appName == "Netscape")
            document.captureEvents(Event.MOUSEDOWN);
    }

    var message = "";

    function clickIE() {
        if (document.all) {
            (message);
            return false;
        }
    }

    function clickNS(e) {
        if (document.layers || (document.getElementById && !document.all)) {
            if (e.which == 2 || e.which == 3) {
                (message); return false;
            }
        }
    }

    if (document.layers) {
        document.captureEvents(Event.MOUSEDOWN);
        document.onmousedown = clickNS;
    } else {
        document.onmouseup = clickNS; document.oncontextmenu = clickIE;

    }

    document.oncontextmenu = new Function("return false");
    
}

//funcion para control de carga
function Load_Charge_Sasif() {

    var w = $(window).width();
    var h = $(window).height();

    $("#Dialog_Control").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Control_Sasif",
        modal: true,
        width: w,
        height: h,
        overlay: {
            opacity: 0.5,
            background: "black"
        },
        show: {
            effect: 'fade',
            duration: 1000
        },
        hide: {
            effect: 'fade',
            duration: 200
        }
    });
}

//Abre control de carga
function OpenControl() {
    $('#Dialog_Control').hide()
             .ajaxStart(function () {
                 $(this).show();
             })
             .ajaxStop(function () {
                 CloseControl();
             });

    $("#Dialog_Control").dialog("open");
    $("#Dialog_Control").dialog("option", "title", "");
}

//Cierra el Control de Carga
function CloseControl() {
    $("#Dialog_Control").dialog("close");
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                             VALIDACIONES FECHAS Y HORAS                                                                                                            ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//funcion para capturar la fecha
function fecha() {

    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();

    var output = d.getFullYear() + '-' +
    (('' + month).length < 2 ? '0' : '') + month + '-' +
    (('' + day).length < 2 ? '0' : '') + day;
    $("#Hours").html(output);

}

//Valida que la fecha inicial y final sean coherentes
function validate_fechaMayorQue(fechaInicial, fechaFinal, Type) {

    var Resultado;
    var valuesStart;
    var valuesEnd;
    var dateStart;
    var dateEnd;

    switch (Type) {

        case "SystemCompare":
            var SysFecha = new Date();
            var Fecha_System = SysFecha.getDate() + "-" + (SysFecha.getMonth() + 1) + "-" + SysFecha.getFullYear();
            valuesStart = fechaInicial.split("-");
            valuesEnd = Fecha_System.split("-");

            dateStart = new Date(valuesStart[0], (valuesStart[1] - 1), valuesStart[2]);
            dateEnd = new Date(valuesEnd[2], (valuesEnd[1] - 1), valuesEnd[0]);

            if (dateStart >= dateEnd)
                Resultado = "Menor";
            else
                Resultado = "Mayor";
            break;

        case "DefaultCompare":
            valuesStart = fechaInicial.split("-");
            valuesEnd = fechaFinal.split("-");

            // Verificamos que la fecha no sea posterior a la actual
            dateStart = new Date(valuesStart[0], (valuesStart[1] - 1), valuesStart[2]);
            dateEnd = new Date(valuesEnd[0], (valuesEnd[1] - 1), valuesEnd[2]);
            if (dateStart >= dateEnd)
                Resultado = "Menor";
            else
                Resultado = "Mayor";
            break;

    }
    return Resultado;
}

//valida las hora inicial y final que sean coherentes
function Validahora(V_HoraInicial, V_HoraFinal) {

    var A_V_HoraInicial = V_HoraInicial.split(":");
    var A_V_HoraFinal = V_HoraFinal.split(":");
    var Valida = 0;

    if (parseInt(A_V_HoraInicial[0]) > parseInt(A_V_HoraFinal[0])) {
        Valida = 1;
    }

    if (parseInt(A_V_HoraInicial[0]) == parseInt(A_V_HoraFinal[0])) {
        if (parseInt(A_V_HoraInicial[1]) > parseInt(A_V_HoraFinal[1])) {
            Valida = 1;
        }
    }

    if (V_HoraInicial == "")
        Valida = 2;

    if (V_HoraFinal == "")
        Valida = 2;

    return Valida;
}

//VALIDAR FORMATO DE LA FECHA PARA LOS GRID
function valFecha(str) {
    var Result;

    if (str == '1900-01-01')
        Result = "";
    else
        Result = str;
    return Result;
}

// Función que suma o resta días a la fecha indicada
sumaFecha = function (d, fecha) {
    var Fecha = new Date();
    var sFecha = fecha || (Fecha.getDate() + "/" + (Fecha.getMonth() + 1) + "/" + Fecha.getFullYear());
    var sep = sFecha.indexOf('/') != -1 ? '/' : '-';
    var aFecha = sFecha.split(sep);
    var fecha = aFecha[2] + '/' + aFecha[1] + '/' + aFecha[0];
    fecha = new Date(fecha);
    fecha.setDate(fecha.getDate() + parseInt(d));
    var anno = fecha.getFullYear();
    var mes = fecha.getMonth() + 1;
    var dia = fecha.getDate();
    mes = (mes < 10) ? ("0" + mes) : mes;
    dia = (dia < 10) ? ("0" + dia) : dia;
    var fechaFinal = dia + sep + mes + sep + anno;
    return (fechaFinal);
}

//validamos año bisiesto
function Valida_Bisiesto(Year) {

    var valida = "N";

    var R_4 = parseInt(Year) % 4;
    var R_100 = parseInt(Year) % 100;
    var M_100 = R_100 % 4;

    var R_400 = parseInt(Year) % 400;
    var M_400 = R_400 % 4;

    if (R_4 == 0) {
        if (M_100 == 0) {
            if (M_400 == 0) {
                valida = "Y";
            }
        }
    }
    return valida;
}

//validar fecha  digitada
function ValidaFechaDigitada(ObjText) {
    //colocamos mascara
    $("#" + ObjText).val("YYYY-MM-DD");
    $("#" + ObjText).css("color", "#921919")
    //limpiamos mascara
    $("#" + ObjText).focus(function () {
        $("#" + ObjText).val("");
        $("#" + ObjText).css("color", "#000000")
    });

    $("#" + ObjText).blur(function () {
        var Strfecha = $("#" + ObjText).val();
        var PrimerGuion = Strfecha.charAt(4);
        var SegundoGuion = Strfecha.charAt(7);

        var SysFecha = new Date();
        var Year_System = parseInt(SysFecha.getFullYear()) - 0;

        if (SegundoGuion == "-" && PrimerGuion == "-") {
            var A_FN = Strfecha.split("-");
            //validar año
            if ((parseInt(A_FN[0]) > 1900)) {
                if ((parseInt(A_FN[0]) < Year_System)) {
                    //validar mes
                    if ((parseInt(A_FN[1]) > 0)) {
                        if ((parseInt(A_FN[1]) < 13)) {
                            //primero validamos bisiesto
                            var bisiesto = Valida_Bisiesto(A_FN[0]);
                            var busca_Mes = parseInt(A_FN[1]) - 1;
                            var Diafinal = Matrix_Mes[busca_Mes][2];
                            if ((bisiesto == "Y") && (parseInt(A_FN[1]) == 2)) { Diafinal = 29; }
                            //validar mes dia
                            if ((parseInt(A_FN[2]) > 0)) {
                                if ((parseInt(A_FN[2]) < Diafinal)) {

                                }
                                else {
                                    Mensaje_General("¡Formato incorrecto!", "El Dia debe ser entre 1 y " + Diafinal, "W");
                                    $("#" + ObjText).val("YYYY-MM-DD");
                                    $("#" + ObjText).css("color", "#921919")
                                }
                            }
                            else {
                                Mensaje_General("¡Formato incorrecto!", "El Dia debe ser entre 1 y " + Diafinal, "W");
                                $("#" + ObjText).val("YYYY-MM-DD");
                                $("#" + ObjText).css("color", "#921919")
                            }
                        }
                        else {
                            Mensaje_General("¡Formato incorrecto!", "El Mes debe ser entre 1 y 12 ", "W");
                            $("#" + ObjText).val("YYYY-MM-DD");
                            $("#" + ObjText).css("color", "#921919")
                        }
                    }
                    else {
                        Mensaje_General("¡Formato incorrecto!", "El Mes debe ser entre 1 y 12 ", "W");
                        $("#" + ObjText).val("YYYY-MM-DD");
                        $("#" + ObjText).css("color", "#921919")
                    }
                }
                else {
                    Mensaje_General("Formato incorrecto!", "El año debe ser entre 1900 y " + Year_System, "W");
                    $("#" + ObjText).val("YYYY-MM-DD");
                    $("#" + ObjText).css("color", "#921919")
                }
            }
            else {
                Mensaje_General("Formato incorrecto!", "El año debe ser entre 1900 y " + Year_System, "W");
                $("#" + ObjText).val("YYYY-MM-DD");
                $("#" + ObjText).css("color", "#921919")
            }
        }
        else {
            Mensaje_General("Formato incorrecto!", "La fecha debe ser YYYY-MM-DD ", "W");
            $("#" + ObjText).val("YYYY-MM-DD");
            $("#" + ObjText).css("color", "#921919")
        }
    });
}

//Función que agrega el rango a solo fechas a futuro de la fecha seleccionada en un picker anterior
function Change_Compara_Fecha(Selector1, Selector2) {
    //Crea Jhon
    //Selector1 es el picker padre (Que envia el rango)
    //Selector2 es el picker que hereda el rango y se bloquea

    $("#" + Selector1 + "").change(function () {
        $("#" + Selector2 + "").val("");
        var rango = $("#" + Selector1 + "").val();

        $("#" + Selector2 + "").datepicker("option", "disabled", false);
        $("#" + Selector2 + "").datepicker("option", "minDate", rango);
    });

}

//Función que agrega el rango a solo fechas a pasado de la fecha seleccionada en un picker anterior
function Change_Compara_Fecha_Menor(Selector1, Selector2) {
    //Crea Jhon
    //Selector1 es el picker padre (Que envia el rango)
    //Selector2 es el picker que hereda el rango y se bloquea

    $("#" + Selector1 + "").change(function () {
        $("#" + Selector2 + "").val("");
        var rango = $("#" + Selector1 + "").val();

        $("#" + Selector2 + "").datepicker("option", "disabled", false);
        $("#" + Selector2 + "").datepicker("option", "maxDate", rango);
    });

}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                             VALIDACIONES DE CAMPOS Y NUMERICOS                                                                                         ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//formato de miles en tiempo real
function dinner_format(input) {
    var valida = 0;
    var num = input.value.replace(/\./g, "");
    if (!isNaN(num)) {
        num = num.toString().split("").reverse().join("").replace(/(?=\d*\.?)(\d{3})/g, "$1.");
        num = num.split("").reverse().join("").replace(/^[\.]/, "");
        input.value = num;
    }
    else {
        valida = 1;
        input.value = input.value.replace(/[^\d\.]*/g, "");
    }
    return valida;
}

//funcion para añadir formato miles a los numeros en la vista
function dinner_format_grid(str, type) {

    var output = "";

    if (str != 0) {
        var amount = new String(str);
        amount = amount.split("").reverse();

        for (var i = 0; i <= amount.length - 1; i++) {
            output = amount[i] + output;
            if ((i + 1) % 3 == 0 && (amount.length - 1) !== i) output = '.' + output;
        }

        if (type == "1")
            output = "$ " + output;
    }

    return output;
}

//funcion que calcula el digito de verificacion
function DigitoVerificacion(StrValor) {

    if (StrValor != "") {

        var Vector = [];
        var DigitoVerificado = 0;
        var Temp = 0;
        var Length_Document = StrValor.length;

        Vector[1] = 3;
        Vector[2] = 7;
        Vector[3] = 13;
        Vector[4] = 17;
        Vector[5] = 19;
        Vector[6] = 23;
        Vector[7] = 29;
        Vector[8] = 37;
        Vector[9] = 41;
        Vector[10] = 43;
        Vector[11] = 47;
        Vector[12] = 53;
        Vector[13] = 59;
        Vector[14] = 67;
        Vector[15] = 71;

        for (var contador = 0; contador < Length_Document; contador++) {
            Temp = (StrValor.substr(contador, 1));
            DigitoVerificado += (Temp * Vector[Length_Document - contador]);
        }

        Temp = DigitoVerificado % 11;

        return (Temp > 1) ? 11 - Temp : Temp;
    }
}

//validar E-Mail
function ValidarEmail(email) {
    var validate = 0;
    var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!expr.test(email))
        validate = 1;

    return validate;
}

//funcion de formateo para la insercion en la Base de Datos
function F_NumericBD(Index) {

    var Output = 0;

    if (Index != "") {
        Output = Index.replace(/\./g, "");
    }

    return Output;
}

//convierte numero para ingresar el decimal exacto en la BD
function Convert_Decimal(index) {

    var Output = 0;
    if (index != "") {
        Output = index.replace(".", ",");
    }
    return Output;
}

//validar la longitud del campo number
function maxLengthTypeNumber(object) {
    if (object.value.length > object.maxLength)
        object.value = object.value.slice(0, object.maxLength)
}

//validar la longitud de 4 decimales
function Restric_long_decimal(object) {

    $("#" + object).blur(function () {

        var ValStr = $('#' + object).val();
        var A_Decimal = ValStr.split(".");

        var valida = 0;

        if (A_Decimal.length == 1)
            valida = 1;
        else {
            if (A_Decimal.length == 2) {
                if (A_Decimal[1].length == 4)
                    valida = 0;
                else
                    valida = 1;
            }
        }
        //validamos formato y mensaje
        if (valida == 1) {
            Mensaje_General("¡Formato Incorrecto!", "El campo debe diligenciarse con el formato xx.xxxx, por ejemplo: 12.3456", "E");
            $("#" + object).val("");
        }
    });
}

//validacion de campo porcentajes
function ValidaPorcentaje(Objeto, Limite) {
    $("#" + Objeto).blur(function () {

        var P_Numero = $("#" + Objeto).val();

        if (parseInt(P_Numero) > parseInt(Limite)) {
            Mensaje_General("Porcentaje Invalido!", "El porcentaje no debe se mayor a " + Limite, "W");
            $("#" + Objeto).val("");
            $("#" + Objeto).focus();
        }
    });
}

//validacion de 0 en los grid o vista
function Convert_Valores_0(index) {
    var Output = "";

    if (index != 0)
        Output = index;
    return Output;
}
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                             FUNCIONES PARA CARGA DE DROP LIST                                                                                               ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//cargar combos
function charge_CatalogList(objCatalog, nameList, selector) {

    $("#" + nameList).empty();
    var objList = $('[id$=' + nameList + ']');

    //recorremos para llenar el combo de
    for (itemArray in objCatalog) {
        objList[0].options[itemArray] = new Option(objCatalog[itemArray].descripcion, objCatalog[itemArray].ID); /*Muestra el Combo solo con [Descripción]*/
        //objList[0].options[itemArray] = new Option(objCatalog[itemArray].ID + " - " + objCatalog[itemArray].descripcion, objCatalog[itemArray].ID); /*Muestra el Combo en orden [ID - Descripción]*/
    };

    //validamos si el combo lleva seleccione y posicionamos en el
    switch (selector) {
        case 1:
            $("#" + nameList).append("<option value='-1'>Seleccione...</option>");
            $("#" + nameList + " option[value= '-1'] ").attr("selected", true);
            break;

        case "Generico":
            $("#" + nameList).append("<option value='0'> 0 - Genérico</option>");
            $("#" + nameList).append("<option value='-1'>Seleccione...</option>");
            $("#" + nameList + " option[value= '-1'] ").attr("selected", true);
            break;
    }

    $("#" + nameList).trigger("liszt:updated");
    $('.C_Chosen').trigger('chosen:updated');
}

//carga los combps dependiendo del nit
function Charge_Combos_Depend_Verificacion(Matrix, Selector, P_1, P_2, Index_Edit) {

    $('#' + Selector).empty();
    var objList = $("[id$='" + Selector + "']");

    switch (Selector) {
        case "Select_Doc_Verif":
            for (Item in Matrix) {
                if (Matrix[Item].Nit_ID == P_1 && Matrix[Item].Doc_ID == P_2) {
                    $("#" + Selector).append("<option value='" + Matrix[Item].Doc_ID_Verif + "'>" + Matrix[Item].Doc_ID_Verif + " - " + Matrix[Item].DescripDoc_Verif + "</option>");
                }
            }
            break;

        case "Select_LineaF":
            for (Item in Matrix) {
                $("#" + Selector).append("<option value='" + Matrix[Item].Index + "'>" + Matrix[Item].Linea + " C.C. " + Matrix[Item].Cilindraje + "</option>");
            }
            break;
    }

    $('#' + Selector).append("<option value='-1'>Seleccione...</option>");

    if (Index_Edit == "")
        $("#" + Selector + " option[value= '-1'] ").attr("selected", true);
    else
        $("#" + Selector + " option[value= '" + Index_Edit + "'] ").attr("selected", true);

    $("#" + Selector).trigger("liszt:updated");
    $('.C_Chosen').trigger('chosen:updated');

}

//carga los combps dependiendo del nit sirve genericamente para toda carga
function Charge_Combos_Depend_Nit(Matrix, Selector, Nit, Index_Edit) {

    $('#' + Selector).empty();
    var objList = $("[id$='" + Selector + "']");

    switch (Selector) {

        case "Select_Politica":
            for (Item in Matrix) {
                $("#" + Selector).append("<option value='" + Matrix[Item].ID + "'>" + Matrix[Item].descripcion + "</option>");
            }

        case "Select_Area":
            for (Item in Matrix) {
                if (Matrix[Item].Nit_ID == Nit) {
                    $("#" + Selector).append("<option value='" + Matrix[Item].Area_ID + "'>" + Matrix[Item].Descripcion + "</option>");
                }
            }
            break;

        case "Select_Cargo":
            for (Item in Matrix) {
                if (Matrix[Item].Nit_ID == Nit) {
                    $("#" + Selector).append("<option value='" + Matrix[Item].Cargo_ID + "'>" + Matrix[Item].Descripcion + "</option>");
                }
            }
            break;

        case "Select_Jefe":
            for (Item in Matrix) {
                if (Matrix[Item].Nit_ID == Nit) {
                    $("#" + Selector).append("<option value='" + Matrix[Item].Document_ID + "'>" + Matrix[Item].Nombre + "</option>");
                }
            }
            break;

        case "Select_GrpDocument":
            for (Item in Matrix) {
                if (Matrix[Item].Nit_ID == Nit) {
                    $("#" + Selector).append("<option value='" + Matrix[Item].Document_ID + "'>" + Matrix[Item].namefile + "</option>");
                }
            }
            break;

        case "Select_RutaDocumento":
            for (Item in Matrix) {
                if (Matrix[Item].Nit_ID == Nit) {
                    $("#" + Selector).append("<option value='" + Matrix[Item].RutaDocumentos_ID + "'>" + Matrix[Item].Ruta + "</option>");
                }
            }
            break;

        case "Select_RutaPlantilla":
            for (Item in Matrix) {
                if (Matrix[Item].Nit_ID == Nit) {
                    $("#" + Selector).append("<option value='" + Matrix[Item].RutaDocumentos_ID + "'>" + Matrix[Item].Ruta + "</option>");
                }
            }
            break;

        case "Select_GrpDocumento":
            for (Item in Matrix) {
                if (Matrix[Item].Nit_ID == Nit) {
                    $("#" + Selector).append("<option value='" + Matrix[Item].GrpDocumentos_ID + "'>" + Matrix[Item].Descripcion + "</option>");
                }
            }
            break;

        case "Select_Documento":
            for (Item in Matrix) {
                if (Matrix[Item].Nit_ID == Nit || Matrix[Item].Nit_ID == "0") {
                    $("#" + Selector).append("<option value='" + Matrix[Item].Documento_ID + "'>" + Matrix[Item].Descripcion + "</option>");
                }
            }
            break;

        case "Select_Documento_V":
            for (Item in Matrix) {
                if ((Matrix[Item].Nit_ID == Nit || Matrix[Item].Nit_ID == "0") && (Matrix[Item].RequiereVerificacion == "S")) {
                    $("#" + Selector).append("<option value='" + Matrix[Item].Documento_ID + "'>" + Matrix[Item].Descripcion + "</option>");
                }
            }
            break;

        case "Select_Persona":
            for (Item in Matrix) {
                if (Matrix[Item].Nit_ID == Nit) {
                    $("#" + Selector).append("<option value='" + Matrix[Item].Document_ID + "'>" + Matrix[Item].Nombre + "</option>");
                }
            }
            break;
        case "Select_Persona_C":
            for (Item in Matrix) {
                if (Matrix[Item].Nit_ID == Nit) {
                    $("#" + Selector).append("<option value='" + Matrix[Item].Document_ID + "'>" + Matrix[Item].Nombre + "</option>");
                }
            }
            break;

        case "Select_Persona_A":
            for (Item in Matrix) {
                if (Matrix[Item].Nit_ID == Nit) {
                    $("#" + Selector).append("<option value='" + Matrix[Item].Document_ID + "'>" + Matrix[Item].Nombre + "</option>");
                }
            }
            break;

        case "Select_Persona_Enc":
            $('#' + Selector).append("<option value='0'>Todos</option>");
            for (Item in Matrix) {
                if (Matrix[Item].Nit_ID == Nit) {
                    $("#" + Selector).append("<option value='" + Matrix[Item].Document_ID + "'>" + Matrix[Item].Nombre + "</option>");
                }
            }
            break;

        case "Select_Contrato":
            for (Item in Matrix) {
                $("#" + Selector).append("<option value='" + Matrix[Item].Colocacion_ID + "'>" +Matrix[Item].Colocacion_ID +" - " + Matrix[Item].Descripcion + "</option>");
            }
            break;

        case "Select_Secuencia":
            for (Item in Matrix) {
                if (Matrix[Item].Nit_ID == Nit) {
                    $("#" + Selector).append("<option value='" + Matrix[Item].Documento_ID + "'>" + Matrix[Item].Descripcion + "</option>");
                }
            }
            break;

        case "Select_PAcceso":
            for (Item in Matrix) {
                if (Matrix[Item].Nit_ID == Nit) {
                    $("#" + Selector).append("<option value='" + Matrix[Item].PuertaAcceso_ID + "'>" + Matrix[Item].Descripcion + "</option>");
                }
            }
            break;

        case "Select_Tarjeta":
            for (Item in Matrix) {
                if (Matrix[Item].Nit_ID_Custodia == Nit && Matrix[Item].Document_ID_Asigna == 0) {
                    $("#" + Selector).append("<option value='" + Matrix[Item].Tarjeta_ID + "'>" + Matrix[Item].Tarjeta_ID + "</option>");
                }
            }
            break;

        case "Select_Tarjeta_Ent":
            for (Item in Matrix) {
                if (Matrix[Item].Nit_ID_Asigna == Nit && Matrix[Item].Document_ID_Entrega == 0) {
                    $("#" + Selector).append("<option value='" + Matrix[Item].Tarjeta_ID + "'>" + Matrix[Item].Tarjeta_ID + "</option>");
                }
            }
            break;

        case "Select_Tarjeta_AccPre":
            for (Item in Matrix) {
                if (Matrix[Item].Nit_ID_Asigna == Nit && Matrix[Item].Document_ID_Entrega != 0) {
                    $("#" + Selector).append("<option value='" + Matrix[Item].Tarjeta_ID + "'>" + Matrix[Item].Tarjeta_ID + "</option>");
                }
            }
            break;

        case "Select_Tarjeta_Blo":
            for (Item in Matrix) {
                if ((Matrix[Item].Nit_ID_Asigna == Nit) && (Matrix[Item].Estado != 3 || Matrix[Item].Estado != 4)) {
                    $("#" + Selector).append("<option value='" + Matrix[Item].Tarjeta_ID + "'>" + Matrix[Item].Tarjeta_ID + "</option>");
                }
            }
            break;

        case "Select_Tarjeta_DBlo":
            for (Item in Matrix) {
                if ((Matrix[Item].Nit_ID_Asigna == Nit) && (Matrix[Item].Estado == 3 || Matrix[Item].Estado == 4)) {
                    $("#" + Selector).append("<option value='" + Matrix[Item].Tarjeta_ID + "'>" + Matrix[Item].Tarjeta_ID + "</option>");
                }
            }
            break;

        case "Select_Documento_1":
            for (Item in Matrix) {
                if ((Matrix[Item].Nit_ID == Nit) && (Matrix[Item].RequiereVerificacion == "S")) {
                    $("#" + Selector).append("<option value='" + Matrix[Item].Documento_ID + "'>" + Matrix[Item].Descripcion + "</option>");
                }
            }
            break;

        case "Select_Documento_2":
            for (Item in Matrix) {
                if ((Matrix[Item].Nit_ID == Nit) && (Matrix[Item].RequiereVerificacion == "N")) {
                    $("#" + Selector).append("<option value='" + Matrix[Item].Documento_ID + "'>" + Matrix[Item].Descripcion + "</option>");
                }
            }
            break;

        case "Select_AreaAcceso":
            $('#' + Selector).append("<option value='0'>Todos</option>");
            for (Item in Matrix) {
                if (Matrix[Item].PuertaAcceso_ID == Nit) {
                    $("#" + Selector).append("<option value='" + Matrix[Item].Area_ID + "'>" + Matrix[Item].Area_ID + " - " + Matrix[Item].DescripArea + "</option>");
                }
            }
            break;

        case "Select_SubTipo":
            for (Item in Matrix) {
                if (Matrix[Item].Tipo_ID == Nit) {
                    $("#" + Selector).append("<option value='" + Matrix[Item].SubTipo_ID + "'>" + Matrix[Item].SubTipo_ID + " - " + Matrix[Item].DescripSubTipo + "</option>");
                }
            }
            break;

        case "Select_Sucursal":
            for (Item in Matrix) {
                if (Matrix[Item].Nit_ID == Nit) {
                    $("#" + Selector).append("<option value='" + Matrix[Item].Sucursal_ID + "'>" + Matrix[Item].Descripcion + "</option>");
                }
            }
            break;

        case "Select_Sucursal_C":
            for (Item in Matrix) {
                if (Matrix[Item].Nit_ID == Nit) {
                    $("#" + Selector).append("<option value='" + Matrix[Item].Sucursal_ID + "'>" + Matrix[Item].Descripcion + "</option>");
                }
            }
            break;

        case "Select_Moneda":
            for (Item in Matrix) {
                $("#" + Selector).append("<option value='" + Matrix[Item].MonedaCod_ID + "'>" + Matrix[Item].MonedaCod_ID + " - " + Matrix[Item].Descripcion + "</option>");
            }
            break;

        case "Select_Moneda_F":
            for (Item in Matrix) {
                $("#" + Selector).append("<option value='" + Matrix[Item].MonedaCod_ID + "'>" + Matrix[Item].MonedaCod_ID + " - " + Matrix[Item].Descripcion + "</option>");
            }
            break;

        case "Select_Moneda_C":
            for (Item in Matrix) {
                $("#" + Selector).append("<option value='" + Matrix[Item].MonedaCod_ID + "'>" + Matrix[Item].MonedaCod_ID + " - " + Matrix[Item].Descripcion + "</option>");
            }
            break;


        case "Select_Moneda_Cod":
            for (Item in Matrix) {
                $("#" + Selector).append("<option value='" + Matrix[Item].MonedaCod_ID + "'>" + Matrix[Item].MonedaCod_ID + " - " + Matrix[Item].Descripcion + "</option>");
            }
            break;


        case "Select_Producto":
            for (Item in Matrix) {
                if (Matrix[Item].Nit_ID == Nit) {
                    $("#" + Selector).append("<option value='" + Matrix[Item].Producto_ID + "'>" + Matrix[Item].Producto_ID + " - " + Matrix[Item].Descripcion + "</option>");
                }
            }
            break;

        case "Select_Condicion_Financiacion":
            for (Item in Matrix) {
                if ((Matrix[Item].Nit_ID == Nit) || (Matrix[Item].Nit_ID == 0)) {
                    $("#" + Selector).append("<option value='" + Matrix[Item].Index + "'>" + Matrix[Item].Financiacion_ID + " - " + Matrix[Item].Descripcion + "</option>");
                }
            }
            break;

        case "Select_Ciclo":
            for (Item in Matrix) {
                $("#" + Selector).append("<option value='" + Matrix[Item].ID_Ciclo + "'> " + Matrix[Item].ID_Ciclo + " - " + Matrix[Item].Descripcion + "</option>");
            }
            break;

        case "Select_Ciclo_2":
            for (Item in Matrix) {
                $("#" + Selector).append("<option value='" + Matrix[Item].ID_Ciclo + "'> " + Matrix[Item].ID_Ciclo + " - " + Matrix[Item].Descripcion + "</option>");
            }
            break;

        case "Select_ClaseF":
            for (Item in Matrix) {
                $("#" + Selector).append("<option value='" + Matrix[Item].Clase + "'> " + Matrix[Item].Linea + "</option>");
            }
            break;

        case "Select_MarcaF":
            for (Item in Matrix) {
                if (Matrix[Item].Clase == Nit)
                    $("#" + Selector).append("<option value='" + Matrix[Item].Marca + "'> " + Matrix[Item].Marca + "</option>");
            }
            break;

        case "Select_Activo":
            for (Item in Matrix) {
                $("#" + Selector).append("<option value='" + Matrix[Item].Ref_1 + "_" + Matrix[Item].Ref_2 + "_" + Matrix[Item].Ref_3 + "'> " + Matrix[Item].Ref_1 + " " + Matrix[Item].Ref_2 + " " + Matrix[Item].Ref_3 + " - " + Matrix[Item].Descripcion  + "</option>");
            }
            break;

        case "Select_Factura":
            for (Item in Matrix) {
                $("#" + Selector).append("<option value='" + Matrix[Item].Ref_1 + "_" + Matrix[Item].Ref_2 + "_" + Matrix[Item].Ref_3 + "_" + Matrix[Item].Fact_Oct_ID + "'> " + Matrix[Item].Ref_1 + " " + Matrix[Item].Ref_2 + " " + Matrix[Item].Ref_3 + " - " + Matrix[Item].Fact_Oct_ID + "</option>");
            }
            break;

        case "DDL_Padre": //Combo Padre en Adm_OpcRol
            for (Item in Matrix) {
                $("#" + Selector).append("<option value='" + Matrix[Item].Rol_ID + "'> " + Matrix[Item].Rol_ID + " - " + Matrix[Item].Descripcion + "</option>");
            }
            break;

        case "DDL_Hijo": //Combo SubRol o Rol en Adm_OpcRol
            for (Item in Matrix) {
                $("#" + Selector).append("<option value='" + Matrix[Item].Rol_ID + "'> " + Matrix[Item].Rol_ID + " - " + Matrix[Item].Descripcion + "</option>");
            }
            break;
 
        case "DDLLink_ID": //Combo Links en Adm_OpcRol
            for (Item in Matrix) {
                $("#" + Selector).append("<option value='" + Matrix[Item].ID + "'> " + Matrix[Item].ID + " - " + Matrix[Item].descripcion + "</option>");
            }
            break;
    }

    $('#' + Selector).append("<option value='-1'>Seleccione...</option>");

    switch (Index_Edit) {
        case "":
            $("#" + Selector + " option[value= '-1'] ").attr("selected", true);
            break;

        case "0":
            $("#" + Selector + " option[value= '0'] ").attr("selected", true);
            break;

        default:
            $("#" + Selector + " option[value= '" + Index_Edit + "'] ").attr("selected", true);
            break;
    }

    $("#" + Selector).trigger("liszt:updated");
    $('.C_Chosen').trigger('chosen:updated');

}

//carga los combo persona segun opcion de la persona
function Charge_Combo_Persona(Matrix, Selector, Nit, Index_Edit) {

    $('#' + Selector).empty();
    var objList = $("[id$='" + Selector + "']");

    switch (Selector) {

        case "Select_Persona_R"://entidad registro
            for (Item in Matrix) {
                if (Matrix[Item].OP_Hacienda == "S" || Matrix[Item].OP_Transito == "S") {
                    $("#" + Selector).append("<option value='" + Matrix[Item].Document_ID + "'>" + Matrix[Item].Nombre + "</option>");
                }
            }
            break;

        case "Select_Notaria_R"://Notaria registro
            for (Item in Matrix) {
                if (Matrix[Item].OP_Hacienda == "S") {
                    $("#" + Selector).append("<option value='" + Matrix[Item].Document_ID + "'>" + Matrix[Item].Nombre + "</option>");
                }
            }
            break;


        case "Select_Persona_C"://persona registro por NIT ID
            for (Item in Matrix) {
                if (Matrix[Item].Nit_ID == Nit) {
                    $("#" + Selector).append("<option value='" + Matrix[Item].Document_ID + "'>" + Matrix[Item].Nombre + "</option>");
                }
            }
            break;

        case "Select_Direccion"://Direcciones por persona
            for (Item in Matrix) {
                $("#" + Selector).append("<option value='" + Matrix[Item].Index_Direccion + "'>" + Matrix[Item].Direccion + "</option>");
            }
            break;
    }

    $('#' + Selector).append("<option value='-1'>Seleccione...</option>");

    switch (Index_Edit) {
        case "":
            $("#" + Selector + " option[value= '-1'] ").attr("selected", true);
            break;

        case "0":
            $("#" + Selector + " option[value= '0'] ").attr("selected", true);
            break;

        default:
            $("#" + Selector + " option[value= '" + Index_Edit + "'] ").attr("selected", true);
            break;
    }

    $("#" + Selector).trigger("liszt:updated");
    $('.C_Chosen').trigger('chosen:updated');

}

//carga combo de años
function CargaYear(Select_Control, Rango, Option_Year, Index_Edit, Value_Option) {

    var ActualYear = $("#Hours").html();
    var A_Date = ActualYear.split("-");
    var Ciclo = 0;

    var Year_F = parseInt(A_Date[0]) - parseInt(Option_Year);
    var Year_I = parseInt(Year_F) - parseInt(Rango);

    $('#' + Select_Control).empty();
    var objList = $("[id$='" + Select_Control + "']");
    $('#' + Select_Control).append("<option value='-1'>Año...</option>");

    switch (Value_Option) {
        case "":
            for (Ciclo; Ciclo <= Rango; Ciclo++) {
                $("#" + Select_Control).append("<option value='" + Year_I + "'>" + Year_I + "</option>");
                Year_I = Year_I + 1;
            }
            break;
        default:
            for (Ciclo; Ciclo <= Rango; Ciclo++) {
                var Index_option = parseInt(Ciclo) + 1;
                $("#" + Select_Control).append("<option value='" + Value_Option + Index_option + "'>" + Year_I + "</option>");
                Year_I = Year_I + 1;
            }
            break;
    }

    if (Index_Edit == "")
        $("#" + Select_Control + " option[value= '-1'] ").attr("selected", true);
    else
        $("#" + Select_Control + " option[value= '" + Index_Edit + "'] ").attr("selected", true);

    $("#" + Select_Control).trigger("liszt:updated");
    $('.C_Chosen').trigger('chosen:updated');

}

//carga combo de años parametrizado
function CargaYear_Parametrizado(Select_Control, Rango_Inicio, Rango_Final, Option_Year, Index_Edit, Value_Option) {

    var ActualYear = $("#Hours").html();
    var A_Date = ActualYear.split("-");
    var Ciclo = parseInt(Rango_Inicio) - 1;
    Rango_Final = parseInt(Rango_Final) - 1;

    var Year_F = parseInt(A_Date[0]) - parseInt(Option_Year);
    var Year_I = parseInt(Option_Year) - (parseInt(Rango_Final) - (parseInt(Rango_Inicio) - 1));

    $('#' + Select_Control).empty();
    var objList = $("[id$='" + Select_Control + "']");
    $('#' + Select_Control).append("<option value='-1'>Año...</option>");

    switch (Value_Option) {
        case "":
            for (Ciclo; Ciclo <= Rango_Final; Ciclo++) {
                $("#" + Select_Control).append("<option value='" + Year_I + "'>" + Year_I + "</option>");
                Year_I = Year_I + 1;
            }
            break;
        default:
            for (Ciclo; Ciclo <= Rango_Final; Ciclo++) {
                var Index_option = parseInt(Ciclo) + 1;
                $("#" + Select_Control).append("<option value='" + Value_Option + Index_option + "'>" + Year_I + "</option>");
                Year_I = Year_I + 1;
            }
            break;
    }

    if (Index_Edit == "")
        $("#" + Select_Control + " option[value= '-1'] ").attr("selected", true);
    else
        $("#" + Select_Control + " option[value= '" + Index_Edit + "'] ").attr("selected", true);

    $("#" + Select_Control).trigger("liszt:updated");
    $('.C_Chosen').trigger('chosen:updated');

}

//cargar combo de meses
function CargaMonth(Select_Control, Index_Edit) {

    $('#' + Select_Control).empty();
    var objList = $("[id$='" + Select_Control + "']");
    $('#' + Select_Control).append("<option value='-1'>Mes...</option>");

    for (itemArray in Matrix_Mes) {
        $("#" + Select_Control).append("<option value='" + Matrix_Mes[itemArray][0] + "'>" + Matrix_Mes[itemArray][1] + "</option>");
    }

    if (Index_Edit == "")
        $("#" + Select_Control + " option[value= '-1'] ").attr("selected", true);
    else
        $("#" + Select_Control + " option[value= '" + Index_Edit + "'] ").attr("selected", true);

    $("#" + Select_Control).trigger("liszt:updated");
    $('.C_Chosen').trigger('chosen:updated');

}

//carga el como dia
function CargaDay(Select_C_Year, Select_C_Month, Select_Control, Index_Edit) {

    var Select_Y = $("#" + Select_C_Year).val();
    var Select_M = $("#" + Select_C_Month).val();
    var N_Day_M = 0;

    if (Select_Y == "-1" || Select_M == "-1") {

        if (Select_Y == "-1") {
            Mensaje_General("No Hay Año", "Debe seleccionar El año!", "W");
        }
        if (Select_M == "-1") {
            Mensaje_General("No Hay Mes", "Debe seleccionar El Mes!", "W");
        }
    }
    else {

        var YearBis = Valida_Bisiesto(Select_Y);
        var Ciclo = 1;

        for (itemArray in Matrix_Mes) {
            if (Matrix_Mes[itemArray][0] == Select_M) {

                if (YearBis == "Y" && Select_M == "2")
                    N_Day_M = 29;
                else
                    N_Day_M = Matrix_Mes[itemArray][2];
            }
        }

        var objList = $("[id$='" + Select_Control + "']");

        $('#' + Select_Control).empty();
        var objList = $("[id$='" + Select_Control + "']");
        $('#' + Select_Control).append("<option value='-1'>Dia...</option>");

        for (Ciclo; Ciclo <= N_Day_M; Ciclo++) {
            $("#" + Select_Control).append("<option value='" + Ciclo + "'>" + Ciclo + "</option>");
        }

        if (Index_Edit == "")
            $("#" + Select_Control + " option[value= '-1'] ").attr("selected", true);
        else
            $("#" + Select_Control + " option[value= '" + Index_Edit + "'] ").attr("selected", true);

        $("#" + Select_Control).trigger("liszt:updated");
        $('.C_Chosen').trigger('chosen:updated');

    }

}

//Carga los calendarios
function CargaCalendarios(Matrix, Selector, Index_Edit) {

    $('#' + Selector).empty();
    var objList = $("[id$='" + Selector + "']");

    switch (Selector) {

        case "Select_Calendario": //Calendario de Paises
            for (Item in Matrix) {
                $("#" + Selector).append("<option value='" + Matrix[Item].Index + "'> " + Matrix[Item].Index + " - " + Matrix[Item].Descripcion + "</option>");
            }
            break;
        case "Select_Calendario_TS": //Calendario de Tipo Servicio
            for (Item in Matrix) {
                $("#" + Selector).append("<option value='" + Matrix[Item].Index + "'> " + Matrix[Item].Index + " - " + Matrix[Item].Descripcion + "</option>");
            }
            break;
        case "Select_Calendario_SS": //Calendario de Sucursal Servicio
            for (Item in Matrix) {
                $("#" + Selector).append("<option value='" + Matrix[Item].Index + "'> " + Matrix[Item].Index + " - " + Matrix[Item].Descripcion + " - " + Matrix[Item].Tipo_Tabla + "</option>");
            }
            break;
    }

    $('#' + Selector).append("<option value='-1'>Seleccione...</option>");

    switch (Index_Edit) {
        case "":
            $("#" + Selector + " option[value= '-1'] ").attr("selected", true);
            break;

        case "0":
            $("#" + Selector + " option[value= '0'] ").attr("selected", true);
            break;

        default:
            $("#" + Selector + " option[value= '" + Index_Edit + "'] ").attr("selected", true);
            break;
    }

    $("#" + Selector).trigger("liszt:updated");
    $('.C_Chosen').trigger('chosen:updated');
}

//Carga las Monedas
function CargaMonedas(Matrix, Selector, Index_Edit) {

    $('#' + Selector).empty();
    var objList = $("[id$='" + Selector + "']");

    switch (Selector) {

        case "Select_moneda": //Moneda de Paises
            for (Item in Matrix) {
                $("#" + Selector).append("<option value='" + Matrix[Item].MonedaCod_ID + "'>" + Matrix[Item].MonedaCod_ID + " - " + Matrix[Item].Descripcion + "</option>");
            }
            break;
    }

    $('#' + Selector).append("<option value='-1'>Seleccione...</option>");

    switch (Index_Edit) {
        case "":
            $("#" + Selector + " option[value= '-1'] ").attr("selected", true);
            break;

        case "0":
            $("#" + Selector + " option[value= '0'] ").attr("selected", true);
            break;

        default:
            $("#" + Selector + " option[value= '" + Index_Edit + "'] ").attr("selected", true);
            break;
    }

    $("#" + Selector).trigger("liszt:updated");
    $('.C_Chosen').trigger('chosen:updated');
}

//Carga las Políticas de Seguridad
function CargaPoliticasSeguridad(Matrix, Selector, Index_Edit) {

    $('#' + Selector).empty();
    var objList = $("[id$='" + Selector + "']");

    switch (Selector) {

        case "Select_PoliticaSeguridad_U": //Combo Políticas en Adm_Usuario
            for (Item in Matrix) {
                $("#" + Selector).append("<option value='" + Matrix[Item].Index + "'> " + Matrix[Item].Index + " - " + Matrix[Item].Descripcion + "</option>");
            }
            break;
    }

    $('#' + Selector).append("<option value='-1'>Seleccione...</option>");

    switch (Index_Edit) {
        case "":
            $("#" + Selector + " option[value= '-1'] ").attr("selected", true);
            break;

        case "0":
            $("#" + Selector + " option[value= '0'] ").attr("selected", true);
            break;

        default:
            $("#" + Selector + " option[value= '" + Index_Edit + "'] ").attr("selected", true);
            break;
    }

    $("#" + Selector).trigger("liszt:updated");
    $('.C_Chosen').trigger('chosen:updated');
}

//Carga los Grupos de Reportes
function CargaGrupoReportes(Matrix, Selector, Index_Edit) {

    $('#' + Selector).empty();
    var objList = $("[id$='" + Selector + "']");

    switch (Selector) {

        case "Select_GroupReports": //Combo Grupo Reportes en Adm_Usuario
            for (Item in Matrix) {
                $("#" + Selector).append("<option value='" + Matrix[Item].Index + "'> " + Matrix[Item].Nit_ID + " - " + Matrix[Item].Grupo_ID + " - " + Matrix[Item].Descripcion + "</option>");
            }
            break;
    }

    $('#' + Selector).append("<option value='-1'>Seleccione...</option>");

    switch (Index_Edit) {
        case "":
            $("#" + Selector + " option[value= '-1'] ").attr("selected", true);
            break;

        case "0":
            $("#" + Selector + " option[value= '0'] ").attr("selected", true);
            break;

        default:
            $("#" + Selector + " option[value= '" + Index_Edit + "'] ").attr("selected", true);
            break;
    }

    $("#" + Selector).trigger("liszt:updated");
    $('.C_Chosen').trigger('chosen:updated');
}

//Carga los Grupos de Documentos
function CargaGrupoDocumentos(Matrix, Selector, Index_Edit) {

    $('#' + Selector).empty();
    var objList = $("[id$='" + Selector + "']");

    switch (Selector) {

        case "Select_Grupo_Documentos_U": //Combo Grupo Documentos en Adm_Usuario
            for (Item in Matrix) {
                $("#" + Selector).append("<option value='" + Matrix[Item].Index + "'> " + Matrix[Item].Nit_ID + " - " + Matrix[Item].Grp_Documento_ID + " - " + Matrix[Item].Descripcion + "</option>");
            }
            break;
    }

    $('#' + Selector).append("<option value='-1'>Seleccione...</option>");

    switch (Index_Edit) {
        case "":
            $("#" + Selector + " option[value= '-1'] ").attr("selected", true);
            break;

        case "0":
            $("#" + Selector + " option[value= '0'] ").attr("selected", true);
            break;

        default:
            $("#" + Selector + " option[value= '" + Index_Edit + "'] ").attr("selected", true);
            break;
    }

    $("#" + Selector).trigger("liszt:updated");
    $('.C_Chosen').trigger('chosen:updated');
}

//Carga los Roles
function CargaRoles(Matrix, Selector, Index_Edit) {

    $('#' + Selector).empty();
    var objList = $("[id$='" + Selector + "']");

    switch (Selector) {

        case "DDLRol": //Combo Roles en Adm_Usuario
            for (Item in Matrix) {
                $("#" + Selector).append("<option value='" + Matrix[Item].Index + "'> "  + Matrix[Item].Rol_ID + " - " + Matrix[Item].Descripcion + "</option>");
            }
            break;
        case "DDLRol": //Combo Roles en Adm_Usuario
            for (Item in Matrix) {
                $("#" + Selector).append("<option value='" + Matrix[Item].Index + "'> "  + Matrix[Item].Rol_ID + " - " + Matrix[Item].Descripcion + "</option>");
            }
            break;

       }

    $('#' + Selector).append("<option value='-1'>Seleccione...</option>");

    switch (Index_Edit) {
        case "":
            $("#" + Selector + " option[value= '-1'] ").attr("selected", true);
            break;

        case "0":
            $("#" + Selector + " option[value= '0'] ").attr("selected", true);
            break;

        default:
            $("#" + Selector + " option[value= '" + Index_Edit + "'] ").attr("selected", true);
            break;
    }

    $("#" + Selector).trigger("liszt:updated");
    $('.C_Chosen').trigger('chosen:updated');
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                         FUNCIONES PARA CARGA DE DOCUMENTOS Y ARCHIVOS AL SERVIDOR                                                                                  ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//costruimos el nombre del documento temporal
function ContruyeName_Temp(StrDocument, StrConsecutivo_Empresa, StrConsecutivo) {

    var Fecha = new Date();

    var month = Fecha.getMonth() + 1;
    var day = Fecha.getDate();
    var year = Fecha.getFullYear();
    var hour = Fecha.getHours();
    var minuto = Fecha.getMinutes();
    var segundo = Fecha.getSeconds();

    var Output_Date = year +
    (('' + month).length < 2 ? '0' : '') + month +
    (('' + day).length < 2 ? '0' : '') + day + "_" +
    (('' + hour).length < 2 ? '0' : '') + hour +
    (('' + minuto).length < 2 ? '0' : '') + minuto +
    (('' + segundo).length < 2 ? '0' : '') + segundo;

    var StrDoc_Name_Temp = "S_" + StrConsecutivo_Empresa + "_" +
             StrDocument + "_" + User.toUpperCase() + "_" +
           Output_Date + "." + StrConsecutivo;

    NameTemporal = StrDoc_Name_Temp
}

//carga de documentos global
function UpLoad_Document(NameAjax, NameFile_ID, Form) {

    //validamos si seleccionaron un archivo
    if ($("#" + NameFile_ID).val() != "") {

        //Añadimos la imagen de carga en el contenedor
        $('#ctl00_cphPrincipal_gif_charge_Container').css("display", "block");

        //capturamos los datos del input file
        var file = $("#" + NameFile_ID);
        var dataFile = $("#" + NameFile_ID)[0].files[0];

        //inicializamos el fordata para transferencia de archivos
        var data = new FormData();
        //asinamos el datafile a la variable archivo 
        data.append('archivo', dataFile);
        data.append('RutaTemporal', RutaTemporal);
        data.append('NameTemporal', NameTemporal);

        //data.ajaxStart(inicioEnvio);
        //transacion ajax
        $.ajax({
            url: NameAjax + "Ajax.aspx",
            type: "POST",
            contentType: false,
            data: data,
            processData: false,
            success: function (result) {

                var filename = result;
                switch (filename) {
                    case "NO_FORMAT":
                        $("#dialog").dialog("option", "title", "Formato Incorrecto!");
                        $("#Mensaje_alert").text("El documento no se puede generar, el formato es diferente a la parametrización asignada! ");
                        $("#dialog").dialog("open");
                        $("#DE").css("display", "none");
                        $("#SE").css("display", "none");
                        $("#WE").css("display", "block");
                        break;

                    default:
                        //creamos variables
                        filename = $.trim(filename)
                        filename = filename.replace(/\s/g, '_');
                        Doc_name = filename;
                        var objectfile = data;
                        var description = "xxxxx";

                        $("#" + NameFile_ID).val("");

                        switch (Form) {
                            case "1":
                                VerDocumento();
                                break;

                            case "2":
                                VerDocumento_Validacion();
                                break;
                            default:
                                VerDocumento();
                        }
                        break;
                }

            },
            error: function (error) {
                alert("Ocurrió un error inesperado, por favor intente de nuevo mas tarde: " + error);
            }
        });
    }
    else {

    }

}

//muestra el documento cargado inicialmente
function VerDocumento() {
    $("#IF_Visor").css("display", "inline-table");
    $("#IF_Visor").attr("width", "100%");
    $("#IF_Visor").attr("height", "100%");
    $("#IF_Visor").attr("src", "../../Repository_Document/TEMP/" + Doc_name);
}

//Carga de múltiples archivos global
//** Parámetros:
// • NameAjax = Nombre de la página de la cual se llama la función
// • NameFile_ID = ID que utiliza el Input tipo File desde el cual hace la carga
// • Form = Un ID que se puede utilizar para envio de datos únicos de este form o similar
function UpLoad_MultipleFiles(NameAjax, NameFile_ID, Form) {
    var arrayData = [];
    //validamos si seleccionaron un archivo
    if ($("#" + NameFile_ID).val() != "") {

        //Añadimos la imagen de carga en el contenedor
        $('#ctl00_cphPrincipal_gif_charge_Container').css("display", "block");

        //inicializamos el formdata para transferencia de archivos
        var data = new FormData();
        var numFilesSended = 0;
        //capturamos los datos del input file
        for (var i = 0, f; f = $("#" + NameFile_ID)[0].files[i]; i++) {
            data.append('archivo'+i, $("#" + NameFile_ID)[0].files[i]); //Cargamos cada uno de los archivos en los Data
            numFilesSended = numFilesSended + 1;
        }
       
        data.append('RutaTemporal', RutaTemporal); //Declara local en js
        
        if (form = "Huellas"){ //Utilizado para cuando los archivos provienen del modulo de huellas
            var NameFiles = "";
            for (i in arrayNameFiles){
                NameFiles = NameFiles + "," + arrayNameFiles[i];
            }
            NameFiles = NameFiles.substr(1);
            data.append('NameArchivos', NameFiles); 
            data.append('action', 'CargarHuellas');
        }
        
        //Transacción ajax
        $.ajax({
            url: NameAjax + "Ajax.aspx",
            type: "POST",
            contentType: false,
            data: data,
            processData: false,
            success: function (result) {
                
                var files = JSON.parse(result);

                if (files[0] == "NO FILES"){
                    Mensaje_General("Sin Archivos", "No se han encontrado peticiones de carga de archivos al servidor, la operación de carga se ha cancelado.", "W");
                }else{
                    if (files.length < numFilesSended){
                        if ( (numFilesSended - files.length) > 1){
                            Mensaje_General("Archivos Cargados: "+files.length+"/"+numFilesSended, "El sistema no ha cargado la totalidad de archivos que usted dispuso, esto sucedió porque no cumplieron con los parámetros permitidos. No se cargaron "+ (numFilesSended - files.length) + " archivos.", "W");
                        }else if ( (numFilesSended - files.length) == 1){
                            Mensaje_General("Archivos Cargados: "+files.length+"/"+numFilesSended, "El sistema no ha cargado la totalidad de archivos que usted dispuso, esto sucedió porque no cumplió con los parámetros permitidos. No se cargó "+ (numFilesSended - files.length) + " archivo.", "W");
                        }else if ( (numFilesSended - files.length) == numFilesSended){
                            Mensaje_General("Archivos Cargados: "+files.length+"/"+numFilesSended, "El sistema no cargó ninguno de los archivos seleccionado, esto sucedió porque ningún archivo cumplia con los parametros de archivo aceptado.", "E");
                        }
                    }else{
                        Mensaje_General("Archivos Cargados: "+files.length+"/"+numFilesSended, "Se han cargado todos los archivos correctamente al servidor.","S");
                    }

                    /* === Solo necesario para módulo de carga de huellas == */
                    if (form == "Huellas"){
                        CheckFiles(files);
                        ArmarTabla();
                    }
                    /*==END==*/
                }

                $("#" + NameFile_ID).val("");
            },
            error: function (error) {
                Mensaje_General("Error durante la Carga", "Lo sentimos, ocurrió un error y no se logró completar el proceso. Por favor recarga la página e intentalo más tarde.", "W");
            },
            async: false, // La petición es síncrona
            cache: false // No queremos usar la caché del navegador
        });
    }
    else {
        Mensaje_General("Carga de Archivos Múltiples", "Debes seleccionar como mínimo un archivo para realizar la respectiva carga.", "E");
    }
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                     PROCESO DE FORMATEO DE DIRECCIONES                                                                   ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//habilita la ventana emergente de direciones
function Format_Adress(ObjText) {
    $("#" + ObjText).click(function () {
        Control_Work = ObjText;
        if ($("#" + ObjText).val == "") {
        } else {
            Clear_Adress();
            $("#Txt_End_Adress").val($("#" + ObjText).val());
        }

        $("#Txt_Special").css("display", "none");
        $("#Dialog_Format_Adress").dialog("open");
        $("#Dialog_Format_Adress").dialog("option", "title", "Ingrese Dirección ");

        lego_Adress();
    });
}

//construye el string de la direccion
function lego_Adress() {

    var Str_Adress = "";

    $("#Select_Type_Adress").change(function () {
        ArrayStrAdress[0] = $("#Select_Type_Adress").val();
        if (ArrayStrAdress[0] == "Kl") {
            $("#Txt_Special").css("display", "block");

            $("#Select_Letter_1").css("display", "none");
            $("#Txt_N2").css("display", "none");
            $("#Select_Letter_2").css("display", "none");
            $("#Txt_N3").css("display", "none");
            $("#Select_Orientacion").css("display", "none");
            $("#Select_Type_Cons").css("display", "none");
            $("#Txt_N4").css("display", "none");
            $("#Select_Type_Cons2").css("display", "none");
            $("#Txt_N5").css("display", "none");
            $("#Txt_Texto").css("display", "none");

        }
        else {
            $("#Txt_Special").css("display", "none");

            $("#Select_Letter_1").css("display", "block");
            $("#Txt_N2").css("display", "block");
            $("#Select_Letter_2").css("display", "block");
            $("#Txt_N3").css("display", "block");
            $("#Select_Orientacion").css("display", "block");
            $("#Select_Type_Cons").css("display", "block");
            $("#Txt_N4").css("display", "block");
            $("#Select_Type_Cons2").css("display", "block");
            $("#Txt_N5").css("display", "block");
            $("#Txt_Texto").css("display", "block");

        }
        StrLego();
    });

    $("#Txt_N1").change(function () {
        ArrayStrAdress[1] = " " + $("#Txt_N1").val();
        StrLego();
    });

    $("#Select_Letter_1").change(function () {
        ArrayStrAdress[2] = $("#Select_Letter_1").val();
        StrLego();
    });

    $("#Txt_Special").change(function () {
        ArrayStrAdress[2] = " " + $("#Txt_Special").val().toUpperCase();
        StrLego();
    });

    $("#Txt_N2").change(function () {
        ArrayStrAdress[3] = " N° " + $("#Txt_N2").val();
        StrLego();
    });

    $("#Select_Letter_2").change(function () {
        ArrayStrAdress[4] = $("#Select_Letter_2").val();
        StrLego();
    });

    $("#Txt_N3").change(function () {
        ArrayStrAdress[5] = " - " + $("#Txt_N3").val();
        StrLego();
    });

    $("#Select_Orientacion").change(function () {
        ArrayStrAdress[6] = " " + $("#Select_Orientacion").val();
        StrLego();
    });

    $("#Select_Type_Cons").change(function () {
        ArrayStrAdress[7] = " " + $("#Select_Type_Cons").val();
        StrLego();
    });

    $("#Txt_N4").change(function () {
        ArrayStrAdress[8] = " " + $("#Txt_N4").val();
        StrLego();
    });

    $("#Select_Type_Cons2").change(function () {
        ArrayStrAdress[9] = " " + $("#Select_Type_Cons2").val();
        StrLego();
    });

    $("#Txt_N5").change(function () {
        ArrayStrAdress[10] = " " + $("#Txt_N5").val();
        StrLego();
    });

    $("#Txt_Texto").change(function () {
        ArrayStrAdress[11] = " " + $("#Txt_Texto").val().toUpperCase();
        StrLego();
    });
}

//recorre el vector para construir la direccion
function StrLego() {

    var Str_Adress = "";

    for (item in ArrayStrAdress) {

        if (ArrayStrAdress[item] != "") {
            Str_Adress = Str_Adress + ArrayStrAdress[item];
            $("#Txt_End_Adress").val(Str_Adress);
        }
    }
}

//llena el campo de direccion con el string armado
function Add_Adress() {

    if ($("#Txt_End_Adress").val() != "")
        $("#" + Control_Work).val($("#Txt_End_Adress").val());

    $("#Dialog_Format_Adress").dialog("close");
}

//limpia los campos de direccion
function Clear_Adress() {

    ArrayStrAdress = [];
    $("#Select_Type_Adress").val("");
    $("#Select_Letter_1").val("");
    $("#Txt_N1").val("");
    $("#Txt_Special").val("");
    $("#Txt_N2").val("");
    $("#Select_Letter_2").val("");
    $("#Txt_N3").val("");
    $("#Select_Orientacion").val("");
    $("#Select_Type_Cons").val("");
    $("#Txt_N4").val("");
    $("#Select_Type_Cons2").val("");
    $("#Txt_N5").val("");
    $("#Txt_Texto").val("");

    $("#Txt_End_Adress").val("");
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                            FUNCIONES CÁLCULO DE TASAS Y CONVERTIDORES A DÍAS                                                                     ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

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

//calcula valor del IVA
function Calcula_Valor_IVA(Obj_Cap_1, Obj_Cap_2, ObjResutado) {
    $("#" + Obj_Cap_2).blur(function () {

        var Val_C_IVA = $("#" + Obj_Cap_1).val();
        var Val_S_IVA = $("#" + Obj_Cap_2).val();

        Val_C_IVA = F_NumericBD(Val_C_IVA);
        Val_S_IVA = F_NumericBD(Val_S_IVA);

        var operacion = parseInt(Val_C_IVA) - parseInt(Val_S_IVA);
        $("#" + ObjResutado).html(dinner_format_grid(operacion));
    });

    $("#" + Obj_Cap_1).blur(function () {

        var Val_C_IVA = $("#" + Obj_Cap_1).val();
        var Val_S_IVA = $("#" + Obj_Cap_2).val();

        Val_C_IVA = F_NumericBD(Val_C_IVA);
        Val_S_IVA = F_NumericBD(Val_S_IVA);

        var operacion = parseInt(Val_C_IVA) - parseInt(Val_S_IVA);
        $("#" + ObjResutado).html(dinner_format_grid(operacion));
    });

}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                            FUNCIONES CÁLCULO DE SUMA Y RESTA EN GRID                                                                                                              ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//operacion de suma en totalidad de grid
function SumarValores_Grid(V1, VT, Obj_Vista) {

    if (VT == 0)
        VT = V1;
    else
        VT = parseInt(VT) + parseInt(V1);

    Suma_Valor_Inicial = VT;
    $("#" + Obj_Vista).html(dinner_format_grid(Suma_Valor_Inicial, ""));
}

//operacion de resta en totalidad de grid
function RestarValores_Grid(VT, V_Ope, Obj_Vista) {

    VT = parseInt(VT) - parseInt(V_Ope);

    Suma_Valor_Inicial = VT;
    $("#" + Obj_Vista).html(dinner_format_grid(Suma_Valor_Inicial, ""));
}

//compara valores que no se pasen de lar inicial
function Compara_Valor_Compra(str_v1, Obj1, str_v2, Obj2, objeto, Str_1, Str_Op, Tipo_Opc) {
    var v1;
    var v2;
    var validar = 0;

    if (Tipo_Opc == "Blur") {
        $("#" + objeto).blur(function () {

            if (Obj1 == "Val")
                v1 = F_NumericBD($("#" + str_v1).val());
            else
                v1 = F_NumericBD($("#" + str_v1).html());

            if (Obj2 == "Val")
                v2 = F_NumericBD($("#" + str_v2).val());
            else
                v2 = F_NumericBD($("#" + str_v2).html());

            if (parseInt(v1) < parseInt(v2)) {
                if (Obj2 == "Val")
                    $("#" + str_v2).val("");
                else
                    $("#" + str_v2).html("");

                Mensaje_General("¡Valor Incoherente !", "El valor " + Str_1 + " NO puede ser mayor al Valor " + Str_Op, "W");
            }
        });
    }
    else {
        if (Obj1 == "Val")
            v1 = F_NumericBD($("#" + str_v1).val());
        else
            v1 = F_NumericBD($("#" + str_v1).html());

        if (Obj2 == "Val")
            v2 = F_NumericBD($("#" + str_v2).val());
        else
            v2 = F_NumericBD($("#" + str_v2).html());

        if (parseInt(v1) < parseInt(v2)) {
            validar = 1;
            Mensaje_General("¡Valor Incoherente !", "El valor " + Str_1 + " NO puede ser mayor al Valor " + Str_Op, "W");
        }
    }

    return validar;
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                            PROCESO DE VERIFICACION DE NIT USUARIO                                                                                                          ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//verifica el usurio si tiene acceso a toda la informacion o no y bloquea accesos
function VerificarNIT(vp_Selector) {
    var l_NIT = false;
    if (Array_G_Usuario[0].Acceso_Informacion != "0") {
        $("#" + vp_Selector + "").prop('disabled', true); //No se agrega el trigger porque se hace al seleccionar el val
        $("#" + vp_Selector + "").val("" + Array_G_Usuario[0].Nit_ID + "").trigger("chosen:updated");
        l_NIT = true;
    }
    return l_NIT;
}


function Capture_Nit_User() {
    if (Array_G_Usuario[0].Acceso_Informacion != "0") {
        g_NitEmpresa_User = Array_G_Usuario[0].Nit_ID;
    }
    else {
        g_NitEmpresa_User = "N";
    }
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                 PROCESO PARA DESCARGAS AUTOMÁTICAS DE ARCHIVOS                                                                                                            ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*Función que recibe un Array traido desde código VB y lo convierte para descargarlo automáticamente*/
function DowloadFile(result){
    var Correcto = false;
    var ArrayInformationFile = [];
    ArrayInformationFile = JSON.parse(result);
    var a = document.createElement('a');

    if (typeof a.download != "undefined") {
        var URLorigin = "http://" + ArrayInformationFile[0].RutaOrigen
        var FileDowload = ArrayInformationFile[0].NombreDescarga + "." + ArrayInformationFile[0].TipoArchivo;
        var save = document.createElement('a');
        save.href = URLorigin;
        save.target = '_blank';
        save.download = FileDowload;
        var clicEvent = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': true
        });
        save.dispatchEvent(clicEvent);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
        Correcto = true;
    }
    else {
        Mensaje_General("Navegador No Soportado", "El navegador actual no soporta la sentencia usada para la descarga del archivo, por favor reintenta con otro navegador.", "E");
        Correcto = false;
    }
    ArrayInformationFile = [];
    return Correcto;
}