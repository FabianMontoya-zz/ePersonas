/*--------------- region de variables globales --------------------*/
var Matrix_PAcceso = [];
var Matrix_Area = [];

var ArrayR_PuertaAcc_Area = [];
var ArrayCombo = [];
var ArrayR_PuertaAcc_AreaDep = [];
var ArraySeguridad = [];

var estado;
var editNit_ID;
var index_ID;
var editID;
var editDocID;
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {

    /*Llamado de metodos para ocultar elementos al inicio de la operación de la pantalla*/
    Ventanas_Emergentes(); //Ventanas_Emergentes Va primero pues es la que llama al load de espera al inicio de los AJAX
    Ocultar_Errores();
    Ocultar_Tablas();

    transaccionAjax_MPAcceso('MATRIX_PACCESO');
    transaccionAjax_MArea('MATRIX_AREA');
    Change_Select_Nit();
    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
    transacionAjax_EmpresaNit('Cliente');
});

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                 REGION INICIO DE COMPONENTES                                                                                                    ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
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

    $("#TablaConsulta").css("display", "none");

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
        transacionAjax_R_PuertaAcc_Area("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_R_PuertaAcc_Area("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_R_PuertaAcc_Area_create("crear");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    transacionAjax_R_PuertaAcc_Area_delete("elimina");
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

    var Campo_1 = $("#Select_EmpresaNit").val();
    var Campo_2 = $("#Select_PAcceso").val();
    var Campo_3 = $("#Select_Area").val();

    var validar = 0;

    if (Campo_3 == "-1" || Campo_2 == "-1" || Campo_1 == "-1") {
        validar = 1;

        if (Campo_1 == "-1") {
            $("#Img1").css("display", "inline-table");
        }
        else {
            $("#Img1").css("display", "none");
        }

        if (Campo_2 == "-1") {
            $("#Img2").css("display", "inline-table");
        }
        else {
            $("#Img2").css("display", "none");
        }
        if (Campo_3 == "-1") {
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
/*----                                                                                                      PROCESOS DE VALIDACION Y GRID RELACION PUERTA-PERSONA                                                                                                              ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
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

        case "eliminar":
            $(".Dialog_Datos").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $(".container_TGrid").html("");
            estado = opcion;
            Clear();
            break;

    }
}

//carga el combo de Area dependiente
function Change_Select_Nit() {
    $("#Select_EmpresaNit").change(function () {
        var index_ID = $(this).val();

        TransaccionesSegunNIT(index_ID);
    });
}

function TransaccionesSegunNIT(index_ID) {
    if (index_ID != "-1") {
        Charge_Combos_Depend_Nit(Matrix_PAcceso, "Select_PAcceso", index_ID, "");
        Charge_Combos_Depend_Nit(Matrix_Area, "Select_Area", index_ID, "");
    }
}

// crea la tabla en el cliente
function Table_R_PuertaAcc_Area() {

    var html_R_PuertaAcc_Area;
    var Index_Pos = 0;
    switch (estado) {

        case "buscar":
            html_R_PuertaAcc_Area = "<table id='TR_PuertaAcc_Area' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Empresa</th><th>Puerta de Acceso</th><th>Área</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayR_PuertaAcc_Area) {
                if (ArrayR_PuertaAcc_Area[itemArray].R_PuertaAcc_Area_ID != 0) {
                    html_R_PuertaAcc_Area += "<tr id= 'TR_PuertaAcc_Area_" + ArrayR_PuertaAcc_Area[itemArray].PuertaAcceso_ID + "'><td>" + ArrayR_PuertaAcc_Area[itemArray].Nit_ID + " - " + ArrayR_PuertaAcc_Area[itemArray].DescripEmpresa + "</td><td>" + ArrayR_PuertaAcc_Area[itemArray].PuertaAcceso_ID + " - " + ArrayR_PuertaAcc_Area[itemArray].DescripPAcceso + "</td><td>" + +ArrayR_PuertaAcc_Area[itemArray].Area_ID + " - " + ArrayR_PuertaAcc_Area[itemArray].DescripArea + "</td><td>" + ArrayR_PuertaAcc_Area[itemArray].UsuarioCreacion + "</td><td>" + ArrayR_PuertaAcc_Area[itemArray].FechaCreacion + "</td><td>" + ArrayR_PuertaAcc_Area[itemArray].UsuarioActualizacion + "</td><td>" + ArrayR_PuertaAcc_Area[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "eliminar":
            html_R_PuertaAcc_Area = "<table id='TR_PuertaAcc_Area' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Empresa</th><th>Puerta de Acceso</th><th>Área</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayR_PuertaAcc_Area) {
                if (ArrayR_PuertaAcc_Area[itemArray].R_PuertaAcc_Area_ID != 0) {
                    Index_Pos = parseInt(ArrayR_PuertaAcc_Area[itemArray].Index) - 1;
                    html_R_PuertaAcc_Area += "<tr id= 'TR_PuertaAcc_Area_" + ArrayR_PuertaAcc_Area[itemArray].PuertaAcceso_ID + "'><td><span class='cssToolTip_ver'><img  src='../../images/Delete.png' width='23px' height='23px' class= 'Eliminar' name='eliminar' onmouseover=\"this.src='../../images/DeleteOver.png';\" onmouseout=\"this.src='../../images/Delete.png';\" onclick=\"Eliminar('" + Index_Pos + "')\"></img><span>Eliminar Puerta Acceso</span></span></td><td>" + ArrayR_PuertaAcc_Area[itemArray].Nit_ID + " - " + ArrayR_PuertaAcc_Area[itemArray].DescripEmpresa + "</td><td>" + ArrayR_PuertaAcc_Area[itemArray].PuertaAcceso_ID + " - " + ArrayR_PuertaAcc_Area[itemArray].DescripPAcceso + "</td><td>" + +ArrayR_PuertaAcc_Area[itemArray].Area_ID + " - " + ArrayR_PuertaAcc_Area[itemArray].DescripArea + "</td><td>" + ArrayR_PuertaAcc_Area[itemArray].UsuarioCreacion + "</td><td>" + ArrayR_PuertaAcc_Area[itemArray].FechaCreacion + "</td><td>" + ArrayR_PuertaAcc_Area[itemArray].UsuarioActualizacion + "</td><td>" + ArrayR_PuertaAcc_Area[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;
    }

    html_R_PuertaAcc_Area += "</tbody></table>";
    $(".container_TGrid").html("");
    $(".container_TGrid").html(html_R_PuertaAcc_Area);

    $(".Eliminar").click(function () {
    });

    $(".Editar").click(function () {
    });

    $("#TR_PuertaAcc_Area").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Eliminar(Index_GrpDocumento) {

    editNit_ID = ArrayR_PuertaAcc_Area[Index_GrpDocumento].Nit_ID;
    editID = ArrayR_PuertaAcc_Area[Index_GrpDocumento].PuertaAcceso_ID;
    editDocID = ArrayR_PuertaAcc_Area[Index_GrpDocumento].Area_ID;

    $("#dialog_eliminar").dialog("option", "title", "Eliminar?");
    $("#dialog_eliminar").dialog("open");

}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                              MENSAJES, VISUALIZACION Y LIMPIEZA                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//limpiar campos
function Clear() {
    $("#Select_EmpresaNit").val("-1");
    $("#Select_PAcceso").val("-1");
    $("#Select_Area").val("-1");

    $("#TxtRead").val("");
    $("#DDLColumns").val("-1").trigger("chosen:updated");

    $('.C_Chosen').trigger('chosen:updated');

    var OnlyEmpresa = VerificarNIT("Select_EmpresaNit");

    if (OnlyEmpresa == true) {
        TransaccionesSegunNIT($("#Select_EmpresaNit").val());
    }

}