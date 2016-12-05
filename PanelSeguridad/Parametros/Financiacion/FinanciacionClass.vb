Public Class FinanciacionClass
#Region "campos"
    Private _Index As Integer
    Private _Index_Tasa As Integer
    Private _Index_Detalles_Tasa As Integer
    Private _Nit_ID As String
    Private _Financiacion_ID As Integer
    Private _Descripcion As String
    Private _Unidad_Tiempo As String
    Private _Calculo As String

    Private _Calculo_Cuota_Final As String
    Private _Modalidad_Pago As String
    Private _Periodo_Pago As String
    Private _Tipo_Cuota As String
    Private _Formula_FK As Integer

    Private _Base_Calculo As String
    Private _Tasa_FK As Integer
    Private _Tipo_Tasa As String
    Private _Puntos_Adicionales As Double
    Private _Tasa_Mora_FK As Integer

    Private _Tasa_Usura_FK As Integer
    Private _Ciclo_Cobro_FK As Integer

    Private _UsuarioCreacion As String
    Private _FechaCreacion As String
    Private _UsuarioActualizacion As String
    Private _FechaActualizacion As String

    Private _DescripEmpresa As String
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
    Public Property Financiacion_ID() As Integer
        Get
            Return Me._Financiacion_ID
        End Get
        Set(ByVal value As Integer)
            Me._Financiacion_ID = value
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
    Public Property Unidad_Tiempo() As String
        Get
            Return Me._Unidad_Tiempo
        End Get
        Set(ByVal value As String)
            Me._Unidad_Tiempo = value
        End Set
    End Property
    Public Property Calculo() As String
        Get
            Return Me._Calculo
        End Get
        Set(ByVal value As String)
            Me._Calculo = value
        End Set
    End Property
    Public Property Calculo_Cuota_Final() As String
        Get
            Return Me._Calculo_Cuota_Final
        End Get
        Set(ByVal value As String)
            Me._Calculo_Cuota_Final = value
        End Set
    End Property
    Public Property Modalidad_Pago() As String
        Get
            Return Me._Modalidad_Pago
        End Get
        Set(ByVal value As String)
            Me._Modalidad_Pago = value
        End Set
    End Property
    Public Property Periodo_Pago() As String
        Get
            Return Me._Periodo_Pago
        End Get
        Set(ByVal value As String)
            Me._Periodo_Pago = value
        End Set
    End Property
    Public Property Tipo_Cuota() As String
        Get
            Return Me._Tipo_Cuota
        End Get
        Set(ByVal value As String)
            Me._Tipo_Cuota = value
        End Set
    End Property
    Public Property Formula_FK() As Integer
        Get
            Return Me._Formula_FK
        End Get
        Set(ByVal value As Integer)
            Me._Formula_FK = value
        End Set
    End Property
    Public Property Base_Calculo() As String
        Get
            Return Me._Base_Calculo
        End Get
        Set(ByVal value As String)
            Me._Base_Calculo = value
        End Set
    End Property
    Public Property Tasa_FK() As Integer
        Get
            Return Me._Tasa_FK
        End Get
        Set(ByVal value As Integer)
            Me._Tasa_FK = value
        End Set
    End Property
    Public Property Tipo_Tasa() As String
        Get
            Return Me._Tipo_Tasa
        End Get
        Set(ByVal value As String)
            Me._Tipo_Tasa = value
        End Set
    End Property
    Public Property Puntos_Adicionales() As Double
        Get
            Return Me._Puntos_Adicionales
        End Get
        Set(ByVal value As Double)
            Me._Puntos_Adicionales = value
        End Set
    End Property
    Public Property Tasa_Mora_FK() As Integer
        Get
            Return Me._Tasa_Mora_FK
        End Get
        Set(ByVal value As Integer)
            Me._Tasa_Mora_FK = value
        End Set
    End Property
    Public Property Tasa_Usura_FK() As Integer
        Get
            Return Me._Tasa_Usura_FK
        End Get
        Set(ByVal value As Integer)
            Me._Tasa_Usura_FK = value
        End Set
    End Property
    Public Property Ciclo_Cobro_FK() As Integer
        Get
            Return Me._Ciclo_Cobro_FK
        End Get
        Set(ByVal value As Integer)
            Me._Ciclo_Cobro_FK = value
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
#End Region
End Class
