Imports Newtonsoft.Json
Imports System.Data
Imports System.Data.SqlClient
Imports System.Web.Script.Serialization
Imports System.IO


Public Class AutorizacionDocumentosAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        Dim Doc As New DocumentosClass
        If Request.Files.Count() > 0 Then
            Dim vl_S_RutaTemporal As String = Request.Form("RutaTemporal")
            Dim vl_S_NombreDoc As String = Request.Form("NameTemporal")
            Dim NameDocument As String = Doc.UpLoad_Document(Request.Files, vl_S_RutaTemporal, vl_S_NombreDoc)

            If NameDocument <> "" Then
                If NameDocument = "N" Then
                    Response.Write("NO_FORMAT")
                Else
                    Dim AFileDoc = Split(NameDocument, "|")
                    Dim ADoc = Split(AFileDoc(0), ".")
                    Dim vl_S_NameFormat As String = ADoc(0).Replace(" ", "")
                    vl_S_NameFormat = vl_S_NameFormat.Replace("_", "")
                    Dim NewNameDoc = AFileDoc(1).Replace("TEMP", UCase(vl_S_NameFormat))

                    Doc.Rename_doc(vl_S_RutaTemporal, NewNameDoc, vl_S_NombreDoc)
                    Response.Write(NewNameDoc)
                End If
            End If
            Exit Sub
        End If

        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "MATRIX_DOCUMENTO"
                    CargarMDocumento()

                Case "RUTAS_OPERACION"
                    CargarRutasOp()

                Case "MATIRXDOC_WORK"
                    Carga_Matrix_DocWork()

                Case "MATRIX_VERIFICAR"
                    Cargar_Matrix_Verificacion()

                Case "MATRIX_R_DOC_VERIFICACION"
                    Cargar_Matrix_R_Doc_Verificacion()

                Case "Copiar_Doc"
                    CopiaDoc_Origen()

                Case "DeleteDocument"
                    DeleteDoc()

                Case "Update_Consecutivo"
                    UpdateConsecutivo()

                Case "MATRIX_CONSECUTIVOS"
                    CargarMConsecutivos()

                Case "cargar_droplist_busqueda"
                    CargarDroplist()

                Case "Cliente"
                    CargarCliente()

                Case "consulta"
                    Consulta_AutorizacionDocumentos()

                Case "Update_Verificacion"
                    Update_Verificacion()

                Case "Update_Consecutivo"
                    UpdateConsecutivo()

                Case "Update_D_Exist_D_Asociados"
                    Save_Doc_Anexos()

                Case "elimina"
                    EraseAutorizacionDocumentos()
            End Select

        End If
    End Sub

