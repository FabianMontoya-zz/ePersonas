/*--------------- region de variables globales --------------------*/
var Matrix_ClienteDep = [];
var Matrix_Contrato = [];
var Matrix_Secuencia = [];
var Matrix_Documento = [];
var Matrix_Consecutivo = [];
var RutasOperacion = [];

var ArrayCombo = [];
var ArrayFormato = [];
var ArrayCrud_Doc = [];

var RutaTemporal;
var RutaRelativa;
var RutaDestino;
var RequiereVerif;
var estado;
var editNit_ID;
var index_ID;
var editID;
var Nit_ID_proccess;
var ConsecutivoOrigen;
var ConsecutivoNuevo;
var NameDoc_Final;
var Formato_ID;
var IndicativoFoto;
var CheckVigencias;
var DescripFormato;


var StrTFormato;
var StrTNit_MultiEmpresa;
var StrConsecutivo;

/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {

    transaccionAjax_RutasOperacion('RUTAS_OPERACION');
    transaccionAjax_MClienteDep('MATRIX_CLIENTE_DEP');
    transaccionAjax_MContrato('MATRIX_CONTRATO');
    transaccionAjax_MSecuencia('MATRIX_SECUENCIA');
    transaccionAjax_MDocumento('MATRIX_DOCUMENTO');

    transacionAjax_EmpresaNit('Cliente');
    transacionAjax_Formato('Formato');
    Change_Select_Nit();
    CalFechaVencimiento();

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
    $("#IF_Visor").css("display", "none");
    $("#D_Controls").css("display", "none");

    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WE").css("display", "none");

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

    $("#Dialog_Visor").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 1200,
        height: 830,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
    });

    $(function () {
        $("#TxtFinicial").datepicker({ dateFormat: 'yy-mm-dd' });
    });

});

//salida del formulario
function btnSalir() {
    window.location = "../../Menu/menu.aspx?User=" + $("#User").html() + "&L_L=" + Link;
}

//carga los combos dependientes
function Change_Select_Nit() {
    $("#Select_EmpresaNit").change(function () {
        var index_ID = $(this).val();
        Nit_ID_proccess = $(this).val();
        Charge_Combos_Depend_Nit(Matrix_ClienteDep, "Select_Persona", index_ID, "");
        Charge_Combos_Depend_Nit(Matrix_Secuencia, "Select_Secuencia", index_ID, "");
        Charge_Combos_Depend_Nit(Matrix_Contrato, "Select_Contrato", index_ID, "");
        Charge_Combos_Depend_Nit(Matrix_Documento, "Select_Documento", index_ID, "");
    });
}

//calcula los dias de vencimiento
function CalFechaVencimiento() {
    $("#TxtFinicial").change(function () {

        var Strfecha = $("#TxtFinicial").val();
        var DiasVigen = $("#txt_DVigencia").val();

        var A_fecha = Strfecha.split("-");
        var FormatDate = A_fecha[2] + "/" + A_fecha[1] + "/" + A_fecha[0];

        var Resultado = sumaFecha(DiasVigen, FormatDate);
        var A_Resultado = Resultado.split("/");
        var FormatSalida = A_Resultado[2] + "-" + A_Resultado[1] + "-" + A_Resultado[0];

        $("#TxtFVencimiento").val(FormatSalida);

    });

    $("#txt_DVigencia").change(function () {

        var Strfecha = $("#TxtFinicial").val();
        var DiasVigen = $("#txt_DVigencia").val();

        var A_fecha = Strfecha.split("-");
        var FormatDate = A_fecha[2] + "/" + A_fecha[1] + "/" + A_fecha[0];

        var Resultado = sumaFecha(DiasVigen, FormatDate);
        var A_Resultado = Resultado.split("/");
        var FormatSalida = A_Resultado[2] + "-" + A_Resultado[1] + "-" + A_Resultado[0];

        $("#TxtFVencimiento").val(FormatSalida);
    });

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        $("#Dialog_Visor").dialog("open");
        $("#Dialog_Visor").dialog("option", "title", "Adjuntar Documento ");
        CargaFrame();
        StrTFormato = BuscarFormato();

        ContruyeName_Temp("TEMP", StrConsecutivo, StrTFormato);
    }
}

