<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Parametros/Sasif_menu.Master"
    CodeBehind="Porcen_Descuentos.aspx.vb" Inherits="PanelSeguridad.Porcen_Descuentos" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../../Scripts/jquery-1.4.1.js" type="text/javascript"></script>
    <script src="../../SasifMaster.js" type="text/javascript"></script>
    <script src="../SasifMaster_Cosult.js" type="text/javascript"></script>
    <script src="Porcen_DescuentosTrasaccionsAjax.js" type="text/javascript"></script>
    <script src="Porcen_Descuentos.js" type="text/javascript"></script>
    <link href="../../css/css_login.css" rel="stylesheet" type="text/css" />
    <link href="../../css/css_form.css" rel="stylesheet" type="text/css" />
    <link href="../../css/datatables/jquery.dataTables.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/jquery.dataTables.min.js" type="text/javascript"></script>
    <link href="../../css/custom/charge.css" rel="stylesheet" type="text/css" />
    <link href="../../css/css_controles.css" rel="stylesheet" type="text/css" />
    <link href="../../css/Chosen/chosen.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/jquery.min.js" type="text/javascript"></script>
    <script src="../../Scripts/Chosen/chosen.jquery.js" type="text/javascript"></script>
    <link href="../../css/Dialog/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/Dialog/jquery-ui-1.10.4.custom.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.dataTables.min.js" type="text/javascript"></script>
    <script src="../../Scripts/Dialog/datepicker.js" type="text/javascript"></script>
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
                            <div id="container_TPorcen_Descuentos">
                            </div>
                        </td>
                    </tr>
                </table>
                <table id="TablaDatos">
                    <tr>
                        <td>
                            <table id="Tabla_2" style="width: 700px; text-align: left;">
                                <tr>
                                    <td class="Label_Bold" style="width: 120px;">
                                        Pais
                                    </td>
                                    <td>
                                        <select id="Select_Pais" class="C_Chosen">
                                        </select>
                                    </td>
                                    <td style="width: 100px; padding-bottom: 25px;">
                                        <span class="cssToolTip_L">
                                            <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="ImgPais"
                                                src="../../images/error.png" />
                                            <span class="SpamEG"></span></span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="Label_Bold">
                                        Ciudad
                                    </td>
                                    <td>
                                        <select id="Select_Ciudad" class="C_Chosen">
                                        </select>
                                    </td>
                                    <td style="width: 100px; padding-bottom: 25px;">
                                        <span class="cssToolTip_L">
                                            <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img1"
                                                src="../../images/error.png" />
                                            <span class="SpamEG"></span></span>
                                    </td>
                                </tr>
                            </table>
                            <table id="Tabla_3" style="width: 700px; text-align: left;">
                                <tr>
                                    <td style="width: 120px;" class="Label_Bold">
                                        Impuesto
                                    </td>
                                    <td>
                                        <select id="Select_Impuesto" class="C_Chosen">
                                        </select>
                                    </td>
                                    <td style="padding-bottom: 25px; width: 180px;">
                                        <span class="cssToolTip">
                                            <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img2"
                                                src="../../images/error.png" />
                                            <span class="SpamEG"></span></span>
                                    </td>
                                </tr>
                            </table>
                            <table id="Tabla_4" style="width: 500px; text-align: left;">
                                <tr>
                                    <td class="Label_Bold" style="width: 150px;">
                                        Periodo: Inferior
                                    </td>
                                    <td style="width: 110px;">
                                        <span class="cssToolTip_Form">
                                            <input id="TxtRInicial" type="text" readonly="readonly" style="width: 100px;">
                                            <span class="Spam_AF"></span></span>
                                    </td>
                                    <td class="Label_Bold" style="width: 80px;">
                                        Superior
                                    </td>
                                    <td style="width: 200px;">
                                        <span class="cssToolTip_Form">
                                            <input id="TxtRFinal" type="text" readonly="readonly" style="width: 100px;">
                                            <span class="Spam_AF"></span></span>
                                    </td>
                                </tr>
                            </table>
                            <table id="Tabla_5" style="width: 700px; text-align: left;">
                                <tr>
                                    <td class="Label_Bold" style="width: 110px;">
                                        Limite: Tipo
                                    </td>
                                    <td style="width: 120px;">
                                        <select id="Select_LTipo" class="C_Chosen">
                                            <option value="-1">Seleccione...</option>
                                            <option value="1">Placas</option>
                                            <option value="2">Identificación</option>
                                            <option value="3">Vehículo</option>
                                            <option value="4">Otros</option>
                                        </select>
                                    </td>
                                    <td class="Label_Bold" style="width: 60px; padding-left: 20px;">
                                        Inferior
                                    </td>
                                    <td style="width: 120px;">
                                        <span class="cssToolTip_Form">
                                            <input id="Txt_LInf" type="text" maxlength="20" style="width: 110px;">
                                            <span class="Spam_AST"></span></span>
                                    </td>
                                    <td class="Label_Bold" style="width: 60px;">
                                        Superior
                                    </td>
                                    <td style="width: 120px;">
                                        <span class="cssToolTip_Form">
                                            <input id="Txt_Sup" type="text" maxlength="20" style="width: 110px;">
                                            <span class="Spam_AST"></span></span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table id="Vencimiento" style="margin-left: 90px; width: 50%; padding-left: 100px;
                                padding-right: 100px; text-align: center;">
                                <tr>
                                    <td align="center" class="Title_Bold" colspan="4">
                                        Vencimientos
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 50px" class="Label_Bold">
                                        Corte
                                    </td>
                                    <td style="width: 100px" class="Label_Bold">
                                        Fecha
                                    </td>
                                    <td style="width: 50px" class="Label_Bold">
                                        Porcentaje
                                    </td>
                                    <td style="width: 250px" class="Label_Bold">
                                        Valor
                                    </td>
                                </tr>
                                <tr>
                                    <td class="Label_Bold">
                                        1
                                    </td>
                                    <td>
                                        <span class="cssToolTip_Form">
                                            <input type="text" id="TxtFecha_1" readonly="readonly" style="width: 100px;" />
                                            <span class="Spam_AF"></span></span>
                                        <td>
                                            <span class="cssToolTip_Form">
                                                <input type="text" id="TxtPorcen_1" maxlength="5" style="width: 70px;" class="Decimal" />
                                                <span class="Spam_ADec"></span></span>
                                        </td>
                                    <td>
                                        <span class="cssToolTip_Form">
                                            <input type="text" id="TxtValor_1" maxlength="17" onkeyup="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }"
                                                onchange="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }" />
                                            <span class="Spam_AVal"></span></span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="Label_Bold">
                                        2
                                    </td>
                                    <td>
                                        <span class="cssToolTip_Form">
                                            <input type="text" id="TxtFecha_2" readonly="readonly" style="width: 100px;" />
                                            <span class="Spam_AF"></span></span>
                                    </td>
                                    <td>
                                        <span class="cssToolTip_Form">
                                            <input type="text" id="TxtPorcen_2" maxlength="5" style="width: 70px;" class="Decimal" />
                                            <span class="Spam_ADec"></span></span>
                                    </td>
                                    <td>
                                        <span class="cssToolTip_Form">
                                            <input type="text" id="TxtValor_2" maxlength="17" onkeyup="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }"
                                                onchange="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }" />
                                            <span class="Spam_AVal"></span></span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="Label_Bold">
                                        3
                                    </td>
                                    <td>
                                        <span class="cssToolTip_Form">
                                            <input type="text" id="TxtFecha_3" readonly="readonly" style="width: 100px;" />
                                            <span class="Spam_AF"></span></span>
                                    </td>
                                    <td>
                                        <span class="cssToolTip_Form">
                                            <input type="text" id="TxtPorcen_3" maxlength="5" style="width: 70px;" class="Decimal" />
                                            <span class="Spam_ADec"></span></span>
                                    </td>
                                    <td>
                                        <span class="cssToolTip_Form">
                                            <input type="text" id="TxtValor_3" maxlength="17" onkeyup="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }"
                                                onchange="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }" />
                                            <span class="Spam_AVal"></span></span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="Label_Bold">
                                        4
                                    </td>
                                    <td>
                                        <span class="cssToolTip_Form">
                                            <input type="text" id="TxtFecha_4" readonly="readonly" style="width: 100px;" />
                                            <span class="Spam_AF"></span></span>
                                    </td>
                                    <td>
                                        <span class="cssToolTip_Form">
                                            <input type="text" id="TxtPorcen_4" maxlength="5" style="width: 70px;" class="Decimal" />
                                            <span class="Spam_ADec"></span></span>
                                    </td>
                                    <td>
                                        <span class="cssToolTip_Form">
                                            <input type="text" id="TxtValor_4" maxlength="17" onkeyup="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }"
                                                onchange="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }" />
                                            <span class="Spam_AVal"></span></span>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="4" align="center">
                                        &nbsp;
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="4" align="center" id="TD_Button">
                                        <input id="Btnguardar" type="button" value="Guardar" onclick="BtnCrear();" />
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
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
    <div id="Dialog_Visualiza">
        <table id="D_Impuestos" style="width: 100%">
            <tr>
                <td class="Label_Bold">
                    Pais
                </td>
                <td id="V_Pais">
                </td>
            </tr>
            <tr>
                <td class="Label_Bold">
                    Ciudad
                </td>
                <td id="V_Ciudad">
                </td>
            </tr>
            <tr>
                <td class="Label_Bold">
                    Impuesto
                </td>
                <td id="V_Municipio">
                </td>
            </tr>
            <tr>
                <td class="Label_Bold">
                    Rango Inicial
                </td>
                <td id="V_Inicial">
                </td>
            </tr>
            <tr>
                <td class="Label_Bold">
                    Rango Final
                </td>
                <td id="V_Final">
                </td>
            </tr>
            <tr>
                <td class="Label_Bold">
                    Tipo de Limite
                </td>
                <td id="V_TL">
                </td>
            </tr>
            <tr>
                <td class="Label_Bold">
                    Limite Inferior
                </td>
                <td id="V_LMin">
                </td>
            </tr>
            <tr>
                <td class="Label_Bold">
                    Limite Superior
                </td>
                <td id="V_LMax">
                </td>
        </table>
        <div id="Acordeon_Dat" style="margin: 40px;">
            <h3>
                Primera fecha
            </h3>
            <div>
                <table style="width: 100%">
                    <tr>
                        <td class="Label_Bold">
                            Mes/dia
                        </td>
                        <td id="V_F_1">
                        </td>
                    </tr>
                    <tr>
                        <td class="Label_Bold">
                            Descuento
                        </td>
                        <td id="V_Des_1">
                        </td>
                    </tr>
                    <tr>
                        <td class="Label_Bold">
                            Valor
                        </td>
                        <td id="V_Valor_1">
                        </td>
                    </tr>
                </table>
            </div>
            <h3>
                Segunda fecha
            </h3>
            <div>
                <table style="width: 100%">
                    <tr>
                        <td class="Label_Bold">
                            Mes/dia
                        </td>
                        <td id="V_F_2">
                        </td>
                    </tr>
                    <tr>
                        <td class="Label_Bold">
                            Descuento
                        </td>
                        <td id="V_Des_2">
                        </td>
                    </tr>
                    <tr>
                        <td class="Label_Bold">
                            Valor
                        </td>
                        <td id="V_Valor_2">
                        </td>
                    </tr>
                </table>
            </div>
            <h3>
                Tercera fecha
            </h3>
            <div>
                <table style="width: 100%">
                    <tr>
                        <td class="Label_Bold">
                            Mes/dia
                        </td>
                        <td id="V_F_3">
                        </td>
                    </tr>
                    <tr>
                        <td class="Label_Bold">
                            Descuento
                        </td>
                        <td id="V_Des_3">
                        </td>
                    </tr>
                    <tr>
                        <td class="Label_Bold">
                            Valor
                        </td>
                        <td id="V_Valor_3">
                        </td>
                    </tr>
                </table>
            </div>
            <h3>
                Cuarta fecha
            </h3>
            <div>
                <table style="width: 100%">
                    <tr>
                        <td class="Label_Bold">
                            Mes/dia
                        </td>
                        <td id="V_F_4">
                        </td>
                    </tr>
                    <tr>
                        <td class="Label_Bold">
                            Descuento
                        </td>
                        <td id="V_Des_4">
                        </td>
                    </tr>
                    <tr>
                        <td class="Label_Bold">
                            Valor
                        </td>
                        <td id="V_Valor_4">
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</asp:Content>
