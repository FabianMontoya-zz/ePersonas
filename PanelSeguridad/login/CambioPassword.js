/*--------------- region de variables globales --------------------*/
var Array_G_Usuario = [];
var User_ID = "";
var Nit_ID = "";
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {
    //capturamos la url
    ConsultaParametrosURL();
    Ventanas_Emergentes();
    Ocultar_Errores();

    transacionAjax_InfoUser("Information");
  
});

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                 REGION INICIO DE COMPONENTES                                                                                                    ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//Función que oculta todas las IMG de los errores en pantalla
function Ocultar_Errores() {
    $("#E1").css("display", "none");
    $("#S1").css("display", "none");
    $("#E2").css("display", "none");
    $("#S2").css("display", "none");
    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WA").css("display", "none");
}

//funcion para las ventanas emergentes
function Ventanas_Emergentes() {

    //funcion para las ventanas emergentes
    $("#dialog").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true
    });


}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                 REGION BOTONES                                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//boton verifica y cambia contraseña
function BtnCambioPassword() {
    //llamamos la funcion de validar
    var flag_campos = ValidarCampos();
    if (flag_campos === 0) {
        $('#TxtPassword').keyup(function () {
            $("#E2").css("display", "none");
            $("#E1").css("display", "none");
        });
        //llamamos la funcion de campos
        RevisarContraseña();
    }
}

//evento del boton salir
function BtnRedirect() {
    window.location = "../login/Login.aspx"
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                      REGION VALIDACIONES DEL PROCESO                                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//valida comparacion de contraseñas
function RevisarContraseña() {
    var campo_1 = $('#TxtPassword').val();
    var campo_2 = $('#txtConfirmPassword').val();

    if (campo_1 == "") {
        $("#TxtPassword").focus();
        $('#TxtPassword').val("");
        $('#txtConfirmPassword').val("");
        $("#E1").css("display", "-webkit-inline-box");
        $("#E1").attr("title", "Debe diligenciar primero el campo (Digite Contraseña)");
    }
    else {
        $("#E1").css("display", "none");
        //validamos si los campos son iguales
        if (campo_1 == campo_2) {
            //llamamos funcion ajax
            transacionAjax("Cambiar");
        }
        else {
            $("#E1").css("display", "-webkit-inline-box");
            $("#E2").css("display", "-webkit-inline-box");
            $("#E1").attr("title", "Contraseña no coincide");
            $("#E2").attr("title", "Contraseña no coincide");
        }
    }
}

//validamos los campos de captura
function ValidarCampos() {
    var password = $("#TxtPassword").val();
    var passwordConfirm = $("#txtConfirmPassword").val();

    var flag_valida = 0;

    if (passwordConfirm === "" || password === "") {
        flag_valida = 1;
        if (passwordConfirm === "") {
            $("#E2").css("display", "-webkit-inline-box");
            $("#E2").attr("title", "Requiere contraseña");
            $("#txtConfirmPassword").attr("title", "Digite contraseña");
        }
        else {
            $("#E2").css("display", "none");
        }
        if (password === "") {
            $("#E1").css("display", "-webkit-inline-box");
            $("#E1").attr("title", "Requiere contraseña");
            $("#TxtPassword").attr("title", "Digite contraseña");
        }
        else {
            $("#E1").css("display", "none");
        }
    }
    else {
        $("#E2").css("display", "none");
        $("#E1").css("display", "none");
    }
    return flag_valida;
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                      TRANSACCIONES AJAX                                                                                                            ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax(State) {
    $.ajax({
        url: "CambioPasswordAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "user": User_ID,
            "Nit_ID": Nit_ID,
            "password": $("#TxtPassword").val()
        },
        //Transaccion Ajax en proceso
        success: function (result) {

            if (result == "Exito") {
                Mensaje_General("Exito", "Su contraseña fue modificada exitosamente! ", "S");
            } else {
                Mensaje_General("Disculpenos :(", "No se realizo el cambio de clave! ", "E");
            }

        },
        error: function () {
            Mensaje_General("Disculpenos :(", "Se genero error al realizar la transacción Ajax! ", "E");
        }
    });
}

//*-------------------- Hace JSON con Todos los datos del User y da acceso al sistema ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_InfoUser(vp_State) {

    $.ajax({
        url: "CambioPasswordAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": vp_State,
            "NITEncrip": Encrip,
            "Usuario": User
        },
        success: function (result) {
            if (result == "") {
                Array_G_Usuario = [];
            }
            else {
                Array_G_Usuario = JSON.parse(result);
            }
        },
        error: function () {
            Mensaje_General("¡Disculpenos!", "Se generó un error al realizar la transacción y no se completó la tarea.", "E");
        },
        async: false, // La petición es síncrona
        cache: false // No queremos usar la caché del navegador
    }).done(function () {
        Capture_Nit_User();
        User_ID = Array_G_Usuario[0].Usuario_ID;
        Nit_ID = Array_G_Usuario[0].Nit_ID;
        $("#TdUser").html(User_ID);
        $("#User").html(User_ID);
    });
}



