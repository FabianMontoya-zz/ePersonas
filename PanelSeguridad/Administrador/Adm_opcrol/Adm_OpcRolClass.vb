Public Class Adm_OpcRolClass

#Region "campos"
    Private _Index As Long
    Private _Nit_ID As String
    Private _OPRol_Nit_ID As String
    Private _OPRol_ID As String
    Private _Consecutivo As String
    Private _Tipo As String
    Private _Subrol_rol_Nit_ID As String
    Private _Subrol_rol As String
    Private _Link_ID As String

    Private _UsuarioCreacion As String
    Private _FechaCreacion As String
    Private _UsuarioActualizacion As String
    Private _FechaActualizacion As String
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
    Public Property OPRol_Nit_ID() As String
        Get
            Return Me._OPRol_Nit_ID
        End Get
        Set(ByVal value As String)
            Me._OPRol_Nit_ID = value
        End Set
    End Property
    Public Property OPRol_ID() As String
        Get
            Return Me._OPRol_ID
        End Get
        Set(ByVal value As String)
            Me._OPRol_ID = value
        End Set
    End Property
    Public Property Consecutivo() As String
        Get
            Return Me._Consecutivo
        End Get
        Set(ByVal value As String)
            Me._Consecutivo = value
        End Set
    End Property
    Public Property Tipo() As String
        Get
            Return Me._Tipo
        End Get
        Set(ByVal value As String)
            Me._Tipo = value
        End Set
    End Property
    Public Property Subrol_rol_Nit_ID() As String
        Get
            Return Me._Subrol_rol_Nit_ID
        End Get
        Set(ByVal value As String)
            Me._Subrol_rol_Nit_ID = value
        End Set
    End Property
    Public Property Subrol_rol() As String
        Get
            Return Me._Subrol_rol
        End Get
        Set(ByVal value As String)
            Me._Subrol_rol = value
        End Set
    End Property
    Public Property Link_ID() As String
        Get
            Return Me._Link_ID
        End Get
        Set(ByVal value As String)
            Me._Link_ID = value
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
