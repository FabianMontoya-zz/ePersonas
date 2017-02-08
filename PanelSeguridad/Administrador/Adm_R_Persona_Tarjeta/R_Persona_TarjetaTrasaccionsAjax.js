
/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MTarjeta(State) {
    console.log("TAr");
    $.ajax({
        url: "R_Persona_TarjetaAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'RUTA',
            "Nit": $("#Select_EmpresaNit").val()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Tarjeta = [];
            }
            else {
                Matrix_Tarjeta = JSON.parse(result);
                
            }
        },
        error: function () {
        },
    }).done(function () {
        console.log($("#Select_EmpresaNit").val())
        Charge_Combos_Depend_Nit(Matrix_Tarjeta, "Select_Tarjeta", $("#Select_EmpresaNit").val(), "");
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MPersona(State) {
    console.log("cc2");
    $.ajax({
        url: "R_Persona_TarjetaAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'RUTA',
            "Nit": $("#Select_EmpresaNit").val()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Persona = [];
            }
            else {
                Matrix_Persona = JSON.parse(result);
            }
        },
        error: function () {
        },
        async: false, // La petición es síncrona
        cache: false // No queremos usar la caché del navegador
    }).done(function () {
        Charge_Combos_Depend_Nit(Matrix_Persona, "Select_Persona", $("#Select_EmpresaNit").val(), "");

    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_EmpresaNit(State) {
    $.ajax({
        url: "R_Persona_TarjetaAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'CLIENTE',
            "Nit": $("#Select_EmpresaNit").val()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayEmpresaNit = [];
            }
            else {
                ArrayEmpresaNit = JSON.parse(result);
                charge_CatalogList(ArrayEmpresaNit, "Select_EmpresaNit", "Generico");
                charge_CatalogList(ArrayEmpresaNit, "Select_EmpresaNit_2", 1);
            }
        },
        error: function () {

        },
        async: false, // La petición es síncrona
        cache: false // No queremos usar la caché del navegador
    }).done(function () {
        var OnlyEmpresa = VerificarNIT("Select_EmpresaNit");

        if (OnlyEmpresa == true) {
            TransaccionesSegunNIT($("#Select_EmpresaNit").val());
        }
    });
}

/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_R_Persona_Tarjeta_create(State) {
    var StrPersona = $("#Select_Persona option:selected").html();
    var SPersona = StrPersona.split("  -  ");

    undefined
    $.ajax({
        url: "R_Persona_TarjetaAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "Nit_ID": $("#Select_EmpresaNit").val(),
            "Nit_ID_Asig": $("#Select_EmpresaNit_2").val(),
            "TDoc": SPersona[1],
            "Doc": SPersona[0],
            "Tarjeta": $("#Select_Tarjeta").val(),
            "user": User.toUpperCase()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    $("#dialog").dialog("option", "title", "Disculpenos :(");
                    $("#Mensaje_alert").text("No se realizo  la asignación de la tarjeta!");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "block");
                    $("#SE").css("display", "none");
                    $("#WA").css("display", "none");
                    break;

                case "Existe":
                    $("#dialog").dialog("option", "title", "Ya Existe");
                    $("#Mensaje_alert").text("El codigo ingresado ya existe en la base de datos!");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "None");
                    $("#SE").css("display", "none");
                    $("#WE").css("display", "block");
                    break;

                case "Exito":
                    $("#dialog").dialog("option", "title", "Exito");
                    $("#Mensaje_alert").text("La asignación de la tarjeta fue generada exitosamente! ");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "none");
                    $("#SE").css("display", "block");
                    $("#WA").css("display", "none");
                    transaccionAjax_MTarjeta('MATRIX_TARJETA');
                    Clear();
                    break;
            }

        },
        error: function () {

        }
    }).done(function () {
        console.log("cc3");
    });
}

