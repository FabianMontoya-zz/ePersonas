/*--------------- region de variables globales --------------------*/
var Matrix_GrpDoc = [];
var Matrix_Doc = [];

var ArrayRDoc_Verificacion = [];
var ArrayCombo = [];
var ArrayRDoc_VerificacionDep = [];
var ArraySeguridad = [];

var estado;
var editNit_ID;
var index_ID;
var editID;
var editDocID;
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {

    $("#Marco_trabajo_Form").css("height", "490px");
  
    /*Llamado de metodos para ocultar elementos al inicio de la operación de la pantalla*/
    Ventanas_Emergentes(); //Ventanas_Emergentes Va primero pues es la que llama al load de espera al inicio de los AJAX
    Ocultar_Errores();
    Ocultar_Tablas();
    /*==================FIN LLAMADO INICIAL DE METODOS DE INICIALIZACIÓN==============*/

    transaccionAjax_MGrpDoc('MATRIX_GRPDOC');
    transaccionAjax_MDoc('MATRIX_DOC');
    Change_Select_Nit();
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

//carga el combo de Area dependiente
function Change_Select_Nit() {
    $("#Select_EmpresaNit").change(function () {
        var index_ID = $(this).val();
        TransaccionesSegunNIT(index_ID);
    });
}

function TransaccionesSegunNIT(index_ID) {
    if (index_ID != "-1") {
        Charge_Combos_Depend_Nit(Matrix_Doc, "Select_Documento_1", index_ID, "");
        Charge_Combos_Depend_Nit(Matrix_Doc, "Select_Documento_2", index_ID, "");
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

    //OpenControl(); //Abrimos el load de espera con el logo

    if (ValidateSelect == 1) {
        filtro = "N";
        opcion = "ALL";
        transacionAjax_RDoc_Verificacion("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_RDoc_Verificacion("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_RDoc_Verificacion_create("crear");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    OpenControl(); //Abrimos el load de espera con el logo
    transacionAjax_RDoc_Verificacion_delete("elimina");
}


//validamos campos para la creacion del link
function validarCamposCrear() {

    var Campo_1 = $("#Select_EmpresaNit").val();
    var Campo_2 = $("#Select_Documento_1").val();
    var Campo_3 = $("#Select_Documento_2").val();

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

// crea la tabla en el cliente
function Table_RDoc_Verificacion() {

    var html_RDoc_Verificacion;
    var Index_Pos = 0;
    switch (estado) {

        case "buscar":
            html_RDoc_Verificacion = "<table id='TRDoc_Verificacion' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Empresa</th><th>Documento</th><th>Documento Verificación</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayRDoc_Verificacion) {
                if (ArrayRDoc_Verificacion[itemArray].RDoc_Verificacion_ID != 0) {
                    html_RDoc_Verificacion += "<tr id= 'TRDoc_Verificacion_" + ArrayRDoc_Verificacion[itemArray].GrpDoc_ID + "'><td>" + ArrayRDoc_Verificacion[itemArray].Nit_ID + " - " + ArrayRDoc_Verificacion[itemArray].DescripEmpresa + "</td><td>" + ArrayRDoc_Verificacion[itemArray].Doc_ID + " - " + ArrayRDoc_Verificacion[itemArray].DescripDoc + "</td><td>" + ArrayRDoc_Verificacion[itemArray].Doc_ID_Verif + " - " + ArrayRDoc_Verificacion[itemArray].DescripDoc_Verif + "</td><td>" + ArrayRDoc_Verificacion[itemArray].UsuarioCreacion + "</td><td>" + ArrayRDoc_Verificacion[itemArray].FechaCreacion + "</td><td>" + ArrayRDoc_Verificacion[itemArray].UsuarioActualizacion + "</td><td>" + ArrayRDoc_Verificacion[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "eliminar":
            html_RDoc_Verificacion = "<table id='TRDoc_Verificacion' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Empresa</th><th>Documento</th><th>Documento Verificación</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayRDoc_Verificacion) {
                if (ArrayRDoc_Verificacion[itemArray].RDoc_Verificacion_ID != 0) {
                    Index_Pos = parseInt(ArrayRDoc_Verificacion[itemArray].Index) - 1;
                    html_RDoc_Verificacion += "<tr id= 'TRDoc_Verificacion_" + ArrayRDoc_Verificacion[itemArray].GrpDoc_ID + "'><td><span class='cssToolTip_ver'><img  src='../../images/Delete.png' width='23px' height='23px' class= 'Eliminar' name='eliminar' onmouseover=\"this.src='../../images/DeleteOver.png';\" onmouseout=\"this.src='../../images/Delete.png';\" onclick=\"Eliminar('" + Index_Pos + "')\"></img><span>Eliminar Relación Documento / Verificación</span></span></td><td>" + ArrayRDoc_Verificacion[itemArray].Nit_ID + " - " + ArrayRDoc_Verificacion[itemArray].DescripEmpresa + "</td><td>" + ArrayRDoc_Verificacion[itemArray].Doc_ID + " - " + ArrayRDoc_Verificacion[itemArray].DescripDoc + "</td><td>" + ArrayRDoc_Verificacion[itemArray].Doc_ID_Verif + " - " + ArrayRDoc_Verificacion[itemArray].DescripDoc_Verif + "</td><td>" + ArrayRDoc_Verificacion[itemArray].UsuarioCreacion + "</td><td>" + ArrayRDoc_Verificacion[itemArray].FechaCreacion + "</td><td>" + ArrayRDoc_Verificacion[itemArray].UsuarioActualizacion + "</td><td>" + ArrayRDoc_Verificacion[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;
    }

    html_RDoc_Verificacion += "</tbody></table>";
    $(".container_TGrid").html("");
    $(".container_TGrid").html(html_RDoc_Verificacion);

    $(".Eliminar").click(function () {
    });

    $(".Editar").click(function () {
    });

    $("#TRDoc_Verificacion").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Eliminar(Index_GrpDocumento) {
    editNit_ID = ArrayRDoc_Verificacion[Index_GrpDocumento].Nit_ID;
    editID = ArrayRDoc_Verificacion[Index_GrpDocumento].Doc_ID;
    editDocID = ArrayRDoc_Verificacion[Index_GrpDocumento].Doc_ID_Verif;

    $("#dialog_eliminar").dialog("option", "title", "Eliminar?");
    $("#dialog_eliminar").dialog("open");
}

//evento del boton salir
function x() {
    $("#dialog").dialog("close");
}

//limpiar campos
function Clear() {
    $("#Select_EmpresaNit").val("-1");
    $("#Select_Documento_1").val("-1");
    $("#Select_Documento_2").val("-1");

    $("#TxtRead").val("");
    $("#DDLColumns").val("-1");

    $('.C_Chosen').trigger('chosen:updated');

    var OnlyEmpresa = VerificarNIT("Select_EmpresaNit");

    if (OnlyEmpresa == true) {
        TransaccionesSegunNIT($("#Select_EmpresaNit").val());
    }

}