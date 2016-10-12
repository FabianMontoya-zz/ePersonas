Public Class Relation_Tipo_Subtipo_ActivoClass
#Region "campos"
    Private _Tipo_ID As Integer
    Private _SubTipo_ID As Integer
    Private _FechaActualizacion As String
    Private _Usuario As String

    Private _DescripTipo As String
    Private _DescripSubTipo As String

#End Region

#Region "proiedades"
    Public Property Tipo_ID() As Integer
        Get
            Return Me._Tipo_ID
        End Get
        Set(ByVal value As Integer)
            Me._Tipo_ID = value
        End Set
    End Property
    Public Property SubTipo_ID() As Integer
        Get
            Return Me._SubTipo_ID
        End Get
        Set(ByVal value As Integer)
            Me._SubTipo_ID = value
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

    Public Property DescripTipo() As String
        Get
            Return Me._DescripTipo
        End Get
        Set(ByVal value As String)
            Me._DescripTipo = value
        End Set
    End Property
    Public Property DescripSubTipo() As String
        Get
            Return Me._DescripSubTipo
        End Get
        Set(ByVal value As String)
            Me._DescripSubTipo = value
        End Set
    End Property

#End Region

End Class
