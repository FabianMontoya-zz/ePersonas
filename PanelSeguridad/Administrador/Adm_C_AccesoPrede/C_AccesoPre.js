/*--------------- region de variables globales --------------------*/
var Matrix_Tarjeta = [];
var Matrix_Persona = [];
var Matrix_RTP = [];
var ArrayTipo_ing = [];
var Matrix_PAccesos = [];
var Matrix_PAcceso_Area = [];

var ArrayR_Persona_Tarjeta = [];
var ArrayR_Persona_TarjetaDep = [];

var estado;
var editNit_ID;
var editID;
var editDocID;
var Container_Tarjeta;
/*--------------- region de variables globales --------------------*/

//evento load de los Links
$(document).ready(function () {

    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
    transaccionAjax_MPersona('MATRIX_PERSONA');
    transaccionAjax_MTarjeta('MATRIX_TARJETA');
    transaccionAjax_MRTP('MATRIX_RTP');
    transaccionAjax_MPAccesos('MATRIX_PACCESOS');
    transaccionAjax_MPAcceso_Area('MATRIX_PACCESO_AREA');

    transacionAjax_EmpresaNit('Cliente');
    transacionAjax_Tipo_Ingreso('Tipo_Ing');

    Change_Select_Nit();
    Change_Select_Persona();
    Change_Select_Tarjeta();
    Change_Select_Vigencia();
    
    $("#ESelect").css("display", "none");
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
    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WE").css("display", "none");
    $("#T_Vigencia_Ing").css("display", "none");

    $("#TablaDatos_D").css("display", "none");
    $("#TablaConsulta").css("display", "none");

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
        $("#TxtFinicial").datepicker({ dateFormat: 'yy-mm-dd' });
        $("#txt_HIVigencia").timepicker();
        $("#TxtFfinal").datepicker({ dateFormat: 'yy-mm-dd' });
        $("#txt_HFVigencia").timepicker();
    });
});

//salida del formulario
function btnSalir() {
    window.location = "../../Menu/menu.aspx?User=" + $("#User").html() + "&L_L=" + Link;
}
//habilita el panel de crear o consulta
function HabilitarPanel(opcion) {

    switch (opcion) {

        case "crear":
            $("#TablaDatos_D").css("display", "inline-table");
            $("#TablaConsulta").css("display", "none");
            $("#Select_EmpresaNit").removeAttr("disabled");
            $("#Txt_ID").removeAttr("disabled");
            $("#Btnguardar").attr("value", "Guardar");
            $('.C_Chosen').trigger('chosen:updated');
            ResetError();
            Clear();
            estado = opcion;
            break;

        case "buscar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TConsecutivos").html("");
            estado = opcion;
            Clear();
            break;

        case "modificar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TConsecutivos").html("");
            estado = opcion;
            ResetError();
            Clear();
            break;

        case "eliminar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TConsecutivos").html("");
            estado = opcion;
            Clear();
            break;

    }
}

