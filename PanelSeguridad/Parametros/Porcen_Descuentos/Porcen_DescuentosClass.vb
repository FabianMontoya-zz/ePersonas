Public Class Porcen_DescuentosClass
#Region "Campos"
    Private _Cod_ID As Integer
    Private _Ciudad_ID As Integer
    Private _Impuesto_Gasto_ID As Integer
    Private _RangoInicial_ID As String
    Private _RangoFinal_ID As String
    Private _Type_Limit As String
    Private _Limit_Min As String
    Private _Limit_Max As String

    Private _MesDia_1 As String
    Private _MesDia_2 As String
    Private _MesDia_3 As String
    Private _MesDia_4 As String
    Private _Porcentaje_1 As String
    Private _Porcentaje_2 As String
    Private _Porcentaje_3 As String
    Private _Porcentaje_4 As String
    Private _Valor_Vencimiento_1 As Integer
    Private _Valor_Vencimiento_2 As Integer
    Private _Valor_Vencimiento_3 As Integer
    Private _Valor_Vencimiento_4 As Integer
    Private _FechaActualizacion As String
    Private _Usuario As String
    Private _DescripCod As String
    Private _DescripCiudad As String
    Private _DescripImpuesto_Gasto As String
    Private _DescripTipo As String

    
#End Region

#Region "Propiedades"
    Public Property Cod_ID() As Integer
        Get
            Return Me._Cod_ID
        End Get
        Set(ByVal value As Integer)
            Me._Cod_ID = value
        End Set
    End Property
    Public Property Ciudad_ID() As Integer
        Get
            Return Me._Ciudad_ID
        End Get
        Set(ByVal value As Integer)
            Me._Ciudad_ID = value
        End Set
    End Property
    Public Property Impuesto_Gasto_ID() As Integer
        Get
            Return Me._Impuesto_Gasto_ID
        End Get
        Set(ByVal value As Integer)
            Me._Impuesto_Gasto_ID = value
        End Set
    End Property
    Public Property RangoInicial_ID() As String
        Get
            Return Me._RangoInicial_ID
        End Get
        Set(ByVal value As String)
            Me._RangoInicial_ID = value
        End Set
    End Property
    Public Property RangoFinal_ID() As String
        Get
            Return Me._RangoFinal_ID
        End Get
        Set(ByVal value As String)
            Me._RangoFinal_ID = value
        End Set
    End Property
    Public Property Type_Limit() As String
        Get
            Return Me._Type_Limit
        End Get
        Set(ByVal value As String)
            Me._Type_Limit = value
        End Set
    End Property
    Public Property Limit_Min() As String
        Get
            Return Me._Limit_Min
        End Get
        Set(ByVal value As String)
            Me._Limit_Min = value
        End Set
    End Property
    Public Property Limit_Max() As String
        Get
            Return Me._Limit_Max
        End Get
        Set(ByVal value As String)
            Me._Limit_Max = value
        End Set
    End Property

    Public Property MesDia_1() As String
        Get
            Return Me._MesDia_1
        End Get
        Set(ByVal value As String)
            Me._MesDia_1 = value
        End Set
    End Property
    Public Property MesDia_2() As String
        Get
            Return Me._MesDia_2
        End Get
        Set(ByVal value As String)
            Me._MesDia_2 = value
        End Set
    End Property
    Public Property MesDia_3() As String
        Get
            Return Me._MesDia_3
        End Get
        Set(ByVal value As String)
            Me._MesDia_3 = value
        End Set
    End Property
    Public Property MesDia_4() As String
        Get
            Return Me._MesDia_4
        End Get
        Set(ByVal value As String)
            Me._MesDia_4 = value
        End Set
    End Property
    Public Property Porcentaje_1() As String
        Get
            Return Me._Porcentaje_1
        End Get
        Set(ByVal value As String)
            Me._Porcentaje_1 = value
        End Set
    End Property
    Public Property Porcentaje_2() As String
        Get
            Return Me._Porcentaje_2
        End Get
        Set(ByVal value As String)
            Me._Porcentaje_2 = value
        End Set
    End Property
    Public Property Porcentaje_3() As String
        Get
            Return Me._Porcentaje_3
        End Get
        Set(ByVal value As String)
            Me._Porcentaje_3 = value
        End Set
    End Property
    Public Property Porcentaje_4() As String
        Get
            Return Me._Porcentaje_4
        End Get
        Set(ByVal value As String)
            Me._Porcentaje_4 = value
        End Set
    End Property
    Public Property Valor_Vencimiento_1() As Integer
        Get
            Return Me._Valor_Vencimiento_1
        End Get
        Set(ByVal value As Integer)
            Me._Valor_Vencimiento_1 = value
        End Set
    End Property
    Public Property Valor_Vencimiento_2() As Integer
        Get
            Return Me._Valor_Vencimiento_2
        End Get
        Set(ByVal value As Integer)
            Me._Valor_Vencimiento_2 = value
        End Set
    End Property
    Public Property Valor_Vencimiento_3() As Integer
        Get
            Return Me._Valor_Vencimiento_3
        End Get
        Set(ByVal value As Integer)
            Me._Valor_Vencimiento_3 = value
        End Set
    End Property
    Public Property Valor_Vencimiento_4() As Integer
        Get
            Return Me._Valor_Vencimiento_4
        End Get
        Set(ByVal value As Integer)
            Me._Valor_Vencimiento_4 = value
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

    Public Property DescripCod() As String
        Get
            Return Me._DescripCod
        End Get
        Set(ByVal value As String)
            Me._DescripCod = value
        End Set
    End Property
    Public Property DescripCiudad() As String
        Get
            Return Me._DescripCiudad
        End Get
        Set(ByVal value As String)
            Me._DescripCiudad = value
        End Set
    End Property
    Public Property DescripImpuesto_Gasto() As String
        Get
            Return Me._DescripImpuesto_Gasto
        End Get
        Set(ByVal value As String)
            Me._DescripImpuesto_Gasto = value
        End Set
    End Property
    Public Property DescripTipo() As String
        Get
            Return Me._DescripTipo
        End Get
        Set(ByVal value As String)
            Me._DescripTipo = value
        End Set
    End Property

   
#End Region
End Class
