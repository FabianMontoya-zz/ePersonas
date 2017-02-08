Imports Newtonsoft.Json
Imports System.Threading
Imports System.Net.Sockets
Imports System.Net


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

                Case "Ok"
                    Cargar()
                    'RecibirTemplate()

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
    Protected Sub Cargar()

        System.Diagnostics.Process.Start("C:\Users\DESARROLLO 02\Desktop\EnrollermentApp.exe")
        'System.Diagnostics.Process.Start("Notepad.exe")

        Try
            'creamos el objeto que controlará el proceso que vamos a lanzar 
            Dim psi As ProcessStartInfo = New ProcessStartInfo()
            'le decimos que se muestre y que no se quede en 2º plano 
            psi.WindowStyle = System.Diagnostics.ProcessWindowStyle.Normal
            'nombre del ejecutable 
            psi.FileName = "Notepad.exe"
            psi.RedirectStandardOutput = True
            psi.UseShellExecute = False

            psi.WorkingDirectory = "C:\Windows\system32"
            'argumentos de la línea de comandos, si los necesita 
            'psi.Arguments = "x.x.x.x"

            'obtenemos una referencia al nuevo proceso 
            Dim p = System.Diagnostics.Process.Start(psi)

            Dim salida As String = p.StandardOutput.ReadToEnd()
            Response.Write(salida.Replace("\n", "<br>"))

            'y podemos esperar a que finalice su ejecución 
            p.WaitForExit()

            'Response.AddHeader("Refresh", "2"); 

        Catch ex As Exception

        End Try


    End Sub

    Public Function javaMsg(ByVal message As String) As String

        Dim sb As New System.Text.StringBuilder()

        sb.Append("<script type='text/javascript'>")
        sb.Append("alert('")
        sb.Append(message)
        sb.Append("');</script>")

        Return sb.ToString()

    End Function

#Region "SOCKET RECIBE"

    'Variables usadas por los sokets
    Private mscClient As TcpClient = Nothing 'ID del Cliente
    Private mstrMessage As Byte() = Nothing 'Mensaje recibido
    Private mstrResponse As String = Nothing 'Mensaje de respuesta
    Private bytesSent() As Byte = Nothing

    ''' <summary>
    ''' Función que se encarga de la conexión TCP con el socket para recibir la huella enviada desde el servidor
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function RecibirTemplate()
        Dim flag As String = ""
        'Se crea una instancia del class TCPListener
        Dim output As String = ""
        Dim tcpListener As TcpListener = Nothing
        'Dim ipAddress As IPAddress = Dns.GetHostEntry("localhost").AddressList(0) 'Si es de una IP especifica que vamos a recibir
        Dim ipAddress As IPAddress = Net.IPAddress.Any 'Para recibir desde cualquier dirección IP
        Try
            ' Set the listener on the local IP address.
            ' and specify the port.
            tcpListener = New TcpListener(ipAddress, 971201) 'IP - Puerto
            tcpListener.Start()
        Catch e As Exception
            output = "Error: " + e.ToString()
        End Try
        While flag <> "Ok"
            Dim tcpClient As TcpClient = tcpListener.AcceptTcpClient()
            ' Read the data stream from the client.
            Dim bytes(1800) As Byte
            Dim stream As NetworkStream = tcpClient.GetStream()
            stream.Read(bytes, 0, bytes.Length)
            processMsg(tcpClient, stream, bytes)
            tcpListener.Stop()
            flag = "Ok"
        End While
        Return flag
    End Function

    ''' <summary>
    ''' Procesador del mensaje recibido mediante el socket
    ''' </summary>
    ''' <param name="client"></param>
    ''' <param name="stream"></param>
    ''' <param name="bytesReceived"></param>
    ''' <remarks></remarks>
    Public Sub processMsg(ByVal client As TcpClient, ByVal stream As NetworkStream, ByVal bytesReceived() As Byte)
        ' Handle the message received and 
        ' send a response back to the client.
        Try
            mstrMessage = (bytesReceived)
            mscClient = client
            mstrResponse = "Exito"

        Catch ex As Exception
            mstrResponse = "Error: " & ex.Message
            'MsgBox("Error: " & ex.Message)
        End Try
        bytesSent = Encoding.ASCII.GetBytes(mstrResponse)
        stream.Write(bytesSent, 0, bytesSent.Length)

    End Sub
#End Region


End Class