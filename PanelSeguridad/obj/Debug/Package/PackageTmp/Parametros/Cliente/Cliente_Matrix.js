var A = [];
var P = [];
var A_0 = [];
var A_C = 0;
var A0 = 0;
var C_P = 0;

function M_Regimen() {
    Json_Regimen = { "ID": "1", "descripcion": "Régimen Común", "TypePersona": "PN" };
    ArrayRegimen.push(Json_Regimen);
    Json_Regimen = { "ID": "2", "descripcion": "Régimen Simplificado", "TypePersona": "PN" };
    ArrayRegimen.push(Json_Regimen);
    Json_Regimen = { "ID": "3", "descripcion": "Gran Contribuyente/Auto Retenedor", "TypePersona": "PJ" };
    ArrayRegimen.push(Json_Regimen);
    Json_Regimen = { "ID": "1", "descripcion": "Régimen Común", "TypePersona": "PJ" };
    ArrayRegimen.push(Json_Regimen);
    Json_Regimen = { "ID": "4", "descripcion": "Régimen Especial", "TypePersona": "PJ" };
    ArrayRegimen.push(Json_Regimen);
}

//crea la matrix de pais
function F_Matrix_pais() {

    var JJ = 0;    //CONTADOR TABLA  1
    var II = 0;    //CONTADOR DE REGISTROS X PAIS
    var PAIS_ID = 0;

    for (Item in Matrix_Ciudad) {

        var Json_Matrix_Pais;
        if (Matrix_Ciudad[Item].Ciudades_ID == 0) {
            Json_Matrix_Pais = { "ID": Matrix_Ciudad[II].Pais_ID, "descripcion": Matrix_Ciudad[II].DescripPais, "IndexInicial": 0, "IndexFinal": 0 };
            C_P = C_P + 1
            Matrix_Pais.push(Json_Matrix_Pais);
            JJ = JJ + 1;
            A_0[A0] = JJ - 1;
            A0 = A0 + 1;
        }
        else {
            Json_Matrix_Pais = { "ID": Matrix_Ciudad[II].Pais_ID, "descripcion": Matrix_Ciudad[II].DescripPais, "IndexInicial": JJ, "IndexFinal": 0 };

            if (Matrix_Ciudad[Item].Pais_ID == PAIS_ID) {
                JJ = JJ + 1;
            }
            else {
                PAIS_ID = Matrix_Ciudad[Item].Pais_ID;
                P[A_C] = C_P;
                Matrix_Pais.push(Json_Matrix_Pais);
                C_P = C_P + 1
                A[A_C] = JJ;
                A_C = A_C + 1;
            }
        }
        II = II + 1;
    }
    V2();
}


//carga el combo de Ciudades
function Change_Select_pais() {
    $("#Select_Pais").change(function () {
        var Select_Pais = $(this).val();
        $('#Select_Ciudad').empty();
        $('#Select_Ciudad_Doc').empty();
        Charge_CatalogList_Matriz_Depend(Matrix_Pais, Matrix_Ciudad, Select_Pais, "Select_Ciudad", 1, "");
        Charge_CatalogList_Matriz_Depend(Matrix_Pais, Matrix_Ciudad, Select_Pais, "Select_Ciudad_Doc", 1, "");
    });

    $("#Select_Pais_D").change(function () {
        var Select_Pais = $(this).val();

        $('#Select_Ciudad_D').empty();
        Charge_CatalogList_Matriz_Depend(Matrix_Pais, Matrix_Ciudad, Select_Pais, "Select_Ciudad_D", 1, "");
    });
}

