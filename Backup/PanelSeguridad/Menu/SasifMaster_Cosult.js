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
});


/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Titulo(State, TypeMaster) {
    $.ajax({
        url: "/procesos_generales/SasifMasterAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
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
                $("#logo_1").attr("src", ArraySasif[0].LogoSasif);
                $("#logo_2").attr("src", ArraySasif[0].LogoEmpresa);
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
        data: { "action": State
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
        data: { "action": State
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