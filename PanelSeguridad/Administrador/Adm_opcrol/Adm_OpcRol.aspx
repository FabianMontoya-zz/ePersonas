<%@ Page Title="Admon Opcion perfil - SASIF Personas" Language="vb" AutoEventWireup="false" MasterPageFile="~/Administrador/Sasif_menu.Master"
    CodeBehind="Adm_OpcRol.aspx.vb" Inherits="PanelSeguridad.Adm_OpcRol" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../../Scripts/jquery-1.4.1.js" type="text/javascript"></script>
    <script src="Adm_OpcRol.js" type="text/javascript"></script>
    <script src="Adm_OpcRolTrasaccionsAjax.js" type="text/javascript"></script>
    <script src="../../SasifMaster.js" type="text/javascript"></script>
    <script src="../SasifMaster_Cosult.js" type="text/javascript"></script>
    <link href="../../css/css_login.css" rel="stylesheet" type="text/css" />
    <link href="../../css/css_form.css" rel="stylesheet" type="text/css" />
    <link href="../../css/datatables/jquery.dataTables.css" rel="stylesheet" type="text/css" />
    <link href="../../css/Chosen/chosen.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/jquery.min.js" type="text/javascript"></script>
    <script src="../../Scripts/Chosen/chosen.jquery.js" type="text/javascript"></script>
    <link href="../../css/Dialog/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/Dialog/jquery-ui-1.10.4.custom.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.dataTables.min.js" type="text/javascript"></script>
    <link href="../../css/css_controles.css" rel="stylesheet" type="text/css" />
    <link href="../../css/custom/Control_Sasif.css" rel="stylesheet" type="text/css" />
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

    <div class="Container_title_Form">
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
    <div class="Marco_Container">
        <div class="Marco_btn_Form">>
            <input id="BtnShearh" type="button" value="Consulta" onclick="HabilitarPanel('buscar');" />
            <input id="BtnCreate" type="button" value="Crear" onclick="HabilitarPanel('crear');" />
            <input id="BtnDelete" type="button" value="Eliminar" onclick="HabilitarPanel('eliminar');" />
        </div>
        <div class="Marco_trabajo_Form">
            <div id="Container_controls">
                <table id="TablaConsulta">
                    <tr>
                        <td style="width: 25%;">
                            <select id="DDLColumns" class="C_Chosen">
                            </select>
                        </td>
                        <td style="width: 65%;">
                            <span class="cssToolTip_Form">
                                <input id="TxtRead" type="text" style="width: 60%; margin-left: 10%;" />
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
                            <div id="container_TopcRol">
                            </div>
                        </td>
                    </tr>
                </table>
                <div id="TablaDatos_D">
                    <table id="T_NIT" style="width: 90%; margin-left: 8%;">
                        <tr>
                            <td id="TD_ID" style="width: 14%;" class="Label_Bold">NIT Padre</td>
                            <td id="TD1" style="width: 40%;">
                                <select style="width: 100%;" id="Select_EmpresaNit" class="C_Chosen">
                                </select>
                            </td>
                            <td style="width: 60%; padding-bottom: 25px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="ImgNIT"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="Tabla_1" style="width: 90%; margin-left: 8%;">
                        <tr>
                            <td class="Label_Bold" style="width: 14%;">Padre
                            </td>
                            <td style="width: 40%;">
                                <select style="width: 100%;" id="DDL_Padre" class="C_Chosen">
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 60%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="ImgID"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="Tabla_2" style="width: 90%; margin-left: 8%;">
                        <tr>
                            <td class="Label_Bold" style="width: 14%;">Consecutivo
                            </td>
                            <td id="TD_Tconsecutivo" style="width: 15%;">
                                <span class="cssToolTip_Form">
                                    <input type="text" id="TxtConsecutivo" maxlength="18" title="Consecutivo" class="Numeric"
                                        style="width: 100%;" />
                                    <span class="Spam_AN"></span></span>
                            </td>
                            <td style="padding-bottom: 25px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img1"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="Tabla_4" style="width: 90%; margin-left: 8%;">
                        <tr>
                            <td class="Label_Bold" style="width: 14%;">Tipo (Carpeta o Página)
                            </td>
                            <td id="TD_Ttipo" style="width: 40%;">
                                <select id="DDLTipo" class="C_Chosen">
                                    <option value="-1">Seleccione...</option>
                                    <option value="1">1 - Carpeta</option>
                                    <option value="2">2 - Pagina</option>
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 60%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img2"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="T_NIT_2" style="width: 90%; margin-left: 8%;">
                        <tr>
                            <td id="TD2" style="width: 14%;" class="Label_Bold">NIT Hijo</td>
                            <td id="TD4" style="width: 40%;">
                                <select style="width: 100%;" id="Select_EmpresaNit_2" class="C_Chosen">
                                </select>
                            </td>
                            <td style="width: 60%; padding-bottom: 25px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="ImgNIT_2"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="Tabla_3" style="width: 90%; margin-left: 8%;">
                        <tr>
                            <td class="Label_Bold" style="width: 14%;">Hijo
                            </td>
                            <td style="width: 40%;">
                                <select id="DDL_Hijo" class="C_Chosen">
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 60%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img3"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="Tabla_5" style="width: 90%; margin-left: 8%;">
                        <tr>
                            <td class="Label_Bold" style="width: 14%;">Paginas disponibles
                            </td>
                            <td style="width: 40%;">
                                <select id="DDLLink_ID" class="C_Chosen">
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 60%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img5"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="Tabla_6" style="width: 90%;">
                        <tr>
                            <td align="center">&nbsp;
                            </td>
                        </tr>
                        <tr>
                            <td align="center">
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
                        Pulse Confirmar para eliminar el Registro seleccionado.
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
