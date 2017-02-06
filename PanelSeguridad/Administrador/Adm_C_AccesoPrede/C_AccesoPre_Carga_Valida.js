//carga el combo de Area dependiente
function Change_Select_Nit() {
    console.log("1");
    $("#Select_EmpresaNit").change(function () {
        console.log("aa");
        var index_ID = $(this).val();
        $("#Img5").css("display", "none");
        Charge_Combos_Depend_Nit(Matrix_Persona, "Select_Persona", index_ID, "");
        Charge_Combos_Depend_Nit(Matrix_Tarjeta, "Select_Tarjeta_AccPre", index_ID, "");
    });

    $("#Select_EmpresaNit_Ing").change(function () {
        console.log("aa1");
        var index_ID = $(this).val();
        TransaccionesSegunNIT(index_ID);
        
    });
    transaccionAjax_MPersona('MATRIX_PERSONA');
}

//Valida la informacio a la que puede acceder segun el usuario
function TransaccionesSegunNIT(index_ID) {
    if (index_ID != "-1") {
        Charge_Combos_Depend_Nit(Matrix_PAccesos, "Select_PAcceso", index_ID, "");
        Charge_Combos_Depend_Nit(Matrix_Persona, "Select_Persona_Enc", index_ID, "");
        Change_Select_RPAA();
    }
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
                $("#Select_Tarjeta_AccPre").val(Matrix_RTP[item].Tarjeta_ID);
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
            $("#Select_Tarjeta_AccPre").val("-1");
            $("#Select_Tarjeta_AccPre").attr("disabled", "disabled");
            $('.C_Chosen').trigger('chosen:updated');

            $("#dialog").dialog("option", "title", "No tiene Tarjeta!");
            $("#Mensaje_alert").text("La persona seleccionada no tiene tarjeta asignada!");
            $("#dialog").dialog("open");
            $("#DE").css("display", "None");
            $("#SE").css("display", "none");
            $("#WE").css("display", "block");
            break;

        case "S":
            $("#Select_Tarjeta_AccPre").removeAttr("disabled");
            $('.C_Chosen').trigger('chosen:updated');
            break;
    }

}

//valida los cambios del combo de Persona y carga
function Change_Select_Tarjeta() {
    $("#Select_Tarjeta_AccPre").change(function () {
        var index_ID = $(this).val();
        for (item in Matrix_RTP) {
            if (Matrix_RTP[item].Tarjeta_ID == index_ID) {
                $("#Select_Persona").val(Matrix_RTP[item].Document_ID);
                $('.C_Chosen').trigger('chosen:updated');
            }
        }
    });
}

//validamos campos para la creacion del link
function validarCamposCrear() {
    var validar;

    var Campo_1 = $("#Select_EmpresaNit").val();
    var Campo_2 = $("#Select_Persona").val();
    var Campo_3 = $("#Select_Tarjeta_AccPre").val();
    var Campo_4 = $("#Select_EmpresaNit_Ing").val();
    var Campo_5 = $("#Select_PAcceso").val();
    var Campo_6 = $("#Select_AreaAcceso").val();
    var Campo_7 = $("#Select_Persona_Enc").val();

    var Campo_8 = $("#TxtFinicial").val();
    var Campo_9 = $("#txt_HIVigencia").val();
    var Campo_10 = $("#TxtFfinal").val();
    var Campo_11 = $("#txt_HFVigencia").val();

    var Campo_12 = $("#Select_TypeIngreso").val();

    var Opcional = $("#Select_CheckVigencia").val();

    switch (Opcional) {
        case "S":
            validar = Valida_Diversidad(Opcional, Campo_1, Campo_2, Campo_3, Campo_4, Campo_5, Campo_6, Campo_7, Campo_8, Campo_9, Campo_10, Campo_11, Campo_12);
            break;

        case "N":
            validar = Valida_Diversidad(Opcional, Campo_1, Campo_2, Campo_3, Campo_4, Campo_5, Campo_6, Campo_7, Campo_8, Campo_9, Campo_10, Campo_11, Campo_12);
            break;
    }
    return validar;
}

//validacion segun la opcion llama Funcion
function Valida_Diversidad(Tipo, Campo_1, Campo_2, Campo_3, Campo_4, Campo_5, Campo_6, Campo_7, Campo_8, Campo_9, Campo_10, Campo_11, Campo_12) {
    var validar;

    switch (Tipo) {
        case "S":
            validar = Validacion_2(Campo_1, Campo_2, Campo_3, Campo_4, Campo_5, Campo_6, Campo_7, Campo_8, Campo_9, Campo_10, Campo_11, Campo_12);
            break;

        case "N":
            validar = Validacion_1(Campo_1, Campo_2, Campo_3, Campo_4, Campo_5, Campo_6, Campo_7, Campo_12);
            break;
    }
    return validar;
}

