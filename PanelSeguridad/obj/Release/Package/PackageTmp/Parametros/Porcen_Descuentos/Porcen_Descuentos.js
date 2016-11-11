/*--------------- region de variables globales --------------------*/
var ArrayPorcen_Descuentos = [];
var ArrayCombo = [];
var ArrayPaises = [];
var ArrayCiudades = [];
var ArrayImpuesto_Gasto = [];

var estado;
var editCod_ID;
var editCiudad_ID;
var editInf_Impuesto_ID;
var editRangoInicial_ID;
var editRangoFinal_ID;

var editTypeLimit_ID;
var editLimit_Min_ID;
var editLimit_Max_ID;

/*--------------- region de variables globales --------------------*/

//evento load de los Links
$(document).ready(function () {
    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
    transacionAjax_Pais('Pais');
    transacionAjax_Impuesto('Impuesto');

    $("#ESelect").css("display", "none");
    $("#ImgPais").css("display", "none");
    $("#Img1").css("display", "none");
    $("#Img2").css("display", "none");
    $("#Img3").css("display", "none");
    $("#Img5").css("display", "none");
    $("#Img6").css("display", "none");
    $("#Img7").css("display", "none");
    $("#Img8").css("display", "none");
    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WE").css("display", "none");

    $("#TablaDatos").css("display", "none");
    $("#TablaConsulta").css("display", "none");

    //funcion para las ventanas emergentes
    $("#dialog").dialog({
        dialogClass: "Dialog_Sasif",
        modal: true,
        autoOpen: false
    });

    $("#dialog_eliminar").dialog({
        dialogClass: "Dialog_Sasif",
        modal: true,
        autoOpen: false
    });

    $("#Dialog_Visualiza").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 660,
        height: 660,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
    });

    $(function () {

        $("#TxtRFinal").datepicker({ dateFormat: 'yy-mm-dd' });
        $("#TxtRInicial").datepicker({ dateFormat: 'yy-mm-dd' });
        $("#TxtFecha_1").datepicker({ dateFormat: 'yy-mm-dd' });
        $("#TxtFecha_2").datepicker({ dateFormat: 'yy-mm-dd' });
        $("#TxtFecha_3").datepicker({ dateFormat: 'yy-mm-dd' });
        $("#TxtFecha_4").datepicker({ dateFormat: 'yy-mm-dd' });

        $("#Acordeon_Dat").accordion({
            heightStyle: "content"
        });
    });

    Change_Select_pais();
    break_Fecha();
});

//limpia campos fecha
function break_Fecha() {

    $("#TxtRInicial").focus(function () {
        $("#TxtRInicial").val("");
    });
  
    $("#TxtRFinal").focus(function () {
        $("#TxtRFinal").val("");
    });
 
    $("#TxtFecha_1").focus(function () {
        $("#TxtFecha_1").val("");
    });
   
    $("#TxtFecha_2").focus(function () {
        $("#TxtFecha_2").val("");
    });
    
    $("#TxtFecha_3").focus(function () {
        $("#TxtFecha_3").val("");
    });
   
    $("#TxtFecha_4").focus(function () {
        $("#TxtFecha_4").val("");
    });

}


//carga el combo de paises
function Change_Select_pais() {
    $("#Select_Pais").change(function () {
        var Str_pais = $("#Select_Pais option:selected").html();
        var SplitPais = Str_pais.split(" - ");

        $('#Select_Ciudad').empty();
        transacionAjax_Ciudad('Ciudad', SplitPais[0]);

    });

}


//salida del formulario
function btnSalir() {
    window.location = "../../Menu/menu.aspx?User=" + $("#User").html() + "&L_L=" + Link;
}

