var ArrayDirecciones = [];
var ListDirecciones = [];
var ArrayStrAdress = [];
var ArrayStrPhones = [];
var ArrayCiudades_D = [];

var D_Nit;
var D_TDocumento;
var D_String_TDocumento;
var D_Documento;
var D_String_Contacto;

/*---------------------------------------------------------------------------------------------------------------*/
/*                                        GRID PRINCIPAL DE DIRECCIONES                                                                       */
/*---------------------------------------------------------------------------------------------------------------*/

//el llamado para insertar modificar o eliminar la direcciones
function Direcciones(Option_Adress) {
    $("#Dialog_Direcciones").dialog("open");
    $("#Dialog_Direcciones").dialog("option", "title", "Direcciones de: " + Nombre_Persona);

    if (OpcWordComplementos == 'V')
        $("#BtnSave_Adress").css("display", "none");
    else
        $("#BtnSave_Adress").css("display", "inline-table");
        
    switch (Option_Adress) {
        case "V":
            $("#Txt_Nit_V").val(D_Nit);
            $("#Txt_TypeIden_V").val($("#Con_Documento").html());
            $("#Txt_Ident_V").val(D_Documento);
            $("#Txt_Nit_V_2").val(D_Nit);
            $("#Txt_TypeIden_V_2").val($("#Con_Documento").html());
            $("#Txt_Ident_V_2").val(D_Documento);

            transacionAjax_allAdress('R_ead_Adress', D_Nit, D_TDocumento, D_Documento, Option_Adress);
            break;

        case "U":

            var Nit_Work;

            if ($("#Select_EmpresaNit").val() == "-1")
                Nit_Work = NitAlter;
            else
                Nit_Work = $("#Select_EmpresaNit").val();

            $("#Txt_Nit_V").val(Nit_Work);
            $("#Txt_TypeIden_V").val($("#Select_Documento option:selected").text());
            $("#Txt_Ident_V").val($("#Txt_Ident").val() + "-" + $("#TxtVerif").val());
            $("#Txt_Nit_V_2").val(Nit_Work);
            $("#Txt_TypeIden_V_2").val($("#Select_Documento option:selected").text());
            $("#Txt_Ident_V_2").val($("#Txt_Ident").val() + "-" + $("#TxtVerif").val());

            D_String_Contacto = Nombre_Persona;

            transacionAjax_allAdress('R_ead_Adress', $("#Select_EmpresaNit").val(), $("#Select_Documento").val(), $("#Txt_Ident").val(), Option_Adress);
            break;
    }

}


