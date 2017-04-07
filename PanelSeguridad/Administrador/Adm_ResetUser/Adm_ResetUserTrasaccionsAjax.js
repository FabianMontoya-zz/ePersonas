
/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Reset(State) {
    $.ajax({
        url: "Adm_ResetUserAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "NIT": $("#Select_EmpresaNit").val(),
            "ID": $("#Txt_ID").val(),
            "estado": $("#DDLTipo").val()
        },
        //Transaccion Ajax en proceso
        success: function (result) {

            switch (result) {

                case "ACTIVO":
                    Mensaje_General("¡Esta activo!", "El usuario (" + $("#Txt_ID").val() + ") ya esta activo.", "W");
                    $("#ImgNIT").css("display", "inline-table");
                    $("#ImgID").css("display", "inline-table");
                    break;

                case "INACTIVO":
                    Mensaje_General("¡Esta desabilitado!", "El usuario (" + $("#Txt_ID").val() + ") ya esta Inactivo o Deshabilitado.", "W");
                    $("#ImgNIT").css("display", "inline-table");
                    $("#ImgID").css("display", "inline-table");
                    break;

                case "NO_EXISTE":
                    Mensaje_General("¡No Existe!", "No existe ningún usuario registrado con estos datos. Por favor verifique la información.", "E");
                    $("#ImgNIT").css("display", "inline-table");
                    $("#ImgID").css("display", "inline-table");
                    break;

                case "ELIMINADO":
                    Mensaje_General("¡Atención¡", "No  puede cambiar el estado, el usuario (" + $("#Txt_ID").val() + ") esta eliminado. .", "E");
                    $("#ImgNIT").css("display", "inline-table");
                    $("#ImgID").css("display", "inline-table");
                    break;

                case "Exito":
                    switch ($("#DDLTipo").val()) {

                        case "0":
                            Mensaje_General("Activación Exitosa", "Se ha activado el usuario (" + $("#Txt_ID").val() + ") correctamente. Por seguridad se resetea la contraseña, recuerde que la nueva contraseña es el mismo nombre de usuario.", "S");
                            Clear();
                            break;

                        case "1":
                            Mensaje_General("Inactivación o Deshabilitación Exitosa", "Se ha desabilitado el usuario (" + $("#Txt_ID").val() + ")  correctamente.", "S");
                            Clear();
                            break;

                        case "2":
                            Mensaje_General("Eliminacion Exitosa", "Se ha eliminado el usuario (" + $("#Txt_ID").val() + ") correctamente.", "S");
                            Clear();
                            break;

                        case "3":
                            Mensaje_General("Reset Exitoso", "Se ha reseteado la contraseña correctamente. Recuerde que la nueva contraseña es el mismo nombre de usuario.", "S");
                            Clear();
                            break;

                    }
                      break;
            }
        },
        error: function () {

        }
    });
}

/*-------------------- Carga combo NIT ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_EmpresaNit(State) {
     $.ajax({
        url: "Adm_ResetUserAjax.aspx",
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
        },
        error: function () {

        },
        async: false, // La petición es síncrona
        cache: false // No queremos usar la caché del navegador 
    });
}