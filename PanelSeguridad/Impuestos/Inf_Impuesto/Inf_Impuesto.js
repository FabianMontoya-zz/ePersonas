/*--------------- region de variables globales --------------------*/
var ArrayInf_Impuesto = [];
var ArrayCombo = [];
var ArrayPaises = [];
var ArrayCiudades = [];
var ArrayImpuesto_Gasto = [];
var ArrayCliente = [];
var ArrayCliente_H = [];
var ArrayDocument = [];
var ArrayClienteView = [];
var ArrayDirecciones = [];

var estado;
var editCod_ID;
var editCiudad_ID;
var editInf_Impuesto_ID;
var editCliente;
var editTypeDocument;
var editDocument;

var D_Nit;
var D_TDocumento;
var D_String_TDocumento;
var D_Documento;
var D_String_Contacto;
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {

    /*Llamado de metodos para ocultar elementos al inicio de la operación de la pantalla*/
    Ventanas_Emergentes(); //Ventanas_Emergentes Va primero pues es la que llama al load de espera al inicio de los AJAX
    Ocultar_Errores();
    Ocultar_Tablas();
    DisenaObjetos();
    /*================== FIN LLAMADO INICIAL DE METODOS DE INICIALIZACIÓN ==============*/

    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
    transacionAjax_Pais('Pais');
    transacionAjax_Impuesto('Impuesto');
    transacionAjax_Cliente('Cliente');

    Change_Select_pais();
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
        dialogClass: "Dialog_Sasif",
        modal: true,
        autoOpen: false
    });

    $("#dialog_eliminar").dialog({
        dialogClass: "Dialog_Sasif",
        modal: true,
        autoOpen: false
    });

    $("#Dialog_Visualiza").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 600,
        height: 500,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
    });

    $("#Dialog_VisualizaCliente").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 600,
        height: 550,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
    });

    $("#Dialog_Direcciones").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 1100,
        height: 520,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
    });

    $("#Dialog_C_R_U_D").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 780,
        height: 520,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
    });
}

//Función que oculta todas las IMG de los errores en pantalla
function Ocultar_Errores() {
    ResetError();
    $("#ESelect").css("display", "none");
    $("#ImgID").css("display", "none");
    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WA").css("display", "none");
    /*Los demás se ocultan en la SASIF Master*/
}

//Función que oculta las tablas
function Ocultar_Tablas() {
    $(".Dialog_Datos").css("display", "none");
    $("#TablaPais").css("display", "none");
    $("#TablaCiudad").css("display", "none");
    $("#TablaImpuesto").css("display", "none");
    $("#TablaMuticliente").css("display", "none");
    $("#TablaCliente").css("display", "none");
    $("#TablaConsulta").css("display", "none");
    $("#controls_X").css("display", "none");
}

