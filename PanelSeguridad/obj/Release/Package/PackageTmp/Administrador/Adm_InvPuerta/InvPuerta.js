/*--------------- region de variables globales --------------------*/
var ArrayInvPuerta = [];
var ArrayCombo = [];
var ArrayInvPuertaDep = [];
var ArraySeguridad = [];

var estado;
var editNit_ID;
var index_ID;
var editID;

var Vigencia = "";
var Nit_Proccess = "";

/*--------------- region de variables globales --------------------*/

//evento load de los Links
$(document).ready(function () {

    transacionAjax_EmpresaNit('Cliente');

    $("#ESelect").css("display", "none");
    $("#Img1").css("display", "none");
    $("#Img2").css("display", "none");
    $("#Img3").css("display", "none");
    $("#Img5").css("display", "none");
    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WE").css("display", "none");
    $("#TR_Fechas").css("display", "none");
    $("#Complementos_c").css("display", "none");

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

    $(function () {
        $("#TxtFechaInicial").datepicker({ dateFormat: 'yy-mm-dd' });
        $("#TxtFechaFinal").datepicker({ dateFormat: 'yy-mm-dd' });
    });
    Capture_Tarjeta_ID();
    Change_Select_Vigencia();
    $("#TxtIDTarjeta").focus();
});

//captura tarjeta y mustra complementos a llenar
function Capture_Tarjeta_ID() {
    $("#TxtIDTarjeta").change(function () {
        var StrID = $(this).val();
        if (StrID.length == 10) {
            ValidaParametros();
            $("#TxtIDTarjeta").attr("disabled", "disabled");
            $("#Complementos_c").css("display", "inline-table");
        }
        else {
            $("#TxtIDTarjeta").removeAttr("disabled");
            $("#Complementos_c").css("display", "none");
        }
    });

}

//verifica si vienen parametros por la ruta 
function ValidaParametros() {

    for (item in ArrayMenu) {
        if (ArrayMenu[item].Tipo == 2) {
            if (ArrayMenu[item].IDlink == Link) {
                Nit_Proccess = ArrayMenu[item].Parametro_1;
                Vigencia = ArrayMenu[item].Parametro_2;
                ModalidadVista();
            }
        }
    }
}

var TypeValida;
//muestra el tipo de vista para el carge de niventario
function ModalidadVista() {
    switch (Nit_Proccess.length) {
        case 0:
            $("#Select_EmpresaNit").removeAttr("disabled");
            TypeValida = 0;
            break;

        default:
            $("#Select_EmpresaNit").val(Nit_Proccess);
            $("#Select_EmpresaNit").attr("disabled", "disabled");
            break;
    }
    $('.C_Chosen').trigger('chosen:updated');

    switch (Vigencia) {
        case "N":
            $("#TR_Vigencia").css("display", "none");
            TypeValida = 0;
            $("#Select_CheckVigencia").val("N");
            $("#Select_CheckVigencia").removeAttr("disabled");
            $("#TR_Fechas").css("display", "none");
            break;

        case "S":
            $("#TR_Vigencia").css("display", "inline-table");
            $("#Select_CheckVigencia").val("S");
            $("#Select_CheckVigencia").attr("disabled", "disabled");
            $("#TR_Fechas").css("display", "inline-table");
            TypeValida = 1;
            break;

        default:
            $("#TR_Vigencia").css("display", "inline-table");
            break;
    }
    $('.C_Chosen').trigger('chosen:updated');
    console.log(TypeValida);
}

//valida campos de fechas
function Change_Select_Vigencia() {
    $("#Select_CheckVigencia").change(function () {
        if ($(this).val() == "S") {
            $("#TR_Fechas").css("display", "inline-table");
            TypeValida = 1;
        }
        else {
            $("#TR_Fechas").css("display", "none");
            TypeValida = 0;
        }
    });
}

//salida del formulario
function btnSalir() {
    window.location = "../../Menu/menu.aspx?User=" + $("#User").html() + "&L_L=" + Link;
}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_InvPuerta_create("crear");
        }
        else {
            transacionAjax_InvPuerta_create("modificar");
        }
    }
}

//validamos campos para la creacion del link
function validarCamposCrear() {

    var validar = 0;
    var Campo_1 = $("#Select_EmpresaNit").val();
    var Campo_2 = $("#TxtFechaInicial").val();
    var Campo_3 = $("#TxtFechaFinal").val();

    switch (TypeValida) {
        case 0:
            if (Campo_1 == "-1") {
                validar = 1;

                if (Campo_1 == "-1")
                    $("#Img1").css("display", "inline-table");
                else
                    $("#Img1").css("display", "none");

            }
            else {
                $("#Img1").css("display", "none");
            }
            break;

        case 1:
            if (Campo_3 == "" || Campo_2 == "" || Campo_1 == "-1") {
                validar = 1;

                if (Campo_1 == "-1")
                    $("#Img1").css("display", "inline-table");
                else
                    $("#Img1").css("display", "none");

                if (Campo_2 == "")
                    $("#Img2").css("display", "inline-table");
                else
                    $("#Img2").css("display", "none");

                if (Campo_3 == "")
                    $("#Img3").css("display", "inline-table");
                else
                    $("#Img3").css("display", "none");

            }
            else {
                $("#Img1").css("display", "none");
                $("#Img2").css("display", "none");
                $("#Img3").css("display", "none");
            }
            break;
    }
    return validar;
}

//evento del boton salir
function x() {
    $("#dialog").dialog("close");
    $("#TxtIDTarjeta").focus();
}

//limpiar campos
function Clear() {

    switch (Nit_Proccess.length) {
        case 0:
            $("#Select_EmpresaNit").removeAttr("disabled");
            $("#Select_EmpresaNit").val("-1");
            TypeValida = 0;
            break;

        default:
            $("#Select_EmpresaNit").val(Nit_Proccess);
            $("#Select_EmpresaNit").attr("disabled", "disabled");
            break;
    }

    switch (Vigencia) {
        case "N":
            $("#TR_Vigencia").css("display", "none");
            TypeValida = 0;
            break;

        case "S":
            $("#TR_Vigencia").css("display", "inline-table");
            TypeValida = 1;
            break;

        default:
            $("#TR_Vigencia").css("display", "inline-table");
            break;
    }

    $("#TxtIDTarjeta").val("");
    $("#TxtFechaInicial").val("");
    $("#TxtFechaFinal").val("");
    $("#TxtIDTarjeta").removeAttr("disabled");

    $('.C_Chosen').trigger('chosen:updated');
    $("#Complementos_c").css("display", "none");
    $("#TxtIDTarjeta").focus();

}