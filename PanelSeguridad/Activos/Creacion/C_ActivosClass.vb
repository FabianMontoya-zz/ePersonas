Public Class C_ActivosClass
#Region "campos"

    Private _Nit_ID As String
    Private _Ref_1 As String
    Private _Ref_2 As String
    Private _Ref_3 As String
    Private _Descripcion As String
    Private _TA_ID As Integer
    Private _STA_ID As Integer
    Private _Cod_Pais_U As Integer
    Private _Ciudad_ID_U As Integer
    Private _Direccion_U As String
    Private _Cod_Pais_R As Integer
    Private _Ciudad_ID_R As Integer
    Private _TypeDocument_ID_R As Integer
    Private _Document_ID_R As Long
    Private _Surcursal_ID As Integer
    Private _Cod_Moneda_ID As Integer
    Private _Valor_Bien As Long
    Private _Val_Op_Compra As Long
    Private _CompraBien As String
    Private _Asegurado As String
    Private _EstadoActivo As String
    Private _TipoAdministracion As String
    Private _TipoEscritura As String
    Private _N_Escritura As String
    Private _FechaConta_Recibo As String
    Private _FechaConta_Retiro As String
    Private _TypeDocument_ID_T As Integer
    Private _Document_ID_T As Long
    Private _EscrituraTrans As String
    Private _FechaTrans As String
    Private _Secuencia_Cargue As Long

    Private _TypeDocument_ID_Not As Integer
    Private _Document_ID_Not As Long
    Private _Num_Poliza As String
    Private _N_Notaria As Integer


    Private _UsuarioCreacion As String
    Private _FechaCreacion As String
    Private _UsuarioActualizacion As String
    Private _FechaActualizacion As String
#End Region

