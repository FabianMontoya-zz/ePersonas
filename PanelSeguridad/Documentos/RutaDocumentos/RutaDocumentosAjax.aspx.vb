Imports Newtonsoft.Json

Public Class RutaDocumentosAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "cargar_droplist_busqueda"
                    CargarDroplist()

                Case "Cliente"
                    CargarCliente()

                Case "consulta"
                    Consulta_RutaDocumentos()

                Case "crear"
                    InsertRutaDocumentos()

                Case "modificar"
                    UpdateRutaDocumentos()

                Case "elimina"
                    EraseRutaDocumentos()
            End Select

        End If
    End Sub

#Region "CRUD"

    ''' <summary>
    ''' traemos todos los datos para tabla RutaDocumentos (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Consulta_RutaDocumentos()

        Dim SQL_RutaDocumentos As New RutaDocumentosSQLClass
        Dim ObjListRutaDocumentos As New List(Of RutaDocumentosClass)


        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_opcion As String = Request.Form("opcion")
        Dim vl_S_contenido As String = Request.Form("contenido")

        ObjListRutaDocumentos = SQL_RutaDocumentos.Read_AllRutaDocumentos(vl_S_filtro, vl_S_opcion, vl_S_contenido)

        If ObjListRutaDocumentos Is Nothing Then

            Dim objRutaDocumentos As New RutaDocumentosClass
            ObjListRutaDocumentos = New List(Of RutaDocumentosClass)

            objRutaDocumentos.Ruta = ""
            objRutaDocumentos.FechaActualizacion = ""
            objRutaDocumentos.UsuarioCreacion = ""

            ObjListRutaDocumentos.Add(objRutaDocumentos)
        End If

        Response.Write(JsonConvert.SerializeObject(ObjListRutaDocumentos.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que inserta en la tabla RutaDocumentos (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertRutaDocumentos()

        Dim objRutaDocumentos As New RutaDocumentosClass
        Dim SQL_RutaDocumentos As New RutaDocumentosSQLClass
        Dim ObjListRutaDocumentos As New List(Of RutaDocumentosClass)

        Dim result As String
        Dim vl_s_IDxiste As String

        objRutaDocumentos.Nit_ID = Request.Form("Nit_ID")
        objRutaDocumentos.RutaDocumentos_ID = Request.Form("ID")

        'validamos si la llave existe
        vl_s_IDxiste = SQL_RutaDocumentos.Consulta_Repetido(objRutaDocumentos)

        If vl_s_IDxiste = 0 Then

            objRutaDocumentos.Ruta = Request.Form("descripcion")
           
            objRutaDocumentos.UsuarioCreacion = Request.Form("user")
            objRutaDocumentos.FechaCreacion = Date.Now
            objRutaDocumentos.UsuarioActualizacion = Request.Form("user")
            objRutaDocumentos.FechaActualizacion = Date.Now

            ObjListRutaDocumentos.Add(objRutaDocumentos)

            result = SQL_RutaDocumentos.InsertRutaDocumentos(objRutaDocumentos)

            Response.Write(result)
        Else
            result = "Existe"
            Response.Write(result)
        End If

    End Sub

    ''' <summary>
    ''' funcion que actualiza en la tabla RutaDocumentos (UPDATE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub UpdateRutaDocumentos()

        Dim objRutaDocumentos As New RutaDocumentosClass
        Dim SQL_RutaDocumentos As New RutaDocumentosSQLClass
        Dim ObjListRutaDocumentos As New List(Of RutaDocumentosClass)

        Dim result As String

        objRutaDocumentos.Nit_ID = Request.Form("Nit_ID")
        objRutaDocumentos.RutaDocumentos_ID = Request.Form("ID")
        objRutaDocumentos.Ruta = Request.Form("descripcion")

        objRutaDocumentos.UsuarioActualizacion = Request.Form("user")
        objRutaDocumentos.FechaActualizacion = Date.Now

        ObjListRutaDocumentos.Add(objRutaDocumentos)

        result = SQL_RutaDocumentos.UpdateRutaDocumentos(objRutaDocumentos)

        Response.Write(result)

    End Sub

    ''' <summary>
    ''' funcion que elimina en la tabla RutaDocumentos (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub EraseRutaDocumentos()

        Dim objRutaDocumentos As New RutaDocumentosClass
        Dim SQL_RutaDocumentos As New RutaDocumentosSQLClass
        Dim ObjListRutaDocumentos As New List(Of RutaDocumentosClass)

        Dim result As String

        objRutaDocumentos.Nit_ID = Request.Form("Nit_ID")
        objRutaDocumentos.RutaDocumentos_ID = Request.Form("ID")
        ObjListRutaDocumentos.Add(objRutaDocumentos)

        result = SQL_RutaDocumentos.EraseRutaDocumentos(objRutaDocumentos)
        Response.Write(result)
    End Sub

#End Region

#Region "DROP LIST"

    ''' <summary>
    ''' funcion que carga el objeto DDL Links
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplist()

        Dim SQL_RutaDocumentos As New RutaDocumentosSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL_RutaDocumentos.ReadCharge_DropList(vl_S_Tabla)
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

#End Region

#Region "FUNCIONES"

#End Region

End Class