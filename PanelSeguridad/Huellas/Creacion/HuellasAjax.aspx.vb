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
                    CargarDroplist()

                Case "Cliente"
                    CargarCliente()

                Case "DescargarEjecutable"
                    Descargar()

            End Select

        End If
    End Sub




#Region "CRUD"



#End Region

#Region "DROP LIST"

    ''' <summary>
    ''' funcion que carga el objeto DDL Links
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplist()

        Dim SQL_links As New Adm_LinksSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL_links.ReadCharge_DropList(vl_S_Tabla)
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

    ''' <summary>
    ''' función OME
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Descargar()
        Dim objFile As New File_DowloadClass
        Dim ObjListFile As New List(Of File_DowloadClass)

        Dim sRenglon As String = Nothing
        Dim strStreamW As Stream = Nothing
        Dim strStreamWriter As StreamWriter = Nothing
        Dim ContenidoArchivo As String = Nothing

        'Dim path As String = "" & Request.Url.Authority & "/Files_Dowload/Test_Script.txt"
        Dim path As String = Server.MapPath("~/Files_Dowload/Script.txt")
        ' Create or overwrite the file.
        strStreamW = File.Create(path) ' lo creamos

        strStreamWriter = New StreamWriter(strStreamW, System.Text.Encoding.Default) ' tipo de codificacion para escritura

        'escribimos en el archivo

        Dim Script As String = CrearTXT()

        strStreamWriter.WriteLine(Script)
        strStreamWriter.Close() ' cerramos

        objFile.RutaOrigen = Request.Url.Authority & "/Files_Dowload/Script.txt"
        objFile.NombreDescarga = Request.Form("user") & "_" & Date.Now.ToString("yyyy/MM/dd") & "_Script"
        objFile.TipoArchivo = "vbs"

        ObjListFile.Add(objFile)

        Response.Write(JsonConvert.SerializeObject(ObjListFile.ToArray()))

    End Sub

#Region "FUNCIONES"
    Protected Function CrearTXT()
        Dim v_l_Texto As String = Nothing

        v_l_Texto = "Set fso = CreateObject(""Scripting.FileSystemObject"")" & vbCrLf
        v_l_Texto = v_l_Texto + "Archivo = ""C:\Program Files\SASIF FingerPrint\Enroller\EnrollermentApp.exe""" & vbCrLf & vbCrLf

        v_l_Texto = v_l_Texto + "If fso.FileExists(Archivo) Then" & vbCrLf
        v_l_Texto = v_l_Texto + "   anno = Year(Date)" & vbCrLf
        v_l_Texto = v_l_Texto + "   Usuario = """ & Request.Form("user") & """" & vbCrLf
        v_l_Texto = v_l_Texto + "   Fecha_Generada = """ & Date.Now & """" & vbCrLf
        v_l_Texto = v_l_Texto + "   Titulo = ""Autorización de Acceso""" & vbCrLf & vbCrLf

        v_l_Texto = v_l_Texto + "   Mensaje = ""AUTORIZACIÓN DE ACCESO A ARCHIVOS DEL EQUIPO""+ vbCrLf + vbCrLf " & vbCrLf
        v_l_Texto = v_l_Texto + "   Mensaje = Mensaje + ""¿Autoriza que este archivo ejecute única y exclusivamente el programa encargado de realizar el proceso de captura de su huella?""+ vbCrLf +  vbCrLf " & vbCrLf
        v_l_Texto = v_l_Texto + "   Mensaje = Mensaje + ""Luego de responder, este archivo se eliminará automáticamente sin importar la opción elegida.""+ vbCrLf + vbCrLf " & vbCrLf
        v_l_Texto = v_l_Texto + "   Mensaje = Mensaje + ""© SASIF S.A.S. "" & anno" & vbCrLf & vbCrLf

        v_l_Texto = v_l_Texto + "   Acepta = Msgbox(Mensaje, vbYesNo+vbQuestion+vbSystemModal, Titulo)" & vbCrLf & vbCrLf

        v_l_Texto = v_l_Texto + "   Set WshShell = CreateObject(""WScript.Shell"")" & vbCrLf & vbCrLf

        v_l_Texto = v_l_Texto + "   if Acepta = vbYes then" & vbCrLf
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