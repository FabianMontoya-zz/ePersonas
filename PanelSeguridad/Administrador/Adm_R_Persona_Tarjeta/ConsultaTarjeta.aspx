<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Parametros/Sasif_menu.Master"
    CodeBehind="ConsultaTarjeta.aspx.vb" Inherits="PanelSeguridad.ConsultaTarjeta" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../../Scripts/jquery-1.4.1.js" type="text/javascript"></script>
    <script src="../../SasifMaster.js" type="text/javascript"></script>
    <script src="../SasifMaster_Cosult.js" type="text/javascript"></script>
    <script src="ConsultaTarjeta.js" type="text/javascript"></script>
    <script src="ConsultaTarjetaTrasaccionsAjax.js" type="text/javascript"></script>
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
    <link href="../../css/css_controles.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="main" runat="server">
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
        <div id="Container_controls">
            <div id="TablaDatos_D">
                <table id="Tabla_1" style="width: 100%; text-align: left;">
                    <tr>
                        <td style="width: 5%;" class="Label_Bold">Empresa 
                        </td>
                        <td>
                            <select id="Select_EmpresaNit" class="C_Chosen">
                            </select>
                        </td>
                        <td style="padding-bottom: 25px; width: 50%;"></td>
                    </tr>
                </table>
                <div id="Container_Consulta">
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
    <div id="Dialog_Ver">
        <table id="Tabla_P" style="width: 100%; text-align: left;">
            <tr>
                <td style="width: 15%;" class="Label_Bold">N° Tarjeta
                </td>
                <td id="V_Tarjeta"></td>
                <td style="width: 15%;" class="Label_Bold">Estado
                </td>
                <td id="V_Estado"></td>
            </tr>
            <tr>
                <td class="Label_Bold">tarjeta 
                </td>
                <td id="V_EstadoBloqueo"></td>
                <td class="Label_Bold">Motivo Bloqueo
                </td>
                <td id="V_MotivoBloqueo"></td>
            </tr>
            <tr>
                <td class="Label_Bold">Observaciones
                </td>
                <td id="V_Observacion" colspan="3"></td>
            </tr>
        </table>
        <table id="Tabla_V" style="width: 100%; text-align: left;">
            <tr>
                <td style="width: 15%;" class="Label_Bold">Vigencia
                </td>
                <td id="V_Vigencia" style="width: 15%;"></td>
                <td style="width: 10%;" class="Label_Bold">Fecha Inicial
                </td>
                <td id="V_FInicial"></td>
                <td style="width: 10%;" class="Label_Bold">Fecha Final
                </td>
                <td id="V_FFinal"></td>
            </tr>
        </table>
        <table style="width: 100%; text-align: left; margin-top: 2%;">
            <tr>
                <td class="Title_Bold" colspan="6">Custodia de la Tarjeta
                </td>
            </tr>
        </table>
        <table id="Tabla_TC" style="width: 100%; text-align: left; padding-left: 5%; margin-top: 2%;">
            <tr>
                <td style="width: 15%;" class="Label_Bold">Empresa Custodia
                </td>
                <td id="V_EmpCustodia"></td>
            </tr>
            <tr>
                <td style="width: 15%;" class="Label_Bold">Persona Custodia
                </td>
                <td id="V_PerCustodia"></td>
            </tr>
            <tr>
                <td style="width: 15%;" class="Label_Bold">Fecha Custodia
                </td>
                <td id="V_FCustodia"></td>
            </tr>
        </table>
        <table style="width: 100%; text-align: left; margin-top: 2%;">
            <tr>
                <td class="Title_Bold" colspan="6">Asignación de la Tarjeta
                </td>
            </tr>
        </table>
        <table id="Tabla_TA" style="width: 100%; text-align: left; padding-left: 5%; margin-top: 2%;">
            <tr>
                <td style="width: 15%;" class="Label_Bold">Empresa Asignada
                </td>
                <td id="V_EmpAsignacion"></td>
            </tr>
            <tr>
                <td style="width: 15%;" class="Label_Bold">Persona Asignada
                </td>
                <td id="V_PerAsignacion"></td>
            </tr>
            <tr>
                <td style="width: 15%;" class="Label_Bold">Fecha Asignación
                </td>
                <td id="V_FAsignacion"></td>
            </tr>
        </table>
        <table style="width: 100%; text-align: left; margin-top: 2%;">
            <tr>
                <td class="Title_Bold" colspan="6">Entrega de la Tarjeta
                </td>
            </tr>
        </table>
        <table id="Tabla_TE" style="width: 100%; text-align: left; padding-left: 5%; margin-top: 2%;">
            <tr>
                <td style="width: 15%;" class="Label_Bold">Empresa Entregada
                </td>
                <td id="V_EmpEntrega"></td>
            </tr>
            <tr>
                <td style="width: 15%;" class="Label_Bold">Persona Entregada
                </td>
                <td id="V_PerEntrega"></td>
            </tr>
            <tr>
                <td style="width: 15%;" class="Label_Bold">Fecha Entrega
                </td>
                <td id="V_FEntrega"></td>
            </tr>

        </table>

    </div>
</asp:Content>
