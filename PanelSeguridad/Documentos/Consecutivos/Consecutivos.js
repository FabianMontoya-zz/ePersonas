/*--------------- region de variables globales --------------------*/
var ArrayConsecutivos = [];
var ArrayCombo = [];
var ArrayConsecutivosDep = [];
var ArraySeguridad = [];

var estado;
var editNit_ID;
var index_ID;
var editID;
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {

    /*Llamado de metodos para ocultar elementos al inicio de la operación de la pantalla*/
    Ventanas_Emergentes(); //Ventanas_Emergentes Va primero pues es la que llama al load de espera al inicio de los AJAX
    Ocultar_Errores();
    Ocultar_Tablas();
    /*==================FIN LLAMADO INICIAL DE METODOS DE INICIALIZACIÓN==============*/

    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
    transacionAjax_EmpresaNit('Cliente');

});

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
}

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
            VerificarNIT("Select_EmpresaNit");
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

//consulta del del crud(READ)
function BtnConsulta() {

    var filtro;
    var ValidateSelect = ValidarDroplist();
    var opcion;

    OpenControl(); //Abrimos el load de espera con el logo

    if (ValidateSelect == 1) {
        filtro = "N";
        opcion = "ALL";
        transacionAjax_Consecutivos("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_Consecutivos("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_Consecutivos_create("crear");
        }
        else {
            transacionAjax_Consecutivos_create("modificar");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    OpenControl(); //Abrimos el load de espera con el logo
    transacionAjax_Consecutivos_delete("elimina");
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
function Table_Consecutivos() {

    var html_Consecutivos;
    var Index_Pos = 0;
    switch (estado) {

        case "buscar":
            html_Consecutivos = "<table id='TConsecutivos' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Empresa</th><th>Descripción</th><th>Codigo</th><th>Consecutivo</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayConsecutivos) {
                if (ArrayConsecutivos[itemArray].Consecutivos_ID != 0) {
                    html_Consecutivos += "<tr id= 'TConsecutivos_" + ArrayConsecutivos[itemArray].Consecutivos_ID + "'><td>" + ArrayConsecutivos[itemArray].Nit_ID + " - " + ArrayConsecutivos[itemArray].DescripEmpresa + "</td><td>" + ArrayConsecutivos[itemArray].Descripcion + "</td><td>" + ArrayConsecutivos[itemArray].Consecutivo_ID + "</td><td>" + ArrayConsecutivos[itemArray].Consecutivo + "</td><td>" + ArrayConsecutivos[itemArray].UsuarioCreacion + "</td><td>" + ArrayConsecutivos[itemArray].FechaCreacion + "</td><td>" + ArrayConsecutivos[itemArray].UsuarioActualizacion + "</td><td>" + ArrayConsecutivos[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "modificar":
            html_Consecutivos = "<table id='TConsecutivos' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Editar</th><th>Empresa</th><th>Descripción</th><th>Codigo</th><th>Consecutivo</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayConsecutivos) {
                if (ArrayConsecutivos[itemArray].Consecutivos_ID != 0) {
                    Index_Pos = parseInt(ArrayConsecutivos[itemArray].Index) - 1;
                    html_Consecutivos += "<tr id= 'TConsecutivos_" + ArrayConsecutivos[itemArray].Consecutivos_ID + "'><td><span class='cssToolTip_ver'><img  src='../../images/Editar1.png' width='23px' height='23px' class= 'Editar' name='editar' onmouseover=\"this.src='../../images/EditarOver.png';\" onmouseout=\"this.src='../../images/Editar1.png';\" onclick=\"Editar('" + Index_Pos + "')\"></img><span>Editar Consecutivo</span></span></td><td>" + ArrayConsecutivos[itemArray].Nit_ID + " - " + ArrayConsecutivos[itemArray].DescripEmpresa + "</td><td>" + ArrayConsecutivos[itemArray].Descripcion + "</td><td>" + ArrayConsecutivos[itemArray].Consecutivo_ID + "</td><td>" + ArrayConsecutivos[itemArray].Consecutivo + "</td><td>" + ArrayConsecutivos[itemArray].UsuarioCreacion + "</td><td>" + ArrayConsecutivos[itemArray].FechaCreacion + "</td><td>" + ArrayConsecutivos[itemArray].UsuarioActualizacion + "</td><td>" + ArrayConsecutivos[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "eliminar":
            html_Consecutivos = "<table id='TConsecutivos' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Empresa</th><th>Descripción</th><th>Codigo</th><th>Consecutivo</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayConsecutivos) {
                if (ArrayConsecutivos[itemArray].Consecutivos_ID != 0) {
                    Index_Pos = parseInt(ArrayConsecutivos[itemArray].Index) - 1;
                    html_Consecutivos += "<tr id= 'TConsecutivos_" + ArrayConsecutivos[itemArray].Consecutivos_ID + "'><td><span class='cssToolTip_ver'><img  src='../../images/Delete.png' width='23px' height='23px' class= 'Eliminar' name='eliminar' onmouseover=\"this.src='../../images/DeleteOver.png';\" onmouseout=\"this.src='../../images/Delete.png';\" onclick=\"Eliminar('" + Index_Pos + "')\"></img><span>Eliminar Consecutivo</span></span></td><td>" + ArrayConsecutivos[itemArray].Nit_ID + " - " + ArrayConsecutivos[itemArray].DescripEmpresa + "</td><td>" + ArrayConsecutivos[itemArray].Descripcion + "</td><td>" + ArrayConsecutivos[itemArray].Consecutivo_ID + "</td><td>" + ArrayConsecutivos[itemArray].Consecutivo + "</td><td>" + ArrayConsecutivos[itemArray].UsuarioCreacion + "</td><td>" + ArrayConsecutivos[itemArray].FechaCreacion + "</td><td>" + ArrayConsecutivos[itemArray].UsuarioActualizacion + "</td><td>" + ArrayConsecutivos[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;
    }

    html_Consecutivos += "</tbody></table>";
    $(".container_TGrid").html("");
    $(".container_TGrid").html(html_Consecutivos);

    $(".Eliminar").click(function () {
    });

    $(".Editar").click(function () {
    });

    $("#TConsecutivos").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });

}

//muestra el registro a eliminar
function Eliminar(Index) {

    editNit_ID = ArrayConsecutivos[Index].Nit_ID;
    editID = ArrayConsecutivos[Index].Consecutivo_ID;

    $("#dialog_eliminar").dialog("option", "title", "Eliminar?");
    $("#dialog_eliminar").dialog("open");

}

// muestra el registro a editar
function Editar(Index) {

    $(".Dialog_Datos").css("display", "inline-table");
    $("#TablaConsulta").css("display", "none");

    editNit_ID = ArrayConsecutivos[Index].Nit_ID;
    editID = ArrayConsecutivos[Index].Consecutivo_ID;

    $("#Select_EmpresaNit").val(ArrayConsecutivos[Index].Nit_ID);
    $("#Txt_ID").val(ArrayConsecutivos[Index].Consecutivo_ID);
    $("#TxtDescription").val(ArrayConsecutivos[Index].Descripcion);
    $("#TxtConsecutivo").val(ArrayConsecutivos[Index].Consecutivo);

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
    $("#DDLColumns").val("-1");

    $('.C_Chosen').trigger('chosen:updated');
    VerificarNIT("Select_EmpresaNit");
}