Imports Newtonsoft.Json

Public Class RDoc_VerificacionAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "MATRIX_GRPDOC"
                    Cargar_MatrixGrpDocumento()

                Case "MATRIX_DOC"
                    Cargar_MatrixDocumento()

                Case "cargar_droplist_busqueda"
                    CargarDroplist()

                Case "Cliente"
                    CargarCliente()

                Case "consulta"
                    Consulta_RDoc_Verificacion()

                Case "crear"
                    InsertRDoc_Verificacion()

                Case "elimina"
                    EraseRDoc_Verificacion()
            End Select

        End If
    End Sub

#Region "CRUD"

    ''' <summary>
    ''' traemos todos los datos para tabla RDoc_Verificacion (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Consulta_RDoc_Verificacion()

        Dim SQL_RDoc_Verificacion As New RDoc_VerificacionSQLClass
        Dim ObjListRDoc_Verificacion As New List(Of RDoc_VerificacionClass)


        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_opcion As String = Request.Form("opcion")
        Dim vl_S_contenido As String = Request.Form("contenido")
        Dim vl_S_Nit_User As String = Request.Form("Nit_User")

        ObjListRDoc_Verificacion = SQL_RDoc_Verificacion.Read_AllRDoc_Verificacion(vl_S_filtro, vl_S_opcion, vl_S_contenido, vl_S_Nit_User)

        If ObjListRDoc_Verificacion Is Nothing Then

            Dim objRDoc_Verificacion As New RDoc_VerificacionClass
            ObjListRDoc_Verificacion = New List(Of RDoc_VerificacionClass)

            objRDoc_Verificacion.Doc_ID = 0
            objRDoc_Verificacion.FechaActualizacion = ""
            objRDoc_Verificacion.UsuarioCreacion = ""

            ObjListRDoc_Verificacion.Add(objRDoc_Verificacion)
        End If

        Response.Write(JsonConvert.SerializeObject(ObjListRDoc_Verificacion.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que inserta en la tabla RDoc_Verificacion (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertRDoc_Verificacion()

        Dim objRDoc_Verificacion As New RDoc_VerificacionClass
        Dim SQL_RDoc_Verificacion As New RDoc_VerificacionSQLClass
        Dim ObjListRDoc_Verificacion As New List(Of RDoc_VerificacionClass)

        Dim result As String
        Dim vl_s_IDxiste As String

        objRDoc_Verificacion.Nit_ID = Request.Form("Nit_ID")
        objRDoc_Verificacion.Doc_ID = Request.Form("Documento_1")
        objRDoc_Verificacion.Doc_ID_Verif = Request.Form("Documento_2")

        'validamos si la llave existe
        vl_s_IDxiste = SQL_RDoc_Verificacion.Consulta_Repetido(objRDoc_Verificacion)

        If vl_s_IDxiste = 0 Then

            objRDoc_Verificacion.UsuarioCreacion = Request.Form("user")
            objRDoc_Verificacion.FechaCreacion = Date.Now
            objRDoc_Verificacion.UsuarioActualizacion = Request.Form("user")
            objRDoc_Verificacion.FechaActualizacion = Date.Now

            ObjListRDoc_Verificacion.Add(objRDoc_Verificacion)

            result = SQL_RDoc_Verificacion.InsertRDoc_Verificacion(objRDoc_Verificacion)

            Response.Write(result)
        Else
            result = "Existe"
            Response.Write(result)
        End If

    End Sub

    ''' <summary>
    ''' funcion que elimina en la tabla RDoc_Verificacion (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub EraseRDoc_Verificacion()

        Dim objRDoc_Verificacion As New RDoc_VerificacionClass
        Dim SQL_RDoc_Verificacion As New RDoc_VerificacionSQLClass
        Dim ObjListRDoc_Verificacion As New List(Of RDoc_VerificacionClass)

        Dim result As String

        objRDoc_Verificacion.Nit_ID = Request.Form("Nit_ID")
        objRDoc_Verificacion.Doc_ID = Request.Form("Documento_1")
        objRDoc_Verificacion.Doc_ID_Verif = Request.Form("Documento_2")
        ObjListRDoc_Verificacion.Add(objRDoc_Verificacion)

        result = SQL_RDoc_Verificacion.EraseRDoc_Verificacion(objRDoc_Verificacion)
        Response.Write(result)
    End Sub

#End Region

#Region "DROP LIST"
    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Cargar_MatrixGrpDocumento()

        Dim SQL As New GrpDocumentosSQLClass
        Dim ObjList As New List(Of GrpDocumentosClass)

        ObjList = SQL.Matrix_GrpDocumento()
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Cargar_MatrixDocumento()

        Dim SQL As New DocumentoSQLClass
        Dim ObjList As New List(Of DocumentoClass)

        ObjList = SQL.Matrix_Documento()
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub


    ''' <summary>
    ''' funcion que carga el objeto DDL Links
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplist()

        Dim SQL_RDoc_Verificacion As New RDoc_VerificacionSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL_RDoc_Verificacion.ReadCharge_DropList(vl_S_Tabla)
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