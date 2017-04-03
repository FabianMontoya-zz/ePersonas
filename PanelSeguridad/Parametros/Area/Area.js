/*--------------- region de variables globales --------------------*/
var ArrayArea = [];
var ArrayCombo = [];
var ArrayAreaDep = [];
var ArraySeguridad = [];

var estado;
var editNit_ID;
var index_ID;
var editID;
var Nit_ID_proccess;
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {

    /*Llamado de metodos para ocultar elementos al inicio de la operación de la pantalla*/
    Ventanas_Emergentes(); //Ventanas_Emergentes Va primero pues es la que llama al load de espera al inicio de los AJAX
    Ocultar_Errores();
    Ocultar_Tablas();
    /*================== FIN LLAMADO INICIAL DE METODOS DE INICIALIZACIÓN ==============*/

    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
    transacionAjax_EmpresaNit('Cliente');

    Change_Select_Nit();
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

    OpenControl(); //Abrimos el load de espera con el logo

    if (ValidateSelect == 1) {
        filtro = "N";
        opcion = "ALL";
        transacionAjax_Area("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_Area("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_Area_create("crear");
        }
        else {
            transacionAjax_Area_create("modificar");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    OpenControl(); //Abrimos el load de espera con el logo
    transacionAjax_Area_delete("elimina");
    filtro = "N";
    opcion = "ALL";
    transacionAjax_Area("consulta", filtro, opcion);
}

//evento del boton salir
function x() {
    $("#dialog").dialog("close");
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                 PROCESOS GENERALES DE LA PAGINA                                                                                  ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//carga el combo de Area dependiente
function Change_Select_Nit() {
    $("#Select_EmpresaNit").change(function () {
        index_ID = $(this).val();
        Nit_ID_proccess = $(this).val();
        TransaccionesSegunNIT(Nit_ID_proccess);
    });
}

//Carga los combos de los registros relacionados con Select_Nit
function TransaccionesSegunNIT(index_ID) {
    if (index_ID != "-1") {
        transacionAjax_AreaDepend('Area_Dep', index_ID);
        transacionAjax_Seguridad('Seguridad', index_ID);
    }
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

            var OnlyEmpresa = VerificarNIT("Select_EmpresaNit");

            if (OnlyEmpresa == true) {
                TransaccionesSegunNIT($("#Select_EmpresaNit").val());
            }

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

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                      REGION VALIDACIONES DEL PROCESO                                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//validamos campos para la creacion del link
function validarCamposCrear() {

    var Campo_1 = $("#Select_EmpresaNit").val();
    var Campo_2 = $("#Txt_ID").val();
    var Campo_3 = $("#TxtDescription").val();

    var validar = 0;

    if (Campo_3 == "" || Campo_2 == "" || Campo_1 == "-1") {
        validar = 1;

        if (Campo_1 == "-1") {
            $("#Img1").css("display", "inline-table");
        }
        else {
            $("#Img1").css("display", "none");
        }

        if (Campo_2 == "") {
            $("#Img2").css("display", "inline-table");
        }
        else {
            $("#Img2").css("display", "none");
        }
        if (Campo_3 == "") {
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
/*----                                                                                                  TABLA DE AREA                                                                                  ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
// crea la tabla en el cliente
function Table_Area() {

    var vl_Index_Area;
    var vl_dependencia;
    var html_Area;

    switch (estado) {

        case "buscar":
            html_Area = "<table id='TArea' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Empresa</th><th>Codigo</th><th>Descripción</th><th>Area Que Depende</th><th>Politica de Seguridad</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayArea) {

                if (ArrayArea[itemArray].Area_ID != 0) {

                    if (ArrayArea[itemArray].AreaDependencia == 0)
                        vl_dependencia = "";
                    else
                        vl_dependencia = ArrayArea[itemArray].DescripAreaDepen;

                    html_Area += "<tr id= 'TArea_" + ArrayArea[itemArray].Area_ID + "'><td>" + ArrayArea[itemArray].Nit_ID + " - " + ArrayArea[itemArray].DescripEmpresa + "</td><td>" + ArrayArea[itemArray].Area_ID + "</td><td>" + ArrayArea[itemArray].Descripcion + "</td><td>" + vl_dependencia + "</td><td>" + ArrayArea[itemArray].DescripPolitica + "</td><td>" + ArrayArea[itemArray].UsuarioCreacion + "</td><td>" + ArrayArea[itemArray].FechaCreacion + "</td><td>" + ArrayArea[itemArray].UsuarioActualizacion + "</td><td>" + ArrayArea[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "modificar":
            html_Area = "<table id='TArea' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Editar</th><th>Empresa</th><th>Codigo</th><th>Descripción</th><th>Area Que Depende</th><th>Politica de Seguridad</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayArea) {
                if (ArrayArea[itemArray].Area_ID != 0) {

                    vl_Index_Area = parseInt(ArrayArea[itemArray].Index) - 1;
                    if (ArrayArea[itemArray].AreaDependencia == 0)
                        vl_dependencia = "";
                    else
                        vl_dependencia = ArrayArea[itemArray].DescripAreaDepen;

                    html_Area += "<tr id= 'TArea_" + ArrayArea[itemArray].Area_ID + "'><td><span class='cssToolTip_ver'><img  src='../../images/Editar1.png' width='23px' height='23px' class= 'Editar' name='editar' onmouseover=\"this.src='../../images/EditarOver.png';\" onmouseout=\"this.src='../../images/Editar1.png';\" onclick=\"Editar('" + vl_Index_Area + "')\"></img><span>Editar Area</span></span></td><td>" + ArrayArea[itemArray].Nit_ID + " - " + ArrayArea[itemArray].DescripEmpresa + "</td><td>" + ArrayArea[itemArray].Area_ID + "</td><td>" + ArrayArea[itemArray].Descripcion + "</td><td>" + vl_dependencia + "</td><td>" + ArrayArea[itemArray].DescripPolitica + "</td><td>" + ArrayArea[itemArray].UsuarioCreacion + "</td><td>" + ArrayArea[itemArray].FechaCreacion + "</td><td>" + ArrayArea[itemArray].UsuarioActualizacion + "</td><td>" + ArrayArea[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "eliminar":
            html_Area = "<table id='TArea' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Empresa</th><th>Codigo</th><th>Descripción</th><th>Area Que Depende</th><th>Politica de Seguridad</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayArea) {
                if (ArrayArea[itemArray].Area_ID != 0) {

                    vl_Index_Area = parseInt(ArrayArea[itemArray].Index) - 1;

                    if (ArrayArea[itemArray].AreaDependencia == 0)
                        vl_dependencia = "";
                    else
                        vl_dependencia = ArrayArea[itemArray].DescripAreaDepen;

                    html_Area += "<tr id= 'TArea_" + ArrayArea[itemArray].Area_ID + "'><td><span class='cssToolTip_ver'><img  src='../../images/Delete.png' width='23px' height='23px' class= 'Eliminar' name='eliminar' onmouseover=\"this.src='../../images/DeleteOver.png';\" onmouseout=\"this.src='../../images/Delete.png';\" onclick=\"Eliminar('" + vl_Index_Area + "')\"></img><span>Eliminar Area</span></td><td>" + ArrayArea[itemArray].Nit_ID + " - " + ArrayArea[itemArray].DescripEmpresa + "</td><td>" + ArrayArea[itemArray].Area_ID + "</td><td>" + ArrayArea[itemArray].Descripcion + "</td><td>" + vl_dependencia + "</td><td>" + ArrayArea[itemArray].DescripPolitica + "</td><td>" + ArrayArea[itemArray].UsuarioCreacion + "</td><td>" + ArrayArea[itemArray].FechaCreacion + "</td><td>" + ArrayArea[itemArray].UsuarioActualizacion + "</td><td>" + ArrayArea[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;
    }

    html_Area += "</tbody></table>";
    $(".container_TGrid").html("");
    $(".container_TGrid").html(html_Area);

    $("#TArea").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Eliminar(vp_index) {

    editID = ArrayArea[vp_index].Area_ID;
    editNit_ID = ArrayArea[vp_index].Nit_ID;
    $("#dialog_eliminar").dialog("option", "title", "Eliminar?");
    $("#dialog_eliminar").dialog("open");

}

// muestra el registro a editar
function Editar(vp_index) {

    $(".Dialog_Datos").css("display", "inline-table");
    $("#TablaConsulta").css("display", "none");

    editNit_ID = ArrayArea[vp_index].Nit_ID;
    TransaccionesSegunNIT(editNit_ID);
    editID = ArrayArea[vp_index].Area_ID;

    $("#Select_EmpresaNit").val(ArrayArea[vp_index].Nit_ID).trigger('chosen:updated');
    $("#Txt_ID").val(ArrayArea[vp_index].Area_ID);
    $("#TxtDescription").val(ArrayArea[vp_index].Descripcion);

    $("#Select_EmpresaNit").attr("disabled", "disabled");
    $("#Txt_ID").attr("disabled", "disabled");

    setTimeout("CargaCombos('" + ArrayArea[vp_index].AreaDependencia + "', '" + ArrayArea[vp_index].Politica_ID + "')", 400);
    $("#Btnguardar").attr("value", "Actualizar");

}

//carga combos que dependen de una transaccion
function CargaCombos(vp_AreaDepen, vp_Politica) {

    if (vp_AreaDepen == 0) {
        $('#Select_AreaDepent').val('-1').trigger('chosen:updated');
    }
    else {
        $('#Select_AreaDepent').val(vp_AreaDepen).trigger('chosen:updated');
    }

    if (vp_Politica == 0) {
        $('#Select_Politica').val('-1').trigger('chosen:updated');
    }
    else {
        $('#Select_Politica').val(vp_Politica).trigger('chosen:updated');
    }
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                              MENSAJES, VISUALIZACION Y LIMPIEZA                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//limpiar campos
function Clear() {

    var vl_Estado = $('#Select_EmpresaNit').is(':disabled');

    if (vl_Estado == true) {
        $("#Select_EmpresaNit").val(Nit_ID_proccess).trigger('chosen:updated');
    }
    else {
        $("#Select_EmpresaNit").val("-1").trigger('chosen:updated');
    }

    $("#Select_AreaDepent").empty().trigger('chosen:updated');
    $("#Select_Politica").empty().trigger('chosen:updated');

    $("#Txt_ID").val("");
    $("#TxtDescription").val("");

    $("#TxtRead").val("");
    $("#DDLColumns").val("-1").trigger('chosen:updated');

    var OnlyEmpresa = VerificarNIT("Select_EmpresaNit");

    if (OnlyEmpresa == true) {
        TransaccionesSegunNIT($("#Select_EmpresaNit").val());
    }

}