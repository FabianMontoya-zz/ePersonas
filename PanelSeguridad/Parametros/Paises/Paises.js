/*--------------- region de variables globales --------------------*/
var ArrayPaises = [];
var ArrayCombo = [];

var Matrix_Moneda = [];
var Matrix_Calendarios = [];

var estado;
var editID;
var editDia;
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {

    /*Llamado de metodos para ocultar elementos al inicio de la operación de la pantalla*/
    Ventanas_Emergentes(); //Ventanas_Emergentes Va primero pues es la que llama al load de espera al inicio de los AJAX
    Ocultar_Errores();
    Ocultar_Tablas();

    /*================== FIN LLAMADO INICIAL DE METODOS DE INICIALIZACIÓN ==============*/

    transacionAjax_CargaBusqueda("cargar_droplist_busqueda");
    transacionAjax_Moneda("Moneda");
    transacionAjax_Calendario("MatrixCalendarios");
});

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                 REGION INICIO DE COMPONENTES                                                                                                    ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//funcion para las ventanas emergentes
function Ventanas_Emergentes() {

    Load_Charge_Sasif(); //Carga de "SasifMaster.js" el Control de Carga

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
}

//Función que oculta todas las IMG de los errores en pantalla
function Ocultar_Errores() {
    ResetError();
    $("#ESelect").css("display", "none");
    $("#ImgID").css("display", "none");
    $("#Img1").css("display", "none");
    $("#Img2").css("display", "none");
    $("#ImgMon").css("display", "none");
    $("#ImgCal").css("display", "none");
    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WA").css("display", "none");
    /*Los demás se ocultan en la SASIF Master*/
}

