Public Class MonedaCotClass
#Region "campos"
    Private _MonedaCot_ID As Integer
    Private _Fecha As String
    Private _ValorCotizacion As Double
    Private _UsuarioCreacion As String
    Private _FechaCreacion As String
    Private _UsuarioActualizacion As String
    Private _FechaActualizacion As String
    Private _DescripMoneda As String
#End Region

#Region "proiedades"
    Public Property MonedaCot_ID() As Integer
        Get
            Return Me._MonedaCot_ID
        End Get
        Set(ByVal value As Integer)
            Me._MonedaCot_ID = value
        End Set
    End Property
    Public Property Fecha() As String
        Get
            Return Me._Fecha
        End Get
        Set(ByVal value As String)
            Me._Fecha = value
        End Set
    End Property
    Public Property ValorCotizacion() As Double
        Get
            Return Me._ValorCotizacion
        End Get
        Set(ByVal value As Double)
            Me._ValorCotizacion = value
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
    Public Property DescripMoneda() As String
        Get
            Return Me._DescripMoneda
        End Get
        Set(ByVal value As String)
            Me._DescripMoneda = value
        End Set
    End Property
#End Region
End Class
