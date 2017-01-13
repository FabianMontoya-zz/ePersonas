/*--------------- region de variables globales --------------------*/ArrayCiclo
var ArrayCiclo = [];
var ArrayCombo = [];
var estado;
var editID;
var editNIT;
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {

    $("#Marco_trabajo_Form").css("height", "490px");
    $("#container_TCiclo").css("height", "380px");

    /*Llamado de metodos para ocultar elementos al inicio de la operación de la pantalla*/
    Ventanas_Emergentes(); //Ventanas_Emergentes Va primero pues es la que llama al load de espera al inicio de los AJAX
    Ocultar_Errores();
    Ocultar_Tablas();
    Picker_Fechas();
    /*==================FIN LLAMADO INICIAL DE METODOS DE INICIALIZACIÓN==============*/

    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');

    Change_Select_Nit();

});

//Función que oculta todas las IMG de los errores en pantalla
function Ocultar_Errores() {
    ResetError();
    $("#ESelect").css("display", "none");
    $("#DE").css("display", "none");
    $("#DS").css("display", "none");
    /*Se ocultan en la SASIF Master*/
}

//funcion para las ventanas emergentes
function Ventanas_Emergentes() {

    Load_Charge_Sasif(); //Carga de "SasifMaster.js" el ContCiclo de Carga

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

//Función de control del picker de las fechas
function Picker_Fechas() {
    $("#TxtFechaCorte").datepicker({ dateFormat: 'yy-mm-dd', dialogClass: "Dialog_Sasif" });
    $("#TextFechaPago").datepicker({ dateFormat: 'yy-mm-dd', dialogClass: "Dialog_Sasif" });
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
            $("#Txt_ID").removeAttr("disabled");
            $("#Btnguardar").attr("value", "Guardar");
            ResetError();
            Clear();
            estado = opcion;
            break;

        case "buscar":
            $("#TablaDatos").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TCiclo").html("");
            estado = opcion;
            Clear();
            break;

        case "modificar":
            $("#TablaDatos").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TCiclo").html("");
            estado = opcion;
            ResetError();
            Clear();
            break;

        case "eliminar":
            $("#TablaDatos").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TCiclo").html("");
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

    //OpenContCiclo(); //Abrimos el load de espera con el logo

    if (ValidateSelect == 1) {
        filtro = "N";
        opcion = "ALL";
        transacionAjax_Ciclo("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_Ciclo("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_Ciclo_create("crear");
        }
        else {
            transacionAjax_Ciclo_create("modificar");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    $("#dialog_eliminar").dialog("close");
    transacionAjax_Ciclo_delete("elimina");
}

//validamos campos para la creacion del Ciclo
function validarCamposCrear() {

    var valID = $("#Txt_ID").val();
    var descrip = $("#TxtDescription").val();
    var fCorte = $("#TxtFechaCorte").val();
    var fPago = $("#TextFechaPago").val();
    var validar = 0;

    if (descrip == "" || valID == "") {
        validar = 1;
        //
        if (valID == "") {
            $("#ImgID").css("display", "inline-table");
        }
        else {
            $("#ImgID").css("display", "none");
        }
        //
        if (descrip == "") {
            $("#Img1").css("display", "inline-table");
        }
        else {
            $("#Img1").css("display", "none");
        }
        //
        if (fCorte == "") {
            $("#Img1").css("display", "inline-table");
        }
        else {
            $("#Img1").css("display", "none");
        }
        //
        if (fPago == "") {
            $("#Img1").css("display", "inline-table");
        }
        else {
            $("#Img1").css("display", "none");
        }


    }
    else {
        ResetError();
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
function Table_Ciclo() {

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
    var html_TCiclo = "<table id='TCiclo' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Código</th><th>Descripción</th><th>Fecha de Corte</th><th>Fecha de Pago</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Usuario Actualización</th><th>Fecha Última Actualización</th></tr></thead><tbody>";
    for (itemArray in ArrayCiclo) {
        if (ArrayCiclo[itemArray].Estado != 2) {
            html_TCiclo += "<tr id= 'TCiclo_" + ArrayCiclo[itemArray].Index + "'><td><span class='cssToolTip_ver'><img  src='../../images/Delete.png' width='23px' height='23px' class= 'Eliminar' name='eliminar' onmouseover=\"this.src='../../images/DeleteOver.png';\" onmouseout=\"this.src='../../images/Delete.png';\" onclick=\"Eliminar('" + ArrayCiclo[itemArray].Index + "')\"></img><span>Eliminar Perfil</span></span></td><td>" + ArrayCiclo[itemArray].ID_Ciclo + "</td><td style='white-space: nowrap;'>" + ArrayCiclo[itemArray].Descripcion + "</td><td style='white-space: nowrap;'>" + ArrayCiclo[itemArray].Fecha_Corte + "</td><td style='white-space: nowrap;'>" + ArrayCiclo[itemArray].Fecha_Pago + "</td><td style='white-space: nowrap;'> " + ArrayCiclo[itemArray].UsuarioCreacion + " </td><td  style='white-space: nowrap;'> " + ArrayCiclo[itemArray].FechaCreacion + " </td><td style='white-space: nowrap;'> " + ArrayCiclo[itemArray].UsuarioActualizacion + " </td><td  style='white-space: nowrap;'> " + ArrayCiclo[itemArray].FechaActualizacion + " </td></tr>";
        }
    }
    html_TCiclo += "</tbody></table>";
    $("#container_TCiclo").html("");
    $("#container_TCiclo").html(html_TCiclo);

    $(".Eliminar").click(function () {
    });

    $("#TCiclo").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Eliminar(index_Ciclo) {

    for (itemArray in ArrayCiclo) {
        if (index_Ciclo == ArrayCiclo[itemArray].Index) {
            editID = ArrayCiclo[itemArray].ID_Ciclo;
            $("#dialog_eliminar").dialog("option", "title", "¿Cambiar Estado a Perfil?");
            $("#dialog_eliminar").dialog("open");
        }
    }

}

//grid con el boton editar
function Tabla_modificar() {
    var html_TCiclo = "<table id='TCiclo' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Editar</th><th>Código</th><th>Descripción</th><th>Fecha de Corte</th><th>Fecha de Pago</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Usuario Actualización</th><th>Fecha Última Actualización</th></tr></thead><tbody>";
    for (itemArray in ArrayCiclo) {
        html_TCiclo += "<tr id= 'TCiclo_" + ArrayCiclo[itemArray].Index + "'><td><span class='cssToolTip_ver'><img  src='../../images/Editar1.png' width='23px' height='23px' class= 'Editar' name='editar' onmouseover=\"this.src='../../images/EditarOver.png';\" onmouseout=\"this.src='../../images/Editar1.png';\" onclick=\"Editar('" + ArrayCiclo[itemArray].Index + "')\"></img><span>Editar Perfil</span></span></td><td>" + ArrayCiclo[itemArray].ID_Ciclo + "</td><td style='white-space: nowrap;'>" + ArrayCiclo[itemArray].Descripcion + "</td><td style='white-space: nowrap;'>" + ArrayCiclo[itemArray].Fecha_Corte + "</td><td style='white-space: nowrap;'>" + ArrayCiclo[itemArray].Fecha_Pago + "</td><td style='white-space: nowrap;'> " + ArrayCiclo[itemArray].UsuarioCreacion + " </td><td  style='white-space: nowrap;'> " + ArrayCiclo[itemArray].FechaCreacion + " </td><td style='white-space: nowrap;'> " + ArrayCiclo[itemArray].UsuarioActualizacion + " </td><td  style='white-space: nowrap;'> " + ArrayCiclo[itemArray].FechaActualizacion + " </td></tr>";
    }
    html_TCiclo += "</tbody></table>";
    $("#container_TCiclo").html("");
    $("#container_TCiclo").html(html_TCiclo);

    $(".Editar").click(function () {
    });

    $("#TCiclo").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

// muestra el registro a editar
function Editar(index_Ciclo) {

    $("#TablaDatos").css("display", "inline-table");
    $("#TablaConsulta").css("display", "none");

    for (itemArray in ArrayCiclo) {
        if (index_Ciclo == ArrayCiclo[itemArray].Index) {
            $("#Txt_ID").val(ArrayCiclo[itemArray].ID_Ciclo);
            $("#Txt_ID").attr("disabled", "disabled");
            editID = ArrayCiclo[itemArray].ID_Ciclo;
            $("#TxtDescription").val(ArrayCiclo[itemArray].Descripcion);
            $("#TxtFechaCorte").val(ArrayCiclo[itemArray].Fecha_Corte);
            $("#TxtFechaCorte").prop('disabled', true);
            $("#TextFechaPago").val(ArrayCiclo[itemArray].Fecha_Pago);
            $("#TxtSigla").val(ArrayCiclo[itemArray].Sigla);
            $("#Btnguardar").attr("value", "Actualizar");
        }
    }
}

//grid sin botones para ver resultado
function Tabla_consulta() {
    var html_TCiclo = "<table id='TCiclo' border='1'  cellpadding='1' cellspacing='1' style='width: 100%'><thead><tr><th>Código</th><th>Descripción</th><th>Fecha de Corte</th><th>Fecha de Pago</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Usuario Actualización</th><th>Fecha Última Actualización</th></tr></thead><tbody>";
    for (itemArray in ArrayCiclo) {
        html_TCiclo += "<tr id= 'TCiclo_" + ArrayCiclo[itemArray].Index + "'><td>" + ArrayCiclo[itemArray].ID_Ciclo + "</td><td>" + ArrayCiclo[itemArray].Descripcion + "</td><td>" + ArrayCiclo[itemArray].Fecha_Corte + "</td><td>" + ArrayCiclo[itemArray].Fecha_Pago + "</td><td style='white-space: nowrap;'> " + ArrayCiclo[itemArray].UsuarioCreacion + " </td><td  style='white-space: nowrap;'> " + ArrayCiclo[itemArray].FechaCreacion + " </td><td style='white-space: nowrap;'> " + ArrayCiclo[itemArray].UsuarioActualizacion + " </td><td  style='white-space: nowrap;'> " + ArrayCiclo[itemArray].FechaActualizacion + " </td></tr>";
    }
    html_TCiclo += "</tbody></table>";
    $("#container_TCiclo").html("");
    $("#container_TCiclo").html(html_TCiclo);

    $("#TCiclo").dataTable({
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
    Ocultar_Errores();
   
    $("#Txt_ID").val("");
    $("#TxtFechaCorte").prop('disabled', false);
    $("#TxtDescription").val("");
    $("#TxtSigla").val("");
    $("#TxtRead").val("");
    $("#DDLColumns").val("-1");
    $("#TxtFechaCorte").val("");
    $("#TextFechaPago").val("");
}

