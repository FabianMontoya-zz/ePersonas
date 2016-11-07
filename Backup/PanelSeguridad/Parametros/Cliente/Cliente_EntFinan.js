var ArrayBancos = [];
var ListBancos = [];

/*---------------------------------------------------------------------------------------------------------------*/
/*                                        GRID PRINCIPAL DE ENTIDADES FINANCIERAS                                */
/*---------------------------------------------------------------------------------------------------------------*/

//el llamado para insertar modificar o eliminar la direcciones
function Bancos(Option_Bank) {
    $("#Dialog_EntidadFinanciera").dialog("open");
    $("#Dialog_EntidadFinanciera").dialog("option", "title", "Entidades Financieras de: " + Nombre_Persona);

    if (OpcWordComplementos == 'V')
        $("#BtnSave_Bank").css("display", "none");
    else
        $("#BtnSave_Bank").css("display", "inline-table");


    switch (Option_Bank) {
        case "V":
            $("#Txt_Nit_B").val(D_Nit);
            $("#Txt_TypeIden_B").val($("#Con_Documento").html());
            $("#Txt_Ident_B").val(D_Documento);
            $("#Txt_Nit_B_2").val(D_Nit);
            $("#Txt_TypeIden_B_2").val($("#Con_Documento").html());
            $("#Txt_Ident_B_2").val(D_Documento);

            transacionAjax_allBank('R_ead_Bank', D_Nit, D_TDocumento, D_Documento, Option_Bank);

            break;

        case "U":

            var Nit_Work;

            if ($("#Select_EmpresaNit").val() == "-1")
                Nit_Work = NitAlter;
            else
                Nit_Work = $("#Select_EmpresaNit").val();

            $("#Txt_Nit_B").val(Nit_Work);
            $("#Txt_TypeIden_B").val($("#Select_Documento option:selected").text());
            $("#Txt_Ident_B").val($("#Txt_Ident").val() + "-" + $("#TxtVerif").val());
            $("#Txt_Nit_B_2").val(Nit_Work);
            $("#Txt_TypeIden_B_2").val($("#Select_Documento option:selected").text());
            $("#Txt_Ident_B_2").val($("#Txt_Ident").val() + "-" + $("#TxtVerif").val());

            transacionAjax_allBank('R_ead_Bank', $("#Select_EmpresaNit").val(), $("#Select_Documento").val(), $("#Txt_Ident").val(), Option_Bank);
            break;
    }
}

