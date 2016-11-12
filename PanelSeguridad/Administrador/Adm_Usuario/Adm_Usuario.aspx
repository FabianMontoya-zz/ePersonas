<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Administrador/Sasif_menu.Master"
    CodeBehind="Adm_Usuario.aspx.vb" Inherits="PanelSeguridad.Adm_Usuario" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../../Scripts/jquery-1.4.1.js" type="text/javascript"></script>
    <script src="Adm_Usuario.js" type="text/javascript"></script>
    <script src="Adm_UsuarioTrasaccionsAjax.js" type="text/javascript"></script>
    <script src="../../SasifMaster.js" type="text/javascript"></script>
    <script src="../SasifMaster_Cosult.js" type="text/javascript"></script>
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
                        <td>
                            <select id="DDLColumns">
                            </select>
                        </td>
                        <td>
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
                            <div id="container_TUser">
                            </div>
                        </td>
                    </tr>
                </table>
                <table id="TablaDatos">
                    <tr>
                        <td style="width: 100px;" class="Label_Bold">
                            Usuario
                        </td>
                        <td style="width: 100px;">
                            <span class="cssToolTip_Form">
                                <input type="text" id="Txt_ID" maxlength="10" />
                                <span class="Spam_AST"></span></span>
                        </td>
                        <td style="padding-bottom: 25px; width: 50px;">
                            <span class="cssToolTip">
                                <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="ImgID"
                                    src="../../images/error.png" />
                                <span class="SpamEG"></span></span>
                        </td>
                        <td style="width: 100px;" class="Label_Bold">
                            Nombre
                        </td>
                        <td style="width: 100px;">
                            <span class="cssToolTip_Form">
                                <input type="text" id="TxtName" maxlength="50" />
                                <span class="Spam_AST"></span></span>
                        </td>
                        <td style="padding-bottom: 25px; width: 50px;">
                            <span class="cssToolTip_L">
                                <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img1"
                                    src="../../images/error.png" />
                                <span class="SpamEG"></span></span>
                        </td>
                    </tr>
                    <tr>
                        <td class="Label_Bold">
                            Documento
                        </td>
                        <td id="TD_Tdocument">
                            <span class="cssToolTip_Form">
                                <input type="text" id="TxtDocument" maxlength="18" class="Numeric" />
                                <span class="Spam_AN"></span></span>
                        </td>
                        <td style="padding-bottom: 25px;">
                            <span class="cssToolTip">
                                <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img2"
                                    src="../../images/error.png" />
                                <span class="SpamEG"></span></span>
                        </td>
                        <td class="Label_Bold">
                            Rol
                        </td>
                        <td id="TD_Trol">
                            <select id="DDLRol" class="C_Chosen">
                            </select>
                        </td>
                        <td style="padding-bottom: 25px;">
                            <span class="cssToolTip_L">
                                <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img3"
                                    src="../../images/error.png" />
                                <span class="SpamEG"></span></span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4" align="center">
                            &nbsp;
                        </td>
                    </tr>
                    <tr>
                        <td colspan="6" align="center" id="TD_Button">
                            <input id="Btnguardar" type="button" value="Guardar" onclick="BtnCrear();" />
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    <div id="dialog" title="Basic dialog">
        <table>
            <tr>
                <td>
                    <p id="Mensaje_alert">
                    </p>
                </td>
                <td>
                    <img alt="error" id="DE" src="../../images/error_2.png" />
                    <img alt="success" id="SE" src="../../images/success.png" />
                </td>
            </tr>
            <tr>
                <td align="center">
                    <input id="BtnExitD" type="button" value="Salir" style="width: 40%;" onclick="x();" />
                </td>
            </tr>
        </table>
    </div>
    <div id="dialog_eliminar" title="Basic dialog">
        <table>
            <tr>
                <td>
                    <p id="P1">
                        Desea eliminar el siguiente registro?
                    </p>
                </td>
                <td>
                    <img alt="Warning" id="Img4" src="../../images/alert.png" />
                </td>
            </tr>
            <tr>
                <td align="center">
                    <input id="BtnElimin" type="button" value="Confirmar" onclick="BtnElimina();" />
                </td>
            </tr>
        </table>
    </div>
</asp:Content>
