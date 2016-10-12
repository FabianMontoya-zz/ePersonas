Public Class AreaClass
#Region "campos"
    Private _Nit_ID As String
    Private _Area_ID As Integer

    Private _Descripcion As String
    Private _AreaDependencia As Integer
    Private _Politica_ID As Integer

    Private _UsuarioCreacion As String
    Private _FechaCreacion As String
    Private _UsuarioActualizacion As String
    Private _FechaActualizacion As String

    Private _DescripAreaDepen As String
    Private _DescripPolitica As String
    Private _DescripEmpresa As String
#End Region

#Region "proiedades"
    Public Property Nit_ID() As String
        Get
            Return Me._Nit_ID
        End Get
        Set(ByVal value As String)
            Me._Nit_ID = value
        End Set
    End Property
    Public Property Area_ID() As Integer
        Get
            Return Me._Area_ID
        End Get
        Set(ByVal value As Integer)
            Me._Area_ID = value
        End Set
    End Property

    Public Property Descripcion() As String
        Get
            Return Me._Descripcion
        End Get
        Set(ByVal value As String)
            Me._Descripcion = value
        End Set
    End Property
    Public Property AreaDependencia() As Integer
        Get
            Return Me._AreaDependencia
        End Get
        Set(ByVal value As Integer)
            Me._AreaDependencia = value
        End Set
    End Property
    Public Property Politica_ID() As Integer
        Get
            Return Me._Politica_ID
        End Get
        Set(ByVal value As Integer)
            Me._Politica_ID = value
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

    Public Property DescripAreaDepen() As String
        Get
            Return Me._DescripAreaDepen
        End Get
        Set(ByVal value As String)
            Me._DescripAreaDepen = value
        End Set
    End Property
    Public Property DescripPolitica() As String
        Get
            Return Me._DescripPolitica
        End Get
        Set(ByVal value As String)
            Me._DescripPolitica = value
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
