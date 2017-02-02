var Array_G_Usuario = [];
var User_ID = "";
var Nit_ID = "";
//evento load del Cambio de password
$(document).ready(function () {
    //capturamos la url
    ConsultaParametrosURL();
    transacionAjax_InfoUser("Information");
    User_ID = Array_G_Usuario[0].Usuario_ID;
    Nit_ID = Array_G_Usuario[0].Nit_ID;
    $("#TdUser").html(User_ID);
    $("#User").html(User_ID);

    //evento del boton ingresar
    $("#BtnCambiar").click(function () {
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
    });

    //evento del boton salir
    $("#BtnExit").click(function () {
        window.location = "../login/Login.aspx"
    });


    $('#show').attr('checked', false);

    //funcion para las ventanas emergentes
    $("#dialog").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true
    });

    $("#E1").css("display", "none");
    $("#S1").css("display", "none");
    $("#E2").css("display", "none");
    $("#S2").css("display", "none");
    $("#DE").css("display", "none");
    $("#DS").css("display", "none");
    $("#BtnExit").css("display", "none");

    /*MostarContraseña();*/
    /*ValidarCamposIguales();*/
    No_Back_Button();
});

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

//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax(State) {
    $.ajax({
        url: "CambioPasswordAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "user": User_ID,
            "Nit_ID": Nit_ID,
            "password": $("#TxtPassword").val()
        },
       //Transaccion Ajax en proceso
        success: function (result) {

            No_Back_Button();
            if (result == "Exito") {

                $("#dialog").dialog("option", "title", "Exito");
                $("#Mensaje_alert").text("Su contraseña fue modificada exitosamente! ");
                $("#dialog").dialog("open");
                $("#DS").css("display", "block");
                $("#BtnExit").css("display", "block");


            } else {

                $("#dialog").dialog("option", "title", "Disculpenos :(");
                $("#Mensaje_alert").text("No se realizo el cambio de clave!");
                $("#dialog").dialog("open");
                $("#DE").css("display", "block");
                $("#BtnExit").css("display", "block");

            }

        },
        error: function () {
            $("#dialog").dialog("option", "title", "Disculpenos :(");
            $("#Mensaje_alert").text("Se genero error al realizar la transacción Ajax!");
            $("#dialog").dialog("open");
            $("#DE").css("display", "block");
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
    });
}