//Función que oculta las tablas
function Ocultar_Tablas() {
    $(".Dialog_Datos").css("display", "none");
    $("#TablaConsulta").css("display", "none");
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
        transacionAjax_Paises("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_Paises("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_Paises_create("crear");
        }
        else {
            transacionAjax_Paises_create("modificar");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    transacionAjax_Paises_delete("elimina");
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

    var Campo_1 = $("#Txt_Codigo").val();
    var Campo_2 = $("#Txt_Pais").val();
    var Campo_3 = $("#Select_moneda").val();
    var Campo_4 = $("#Select_Calendario").val();

    var validar = 0;

    if (Campo_2 == "" || Campo_1 == "" || Campo_3 == "" || Campo_3 == "-1" || Campo_3 == null || Campo_4 == "" || Campo_4 == "-1" || Campo_4 == null) {
        validar = 1;
        if (Campo_1 == "") {
            $("#ImgID").css("display", "inline-table");
        }
        else {
            $("#ImgID").css("display", "none");
        }
        if (Campo_2 == "") {
            $("#Img1").css("display", "inline-table");
        }
        else {
            $("#Img1").css("display", "none");
        }
        if (Campo_3 == "" || Campo_3 == "-1" || Campo_3 == null) {
            $("#ImgMon").css("display", "inline-table");
        }
        else {
            $("#ImgMon").css("display", "none");
        }
        if (Campo_4 == "" || Campo_4 == "-1" || Campo_4 == null) {
            $("#ImgCal").css("display", "inline-table");
        }
        else {
            $("#ImgCal").css("display", "none");
        }
    }
    else {
        $("#Img1").css("display", "none");
        $("#ImgID").css("display", "none");
        $("#ImgMon").css("display", "none");
        $("#ImgCal").css("display", "none");
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
/*----                                                                                                      PROCESOS DE VALIDACION Y GRID PAISES                                                                                                              ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//habilita el panel de crear o consulta
function HabilitarPanel(opcion) {

    switch (opcion) {

        case "crear":

            $(".Dialog_Datos").css("display", "inline-table");
            $("#TablaConsulta").css("display", "none");
            $("#Txt_ID").removeAttr("disabled");
            $("#Btnguardar").attr("value", "Guardar");
            $("#Btnguardar").css("display", "inline-table");
            Enabled_Pais();
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
            Enabled_Pais();
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
function Table_Paises() {

    var html_TPaises;
    var vl_Index_Paises;
    switch (estado) {

        case "buscar":
            html_TPaises = "<table id='TPaises' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Codigo</th><th>Pais</th><th>Moneda</th><th>Calendario</th><th>SWIFT</th></tr></thead><tbody>";
            for (itemArray in ArrayPaises) {
                if (ArrayPaises[itemArray].Cod != 0) {
                    vl_Index_Paises = parseInt(ArrayPaises[itemArray].Index) - 1;
                    html_TPaises += "<tr id= 'TPaises_" + vl_Index_Paises + "'><td>" + ArrayPaises[itemArray].Cod + "</td><td>" + ArrayPaises[itemArray].Name + "</td><td>" + ArrayPaises[itemArray].Moneda + " - " + ArrayPaises[itemArray].Moneda_Descripcion + "</td><td>" + ArrayPaises[itemArray].Calendario_ID + " - " + ArrayPaises[itemArray].Calendario_Descripcion + "</td><td>" + ArrayPaises[itemArray].SWIFT + "</td></tr>";
                }
            }
            break;

        case "modificar":
            html_TPaises = "<table id='TPaises' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Editar</th><th>Codigo</th><th>Pais</th><th>Moneda</th><th>Calendario</th><th>SWIFT</th></tr></thead><tbody>";
            for (itemArray in ArrayPaises) {
                if (ArrayPaises[itemArray].Cod != 0) {
                    vl_Index_Paises = parseInt(ArrayPaises[itemArray].Index) - 1;
                    html_TPaises += "<tr id= 'TPaises_" + vl_Index_Paises + "'><td><span class='cssToolTip_ver'><img  src='../../images/Editar1.png' width='23px' height='23px' class= 'Editar' name='editar' onmouseover=\"this.src='../../images/EditarOver.png';\" onmouseout=\"this.src='../../images/Editar1.png';\" onclick=\"Editar('" + vl_Index_Paises + "')\"></img><span>Editar Pais</span></span></td><td>" + ArrayPaises[itemArray].Cod + "</td><td>" + ArrayPaises[itemArray].Name + "</td><td>" + ArrayPaises[itemArray].Moneda + " - " + ArrayPaises[itemArray].Moneda_Descripcion + "</td><td>" + ArrayPaises[itemArray].Calendario_ID + " - " + ArrayPaises[itemArray].Calendario_Descripcion + "</td><td>" + ArrayPaises[itemArray].SWIFT + "</td></tr>";
                }
            }
            break;

        case "eliminar":
            html_TPaises = "<table id='TPaises' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Codigo</th><th>Pais</th><th>Moneda</th><th>Calendario</th><th>SWIFT</th></tr></thead><tbody>";
            for (itemArray in ArrayPaises) {
                if (ArrayPaises[itemArray].Cod != 0) {
                    vl_Index_Paises = parseInt(ArrayPaises[itemArray].Index) - 1;
                    html_TPaises += "<tr id= 'TPaises_" + vl_Index_Paises + "'><td><span class='cssToolTip_ver'><img  src='../../images/Delete.png' width='23px' height='23px' class= 'Eliminar' name='eliminar' onmouseover=\"this.src='../../images/DeleteOver.png';\" onmouseout=\"this.src='../../images/Delete.png';\" onclick=\"Eliminar('" + vl_Index_Paises + "')\"></img><span>Eliminar Pais</span></span></td><td>" + ArrayPaises[itemArray].Cod + "</td><td>" + ArrayPaises[itemArray].Name + "</td><td>" + ArrayPaises[itemArray].Moneda + " - " + ArrayPaises[itemArray].Moneda_Descripcion + "</td><td>" + ArrayPaises[itemArray].Calendario_ID + " - " + ArrayPaises[itemArray].Calendario_Descripcion + "</td><td>" + ArrayPaises[itemArray].SWIFT + "</td></tr>";
                }
            }
            break;
    }

    html_TPaises += "</tbody></table>";
    $(".container_TGrid").html("");
    $(".container_TGrid").html(html_TPaises);

    $("#TPaises").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Eliminar(vp_index) {
    editID = ArrayPaises[vp_index].Cod;
    $("#dialog_eliminar").dialog("option", "title", "Eliminar?");
    $("#dialog_eliminar").dialog("open");
}

// muestra el registro a editar
function Editar(index_Paises) {
    Search_Pais(index_Paises);
    $(".Dialog_Datos").css("display", "inline-table");
    $("#TablaConsulta").css("display", "none");

    $("#Btnguardar").attr("value", "Actualizar");
    $("#Btnguardar").css("display", "inline-table");
}

// muestra el registro selccionado
function Search_Pais(vp_index) {

    $("#Txt_Codigo").val(ArrayPaises[vp_index].Cod);
    $("#Txt_Codigo").attr("disabled", "disabled");
    $("#Txt_Pais").val(ArrayPaises[vp_index].Name);
    editID = ArrayPaises[vp_index].Cod;
    $("#TxtSWIFT").val(ArrayPaises[vp_index].SWIFT);

    setTimeout("CargaCombos('" + ArrayPaises[vp_index].Moneda  + "', '" + ArrayPaises[vp_index].Calendario_ID + "')", 400);
    
}

//carga combos que dependen de una transaccion
function CargaCombos(vp_Moneda, vp_Calendario) {

    if (vp_Moneda == "") {
        $("#Select_moneda").val("-1").trigger('chosen:updated');
    }
    else {
        $('#Select_moneda').val(vp_Moneda).trigger('chosen:updated');
    }

    if (vp_Calendario == "") {
        $('#Select_Calendario').val('-1').trigger('chosen:updated');
    }
    else {
        $('#Select_Calendario').val(vp_Calendario).trigger('chosen:updated');
    }
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                              MENSAJES, VISUALIZACION Y LIMPIEZA                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//limpiar campos
function Clear() {
    $("#Txt_Codigo").val("");
    $("#Txt_Pais").val("");
    $("#TxtRead").val("");
    $("#Select_Calendario").val("-1");
    $("#Select_moneda").val("-1");
    $("#TxtSWIFT").val("");

    $("#DDLColumns").val("-1");

    $('.C_Chosen').trigger('chosen:updated');
}
