/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Ok(vp_State) {
    //OpenContHuellas();
    console.log("Entró AJAX");
    $.ajax({
        url: "HuellasAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": vp_State,
            "tabla": 'Huellas'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            console.log("Result: "+result);
            mensaje = mensaje + "\n" + result;
        },
        error: function () {

        }
    });
}
