/*--------------- region de variables globales --------------------*/
var ArrayConsulta = [];

var estado;
var editNit_ID;
var editID;
var editDocID;
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {

    /*Llamado de metodos para ocultar elementos al inicio de la operación de la pantalla*/
    Ventanas_Emergentes(); //Ventanas_Emergentes Va primero pues es la que llama al load de espera al inicio de los AJAX
    Ocultar_Tablas();
    /*================== FIN LLAMADO INICIAL DE METODOS DE INICIALIZACIÓN ==============*/

    transacionAjax_EmpresaNit('Cliente');
    Change_Select_Nit();
    
});

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

}

//Función que oculta las tablas
function Ocultar_Tablas() {
    $(".Dialog_Datos").css("padding-bottom", "35%");
    $("#TablaConsulta").css("display", "none");
}


//evento del boton salir
function x() {
    $("#dialog").dialog("close");
}

//evento de cambio de empresa
function Change_Select_Nit() {
    $("#Select_EmpresaNit").change(function () {
        var index_ID = $(this).val();
        TransaccionesSegunNIT(index_ID);
    });
}

//Carga los combos que estan relacionados a Select_Nit
function TransaccionesSegunNIT(index_ID) {
    if (index_ID != "-1") {
        if (index_ID == "-1")
            index_ID = "ALL";
        transacionAjax_Consulta("Read_Tarjeta", index_ID);
    }
}

// crea la tabla en el cliente
function Table_Tarjetas() {

    var html_Consulta;
    var Index_Pos = 0;

    html_Consulta = "<table id='TConsulta' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Ver</th><th>Tarjeta</th><th>Empresa Custodia</th><th>Estado Tarjeta</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
    for (itemArray in ArrayConsulta) {
        if (ArrayConsulta[itemArray].Tarjeta_ID != 0) {
            Index_Pos = parseInt(ArrayConsulta[itemArray].Index) - 1;
            html_Consulta += "<tr id= 'TConsulta_" + ArrayConsulta[itemArray].Tarjeta_ID + "'><td><img  src='../../images/N_Search_Red.png' width='23px' height='23px' class= 'Ver' name='ver' onmouseover=\"this.src='../../images/N_Search_Black.png';\" onmouseout=\"this.src='../../images/N_Search_Red.png';\" onclick=\"Ver('" + Index_Pos + "')\"></img></td><td>" + ArrayConsulta[itemArray].Tarjeta_ID + "</td><td>" + ArrayConsulta[itemArray].Nit_ID_Custodia + " - " + ArrayConsulta[itemArray].DescripEmpresaCustodia + "</td><td>" + ArrayConsulta[itemArray].DescripEstado + "</td><td>" + ArrayConsulta[itemArray].UsuarioCreacion + "</td><td>" + ArrayConsulta[itemArray].FechaCreacion + "</td><td>" + ArrayConsulta[itemArray].UsuarioActualizacion + "</td><td>" + ArrayConsulta[itemArray].FechaActualizacion + "</td></tr>";
        }
    }

    html_Consulta += "</tbody></table>";
    $(".Div_Full_Block").html("");
    $(".Div_Full_Block").html(html_Consulta);

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
