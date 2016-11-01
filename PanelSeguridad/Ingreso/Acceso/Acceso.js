/*--------------- region de variables globales --------------------*/
var Matrix_PAcceso = [];
var Matrix_Area = [];

var ArrayAcceso = [];
var ArrayCombo = [];
var ArrayAccesoDep = [];
var ArraySeguridad = [];

var estado;
var editNit_ID;
var index_ID;
var editID;
var editDocID;
/*--------------- region de variables globales --------------------*/

//evento load de los Links
$(document).ready(function () {
    transaccionAjax_MPAcceso('MATRIX_PACCESO');
    transaccionAjax_MArea('MATRIX_AREA');
    Change_Select_Nit();
    Capture_Tarjeta_ID()
   transacionAjax_EmpresaNit('Cliente');

    $("#ESelect").css("display", "none");
    $("#Img1").css("display", "none");
    $("#Img2").css("display", "none");
    $("#Img3").css("display", "none");
    $("#Img5").css("display", "none");
    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WE").css("display", "none");

    $("#Div_L").css("display", "none");
    $("#Div_D").css("display", "none");

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

    $("input[name=Captura]").change(function () {
        CambioCaptura($(this).val());
    });
});

//proceso de captura de informacion persona
function CambioCaptura(Tipo) {
    switch (Tipo) {

        case "L":
            $("#Div_L").css("display", "inline-table");
            $("#Div_D").css("display", "none");
            $("#TxtIDTarjeta").focus();
            break;

        case "D":
            $("#Div_L").css("display", "none");
            $("#Div_D").css("display", "inline-table");
            break;
    }
 }

 //captura el numero y uesta info
 function Capture_Tarjeta_ID() {
     $("#TxtIDTarjeta").change(function () {
         var StrID = $(this).val();
         if (StrID.length == 10) {
             $("#TxtIDTarjeta").attr("disabled", "disabled");
          }
         else {
             $("#TxtIDTarjeta").removeAttr("disabled");
         }
     });

 }

//carga el combo de Area dependiente
function Change_Select_Nit() {
    $("#Select_EmpresaNit").change(function () {
        var index_ID = $(this).val();
        Charge_Combos_Depend_Nit(Matrix_PAcceso, "Select_PAcceso", index_ID, "");
        Charge_Combos_Depend_Nit(Matrix_Area, "Select_Area", index_ID, "");
    });
}

//salida del formulario
function btnSalir() {
    window.location = "../../Menu/menu.aspx?User=" + $("#User").html() + "&L_L=" + Link;
}


//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_Acceso_create("crear");
        }
    }
}

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

// crea la tabla en el cliente
function Table_Acceso() {

    var html_Acceso;
    var Index_Pos = 0;
    switch (estado) {

        case "buscar":
            html_Acceso = "<table id='TAcceso' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Empresa</th><th>Puerta de Acceso</th><th>Área</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayAcceso) {
                if (ArrayAcceso[itemArray].Acceso_ID != 0) {
                    html_Acceso += "<tr id= 'TAcceso_" + ArrayAcceso[itemArray].PuertaAcceso_ID + "'><td>" + ArrayAcceso[itemArray].Nit_ID + " - " + ArrayAcceso[itemArray].DescripEmpresa + "</td><td>" + ArrayAcceso[itemArray].PuertaAcceso_ID + " - " + ArrayAcceso[itemArray].DescripPAcceso + "</td><td>" + + ArrayAcceso[itemArray].Area_ID + " - " + ArrayAcceso[itemArray].DescripArea+ "</td><td>" + ArrayAcceso[itemArray].UsuarioCreacion + "</td><td>" + ArrayAcceso[itemArray].FechaCreacion + "</td><td>" + ArrayAcceso[itemArray].UsuarioActualizacion + "</td><td>" + ArrayAcceso[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "eliminar":
            html_Acceso = "<table id='TAcceso' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Empresa</th><th>Puerta de Acceso</th><th>Área</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayAcceso) {
                if (ArrayAcceso[itemArray].Acceso_ID != 0) {
                    Index_Pos = parseInt(ArrayAcceso[itemArray].Index) - 1;
                    html_Acceso += "<tr id= 'TAcceso_" + ArrayAcceso[itemArray].PuertaAcceso_ID + "'><td><input type ='radio' class= 'Eliminar' name='eliminar' onclick=\"Eliminar('" + Index_Pos + "')\"></input></td><td>" + ArrayAcceso[itemArray].Nit_ID + " - " + ArrayAcceso[itemArray].DescripEmpresa + "</td><td>" + ArrayAcceso[itemArray].PuertaAcceso_ID + " - " + ArrayAcceso[itemArray].DescripPAcceso + "</td><td>" + + ArrayAcceso[itemArray].Area_ID + " - " + ArrayAcceso[itemArray].DescripArea+ "</td><td>" + ArrayAcceso[itemArray].UsuarioCreacion + "</td><td>" + ArrayAcceso[itemArray].FechaCreacion + "</td><td>" + ArrayAcceso[itemArray].UsuarioActualizacion + "</td><td>" + ArrayAcceso[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;
    }

    html_Acceso += "</tbody></table>";
    $("#container_TAcceso").html("");
    $("#container_TAcceso").html(html_Acceso);

    $(".Eliminar").click(function () {
    });

    $(".Editar").click(function () {
    });

    $("#TAcceso").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Eliminar(Index_GrpDocumento) {

    editNit_ID = ArrayAcceso[Index_GrpDocumento].Nit_ID;
    editID = ArrayAcceso[Index_GrpDocumento].PuertaAcceso_ID ;
    editDocID = ArrayAcceso[Index_GrpDocumento].Area_ID;

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
    $("#Select_PAcceso").val("-1");
    $("#Select_Area").val("-1");

    $("#TxtRead").val("");
    $("#DDLColumns").val("-1");

    $('.C_Chosen').trigger('chosen:updated');

}