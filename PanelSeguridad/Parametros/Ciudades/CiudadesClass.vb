Public Class CiudadesClass
#Region "campos"
    Private _Index As Long
    Private _Pais_ID As Integer
    Private _Ciudades_ID As Integer
    Private _Descripcion As String
    Private _FechaActualizacion As String
    Private _Usuario As String
    Private _DescripPais As String
#End Region

#Region "proiedades"
    Public Property Index() As Long
        Get
            Return Me._Index
        End Get
        Set(ByVal value As Long)
            Me._Index = value
        End Set
    End Property
    Public Property Pais_ID() As Integer
        Get
            Return Me._Pais_ID
        End Get
        Set(ByVal value As Integer)
            Me._Pais_ID = value
        End Set
    End Property
    Public Property Ciudades_ID() As Integer
        Get
            Return Me._Ciudades_ID
        End Get
        Set(ByVal value As Integer)
            Me._Ciudades_ID = value
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
    Public Property FechaActualizacion() As String
        Get
            Return Me._FechaActualizacion
        End Get
        Set(ByVal value As String)
            Me._FechaActualizacion = value
        End Set
    End Property
    Public Property Usuario() As String
        Get
            Return Me._Usuario
        End Get
        Set(ByVal value As String)
            Me._Usuario = value
        End Set
    End Property
    Public Property DescripPais() As String
        Get
            Return Me._DescripPais
        End Get
        Set(ByVal value As String)
            Me._DescripPais = value
        End Set
    End Property
#End Region
End Class
