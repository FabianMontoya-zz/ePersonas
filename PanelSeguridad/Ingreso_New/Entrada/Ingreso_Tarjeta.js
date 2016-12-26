/*--------------- region de variables globales --------------------*/
var Tarjeta_Proccess = 0;
var Process_Manual_Ingreso = 0;
/*--------------- region de variables globales --------------------*/

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                           REGION DE VALIDACIONES                                                                                                   ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//captura tarjeta y muestra 
function Capture_Tarjeta_ID() {
    $("#TxtIDTarjeta").change(function () {
        var Tarjeta_ID = $(this).val();

        Tarjeta_Proccess = 1;
        if (Tarjeta_ID.length == 10) {
            $("#TxtIDTarjeta").attr("disabled", "disabled");
            $("#Btnguardar").attr("value", "Nueva Consulta");
            transacionAjax_ShearchPeopleAccess("Search_People_Access", $("#Select_Documento").val(), $("#TxtDoc").val(), 0, Tarjeta_ID);
        }
        else {
            $("#TxtIDTarjeta").removeAttr("disabled");
        }
    });
}
