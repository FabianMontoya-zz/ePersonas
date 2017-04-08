Public Class Calendario_ProgresivoClass
#Region "campos"
    Private _Index As Long
    Private _Nit_ID As String
    Private _Calendario_ID As Integer
    Private _Calendario_Base_ID As Integer

    Private _Fecha As String
    Private _Grupo As String
    Private _HoraIni As String
    Private _HoraFin As String

    Private _UsuarioCreacion As String
    Private _FechaCreacion As String
    Private _UsuarioActualizacion As String
    Private _FechaActualizacion As String

    Private _DescripEmpresa As String
    Private _DescripCalendario As String
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
    Public Property Calendario_ID() As Integer
        Get
            Return Me._Calendario_ID
        End Get
        Set(ByVal value As Integer)
            Me._Calendario_ID = value
        End Set
    End Property
    Public Property Calendario_Base_ID() As Integer
        Get
            Return Me._Calendario_Base_ID
        End Get
        Set(ByVal value As Integer)
            Me._Calendario_Base_ID = value
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
    Public Property Grupo() As String
        Get
            Return Me._Grupo
        End Get
        Set(ByVal value As String)
            Me._Grupo = value
        End Set
    End Property
    Public Property HoraIni() As String
        Get
            Return Me._HoraIni
        End Get
        Set(ByVal value As String)
            Me._HoraIni = value
        End Set
    End Property
    Public Property HoraFin() As String
        Get
            Return Me._HoraFin
        End Get
        Set(ByVal value As String)
            Me._HoraFin = value
        End Set
    End Property
    ''
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
    Public Property DescripCalendario() As String
        Get
            Return Me._DescripCalendario
        End Get
        Set(ByVal value As String)
            Me._DescripCalendario = value
        End Set
    End Property

#End Region
End Class
