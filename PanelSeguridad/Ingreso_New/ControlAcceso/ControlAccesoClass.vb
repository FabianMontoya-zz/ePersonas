Public Class ControlAccesoClass
#Region "campos"
    Private _Index As Long
    Private _Nit_ID As String
    Private _TypeDocument_ID As Integer
    Private _Document_ID As Long
    Private _Tarjeta_ID As String
    Private _Nit_ID_EmpVisita As String
    Private _PuertaAcceso_ID As Integer
    Private _Area_ID As String
    Private _TypeDocument_ID_Per_Encargada As Integer
    Private _Document_ID_Per_Encargada As Long

    Private _FechaEntrada As String
    Private _HoraEntrada As String
    Private _Tiempo_PlanVisita As String
    Private _Fecha_PlanSalida As String
    Private _Hora_PlanSalida As String
    Private _Fecha_RealSalida As String
    Private _Hora_RealSalida As String
    Private _Estado As String
    Private _IngAutomatico_Porteria As String
    Private _TipoPersona As String
    Private _Num_UnicoVisita As String

    Private _Usuario_Ingreso As String
    Private _FechaIngreso As String
    Private _Usuario_Salida As String
    Private _FechaSalida As String

    Private _DescripPuertaAcceso As String
    Private _DescripAreaAcceso As String
    Private _DescripPersona_Enc As String

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
    Public Property PuertaAcceso_ID() As Integer
        Get
            Return Me._PuertaAcceso_ID
        End Get
        Set(ByVal value As Integer)
            Me._PuertaAcceso_ID = value
        End Set
    End Property
    Public Property Area_ID() As String
        Get
            Return Me._Area_ID
        End Get
        Set(ByVal value As String)
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

    Public Property FechaEntrada() As String
        Get
            Return Me._FechaEntrada
        End Get
        Set(ByVal value As String)
            Me._FechaEntrada = value
        End Set
    End Property
    Public Property HoraEntrada() As String
        Get
            Return Me._HoraEntrada
        End Get
        Set(ByVal value As String)
            Me._HoraEntrada = value
        End Set
    End Property
    Public Property Tiempo_PlanVisita() As String
        Get
            Return Me._Tiempo_PlanVisita
        End Get
        Set(ByVal value As String)
            Me._Tiempo_PlanVisita = value
        End Set
    End Property
    Public Property Fecha_PlanSalida() As String
        Get
            Return Me._Fecha_PlanSalida
        End Get
        Set(ByVal value As String)
            Me._Fecha_PlanSalida = value
        End Set
    End Property
    Public Property Hora_PlanSalida() As String
        Get
            Return Me._Hora_PlanSalida
        End Get
        Set(ByVal value As String)
            Me._Hora_PlanSalida = value
        End Set
    End Property
    Public Property Fecha_RealSalida() As String
        Get
            Return Me._Fecha_RealSalida
        End Get
        Set(ByVal value As String)
            Me._Fecha_RealSalida = value
        End Set
    End Property
    Public Property Hora_RealSalida() As String
        Get
            Return Me._Hora_RealSalida
        End Get
        Set(ByVal value As String)
            Me._Hora_RealSalida = value
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
    Public Property TipoPersona() As String
        Get
            Return Me._TipoPersona
        End Get
        Set(ByVal value As String)
            Me._TipoPersona = value
        End Set
    End Property
    Public Property Num_UnicoVisita() As String
        Get
            Return Me._Num_UnicoVisita
        End Get
        Set(ByVal value As String)
            Me._Num_UnicoVisita = value
        End Set
    End Property

    Public Property Usuario_Ingreso() As String
        Get
            Return Me._Usuario_Ingreso
        End Get
        Set(ByVal value As String)
            Me._Usuario_Ingreso = value
        End Set
    End Property
    Public Property FechaIngreso() As String
        Get
            Return Me._FechaIngreso
        End Get
        Set(ByVal value As String)
            Me._FechaIngreso = value
        End Set
    End Property
    Public Property Usuario_Salida() As String
        Get
            Return Me._Usuario_Salida
        End Get
        Set(ByVal value As String)
            Me._Usuario_Salida = value
        End Set
    End Property
    Public Property FechaSalida() As String
        Get
            Return Me._FechaSalida
        End Get
        Set(ByVal value As String)
            Me._FechaSalida = value
        End Set
    End Property

    Public Property DescripPuertaAcceso() As String
        Get
            Return Me._DescripPuertaAcceso
        End Get
        Set(ByVal value As String)
            Me._DescripPuertaAcceso = value
        End Set
    End Property
    Public Property DescripAreaAcceso() As String
        Get
            Return Me._DescripAreaAcceso
        End Get
        Set(ByVal value As String)
            Me._DescripAreaAcceso = value
        End Set
    End Property
    Public Property DescripPersona_Enc() As String
        Get
            Return Me._DescripPersona_Enc
        End Get
        Set(ByVal value As String)
            Me._DescripPersona_Enc = value
        End Set
    End Property
#End Region

End Class
