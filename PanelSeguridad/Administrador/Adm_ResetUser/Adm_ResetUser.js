/*--------------- region de variables globales --------------------*/
var ArrayEmpresaNit = [];
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {

    Ventanas_Emergentes();
    Ocultar_Errores();

    transacionAjax_EmpresaNit('Cliente'); //Carga Droplist de Empresa NIT
    VerificarNIT("Select_EmpresaNit");

    $("#ImgID").css("display", "none");
    $("#ImgEstado").css("display", "none");

});

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                 REGION INICIO DE COMPONENTES                                                                                                    ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//funcion para las ventanas emergentes
function Ventanas_Emergentes() {

    Load_Charge_Sasif(); //Carga de "SasifMaster.js" el Control de Carga

    $("#dialog").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true
    });

}

//Función para ocultar las IMG de los errores
function Ocultar_Errores() {

    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WA").css("display", "none");
    $("#ImgID").css("display", "none");
    $("#ImgNIT").css("display", "none");
    $("#ImgEstado").css("display", "none");

}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                 REGION BOTONES                                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        transacionAjax_Reset("reset");
    }

}

//evento del boton salir
function x() {
    $("#dialog").dialog("close");
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                      REGION VALIDACIONES DEL PROCESO                                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//validamos campos para la creacion del link
function validarCamposCrear() {

    var valID = $("#Txt_ID").val();
    var estado = $("#DDLTipo").val();
    var NIT = $("#Select_EmpresaNit").val();

    var validar = 0;

    if (estado == "-1" || estado == null ||
        valID == "" ||
        NIT == "-1" || NIT == null) {

        validar = 1;
        if (valID == "") {
            $("#ImgID").css("display", "inline-table");
        }
        else {
            $("#ImgID").css("display", "none");
        }
        if (estado == "-1" || estado == null) {
            $("#ImgEstado").css("display", "inline-table");
        }
        else {
            $("#ImgEstado").css("display", "none");
        }
        if (NIT == "-1" || NIT == null) {
            $("#ImgNIT").css("display", "inline-table");
        }
        else {
            $("#ImgNIT").css("display", "none");
        }
    }
    else {
        Ocultar_Errores();
    }
    return validar;
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                              MENSAJES, VISUALIZACION Y LIMPIEZA                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//Función que limpia todos los campos
function Clear() {
    $("#Select_EmpresaNit").val("-1").trigger("chosen:updated");
    $("#Txt_ID").val("");
    $("#DDLTipo").val("-1").trigger("chosen:updated");
    VerificarNIT("Select_EmpresaNit");
}


