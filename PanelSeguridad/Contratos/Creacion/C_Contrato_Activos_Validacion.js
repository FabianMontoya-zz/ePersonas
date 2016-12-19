/*--------------- region de variables globales --------------------*/
var Ref_1 = "";
var Ref_2 = "";
var Ref_3 = "";
var STActivo = 0;
var Pais_R = 0;
var Ciudad_R = 0;
var T_Doc_R = 0;
var Doc_R = 0;
var Valor_Bien = 0;
var Val_Op_Compra = 0;
var TipoEscritura = 0;
var NunImobiliaria = "";
var FechaC_Recibo = "";
var FechaC_Retiro = "";

var ValorChasis = 0;
var Pasajeros = 0;
var Potencia = 0;
var TDoc_Blin = 0;
var Doc_Blin = 0;
var Nivel_Blin = 0;

/*--------------- region de variables globales --------------------*/

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                           REGION DE VALIDACIONES                                                                                                   ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//valida campos de documentos para buscar persona
function ValidaCamposPeople_A() {
    var valida = 0;
    var C_Nit_ID = $("#Select_EmpresaNit").val();
    var C_TD = $("#Select_Documento").val();
    var C_D = $("#TxtDoc").val();

    if (C_Nit_ID == "-1" || C_TD == "-1" || C_D == "") {
        valida = 1;
        if (C_TD == "-1") { $("#Img_TD").css("display", "inline-table"); } else { $("#Img_TD").css("display", "none"); }
        if (C_D == "") { $("#Img_D").css("display", "inline-table"); } else { $("#Img_D").css("display", "none"); }
        if (C_Nit_ID == "-1") { $("#Img1").css("display", "inline-table"); } else { $("#Img1").css("display", "none"); }
    }
    else {
        $("#Img1").css("display", "none");
        $("#Img_TD").css("display", "none");
        $("#Img_D").css("display", "none");
    }
    return valida;
}

//valida campos minimos para crear factura
function ValidaMinimo() {

    var valida = 0;
    var valida_K = 0;
    var valida_general;

    var C_Nit_ID = $("#Select_EmpresaNit").val();
    var C_TA = $("#Select_Tipo").val();
    var C_M = $("#Select_Moneda").val();
    var C_R1 = $("#TxtRef_1").val();
    var C_R2 = $("#TxtRef_2").val();
    var C_R3 = $("#TxtRef_3").val();
    var C_R4 = $("#TxtRef_Other").val();

    if (C_Nit_ID == "-1" || C_TA == "-1" || C_M == "-1") { valida = 1; }
    if (C_R1 == "" && C_R2 == "" && C_R3 == "" && C_R4 == "") { valida_K = 1; }

    if (valida == 0 && valida_K == 0)
        valida_general = 0;
    else
        valida_general = 1;

    return valida_general;
}

//validamos que tipo de busqueda es y verificamos
function ValidaCamposConsultaFasecolda() {

    var Busqueda;
    var Campo_BF_1 = $("#TxtFasecolda_ID").val();
    var Campo_BF_2 = $("#Select_ClaseF").val();
    var Campo_BF_3 = $("#Select_MarcaF").val();
    var Campo_BF_4 = $("#Select_LineaF").val();
    var Campo_BF_5 = $("#Select_modelo").val();

    switch (Campo_BF_1) {

        case "":
            if (Campo_BF_5 == "-1" || Campo_BF_4 == "" || Campo_BF_3 == "" || Campo_BF_4 == "-1" || Campo_BF_3 == "-1" || Campo_BF_2 == "-1")
                Busqueda = 1;
            else
                Busqueda = Search_Fasecolda(0, "", Campo_BF_2, Campo_BF_3, Campo_BF_4, Campo_BF_5);
            break;

        default:
            if (Campo_BF_5 != "-1") {
                Busqueda = Search_Fasecolda(1, Campo_BF_1, "", "", "", Campo_BF_5);
            }
            else
                Busqueda = 1;
            break;
    }

    return Busqueda;
}

