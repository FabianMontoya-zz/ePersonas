<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Administrador/Sasif_menu.Master"
    CodeBehind="Adm_ResetUser.aspx.vb" Inherits="PanelSeguridad.Adm_ResetUser" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../../Scripts/jquery-1.4.1.js" type="text/javascript"></script>
    <script src="../../SasifMaster.js" type="text/javascript"></script>
    <script src="../SasifMaster_Cosult.js" type="text/javascript"></script>
    <script src="Adm_ResetUser.js" type="text/javascript"></script>
    <link href="../../css/css_login.css" rel="stylesheet" type="text/css" />
    <link href="../../css/Dialog/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
    <link href="../../css/css_form.css" rel="stylesheet" type="text/css" />
    <link href="../../css/custom/charge.css" rel="stylesheet" type="text/css" />
    <link href="../../css/Chosen/chosen.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/jquery.min.js" type="text/javascript"></script>
    <script src="../../Scripts/Chosen/chosen.jquery.js" type="text/javascript"></script>
    <link href="../../css/Dialog/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/Dialog/jquery-ui-1.10.4.custom.js" type="text/javascript"></script>
    <link href="../../css/css_controles.css" rel="stylesheet" type="text/css" /> <meta http-equiv="Pragma" content="no-cache"/> <meta http-equiv="Expires" content="-1"/>
    <link href="../../css/custom/Control_Sasif.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="main" runat="server">
    <div id="Container_title_Form">
        <table id="Tabla_Title_form">
            <tr>
                <td id="Title_form"></td>
                <td id="image_exit">
                    <span class="cssToolTip_Form_L">
                        <input id="BtnExit" type="button" value="X" onclick="btnSalir();" /><span class="Spam_AEXIT_MOD"></span></span>
                </td>
            </tr>
        </table>
    </div>
    <div id="marco_RC">

        <table id="TablaContraseña">
            <tr>
                <td id="TD_ID" style="width: 100%;" class="Label_Bold" colspan="2">NIT Empresa</td>
            </tr>
            <tr>
                <td id="TD_TID" style="width: 40%;">
                    <select style="width: 100%;" id="Select_EmpresaNit" class="C_Chosen">
                    </select>
                </td>
                <td style="width: 2%; padding-bottom: 25px;">
                    <span class="cssToolTip">
                        <img alt="error" title="" style="padding-left: 0.5em; height: 21px; width: 21px;" id="ImgNIT"
                            src="../../images/error.png" />
                        <span class="SpamEG"></span></span>
                </td>
            </tr>
            <tr>
                <td style="width: 100%;" class="Label_Bold" colspan="2">Digite Usuario
                </td>
            </tr>
            <tr>
                <td style="width: 40%">
                    <span class="cssToolTip_Form">
                        <input style="width: 100%; padding-left: 1px;" type="text" id="Txt_ID" maxlength="10" />
                        <span class="Spam_AST"></span></span>
                </td>
                <td style="padding-bottom: 25px; width: 2%">
                    <span class="cssToolTip">
                        <img alt="error" title="" style="padding-left: 0.5em; height: 21px; width: 21px;" id="ImgID"
                            src="../../images/error.png" />
                        <span class="SpamEG"></span></span>
                </td>
            </tr>
            <tr>
                <td style="width: 100%;" class="Label_Bold" colspan="2">Estado
                </td>
            </tr>
            <tr>
                <td style="width: 40%">
                    <select id="DDLTipo" class="C_Chosen">
                        <option value="-1">Seleccione...</option>
                        <option value="0">0 - Activo</option>
                        <option value="1">1 - Inactivo / Deshabilitado</option>
                        <option value="2">2 - Eliminado</option>
                    </select>
                </td>
                <td style="padding-bottom: 25px; width: 2%;">
                    <span class="cssToolTip">
                        <img alt="error" title="" style="padding-left: 0.5em; height: 21px; width: 21px;" id="ImgEstado"
                            src="../../images/error.png" />
                        <span class="SpamEG"></span></span>
                </td>
            </tr>
            <tr>
                <td colspan="4" align="center">&nbsp;
                </td>
            </tr>
            <tr>
                <td colspan="2" align="center" id="TD_Button">
                    <input id="Btnguardar" type="button" value="Guardar" onclick="BtnCrear();" />
                </td>
            </tr>
        </table>
    </div>

    <div id="dialog" title="Basic dialog">
        <table style="width: 100%; text-align: center;">
            <tr>
                <td class="Label_Bold">
                    <p id="Mensaje_alert">
                    </p>
                </td>
                <td>
                    <img alt="error" id="DE" src="../../images/error_2.png" />
                    <img alt="success" id="SE" src="../../images/success.png" />
                    <img alt="Warning" id="WA" src="../../images/alert.png" />
                </td>
            </tr>
            <tr>
                <td colspan="2" align="center">
                    <input id="BtnExitD" type="button" value="Salir" style="width: 40%;" onclick="javascript: x();" />
                </td>
            </tr>
        </table>
    </div>

    <div id="Dialog_Control" style="width: 100%; text-align: center;">
        <div class="cssload-container" style="margin-top: 25%;">
            <div class="cssload-whirlpool"></div>
            <div>
                <img id="Sasif" class="Logo_3" src="../../images/SASIF_NEW_WHITE.png" alt="SASIF S.A.S." />
            </div>
        </div>
    </div>
</asp:Content>
