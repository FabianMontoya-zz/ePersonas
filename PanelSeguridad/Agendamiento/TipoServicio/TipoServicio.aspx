<%@ Page Title="Tipo - Clase Servicio - SASIF Persona" Language="vb" AutoEventWireup="false" MasterPageFile="~/Agendamiento/Sasif_menu.Master"
    CodeBehind="TipoServicio.aspx.vb" Inherits="PanelSeguridad.TipoServicio" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../../Scripts/jquery-1.4.1.js" type="text/javascript"></script>
    <script src="../../SasifMaster.js" type="text/javascript"></script>
    <script src="../SasifMaster_Cosult.js" type="text/javascript"></script>
    <script src="TipoServicio.js" type="text/javascript"></script>
    <script src="TipoServicioTransaccionsAjax.js" type="text/javascript"></script>
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
    <link href="../../css/custom/Control_Sasif.css" rel="stylesheet" type="text/css" />
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
        <div class="Marco_btn_Form">
            <input id="BtnShearh" type="button" value="Consulta" onclick="HabilitarPanel('buscar');" />
            <input id="BtnCreate" type="button" value="Crear" onclick="HabilitarPanel('crear');" />
            <input id="BtnUpdate" type="button" value="Actualizar" onclick="HabilitarPanel('modificar');" />
            <input id="BtnDelete" type="button" value="Eliminar" onclick="HabilitarPanel('eliminar');" />
        </div>
        <div class="Marco_trabajo_Form">
            <div class="Container_controls">
                <table id="TablaConsulta">
                    <tr>
                        <td id="TD1" style="width: 25%;">
                            <select id="DDLColumns" class="C_Chosen">
                            </select>
                        </td>
                        <td id="TD2" style="width: 65%;">
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
                            <div class="container_TGrid">
                            </div>
                        </td>
                    </tr>
                </table>

                <%--                <div id="foto_servicio">
                    <table style="width: 10%;">
                        <tr>
                            <td id="Foto_Persona" style="width: 84%; height: 10%;">
                                <span class="cssToolTip_Form_L">
                                    <a href="javascript:BtnRelacion();">
                                        <img alt="foto" title="" style="height: 120px; width: 120px; position: absolute; border-radius: 4px; border-color: #921919; border-width: 2px; border-style: outset;"
                                            id="IF_Visor" src="../../images/settings.png" />
                                    </a><span class="Spam_ARel"></span></span>
                            </td>
                        </tr>
                    </table>
                </div>--%>
                <div class="Dialog_Datos">
                    <table id="T_Subtitle1" style="width: 100%;" border="0">
                        <tr>
                            <td class="Title_Bold" style="width: 10.5%;">
                                Identificación Servicio
                            </td>
                        </tr>
                    </table>
                    <table id="Tabla_NIT" style="width: 100%; text-align: left;">
                        <tr>
                            <td style="width: 13.5%;" class="Label_Bold">NIT Empresa
                            </td>
                            <td style="width: 49%;">
                                <select id="Select_EmpresaNit" style="width: 100%;" class="C_Chosen">
                                </select>
                            </td>
                            <td style="width: 60%; padding-bottom: 25px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img1"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>                    
                    <table id="Tabla_Identificacion" style="width: 100%; text-align: left;">
                        <tr>
                            <td style="width: 13.5%;" class="Label_Bold">Código
                            </td>
                            <td style="width: 10%;">
                                <span class="cssToolTip_Form">
                                    <input type="text" id="Txt_ID" maxlength="5" class="Numeric" onkeypress="return OnlyNumbers(event);" style="width: 100%;"/>
                                    <span class="Spam_AN"></span></span>
                            </td>
                            <td style="padding-bottom: 25px; width: 29.5%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img2"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                            <td class="Label_Bold" style="width: 8%;">Nombre
                            </td>
                            <td style="width: 30%;">
                                <span class="cssToolTip_Form">
                                    <input type="text" id="TxtNombre" maxlength="49" style="width: 100%;"/>
                                    <span class="Spam_AST"></span></span>
                            </td>
                            <td style="width: 10%; padding-bottom: 25px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img3"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="T_TipoService_Referencia" style="width: 100%; text-align: left;">
                        <tr>
                            <td style="width: 13.5%;" class="Label_Bold">Tipo Servicio
                            </td>
                            <td style="width: 24%;">
                                <%-- Estos están inscritos en la tabla M_Seguridad -> TC_DDL_TIPO para las consultas --%>
                                <%-- Si se modifican se debe cambiar también en esa tabla, en todas las BD --%>
                                <select id="Select_TipoServicio" style="width: 100%;" class="C_Chosen">
                                    <option value="-1">Seleccione...</option>
                                    <option value="1">1 - Agenda Gimnasio</option>
                                    <option value="2">2 - Agenda Médica</option>
                                    <option value="3">3 - Agenda Vehículos</option>
                                    <option value="4">4 - Agenda Visitas</option>
                                    <option value="5">5 - Otros</option>
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 15.5%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img5"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                            <td style="width: 8%;" class="Label_Bold">Referecia
                            </td>
                            <td style="width: 30%;">
                                <span class="cssToolTip_Form">
                                    <input type="text" id="Text_Referencia" maxlength="49" style="width: 100%;" />
                                    <span class="Spam_AST"></span></span>
                            </td>
                            <td style="padding-bottom: 25px; width: 10%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img6"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="T_Subtitle2" style="width: 100%;" border="0">
                        <tr>
                            <td class="Title_Bold" style="width: 10.5%;">
                                Datos Servicio
                            </td>
                        </tr>
                    </table>
                    <table id="T_Moneda" style="width: 100%; text-align: left;">
                        <tr>
                            <td style="width: 13.5%;" class="Label_Bold">Moneda
                            </td>
                            <td style="width: 49%;">
                                <select id="Select_Moneda_Cod" class="C_Chosen">
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 60%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img7"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="Tabla_Servicio" style="width: 100%;">
                        <tr>
                            <td class="Label_Bold" style="width: 14.5%;">Costo del servicio
                            </td>
                            <td id="V_Sigla_1" style="width: 5%" class="Sigla"></td>
                            <td style="width: 9.8%;">
                                <span class="cssToolTip_Form">
                                    <input type="text" id="TxtCosto" maxlength="19" onkeyup="ValidaDecimales(this, this.value);" onkeypress="return DecimalNumber(event);"/>
                                    <span class="Spam_ADEC"></span></span>
                            </td>
                            <td style="padding-bottom: 25px; width: 235px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img12"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                            <td class="Label_Bold" style="width: 10%;">Valor del servicio 
                            </td>
                            <td id="V_Sigla_2" style="width: 5%" class="Sigla"></td>
                            <td style="width: 9.8%">
                                <span class="cssToolTip_Form">
                                    <input type="text" id="TxtValor" maxlength="19" onkeyup="ValidaDecimales(this, this.value);" onkeypress="return DecimalNumber(event);" />
                                    <span class="Spam_ADEC"></span></span>
                            </td>
                            <td style="padding-bottom: 25px; width: 250px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img13"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="Table_Capacidad" style="width: 100%;">
                        <tr>
                            <td class="Label_Bold" style="width: 4.8%;">Capacidad
                            </td>
                            <td style="width: 12%;">
                                <span class="cssToolTip_Form">
                                    <input type="text" id="Text_Capacidad" maxlength="17" onkeyup="var valida = dinner_format(this); if(valida == 1){ Mensaje_General('Atencion!', 'Solo se permiten numeros.' , 'W'); }" />
                                    <span class="Spam_AVal"></span></span>
                            </td>
                            <td class="Label_Bold" style="width: 3.4%;">Num. servicios no pagos para bloqueo    
                            </td>
                            <td id="Td5" style="width: 1.5%" class="Sigla"></td>
                            <td style="width: 9.8%;">
                                <span class="cssToolTip_Form">
                                    <input type="text" id="Text_Bloqueo" maxlength="5" onkeyup="var valida = dinner_format(this); if(valida == 1){ Mensaje_General('Atencion!', 'Solo se permiten numeros.' , 'W'); }" />
                                    <span class="Spam_AVal"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="Table_Tipo_Calculo" style="width: 700px; text-align: left;">
                        <tr>
                            <td style="width: 161px;" class="Label_Bold">Tipo de cálculo sesión
                            </td>
                            <td style="width: 230px;">
                                <select id="Select_Calculo" style="width: 230px;" class="C_Chosen">
                                    <option value="F" selected="selected">F - Fijo</option>
                                    <option value="A">A - A Solicitud</option>
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 350px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img9"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="Table_Tiempo_sesion" style="width: 100%;">
                        <tr>
                            <td class="Label_Bold" style="width: 150px;">Tiempo de sesión
                            </td>
                            <td style="width: 20%;">
                                <span class="cssToolTip_Form">
                                    <input id="Text_Tiempo_Sesion" type="text" class="Hours" readonly="readonly" /><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td style="padding-bottom: 25px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img10"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                            <td class="Label_Bold" style="width: 160px;">Tiempo entre sesiones
                            </td>
                            <td style="width: 10%;">
                                <span class="cssToolTip_Form">
                                    <input id="Text_Tiempo_Entre_Sesiones" type="text" class="Hours" readonly="readonly" /><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td style="padding-bottom: 25px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img11"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="Table_Agenda_Dias" style="width: 100%;">
                        <tr>
                            <td class="Label_Bold" style="width: 14%;">Tiempo máximo de agenda en días
                            </td>
                            <td style="width: 38%;">
                                <span class="cssToolTip_Form">
                                    <input id="Tiempo_Max_Agenda" type="text" class="Hours" readonly="readonly" /><span
                                        class="Spam_AH"></span></span>
                            </td>
                            <td style="width: 15%;" class="Label_Bold">Calendario
                            </td>
                            <td>
                                <select id="Select_Calendario_TS" class="C_Chosen">
                                </select>
                            </td>
                            <td style="padding-bottom: 22px; width: 10%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="ImgCal"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="Table_Detalle" style="width: 100%;">
                        <tr>
                            <td class="Label_Bold" style="width: 150px;">Detalle del Servicio
                            </td>
                            <td colspan="4">
                                <span class="cssToolTip_Form">
                                    <textarea id="Txt_Detalle" rows="3" cols="105"></textarea>
                                    <span class="Spam_AST">3: Digite Información</span></span>
                            </td>
                            <td style="width: 40px; padding-bottom: 25px;">
                                <span class="cssToolTip_L">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px; display: none;" id="Img8" src="../../images/error.png" />
                                    <span class="SpamEG">1: Campo Obligatorio!</span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="T_Calendario" style="margin-left: 80px;">
                    </table>
                    <table style="width: 100%;">

                        <tr>
                            <td colspan="4" align="center">
                                <input id="Btnguardar" type="button" value="Guardar" onclick="BtnCrear();" />
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div id="Dialog_Calendar">
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
    <div id="Dialog_Imagen" title="Imagen del servicio">
        <table id="TFile" style="width: 100%;">
            <tr>
                <td class="Label_Bold" style="width: 200px;">
                    <input id="fileupload" type="file" name="files[]" />
                    <a id="lnkAttch" style="cursor: pointer" onclick="AddFileInput(F1)" visible="false"></a>
                </td>
            </tr>
            <tr>
                <td style="width: 300px;">
                    <input id="Btncharge_file" type="button" value="Adjuntar un archivo" name="Add_files"
                        style="width: 200px;" onclick="UpLoad_Document('TipoServicio', 'fileupload', '1'); x();" /><!--HabilitarControl();-->
                </td>
            </tr>
        </table>
    </div>

</asp:Content>
