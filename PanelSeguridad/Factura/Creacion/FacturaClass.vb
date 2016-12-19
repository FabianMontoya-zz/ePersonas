Public Class FacturaClass

#Region "campos"
    Private _Nit_ID As String
    Private _Ref_1 As String
    Private _Ref_2 As String
    Private _Ref_3 As String
    Private _Fact_Oct_ID As String
    Private _F_Fecha As String
    Private _Cod_Moneda_ID As Integer
    Private _Valor_Total As Long
    Private _Valor_Sin_IVA As Long
    Private _Valor_IVA As Long
    Private _Valor_Sin_IVA_Causado As Long
    Private _Valor_IVA_Causado As Long
    Private _TypeDocument_ID_Emisor As Integer
    Private _Document_ID_Emisor As Long

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
    Public Property Fact_Oct_ID() As String
        Get
            Return Me._Fact_Oct_ID
        End Get
        Set(ByVal value As String)
            Me._Fact_Oct_ID = value
        End Set
    End Property
    Public Property F_Fecha() As String
        Get
            Return Me._F_Fecha
        End Get
        Set(ByVal value As String)
            Me._F_Fecha = value
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
    Public Property Valor_Total() As Long
        Get
            Return Me._Valor_Total
        End Get
        Set(ByVal value As Long)
            Me._Valor_Total = value
        End Set
    End Property
    Public Property Valor_Sin_IVA() As Long
        Get
            Return Me._Valor_Sin_IVA
        End Get
        Set(ByVal value As Long)
            Me._Valor_Sin_IVA = value
        End Set
    End Property
    Public Property Valor_IVA() As Long
        Get
            Return Me._Valor_IVA
        End Get
        Set(ByVal value As Long)
            Me._Valor_IVA = value
        End Set
    End Property
    Public Property Valor_Sin_IVA_Causado() As Long
        Get
            Return Me._Valor_Sin_IVA_Causado
        End Get
        Set(ByVal value As Long)
            Me._Valor_Sin_IVA_Causado = value
        End Set
    End Property
    Public Property Valor_IVA_Causado() As Long
        Get
            Return Me._Valor_IVA_Causado
        End Get
        Set(ByVal value As Long)
            Me._Valor_IVA_Causado = value
        End Set
    End Property
    Public Property TypeDocument_ID_Emisor() As Integer
        Get
            Return Me._TypeDocument_ID_Emisor
        End Get
        Set(ByVal value As Integer)
            Me._TypeDocument_ID_Emisor = value
        End Set
    End Property
    Public Property Document_ID_Emisor() As Long
        Get
            Return Me._Document_ID_Emisor
        End Get
        Set(ByVal value As Long)
            Me._Document_ID_Emisor = value
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