//grid bancos cliente
function Tabla_General_Bank(Opc_Link) {
    var html = "";
    var contador = 0;

    switch (Opc_Link) {
        case "V":
            html = "<table id='TBank' border='1' cellpadding='1' cellspacing='1'  style='width: 100%; margin-top: 20px;'><thead><tr><th>Opciones</th><th>Entidad Financiera</th><th>Tipo de cuenta</th><th>N° Cuenta</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Modificación</th></tr></thead><tbody>";
            break;

        case "U":
            html = "<table id='TBank' border='1' cellpadding='1' cellspacing='1'  style='width: 100%; margin-top: 20px;'><thead><tr><th>Opciones <span class='cssToolTip_ver'><img alt='Bank' class='AddBank' onclick=\"AddBank()\" id='Crear' height='20px' width='20px' src='../../images/add.png' /><span>Agregar Nueva Entidad Financiera</span></span></th><th>Entidad Financiera</th><th>Tipo de cuenta</th><th>N° Cuenta</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Modificación</th></tr></thead><tbody>";
            break;
    }

    for (itemArray in ArrayBancos) {
        if (ArrayBancos[itemArray].TypeDoc_ID != "") {

            switch (Opc_Link) {
                case "V":
                    if (estado == "eliminar")
                        html += "<tr><td><select id='Select_" + ArrayBancos[itemArray].Document_ID_EF + "' class='Opciones' onchange=\"Select_Option_Bank(this,'" + ArrayBancos[itemArray].Document_ID_EF + "','" + ArrayBancos[itemArray].TipoCuenta + "','" + ArrayBancos[itemArray].Cuenta + "');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option><option value='R'>Retirar</option></select></td><td>" + ArrayBancos[itemArray].DescripEntidad + "</td><td>" + ArrayBancos[itemArray].TipoCuenta + " - " + ArrayBancos[itemArray].DecripCuenta + "</td><td>" + ArrayBancos[itemArray].Cuenta + "</td><td>" + ArrayBancos[itemArray].UsuarioCreacion + "</td><td>" + ArrayBancos[itemArray].FechaCreacion + "</td><td>" + ArrayBancos[itemArray].UsuarioActualizacion + "</td><td>" + ArrayBancos[itemArray].FechaActualizacion + "</td></tr>";
                    else
                        html += "<tr><td><select id='Select_" + ArrayBancos[itemArray].Document_ID_EF + "' class='Opciones' onchange=\"Select_Option_Bank(this,'" + ArrayBancos[itemArray].Document_ID_EF + "','" + ArrayBancos[itemArray].TipoCuenta + "','" + ArrayBancos[itemArray].Cuenta + "');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option></select></td><td>" + ArrayBancos[itemArray].DescripEntidad + "</td><td>" + ArrayBancos[itemArray].TipoCuenta + " - " + ArrayBancos[itemArray].DecripCuenta + "</td><td>" + ArrayBancos[itemArray].Cuenta + "</td><td>" + ArrayBancos[itemArray].UsuarioCreacion + "</td><td>" + ArrayBancos[itemArray].FechaCreacion + "</td><td>" + ArrayBancos[itemArray].UsuarioActualizacion + "</td><td>" + ArrayBancos[itemArray].FechaActualizacion + "</td></tr>";
                    break;

                case "U":
                    html += "<tr><td><select id='Select_" + ArrayBancos[itemArray].Document_ID_EF + "' class='Opciones' onchange=\"Select_Option_Bank(this,'" + ArrayBancos[itemArray].Document_ID_EF + "','" + ArrayBancos[itemArray].TipoCuenta + "','" + ArrayBancos[itemArray].Cuenta + "');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option><option value='R'>Retirar</option></select></td><td>" + ArrayBancos[itemArray].DescripEntidad + "</td><td>" + ArrayBancos[itemArray].TipoCuenta + " - " + ArrayBancos[itemArray].DecripCuenta + "</td><td>" + ArrayBancos[itemArray].Cuenta + "</td><td>" + ArrayBancos[itemArray].UsuarioCreacion + "</td><td>" + ArrayBancos[itemArray].FechaCreacion + "</td><td>" + ArrayBancos[itemArray].UsuarioActualizacion + "</td><td>" + ArrayBancos[itemArray].FechaActualizacion + "</td></tr>";
                    break;
            }

        }
        contador += 1;
    }

    html += "</tbody></table>";
    $("#container_Bank").html("");
    $("#container_Bank").html(html);

    $(".AddBank").click(function () {
    });

    $("#TBank").dataTable({
        "iDisplayLength": -1,
        "aaSorting": [[1, "asc"]],
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

/*---------------------------------------------------------------------------------------------------------------*/
/*                      CASOS DE LLAMADO SEGUN LA OPERACION DE ENTIDADES FINANCIERAS                             */
/*---------------------------------------------------------------------------------------------------------------*/
//llamado del boton agregar o eliminar Entidad Financiera
function InsertAddBank() {

    var validate;
    validate = ValidaEntidadFinanciera();

    if (validate == 0) {
        switch ($("#BtnAddBank").val()) {

            case "Agregar":
                var validateRepetido = Repetido();
                if (validateRepetido == 0) {
                    Add_Array_Bank();
                }
                else {
                    $("#dialog").dialog("option", "title", "Atención!");
                    $("#Mensaje_alert").text("la Entidad ya fue agregada!");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "none");
                    $("#SE").css("display", "none");
                    $("#WE").css("display", "block");
                }

                break;

            case "Eliminar":
                $("#Dialog_Delete_Bank").dialog("open");
                break;

            case "Salir":
                ReadView_Bank();
                break;
        }
    }
}

//selecciona que tipo de operacion desea con el registro seleccionado
function Select_Option_Bank(Select_control, Nit_Bank, TC_bank, Cuenta_Bank) {
    var Select_Value = $(Select_control).val();

    switch (Select_Value) {

        case "V": //visualizar
            ReadBank(Nit_Bank, TC_bank, Cuenta_Bank);
            Disabled_Bank();
            break;

        case "R": //eliminar
            DeleteBank(Nit_Bank, TC_bank, Cuenta_Bank);
            Disabled_Bank();
            break;
    }

}


/*---------------------------------------------------------------------------------------------------------------*/
/*                                        CREAR DE ENTIDADES FINANCIERAS                                                                       */
/*---------------------------------------------------------------------------------------------------------------*/

//funcion que abre la ventana para la creacion de direccion
function AddBank() {
    ClearBank();
    Enabled_Bank();
    $("#Dialog_C_R_U_D_Bank").dialog("open");
    $("#Dialog_C_R_U_D_Bank").dialog("option", "title", "Nueva Entidad Financiera de: " + Nombre_Persona);
    $("#BtnAddBank").attr("value", "Agregar");
}

//agrega al array de direcciones los datos diligenciados
function Add_Array_Bank() {

    var Json_Bank = Convert_and_Valide_Json_Bank();
    ArrayBancos.push(Json_Bank);
    Tabla_General_Bank('U');

    $("#dialog").dialog("option", "title", "Exito");
    $("#Mensaje_alert").text("la Nueva Entidad Financiera fue agregada!");
    $("#dialog").dialog("open");
    $("#DE").css("display", "none");
    $("#SE").css("display", "block");
    $("#WE").css("display", "none");
    $("#Dialog_C_R_U_D_Bank").dialog("close");
    ClearBank();

}

/*---------------------------------------------------------------------------------------------------------------*/
/*                                        ELIMINAR ENTIDAD FINANCIERA                                            */
/*---------------------------------------------------------------------------------------------------------------*/

//funcion que abre la ventana para la Eliminacion de direccion
function DeleteBank(Nit_Bank, TC_bank, Cuenta_Bank) {

    $("#Dialog_C_R_U_D_Bank").dialog("open");
    $("#Dialog_C_R_U_D_Bank").dialog("option", "title", "Retirar Entidad Financiera de: " + +Nombre_Persona);
    $("#BtnAddBank").attr("value", "Eliminar");

    Search_Bank(Nit_Bank, TC_bank, Cuenta_Bank);
    Delete_bank(Nit_Bank, TC_bank, Cuenta_Bank);
}

// CONFIRMA SI SE ELIMINA EL REGISTRO
function Confirm_Bank(Confirm) {
    if (Confirm == 'N') {
        RestoreDelete_Array_Bank();
    }
    else {
        $("#dialog").dialog("option", "title", "Exito");
        $("#Mensaje_alert").text("la Entidad Financiera fue Retirada!");
        $("#dialog").dialog("open");
        $("#DE").css("display", "none");
        $("#SE").css("display", "block");
        $("#WE").css("display", "none");
        $("#Dialog_C_R_U_D_Bank").dialog("close");
        $("#Dialog_Delete_Bank").dialog("close");

        for (itemArray in ArrayDirecciones) {
            ArrayDirecciones[itemArray].Consecutivo = parseInt(itemArray) + 1;
        }

        Tabla_General_Bank('U');
        ClearBank();

    }
}

//Restaura la eliminacion al array de direcciones los datos diligenciados
function RestoreDelete_Array_Bank() {

    var Json_Bank = Convert_and_Valide_Json_Bank();
    ArrayBancos.push(Json_Bank);

    $("#Dialog_Delete_Bank").dialog("close");
    $("#Dialog_C_R_U_D_Bank").dialog("close");
    Tabla_General_Bank("Default");
    ClearBank();

}

/*---------------------------------------------------------------------------------------------------------------*/
/*                                        LEER DE ENTIDADES FINANCIERAS                                          */
/*---------------------------------------------------------------------------------------------------------------*/

//funcion que abre la ventana para la Actualizacion de direccion
function ReadBank(Nit_Bank, TC_bank, Cuenta_Bank) {

    $("#Dialog_C_R_U_D_Bank").dialog("open");
    $("#Dialog_C_R_U_D_Bank").dialog("option", "title", "Entidad Financiera de: " + Nombre_Persona);
    $("#BtnAddBank").attr("value", "Salir");

    Search_Bank(Nit_Bank, TC_bank, Cuenta_Bank);
}

//CIERRA LA VENTANA EMERGENTE
function ReadView_Bank() {
    $("#Dialog_C_R_U_D_Bank").dialog("close");
}

/*---------------------------------------------------------------------------------------------------------------*/
/*                           FUNCIONES COMPLEMETARIAS DEL CRUD                                                                      */
/*---------------------------------------------------------------------------------------------------------------*/

//funcion que captura la direccion y la comvierte en un Json
function Convert_and_Valide_Json_Bank() {

    var strTD = $("#Txt_TypeIden_B_2").val();
    var SplitTD = strTD.split(" - ");

    var strD = $("#Txt_Ident_B_2").val();
    var SplitD = strD.split("-");

    var strEntF = $("#Select_EntFinanciera option:selected").html();
    var SplitEntF = strEntF.split(" - ");

    var strTC = $("#Select_TipoCuenta option:selected").html();
    var SplitTC = strTC.split(" - ");

    var Json_Bank = {
        "Nit_ID": $("#Txt_Nit_B_2").val(),
        "TypeDocument_ID": SplitTD[0],
        "Document_ID": SplitD[0],
        "Document_ID_EF": SplitEntF[0],
        "TypeDocument_ID_EF": SplitEntF[1],
        "DescripEntidad": SplitEntF[2],
        "TipoCuenta": SplitTC[0],
        "DecripCuenta": SplitTC[1],
        "Cuenta": $("#TxtCuenta").val().toUpperCase(),
        "UsuarioCreacion": User.toUpperCase(),
        "UsuarioActualizacion": User.toUpperCase(),
        "FechaCreacion": $("#Hours").html(),
        "FechaActualizacion": $("#Hours").html()
    }

    return Json_Bank;
}

//busca los datos por el banco seleccionado
function Search_Bank(Nit_Bank, TC_bank, Cuenta_Bank) {

    for (itemArray in ArrayBancos) {
        if (ArrayBancos[itemArray].Document_ID_EF == Nit_Bank && ArrayBancos[itemArray].TipoCuenta == TC_bank && ArrayBancos[itemArray].Cuenta == Cuenta_Bank) {

            $("#Select_EntFinanciera").val(ArrayBancos[itemArray].Document_ID_EF);
            $("#Select_TipoCuenta").val(ArrayBancos[itemArray].TipoCuenta);
            $("#TxtCuenta").val(ArrayBancos[itemArray].Cuenta);

            $('.C_Chosen').trigger('chosen:updated');
        }
    }
}

//elimina del array el dato seleccionado
function Delete_bank(Nit_Bank, TC_bank, Cuenta_Bank) {
    for (itemArray in ArrayBancos) {
        if (ArrayBancos[itemArray].Document_ID_EF == Nit_Bank && ArrayBancos[itemArray].TipoCuenta == TC_bank && ArrayBancos[itemArray].Cuenta == Cuenta_Bank) {
            ArrayBancos.splice(itemArray, 1);
        }
    }
}

/*---------------------------------------------------------------------------------------------------------------*/
/*                           FUNCIONES VALIDACION  Y LIMPIEZA DE CAMPOS                                                                      */
/*---------------------------------------------------------------------------------------------------------------*/

//valida si la entidad ya fue registrada en la grilla
function Repetido() {

    var Campo_1 = $("#Select_EntFinanciera").val();
    var Campo_2 = $("#Select_TipoCuenta").val();
    var Campo_3 = $("#TxtCuenta").val();
    var validar = 0;

    for (item in ArrayBancos) {
        if (Campo_1 == ArrayBancos[item].Document_ID_EF && Campo_2 == ArrayBancos[item].TipoCuenta && Campo_3 == ArrayBancos[item].Cuenta)
            validar = 1;
    }

    return validar;
}

//valida campos minimos para crear una direccion
function ValidaEntidadFinanciera() {

    var Campo_1 = $("#Select_EntFinanciera").val();
    var Campo_2 = $("#Select_TipoCuenta").val();
    var Campo_3 = $("#TxtCuenta").val();

    var validar = 0;

    if (Campo_3 == "" || Campo_2 == "-1" || Campo_1 == "-1") {
        validar = 1;
        if (Campo_1 == "-1")
            $("#Img6").css("display", "inline-table");
        else
            $("#Img6").css("display", "none");

        if (Campo_2 == "-1")
            $("#Img7").css("display", "inline-table");
        else
            $("#Img7").css("display", "none");

        if (Campo_3 == "")
            $("#Img8").css("display", "inline-table");
        else
            $("#Img8").css("display", "none");
    }
    else {
        $("#Img6").css("display", "none");
        $("#Img7").css("display", "none");
        $("#Img8").css("display", "none");
    }
    return validar;
}

//limpiar campos de Entidades finacieras
function ClearBank() {
    $("#Select_EntFinanciera").val("-1");
    $("#Select_TipoCuenta").val("-1");
    $("#TxtCuenta").val("");

    $('.C_Chosen').trigger('chosen:updated');

}

//bloquear campos de Entidades finacieras
function Disabled_Bank() {

    $("#Select_EntFinanciera").attr("disabled", "disabled");
    $("#Select_TipoCuenta").attr("disabled", "disabled");
    $("#TxtCuenta").attr("disabled", "disabled");

    $('.C_Chosen').trigger('chosen:updated')
}

//desbloquear campos de Entidades finacieras
function Enabled_Bank() {

    $("#Select_EntFinanciera").removeAttr("disabled");
    $("#Select_TipoCuenta").removeAttr("disabled");
    $("#TxtCuenta").removeAttr("disabled");

    $('.C_Chosen').trigger('chosen:updated');
}


//llamado para el guardar el array de direcciones
function BtnSave_Bank_Client() {
    transacionAjax_Bank_create('Create_Bank', D_Nit, D_TDocumento, D_Documento);
}