//Función que construye el acordeon
function DisenaObjetos() {
    $(function () {
        $("#Acordeon_Dat").accordion({
            heightStyle: "content"
        });
    });
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
        transacionAjax_Inf_Impuesto("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_Inf_Impuesto("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_Inf_Impuesto_create("crear");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    OpenControl(); //Abrimos el load de espera con el logo
    transacionAjax_Inf_Impuesto_delete("elimina");
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

    var vl_Campo_1 = $("#Select_Pais").val();
    var vl_Campo_2 = $("#Select_Ciudad").val();
    var vl_Campo_3 = $("#Select_Impuesto").val();
    var vl_Campo_4 = $("#Select_Cliente").val();
    var vl_Campo_5 = $("#Select_Cliente_H").val();

    var validar = 0;

    if (vl_Campo_5 == "-1" ||
        vl_Campo_4 == "-1" ||
        vl_Campo_3 == "-1" ||
        vl_Campo_2 == "-1" ||
        vl_Campo_1 == "-1") {

        validar = 1;
        if (vl_Campo_1 == "-1") { $("#ImgID").css("display", "inline-table"); } else { $("#ImgID").css("display", "none"); }
        if (vl_Campo_2 == "-1") { $("#Img1").css("display", "inline-table"); } else { $("#Img1").css("display", "none"); }
        if (vl_Campo_3 == "-1") { $("#Img2").css("display", "inline-table"); } else { $("#Img2").css("display", "none"); }
        if (vl_Campo_4 == "-1") { $("#Img3").css("display", "inline-table"); } else { $("#Img3").css("display", "none"); }
        if (vl_Campo_5 == "-1") { $("#Img5").css("display", "inline-table"); } else { $("#Img5").css("display", "none"); }
    }
    else {
        $("#ImgID").css("display", "none");
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

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                    CHANGE DE DROP LIST                                                                                                       ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//carga el combo de clientes hijo
function Change_Select_Nit() {

    $("#Select_Cliente").change(function () {

        var Str_Empresa = $("#Select_Cliente option:selected").html();
        var SplitEmpresa = Str_Empresa.split(" - ");
        $("#Td_Empresa_ID").html(SplitEmpresa[0]);
        $("#Td_Empresa_Descrip").html(SplitEmpresa[1]);

        var TD_ID = this.value;
        TransaccionesSegunNIT(TD_ID);
    });

}

function TransaccionesSegunNIT(index_NIT_ID) {
    if (index_NIT_ID != "-1") {
        transacionAjax_Cliente_H('Cliente_H', index_NIT_ID);
    }
}

//carga las vistas del hijo cliente
function Change_Select_H_Cliente() {
    $("#Select_Cliente_H").change(function () {
        var Str_H_cliente = $("#Select_Cliente_H option:selected").html();
        var SplitCliente = Str_H_cliente.split(" - ");
        editTypeDocument = SplitCliente[0];
        editDocument = SplitCliente[1];
    });
}

//carga el combo de paises
function Change_Select_pais() {
    $("#Select_Pais").change(function () {
        var Str_pais = $("#Select_Pais option:selected").html();
        var SplitPais = Str_pais.split(" - ");
        $("#Td_P_ID").html(SplitPais[0]);
        $("#Td_P_Descrip").html(SplitPais[1]);

        $('#Select_Ciudad').empty();
        transacionAjax_Ciudad('Ciudad', SplitPais[0]);

    });
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                      PROCESOS DE VALIDACION Y GRID INFORME IMPUESTOS                                                       ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//habilita el panel de crear o consulta
function HabilitarPanel(opcion) {

    switch (opcion) {

        case "crear":
            $(".Dialog_Datos").css("display", "inline-table");
            $("#TablaPais").css("display", "inline-table");
            $("#TablaCiudad").css("display", "inline-table");
            $("#TablaImpuesto").css("display", "inline-table");
            $("#TablaMuticliente").css("display", "inline-table");
            $("#TablaCliente").css("display", "inline-table");
            $("#controls_X").css("display", "inline-table");
            $("#TablaConsulta").css("display", "none");
            $("#Btnguardar").attr("value", "Guardar");
            ResetError();
            Clear();
            estado = opcion;

            for (item in ArrayPaises) {
                if (ArrayPaises[item].ID == 169) {
                    var Str_pais = ArrayPaises[item].descripcion;
                    var SplitPais = Str_pais.split(" - ");
                    $("#Td_P_ID").html(SplitPais[0]);
                    $("#Td_P_Descrip").html(SplitPais[1]);

                }
            }
            var OnlyEmpresa = VerificarNIT("Select_Cliente");

            if (OnlyEmpresa == true) {
                TransaccionesSegunNIT($("#Select_Cliente").val());
            }

            break;

        case "buscar":
            $(".Dialog_Datos").css("display", "none");
            $("#TablaPais").css("display", "none");
            $("#TablaCiudad").css("display", "none");
            $("#TablaImpuesto").css("display", "none");
            $("#TablaMuticliente").css("display", "none");
            $("#TablaCliente").css("display", "none");

            $("#controls_X").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $(".container_TGrid").html("");
            estado = opcion;
            Clear();
            break;

        case "eliminar":
            $(".Dialog_Datos").css("display", "none");
            $("#TablaPais").css("display", "none");
            $("#TablaCiudad").css("display", "none");
            $("#TablaImpuesto").css("display", "none");
            $("#TablaMuticliente").css("display", "none");
            $("#TablaCliente").css("display", "none");
            $("#controls_X").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $(".container_TGrid").html("");
            estado = opcion;
            Clear();
            break;

    }
}

// crea la tabla en el cliente
function Table_Inf_Impuesto() {

    var html_Inf_Impuesto;
    var vl_Inf_Impuesto;

    switch (estado) {

        case "buscar":
            html_Inf_Impuesto = "<table id='TInf_Impuesto' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Opciones</th><th>Pais</th><th>Ciudad</th><th>Impuesto</th><th>Nit Responsable</th><th>Cliente</th></tr></thead><tbody>";
            for (itemArray in ArrayInf_Impuesto) {
                if (ArrayInf_Impuesto[itemArray].Inf_Impuesto_ID != 0) {
                    vl_Inf_Impuesto = parseInt(ArrayInf_Impuesto[itemArray].Index) - 1;
                    html_Inf_Impuesto += "<tr><td><span class='cssToolTip_ver'><img  src='../../images/N_Search_Red.png' width='23px' height='23px' class= 'Editar' name='editar' onmouseover=\"this.src='../../images/N_Search_Black.png';\" onmouseout=\"this.src='../../images/N_Search_Red.png';\" onclick=\"Ver('" + vl_Inf_Impuesto + "')\"></img><span>Ver Impuesto</span></span>&nbsp;&nbsp;<span class='cssToolTip_ver'><img  src='../../images/Folder_Red.png' width='23px' height='23px' class= 'Editar' name='editar' onmouseover=\"this.src='../../images/Folder_Gray.png';\" onmouseout=\"this.src='../../images/Folder_Red.png';\" onclick=\"ShearCliente('" + ArrayInf_Impuesto[itemArray].Nit_ID + "', '" + ArrayInf_Impuesto[itemArray].TypeDocument_ID + "', '" + ArrayInf_Impuesto[itemArray].Document_ID + "')\"></img><span>Ver Cliente</span></span></td><td>" + ArrayInf_Impuesto[itemArray].Cod_ID + " - " + ArrayInf_Impuesto[itemArray].DescripCod + "</td><td>" + ArrayInf_Impuesto[itemArray].Ciudad_ID + " - " + ArrayInf_Impuesto[itemArray].DescripCiudad.replace("_", " - ") + "</td><td>" + ArrayInf_Impuesto[itemArray].Impuesto_Gasto_ID + " - " + ArrayInf_Impuesto[itemArray].DescripImpuesto_Gasto + "</td><td>" + ArrayInf_Impuesto[itemArray].Nit_ID + " - " + ArrayInf_Impuesto[itemArray].DescripEmpresa + "</td><td>" + ArrayInf_Impuesto[itemArray].Document_ID + " - " + ArrayInf_Impuesto[itemArray].DescripNitResponsable + "</td></tr>";
                }
            }
            break;

        case "eliminar":
            html_Inf_Impuesto = "<table id='TInf_Impuesto' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Pais</th><th>Ciudad</th><th>Impuesto</th><th>Nit Responsable</th><th>Cliente</th></tr></thead><tbody>";
            for (itemArray in ArrayInf_Impuesto) {
                if (ArrayInf_Impuesto[itemArray].Inf_Impuesto_ID != 0) {
                    vl_Inf_Impuesto = parseInt(ArrayInf_Impuesto[itemArray].Index) - 1;
                    html_Inf_Impuesto += "<tr><td><span class='cssToolTip_ver'><img  src='../../images/Delete.png' width='23px' height='23px' class= 'Eliminar' name='eliminar' onmouseover=\"this.src='../../images/DeleteOver.png';\" onmouseout=\"this.src='../../images/Delete.png';\" onclick=\"Eliminar('" + vl_Inf_Impuesto + "')\"></img><span>Eliminar Impuesto</span></span></td><td>" + ArrayInf_Impuesto[itemArray].Cod_ID + " - " + ArrayInf_Impuesto[itemArray].DescripCod + "</td><td>" + ArrayInf_Impuesto[itemArray].Ciudad_ID + " - " + ArrayInf_Impuesto[itemArray].DescripCiudad.replace("_", " - ") + "</td><td>" + ArrayInf_Impuesto[itemArray].Impuesto_Gasto_ID + " - " + ArrayInf_Impuesto[itemArray].DescripImpuesto_Gasto + "</td><td>" + ArrayInf_Impuesto[itemArray].Nit_ID + " - " + ArrayInf_Impuesto[itemArray].DescripEmpresa + "</td><td>" + ArrayInf_Impuesto[itemArray].Document_ID + " - " + ArrayInf_Impuesto[itemArray].DescripNitResponsable + "</td></tr>";
                }
            }
            break;
    }

    html_Inf_Impuesto += "</tbody></table>";
    $(".container_TGrid").html("");
    $(".container_TGrid").html(html_Inf_Impuesto);

    $("#TInf_Impuesto").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Eliminar(vp_Index) {
    editCod_ID = ArrayInf_Impuesto[vp_Index].Cod_ID;
    editCiudad_ID = ArrayInf_Impuesto[vp_Index].Ciudad_ID;
    editInf_Impuesto_ID = ArrayInf_Impuesto[vp_Index].Impuesto_Gasto_ID;
    editCliente = ArrayInf_Impuesto[vp_Index].Nit_ID;
    editTypeDocument = ArrayInf_Impuesto[vp_Index].TypeDocument_ID;
    editDocument = ArrayInf_Impuesto[vp_Index].Document_ID;

    $("#dialog_eliminar").dialog("option", "title", "Eliminar?");
    $("#dialog_eliminar").dialog("open");
}

// muestra el registro a ver
function Ver(vp_Index) {

    var vl_StrCiudad = ArrayInf_Impuesto[vp_Index].DescripCiudad
    var vl_ArraySplit = vl_StrCiudad.split("_");

    editCliente = ArrayInf_Impuesto[vp_Index].Nit_ID;
    editTypeDocument = ArrayInf_Impuesto[vp_Index].TypeDocument_ID;
    editDocument = ArrayInf_Impuesto[vp_Index].Document_ID;

    $("#V_Pais").html(ArrayInf_Impuesto[vp_Index].DescripCod);
    $("#V_Ciudad").html(vl_ArraySplit[0]);
    $("#V_Municipio").html(vl_ArraySplit[1]);
    $("#V_Impuesto").html(ArrayInf_Impuesto[vp_Index].DescripImpuesto_Gasto);

    $("#V_NitResponsable").html(ArrayInf_Impuesto[vp_Index].Nit_ID + " - " + ArrayInf_Impuesto[vp_Index].DescripEmpresa);
    $("#V_Cliente").html(ArrayInf_Impuesto[vp_Index].DescripNitResponsable);
    $("#V_TypeDocument").html(ArrayInf_Impuesto[vp_Index].DescripTypeDocument);
    $("#V_Document").html(ArrayInf_Impuesto[vp_Index].Document_ID);

    $("#Dialog_Visualiza").dialog("option", "title", "Impuesto ó Gasto: " + ArrayInf_Impuesto[itemArray].DescripImpuesto_Gasto);
    $("#Dialog_Visualiza").dialog("open");
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                              MENSAJES, VISUALIZACION Y LIMPIEZA                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//limpiar campos
function Clear() {
    $("#Select_Pais").val("-1");
    $("#Select_Impuesto").val("-1");
    $("#Select_Cliente").val("-1");

    $("#TxtRead").val("");
    $("#DDLColumns").val("-1");

    $('#Select_Ciudad').empty();
    $('#Select_Cliente_H').empty();
    $(".container_TGrid").html("");

    $('.C_Chosen').trigger('chosen:updated');
    var OnlyEmpresa = VerificarNIT("Select_Cliente");

    if (OnlyEmpresa == true) {
        TransaccionesSegunNIT($("#Select_Cliente").val());
    }


}

