Public Class PaisesClass
#Region "Campos"
    Private _Index As Long
    Private _Cod As Integer
    Private _Name As String
    Private _Moneda As String
    Private _SWIFT As String
    Private _Est_LUN As String
    Private _Est_MAR As String
    Private _Est_MIE As String
    Private _Est_JUE As String
    Private _Est_VIE As String
    Private _Est_SAB As String
    Private _Est_DOM As String
    Private _HoI1_LUN As String
    Private _HoF1_LUN As String
    Private _HoI2_LUN As String
    Private _HoF2_LUN As String
    Private _HoI3_LUN As String
    Private _HoF3_LUN As String
    Private _HoI4_LUN As String
    Private _HoF4_LUN As String
    Private _HoI1_MAR As String
    Private _HoF1_MAR As String
    Private _HoI2_MAR As String
    Private _HoF2_MAR As String
    Private _HoI3_MAR As String
    Private _HoF3_MAR As String
    Private _HoI4_MAR As String
    Private _HoF4_MAR As String
    Private _HoI1_MIE As String
    Private _HoF1_MIE As String
    Private _HoI2_MIE As String
    Private _HoF2_MIE As String
    Private _HoI3_MIE As String
    Private _HoF3_MIE As String
    Private _HoI4_MIE As String
    Private _HoF4_MIE As String
    Private _HoI1_JUE As String
    Private _HoF1_JUE As String
    Private _HoI2_JUE As String
    Private _HoF2_JUE As String
    Private _HoI3_JUE As String
    Private _HoF3_JUE As String
    Private _HoI4_JUE As String
    Private _HoF4_JUE As String
    Private _HoI1_VIE As String
    Private _HoF1_VIE As String
    Private _HoI2_VIE As String
    Private _HoF2_VIE As String
    Private _HoI3_VIE As String
    Private _HoF3_VIE As String
    Private _HoI4_VIE As String
    Private _HoF4_VIE As String
    Private _HoI1_SAB As String
    Private _HoF1_SAB As String
    Private _HoI2_SAB As String
    Private _HoF2_SAB As String
    Private _HoI3_SAB As String
    Private _HoF3_SAB As String
    Private _HoI4_SAB As String
    Private _HoF4_SAB As String
    Private _HoI1_DOM As String
    Private _HoF1_DOM As String
    Private _HoI2_DOM As String
    Private _HoF2_DOM As String
    Private _HoI3_DOM As String
    Private _HoF3_DOM As String
    Private _HoI4_DOM As String
    Private _HoF4_DOM As String
    Private _FechaActualizacion As String
    Private _Usuario As String
    Private _IndexInicial As Long
    Private _IndexFinal As Long

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
    Public Property SWIFT As String
        Get
            Return Me._SWIFT
        End Get
        Set(ByVal value As String)
            Me._SWIFT = value
        End Set
    End Property
    Public Property Est_LUN As String
        Get
            Return Me._Est_LUN
        End Get
        Set(ByVal value As String)
            Me._Est_LUN = value
        End Set
    End Property
    Public Property Est_MAR As String
        Get
            Return Me._Est_MAR
        End Get
        Set(ByVal value As String)
            Me._Est_MAR = value
        End Set
    End Property
    Public Property Est_MIE As String
        Get
            Return Me._Est_MIE
        End Get
        Set(ByVal value As String)
            Me._Est_MIE = value
        End Set
    End Property
    Public Property Est_JUE As String
        Get
            Return Me._Est_JUE
        End Get
        Set(ByVal value As String)
            Me._Est_JUE = value
        End Set
    End Property
    Public Property Est_VIE As String
        Get
            Return Me._Est_VIE
        End Get
        Set(ByVal value As String)
            Me._Est_VIE = value
        End Set
    End Property
    Public Property Est_SAB As String
        Get
            Return Me._Est_SAB
        End Get
        Set(ByVal value As String)
            Me._Est_SAB = value
        End Set
    End Property
    Public Property Est_DOM As String
        Get
            Return Me._Est_DOM
        End Get
        Set(ByVal value As String)
            Me._Est_DOM = value
        End Set
    End Property
    Public Property HoI1_LUN As String
        Get
            Return Me._HoI1_LUN
        End Get
        Set(ByVal value As String)
            Me._HoI1_LUN = value
        End Set
    End Property
    Public Property HoF1_LUN As String
        Get
            Return Me._HoF1_LUN
        End Get
        Set(ByVal value As String)
            Me._HoF1_LUN = value
        End Set
    End Property
    Public Property HoI2_LUN As String
        Get
            Return Me._HoI2_LUN
        End Get
        Set(ByVal value As String)
            Me._HoI2_LUN = value
        End Set
    End Property
    Public Property HoF2_LUN As String
        Get
            Return Me._HoF2_LUN
        End Get
        Set(ByVal value As String)
            Me._HoF2_LUN = value
        End Set
    End Property
    Public Property HoI3_LUN As String
        Get
            Return Me._HoI3_LUN
        End Get
        Set(ByVal value As String)
            Me._HoI3_LUN = value
        End Set
    End Property
    Public Property HoF3_LUN As String
        Get
            Return Me._HoF3_LUN
        End Get
        Set(ByVal value As String)
            Me._HoF3_LUN = value
        End Set
    End Property
    Public Property HoI4_LUN As String
        Get
            Return Me._HoI4_LUN
        End Get
        Set(ByVal value As String)
            Me._HoI4_LUN = value
        End Set
    End Property
    Public Property HoF4_LUN As String
        Get
            Return Me._HoF4_LUN
        End Get
        Set(ByVal value As String)
            Me._HoF4_LUN = value
        End Set
    End Property
    Public Property HoI1_MAR As String
        Get
            Return Me._HoI1_MAR
        End Get
        Set(ByVal value As String)
            Me._HoI1_MAR = value
        End Set
    End Property
    Public Property HoF1_MAR As String
        Get
            Return Me._HoF1_MAR
        End Get
        Set(ByVal value As String)
            Me._HoF1_MAR = value
        End Set
    End Property
    Public Property HoI2_MAR As String
        Get
            Return Me._HoI2_MAR
        End Get
        Set(ByVal value As String)
            Me._HoI2_MAR = value
        End Set
    End Property
    Public Property HoF2_MAR As String
        Get
            Return Me._HoF2_MAR
        End Get
        Set(ByVal value As String)
            Me._HoF2_MAR = value
        End Set
    End Property
    Public Property HoI3_MAR As String
        Get
            Return Me._HoI3_MAR
        End Get
        Set(ByVal value As String)
            Me._HoI3_MAR = value
        End Set
    End Property
    Public Property HoF3_MAR As String
        Get
            Return Me._HoF3_MAR
        End Get
        Set(ByVal value As String)
            Me._HoF3_MAR = value
        End Set
    End Property
    Public Property HoI4_MAR As String
        Get
            Return Me._HoI4_MAR
        End Get
        Set(ByVal value As String)
            Me._HoI4_MAR = value
        End Set
    End Property
    Public Property HoF4_MAR As String
        Get
            Return Me._HoF4_MAR
        End Get
        Set(ByVal value As String)
            Me._HoF4_MAR = value
        End Set
    End Property
    Public Property HoI1_MIE As String
        Get
            Return Me._HoI1_MIE
        End Get
        Set(ByVal value As String)
            Me._HoI1_MIE = value
        End Set
    End Property
    Public Property HoF1_MIE As String
        Get
            Return Me._HoF1_MIE
        End Get
        Set(ByVal value As String)
            Me._HoF1_MIE = value
        End Set
    End Property
    Public Property HoI2_MIE As String
        Get
            Return Me._HoI2_MIE
        End Get
        Set(ByVal value As String)
            Me._HoI2_MIE = value
        End Set
    End Property
    Public Property HoF2_MIE As String
        Get
            Return Me._HoF2_MIE
        End Get
        Set(ByVal value As String)
            Me._HoF2_MIE = value
        End Set
    End Property
    Public Property HoI3_MIE As String
        Get
            Return Me._HoI3_MIE
        End Get
        Set(ByVal value As String)
            Me._HoI3_MIE = value
        End Set
    End Property
    Public Property HoF3_MIE As String
        Get
            Return Me._HoF3_MIE
        End Get
        Set(ByVal value As String)
            Me._HoF3_MIE = value
        End Set
    End Property
    Public Property HoI4_MIE As String
        Get
            Return Me._HoI4_MIE
        End Get
        Set(ByVal value As String)
            Me._HoI4_MIE = value
        End Set
    End Property
    Public Property HoF4_MIE As String
        Get
            Return Me._HoF4_MIE
        End Get
        Set(ByVal value As String)
            Me._HoF4_MIE = value
        End Set
    End Property
    Public Property HoI1_JUE As String
        Get
            Return Me._HoI1_JUE
        End Get
        Set(ByVal value As String)
            Me._HoI1_JUE = value
        End Set
    End Property
    Public Property HoF1_JUE As String
        Get
            Return Me._HoF1_JUE
        End Get
        Set(ByVal value As String)
            Me._HoF1_JUE = value
        End Set
    End Property
    Public Property HoI2_JUE As String
        Get
            Return Me._HoI2_JUE
        End Get
        Set(ByVal value As String)
            Me._HoI2_JUE = value
        End Set
    End Property
    Public Property HoF2_JUE As String
        Get
            Return Me._HoF2_JUE
        End Get
        Set(ByVal value As String)
            Me._HoF2_JUE = value
        End Set
    End Property
    Public Property HoI3_JUE As String
        Get
            Return Me._HoI3_JUE
        End Get
        Set(ByVal value As String)
            Me._HoI3_JUE = value
        End Set
    End Property
    Public Property HoF3_JUE As String
        Get
            Return Me._HoF3_JUE
        End Get
        Set(ByVal value As String)
            Me._HoF3_JUE = value
        End Set
    End Property
    Public Property HoI4_JUE As String
        Get
            Return Me._HoI4_JUE
        End Get
        Set(ByVal value As String)
            Me._HoI4_JUE = value
        End Set
    End Property
    Public Property HoF4_JUE As String
        Get
            Return Me._HoF4_JUE
        End Get
        Set(ByVal value As String)
            Me._HoF4_JUE = value
        End Set
    End Property
    Public Property HoI1_VIE As String
        Get
            Return Me._HoI1_VIE
        End Get
        Set(ByVal value As String)
            Me._HoI1_VIE = value
        End Set
    End Property
    Public Property HoF1_VIE As String
        Get
            Return Me._HoF1_VIE
        End Get
        Set(ByVal value As String)
            Me._HoF1_VIE = value
        End Set
    End Property
    Public Property HoI2_VIE As String
        Get
            Return Me._HoI2_VIE
        End Get
        Set(ByVal value As String)
            Me._HoI2_VIE = value
        End Set
    End Property
    Public Property HoF2_VIE As String
        Get
            Return Me._HoF2_VIE
        End Get
        Set(ByVal value As String)
            Me._HoF2_VIE = value
        End Set
    End Property
    Public Property HoI3_VIE As String
        Get
            Return Me._HoI3_VIE
        End Get
        Set(ByVal value As String)
            Me._HoI3_VIE = value
        End Set
    End Property
    Public Property HoF3_VIE As String
        Get
            Return Me._HoF3_VIE
        End Get
        Set(ByVal value As String)
            Me._HoF3_VIE = value
        End Set
    End Property
    Public Property HoI4_VIE As String
        Get
            Return Me._HoI4_VIE
        End Get
        Set(ByVal value As String)
            Me._HoI4_VIE = value
        End Set
    End Property
    Public Property HoF4_VIE As String
        Get
            Return Me._HoF4_VIE
        End Get
        Set(ByVal value As String)
            Me._HoF4_VIE = value
        End Set
    End Property
    Public Property HoI1_SAB As String
        Get
            Return Me._HoI1_SAB
        End Get
        Set(ByVal value As String)
            Me._HoI1_SAB = value
        End Set
    End Property
    Public Property HoF1_SAB As String
        Get
            Return Me._HoF1_SAB
        End Get
        Set(ByVal value As String)
            Me._HoF1_SAB = value
        End Set
    End Property
    Public Property HoI2_SAB As String
        Get
            Return Me._HoI2_SAB
        End Get
        Set(ByVal value As String)
            Me._HoI2_SAB = value
        End Set
    End Property
    Public Property HoF2_SAB As String
        Get
            Return Me._HoF2_SAB
        End Get
        Set(ByVal value As String)
            Me._HoF2_SAB = value
        End Set
    End Property
    Public Property HoI3_SAB As String
        Get
            Return Me._HoI3_SAB
        End Get
        Set(ByVal value As String)
            Me._HoI3_SAB = value
        End Set
    End Property
    Public Property HoF3_SAB As String
        Get
            Return Me._HoF3_SAB
        End Get
        Set(ByVal value As String)
            Me._HoF3_SAB = value
        End Set
    End Property
    Public Property HoI4_SAB As String
        Get
            Return Me._HoI4_SAB
        End Get
        Set(ByVal value As String)
            Me._HoI4_SAB = value
        End Set
    End Property
    Public Property HoF4_SAB As String
        Get
            Return Me._HoF4_SAB
        End Get
        Set(ByVal value As String)
            Me._HoF4_SAB = value
        End Set
    End Property
    Public Property HoI1_DOM As String
        Get
            Return Me._HoI1_DOM
        End Get
        Set(ByVal value As String)
            Me._HoI1_DOM = value
        End Set
    End Property
    Public Property HoF1_DOM As String
        Get
            Return Me._HoF1_DOM
        End Get
        Set(ByVal value As String)
            Me._HoF1_DOM = value
        End Set
    End Property
    Public Property HoI2_DOM As String
        Get
            Return Me._HoI2_DOM
        End Get
        Set(ByVal value As String)
            Me._HoI2_DOM = value
        End Set
    End Property
    Public Property HoF2_DOM As String
        Get
            Return Me._HoF2_DOM
        End Get
        Set(ByVal value As String)
            Me._HoF2_DOM = value
        End Set
    End Property
    Public Property HoI3_DOM As String
        Get
            Return Me._HoI3_DOM
        End Get
        Set(ByVal value As String)
            Me._HoI3_DOM = value
        End Set
    End Property
    Public Property HoF3_DOM As String
        Get
            Return Me._HoF3_DOM
        End Get
        Set(ByVal value As String)
            Me._HoF3_DOM = value
        End Set
    End Property
    Public Property HoI4_DOM As String
        Get
            Return Me._HoI4_DOM
        End Get
        Set(ByVal value As String)
            Me._HoI4_DOM = value
        End Set
    End Property
    Public Property HoF4_DOM As String
        Get
            Return Me._HoF4_DOM
        End Get
        Set(ByVal value As String)
            Me._HoF4_DOM = value
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
    Public Property Usuario() As String
        Get
            Return Me._Usuario
        End Get
        Set(ByVal value As String)
            Me._Usuario = value
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
    Public Property IndexInicial() As Long
        Get
            Return Me._IndexInicial
        End Get
        Set(ByVal value As Long)
            Me._IndexInicial = value
        End Set
    End Property
    Public Property IndexFinal() As Long
        Get
            Return Me._IndexFinal
        End Get
        Set(ByVal value As Long)
            Me._IndexFinal = value
        End Set
    End Property


#End Region
End Class
