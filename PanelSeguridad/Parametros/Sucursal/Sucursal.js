/*--------------- region de variables globales --------------------*/
var Matrix_Direcciones = [];
var ArraySucursales = [];
var ArrayEmpresaNit = [];
var ArrayCombo = [];
var estado;
var editID;
var editNIT;
var Nit_ID_proccess;

/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {

    $("#Marco_trabajo_Form").css("height", "490px");
 
    /*Llamado de metodos para ocultar elementos al inicio de la operación de la pantalla*/
    Ventanas_Emergentes(); //Ventanas_Emergentes Va primero pues es la que llama al load de espera al inicio de los AJAX
    Ocultar_Errores();
    Ocultar_Tablas();
    /*==================FIN LLAMADO INICIAL DE METODOS DE INICIALIZACIÓN==============*/

    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
    transacionAjax_EmpresaNit('Cliente');
    transacionAjax_Calendario('MatrixCalendarios');
    transaccionAjax_MDirecciones("Matrix_Direcciones");

    Change_Select_Nit();

});

//Función que oculta todas las IMG de los errores en pantalla
function Ocultar_Errores() {
    ResetError();
    $("#ESelect").css("display", "none");
    $("#DE").css("display", "none");
    $("#DS").css("display", "none");
    $("#Img16").css("display", "none");
    $("#ImgCal").css("display", "none");
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


//habilita el panel de crear o consulta
function HabilitarPanel(opcion) {

    switch (opcion) {

        case "crear":
            $("#TablaDatos").css("display", "inline-table");
            $("#TablaConsulta").css("display", "none");
            $("#Select_EmpresaNit").removeAttr("disabled");
            $("#Txt_ID").removeAttr("disabled");
            $("#Btnguardar").attr("value", "Guardar");
            $("#Select_Direccion").val("-1").trigger("chosen:updated");
            $('.C_Chosen').trigger('chosen:updated');
            ResetError();
            Clear();
            estado = opcion;
            break;

            var OnlyEmpresa = VerificarNIT("Select_EmpresaNit");

            if (OnlyEmpresa == true) {
                TransaccionesSegunNIT($("#Select_EmpresaNit").val());
            }

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
    var Campo_dir = $("#Select_Direccion").val(); //Img16

    if (NIT == "-1" || NIT == null || descrip == "" || valID == "" || Campo_dir == "-1") {
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
        //--dir--
        if (Campo_dir == "-1" || Campo_dir == "" || Campo_dir == null) {
            $("#Img16").css("display", "inline-table");
        } else {
            $("#Img16").css("display", "none");
        }


    }
    else {
        ResetError();
    }
    return validar;
}

function Change_Select_Direccion() {
    $("#Select_Direccion").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_Direccion").val() == "-1") {
            $("#Img16").css("display", "inline-table");
        } else {
            $("#Img16").css("display", "none");
        }
    });
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

    var html_TSucursal;

    switch (estado) {

        case "buscar":
            html_TSucursal = "<table id='TSucursal' border='1'  cellpadding='1' cellspacing='1' style='width: 100%'><thead><tr><th>NIT Empresa</th><th>Código</th><th>Descripción</th><th>Dirección Asociada</th><th>Calendario</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Usuario Actualización</th><th>Fecha Última Actualización</th></tr></thead><tbody>";
            for (itemArray in ArraySucursales) {
                html_TSucursal += "<tr id= 'TSucursal_" + ArraySucursales[itemArray].Index + "'><td>" + ArraySucursales[itemArray].Nit_ID + "</td><td>" + ArraySucursales[itemArray].Sucursal_ID + "</td><td>" + ArraySucursales[itemArray].Descripcion + "</td><td>" + ArraySucursales[itemArray].Direcccion_ID + "</td><td>" + ArraySucursales[itemArray].Calendario_ID + "</td><td style='white-space: nowrap;'> " + ArraySucursales[itemArray].UsuarioCreacion + " </td><td  style='white-space: nowrap;'> " + ArraySucursales[itemArray].FechaCreacion + " </td><td style='white-space: nowrap;'> " + ArraySucursales[itemArray].UsuarioActualizacion + " </td><td  style='white-space: nowrap;'> " + ArraySucursales[itemArray].FechaActualizacion + " </td></tr>";
            }
            break;

        case "modificar":
            html_TSucursal = "<table id='TSucursal' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Editar</th><th>NIT Empresa</th><th>Código</th><th>Descripción</th><th>Dirección Asociada</th><th>Calendario</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Usuario Actualización</th><th>Fecha Última Actualización</th></tr></thead><tbody>";
            for (itemArray in ArraySucursales) {
                html_TSucursal += "<tr id= 'TSucursal_" + ArraySucursales[itemArray].Index + "'><td><span class='cssToolTip_ver'><img  src='../../images/Editar1.png' width='23px' height='23px' class= 'Editar' name='editar' onmouseover=\"this.src='../../images/EditarOver.png';\" onmouseout=\"this.src='../../images/Editar1.png';\" onclick=\"Editar('" + ArraySucursales[itemArray].Index + "')\"></img><span>Editar Sucursal</span></span></td><td>" + ArraySucursales[itemArray].Nit_ID + "</td><td>" + ArraySucursales[itemArray].Sucursal_ID + "</td><td style='white-space: nowrap;'>" + ArraySucursales[itemArray].Descripcion + "</td><td>" + ArraySucursales[itemArray].Direcccion_ID + "</td><td>" + ArraySucursales[itemArray].Calendario_ID + "</td><td style='white-space: nowrap;'> " + ArraySucursales[itemArray].UsuarioCreacion + " </td><td  style='white-space: nowrap;'> " + ArraySucursales[itemArray].FechaCreacion + " </td><td style='white-space: nowrap;'> " + ArraySucursales[itemArray].UsuarioActualizacion + " </td><td  style='white-space: nowrap;'> " + ArraySucursales[itemArray].FechaActualizacion + " </td></tr>";
            }
            break;

        case "eliminar":
            html_TSucursal = "<table id='TSucursal' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>NIT Empresa</th><th>Código</th><th>Descripción</th><th>Dirección Asociada</th><th>Calendario</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Usuario Actualización</th><th>Fecha Última Actualización</th></tr></thead><tbody>";
            for (itemArray in ArraySucursales) {
                if (ArraySucursales[itemArray].Estado != 2) {
                    html_TSucursal += "<tr id= 'TSucursal_" + ArraySucursales[itemArray].Index + "'><td><span class='cssToolTip_ver'><img  src='../../images/Delete.png' width='23px' height='23px' class= 'Eliminar' name='eliminar' onmouseover=\"this.src='../../images/DeleteOver.png';\" onmouseout=\"this.src='../../images/Delete.png';\" onclick=\"Eliminar('" + ArraySucursales[itemArray].Index + "')\"></img><span>Eliminar Sucursal</span></span></td><td>" + ArraySucursales[itemArray].Nit_ID + "</td><td>" + ArraySucursales[itemArray].Sucursal_ID + "</td><td style='white-space: nowrap;'>" + ArraySucursales[itemArray].Descripcion + "</td><td>" + ArraySucursales[itemArray].Direcccion_ID + "</td><td>" + ArraySucursales[itemArray].Calendario_ID + "</td><td style='white-space: nowrap;'> " + ArraySucursales[itemArray].UsuarioCreacion + " </td><td  style='white-space: nowrap;'> " + ArraySucursales[itemArray].FechaCreacion + " </td><td style='white-space: nowrap;'> " + ArraySucursales[itemArray].UsuarioActualizacion + " </td><td  style='white-space: nowrap;'> " + ArraySucursales[itemArray].FechaActualizacion + " </td></tr>";
                }
            }
            break;
    }
    html_TSucursal += "</tbody></table>";
    $(".container_TGrid").html("");
    $(".container_TGrid").html(html_TSucursal);

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

