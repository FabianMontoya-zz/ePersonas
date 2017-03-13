Imports Newtonsoft.Json
Imports System.Threading
Imports System.Net.Sockets
Imports System.Net
Imports System.IO


Public Class HuellasAjax
    Inherits System.Web.UI.Page
    Public vg_T_Template As DPFP.Template 'Template que guarda el mapa de la huella

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

                Case "Crear_Huellas"
                    Insert_Huellas()

            End Select

        End If
    End Sub




#Region "CRUD"

    Protected Sub Insert_Huellas()
        Dim objC_Huellas As New HuellasClass
        Dim SQL_C_Huellas As New HuellasSQLClass
        Dim ObjListC_Huellas As New List(Of HuellasClass)

        Dim result As String
        Dim vl_s_IDxiste As String

        objC_Huellas.Nit_ID = Request.Form("Nit_ID")
        objC_Huellas.TypeDocument_ID = Request.Form("TypeDocument")
        objC_Huellas.Document_ID = Request.Form("Document")

        'Validamos si la llave existe
        vl_s_IDxiste = SQL_C_Huellas.Consulta_Repetido(objC_Huellas)

        If vl_s_IDxiste = 0 Then

            objC_Huellas = CargarTemplates(objC_Huellas)

            objC_Huellas.UsuarioCreacion = Request.Form("user")
            objC_Huellas.FechaCreacion = Date.Now
            objC_Huellas.UsuarioActualizacion = Request.Form("user")
            objC_Huellas.FechaActualizacion = Date.Now
            result = SQL_C_Huellas.InsertHuellas(objC_Huellas)
        Else
            DeleteAllDirectoryFiles()
            result = "Existe"
        End If
        Response.Write(result)
    End Sub

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
        Dim vl_C_Class As New HuellasClass
        Dim SQL_C_Huellas As New HuellasSQLClass

        Dim SQL As New ClienteSQLClass
        Dim vl_S_Nit As String = Request.Form("NIT")
        Dim vl_S_TD As String = Request.Form("TD")
        Dim vl_S_D As String = Request.Form("D")

        Dim Str_People As String = SQL.SearchPeople_Exists(vl_S_Nit, vl_S_TD, vl_S_D)

        If Str_People <> "NO" Then
            vl_C_Class.Nit_ID = Request.Form("NIT")
            vl_C_Class.TypeDocument_ID = Request.Form("TD")
            vl_C_Class.Document_ID = Request.Form("D")
            'Validamos si la llave existe
            Dim vl_s_IDxiste As String = SQL_C_Huellas.Consulta_Repetido(vl_C_Class)

            If vl_s_IDxiste = 0 Then
                Response.Write(Str_People)
            Else
                Str_People = "Existe"
                Response.Write(Str_People)
            End If
        Else
            Response.Write(Str_People)
        End If



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

