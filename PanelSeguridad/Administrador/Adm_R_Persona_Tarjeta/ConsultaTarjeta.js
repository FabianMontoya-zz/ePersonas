/*--------------- region de variables globales --------------------*/
var ArrayConsulta = [];

var estado;
var editNit_ID;
var editID;
var editDocID;
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {
    transacionAjax_EmpresaNit('Cliente');
    Change_Select_Nit();

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

    $("#Dialog_Ver").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 900,
        height: 650,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
    });
});

//salida del formulario
function btnSalir() {
    window.location = "../../Menu/menu.aspx?User=" + $("#User").html() + "&L_L=" + Link;
}

//evento del boton salir
function x() {
    $("#dialog").dialog("close");
}

//evento de cambio de empresa
function Change_Select_Nit() {
    $("#Select_EmpresaNit").change(function () {
        var index_ID = $(this).val();

        if (index_ID == "-1")
            index_ID = "ALL";

        transacionAjax_Consulta("Read_Tarjeta", index_ID);
    });
}


// crea la tabla en el cliente
function Table_Tarjetas() {

    var html_Consulta;
    var Index_Pos = 0;

    html_Consulta = "<table id='TConsulta' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Ver</th><th>Tarjeta</th><th>Empresa Custodia</th><th>Estado Tarjeta</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
    for (itemArray in ArrayConsulta) {
        if (ArrayConsulta[itemArray].Tarjeta_ID != 0) {
            Index_Pos = parseInt(ArrayConsulta[itemArray].Index) - 1;
            html_Consulta += "<tr id= 'TConsulta_" + ArrayConsulta[itemArray].Tarjeta_ID + "'><td><input type ='radio' class= 'Editar' name='editar' onclick=\"Ver('" + Index_Pos + "')\"></input></td><td>" + ArrayConsulta[itemArray].Tarjeta_ID + "</td><td>" + ArrayConsulta[itemArray].Nit_ID_Custodia + " - " + ArrayConsulta[itemArray].DescripEmpresaCustodia + "</td><td>" + ArrayConsulta[itemArray].DescripEstado + "</td><td>" + ArrayConsulta[itemArray].UsuarioCreacion + "</td><td>" + ArrayConsulta[itemArray].FechaCreacion + "</td><td>" + ArrayConsulta[itemArray].UsuarioActualizacion + "</td><td>" + ArrayConsulta[itemArray].FechaActualizacion + "</td></tr>";
        }
    }

    html_Consulta += "</tbody></table>";
    $("#Container_Consulta").html("");
    $("#Container_Consulta").html(html_Consulta);

    $("#TConsulta").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });

}

//mostrar detalles de tarjeta
function Ver(Index) {
    $("#Dialog_Ver").dialog("open");
    $("#Dialog_Ver").dialog("option", "title", "Información Detallada de la tarjeta N° " + ArrayConsulta[Index].Tarjeta_ID);

    $("#V_Tarjeta").html(ArrayConsulta[Index].Tarjeta_ID);
    $("#V_Estado").html(ArrayConsulta[Index].DescripEstado);

    if (ArrayConsulta[Index].Estado != 3) {
        $("#V_EstadoBloqueo").html("Habilitada");
        $("#V_MotivoBloqueo").html("");
    }
    else {
        $("#V_EstadoBloqueo").html("Bloqueada");
        $("#V_MotivoBloqueo").html(ArrayConsulta[Index].DescripBloqueo);
    }

    $("#V_Observacion").html(ArrayConsulta[Index].Observaciones);

    if (ArrayConsulta[Index].ChequeaVigencias == "S")
        $("#V_Vigencia").html("SI");
    else
        $("#V_Vigencia").html("NO");

    $("#V_FInicial").html(ArrayConsulta[Index].Fecha_Inicio_Vigencia);
    $("#V_FFinal").html(ArrayConsulta[Index].Fecha_Final_Vigencia);

    $("#V_EmpCustodia").html(ArrayConsulta[Index].Nit_ID_Custodia + " - " + ArrayConsulta[Index].DescripEmpresaCustodia);
    $("#V_PerCustodia").html(ArrayConsulta[Index].Document_ID_Custodia + " - " + ArrayConsulta[Index].DescripPersonaCustodia);
    $("#V_FCustodia").html(ArrayConsulta[Index].FechaCustodia);

    $("#V_EmpAsignacion").html(ArrayConsulta[Index].Nit_ID_Asigna + " - " + ArrayConsulta[Index].DescripEmpresaAsigna);
    $("#V_PerAsignacion").html(ArrayConsulta[Index].Document_ID_Asigna + " - " + ArrayConsulta[Index].DescripPersonaAsigna);
    $("#V_FAsignacion").html(ArrayConsulta[Index].FechaAsignacion);

    $("#V_EmpEntrega").html(ArrayConsulta[Index].Nit_ID_Entrega + " - " + ArrayConsulta[Index].DescripEmpresaEntrega);
    $("#V_PerEntrega").html(ArrayConsulta[Index].Document_ID_Entrega + " - " + ArrayConsulta[Index].DescripPersonaEntrega);
    $("#V_FEntrega").html(ArrayConsulta[Index].FechaEntrega);

}
