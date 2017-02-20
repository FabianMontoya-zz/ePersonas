Imports Newtonsoft.Json
Imports System.Threading
Imports System.Net.Sockets
Imports System.Net
Imports System.IO


Public Class HuellasAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        'trae el jquery para hacer todo por debajo del servidor
        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "cargar_droplist_busqueda"

                Case "Cliente"
                    CargarCliente()

                Case "Documento"
                    CargarDocumento()

                Case "Buscar_Persona"
                    Search_People()

                Case "DescargarEjecutable"
                    Descargar()

            End Select

        End If
    End Sub




#Region "CRUD"



#End Region

#Region "DROP LIST"

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

#End Region


End Class