#Region "GENERAR EJECUTABLE"
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

        Dim Encriptador As New EncriptarClass

        v_l_Texto = "Set fso = CreateObject(""Scripting.FileSystemObject"")" & vbCrLf
        v_l_Texto = v_l_Texto + "Set ws = CreateObject(""WScript.Shell"")" & vbCrLf
        v_l_Texto = v_l_Texto + "Archivo = ""C:\Program Files\SASIF FingerPrint\Enroller\EnrollermentApp.exe""" & vbCrLf & vbCrLf

        v_l_Texto = v_l_Texto + "If fso.FileExists(Archivo) Then" & vbCrLf & vbCrLf

        v_l_Texto = v_l_Texto + "   anno = Year(Date)" & vbCrLf
        v_l_Texto = v_l_Texto + "   User = """ & Encriptador.encriptaDato(Request.Form("user")) & """" & vbCrLf
        v_l_Texto = v_l_Texto + "   Name_User = """ & Encriptador.encriptaDato(Request.Form("Name_User")) & """" & vbCrLf
        v_l_Texto = v_l_Texto + "   NIT = """ & Encriptador.encriptaDato(Request.Form("Nit")) & """" & vbCrLf
        v_l_Texto = v_l_Texto + "   TypeDocument = """ & Encriptador.encriptaDato(Request.Form("TypeDocument")) & """" & vbCrLf
        v_l_Texto = v_l_Texto + "   Document = """ & Encriptador.encriptaDato(Request.Form("Document")) & """" & vbCrLf
        v_l_Texto = v_l_Texto + "   Name_Client = """ & Encriptador.encriptaDato(Request.Form("Name_Client")) & """" & vbCrLf
        v_l_Texto = v_l_Texto + "   Fingers = """ & Encriptador.encriptaDato(Request.Form("Dedos")) & """" & vbCrLf & vbCrLf

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
        v_l_Texto = v_l_Texto + "   end if" & vbCrLf & vbCrLf

        v_l_Texto = v_l_Texto + "   Set PV4 = CreateObject(""Scripting.FileSystemObject"")" & vbCrLf
        v_l_Texto = v_l_Texto + "   PV4.deletefile Wscript.ScriptFullName" & vbCrLf & vbCrLf

        v_l_Texto = v_l_Texto + "   Else" & vbCrLf
        v_l_Texto = v_l_Texto + "       Msgbox ""El programa no se encuentra instalado en el equipo.""+ vbCrLf + vbCrLf + ""Por favor ejecute el instalador del aplicativo, necesario para ejecutar esta acción, y vuelva a ejecutar este archivo nuevamente al finalizar la instalación."", vbOKOnly+64+vbSystemModal, ""Aplicativo no instalado""" & vbCrLf
        v_l_Texto = v_l_Texto + "       Dim wShell" & vbCrLf
        v_l_Texto = v_l_Texto + "       Set wShell = CreateObject(""WScript.Shell"")" & vbCrLf
        v_l_Texto = v_l_Texto + "       URL = ""http://download10.mediafire.com/8hr7nuz9gehg/2oc6245h3hky1z8/EnrollerSetup.exe" & """" & vbCrLf
        v_l_Texto = v_l_Texto + "       wShell.Run URL,9" & vbCrLf
        v_l_Texto = v_l_Texto + "   End If" & vbCrLf & vbCrLf

        Return v_l_Texto
    End Function
#End Region

#Region "CARGA ARCHIVOS HUELLAS A SERVIDOR"

    ''' <summary>
    ''' Función Inicial para el cargue de los archivo .fpt que contienen las huellas
    ''' </summary>
    ''' <remarks></remarks>
    Public Sub CargaTemplatesHuellas()
        Dim Doc As New DocumentoClass
        Dim vl_L_FilesUploaded As New List(Of String)
        If Request.Files.Count() > 0 Then
            Dim vl_S_RutaTemporal As String = Request.Form("RutaTemporal")
            Dim vl_S_NombresFiles As String = Request.Form("NameArchivos")
            vl_L_FilesUploaded = UpLoad_File(Request.Files, vl_S_RutaTemporal, vl_S_NombresFiles)
        Else
            vl_L_FilesUploaded.Add("NO FILES")
        End If
        Response.Write(JsonConvert.SerializeObject(vl_L_FilesUploaded.ToArray()))
    End Sub

    ''' <summary>
    ''' Función que realiza la carga de los archivos al servidor e indica cuales se han subido
    ''' </summary>
    ''' <param name="vp_H_files"></param>
    ''' <param name="vp_S_Ruta"></param>
    ''' <param name="vl_S_NombresFiles"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function UpLoad_File(ByVal vp_H_files As HttpFileCollection, ByVal vp_S_Ruta As String, ByVal vl_S_NombresFiles As String)

        Dim fileName As String = String.Empty
        Dim vl_A_NamesFiles As String() = Nothing
        Dim vl_L_FilesUploaded As New List(Of String)

        'Cargamos los nombres de archivos que debe cargar en un array para luego validar
        vl_A_NamesFiles = vl_S_NombresFiles.Split(",")

        'Se recorre la lista de archivos cargados al servidor
        For i As Integer = 0 To vp_H_files.Count - 1

            Dim file As HttpPostedFile = vp_H_files(i)

            If file.ContentLength > 0 Then
                ' capturar nombre original
                fileName = file.FileName

                Dim vl_S_Correcto = ValidaFormato_Template(fileName)

                If vl_S_Correcto = "S" Then
                    For Each item As String In vl_A_NamesFiles
                        'Validamos si el nombre del archivo está dentro de los que se espera obtener
                        If fileName.Equals(item & ".fpt") Then
                            ' Creamos la ruta de destino final
                            Dim sFullPath As String = vp_S_Ruta & fileName
                            'Se sube el archivo al servidor
                            file.SaveAs(sFullPath)
                            vl_L_FilesUploaded.Add(fileName)
                            Exit For
                        End If
                    Next

                End If
            End If
        Next

        Return vl_L_FilesUploaded
    End Function

    ''' <summary>
    ''' Función que valida el nombre del archivo de huellas
    ''' </summary>
    ''' <param name="vp_S_File_Name"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function ValidaFormato_Template(ByVal vp_S_File_Name As String)

        Dim StrExt_File = Split(vp_S_File_Name, ".")
        Dim Estado As String = "N"
        ' Valida que el archivo Cargado sea el de las HUellas (.fpt)
        If "FPT" = UCase(StrExt_File(1)) Then
            Estado = "S"
        End If

        Return Estado
    End Function

#End Region

#Region "CONVERTIR ARCHIVOS TEMPLATE"
    ''' <summary>
    ''' Función que toma los archivos del servidor y los transforma a Templates Serializados
    ''' Devuelve el Class de Huellas cargado
    ''' </summary>
    ''' <param name="vp_Obj_Huellas"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Protected Function CargarTemplates(ByVal vp_Obj_Huellas As HuellasClass)

        Dim vl_S_RutaTemporal As String = Request.Form("RutaTemporal")
        Dim vl_S_NombresFiles As String = Request.Form("NameArchivos")
        Dim vl_S_PathArchivo As String = Nothing
        Dim vl_A_NamesFiles As String() = Nothing

        'Cargamos los nombres de archivos que debe cargar en un array para luego validar
        vl_A_NamesFiles = vl_S_NombresFiles.Split(",")

        For Each file As String In vl_A_NamesFiles
            vl_S_PathArchivo = vl_S_RutaTemporal & file & ".fpt"
            Using vl_FS_fs As System.IO.FileStream = System.IO.File.OpenRead(vl_S_PathArchivo) 'Leemos el archivo
                Dim vl_T_template As New DPFP.Template(vl_FS_fs) 'Convertimos el archivo al Template
                vg_T_Template = vl_T_template 'Igualamos con la Variable Global
            End Using
            Dim vl_MS_mst As New MemoryStream
            vg_T_Template.Serialize(vl_MS_mst) 'Serializamos el Template en el MemoryStream
            Dim vl_B_serializedTemplate As Byte() = vl_MS_mst.ToArray() 'Serializamos el memory Stream
            vp_Obj_Huellas = CargarserializedTemplate(vp_Obj_Huellas, vl_B_serializedTemplate, file)
            System.IO.File.Delete(vl_S_PathArchivo) 'Borramos el archivo de la carpeta
        Next
        Return vp_Obj_Huellas
    End Function

    ''' <summary>
    ''' Función que Revisa que archivo se ha serializado y lo añade al respectivo dedo asignado
    ''' </summary>
    ''' <param name="vp_Obj_Huellas"></param>
    ''' <param name="vp_B_serializedTemplate"></param>
    ''' <param name="vp_S_NameFile"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Protected Function CargarserializedTemplate(ByVal vp_Obj_Huellas As HuellasClass, ByVal vp_B_serializedTemplate As Byte(), ByVal vp_S_NameFile As String)
        Dim vl_A_NameFinger As String() = Nothing
        vl_A_NameFinger = vp_S_NameFile.Split("_")

        Dim vl_S_Finger = vl_A_NameFinger(0)

        Select Case vl_S_Finger
            'Mano Izquierda
            Case "MeniqueIZ"
                vp_Obj_Huellas.Menique_IZ = vp_B_serializedTemplate
            Case "AnularIZ"
                vp_Obj_Huellas.Anular_IZ = vp_B_serializedTemplate
            Case "MedioIZ"
                vp_Obj_Huellas.Medio_IZ = vp_B_serializedTemplate
            Case "IndiceIZ"
                vp_Obj_Huellas.Indice_IZ = vp_B_serializedTemplate
            Case "PulgarIZ"
                vp_Obj_Huellas.Pulgar_IZ = vp_B_serializedTemplate
                'Mano Derecha
            Case "MeniqueDER"
                vp_Obj_Huellas.Menique_DER = vp_B_serializedTemplate
            Case "AnularDER"
                vp_Obj_Huellas.Anular_DER = vp_B_serializedTemplate
            Case "MedioDER"
                vp_Obj_Huellas.Medio_DER = vp_B_serializedTemplate
            Case "IndiceDER"
                vp_Obj_Huellas.Indice_DER = vp_B_serializedTemplate
            Case "PulgarDER"
                vp_Obj_Huellas.Pulgar_DER = vp_B_serializedTemplate
        End Select

        Return vp_Obj_Huellas
    End Function

#End Region

    ''' <summary>
    ''' Función que elimina todos los archivos que se cargaron al servidor y que no se utilizaran
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub DeleteAllDirectoryFiles()
        Dim vl_S_RutaTemporal As String = Request.Form("RutaTemporal")
        Dim vl_S_NombresFiles As String = Request.Form("NameArchivos")
        Dim vl_S_PathArchivo As String = Nothing
        Dim vl_A_NamesFiles As String() = Nothing

        'Cargamos los nombres de archivos que debe cargar en un array para luego validar
        vl_A_NamesFiles = vl_S_NombresFiles.Split(",")

        For Each file As String In vl_A_NamesFiles
            vl_S_PathArchivo = vl_S_RutaTemporal & file & ".fpt"
            System.IO.File.Delete(vl_S_PathArchivo) 'Borramos el archivo de la carpeta
        Next
    End Sub

#End Region


End Class