//validamos los campos y  asignamos baaloses segun proceso de insercion en activos
function ValidaCampos_InsertBD_Activos() {
    var valida_process = 0;

    switch (Tipo_Activo) {
        case 0:
            Ref_1 = $("#TxtRef_Other").val();
            break;

        case 1:
            if ($("#TxtRef_1").val() != "")
                Ref_1 = $("#TxtRef_1").val();

            if ($("#TxtRef_2").val() != "")
                Ref_2 = $("#TxtRef_2").val();

            if ($("#TxtRef_3").val() != "")
                Ref_3 = $("#TxtRef_3").val();
            break;

        case 2:
            Ref_1 = $("#TxtRef_Other").val();
            break;
    }

    if ($("#Select_SubTipo").val() != "-1")
        STActivo = $("#Select_SubTipo").val();

    if ($("#Select_Pais_R").val() != "-1")
        Pais_R = $("#Select_Pais_R").val();

    switch ($("#Select_Ciudad_R").val()) {
        case "-1":
            Ciudad_R = 0;
            break;

        case null:
            Ciudad_R = 0;
            break;

        case "undefined":
            Ciudad_R = 0;
            break;

        default:
            Ciudad_R = $("#Select_Ciudad_R").val();
            break;
    }

    if ($("#Select_Persona_R").val() != "-1") {
        var Str_C_R = $("#Select_Persona_R option:selected").html();
        var SplitCR = Str_C_R.split(" - ");
        T_Doc_R = SplitCR[1];
        Doc_R = SplitCR[0];
    }

    if ($("#TxtValor_Bien").val() != "")
        Valor_Bien = F_NumericBD($("#TxtValor_Bien").val());

    if ($("#TxtValor_Compra").val() != "")
        Val_Op_Compra = F_NumericBD($("#TxtValor_Compra").val());

    if ($("#Select_TipoEscritura").val() != "-1")
        TipoEscritura = $("#Select_TipoEscritura").val();

    if ($("#Txt_NunImobiliaria").val() != "-1")
        NunImobiliaria = $("#Txt_NunImobiliaria").val();

    if ($("#TxtFecha_Recibo").val() != "-1")
        FechaC_Recibo = $("#TxtFecha_Recibo").val();

    if ($("#TxtFecha_Retiro").val() != "-1")
        FechaC_Retiro = $("#TxtFecha_Retiro").val();

    return valida_process;
}

//validamos los campos y  asignamos baaloses segun proceso de insercion en vehiculos
function ValidaCampos_InsertBD_Vehiculos() {

    var valida_process = 0;

    if ($("#TxtValor_Chasis").val() != "")
        ValorChasis = F_NumericBD($("#TxtValor_Chasis").val());

    if ($("#Txt_NPasajeros").val() != "")
        Pasajeros = $("#Txt_NPasajeros").val();

    if ($("#Txt_Potencia").val() != "")
        Potencia = $("#Txt_Potencia").val();

    if ($("#Select_Documento_Blin").val() != "-1")
        TDoc_Blin = $("#Select_Documento_Blin").val();

    if ($("#TxtDoc_Blin").val() != "")
        Doc_Blin = $("#TxtDoc_Blin").val();

    if ($("#Txt_Nivel_Blin").val() != "")
        Nivel_Blin = $("#Txt_Nivel_Blin").val();

    return valida_process;
}

//Validamos que el Activo que se desea crear no se halla sido creado ya dentro del array
function ValidarActivoArray(REF1, REF2, REF3) {
    var valido = true;
    for (itemArray in ArrayActivos) {
        if (ArrayActivos[itemArray].Ref_1 == REF1 &&
            ArrayActivos[itemArray].Ref_2 == REF2 &&
            ArrayActivos[itemArray].Ref_3 == REF3) {
            valido = false;
            Mensaje_General("¡Activo Existente!-1", "El Activo que desea agregar ya se encuentra agregado a la lista de la colocación, no puedes ingresar dos veces el mismo Activo.", "W");
            break;
        }
    }
    return valido;
}
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                           PROCESO DE VALIDACION CAMPOS   DINAMICOS                                                             ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
// paso 1
//valida fase de guardado
function ValidarGuardado() {

    var Valida_Campos_Op;
    var C_Generales = V_Campos_Generales();

    switch (C_Generales) {

        case 1:
            Mensaje_General("Campos Generales Incompletos!", "Debe diligenciar los Campos minimos requeridos pestañas (Datos Activos, Ubicación)", "E");
            break;

        case 0:
            switch (Tipo_Activo) {
                case 0: //activo default
                    Valida_Campos_Op = V_Campos_K("D");
                    if (Valida_Campos_Op == 1)
                        Mensaje_General("Campo llave Incompleto!", "Debe diligenciar el Campo (C. Identificación)", "E");
                    break;

                case 1: //activo inmueble
                    Valida_Campos_Op = V_Campos_Immuebles();
                    break;

                case 2: //activo automovil
                    Valida_Campos_Op = V_Campos_Vehiculos();
                    break;
            }
            break;
    }

    return Valida_Campos_Op;
}

