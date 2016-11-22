
/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Consulta(State) {
    $.ajax({
        url: "R_Persona_TarjetaAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "tabla": 'Consulta'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayConsulta = [];
            }
            else {
                ArrayConsulta = JSON.parse(result);
                Table_Tarjetas();
            }
        },
        error: function () {

        }
    });
}

