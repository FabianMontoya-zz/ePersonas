Imports Newtonsoft.Json

Public Class Relation_Tipo_Subtipo_LeasingAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "cargar_droplist_busqueda"
                    CargarDroplist()

                Case "consulta"
                    Consulta_TP_Leasing()

                Case "crear"
                    InsertTP_Leasing()

             
                Case "elimina"
                    EraseTP_Leasing()

                Case "Tipo"
                    CargarTipo()

                Case "SubTipo"
                    CargarSubTipo()

            End Select

        End If
    End Sub

#Region "CRUD"

    ''' <summary>
    ''' traemos todos los datos para tabla TP_Leasing (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Consulta_TP_Leasing()

        Dim SQL_TP_Leasing As New Relation_Tipo_Subtipo_LeasingSQLClass
        Dim ObjListTP_Leasing As New List(Of Relation_Tipo_Subtipo_LeasingClass)


        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_opcion As String = Request.Form("opcion")
        Dim vl_S_contenido As String = Request.Form("contenido")

        ObjListTP_Leasing = SQL_TP_Leasing.Read_AllTP_Leasing(vl_S_filtro, vl_S_opcion, vl_S_contenido)

        If ObjListTP_Leasing Is Nothing Then

            Dim objTP_Leasing As New Relation_Tipo_Subtipo_LeasingClass
            ObjListTP_Leasing = New List(Of Relation_Tipo_Subtipo_LeasingClass)

            objTP_Leasing.FechaActualizacion = ""
            objTP_Leasing.Usuario = ""

            ObjListTP_Leasing.Add(objTP_Leasing)
        End If

        Response.Write(JsonConvert.SerializeObject(ObjListTP_Leasing.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que inserta en la tabla TP_Leasing (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertTP_Leasing()

        Dim objTP_Leasing As New Relation_Tipo_Subtipo_LeasingClass
        Dim SQL_TP_Leasing As New Relation_Tipo_Subtipo_LeasingSQLClass
        Dim ObjListTP_Leasing As New List(Of Relation_Tipo_Subtipo_LeasingClass)

        Dim result As String
        Dim vl_s_IDxiste As String

        objTP_Leasing.Tipo_ID = Request.Form("Tipo_ID")
        objTP_Leasing.SubTipo_ID = Request.Form("SubTipo_ID")

        'validamos si la llave existe
        vl_s_IDxiste = SQL_TP_Leasing.Consulta_Repetido(objTP_Leasing)

        If vl_s_IDxiste = 0 Then

           objTP_Leasing.FechaActualizacion = Date.Now
            objTP_Leasing.Usuario = Request.Form("user")

            ObjListTP_Leasing.Add(objTP_Leasing)

            result = SQL_TP_Leasing.InsertTP_Leasing(objTP_Leasing)

            Response.Write(result)
        Else
            result = "Existe"
            Response.Write(result)
        End If

    End Sub

    ''' <summary>
    ''' funcion que elimina en la tabla TP_Leasing (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub EraseTP_Leasing()

        Dim objTP_Leasing As New Relation_Tipo_Subtipo_LeasingClass
        Dim SQL_TP_Leasing As New Relation_Tipo_Subtipo_LeasingSQLClass
        Dim ObjListTP_Leasing As New List(Of Relation_Tipo_Subtipo_LeasingClass)

        Dim result As String

        objTP_Leasing.Tipo_ID = Request.Form("Tipo_ID")
        objTP_Leasing.SubTipo_ID = Request.Form("SubTipo_ID")
        ObjListTP_Leasing.Add(objTP_Leasing)

        result = SQL_TP_Leasing.EraseTP_Leasing(objTP_Leasing)
        Response.Write(result)
    End Sub

#End Region

#Region "DROP LIST"

    ''' <summary>
    ''' funcion que carga el objeto DDL Links
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplist()

        Dim SQL_TP_Leasing As New Relation_Tipo_Subtipo_LeasingSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL_TP_Leasing.ReadCharge_DropList(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarTipo()

        Dim SQL As New Relation_Tipo_Subtipo_LeasingSQLClass
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

        Dim SQL As New Relation_Tipo_Subtipo_LeasingSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL.Charge_DropListSubTipo(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

#End Region

#Region "FUNCIONES"

#End Region

End Class