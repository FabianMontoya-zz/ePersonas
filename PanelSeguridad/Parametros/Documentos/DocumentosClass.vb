Imports System
Imports System.IO
Imports System.Text
Imports Newtonsoft.Json
Imports System.Data
Imports System.Data.SqlClient
Imports System.Web.Script.Serialization

Public Class DocumentosClass

#Region "Campos"
    Private _Nit_ID As String
    Private _TypeDocument_ID As Integer
    Private _Document_ID As Long

    Private _DocExist_ID As Integer
    Private _Documento_ID As String

    Private _RutaDocumento As String
    Private _RutaDocumentoDestino As String
    Private _RutaRelativaDocumento As String
    Private _RutaDocumentoTemporal As String
    Private _RutaDocumentoVisualizacion As String

    Private _Formato As Integer
    Private _TipoContenido As String
    Private _TipoVersion As String
    Private _Asunto As String
    Private _Trama As String

    Private _UsuarioCreacion As String
    Private _FechaCreacion As String
    Private _UsuarioActualizacion As String
    Private _FechaActualizacion As String

    Private _Nombre_Save As String
    Private _Nombre_Old As String

    Private _Indicativo As String
    Private _Verificado As String
    Private _Usuario_Verifico As String
    Private _Fecha_Verifico As String
    Private _Observaciones_Captura As String
    Private _Observaciones_Validacion As String
    Private _Fecha_Vencimiento As String
    Private _Fecha_Inicio_Vigencia As String
    Private _Dias_Vigencia As Integer

    Private _NombrePlantilla As String
    Private _ChequeaVigencias As String
    Private _RequiereVerificacion As String

    Private _DescripContenido As String
    Private _DescripFormato As String
    Private _DescripVersion As String
    Private _DescripVerificacion As String
    Private _DescripRuta As String
    Private _DescripRutaPlantilla As String
    Private _Secuencia_Doc As Integer
    Private _Contrato_ID As String
    Private _Ref_1 As String
    Private _Factura_ID As String
    Private _Secuencia_ID As Integer
    Private _Descripcion As String
    Private _Ruta_ID_Plantilla As Integer

    Private _DescripEmpresa As String
    Private _Consecutivo As Integer

#End Region