//grid direcciones cliente
function Tabla_General(Opc_Link) {
    var html = "";
    var contador = 0;

    switch (Opc_Link) {
        case "V":
            html = "<table id='TDireccion' border='1' cellpadding='1' cellspacing='1'  style='width: 100%; margin-top: 20px;'><thead><tr><th>Opciones</th><th>Consecutivo</th><th>Pais</th><th>Ciudad</th><th>Nombre del contacto</th><th>Pagina Web</th><th>Dirección</th><th>Telefono 1</th><th>Telefono 2</th><th>Telefono 3</th><th>Telefono 4</th><th>Correo 1</th><th>Correo 2</th></tr></thead><tbody>";
            break;

        case "U":
            html = "<table id='TDireccion' border='1' cellpadding='1' cellspacing='1'  style='width: 100%; margin-top: 20px;'><thead><tr><th>Opciones <span class='cssToolTip_ver'><img alt='Direc' class='AddDirec' onclick=\"AddDirecion()\" id='Crear' height='20px' width='20px' src='../../images/add.png' /><span>Agregar Nueva Dirección</span></span></th><th>Consecutivo</th><th>Pais</th><th>Ciudad</th><th>Nombre del contacto</th><th>Pagina Web</th><th>Dirección</th><th>Telefono 1</th><th>Telefono 2</th><th>Telefono 3</th><th>Telefono 4</th><th>Correo 1</th><th>Correo 2</th></tr></thead><tbody>";
            break;
    }

    for (itemArray in ArrayDirecciones) {
        if (ArrayDirecciones[itemArray].TypeDoc_ID != "") {

            switch (Opc_Link) {
                case "V":
                    if (estado == "eliminar")
                        html += "<tr><td><select id='Select_" + ArrayDirecciones[itemArray].Consecutivo + "' class='Opciones' onchange=\"Select_Option(this,'" + ArrayDirecciones[itemArray].Consecutivo + "');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option><option value='R'>Retirar</option></select></td><td>" + ArrayDirecciones[itemArray].Consecutivo + "</td><td>" + ArrayDirecciones[itemArray].DescripPais + "</td><td>" + ArrayDirecciones[itemArray].DescripCiudad + "</td> <td>" + ArrayDirecciones[itemArray].Contacto + "</td><td>" + ArrayDirecciones[itemArray].PaginaWeb + "</td><td>" + ArrayDirecciones[itemArray].Direccion + "</td><td>" + ArrayDirecciones[itemArray].Telefono_1 + "</td><td>" + ArrayDirecciones[itemArray].Telefono_2 + "</td><td>" + ArrayDirecciones[itemArray].Telefono_3 + "</td><td>" + ArrayDirecciones[itemArray].Telefono_4 + "</td><td>" + ArrayDirecciones[itemArray].Correo_1 + "</td><td>" + ArrayDirecciones[itemArray].Correo_2 + "</td></tr>";
                    else
                        html += "<tr><td><select id='Select_" + ArrayDirecciones[itemArray].Consecutivo + "' class='Opciones' onchange=\"Select_Option(this,'" + ArrayDirecciones[itemArray].Consecutivo + "');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option></select></td><td>" + ArrayDirecciones[itemArray].Consecutivo + "</td><td>" + ArrayDirecciones[itemArray].DescripPais + "</td><td>" + ArrayDirecciones[itemArray].DescripCiudad + "</td> <td>" + ArrayDirecciones[itemArray].Contacto + "</td><td>" + ArrayDirecciones[itemArray].PaginaWeb + "</td><td>" + ArrayDirecciones[itemArray].Direccion + "</td><td>" + ArrayDirecciones[itemArray].Telefono_1 + "</td><td>" + ArrayDirecciones[itemArray].Telefono_2 + "</td><td>" + ArrayDirecciones[itemArray].Telefono_3 + "</td><td>" + ArrayDirecciones[itemArray].Telefono_4 + "</td><td>" + ArrayDirecciones[itemArray].Correo_1 + "</td><td>" + ArrayDirecciones[itemArray].Correo_2 + "</td></tr>";
                    break;

                case "U":
                    html += "<tr><td><select id='Select_" + ArrayDirecciones[itemArray].Consecutivo + "' class='Opciones' onchange=\"Select_Option(this,'" + ArrayDirecciones[itemArray].Consecutivo + "');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option><option value='M'>Modificar</option><option value='R'>Retirar</option></select></td><td>" + ArrayDirecciones[itemArray].Consecutivo + "</td><td>" + ArrayDirecciones[itemArray].DescripPais + "</td><td>" + ArrayDirecciones[itemArray].DescripCiudad + "</td> <td>" + ArrayDirecciones[itemArray].Contacto + "</td><td>" + ArrayDirecciones[itemArray].PaginaWeb + "</td><td>" + ArrayDirecciones[itemArray].Direccion + "</td><td>" + ArrayDirecciones[itemArray].Telefono_1 + "</td><td>" + ArrayDirecciones[itemArray].Telefono_2 + "</td><td>" + ArrayDirecciones[itemArray].Telefono_3 + "</td><td>" + ArrayDirecciones[itemArray].Telefono_4 + "</td><td>" + ArrayDirecciones[itemArray].Correo_1 + "</td><td>" + ArrayDirecciones[itemArray].Correo_2 + "</td></tr>";
                    break;
            }

        }
        contador += 1;
    }

    html += "</tbody></table>";
    $("#container_direccion").html("");
    $("#container_direccion").html(html);

    $(".AddDirec").click(function () {
    });

    $("#TDireccion").dataTable({
        "iDisplayLength": -1,
        "aaSorting": [[1, "asc"]],
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

/*---------------------------------------------------------------------------------------------------------------*/
/*                                        CREAR DE DIRECCIONES                                                                       */
/*---------------------------------------------------------------------------------------------------------------*/

//funcion que abre la ventana para la creacion de direccion
function AddDirecion() {
    clearDireccion();
    Enabled_Direccion();
    var Direccion_Consecutivo = ArrayDirecciones.length + 1;
    $("#Dialog_C_R_U_D").dialog("open");
    $("#Dialog_C_R_U_D").dialog("option", "title", "Nueva dirección de: " + Nombre_Persona);
    $("#TxtConsecutivo").val(Direccion_Consecutivo);
    $("#TxtContact").val(D_String_Contacto);

    $("#BtnAdd").attr("value", "Agregar");
}

//agrega al array de direcciones los datos diligenciados
function Add_Array_Adress() {

    var Json_Direccion = Convert_and_Valide_Json();
    ArrayDirecciones.push(Json_Direccion);
    Tabla_General('U');

    $("#dialog").dialog("option", "title", "Exito");
    $("#Mensaje_alert").text("la Nueva direccion fue agregada!");
    $("#dialog").dialog("open");
    $("#DE").css("display", "none");
    $("#SE").css("display", "block");
    $("#WE").css("display", "none");
    $("#Dialog_C_R_U_D").dialog("close");
    clearDireccion();

}

/*---------------------------------------------------------------------------------------------------------------*/
/*                      CASOS DE LLAMADO SEGUN LA OPERACION DE DIRECCIONES                                                                       */
/*---------------------------------------------------------------------------------------------------------------*/
//llamado del boton agregar,modificar o eliminar direcciones
function BtnAdd() {

    var validate;
    validate = ValidaDireccion();

    if (validate == 0) {

        var validate_E_mail = RevCampos_E_mail();
        if (validate_E_mail == 0) {

            Clear_Adress();

            switch ($("#BtnAdd").val()) {

                case "Agregar":
                    Add_Array_Adress();
                    break;

                case "Actualizar":
                    Update_Array_Adress();
                    break;

                case "Eliminar":
                    $("#Dialog_Delete_Adress").dialog("open");
                    break;

                case "Salir":
                    ReadView_Adress();
                    break;
            }
        }
    }
}

//selecciona que tipo de operacion desea con el registro seleccionado
function Select_Option(Select_control, Index_Adress) {
    var Select_Value = $(Select_control).val();

    switch (Select_Value) {
        case "M": //modificar
            UpdateDirecion(Index_Adress);
            Enabled_Direccion();
            break;

        case "V": //visualizar
            ReadDirecion(Index_Adress);
            Disabled_Direccion();
            break;

        case "R": //eliminar
            DeleteDirecion(Index_Adress);
            Disabled_Direccion();
            break;

        case "U": //visualizar
            ReadDirecion(Index_Adress);
            Disabled_Direccion();
            break;
    }

}

/*---------------------------------------------------------------------------------------------------------------*/
/*                                        ACTUALIZAR DE DIRECCIONES                                                                       */
/*---------------------------------------------------------------------------------------------------------------*/

//funcion que abre la ventana para la Actualizacion de direccion
function UpdateDirecion(Direccion_Consecutivo) {
    clearDireccion();
    $("#Dialog_C_R_U_D").dialog("open");
    $("#Dialog_C_R_U_D").dialog("option", "title", "Actualizar dirección de: " + Nombre_Persona);
    $("#TxtConsecutivo").val(Direccion_Consecutivo);
    $("#BtnAdd").attr("value", "Actualizar");

    Search_Adress(Direccion_Consecutivo);
    LegoView_Phone();
    Delete_Adress(Direccion_Consecutivo);
}

//Actualiza al array de direcciones los datos diligenciados
function Update_Array_Adress() {

    var Json_Direccion = Convert_and_Valide_Json();
    ArrayDirecciones.push(Json_Direccion);
    Tabla_General('U');

    $("#dialog").dialog("option", "title", "Exito");
    $("#Mensaje_alert").text("la direccion fue Actualizada!");
    $("#dialog").dialog("open");
    $("#DE").css("display", "none");
    $("#SE").css("display", "block");
    $("#WE").css("display", "none");
    $("#Dialog_C_R_U_D").dialog("close");
    clearDireccion();

}

/*---------------------------------------------------------------------------------------------------------------*/
/*                                        ELIMINAR DE DIRECCIONES                                                                       */
/*---------------------------------------------------------------------------------------------------------------*/

//funcion que abre la ventana para la Eliminacion de direccion
function DeleteDirecion(Direccion_Consecutivo) {

    $("#Dialog_C_R_U_D").dialog("open");
    $("#Dialog_C_R_U_D").dialog("option", "title", "Retirar Dirección de: " + +Nombre_Persona);
    $("#TxtConsecutivo").val(Direccion_Consecutivo);
    $("#BtnAdd").attr("value", "Eliminar");

    Search_Adress(Direccion_Consecutivo);
    LegoView_Phone();
    Delete_Adress(Direccion_Consecutivo);
}

//QUE CORFIMA SI SE ELIMINA EL REGISTRO
function Confirm_Adress(Confirm) {
    if (Confirm == 'N') {
        RestoreDelete_Array_Adress();
    }
    else {
        $("#dialog").dialog("option", "title", "Exito");
        $("#Mensaje_alert").text("la direccion fue Retirada!");
        $("#dialog").dialog("open");
        $("#DE").css("display", "none");
        $("#SE").css("display", "block");
        $("#WE").css("display", "none");
        $("#Dialog_C_R_U_D").dialog("close");
        $("#Dialog_Delete_Adress").dialog("close");

        for (itemArray in ArrayDirecciones) {
            ArrayDirecciones[itemArray].Consecutivo = parseInt(itemArray) + 1;
        }

        Tabla_General('U');
        clearDireccion();

    }
}

//Restaura la eliminacion al array de direcciones los datos diligenciados
function RestoreDelete_Array_Adress() {

    var Json_Direccion = Convert_and_Valide_Json();
    ArrayDirecciones.push(Json_Direccion);

    $("#Dialog_Delete_Adress").dialog("close");
    $("#Dialog_C_R_U_D").dialog("close");
    Tabla_General();
    clearDireccion();

}

/*---------------------------------------------------------------------------------------------------------------*/
/*                                        LEER DE DIRECCIONES                                                                       */
/*---------------------------------------------------------------------------------------------------------------*/

//funcion que abre la ventana para la Actualizacion de direccion
function ReadDirecion(Direccion_Consecutivo) {

    $("#Dialog_C_R_U_D").dialog("open");
    $("#Dialog_C_R_U_D").dialog("option", "title", "Dirección de: " + Nombre_Persona);
    $("#TxtConsecutivo").val(Direccion_Consecutivo);
    $("#BtnAdd").attr("value", "Salir");

    Search_Adress(Direccion_Consecutivo);
    LegoView_Phone();
}

//CIERRA LA VENTANA EMERGENTE
function ReadView_Adress() {
    $("#Dialog_C_R_U_D").dialog("close");
}


/*---------------------------------------------------------------------------------------------------------------*/
/*                           FUNCIONES COMPLEMETARIAS DEL CRUD                                                                      */
/*---------------------------------------------------------------------------------------------------------------*/

//funcion que captura la direccion y la comvierte en un Json
function Convert_and_Valide_Json() {

    var tel_1 = lego_Phone(1);
    var tel_2 = lego_Phone(2);
    var tel_3 = lego_Phone(3);
    var tel_4 = lego_Phone(4);

    var strNit = $("#Txt_Ident_V_2").val();
    var SplitNit = strNit.split("-");

    var Json_Direccion = {
        "Consecutivo": $("#TxtConsecutivo").val(),
        "Contacto": $("#TxtContact").val(),
        "Correo_1": $("#TxtCorreo_1").val(),
        "Correo_2": $("#TxtCorreo_2").val(),
        "Direccion": $("#TxtDireccion").val(),
        "Doc_ID": SplitNit[0],
        "FechaActualizacion": "",
        "Nit_ID": $("#Txt_Nit_V_2").val(),
        "PaginaWeb": $("#TxtWeb").val(),
        "Telefono_1": tel_1,
        "Telefono_2": tel_2,
        "Telefono_3": tel_3,
        "Telefono_4": tel_4,
        "TypeDoc_ID": $("#Select_Documento").val(),
        "Usuario": "",
        "Pais_ID": $("#Select_Pais_D").val(),
        "DescripPais": $("#Select_Pais_D option:selected").html(),
        "Ciudad_ID": $("#Select_Ciudad_D").val(),
        "DescripCiudad": $("#Select_Ciudad_D option:selected").html()
    }

    return Json_Direccion;
}

//arma el string del telefono
function lego_Phone(Index) {

    var tel = "";

    if ($("#TxtTel" + Index).val() != "") {
        if ($("#TxtInd" + Index).val() != "") {
            if ($("#TxtExt" + Index).val() != "") {
                tel = $("#TxtInd" + Index).val() + " " + $("#TxtTel" + Index).val() + " " + $("#TxtExt" + Index).val();
            }
            else {
                tel = $("#TxtInd" + Index).val() + " " + $("#TxtTel" + Index).val();
            }
        }
        else {
            if ($("#TxtExt" + Index).val() != "") {
                tel = $("#TxtTel" + Index).val() + " " + $("#TxtExt" + Index).val();
            }
            else {
                tel = $("#TxtTel" + Index).val();
            }
        }
    }
    return tel;
}

var StrCiudad_D;


//busca los datos por el consecutivo seleccionado
function Search_Adress(Index_Adress) {


    for (itemArray in ArrayDirecciones) {
        if (ArrayDirecciones[itemArray].Consecutivo == Index_Adress) {

            $("#TxtContact").val(ArrayDirecciones[itemArray].Contacto);
            $("#TxtCorreo_1").val(ArrayDirecciones[itemArray].Correo_1);
            $("#TxtCorreo_2").val(ArrayDirecciones[itemArray].Correo_2);
            $("#TxtDireccion").val(ArrayDirecciones[itemArray].Direccion);
            $("#TxtWeb").val(ArrayDirecciones[itemArray].PaginaWeb);

            $("#Select_Pais_D").val(ArrayDirecciones[itemArray].Pais_ID);
            StrCiudad_D = ArrayDirecciones[itemArray].Ciudad_ID;

            setTimeout("$('#Select_Pais_D').trigger('change');", 200);


            ArrayStrPhones[0] = ArrayDirecciones[itemArray].Telefono_1;
            ArrayStrPhones[1] = ArrayDirecciones[itemArray].Telefono_2;
            ArrayStrPhones[2] = ArrayDirecciones[itemArray].Telefono_3;
            ArrayStrPhones[3] = ArrayDirecciones[itemArray].Telefono_4;

            setTimeout("ChargeCiudad_D(StrCiudad_D);", 300);

            $('.C_Chosen').trigger('chosen:updated');
        }
    }
}

//funcion de carga de lacuidad para edicion
function ChargeCiudad_D(index) {
    $('#Select_Ciudad_D').val(index);
    $('.C_Chosen').trigger('chosen:updated');
}

//arma la vista segun el dato conastruido
function LegoView_Phone() {

    for (item in ArrayStrPhones) {

        var strTel = ArrayStrPhones[item];
        var SplitTel = strTel.split(" ");
        var Index = parseInt(item) + 1;
        var Dimencion = SplitTel.length;

        switch (Dimencion) {

            case 1:
                $("#TxtTel" + Index).val(SplitTel[0]);
                break;

            case 2:
                if (SplitTel[0].length < 5) {
                    $("#TxtInd" + Index).val(SplitTel[0]);
                    $("#TxtTel" + Index).val(SplitTel[1]);
                }
                else {
                    $("#TxtTel" + Index).val(SplitTel[0]);
                    $("#TxtExt" + Index).val(SplitTel[1]);
                }
                break;

            case 3:
                $("#TxtInd" + Index).val(SplitTel[0]);
                $("#TxtTel" + Index).val(SplitTel[1]);
                $("#TxtExt" + Index).val(SplitTel[2]);
                break;

            case 0:
                break;

        }

    }
}


//elimina del array el dato seleccionado
function Delete_Adress(Index_Adress) {
    for (itemArray in ArrayDirecciones) {
        if (ArrayDirecciones[itemArray].Consecutivo == Index_Adress) {
            ArrayDirecciones.splice(itemArray, 1);
        }
    }
}

//habilita la ventana emergente de direciones
function Format_Adress() {
    $("#TxtDireccion").mouseover(function () {

        $("#Txt_Special").css("display", "none");
        $("#Dialog_Format_Adress").dialog("open");
        $("#Dialog_Format_Adress").dialog("option", "title", "Ingrese Dirección");

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

    if ($("#Txt_End_Adress").val() != "") {
        $("#TxtDireccion").val($("#Txt_End_Adress").val());
    }

    $("#Dialog_Format_Adress").dialog("close");
}


/*---------------------------------------------------------------------------------------------------------------*/
/*                           FUNCIONES VALIDACION  Y LIMPIEZA DE CAMPOS                                                                      */
/*---------------------------------------------------------------------------------------------------------------*/

//valida los campos de correos
function RevCampos_E_mail() {

    var correo_1;
    var correo_2;
    var val_Email = 0;

    if ($("#TxtCorreo_1").val() != "") {
        correo_1 = ValidarEmail($("#TxtCorreo_1").val());
        if (correo_1 == 1) {
            val_Email = 1;
            $("#Img15").css("display", "block");
        }
        else {
            $("#Img15").css("display", "none");
        }
    }
    else {
        $("#Img15").css("display", "none");
    }

    if ($("#TxtCorreo_2").val() != "") {
        correo_2 = ValidarEmail($("#TxtCorreo_2").val());
        if (correo_2 == 1) {
            val_Email = 1;
            $("#Img16").css("display", "block");
        }
        else {
            $("#Img16").css("display", "none");
        }
    }
    else {
        $("#Img16").css("display", "none");
    }

    return val_Email;
}

//valida campos minimos para crear una direccion
function ValidaDireccion() {

    var Campo_1 = $("#TxtContact").val();
    var Campo_2 = $("#TxtDireccion").val();
    var Campo_3 = $("#Select_Pais_D").val();
    var Campo_4 = $("#Select_Ciudad_D").val();

    var validar = 0;

    if (Campo_4 == "-1" || Campo_3 == "-1" || Campo_2 == "" || Campo_1 == "") {
        validar = 1;
        if (Campo_1 == "")
            $("#Img13").css("display", "inline-table");
        else
            $("#Img13").css("display", "none");

        if (Campo_2 == "")
            $("#Img14").css("display", "inline-table");
        else
            $("#Img14").css("display", "none");

        if (Campo_3 == "-1")
            $("#ImgPais_D").css("display", "inline-table");
        else
            $("#ImgPais_D").css("display", "none");

        if (Campo_4 == "-1")
            $("#ImgCiudad").css("display", "inline-table");
        else
            $("#ImgCiudad").css("display", "none");

    }
    else {
        $("#ImgCiudad").css("display", "none");
        $("#ImgPais_D").css("display", "none");
        $("#Img13").css("display", "none");
        $("#Img14").css("display", "none");
    }

    return validar;
}


//limpiar campos de direcciones
function clearDireccion() {
    $("#TxtContact").val("");
    $("#TxtCorreo_1").val("");
    $("#TxtCorreo_2").val("");
    $("#TxtDireccion").val("");
    $("#TxtWeb").val("");
    $("#TxtTel1").val("");
    $("#TxtTel2").val("");
    $("#TxtTel3").val("");
    $("#TxtTel4").val("");
    $("#TxtInd1").val("");
    $("#TxtInd2").val("");
    $("#TxtInd3").val("");
    $("#TxtInd4").val("");
    $("#TxtExt1").val("");
    $("#TxtExt2").val("");
    $("#TxtExt3").val("");
    $("#TxtExt4").val("");

    $("#Select_Pais_D").val("-1");
    $("#Select_Ciudad_D").val("-1");

    $('.C_Chosen').trigger('chosen:updated');

}

/*---------------------------------------------------------------------------------------------------------------*/
/*                           FUNCIONES BLOQUEO Y DESBLOQUEO DE CAMPOS                                                                      */
/*---------------------------------------------------------------------------------------------------------------*/


//bloquear campos de direcciones
function Disabled_Direccion() {
    $("#TxtContact").attr("disabled", "disabled");
    $("#TxtCorreo_1").attr("disabled", "disabled");
    $("#TxtCorreo_2").attr("disabled", "disabled");
    $("#TxtDireccion").attr("disabled", "disabled");
    $("#TxtWeb").attr("disabled", "disabled");
    $("#TxtTel1").attr("disabled", "disabled");
    $("#TxtTel2").attr("disabled", "disabled");
    $("#TxtTel3").attr("disabled", "disabled");
    $("#TxtTel4").attr("disabled", "disabled");
    $("#Img15").css("display", "none");
    $("#Img16").css("display", "none");
    $("#Img13").css("display", "none");
    $("#Img14").css("display", "none");
    $("#TxtInd1").attr("disabled", "disabled");
    $("#TxtInd2").attr("disabled", "disabled");
    $("#TxtInd3").attr("disabled", "disabled");
    $("#TxtInd4").attr("disabled", "disabled");
    $("#TxtExt1").attr("disabled", "disabled");
    $("#TxtExt2").attr("disabled", "disabled");
    $("#TxtExt3").attr("disabled", "disabled");
    $("#TxtExt4").attr("disabled", "disabled");

    $("#Select_Pais_D").attr("disabled", "disabled");
    $("#Select_Ciudad_D").attr("disabled", "disabled");

}

//desbloquear campos de direcciones
function Enabled_Direccion() {
    $("#TxtContact").removeAttr("disabled");
    $("#TxtCorreo_1").removeAttr("disabled");
    $("#TxtCorreo_2").removeAttr("disabled");
    $("#TxtDireccion").removeAttr("disabled");
    $("#TxtWeb").removeAttr("disabled");
    $("#TxtTel1").removeAttr("disabled");
    $("#TxtTel2").removeAttr("disabled");
    $("#TxtTel3").removeAttr("disabled");
    $("#TxtTel4").removeAttr("disabled");
    $("#Img15").css("display", "none");
    $("#Img16").css("display", "none");
    $("#Img13").css("display", "none");
    $("#Img14").css("display", "none");
    $("#TxtInd1").removeAttr("disabled");
    $("#TxtInd2").removeAttr("disabled");
    $("#TxtInd3").removeAttr("disabled");
    $("#TxtInd4").removeAttr("disabled");
    $("#TxtExt1").removeAttr("disabled");
    $("#TxtExt2").removeAttr("disabled");
    $("#TxtExt3").removeAttr("disabled");
    $("#TxtExt4").removeAttr("disabled");

    $("#Select_Pais_D").removeAttr("disabled");
    $("#Select_Ciudad_D").removeAttr("disabled");

}

//llamado para el guardar el array de direcciones
function BtnSave_Adress_Client() {
    transacionAjax_Adress_create('Create_Adress', D_Nit, D_TDocumento, D_Documento);
}