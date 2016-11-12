Imports Newtonsoft.Json

Public Class C_ContratoAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "Cliente"
                    CargarCliente()

                Case "Hijo_Cliente"
                    Cargar_HijoCliente()

                Case "Estado"
                    Cargar_EstadoContrato()

                Case "Moneda"
                    CargarMoneda()

                Case "crear"
                    InsertC_Contrato()

            End Select

        End If
    End Sub

#Region "CRUD"

    ''' <summary>
    ''' funcion que inserta en la tabla C_Contrato (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertC_Contrato()

        Dim objC_Contrato As New C_ContratoClass
        Dim SQL_C_Contrato As New C_ContratoSQLClass
        Dim ObjListC_Contrato As New List(Of C_ContratoClass)

        Dim result As String
        Dim vl_s_IDxiste As String

        objC_Contrato.Nit_ID = Request.Form("Nit_ID")
        objC_Contrato.Contrato_ID = Request.Form("ID")

        'validamos si la llave existe
        vl_s_IDxiste = SQL_C_Contrato.Consulta_Repetido(objC_Contrato)

        If vl_s_IDxiste = 0 Then

            objC_Contrato.Descripcion = Request.Form("Descripcion")
            objC_Contrato.TypeDocument_ID = Request.Form("TDoc")
            objC_Contrato.Document_ID = Request.Form("Doc")
            objC_Contrato.Cod_Moneda_ID = Request.Form("Moneda")
            objC_Contrato.Estado_Cont_ID = Request.Form("Es_Contract")
            objC_Contrato.Secuencia_Cargue = Request.Form("SecuenciaCargue")
            objC_Contrato.Val_Cont = Request.Form("VContrato")
            objC_Contrato.Val_Finan = Request.Form("VFinanciado")
            objC_Contrato.Val_Op_Compra = Request.Form("VOpCompra")
            objC_Contrato.Saldo_Cap = Request.Form("SCapital")
            objC_Contrato.Saldo_Int = Request.Form("SInteres")
            objC_Contrato.Saldo_Int_Mora = Request.Form("SMora")
            objC_Contrato.Saldo_Otros = Request.Form("SOtros")

            objC_Contrato.FechaActualizacion = Date.Now
            objC_Contrato.Usuario = Request.Form("user")

            ObjListC_Contrato.Add(objC_Contrato)

            result = SQL_C_Contrato.InsertC_Contrato(objC_Contrato)

            Response.Write(result)
        Else
            result = "Existe"
            Response.Write(result)
        End If

    End Sub

   

#End Region

#Region "DROP LIST"

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarMoneda()

        Dim SQL As New C_ContratoSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL.Charge_DropListMoneda(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Cargar_EstadoContrato()

        Dim SQL As New C_ContratoSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL.Charge_DropListEstado_Contrato(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarCliente()

        Dim SQL As New ClienteSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL.Charge_DropListCliente(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Cargar_HijoCliente()

        Dim SQL As New C_ContratoSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_ID As String = Request.Form("ID")

        ObjListDroplist = SQL.Charge_DropListHijo_Cliente(vl_S_ID)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub


#End Region

#Region "FUNCIONES"

#End Region

End Class