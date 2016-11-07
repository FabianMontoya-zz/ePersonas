/*--------------- region de variables globales --------------------*/
var Matrix_Ruta = [];

var ArrayCombo = [];
var ArrayFormato = [];
var ArrayDocumento = [];

var estado;
var editNit_ID;
var index_ID;
var editID;
/*--------------- region de variables globales --------------------*/

//evento load de los Links
$(document).ready(function () {
    transaccionAjax_MRuta('MATRIX_RUTA');

    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
    transacionAjax_EmpresaNit('Cliente');
    transacionAjax_Formato('Formato');
    Change_Select_Nit();

    $("#ESelect").css("display", "none");
    $("#Img1").css("display", "none");
    $("#Img2").css("display", "none");
    $("#Img3").css("display", "none");
    $("#Img5").css("display", "none");
    $("#Img6").css("display", "none");
    $("#Img7").css("display", "none");
    $("#Img8").css("display", "none");
    $("#Img9").css("display", "none");

    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WE").css("display", "none");

    $("#TablaDatos_D").css("display", "none");
    $("#TablaDatos_D_Vista").css("display", "none");
    $("#TablaConsulta").css("display", "none");

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

});

//salida del formulario
function btnSalir() {
    window.location = "../../Menu/menu.aspx?User=" + $("#User").html() + "&L_L=" + Link;
}

//habilita el panel de crear o consulta
function HabilitarPanel(opcion) {

    switch (opcion) {

        case "crear":
            $("#TablaDatos_D").css("display", "inline-table");
            $("#TablaDatos_D_Vista").css("display", "none");
            $("#TablaConsulta").css("display", "none");
            $("#Select_EmpresaNit").removeAttr("disabled");
            $("#Txt_ID").removeAttr("disabled");
            $("#Btnguardar").attr("value", "Guardar");
            $('.C_Chosen').trigger('chosen:updated');
            ResetError();
            Clear();
            estado = opcion;
            break;

        case "buscar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaDatos_D_Vista").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TDocumento").html("");
            estado = opcion;
            Clear();
            break;

        case "modificar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaDatos_D_Vista").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TDocumento").html("");
            estado = opcion;
            ResetError();
            Clear();
            break;

        case "eliminar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaDatos_D_Vista").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TDocumento").html("");
            estado = opcion;
            Clear();
            break;

    }
}

//carga el combo de Area dependiente
function Change_Select_Nit() {
    $("#Select_EmpresaNit").change(function () {
        var index_ID = $(this).val();
        Charge_Combos_Depend_Nit(Matrix_Ruta, "Select_RutaDocumento", index_ID, "");
        Charge_Combos_Depend_Nit(Matrix_Ruta, "Select_RutaPlantilla", index_ID, "");
    });
}

