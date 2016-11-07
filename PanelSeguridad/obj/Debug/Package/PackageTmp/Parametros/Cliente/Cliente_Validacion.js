var Empleado_true = 0;
var Banco_true = 0;

var Campo_1;
var Campo_2;
var Campo_3;
var Campo_4;
var Campo_5;
var Campo_6;
var Campo_7;
var Campo_8;
var Campo_9;
var Campo_10;
var Campo_11;
var Campo_12;
var Campo_13;
var Campo_14;
var Campo_15;

var CamposPN = 0;
var CamposPJ = 0;
var CamposBanco = 0;
var CamposEmpleado = 0;
var Nombre_Persona;


//revisa si tiene informacion adicional
function ValideAnexos() {

    $('#Check_Cliente').change(function () {
        if (Banco_true == 0 && Empleado_true == 0) {
            $("#Anexos").css("display", "none");
        }
    });

    $('#Check_Avaluador').change(function () {
        if (Banco_true == 0 && Empleado_true == 0) {
            $("#Anexos").css("display", "none");
        }
    });

    $('#Check_Transito').change(function () {
        if (Banco_true == 0 && Empleado_true == 0) {
            $("#Anexos").css("display", "none");
        }
    });

    $('#Check_Hacienda').change(function () {
        if (Banco_true == 0 && Empleado_true == 0) {
            $("#Anexos").css("display", "none");
        }
    });

    $('#Check_MultiEmpresa').change(function () {
        if (Banco_true == 0 && Empleado_true == 0) {
            $("#Anexos").css("display", "none");
        }
    });

    $('#Check_Asesor').change(function () {
        if (Banco_true == 0 && Empleado_true == 0) {
            $("#Anexos").css("display", "none");
        }
    });

    $('#Check_Proveedor').click(function () {
        if (Banco_true == 0 && Empleado_true == 0) {
            $("#Anexos").css("display", "none");
        }
    });

    $('#Check_Empleado').change(function () {

        if ($(this).is(':checked')) {
            $("#Anexos").css("display", "inline-table");
            $("#C_Empleado").css("display", "inline-table");
            Empleado_true = 1;
        }
        else {
            $("#C_Empleado").css("display", "none");
            Empleado_true = 0;
        }

        if (Banco_true == 0 && Empleado_true == 0) {
            $("#Anexos").css("display", "none");
        }

    });

    $('#Check_EntBancaria').click(function () {
        if ($(this).is(':checked')) {
            $("#Anexos").css("display", "inline-table");
            $("#C_Banco").css("display", "inline-table");
            Banco_true = 1;
        }
        else {
            $("#C_Banco").css("display", "none");
            Banco_true = 0;
        }

        if (Banco_true == 0 && Empleado_true == 0) {
            $("#Anexos").css("display", "none");
        }
    });
}

//validamos campos para la creacion del link
function validarCamposCrear() {

    var validar;
    var T_Persona = ValidatorCampos;

    if (T_Persona == 1) {

        Campo_1 = $("#Select_EmpresaNit").val();
        Campo_2 = $("#Select_Pais").val();
        Campo_3 = $("#Select_Ciudad").val();
        Campo_4 = $("#Select_Documento").val();
        Campo_5 = $("#Txt_Ident").val();
        Campo_6 = $("#TxtNombre").val();
        Campo_7 = $("#Select_Ciudad_Doc").val();
        Campo_8 = $("#Select_TPersona").val();
        Campo_9 = $("#Select_Regimen").val();

        CamposPN = valida_PN();
    }
    else {

        Campo_1 = $("#Select_EmpresaNit").val();
        Campo_2 = $("#Select_Pais").val();
        Campo_3 = $("#Select_Ciudad").val();
        Campo_4 = $("#Select_Documento").val();
        Campo_5 = $("#Txt_Ident").val();
        Campo_6 = $("#TxtNombreNit").val();
        Campo_8 = $("#Select_TPersona").val();
        Campo_9 = $("#Select_Regimen").val();

        CamposPJ = valida_PJ();
    }

    var validar_banco = 0;
    var validar_Empleado = 0;

    if (CamposPJ == 0 && CamposPN == 0) {

        if (Banco_true == 1) {
            Campo_10 = $("#Txt_CodBank").val();
            CamposBanco = valida_Banco();

            if (CamposBanco == 0)
                validar_banco = 0;
            else
                validar_banco = 1;
        }

        if (Empleado_true == 1) {
            Campo_11 = $("#Select_Area").val();
            Campo_12 = $("#Select_Cargo").val();
            CamposEmpleado = valida_Empleados();

            if (CamposEmpleado == 0)
                validar_Empleado = 0;
            else
                validar_Empleado = 1;
        }

        if (validar_banco == 0 && validar_Empleado == 0)
            validar = 0;
        else
            validar = 1;
    }

    return validar;
}

