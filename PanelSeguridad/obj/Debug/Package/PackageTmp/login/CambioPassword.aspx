<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Sasif.Master"
    CodeBehind="CambioPassword.aspx.vb" Inherits="PanelSeguridad.CambioPassword" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../Scripts/jquery-1.4.1.js" type="text/javascript"></script>
    <script src="CambioPassword.js" type="text/javascript"></script>
    <script src="../SasifMaster.js" type="text/javascript"></script>
    <link href="../css/css_login.css" rel="stylesheet" type="text/css" />
    <script src="../SasifMaster_Cosult.js" type="text/javascript"></script>
    <link href="../css/custom/charge.css" rel="stylesheet" type="text/css" />
    <link href="../css/css_controles.css" rel="stylesheet" type="text/css" />
    <link href="../../css/Chosen/chosen.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/jquery.min.js" type="text/javascript"></script>
    <script src="../../Scripts/Chosen/chosen.jquery.js" type="text/javascript"></script>
    <link href="../../css/Dialog/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/Dialog/jquery-ui-1.10.4.custom.js" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="main" runat="server">
    <div id="Container_title">
        <h2 id="titulo_login">
            CAMBIO DE CONTRASEÑA</h2>
    </div>
    <div id="marco_CC">
        <table id="TablaContraseña">
            <tr>
                <td class="Label_bold">
                    Nombre de Usuario
                </td>
            </tr>
            <tr>
                <td id="TdUser" class="Label_bold">
                </td>
            </tr>
            <tr>
                <td class="Label_bold">
                    Digite Contraseña
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
                <td id="TdHelpPassword">
                </td>
            </tr>
            <tr>
                <td class="Label_bold">
                    Confirme Contraseña
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
                <td id="TdHelpConfirmPassword">
                </td>
            </tr>
            <%--<tr>
                    <td id="TdCheck">
                        <input type="checkbox" id="show" />
                        <label id="LblShow" for="show">
                            Mostrar password.</label>
                    </td>
                </tr>--%>
            <tr>
                <td>
                </td>
            </tr>
            <tr>
                <td id="TdControl" colspan="2" style="text-align: center;">
                    <input id="BtnCambiar" type="button" value="Cambiar" style="width: 40%;" />
                </td>
            </tr>
        </table>
    </div>
    <div id="dialog" title="Basic dialog">
        <table>
            <tr>
                <td>
                    <p id="Mensaje_alert">
                    </p>
                </td>
                <td>
                    <img alt="error" id="DE" src="../images/error.png" />
                    <img alt="success" id="SE" src="../images/success.png" />
                </td>
            </tr>
            <tr>
                <td align="center">
                    <input id="BtnExit" type="button" value="Salir" style="width: 40%;" />
                </td>
            </tr>
        </table>
    </div>
</asp:Content>