#Region "Propiedades"
    Public Property Nit_ID() As String
        Get
            Return Me._Nit_ID
        End Get
        Set(ByVal value As String)
            Me._Nit_ID = value
        End Set
    End Property
    Public Property TypeDocument_ID() As Integer
        Get
            Return Me._TypeDocument_ID
        End Get
        Set(ByVal value As Integer)
            Me._TypeDocument_ID = value
        End Set
    End Property
    Public Property Document_ID() As Long
        Get
            Return Me._Document_ID
        End Get
        Set(ByVal value As Long)
            Me._Document_ID = value
        End Set
    End Property

    Public Property DocExist_ID() As Integer
        Get
            Return Me._DocExist_ID
        End Get
        Set(ByVal value As Integer)
            Me._DocExist_ID = value
        End Set
    End Property
    Public Property Documento_ID() As String
        Get
            Return Me._Documento_ID
        End Get
        Set(ByVal value As String)
            Me._Documento_ID = value
        End Set
    End Property
    Public Property RutaDocumento() As String
        Get
            Return Me._RutaDocumento
        End Get
        Set(ByVal value As String)
            Me._RutaDocumento = value
        End Set
    End Property
    Public Property RutaDocumentoDestino() As String
        Get
            Return Me._RutaDocumentoDestino
        End Get
        Set(ByVal value As String)
            Me._RutaDocumentoDestino = value
        End Set
    End Property
    Public Property RutaRelativaDocumento() As String
        Get
            Return Me._RutaRelativaDocumento
        End Get
        Set(ByVal value As String)
            Me._RutaRelativaDocumento = value
        End Set
    End Property
    Public Property RutaDocumentoTemporal() As String
        Get
            Return Me._RutaDocumentoTemporal
        End Get
        Set(ByVal value As String)
            Me._RutaDocumentoTemporal = value
        End Set
    End Property
    Public Property RutaDocumentoVisualizacion() As String
        Get
            Return Me._RutaDocumentoVisualizacion
        End Get
        Set(ByVal value As String)
            Me._RutaDocumentoVisualizacion = value
        End Set
    End Property
    Public Property Formato() As Integer
        Get
            Return Me._Formato
        End Get
        Set(ByVal value As Integer)
            Me._Formato = value
        End Set
    End Property
    Public Property TipoContenido() As String
        Get
            Return Me._TipoContenido
        End Get
        Set(ByVal value As String)
            Me._TipoContenido = value
        End Set
    End Property
    Public Property TipoVersion() As String
        Get
            Return Me._TipoVersion
        End Get
        Set(ByVal value As String)
            Me._TipoVersion = value
        End Set
    End Property
    Public Property Asunto() As String
        Get
            Return Me._Asunto
        End Get
        Set(ByVal value As String)
            Me._Asunto = value
        End Set
    End Property
    Public Property Trama() As String
        Get
            Return Me._Trama
        End Get
        Set(ByVal value As String)
            Me._Trama = value
        End Set
    End Property

    Public Property UsuarioCreacion() As String
        Get
            Return Me._UsuarioCreacion
        End Get
        Set(ByVal value As String)
            Me._UsuarioCreacion = value
        End Set
    End Property
    Public Property FechaCreacion() As String
        Get
            Return Me._FechaCreacion
        End Get
        Set(ByVal value As String)
            Me._FechaCreacion = value
        End Set
    End Property
    Public Property UsuarioActualizacion() As String
        Get
            Return Me._UsuarioActualizacion
        End Get
        Set(ByVal value As String)
            Me._UsuarioActualizacion = value
        End Set
    End Property
    Public Property FechaActualizacion() As String
        Get
            Return Me._FechaActualizacion
        End Get
        Set(ByVal value As String)
            Me._FechaActualizacion = value
        End Set
    End Property

    Public Property DescripContenido() As String
        Get
            Return Me._DescripContenido
        End Get
        Set(ByVal value As String)
            Me._DescripContenido = value
        End Set
    End Property
    Public Property DescripFormato() As String
        Get
            Return Me._DescripFormato
        End Get
        Set(ByVal value As String)
            Me._DescripFormato = value
        End Set
    End Property
    Public Property DescripVersion() As String
        Get
            Return Me._DescripVersion
        End Get
        Set(ByVal value As String)
            Me._DescripVersion = value
        End Set
    End Property
    Public Property DescripVerificacion() As String
        Get
            Return Me._DescripVerificacion
        End Get
        Set(ByVal value As String)
            Me._DescripVerificacion = value
        End Set
    End Property
    Public Property DescripRuta() As String
        Get
            Return Me._DescripRuta
        End Get
        Set(ByVal value As String)
            Me._DescripRuta = value
        End Set
    End Property
    Public Property DescripRutaPlantilla() As String
        Get
            Return Me._DescripRutaPlantilla
        End Get
        Set(ByVal value As String)
            Me._DescripRutaPlantilla = value
        End Set
    End Property

    Public Property Nombre_Save() As String
        Get
            Return Me._Nombre_Save
        End Get
        Set(ByVal value As String)
            Me._Nombre_Save = value
        End Set
    End Property
    Public Property Nombre_Old() As String
        Get
            Return Me._Nombre_Old
        End Get
        Set(ByVal value As String)
            Me._Nombre_Old = value
        End Set
    End Property
    Public Property Indicativo() As String
        Get
            Return Me._Indicativo
        End Get
        Set(ByVal value As String)
            Me._Indicativo = value
        End Set
    End Property
    Public Property Verificado() As String
        Get
            Return Me._Verificado
        End Get
        Set(ByVal value As String)
            Me._Verificado = value
        End Set
    End Property
    Public Property Usuario_Verifico() As String
        Get
            Return Me._Usuario_Verifico
        End Get
        Set(ByVal value As String)
            Me._Usuario_Verifico = value
        End Set
    End Property
    Public Property Fecha_Verifico() As String
        Get
            Return Me._Fecha_Verifico
        End Get
        Set(ByVal value As String)
            Me._Fecha_Verifico = value
        End Set
    End Property
    Public Property Observaciones_Captura() As String
        Get
            Return Me._Observaciones_Captura
        End Get
        Set(ByVal value As String)
            Me._Observaciones_Captura = value
        End Set
    End Property
    Public Property Observaciones_Validacion() As String
        Get
            Return Me._Observaciones_Validacion
        End Get
        Set(ByVal value As String)
            Me._Observaciones_Validacion = value
        End Set
    End Property
    Public Property Fecha_Vencimiento() As String
        Get
            Return Me._Fecha_Vencimiento
        End Get
        Set(ByVal value As String)
            Me._Fecha_Vencimiento = value
        End Set
    End Property
    Public Property Fecha_Inicio_Vigencia() As String
        Get
            Return Me._Fecha_Inicio_Vigencia
        End Get
        Set(ByVal value As String)
            Me._Fecha_Inicio_Vigencia = value
        End Set
    End Property
    Public Property Dias_Vigencia() As Integer
        Get
            Return Me._Dias_Vigencia
        End Get
        Set(ByVal value As Integer)
            Me._Dias_Vigencia = value
        End Set
    End Property
    Public Property Secuencia_Doc() As Integer
        Get
            Return Me._Secuencia_Doc
        End Get
        Set(ByVal value As Integer)
            Me._Secuencia_Doc = value
        End Set
    End Property
    Public Property Contrato_ID() As String
        Get
            Return Me._Contrato_ID
        End Get
        Set(ByVal value As String)
            Me._Contrato_ID = value
        End Set
    End Property
    Public Property Ref_1() As String
        Get
            Return Me._Ref_1
        End Get
        Set(ByVal value As String)
            Me._Ref_1 = value
        End Set
    End Property
    Public Property Factura_ID() As String
        Get
            Return Me._Factura_ID
        End Get
        Set(ByVal value As String)
            Me._Factura_ID = value
        End Set
    End Property
    Public Property Secuencia_ID() As Integer
        Get
            Return Me._Secuencia_ID
        End Get
        Set(ByVal value As Integer)
            Me._Secuencia_ID = value
        End Set
    End Property
    Public Property Descripcion() As String
        Get
            Return Me._Descripcion
        End Get
        Set(ByVal value As String)
            Me._Descripcion = value
        End Set
    End Property
    Public Property Ruta_ID_Plantilla() As Integer
        Get
            Return Me._Ruta_ID_Plantilla
        End Get
        Set(ByVal value As Integer)
            Me._Ruta_ID_Plantilla = value
        End Set
    End Property
    Public Property NombrePlantilla() As String
        Get
            Return Me._NombrePlantilla
        End Get
        Set(ByVal value As String)
            Me._NombrePlantilla = value
        End Set
    End Property
    Public Property ChequeaVigencias() As String
        Get
            Return Me._ChequeaVigencias
        End Get
        Set(ByVal value As String)
            Me._ChequeaVigencias = value
        End Set
    End Property
    Public Property RequiereVerificacion() As String
        Get
            Return Me._RequiereVerificacion
        End Get
        Set(ByVal value As String)
            Me._RequiereVerificacion = value
        End Set
    End Property

    Public Property DescripEmpresa() As String
        Get
            Return Me._DescripEmpresa
        End Get
        Set(ByVal value As String)
            Me._DescripEmpresa = value
        End Set
    End Property
    Public Property Consecutivo() As Integer
        Get
            Return Me._Consecutivo
        End Get
        Set(ByVal value As Integer)
            Me._Consecutivo = value
        End Set
    End Property

