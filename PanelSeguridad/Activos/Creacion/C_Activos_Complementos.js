/*--------------- region de variables globales --------------------*/
var ArrayStrAdress = [];

var A = [];
var P = [];
var A_0 = [];
var A_C = 0;
var A0 = 0;
var C_P = 0;

var Control_Work;
/*--------------- region de variables globales --------------------*/


/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                     PROCESO DE FORMATEO DE DIRECCIONES                                                                   ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//habilita la ventana emergente de direciones
function Format_Adress(ObjText) {
    $("#" + ObjText).mouseover(function () {
        Control_Work = ObjText;
        if ($("#" + ObjText).val == "") {
        } else {
            console.log($("#" + ObjText).val());
            Clear_Adress();
            $("#Txt_End_Adress").val($("#" + ObjText).val());
        }

        $("#Txt_Special").css("display", "none");
        $("#Dialog_Format_Adress").dialog("open");
        $("#Dialog_Format_Adress").dialog("option", "title", "Ingrese Dirección ");

        lego_Adress();
    });
}

//construye el string de la direccion
function lego_Adress() {

    var Str_Adress = "";

    $("#Select_Type_Adress").change(function () {
        ArrayStrAdress[0] = $("#Select_Type_Adress").val();
        if (ArrayStrAdress[0] == "Kl") {
            $("#Txt_Special").css("display", "block");

            $("#Select_Letter_1").css("display", "none");
            $("#Txt_N2").css("display", "none");
            $("#Select_Letter_2").css("display", "none");
            $("#Txt_N3").css("display", "none");
            $("#Select_Orientacion").css("display", "none");
            $("#Select_Type_Cons").css("display", "none");
            $("#Txt_N4").css("display", "none");
            $("#Select_Type_Cons2").css("display", "none");
            $("#Txt_N5").css("display", "none");
            $("#Txt_Texto").css("display", "none");

        }
        else {
            $("#Txt_Special").css("display", "none");

            $("#Select_Letter_1").css("display", "block");
            $("#Txt_N2").css("display", "block");
            $("#Select_Letter_2").css("display", "block");
            $("#Txt_N3").css("display", "block");
            $("#Select_Orientacion").css("display", "block");
            $("#Select_Type_Cons").css("display", "block");
            $("#Txt_N4").css("display", "block");
            $("#Select_Type_Cons2").css("display", "block");
            $("#Txt_N5").css("display", "block");
            $("#Txt_Texto").css("display", "block");

        }
        StrLego();
    });

    $("#Txt_N1").change(function () {
        ArrayStrAdress[1] = " " + $("#Txt_N1").val();
        StrLego();
    });

    $("#Select_Letter_1").change(function () {
        ArrayStrAdress[2] = $("#Select_Letter_1").val();
        StrLego();
    });

    $("#Txt_Special").change(function () {
        ArrayStrAdress[2] = " " + $("#Txt_Special").val().toUpperCase();
        StrLego();
    });

    $("#Txt_N2").change(function () {
        ArrayStrAdress[3] = " " + $("#Txt_N2").val();
        StrLego();
    });

    $("#Select_Letter_2").change(function () {
        ArrayStrAdress[4] = $("#Select_Letter_2").val();
        StrLego();
    });

    $("#Txt_N3").change(function () {
        ArrayStrAdress[5] = " - " + $("#Txt_N3").val();
        StrLego();
    });

    $("#Select_Orientacion").change(function () {
        ArrayStrAdress[6] = " " + $("#Select_Orientacion").val();
        StrLego();
    });

    $("#Select_Type_Cons").change(function () {
        ArrayStrAdress[7] = " " + $("#Select_Type_Cons").val();
        StrLego();
    });

    $("#Txt_N4").change(function () {
        ArrayStrAdress[8] = " " + $("#Txt_N4").val();
        StrLego();
    });

    $("#Select_Type_Cons2").change(function () {
        ArrayStrAdress[9] = " " + $("#Select_Type_Cons2").val();
        StrLego();
    });

    $("#Txt_N5").change(function () {
        ArrayStrAdress[10] = " " + $("#Txt_N5").val();
        StrLego();
    });

    $("#Txt_Texto").change(function () {
        ArrayStrAdress[11] = " " + $("#Txt_Texto").val().toUpperCase();
        StrLego();
    });
}

//recorre el vector para construir la direccion
function StrLego() {

    var Str_Adress = "";

    for (item in ArrayStrAdress) {

        if (ArrayStrAdress[item] != "") {
            Str_Adress = Str_Adress + ArrayStrAdress[item];
            $("#Txt_End_Adress").val(Str_Adress);
        }
    }
}

//llena el campo de direccion con el string armado
function Add_Adress() {

    if ($("#Txt_End_Adress").val() != "")
        $("#" + Control_Work).val($("#Txt_End_Adress").val());

    $("#Dialog_Format_Adress").dialog("close");
}

//limpia los campos de direccion
function Clear_Adress() {

    ArrayStrAdress = [];
    $("#Select_Type_Adress").val("");
    $("#Select_Letter_1").val("");
    $("#Txt_N1").val("");
    $("#Txt_Special").val("");
    $("#Txt_N2").val("");
    $("#Select_Letter_2").val("");
    $("#Txt_N3").val("");
    $("#Select_Orientacion").val("");
    $("#Select_Type_Cons").val("");
    $("#Txt_N4").val("");
    $("#Select_Type_Cons2").val("");
    $("#Txt_N5").val("");
    $("#Txt_Texto").val("");

    $("#Txt_End_Adress").val("");
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
