Public Class FestivosClass

#Region "campos"
    Private _Index As Long
    Private _NitID As String
    Private _Calendario_ID As Integer
    Private _Year As Integer
    Private _Mes_Dia As String
    Private _FechaCreacion As String
    Private _UsuarioCreacion As String
    Private _StrMes As String
    Private _StrDia As String
    Private _DescripcionEmpresa As String
    Private _DescripcionCalendario As String
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
    Public Property Nit_ID() As String
        Get
            Return Me._NitID
        End Get
        Set(ByVal value As String)
            Me._NitID = value
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
    Public Property Year() As Integer
        Get
            Return Me._Year
        End Get
        Set(ByVal value As Integer)
            Me._Year = value
        End Set
    End Property
    Public Property Mes_Dia() As String
        Get
            Return Me._Mes_Dia
        End Get
        Set(ByVal value As String)
            Me._Mes_Dia = value
        End Set
    End Property
    Public Property StrMes() As String
        Get
            Return Me._StrMes
        End Get
        Set(ByVal value As String)
            Me._StrMes = value
        End Set
    End Property
    Public Property StrDia() As String
        Get
            Return Me._StrDia
        End Get
        Set(ByVal value As String)
            Me._StrDia = value
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
    Public Property UsuarioCreacion() As String
        Get
            Return Me._UsuarioCreacion
        End Get
        Set(ByVal value As String)
            Me._UsuarioCreacion = value
        End Set
    End Property

    Public Property DescripcionEmpresa() As String
        Get
            Return Me._DescripcionEmpresa
        End Get
        Set(ByVal value As String)
            Me._DescripcionEmpresa = value
        End Set
    End Property
    Public Property DescripcionCalendario() As String
        Get
            Return Me._DescripcionCalendario
        End Get
        Set(ByVal value As String)
            Me._DescripcionCalendario = value
        End Set
    End Property
#End Region


End Class