#End Region

#Region "Campos_Carga"
    Private _id As Integer
    Private _namefile As String
#End Region

#Region "Propiedades_Carga"
    Public Property id() As Integer
        Get
            Return Me._id
        End Get
        Set(ByVal value As Integer)
            Me._id = value
        End Set
    End Property
    Public Property namefile() As String
        Get
            Return Me._namefile
        End Get
        Set(ByVal value As String)
            Me._namefile = value
        End Set
    End Property
#End Region

#Region "FUNCIONES"

    ''' <summary>
    ''' subir documentos al servidor
    ''' </summary>
    ''' <param name="vp_H_files"></param>
    ''' <param name="vp_S_Ruta"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function UpLoad_Document(ByVal vp_H_files As HttpFileCollection, ByVal vp_S_Ruta As String, ByVal vl_S_NombreDoc As String)

        Dim strFileName() As String
        Dim fileName As String = String.Empty
        Dim DocumentsTmpList As New List(Of DocumentosClass)
        Dim Up_Document As Integer = 0
        Dim DocVal As String = ""

        'Se recorre la lista de archivos cargados al servidor
        For i As Integer = 0 To vp_H_files.Count - 1

            Dim file As HttpPostedFile = vp_H_files(i)
          
            If file.ContentLength > 0 Then

                strFileName = file.FileName.Split("\".ToCharArray)
                ' capturar nombre original
                fileName = strFileName(strFileName.Length - 1)

                Dim vl_S_Correcto = ValidaFormato_Documento(vl_S_NombreDoc, fileName)

                If vl_S_Correcto = "S" Then
                    ' determinanado la ruta destino
                    Dim sFullPath As String = vp_S_Ruta & vl_S_NombreDoc
                    'Subiendo el archivo al server
                    file.SaveAs(sFullPath)

                    'Se instancia un objeto de tipo documento y se pobla con la info. reuqerida.
                    Dim objDocument As New DocumentosClass()
                    objDocument.namefile = vl_S_NombreDoc

                    'Se agrega el objeto de tipo documento a la lista de documentos
                    DocumentsTmpList.Add(objDocument)
                    DocVal = fileName & "|" & vl_S_NombreDoc
                Else
                    DocVal = vl_S_Correcto
                End If
            End If
        Next

        Return DocVal
    End Function

    ''' <summary>
    ''' validar el formato del documento contra el parametrizado
    ''' </summary>
    ''' <param name="vp_S_Ext_Asignado"></param>
    ''' <param name="vp_S_Ext_File"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function ValidaFormato_Documento(ByVal vp_S_Ext_Asignado As String, ByVal vp_S_Ext_File As String)

        Dim StrExt_Asignado = Split(vp_S_Ext_Asignado, ".")
        Dim StrExt_File = Split(vp_S_Ext_File, ".")
        Dim Estado As String = "N"

        Select Case StrExt_Asignado(1)

            Case "JPG"
                If StrExt_Asignado(1) = UCase(StrExt_File(1)) Then
                    Estado = "S"
                End If
                If UCase(StrExt_File(1)) = "PNG" Then
                    Estado = "S"
                End If

            Case "PNG"
                If StrExt_Asignado(1) = UCase(StrExt_File(1)) Then
                    Estado = "S"
                End If
                If UCase(StrExt_File(1)) = "JPG" Then
                    Estado = "S"
                End If

            Case Else
                If StrExt_Asignado(1) = UCase(StrExt_File(1)) Then
                    Estado = "S"
                End If

        End Select

        Return Estado
    End Function

    ''' <summary>
    ''' renombra el archivo
    ''' </summary>
    ''' <param name="vp_S_RutaOrigen"></param>
    ''' <param name="vp_S_NewName"></param>
    ''' <param name="vp_S_OldName"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Rename_doc(ByVal vp_S_RutaOrigen As String, ByVal vp_S_NewName As String, ByVal vp_S_OldName As String)
        Dim Valida_Rename As Integer
        Dim OldName = vp_S_RutaOrigen & vp_S_OldName
        Dim NewName = vp_S_RutaOrigen & vp_S_NewName

        Try
            Rename(OldName, NewName)
            Valida_Rename = 0
        Catch ex As Exception
            Valida_Rename = 1
        End Try
        Return Valida_Rename
    End Function

    ''' <summary>
    ''' copiar documentos a la ruta fisica del aplicativo para la ruta relativa
    ''' </summary>
    ''' <param name="vp_S_RutaOrigen"></param>
    ''' <param name="vp_S_RutaDestino"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Copy_Document_Folder_View(ByVal vp_S_RutaOrigen As String, ByVal vp_S_RutaDestino As String, ByVal vp_S_archivo As String, ByVal vp_S_NameNew As String, ByVal vp_S_TypeProcces As String)

        Dim Valida_Copia As Integer
        Dim FileToCopy As String = vp_S_RutaOrigen & vp_S_archivo
        Dim NewCopy As String = vp_S_RutaDestino & vp_S_archivo

        Try

            ' confirmamos de que el destino existe.
            If File.Exists(vp_S_RutaDestino) Then
                File.Delete(vp_S_RutaDestino)
            End If

            If System.IO.File.Exists(FileToCopy) = True Then
                System.IO.File.Copy(FileToCopy, NewCopy)
                Valida_Copia = 0
            End If
            'validamos si es creacion de documento para renombrar con el nombre final y eliminar el temporal
            If vp_S_TypeProcces = "CREATE" Then
                Rename_doc(vp_S_RutaDestino, vp_S_NameNew, vp_S_archivo)
                Delete_Document_Folder_View(vp_S_RutaOrigen, vp_S_archivo)
            End If

        Catch e As Exception
            Valida_Copia = 1
        End Try

        Return Valida_Copia

    End Function

    ''' <summary>
    ''' Borrar documentos a la ruta fisica del aplicativo de la ruta relativa
    ''' </summary>
    ''' <param name="vp_S_RutaDestino"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Delete_Document_Folder_View(ByVal vp_S_RutaDestino As String, ByVal vp_S_archivo As String)

        Dim Valida_Borrado As Integer
        Dim FileToErase As String = vp_S_RutaDestino & vp_S_archivo

        Try

            If System.IO.File.Exists(FileToErase) = True Then
                System.IO.File.Delete(FileToErase)
                Valida_Borrado = 0
            End If

        Catch e As Exception
            Valida_Borrado = 1
        End Try

        Return Valida_Borrado

    End Function

    ''' <summary>
    ''' crea objetoslista de documentos para eliminar de la ruta relativa 
    ''' </summary>
    ''' <param name="vp_S_ListDocumentos"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertList_Documentos(ByVal vp_S_ListDocumentos As String)

        Dim NewList = JsonConvert.DeserializeObject(Of List(Of DocumentosClass))(vp_S_ListDocumentos)
        Dim List As New List(Of DocumentosClass)

        For Each Item As DocumentosClass In NewList

            Dim Obj As New DocumentosClass

            Obj.RutaDocumentoVisualizacion = Item.RutaDocumentoVisualizacion
            Obj.DescripFormato = Item.DescripFormato
            Obj.Nombre_Save = Item.Nombre_Save

            List.Add(Obj)
        Next

        Return List

    End Function

#End Region

End Class
