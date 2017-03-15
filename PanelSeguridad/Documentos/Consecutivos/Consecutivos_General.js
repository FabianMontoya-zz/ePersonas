/*--------------- region de variables globales --------------------*/
var ArrayConsecutivos_General = [];
var ArrayCombo = [];
var ArrayConsecutivos_GeneralDep = [];
var ArraySeguridad = [];

var estado;
var editNit_ID;
var index_ID;
var editID;
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {
    $("#Marco_trabajo_Form").css("height", "490px");
    $("#container_TConsecutivos_General").css("height", "380px");

    /*Llamado de metodos para ocultar elementos al inicio de la operación de la pantalla*/
    Ventanas_Emergentes(); //Ventanas_Emergentes Va primero pues es la que llama al load de espera al inicio de los AJAX
    Ocultar_Errores();
    Ocultar_Tablas();
    /*================== FIN LLAMADO INICIAL DE METODOS DE INICIALIZACIÓN ==============*/

    transacionAjax_CargaBusqueda_CG('cargar_droplist_busqueda');

});

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
    $("#Img1").css("display", "none");
    $("#Img2").css("display", "none");
    $("#Img3").css("display", "none");
    $("#Img5").css("display", "none");
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

//habilita el panel de crear o consulta
function HabilitarPanel(opcion) {

    switch (opcion) {

        case "crear":
            $(".Dialog_Datos").css("display", "inline-table");
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
            $(".Dialog_Datos").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TConsecutivos_General").html("");
            estado = opcion;
            Clear();
            break;

        case "modificar":
            $(".Dialog_Datos").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TConsecutivos_General").html("");
            estado = opcion;
            ResetError();
            Clear();
            break;

        case "eliminar":
            $(".Dialog_Datos").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TConsecutivos_General").html("");
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

    OpenControl();

    if (ValidateSelect == 1) {
        filtro = "N";
        opcion = "ALL";
        transacionAjax_Consecutivos_General("consulta_G", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_Consecutivos_General("consulta_G", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_Consecutivos_General_create("crear_G");
        }
        else {
            transacionAjax_Consecutivos_General_create("modificar_G");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    OpenControl();
    transacionAjax_Consecutivos_General_delete("elimina_G");
}


//validamos campos para la creacion del link
function validarCamposCrear() {

    var Campo_1 = $("#Select_EmpresaNit").val();
    var Campo_2 = $("#Txt_ID").val();
    var Campo_3 = $("#TxtDescription").val();
    var Campo_4 = $("#TxtConsecutivo").val();

    var validar = 0;

    if (Campo_4 == "" || Campo_3 == "" || Campo_2 == "" || Campo_1 == "-1") {
        validar = 1;

        if (Campo_1 == "-1")
            $("#Img1").css("display", "inline-table");
        else
            $("#Img1").css("display", "none");

        if (Campo_2 == "")
            $("#Img2").css("display", "inline-table");
        else
            $("#Img2").css("display", "none");

        if (Campo_3 == "")
            $("#Img3").css("display", "inline-table");
        else
            $("#Img3").css("display", "none");

        if (Campo_4 == "")
            $("#Img5").css("display", "inline-table");
        else
            $("#Img5").css("display", "none");
    }
    else {
        $("#Img1").css("display", "none");
        $("#Img2").css("display", "none");
        $("#Img3").css("display", "none");
        $("#Img5").css("display", "none");
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
function Table_Consecutivos_General() {

    var html_Consecutivos_General;
    var Index_Pos = 0;
    switch (estado) {

        case "buscar":
            html_Consecutivos_General = "<table id='TConsecutivos_General' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Descripción</th><th>Codigo</th><th>Consecutivo</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayConsecutivos_General) {
                if (ArrayConsecutivos_General[itemArray].Consecutivos_General_ID != 0) {
                    html_Consecutivos_General += "<tr id= 'TConsecutivos_General_" + ArrayConsecutivos_General[itemArray].Consecutivos_General_ID + "'><td>" + ArrayConsecutivos_General[itemArray].Descripcion + "</td><td>" + ArrayConsecutivos_General[itemArray].Consecutivo_ID + "</td><td>" + ArrayConsecutivos_General[itemArray].Consecutivo + "</td><td>" + ArrayConsecutivos_General[itemArray].UsuarioCreacion + "</td><td>" + ArrayConsecutivos_General[itemArray].FechaCreacion + "</td><td>" + ArrayConsecutivos_General[itemArray].UsuarioActualizacion + "</td><td>" + ArrayConsecutivos_General[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "modificar":
            html_Consecutivos_General = "<table id='TConsecutivos_General' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Editar</th><th>Descripción</th><th>Codigo</th><th>Consecutivo</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayConsecutivos_General) {
                if (ArrayConsecutivos_General[itemArray].Consecutivos_General_ID != 0) {
                    Index_Pos = parseInt(ArrayConsecutivos_General[itemArray].Index) - 1;
                    html_Consecutivos_General += "<tr id= 'TConsecutivos_General_" + ArrayConsecutivos_General[itemArray].Consecutivos_General_ID + "'><td><span class='cssToolTip_ver'><img  src='../../images/Editar1.png' width='23px' height='23px' class= 'Editar' name='editar' onmouseover=\"this.src='../../images/EditarOver.png';\" onmouseout=\"this.src='../../images/Editar1.png';\" onclick=\"Editar('" + Index_Pos + "')\"></img><span>Editar Consecutivo General</span></span></td><td>" + ArrayConsecutivos_General[itemArray].Descripcion + "</td><td>" + ArrayConsecutivos_General[itemArray].Consecutivo_ID + "</td><td>" + ArrayConsecutivos_General[itemArray].Consecutivo + "</td><td>" + ArrayConsecutivos_General[itemArray].UsuarioCreacion + "</td><td>" + ArrayConsecutivos_General[itemArray].FechaCreacion + "</td><td>" + ArrayConsecutivos_General[itemArray].UsuarioActualizacion + "</td><td>" + ArrayConsecutivos_General[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "eliminar":
            html_Consecutivos_General = "<table id='TConsecutivos_General' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Descripción</th><th>Codigo</th><th>Consecutivo</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayConsecutivos_General) {
                if (ArrayConsecutivos_General[itemArray].Consecutivos_General_ID != 0) {
                    Index_Pos = parseInt(ArrayConsecutivos_General[itemArray].Index) - 1;
                    html_Consecutivos_General += "<tr id= 'TConsecutivos_General_" + ArrayConsecutivos_General[itemArray].Consecutivos_General_ID + "'><td><span class='cssToolTip_ver'><img  src='../../images/Delete.png' width='23px' height='23px' class= 'Eliminar' name='eliminar' onmouseover=\"this.src='../../images/DeleteOver.png';\" onmouseout=\"this.src='../../images/Delete.png';\" onclick=\"Eliminar('" + Index_Pos + "')\"></img><span>Eliminar Consecutivo General</span></span></td><td>" + ArrayConsecutivos_General[itemArray].Descripcion + "</td><td>" + ArrayConsecutivos_General[itemArray].Consecutivo_ID + "</td><td>" + ArrayConsecutivos_General[itemArray].Consecutivo + "</td><td>" + ArrayConsecutivos_General[itemArray].UsuarioCreacion + "</td><td>" + ArrayConsecutivos_General[itemArray].FechaCreacion + "</td><td>" + ArrayConsecutivos_General[itemArray].UsuarioActualizacion + "</td><td>" + ArrayConsecutivos_General[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;
    }

    html_Consecutivos_General += "</tbody></table>";
    $("#container_TConsecutivos_General").html("");
    $("#container_TConsecutivos_General").html(html_Consecutivos_General);

    $(".Eliminar").click(function () {
    });

    $(".Editar").click(function () {
    });

    $("#TConsecutivos_General").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });

}


//muestra el registro a eliminar
function Eliminar(Index) {

    editNit_ID = ArrayConsecutivos_General[Index].Nit_ID;
    editID = ArrayConsecutivos_General[Index].Consecutivo_ID;

    $("#dialog_eliminar").dialog("option", "title", "Eliminar?");
    $("#dialog_eliminar").dialog("open");

}

// muestra el registro a editar
function Editar(Index) {

    $(".Dialog_Datos").css("display", "inline-table");
    $("#TablaConsulta").css("display", "none");

    editNit_ID = ArrayConsecutivos_General[Index].Nit_ID;
    editID = ArrayConsecutivos_General[Index].Consecutivo_ID;

    $("#Select_EmpresaNit").val(ArrayConsecutivos_General[Index].Nit_ID);
    $("#Txt_ID").val(ArrayConsecutivos_General[Index].Consecutivo_ID);
    $("#TxtDescription").val(ArrayConsecutivos_General[Index].Descripcion);
    $("#TxtConsecutivo").val(ArrayConsecutivos_General[Index].Consecutivo);

    $("#Select_EmpresaNit").attr("disabled", "disabled");
    $("#Txt_ID").attr("disabled", "disabled");

    $("#Btnguardar").attr("value", "Actualizar");

    $('.C_Chosen').trigger('chosen:updated');
}

//evento del boton salir
function x() {
    $("#dialog").dialog("close");
}

//limpiar campos
function Clear() {
    $("#Select_EmpresaNit").val("-1");
    $("#Txt_ID").val("");
    $("#TxtDescription").val("");

    $("#TxtConsecutivo").val("");
    $("#TxtRead").val("");
    $("#DDLColumns").val("-1").trigger('chosen:updated');

    $('.C_Chosen').trigger('chosen:updated');

}