// paso 2
//validamos campos para la creacion del formulario 
//Obligatorios (Campos generales)
function V_Campos_Generales() {

    var validar = 0;
    //1. identificar campos generales
    var Campo_G2 = $("#Select_Sucursal").val(); //Img_G1
    var Campo_G3 = $("#Select_Tipo").val(); //Img_G2
    var Campo_G4 = $("#Select_Documento").val(); //Img_TD_A
    var Campo_G5 = $("#TxtDoc").val();  //Img_D_A
    var Campo_G6 = $("#txtDescripcion").val(); //Img_G3
    var Campo_G7 = $("#Select_Moneda").val(); //Img_G4
    var Campo_G8 = $("#Select_Pais_U").val(); //Img_G5
    var Campo_G9 = $("#Select_Ciudad_U").val(); //Img_G6
    var Campo_G10 = $("#Txt_Adress_U").val(); //Img_G7
   if (Campo_G2 == "-1" ||
        Campo_G3 == "-1" || Campo_G4 == "-1" ||
        Campo_G5 == "" || Campo_G6 == "" ||
        Campo_G7 == "-1" || Campo_G8 == "-1" ||
        Campo_G9 == "-1" || Campo_G10 == "") {

        validar = 1;
        if (Campo_G2 == "-1") { $("#Img_G1").css("display", "inline-table"); } else { $("#Img_G1").css("display", "none"); }
        if (Campo_G3 == "-1") { $("#Img_G2").css("display", "inline-table"); } else { $("#Img_G2").css("display", "none"); }
        if (Campo_G4 == "-1") { $("#Img_TD_A").css("display", "inline-table"); } else { $("#Img_TD_A").css("display", "none"); }
        if (Campo_G5 == "") { $("#Img_D_A").css("display", "inline-table"); } else { $("#Img_D_A").css("display", "none"); }
        if (Campo_G6 == "") { $("#Img_G3").css("display", "inline-table"); } else { $("#Img_G3").css("display", "none"); }
        if (Campo_G7 == "-1") { $("#Img_G4").css("display", "inline-table"); } else { $("#Img_G4").css("display", "none"); }
        if (Campo_G8 == "-1") { $("#Img_G5").css("display", "inline-table"); } else { $("#Img_G5").css("display", "none"); }
        if (Campo_G9 == "-1") { $("#Img_G6").css("display", "inline-table"); } else { $("#Img_G6").css("display", "none"); }
        if (Campo_G10 == "") { $("#Img_G7").css("display", "inline-table"); } else { $("#Img_G7").css("display", "none"); }
    }
    else {
        $("#Img_TD_A").css("display", "none");
        $("#Img_D_A").css("display", "none");

        $("#Img_G1").css("display", "none");
        $("#Img_G2").css("display", "none");
        $("#Img_G3").css("display", "none");
        $("#Img_G4").css("display", "none");
        $("#Img_G5").css("display", "none");
        $("#Img_G6").css("display", "none");
        $("#Img_G7").css("display", "none");
    }
    return validar;
}

// paso 3
//valida campos referentes a los inmuebles
//Obligatorios (Campos Inmuebles)
function V_Campos_Immuebles() {

    var validar;
    var validar_inmueble = 0;
    var valida_llave = V_Campos_K("I");

    var Campo_In_1 = $("#Select_TipoEscritura").val(); //Inmu_1
    var Campo_In_2 = $("#Txt_NunImobiliaria").val(); //Inmu_2

    if (Campo_In_1 == "-1" || Campo_In_2 == "") {
        validar_inmueble = 1;
        if (Campo_In_1 == "-1") { $("#Inmu_1").css("display", "inline-table"); } else { $("#Inmu_1").css("display", "none"); }
        if (Campo_In_2 == "") { $("#Inmu_2").css("display", "inline-table"); } else { $("#Inmu_2").css("display", "none"); }
    }
    else {
        $("#Inmu_1").css("display", "none");
        $("#Inmu_2").css("display", "none");
    }

    validar = Valida_Keys_Bloque("I", valida_llave, validar_inmueble, "");
    return validar;
}

