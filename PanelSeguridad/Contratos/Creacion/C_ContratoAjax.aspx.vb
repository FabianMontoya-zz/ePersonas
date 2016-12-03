Imports Newtonsoft.Json

Public Class C_ContratoAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "MATRIX_SUCURSAL"
                    Carga_MSucursal()

                Case "MATRIX_MONEDA"
                    Carga_MMoneda()

                Case "MATRIX_PERSONAS"
                    Carga_MPersonas()

                Case "MATRIX_PRODUCTOS"
                    Carga_MProductos()

                Case "MATRIX_FINANCIACION"
                    Carga_MFinanciacion()

                Case "MATRIX_CICLO"
                    Carga_MCiclo()

                Case "Cliente"
                    CargarCliente()

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
    ''' funcion que carga La matrix Sucursal
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Carga_MSucursal()

        Dim SQL As New SucursalSQLClass

        Dim ObjList_Matrix As New List(Of SucursalClass)
        ObjList_Matrix = SQL.Matrix_Sucursal()

        Response.Write(JsonConvert.SerializeObject(ObjList_Matrix.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga La matrix Moneda
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Carga_MMoneda()

        Dim SQL As New MonedaCodSQLClass
        Dim ObjList As New List(Of MonedaCodClass)

        ObjList = SQL.Matrix_Moneda()
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga La matrix Personas
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Carga_MPersonas()

        Dim SQL As New ClienteSQLClass

        Dim ObjList_Matrix As New List(Of ClienteClass)
        ObjList_Matrix = SQL.Matrix_PersonasDep()

        Response.Write(JsonConvert.SerializeObject(ObjList_Matrix.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga La matrix Productos
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Carga_MProductos()

        Dim SQL As New ProductosSQLClass

        Dim ObjList_Matrix As New List(Of ProductosClass)
        ObjList_Matrix = SQL.Matrix_Productos()

        Response.Write(JsonConvert.SerializeObject(ObjList_Matrix.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga La matrix Financiacion
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Carga_MFinanciacion()

        Dim SQL As New FinanciacionSQLClass

        Dim ObjList_Matrix As New List(Of FinanciacionClass)
        ObjList_Matrix = SQL.Matrix_Financiacion()

        Response.Write(JsonConvert.SerializeObject(ObjList_Matrix.ToArray()))

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
    ''' funcion que carga La matrix Ciclo
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Carga_MCiclo()

        Dim SQL As New CicloSQLClass

        Dim ObjList_Matrix As New List(Of CicloClass)
        ObjList_Matrix = SQL.Matrix_Ciclo()

        Response.Write(JsonConvert.SerializeObject(ObjList_Matrix.ToArray()))

    End Sub

#End Region

#Region "FUNCIONES"

#End Region

End Class