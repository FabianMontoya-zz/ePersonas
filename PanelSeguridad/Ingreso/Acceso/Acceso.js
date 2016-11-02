/*--------------- region de variables globales --------------------*/
var Matrix_Persona = [];
var Matrix_DocWork = [];

var Matrix_PAcceso = [];
var Matrix_Area = [];

var ArrayAcceso = [];
var ArrayCombo = [];
var ArrayAccesoDep = [];
var ArraySeguridad = [];
var ArrayTdoc = [];

var estado;
var editNit_ID;
var index_ID;
var editID;
var editDocID;
/*--------------- region de variables globales --------------------*/

//evento load de los Links
$(document).ready(function () {
    transaccionAjax_MPersonas('MATRIX_PERSONAS');
    transaccionAjax_MDocWork('MATIRXDOC_WORK');

    transaccionAjax_MPAcceso('MATRIX_PACCESO');
    transaccionAjax_MArea('MATRIX_AREA');
    Capture_Tarjeta_ID()
    //transacionAjax_EmpresaNit('Cliente');
    transacionAjax_Documento('Documento');

    $("#ESelect").css("display", "none");
    $("#Img1").css("display", "none");
    $("#Img2").css("display", "none");
    $("#Img3").css("display", "none");
    $("#Img5").css("display", "none");
    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WE").css("display", "none");

    $("#Inf_persona").css("display", "none");
    $("#Div_D").css("display", "none");

    //funcion para las ventanas emergentes
    $("#dialog").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif_Web",
        modal: true
    });

    $("#dialog_eliminar").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif_Web",
        modal: true
    });


});

//consuta datos
function BtnConsulta() {
    var validate = Campos();

    if (validate == 0) {
        var Exist = SearchPersona();
        if (Exist == 1) {
            $("#Inf_persona").css("display", "inline-table");
        }
        else {
            Mensaje_General("No existe!", "La persona A ingresar No existe en el Sistema!", "W");
            $("#Inf_persona").css("display", "none");
        }
    }
}

// validamos campos de captura
function Campos() {

    var Campo_1 = $("#Select_Documento").val();
    var Campo_2 = $("#TxtDoc").val();
    var validar = 0;

    if (Campo_2 == "" || Campo_1 == "-1") {
        validar = 1;
        if (Campo_1 == "-1")
            $("#Img1").css("display", "inline-table");
        else
            $("#Img1").css("display", "none");

        if (Campo_2 == "")
            $("#Img2").css("display", "inline-table");
        else
            $("#Img2").css("display", "none");
    }
    else {
        $("#Img1").css("display", "none");
        $("#Img2").css("display", "none");
    }
    return validar;
}

//buscar persona en la matrix
function SearchPersona() {
    var TDoc = $("#Select_Documento").val();
    var Doc = $("#TxtDoc").val();
    var Exist = 0;
    for (item in Matrix_Persona) {
        if (TDoc == Matrix_Persona[item].TypeDocument_ID &&
             Doc == Matrix_Persona[item].Document_ID) {

            Exist = 1;

            $("#L_Nombre").html(Matrix_Persona[item].Nombre);
            $("#L_Empresa").html(Matrix_Persona[item].DescripEmpresa);
            $("#L_Area").html(Matrix_Persona[item].DescripArea);
            $("#L_Cargo").html(Matrix_Persona[item].DescripCargo);
            SearchFoto(TDoc, Doc);
            break;
        }
    }
    return Exist;
}
//buscar Foto de la persona
function SearchFoto(TDoc, Doc) {
    var StrSrc = "";
    for (item in Matrix_DocWork) {
        if (Matrix_DocWork[item].TypeDocument_ID == TDoc &&
             Matrix_DocWork[item].Document_ID &&
             Matrix_DocWork[item].Indicativo == "S") {
            StrSrc = Matrix_DocWork[item].RutaRelativaDocumento + Matrix_DocWork[item].Nombre_Save + '.' + Matrix_DocWork[item].DescripFormato;
            break;
        }
    }
    ViewFoto(StrSrc);
}

//crear la ruta del src de la imagen
function ViewFoto(StrSrc) {
    if (StrSrc != "")
        $("#Imgfoto").attr("src", StrSrc);
    else {
        StrSrc = "../../images/avatar.png";
        $("#Imgfoto").attr("src", StrSrc);
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
                    html_Acceso += "<tr id= 'TAcceso_" + ArrayAcceso[itemArray].PuertaAcceso_ID + "'><td>" + ArrayAcceso[itemArray].Nit_ID + " - " + ArrayAcceso[itemArray].DescripEmpresa + "</td><td>" + ArrayAcceso[itemArray].PuertaAcceso_ID + " - " + ArrayAcceso[itemArray].DescripPAcceso + "</td><td>" + +ArrayAcceso[itemArray].Area_ID + " - " + ArrayAcceso[itemArray].DescripArea + "</td><td>" + ArrayAcceso[itemArray].UsuarioCreacion + "</td><td>" + ArrayAcceso[itemArray].FechaCreacion + "</td><td>" + ArrayAcceso[itemArray].UsuarioActualizacion + "</td><td>" + ArrayAcceso[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "eliminar":
            html_Acceso = "<table id='TAcceso' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Empresa</th><th>Puerta de Acceso</th><th>Área</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayAcceso) {
                if (ArrayAcceso[itemArray].Acceso_ID != 0) {
                    Index_Pos = parseInt(ArrayAcceso[itemArray].Index) - 1;
                    html_Acceso += "<tr id= 'TAcceso_" + ArrayAcceso[itemArray].PuertaAcceso_ID + "'><td><input type ='radio' class= 'Eliminar' name='eliminar' onclick=\"Eliminar('" + Index_Pos + "')\"></input></td><td>" + ArrayAcceso[itemArray].Nit_ID + " - " + ArrayAcceso[itemArray].DescripEmpresa + "</td><td>" + ArrayAcceso[itemArray].PuertaAcceso_ID + " - " + ArrayAcceso[itemArray].DescripPAcceso + "</td><td>" + +ArrayAcceso[itemArray].Area_ID + " - " + ArrayAcceso[itemArray].DescripArea + "</td><td>" + ArrayAcceso[itemArray].UsuarioCreacion + "</td><td>" + ArrayAcceso[itemArray].FechaCreacion + "</td><td>" + ArrayAcceso[itemArray].UsuarioActualizacion + "</td><td>" + ArrayAcceso[itemArray].FechaActualizacion + "</td></tr>";
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
    editID = ArrayAcceso[Index_GrpDocumento].PuertaAcceso_ID;
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

//llamado de mensajes
function Mensaje_General(Title, Msn, Type) {
    $("#dialog").dialog("open");
    $("#dialog").dialog("option", "title", Title);
    $("#Mensaje_alert").text(Msn);

    switch (Type) {
        case "E":
            $("#DE").css("display", "block");
            $("#SE").css("display", "none");
            $("#WE").css("display", "none");
            break;

        case "W":
            $("#DE").css("display", "none");
            $("#SE").css("display", "none");
            $("#WE").css("display", "block");
            break;

        case "S":
            $("#DE").css("display", "none");
            $("#SE").css("display", "block");
            $("#WE").css("display", "none");
            break;
    }
}