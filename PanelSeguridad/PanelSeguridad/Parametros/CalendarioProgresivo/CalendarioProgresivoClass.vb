Public Class CalendarioProgresivoClass
#Region "campos"
    Private _Index As Long
    Private _Nit_ID As String
    Private _CalendarioProgresivo_ID As Integer

    Private _Descripcion As String
    Private _TipoCalendarioProgresivo As String

    Private _UsuarioCreacion As String
    Private _FechaCreacion As String
    Private _UsuarioActualizacion As String
    Private _FechaActualizacion As String

    Private _DescripEmpresa As String
    Private _DescripTipoCalendarioProgresivo As String
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
    Public Property CalendarioProgresivo_ID() As Integer
        Get
            Return Me._CalendarioProgresivo_ID
        End Get
        Set(ByVal value As Integer)
            Me._CalendarioProgresivo_ID = value
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
    Public Property TipoCalendarioProgresivo() As String
        Get
            Return Me._TipoCalendarioProgresivo
        End Get
        Set(ByVal value As String)
            Me._TipoCalendarioProgresivo = value
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

    Public Property DescripEmpresa() As String
        Get
            Return Me._DescripEmpresa
        End Get
        Set(ByVal value As String)
            Me._DescripEmpresa = value
        End Set
    End Property
    Public Property DescripTipoCalendarioProgresivo() As String
        Get
            Return Me._DescripTipoCalendarioProgresivo
        End Get
        Set(ByVal value As String)
            Me._DescripTipoCalendarioProgresivo = value
        End Set
    End Property
#End Region
End Class
