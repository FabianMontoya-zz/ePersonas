/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                          LISTAS DE CARGA                                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------- Carga combo NIT ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_EmpresaNit(State) {
    $.ajax({
        url: "LoginAjax.aspx",
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
                charge_CatalogList(ArrayEmpresaNit, "Select_EmpresaNit", 1);
            }
            nobackbutton();
        },
        error: function () {

        }
    });
}
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                          CONSULTAS EN PROCESO                                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------- Validación Usuario ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax 
function transacionAjax(vp_State) {
    $.ajax({
        url: "LoginAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": vp_State,
            "NIT": $("#Select_EmpresaNit").val(),
            "user": $("#TxtUser").val().toUpperCase(),
            "password": $("#TxtPassword").val()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            result = JSON.parse(result);
            switch (result) {

                case 0: //ingresa
                    transacionAjax_AllInfoUser("Loggear", $("#Select_EmpresaNit").val(), $("#TxtUser").val().toUpperCase());
                    //window.location = "../Menu/menu.aspx?User=" + $("#TxtUser").val();
                    break;
                case 1: //contraseña incorrecta
                    $("#EPassword").css("display", "inline-table");
                    $("#S_Pass").html(ArrayMensajes[4].Mensajes_ID + ": " + ArrayMensajes[4].Descripcion);
                    $("#TxtPassword").focus();
                    $("#TxtPassword").select();
                    break;
                case 2: //no existe usuario
                    $("#EUser").css("display", "inline-table");
                    $("#ImgNIT").css("display", "inline-table");
                    $("#S_User").html(ArrayMensajes[6].Mensajes_ID + ": " + ArrayMensajes[6].Descripcion);
                    $("#S_NIT").html(ArrayMensajes[6].Mensajes_ID + ": " + ArrayMensajes[6].Descripcion);

                    $("#TxtPassword").val("");
                    $("#TxtUser").focus();
                    $("#TxtUser").select();
                    break;
                case 3: // cambio de contraseña
                    window.location = "../login/CambioPassword.aspx?User=" + $("#TxtUser").val();
                    break
                case 4: //usuario deshabilitado

                    $("#TxtPassword").val("");
                    $("#TxtUser").focus();
                    $("#TxtUser").select();
                    Mensaje_General("¡Usuario Desactivado!", ArrayMensajes[8].Mensajes_ID + ": " + ArrayMensajes[8].Descripcion, "W");
                    break;
                case 5: //usuario eliminado

                    $("#TxtPassword").val("");
                    $("#TxtUser").focus();
                    $("#TxtUser").select();
                    Mensaje_General("¡Usuario Eliminado!", ArrayMensajes[10].Mensajes_ID + ": " + ArrayMensajes[10].Descripcion, "E");
                    break;
            }

        },
        error: function () {
            Mensaje_General("¡Disculpenos!", "Se generó un error al realizar la transacción y no se completó la tarea.", "E");
        },
        async: false, // La petición es síncrona
        cache: false // No queremos usar la caché del navegador
    });

}

/*-------------------- Hace JSON con Todos los datos del User y da acceso al sistema ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_AllInfoUser(vp_State, vp_Nit_ID, vp_User_ID) {

    var vl_Dat_Url = $("#TxtUser").val() + "_" + $("#Select_EmpresaNit").val();
    $.ajax({
        url: "LoginAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": vp_State,
            "NIT": vp_Nit_ID,
            "Usuario": vp_User_ID
        },
        success: function (result) {
            result = JSON.parse(result);
            window.location = "../Menu/menu.aspx?User=" + vl_Dat_Url;
        },
        error: function () {

        },
        async: false, // La petición es síncrona
        cache: false // No queremos usar la caché del navegador

    });
}

