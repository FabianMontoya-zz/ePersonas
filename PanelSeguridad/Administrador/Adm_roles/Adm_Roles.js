/*--------------- region de variables globales --------------------*/
var ArrayRoles = [];
var ArrayEmpresaNit = [];
var ArrayCombo = [];
var estado;
var editID;
var editNIT;
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {

    /*Llamado de metodos para ocultar elementos al inicio de la operación de la pantalla*/
    Ventanas_Emergentes(); //Ventanas_Emergentes Va primero pues es la que llama al load de espera al inicio de los AJAX
    Ocultar_Errores();
    Ocultar_Tablas();
    /*==================FIN LLAMADO INICIAL DE METODOS DE INICIALIZACIÓN==============*/

    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
    transacionAjax_EmpresaNit('Cliente'); //Carga Droplist de Empresa NIT

    Change_Select_Nit();

});

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                 REGION INICIO DE COMPONENTES                                                                                                    ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
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
        transacionAjax_Rol("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_Rol("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_Rol_create("crear");
        }
        else {
            transacionAjax_Rol_create("modificar");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    $("#dialog_eliminar").dialog("close");
    transacionAjax_Rol_delete("elimina");
}

//evento del boton salir
function x() {
    $("#dialog").dialog("close");
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                      REGION VALIDACIONES DEL PROCESO                                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//validamos campos para la creacion del rol
function validarCamposCrear() {

    var NIT = $("#Select_EmpresaNit").val(); //ImgNIT
    var valID = $("#Txt_ID").val();
    var sigla = $("#TxtSigla").val();
    var descrip = $("#TxtDescription").val();
    var validar = 0;

    if (NIT == "-1" || NIT == null || sigla == "" || descrip == "" || valID == "") {
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
        if (sigla == "") {
            $("#Img2").css("display", "inline-table");
        }
        else {
            $("#Img2").css("display", "none");
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

//carga el combo de nit  dependiente
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

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                      PROCESOS DE VALIDACION PAGINAS                                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//habilita el panel de crear o consulta
function HabilitarPanel(opcion) {

    switch (opcion) {

        case "crear":
            $("#TablaDatos").css("display", "inline-table");
            $("#TablaConsulta").css("display", "none");
            $("#Txt_ID").removeAttr("disabled");
            $("#Btnguardar").attr("value", "Guardar");
            estado = opcion;
            ResetError();
            Clear();
            VerificarNIT("Select_EmpresaNit");
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

// crea la tabla en el cliente
function Table_rol() {

    var html_TRol;
    var Index_Rol;

    switch (estado) {

        case "buscar":
            html_TRol = "<table id='TRol' border='1'  cellpadding='1' cellspacing='1' style='width: 100%'><thead><tr><th>NIT Empresa</th><th>Código</th><th>Descripción</th><th>Sigla</th><th>Estado</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Usuario Actualización</th><th>Fecha Última Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayRoles) {
                Index_Rol = parseInt(ArrayRoles[itemArray].Index) - 1;
                html_TRol += "<tr id= 'TRol_" + ArrayRoles[itemArray].Index + "'><td>" + ArrayRoles[itemArray].Nit_ID + "</td><td>" + ArrayRoles[itemArray].Rol_ID + "</td><td>" + ArrayRoles[itemArray].Descripcion + "</td><td>" + ArrayRoles[itemArray].Sigla + "</td><td> " + ArrayRoles[itemArray].Estado + " - " + ArrayRoles[itemArray].DescripEstado + " </td><td style='white-space: nowrap;'> " + ArrayRoles[itemArray].UsuarioCreacion + " </td><td  style='white-space: nowrap;'> " + ArrayRoles[itemArray].FechaCreacion + " </td><td style='white-space: nowrap;'> " + ArrayRoles[itemArray].UsuarioActualizacion + " </td><td  style='white-space: nowrap;'> " + ArrayRoles[itemArray].FechaActualizacion + " </td></tr>";
            }
            break;

        case "modificar":
            html_TRol = "<table id='TRol' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Editar</th><th>NIT Empresa</th><th>Código</th><th>Descripción</th><th>Sigla</th><th>Estado</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Usuario Actualización</th><th>Fecha Última Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayRoles) {
                Index_Rol = parseInt(ArrayRoles[itemArray].Index) - 1;
                html_TRol += "<tr id= 'TRol_" + ArrayRoles[itemArray].Index + "'><td><span class='cssToolTip_ver'><img  src='../../images/Editar1.png' width='23px' height='23px' class= 'Editar' name='editar' onmouseover=\"this.src='../../images/EditarOver.png';\" onmouseout=\"this.src='../../images/Editar1.png';\" onclick=\"Editar('" + Index_Rol + "')\"></img><span>Editar Perfil</span></span></td><td>" + ArrayRoles[itemArray].Nit_ID + "</td><td>" + ArrayRoles[itemArray].Rol_ID + "</td><td style='white-space: nowrap;'>" + ArrayRoles[itemArray].Descripcion + "</td><td>" + ArrayRoles[itemArray].Sigla + "</td><td> " + ArrayRoles[itemArray].Estado + " - " + ArrayRoles[itemArray].DescripEstado + " </td><td style='white-space: nowrap;'> " + ArrayRoles[itemArray].UsuarioCreacion + " </td><td  style='white-space: nowrap;'> " + ArrayRoles[itemArray].FechaCreacion + " </td><td style='white-space: nowrap;'> " + ArrayRoles[itemArray].UsuarioActualizacion + " </td><td  style='white-space: nowrap;'> " + ArrayRoles[itemArray].FechaActualizacion + " </td></tr>";
            }
            break;

        case "eliminar":
            html_TRol = "<table id='TRol' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>NIT Empresa</th><th>Código</th><th>Descripción</th><th>Sigla</th><th>Estado</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Usuario Actualización</th><th>Fecha Última Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayRoles) {
                if (ArrayRoles[itemArray].Estado != 2) {
                    Index_Rol = parseInt(ArrayRoles[itemArray].Index) - 1;
                    html_TRol += "<tr id= 'TRol_" + ArrayRoles[itemArray].Index + "'><td><span class='cssToolTip_ver'><img  src='../../images/Delete.png' width='23px' height='23px' class= 'Eliminar' name='eliminar' onmouseover=\"this.src='../../images/DeleteOver.png';\" onmouseout=\"this.src='../../images/Delete.png';\" onclick=\"Eliminar('" + Index_Rol + "')\"></img><span>Eliminar Perfil</span></span></td><td>" + ArrayRoles[itemArray].Nit_ID + "</td><td>" + ArrayRoles[itemArray].Rol_ID + "</td><td style='white-space: nowrap;'>" + ArrayRoles[itemArray].Descripcion + "</td><td>" + ArrayRoles[itemArray].Sigla + "</td><td> " + ArrayRoles[itemArray].Estado + " - " + ArrayRoles[itemArray].DescripEstado + " </td><td style='white-space: nowrap;'> " + ArrayRoles[itemArray].UsuarioCreacion + " </td><td  style='white-space: nowrap;'> " + ArrayRoles[itemArray].FechaCreacion + " </td><td style='white-space: nowrap;'> " + ArrayRoles[itemArray].UsuarioActualizacion + " </td><td  style='white-space: nowrap;'> " + ArrayRoles[itemArray].FechaActualizacion + " </td></tr>";
                }
            }
            break;
    }

    html_TRol += "</tbody></table>";
    $(".container_TGrid").html("");
    $(".container_TGrid").html(html_TRol);

    $("#TRol").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Eliminar(index_rol) {
    editID = ArrayRoles[index_rol].Rol_ID;
    editNIT = ArrayRoles[index_rol].Nit_ID;
    $("#dialog_eliminar").dialog("option", "title", "¿Cambiar Estado a Perfil?");
    $("#dialog_eliminar").dialog("open");
}

// muestra el registro a editar
function Editar(index_rol) {

    $("#TablaDatos").css("display", "inline-table");
    $("#TablaConsulta").css("display", "none");

    $("#Select_EmpresaNit").val(ArrayRoles[index_rol].Nit_ID).trigger("chosen:updated");
    editNIT = ArrayRoles[index_rol].Nit_ID;
    $("#Select_EmpresaNit").prop('disabled', true).trigger("chosen:updated");
    $("#Txt_ID").val(ArrayRoles[index_rol].Rol_ID);
    $("#Txt_ID").attr("disabled", "disabled");
    editID = ArrayRoles[index_rol].Rol_ID;
    $("#TxtDescription").val(ArrayRoles[index_rol].Descripcion);
    $("#TxtSigla").val(ArrayRoles[index_rol].Sigla);
    $("#Btnguardar").attr("value", "Actualizar");
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                              MENSAJES, VISUALIZACION Y LIMPIEZA                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//limpiar campos
function Clear() {
    Ocultar_Errores();
    $("#Select_EmpresaNit").prop('disabled', false); //No se agrega el trigger porque se hace al seleccionar el val
    $("#Select_EmpresaNit").val("-1").trigger("chosen:updated");
    $("#Txt_ID").val("");
    $("#TxtDescription").val("");
    $("#TxtSigla").val("");
    $("#TxtRead").val("");
    $("#DDLColumns").val("-1").trigger("chosen:updated");
    VerificarNIT("Select_EmpresaNit");
}