// paso 3
//valida campos referentes a los Vehiculos
//Obligatorios (Campos Vehiculos)
function V_Campos_Vehiculos() {

    var validar;
    var validar_Vehiculo = 0;
    var validar_Blindaje;

    var valida_llave = V_Campos_K("V");

    var Campo_F_1 = $("#TxtFasecolda_ID").val(); //Fase_1
    var Campo_F_2 = $("#Select_ClaseF").val(); //Fase_2
    var Campo_F_3 = $("#Select_MarcaF").val(); //Fase_3
    var Campo_F_4 = $("#Select_LineaF").val(); //Fase_4
    var Campo_F_5 = $("#Select_modelo").val(); //Fase_5
    var Campo_F_6 = $("#Txt_Cilindraje").val(); //Fase_6
    var Campo_F_7 = $("#Select_TServicio").val(); //Fase_7
    var Campo_F_8 = $("#Select_Combustible").val(); //Fase_8
    var Campo_F_9 = $("#Select_Color").val(); //Fase_9
    var Campo_F_10 = $("#Txt_Capacidad").val(); //Fase_10

    if (Campo_F_1 == "" || Campo_F_2 == "-1" ||
       Campo_F_3 == "-1" || Campo_F_4 == "-1" ||
       Campo_F_5 == "-1" || Campo_F_6 == "" ||
       Campo_F_7 == "-1" || Campo_F_8 == "-1" ||
       Campo_F_9 == "-1" || Campo_F_10 == "") {

        validar_Vehiculo = 1;
        if (Campo_F_1 == "") { $("#Fase_1").css("display", "inline-table"); } else { $("#Fase_1").css("display", "none"); }
        if (Campo_F_2 == "-1") { $("#Fase_2").css("display", "inline-table"); } else { $("#Fase_2").css("display", "none"); }
        if (Campo_F_3 == "-1") { $("#Fase_3").css("display", "inline-table"); } else { $("#Fase_3").css("display", "none"); }
        if (Campo_F_4 == "-1") { $("#Fase_4").css("display", "inline-table"); } else { $("#Fase_4").css("display", "none"); }
        if (Campo_F_5 == "-1") { $("#Fase_5").css("display", "inline-table"); } else { $("#Fase_5").css("display", "none"); }
        if (Campo_F_6 == "") { $("#Fase_6").css("display", "inline-table"); } else { $("#Fase_6").css("display", "none"); }
        if (Campo_F_7 == "-1") { $("#Fase_7").css("display", "inline-table"); } else { $("#Fase_7").css("display", "none"); }
        if (Campo_F_8 == "-1") { $("#Fase_8").css("display", "inline-table"); } else { $("#Fase_8").css("display", "none"); }
        if (Campo_F_9 == "-1") { $("#Fase_9").css("display", "inline-table"); } else { $("#Fase_9").css("display", "none"); }
        if (Campo_F_10 == "") { $("#Fase_10").css("display", "inline-table"); } else { $("#Fase_10").css("display", "none"); }
    }
    else {
        $("#Fase_10").css("display", "none");
        $("#Fase_9").css("display", "none");
        $("#Fase_8").css("display", "none");
        $("#Fase_7").css("display", "none");
        $("#Fase_6").css("display", "none");
        $("#Fase_5").css("display", "none");
        $("#Fase_4").css("display", "none");
        $("#Fase_3").css("display", "none");
        $("#Fase_2").css("display", "none");
        $("#Fase_1").css("display", "none");
    }

    switch (Option_Blindaje) {
        case 1:
            validar_Blindaje = V_Campos_Blindaje();
            break;
        case 0:
            validar_Blindaje = 0;
            break;
    }
    validar = Valida_Keys_Bloque("V", valida_llave, validar_Vehiculo, validar_Blindaje);
    return validar;
}

// paso 3.1
//valida campos blindaje dependiendo de la opcion
function V_Campos_Blindaje() {
    var validar_blindaje = 0;

    //1. identificar campos blindaje
    var Campo_B_1 = $("#Txt_Nivel_Blin").val(); //Img_N_blin
    var Campo_B_2 = $("#Select_Documento_Blin").val(); //Img_TD_blin
    var Campo_B_3 = $("#TxtDoc_Blin").val(); //Img_D_blin

    if (Campo_B_1 == "" || Campo_B_2 == "-1" || Campo_B_3 == "") {

        validar_blindaje = 1;
        if (Campo_B_1 == "") { $("#Img_N_blin").css("display", "inline-table"); } else { $("#Img_N_blin").css("display", "none"); }
        if (Campo_B_2 == "-1") { $("#Img_TD_blin").css("display", "inline-table"); } else { $("#Img_TD_blin").css("display", "none"); }
        if (Campo_B_3 == "") { $("#Img_D_blin").css("display", "inline-table"); } else { $("#Img_D_blin").css("display", "none"); }
    }
    else {
        $("#Img_N_blin").css("display", "none");
        $("#Img_TD_blin").css("display", "none");
        $("#Img_D_blin").css("display", "none");
    }
    return validar_blindaje;
}

