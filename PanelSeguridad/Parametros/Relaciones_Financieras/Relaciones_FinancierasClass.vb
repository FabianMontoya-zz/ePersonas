Public Class Relaciones_FinancierasClass

#Region "Campos"
    Private _Nit_ID As String
    Private _TypeDocument_ID As Integer
    Private _Document_ID As Long
    Private _TypeDocument_ID_EF As Integer
    Private _Document_ID_EF As Long

    Private _TipoCuenta As Integer
    Private _Cuenta As String

    Private _UsuarioCreacion As String
    Private _FechaCreacion As String
    Private _UsuarioActualizacion As String
    Private _FechaActualizacion As String
    Private _DescripEntidad As String
    Private _DecripCuenta As String
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
    Public Property TypeDocument_ID_EF() As Integer
        Get
            Return Me._TypeDocument_ID_EF
        End Get
        Set(ByVal value As Integer)
            Me._TypeDocument_ID_EF = value
        End Set
    End Property
    Public Property Document_ID_EF() As Long
        Get
            Return Me._Document_ID_EF
        End Get
        Set(ByVal value As Long)
            Me._Document_ID_EF = value
        End Set
    End Property

    Public Property TipoCuenta() As Integer
        Get
            Return Me._TipoCuenta
        End Get
        Set(ByVal value As Integer)
            Me._TipoCuenta = value
        End Set
    End Property
    Public Property Cuenta() As String
        Get
            Return Me._Cuenta
        End Get
        Set(ByVal value As String)
            Me._Cuenta = value
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

    Public Property DescripEntidad() As String
        Get
            Return Me._DescripEntidad
        End Get
        Set(ByVal value As String)
            Me._DescripEntidad = value
        End Set
    End Property
    Public Property DecripCuenta() As String
        Get
            Return Me._DecripCuenta
        End Get
        Set(ByVal value As String)
            Me._DecripCuenta = value
        End Set
    End Property
 #End Region

End Class
