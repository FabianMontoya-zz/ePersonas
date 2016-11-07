Imports Newtonsoft.Json

Public Class Impuesto_GastoAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "cargar_droplist_busqueda"
                    CargarDroplist()

                Case "consulta"
                    Consulta_Impuesto_Gasto()

                Case "crear"
                    InsertImpuesto_Gasto()

                Case "modificar"
                    UpdateImpuesto_Gasto()

                Case "elimina"
                    EraseImpuesto_Gasto()
            End Select

        End If
    End Sub

#Region "CRUD"

    ''' <summary>
    ''' traemos todos los datos para tabla Impuesto_Gasto (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Consulta_Impuesto_Gasto()

        Dim SQL_Impuesto_Gasto As New Impuesto_GastoSQLClass
        Dim ObjListImpuesto_Gasto As New List(Of Impuesto_GastoClass)


        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_opcion As String = Request.Form("opcion")
        Dim vl_S_contenido As String = Request.Form("contenido")

        ObjListImpuesto_Gasto = SQL_Impuesto_Gasto.Read_AllImpuesto_Gasto(vl_S_filtro, vl_S_opcion, vl_S_contenido)

        If ObjListImpuesto_Gasto Is Nothing Then

            Dim objImpuesto_Gasto As New Impuesto_GastoClass
            ObjListImpuesto_Gasto = New List(Of Impuesto_GastoClass)

            objImpuesto_Gasto.Descripcion = ""
            objImpuesto_Gasto.FechaActualizacion = ""
            objImpuesto_Gasto.Usuario = ""

            ObjListImpuesto_Gasto.Add(objImpuesto_Gasto)
        End If

        Response.Write(JsonConvert.SerializeObject(ObjListImpuesto_Gasto.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que inserta en la tabla Impuesto_Gasto (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertImpuesto_Gasto()

        Dim objImpuesto_Gasto As New Impuesto_GastoClass
        Dim SQL_Impuesto_Gasto As New Impuesto_GastoSQLClass
        Dim ObjListImpuesto_Gasto As New List(Of Impuesto_GastoClass)

        Dim result As String
        Dim vl_s_IDxiste As String

        objImpuesto_Gasto.Impuesto_Gasto_ID = Request.Form("ID")

        'validamos si la llave existe
        vl_s_IDxiste = Consulta_Repetido(objImpuesto_Gasto.Impuesto_Gasto_ID)

        If vl_s_IDxiste = 0 Then

            objImpuesto_Gasto.Descripcion = Request.Form("descripcion")
            objImpuesto_Gasto.FechaActualizacion = Date.Now
            objImpuesto_Gasto.Usuario = Request.Form("user")

            ObjListImpuesto_Gasto.Add(objImpuesto_Gasto)

            result = SQL_Impuesto_Gasto.InsertImpuesto_Gasto(objImpuesto_Gasto)

            Response.Write(result)
        Else
            result = "Existe"
            Response.Write(result)
        End If

    End Sub

    ''' <summary>
    ''' funcion que actualiza en la tabla Impuesto_Gasto (UPDATE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub UpdateImpuesto_Gasto()

        Dim objImpuesto_Gasto As New Impuesto_GastoClass
        Dim SQL_Impuesto_Gasto As New Impuesto_GastoSQLClass
        Dim ObjListImpuesto_Gasto As New List(Of Impuesto_GastoClass)

        Dim result As String

        objImpuesto_Gasto.Impuesto_Gasto_ID = Request.Form("ID")
        objImpuesto_Gasto.Descripcion = Request.Form("descripcion")
        objImpuesto_Gasto.FechaActualizacion = Date.Now
        objImpuesto_Gasto.Usuario = Request.Form("user")

        ObjListImpuesto_Gasto.Add(objImpuesto_Gasto)

        result = SQL_Impuesto_Gasto.UpdateImpuesto_Gasto(objImpuesto_Gasto)

        Response.Write(result)

    End Sub

    ''' <summary>
    ''' funcion que elimina en la tabla Impuesto_Gasto (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub EraseImpuesto_Gasto()

        Dim objImpuesto_Gasto As New Impuesto_GastoClass
        Dim SQL_Impuesto_Gasto As New Impuesto_GastoSQLClass
        Dim ObjListImpuesto_Gasto As New List(Of Impuesto_GastoClass)

        Dim result As String

        objImpuesto_Gasto.Impuesto_Gasto_ID = Request.Form("ID")
        ObjListImpuesto_Gasto.Add(objImpuesto_Gasto)

        result = SQL_Impuesto_Gasto.EraseImpuesto_Gasto(objImpuesto_Gasto)
        Response.Write(result)
    End Sub

#End Region

#Region "DROP LIST"

    ''' <summary>
    ''' funcion que carga el objeto DDL Links
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplist()

        Dim SQL_Impuesto_Gasto As New Impuesto_GastoSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL_Impuesto_Gasto.ReadCharge_DropList(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

#End Region

#Region "FUNCIONES"

    ''' <summary>
    ''' funcion que valida si el id esta en la BD
    ''' </summary>
    ''' <param name="vp_S_ID"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Protected Function Consulta_Repetido(ByVal vp_S_ID As String)

        Dim SQL_General As New GeneralSQLClass
        Dim result As String

        result = SQL_General.ReadExist("Impuesto_Gasto", vp_S_ID, "IM_Impuesto_Gasto_ID", "", "2")
        Return result

    End Function

#End Region
End Class