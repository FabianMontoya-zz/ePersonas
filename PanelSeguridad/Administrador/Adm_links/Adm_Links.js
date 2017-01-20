/*--------------- region de variables globales --------------------*/
var ArrayLinks = [];
var ArrayCombo = [];
var estado;
var editID;
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {

    $("#Marco_trabajo_Form").css("height", "490px");
    $("#container_Tlink").css("height", "380px");

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
    $("#Img1").css("display", "none");
    $("#Img2").css("display", "none");
    $("#DE").css("display", "none");
    $("#DS").css("display", "none");
    $("#ImgID").css("display", "none");
}

//funcion para las ventanas emergentes
function Ventanas_Emergentes() {

    Load_Charge_Sasif(); //Carga de "SasifMaster.js" el Control de Carga

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
            $("#container_Tlink").html("");
            estado = opcion;
            Clear();
            break;

        case "modificar":
            $("#TablaDatos").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_Tlink").html("");
            estado = opcion;
            ResetError();
            Clear();
            break;

        case "eliminar":
            $("#TablaDatos").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_Tlink").html("");
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
        transacionAjax_link("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_link("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_link_create("crear");
        }
        else {
            transacionAjax_link_create("modificar");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    transacionAjax_link_delete("elimina");
}


//validamos campos para la creacion del link
function validarCamposCrear() {

    var valID = $("#Txt_ID").val();
    var ruta = $("#TxtRuta").val();
    var descrip = $("#TxtDescription").val();
    var validar = 0;

    if (ruta == "" || descrip == "" || valID == "") {
        validar = 1;
        if (valID == "") {
            $("#ImgID").css("display", "inline-table");
        }
        else {
            $("#ImgID").css("display", "none");
        }

        if (ruta == "") {
            $("#Img2").css("display", "inline-table");
        }
        else {
            $("#Img2").css("display", "none");
        }
        if (descrip == "") {
            $("#Img1").css("display", "inline-table");
        }
        else {
            $("#Img1").css("display", "none");
        }


    }
    else {
        $("#Img1").css("display", "none");
        $("#Img2").css("display", "none");
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
function Table_links() {

    var html_Tlink;

    switch (estado) {

        case "buscar":
            var html_Tlink = "<table id='TLink' border='1'  cellpadding='1' cellspacing='1' style='width: 100%'><thead><tr><th>Código</th><th>Descripción</th><th>Parámetro 1</th><th>Parámetro 2</th><th>Link</th><th>Estado</th></tr></thead><tbody>";
            for (itemArray in ArrayLinks) {
                if (ArrayLinks[itemArray].Link_ID != 0) {
                    html_Tlink += "<tr id= 'TLink_" + ArrayLinks[itemArray].Link_ID + "'><td>" + ArrayLinks[itemArray].Link_ID + "</td><td style='white-space: nowrap;'>" + ArrayLinks[itemArray].Descripcion + "</td><td>" + ArrayLinks[itemArray].Param1 + "</td><td>" + ArrayLinks[itemArray].Param2 + "</td><td style='white-space: nowrap;'> " + ArrayLinks[itemArray].LinkPag + " </td><td> " + ArrayLinks[itemArray].Estado + " </td></tr>";
                }
            }
            break;

        case "modificar":
            html_Tlink = "<table id='TLink' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Editar</th><th>Código</th><th>Descripción</th><th>Parámetro 1</th><th>Parámetro 2</th><th>Link</th><th>Estado</th></tr></thead><tbody>";
            for (itemArray in ArrayLinks) {
                if (ArrayLinks[itemArray].Link_ID != 0) {
                    html_Tlink += "<tr id= 'TLink_" + ArrayLinks[itemArray].Link_ID + "'><td><span class='cssToolTip_ver'><img  src='../../images/Editar1.png' width='23px' height='23px' class= 'Editar' name='editar' onmouseover=\"this.src='../../images/EditarOver.png';\" onmouseout=\"this.src='../../images/Editar1.png';\" onclick=\"Editar('" + ArrayLinks[itemArray].Link_ID + "')\"></img><span>Editar Página</span></span></td><td>" + ArrayLinks[itemArray].Link_ID + "</td><td style='white-space: nowrap;'>" + ArrayLinks[itemArray].Descripcion + "</td><td>" + ArrayLinks[itemArray].Param1 + "</td><td>" + ArrayLinks[itemArray].Param2 + "</td><td style='white-space: nowrap;'> " + ArrayLinks[itemArray].LinkPag + " </td><td> " + ArrayLinks[itemArray].Estado + " </td></tr>";
                }
            }
            break;

        case "eliminar":
            html_Tlink = "<table id='TLink' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Código</th><th>Descripción</th><th>Parámetro 1</th><th>Parámetro 2</th><th>Link</th><th>Estado</th></tr></thead><tbody>";
            for (itemArray in ArrayLinks) {
                if (ArrayLinks[itemArray].Link_ID != 0) {
                    html_Tlink += "<tr id= 'TLink_" + ArrayLinks[itemArray].Link_ID + "'><td><span class='cssToolTip_ver'><img  src='../../images/Delete.png' width='23px' height='23px' class= 'Eliminar' name='eliminar' onmouseover=\"this.src='../../images/DeleteOver.png';\" onmouseout=\"this.src='../../images/Delete.png';\" onclick=\"Eliminar('" + ArrayLinks[itemArray].Link_ID + "')\"></img><span>Eliminar Página</span></span></td><td>" + ArrayLinks[itemArray].Link_ID + "</td><td style='white-space: nowrap;'>" + ArrayLinks[itemArray].Descripcion + "</td><td>" + ArrayLinks[itemArray].Param1 + "</td><td>" + ArrayLinks[itemArray].Param2 + "</td><td style='white-space: nowrap;'> " + ArrayLinks[itemArray].LinkPag + " </td><td> " + ArrayLinks[itemArray].Estado + " </td></tr>";
                }
            }
            break;
    }

    html_Tlink += "</tbody></table>";
    $("#container_Tlink").html("");
    $("#container_Tlink").html(html_Tlink);

    $("#TLink").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });

}

//muestra el registro a eliminar
function Eliminar(index_link) {

    for (itemArray in ArrayLinks) {
        if (index_link == ArrayLinks[itemArray].Link_ID) {
            editID = ArrayLinks[itemArray].Link_ID;
            $("#dialog_eliminar").dialog("option", "title", "¿Cambiar Estado a Página?");
            $("#dialog_eliminar").dialog("open");
        }
    }

}

// muestra el registro a editar
function Editar(index_link) {

    $("#TablaDatos").css("display", "inline-table");
    $("#TablaConsulta").css("display", "none");

    for (itemArray in ArrayLinks) {
        if (index_link == ArrayLinks[itemArray].Link_ID) {
            $("#Txt_ID").val(ArrayLinks[itemArray].Link_ID);
            $("#Txt_ID").attr("disabled", "disabled");
            $("#TxtDescription").val(ArrayLinks[itemArray].Descripcion);
            $("#TxtParam1").val(ArrayLinks[itemArray].Param1);
            $("#TxtParam2").val(ArrayLinks[itemArray].Param2);
            $("#TxtRuta").val(ArrayLinks[itemArray].LinkPag);
            editID = ArrayLinks[itemArray].Link_ID;
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
    $("#TxtDescription").val("");
    $("#TxtParam1").val("");
    $("#TxtParam2").val("");
    $("#TxtRuta").val("");
    $("#TxtRead").val("");
    $("#DDLColumns").val("-1").trigger("chosen:updated");
}