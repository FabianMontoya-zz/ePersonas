Public Class R_PuertaAcc_AreaClass
#Region "campos"
    Private _Index As Long
    Private _Nit_ID As String
    Private _PuertaAcceso_ID As Integer
    Private _Area_ID As String

    Private _UsuarioCreacion As String
    Private _FechaCreacion As String
    Private _UsuarioActualizacion As String
    Private _FechaActualizacion As String

    Private _DescripPAcceso As String
    Private _DescripArea As String
    Private _DescripEmpresa As String
#End Region

#Region "propiedades"
    Public Property Index() As Long
        Get
            Return Me._Index
        End Get
        Set(ByVal value As Long)
            Me._Index = value
        End Set
    End Property
    Public Property Nit_ID() As String
        Get
            Return Me._Nit_ID
        End Get
        Set(ByVal value As String)
            Me._Nit_ID = value
        End Set
    End Property
    Public Property PuertaAcceso_ID() As Integer
        Get
            Return Me._PuertaAcceso_ID
        End Get
        Set(ByVal value As Integer)
            Me._PuertaAcceso_ID = value
        End Set
    End Property
    Public Property Area_ID() As String
        Get
            Return Me._Area_ID
        End Get
        Set(ByVal value As String)
            Me._Area_ID = value
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

    Public Property DescripPAcceso() As String
        Get
            Return Me._DescripPAcceso
        End Get
        Set(ByVal value As String)
            Me._DescripPAcceso = value
        End Set
    End Property
    Public Property DescripArea() As String
        Get
            Return Me._DescripArea
        End Get
        Set(ByVal value As String)
            Me._DescripArea = value
        End Set
    End Property
    Public Property DescripEmpresa() As String
        Get
            Return Me._DescripEmpresa
        End Get
        Set(ByVal value As String)
            Me._DescripEmpresa = value
        End Set
    End Property
#End Region
End Class
