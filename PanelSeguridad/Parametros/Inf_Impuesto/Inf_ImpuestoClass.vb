Public Class Inf_ImpuestoClass
#Region "campos"
    Private _Cod_ID As Integer
    Private _Ciudad_ID As Integer
    Private _Impuesto_Gasto_ID As Integer
    Private _Nit_ID As String
    Private _TypeDocument_ID As Integer
    Private _Document_ID As Integer

    Private _FechaActualizacion As String
    Private _Usuario As String

    Private _DescripCod As String
    Private _DescripCiudad As String
    Private _DescripImpuesto_Gasto As String
    Private _DescripNitResponsable As String
    Private _DescripTypeDocument As String
    Private _DescripDocument As String

#End Region

#Region "propiedades"
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
    Public Property Nit_ID() As String
        Get
            Return Me._Nit_ID
        End Get
        Set(ByVal value As String)
            Me._Nit_ID = value
        End Set
    End Property
    Public Property TypeDocument_ID() As String
        Get
            Return Me._TypeDocument_ID
        End Get
        Set(ByVal value As String)
            Me._TypeDocument_ID = value
        End Set
    End Property
    Public Property Document_ID() As String
        Get
            Return Me._Document_ID
        End Get
        Set(ByVal value As String)
            Me._Document_ID = value
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
    Public Property DescripNitResponsable() As String
        Get
            Return Me._DescripNitResponsable
        End Get
        Set(ByVal value As String)
            Me._DescripNitResponsable = value
        End Set
    End Property
    Public Property DescripTypeDocument() As String
        Get
            Return Me._DescripTypeDocument
        End Get
        Set(ByVal value As String)
            Me._DescripTypeDocument = value
        End Set
    End Property
    Public Property DescripDocument() As String
        Get
            Return Me._DescripDocument
        End Get
        Set(ByVal value As String)
            Me._DescripDocument = value
        End Set
    End Property
#End Region
End Class
