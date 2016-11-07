Public Class RGrpDoc_DocClass
#Region "campos"
    Private _Index As Long
    Private _Nit_ID As String
    Private _GrpDoc_ID As Integer
    Private _Doc_ID As String

    Private _UsuarioCreacion As String
    Private _FechaCreacion As String
    Private _UsuarioActualizacion As String
    Private _FechaActualizacion As String

    Private _DescripGrupoDoc As String
    Private _DescripDoc As String
    Private _DescripEmpresa As String
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
    Public Property GrpDoc_ID() As Integer
        Get
            Return Me._GrpDoc_ID
        End Get
        Set(ByVal value As Integer)
            Me._GrpDoc_ID = value
        End Set
    End Property
    Public Property Doc_ID() As String
        Get
            Return Me._Doc_ID
        End Get
        Set(ByVal value As String)
            Me._Doc_ID = value
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

    Public Property DescripGrupoDoc() As String
        Get
            Return Me._DescripGrupoDoc
        End Get
        Set(ByVal value As String)
            Me._DescripGrupoDoc = value
        End Set
    End Property
    Public Property DescripDoc() As String
        Get
            Return Me._DescripDoc
        End Get
        Set(ByVal value As String)
            Me._DescripDoc = value
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
#End Region
End Class
