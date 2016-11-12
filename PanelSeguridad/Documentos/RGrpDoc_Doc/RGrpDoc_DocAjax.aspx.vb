Imports Newtonsoft.Json

Public Class RGrpDoc_DocAjax
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
                    Consulta_RGrpDoc_Doc()

                Case "crear"
                    InsertRGrpDoc_Doc()

                Case "elimina"
                    EraseRGrpDoc_Doc()
            End Select

        End If
    End Sub

#Region "CRUD"

    ''' <summary>
    ''' traemos todos los datos para tabla RGrpDoc_Doc (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Consulta_RGrpDoc_Doc()

        Dim SQL_RGrpDoc_Doc As New RGrpDoc_DocSQLClass
        Dim ObjListRGrpDoc_Doc As New List(Of RGrpDoc_DocClass)


        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_opcion As String = Request.Form("opcion")
        Dim vl_S_contenido As String = Request.Form("contenido")

        ObjListRGrpDoc_Doc = SQL_RGrpDoc_Doc.Read_AllRGrpDoc_Doc(vl_S_filtro, vl_S_opcion, vl_S_contenido)

        If ObjListRGrpDoc_Doc Is Nothing Then

            Dim objRGrpDoc_Doc As New RGrpDoc_DocClass
            ObjListRGrpDoc_Doc = New List(Of RGrpDoc_DocClass)

            objRGrpDoc_Doc.Doc_ID = 0
            objRGrpDoc_Doc.FechaActualizacion = ""
            objRGrpDoc_Doc.UsuarioCreacion = ""

            ObjListRGrpDoc_Doc.Add(objRGrpDoc_Doc)
        End If

        Response.Write(JsonConvert.SerializeObject(ObjListRGrpDoc_Doc.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que inserta en la tabla RGrpDoc_Doc (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertRGrpDoc_Doc()

        Dim objRGrpDoc_Doc As New RGrpDoc_DocClass
        Dim SQL_RGrpDoc_Doc As New RGrpDoc_DocSQLClass
        Dim ObjListRGrpDoc_Doc As New List(Of RGrpDoc_DocClass)

        Dim result As String
        Dim vl_s_IDxiste As String

        objRGrpDoc_Doc.Nit_ID = Request.Form("Nit_ID")
        objRGrpDoc_Doc.GrpDoc_ID = Request.Form("GrpDocumento")
        objRGrpDoc_Doc.Doc_ID = Request.Form("Documento")
    
        'validamos si la llave existe
        vl_s_IDxiste = SQL_RGrpDoc_Doc.Consulta_Repetido(objRGrpDoc_Doc)

        If vl_s_IDxiste = 0 Then

            objRGrpDoc_Doc.UsuarioCreacion = Request.Form("user")
            objRGrpDoc_Doc.FechaCreacion = Date.Now
            objRGrpDoc_Doc.UsuarioActualizacion = Request.Form("user")
            objRGrpDoc_Doc.FechaActualizacion = Date.Now

            ObjListRGrpDoc_Doc.Add(objRGrpDoc_Doc)

            result = SQL_RGrpDoc_Doc.InsertRGrpDoc_Doc(objRGrpDoc_Doc)

            Response.Write(result)
        Else
            result = "Existe"
            Response.Write(result)
        End If

    End Sub

    ''' <summary>
    ''' funcion que elimina en la tabla RGrpDoc_Doc (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub EraseRGrpDoc_Doc()

        Dim objRGrpDoc_Doc As New RGrpDoc_DocClass
        Dim SQL_RGrpDoc_Doc As New RGrpDoc_DocSQLClass
        Dim ObjListRGrpDoc_Doc As New List(Of RGrpDoc_DocClass)

        Dim result As String

        objRGrpDoc_Doc.Nit_ID = Request.Form("Nit_ID")
        objRGrpDoc_Doc.GrpDoc_ID = Request.Form("GrpDocumento")
        objRGrpDoc_Doc.Doc_ID = Request.Form("Documento")
        ObjListRGrpDoc_Doc.Add(objRGrpDoc_Doc)

        result = SQL_RGrpDoc_Doc.EraseRGrpDoc_Doc(objRGrpDoc_Doc)
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

        Dim SQL_RGrpDoc_Doc As New RGrpDoc_DocSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL_RGrpDoc_Doc.ReadCharge_DropList(vl_S_Tabla)
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