Public Class InvPuertaClass
#Region "campos"
    Private _Index As Long
    Private _Nit_ID As String
    Private _Tarjeta_ID As String
    Private _Estado As String
    Private _MotivoBloqueo As String
    Private _ChequeaVigencias As String
    Private _Fecha_Inicio_Vigencia As String
    Private _Fecha_Final_Vigencia As String

    Private _Nit_ID_Custodia As String
    Private _TypeDocument_ID_Custodia As Integer
    Private _Document_ID_Custodia As Long
    Private _FechaCustodia As String

    Private _Nit_ID_Asigna As String
    Private _TypeDocument_ID_Asigna As Integer
    Private _Document_ID_Asigna As Long
    Private _FechaAsignacion As String

    Private _Nit_ID_Entrega As String
    Private _TypeDocument_ID_Entrega As Integer
    Private _Document_ID_Entrega As Long
    Private _FechaEntrega As String

    Private _Observaciones As String

    Private _UsuarioCreacion As String
    Private _FechaCreacion As String
    Private _UsuarioActualizacion As String
    Private _FechaActualizacion As String

    Private _DescripEmpresa As String

    Private _DescripEmpresaCustodia As String
    Private _DescripEmpresaAsigna As String
    Private _DescripEmpresaEntrega As String

    Private _DescripEstado As String
    Private _DescripBloqueo As String
    Private _DescripPersonaCustodia As String
    Private _DescripPersonaAsigna As String
    Private _DescripPersonaEntrega As String
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
    Public Property Tarjeta_ID() As String
        Get
            Return Me._Tarjeta_ID
        End Get
        Set(ByVal value As String)
            Me._Tarjeta_ID = value
        End Set
    End Property
    Public Property Estado() As String
        Get
            Return Me._Estado
        End Get
        Set(ByVal value As String)
            Me._Estado = value
        End Set
    End Property
    Public Property MotivoBloqueo() As String
        Get
            Return Me._MotivoBloqueo
        End Get
        Set(ByVal value As String)
            Me._MotivoBloqueo = value
        End Set
    End Property
    Public Property ChequeaVigencias() As String
        Get
            Return Me._ChequeaVigencias
        End Get
        Set(ByVal value As String)
            Me._ChequeaVigencias = value
        End Set
    End Property
    Public Property Fecha_Inicio_Vigencia() As String
        Get
            Return Me._Fecha_Inicio_Vigencia
        End Get
        Set(ByVal value As String)
            Me._Fecha_Inicio_Vigencia = value
        End Set
    End Property
    Public Property Fecha_Final_Vigencia() As String
        Get
            Return Me._Fecha_Final_Vigencia
        End Get
        Set(ByVal value As String)
            Me._Fecha_Final_Vigencia = value
        End Set
    End Property

    Public Property Nit_ID_Custodia() As String
        Get
            Return Me._Nit_ID_Custodia
        End Get
        Set(ByVal value As String)
            Me._Nit_ID_Custodia = value
        End Set
    End Property
    Public Property TypeDocument_ID_Custodia() As Integer
        Get
            Return Me._TypeDocument_ID_Custodia
        End Get
        Set(ByVal value As Integer)
            Me._TypeDocument_ID_Custodia = value
        End Set
    End Property
    Public Property Document_ID_Custodia() As Long
        Get
            Return Me._Document_ID_Custodia
        End Get
        Set(ByVal value As Long)
            Me._Document_ID_Custodia = value
        End Set
    End Property
    Public Property FechaCustodia() As String
        Get
            Return Me._FechaCustodia
        End Get
        Set(ByVal value As String)
            Me._FechaCustodia = value
        End Set
    End Property

    Public Property Nit_ID_Asigna() As String
        Get
            Return Me._Nit_ID_Asigna
        End Get
        Set(ByVal value As String)
            Me._Nit_ID_Asigna = value
        End Set
    End Property
    Public Property TypeDocument_ID_Asigna() As Integer
        Get
            Return Me._TypeDocument_ID_Asigna
        End Get
        Set(ByVal value As Integer)
            Me._TypeDocument_ID_Asigna = value
        End Set
    End Property
    Public Property Document_ID_Asigna() As Long
        Get
            Return Me._Document_ID_Asigna
        End Get
        Set(ByVal value As Long)
            Me._Document_ID_Asigna = value
        End Set
    End Property
    Public Property FechaAsignacion() As String
        Get
            Return Me._FechaAsignacion
        End Get
        Set(ByVal value As String)
            Me._FechaAsignacion = value
        End Set
    End Property

    Public Property Nit_ID_Entrega() As String
        Get
            Return Me._Nit_ID_Entrega
        End Get
        Set(ByVal value As String)
            Me._Nit_ID_Entrega = value
        End Set
    End Property
    Public Property TypeDocument_ID_Entrega() As Integer
        Get
            Return Me._TypeDocument_ID_Entrega
        End Get
        Set(ByVal value As Integer)
            Me._TypeDocument_ID_Entrega = value
        End Set
    End Property
    Public Property Document_ID_Entrega() As Long
        Get
            Return Me._Document_ID_Entrega
        End Get
        Set(ByVal value As Long)
            Me._Document_ID_Entrega = value
        End Set
    End Property
    Public Property FechaEntrega() As String
        Get
            Return Me._FechaEntrega
        End Get
        Set(ByVal value As String)
            Me._FechaEntrega = value
        End Set
    End Property

    Public Property Observaciones() As String
        Get
            Return Me._Observaciones
        End Get
        Set(ByVal value As String)
            Me._Observaciones = value
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
    Public Property DescripEmpresaCustodia() As String
        Get
            Return Me._DescripEmpresaCustodia
        End Get
        Set(ByVal value As String)
            Me._DescripEmpresaCustodia = value
        End Set
    End Property
    Public Property DescripEmpresaAsigna() As String
        Get
            Return Me._DescripEmpresaAsigna
        End Get
        Set(ByVal value As String)
            Me._DescripEmpresaAsigna = value
        End Set
    End Property
    Public Property DescripEmpresaEntrega() As String
        Get
            Return Me._DescripEmpresaEntrega
        End Get
        Set(ByVal value As String)
            Me._DescripEmpresaEntrega = value
        End Set
    End Property

    Public Property DescripEstado() As String
        Get
            Return Me._DescripEstado
        End Get
        Set(ByVal value As String)
            Me._DescripEstado = value
        End Set
    End Property
    Public Property DescripBloqueo() As String
        Get
            Return Me._DescripBloqueo
        End Get
        Set(ByVal value As String)
            Me._DescripBloqueo = value
        End Set
    End Property
    Public Property DescripPersonaCustodia() As String
        Get
            Return Me._DescripPersonaCustodia
        End Get
        Set(ByVal value As String)
            Me._DescripPersonaCustodia = value
        End Set
    End Property
    Public Property DescripPersonaAsigna() As String
        Get
            Return Me._DescripPersonaAsigna
        End Get
        Set(ByVal value As String)
            Me._DescripPersonaAsigna = value
        End Set
    End Property
    Public Property DescripPersonaEntrega() As String
        Get
            Return Me._DescripPersonaEntrega
        End Get
        Set(ByVal value As String)
            Me._DescripPersonaEntrega = value
        End Set
    End Property
#End Region
End Class
