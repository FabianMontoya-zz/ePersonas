//MUESTRA CAMPOS ANEXOS PARA LAFECHAS PROGRESIVAS
function Change_Tipo_Calendario() {
    $("#Select_TipoCalendario").change(function () {
        index_ID = $(this).val();
        switch (index_ID) {

            case "1":
                $("#Tabla_10").css("display", "none");
                break;

            case "2":
                $("#Tabla_10").css("display", "inline-table");
                break;
        }
    });
}

//validamos fechas
function ValidaFechas() {

    var valida = 1;
    var VF_Vacia = validarCamposFechas()

    switch (VF_Vacia) {
        case 1:
            Mensaje_General("Advertencia!", "Los campos fecha estan vacios revise por favor!", "W");
            break;

        case 0:
            var VF = validate_fechaMayorQue($("#TxtF_Start").val(), $("#TxtF_End").val(), "DefaultCompare");

            switch (VF) {
                case "Menor":
                    Mensaje_General("Advertencia!", "La fecha final es Menor qu la fecha inicial!", "W");
                    break;
                case "Mayor":
                    valida = 0;
                   break;
            }
            break;
    }
    return valida;
}