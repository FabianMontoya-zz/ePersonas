Imports Newtonsoft.Json

Public Class GrpDocumentosAjax
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
                    Consulta_GrpDocumentos()

                Case "crear"
                    InsertGrpDocumentos()

                Case "modificar"
                    UpdateGrpDocumentos()

                Case "elimina"
                    EraseGrpDocumentos()
            End Select

        End If
    End Sub

#Region "CRUD"

    ''' <summary>
    ''' traemos todos los datos para tabla GrpDocumentos (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Consulta_GrpDocumentos()

        Dim SQL_GrpDocumentos As New GrpDocumentosSQLClass
        Dim ObjListGrpDocumentos As New List(Of GrpDocumentosClass)


        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_opcion As String = Request.Form("opcion")
        Dim vl_S_contenido As String = Request.Form("contenido")

        ObjListGrpDocumentos = SQL_GrpDocumentos.Read_AllGrpDocumentos(vl_S_filtro, vl_S_opcion, vl_S_contenido)

        If ObjListGrpDocumentos Is Nothing Then

            Dim objGrpDocumentos As New GrpDocumentosClass
            ObjListGrpDocumentos = New List(Of GrpDocumentosClass)

            objGrpDocumentos.Descripcion = ""
            objGrpDocumentos.FechaActualizacion = ""
            objGrpDocumentos.UsuarioCreacion = ""

            ObjListGrpDocumentos.Add(objGrpDocumentos)
        End If

        Response.Write(JsonConvert.SerializeObject(ObjListGrpDocumentos.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que inserta en la tabla GrpDocumentos (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertGrpDocumentos()

        Dim objGrpDocumentos As New GrpDocumentosClass
        Dim SQL_GrpDocumentos As New GrpDocumentosSQLClass
        Dim ObjListGrpDocumentos As New List(Of GrpDocumentosClass)

        Dim result As String
        Dim vl_s_IDxiste As String

        objGrpDocumentos.Nit_ID = Request.Form("Nit_ID")
        objGrpDocumentos.GrpDocumentos_ID = Request.Form("ID")

        'validamos si la llave existe
        vl_s_IDxiste = SQL_GrpDocumentos.Consulta_Repetido(objGrpDocumentos)

        If vl_s_IDxiste = 0 Then

            objGrpDocumentos.Descripcion = Request.Form("descripcion")
            objGrpDocumentos.TipoGrupo = Request.Form("TipoGrupo")

            objGrpDocumentos.UsuarioCreacion = Request.Form("user")
            objGrpDocumentos.FechaCreacion = Date.Now
            objGrpDocumentos.UsuarioActualizacion = Request.Form("user")
            objGrpDocumentos.FechaActualizacion = Date.Now

            ObjListGrpDocumentos.Add(objGrpDocumentos)

            result = SQL_GrpDocumentos.InsertGrpDocumentos(objGrpDocumentos)

            Response.Write(result)
        Else
            result = "Existe"
            Response.Write(result)
        End If

    End Sub

    ''' <summary>
    ''' funcion que actualiza en la tabla GrpDocumentos (UPDATE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub UpdateGrpDocumentos()

        Dim objGrpDocumentos As New GrpDocumentosClass
        Dim SQL_GrpDocumentos As New GrpDocumentosSQLClass
        Dim ObjListGrpDocumentos As New List(Of GrpDocumentosClass)

        Dim result As String

        objGrpDocumentos.Nit_ID = Request.Form("Nit_ID")
        objGrpDocumentos.GrpDocumentos_ID = Request.Form("ID")
        objGrpDocumentos.Descripcion = Request.Form("descripcion")

        objGrpDocumentos.Descripcion = Request.Form("descripcion")
        objGrpDocumentos.TipoGrupo = Request.Form("TipoGrupo")

        objGrpDocumentos.UsuarioActualizacion = Request.Form("user")
        objGrpDocumentos.FechaActualizacion = Date.Now

        ObjListGrpDocumentos.Add(objGrpDocumentos)

        result = SQL_GrpDocumentos.UpdateGrpDocumentos(objGrpDocumentos)

        Response.Write(result)

    End Sub

    ''' <summary>
    ''' funcion que elimina en la tabla GrpDocumentos (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub EraseGrpDocumentos()

        Dim objGrpDocumentos As New GrpDocumentosClass
        Dim SQL_GrpDocumentos As New GrpDocumentosSQLClass
        Dim ObjListGrpDocumentos As New List(Of GrpDocumentosClass)

        Dim result As String

        objGrpDocumentos.Nit_ID = Request.Form("Nit_ID")
        objGrpDocumentos.GrpDocumentos_ID = Request.Form("ID")
        ObjListGrpDocumentos.Add(objGrpDocumentos)

        result = SQL_GrpDocumentos.EraseGrpDocumentos(objGrpDocumentos)
        Response.Write(result)
    End Sub

#End Region

#Region "DROP LIST"

    ''' <summary>
    ''' funcion que carga el objeto DDL Links
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplist()

        Dim SQL_GrpDocumentos As New GrpDocumentosSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL_GrpDocumentos.ReadCharge_DropList(vl_S_Tabla)
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