#Region "propiedades"

    Public Property Nit_ID() As String
        Get
            Return Me._Nit_ID
        End Get
        Set(ByVal value As String)
            Me._Nit_ID = value
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
    Public Property Ref_2() As String
        Get
            Return Me._Ref_2
        End Get
        Set(ByVal value As String)
            Me._Ref_2 = value
        End Set
    End Property
    Public Property Ref_3() As String
        Get
            Return Me._Ref_3
        End Get
        Set(ByVal value As String)
            Me._Ref_3 = value
        End Set
    End Property
    Public Property Descripcion() As String
        Get
            Return Me._Descripcion
        End Get
        Set(ByVal value As String)
            Me._Descripcion = value
        End Set
    End Property
    Public Property TA_ID() As Integer
        Get
            Return Me._TA_ID
        End Get
        Set(ByVal value As Integer)
            Me._TA_ID = value
        End Set
    End Property
    Public Property STA_ID() As Integer
        Get
            Return Me._STA_ID
        End Get
        Set(ByVal value As Integer)
            Me._STA_ID = value
        End Set
    End Property
    Public Property Cod_Pais_U() As Integer
        Get
            Return Me._Cod_Pais_U
        End Get
        Set(ByVal value As Integer)
            Me._Cod_Pais_U = value
        End Set
    End Property
    Public Property Ciudad_ID_U() As Integer
        Get
            Return Me._Ciudad_ID_U
        End Get
        Set(ByVal value As Integer)
            Me._Ciudad_ID_U = value
        End Set
    End Property
    Public Property Direccion_U() As String
        Get
            Return Me._Direccion_U
        End Get
        Set(ByVal value As String)
            Me._Direccion_U = value
        End Set
    End Property
    Public Property Cod_Pais_R() As Integer
        Get
            Return Me._Cod_Pais_R
        End Get
        Set(ByVal value As Integer)
            Me._Cod_Pais_R = value
        End Set
    End Property
    Public Property Ciudad_ID_R() As Integer
        Get
            Return Me._Ciudad_ID_R
        End Get
        Set(ByVal value As Integer)
            Me._Ciudad_ID_R = value
        End Set
    End Property
    Public Property TypeDocument_ID_R() As Integer
        Get
            Return Me._TypeDocument_ID_R
        End Get
        Set(ByVal value As Integer)
            Me._TypeDocument_ID_R = value
        End Set
    End Property
    Public Property Document_ID_R() As Long
        Get
            Return Me._Document_ID_R
        End Get
        Set(ByVal value As Long)
            Me._Document_ID_R = value
        End Set
    End Property
    Public Property Surcursal_ID() As Integer
        Get
            Return Me._Surcursal_ID
        End Get
        Set(ByVal value As Integer)
            Me._Surcursal_ID = value
        End Set
    End Property
    Public Property Cod_Moneda_ID() As Integer
        Get
            Return Me._Cod_Moneda_ID
        End Get
        Set(ByVal value As Integer)
            Me._Cod_Moneda_ID = value
        End Set
    End Property
    Public Property Valor_Bien() As Long
        Get
            Return Me._Valor_Bien
        End Get
        Set(ByVal value As Long)
            Me._Valor_Bien = value
        End Set
    End Property
    Public Property Val_Op_Compra() As Long
        Get
            Return Me._Val_Op_Compra
        End Get
        Set(ByVal value As Long)
            Me._Val_Op_Compra = value
        End Set
    End Property
    Public Property CompraBien() As String
        Get
            Return Me._CompraBien
        End Get
        Set(ByVal value As String)
            Me._CompraBien = value
        End Set
    End Property
    Public Property Asegurado() As String
        Get
            Return Me._Asegurado
        End Get
        Set(ByVal value As String)
            Me._Asegurado = value
        End Set
    End Property
    Public Property EstadoActivo() As String
        Get
            Return Me._EstadoActivo
        End Get
        Set(ByVal value As String)
            Me._EstadoActivo = value
        End Set
    End Property
    Public Property TipoAdministracion() As String
        Get
            Return Me._TipoAdministracion
        End Get
        Set(ByVal value As String)
            Me._TipoAdministracion = value
        End Set
    End Property
    Public Property TipoEscritura() As String
        Get
            Return Me._TipoEscritura
        End Get
        Set(ByVal value As String)
            Me._TipoEscritura = value
        End Set
    End Property
    Public Property N_Escritura() As String
        Get
            Return Me._N_Escritura
        End Get
        Set(ByVal value As String)
            Me._N_Escritura = value
        End Set
    End Property
    Public Property FechaConta_Recibo() As String
        Get
            Return Me._FechaConta_Recibo
        End Get
        Set(ByVal value As String)
            Me._FechaConta_Recibo = value
        End Set
    End Property
    Public Property FechaConta_Retiro() As String
        Get
            Return Me._FechaConta_Retiro
        End Get
        Set(ByVal value As String)
            Me._FechaConta_Retiro = value
        End Set
    End Property
    Public Property TypeDocument_ID_T() As Integer
        Get
            Return Me._TypeDocument_ID_T
        End Get
        Set(ByVal value As Integer)
            Me._TypeDocument_ID_T = value
        End Set
    End Property
    Public Property Document_ID_T() As Long
        Get
            Return Me._Document_ID_T
        End Get
        Set(ByVal value As Long)
            Me._Document_ID_T = value
        End Set
    End Property
    Public Property EscrituraTrans() As String
        Get
            Return Me._EscrituraTrans
        End Get
        Set(ByVal value As String)
            Me._EscrituraTrans = value
        End Set
    End Property
    Public Property FechaTrans() As String
        Get
            Return Me._FechaTrans
        End Get
        Set(ByVal value As String)
            Me._FechaTrans = value
        End Set
    End Property
    Public Property Secuencia_Cargue() As Long
        Get
            Return Me._Secuencia_Cargue
        End Get
        Set(ByVal value As Long)
            Me._Secuencia_Cargue = value
        End Set
    End Property

    Public Property TypeDocument_ID_Not() As Integer
        Get
            Return Me._TypeDocument_ID_Not
        End Get
        Set(ByVal value As Integer)
            Me._TypeDocument_ID_Not = value
        End Set
    End Property
    Public Property Document_ID_Not() As Long
        Get
            Return Me._Document_ID_Not
        End Get
        Set(ByVal value As Long)
            Me._Document_ID_Not = value
        End Set
    End Property
    Public Property Num_Poliza() As String
        Get
            Return Me._Num_Poliza
        End Get
        Set(ByVal value As String)
            Me._Num_Poliza = value
        End Set
    End Property
    Public Property N_Notaria() As Integer
        Get
            Return Me._N_Notaria
        End Get
        Set(ByVal value As Integer)
            Me._N_Notaria = value
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
