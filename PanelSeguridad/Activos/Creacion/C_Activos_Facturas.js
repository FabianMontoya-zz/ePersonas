/*--------------- region de variables globales --------------------*/
var ArrayFactura = [];
var ListFactura = [];

var ContFactura = 0;
var Valor_Capturado = 0;

/*--------------- region de variables globales --------------------*/

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                           REGION DE VALIDACIONES                                                                                                   ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

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

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                           REGION PROCESO FACTURA                                                                                                  ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//contruye JSON de facturas
function Json_Facturas(Ref_1, Ref_2, Ref_3) {

    var valido = 0;
    try {
        var Flag_rep_Array = Revisar_repetido(Ref_1, Ref_2, Ref_3);

        if (Flag_rep_Array == 0) {
            var JSON_Factura = {
                "Nit_ID": $("#Select_EmpresaNit").val(),
                "Ref_1": Ref_1.toUpperCase(),
                "Ref_2": Ref_2.toUpperCase(),
                "Ref_3": Ref_3.toUpperCase(),
                "Fact_Oct_ID": $("#Factura_ID").val().toUpperCase(),
                "F_Fecha": $("#Txt_Fecha_fact").val(),
                "Cod_Moneda_ID": $("#Select_Moneda").val(),
                "Valor_Sin_IVA": F_NumericBD($("#Text_Val_Sin_IVA").val()),
                "Valor_IVA": F_NumericBD($("#V_Val_IVA").html()),
                "Valor_Total": F_NumericBD($("#Txt_ValFactura").val()),
                "Index": ContFactura,
                "DescripMoneda": $("#Select_Moneda option:selected").html(),
                "UsuarioCreacion": User.toUpperCase()
            }
            ArrayFactura.push(JSON_Factura);
            Valor_Operativo = F_NumericBD($("#Txt_ValFactura").val());
            SumarValores_Grid(F_NumericBD($("#Txt_ValFactura").val()), Suma_Valor_Inicial, "V_TFacturas");

            ContFactura = ContFactura + 1;
            Tabla_factura();
            Clear_Factura();
        }
        else
            Mensaje_General("Factura Repetida!", "La Factura ya fue ingresada en la lista!", "W");

    } catch (ex) {
        valido = 1;
        console.error("Error JSON Facturas: " + ex);
    }
    return valido;

}

//validamos si la fctura digitada ya fue ingresada en el array JSON
function Revisar_repetido(Ref_1, Ref_2, Ref_3) {
    var Flag_Repetido = 0;
    try {
        var Nit_I = $("#Select_EmpresaNit").val();
        var Fact = $("#Factura_ID").val();
        for (itemArray in ArrayFactura) {
            if (Nit_I == ArrayFactura[itemArray].Nit_ID &&
                Ref_1.toUpperCase() == ArrayFactura[itemArray].Ref_1 &&
                Ref_2.toUpperCase() == ArrayFactura[itemArray].Ref_2 &&
                Ref_3.toUpperCase() == ArrayFactura[itemArray].Ref_3 &&
                Fact.toUpperCase() == ArrayFactura[itemArray].Fact_Oct_ID) {
                Flag_Repetido = 1;
            }
        }
        return Flag_Repetido;
    } catch (ex) {
        Flag_Repetido = 1;
        console.error("Error JSON Facturas: " + ex);
    }
}

//construccion de tabla grid facturas
function Tabla_factura() {
    var Html;

    Html = "<table id='T_Fact' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th><span class='cssToolTip_ver'><img alt='Activo' class='Add' onclick='javascript:Add_Facturas();' id='Crear' height='20px' width='20px' src='../../images/add.png' /><span>Agregar  Nueva Factura</span></span></th> <th>Identificación Factura</th><th>Identificación Factura</th><th>Identificación Factura</th><th>Producto</th><th>Moneda</th></tr></thead><tbody>";
    for (itemArray in ArrayFactura) {
        if (ArrayFactura[itemArray].Contrato_ID != 0) {
            Html += "<tr id= 'T_Fact" + ArrayFactura[itemArray].Index + "'><td><input type ='radio' class= 'Eliminar' name='eliminar' onclick=\"Eliminar_Registro('" + ArrayFactura[itemArray].Index + "')\"></input></td><td>" + ArrayFactura[itemArray].Ref_1 + "</td><td>" + ArrayFactura[itemArray].Ref_2 + "</td><td>" + ArrayFactura[itemArray].Ref_3 + "</td><td>" + ArrayFactura[itemArray].Fact_Oct_ID + "</td><td>" + ArrayFactura[itemArray].DescripMoneda + "</td></tr>";
        }
    }

    Html += "</tbody></table>";
    $("#Container_Facturas").html("");
    $("#Container_Facturas").html(Html);

    $("#T_Fact").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });

}

//eliminar facturas del array y tabla
function Eliminar_Registro(index) {
    //borramos registro deseado
    var Valor_Operativo = ArrayFactura[index].Valor_Total;
    RestarValores_Grid(Suma_Valor_Inicial, Valor_Operativo, "V_TFacturas");
    ArrayFactura.splice(index, 1);
    Tabla_factura();
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                              MENSAJES, VISUALIZACION Y LIMPIEZA                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//limpia las facturas
function Clear_Factura() {

    $("#Factura_ID").val("");
    $("#Txt_Fecha_fact").val("");
    $("#Txt_ValFactura").val("");
    $("#Text_Val_Sin_IVA").val("");

    $("#V_Val_IVA").html("");

    $('.C_Chosen').trigger('chosen:updated');
}

