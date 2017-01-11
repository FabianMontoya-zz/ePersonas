Public Class Adm_OpcRolClass

#Region "campos"
    Private _Index As Long
    Private _Nit_ID As String
    Private _OPRol_ID As String
    Private _Consecutivo As Integer
    Private _Tipo As String
    Private _Subrol_rol As String
    Private _Link_ID As String
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
    Public Property OPRol_ID() As String
        Get
            Return Me._OPRol_ID
        End Get
        Set(ByVal value As String)
            Me._OPRol_ID = value
        End Set
    End Property
    Public Property Consecutivo() As Integer
        Get
            Return Me._Consecutivo
        End Get
        Set(ByVal value As Integer)
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
#End Region


End Class
