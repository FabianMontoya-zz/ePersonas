/*--------------- region de variables globales --------------------*/
var Matrix_Tarjeta = [];
var Matrix_Persona = [];

var ArrayR_Persona_Tarjeta = [];
var ArrayR_Persona_TarjetaDep = [];

var estado;
var editNit_ID;
var index_ID;
var editID;
var editDocID;
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {
    $("#TablaDatos_D").css("padding-bottom", "20%");

    transaccionAjax_MPersona('MATRIX_PERSONA');
    transaccionAjax_MTarjeta('MATRIX_TARJETA');
    Change_Select_Nit();
    Change_Persona();
    transacionAjax_EmpresaNit('Cliente');

    $("#ESelect").css("display", "none");
    $("#Img1").css("display", "none");
    $("#Img2").css("display", "none");
    $("#Img3").css("display", "none");
    $("#Img5").css("display", "none");
    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WA").css("display", "none");


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

});

//carga el combo de nit dependiente
function Change_Select_Nit() {
    $("#Select_EmpresaNit").change(function () {
        var index_ID = $(this).val();
        Charge_Combos_Depend_Nit(Matrix_Persona, "Select_Persona", index_ID, "");
    });

    $("#Select_EmpresaNit_2").change(function () {
        var index_ID = $(this).val();
        Charge_Combos_Depend_Nit(Matrix_Tarjeta, "Select_Tarjeta", index_ID, "");
    });
}
var Persona_Tiene = 0;

//validar asignacion de tarjeta
function Change_Persona() {

    $("#Select_Persona").change(function () {
        var index_ID = $(this).val();
        for (item in Matrix_Tarjeta) {
            if (index_ID == Matrix_Tarjeta[item].Document_ID_Asigna || index_ID == Matrix_Tarjeta[item].Document_ID_Entrega) {
                Persona_Tiene = 1;
                break;
            }
        }
        Valida_PersonaAsignacion();
    });
}

//valida y bloque la informacion si ya tiene tarjeta asignada
function Valida_PersonaAsignacion() {
    if (Persona_Tiene == 0) {
        $("#Select_EmpresaNit_2").removeAttr("disabled");
        $("#Select_Tarjeta").removeAttr("disabled");
    }
    else {
        $("#Select_EmpresaNit_2").attr("disabled", "disabled");
        $("#Select_EmpresaNit_2").val("-1");
        $("#Select_Tarjeta").val("-1");
    
        $("#Select_Tarjeta").attr("disabled", "disabled");
        $("#dialog").dialog("option", "title", "Ya Existe");
        $("#Mensaje_alert").text("La persona ya tiene una Tarjeta Asignada!");
        $("#dialog").dialog("open");
        $("#DE").css("display", "None");
        $("#SE").css("display", "none");
        $("#WE").css("display", "block");
        Persona_Tiene = 0;
    }
    $('.C_Chosen').trigger('chosen:updated');

}

//salida del formulario
function btnSalir() {
    window.location = "../../Menu/menu.aspx?User=" + $("#User").html() + "&Key=" + ArrayMenu[0].Nit + "&LINK=" + Link;
}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        transacionAjax_R_Persona_Tarjeta_create("crear");
    }
}


//validamos campos para la creacion del link
function validarCamposCrear() {

    var Campo_1 = $("#Select_EmpresaNit").val();
    var Campo_2 = $("#Select_Persona").val();
    var Campo_3 = $("#Select_EmpresaNit_2").val();
    var Campo_4 = $("#Select_Tarjeta").val();

    var validar = 0;

    if (Campo_4 == "-1" || Campo_3 == "-1" || Campo_2 == "-1" || Campo_1 == "-1") {
        validar = 1;

        if (Campo_1 == "-1")
            $("#Img1").css("display", "inline-table");
        else
            $("#Img1").css("display", "none");

        if (Campo_2 == "-1")
            $("#Img2").css("display", "inline-table");
        else
            $("#Img2").css("display", "none");

        if (Campo_3 == "-1")
            $("#Img3").css("display", "inline-table");
        else
            $("#Img3").css("display", "none");

        if (Campo_4 == "-1")
            $("#Img5").css("display", "inline-table");
        else
            $("#Img5").css("display", "none");

    }
    else {
        $("#Img1").css("display", "none");
        $("#Img2").css("display", "none");
        $("#Img3").css("display", "none");
        $("#Img5").css("display", "none");
    }
    return validar;
}

//evento del boton salir
function x() {
    $("#dialog").dialog("close");
}

//limpiar campos
function Clear() {
    $("#Select_EmpresaNit").val("-1");
    $("#Select_EmpresaNit_2").val("-1");
    $("#Select_Persona").val("-1");
    $("#Select_Tarjeta").val("-1");

    $('.C_Chosen').trigger('chosen:updated');

}