<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Parametros/Sasif_menu.Master"
    CodeBehind="Paises.aspx.vb" Inherits="PanelSeguridad.Paises" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../../Scripts/jquery-1.4.1.js" type="text/javascript"></script>
    <script src="../../SasifMaster.js" type="text/javascript"></script>
    <script src="../SasifMaster_Cosult.js" type="text/javascript"></script>
    <script src="Paises.js" type="text/javascript"></script>
    <script src="PaisesTrasaccionsAjax.js" type="text/javascript"></script>
    <link href="../../css/css_login.css" rel="stylesheet" type="text/css" />
    <link href="../../css/css_form.css" rel="stylesheet" type="text/css" />
    <link href="../../css/custom/charge.css" rel="stylesheet" type="text/css" />
    <link href="../../css/css_controles.css" rel="stylesheet" type="text/css" />
    <link href="../../css/datatables/jquery.dataTables.css" rel="stylesheet" type="text/css" />
    <link href="../../css/Chosen/chosen.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/jquery.min.js" type="text/javascript"></script>
    <script src="../../Scripts/Chosen/chosen.jquery.js" type="text/javascript"></script>
    <link href="../../css/Dialog/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/Dialog/jquery-ui-1.10.4.custom.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.dataTables.min.js" type="text/javascript"></script>
    <script src="../../Scripts/Dialog/datepicker.js" type="text/javascript"></script>
    <script src="../../Scripts/Dialog/timepicker.js" type="text/javascript"></script>
    <style>
        .ui-widget
        {
            background: silver;
            border: solid;
            border-color: gray;
            border-width: 1px;
            border-radius: 5px 5px 5px 5px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="main" runat="server">
    <div id="Container_title_Form">
        <table id="Tabla_Title_form">
            <tr>
                <td id="Title_form">
                </td>
                <td id="image_exit">
                    <span class="cssToolTip_Form_L">
                        <input id="BtnExit" type="button" value="X" onclick="btnSalir();" /><span class="Spam_AEXIT_MOD"></span></span>
                </td>
            </tr>
        </table>
    </div>
    <div id="Marco_link">
        <div id="Marco_btn_Form">
            <input id="BtnShearh" type="button" value="Consulta" onclick="HabilitarPanel('buscar');" />
            <input id="BtnCreate" type="button" value="Crear" onclick="HabilitarPanel('crear');" />
            <input id="BtnUpdate" type="button" value="Actualizar" onclick="HabilitarPanel('modificar');" />
            <input id="BtnDelete" type="button" value="Eliminar" onclick="HabilitarPanel('eliminar');" />
        </div>
        <div id="Marco_trabajo_Form">
            <div id="Container_controls">
                <table id="TablaConsulta">
                    <tr>
                        <td id="TD1">
                            <select id="DDLColumns">
                            </select>
                        </td>
                        <td id="TD2">
                            <span class="cssToolTip_Form">
                                <input id="TxtRead" type="text" />
                                <span class="Spam_AST"></span></span>
                        </td>
                        <td colspan="4" align="center" id="TD3">
                            <input id="BtnRead" type="button" value="Buscar" onclick="BtnConsulta();" />
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">
                            &nbsp;
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">
                            <div id="container_TPaises">
                            </div>
                        </td>
                    </tr>
                </table>
                <div id="TablaDatos_D">
                    <table id="Tabla_1" style="margin-left: 80px;">
                        <tr>
                            <td style="width: 90px;" class="Label_Bold">
                                Codigo
                            </td>
                            <td style="width: 100px;">
                                <span class="cssToolTip_Form">
                                    <input type="text" id="Txt_Codigo" maxlength="6" class="Numeric" />
                                    <span class="Spam_AN"></span></span>
                            </td>
                            <td style="padding-bottom: 22px; width: 50px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="ImgID"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                            <td class="Label_Bold" style="width: 90px;">
                                Nombre
                            </td>
                            <td style="width: 100px;">
                                <span class="cssToolTip_Form">
                                    <input type="text" id="Txt_Pais" maxlength="50" />
                                    <span class="Spam_AST"></span></span>
                            </td>
                            <td style="padding-bottom: 22px; width: 50px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img1"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="Tabla_2" style="margin-left: 80px;">
                        <tr>
                            <td style="width: 90px;" class="Label_Bold">
                                Moneda
                            </td>
                            <td style="width: 200px;">
                                <select id="Select_moneda" class="C_Chosen">
                                </select>
                            </td>
                            <td style="padding-bottom: 22px; width: 70px;">
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 90px;" class="Label_Bold">
                                SWIFT
                            </td>
                            <td style="width: 100px;">
                                <span class="cssToolTip_Form">
                                    <input type="text" id="TxtSWIFT" maxlength="20" />
                                    <span class="Spam_AST"></span></span>
                            </td>
                            <td>
                            </td>
                        </tr>
                    </table>
                    <table id="TablaHoras">
                        <tr style="text-align: center;">
                            <td>
                                <font face="Verdana" size="2 " color="black"></font>
                            </td>
                            <td>
                                <font face="Verdana" size="2 " color="black"><b>Estado Dia</b> </font>
                            </td>
                            <td align="center" colspan="2">
                                <font face="Verdana" size="2 " color="black"><b>Rango 1</b> </font>
                            </td>
                            <td align="center" colspan="2">
                                <font face="Verdana" size="2 " color="black"><b>Rango 2</b> </font>
                            </td>
                            <td align="center" colspan="2">
                                <font face="Verdana" size="2 " color="black"><b>Rango 3</b> </font>
                            </td>
                            <td align="center" colspan="2">
                                <font face="Verdana" size="2 " color="black"><b>Rango 4</b> </font>
                            </td>
                        </tr>
                        <tr style="text-align: center;">
                            <td>
                                <font face="Verdana" size="2 " color="black"><b>&nbsp;&nbsp;&nbsp;&nbsp;</b> </font>
                            </td>
                            <td>
                                <font face="Verdana" size="2 " color="black"><b>Festivo/Laboral</b> </font>
                            </td>
                            <td>
                                <font face="Verdana" size="2 " color="black"><b>Hora Inicial</b> </font>
                            </td>
                            <td>
                                <font face="Verdana" size="2 " color="black"><b>Hora Final</b> </font>
                            </td>
                            <td>
                                <font face="Verdana" size="2 " color="black"><b>Hora Inicial</b> </font>
                            </td>
                            <td>
                                <font face="Verdana" size="2 " color="black"><b>Hora Final</b> </font>
                            </td>
                            <td>
                                <font face="Verdana" size="2 " color="black"><b>Hora Inicial</b> </font>
                            </td>
                            <td>
                                <font face="Verdana" size="2 " color="black"><b>Hora Final</b> </font>
                            </td>
                            <td>
                                <font face="Verdana" size="2 " color="black"><b>Hora Inicial</b> </font>
                            </td>
                            <td>
                                <font face="Verdana" size="2 " color="black"><b>Hora Final</b> </font>
                            </td>
                        </tr>
                        <tr style="text-align: center;">
                            <td>
                                <font face="Verdana" size="2 " color="black"><b>Lunes</b> </font>
                            </td>
                            <td>
                                <select id="Select_StateLun" class="C_Chosen">
                                    <option value="L">Laboral</option>
                                    <option value="F">Festivo</option>
                                </select>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtIniLun1" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtFinLun1" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtIniLun2" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtFinLun2" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtIniLun3" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtFinLun3" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtIniLun4" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtFinLun4" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                        </tr>
                        <tr style="text-align: center;">
                            <td>
                                <font face="Verdana" size="2 " color="black"><b>Martes</b> </font>
                            </td>
                            <td>
                                <select id="Select_StateMar" class="C_Chosen">
                                    <option value="L">Laboral</option>
                                    <option value="F">Festivo</option>
                                </select>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtIniMar1" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtFinMar1" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtIniMar2" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtFinMar2" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtIniMar3" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtFinMar3" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtIniMar4" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtFinMar4" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                        </tr>
                        <tr style="text-align: center;">
                            <td>
                                <font face="Verdana" size="2 " color="black"><b>Miercoles</b> </font>
                            </td>
                            <td>
                                <select id="Select_StateMie" class="C_Chosen">
                                    <option value="L">Laboral</option>
                                    <option value="F">Festivo</option>
                                </select>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtIniMie1" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtFinMie1" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtIniMie2" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtFinMie2" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtIniMie3" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtFinMie3" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtIniMie4" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtFinMie4" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                        </tr>
                        <tr style="text-align: center;">
                            <td>
                                <font face="Verdana" size="2 " color="black"><b>Jueves</b> </font>
                            </td>
                            <td>
                                <select id="Select_StateJue" class="C_Chosen">
                                    <option value="L">Laboral</option>
                                    <option value="F">Festivo</option>
                                </select>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtIniJue1" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtFinJue1" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtIniJue2" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtFinJue2" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtIniJue3" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtFinJue3" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtIniJue4" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtFinJue4" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                        </tr>
                        <tr style="text-align: center;">
                            <td>
                                <font face="Verdana" size="2 " color="black"><b>Viernes</b> </font>
                            </td>
                            <td>
                                <select id="Select_StateVie" class="C_Chosen">
                                    <option value="L">Laboral</option>
                                    <option value="F">Festivo</option>
                                </select>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtIniVie1" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtFinVie1" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtIniVie2" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtFinVie2" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtIniVie3" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtFinVie3" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtIniVie4" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtFinVie4" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                        </tr>
                        <tr style="text-align: center;">
                            <td>
                                <font face="Verdana" size="2 " color="black"><b>Sabado</b> </font>
                            </td>
                            <td>
                                <select id="Select_StateSab" class="C_Chosen">
                                    <option value="L">Laboral</option>
                                    <option value="F">Festivo</option>
                                </select>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtIniSab1" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtFinSab1" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtIniSab2" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtFinSab2" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtIniSab3" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtFinSab3" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtIniSab4" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtFinSab4" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                        </tr>
                        <tr style="text-align: center;">
                            <td>
                                <font face="Verdana" size="2 " color="black"><b>Domingo</b> </font>
                            </td>
                            <td>
                                <select id="Select_StateDom" class="C_Chosen">
                                    <option value="L">Laboral</option>
                                    <option value="F">Festivo</option>
                                </select>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtIniDom1" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtFinDom1" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtIniDom2" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtFinDom2" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtIniDom3" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtFinDom3" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtIniDom4" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtFinDom4" type="text" style="width: 50px;" class="Hours" readonly="readonly"><span
                                        class="Spam_AH"></span></span>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4" align="center">
                                &nbsp;
                            </td>
                        </tr>
                        <tr>
                            <td colspan="10" align="center" id="TD_Button">
                                <input id="Btnguardar" type="button" value="Guardar" onclick="BtnCrear();" />
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
