<%@ Page Title="Login - SASIF Personas" Language="vb" AutoEventWireup="false" MasterPageFile="~/Sasif.Master"
    CodeBehind="Login.aspx.vb" Inherits="PanelSeguridad.Login" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../Scripts/jquery-1.4.1.js" type="text/javascript"></script>
    <script src="Login.js" type="text/javascript"></script>
    <script src="LoginTransaccionsAjax.js" type="text/javascript"></script>
    <script src="../SasifMaster.js" type="text/javascript"></script>
    <link href="../css/Dialog/jquery-ui.css" rel="stylesheet" type="text/css" />
    <script src="../SasifMaster_Cosult.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.min.js" type="text/javascript"></script>
    <link href="../../css/Dialog/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/Dialog/jquery-ui-1.10.4.custom.js" type="text/javascript"></script>
    <script src="../../Scripts/Chosen/chosen.jquery.js" type="text/javascript"></script>
    <link href="../../css/Chosen/chosen.css" rel="stylesheet" type="text/css" />
    <link href="../css/css_login.css" rel="stylesheet" type="text/css" />
    <link href="../css/css_controles.css" rel="stylesheet" type="text/css" />
    <meta http-equiv="pragma" content="no-cache" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="main" runat="server">
    <div class="Container_title">
        <h2 class="titulo_login">CUENTA DE USUARIOS</h2>
    </div>
    <div class="marco">
        <div class="TablaRegistro">

            <table id="User_Name2" style="width: 100%;">
                <tr>
                    <td id="TD_Nit_ID" class="Label_bold">NIT Empresa</td>
                </tr>
                <tr>
                    <td style="width: 40%; padding-left: 30px;">
                        <select style="width: 100%;" id="Select_EmpresaNit" class="C_Chosen">
                        </select>
                    </td>
                    <td style="width: 2%; padding-bottom: 25px;">
                        <span class="cssToolTip">
                            <img alt="error" title="" style="padding-left: 0.5em; height: 21px; width: 21px;" id="ImgNIT"
                                src="../../images/error.png" />
                            <span id="S_NIT"></span></span>

                    </td>
                </tr>
                <tr>
                    <td id="Lbluser" class="Label_bold">Nombre de Usuario
                    </td>
                </tr>
                <tr>
                    <td style="width: 40%; padding-left: 30px;">
                        <input style="width: 96%;" type="text" id="TxtUser" maxlength="10" />
                    </td>
                    <td style="padding-bottom: 25px; width: 2%">
                        <span class="cssToolTip">
                            <img alt="error" title="" style="padding-left: 0.5em; height: 21px; width: 21px;" id="EUser"
                                src="../../images/error.png" />
                            <span id="S_User"></span></span>
                    </td>

                </tr>
                <tr>
                    <td id="TdHelpUser"></td>
                </tr>
                <tr>
                    <td id="LblPassword" class="Label_bold">Contraseña
                    </td>
                </tr>
                <tr>
                    <td style="width: 40%; padding-left: 30px;">
                        <input style="width: 96%;" type="password" id="TxtPassword" maxlength="20" />
                    </td>
                    <td style="padding-bottom: 25px; width: 2%">
                        <span class="cssToolTip">
                            <img alt="error" title="" style="padding-left: 0.5em; height: 21px; width: 21px;" id="EPassword"
                                src="../../images/error.png" />
                            <span id="S_Pass"></span></span>
                    </td>

                </tr>
            </table>
            <table id="Table3">
                <tr>
                    <td id="TdHelpPassword"></td>
                </tr>

                <tr>
                    <td></td>
                </tr>

            </table>
            <table id="T_BTNGuardar" style="width: 100%;">
                <tr>
                    <td id="TdControl" style="text-align: center;">
                        <input id="BtnIngresar" type="button" value="Entrar" onclick="BtnEntrar();" />
                    </td>
                </tr>
            </table>
        </div>
    </div>

    <div id="dialog">
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
</asp:Content>