//habilita el panel de crear o consulta
function HabilitarPanel(opcion) {

    switch (opcion) {

        case "crear":
            $("#TablaDatos").css("display", "inline-table");
            $("#TablaConsulta").css("display", "none");

            $("#Select_Pais").removeAttr("disabled");
            $("#Select_Ciudad").removeAttr("disabled");
            $("#Select_Impuesto").removeAttr("disabled");
            $("#TxtRInicial").removeAttr("disabled");
            $("#TxtRFinal").removeAttr("disabled");
            $("#Select_LTipo").removeAttr("disabled");
            $("#Txt_LInf").removeAttr("disabled");
            $("#Txt_Sup").removeAttr("disabled");
            $("#Btnguardar").attr("value", "Guardar");

            $('.C_Chosen').trigger('chosen:updated');
            ResetError();
            Clear();
            estado = opcion;
            break;

        case "buscar":
            $("#TablaDatos").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TPorcen_Descuentos").html("");
            estado = opcion;
            Clear();
            break;

        case "modificar":
            $("#TablaDatos").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TPorcen_Descuentos").html("");
            estado = opcion;
            ResetError();
            Clear();
            break;

        case "eliminar":
            $("#TablaDatos").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TPorcen_Descuentos").html("");
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
        transacionAjax_Porcen_Descuentos("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_Porcen_Descuentos("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        var valYear = $("#TxtYear").val();
        if (valYear < 2010 || valYear > 2025) {
            $("#dialog").dialog("option", "title", "Atención");
            $("#Mensaje_alert").text("El rango de años es del 2010 al 2025");
            $("#dialog").dialog("open");
            $("#DE").css("display", "none");
            $("#SE").css("display", "none");
            $("#WE").css("display", "block");
        }
        else {
            if ($("#Btnguardar").val() == "Guardar") {
                transacionAjax_Porcen_Descuentos_create("crear");
            }
            else {
                transacionAjax_Porcen_Descuentos_create("modificar");
            }
        }
    }
}

//elimina de la BD
function BtnElimina() {
    transacionAjax_Porcen_Descuentos_delete("elimina");
}


//validamos campos para la creacion del link
function validarCamposCrear() {

    var Campo_1 = $("#Select_Pais").val();
    var Campo_2 = $("#Select_Ciudad").val();
    var Campo_3 = $("#Select_Impuesto").val();

    var validar = 0;

    if (Campo_3 == "-1" || Campo_2 == "-1" || Campo_1 == "-1") {
        validar = 1;
        if (Campo_1 == "-1")
            $("#ImgPais").css("display", "inline-table");
        else
            $("#ImgPais").css("display", "none");

        if (Campo_2 == "-1")
            $("#Img1").css("display", "inline-table");
        else
            $("#Img1").css("display", "none");

        if (Campo_3 == "-1")
            $("#Img2").css("display", "inline-table");
        else
            $("#Img2").css("display", "none");

    }
    else {
        $("#ImgPais").css("display", "none");
        $("#Img1").css("display", "none");
        $("#Img2").css("display", "none");
    }
    return validar;
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

// crea la tabla en el cliente
function Table_Porcen_Descuentos() {

    switch (estado) {

        case "buscar":
            Tabla_consulta();
            break;

        case "modificar":
            Tabla_modificar();
            break;

        case "eliminar":
            Tabla_eliminar();
            break;
    }

}

//grid con el boton eliminar
function Tabla_eliminar() {
    var html_Porcen_Descuentos = "<table id='TPorcen_Descuentos' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Ver</th><th>Eliminar</th><th>Pais</th><th>Ciudad</th><th>Impuesto</th><th>Rango Inicial</th><th>Rango Final</th><th>Tipo Limite</th><th>Limite Inferior</th><th>Limite Superior</th><th>Prmera Fecha</th><th>Primer % Descuento</th><th>Primer Valor</th><th>Segunda Fecha</th><th>Segundo % Descuento</th><th>Segundo Valor</th><th>Tercera Fecha</th><th>Tercer % Descuento</th><th>Tercer Valor</th><th>Cuarta Fecha</th><th>Cuarto % Descuento</th><th>Cuarto Valor</th></tr></thead><tbody>";
    for (itemArray in ArrayPorcen_Descuentos) {
        if (ArrayPorcen_Descuentos[itemArray].Porcen_Descuentos_ID != 0) {

            var StrCiudad = ArrayPorcen_Descuentos[itemArray].DescripCiudad
            var ArraySplit = StrCiudad.split("_");

            var StrTipo = "";

            if (ArrayPorcen_Descuentos[itemArray].Type_Limit != 0)
                StrTipo = ArrayPorcen_Descuentos[itemArray].Type_Limit + " - " + ArrayPorcen_Descuentos[itemArray].DescripTipo;

            html_Porcen_Descuentos += "<tr><td><input type ='radio' class= 'Ver' name='ver' onclick=\"Ver('" + ArrayPorcen_Descuentos[itemArray].Cod_ID + "','" + ArrayPorcen_Descuentos[itemArray].Ciudad_ID + "','" + ArrayPorcen_Descuentos[itemArray].Impuesto_Gasto_ID + "', '" + ArrayPorcen_Descuentos[itemArray].RangoInicial_ID + "', '" + ArrayPorcen_Descuentos[itemArray].RangoFinal_ID + "', '" + ArrayPorcen_Descuentos[itemArray].Type_Limit + "', '" + ArrayPorcen_Descuentos[itemArray].Limit_Min + "', '" + ArrayPorcen_Descuentos[itemArray].Limit_Max + "')\"></input></td><td><input type ='radio' class= 'Eliminar' name='eliminar' onclick=\"Eliminar('" + ArrayPorcen_Descuentos[itemArray].Cod_ID + "','" + ArrayPorcen_Descuentos[itemArray].Ciudad_ID + "','" + ArrayPorcen_Descuentos[itemArray].Impuesto_Gasto_ID + "', '" + ArrayPorcen_Descuentos[itemArray].RangoInicial_ID + "', '" + ArrayPorcen_Descuentos[itemArray].RangoFinal_ID + "', '" + ArrayPorcen_Descuentos[itemArray].Type_Limit + "', '" + ArrayPorcen_Descuentos[itemArray].Limit_Min + "', '" + ArrayPorcen_Descuentos[itemArray].Limit_Max + "')\"></input></td><td>" + ArrayPorcen_Descuentos[itemArray].DescripCod + "</td><td>" + ArrayPorcen_Descuentos[itemArray].DescripCiudad + "</td><td>" + ArrayPorcen_Descuentos[itemArray].Impuesto_Gasto_ID + " - " + ArrayPorcen_Descuentos[itemArray].DescripImpuesto_Gasto + "</td><td>" + valFecha(ArrayPorcen_Descuentos[itemArray].RangoInicial_ID) + "</td><td>" + valFecha(ArrayPorcen_Descuentos[itemArray].RangoFinal_ID) + "</td> <td>" + StrTipo + "</td><td>" + ArrayPorcen_Descuentos[itemArray].Limit_Min + "</td><td>" + ArrayPorcen_Descuentos[itemArray].Limit_Max + "</td><td>" + valFecha(ArrayPorcen_Descuentos[itemArray].MesDia_1) + "</td><td>" + ArrayPorcen_Descuentos[itemArray].Porcentaje_1 + " %" + "</td><td>" + dinner_format_grid(ArrayPorcen_Descuentos[itemArray].Valor_Vencimiento_1, "1") + "</td><td>" + valFecha(ArrayPorcen_Descuentos[itemArray].MesDia_2) + "</td><td>" + ArrayPorcen_Descuentos[itemArray].Porcentaje_2 + " %" + "</td><td>" + dinner_format_grid(ArrayPorcen_Descuentos[itemArray].Valor_Vencimiento_2, "1") + "</td><td>" + valFecha(ArrayPorcen_Descuentos[itemArray].MesDia_3) + "</td><td>" + ArrayPorcen_Descuentos[itemArray].Porcentaje_3 + " %" + "</td><td>" + dinner_format_grid(ArrayPorcen_Descuentos[itemArray].Valor_Vencimiento_4, "1") + "</td><td>" + valFecha(ArrayPorcen_Descuentos[itemArray].MesDia_4) + "</td><td>" + ArrayPorcen_Descuentos[itemArray].Porcentaje_4 + " %" + "</td><td>" + dinner_format_grid(ArrayPorcen_Descuentos[itemArray].Valor_Vencimiento_4, "1") + "</td></tr>";
        }
    }
    html_Porcen_Descuentos += "</tbody></table>";
    $("#container_TPorcen_Descuentos").html("");
    $("#container_TPorcen_Descuentos").html(html_Porcen_Descuentos);

    $(".Eliminar").click(function () {
    });

    $(".Ver").click(function () {
    });

    $("#TPorcen_Descuentos").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Eliminar(index_Pais, index_Ciudad, index_Inf_Impuesto, index_RangoInicial_ID, index_RangoFinal_ID, index_TLimit, index_Lmin, index_Lmax) {

    for (itemArray in ArrayPorcen_Descuentos) {
        if (index_Pais == ArrayPorcen_Descuentos[itemArray].Cod_ID &&
        index_Ciudad == ArrayPorcen_Descuentos[itemArray].Ciudad_ID &&
        index_Inf_Impuesto == ArrayPorcen_Descuentos[itemArray].Impuesto_Gasto_ID &&
        index_RangoInicial_ID == ArrayPorcen_Descuentos[itemArray].RangoInicial_ID &&
        index_RangoFinal_ID == ArrayPorcen_Descuentos[itemArray].RangoFinal_ID &&
        index_TLimit == ArrayPorcen_Descuentos[itemArray].Type_Limit &&
        index_Lmin == ArrayPorcen_Descuentos[itemArray].Limit_Min &&
        index_Lmax == ArrayPorcen_Descuentos[itemArray].Limit_Max) {

            editCod_ID = ArrayPorcen_Descuentos[itemArray].Cod_ID;
            editCiudad_ID = ArrayPorcen_Descuentos[itemArray].Ciudad_ID;
            editInf_Impuesto_ID = ArrayPorcen_Descuentos[itemArray].Impuesto_Gasto_ID;
            editRangoInicial_ID = ArrayPorcen_Descuentos[itemArray].RangoInicial_ID;
            editRangoFinal_ID = ArrayPorcen_Descuentos[itemArray].RangoFinal_ID;

            editTypeLimit_ID = ArrayPorcen_Descuentos[itemArray].Type_Limit;
            editLimit_Min_ID = ArrayPorcen_Descuentos[itemArray].Limit_Min;
            editLimit_Max_ID = ArrayPorcen_Descuentos[itemArray].Limit_Max;

            $("#dialog_eliminar").dialog("option", "title", "Eliminar?");
            $("#dialog_eliminar").dialog("open");
        }
    }

}

//grid con el boton editar
function Tabla_modificar() {
    var html_Porcen_Descuentos = "<table id='TPorcen_Descuentos' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Ver</th><th>Editar</th><th>Pais</th><th>Ciudad</th><th>Impuesto</th><th>Rango Inicial</th><th>Rango Final</th><th>Tipo Limite</th><th>Limite Inferior</th><th>Limite Superior</th><th>Prmera Fecha</th><th>Primer % Descuento</th><th>Primer Valor</th><th>Segunda Fecha</th><th>Segundo % Descuento</th><th>Segundo Valor</th><th>Tercera Fecha</th><th>Tercer % Descuento</th><th>Tercer Valor</th><th>Cuarta Fecha</th><th>Cuarto % Descuento</th><th>Cuarto Valor</th></tr></thead><tbody>";
    for (itemArray in ArrayPorcen_Descuentos) {
        if (ArrayPorcen_Descuentos[itemArray].Impuesto_Gasto_ID != 0) {

            var StrCiudad = ArrayPorcen_Descuentos[itemArray].DescripCiudad
            var ArraySplit = StrCiudad.split("_");

            var StrTipo = "";

            if (ArrayPorcen_Descuentos[itemArray].Type_Limit != 0)
                StrTipo = ArrayPorcen_Descuentos[itemArray].Type_Limit + " - " + ArrayPorcen_Descuentos[itemArray].DescripTipo;

            html_Porcen_Descuentos += "<tr><td><input type ='radio' class= 'Ver' name='ver' onclick=\"Ver('" + ArrayPorcen_Descuentos[itemArray].Cod_ID + "','" + ArrayPorcen_Descuentos[itemArray].Ciudad_ID + "','" + ArrayPorcen_Descuentos[itemArray].Impuesto_Gasto_ID + "', '" + ArrayPorcen_Descuentos[itemArray].RangoInicial_ID + "', '" + ArrayPorcen_Descuentos[itemArray].RangoFinal_ID + "', '" + ArrayPorcen_Descuentos[itemArray].Type_Limit + "', '" + ArrayPorcen_Descuentos[itemArray].Limit_Min + "', '" + ArrayPorcen_Descuentos[itemArray].Limit_Max + "')\"></input></td><td><input type ='radio' class= 'Editar' name='editar' onclick=\"Editar('" + ArrayPorcen_Descuentos[itemArray].Cod_ID + "','" + ArrayPorcen_Descuentos[itemArray].Ciudad_ID + "','" + ArrayPorcen_Descuentos[itemArray].Impuesto_Gasto_ID + "', '" + ArrayPorcen_Descuentos[itemArray].RangoInicial_ID + "', '" + ArrayPorcen_Descuentos[itemArray].RangoFinal_ID + "', '" + ArrayPorcen_Descuentos[itemArray].Type_Limit + "', '" + ArrayPorcen_Descuentos[itemArray].Limit_Min + "', '" + ArrayPorcen_Descuentos[itemArray].Limit_Max + "')\"></input></td><td>" + ArrayPorcen_Descuentos[itemArray].DescripCod + "</td><td>" + ArrayPorcen_Descuentos[itemArray].DescripCiudad + "</td><td>" + ArrayPorcen_Descuentos[itemArray].Impuesto_Gasto_ID + " - " + ArrayPorcen_Descuentos[itemArray].DescripImpuesto_Gasto + "</td><td>" + valFecha(ArrayPorcen_Descuentos[itemArray].RangoInicial_ID) + "</td><td>" + valFecha(ArrayPorcen_Descuentos[itemArray].RangoFinal_ID) + "</td> <td>" + StrTipo + "</td><td>" + ArrayPorcen_Descuentos[itemArray].Limit_Min + "</td><td>" + ArrayPorcen_Descuentos[itemArray].Limit_Max + "</td><td>" + valFecha(ArrayPorcen_Descuentos[itemArray].MesDia_1) + "</td><td>" + ArrayPorcen_Descuentos[itemArray].Porcentaje_1 + " %" + "</td><td>" + dinner_format_grid(ArrayPorcen_Descuentos[itemArray].Valor_Vencimiento_1, "1") + "</td><td>" + valFecha(ArrayPorcen_Descuentos[itemArray].MesDia_2) + "</td><td>" + ArrayPorcen_Descuentos[itemArray].Porcentaje_2 + " %" + "</td><td>" + dinner_format_grid(ArrayPorcen_Descuentos[itemArray].Valor_Vencimiento_2, "1") + "</td><td>" + valFecha(ArrayPorcen_Descuentos[itemArray].MesDia_3) + "</td><td>" + ArrayPorcen_Descuentos[itemArray].Porcentaje_3 + " %" + "</td><td>" + dinner_format_grid(ArrayPorcen_Descuentos[itemArray].Valor_Vencimiento_4, "1") + "</td><td>" + valFecha(ArrayPorcen_Descuentos[itemArray].MesDia_4) + "</td><td>" + ArrayPorcen_Descuentos[itemArray].Porcentaje_4 + " %" + "</td><td>" + dinner_format_grid(ArrayPorcen_Descuentos[itemArray].Valor_Vencimiento_4, "1") + "</td></tr>";
        }
    }
    html_Porcen_Descuentos += "</tbody></table>";
    $("#container_TPorcen_Descuentos").html("");
    $("#container_TPorcen_Descuentos").html(html_Porcen_Descuentos);

    $(".Editar").click(function () {
    });

    $(".Ver").click(function () {
    });

    $("#TPorcen_Descuentos").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

var StrCiudad;

// muestra el registro a editar
function Editar(index_Pais, index_Ciudad, index_Inf_Impuesto, index_RangoInicial_ID, index_RangoFinal_ID, index_TLimit, index_Lmin, index_Lmax) {

    $("#TablaDatos").css("display", "inline-table");
    $("#TablaConsulta").css("display", "none");

    for (itemArray in ArrayPorcen_Descuentos) {
        if (index_Pais == ArrayPorcen_Descuentos[itemArray].Cod_ID &&
            index_Ciudad == ArrayPorcen_Descuentos[itemArray].Ciudad_ID &&
            index_Inf_Impuesto == ArrayPorcen_Descuentos[itemArray].Impuesto_Gasto_ID &&
            index_RangoInicial_ID == ArrayPorcen_Descuentos[itemArray].RangoInicial_ID &&
            index_RangoFinal_ID == ArrayPorcen_Descuentos[itemArray].RangoFinal_ID &&
            index_TLimit == ArrayPorcen_Descuentos[itemArray].Type_Limit &&
            index_Lmin == ArrayPorcen_Descuentos[itemArray].Limit_Min &&
            index_Lmax == ArrayPorcen_Descuentos[itemArray].Limit_Max) {

            editCod_ID = ArrayPorcen_Descuentos[itemArray].Cod_ID;
            editCiudad_ID = ArrayPorcen_Descuentos[itemArray].Ciudad_ID;
            editInf_Impuesto_ID = ArrayPorcen_Descuentos[itemArray].Impuesto_Gasto_ID;
            editRangoInicial_ID = ArrayPorcen_Descuentos[itemArray].RangoInicial_ID;
            editRangoFinal_ID = ArrayPorcen_Descuentos[itemArray].RangoFinal_ID;

            editTypeLimit_ID = ArrayPorcen_Descuentos[itemArray].Type_Limit;
            editLimit_Min_ID = ArrayPorcen_Descuentos[itemArray].Limit_Min;
            editLimit_Max_ID = ArrayPorcen_Descuentos[itemArray].Limit_Max;

            $("#Select_Pais").val(ArrayPorcen_Descuentos[itemArray].Cod_ID);
            setTimeout("$('#Select_Pais').trigger('change');", 200);

            $("#Select_LTipo").val(ArrayPorcen_Descuentos[itemArray].Type_Limit);
            $("#Txt_LInf").val(ArrayPorcen_Descuentos[itemArray].Limit_Min);
            $("#Txt_Sup").val(ArrayPorcen_Descuentos[itemArray].Limit_Max);

            StrCiudad = ArrayPorcen_Descuentos[itemArray].Ciudad_ID;
            $("#Select_Impuesto").val(ArrayPorcen_Descuentos[itemArray].Impuesto_Gasto_ID);
            $("#TxtRInicial").val(valFecha(ArrayPorcen_Descuentos[itemArray].RangoInicial_ID));
            $("#TxtRFinal").val(valFecha(ArrayPorcen_Descuentos[itemArray].RangoFinal_ID));

            $("#TxtFecha_1").val(valFecha(ArrayPorcen_Descuentos[itemArray].MesDia_1));
            $("#TxtFecha_2").val(valFecha(ArrayPorcen_Descuentos[itemArray].MesDia_2));
            $("#TxtFecha_3").val(valFecha(ArrayPorcen_Descuentos[itemArray].MesDia_3));
            $("#TxtFecha_4").val(valFecha(ArrayPorcen_Descuentos[itemArray].MesDia_4));
            $("#TxtPorcen_1").val(ArrayPorcen_Descuentos[itemArray].Porcentaje_1);
            $("#TxtPorcen_2").val(ArrayPorcen_Descuentos[itemArray].Porcentaje_2);
            $("#TxtPorcen_3").val(ArrayPorcen_Descuentos[itemArray].Porcentaje_3);
            $("#TxtPorcen_4").val(ArrayPorcen_Descuentos[itemArray].Porcentaje_4);
            $("#TxtValor_1").val(dinner_format_grid(ArrayPorcen_Descuentos[itemArray].Valor_Vencimiento_1, "0"));
            $("#TxtValor_2").val(dinner_format_grid(ArrayPorcen_Descuentos[itemArray].Valor_Vencimiento_2, "0"));
            $("#TxtValor_3").val(dinner_format_grid(ArrayPorcen_Descuentos[itemArray].Valor_Vencimiento_3, "0"));
            $("#TxtValor_4").val(dinner_format_grid(ArrayPorcen_Descuentos[itemArray].Valor_Vencimiento_4, "0"));

            $("#Btnguardar").attr("value", "Actualizar");

            $("#Select_Pais").attr("disabled", "disabled");
            $("#Select_Ciudad").attr("disabled", "disabled");
            $("#Select_Impuesto").attr("disabled", "disabled");
            $("#TxtRInicial").attr("disabled", "disabled");
            $("#TxtRFinal").attr("disabled", "disabled");
            $("#Select_LTipo").attr("disabled", "disabled");
            $("#Txt_LInf").attr("disabled", "disabled");
            $("#Txt_Sup").attr("disabled", "disabled");

            setTimeout("ChargeCiudad(StrCiudad);", 300);


            $('.C_Chosen').trigger('chosen:updated');
        }
    }
}

//funcion de carga de lacuidad para edicion
function ChargeCiudad(index) {
    $('#Select_Ciudad').val(index);
    $('.C_Chosen').trigger('chosen:updated');
}


//grid sin botones para ver resultado
function Tabla_consulta() {
    var html_Porcen_Descuentos = "<table id='TPorcen_Descuentos' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Ver</th><th>Pais</th><th>Ciudad</th><th>Impuesto</th><th>Rango Inicial</th><th>Rango Final</th><th>Tipo Limite</th><th>Limite Inferior</th><th>Limite Superior</th><th>Prmera Fecha</th><th>Primer % Descuento</th><th>Primer Valor</th><th>Segunda Fecha</th><th>Segundo % Descuento</th><th>Segundo Valor</th><th>Tercera Fecha</th><th>Tercer % Descuento</th><th>Tercer Valor</th><th>Cuarta Fecha</th><th>Cuarto % Descuento</th><th>Cuarto Valor</th></tr></thead><tbody>";
    for (itemArray in ArrayPorcen_Descuentos) {
        if (ArrayPorcen_Descuentos[itemArray].Porcen_Descuentos_ID != 0) {

            var StrCiudad = ArrayPorcen_Descuentos[itemArray].DescripCiudad
            var ArraySplit = StrCiudad.split("_");

            var StrTipo = "";

            if (ArrayPorcen_Descuentos[itemArray].Type_Limit != 0)
                StrTipo = ArrayPorcen_Descuentos[itemArray].Type_Limit + " - " + ArrayPorcen_Descuentos[itemArray].DescripTipo;

            html_Porcen_Descuentos += "<tr><td><input type ='radio' class= 'Ver' name='ver' onclick=\"Ver('" + ArrayPorcen_Descuentos[itemArray].Cod_ID + "','" + ArrayPorcen_Descuentos[itemArray].Ciudad_ID + "','" + ArrayPorcen_Descuentos[itemArray].Impuesto_Gasto_ID + "', '" + ArrayPorcen_Descuentos[itemArray].RangoInicial_ID + "', '" + ArrayPorcen_Descuentos[itemArray].RangoFinal_ID + "', '" + ArrayPorcen_Descuentos[itemArray].Type_Limit + "', '" + ArrayPorcen_Descuentos[itemArray].Limit_Min + "', '" + ArrayPorcen_Descuentos[itemArray].Limit_Max + "')\"></input></td><td>" + ArrayPorcen_Descuentos[itemArray].DescripCod + "</td><td>" + ArrayPorcen_Descuentos[itemArray].DescripCiudad + "</td><td>" + ArrayPorcen_Descuentos[itemArray].Impuesto_Gasto_ID + " - " + ArrayPorcen_Descuentos[itemArray].DescripImpuesto_Gasto + "</td><td>" + valFecha(ArrayPorcen_Descuentos[itemArray].RangoInicial_ID) + "</td><td>" + valFecha(ArrayPorcen_Descuentos[itemArray].RangoFinal_ID) + "</td> <td>" + StrTipo + "</td><td>" + ArrayPorcen_Descuentos[itemArray].Limit_Min + "</td><td>" + ArrayPorcen_Descuentos[itemArray].Limit_Max + "</td><td>" + valFecha(ArrayPorcen_Descuentos[itemArray].MesDia_1) + "</td><td>" + ArrayPorcen_Descuentos[itemArray].Porcentaje_1 + " %" + "</td><td>" + dinner_format_grid(ArrayPorcen_Descuentos[itemArray].Valor_Vencimiento_1, "1") + "</td><td>" + valFecha(ArrayPorcen_Descuentos[itemArray].MesDia_2) + "</td><td>" + ArrayPorcen_Descuentos[itemArray].Porcentaje_2 + " %" + "</td><td>" + dinner_format_grid(ArrayPorcen_Descuentos[itemArray].Valor_Vencimiento_2, "1") + "</td><td>" + valFecha(ArrayPorcen_Descuentos[itemArray].MesDia_3) + "</td><td>" + ArrayPorcen_Descuentos[itemArray].Porcentaje_3 + " %" + "</td><td>" + dinner_format_grid(ArrayPorcen_Descuentos[itemArray].Valor_Vencimiento_3, "1") + "</td><td>" + valFecha(ArrayPorcen_Descuentos[itemArray].MesDia_4) + "</td><td>" + ArrayPorcen_Descuentos[itemArray].Porcentaje_4 + " %" + "</td><td>" + dinner_format_grid(ArrayPorcen_Descuentos[itemArray].Valor_Vencimiento_4, "1") + "</td></tr>";
        }
    }
    html_Porcen_Descuentos += "</tbody></table>";
    $("#container_TPorcen_Descuentos").html("");
    $("#container_TPorcen_Descuentos").html(html_Porcen_Descuentos);

    $(".Ver").click(function () {
    });

    $("#TPorcen_Descuentos").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//evento del boton salir
function x() {
    $("#dialog").dialog("close");
}

//limpiar campos
function Clear() {
    $("#Select_Pais").val("-1");
    $("#Select_Ciudad").val("-1");
    $("#Select_Impuesto").val("-1");

    $("#TxtRFinal").val("");
    $("#TxtRInicial").val("");

    $("#Select_LTipo").val("-1");
    $("#Txt_LInf").val("");
    $("#Txt_Sup").val("");

    $("#TxtFecha_1").val("");
    $("#TxtFecha_2").val("");
    $("#TxtFecha_3").val("");
    $("#TxtFecha_4").val("");
    $("#TxtPorcen_1").val("");
    $("#TxtPorcen_2").val("");
    $("#TxtPorcen_3").val("");
    $("#TxtPorcen_4").val("");
    $("#TxtValor_1").val("");
    $("#TxtValor_2").val("");
    $("#TxtValor_3").val("");
    $("#TxtValor_4").val("");

    $("#TxtRead").val("");
    $("#DDLColumns").val("-1");

    $('.C_Chosen').trigger('chosen:updated');
}

// muestra el registro a ver
function Ver(index_Pais, index_Ciudad, index_Inf_Impuesto, index_RangoInicial_ID, index_RangoFinal_ID, index_TLimit, index_Lmin, index_Lmax) {

    for (itemArray in ArrayPorcen_Descuentos) {
        if (index_Pais == ArrayPorcen_Descuentos[itemArray].Cod_ID &&
            index_Ciudad == ArrayPorcen_Descuentos[itemArray].Ciudad_ID &&
            index_Inf_Impuesto == ArrayPorcen_Descuentos[itemArray].Impuesto_Gasto_ID &&
            index_RangoInicial_ID == ArrayPorcen_Descuentos[itemArray].RangoInicial_ID &&
            index_RangoFinal_ID == ArrayPorcen_Descuentos[itemArray].RangoFinal_ID &&
            index_TLimit == ArrayPorcen_Descuentos[itemArray].Type_Limit &&
            index_Lmin == ArrayPorcen_Descuentos[itemArray].Limit_Min &&
            index_Lmax == ArrayPorcen_Descuentos[itemArray].Limit_Max) {

            var StrCiudad = ArrayPorcen_Descuentos[itemArray].DescripCiudad;
            var ArraySplit = StrCiudad.split("_");

            $("#V_Pais").html(ArrayPorcen_Descuentos[itemArray].DescripCod);
            $("#V_Ciudad").html(ArrayPorcen_Descuentos[itemArray].DescripCiudad);
            $("#V_Municipio").html(ArrayPorcen_Descuentos[itemArray].Impuesto_Gasto_ID + " - " + ArrayPorcen_Descuentos[itemArray].DescripImpuesto_Gasto);
            $("#V_Inicial").html(ArrayPorcen_Descuentos[itemArray].RangoInicial_ID);
            $("#V_Final").html(ArrayPorcen_Descuentos[itemArray].RangoFinal_ID);

            $("#V_F_1").html(valFecha(ArrayPorcen_Descuentos[itemArray].MesDia_1));
            $("#V_F_2").html(valFecha(ArrayPorcen_Descuentos[itemArray].MesDia_2));
            $("#V_F_3").html(valFecha(ArrayPorcen_Descuentos[itemArray].MesDia_3));
            $("#V_F_4").html(valFecha(ArrayPorcen_Descuentos[itemArray].MesDia_4));
            $("#V_Des_1").html(ArrayPorcen_Descuentos[itemArray].Porcentaje_1 + " %");
            $("#V_Des_2").html(ArrayPorcen_Descuentos[itemArray].Porcentaje_2 + " %");
            $("#V_Des_3").html(ArrayPorcen_Descuentos[itemArray].Porcentaje_3 + " %");
            $("#V_Des_4").html(ArrayPorcen_Descuentos[itemArray].Porcentaje_4 + " %");
            $("#V_Valor_1").html(dinner_format_grid(ArrayPorcen_Descuentos[itemArray].Valor_Vencimiento_1, "1"));
            $("#V_Valor_2").html(dinner_format_grid(ArrayPorcen_Descuentos[itemArray].Valor_Vencimiento_2, "1"));
            $("#V_Valor_3").html(dinner_format_grid(ArrayPorcen_Descuentos[itemArray].Valor_Vencimiento_3, "1"));
            $("#V_Valor_4").html(dinner_format_grid(ArrayPorcen_Descuentos[itemArray].Valor_Vencimiento_4, "1"));

            $("#V_TL").html(ArrayPorcen_Descuentos[itemArray].DescripTipo);
            $("#V_LMin").html(ArrayPorcen_Descuentos[itemArray].Limit_Min);
            $("#V_LMax").html(ArrayPorcen_Descuentos[itemArray].Limit_Max);

            $("#Dialog_Visualiza").dialog("option", "title", "Descuento Impuesto ");

        }
    }
    $("#Dialog_Visualiza").dialog("open");
}

