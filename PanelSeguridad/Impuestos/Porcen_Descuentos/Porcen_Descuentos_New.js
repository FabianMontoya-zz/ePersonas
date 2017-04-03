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
var StrCiudad;

var editTypeLimit_ID;
var editLimit_Min_ID;
var editLimit_Max_ID;
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {

    /*Llamado de metodos para ocultar elementos al inicio de la operación de la pantalla*/
    Ventanas_Emergentes(); //Ventanas_Emergentes Va primero pues es la que llama al load de espera al inicio de los AJAX
    Ocultar_Errores();
    Ocultar_Tablas();
    DisenaObjetos();
    /*==================FIN LLAMADO INICIAL DE METODOS DE INICIALIZACIÓN==============*/

    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
    transacionAjax_Pais('Pais');
    transacionAjax_Impuesto('Impuesto');

    Change_Select_pais();
    Change_TxtRInicial();
    Change_TxtRfinal();
    Change_TxtFecha_1();
    Change_TxtFecha_2();
    Change_TxtFecha_3();
    break_Fecha();
});

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                 REGION INICIO DE COMPONENTES                                                                                                    ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//Función que oculta todas las IMG de los errores en pantalla
function Ocultar_Errores() {
    ResetError();
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
    $("#WA").css("display", "none");
}

//funcion para las ventanas emergentes
function Ventanas_Emergentes() {

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
}

//Función que oculta las tablas
function Ocultar_Tablas() {
    $(".Dialog_Datos").css("display", "none");
    $("#TablaConsulta").css("display", "none");
}

