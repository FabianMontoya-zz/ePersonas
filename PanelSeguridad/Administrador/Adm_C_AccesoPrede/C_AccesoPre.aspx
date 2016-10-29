<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Parametros/Sasif_menu.Master"
    CodeBehind="C_AccesoPre.aspx.vb" Inherits="PanelSeguridad.C_AccesoPre" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../../Scripts/jquery-1.4.1.js" type="text/javascript"></script>
    <script src="../../SasifMaster.js" type="text/javascript"></script>
    <script src="../SasifMaster_Cosult.js" type="text/javascript"></script>
    <script src="C_AccesoPre.js" type="text/javascript"></script>
    <script src="C_AccesoPre_Carga_Valida.js" type="text/javascript"></script>
    <script src="C_AccesoPreTrasaccionsAjax.js" type="text/javascript"></script>
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
    <script src="../../Scripts/Dialog/datepicker.js" type="text/javascript"></script>
    <script src="../../Scripts/Dialog/timepicker.js" type="text/javascript"></script>
    <style type="text/css">
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
                        <div id="container_TGrid">
                        </div>
                    </td>
                </tr>
            </table>
            <div id="TablaDatos_D">
                <div id="container_create" style="width: 855px; height: 300px; overflow: auto;">
                    <table id="Tabla_1" style="width: 700px; text-align: left;">
                        <tr>
                            <td colspan="6" align="left" class="Title_Bold">
                                Datos de la persona que Ingresa
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 150px;" class="Label_Bold">
                                Empresa
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
                    <table id="Tabla_2" style="width: 700px; text-align: left;">
                        <tr>
                            <td style="width: 150px;" class="Label_Bold">
                                Persona
                            </td>
                            <td>
                                <select id="Select_Persona" class="C_Chosen">
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 100px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img2"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="Tabla_3" style="width: 700px; text-align: left;">
                        <tr>
                            <td style="width: 150px;" class="Label_Bold">
                                Tarjeta
                            </td>
                            <td>
                                <select id="Select_Tarjeta_Ent" class="C_Chosen">
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 300px;">
                                <span class="cssToolTip_L">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img3"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="Tabla_4" style="width: 700px; text-align: left;">
                        <tr>
                            <td colspan="6" align="left" class="Title_Bold">
                                Datos y Permisos a la empresa que Ingresa
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 150px;" class="Label_Bold">
                                Empresa a Ingresar
                            </td>
                            <td>
                                <select id="Select_EmpresaNit_Ing" class="C_Chosen">
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 250px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img5"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="Tabla_5" style="width: 700px; text-align: left;">
                        <tr>
                            <td style="width: 150px;" class="Label_Bold">
                                Puerta de Acceso
                            </td>
                            <td>
                                <select id="Select_PAcceso" class="C_Chosen">
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 300px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img6"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="Tabla_6" style="width: 700px; text-align: left;">
                        <tr>
                            <td style="width: 150px;" class="Label_Bold">
                                Área de Acceso
                            </td>
                            <td>
                                <select id="Select_AreaAcceso" class="C_Chosen">
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 300px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img7"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="Tabla_7" style="width: 700px; text-align: left;">
                        <tr>
                            <td style="width: 150px;" class="Label_Bold">
                                Persona Encargada
                            </td>
                            <td>
                                <select id="Select_Persona_Enc" class="C_Chosen">
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 100px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img8"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="Tabla_8" style="width: 700px; text-align: left;">
                        <tr>
                            <td colspan="6" align="left" class="Title_Bold">
                                Datos de Ingreso
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 115px;" class="Label_Bold">
                                C. Acceso Vigencia
                            </td>
                            <td style="width: 80px;">
                                <select id="Select_CheckVigencia" class="C_Chosen" style="width: 80px;">
                                    <option value="N">No</option>
                                    <option value="S">Si</option>
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 325px;">
                            </td>
                        </tr>
                    </table>
                    <table id="T_Vigencia_Ing" style="width: 700px; text-align: left;">
                        <tr>
                            <td style="width: 160px;" class="Label_Bold">
                                Fecha Inicial
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtFinicial" type="text" readonly="readonly" style="width: 100px;" />
                                    <span class="Spam_AF"></span></span>
                            </td>
                            <td style="padding-bottom: 25px; width: 80px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img9"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                            <td style="width: 150px;" class="Label_Bold">
                                Hora de Inicio
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input type="text" id="txt_HIVigencia" style="width: 80px;" class="Hours" readonly="readonly" />
                                    <span class="Spam_AH"></span></span>
                            </td>
                            <td style="padding-bottom: 25px; width: 60px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img10"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 160px;" class="Label_Bold">
                                Fecha Final
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input id="TxtFfinal" type="text" readonly="readonly" style="width: 100px;" />
                                    <span class="Spam_AF"></span></span>
                            </td>
                            <td style="padding-bottom: 25px; width: 80px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img11"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                            <td style="width: 150px;" class="Label_Bold">
                                Hora de Salida
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input type="text" id="txt_HFVigencia" style="width: 80px;" maxlength="5" class="Hours"
                                        readonly="readonly" />
                                    <span class="Spam_AH"></span></span>
                            </td>
                            <td style="padding-bottom: 25px; width: 60px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img12"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="Tabla_9" style="width: 700px; text-align: left;">
                        <tr>
                            <td style="width: 150px;" class="Label_Bold">
                                Tipo de Ingreso
                            </td>
                            <td>
                                <select id="Select_TypeIngreso" class="C_Chosen">
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 200px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img13"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4" align="center">
                                <p>
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="6" align="center">
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