//consulta del del crud(READ)
function BtnConsulta() {

    var filtro;
    var ValidateSelect = ValidarDroplist();
    var opcion;

    if (ValidateSelect == 1) {
        filtro = "N";
        opcion = "ALL";
        transacionAjax_Documento("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_Documento("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_Documento_create("crear");
        }
        else {
            transacionAjax_Documento_create("modificar");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    transacionAjax_Documento_delete("elimina");
}


//validamos campos para la creacion del link
function validarCamposCrear() {

    var Campo_1 = $("#Select_EmpresaNit").val();
    var Campo_2 = $("#Txt_ID").val();
    var Campo_3 = $("#TxtDescription").val();
    var Campo_4 = $("#Select_TContenido").val();
    var Campo_5 = $("#Select_Formato").val();
    var Campo_6 = $("#Select_TVersion").val();
    var Campo_7 = $("#Select_RutaDocumento").val();

    var validar = 0;

    if (Campo_7 == "-1" || Campo_6 == "-1" || Campo_5 == "-1" || Campo_4 == "-1" || Campo_3 == "" || Campo_2 == "" || Campo_1 == "-1") {
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
        if (Campo_4 == "-1") {
            $("#Img5").css("display", "inline-table");
        }
        else {
            $("#Img5").css("display", "none");
        }
        if (Campo_5 == "-1") {
            $("#Img6").css("display", "inline-table");
        }
        else {
            $("#Img6").css("display", "none");
        }
        if (Campo_6 == "-1") {
            $("#Img8").css("display", "inline-table");
        }
        else {
            $("#Img8").css("display", "none");
        }
        if (Campo_7 == "-1") {
            $("#Img9").css("display", "inline-table");
        }
        else {
            $("#Img9").css("display", "none");
        }
    }
    else {
        $("#Img1").css("display", "none");
        $("#Img2").css("display", "none");
        $("#Img3").css("display", "none");
        $("#Img5").css("display", "none");
        $("#Img6").css("display", "none");
        $("#Img7").css("display", "none");
        $("#Img8").css("display", "none");
        $("#Img9").css("display", "none");
    }

    if ($("#Select_CheckVigencia").val() == "S") {
        if ($("#TxtDiaVigencia").val() == "") {
            $("#Img7").css("display", "inline-table");
            validar = 1;
        }
        else {
            $("#Img7").css("display", "none");
        }
    }
    else {
        $("#Img7").css("display", "none");
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
function Table_Documento() {

    var html_Documento;
    var Index_Pos = 0;
    switch (estado) {

        case "buscar":
            html_Documento = "<table id='TDocumento' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Opcion</th><th>Empresa</th><th>Codigo</th><th>Descripcion</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayDocumento) {
                if (ArrayDocumento[itemArray].Documento_ID != 0) {
                    Index_Pos = parseInt(ArrayDocumento[itemArray].Index) - 1;
                    html_Documento += "<tr id= 'TDocumento_" + ArrayDocumento[itemArray].Documento_ID + "'><td><select id='Select_" + ArrayDocumento[itemArray].Documento_ID + "' class='Opciones' onchange=\"Select_Option_Documento(this,'" + Index_Pos + "');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option></select></td><td>" + ArrayDocumento[itemArray].Nit_ID + " - " + ArrayDocumento[itemArray].DescripEmpresa + "</td><td>" + ArrayDocumento[itemArray].Documento_ID + "</td><td>" + ArrayDocumento[itemArray].Descripcion + "</td><td>" + ArrayDocumento[itemArray].UsuarioCreacion + "</td><td>" + ArrayDocumento[itemArray].FechaCreacion + "</td><td>" + ArrayDocumento[itemArray].UsuarioActualizacion + "</td><td>" + ArrayDocumento[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "modificar":
            html_Documento = "<table id='TDocumento' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Opcion</th><th>Empresa</th><th>Codigo</th><th>Descripcion</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayDocumento) {
                if (ArrayDocumento[itemArray].Documento_ID != 0) {
                    Index_Pos = parseInt(ArrayDocumento[itemArray].Index) - 1;
                    html_Documento += "<tr id= 'TDocumento_" + ArrayDocumento[itemArray].Documento_ID + "'><td><select id='Select_" + ArrayDocumento[itemArray].Documento_ID + "' class='Opciones' onchange=\"Select_Option_Documento(this,'" + Index_Pos + "');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option><option value='M'>Editar</option></select></td><td>" + ArrayDocumento[itemArray].Nit_ID + " - " + ArrayDocumento[itemArray].DescripEmpresa + "</td><td>" + ArrayDocumento[itemArray].Documento_ID + "</td><td>" + ArrayDocumento[itemArray].Descripcion + "</td><td>" + ArrayDocumento[itemArray].UsuarioCreacion + "</td><td>" + ArrayDocumento[itemArray].FechaCreacion + "</td><td>" + ArrayDocumento[itemArray].UsuarioActualizacion + "</td><td>" + ArrayDocumento[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "eliminar":
            html_Documento = "<table id='TDocumento' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Opcion</th><th>Empresa</th><th>Codigo</th><th>Descripcion</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayDocumento) {
                if (ArrayDocumento[itemArray].Documento_ID != 0) {
                    Index_Pos = parseInt(ArrayDocumento[itemArray].Index) - 1;
                    html_Documento += "<tr id= 'TDocumento_" + ArrayDocumento[itemArray].Documento_ID + "'><td><select id='Select_" + ArrayDocumento[itemArray].Documento_ID + "' class='Opciones' onchange=\"Select_Option_Documento(this,'" + Index_Pos + "');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option><option value='E'>Eliminar</option></select></td><td>" + ArrayDocumento[itemArray].Nit_ID + " - " + ArrayDocumento[itemArray].DescripEmpresa + "</td><td>" + ArrayDocumento[itemArray].Documento_ID + "</td><td>" + ArrayDocumento[itemArray].Descripcion + "</td><td>" + ArrayDocumento[itemArray].UsuarioCreacion + "</td><td>" + ArrayDocumento[itemArray].FechaCreacion + "</td><td>" + ArrayDocumento[itemArray].UsuarioActualizacion + "</td><td>" + ArrayDocumento[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;
    }

    html_Documento += "</tbody></table>";
    $("#container_TDocumento").html("");
    $("#container_TDocumento").html(html_Documento);

    $(".Opciones").click(function () {
    });

    $("#TDocumento").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });

}

//selecciona que tipo de operacion desea con el registro seleccionado
function Select_Option_Documento(Select_control, Index_Pos, Type) {

    var Select_Value = $(Select_control).val();
  
    switch (Select_Value) {
        case "M": //modificar
            Editar(Index_Pos, Type);
            break;

        case "V": //visualizar
            Ver(Index_Pos);
            break;

        case "E": //eliminar
            Eliminar(Index_Pos);
            break;

    }
}

// muestra el registro a ver
function Ver(Index_Cliente) {
    Editar(Index_Cliente, "V");
}

//muestra el registro a eliminar
function Eliminar(Index_Documento) {
    editNit_ID = ArrayDocumento[Index_Documento].Nit_ID;
    editID = ArrayDocumento[Index_Documento].Documento_ID;

    $("#dialog_eliminar").dialog("option", "title", "Eliminar?");
    $("#dialog_eliminar").dialog("open");
}

// muestra el registro a editar
function Editar(Index_Documento, Type) {

    if (Type == 'V') {
        $("#TablaDatos_D_Vista").css("display", "inline-table");
        $("#TablaDatos_D").css("display", "none");
        ConsultaDocumento(Index_Documento);
    }
    else {
        $("#TablaDatos_D").css("display", "inline-table");
        $("#TablaDatos_D_Vista").css("display", "none");
    }

    $("#TablaConsulta").css("display", "none");

    editNit_ID = ArrayDocumento[Index_Documento].Nit_ID;
    editID = ArrayDocumento[Index_Documento].Documento_ID;

    $("#Txt_ID").val(ArrayDocumento[Index_Documento].Documento_ID);
    $("#TxtDescription").val(ArrayDocumento[Index_Documento].Descripcion);
    $("#TxtDiaVigencia").val(ArrayDocumento[Index_Documento].DiasVigencia);
    $("#TxtNamePlanilla").val(ArrayDocumento[Index_Documento].NombrePlantilla);

    $("#Select_EmpresaNit").val(ArrayDocumento[Index_Documento].Nit_ID);
    $("#Select_CheckVigencia").val(ArrayDocumento[Index_Documento].ChequeaVigencias);
    $("#Select_TContenido").val(ArrayDocumento[Index_Documento].TipoContenido);
    $("#Select_Formato").val(ArrayDocumento[Index_Documento].Formato_ID);
    $("#Select_TVersion").val(ArrayDocumento[Index_Documento].TipoVersion);
    $("#Select_CheckVerificacion").val(ArrayDocumento[Index_Documento].RequiereVerificacion);
    $("#Select_Foto").val(ArrayDocumento[Index_Documento].IndicativoFoto);

    $("#Select_EmpresaNit").attr("disabled", "disabled");
    $("#Txt_ID").attr("disabled", "disabled");

    $("#Btnguardar").attr("value", "Actualizar");
    $('.C_Chosen').trigger('chosen:updated');

    Charge_Combos_Depend_Nit(Matrix_Ruta, "Select_RutaDocumento", ArrayDocumento[Index_Documento].Nit_ID, ArrayDocumento[Index_Documento].Ruta_ID);
    Charge_Combos_Depend_Nit(Matrix_Ruta, "Select_RutaPlantilla", ArrayDocumento[Index_Documento].Nit_ID, ArrayDocumento[Index_Documento].Ruta_ID_Plantilla);
}

//llena los datos de consulta
function ConsultaDocumento(Index_Documento) {

    $("#Con_ID").html(ArrayDocumento[Index_Documento].Documento_ID);
    $("#Con_Description").html(ArrayDocumento[Index_Documento].Descripcion);
    $("#Con_DiaVigencia").html(ArrayDocumento[Index_Documento].DiasVigencia);
    $("#Con_NamePlanilla").html(ArrayDocumento[Index_Documento].NombrePlantilla);

    $("#Con_EmpresaNit").html(ArrayDocumento[Index_Documento].DescripEmpresa);
    $("#Con_CheckVigencia").html(ArrayDocumento[Index_Documento].ChequeaVigencias);
    $("#Con_TContenido").html(ArrayDocumento[Index_Documento].DescripContenido);
    $("#Con_Formato").html(ArrayDocumento[Index_Documento].DescripFormato);
    $("#Con_TVersion").html(ArrayDocumento[Index_Documento].DescripVersion);
    $("#Con_CheckVerificacion").html(ArrayDocumento[Index_Documento].RequiereVerificacion);
    $("#Con_Foto").html(ArrayDocumento[Index_Documento].IndicativoFoto);
    $("#Con_RutaDocumento").html(ArrayDocumento[Index_Documento].DescripRuta);
    $("#Con_RutaPlantilla").html(ArrayDocumento[Index_Documento].DescripRutaPlantilla);
}

//evento del boton salir
function x() {
    $("#dialog").dialog("close");
}

//limpiar campos
function Clear() {
    $("#Select_EmpresaNit").val("-1");
    $("#Txt_ID").val("");
    $("#TxtDescription").val("");

    $("#Select_CheckVigencia").val("N");
    $("#TxtDiaVigencia").val("");
    $("#Select_TContenido").val("-1");
    $("#Select_Formato").val("-1");
    $("#Select_TVersion").val("-1");
    $("#Select_RutaDocumento").val("-1");
    $("#Select_RutaPlantilla").val("-1");
    $("#TxtNamePlanilla").val("");
    $("#Select_CheckVerificacion").val("N");
    $("#Select_Foto").val("N");

    $("#TxtRead").val("");
    $("#DDLColumns").val("-1");

    $('.C_Chosen').trigger('chosen:updated');

}