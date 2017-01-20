/*--------------- region de variables globales --------------------*/
var Matrix_Tarjeta = [];
var Matrix_Persona = [];
var Matrix_RTP = [];
var ArrayTipo_ing = [];
var Matrix_PAccesos = [];
var Matrix_PAcceso_Area = [];

var ArrayAccesoPredet = [];
var ArrayR_Persona_Tarjeta = [];
var ArrayR_Persona_TarjetaDep = [];

var estado;
var editNit_ID;
var editID;
var editTDoc;
var editDoc;
var editTarjeta;
var editNit_Ing_ID;
var editPuertaAcceso_ID;
var editAreaAcceso_ID;
var editTDoc_Enc;
var editDoc_Enc;
var Container_Tarjeta;
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {

    $("#Marco_trabajo_Form").css("height", "490px");
    $("#container_TGrid").css("height", "380px");

    /*Llamado de metodos para ocultar elementos al inicio de la operación de la pantalla*/
    Ventanas_Emergentes(); //Ventanas_Emergentes Va primero pues es la que llama al load de espera al inicio de los AJAX
    Ocultar_Errores();
    Ocultar_Tablas();

    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
    transaccionAjax_MPersona('MATRIX_PERSONA');
    transaccionAjax_MTarjeta('MATRIX_TARJETA');
    transaccionAjax_MRTP('MATRIX_RTP');
    transaccionAjax_MPAccesos('MATRIX_PACCESOS');
    transaccionAjax_MPAcceso_Area('MATRIX_PACCESO_AREA');

    transacionAjax_EmpresaNit('Cliente');
    transacionAjax_Tipo_Ingreso('Tipo_Ing');

    Change_Select_Nit();
    Change_Select_Persona();
    Change_Select_Tarjeta();
    Change_Select_Vigencia();



    $(function () {
        $("#TxtFinicial").datepicker({ dateFormat: 'yy-mm-dd' });
        $("#txt_HIVigencia").timepicker();
        $("#TxtFfinal").datepicker({ dateFormat: 'yy-mm-dd' });
        $("#txt_HFVigencia").timepicker();
    });
});

//Función que oculta todas las IMG de los errores en pantalla
function Ocultar_Errores() {
    ResetError();

    $("#ESelect").css("display", "none");
    $("#Img1").css("display", "none");
    $("#Img2").css("display", "none");
    $("#Img3").css("display", "none");
    $("#Img5").css("display", "none");
    $("#Img6").css("display", "none");
    $("#Img7").css("display", "none");
    $("#Img8").css("display", "none");
    $("#Img9").css("display", "none");
    $("#Img10").css("display", "none");
    $("#Img11").css("display", "none");
    $("#Img12").css("display", "none");
    $("#Img13").css("display", "none");
    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WA").css("display", "none");
    $("#T_Vigencia_Ing").css("display", "none");

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

    $("#Dialog_Create").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 800,
        height: 560,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
    });
}

//Función que oculta las tablas
function Ocultar_Tablas() {
    $("#TablaDatos_D").css("display", "none");
    $("#TablaConsulta").css("display", "none");
}

//elimina de la BD
function BtnElimina() {
    OpenControl(); //Abrimos el load de espera con el logo
    transacionAjax_Delete_AccesoPredet("elimina");
}

//habilita el panel de crear o consulta
function HabilitarPanel(opcion) {

    switch (opcion) {

        case "crear":
            $("#TablaConsulta").css("display", "none");
            $("#Select_EmpresaNit").removeAttr("disabled");
            $("#Txt_ID").removeAttr("disabled");
            $("#Btnguardar").attr("value", "Guardar");
            $('.C_Chosen').trigger('chosen:updated');
            $("#Dialog_Create").dialog("open");
            $("#Dialog_Create").dialog("option", "title", "Creación Acceso Prederterminado");
            $("#container_Create").css("display", "inline-table");
            $("#container_Read").css("display", "none");
            ResetError();
            EnableControls();
            Clear();
            estado = opcion;
            
            var OnlyEmpresa = VerificarNIT("Select_EmpresaNit");

            if (OnlyEmpresa == true) {
                TransaccionesSegunNIT($("#Select_EmpresaNit").val());
            }
            break;

        case "buscar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TGrid").html("");
            $("#Dialog_Create").dialog("close");
            estado = opcion;
            Clear();
            break;

        case "modificar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TGrid").html("");
            $("#Dialog_Create").dialog("close");
            estado = opcion;
            ResetError();
            Clear();
            break;

        case "eliminar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TGrid").html("");
            $("#Dialog_Create").dialog("close");
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
        transacionAjax_AccesoPredet("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_AccesoPredet("consulta", filtro, opcion);
    }

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

