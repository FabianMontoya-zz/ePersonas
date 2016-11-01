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
    <link href="../../css/css_controles.css" rel="stylesheet" type="text/css" />
    <link href="../../css/Chosen/chosen.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/jquery.min.js" type="text/javascript"></script>
    <script src="../../Scripts/Chosen/chosen.jquery.js" type="text/javascript"></script>
    <link href="../../css/Dialog/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/Dialog/jquery-ui-1.10.4.custom.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.dataTables.min.js" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="main" runat="server">
    <div id="Container_title_Form">
    </div>
    <div id="Marco_link">
        <div id="Marco_trabajo_Form">
            <div id="Container_controls">
                <table id="T_Radio" style="width: 400px; text-align: left;">
                    <tr>
                        <td style="width: 100px;" class="Label_Bold">
                            Lector
                        </td>
                        <td>
                            <input type="radio" name="Captura" value="L" />
                        </td>
                        <td style="width: 100px;" class="Label_Bold">
                            Digitación
                        </td>
                        <td>
                            <input type="radio" name="Captura" value="D" />
                        </td>
                    </tr>
                </table>
                <div id="Div_L">
                    <table id="Tabla_4" style="width: 700px; text-align: left;">
                        <tr>
                            <td style="width: 105px;" class="Label_Bold">
                                ID Tarjeta
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input type="text" id="TxtIDTarjeta" maxlength="10" class="Numeric" style="width: 165px;
                                        height: 25px; font: 20px/20px Verdana,sans-serif; text-align: center;" />
                                    <span class="SpamALEC"></span></span>
                            </td>
                            <td style="padding-bottom: 25px; width: 250px;">
                            </td>
                        </tr>
                    </table>
                </div>
                <div id="Div_D">
                    <table id="Table1" style="width: 700px; text-align: left;">
                        <tr>
                            <td class="Label_Bold" style="width: 100px;">
                                Tipo Documento
                            </td>
                            <td style="width: 60px; width: 100px;">
                                <select id="Select_TD" class="C_Chosen">
                                    <option value="-1">Seleccione...</option>
                                    <option value="1">Cedula</option>
                                    <option value="2">Nit</option>
                                    <option value="3">Cedula Extranjera</option>
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 100px;">
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
                                    <input type="text" id="TxtDoc" maxlength="19" class="Numeric" style="width: 150px;" />
                                    <span class="SpamAN"></span></span>
                            </td>
                            <td style="padding-bottom: 25px; width: 100px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img2"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="Tabla_1" style="width: 700px; text-align: left;">
                        <tr>
                            <td style="width: 150px;" class="Label_Bold">
                                Multi - Empresa
                            </td>
                            <td>
                                <select id="Select_EmpresaNit" class="C_Chosen">
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 250px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img3"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
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
                    <input id="BtnExitD" type="button" value="Salir" style="width: 40%;" onclick="x();" />
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
</asp:Content>
