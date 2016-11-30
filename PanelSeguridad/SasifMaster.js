/*--------------- region de variables globales --------------------*/
var User;
var Link;
var NameTemporal;
var Doc_name;
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
        this.value = (this.value + '').replace(/[^a-zA-Z\s]+/g, '');
    });

    $('.Numeric_letter').keyup(function () {
        this.value = (this.value + '').replace(/[^0-9a-zA-Z]/g, '');
    });

    $('.Hours').focus(function () {
        this.value = "";
    });


});

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                 INICIO DE PROCESOS                                                                                                            ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//capturar el link y usuario para el proceso
function ConsultaParametrosURL() {
    //capturamos la url
    var URLPage = window.location.search.substring(1);
    var URLVariables = URLPage.split('&');


    if (URLVariables.length <= 1)
        User = URLVariables[0].replace("User=", "");
    else {
        User = URLVariables[0].replace("User=", "");
        Link = URLVariables[1].replace("L_L=", "");
    }
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
}

//funcion para control de carga
function carga_eventos(str_objeto) {

    $("#" + str_objeto).dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 400,
        height: 400,
        overlay: {
            opacity: 0.5,
            background: "black"
        },
        show: {
            effect: 'fade',
            duration: 2000
        },
        hide: {
            effect: 'fade',
            duration: 1000
        },
        open: function (event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).hide(); }
    });

    $(document).ajaxStart(function () {
        $("#" + str_objeto).dialog("open");
    }).ajaxStop(function () {
        $("#" + str_objeto).dialog("close");
    });
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

            console.log(dateStart + ">=" + dateEnd);
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
            console.log(dateStart + " >= " + dateEnd);
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

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                             FUNCIONES PARA CARGA DE DROP LIST                                                                                               ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//cargar combos
function charge_CatalogList(objCatalog, nameList, selector) {

    var objList = $('[id$=' + nameList + ']');
    //recorremos para llenar el combo de
    for (itemArray in objCatalog) {
        objList[0].options[itemArray] = new Option(objCatalog[itemArray].descripcion, objCatalog[itemArray].ID);
    };

    //validamos si el combo lleva seleccione y posicionamos en el
    switch (selector) {
        case 1:
            $("#" + nameList).append("<option value='-1'>Seleccione...</option>");
            $("#" + nameList + " option[value= '-1'] ").attr("selected", true);
            break;

        case "Generico":
            $("#" + nameList).append("<option value='-1'>Seleccione...</option>");
            $("#" + nameList).append("<option value='0'>Genérico</option>");
            $("#" + nameList + " option[value= '-1'] ").attr("selected", true);
            break;
    }

    $("#" + nameList).trigger("liszt:updated");
    $('.C_Chosen').trigger('chosen:updated');
}

//carga los combps dependiendo del nit
function Charge_Combos_Depend_Verificacion(Matrix, Selector, Nit, Doc_ID, Index_Edit) {

    $('#' + Selector).empty();
    var objList = $("[id$='" + Selector + "']");
    for (Item in Matrix) {
        if (Matrix[Item].Nit_ID == Nit && Matrix[Item].Doc_ID == Doc_ID) {
            $("#" + Selector).append("<option value='" + Matrix[Item].Doc_ID_Verif + "'>" + Matrix[Item].Doc_ID_Verif + " - " + Matrix[Item].DescripDoc_Verif + "</option>");
        }
    }
    $('#' + Selector).append("<option value='-1'>Seleccione...</option>");

    if (Index_Edit == "")
        $("#" + Selector + " option[value= '-1'] ").attr("selected", true);
    else
        $("#" + Selector + " option[value= '" + Index_Edit + "'] ").attr("selected", true);

    $("#" + Selector).trigger("liszt:updated");
    $('.C_Chosen').trigger('chosen:updated');

}

//carga los combps dependiendo del nit
function Charge_Combos_Depend_Nit(Matrix, Selector, Nit, Index_Edit) {

    $('#' + Selector).empty();
    var objList = $("[id$='" + Selector + "']");

    switch (Selector) {
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
                if (Matrix[Item].Nit_ID == Nit) {
                    $("#" + Selector).append("<option value='" + Matrix[Item].Contrato_ID + "'>" + Matrix[Item].Descripcion + "</option>");
                }
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

        case "Select_Persona_R"://persona registro
            for (Item in Matrix) {
                if (Matrix[Item].OP_Hacienda == "S" || Matrix[Item].OP_Transito == "S") {
                    $("#" + Selector).append("<option value='" + Matrix[Item].Document_ID + "'>" + Matrix[Item].Nombre + "</option>");
                }
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
function CargaYear(Select_Control, Rango, Option_Year, Index_Edit) {

    var ActualYear = $("#Hours").html();
    var A_Date = ActualYear.split("-");
    var Ciclo = 0;

    var Year_F = parseInt(A_Date[0]) - parseInt(Option_Year);
    var Year_I = parseInt(Year_F) - parseInt(Rango);

    $('#' + Select_Control).empty();
    var objList = $("[id$='" + Select_Control + "']");
    $('#' + Select_Control).append("<option value='-1'>Año...</option>");

    for (Ciclo; Ciclo <= Rango; Ciclo++) {
        $("#" + Select_Control).append("<option value='" + Year_I + "'>" + Year_I + "</option>");
        Year_I = Year_I + 1;
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
                console.log(YearBis);
                console.log(Select_M);

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


/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                         FUNCIONES PARA CARGA DE DOCUMENTOS AL SERVIDOR                                                                                  ----*/
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
    console.log(StrDoc_Name_Temp);
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
                console.log(error);
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
