<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Parametros/Sasif_menu.Master"
    CodeBehind="Calendario.aspx.vb" Inherits="PanelSeguridad.Calendario" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../../Scripts/jquery-1.4.1.js" type="text/javascript"></script>
    <script src="../../SasifMaster.js" type="text/javascript"></script>
    <script src="../SasifMaster_Cosult.js" type="text/javascript"></script>
    <script src="Calendario.js" type="text/javascript"></script>
    <script src="CalendarioProgresivo.js" type="text/javascript"></script>
    <script src="CalendarioTrasaccionsAjax.js" type="text/javascript"></script>
    <link href="../../css/css_login.css" rel="stylesheet" type="text/css" />
    <link href="../../css/css_form.css" rel="stylesheet" type="text/css" />
    <link href="../../css/datatables/jquery.dataTables.css" rel="stylesheet" type="text/css" />
    <link href="../../css/custom/charge.css" rel="stylesheet" type="text/css" />
    <link href="../../css/Chosen/chosen.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/jquery.min.js" type="text/javascript"></script>
    <script src="../../Scripts/Chosen/chosen.jquery.js" type="text/javascript"></script>
    <link href="../../css/Dialog/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/Dialog/jquery-ui-1.10.4.custom.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.dataTables.min.js" type="text/javascript"></script>
    <script src="../../Scripts/Dialog/datepicker.js" type="text/javascript"></script>
    <script src="../../Scripts/Dialog/timepicker.js" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="main" runat="server">
    
    <div id="Dialog_Control" style="width: 100%; text-align: center;">
        <div class="cssload-container" style="margin-top: 25%;">
            <div class="cssload-whirlpool"></div>
            <div>
                <img id="Sasif" class="Logo_3" src="../../images/SASIF_NEW_WHITE.png" alt="SASIF S.A.S." />
            </div>
        </div>
    </div>

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
    <div id="Marco_Container">
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
                        <td id="TD1" style="width: 25%;">
                            <select id="DDLColumns" class="C_Chosen">
                            </select>
                        </td>
                        <td id="TD2" style="width: 65%;">
                            <span class="cssToolTip_Form">
                                <input id="TxtRead" type="text" style="width: 60%; margin-left: 10%;"/>
                                <span class="Spam_AST"></span></span>
                        </td>
                        <td colspan="4" align="center" id="TD3" style="width: 20%;">
                            <input id="BtnRead" type="button" value="Buscar" onclick="BtnConsulta();" />
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">&nbsp;
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">
                            <div id="container_TGrid">
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    <div id="Dialog_Calendar">
        <div id="TablaDatos_D_Calen">
            <table id="Tabla_1" style="width: 700px; text-align: left;">
                <tr>
                    <td style="width: 150px;" class="Label_Bold">NIT Empresa
                    </td>
                    <td>
                        <select id="Select_EmpresaNit" class="C_Chosen">
                        </select>
                    </td>
                    <td style="padding-bottom: 25px; width: 250px;">
                        <span class="cssToolTip">
                            <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img1"
                                src="../../images/error.png" />
                            <span class="SpamEG"></span></span>
                    </td>
                </tr>
            </table>
            <table id="Tabla_10" style="width: 500px; text-align: left; position: absolute; margin-left: 600px; margin-bottom: 100px;">
                <tr>
                    <td class="Label_Bold">Fecha Inicial
                    </td>
                    <td></td>
                    <td class="Label_Bold">Fecha Final
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td>
                        <span class="cssToolTip_Form">
                            <input type="text" id="TxtF_Start" maxlength="50" style="width: 100px;" />
                            <span class="Spam_AF"></span></span>
                    </td>
                    <td style="padding-bottom: 25px; width: 90px;">
                        <span class="cssToolTip">
                            <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img6"
                                src="../../images/error.png" />
                            <span class="SpamEG"></span></span>
                    </td>
                    <td style="width: 120px;">
                        <span class="cssToolTip_Form">
                            <input type="text" id="TxtF_End" maxlength="50" style="width: 100px;" />
                            <span class="Spam_AF"></span></span>
                    </td>
                    <td style="padding-bottom: 25px; width: 200px;">
                        <span class="cssToolTip">
                            <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img7"
                                src="../../images/error.png" />
                            <span class="SpamEG"></span></span>
                    </td>
                </tr>
            </table>
            <table id="Tabla_2" style="width: 700px; text-align: left;">
                <tr>
                    <td style="width: 100px;" class="Label_Bold">Codigo
                    </td>
                    <td style="width: 150px;">
                        <span class="cssToolTip_Form">
                            <input type="text" id="Txt_ID" maxlength="5" class="Numeric" style="width: 70px;" />
                            <span class="Spam_AN"></span></span>
                    </td>
                    <td style="padding-bottom: 25px; width: 340px;">
                        <span class="cssToolTip">
                            <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img2"
                                src="../../images/error.png" />
                            <span class="SpamEG"></span></span>
                    </td>
                </tr>
                <tr>
                    <td class="Label_Bold" style="width: 150px;">Descripción
                    </td>
                    <td style="width: 50px;">
                        <span class="cssToolTip_Form">
                            <input type="text" id="TxtDescription" maxlength="50" style="width: 200px;" />
                            <span class="Spam_AST"></span></span>
                    </td>
                    <td style="padding-bottom: 25px;">
                        <span class="cssToolTip">
                            <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img3"
                                src="../../images/error.png" />
                            <span class="SpamEG"></span></span>
                    </td>
                </tr>
            </table>
            <table id="Tabla_3" style="width: 700px; text-align: left;">
                <tr>
                    <td style="width: 153px;" class="Label_Bold">Tipo Calendario
                    </td>
                    <td style="width: 230px;">
                        <select id="Select_TipoCalendario" style="width: 230px;" class="C_Chosen">
                            <option value="-1">Seleccione...</option>
                            <option value="1">Por día de la semana</option>
                            <option value="2">Fechas progresivas</option>
                        </select>
                    </td>
                    <td style="padding-bottom: 25px; width: 350px;">
                        <span class="cssToolTip">
                            <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img5"
                                src="../../images/error.png" />
                            <span class="SpamEG"></span></span>
                    </td>
                </tr>
            </table>
            <table id="TablaHoras">
                <thead>
                    <tr style="text-align: center;">
                        <th align="center" colspan="2">Lunes
                        </th>
                        <th align="center" colspan="2">Martes
                        </th>
                        <th align="center" colspan="2">Miercoles
                        </th>
                        <th align="center" colspan="2">Jueves
                        </th>
                        <th align="center" colspan="2">Viernes
                        </th>
                        <th align="center" colspan="2">Sabado
                        </th>
                        <th align="center" colspan="2">Domingo
                        </th>
                        <th align="center" colspan="2">Festivo
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="text-align: center;">
                        <td align="center" colspan="2">
                            <font face="CenturyGothic" size="2 " color="black">
                                <select id="Select_StateLun" class="C_Chosen">
                                    <option value="L">Laboral</option>
                                    <option value="F">Festivo</option>
                                </select>
                            </font>
                        </td>
                        <td align="center" colspan="2">
                            <font face="CenturyGothic" size="2 " color="black">
                                <select id="Select_StateMar" class="C_Chosen">
                                    <option value="L">Laboral</option>
                                    <option value="F">Festivo</option>
                                </select>
                            </font>
                        </td>
                        <td align="center" colspan="2">
                            <font face="CenturyGothic" size="2 " color="black">
                                <select id="Select_StateMie" class="C_Chosen">
                                    <option value="L">Laboral</option>
                                    <option value="F">Festivo</option>
                                </select>
                            </font>
                        </td>
                        <td align="center" colspan="2">
                            <font face="CenturyGothic" size="2 " color="black">
                                <select id="Select_StateJue" class="C_Chosen">
                                    <option value="L">Laboral</option>
                                    <option value="F">Festivo</option>
                                </select>
                            </font>
                        </td>
                        <td align="center" colspan="2">
                            <font face="CenturyGothic" size="2 " color="black">
                                <select id="Select_StateVie" class="C_Chosen">
                                    <option value="L">Laboral</option>
                                    <option value="F">Festivo</option>
                                </select>
                            </font>
                        </td>
                        <td align="center" colspan="2">
                            <font face="CenturyGothic" size="2 " color="black">
                                <select id="Select_StateSab" class="C_Chosen">
                                    <option value="L">Laboral</option>
                                    <option value="F">Festivo</option>
                                </select>
                            </font>
                        </td>
                        <td align="center" colspan="2">
                            <font face="CenturyGothic" size="2 " color="black">
                                <select id="Select_StateDom" class="C_Chosen">
                                    <option value="L">Laboral</option>
                                    <option value="F">Festivo</option>
                                </select>
                            </font>
                        </td>
                        <td align="center" colspan="2">
                            <font face="CenturyGothic" size="2 " color="black">
                                <select id="Select_Festivo" class="C_Chosen">
                                    <option value="L">Laboral</option>
                                    <option value="F">Festivo</option>
                                </select>
                            </font>
                        </td>
                    </tr>
                    <tr style="text-align: center;">
                        <td align="center" colspan="2">
                            <font face="CenturyGothic" size="2 " color="black"><b>Hora</b>
                            </font>
                        </td>
                        <td align="center" colspan="2">
                            <font face="CenturyGothic" size="2 " color="black"><b>Hora</b>
                            </font>
                        </td>
                        <td align="center" colspan="2">
                            <font face="CenturyGothic" size="2 " color="black"><b>Hora</b>
                            </font>
                        </td>
                        <td align="center" colspan="2">
                            <font face="CenturyGothic" size="2 " color="black"><b>Hora</b>
                            </font>
                        </td>
                        <td align="center" colspan="2">
                            <font face="CenturyGothic" size="2 " color="black"><b>Hora</b>
                            </font>
                        </td>
                        <td align="center" colspan="2">
                            <font face="CenturyGothic" size="2 " color="black"><b>Hora</b>
                            </font>
                        </td>
                        <td align="center" colspan="2">
                            <font face="CenturyGothic" size="2 " color="black"><b>Hora</b>
                            </font>
                        </td>
                        <td align="center" colspan="2">
                            <font face="CenturyGothic" size="2 " color="black"><b>Hora</b>
                            </font>
                        </td>
                    </tr>
                    <tr style="text-align: center;">
                        <td>
                            <font face="CenturyGothic" size="2 " color="black"><b>Inicial</b> </font>
                        </td>
                        <td>
                            <font face="CenturyGothic" size="2 " color="black"><b>Final</b> </font>
                        </td>
                        <td>
                            <font face="CenturyGothic" size="2 " color="black"><b>Inicial</b> </font>
                        </td>
                        <td>
                            <font face="CenturyGothic" size="2 " color="black"><b>Final</b> </font>
                        </td>
                        <td>
                            <font face="CenturyGothic" size="2 " color="black"><b>Inicial</b> </font>
                        </td>
                        <td>
                            <font face="CenturyGothic" size="2 " color="black"><b>Final</b> </font>
                        </td>
                        <td>
                            <font face="CenturyGothic" size="2 " color="black"><b>Inicial</b> </font>
                        </td>
                        <td>
                            <font face="CenturyGothic" size="2 " color="black"><b>Final</b> </font>
                        </td>
                        <td>
                            <font face="CenturyGothic" size="2 " color="black"><b>Inicial</b> </font>
                        </td>
                        <td>
                            <font face="CenturyGothic" size="2 " color="black"><b>Final</b> </font>
                        </td>
                        <td>
                            <font face="CenturyGothic" size="2 " color="black"><b>Inicial</b> </font>
                        </td>
                        <td>
                            <font face="CenturyGothic" size="2 " color="black"><b>Final</b> </font>
                        </td>
                        <td>
                            <font face="CenturyGothic" size="2 " color="black"><b>Inicial</b> </font>
                        </td>
                        <td>
                            <font face="CenturyGothic" size="2 " color="black"><b>Final</b> </font>
                        </td>
                        <td>
                            <font face="CenturyGothic" size="2 " color="black"><b>Inicial</b> </font>
                        </td>
                        <td>
                            <font face="CenturyGothic" size="2 " color="black"><b>Final</b> </font>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="cssToolTip_Form">
                                <input id="TxtIniLun" type="text" style="width: 50px;" class="Hours" readonly="readonly" /><span
                                    class="Spam_AH"></span></span>
                        </td>
                        <td>
                            <span class="cssToolTip_Form">
                                <input id="TxtFinLun" type="text" style="width: 50px;" class="Hours" readonly="readonly" /><span
                                    class="Spam_AH"></span></span>
                        </td>
                        <td>
                            <span class="cssToolTip_Form">
                                <input id="TxtIniMar" type="text" style="width: 50px;" class="Hours" readonly="readonly" /><span
                                    class="Spam_AH"></span></span>
                        </td>
                        <td>
                            <span class="cssToolTip_Form">
                                <input id="TxtFinMar" type="text" style="width: 50px;" class="Hours" readonly="readonly" /><span
                                    class="Spam_AH"></span></span>
                        </td>
                        <td>
                            <span class="cssToolTip_Form">
                                <input id="TxtIniMie" type="text" style="width: 50px;" class="Hours" readonly="readonly" /><span
                                    class="Spam_AH"></span></span>
                        </td>
                        <td>
                            <span class="cssToolTip_Form">
                                <input id="TxtFinMie" type="text" style="width: 50px;" class="Hours" readonly="readonly" /><span
                                    class="Spam_AH"></span></span>
                        </td>
                        <td>
                            <span class="cssToolTip_Form">
                                <input id="TxtIniJue" type="text" style="width: 50px;" class="Hours" readonly="readonly" /><span
                                    class="Spam_AH"></span></span>
                        </td>
                        <td>
                            <span class="cssToolTip_Form">
                                <input id="TxtFinJue" type="text" style="width: 50px;" class="Hours" readonly="readonly" /><span
                                    class="Spam_AH"></span></span>
                        </td>
                        <td>
                            <span class="cssToolTip_Form">
                                <input id="TxtIniVie" type="text" style="width: 50px;" class="Hours" readonly="readonly" /><span
                                    class="Spam_AH"></span></span>
                        </td>
                        <td>
                            <span class="cssToolTip_Form">
                                <input id="TxtFinVie" type="text" style="width: 50px;" class="Hours" readonly="readonly" /><span
                                    class="Spam_AH"></span></span>
                        </td>
                        <td>
                            <span class="cssToolTip_Form">
                                <input id="TxtIniSab" type="text" style="width: 50px;" class="Hours" readonly="readonly" /><span
                                    class="Spam_AH"></span></span>
                        </td>
                        <td>
                            <span class="cssToolTip_Form">
                                <input id="TxtFinSab" type="text" style="width: 50px;" class="Hours" readonly="readonly" /><span
                                    class="Spam_AH"></span></span>
                        </td>
                        <td>
                            <span class="cssToolTip_Form">
                                <input id="TxtIniDom" type="text" style="width: 50px;" class="Hours" readonly="readonly" /><span
                                    class="Spam_AH"></span></span>
                        </td>
                        <td>
                            <span class="cssToolTip_Form">
                                <input id="TxtFinDom" type="text" style="width: 50px;" class="Hours" readonly="readonly" /><span
                                    class="Spam_AH"></span></span>
                        </td>
                        <td>
                            <span class="cssToolTip_Form">
                                <input id="TxtIniF" type="text" style="width: 50px;" class="Hours" readonly="readonly" /><span
                                    class="Spam_AH"></span></span>
                        </td>
                        <td>
                            <span class="cssToolTip_Form">
                                <input id="TxtFinF" type="text" style="width: 50px;" class="Hours" readonly="readonly" /><span
                                    class="Spam_AH"></span></span>
                        </td>
                    </tr>
                    <tr>
                        <td class="Label_Bold">
                            <p>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="20" align="center">
                            <input id="BtnAgregar" type="button" value="Agregar" onclick="BtnAgregaCalendario();" />
                        </td>
                    </tr>
                </tbody>
            </table>

            <div id="container_TGrid_2">
            </div>
            <table style="width: 100%;">
                <tr>
                    <td style="width: 150px;" class="Label_Bold">
                        <p>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td colspan="4" align="center">
                        <input id="Btnguardar" type="button" value="Guardar" onclick="BtnCrear();" />
                    </td>
                </tr>
            </table>
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
                    <img alt="Warning" id="WA" src="../../images/alert.png" />
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
