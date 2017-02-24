﻿Imports Newtonsoft.Json
Imports System.Threading
Imports System.Net.Sockets
Imports System.Net
Imports System.IO


Public Class HuellasAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        Dim asss As Integer = Request.Files.Count()


        'trae el jquery para hacer todo por debajo del servidor
        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "Cliente"
                    CargarCliente()

                Case "Documento"
                    CargarDocumento()

                Case "Buscar_Persona"
                    Search_People()

                Case "DescargarEjecutable"
                    Descargar()

                Case "RUTAS_OPERACION"
                    CargarRutasOp()

                Case "CargarHuellas"
                    CargaTemplatesHuellas()

            End Select

        End If
    End Sub




#Region "CRUD"



#End Region

#Region "DROP LIST"

    ''' <summary>
    ''' Función que carga el objeto DDL consulta
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
    ''' Función que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDocumento()

        Dim SQL As New ClienteSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL.Charge_DropListDocumento(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

#End Region

    

#Region "FUNCIONES"
    ''' <summary>
    ''' Consulta si existe la persona digitada 
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Search_People()

        Dim SQL As New ClienteSQLClass
        Dim vl_S_Nit As String = Request.Form("NIT")
        Dim vl_S_TD As String = Request.Form("TD")
        Dim vl_S_D As String = Request.Form("D")

        Dim Str_People As String = SQL.SearchPeople_Exists(vl_S_Nit, vl_S_TD, vl_S_D)
        Response.Write(Str_People)

    End Sub

    ''' <summary>
    ''' Función que carga rutas operación
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarRutasOp()
        Dim SQL As New DocumentoSQLClass
        Dim ObjList As New List(Of DocumentoClass)

        ObjList = SQL.RutasOpe()
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

    ''' <summary>
    ''' Función que da los datos para la descarga del archivo
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Descargar()
        Dim objFile As New File_DowloadClass
        Dim ObjListFile As New List(Of File_DowloadClass)

        Dim sRenglon As String = Nothing
        Dim strStreamW As Stream = Nothing
        Dim strStreamWriter As StreamWriter = Nothing
        Dim ContenidoArchivo As String = Nothing

        Dim path As String = Server.MapPath("~/Files_Dowload/Script.txt")

        strStreamW = File.Create(path) 'Creamos el archivo de texto .txt

        strStreamWriter = New StreamWriter(strStreamW, System.Text.Encoding.Default) 'Tipo de codificación para escritura

        'Escribirmos el Script
        Dim Script As String = CrearTXT()

        'Escribimos el script en el .txt
        strStreamWriter.WriteLine(Script)
        strStreamWriter.Close() 'Lo cerramos

        objFile.RutaOrigen = Request.Url.Authority & "/Files_Dowload/Script.txt"
        objFile.NombreDescarga = "ExecuteEnroller"
        objFile.TipoArchivo = "vbs"

        ObjListFile.Add(objFile)

        Response.Write(JsonConvert.SerializeObject(ObjListFile.ToArray()))

    End Sub

    ''' <summary>
    ''' Función que genera un txt en el servidor con el script general para la ejecución del aplicativo
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Protected Function CrearTXT()
        Dim v_l_Texto As String = Nothing

        Dim Encriptador As EncriptarClass

        v_l_Texto = "Set fso = CreateObject(""Scripting.FileSystemObject"")" & vbCrLf
        v_l_Texto = v_l_Texto + "Set ws = CreateObject(""WScript.Shell"")" & vbCrLf
        v_l_Texto = v_l_Texto + "Archivo = ""C:\Program Files\SASIF FingerPrint\Enroller\EnrollermentApp.exe""" & vbCrLf & vbCrLf

        v_l_Texto = v_l_Texto + "If fso.FileExists(Archivo) Then" & vbCrLf & vbCrLf

        v_l_Texto = v_l_Texto + "   anno = Year(Date)" & vbCrLf
        v_l_Texto = v_l_Texto + "   User = """ & Request.Form("user") & """" & vbCrLf
        v_l_Texto = v_l_Texto + "   Name_User = """ & Request.Form("Name_User") & """" & vbCrLf
        v_l_Texto = v_l_Texto + "   NIT = """ & Request.Form("Nit") & """" & vbCrLf
        v_l_Texto = v_l_Texto + "   TypeDocument = """ & Request.Form("TypeDocument") & """" & vbCrLf
        v_l_Texto = v_l_Texto + "   Document = """ & Request.Form("Document") & """" & vbCrLf
        v_l_Texto = v_l_Texto + "   Name_Client = """ & Request.Form("Name_Client") & """" & vbCrLf
        v_l_Texto = v_l_Texto + "   Fingers = """ & Request.Form("Dedos") & """" & vbCrLf & vbCrLf

        v_l_Texto = v_l_Texto + "   Titulo = ""Autorización de Acceso""" & vbCrLf
        v_l_Texto = v_l_Texto + "   Mensaje = ""AUTORIZACIÓN DE ACCESO A ARCHIVOS DEL EQUIPO""+ vbCrLf + vbCrLf " & vbCrLf
        v_l_Texto = v_l_Texto + "   Mensaje = Mensaje + ""¿Autoriza que este archivo ejecute única y exclusivamente el programa encargado de realizar el proceso de captura de su huella?""+ vbCrLf +  vbCrLf " & vbCrLf
        v_l_Texto = v_l_Texto + "   Mensaje = Mensaje + ""Luego de responder, este archivo se eliminará automáticamente sin importar la opción elegida.""+ vbCrLf + vbCrLf " & vbCrLf
        v_l_Texto = v_l_Texto + "   Mensaje = Mensaje + ""© SASIF S.A.S. "" & anno" & vbCrLf & vbCrLf

        v_l_Texto = v_l_Texto + "   Acepta = Msgbox(Mensaje, vbYesNo+vbQuestion+vbSystemModal, Titulo)" & vbCrLf & vbCrLf

        v_l_Texto = v_l_Texto + "   Set WshShell = CreateObject(""WScript.Shell"")" & vbCrLf & vbCrLf

        v_l_Texto = v_l_Texto + "   if Acepta = vbYes then" & vbCrLf
        v_l_Texto = v_l_Texto + "		FolderMyDocuments = ws.SpecialFolders(""MyDocuments"")" & vbCrLf
        v_l_Texto = v_l_Texto + "		Folder = ""\SASIF FingerPrint\""" & vbCrLf
        v_l_Texto = v_l_Texto + "		Directory = FolderMyDocuments + Folder" & vbCrLf
        v_l_Texto = v_l_Texto + "		If fso.FolderExists(Directory) Then" & vbCrLf
        v_l_Texto = v_l_Texto + "		    fso.DeleteFolder(FolderMyDocuments + ""\SASIF FingerPrint"")" & vbCrLf
        v_l_Texto = v_l_Texto + "		    Set objFolder = fso.CreateFolder(Directory)" & vbCrLf
        v_l_Texto = v_l_Texto + "			Directory = Directory + ""Enroller\""" & vbCrLf
        v_l_Texto = v_l_Texto + "			If fso.FolderExists(Directory) Then" & vbCrLf
        v_l_Texto = v_l_Texto + "			   Directory = Directory + ""Data\""" & vbCrLf
        v_l_Texto = v_l_Texto + "			   If fso.FolderExists(Directory) Then" & vbCrLf
        v_l_Texto = v_l_Texto + "			   Else" & vbCrLf
        v_l_Texto = v_l_Texto + "			       Set objFolder = fso.CreateFolder(Directory)" & vbCrLf
        v_l_Texto = v_l_Texto + "			   End If" & vbCrLf
        v_l_Texto = v_l_Texto + "			Else" & vbCrLf
        v_l_Texto = v_l_Texto + "			   Set objFolder = fso.CreateFolder(Directory)" & vbCrLf
        v_l_Texto = v_l_Texto + "			   Directory = Directory + ""Data\""" & vbCrLf
        v_l_Texto = v_l_Texto + "			   If fso.FolderExists(Directory) Then" & vbCrLf
        v_l_Texto = v_l_Texto + "			   Else" & vbCrLf
        v_l_Texto = v_l_Texto + "			       Set objFolder = fso.CreateFolder(Directory)" & vbCrLf
        v_l_Texto = v_l_Texto + "			   End If" & vbCrLf
        v_l_Texto = v_l_Texto + "			End If" & vbCrLf
        v_l_Texto = v_l_Texto + "		Else" & vbCrLf
        v_l_Texto = v_l_Texto + "			Set objFolder = fso.CreateFolder(Directory)" & vbCrLf
        v_l_Texto = v_l_Texto + "			Directory = Directory + ""Enroller\""" & vbCrLf
        v_l_Texto = v_l_Texto + "			If fso.FolderExists(Directory) Then" & vbCrLf
        v_l_Texto = v_l_Texto + "				Directory = Directory + ""Data\""" & vbCrLf
        v_l_Texto = v_l_Texto + "			Else" & vbCrLf
        v_l_Texto = v_l_Texto + "			   Set objFolder = fso.CreateFolder(Directory)" & vbCrLf
        v_l_Texto = v_l_Texto + "			   Directory = Directory + ""Data\""" & vbCrLf
        v_l_Texto = v_l_Texto + "			   If fso.FolderExists(Directory) Then" & vbCrLf
        v_l_Texto = v_l_Texto + "			   Else" & vbCrLf
        v_l_Texto = v_l_Texto + "			       Set objFolder = fso.CreateFolder(Directory)" & vbCrLf
        v_l_Texto = v_l_Texto + "			   End If" & vbCrLf
        v_l_Texto = v_l_Texto + "			End If" & vbCrLf
        v_l_Texto = v_l_Texto + "		End If" & vbCrLf & vbCrLf
        v_l_Texto = v_l_Texto + "		DirectoryFile = Directory + ""Datafile.fpt""" & vbCrLf
        v_l_Texto = v_l_Texto + "		Set File = fso.CreateTextFile(DirectoryFile, True)" & vbCrLf & vbCrLf

        v_l_Texto = v_l_Texto + "		File.WriteLine("""" & User)" & vbCrLf
        v_l_Texto = v_l_Texto + "		File.WriteLine("""" & Name_User)" & vbCrLf
        v_l_Texto = v_l_Texto + "		File.WriteLine("""" & NIT)" & vbCrLf
        v_l_Texto = v_l_Texto + "		File.WriteLine("""" & TypeDocument)" & vbCrLf
        v_l_Texto = v_l_Texto + "		File.WriteLine("""" & Document)" & vbCrLf
        v_l_Texto = v_l_Texto + "		File.WriteLine("""" & Name_Client)" & vbCrLf
        v_l_Texto = v_l_Texto + "		File.WriteLine("""" & Fingers)" & vbCrLf
        v_l_Texto = v_l_Texto + "		File.Close" & vbCrLf & vbCrLf

        v_l_Texto = v_l_Texto + "       Set WshShell = CreateObject(""WScript.Shell"")" & vbCrLf
        v_l_Texto = v_l_Texto + "       Return = WshShell.Run(""cmd /c start """""""" """"C:\Program Files\SASIF FingerPrint\Enroller\EnrollermentApp.exe"""""", 0, false)" & vbCrLf
        v_l_Texto = v_l_Texto + "   else" & vbCrLf
        v_l_Texto = v_l_Texto + "       Msgbox ""Se canceló la ejecución automática."", vbOKOnly+64+vbSystemModal, ""Ejecución Automática Cancelada""" & vbCrLf
        v_l_Texto = v_l_Texto + "   end if" & vbCrLf

        v_l_Texto = v_l_Texto + "   Else" & vbCrLf
        v_l_Texto = v_l_Texto + "       MsgBox ""Programa no se encuentra en equipo""" & vbCrLf
        v_l_Texto = v_l_Texto + "   End If" & vbCrLf & vbCrLf

        v_l_Texto = v_l_Texto + "Set PV4 = CreateObject(""Scripting.FileSystemObject"")" & vbCrLf
        v_l_Texto = v_l_Texto + "PV4.deletefile Wscript.ScriptFullName" & vbCrLf

        Return v_l_Texto
    End Function

    ''' <summary>
    ''' Función Inicial para el cargue de los archivo .fpt que contienen las huellas
    ''' </summary>
    ''' <remarks></remarks>
    Public Sub CargaTemplatesHuellas()
        Dim Doc As New DocumentoClass
        If Request.Files.Count() > 0 Then
            Dim vl_S_RutaTemporal As String = Request.Form("RutaTemporal")
            Dim vl_S_NombreFile As String = Request.Form("NameTemporal")
            Dim NameFile As String = UpLoad_File(Request.Files, vl_S_RutaTemporal, vl_S_NombreFile)

            If NameFile <> "" Then
                If NameFile = "N" Then
                    Response.Write("NO_FORMAT")
                Else
                    Dim AFileDoc = Split(NameFile, "|")
                    Dim ADoc = Split(AFileDoc(0), ".")
                    Dim vl_S_NameFormat As String = ADoc(0).Replace(" ", "")
                    vl_S_NameFormat = vl_S_NameFormat.Replace("_", "")
                    Dim NewNameDoc = AFileDoc(1).Replace("TEMP", UCase(vl_S_NameFormat))

                    Doc.Rename_doc(vl_S_RutaTemporal, NewNameDoc, NameFile)
                    Response.Write(NewNameDoc)
                End If
            End If

            Exit Sub
        End If
    End Sub

    ''' <summary>
    ''' subir documentos al servidor
    ''' </summary>
    ''' <param name="vp_H_files"></param>
    ''' <param name="vp_S_Ruta"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function UpLoad_File(ByVal vp_H_files As HttpFileCollection, ByVal vp_S_Ruta As String, ByVal vl_S_NombreDoc As String)

        Dim strFileName() As String
        Dim fileName As String = String.Empty
        Dim DocumentsTmpList As New List(Of DocumentoClass)
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
                    Dim objDocument As New DocumentoClass()
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


#End Region


End Class