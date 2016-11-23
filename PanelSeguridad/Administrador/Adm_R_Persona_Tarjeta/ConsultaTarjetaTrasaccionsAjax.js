/*---------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_EmpresaNit(State) {
    $.ajax({
        url: "R_Persona_TarjetaAjax.aspx",
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
                charge_CatalogList(ArrayEmpresaNit, "Select_EmpresaNit", "Generico");
            }
        },
        error: function () {

        }
    });
}


/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Consulta(State, index) {
    $.ajax({
        url: "R_Persona_TarjetaAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "Nit": index,
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