//validacion general (diferente a nit)
function valida_PN() {

    var validar = 0;
    if (Campo_9 == "-1" || Campo_8 == "-1" || Campo_7 == "-1" || Campo_6 == "" || Campo_5 == "" || Campo_4 == "-1" || Campo_3 == "-1" || Campo_2 == "-1" || Campo_1 == "-1") {
        validar = 1;
        if (Campo_1 == "-1")
            $("#ImgMul").css("display", "inline-table");
        else
            $("#ImgMul").css("display", "none");

        if (Campo_2 == "-1")
            $("#ImgPais").css("display", "inline-table");
        else
            $("#ImgPais").css("display", "none");

        if (Campo_3 == "-1")
            $("#Img1").css("display", "inline-table");
        else
            $("#Img1").css("display", "none");

        if (Campo_4 == "-1")
            $("#Img2").css("display", "inline-table");
        else
            $("#Img2").css("display", "none");

        if (Campo_5 == "")
            $("#Img3").css("display", "inline-table");
        else
            $("#Img3").css("display", "none");

        if (Campo_6 == "")
            $("#Img5").css("display", "inline-table");
        else
            $("#Img5").css("display", "none");

        if (Campo_7 == "-1")
            $("#ImgC_Doc").css("display", "inline-table");
        else
            $("#ImgC_Doc").css("display", "none");

        if (Campo_8 == "-1")
            $("#Img9").css("display", "inline-table");
        else
            $("#Img9").css("display", "none");

        if (Campo_9 == "-1")
            $("#Img10").css("display", "inline-table");
        else
            $("#Img10").css("display", "none");
    }
    else {
        $("#ImgC_Doc").css("display", "none");
        $("#ImgMul").css("display", "none");
        $("#ImgPais").css("display", "none");
        $("#Img1").css("display", "none");
        $("#Img2").css("display", "none");
        $("#Img3").css("display", "none");
        $("#Img5").css("display", "none");
        $("#Img9").css("display", "none");
        $("#Img10").css("display", "none");
    }

    return validar;
}

//validacion general (con nit)
function valida_PJ() {

    var validar = 0;

    if (Campo_9 == "-1" || Campo_8 == "-1" || Campo_6 == "" || Campo_5 == "" || Campo_4 == "-1" || Campo_3 == "-1" || Campo_2 == "-1" || Campo_1 == "-1") {
        validar = 1;
        if (Campo_1 == "-1")
            $("#ImgMul").css("display", "inline-table");
        else
            $("#ImgMul").css("display", "none");

        if (Campo_2 == "-1")
            $("#ImgPais").css("display", "inline-table");
        else
            $("#ImgPais").css("display", "none");

        if (Campo_3 == "-1")
            $("#Img1").css("display", "inline-table");
        else
            $("#Img1").css("display", "none");

        if (Campo_4 == "-1")
            $("#Img2").css("display", "inline-table");
        else
            $("#Img2").css("display", "none");

        if (Campo_5 == "")
            $("#Img3").css("display", "inline-table");
        else
            $("#Img3").css("display", "none");

        if (Campo_6 == "")
            $("#Img11").css("display", "inline-table");
        else
            $("#Img11").css("display", "none");

        if (Campo_8 == "-1")
            $("#Img9").css("display", "inline-table");
        else
            $("#Img9").css("display", "none");

        if (Campo_9 == "-1")
            $("#Img10").css("display", "inline-table");
        else
            $("#Img10").css("display", "none");
    }
    else {
        $("#ImgC_Doc").css("display", "none");
        $("#ImgMul").css("display", "none");
        $("#ImgPais").css("display", "none");
        $("#Img1").css("display", "none");
        $("#Img2").css("display", "none");
        $("#Img3").css("display", "none");
        $("#Img11").css("display", "none");
        $("#Img9").css("display", "none");
        $("#Img10").css("display", "none");
    }

    return validar;
}

//validacion campo adicional para bancos 
function valida_Banco() {

    var validar = 0;

    if (Campo_10 == "") {
        validar = 1;

        if (Campo_10 == "")
            $("#Img12").css("display", "inline-table");
        else
            $("#Img12").css("display", "none");

    }
    else {
        $("#Img12").css("display", "none");
    }

    return validar;
}


//validacion campos adicionales para empleados
function valida_Empleados() {

    var validar = 0;

    if (Campo_11 == "-1" || Campo_12 == "-1") {
        validar = 1;

        if (Campo_11 == "-1")
            $("#Img22").css("display", "inline-table");
        else
            $("#Img22").css("display", "none");

        if (Campo_12 == "-1")
            $("#Img23").css("display", "inline-table");
        else
            $("#Img23").css("display", "none");

    }
    else {
        $("#Img22").css("display", "none");
        $("#Img23").css("display", "none");
    }

    return validar;
}

//captura el nombre de la persona
function String_Nombre() {


    if ($("#TxtNombre").val() == "") {
        Nombre_Persona = $("#TxtNombreNit").val();
    }
    else {
        Nombre_Persona = $("#TxtNombre").val() + " " + $("#TxtNombre_2").val() + " " + $("#Txt_Ape_1").val() + " " + $("#Txt_Ape_2").val();
    }
}