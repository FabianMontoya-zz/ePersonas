/*--------------- region de variables globales --------------------*/
var ArrayCiudades = [];
var ArrayCombo = [];
var ArrayPais = [];

var estado;
var editID;
var editPais_ID;
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {

    /*Llamado de metodos para ocultar elementos al inicio de la operación de la pantalla*/
    Ventanas_Emergentes(); //Ventanas_Emergentes Va primero pues es la que llama al load de espera al inicio de los AJAX
    Ocultar_Errores();
    Ocultar_Tablas();
    /*================== FIN LLAMADO INICIAL DE METODOS DE INICIALIZACIÓN ==============*/
    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
    transacionAjax_Pais('Pais');

});

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                 REGION INICIO DE COMPONENTES                                                                                                    ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//funcion para las ventanas emergentes
function Ventanas_Emergentes() {

    Load_Charge_Sasif(); //Carga de "SasifMaster.js" el Control de Carga

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

}

//Función que oculta todas las IMG de los errores en pantalla
function Ocultar_Errores() {
    ResetError();
    $("#ESelect").css("display", "none");
    $("#Img1").css("display", "none");
    $("#Img2").css("display", "none");
    $("#Img3").css("display", "none");
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
        transacionAjax_Ciudades("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_Ciudades("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_Ciudades_create("crear");
        }
        else {
            transacionAjax_Ciudades_create("modificar");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    transacionAjax_Ciudades_delete("elimina");
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

    var campo_1 = $("#Select_Pais").val();
    var campo_2 = $("#Txt_ID").val();
    var campo_3 = $("#TxtDescription").val();

    var validar = 0;

    if (campo_1 == "-1" || campo_2 == "" || campo_3 == "") {
        validar = 1;
        if (campo_1 == "-1") {
            $("#Img1").css("display", "inline-table");
        }
        else {
            $("#Img1").css("display", "none");
        }
        if (campo_2 == "") {
            $("#Img2").css("display", "inline-table");
        }
        else {
            $("#Img2").css("display", "none");
        }
        if (campo_3 == "") {
            $("#Img3").css("display", "inline-table");
        }
        else {
            $("#Img3").css("display", "none");
        }

    }
    else {
        $("#Img1").css("display", "none");
        $("#Img2").css("display", "none");
        $("#Img3").css("display", "none");
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
/*----                                                                                                      PROCESOS DE VALIDACION Y GRID CIUDADES                                                                                                              ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//habilita el panel de crear o consulta
function HabilitarPanel(opcion) {

    switch (opcion) {

        case "crear":
            $(".Dialog_Datos").css("display", "inline-table");
            $("#Select_Pais").val("169");
            $("#TablaConsulta").css("display", "none");
            $("#Txt_ID").removeAttr("disabled");
            $("#Btnguardar").attr("value", "Guardar");
            $("#Select_Pais").removeAttr("disabled");
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
function Table_Ciudades() {

    var html_Ciudades
    var vl_Index_Ciudades;

    switch (estado) {

        case "buscar":
            html_Ciudades = "<table id='TCiudades' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Pais</th><th>Codigo</th><th>Ciudad</th></tr></thead><tbody>";
            for (itemArray in ArrayCiudades) {
                if (ArrayCiudades[itemArray].Ciudades_ID != 0) {
                    vl_Index_Ciudades = parseInt(ArrayCiudades[itemArray].Index) - 1;
                    html_Ciudades += "<tr id= 'TCiudades_" + ArrayCiudades[itemArray].Ciudades_ID + "'><td>" + ArrayCiudades[itemArray].Pais_ID + " - " + ArrayCiudades[itemArray].DescripPais + "</td><td>" + ArrayCiudades[itemArray].Ciudades_ID + "</td><td>" + ArrayCiudades[itemArray].Descripcion + "</td></tr>";
                }
            }
            break;

        case "modificar":
            html_Ciudades = "<table id='TCiudades' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Editar</th><th>Pais</th><th>Codigo</th><th>Ciudad</th></tr></thead><tbody>";
            for (itemArray in ArrayCiudades) {
                if (ArrayCiudades[itemArray].Ciudades_ID != 0) {
                    vl_Index_Ciudades = parseInt(ArrayCiudades[itemArray].Index) - 1;
                    html_Ciudades += "<tr id= 'TCiudades_" + ArrayCiudades[itemArray].Ciudades_ID + "'><td><span class='cssToolTip_ver'><img  src='../../images/Editar1.png' width='23px' height='23px' class= 'Editar' name='editar' onmouseover=\"this.src='../../images/EditarOver.png';\" onmouseout=\"this.src='../../images/Editar1.png';\" onclick=\"Editar('" + vl_Index_Ciudades + "')\"></img><span>Editar Ciudades</span></span></td><td>" + ArrayCiudades[itemArray].Pais_ID + " - " + ArrayCiudades[itemArray].DescripPais + "</td><td>" + ArrayCiudades[itemArray].Ciudades_ID + "</td><td>" + ArrayCiudades[itemArray].Descripcion + "</td></tr>";
                }
            }
            break;

        case "eliminar":
            html_Ciudades = "<table id='TCiudades' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Pais</th><th>Codigo</th><th>Ciudad</th></tr></thead><tbody>";
            for (itemArray in ArrayCiudades) {
                if (ArrayCiudades[itemArray].Ciudades_ID != 0) {
                    vl_Index_Ciudades = parseInt(ArrayCiudades[itemArray].Index) - 1;
                    html_Ciudades += "<tr id= 'TCiudades_" + ArrayCiudades[itemArray].Ciudades_ID + "'><td><span class='cssToolTip_ver'><img  src='../../images/Delete.png' width='23px' height='23px' class= 'Eliminar' name='eliminar' onmouseover=\"this.src='../../images/DeleteOver.png';\" onmouseout=\"this.src='../../images/Delete.png';\" onclick=\"Eliminar('" + vl_Index_Ciudades + "')\"></img><span>Eliminar Ciudades</span></span></td><td>" + ArrayCiudades[itemArray].Pais_ID + " - " + ArrayCiudades[itemArray].DescripPais + "</td><td>" + ArrayCiudades[itemArray].Ciudades_ID + "</td><td>" + ArrayCiudades[itemArray].Descripcion + "</td></tr>";
                }
            }
            break;
    }

    html_Ciudades += "</tbody></table>";
    $(".container_TGrid").html("");
    $(".container_TGrid").html(html_Ciudades);

    $("#TCiudades").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Eliminar(vp_Index) {
    editPais_ID = ArrayCiudades[vp_Index].Pais_ID;
    editID = ArrayCiudades[vp_Index].Ciudades_ID;
    $("#dialog_eliminar").dialog("option", "title", "Eliminar?");
    $("#dialog_eliminar").dialog("open");
}

// muestra el registro a editar
function Editar(vp_Index) {

    $(".Dialog_Datos").css("display", "inline-table");
    $("#TablaConsulta").css("display", "none");

    $("#Txt_ID").val(ArrayCiudades[vp_Index].Ciudades_ID);
    $("#Select_Pais").val(ArrayCiudades[vp_Index].Pais_ID).trigger('chosen:updated');
    $("#Txt_ID").attr("disabled", "disabled");
    $("#Select_Pais").attr("disabled", "disabled");
    $("#TxtDescription").val(ArrayCiudades[vp_Index].Descripcion);
    editPais_ID = ArrayCiudades[vp_Index].Pais_ID;
    editID = ArrayCiudades[vp_Index].Ciudades_ID;
    $("#Btnguardar").attr("value", "Actualizar");


}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                              MENSAJES, VISUALIZACION Y LIMPIEZA                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//limpiar campos
function Clear() {
    $("#Txt_ID").val("");
    $("#TxtDescription").val("");
    $("#Select_Pais").val("169");

    $("#TxtRead").val("");
    $("#DDLColumns").val("-1");

    $('.C_Chosen').trigger('chosen:updated');

}