//crear link en la BD
function BtnCrear() {
    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar")
            transacionAjax_Insert_AccesoPredet("crear");
        else
            transacionAjax_Insert_AccesoPredet("modificar");
    }
}

//evento del boton salir
function x() {
    $("#dialog").dialog("close");
}

// crea la tabla en el cliente
function Table_Grid() {

    var Html_Grid;
    var Index_Pos = 0;
    switch (estado) {

        case "buscar":
            Html_Grid = "<table id='TGrid' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Opcion</th><th>Empresa</th><th>Persona Ingresa</th><th>N° Tarjeta</th><th>Empresa a Ingresar</th><th>Puerta Acceso</th><th>Área Acceso</th><th>Persona Encargada</th><th>Control Acceso Vigencia</th><th>Tipo Ingreso</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayAccesoPredet) {
                if (ArrayAccesoPredet[itemArray].Nit_ID != 0) {
                    Index_Pos = parseInt(ArrayAccesoPredet[itemArray].Index) - 1;
                    Html_Grid += "<tr id= 'TGrid_" + ArrayAccesoPredet[itemArray].Nit_ID + "'><td><select id='Select_" + Index_Pos + "' class='Opciones' onchange=\"Select_Option_Documento(this,'" + Index_Pos + "');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option></select></td><td>" + ArrayAccesoPredet[itemArray].Nit_ID_EmpVisita + " - " + ArrayAccesoPredet[itemArray].DescripEmpresa + "</td><td>" + ArrayAccesoPredet[itemArray].DescripPersona_Ing + "</td><td>" + ArrayAccesoPredet[itemArray].Tarjeta_ID + "</td><td>" + ArrayAccesoPredet[itemArray].DescripEmpresa_Ing + "</td><td>" + ArrayAccesoPredet[itemArray].PuertaAcceso_ID + " - " + ArrayAccesoPredet[itemArray].DescripPuertaAcceso + "</td><td>" + ArrayAccesoPredet[itemArray].Area_ID + " - " + ArrayAccesoPredet[itemArray].DescripAreaAcceso + "</td><td>" + ArrayAccesoPredet[itemArray].DescripPersona_Enc + "</td><td>" + ArrayAccesoPredet[itemArray].ControlVigencia + "</td><td>" + ArrayAccesoPredet[itemArray].DescripTipoIngreso + "</td><td>" + ArrayAccesoPredet[itemArray].UsuarioCreacion + "</td><td>" + ArrayAccesoPredet[itemArray].FechaCreacion + "</td><td>" + ArrayAccesoPredet[itemArray].UsuarioActualizacion + "</td><td>" + ArrayAccesoPredet[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "modificar":
            Html_Grid = "<table id='TGrid' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Editar</th><th>Empresa</th><th>Persona Ingresa</th><th>N° Tarjeta</th><th>Empresa a Ingresar</th><th>Puerta Acceso</th><th>Área Acceso</th><th>Persona Encargada</th><th>Control Acceso Vigencia</th><th>Tipo Ingreso</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayAccesoPredet) {
                if (ArrayAccesoPredet[itemArray].Nit_ID != 0) {
                    Index_Pos = parseInt(ArrayAccesoPredet[itemArray].Index) - 1;
                    Html_Grid += "<tr id= 'TGrid_" + ArrayAccesoPredet[itemArray].Nit_ID + "'><td><select id='Select_" + Index_Pos + "' class='Opciones' onchange=\"Select_Option_Documento(this,'" + Index_Pos + "');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option><option value='M'>Editar</option></select></td><td>" + ArrayAccesoPredet[itemArray].Nit_ID_EmpVisita + " - " + ArrayAccesoPredet[itemArray].DescripEmpresa + "</td><td>" + ArrayAccesoPredet[itemArray].DescripPersona_Ing + "</td><td>" + ArrayAccesoPredet[itemArray].Tarjeta_ID + "</td><td>" + ArrayAccesoPredet[itemArray].DescripEmpresa_Ing + "</td><td>" + ArrayAccesoPredet[itemArray].PuertaAcceso_ID + " - " + ArrayAccesoPredet[itemArray].DescripPuertaAcceso + "</td><td>" + ArrayAccesoPredet[itemArray].Area_ID + " - " + ArrayAccesoPredet[itemArray].DescripAreaAcceso + "</td><td>" + ArrayAccesoPredet[itemArray].DescripPersona_Enc + "</td><td>" + ArrayAccesoPredet[itemArray].ControlVigencia + "</td><td>" + ArrayAccesoPredet[itemArray].DescripTipoIngreso + "</td><td>" + ArrayAccesoPredet[itemArray].UsuarioCreacion + "</td><td>" + ArrayAccesoPredet[itemArray].FechaCreacion + "</td><td>" + ArrayAccesoPredet[itemArray].UsuarioActualizacion + "</td><td>" + ArrayAccesoPredet[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "eliminar":
            Html_Grid = "<table id='TGrid' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Empresa</th><th>Persona Ingresa</th><th>N° Tarjeta</th><th>Empresa a Ingresar</th><th>Puerta Acceso</th><th>Área Acceso</th><th>Persona Encargada</th><th>Control Acceso Vigencia</th><th>Tipo Ingreso</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayAccesoPredet) {
                if (ArrayAccesoPredet[itemArray].Nit_ID != 0) {
                    Index_Pos = parseInt(ArrayAccesoPredet[itemArray].Index) - 1;
                    Html_Grid += "<tr id= 'TGrid_" + ArrayAccesoPredet[itemArray].Nit_ID + "'><td><select id='Select_" + Index_Pos + "' class='Opciones' onchange=\"Select_Option_Documento(this,'" + Index_Pos + "');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option><option value='E'>Eliminar</option></select></td><td>" + ArrayAccesoPredet[itemArray].Nit_ID_EmpVisita + " - " + ArrayAccesoPredet[itemArray].DescripEmpresa + "</td><td>" + ArrayAccesoPredet[itemArray].DescripPersona_Ing + "</td><td>" + ArrayAccesoPredet[itemArray].Tarjeta_ID + "</td><td>" + ArrayAccesoPredet[itemArray].DescripEmpresa_Ing + "</td><td>" + ArrayAccesoPredet[itemArray].PuertaAcceso_ID + " - " + ArrayAccesoPredet[itemArray].DescripPuertaAcceso + "</td><td>" + ArrayAccesoPredet[itemArray].Area_ID + " - " + ArrayAccesoPredet[itemArray].DescripAreaAcceso + "</td><td>" + ArrayAccesoPredet[itemArray].DescripPersona_Enc + "</td><td>" + ArrayAccesoPredet[itemArray].ControlVigencia + "</td><td>" + ArrayAccesoPredet[itemArray].DescripTipoIngreso + "</td><td>" + ArrayAccesoPredet[itemArray].UsuarioCreacion + "</td><td>" + ArrayAccesoPredet[itemArray].FechaCreacion + "</td><td>" + ArrayAccesoPredet[itemArray].UsuarioActualizacion + "</td><td>" + ArrayAccesoPredet[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;
    }

    Html_Grid += "</tbody></table>";
    $("#container_TGrid").html("");
    $("#container_TGrid").html(Html_Grid);

    $(".Opciones").click(function () {
    });

    $("#TGrid").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });

}

//selecciona que tipo de operacion desea con el registro seleccionado
function Select_Option_Documento(Select_control, Index_Pos, Type) {

    var Select_Value = $(Select_control).val();

    switch (Select_Value) {
        case "M": //modificar
            Editar(Index_Pos, "M");
            break;

        case "V": //visualizar
            Ver(Index_Pos);
            break;

        case "E": //eliminar
            Eliminar(Index_Pos);
            break;
    }
}

//muestra el registro a eliminar
function Eliminar(Index) {

    editNit_ID = ArrayAccesoPredet[Index].Nit_ID;
    editTDoc = ArrayAccesoPredet[Index].TypeDocument_ID;
    editDoc = ArrayAccesoPredet[Index].Document_ID;
    editTarjeta = ArrayAccesoPredet[Index].Tarjeta_ID;
    editNit_Ing_ID = ArrayAccesoPredet[Index].Nit_ID_EmpVisita;
    editPuertaAcceso_ID = ArrayAccesoPredet[Index].PuertaAcceso_ID;
    editAreaAcceso_ID = ArrayAccesoPredet[Index].Area_ID;
    editTDoc_Enc = ArrayAccesoPredet[Index].TypeDocument_ID_Per_Encargada;
    editDoc_Enc = ArrayAccesoPredet[Index].Document_ID_Per_Encargada;

    $("#dialog_eliminar").dialog("option", "title", "Eliminar?");
    $("#dialog_eliminar").dialog("open");

}

// muestra el registro a ver
function Ver(Index_Cliente) {
    Editar(Index_Cliente, "V");
}

// muestra el registro a editar
function Editar(Index, Type) {

    $("#Dialog_Create").dialog("open");
     $("#TablaConsulta").css("display", "none");

     if (Type == "M") {
         $("#Dialog_Create").dialog("option", "title", "Actualización Acceso Prederterminado");
        $("#container_Create").css("display", "inline-table");
        $("#container_Read").css("display", "none");
    }
    else {
        $("#Dialog_Create").dialog("option", "title", "Ver Acceso Prederterminado");
        $("#container_Create").css("display", "none");
        $("#container_Read").css("display", "inline-table");
    }

    editNit_ID = ArrayAccesoPredet[Index].Nit_ID;

    $("#Select_EmpresaNit").val(ArrayAccesoPredet[Index].Nit_ID);
    $("#Select_EmpresaNit_Ing").val(ArrayAccesoPredet[Index].Nit_ID_EmpVisita);
    $("#Select_CheckVigencia").val(ArrayAccesoPredet[Index].ControlVigencia);
    $("#Select_TypeIngreso").val(ArrayAccesoPredet[Index].TipoIngreso);
      
    Charge_Combos_Depend_Nit(Matrix_Persona, "Select_Persona", ArrayAccesoPredet[Index].Nit_ID, ArrayAccesoPredet[Index].Document_ID);
    Charge_Combos_Depend_Nit(Matrix_Tarjeta, "Select_Tarjeta_AccPre", ArrayAccesoPredet[Index].Nit_ID, ArrayAccesoPredet[Index].Tarjeta_ID);

    Charge_Combos_Depend_Nit(Matrix_PAccesos, "Select_PAcceso", ArrayAccesoPredet[Index].Nit_ID_EmpVisita, ArrayAccesoPredet[Index].PuertaAcceso_ID);
    Charge_Combos_Depend_Nit(Matrix_Persona, "Select_Persona_Enc", ArrayAccesoPredet[Index].Nit_ID_EmpVisita, ArrayAccesoPredet[Index].Document_ID_Per_Encargada);

    Charge_Combos_Depend_Nit(Matrix_PAcceso_Area, "Select_AreaAcceso", ArrayAccesoPredet[Index].PuertaAcceso_ID, ArrayAccesoPredet[Index].Area_ID);

    $("#Btnguardar").attr("value", "Actualizar");
    $('.C_Chosen').trigger('chosen:updated');

    switch (ArrayAccesoPredet[Index].ControlVigencia) {
        case "S":
            $("#T_Vigencia_Ing").css("display", "inline-table");
            $("#TxtFinicial").val(ArrayAccesoPredet[Index].FechaInicio_Vigencia);
            $("#txt_HIVigencia").val(ArrayAccesoPredet[Index].HoraInicio);
            $("#TxtFfinal").val(ArrayAccesoPredet[Index].FechaFin_Vigencia);
            $("#txt_HFVigencia").val(ArrayAccesoPredet[Index].HoraFin);
            break;

        case "N":
            $("#T_Vigencia_Ing").css("display", "none");
            break;

        default:
            $("#T_Vigencia_Ing").css("display", "none");
            break;
    }
    DisableControls();
    $("#Vis_EmpresaNit").html($("#Select_EmpresaNit option:selected").html());
    $("#Vis_EmpresaNit_Ing").html($("#Select_EmpresaNit_Ing option:selected").html());
    $("#Vis_CheckVigencia").html($("#Select_CheckVigencia option:selected").html());
    $("#Vis_TypeIngreso").html($("#Select_TypeIngreso option:selected").html());
    $("#Vis_Persona").html($("#Select_Persona option:selected").html());
    $("#Vis_Tarjeta_Ent").html($("#Select_Tarjeta_AccPre option:selected").html());
    $("#Vis_PAcceso").html($("#Select_PAcceso option:selected").html());
    $("#Vis_Persona_Enc").html($("#Select_Persona_Enc option:selected").html());
    $("#Vis_AreaAcceso").html($("#Select_AreaAcceso option:selected").html());
    $("#Vis_Finicial").html(ArrayAccesoPredet[Index].FechaInicio_Vigencia);
    $("#Vis_HIVigencia").html(ArrayAccesoPredet[Index].HoraInicio);
    $("#Vis_Ffinal").html(ArrayAccesoPredet[Index].FechaFin_Vigencia);
    $("#Vis_HFVigencia").html(ArrayAccesoPredet[Index].HoraFin);
 
}

//limpiar campos
function Clear() {
    $("#Select_EmpresaNit").val("-1");
    $("#Select_Persona").val("-1");
    $("#Select_Tarjeta_AccPre").val("-1");
    $("#Select_CheckVigencia").val("-1");
    $("#Select_TypeIngreso").val("-1");
    $("#Select_EmpresaNit_Ing").val("-1");
    $("#Select_PAcceso").val("-1");
    $("#Select_Persona_Enc").val("-1");
    $("#Select_AreaAcceso").val("-1");

    $("#TxtFinicial").val("");
    $("#txt_HIVigencia").val("");
    $("#TxtFfinal").val("");
    $("#txt_HFVigencia").val("");
    $("#T_Vigencia_Ing").css("display", "none");
    $("#DDLColumns").val("-1").trigger("chosen:updated");

    $('.C_Chosen').trigger('chosen:updated');
}

//bloquear controles
function DisableControls() {
    $("#Select_EmpresaNit").attr("disabled", "disabled");
    $("#Select_EmpresaNit_Ing").attr("disabled", "disabled");
    $("#Select_Persona").attr("disabled", "disabled");
    $("#Select_Tarjeta_AccPre").attr("disabled", "disabled");
    $("#Select_PAcceso").attr("disabled", "disabled");
    $("#Select_Persona_Enc").attr("disabled", "disabled");
    $("#Select_AreaAcceso").attr("disabled", "disabled");
    $('.C_Chosen').trigger('chosen:updated');
}

//bloquear controles
function EnableControls() {
    $("#Select_EmpresaNit").removeAttr("disabled");
    $("#Select_EmpresaNit_Ing").removeAttr("disabled");
    $("#Select_Persona").removeAttr("disabled");
    $("#Select_Tarjeta_AccPre").removeAttr("disabled");
    $("#Select_PAcceso").removeAttr("disabled");
    $("#Select_Persona_Enc").removeAttr("disabled");
    $("#Select_AreaAcceso").removeAttr("disabled");
    $('.C_Chosen').trigger('chosen:updated');
}
