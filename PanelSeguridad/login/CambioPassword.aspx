<%@ Page Title="Cambio Contraseña - SASIF Personas" Language="vb" AutoEventWireup="false" MasterPageFile="~/Sasif.Master"
    CodeBehind="CambioPassword.aspx.vb" Inherits="PanelSeguridad.CambioPassword" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="icon" type="image/png" href="../Images/LOGO_WEB.png" />
    <script src="../Scripts/jquery-1.4.1.js" type="text/javascript"></script>
    <script src="CambioPassword.js" type="text/javascript"></script>
    <script src="../SasifMaster.js" type="text/javascript"></script>
    <link href="../css/css_login.css" rel="stylesheet" type="text/css" />
    <script src="../SasifMaster_Cosult.js" type="text/javascript"></script>
    <link href="../css/custom/charge.css" rel="stylesheet" type="text/css" />
    <link href="../../css/Chosen/chosen.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/jquery.min.js" type="text/javascript"></script>
    <script src="../../Scripts/Chosen/chosen.jquery.js" type="text/javascript"></script>
    <link href="../../css/Dialog/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/Dialog/jquery-ui-1.10.4.custom.js" type="text/javascript"></script>
    <link href="../css/css_controles.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="main" runat="server">
    <div class="Container_title">
        <h2 class="titulo_login">CAMBIO DE CONTRASEÑA</h2>
    </div>
    <div id="marco_CC">
        <table id="TablaContraseña">
            <tr>
                <td class="Label_Bold">Nombre de Usuario
                </td>
            </tr>
            <tr>
                <td id="TdUser" class="Label_Bold"></td>
            </tr>
            <tr>
                <td class="Label_Bold">Digite Contraseña
                </td>
            </tr>
            <tr>
                <td id="TdPassword">
                    <span class="cssToolTip_Form">
                        <input id="TxtPassword" type="password" name="password" maxlength="12" style="width: 80%;" />
                        <span class="Spam_AST"></span></span><span class="cssToolTip">
                            <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="E1"
                                src="../images/error.png" />
                            <span class="SpamEG"></span></span>
                </td>
            </tr>
            <tr>
                <td id="TdHelpPassword"></td>
            </tr>
            <tr>
                <td class="Label_Bold">Confirme Contraseña
                </td>
            </tr>
            <tr>
                <td id="TdConfirmPassword">
                    <span class="cssToolTip_Form">
                        <input id="txtConfirmPassword" maxlength="12" type="password" />
                        <span class="Spam_AST"></span></span><span class="cssToolTip">
                            <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="E2"
                                src="../images/error.png" />
                            <span class="SpamEG"></span></span>
                </td>
            </tr>
            <tr>
                <td id="TdHelpConfirmPassword"></td>
            </tr>
            <tr>
                <td></td>
            </tr>
            <tr>
                <td id="TdControl" colspan="2" style="text-align: center;">
                    <input id="BtnCambiar" type="button" value="Cambiar" style="width: 40%;" onclick="BtnCambioPassword();" />
                </td>
            </tr>
        </table>
    </div>
    <div id="dialog">
        <table style="width: 100%; text-align: center;">
            <tr>
                <td class="Label_Bold">
                    <p id="Mensaje_alert">
                    </p>
                </td>
                <td>
                    <img alt="error" id="DE" src="../images/error.png" />
                    <img alt="success" id="SE" src="../images/success.png" />
                    <img alt="Warning" id="WA" src="../images/alert.png" />
                </td>
            </tr>
            <tr>
                <td colspan="2" align="center">
                    <input id="BtnExit" type="button" value="Salir" style="width: 40%; height:30px; padding: 5px; " onclick="BtnRedirect();" />
                </td>
            </tr>
        </table>
    </div>
</asp:Content>