//consulta del del crud(READ)
function BtnConsulta() {

    var filtro;
    var ValidateSelect = ValidarDroplist();
    var opcion;

    if (ValidateSelect == 1) {
        filtro = "N";
        opcion = "ALL";
        transacionAjax_Consecutivos("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_Consecutivos("consulta", filtro, opcion);
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

//carga el combo de Area dependiente
function Change_Select_Nit() {
    $("#Select_EmpresaNit").change(function () {
        var index_ID = $(this).val();
        Charge_Combos_Depend_Nit(Matrix_Persona, "Select_Persona", index_ID, "");
        Charge_Combos_Depend_Nit(Matrix_Tarjeta, "Select_Tarjeta_Ent", index_ID, "");
        $("#Img5").css("display", "none");
    });

    $("#Select_EmpresaNit_Ing").change(function () {
        var index_ID = $(this).val();
        Charge_Combos_Depend_Nit(Matrix_PAccesos, "Select_PAcceso", index_ID, "");
        Charge_Combos_Depend_Nit(Matrix_Persona, "Select_Persona_Enc", index_ID, "");
        Change_Select_RPAA();
    });
}

//carga el combo de Area dependiente
function Change_Select_Vigencia() {
    $("#Select_CheckVigencia").change(function () {
        var index_ID = $(this).val();

        switch (index_ID) {
            case "S":
                $("#T_Vigencia_Ing").css("display", "inline-table");
                break;

            case "N":
                $("#T_Vigencia_Ing").css("display", "none");
                break;

            default:
                $("#T_Vigencia_Ing").css("display", "none");
                break;
        }
    });
}

//valida los cambios del combo  de tarjeta y carga
function Change_Select_RPAA() {
    $("#Select_PAcceso").change(function () {
        var index_ID = $(this).val();

        Charge_Combos_Depend_Nit(Matrix_PAcceso_Area, "Select_AreaAcceso", index_ID, "");
    });
}

//valida los cambios del combo  de tarjeta y carga
function Change_Select_Persona() {

    $("#Select_Persona").change(function () {
        Container_Tarjeta = "N";
        var index_ID = $(this).val();

        for (item in Matrix_RTP) {
            if (Matrix_RTP[item].Document_ID == index_ID) {
                $("#Select_Tarjeta_Ent").val(Matrix_RTP[item].Tarjeta_ID);
                Container_Tarjeta = "S";
                $('.C_Chosen').trigger('chosen:updated');
            }
        }
        ValidarAsignacion(Container_Tarjeta);
    });

}

//valida si tiene tarjeta asignada
function ValidarAsignacion(Container_Tarjeta) {

    switch (Container_Tarjeta) {
        case "N":
            $("#Select_Tarjeta_Ent").val("-1");
            $("#Select_Tarjeta_Ent").attr("disabled", "disabled");
            $('.C_Chosen').trigger('chosen:updated');

            $("#dialog").dialog("option", "title", "No tiene Tarjeta!");
            $("#Mensaje_alert").text("La persona seleccionada no tiene tarjeta asignada!");
            $("#dialog").dialog("open");
            $("#DE").css("display", "None");
            $("#SE").css("display", "none");
            $("#WE").css("display", "block");
            break;

        case "S":
            $("#Select_Tarjeta_Ent").removeAttr("disabled");
            $('.C_Chosen').trigger('chosen:updated');
            break;
    }

}

//valida los cambios del combo de Persona y carga
function Change_Select_Tarjeta() {
    $("#Select_Tarjeta_Ent").change(function () {
        var index_ID = $(this).val();
        for (item in Matrix_RTP) {
            if (Matrix_RTP[item].Tarjeta_ID == index_ID) {
                $("#Select_Persona").val(Matrix_RTP[item].Document_ID);
                $('.C_Chosen').trigger('chosen:updated');
            }
        }
    });
}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_UpdateEntrega("UpdateEntrega");
        }
    }
}

//validamos campos para la creacion del link
function validarCamposCrear() {

    var Campo_1 = $("#Select_EmpresaNit").val();
    var Campo_2 = $("#Select_Persona").val();
    var Campo_4 = $("#Select_Tarjeta_Ent").val();

    var validar = 0;

    if (Campo_4 == "-1" || Campo_2 == "-1" || Campo_1 == "-1") {
        validar = 1;

        if (Campo_1 == "-1")
            $("#Img1").css("display", "inline-table");
        else
            $("#Img1").css("display", "none");

        if (Campo_2 == "-1")
            $("#Img2").css("display", "inline-table");
        else
            $("#Img2").css("display", "none");

        if (Campo_4 == "-1")
            $("#Img5").css("display", "inline-table");
        else
            $("#Img5").css("display", "none");

    }
    else {
        $("#Img1").css("display", "none");
        $("#Img2").css("display", "none");
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
    $("#Select_Persona").val("-1");
    $("#Select_Tarjeta_Ent").val("-1");

    $('.C_Chosen').trigger('chosen:updated');

}