//creacion de combo Ciudad
function Charge_CatalogList_Matriz_Depend(M1, M2, Select_Pais, selector, type, Select_Ciudad) {

    var Index_Inicial;
    var Index_Final;
    var CC = 0;

    for (ItemMatrix in M1) {
        if (Select_Pais == M1[ItemMatrix].ID) {
            Index_Inicial = M1[ItemMatrix].IndexInicial;
            Index_Final = M1[ItemMatrix].IndexFinal;
        }
    }

    var objList = $('[id$=' + selector + ']');

    for (Index_Inicial; Index_Inicial <= Index_Final; Index_Inicial++) {
        $("#" + selector).append("<option value='" + M2[Index_Inicial].Ciudades_ID + "'>" + M2[Index_Inicial].Descripcion + "</option>");
    }

    //validamos si el combo lleva seleccione y posicionamos en el
    if (type == 1 && Select_Ciudad == "") {
        $("#" + selector).append("<option value='-1'>Seleccione...</option>");
        $("#" + selector + " option[value= '-1'] ").attr("selected", true);
    }
    console.log(Select_Ciudad);

    if (Select_Ciudad != "") {
        $("#" + selector).append("<option value='-1'>Seleccione...</option>");
        $("#" + selector + " option[value= '" + Select_Ciudad + "'] ").attr("selected", true);
    }

    $("#" + selector).trigger("liszt:updated");
    $('.C_Chosen').trigger('chosen:updated');

}

//carga el combo de regimen
function Change_Select_TPersona(index, Regimen) {

    if (index == "") {
        $("#Select_TPersona").change(function () {

            $('#Select_Regimen').empty();
            index = $(this).val();

            var objList = $("[id$='Select_Regimen']");

            if (index == 1) {
                for (Item_N in ArrayRegimen) {
                    if (ArrayRegimen[Item_N].TypePersona == "PN") {
                        $("#Select_Regimen").append("<option value='" + ArrayRegimen[Item_N].ID + " '>" + ArrayRegimen[Item_N].descripcion + "</option>");
                    }
                }
                $("#Select_Regimen").append("<option value='-1'>Seleccione...</option>");
                $("#Select_Regimen option[value= '-1'] ").attr("selected", true);
            }
            else {
                for (Item_N in ArrayRegimen) {
                    if (ArrayRegimen[Item_N].TypePersona == "PJ") {
                        $("#Select_Regimen").append("<option value='" + ArrayRegimen[Item_N].ID + " '>" + ArrayRegimen[Item_N].descripcion + "</option>");
                    }
                }
                $("#Select_Regimen").append("<option value='-1'>Seleccione...</option>");
                $("#Select_Regimen option[value= '-1'] ").attr("selected", true);
            }
            $("#Select_Regimen").trigger("liszt:updated");
            $('.C_Chosen').trigger('chosen:updated');
        });
    }
    else {
        $('#Select_Regimen').empty();

        var objList = $("[id$='Select_Regimen']");

        if (index == 1) {
            for (Item_N in ArrayRegimen) {
                if (ArrayRegimen[Item_N].TypePersona == "PN") {
                    $("#Select_Regimen").append("<option value='" + ArrayRegimen[Item_N].ID + " '>" + ArrayRegimen[Item_N].descripcion + "</option>");
                }
            }
            $("#Select_Regimen").append("<option value='-1'>Seleccione...</option>");
            $("#Select_Regimen option[value= '" + Regimen + "'] ").attr("selected", true);
        }
        else {
            for (Item_N in ArrayRegimen) {
                if (ArrayRegimen[Item_N].TypePersona == "PJ") {
                    $("#Select_Regimen").append("<option value='" + ArrayRegimen[Item_N].ID + " '>" + ArrayRegimen[Item_N].descripcion + "</option>");
                }
            }
            $("#Select_Regimen").append("<option value='-1'>Seleccione...</option>");
            $("#Select_Regimen option[value= '" + Regimen + "'] ").attr("selected", true);
        }
        $("#Select_Regimen").trigger("liszt:updated");
        $('.C_Chosen').trigger('chosen:updated');
    }
}




//carga el combo de Area dependiente
function Change_Select_Nit() {
    $("#Select_EmpresaNit").change(function () {
        var index_ID = $(this).val();
        Charge_Combos_Depend_Nit(Matrix_Area, "Select_Area", index_ID, "");
        Charge_Combos_Depend_Nit(Matrix_Cargo, "Select_Cargo", index_ID, "");
        Charge_Combos_Depend_Nit(Matrix_Jefe, "Select_Jefe", index_ID, "");
        Charge_Combos_Depend_Nit(Matrix_GrpDocumentos, "Select_GrpDocument", index_ID, "");
    });
}
