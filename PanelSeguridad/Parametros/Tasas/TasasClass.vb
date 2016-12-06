Public Class TasasClass
#Region "campos"
    'Tasas
    Private _Index As Integer
    Private _Nit_ID As String
    Private _Codigo_ID As Integer
    Private _Descripcion As String
    Private _Tipo As String
    Private _Periodo As String
    'Detalles_Tasas
    Private _Fecha_Efectiva As String
    Private _Tasa_Base As Integer
    Private _Puntos_Adicionales As Double
    Private _Nominal_Anual As Double
    Private _Equivalencia_Efectiva As Double
    Private _Factor As Double
    'Auditoria
    Private _UsuarioCreacion As String
    Private _FechaCreacion As String
    Private _UsuarioActualizacion As String
    Private _FechaActualizacion As String
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
    Public Property Codigo_ID() As Integer
        Get
            Return Me._Codigo_ID
        End Get
        Set(ByVal value As Integer)
            Me._Codigo_ID = value
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
    Public Property Tipo() As String
        Get
            Return Me._Tipo
        End Get
        Set(ByVal value As String)
            Me._Tipo = value
        End Set
    End Property
    Public Property Periodo() As String
        Get
            Return Me._Periodo
        End Get
        Set(ByVal value As String)
            Me._Periodo = value
        End Set
    End Property
    '------
    Public Property Fecha_Efectiva() As String
        Get
            Return Me._Fecha_Efectiva
        End Get
        Set(ByVal value As String)
            Me._Fecha_Efectiva = value
        End Set
    End Property
    Public Property Tasa_Base() As Integer
        Get
            Return Me._Tasa_Base
        End Get
        Set(ByVal value As Integer)
            Me._Tasa_Base = value
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
    Public Property Nominal_Anual() As Double
        Get
            Return Me._Nominal_Anual
        End Get
        Set(ByVal value As Double)
            Me._Nominal_Anual = value
        End Set
    End Property
    Public Property Equivalencia_Efectiva() As Double
        Get
            Return Me._Equivalencia_Efectiva
        End Get
        Set(ByVal value As Double)
            Me._Equivalencia_Efectiva = value
        End Set
    End Property
    Public Property Factor() As Double
        Get
            Return Me._Factor
        End Get
        Set(ByVal value As Double)
            Me._Factor = value
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
#End Region
End Class
