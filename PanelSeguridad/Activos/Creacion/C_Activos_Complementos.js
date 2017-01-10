/*--------------- region de variables globales --------------------*/
var ArrayStrAdress = [];

var A = [];
var P = [];
var A_0 = [];
var A_C = 0;
var A0 = 0;
var C_P = 0;
var Tipo_Activo;

var Index_Marca;
var Index_Modelo;
var Option_Blindaje = 0;
var Nit_Proccess;
var Fasecolda_ID = 0;
var Index_ID_Fasecolda = 0;
var Opcion_Asegurado = "N";

/*--------------- region de variables globales --------------------*/

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                    CHANGE DE DROP LIST                                                                                                       ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//carga el combo 
function Change_Select_Nit() {
    $("#Select_EmpresaNit").change(function () {
        $("#Select_EmpresaNit").attr("disabled", "disabled");
        Nit_Proccess = this.value;

        Charge_Combos_Depend_Nit(Matrix_Sucursal, "Select_Sucursal", Nit_Proccess, "");
        Charge_Combos_Depend_Nit(Matrix_Personas, "Select_Persona_A", Nit_Proccess, "");
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
                transacionAjax_Marca_F("LIST_MARCA_F");
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

//verifi campo seguro
function Change_Seguro() {
    $("#Select_Asegurado").change(function () {
        Opcion_Asegurado = this.value;

        if (Opcion_Asegurado == "S") {
            $("#Tabla_poliza").css("display", "inline-table");
        }
        else {
            $("#Tabla_poliza").css("display", "none");
        }
    });
}

//carga marca linea segun la marca escogida 
function Change_Select_Marca() {
    $("#Select_MarcaF").change(function () {
        var index_ID = this.value;

        switch (index_ID) {
            case "-1":
                break;

            default:
                Index_Marca = index_ID;
                transacionAjax_Clase_F("LIST_CLASE_F", index_ID);
                break;
        }
    });
}

//carga las lineas segun la marca y clase
function Change_Select_Clase() {
    $("#Select_ClaseF").change(function () {
        var index_ID = this.value;

        switch (index_ID) {
            case "-1":
                break;

            default:
                transacionAjax_Linea_F("MATRIX_LINEA_F", Index_Marca, index_ID, "Matrix");
                break;
        }
    });
}

//busca los años del periodos de la linea clase y marca escogida
function Change_Select_Linea() {
    $("#Select_LineaF").change(function () {
        Index_ID_Fasecolda = this.value;

        switch (Index_ID_Fasecolda) {
            case "-1":
                break;

            default:
                Crear_Rango_modelo(Matrix_Linea_F, Index_ID_Fasecolda, "Matrix");
                break;
        }
    });
}

//construye y llama la funcion de cargar el drop list modelo
function Crear_Rango_modelo(Matrix, Index_ID, Proccess) {
    $("#Cambio_modelo").css("width", "33%");
    
    if (Proccess == "Matrix")
        Index_ID = Index_ID - 1;
    else
        Index_ID = 0;

    Fasecolda_ID = Matrix[Index_ID].Fasecolda_ID;
    var Flag_inicio = 0;
    var ciclo_year = 0;
    var Rango_Inicio = 0;
    var Rango_Final = 0;
    var Year_Parametro_Condicional = 0;

    for (var col = 1; col <= 25; col++) {
        var dato = "Year_" + col;
        ciclo_year = ciclo_year + 1;

        if (Matrix[Index_ID][dato] != 0) {
            if (Flag_inicio == 0) {
                Flag_inicio = 1;
                Rango_Inicio = ciclo_year;
            }
            Rango_Final = ciclo_year;
        }
    }
    var Residuo_periodo = 25 - parseInt(Rango_Final);

    if (Residuo_periodo != 0)
        Year_Parametro_Condicional = parseInt(Year_Parametro) - Residuo_periodo;
    else
        Year_Parametro_Condicional = Year_Parametro;

    CargaYear_Parametrizado("Select_modelo", Rango_Inicio, Rango_Final, Year_Parametro_Condicional, "", "Year_");

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

    if (Select_Ciudad != "") {
        $("#" + selector).append("<option value='-1'>Seleccione...</option>");
        $("#" + selector + " option[value= '" + Select_Ciudad + "'] ").attr("selected", true);
    }

    $("#" + selector).trigger("liszt:updated");
    $('.C_Chosen').trigger('chosen:updated');

}
