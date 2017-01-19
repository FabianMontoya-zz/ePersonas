var ArrayEmpresaNit = [];

$(document).ready(function () {

    Ventanas_Emergentes();
    Ocultar_Errores();

    transacionAjax_EmpresaNit('Cliente'); //Carga Droplist de Empresa NIT

    VerificarNIT("Select_EmpresaNit");

    $("#ImgID").css("display", "none");
    $("#ImgEstado").css("display", "none");


});

//funcion para las ventanas emergentes
function Ventanas_Emergentes() {

    Load_Charge_Sasif(); //Carga de "SasifMaster.js" el Control de Carga

    $("#dialog").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true
    });

}

//Función para ocultar las IMG de los errores
function Ocultar_Errores() {

    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WA").css("display", "none");
    $("#ImgID").css("display", "none");
    $("#ImgNIT").css("display", "none");
    $("#ImgEstado").css("display", "none");

}

//salida del formulario
function btnSalir() {
    window.location = "../../Menu/menu.aspx?User=" + $("#User").html() + "&Key=" + ArrayMenu[0].Nit + "&LINK=" + Link;
}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        transacionAjax_Reset("reset");
    }

}

//validamos campos para la creacion del link
function validarCamposCrear() {

    var valID = $("#Txt_ID").val();
    var estado = $("#DDLTipo").val();
    var NIT = $("#Select_EmpresaNit").val();

    var validar = 0;

    if (estado == "-1" || estado == null || valID == "" || NIT == "-1" || NIT == null) {
        validar = 1;
        if (valID == "") {
            $("#ImgID").css("display", "inline-table");
        }
        else {
            $("#ImgID").css("display", "none");
        }
        if (estado == "-1" || estado == null) {
            $("#ImgEstado").css("display", "inline-table");
        }
        else {
            $("#ImgEstado").css("display", "none");
        }
        if (NIT == "-1" || NIT == null) {
            $("#ImgNIT").css("display", "inline-table");
        }
        else {
            $("#ImgNIT").css("display", "none");
        }
    }
    else {
        Ocultar_Errores();
    }
    return validar;
}


/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Reset(State) {
    $.ajax({
        url: "Adm_ResetUserAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "NIT": $("#Select_EmpresaNit").val(),
            "ID": $("#Txt_ID").val(),
            "estado": $("#DDLTipo").val()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "NO") {
                Mensaje_General("¡No Existe!", "No existe ningún usuario registrado con estos datos. Por favor verifique la información.", "E");
                $("#ImgNIT").css("display", "inline-table");
                $("#ImgID").css("display", "inline-table");
            }
            else {
                Mensaje_General("Reset Exitoso", "Se ha reseteado la contraseña correctamente. Recuerde que la nueva contraseña es el mismo nombre de usuario.", "S");
            }
        },
        error: function () {

        }
    });
}

//evento del boton salir
function x() {
    $("#dialog").dialog("close");
}

/*-------------------- Carga combo NIT ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_EmpresaNit(State) {
    OpenControl();
    $.ajax({
        url: "Adm_ResetUserAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'CLIENTE'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayEmpresaNit = [];
            }
            else {
                ArrayEmpresaNit = JSON.parse(result);
                charge_CatalogList(ArrayEmpresaNit, "Select_EmpresaNit", 1);
            }
        },
        error: function () {

        },
        //Jhon
        async: false, // La petición es síncrona
        cache: false // No queremos usar la caché del navegador 
    });
}