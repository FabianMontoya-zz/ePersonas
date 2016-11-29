Imports Newtonsoft.Json

Public Class C_ActivosAjax
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
                    InsertC_Activos()

            End Select

        End If
    End Sub

#Region "CRUD"

    ''' <summary>
    ''' funcion que inserta en la tabla C_Activos (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertC_Activos()

        Dim objC_Activos As New C_ActivosClass
        Dim SQL_C_Activos As New C_ActivosSQLClass
        Dim ObjListC_Activos As New List(Of C_ActivosClass)

        Dim result As String
        Dim vl_s_IDxiste As String

        objC_Activos.Nit_ID = Request.Form("Nit_ID")
        objC_Activos.Contrato_ID = Request.Form("ID")

        'validamos si la llave existe
        vl_s_IDxiste = SQL_C_Activos.Consulta_Repetido(objC_Activos)

        If vl_s_IDxiste = 0 Then

            objC_Activos.Descripcion = Request.Form("Descripcion")
            objC_Activos.TypeDocument_ID = Request.Form("TDoc")
            objC_Activos.Document_ID = Request.Form("Doc")
            objC_Activos.Cod_Moneda_ID = Request.Form("Moneda")
            objC_Activos.Estado_Cont_ID = Request.Form("Es_Contract")
            objC_Activos.Secuencia_Cargue = Request.Form("SecuenciaCargue")
            objC_Activos.Val_Cont = Request.Form("VContrato")
            objC_Activos.Val_Finan = Request.Form("VFinanciado")
            objC_Activos.Val_Op_Compra = Request.Form("VOpCompra")
            objC_Activos.Saldo_Cap = Request.Form("SCapital")
            objC_Activos.Saldo_Int = Request.Form("SInteres")
            objC_Activos.Saldo_Int_Mora = Request.Form("SMora")
            objC_Activos.Saldo_Otros = Request.Form("SOtros")

            objC_Activos.FechaActualizacion = Date.Now
            objC_Activos.Usuario = Request.Form("user")

            ObjListC_Activos.Add(objC_Activos)

            result = SQL_C_Activos.InsertC_Activos(objC_Activos)

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

        Dim SQL As New C_ActivosSQLClass
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

        Dim SQL As New C_ActivosSQLClass
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

        Dim SQL As New C_ActivosSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_ID As String = Request.Form("ID")

        ObjListDroplist = SQL.Charge_DropListHijo_Cliente(vl_S_ID)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub


#End Region

#Region "FUNCIONES"

#End Region

End Class