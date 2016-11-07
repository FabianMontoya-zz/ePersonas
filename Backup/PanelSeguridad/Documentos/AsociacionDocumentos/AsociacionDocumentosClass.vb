Public Class AsociacionDocumentosClass
#Region "campos"
    Private _Index As Long
    Private _Nit_ID As String
    Private _TypeDocument_ID As Integer
    Private _Document_ID As Long
    Private _Secuencia_Doc As Integer
    Private _Contrato_ID As String
    Private _Ref_1 As String
    Private _Factura_ID As String
    Private _Secuencia_ID As Integer
    Private _UsuarioCreacion As String
    Private _FechaCreacion As String
    Private _UsuarioActualizacion As String
    Private _FechaActualizacion As String
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
            Return Me._Nit_ID
        End Get
        Set(ByVal value As String)
            Me._Nit_ID = value
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
    Public Property Document_ID() As Long
        Get
            Return Me._Document_ID
        End Get
        Set(ByVal value As Long)
            Me._Document_ID = value
        End Set
    End Property
    Public Property Secuencia_Doc() As Integer
        Get
            Return Me._Secuencia_Doc
        End Get
        Set(ByVal value As Integer)
            Me._Secuencia_Doc = value
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
    Public Property Ref_1() As String
        Get
            Return Me._Ref_1
        End Get
        Set(ByVal value As String)
            Me._Ref_1 = value
        End Set
    End Property
    Public Property Factura_ID() As String
        Get
            Return Me._Factura_ID
        End Get
        Set(ByVal value As String)
            Me._Factura_ID = value
        End Set
    End Property
    Public Property Secuencia_ID() As Integer
        Get
            Return Me._Secuencia_ID
        End Get
        Set(ByVal value As Integer)
            Me._Secuencia_ID = value
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
#End Region
End Class
