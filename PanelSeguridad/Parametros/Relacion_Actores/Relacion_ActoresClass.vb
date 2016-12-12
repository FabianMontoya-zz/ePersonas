Public Class Relacion_ActoresClass
#Region "campos"
    Private _Index As Integer

    Private _Nit_ID As String
    Private _Contrato_ID As String
    Private _TypeDocument_ID As Integer
    Private _Document_ID As String
    Private _TypeRelation As Integer

    Private _UsuarioCreacion As String
    Private _FechaCreacion As String
    Private _UsuarioActualizacion As String
    Private _FechaActualizacion As String

    Private _DescripEmpresa As String
    Private _Descrip_TypeDocumento As String
    Private _Descrip_TypeRelation As String
    Private _Descrip_Persona As String
#End Region

#Region "propiedades"
    Public Property Index() As Integer
        Get
            Return Me._Index
        End Get
        Set(ByVal value As Integer)
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
    Public Property Contrato_ID() As String
        Get
            Return Me._Contrato_ID
        End Get
        Set(ByVal value As String)
            Me._Contrato_ID = value
        End Set
    End Property
    Public Property TypeDocument_ID() As Integer
        Get
            Return Me._TypeDocument_ID
        End Get
        Set(ByVal value As Integer)
            Me._TypeDocument_ID = value
        End Set
    End Property
    Public Property Document_ID() As String
        Get
            Return Me._Document_ID
        End Get
        Set(ByVal value As String)
            Me._Document_ID = value
        End Set
    End Property
    Public Property TypeRelation() As Integer
        Get
            Return Me._TypeRelation
        End Get
        Set(ByVal value As Integer)
            Me._TypeRelation = value
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
    Public Property DescripEmpresa() As String
        Get
            Return Me._DescripEmpresa
        End Get
        Set(ByVal value As String)
            Me._DescripEmpresa = value
        End Set
    End Property
    Public Property Descrip_TypeDocumento() As String
        Get
            Return Me._Descrip_TypeDocumento
        End Get
        Set(ByVal value As String)
            Me._Descrip_TypeDocumento = value
        End Set
    End Property
    Public Property Descrip_TypeRelation() As String
        Get
            Return Me._Descrip_TypeRelation
        End Get
        Set(ByVal value As String)
            Me._Descrip_TypeRelation = value
        End Set
    End Property
    Public Property Descrip_Persona() As String
        Get
            Return Me._Descrip_Persona
        End Get
        Set(ByVal value As String)
            Me._Descrip_Persona = value
        End Set
    End Property
#End Region
End Class
