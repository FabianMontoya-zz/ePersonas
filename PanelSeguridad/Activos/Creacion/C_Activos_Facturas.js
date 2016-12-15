
//funcion que valida los campos requeridos
function ValidaCamposFactura() {
    var validar = 0;

    var C_FAC_1 = $("#Factura_ID").val();
    var C_FAC_2 = $("#Txt_Fecha_fact").val();
    var C_FAC_3 = $("#Select_Moneda_F").val();
    var C_FAC_4 = $("#Txt_ValFactura").val();
    var C_FAC_5 = $("#Text_Val_Sin_IVA").val();

    if (C_FAC_1 == "" || C_FAC_2 == "" || C_FAC_3 == "-1" || C_FAC_4 == "" || C_FAC_5 == "") {
        validar = 1;
        if (C_FAC_1 == "") { $("#Img_Fac_1").css("display", "inline-table"); } else { $("#Img_Fac_1").css("display", "none"); }
        if (C_FAC_2 == "") { $("#Img_Fac_2").css("display", "inline-table"); } else { $("#Img_Fac_2").css("display", "none"); }
        if (C_FAC_3 == "-1") { $("#Img_Fac_3").css("display", "inline-table"); } else { $("#Img_Fac_3").css("display", "none"); }
        if (C_FAC_4 == "") { $("#Img_Fac_4").css("display", "inline-table"); } else { $("#Img_Fac_4").css("display", "none"); }
        if (C_FAC_5 == "") { $("#Img_Fac_5").css("display", "inline-table"); } else { $("#Img_Fac_5").css("display", "none"); }
    }
    else {
        $("#Img_Fac_1").css("display", "none");
        $("#Img_Fac_2").css("display", "none");
        $("#Img_Fac_3").css("display", "none");
        $("#Img_Fac_4").css("display", "none");
        $("#Img_Fac_5").css("display", "none");
    }
    return validar;
}