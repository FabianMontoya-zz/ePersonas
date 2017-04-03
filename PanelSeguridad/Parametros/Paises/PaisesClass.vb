Public Class PaisesClass
#Region "Campos"
    Private _Index As Long
    Private _Cod As Integer
    Private _Name As String
    Private _Moneda As String
    Private _Moneda_Descripcion As String
    Private _SWIFT As String
    Private _Calendario_ID As Integer
    Private _Calendario_Descripcion As String
    Private _FechaCreacion As String
    Private _UsuarioCreacion As String
    Private _FechaActualizacion As String
    Private _UsuarioActualizacion As String

#End Region

#Region "Propiedades"
    Public Property Cod As Integer
        Get
            Return Me._Cod
        End Get
        Set(ByVal value As Integer)
            Me._Cod = value
        End Set
    End Property
    Public Property Name As String
        Get
            Return Me._Name
        End Get
        Set(ByVal value As String)
            Me._Name = value
        End Set
    End Property
    Public Property Moneda As String
        Get
            Return Me._Moneda
        End Get
        Set(ByVal value As String)
            Me._Moneda = value
        End Set
    End Property
    Public Property Moneda_Descripcion As String
        Get
            Return Me._Moneda_Descripcion
        End Get
        Set(ByVal value As String)
            Me._Moneda_Descripcion = value
        End Set
    End Property
    Public Property SWIFT As String
        Get
            Return Me._SWIFT
        End Get
        Set(ByVal value As String)
            Me._SWIFT = value
        End Set
    End Property
    Public Property Calendario_ID As Integer
        Get
            Return Me._Calendario_ID
        End Get
        Set(ByVal value As Integer)
            Me._Calendario_ID = value
        End Set
    End Property
    Public Property Calendario_Descripcion As String
        Get
            Return Me._Calendario_Descripcion
        End Get
        Set(ByVal value As String)
            Me._Calendario_Descripcion = value
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
    Public Property FechaActualizacion() As String
        Get
            Return Me._FechaActualizacion
        End Get
        Set(ByVal value As String)
            Me._FechaActualizacion = value
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
    Public Property Index() As Long
        Get
            Return Me._Index
        End Get
        Set(ByVal value As Long)
            Me._Index = value
        End Set
    End Property
#End Region
End Class
