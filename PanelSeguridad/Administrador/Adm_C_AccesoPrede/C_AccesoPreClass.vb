Public Class C_AccesoPreClass
#Region "campos"
    Private _Index As Long
    Private _Nit_ID As String
    Private _TypeDocument_ID As Integer
    Private _Document_ID As Long
    Private _Tarjeta_ID As String

    Private _Nit_ID_EmpVisita As String
    Private _PuertaAcceso_ID As Long
    Private _Area_ID As Long
    Private _TypeDocument_ID_Per_Encargada As Integer
    Private _Document_ID_Per_Encargada As Long
    Private _ControlVigencia As String
    Private _FechaInicio_Vigencia As String
    Private _HoraInicio As String
    Private _FechaFin_Vigencia As String
    Private _HoraFin As String
    Private _Estado As String
    Private _IngAutomatico_Porteria As String
    Private _TipoIngreso As String

    Private _UsuarioCreacion As String
    Private _FechaCreacion As String
    Private _UsuarioActualizacion As String
    Private _FechaActualizacion As String
    Private _UsuarioEliminacion As String
    Private _FechaEliminacion As String

    Private _DescripEmpresa As String

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
    Public Property Tarjeta_ID() As String
        Get
            Return Me._Tarjeta_ID
        End Get
        Set(ByVal value As String)
            Me._Tarjeta_ID = value
        End Set
    End Property

    Public Property Nit_ID_EmpVisita() As String
        Get
            Return Me._Nit_ID_EmpVisita
        End Get
        Set(ByVal value As String)
            Me._Nit_ID_EmpVisita = value
        End Set
    End Property
    Public Property PuertaAcceso_ID() As Long
        Get
            Return Me._PuertaAcceso_ID
        End Get
        Set(ByVal value As Long)
            Me._PuertaAcceso_ID = value
        End Set
    End Property
    Public Property Area_ID() As Long
        Get
            Return Me._Area_ID
        End Get
        Set(ByVal value As Long)
            Me._Area_ID = value
        End Set
    End Property
    Public Property TypeDocument_ID_Per_Encargada() As Integer
        Get
            Return Me._TypeDocument_ID_Per_Encargada
        End Get
        Set(ByVal value As Integer)
            Me._TypeDocument_ID_Per_Encargada = value
        End Set
    End Property
    Public Property Document_ID_Per_Encargada() As Long
        Get
            Return Me._Document_ID_Per_Encargada
        End Get
        Set(ByVal value As Long)
            Me._Document_ID_Per_Encargada = value
        End Set
    End Property
    Public Property ControlVigencia() As String
        Get
            Return Me._ControlVigencia
        End Get
        Set(ByVal value As String)
            Me._ControlVigencia = value
        End Set
    End Property
    Public Property FechaInicio_Vigencia() As String
        Get
            Return Me._FechaInicio_Vigencia
        End Get
        Set(ByVal value As String)
            Me._FechaInicio_Vigencia = value
        End Set
    End Property
    Public Property HoraInicio() As String
        Get
            Return Me._HoraInicio
        End Get
        Set(ByVal value As String)
            Me._HoraInicio = value
        End Set
    End Property
    Public Property FechaFin_Vigencia() As String
        Get
            Return Me._FechaFin_Vigencia
        End Get
        Set(ByVal value As String)
            Me._FechaFin_Vigencia = value
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
    Public Property Estado() As String
        Get
            Return Me._Estado
        End Get
        Set(ByVal value As String)
            Me._Estado = value
        End Set
    End Property
    Public Property IngAutomatico_Porteria() As String
        Get
            Return Me._IngAutomatico_Porteria
        End Get
        Set(ByVal value As String)
            Me._IngAutomatico_Porteria = value
        End Set
    End Property
    Public Property TipoIngreso() As String
        Get
            Return Me._TipoIngreso
        End Get
        Set(ByVal value As String)
            Me._TipoIngreso = value
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
    Public Property UsuarioEliminacion() As String
        Get
            Return Me._UsuarioEliminacion
        End Get
        Set(ByVal value As String)
            Me._UsuarioEliminacion = value
        End Set
    End Property
    Public Property FechaEliminacion() As String
        Get
            Return Me._FechaEliminacion
        End Get
        Set(ByVal value As String)
            Me._FechaEliminacion = value
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
