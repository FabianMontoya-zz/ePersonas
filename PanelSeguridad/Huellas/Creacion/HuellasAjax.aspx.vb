Imports Newtonsoft.Json

Imports System
Imports System.Threading
Imports System.Net.Sockets
Imports System.IO
Imports System.Text
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

    End Sub

#Region "ESTRUCTURAS"
    Private Structure InfoDeUnCliente
        'Esta estructura permite guardar la información sobre un cliente
        Public Socket As Socket 'Socket utilizado para mantener la conexion con el cliente
        Public Thread As Thread 'Thread utilizado para escuchar al cliente
        Public UltimosDatosRecibidos As String 'Ultimos datos enviados por el cliente
    End Structure
#End Region

#Region "VARIABLES"
    Private tcpLsn As TcpListener
    Private Clientes As New Hashtable() 'Aqui se guarda la informacion de todos los clientes conectados
    Private tcpThd As Thread 'Escuchar mensajes enviados desde el servidor (Hilo)
    Private clienteTCP As TcpClient
    Private IDClienteActual As Net.IPEndPoint 'Ultimo cliente conectado
    Private m_PuertoDeEscucha As String
    Dim ipAddress As IPAddress = Dns.GetHostEntry("localhost").AddressList(0) 'Dirección IP
#End Region

#Region "EVENTOS"
    Public Event NuevaConexion(ByVal IDTerminal As Net.IPEndPoint)
    Public Event DatosRecibidos(ByVal IDTerminal As Net.IPEndPoint)
    Public Event ConexionTerminada(ByVal IDTerminal As Net.IPEndPoint)
#End Region

#Region "PROPIEDADES"
    Public Property IP() As IPAddress
        Get
            IP = ipAddress
        End Get

        Set(ByVal Value As IPAddress)
            ipAddress = Value
        End Set
    End Property
    Property PuertoDeEscucha() As String
        Get
            PuertoDeEscucha = m_PuertoDeEscucha
        End Get

        Set(ByVal Value As String)
            m_PuertoDeEscucha = Value
        End Set
    End Property
#End Region

#Region "METODOS"

    Public Sub Escuchar()
        tcpLsn = New TcpListener(Net.IPAddress.Any, PuertoDeEscucha)
        'Inicio la escucha
        tcpLsn.Start()

        'Creo un thread para que se quede escuchando la llegada de un cliente
        tcpThd = New Thread(AddressOf EsperarCliente)
        tcpThd.Start()
    End Sub

    Public Function ObtenerDatos(ByVal IDCliente As Net.IPEndPoint) As String
        Dim InfoClienteSolicitado As InfoDeUnCliente

        'Obtengo la informacion del cliente solicitado
        InfoClienteSolicitado = Clientes(IDCliente)

        ObtenerDatos = InfoClienteSolicitado.UltimosDatosRecibidos
    End Function

    Public Sub Cerrar(ByVal IDCliente As Net.IPEndPoint)
        Dim InfoClienteActual As InfoDeUnCliente

        'Obtengo la informacion del cliente solicitado
        InfoClienteActual = Clientes(IDCliente)

        'Cierro la conexion con el cliente
        InfoClienteActual.Socket.Close()
    End Sub

    Public Sub Cerrar()
        Dim InfoClienteActual As InfoDeUnCliente

        'Recorro todos los clientes y voy cerrando las conexiones
        For Each InfoClienteActual In Clientes.Values
            Call Cerrar(InfoClienteActual.Socket.RemoteEndPoint)
        Next
    End Sub

    Public Sub EnviarDatos(ByVal IDCliente As Net.IPEndPoint, ByVal Datos As String)
        Dim Cliente As InfoDeUnCliente

        'Obtengo la informacion del cliente al que se le quiere enviar el mensaje
        Cliente = Clientes(IDCliente)

        'Le envio el mensaje
        Cliente.Socket.Send(Encoding.ASCII.GetBytes(Datos))
    End Sub

    Public Sub EnviarDatos(ByVal Datos As String)
        Dim Cliente As InfoDeUnCliente

        'Recorro todos los clientes conectados, y les envio el mensaje recibido
        'en el parametro Datos
        For Each Cliente In Clientes.Values
            EnviarDatos(Cliente.Socket.RemoteEndPoint, Datos)
        Next
    End Sub

#End Region

#Region "FUNCIONES PRIVADAS"
    Private Sub EsperarCliente()
        Dim InfoClienteActual As InfoDeUnCliente

        With InfoClienteActual

            While True
                'Cuando se recibe la conexion, guardo la informacion del cliente

                'Guardo el Socket que utilizo para mantener la conexion con el cliente
                .Socket = tcpLsn.AcceptSocket() 'Se queda esperando la conexion de un cliente

                'Guardo el el RemoteEndPoint, que utilizo para identificar al cliente
                IDClienteActual = .Socket.RemoteEndPoint

                'Creo un Thread para que se encargue de escuchar los mensaje del cliente
                .Thread = New Thread(AddressOf LeerSocket)

                'Agrego la informacion del cliente al HashArray Clientes, donde esta la
                'informacion de todos estos
                SyncLock Me
                    Clientes.Add(IDClienteActual, InfoClienteActual)
                End SyncLock

                'Genero el evento Nueva conexion
                RaiseEvent NuevaConexion(IDClienteActual)

                'Inicio el thread encargado de escuchar los mensajes del cliente
                .Thread.Start()
            End While

        End With

    End Sub

    Private Sub LeerSocket()
        Dim IDReal As Net.IPEndPoint 'ID del cliente que se va a escuchar
        Dim Recibir() As Byte 'Array utilizado para recibir los datos que llegan
        Dim InfoClienteActual As InfoDeUnCliente 'Informacion del cliente que se va escuchar
        Dim Ret As Integer = 0

        IDReal = IDClienteActual
        InfoClienteActual = Clientes(IDReal)

        With InfoClienteActual

            While True
                If .Socket.Connected Then
                    Recibir = New Byte(100) {}

                    Try
                        'Me quedo esperando a que llegue un mensaje desde el cliente
                        Ret = .Socket.Receive(Recibir, Recibir.Length, SocketFlags.None)

                        If Ret > 0 Then
                            'Guardo el mensaje recibido
                            .UltimosDatosRecibidos = Encoding.ASCII.GetString(Recibir)
                            Clientes(IDReal) = InfoClienteActual

                            'Genero el evento de la recepcion del mensaje
                            RaiseEvent DatosRecibidos(IDReal)
                        Else
                            'Genero el evento de la finalizacion de la conexion
                            RaiseEvent ConexionTerminada(IDReal)
                            Exit While
                        End If

                    Catch e As Exception
                        If Not .Socket.Connected Then
                            'Genero el evento de la finalizacion de la conexion
                            RaiseEvent ConexionTerminada(IDReal)
                            Exit While
                        End If
                    End Try
                End If
            End While

            Call CerrarThread(IDReal)
        End With
    End Sub

    Private Sub CerrarThread(ByVal IDCliente As Net.IPEndPoint)
        Dim InfoClienteActual As InfoDeUnCliente

        'Cierro el thread que se encargaba de escuchar al cliente especificado
        InfoClienteActual = Clientes(IDCliente)

        Try
            InfoClienteActual.Thread.Abort()

        Catch e As Exception
            SyncLock Me
                'Elimino el cliente del HashArray que guarda la informacion de los clientes
                Clientes.Remove(IDCliente)
            End SyncLock
        End Try

    End Sub

#End Region



End Class