//Función que construye el acordeon
function DisenaObjetos() {
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
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                 REGION BOTONES                                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
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

//evento del boton salir
function x() {
    $("#dialog").dialog("close");
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                      REGION VALIDACIONES DEL PROCESO                                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//validamos campos para la creacion del link
function validarCamposCrear() {

    var vl_Campo_1 = $("#Select_Pais").val();
    var vl_Campo_2 = $("#Select_Ciudad").val();
    var vl_Campo_3 = $("#Select_Impuesto").val();

    var validar = 0;

    if (vl_Campo_3 == "-1" ||
        vl_Campo_2 == "-1" ||
        vl_Campo_1 == "-1") {
        validar = 1;
        if (vl_Campo_1 == "-1") { $("#ImgPais").css("display", "inline-table"); } else { $("#ImgPais").css("display", "none"); }
        if (vl_Campo_2 == "-1") { $("#Img1").css("display", "inline-table"); } else { $("#Img1").css("display", "none"); }
        if (vl_Campo_3 == "-1") { $("#Img2").css("display", "inline-table"); } else { $("#Img2").css("display", "none"); }
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

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                    CHANGE DE DROP LIST                                                                                                       ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//carga el combo de paises
function Change_Select_pais() {
    $("#Select_Pais").change(function () {
        var Str_pais = $("#Select_Pais option:selected").html();
        var SplitPais = Str_pais.split(" - ");

        $('#Select_Ciudad').empty();
        transacionAjax_Ciudad('Ciudad', SplitPais[0]);

    });

}

//Función que detecta el change del TXT de la fecha inicial
function Change_TxtRInicial() {
    $("#TxtRInicial").change(function () {
        $("#TxtRFinal").val("");
        var dateFormat = 'yy-mm-dd';
        var vl_date_I = $.datepicker.parseDate(dateFormat, $("#TxtRInicial").val());
        $("#TxtRFinal").datepicker({ dateFormat: 'yy-mm-dd', changeYear: true, changeMonth: true }); //Inicializa Datapicker
        $("#TxtRFinal").datepicker("option", "minDate", vl_date_I);
        $("#TxtRFinal").datepicker("option", "yearRange", "+0:+3");
        $("#TxtRFinal").removeAttr("disabled");
    });
}

//Función que detecta el change del TXT de la fecha final
function Change_TxtRfinal() {
    $("#TxtRFinal").change(function () {
        $("#TxtFecha_1").val("");
        var dateFormat = 'yy-mm-dd';
        var vl_date_I = $.datepicker.parseDate(dateFormat, $("#TxtRInicial").val());
        var vl_date_F = $.datepicker.parseDate(dateFormat, $("#TxtRFinal").val());
        $("#TxtFecha_1").datepicker({ dateFormat: 'yy-mm-dd', changeYear: true, changeMonth: true }); //Inicializa Datapicker
        $("#TxtFecha_1").datepicker("option", "minDate", vl_date_I);
        $("#TxtFecha_1").datepicker("option", "maxDate", vl_date_F);
        $("#TxtFecha_1").datepicker("option", "yearRange", "+0:+3");
        $("#TxtFecha_1").removeAttr("disabled");
        $("#TxtPorcen_1").removeAttr("disabled");
        $("#TxtValor_1").removeAttr("disabled");
    });
}

//Función que detecta el change del TXT de la fecha 1
function Change_TxtFecha_1() {
    $("#TxtFecha_1").change(function () {
        $("#TxtFecha_2").val("");
        var dateFormat = 'yy-mm-dd';
        var vl_date_I = $.datepicker.parseDate(dateFormat, $("#TxtFecha_1").val());
        var vl_date_F = $.datepicker.parseDate(dateFormat, $("#TxtRFinal").val());
        $("#TxtFecha_2").datepicker({ dateFormat: 'yy-mm-dd', changeYear: true, changeMonth: true }); //Inicializa Datapicker
        $("#TxtFecha_2").datepicker("option", "minDate", vl_date_I);
        $("#TxtFecha_2").datepicker("option", "maxDate", vl_date_F);
        $("#TxtFecha_2").datepicker("option", "yearRange", "+0:+3");
        $("#TxtFecha_2").removeAttr("disabled");
        $("#TxtPorcen_2").removeAttr("disabled");
        $("#TxtValor_2").removeAttr("disabled");

    });
}

//Función que detecta el change del TXT de la fecha 2
function Change_TxtFecha_2() {
    $("#TxtFecha_2").change(function () {
        $("#TxtFecha_3").val("");
        var dateFormat = 'yy-mm-dd';
        var vl_date_I = $.datepicker.parseDate(dateFormat, $("#TxtFecha_2").val());
        var vl_date_F = $.datepicker.parseDate(dateFormat, $("#TxtRFinal").val());
        $("#TxtFecha_3").datepicker({ dateFormat: 'yy-mm-dd', changeYear: true, changeMonth: true }); //Inicializa Datapicker
        $("#TxtFecha_3").datepicker("option", "minDate", vl_date_I);
        $("#TxtFecha_3").datepicker("option", "maxDate", vl_date_F);
        $("#TxtFecha_3").datepicker("option", "yearRange", "+0:+3");
        $("#TxtFecha_3").removeAttr("disabled");
        $("#TxtPorcen_3").removeAttr("disabled");
        $("#TxtValor_3").removeAttr("disabled");
    });
}

//Función que detecta el change del TXT de la fecha 2
function Change_TxtFecha_3() {
    $("#TxtFecha_3").change(function () {
        $("#TxtFecha_4").val("");
        var dateFormat = 'yy-mm-dd';
        var vl_date_I = $.datepicker.parseDate(dateFormat, $("#TxtFecha_3").val());
        var vl_date_F = $.datepicker.parseDate(dateFormat, $("#TxtRFinal").val());
        $("#TxtFecha_4").datepicker({ dateFormat: 'yy-mm-dd', changeYear: true, changeMonth: true }); //Inicializa Datapicker
        $("#TxtFecha_4").datepicker("option", "minDate", vl_date_I);
        $("#TxtFecha_4").datepicker("option", "maxDate", vl_date_F);
        $("#TxtFecha_4").datepicker("option", "yearRange", "+0:+3");
        $("#TxtFecha_4").removeAttr("disabled");
        $("#TxtPorcen_4").removeAttr("disabled");
        $("#TxtValor_4").removeAttr("disabled");
    });
}


/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                      PROCESOS DE VALIDACION Y GRID INFORME IMPUESTOS                                                       ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//habilita el panel de crear o consulta
function HabilitarPanel(opcion) {

    switch (opcion) {

        case "crear":
            $(".Dialog_Datos").css("display", "inline-table");
            $("#TablaConsulta").css("display", "none");
            DisabledControls("C");
            $("#Btnguardar").attr("value", "Guardar");
            ResetError();
            Clear();
            estado = opcion;
            break;

        case "buscar":
            $(".Dialog_Datos").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $(".container_TGrid").html("");
            estado = opcion;
            Clear();
            break;

        case "modificar":
            $(".Dialog_Datos").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $(".container_TGrid").html("");
            estado = opcion;
            ResetError();
            Clear();
            break;

        case "eliminar":
            $(".Dialog_Datos").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $(".container_TGrid").html("");
            estado = opcion;
            Clear();
            break;

    }
}

// crea la tabla en el cliente
function Table_Porcen_Descuentos() {

    var html_Porcen_Descuentos;
    var vl_PImpuesto;
    var StrTipo = "";

    switch (estado) {

        case "buscar":
            html_Porcen_Descuentos = "<table id='TPorcen_Descuentos' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Ver</th><th>Pais</th><th>Ciudad</th><th>Impuesto</th><th>Rango Inicial</th><th>Rango Final</th><th>Tipo Limite</th><th>Limite Inferior</th><th>Limite Superior</th><th>Prmera Fecha</th><th>Primer % Descuento</th><th>Primer Valor</th><th>Segunda Fecha</th><th>Segundo % Descuento</th><th>Segundo Valor</th><th>Tercera Fecha</th><th>Tercer % Descuento</th><th>Tercer Valor</th><th>Cuarta Fecha</th><th>Cuarto % Descuento</th><th>Cuarto Valor</th></tr></thead><tbody>";

            for (itemArray in ArrayPorcen_Descuentos) {

                if (ArrayPorcen_Descuentos[itemArray].Type_Limit != 0) {
                    StrTipo = ArrayPorcen_Descuentos[itemArray].Type_Limit + " - " + ArrayPorcen_Descuentos[itemArray].DescripTipo;
                }
                vl_PImpuesto = parseInt(ArrayPorcen_Descuentos[itemArray].Index) - 1;
                html_Porcen_Descuentos += "<tr><td><span class='cssToolTip_ver'><img  src='../../images/N_Search_Red.png' width='23px' height='23px' class= 'Editar' name='editar' onmouseover=\"this.src='../../images/N_Search_Black.png';\" onmouseout=\"this.src='../../images/N_Search_Red.png';\" onclick=\"Ver('" + vl_PImpuesto + "')\"></img><span>Ver % Descuentos Impuestos</span></span></td><td>" + ArrayPorcen_Descuentos[itemArray].DescripCod + "</td><td>" + ArrayPorcen_Descuentos[itemArray].DescripCiudad + "</td><td>" + ArrayPorcen_Descuentos[itemArray].Impuesto_Gasto_ID + " - " + ArrayPorcen_Descuentos[itemArray].DescripImpuesto_Gasto + "</td><td>" + valFecha(ArrayPorcen_Descuentos[itemArray].RangoInicial_ID) + "</td><td>" + valFecha(ArrayPorcen_Descuentos[itemArray].RangoFinal_ID) + "</td> <td>" + StrTipo + "</td><td>" + ArrayPorcen_Descuentos[itemArray].Limit_Min + "</td><td>" + ArrayPorcen_Descuentos[itemArray].Limit_Max + "</td><td>" + valFecha(ArrayPorcen_Descuentos[itemArray].MesDia_1) + "</td><td>" + ArrayPorcen_Descuentos[itemArray].Porcentaje_1 + " %" + "</td><td>" + dinner_format_grid(ArrayPorcen_Descuentos[itemArray].Valor_Vencimiento_1, "1") + "</td><td>" + valFecha(ArrayPorcen_Descuentos[itemArray].MesDia_2) + "</td><td>" + ArrayPorcen_Descuentos[itemArray].Porcentaje_2 + " %" + "</td><td>" + dinner_format_grid(ArrayPorcen_Descuentos[itemArray].Valor_Vencimiento_2, "1") + "</td><td>" + valFecha(ArrayPorcen_Descuentos[itemArray].MesDia_3) + "</td><td>" + ArrayPorcen_Descuentos[itemArray].Porcentaje_3 + " %" + "</td><td>" + dinner_format_grid(ArrayPorcen_Descuentos[itemArray].Valor_Vencimiento_3, "1") + "</td><td>" + valFecha(ArrayPorcen_Descuentos[itemArray].MesDia_4) + "</td><td>" + ArrayPorcen_Descuentos[itemArray].Porcentaje_4 + " %" + "</td><td>" + dinner_format_grid(ArrayPorcen_Descuentos[itemArray].Valor_Vencimiento_4, "1") + "</td></tr>";

            }
            break;

        case "modificar":

            html_Porcen_Descuentos = "<table id='TPorcen_Descuentos' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Editar</th><th>Pais</th><th>Ciudad</th><th>Impuesto</th><th>Rango Inicial</th><th>Rango Final</th><th>Tipo Limite</th><th>Limite Inferior</th><th>Limite Superior</th><th>Prmera Fecha</th><th>Primer % Descuento</th><th>Primer Valor</th><th>Segunda Fecha</th><th>Segundo % Descuento</th><th>Segundo Valor</th><th>Tercera Fecha</th><th>Tercer % Descuento</th><th>Tercer Valor</th><th>Cuarta Fecha</th><th>Cuarto % Descuento</th><th>Cuarto Valor</th></tr></thead><tbody>";
            for (itemArray in ArrayPorcen_Descuentos) {

                if (ArrayPorcen_Descuentos[itemArray].Type_Limit != 0) {
                    StrTipo = ArrayPorcen_Descuentos[itemArray].Type_Limit + " - " + ArrayPorcen_Descuentos[itemArray].DescripTipo;
                }
                vl_PImpuesto = parseInt(ArrayPorcen_Descuentos[itemArray].Index) - 1;
                html_Porcen_Descuentos += "<tr><td><span class='cssToolTip_ver'><img  src='../../images/Editar1.png' width='23px' height='23px' class= 'Editar' name='editar' onmouseover=\"this.src='../../images/EditarOver.png';\" onmouseout=\"this.src='../../images/Editar1.png';\" onclick=\"Editar('" + vl_PImpuesto + "')\"></img><span>Editar % Descuentos Impuestos</span></span></td><td>" + ArrayPorcen_Descuentos[itemArray].DescripCod + "</td><td>" + ArrayPorcen_Descuentos[itemArray].DescripCiudad + "</td><td>" + ArrayPorcen_Descuentos[itemArray].Impuesto_Gasto_ID + " - " + ArrayPorcen_Descuentos[itemArray].DescripImpuesto_Gasto + "</td><td>" + valFecha(ArrayPorcen_Descuentos[itemArray].RangoInicial_ID) + "</td><td>" + valFecha(ArrayPorcen_Descuentos[itemArray].RangoFinal_ID) + "</td> <td>" + StrTipo + "</td><td>" + ArrayPorcen_Descuentos[itemArray].Limit_Min + "</td><td>" + ArrayPorcen_Descuentos[itemArray].Limit_Max + "</td><td>" + valFecha(ArrayPorcen_Descuentos[itemArray].MesDia_1) + "</td><td>" + ArrayPorcen_Descuentos[itemArray].Porcentaje_1 + " %" + "</td><td>" + dinner_format_grid(ArrayPorcen_Descuentos[itemArray].Valor_Vencimiento_1, "1") + "</td><td>" + valFecha(ArrayPorcen_Descuentos[itemArray].MesDia_2) + "</td><td>" + ArrayPorcen_Descuentos[itemArray].Porcentaje_2 + " %" + "</td><td>" + dinner_format_grid(ArrayPorcen_Descuentos[itemArray].Valor_Vencimiento_2, "1") + "</td><td>" + valFecha(ArrayPorcen_Descuentos[itemArray].MesDia_3) + "</td><td>" + ArrayPorcen_Descuentos[itemArray].Porcentaje_3 + " %" + "</td><td>" + dinner_format_grid(ArrayPorcen_Descuentos[itemArray].Valor_Vencimiento_4, "1") + "</td><td>" + valFecha(ArrayPorcen_Descuentos[itemArray].MesDia_4) + "</td><td>" + ArrayPorcen_Descuentos[itemArray].Porcentaje_4 + " %" + "</td><td>" + dinner_format_grid(ArrayPorcen_Descuentos[itemArray].Valor_Vencimiento_4, "1") + "</td></tr>";

            }
            break;

        case "eliminar":
            html_Porcen_Descuentos = "<table id='TPorcen_Descuentos' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Pais</th><th>Ciudad</th><th>Impuesto</th><th>Rango Inicial</th><th>Rango Final</th><th>Tipo Limite</th><th>Limite Inferior</th><th>Limite Superior</th><th>Prmera Fecha</th><th>Primer % Descuento</th><th>Primer Valor</th><th>Segunda Fecha</th><th>Segundo % Descuento</th><th>Segundo Valor</th><th>Tercera Fecha</th><th>Tercer % Descuento</th><th>Tercer Valor</th><th>Cuarta Fecha</th><th>Cuarto % Descuento</th><th>Cuarto Valor</th></tr></thead><tbody>";
            for (itemArray in ArrayPorcen_Descuentos) {
                if (ArrayPorcen_Descuentos[itemArray].Type_Limit != 0) {
                    StrTipo = ArrayPorcen_Descuentos[itemArray].Type_Limit + " - " + ArrayPorcen_Descuentos[itemArray].DescripTipo;
                }
                vl_PImpuesto = parseInt(ArrayPorcen_Descuentos[itemArray].Index) - 1;
                html_Porcen_Descuentos += "<tr><td><span class='cssToolTip_ver'><img  src='../../images/Delete.png' width='23px' height='23px' class= 'Eliminar' name='eliminar' onmouseover=\"this.src='../../images/DeleteOver.png';\" onmouseout=\"this.src='../../images/Delete.png';\" onclick=\"Eliminar('" + vl_PImpuesto + "')\"></img><span>Eliminar % Descuentos Impuestos</span></span></td><td>" + ArrayPorcen_Descuentos[itemArray].DescripCod + "</td><td>" + ArrayPorcen_Descuentos[itemArray].DescripCiudad + "</td><td>" + ArrayPorcen_Descuentos[itemArray].Impuesto_Gasto_ID + " - " + ArrayPorcen_Descuentos[itemArray].DescripImpuesto_Gasto + "</td><td>" + valFecha(ArrayPorcen_Descuentos[itemArray].RangoInicial_ID) + "</td><td>" + valFecha(ArrayPorcen_Descuentos[itemArray].RangoFinal_ID) + "</td> <td>" + StrTipo + "</td><td>" + ArrayPorcen_Descuentos[itemArray].Limit_Min + "</td><td>" + ArrayPorcen_Descuentos[itemArray].Limit_Max + "</td><td>" + valFecha(ArrayPorcen_Descuentos[itemArray].MesDia_1) + "</td><td>" + ArrayPorcen_Descuentos[itemArray].Porcentaje_1 + " %" + "</td><td>" + dinner_format_grid(ArrayPorcen_Descuentos[itemArray].Valor_Vencimiento_1, "1") + "</td><td>" + valFecha(ArrayPorcen_Descuentos[itemArray].MesDia_2) + "</td><td>" + ArrayPorcen_Descuentos[itemArray].Porcentaje_2 + " %" + "</td><td>" + dinner_format_grid(ArrayPorcen_Descuentos[itemArray].Valor_Vencimiento_2, "1") + "</td><td>" + valFecha(ArrayPorcen_Descuentos[itemArray].MesDia_3) + "</td><td>" + ArrayPorcen_Descuentos[itemArray].Porcentaje_3 + " %" + "</td><td>" + dinner_format_grid(ArrayPorcen_Descuentos[itemArray].Valor_Vencimiento_4, "1") + "</td><td>" + valFecha(ArrayPorcen_Descuentos[itemArray].MesDia_4) + "</td><td>" + ArrayPorcen_Descuentos[itemArray].Porcentaje_4 + " %" + "</td><td>" + dinner_format_grid(ArrayPorcen_Descuentos[itemArray].Valor_Vencimiento_4, "1") + "</td></tr>";

            }
            break;
    }

    html_Porcen_Descuentos += "</tbody></table>";
    $(".container_TGrid").html("");
    $(".container_TGrid").html(html_Porcen_Descuentos);

    $("#TPorcen_Descuentos").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Eliminar(vp_Index) {

    editCod_ID = ArrayPorcen_Descuentos[vp_Index].Cod_ID;
    editCiudad_ID = ArrayPorcen_Descuentos[vp_Index].Ciudad_ID;
    editInf_Impuesto_ID = ArrayPorcen_Descuentos[vp_Index].Impuesto_Gasto_ID;
    editRangoInicial_ID = ArrayPorcen_Descuentos[vp_Index].RangoInicial_ID;
    editRangoFinal_ID = ArrayPorcen_Descuentos[vp_Index].RangoFinal_ID;

    editTypeLimit_ID = ArrayPorcen_Descuentos[vp_Index].Type_Limit;
    editLimit_Min_ID = ArrayPorcen_Descuentos[vp_Index].Limit_Min;
    editLimit_Max_ID = ArrayPorcen_Descuentos[vp_Index].Limit_Max;

    $("#dialog_eliminar").dialog("option", "title", "Eliminar?");
    $("#dialog_eliminar").dialog("open");

}

// muestra el registro a editar
function Editar(vp_Index) {
    $(".Dialog_Datos").css("display", "inline-table");
    $("#TablaConsulta").css("display", "none");

    editCod_ID = ArrayPorcen_Descuentos[vp_Index].Cod_ID;
    transacionAjax_Ciudad('Ciudad', editCod_ID);

    editCiudad_ID = ArrayPorcen_Descuentos[vp_Index].Ciudad_ID;
    editInf_Impuesto_ID = ArrayPorcen_Descuentos[vp_Index].Impuesto_Gasto_ID;
    editRangoInicial_ID = ArrayPorcen_Descuentos[vp_Index].RangoInicial_ID;
    editRangoFinal_ID = ArrayPorcen_Descuentos[vp_Index].RangoFinal_ID;

    editTypeLimit_ID = ArrayPorcen_Descuentos[vp_Index].Type_Limit;
    editLimit_Min_ID = ArrayPorcen_Descuentos[vp_Index].Limit_Min;
    editLimit_Max_ID = ArrayPorcen_Descuentos[vp_Index].Limit_Max;

    $("#Select_Pais").val(ArrayPorcen_Descuentos[vp_Index].Cod_ID).trigger('chosen:updated');
    $("#Select_LTipo").val(ArrayPorcen_Descuentos[vp_Index].Type_Limit).trigger('chosen:updated');
    $("#Select_Impuesto").val(ArrayPorcen_Descuentos[vp_Index].Impuesto_Gasto_ID).trigger('chosen:updated');

    $("#Txt_LInf").val(ArrayPorcen_Descuentos[vp_Index].Limit_Min);
    $("#Txt_Sup").val(ArrayPorcen_Descuentos[vp_Index].Limit_Max);

    StrCiudad = ArrayPorcen_Descuentos[vp_Index].Ciudad_ID;
    $("#TxtRInicial").val(valFecha(ArrayPorcen_Descuentos[vp_Index].RangoInicial_ID));
    $("#TxtRFinal").val(valFecha(ArrayPorcen_Descuentos[vp_Index].RangoFinal_ID));

    $("#TxtFecha_1").val(valFecha(ArrayPorcen_Descuentos[vp_Index].MesDia_1));
    $("#TxtFecha_2").val(valFecha(ArrayPorcen_Descuentos[vp_Index].MesDia_2));
    $("#TxtFecha_3").val(valFecha(ArrayPorcen_Descuentos[vp_Index].MesDia_3));
    $("#TxtFecha_4").val(valFecha(ArrayPorcen_Descuentos[vp_Index].MesDia_4));
    $("#TxtPorcen_1").val(ArrayPorcen_Descuentos[vp_Index].Porcentaje_1);
    $("#TxtPorcen_2").val(ArrayPorcen_Descuentos[vp_Index].Porcentaje_2);
    $("#TxtPorcen_3").val(ArrayPorcen_Descuentos[vp_Index].Porcentaje_3);
    $("#TxtPorcen_4").val(ArrayPorcen_Descuentos[vp_Index].Porcentaje_4);
    $("#TxtValor_1").val(dinner_format_grid(ArrayPorcen_Descuentos[vp_Index].Valor_Vencimiento_1, "0"));
    $("#TxtValor_2").val(dinner_format_grid(ArrayPorcen_Descuentos[vp_Index].Valor_Vencimiento_2, "0"));
    $("#TxtValor_3").val(dinner_format_grid(ArrayPorcen_Descuentos[vp_Index].Valor_Vencimiento_3, "0"));
    $("#TxtValor_4").val(dinner_format_grid(ArrayPorcen_Descuentos[vp_Index].Valor_Vencimiento_4, "0"));

    $("#Btnguardar").attr("value", "Actualizar");

    EnableControls("E");
    setTimeout("CargaCombos('" + ArrayPorcen_Descuentos[vp_Index].Ciudad_ID + "')", 400);
}

//carga combos que dependen de una transaccion
function CargaCombos(vp_Ciudad) {
    if (vp_Ciudad == 0) {
        $('#Select_Ciudad').val('-1').trigger('chosen:updated');
    }
    else {
        $('#Select_Ciudad').val(vp_Ciudad).trigger('chosen:updated');
    }
}

// muestra el registro a ver
function Ver(vp_Index) {

    var StrCiudad = ArrayPorcen_Descuentos[vp_Index].DescripCiudad;
    var ArraySplit = StrCiudad.split("_");

    $("#V_Pais").html(ArrayPorcen_Descuentos[vp_Index].DescripCod);
    $("#V_Ciudad").html(ArrayPorcen_Descuentos[vp_Index].DescripCiudad);
    $("#V_Municipio").html(ArrayPorcen_Descuentos[vp_Index].Impuesto_Gasto_ID + " - " + ArrayPorcen_Descuentos[itemArray].DescripImpuesto_Gasto);
    $("#V_Inicial").html(ArrayPorcen_Descuentos[vp_Index].RangoInicial_ID);
    $("#V_Final").html(ArrayPorcen_Descuentos[vp_Index].RangoFinal_ID);

    $("#V_F_1").html(valFecha(ArrayPorcen_Descuentos[vp_Index].MesDia_1));
    $("#V_F_2").html(valFecha(ArrayPorcen_Descuentos[vp_Index].MesDia_2));
    $("#V_F_3").html(valFecha(ArrayPorcen_Descuentos[vp_Index].MesDia_3));
    $("#V_F_4").html(valFecha(ArrayPorcen_Descuentos[vp_Index].MesDia_4));
    $("#V_Des_1").html(ArrayPorcen_Descuentos[vp_Index].Porcentaje_1 + " %");
    $("#V_Des_2").html(ArrayPorcen_Descuentos[vp_Index].Porcentaje_2 + " %");
    $("#V_Des_3").html(ArrayPorcen_Descuentos[vp_Index].Porcentaje_3 + " %");
    $("#V_Des_4").html(ArrayPorcen_Descuentos[vp_Index].Porcentaje_4 + " %");
    $("#V_Valor_1").html(dinner_format_grid(ArrayPorcen_Descuentos[vp_Index].Valor_Vencimiento_1, "1"));
    $("#V_Valor_2").html(dinner_format_grid(ArrayPorcen_Descuentos[vp_Index].Valor_Vencimiento_2, "1"));
    $("#V_Valor_3").html(dinner_format_grid(ArrayPorcen_Descuentos[vp_Index].Valor_Vencimiento_3, "1"));
    $("#V_Valor_4").html(dinner_format_grid(ArrayPorcen_Descuentos[vp_Index].Valor_Vencimiento_4, "1"));

    $("#V_TL").html(ArrayPorcen_Descuentos[vp_Index].DescripTipo);
    $("#V_LMin").html(ArrayPorcen_Descuentos[vp_Index].Limit_Min);
    $("#V_LMax").html(ArrayPorcen_Descuentos[vp_Index].Limit_Max);

    $("#Dialog_Visualiza").dialog("option", "title", "Descuento Impuesto ");


    $("#Dialog_Visualiza").dialog("open");
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                              MENSAJES, VISUALIZACION Y LIMPIEZA                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//limpiar campos
function Clear() {
    $(".container_TGrid").html("");

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

//habilita controles
function EnableControls(vp_Type) {

    if (vp_Type = "E") {
        $("#TxtFecha_1").removeAttr("disabled");
        $("#TxtFecha_2").removeAttr("disabled");
        $("#TxtFecha_3").removeAttr("disabled");
        $("#TxtFecha_4").removeAttr("disabled");

        $("#TxtPorcen_1").removeAttr("disabled");
        $("#TxtPorcen_2").removeAttr("disabled");
        $("#TxtPorcen_3").removeAttr("disabled");
        $("#TxtPorcen_4").removeAttr("disabled");

        $("#TxtValor_1").removeAttr("disabled");
        $("#TxtValor_2").removeAttr("disabled");
        $("#TxtValor_3").removeAttr("disabled");
        $("#TxtValor_4").removeAttr("disabled");

        $("#Select_Pais").attr("disabled", "disabled");
        $("#Select_Ciudad").attr("disabled", "disabled");
        $("#Select_Impuesto").attr("disabled", "disabled");
        $("#TxtRInicial").attr("disabled", "disabled");
        $("#TxtRFinal").attr("disabled", "disabled");
        $("#Select_LTipo").attr("disabled", "disabled");
        $("#Txt_LInf").attr("disabled", "disabled");
        $("#Txt_Sup").attr("disabled", "disabled");
    }
    $('.C_Chosen').trigger('chosen:updated');
}

//habilita controles
function DisabledControls(vp_Type) {

    if (vp_Type = "C") {
        $("#TxtFecha_1").attr("disabled", "disabled");
        $("#TxtFecha_2").attr("disabled", "disabled");
        $("#TxtFecha_3").attr("disabled", "disabled");
        $("#TxtFecha_4").attr("disabled", "disabled");

        $("#TxtPorcen_1").attr("disabled", "disabled");
        $("#TxtPorcen_2").attr("disabled", "disabled");
        $("#TxtPorcen_3").attr("disabled", "disabled");
        $("#TxtPorcen_4").attr("disabled", "disabled");

        $("#TxtValor_1").attr("disabled", "disabled");
        $("#TxtValor_2").attr("disabled", "disabled");
        $("#TxtValor_3").attr("disabled", "disabled");
        $("#TxtValor_4").attr("disabled", "disabled");
  
        $("#Select_Pais").removeAttr("disabled");
        $("#Select_Ciudad").removeAttr("disabled");
        $("#Select_Impuesto").removeAttr("disabled");
        $("#TxtRInicial").removeAttr("disabled");
        $("#TxtRFinal").removeAttr("disabled");
        $("#Select_LTipo").removeAttr("disabled");
        $("#Txt_LInf").removeAttr("disabled");
        $("#Txt_Sup").removeAttr("disabled");
    }
    $('.C_Chosen').trigger('chosen:updated');
}
