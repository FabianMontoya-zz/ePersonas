var ArrayEmpresaNit = [];
//evento load del login
$(document).ready(function () {

    Ventanas_Emergentes();
    Ocultar_Errores();
    teclaEnter();

    $("#TxtUser").prop('disabled', true);
    $("#TxtPassword").prop('disabled', true);

    transacionAjax_EmpresaNit('Cliente'); //Carga Droplist de Empresa NIT

    Change_Select_Nit();

});

//funcion para las ventanas emergentes
function Ventanas_Emergentes() {
    $("#dialog").dialog({
        dialogClass: "Dialog_Sasif",
        modal: true,
        autoOpen: false
    });
}

//Función que oculta las Imagenes de los errores
function Ocultar_Errores() {
    $("#EPassword").css("display", "none");
    $("#EUser").css("display", "none");
    $("#ImgNIT").css("display", "none");
}

//validamos los campos de captura
function ValidarCampos() {
    var user = $("#TxtUser").val();
    var password = $("#TxtPassword").val();
    var NIT = $("#Select_EmpresaNit").val();
    var flag_valida = 0;

    if (user == "" || password == "" || NIT == "-1" || NIT == null) {
        flag_valida = 1;
        if (user === "") {
            $("#EUser").css("display", "inline-table");
            $("#S_User").html(ArrayMensajes[0].Mensajes_ID + ": " + ArrayMensajes[0].Descripcion);
        }
        else {
            $("#EUser").css("display", "none");
        }
        //
        if (password === "") {
            $("#EPassword").css("display", "inline-table");
            $("#S_Pass").html(ArrayMensajes[0].Mensajes_ID + ": " + ArrayMensajes[0].Descripcion);
        }
        else {
            $("#EPassword").css("display", "none");
        }
        //
        if (NIT == "-1" || NIT == null) {
            $("#ImgNIT").css("display", "inline-table");
            $("#S_NIT").html(ArrayMensajes[0].Mensajes_ID + ": " + ArrayMensajes[0].Descripcion);
        }
        else {
            $("#ImgNIT").css("display", "none");
        }
    }
    else {
        $("#EUser").css("display", "none");
        $("#EPassword").css("display", "none");
    }
    return flag_valida;
}

//evento del boton salir
function x() {
    $("#dialog").dialog("close");
}

//Función que ejecuta el evento Clic del Botón Entrar
function BtnEntrar() {
    var flag_campos = ValidarCampos();
    if (flag_campos === 0) {
        //llamamos la funcion de transaccion
        transacionAjax("Ingresar");
    }
}

//evento de la tecla enter
function teclaEnter() {
    $(document).keydown(function (ev) {

        if (ev.keyCode == 13) {
            var flag_campos = ValidarCampos();
            if (flag_campos === 0) {
                //llamamos la funcion de transaccion
                transacionAjax("Ingresar");
            }
        }
    });
}


/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                     PROCESOS DE CHANGES EN CONTROLES                                                                                                                                        ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

function Change_Select_Nit() {
    $("#Select_EmpresaNit").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_EmpresaNit").val() == "-1") {
            $("#ImgNIT").css("display", "inline-table");
            $("#S_NIT").html(ArrayMensajes[0].Mensajes_ID + ": " + ArrayMensajes[0].Descripcion);
            $("#TxtUser").prop('disabled', true);
            $("#TxtPassword").prop('disabled', true);
        } else {
            Ocultar_Errores();
            $("#TxtUser").prop('disabled', false);
            $("#TxtPassword").prop('disabled', false);
        }

        $("#TxtUser").val("");
        $("#TxtPassword").val("");
    });
}
