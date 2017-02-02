Public Class TipoServicioClass
#Region "campos"
    Private _Nit_ID As String
    Private _Codigo_ID As Integer

    Private _Nombre As String
    Private _Tipo As String
    Private _Referencia As String
    Private _Cod_Moneda As Integer
    Private _Costo As Long
    Private _valor As Long
    Private _Detalle As String
    Private _Calendario_ID As Integer
    Private _Capacidad As Integer
    Private _N_Pagos_Bloqueos As Integer
    Private _Tipo_Calculo_Sesion As String
    Private _Tiempo_Sesion As String
    Private _Tiempo_Entre_Servicios As Integer
    Private _Tiempo_Maximo_Agenda As String
    Private _Imagen_asociada As String

    Private _UsuarioCreacion As String
    Private _FechaCreacion As String
    Private _UsuarioActualizacion As String
    Private _FechaActualizacion As String

#End Region

#Region "propiedades"
    Public Property Nit_ID() As Long
        Get
            Return Me._Nit_ID
        End Get
        Set(ByVal value As Long)
            Me._Nit_ID = value
        End Set
    End Property
    Public Property Codigo_ID() As Integer
        Get
            Return Me._Codigo_ID
        End Get
        Set(ByVal value As Integer)
            Me._Codigo_ID = value
        End Set
    End Property
    Public Property Nombre() As String
        Get
            Return Me._Nombre
        End Get
        Set(ByVal value As String)
            Me._Nombre = value
        End Set
    End Property
    Public Property Tipo() As String
        Get
            Return Me._Tipo
        End Get
        Set(ByVal value As String)
            Me._Tipo = value
        End Set
    End Property
    Public Property Referencia() As String
        Get
            Return Me._Referencia
        End Get
        Set(ByVal value As String)
            Me._Referencia = value
        End Set
    End Property
    Public Property Cod_Moneda() As Integer
        Get
            Return Me._Cod_Moneda
        End Get
        Set(ByVal value As Integer)
            Me._Cod_Moneda = value
        End Set
    End Property
    Public Property Costo() As Long
        Get
            Return Me._Costo
        End Get
        Set(ByVal value As Long)
            Me._Costo = value
        End Set
    End Property
    Public Property valor() As Long
        Get
            Return Me._valor
        End Get
        Set(ByVal value As Long)
            Me._valor = value
        End Set
    End Property
    Public Property Detalle() As String
        Get
            Return Me._Detalle
        End Get
        Set(ByVal value As String)
            Me._Detalle = value
        End Set
    End Property
    Public Property Calendario_ID() As Integer
        Get
            Return Me._Calendario_ID
        End Get
        Set(ByVal value As Integer)
            Me._Calendario_ID = value
        End Set
    End Property
    Public Property Capacidad() As Integer
        Get
            Return Me._Capacidad
        End Get
        Set(ByVal value As Integer)
            Me._Capacidad = value
        End Set
    End Property
    Public Property N_Pagos_Bloqueos() As Integer
        Get
            Return Me._N_Pagos_Bloqueos
        End Get
        Set(ByVal value As Integer)
            Me._N_Pagos_Bloqueos = value
        End Set
    End Property
    Public Property Tipo_Calculo_Sesion() As String
        Get
            Return Me._Tipo_Calculo_Sesion
        End Get
        Set(ByVal value As String)
            Me._Tipo_Calculo_Sesion = value
        End Set
    End Property
    Public Property Tiempo_Sesion() As String
        Get
            Return Me._Tiempo_Sesion
        End Get
        Set(ByVal value As String)
            Me._Tiempo_Sesion = value
        End Set
    End Property
    Public Property Tiempo_Entre_Servicios() As Integer
        Get
            Return Me._Tiempo_Entre_Servicios
        End Get
        Set(ByVal value As Integer)
            Me._Tiempo_Entre_Servicios = value
        End Set
    End Property
    Public Property Tiempo_Maximo_Agenda() As String
        Get
            Return Me._Tiempo_Maximo_Agenda
        End Get
        Set(ByVal value As String)
            Me._Tiempo_Maximo_Agenda = value
        End Set
    End Property
    Public Property Imagen_asociada() As String
        Get
            Return Me._Imagen_asociada
        End Get
        Set(ByVal value As String)
            Me._Imagen_asociada = value
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

#End Region
End Class
