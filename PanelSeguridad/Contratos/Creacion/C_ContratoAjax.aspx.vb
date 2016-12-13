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

                Case "Documento"
                    CargarDocumento()

                Case "Buscar_Persona"
                    Search_People()

                Case "MATRIX_PRODUCTOS"
                    Carga_MProductos()

                Case "MATRIX_FINANCIACION"
                    Carga_MFinanciacion()

                Case "MATRIX_CICLO"
                    Carga_MCiclo()

                Case "MATRIX_DIRECCIONES"
                    Carga_MDirecciones()

                Case "MATRIX_TASAS"
                    Carga_MTasas()

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
        objC_Contrato.Sucursal_ID = Request.Form("Sucursal")
        objC_Contrato.Colocacion_ID = Request.Form("Colocacion")

        'validamos si la llave existe
        vl_s_IDxiste = SQL_C_Contrato.Consulta_Repetido(objC_Contrato)
        If vl_s_IDxiste = 0 Then

            objC_Contrato.Descripcion = Request.Form("Descripcion")
            objC_Contrato.TypeDocument_ID = Request.Form("TypeDocument")
            objC_Contrato.Document_ID = Request.Form("Document")
            objC_Contrato.Moneda_ID = Request.Form("Moneda")
            objC_Contrato.Producto_ID = Request.Form("Producto")

            objC_Contrato.Condi_Financiacion_ID = Request.Form("CondicionFinanciacion")
            objC_Contrato.Unidad_Tiempo_ID = Request.Form("UnidadTiempo")
            objC_Contrato.Fecha_Apertura = Request.Form("FechaApertura")
            objC_Contrato.Plazo = Request.Form("Plazo")
            objC_Contrato.Ciclo_ID = Request.Form("Ciclo")

            objC_Contrato.Base_Calculo_ID = Request.Form("BaseCalculo")
            objC_Contrato.Direccion_Correspondiente = Request.Form("Direccion")
            objC_Contrato.Valor_Total = Request.Form("Total")
            objC_Contrato.Valor_Financiado = Request.Form("Financiado")
            objC_Contrato.Valor_Opc_Compra = Request.Form("OpcionCompra")

            objC_Contrato.UsuarioCreacion = Request.Form("user")
            objC_Contrato.FechaCreacion = Date.Now
            objC_Contrato.UsuarioActualizacion = Request.Form("user")
            objC_Contrato.FechaActualizacion = Date.Now

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
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDocumento()

        Dim SQL As New ClienteSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL.Charge_DropListDocumento(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

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

    ''' <summary>
    ''' funcion que carga La matrix Direcciones
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Carga_MDirecciones()

        Dim SQL As New ClienteSQLClass

        Dim vl_S_TD As String = Request.Form("TD")
        Dim vl_S_D As String = Request.Form("D")
        Dim vl_S_NIT As String = Request.Form("NIT")

        Dim ObjList_Matrix As New List(Of ClienteClass)
        ObjList_Matrix = SQL.Matrix_Personas_Direcciones(vl_S_TD, vl_S_D, vl_S_NIT)

        Response.Write(JsonConvert.SerializeObject(ObjList_Matrix.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga La matrix Tasas
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Carga_MTasas()

        Dim SQL As New TasasSQLClass

        Dim ObjList_Matrix As New List(Of TasasClass)
        ObjList_Matrix = SQL.Matrix_Tasas()

        Response.Write(JsonConvert.SerializeObject(ObjList_Matrix.ToArray()))

    End Sub

#End Region

#Region "FUNCIONES"
    ''' <summary>
    ''' consulta si existe la persona digitada 
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Search_People()

        Dim SQL As New ClienteSQLClass
        Dim vl_S_Nit As String = Request.Form("NIT")
        Dim vl_S_TD As String = Request.Form("TD")
        Dim vl_S_D As String = Request.Form("D")

        Dim Str_People As String = SQL.SearchPeople_Exists(vl_S_Nit, vl_S_TD, vl_S_D)
        Response.Write(Str_People)

    End Sub
#End Region

End Class