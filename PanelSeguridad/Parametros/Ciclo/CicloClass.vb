Public Class CicloClass
#Region "campos"
    Private _Index As Integer
    Private _ID_Ciclo As Integer
    Private _Fecha_Corte As String
    Private _Fecha_Pago As String

    Private _UsuarioCreacion As String
    Private _FechaCreacion As String
    Private _UsuarioActualizacion As String
    Private _FechaActualizacion As String
#End Region

#Region "propiedades"
    Public Property Index() As Integer
        Get
            Return Me._Index
        End Get
        Set(ByVal value As Integer)
            Me._Index = value
        End Set
    End Property
    Public Property ID_Ciclo() As Integer
        Get
            Return Me._ID_Ciclo
        End Get
        Set(ByVal value As Integer)
            Me._ID_Ciclo = value
        End Set
    End Property
    Public Property Fecha_Corte() As String
        Get
            Return Me._Fecha_Corte
        End Get
        Set(ByVal value As String)
            Me._Fecha_Corte = value
        End Set
    End Property
    Public Property Fecha_Pago() As String
        Get
            Return Me._Fecha_Pago
        End Get
        Set(ByVal value As String)
            Me._Fecha_Pago = value
        End Set
    End Property
    '------
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
