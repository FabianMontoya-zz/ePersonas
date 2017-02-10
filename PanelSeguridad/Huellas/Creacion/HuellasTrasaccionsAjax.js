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
            var ArrayInformationFile = [];
            ArrayInformationFile = JSON.parse(result);
            var a = document.createElement('a');

            if (typeof a.download != "undefined") {
                var save = document.createElement('a');
                save.href = "http://" + ArrayInformationFile[0].RutaOrigen
                save.target = '_blank';
                save.download = ArrayInformationFile[0].NombreDescarga;
                var clicEvent = new MouseEvent('click', {
                    'view': window,
                    'bubbles': true,
                    'cancelable': true
                });
                save.dispatchEvent(clicEvent);
                (window.URL || window.webkitURL).revokeObjectURL(save.href);
                Mensaje_General("Navegador no Soportado", "El navegador actual no soporta la sentencia usada para la transferencia del archivo, deberá ejecutar la aplicación usted mismo.", "E");
            }
            else {
                Mensaje_General("Navegador no Soportado", "El navegador actual no soporta la sentencia usada para la transferencia del archivo, por favor reintenta con otro navegador.", "E");
            }
        },
        error: function () {

        }
    });
}
