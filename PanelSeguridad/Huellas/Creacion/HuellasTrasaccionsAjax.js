/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Ok(vp_State) {
    $.ajax({
        url: "HuellasAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": vp_State,
            "tabla": 'Huellas',
            "user": User.toUpperCase()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            var Resultado = DowloadFile(result);
            if (Resultado = true) {
                Mensaje_General("Cargar Archivo de Huella","Ejecute el archivo descargado, este ejecutará el capturador de huellas, luego cargue el archivo *.fpt al servidor.","W")
            }
        },
        error: function () {

        }
    });
}
