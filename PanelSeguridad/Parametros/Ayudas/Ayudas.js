/*--------------- region de variables globales --------------------*/
var ArrayAyudas = [];
var ArrayCombo = [];
var estado;
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
    
});

//Función que oculta todas las IMG de los errores en pantalla
function Ocultar_Errores() {
    ResetError();
    $("#ESelect").css("display", "none");
    $("#ImgID").css("display", "none");
    $("#Img2").css("display", "none");
    $("#Img1").css("display", "none");
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
    $("#TablaDatos").css("display", "none");
    $("#TablaConsulta").css("display", "none");
}


//habilita el panel de crear o consulta
function HabilitarPanel(opcion) {

    switch (opcion) {

        case "crear":
            $("#TablaDatos").css("display", "inline-table");
            $("#TablaConsulta").css("display", "none");
            $("#Txt_ID").removeAttr("disabled");
            $("#Btnguardar").attr("value", "Guardar");
            ResetError();
            Clear();
            estado = opcion;
            break;

        case "buscar":
            $("#TablaDatos").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $(".container_TGrid").html("");
            estado = opcion;
            Clear();
            break;

        case "modificar":
            $("#TablaDatos").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $(".container_TGrid").html("");
            estado = opcion;
            ResetError();
            Clear();
            break;

        case "eliminar":
            $("#TablaDatos").css("display", "none");
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
        transacionAjax_Ayudas("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_Ayudas("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_Ayudas_create("crear");
        }
        else {
            transacionAjax_Ayudas_create("modificar");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    OpenControl(); //Abrimos el load de espera con el logo
    transacionAjax_Ayudas_delete("elimina");
}


//validamos campos para la creacion del link
function validarCamposCrear() {

    var Campo_1 = $("#Txt_ID").val();
    var Campo_2 = $("#TxtNombre").val();
    var Campo_3 = $("#TxtArea_Descripcion").val();

    var validar = 0;

    if (Campo_3 == "" || Campo_2 == "" || Campo_1 == "") {
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
        if (Campo_3 == "") {
            $("#Img2").css("display", "inline-table");
        }
        else {
            $("#Img2").css("display", "none");
        }
    }
    else {
        $("#Img2").css("display", "none");
        $("#Img1").css("display", "none");
        $("#ImgID").css("display", "none");
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
function Table_Ayudas() {

    var html_Ayudas;

    switch (estado) {

        case "buscar":
            html_Ayudas = "<table id='TAyudas' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Codigo</th><th>Nombre</th><th>Descripción</th></tr></thead><tbody>";
            for (itemArray in ArrayAyudas) {
                if (ArrayAyudas[itemArray].Ayudas_ID != 0) {
                    html_Ayudas += "<tr id= 'TAyudas_" + ArrayAyudas[itemArray].Ayudas_ID + "'><td>" + ArrayAyudas[itemArray].Ayudas_ID + "</td><td>" + ArrayAyudas[itemArray].Nombre + "</td><td>" + ArrayAyudas[itemArray].Descripcion + "</td></tr>";
                }
            }
            break;

        case "modificar":
            html_Ayudas = "<table id='TAyudas' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Editar</th><th>Codigo</th><th>Nombre</th><th>Descripción</th></tr></thead><tbody>";
            for (itemArray in ArrayAyudas) {
                if (ArrayAyudas[itemArray].Ayudas_ID != 0) {
                    html_Ayudas += "<tr id= 'TAyudas_" + ArrayAyudas[itemArray].Ayudas_ID + "'><td><span class='cssToolTip_ver'><img  src='../../images/Editar1.png' width='23px' height='23px' class= 'Editar' name='editar' onmouseover=\"this.src='../../images/EditarOver.png';\" onmouseout=\"this.src='../../images/Editar1.png';\" onclick=\"Editar('" + ArrayAyudas[itemArray].Ayudas_ID + "')\"></img><span>Editar Ayuda</span></span></td><td>" + ArrayAyudas[itemArray].Ayudas_ID + "</td><td>" + ArrayAyudas[itemArray].Nombre + "</td><td>" + ArrayAyudas[itemArray].Descripcion + "</td></tr>";
                }
            }
            break;

        case "eliminar":
            html_Ayudas = "<table id='TAyudas' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Codigo</th><th>Nombre</th><th>Descripción</th></tr></thead><tbody>";
            for (itemArray in ArrayAyudas) {
                if (ArrayAyudas[itemArray].Ayudas_ID != 0) {
                    html_Ayudas += "<tr id= 'TAyudas_" + ArrayAyudas[itemArray].Ayudas_ID + "'><td><span class='cssToolTip_ver'><img  src='../../images/Delete.png' width='23px' height='23px' class= 'Eliminar' name='eliminar' onmouseover=\"this.src='../../images/DeleteOver.png';\" onmouseout=\"this.src='../../images/Delete.png';\" onclick=\"Eliminar('" + ArrayAyudas[itemArray].Ayudas_ID + "')\"></img><span>Eliminar Ayuda</span></span></td><td>" + ArrayAyudas[itemArray].Ayudas_ID + "</td><td>" + ArrayAyudas[itemArray].Nombre + "</td><td>" + ArrayAyudas[itemArray].Descripcion + "</td></tr>";
                }
            }
            break;
    }
    html_Ayudas += "</tbody></table>";
    $(".container_TGrid").html("");
    $(".container_TGrid").html(html_Ayudas);

    $("#TAyudas").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Eliminar(index_Ayudas) {

    for (itemArray in ArrayAyudas) {
        if (index_Ayudas == ArrayAyudas[itemArray].Ayudas_ID) {
            editID = ArrayAyudas[itemArray].Ayudas_ID;
            $("#dialog_eliminar").dialog("option", "title", "Eliminar?");
            $("#dialog_eliminar").dialog("open");
        }
    }

}

// muestra el registro a editar
function Editar(index_Ayudas) {

    $("#TablaDatos").css("display", "inline-table");
    $("#TablaConsulta").css("display", "none");

    for (itemArray in ArrayAyudas) {
        if (index_Ayudas == ArrayAyudas[itemArray].Ayudas_ID) {
            $("#Txt_ID").val(ArrayAyudas[itemArray].Ayudas_ID);
            $("#Txt_ID").attr("disabled", "disabled");
            $("#TxtNombre").val(ArrayAyudas[itemArray].Nombre);
            $("#TxtArea_Descripcion").val(ArrayAyudas[itemArray].Descripcion);
            editID = ArrayAyudas[itemArray].Ayudas_ID;
            $("#Btnguardar").attr("value", "Actualizar");
        }
    }
}

//evento del boton salir
function x() {
    $("#dialog").dialog("close");
}

//limpiar campos
function Clear() {
    $("#Txt_ID").val("");
    $("#TxtNombre").val("");
    $("#TxtArea_Descripcion").val("");
    $("#TxtRead").val("");
    $("#DDLColumns").val("-1").trigger("chosen:updated");
}