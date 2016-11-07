Imports Newtonsoft.Json

Public Class DocumentoAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "MATRIX_RUTA"
                    Cargar_MatrixRuta()

                Case "cargar_droplist_busqueda"
                    CargarDroplist()

                Case "Cliente"
                    CargarCliente()

                Case "Formato"
                    CargarFormato()

                Case "consulta"
                    Consulta_Documento()

                Case "crear"
                    InsertDocumento()

                Case "modificar"
                    UpdateDocumento()

                Case "elimina"
                    EraseDocumento()
            End Select

        End If
    End Sub

#Region "CRUD"

    ''' <summary>
    ''' traemos todos los datos para tabla Documento (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Consulta_Documento()

        Dim SQL_Documento As New DocumentoSQLClass
        Dim ObjListDocumento As New List(Of DocumentoClass)


        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_opcion As String = Request.Form("opcion")
        Dim vl_S_contenido As String = Request.Form("contenido")

        ObjListDocumento = SQL_Documento.Read_AllDocumento(vl_S_filtro, vl_S_opcion, vl_S_contenido)

        If ObjListDocumento Is Nothing Then

            Dim objDocumento As New DocumentoClass
            ObjListDocumento = New List(Of DocumentoClass)

            objDocumento.Descripcion = ""
            objDocumento.FechaActualizacion = ""
            objDocumento.UsuarioCreacion = ""

            ObjListDocumento.Add(objDocumento)
        End If

        Response.Write(JsonConvert.SerializeObject(ObjListDocumento.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que inserta en la tabla Documento (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertDocumento()

        Dim objDocumento As New DocumentoClass
        Dim SQL_Documento As New DocumentoSQLClass
        Dim ObjListDocumento As New List(Of DocumentoClass)

        Dim result As String
        Dim vl_s_IDxiste As String

        objDocumento.Nit_ID = Request.Form("Nit_ID")
        objDocumento.Documento_ID = Request.Form("ID")

        'validamos si la llave existe
        vl_s_IDxiste = SQL_Documento.Consulta_Repetido(objDocumento)

        If vl_s_IDxiste = 0 Then

            objDocumento.Descripcion = Request.Form("descripcion")

            objDocumento.ChequeaVigencias = Request.Form("C_Vigencia")
            objDocumento.DiasVigencia = Request.Form("D_Vigencia")
            objDocumento.TipoContenido = Request.Form("TContenido")
            objDocumento.Formato_ID = Request.Form("Formato")
            objDocumento.TipoVersion = Request.Form("TVersion")
            objDocumento.Ruta_ID = Request.Form("RutaDocumento")
            objDocumento.Ruta_ID_Plantilla = Request.Form("RutaPlantilla")
            objDocumento.NombrePlantilla = Request.Form("NamePlanilla")
            objDocumento.RequiereVerificacion = Request.Form("CheckVerificacion")
            objDocumento.IndicativoFoto = Request.Form("Foto")

            objDocumento.UsuarioCreacion = Request.Form("user")
            objDocumento.FechaCreacion = Date.Now
            objDocumento.UsuarioActualizacion = Request.Form("user")
            objDocumento.FechaActualizacion = Date.Now

            ObjListDocumento.Add(objDocumento)

            result = SQL_Documento.InsertDocumento(objDocumento)

            Response.Write(result)
        Else
            result = "Existe"
            Response.Write(result)
        End If

    End Sub

    ''' <summary>
    ''' funcion que actualiza en la tabla Documento (UPDATE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub UpdateDocumento()

        Dim objDocumento As New DocumentoClass
        Dim SQL_Documento As New DocumentoSQLClass
        Dim ObjListDocumento As New List(Of DocumentoClass)

        Dim result As String

        objDocumento.Nit_ID = Request.Form("Nit_ID")
        objDocumento.Documento_ID = Request.Form("ID")
        objDocumento.Descripcion = Request.Form("descripcion")

        objDocumento.ChequeaVigencias = Request.Form("C_Vigencia")
        objDocumento.DiasVigencia = Request.Form("D_Vigencia")
        objDocumento.TipoContenido = Request.Form("TContenido")
        objDocumento.Formato_ID = Request.Form("Formato")
        objDocumento.TipoVersion = Request.Form("TVersion")
        objDocumento.Ruta_ID = Request.Form("RutaDocumento")
        objDocumento.Ruta_ID_Plantilla = Request.Form("RutaPlantilla")
        objDocumento.NombrePlantilla = Request.Form("NamePlanilla")
        objDocumento.RequiereVerificacion = Request.Form("CheckVerificacion")
        objDocumento.IndicativoFoto = Request.Form("Foto")

        objDocumento.UsuarioActualizacion = Request.Form("user")
        objDocumento.FechaActualizacion = Date.Now

        ObjListDocumento.Add(objDocumento)

        result = SQL_Documento.UpdateDocumento(objDocumento)

        Response.Write(result)

    End Sub

    ''' <summary>
    ''' funcion que elimina en la tabla Documento (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub EraseDocumento()

        Dim objDocumento As New DocumentoClass
        Dim SQL_Documento As New DocumentoSQLClass
        Dim ObjListDocumento As New List(Of DocumentoClass)

        Dim result As String

        objDocumento.Nit_ID = Request.Form("Nit_ID")
        objDocumento.Documento_ID = Request.Form("ID")
        ObjListDocumento.Add(objDocumento)

        result = SQL_Documento.EraseDocumento(objDocumento)
        Response.Write(result)
    End Sub

#End Region

#Region "DROP LIST"

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Cargar_MatrixRuta()

        Dim SQL As New RutaDocumentosSQLClass
        Dim ObjList As New List(Of RutaDocumentosClass)
    
        ObjList = SQL.Matrix_Ruta()
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL Links
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplist()

        Dim SQL_Documento As New DocumentoSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL_Documento.ReadCharge_DropList(vl_S_Tabla)
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
    Protected Sub CargarFormato()

        Dim SQL As New DocumentoSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL.Charge_DropListFormato(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

#End Region

#Region "FUNCIONES"

#End Region

End Class