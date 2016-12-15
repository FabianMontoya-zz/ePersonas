/*--------------- region de variables globales --------------------*/
var ArrayStrAdress = [];

var A = [];
var P = [];
var A_0 = [];
var A_C = 0;
var A0 = 0;
var C_P = 0;
var Tipo_Activo;
var Index_Modelo;
var Option_Blindaje = 0;
/*--------------- region de variables globales --------------------*/

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                    CHANGE DE DROP LIST                                                                                                       ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//carga el combo 
function Change_Select_Nit() {
    $("#Select_EmpresaNit").change(function () {
        $("#Select_EmpresaNit").attr("disabled", "disabled");
        var index_ID = this.value;
        Charge_Combos_Depend_Nit(Matrix_Sucursal, "Select_Sucursal", index_ID, "");
        Charge_Combos_Depend_Nit(Matrix_Personas, "Select_Persona_A", index_ID, "");
    });
}

//MUESTRA LOS CAMPOS DE BLINDAJE
function Change_Select_blindaje() {
    $("#Select_Blindaje").change(function () {
        var index_ID = this.value;

        if (index_ID == "S") {
            $("#T_Datos_Identificacion_blin").css("display", "inline-table");
            Option_Blindaje = 1;
        }
        else {
            $("#T_Datos_Identificacion_blin").css("display", "none");
            Option_Blindaje = 0;
        }
    });
}

//coloca la sigla de la moneda
function Change_Select_Moneda() {
    $("#Select_Moneda").change(function () {
        var index_ID = this.value;
        for (item in Matrix_Moneda) {
            if (Matrix_Moneda[item].MonedaCod_ID == index_ID) {
                $("#V_Sigla_1").html(Matrix_Moneda[item].Sigla);
                $("#V_Sigla_2").html(Matrix_Moneda[item].Sigla);
                $("#V_Sigla_3").html(Matrix_Moneda[item].Sigla);
                $("#V_Sigla_4").html(Matrix_Moneda[item].Sigla);
                $("#V_Sigla_5").html(Matrix_Moneda[item].Sigla);
                $("#V_Sigla_6").html(Matrix_Moneda[item].Sigla);
                $("#V_Sigla_7").html(Matrix_Moneda[item].Sigla);
                $("#V_Sigla_8").html(Matrix_Moneda[item].Sigla);
            }
        }
    });
}

//carga los subtipos
function Change_Select_TA() {
    $("#Select_Tipo").change(function () {
        var index_ID = this.value;
        Charge_Combos_Depend_Nit(Matrix_RTSTA, "Select_SubTipo", index_ID, "");

        switch (index_ID) {
            case "1":
                $("#TitleActivo_2").html($("#Select_Tipo option:selected").html());
                $("#Tabla_LLave_Inmueble").css("display", "inline-table");
                $("#Tabla_LLave_Vehiculos").css("display", "none");
                $("#Blo_Inmuebles").css("display", "inline-table");
                $("#Blo_Fasecolda").css("display", "none");
                $("#B_I").css("display", "inline-table");
                $("#B_V").css("display", "none");

                Tipo_Activo = 1;
                break;

            case "2":
                $("#TitleActivo_2").html($("#Select_Tipo option:selected").html());
                $("#Tabla_LLave_Inmueble").css("display", "none");
                $("#Tabla_LLave_Vehiculos").css("display", "inline-table");
                $("#Blo_Inmuebles").css("display", "none");
                $("#Blo_Fasecolda").css("display", "inline-table");
                $("#Txtkey_1").html("Placa");
                $("#B_I").css("display", "none");
                $("#B_V").css("display", "inline-table");
                $("#T_llave_Act").html("Placa");

                Year_work = Captura_parametro();
                Tipo_Activo = 2;
                break;

            case "-1":
                $("#TitleActivo_2").html("Activo");
                $("#Tabla_LLave_Inmueble").css("display", "none");
                $("#Tabla_LLave_Vehiculos").css("display", "inline-table");
                $("#Blo_Inmuebles").css("display", "none");
                $("#Blo_Fasecolda").css("display", "none");
                $("#Txtkey_1").html("C. Identificación");
                $("#B_I").css("display", "none");
                $("#B_V").css("display", "none");
                $("#T_llave_Act").html("C. Identificación");

                Tipo_Activo = 0;
                break;

            default:
                $("#TitleActivo_2").html($("#Select_Tipo option:selected").html());
                $("#Tabla_LLave_Inmueble").css("display", "none");
                $("#Tabla_LLave_Vehiculos").css("display", "inline-table");
                $("#Blo_Inmuebles").css("display", "none");
                $("#Blo_Fasecolda").css("display", "none");
                $("#B_I").css("display", "none");
                $("#B_V").css("display", "inline-table");
                $("#T_llave_Act").html("C. Identificación");
                $("#Txtkey_1").html("C. Identificación");
                break;
        }
    });
}

//carga marcas segun la clase
function Change_Select_Clase() {
    $("#Select_ClaseF").change(function () {
        var index_ID = this.value;
        Clase_Index = index_ID;
        $("#Select_LineaF").empty();
        Charge_Combos_Depend_Nit(Matrix_MarcaClase_F, "Select_MarcaF", index_ID, "");
    });
}

//carga lineas  segun la marca y clase
function Change_Select_Marca() {
    $("#Select_MarcaF").change(function () {
        var index_ID = this.value;
        Charge_Combos_Depend_Verificacion(Matrix_LineaMarcaClase_F, "Select_LineaF", index_ID, Clase_Index, "");
    });
}

//muestra los campos de diligenciamiento fasecolda
function Change_Select_Modelo() {
    $("#Select_modelo").change(function () {
        Index_Modelo = this.value;
    });
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                     PROCESO DE CARGUE PAIS CIUDAD                                                                                                                                       ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

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
    CargaPais();
}

//revicion y carge de combos paises
function CargaPais() {
    for (e = 0; e < A.length; e++) {
        i = 0;
        for (i = 0; i < A_0.length; i++) {
            if (A[e] - 1 == A_0[i]) {
                var Val_F = A_0[i + 1] + e;
                Matrix_Pais[P[e]].IndexFinal = Val_F;
            }
        }
    }
    charge_CatalogList(Matrix_Pais, "Select_Pais_U", 1);
    charge_CatalogList(Matrix_Pais, "Select_Pais_R", 1);
}

//carga el combo de Ciudades
function Change_Select_pais() {
    $("#Select_Pais_U").change(function () {
        var Select_Pais = $(this).val();
        $('#Select_Ciudad_U').empty();
        Charge_CatalogList_Matriz_Depend(Matrix_Pais, Matrix_Ciudad, Select_Pais, "Select_Ciudad_U", 1, "");
    });

    $("#Select_Pais_R").change(function () {
        var Select_Pais = $(this).val();
        $('#Select_Ciudad_R').empty();
        Charge_CatalogList_Matriz_Depend(Matrix_Pais, Matrix_Ciudad, Select_Pais, "Select_Ciudad_R", 1, "");
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
