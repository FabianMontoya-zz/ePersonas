Public Class C_ContratoClass
#Region "campos"

    Private _Nit_ID As String
    Private _Sucursal_ID As Integer
    Private _Colocacion_ID As String
    Private _Descripcion As String
    Private _TypeDocument_ID As Integer
    Private _Document_ID As Long


    Private _Moneda_ID As Integer
    Private _Producto_ID As Integer
    Private _Condi_Financiacion_ID As Integer
    Private _Unidad_Tiempo_ID As String
    Private _Fecha_Apertura As String

    Private _Plazo As Long
    Private _Ciclo_ID As Integer
    Private _Base_Calculo_ID As Integer
    Private _Direccion_Correspondiente As Integer
    Private _Valor_Total As Long
    Private _Valor_Financiado As Long
    Private _Valor_Opc_Compra As Long

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
    Public Property Sucursal_ID() As Integer
        Get
            Return Me._Sucursal_ID
        End Get
        Set(ByVal value As Integer)
            Me._Sucursal_ID = value
        End Set
    End Property
    Public Property Colocacion_ID() As String
        Get
            Return Me._Colocacion_ID
        End Get
        Set(ByVal value As String)
            Me._Colocacion_ID = value
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
    Public Property Moneda_ID() As Integer
        Get
            Return Me._Moneda_ID
        End Get
        Set(ByVal value As Integer)
            Me._Moneda_ID = value
        End Set
    End Property
    Public Property Producto_ID() As Integer
        Get
            Return Me._Producto_ID
        End Get
        Set(ByVal value As Integer)
            Me._Producto_ID = value
        End Set
    End Property
    Public Property Condi_Financiacion_ID() As Integer
        Get
            Return Me._Condi_Financiacion_ID
        End Get
        Set(ByVal value As Integer)
            Me._Condi_Financiacion_ID = value
        End Set
    End Property
    Public Property Unidad_Tiempo_ID() As String
        Get
            Return Me._Unidad_Tiempo_ID
        End Get
        Set(ByVal value As String)
            Me._Unidad_Tiempo_ID = value
        End Set
    End Property
    Public Property Fecha_Apertura() As String
        Get
            Return Me._Fecha_Apertura
        End Get
        Set(ByVal value As String)
            Me._Fecha_Apertura = value
        End Set
    End Property
    Public Property Plazo() As Long
        Get
            Return Me._Plazo
        End Get
        Set(ByVal value As Long)
            Me._Plazo = value
        End Set
    End Property
    Public Property Ciclo_ID() As Integer
        Get
            Return Me._Ciclo_ID
        End Get
        Set(ByVal value As Integer)
            Me._Ciclo_ID = value
        End Set
    End Property
    Public Property Base_Calculo_ID() As Integer
        Get
            Return Me._Base_Calculo_ID
        End Get
        Set(ByVal value As Integer)
            Me._Base_Calculo_ID = value
        End Set
    End Property
    Public Property Direccion_Correspondiente() As Integer
        Get
            Return Me._Direccion_Correspondiente
        End Get
        Set(ByVal value As Integer)
            Me._Direccion_Correspondiente = value
        End Set
    End Property
    Public Property Valor_Total() As Long
        Get
            Return Me._Valor_Total
        End Get
        Set(ByVal value As Long)
            Me._Valor_Total = value
        End Set
    End Property
    Public Property Valor_Financiado() As Long
        Get
            Return Me._Valor_Financiado
        End Get
        Set(ByVal value As Long)
            Me._Valor_Financiado = value
        End Set
    End Property
    Public Property Valor_Opc_Compra() As Long
        Get
            Return Me._Valor_Opc_Compra
        End Get
        Set(ByVal value As Long)
            Me._Valor_Opc_Compra = value
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
