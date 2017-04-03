/*--------------- region de variables globales --------------------*/
var ArraySasif = [];
var ArrayMensajes = [];
var ArrayAyudas = [];
/*--------------- region de variables globales --------------------*/

//evento load de los master page
$(document).ready(function () {
    transacionAjax_Men("Men");
    transacionAjax_Ayu("Ayu");
    transacionAjax_Titulo("encabezado", "2");
    transacionAjax_InfoUser("Date_User", Encrip, User);
});

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Titulo(State, TypeMaster) {
    $.ajax({
        url: "/procesos_generales/SasifMasterAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "ID": TypeMaster
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArraySasif = [];
            }
            else {
                ArraySasif = JSON.parse(result);
                $("#Parraf_1").html(ArraySasif[0].parrafo_1);
                $("#Parraf_2").html(ArraySasif[0].parrafo_2);
                $("#Parraf_3").html(ArraySasif[0].parrafo_3);
                $("#tituloPrincipal").html(ArraySasif[0].Titulo);
                $("#tituloPrincipal_2").html(ArraySasif[0].Titulo);
                $("#logo_1").attr("src", ArraySasif[0].LogoSasif);
                $("#logo_2").attr("src", ArraySasif[0].LogoEmpresa);
                $("#logo_2_W").attr("src", ArraySasif[0].LogoSasif_2);
            }

        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Men(State) {
    $.ajax({
        url: "/procesos_generales/SasifMasterAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayMensajes = [];
            }
            else {
                ArrayMensajes = JSON.parse(result);
                setTimeout("RevisarMensajes();", 200);
            }
        },
        error: function () {
        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Ayu(State) {
    $.ajax({
        url: "/procesos_generales/SasifMasterAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayAyudas = [];
            }
            else {
                ArrayAyudas = JSON.parse(result);
                setTimeout("RevisarAyudas();", 200);
            }
        },
        error: function () {
        }
    });
}

//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_InfoUser(vp_State, vp_Nit_ID_Encrip, vp_User_ID) {

    $.ajax({
        url: "/Menu/menuAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": vp_State,
            "NIT": vp_Nit_ID_Encrip,
            "Usuario": vp_User_ID
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
        transacionAjax("consulta");

    });
}

//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax(vp_State) {
    $.ajax({
        url: "/Menu/menuAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": vp_State,
            "User": Array_G_Usuario[0].Usuario_ID,
            "Rol_User": Array_G_Usuario[0].Rol_ID,
            "Nit_Rol_User": Array_G_Usuario[0].Rol_Nit_ID,
            "Encrip": Encrip
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayMenu = [];
            }
            else {
                ArrayMenu = JSON.parse(result);
                for (ItemArray in ArrayMenu) {
                    if (Link == ArrayMenu[ItemArray].IDlink) {
                        $("#Title_form").html(ArrayMenu[ItemArray].DescripcionLink);
                    }
                }
                arbol();
            }
        },
        error: function () {
            Mensaje_General("¡Disculpenos!", "Se generó un error al realizar la transacción y no se completó la tarea.", "E");
        },
        async: false,
        cache: false
    }).done(function () {
        Capture_Nit_User();
    });
}
