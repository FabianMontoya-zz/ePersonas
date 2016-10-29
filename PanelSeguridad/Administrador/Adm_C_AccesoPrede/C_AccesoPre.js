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
var editDocID;
var Container_Tarjeta;
/*--------------- region de variables globales --------------------*/

//evento load de los Links
$(document).ready(function () {

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
    $("#WE").css("display", "none");
    $("#T_Vigencia_Ing").css("display", "none");

    $("#TablaDatos_D").css("display", "none");
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

    $(function () {
        $("#TxtFinicial").datepicker({ dateFormat: 'yy-mm-dd' });
        $("#txt_HIVigencia").timepicker();
        $("#TxtFfinal").datepicker({ dateFormat: 'yy-mm-dd' });
        $("#txt_HFVigencia").timepicker();
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
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TGrid").html("");
            estado = opcion;
            Clear();
            break;

        case "modificar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TGrid").html("");
            estado = opcion;
            ResetError();
            Clear();
            break;

        case "eliminar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TGrid").html("");
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
            Html_Grid = "<table id='TGrid' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Empresa</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayAccesoPredet) {
                if (ArrayAccesoPredet[itemArray].Nit_ID != 0) {
                    Html_Grid += "<tr id= 'TGrid_" + ArrayAccesoPredet[itemArray].Nit_ID + "'><td>" + ArrayAccesoPredet[itemArray].Nit_ID_EmpVisita + " - " + ArrayAccesoPredet[itemArray].DescripEmpresa + "</td><td>" + ArrayAccesoPredet[itemArray].UsuarioCreacion + "</td><td>" + ArrayAccesoPredet[itemArray].FechaCreacion + "</td><td>" + ArrayAccesoPredet[itemArray].UsuarioActualizacion + "</td><td>" + ArrayAccesoPredet[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "modificar":
            Html_Grid = "<table id='TGrid' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Editar</th><th>Empresa</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayAccesoPredet) {
                if (ArrayAccesoPredet[itemArray].Nit_ID != 0) {
                    Index_Pos = parseInt(ArrayAccesoPredet[itemArray].Index) - 1;
                    Html_Grid += "<tr id= 'TGrid_" + ArrayAccesoPredet[itemArray].Nit_ID + "'><td><input type ='radio' class= 'Editar' name='editar' onclick=\"Editar('" + Index_Pos + "')\"></input></td><td>" + ArrayAccesoPredet[itemArray].Nit_ID_EmpVisita + " - " + ArrayAccesoPredet[itemArray].DescripEmpresa + "</td><td>" + ArrayAccesoPredet[itemArray].UsuarioCreacion + "</td><td>" + ArrayAccesoPredet[itemArray].FechaCreacion + "</td><td>" + ArrayAccesoPredet[itemArray].UsuarioActualizacion + "</td><td>" + ArrayAccesoPredet[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "eliminar":
            Html_Grid = "<table id='TGrid' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Empresa</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayAccesoPredet) {
                if (ArrayAccesoPredet[itemArray].Nit_ID != 0) {
                    Index_Pos = parseInt(ArrayAccesoPredet[itemArray].Index) - 1;
                    Html_Grid += "<tr id= 'TGrid_" + ArrayAccesoPredet[itemArray].Nit_ID + "'><td><input type ='radio' class= 'Eliminar' name='eliminar' onclick=\"Eliminar('" + Index_Pos + "')\"></input></td><td>" + ArrayAccesoPredet[itemArray].Nit_ID_EmpVisita + " - " + ArrayAccesoPredet[itemArray].DescripEmpresa + "</td><td>" + ArrayAccesoPredet[itemArray].UsuarioCreacion + "</td><td>" + ArrayAccesoPredet[itemArray].FechaCreacion + "</td><td>" + ArrayAccesoPredet[itemArray].UsuarioActualizacion + "</td><td>" + ArrayAccesoPredet[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;
    }

    Html_Grid += "</tbody></table>";
    $("#container_TGrid").html("");
    $("#container_TGrid").html(Html_Grid);

    $(".Eliminar").click(function () {
    });

    $(".Editar").click(function () {
    });

    $("#TGrid").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });

}

//muestra el registro a eliminar
function Eliminar(Index) {

    editNit_ID = ArrayAccesoPredet[Index].Nit_ID;

    $("#dialog_eliminar").dialog("option", "title", "Eliminar?");
    $("#dialog_eliminar").dialog("open");

}

// muestra el registro a editar
function Editar(Index) {

    $("#TablaDatos_D").css("display", "inline-table");
    $("#TablaConsulta").css("display", "none");

    editNit_ID = ArrayAccesoPredet[Index].Nit_ID;

    $("#Select_EmpresaNit").val(ArrayAccesoPredet[Index].Nit_ID);
    $("#Select_EmpresaNit_Ing").val(ArrayAccesoPredet[Index].Nit_ID_EmpVisita);

    $("#Select_EmpresaNit").attr("disabled", "disabled");
    $("#Select_EmpresaNit_Ing").attr("disabled", "disabled");

    Charge_Combos_Depend_Nit(Matrix_Persona, "Select_Persona", ArrayAccesoPredet[Index].Nit_ID, ArrayAccesoPredet[Index].Document_ID);
    Charge_Combos_Depend_Nit(Matrix_Tarjeta, "Select_Tarjeta_Ent", ArrayAccesoPredet[Index].Nit_ID, ArrayAccesoPredet[Index].Tarjeta_ID);
    $("#Select_Persona").attr("disabled", "disabled");
    $("#Select_Tarjeta_Ent").attr("disabled", "disabled");

    Charge_Combos_Depend_Nit(Matrix_PAccesos, "Select_PAcceso", ArrayAccesoPredet[Index].Nit_ID_EmpVisita, ArrayAccesoPredet[Index].PuertaAcceso_ID);
    Charge_Combos_Depend_Nit(Matrix_Persona, "Select_Persona_Enc", ArrayAccesoPredet[Index].Nit_ID_EmpVisita, ArrayAccesoPredet[Index].Document_ID_Per_Encargada);
    $("#Select_PAcceso").attr("disabled", "disabled");
    $("#Select_Persona_Enc").attr("disabled", "disabled");

    Charge_Combos_Depend_Nit(Matrix_PAcceso_Area, "Select_AreaAcceso", ArrayAccesoPredet[Index].PuertaAcceso_ID, ArrayAccesoPredet[Index].Area_ID);
    $("#Select_AreaAcceso").attr("disabled", "disabled");

    $("#Btnguardar").attr("value", "Actualizar");

    $('.C_Chosen').trigger('chosen:updated');
}

//limpiar campos
function Clear() {
    $("#Select_EmpresaNit").val("-1");
    $("#Select_Persona").val("-1");
    $("#Select_Tarjeta_Ent").val("-1");

    $('.C_Chosen').trigger('chosen:updated');

}