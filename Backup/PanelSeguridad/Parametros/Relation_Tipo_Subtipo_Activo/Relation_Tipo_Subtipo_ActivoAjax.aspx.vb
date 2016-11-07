Imports Newtonsoft.Json

Public Class Relation_Tipo_Subtipo_ActivoAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "cargar_droplist_busqueda"
                    CargarDroplist()

                Case "consulta"
                    Consulta_TP_Activo()

                Case "crear"
                    InsertTP_Activo()


                Case "elimina"
                    EraseTP_Activo()

                Case "Tipo"
                    CargarTipo()

                Case "SubTipo"
                    CargarSubTipo()

            End Select

        End If
    End Sub

#Region "CRUD"

    ''' <summary>
    ''' traemos todos los datos para tabla TP_Activo (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Consulta_TP_Activo()

        Dim SQL_TP_Activo As New Relation_Tipo_Subtipo_ActivoSQLClass
        Dim ObjListTP_Activo As New List(Of Relation_Tipo_Subtipo_ActivoClass)


        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_opcion As String = Request.Form("opcion")
        Dim vl_S_contenido As String = Request.Form("contenido")

        ObjListTP_Activo = SQL_TP_Activo.Read_AllTP_Activo(vl_S_filtro, vl_S_opcion, vl_S_contenido)

        If ObjListTP_Activo Is Nothing Then

            Dim objTP_Activo As New Relation_Tipo_Subtipo_ActivoClass
            ObjListTP_Activo = New List(Of Relation_Tipo_Subtipo_ActivoClass)

            objTP_Activo.FechaActualizacion = ""
            objTP_Activo.Usuario = ""

            ObjListTP_Activo.Add(objTP_Activo)
        End If

        Response.Write(JsonConvert.SerializeObject(ObjListTP_Activo.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que inserta en la tabla TP_Activo (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertTP_Activo()

        Dim objTP_Activo As New Relation_Tipo_Subtipo_ActivoClass
        Dim SQL_TP_Activo As New Relation_Tipo_Subtipo_ActivoSQLClass
        Dim ObjListTP_Activo As New List(Of Relation_Tipo_Subtipo_ActivoClass)

        Dim result As String
        Dim vl_s_IDxiste As String

        objTP_Activo.Tipo_ID = Request.Form("Tipo_ID")
        objTP_Activo.SubTipo_ID = Request.Form("SubTipo_ID")

        'validamos si la llave existe
        vl_s_IDxiste = SQL_TP_Activo.Consulta_Repetido(objTP_Activo)

        If vl_s_IDxiste = 0 Then

            objTP_Activo.FechaActualizacion = Date.Now
            objTP_Activo.Usuario = Request.Form("user")

            ObjListTP_Activo.Add(objTP_Activo)

            result = SQL_TP_Activo.InsertTP_Activo(objTP_Activo)

            Response.Write(result)
        Else
            result = "Existe"
            Response.Write(result)
        End If

    End Sub

    ''' <summary>
    ''' funcion que elimina en la tabla TP_Activo (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub EraseTP_Activo()

        Dim objTP_Activo As New Relation_Tipo_Subtipo_ActivoClass
        Dim SQL_TP_Activo As New Relation_Tipo_Subtipo_ActivoSQLClass
        Dim ObjListTP_Activo As New List(Of Relation_Tipo_Subtipo_ActivoClass)

        Dim result As String

        objTP_Activo.Tipo_ID = Request.Form("Tipo_ID")
        objTP_Activo.SubTipo_ID = Request.Form("SubTipo_ID")
        ObjListTP_Activo.Add(objTP_Activo)

        result = SQL_TP_Activo.EraseTP_Activo(objTP_Activo)
        Response.Write(result)
    End Sub

#End Region

#Region "DROP LIST"

    ''' <summary>
    ''' funcion que carga el objeto DDL Links
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplist()

        Dim SQL_TP_Activo As New Relation_Tipo_Subtipo_ActivoSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL_TP_Activo.ReadCharge_DropList(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarTipo()

        Dim SQL As New Relation_Tipo_Subtipo_ActivoSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL.Charge_DropListTipo(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarSubTipo()

        Dim SQL As New Relation_Tipo_Subtipo_ActivoSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL.Charge_DropListSubTipo(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

#End Region

#Region "FUNCIONES"

#End Region

End Class