// muestra el registro a editar
function Editar(index_Sucursal) {

    $("#TablaDatos").css("display", "inline-table");
    $("#TablaConsulta").css("display", "none");

    for (itemArray in ArraySucursales) {
        if (index_Sucursal == ArraySucursales[itemArray].Index) {
            $("#Select_EmpresaNit").val(ArraySucursales[itemArray].Nit_ID).trigger("chosen:updated");
            editNIT = ArraySucursales[itemArray].Nit_ID;
            TransaccionesSegunNIT(editNIT);
            $("#Select_EmpresaNit").prop('disabled', true).trigger("chosen:updated");

            $("#Txt_ID").val(ArraySucursales[itemArray].Sucursal_ID);
            $("#Txt_ID").attr("disabled", "disabled");
            editID = ArraySucursales[itemArray].Sucursal_ID;

            $("#TxtDescription").val(ArraySucursales[itemArray].Descripcion);
            $("#Select_Calendario").val(ArraySucursales[itemArray].Calendario_ID).trigger("chosen:updated");

             setTimeout("$('#Select_Direccion').val('" + ArraySucursales[itemArray].Direcccion_ID + "').trigger('chosen:updated');", 300);

            $("#TxtSigla").val(ArraySucursales[itemArray].Sigla);
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
    Ocultar_Errores();
    $("#Select_EmpresaNit").prop('disabled', false); //No se agrega el trigger porque se hace al seleccionar el val
    $("#Select_EmpresaNit").val("-1").trigger("chosen:updated");
    $("#Txt_ID").val("");
    $("#TxtDescription").val("");
    $("#TxtSigla").val("");
    $("#TxtRead").val("");
    $("#DDLColumns").val("-1").trigger("chosen:updated");
    VerificarNIT("Select_EmpresaNit");
    $("#Select_Direccion").val("-1").trigger("chosen:updated");
    $("#Select_Calendario").val("-1").trigger("chosen:updated");
    
    var OnlyEmpresa = VerificarNIT("Select_EmpresaNit");

    if (OnlyEmpresa == true) {
        TransaccionesSegunNIT($("#Select_EmpresaNit").val());
    }

}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                     PROCESOS DE CHANGES EN CONTSucursalES                                                                                                                                        ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

function Change_Select_Nit() {
    $("#Select_EmpresaNit").change(function () {
        Nit_ID_proccess = $(this).val();
        TransaccionesSegunNIT(Nit_ID_proccess);
    });
}

function TransaccionesSegunNIT(vp_index_ID) {
    if (vp_index_ID != "-1") {
        transaccionAjax_MDirecciones("Matrix_Direcciones", vp_index_ID);
      
    }
}

