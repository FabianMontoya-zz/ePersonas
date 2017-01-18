/*--------------- region de variables globales --------------------*/
var ArraySucursales = [];
var ArrayEmpresaNit = [];
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

    Load_Charge_Sasif(); //Carga de "SasifMaster.js" el ContSucursal de Carga

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

//salida del formulario
function btnSalir() {
    window.location = "../../Menu/menu.aspx?User=" + $("#User").html() + "&Key=" + ArrayMenu[0].Nit + "&LINK=" + Link;
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
            $("#container_TSucursal").html("");
            estado = opcion;
            Clear();
            break;

        case "modificar":
            $("#TablaDatos").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TSucursal").html("");
            estado = opcion;
            ResetError();
            Clear();
            break;

        case "eliminar":
            $("#TablaDatos").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TSucursal").html("");
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

    //OpenContSucursal(); //Abrimos el load de espera con el logo

    if (ValidateSelect == 1) {
        filtro = "N";
        opcion = "ALL";
        transacionAjax_Sucursal("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_Sucursal("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_Sucursal_create("crear");
        }
        else {
            transacionAjax_Sucursal_create("modificar");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    $("#dialog_eliminar").dialog("close");
    transacionAjax_Sucursal_delete("elimina");
}

//validamos campos para la creacion del Sucursal
function validarCamposCrear() {

    var NIT = $("#Select_EmpresaNit").val(); //ImgNIT
    var valID = $("#Txt_ID").val();
    var descrip = $("#TxtDescription").val();
    var validar = 0;

    if (NIT == "-1" || NIT == null || descrip == "" || valID == "") {
        validar = 1;
        /* -- Muestra de errores según dato faltante -- */
        if (NIT == "-1" || NIT == null) {
            $("#ImgNIT").css("display", "inline-table");
        } else {
            $("#ImgNIT").css("display", "none");
        }
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
function Table_Sucursal() {

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
    var html_TSucursal = "<table id='TSucursal' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>NIT Empresa</th><th>Código</th><th>Descripción</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Usuario Actualización</th><th>Fecha Última Actualización</th></tr></thead><tbody>";
    for (itemArray in ArraySucursales) {
        if (ArraySucursales[itemArray].Estado != 2) {
            html_TSucursal += "<tr id= 'TSucursal_" + ArraySucursales[itemArray].Index + "'><td><span class='cssToolTip_ver'><img  src='../../images/Delete.png' width='23px' height='23px' class= 'Eliminar' name='eliminar' onmouseover=\"this.src='../../images/DeleteOver.png';\" onmouseout=\"this.src='../../images/Delete.png';\" onclick=\"Eliminar('" + ArraySucursales[itemArray].Index + "')\"></img><span>Eliminar Perfil</span></span></td><td>" + ArraySucursales[itemArray].Nit_ID + "</td><td>" + ArraySucursales[itemArray].Sucursal_ID + "</td><td style='white-space: nowrap;'>" + ArraySucursales[itemArray].Descripcion + "</td><td style='white-space: nowrap;'> " + ArraySucursales[itemArray].UsuarioCreacion + " </td><td  style='white-space: nowrap;'> " + ArraySucursales[itemArray].FechaCreacion + " </td><td style='white-space: nowrap;'> " + ArraySucursales[itemArray].UsuarioActualizacion + " </td><td  style='white-space: nowrap;'> " + ArraySucursales[itemArray].FechaActualizacion + " </td></tr>";
        }
    }
    html_TSucursal += "</tbody></table>";
    $("#container_TSucursal").html("");
    $("#container_TSucursal").html(html_TSucursal);

    $(".Eliminar").click(function () {
    });

    $("#TSucursal").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Eliminar(index_Sucursal) {

    for (itemArray in ArraySucursales) {
        if (index_Sucursal == ArraySucursales[itemArray].Index) {
            editID = ArraySucursales[itemArray].Sucursal_ID;
            editNIT = ArraySucursales[itemArray].Nit_ID;
            $("#dialog_eliminar").dialog("option", "title", "¿Cambiar Estado a Perfil?");
            $("#dialog_eliminar").dialog("open");
        }
    }

}

//grid con el boton editar
function Tabla_modificar() {
    var html_TSucursal = "<table id='TSucursal' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Editar</th><th>NIT Empresa</th><th>Código</th><th>Descripción</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Usuario Actualización</th><th>Fecha Última Actualización</th></tr></thead><tbody>";
    for (itemArray in ArraySucursales) {
        html_TSucursal += "<tr id= 'TSucursal_" + ArraySucursales[itemArray].Index + "'><td><span class='cssToolTip_ver'><img  src='../../images/Editar1.png' width='23px' height='23px' class= 'Editar' name='editar' onmouseover=\"this.src='../../images/EditarOver.png';\" onmouseout=\"this.src='../../images/Editar1.png';\" onclick=\"Editar('" + ArraySucursales[itemArray].Index + "')\"></img><span>Editar Perfil</span></span></td><td>" + ArraySucursales[itemArray].Nit_ID + "</td><td>" + ArraySucursales[itemArray].Sucursal_ID + "</td><td style='white-space: nowrap;'>" + ArraySucursales[itemArray].Descripcion + "</td><td style='white-space: nowrap;'> " + ArraySucursales[itemArray].UsuarioCreacion + " </td><td  style='white-space: nowrap;'> " + ArraySucursales[itemArray].FechaCreacion + " </td><td style='white-space: nowrap;'> " + ArraySucursales[itemArray].UsuarioActualizacion + " </td><td  style='white-space: nowrap;'> " + ArraySucursales[itemArray].FechaActualizacion + " </td></tr>";
    }
    html_TSucursal += "</tbody></table>";
    $("#container_TSucursal").html("");
    $("#container_TSucursal").html(html_TSucursal);

    $(".Editar").click(function () {
    });

    $("#TSucursal").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

// muestra el registro a editar
function Editar(index_Sucursal) {

    $("#TablaDatos").css("display", "inline-table");
    $("#TablaConsulta").css("display", "none");

    for (itemArray in ArraySucursales) {
        if (index_Sucursal == ArraySucursales[itemArray].Index) {
            $("#Select_EmpresaNit").val(ArraySucursales[itemArray].Nit_ID).trigger("chosen:updated");
            editNIT = ArraySucursales[itemArray].Nit_ID;
            $("#Select_EmpresaNit").prop('disabled', true).trigger("chosen:updated");
            $("#Txt_ID").val(ArraySucursales[itemArray].Sucursal_ID);
            $("#Txt_ID").attr("disabled", "disabled");
            editID = ArraySucursales[itemArray].Sucursal_ID;
            $("#TxtDescription").val(ArraySucursales[itemArray].Descripcion);
            $("#TxtSigla").val(ArraySucursales[itemArray].Sigla);
            $("#Btnguardar").attr("value", "Actualizar");
        }
    }
}

//grid sin botones para ver resultado
function Tabla_consulta() {
    var html_TSucursal = "<table id='TSucursal' border='1'  cellpadding='1' cellspacing='1' style='width: 100%'><thead><tr><th>NIT Empresa</th><th>Código</th><th>Descripción</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Usuario Actualización</th><th>Fecha Última Actualización</th></tr></thead><tbody>";
    for (itemArray in ArraySucursales) {
        html_TSucursal += "<tr id= 'TSucursal_" + ArraySucursales[itemArray].Index + "'><td>" + ArraySucursales[itemArray].Nit_ID + "</td><td>" + ArraySucursales[itemArray].Sucursal_ID + "</td><td>" + ArraySucursales[itemArray].Descripcion + "</td><td style='white-space: nowrap;'> " + ArraySucursales[itemArray].UsuarioCreacion + " </td><td  style='white-space: nowrap;'> " + ArraySucursales[itemArray].FechaCreacion + " </td><td style='white-space: nowrap;'> " + ArraySucursales[itemArray].UsuarioActualizacion + " </td><td  style='white-space: nowrap;'> " + ArraySucursales[itemArray].FechaActualizacion + " </td></tr>";
    }
    html_TSucursal += "</tbody></table>";
    $("#container_TSucursal").html("");
    $("#container_TSucursal").html(html_TSucursal);

    $("#TSucursal").dataTable({
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
    $("#Select_EmpresaNit").prop('disabled', false); //No se agrega el trigger porque se hace al seleccionar el val
    $("#Select_EmpresaNit").val("-1").trigger("chosen:updated");
    $("#Txt_ID").val("");
    $("#TxtDescription").val("");
    $("#TxtSigla").val("");
    $("#TxtRead").val("");
    $("#DDLColumns").val("-1");
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                     PROCESOS DE CHANGES EN CONTSucursalES                                                                                                                                        ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

function Change_Select_Nit() {
    $("#Select_EmpresaNit").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_EmpresaNit").val() == "-1") {
            $("#ImgNIT").css("display", "inline-table");
        } else {
            $("#ImgNIT").css("display", "none");
        }
    });
}