//regresar proceso
function BtnRegresar() {
    Clear();
    $("#Dialog_Visor").dialog("close");
}

//ejecuta la insercion del documento al sistema
function BtnIngresar() {
    Matrix_Consecutivo = [];
    transaccionAjax_MConsecutivo('MATRIX_CONSECUTIVOS');
}

//trae el consecutivo y actualiza
function CaptureConsecutivo() {

    var ConsecutivoExist = 0;

    for (item in Matrix_Consecutivo) {
        if (Matrix_Consecutivo[item].Nit_ID == Nit_ID_proccess) {
            ConsecutivoOrigen = Matrix_Consecutivo[item].Consecutivo;
            ConsecutivoNuevo = parseInt(Matrix_Consecutivo[item].Consecutivo) + 1;
            ConsecutivoExist = 1;
        }
    }
    return ConsecutivoExist;
}

//valida los campos obligatorios
function ValidarCamposVigencia() {
    var validar = 0;
    var Campo_1 = $("#TxtFinicial").val();
    var Campo_2 = $("#txt_DVigencia").val();

    if (Campo_1 == "" || Campo_2 == "") {
        validar = 1;
        if (Campo_1 == "")
            $("#Img9").css("display", "inline-table");
        else
            $("#Img9").css("display", "none");

        if (Campo_2 == "")
            $("#Img10").css("display", "inline-table");
        else
            $("#Img10").css("display", "none");
    }
    else {
        $("#Img9").css("display", "none");
        $("#Img10").css("display", "none");
    }
    return validar;
}

//llena los titulos del visor
function CargaFrame() {
    $("#Vis_EmpresaNit").val($("#Select_EmpresaNit option:selected").html());
    $("#Vis_Documento").val($("#Select_Documento option:selected").html());

    if ($("#Select_Persona option:selected").html() != "Seleccione...")
        $("#Vis_Persona").val($("#Select_Persona option:selected").html());
    else
        $("#Vis_Persona").val("");

    if ($("#Select_Secuencia option:selected").html() != "Seleccione...")
        $("#Vis_Secuencia").val($("#Select_Secuencia option:selected").html());
    else
        $("#Vis_Secuencia").val("");

    if ($("#Select_Contrato option:selected").html() != "Seleccione...")
        $("#Vis_Contrato").val($("#Select_Contrato option:selected").html());
    else
        $("#Vis_Contrato").val("");

    if ($("#Select_Activo option:selected").html() != "Seleccione...")
        $("#Vis_Activo").val($("#Select_Activo option:selected").html());
    else
        $("#Vis_Activo").val("");

    if ($("#Select_Factura option:selected").html() != "Seleccione...")
        $("#Vis_Factura").val($("#Select_Factura option:selected").html());
    else
        $("#Vis_Factura").val("");

    for (item in Matrix_Documento) {
        if (Matrix_Documento[item].Documento_ID == $("#Select_Documento").val()) {
            RequiereVerif = Matrix_Documento[item].RequiereVerificacion;
            Formato_ID = Matrix_Documento[item].Formato_ID;
            IndicativoFoto = Matrix_Documento[item].IndicativoFoto;
            RutaDestino = Matrix_Documento[item].RutaDocumentoDestino;
            CheckVigencias = Matrix_Documento[item].ChequeaVigencias;
            DescripFormato = Matrix_Documento[item].DescripFormato;

            if (Matrix_Documento[item].ChequeaVigencias == "N")
                $("#Container_Vigencia").css("display", "none");
            else {
                $("#Container_Vigencia").css("display", "inline-table");
                $("#txt_DVigencia").val(Matrix_Documento[item].DiasVigencia);

            }
        }
    }

}
//elimina de la BD
function BtnElimina() {
    transacionAjax_Crud_Doc_delete("elimina");
}