//validacion sin vigencia
function Validacion_1(Campo_1, Campo_2, Campo_3, Campo_4, Campo_5, Campo_6, Campo_7, Campo_12) {
    var validar = 0;
    if (Campo_12 == "-1" || Campo_7 == "-1" || Campo_6 == "-1" ||
         Campo_5 == "-1" || Campo_4 == "-1" || Campo_3 == "-1" ||
         Campo_2 == "-1" || Campo_1 == "-1") {

        validar = 1;

        if (Campo_1 == "-1") { $("#Img1").css("display", "inline-table"); } else { $("#Img1").css("display", "none"); }
        if (Campo_2 == "-1") { $("#Img2").css("display", "inline-table"); } else { $("#Img2").css("display", "none"); }
        if (Campo_3 == "-1") { $("#Img3").css("display", "inline-table"); } else { $("#Img3").css("display", "none"); }
        if (Campo_4 == "-1") { $("#Img5").css("display", "inline-table"); } else { $("#Img5").css("display", "none"); }
        if (Campo_5 == "-1") { $("#Img6").css("display", "inline-table"); } else { $("#Img6").css("display", "none"); }
        if (Campo_6 == "-1") { $("#Img7").css("display", "inline-table"); } else { $("#Img7").css("display", "none"); }
        if (Campo_7 == "-1") { $("#Img8").css("display", "inline-table"); } else { $("#Img8").css("display", "none"); }
        if (Campo_12 == "-1") { $("#Img13").css("display", "inline-table"); } else { $("#Img12").css("display", "none"); }

        $("#Img9").css("display", "none");
        $("#Img10").css("display", "none");
        $("#Img11").css("display", "none");
        $("#Img12").css("display", "none");
    }
    else {
        $("#Img1").css("display", "none");
        $("#Img2").css("display", "none");
        $("#Img3").css("display", "none");
        $("#Img4").css("display", "none");
        $("#Img5").css("display", "none");
        $("#Img6").css("display", "none");
        $("#Img7").css("display", "none");
        $("#Img8").css("display", "none");
        $("#Img9").css("display", "none");
        $("#Img10").css("display", "none");
        $("#Img11").css("display", "none");
        $("#Img12").css("display", "none");
        $("#Img13").css("display", "none");
    }
    return validar;
}

//validacion con vigencia
function Validacion_2(Campo_1, Campo_2, Campo_3, Campo_4, Campo_5, Campo_6, Campo_7, Campo_8, Campo_9, Campo_10, Campo_11, Campo_12) {
    var validar = 0;
    if (Campo_12 == "-1" || Campo_11 == "" || Campo_10 == "" ||
         Campo_9 == "" || Campo_8 == "" || Campo_7 == "-1" ||
         Campo_6 == "-1" || Campo_5 == "-1" || Campo_4 == "-1" ||
         Campo_3 == "-1" || Campo_2 == "-1" || Campo_1 == "-1") {

        validar = 1;

        if (Campo_1 == "-1") { $("#Img1").css("display", "inline-table"); } else { $("#Img1").css("display", "none"); }
        if (Campo_2 == "-1") { $("#Img2").css("display", "inline-table"); } else { $("#Img2").css("display", "none"); }
        if (Campo_3 == "-1") { $("#Img3").css("display", "inline-table"); } else { $("#Img3").css("display", "none"); }
        if (Campo_4 == "-1") { $("#Img5").css("display", "inline-table"); } else { $("#Img5").css("display", "none"); }
        if (Campo_5 == "-1") { $("#Img6").css("display", "inline-table"); } else { $("#Img6").css("display", "none"); }
        if (Campo_6 == "-1") { $("#Img7").css("display", "inline-table"); } else { $("#Img7").css("display", "none"); }
        if (Campo_7 == "-1") { $("#Img8").css("display", "inline-table"); } else { $("#Img8").css("display", "none"); }
        if (Campo_8 == "") { $("#Img9").css("display", "inline-table"); } else { $("#Img9").css("display", "none"); }
        if (Campo_9 == "") { $("#Img10").css("display", "inline-table"); } else { $("#Img10").css("display", "none"); }
        if (Campo_10 == "") { $("#Img11").css("display", "inline-table"); } else { $("#Img11").css("display", "none"); }
        if (Campo_11 == "") { $("#Img12").css("display", "inline-table"); } else { $("#Img12").css("display", "none"); }
        if (Campo_12 == "-1") { $("#Img13").css("display", "inline-table"); } else { $("#Img13").css("display", "none"); }
    }
    else {
        $("#Img1").css("display", "none");
        $("#Img2").css("display", "none");
        $("#Img3").css("display", "none");
        $("#Img4").css("display", "none");
        $("#Img5").css("display", "none");
        $("#Img6").css("display", "none");
        $("#Img7").css("display", "none");
        $("#Img8").css("display", "none");
        $("#Img9").css("display", "none");
        $("#Img10").css("display", "none");
        $("#Img11").css("display", "none");
        $("#Img12").css("display", "none");
        $("#Img13").css("display", "none");
    }
    return validar;
}