#Region "CRUD"

    ''' <summary>
    ''' traemos todos los datos para tabla AutorizacionDocumentos (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Consulta_AutorizacionDocumentos()

        Dim SQL_AutorizacionDocumentos As New AutorizacionDocumentosSQLClass
        Dim ObjListAutorizacionDocumentos As New List(Of AutorizacionDocumentosClass)


        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_opcion As String = Request.Form("opcion")
        Dim vl_S_contenido As String = Request.Form("contenido")

        ObjListAutorizacionDocumentos = SQL_AutorizacionDocumentos.Read_AllAutorizacionDocumentos(vl_S_filtro, vl_S_opcion, vl_S_contenido)

        If ObjListAutorizacionDocumentos Is Nothing Then

            Dim objAutorizacionDocumentos As New AutorizacionDocumentosClass
            ObjListAutorizacionDocumentos = New List(Of AutorizacionDocumentosClass)

            objAutorizacionDocumentos.Descripcion = ""
            objAutorizacionDocumentos.FechaActualizacion = ""
            objAutorizacionDocumentos.UsuarioCreacion = ""

            ObjListAutorizacionDocumentos.Add(objAutorizacionDocumentos)
        End If

        Response.Write(JsonConvert.SerializeObject(ObjListAutorizacionDocumentos.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que inserta en la tabla DocumentosExistentes (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertDocExits()

        Dim obj As New DocumentosExistentesClass
        Dim SQL As New DocumentosExistentesSQLClass
        Dim ObjList As New List(Of DocumentosExistentesClass)

        Dim result As String

        obj.Secuencia_ID = Request.Form("Secuencia")
        obj.Documento_ID = Request.Form("Documento_ID")
        obj.Nombre_Save = Request.Form("Nombre_Save")
        obj.RutaDocumento = Request.Form("Ruta")
        obj.Formato = Request.Form("Formato")
        obj.Indicativo = Request.Form("IndicativoFoto")
        obj.Verificado = Request.Form("RequiereVerif")
        obj.Observaciones_Captura = Request.Form("ObserCaptura")
        obj.Fecha_Inicio_Vigencia = Request.Form("FechaVigencia")
        obj.Fecha_Vencimiento = Request.Form("FechaVencimiento")
        obj.Dias_Vigencia = Request.Form("DiasVigencia")
        obj.UsuarioCreacion = Request.Form("user")
        obj.FechaCreacion = Date.Now
        obj.UsuarioActualizacion = Request.Form("user")
        obj.FechaActualizacion = Date.Now

        ObjList.Add(obj)

        result = SQL.InsertDocumentosExistentes(obj)

        Response.Write(result)

    End Sub

    ''' <summary>
    ''' funcion que inserta en la tabla DocumentosExistentes (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertDocAsociados()

        Dim obj As New AsociacionDocumentosClass
        Dim SQL As New AsociacionDocumentosSQLClass
        Dim ObjList As New List(Of AsociacionDocumentosClass)

        Dim result As String

        obj.Nit_ID = Request.Form("Nit_ID")
        obj.TypeDocument_ID = Request.Form("TDoc")
        obj.Document_ID = Request.Form("Doc")
        obj.Secuencia_Doc = Request.Form("Secuencia_doc")
        obj.Secuencia_ID = Request.Form("Secuencia_ID")
        obj.Contrato_ID = Request.Form("Contrato")
        obj.Ref_1 = Request.Form("Activos")
        obj.Factura_ID = Request.Form("Facturas")
        obj.UsuarioCreacion = Request.Form("user")
        obj.FechaCreacion = Date.Now
        obj.UsuarioActualizacion = Request.Form("user")
        obj.FechaActualizacion = Date.Now

        ObjList.Add(obj)

        result = SQL.InsertDocumentosAsociados(obj)

        Response.Write(result)



    End Sub

    ''' <summary>
    ''' funcion que actualiza en la tabla AutorizacionDocumentos (UPDATE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Update_Verificacion()

        Dim objAutorizacionDocumentos As New DocumentosClass
        Dim SQL_AutorizacionDocumentos As New AutorizacionDocumentosSQLClass
        Dim ObjListAutorizacionDocumentos As New List(Of DocumentosClass)

        Dim result As String = ""

        objAutorizacionDocumentos.Nombre_Save = Request.Form("Documento")
        objAutorizacionDocumentos.Verificado = Request.Form("Verificacion_ID")
        objAutorizacionDocumentos.Fecha_Verifico = Request.Form("FVerificacion")
        objAutorizacionDocumentos.Observaciones_Validacion = Request.Form("Observacion")

        objAutorizacionDocumentos.Usuario_Verifico = Request.Form("user")

        objAutorizacionDocumentos.UsuarioActualizacion = Request.Form("user")
        objAutorizacionDocumentos.FechaActualizacion = Date.Now

        ObjListAutorizacionDocumentos.Add(objAutorizacionDocumentos)
        result = SQL_AutorizacionDocumentos.UpdateDocumentos_Existentes(objAutorizacionDocumentos)

        Response.Write(result)

    End Sub

    ''' <summary>
    ''' funcion que elimina en la tabla AutorizacionDocumentos (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub EraseAutorizacionDocumentos()

        Dim objAutorizacionDocumentos As New AutorizacionDocumentosClass
        Dim SQL_AutorizacionDocumentos As New AutorizacionDocumentosSQLClass
        Dim ObjListAutorizacionDocumentos As New List(Of AutorizacionDocumentosClass)

        Dim result As String

        objAutorizacionDocumentos.Nit_ID = Request.Form("Nit_ID")
        objAutorizacionDocumentos.AutorizacionDocumentos_ID = Request.Form("ID")
        ObjListAutorizacionDocumentos.Add(objAutorizacionDocumentos)

        result = SQL_AutorizacionDocumentos.EraseAutorizacionDocumentos(objAutorizacionDocumentos)
        Response.Write(result)
    End Sub

#End Region

#Region "DROP LIST"

    ''' <summary>
    ''' funcion que carga  Matrix contrato
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarMDocumento()

        Dim SQL As New DocumentoSQLClass
        Dim ObjList As New List(Of DocumentoClass)

        ObjList = SQL.Matrix_Documento()
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga  rutas operacion
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarRutasOp()
        Dim SQL As New DocumentoSQLClass
        Dim ObjList As New List(Of DocumentoClass)

        ObjList = SQL.RutasOpe()
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

    ''' <summary>
    ''' cara la matriz de  verificacion documento 
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Cargar_Matrix_Verificacion()

        Dim SQL As New AutorizacionDocumentosSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)

        ObjListDroplist = SQL.Charge_DropListVerificacion()
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))


    End Sub

    ''' <summary>
    ''' cara la matriz de  verificacion documento 
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Cargar_Matrix_R_Doc_Verificacion()

        Dim SQL As New RDoc_VerificacionSQLClass
        Dim ObjList As New List(Of RDoc_VerificacionClass)

        ObjList = SQL.Matrix_R_Documento_Verificacion()
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))


    End Sub

    ''' <summary>
    ''' cara la matriz de documento para trabajo
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Carga_Matrix_DocWork()

        Dim SQL As New DocumentosSQLClass
        Dim ObjList As New List(Of DocumentosClass)

        ObjList = SQL.MatrixDocumentWork()
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga  Matrix consecutivos 
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarMConsecutivos()

        Dim SQL As New ConsecutivosSQLClass
        Dim ObjList As New List(Of ConsecutivosClass)

        ObjList = SQL.MatrixConcecutivo()
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL Links
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplist()

        Dim SQL_AutorizacionDocumentos As New AutorizacionDocumentosSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL_AutorizacionDocumentos.ReadCharge_DropList(vl_S_Tabla)
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

        Dim SQL As New AutorizacionDocumentosSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL.Charge_DropListFormato(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

#End Region

#Region "FUNCIONES"

    ''' <summary>
    ''' copia de carpeta temporal a carpeta de origen
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CopiaDoc_Origen()

        Dim Doc As New DocumentosClass

        Dim vl_S_RutaDestino As String = Request.Form("RutaDestino")
        Dim vl_S_RutaOrigen As String = Request.Form("RutaTemporal")
        Dim vl_S_Doc_name As String = Request.Form("Doc_name")
        Dim vl_S_Doc_Name_Final As String = Request.Form("NameDoc_Final")

        Dim Copia As Integer = Doc.Copy_Document_Folder_View(vl_S_RutaOrigen, vl_S_RutaDestino, vl_S_Doc_name, vl_S_Doc_Name_Final, "READ")

        Response.Write(Copia)

    End Sub

    ''' <summary>
    ''' dorra el archivo de la temporal
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub DeleteDoc()

        Dim Doc As New DocumentosClass

        Dim vl_S_RutaDestino As String = Request.Form("Ruta")
        Dim vl_S_Doc_name As String = Request.Form("Doc_name")

        Dim Delete As Integer = Doc.Delete_Document_Folder_View(vl_S_RutaDestino, vl_S_Doc_name)

        Response.Write(Delete)

    End Sub

    ''' <summary>
    ''' ACTUALIZA EL CONSECUTIVO DEL LA EMPRESA 
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub UpdateConsecutivo()

        Dim Conse As New ConsecutivosSQLClass
        Dim Obj As New ConsecutivosClass

        Obj.Consecutivo_ID = Request.Form("Consecutivo")
        Obj.Nit_ID = Request.Form("Nit_ID")

        Dim result As String = Conse.UpdateConsecutivo(Obj)

        Response.Write(result)

    End Sub

#End Region

#Region "GUARDAR DOCUMENTOS ANEXOS"

    ''' <summary>
    ''' proceso que guarda y copia los documentos anexos
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Save_Doc_Anexos()

        Dim Sql_DocExist As New DocumentosExistentesSQLClass
        Dim Sql_DocAsociados As New AsociacionDocumentosSQLClass
        Dim Doc As New DocumentosClass
        Dim Flag As Integer = 0
        Dim Result As String = ""

        Dim ListDocExitentes As New List(Of DocumentosExistentesClass)
        ListDocExitentes = create_List_Doc_existente()

        Dim ListDocAsociados As New List(Of AsociacionDocumentosClass)
        ListDocAsociados = create_List_Doc_Asociados()

        Dim ListDocCopy As New List(Of DocumentosClass)
        ListDocCopy = create_List_CopyDocument()

        For Each item_list As DocumentosExistentesClass In ListDocExitentes
            Sql_DocExist.InsertDocumentosExistentes(item_list)
        Next

        For Each item_list As AsociacionDocumentosClass In ListDocAsociados
            Sql_DocAsociados.InsertDocumentosAsociados(item_list)

            If Flag = 0 Then
                Result = Sql_DocAsociados.UpdateDocPadre(item_list)
                Flag = 1
            End If
        Next

        For Each item_list As DocumentosClass In ListDocCopy
            Doc.Copy_Document_Folder_View(item_list.RutaRelativaDocumento, item_list.RutaDocumentoDestino, item_list.Nombre_Old, item_list.Nombre_Save, item_list.Trama)
        Next


        Response.Write(Result)
    End Sub

    ''' <summary>
    ''' crea lista de objetos para insercion en documentos existentes
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function create_List_Doc_existente()

        Dim S_list As String = Request.Form("listDocAnexos").ToString
        Dim NewList = JsonConvert.DeserializeObject(Of List(Of DocumentosClass))(S_list)

        Dim ObjListDocExistente As New List(Of DocumentosExistentesClass)

        For Each item As DocumentosClass In NewList

            Dim Obj As New DocumentosExistentesClass

            Obj.Nit_ID = item.Nit_ID
            Obj.Secuencia_ID = item.Consecutivo
            Obj.Documento_ID = item.Documento_ID
            Dim ANombreSave = Split(item.Nombre_Save, ".")
            Obj.Nombre_Save = ANombreSave(0)
            Obj.RutaDocumento = item.RutaDocumentoDestino
            Obj.Formato = item.Formato
            Obj.Indicativo = item.Indicativo
            Obj.Observaciones_Captura = item.Observaciones_Captura
            Obj.Dias_Vigencia = 0
            Obj.UsuarioCreacion = item.UsuarioCreacion
            Obj.UsuarioActualizacion = item.UsuarioCreacion
            Obj.FechaCreacion = Date.Now
            Obj.FechaActualizacion = Date.Now

            ObjListDocExistente.Add(Obj)

        Next

        Return ObjListDocExistente

    End Function

    ''' <summary>
    ''' crea la lista para insercion en asociacion documentos
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function create_List_Doc_Asociados()

        Dim S_list As String = Request.Form("listDocAnexos").ToString
        Dim NewList = JsonConvert.DeserializeObject(Of List(Of DocumentosClass))(S_list)

        Dim ObjListDocAsociado As New List(Of AsociacionDocumentosClass)

        For Each item As DocumentosClass In NewList

            Dim Obj As New AsociacionDocumentosClass

            Obj.Nit_ID = item.Nit_ID
            Obj.TypeDocument_ID = 0
            Obj.Document_ID = 0
            Obj.Secuencia_Doc = item.Secuencia_Doc
            Obj.Contrato_ID = ""
            Obj.Ref_1 = ""
            Obj.Factura_ID = ""
            Obj.Secuencia_ID = item.Consecutivo
            Obj.UsuarioCreacion = item.UsuarioCreacion
            Obj.UsuarioActualizacion = item.UsuarioCreacion
            Obj.FechaCreacion = Date.Now
            Obj.FechaActualizacion = Date.Now

            ObjListDocAsociado.Add(Obj)
        Next

        Return ObjListDocAsociado
    End Function

    ''' <summary>
    ''' crea la lista de documentos para guardar
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function create_List_CopyDocument()

        Dim S_list As String = Request.Form("listDocAnexos").ToString
        Dim NewList = JsonConvert.DeserializeObject(Of List(Of DocumentosClass))(S_list)

        Dim ObjListDocCopy As New List(Of DocumentosClass)

        For Each item As DocumentosClass In NewList

            Dim Obj As New DocumentosClass

            Obj.RutaDocumentoDestino = item.RutaDocumentoDestino
            Obj.RutaRelativaDocumento = item.RutaRelativaDocumento
            Obj.Nombre_Old = item.Nombre_Old
            Obj.Nombre_Save = item.Nombre_Save
            Obj.Trama = "CREATE"

            ObjListDocCopy.Add(Obj)
        Next

        Return ObjListDocCopy

    End Function

#End Region

End Class