//validamos campos para la creacion del link
function validarCamposCrear() {

    var Campo_1 = $("#Select_EmpresaNit").val();
    var Campo_7 = $("#Select_Documento").val();

    var Campo_2 = $("#Select_Persona").val();
    var Campo_3 = $("#Select_Secuencia").val();
    var Campo_4 = $("#Select_Contrato").val();
    var Campo_5 = $("#Select_Activo").val();
    var Campo_6 = $("#Select_Factura").val();

    var validar = 0;

    if (Campo_1 == "-1" || Campo_7 == "-1") {
        validar = 1;
        if (Campo_1 == "-1")
            $("#Img1").css("display", "inline-table");
        else
            $("#Img1").css("display", "none");

        if (Campo_7 == "-1")
            $("#Img8").css("display", "inline-table");
        else
            $("#Img8").css("display", "none");
    }
    else {
        $("#Img1").css("display", "none");
        $("#Img8").css("display", "none");
    }

    if (Campo_6 == "-1" && Campo_5 == "-1" && Campo_4 == "-1" && Campo_3 == "-1" && Campo_2 == "-1") {
        validar = 1;

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

        if (Campo_5 == "-1")
            $("#Img6").css("display", "inline-table");
        else
            $("#Img6").css("display", "none");

        if (Campo_6 == "-1")
            $("#Img7").css("display", "inline-table");
        else
            $("#Img7").css("display", "none");
    }
    else {
        $("#Img2").css("display", "none");
        $("#Img3").css("display", "none");
        $("#Img5").css("display", "none");
        $("#Img6").css("display", "none");
        $("#Img7").css("display", "none");
    }
    return validar;
}


//evento del boton salir
function x() {
    $("#dialog").dialog("close");
}
//muestra controles de guardado
function HabilitarControl() {
    $("#D_Controls").css("display", "inline-table");
}

//limpiar campos
function Clear() {
    $("#Select_EmpresaNit").val("-1");
    $("#Select_Persona").val("-1");
    $("#Select_Secuencia").val("-1");
    $("#Select_Contrato").val("-1");
    $("#Select_Activo").val("-1");
    $("#Select_Factura").val("-1");
    $("#Select_Documento").val("-1");

    $("#TxtA_Observacion").val("");
    $("#Vis_Documento").val("");
    $("#TxtFinicial").val("");
    $("#TxtFVencimiento").val("");
    $("#txt_DVigencia").val("-1");

    $("#IF_Visor").attr("src", "");
    $("#IF_Visor").css("display", "none");

    $("#D_Controls").css("display", "none");

    $('.C_Chosen').trigger('chosen:updated');
}


//traer el formado del documento
function BuscarFormato() {

    var ID_Doc = $("#Select_Documento").val();
    var StrFormato = "";

    for (item in Matrix_Documento) {
        if (Matrix_Documento[item].Documento_ID == ID_Doc)
            StrFormato = Matrix_Documento[item].DescripFormato;
    }
    for (item in Matrix_Documento) {
        if (Matrix_Documento[item].Nit_ID == Nit_ID_proccess)
            StrConsecutivo = Matrix_Documento[item].Consecutivo;
    }

    return StrFormato;
}

//valida existencia del consecutivo
function ValideConsecutivo(ConsecutivoExist) {

    switch (ConsecutivoExist) {
        case 1:
            transacionAjax_CopyDocument("Copiar_Doc");
            break;

        case 0:
            $("#dialog").dialog("option", "title", "Exito");
            $("#Mensaje_alert").text("El documento no se puede crear no hay consecutivos! ");
            $("#dialog").dialog("open");
            $("#DE").css("display", "none");
            $("#SE").css("display", "none");
            $("#WE").css("display", "block");
            break;
    }
}