<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Master/Sasif_Ing.Master"
    CodeBehind="Acceso.aspx.vb" Inherits="PanelSeguridad.Acceso" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../../Scripts/jquery-1.4.1.js" type="text/javascript"></script>
    <script src="../../SasifMaster.js" type="text/javascript"></script>
    <script src="../SasifMaster_Cosult.js" type="text/javascript"></script>
    <script src="Acceso.js" type="text/javascript"></script>
    <script src="AccesoTrasaccionsAjax.js" type="text/javascript"></script>
    <link href="../../css/css_login.css" rel="stylesheet" type="text/css" />
    <link href="../../css/css_form.css" rel="stylesheet" type="text/css" />
    <link href="../../css/datatables/jquery.dataTables.css" rel="stylesheet" type="text/css" />
    <link href="../../css/custom/charge.css" rel="stylesheet" type="text/css" />
    <link href="../../css/Chosen/chosen.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/jquery.min.js" type="text/javascript"></script>
    <script src="../../Scripts/Chosen/chosen.jquery.js" type="text/javascript"></script>
    <link href="../../css/Dialog/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
    <link href="../../css/css_WebAcceso.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/Dialog/jquery-ui-1.10.4.custom.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.dataTables.min.js" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="main" runat="server">
    <div id="Container_title_Form">
    </div>
    <div id="Marco_Web">
        <div id="Marco_trabajo_Web">
            <div id="Container_controls">
                <table id="Tabla_Captura" style="width: 1100px; text-align: left;">
                    <tr>
                        <td class="Label_Bold" style="width: 150px;">
                            Tipo Documento
                        </td>
                        <td style="width: 350px;">
                            <select id="Select_Documento" class="C_Chosen">
                            </select>
                        </td>
                        <td style="padding-bottom: 25px; width: 80px;">
                            <span class="cssToolTip">
                                <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img1"
                                    src="../../images/error.png" />
                                <span class="SpamEG"></span></span>
                        </td>
                        <td class="Label_Bold" style="width: 100px;">
                            Identificación
                        </td>
                        <td style="width: 150px;">
                            <span class="cssToolTip_Form">
                                <input type="text" id="TxtDoc" maxlength="18" class="Numeric" style="width: 150px;" />
                                <span class="Spam_AN"></span></span>
                        </td>
                        <td style="padding-bottom: 25px; width: 100px;">
                            <span class="cssToolTip">
                                <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img2"
                                    src="../../images/error.png" />
                                <span class="SpamEG"></span></span>
                        </td>
                        <td style="width: 100px;">
                            <input id="Btnguardar" class="BWeb" type="button" value="Consultar" onclick="BtnConsulta();" />
                        </td>
                    </tr>
                </table>
                <table id="Inf_persona">
                    <tr>
                        <td class="Label_Bold" style="width: 100px;">
                            Nombre
                        </td>
                        <td id="L_Nombre" style="width: 350px;">
                        </td>
                        <td class="Label_Bold" style="width: 100px;">
                            Empresa
                        </td>
                        <td id="L_Empresa" style="width: 350px;">
                        </td>
                        <td id="imagen" rowspan="2" style="text-align: end;">
                            <img alt="foto" title="" style="height: 100px; width: 80px; border-radius: 4px; border-color: #420101;
                                border-width: 2px; border-style: outset;" id="Imgfoto" src="../../images/avatar.png" />
                        </td>
                    </tr>
                    <tr>
                        <td class="Label_Bold">
                            Area
                        </td>
                        <td id="L_Area">
                        </td>
                        <td class="Label_Bold">
                            Cargo
                        </td>
                        <td id="L_Cargo">
                        </td>
                    </tr>
                </table>
            </div>
            <div id="Container_BloqueAcceso">
                <div id="container_T_DP" style="margin-top: 10px;">
                </div>
                <div id="container_T_DE" style="margin-top: 10px;">
                </div>
            </div>
        </div>
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
                    <img alt="Warning" id="WE" src="../../images/alert.png" />
                </td>
            </tr>
            <tr>
                <td colspan="2" align="center">
                    <input id="BtnExitD" class="BWeb" type="button" value="Salir" style="width: 40%;"
                        onclick="x();" />
                </td>
            </tr>
        </table>
    </div>
    <div id="dialog_eliminar" title="Basic dialog">
        <table style="width: 100%; text-align: center;">
            <tr>
                <td>
                    <p class="Label_Bold" id="P1">
                        Desea eliminar el siguiente registro?
                    </p>
                </td>
                <td>
                    <img alt="Warning" id="Img4" src="../../images/alert.png" />
                </td>
            </tr>
            <tr>
                <td colspan="2" align="center">
                    <input id="BtnElimin" type="button" value="Confirmar" onclick="BtnElimina();" />
                </td>
            </tr>
        </table>
    </div>
    <div id="Dialog_Visor">
        <table style="width: 100%; height: 100%;">
            <tr>
                <td>
                    <iframe id="IF_Visor" src=""></iframe>
                </td>
            </tr>
        </table>
    </div>
</asp:Content>