// paso 4
//valida campos llave dependiendo de la opcion
function V_Campos_K(Type) {

    validar_key = 0;
    //1. identificar campos llaves
    var Campo_K_1 = $("#TxtRef_1").val(); //K_1
    var Campo_K_2 = $("#TxtRef_2").val(); //K_2
    var Campo_K_3 = $("#TxtRef_3").val(); //K_3
    var Campo_K_4 = $("#TxtRef_Other").val(); //K_4

    switch (Type) {
        case "I":
            if (Campo_K_1 == "" && Campo_K_2 == "" && Campo_K_1 == "") {
                validar_key = 1;

                if (Campo_K_1 == "") { $("#K_1").css("display", "inline-table"); } else { $("#K_1").css("display", "none"); }
                if (Campo_K_2 == "") { $("#K_2").css("display", "inline-table"); } else { $("#K_2").css("display", "none"); }
                if (Campo_K_3 == "") { $("#K_3").css("display", "inline-table"); } else { $("#K_13").css("display", "none"); }
            }
            else {
                $("#K_1").css("display", "none");
                $("#K_2").css("display", "none");
                $("#K_3").css("display", "none");
            }
            break;

        case "V":
            if (Campo_K_4 == "") {
                validar_key = 1;
                if (Campo_K_4 == "") { $("#K_4").css("display", "inline-table"); } else { $("#K_4").css("display", "none"); }
            }
            else
                $("#K_4").css("display", "none");
            break;

        case "D":
            if (Campo_K_4 == "") {
                validar_key = 1;
                if (Campo_K_4 == "") { $("#K_4").css("display", "inline-table"); } else { $("#K_4").css("display", "none"); }
            }
            else
                $("#K_4").css("display", "none");
            break;

    }

    return validar_key;
}

// paso 5
//valida el resultado de las llaves y bloque de tipo de activo seleccionado
function Valida_Keys_Bloque(Type, Val_Key, Val_Bloque, Val_Bloque_2) {
    var validar;

    switch (Type) {
        case "I":
            //revisamos resultado de campos seleccionados
            if (Val_Bloque == 0 && Val_Key == 0)
                validar = 0;
            else {
                validar = 1;
                if (Val_Bloque == 1)
                    Mensaje_General("Campos Inmueble Incompletos!", "Debe diligenciar los Campos de inmuebles requeridos (1 - Inmueble)", "W");

                if (Val_Key == 1)
                    Mensaje_General("Campos Llaves Inmueble!", "Debe diligenciar alguna de las 3 llaves de inmuebles (Cedula Catastral, Matricula Imbiliaria, Numero Unico ID)", "W");

                if (Val_Key == 1 && Val_Bloque == 1)
                    Mensaje_General("Inmueble Incompleto!", "Debe diligenciar alguna de las 3 llaves de inmuebles (Cedula Catastral, Matricula Imbiliaria, Numero Unico ID) y revisar el modulo de (1 - Inmueble)", "W");
            }
            break;

        case "V":
            if (Val_Bloque_2 == 0 && Val_Bloque == 0 && Val_Key == 0)
                validar = 0;
            else {
                validar = 1;
                if (Val_Bloque == 1)
                    Mensaje_General("Campos Vehículo Incompletos!", "Debe diligenciar los Campos de Vehículo requeridos (2 - Vehículos)", "W");

                if (Val_Key == 1)
                    Mensaje_General("Campos Llave Vehículo!", "Debe diligenciar la (Placa) del Vehículo", "W");

                if (Val_Bloque_2 == 1)
                    Mensaje_General("Campos blindaje Vehículo!", "Debe diligenciar blindaje del Vehículo", "W");

                if (Val_Key == 1 && Val_Bloque == 1 && Val_Bloque_2 == 1)
                    Mensaje_General("Vehículo Incompleto!", "Debe diligenciar la (Placa) del Vehículo y revisar el modulo de (2 - Vehículos), Configuración Blindaje Activa", "W");
            }
            break;
    }

    return validar;
}