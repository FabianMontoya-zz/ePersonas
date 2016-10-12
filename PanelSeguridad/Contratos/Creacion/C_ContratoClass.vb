Public Class C_ContratoClass
#Region "campos"

    Private _Nit_ID As String
    Private _Contrato_ID As String
    Private _TypeDocument_ID As Integer
    Private _Document_ID As Long
    Private _Cod_Moneda_ID As Integer
    Private _Estado_Cont_ID As Integer

    Private _Descripcion As String
    Private _Val_Cont As Long
    Private _Val_Finan As Long
    Private _Val_Op_Compra As Long
    Private _Saldo_Cap As Long
    Private _Saldo_Int_Cont As Long
    Private _Saldo_Int As Long
    Private _Saldo_Int_Mora_Cont As Long
    Private _Saldo_Int_Mora As Long
    Private _Saldo_Otros_Cont As Long
    Private _Saldo_Otros As Long
    Private _Secuencia_Cargue As Long

    Private _FechaActualizacion As String
    Private _Usuario As String

#End Region

#Region "proiedades"

    Public Property Nit_ID() As String
        Get
            Return Me._Nit_ID
        End Get
        Set(ByVal value As String)
            Me._Nit_ID = value
        End Set
    End Property
    Public Property Contrato_ID() As String
        Get
            Return Me._Contrato_ID
        End Get
        Set(ByVal value As String)
            Me._Contrato_ID = value
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
    Public Property Cod_Moneda_ID() As Integer
        Get
            Return Me._Cod_Moneda_ID
        End Get
        Set(ByVal value As Integer)
            Me._Cod_Moneda_ID = value
        End Set
    End Property

    Public Property Val_Cont() As Long
        Get
            Return Me._Val_Cont
        End Get
        Set(ByVal value As Long)
            Me._Val_Cont = value
        End Set
    End Property
    Public Property Val_Finan() As Long
        Get
            Return Me._Val_Finan
        End Get
        Set(ByVal value As Long)
            Me._Val_Finan = value
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
    Public Property Saldo_Cap() As Long
        Get
            Return Me._Saldo_Cap
        End Get
        Set(ByVal value As Long)
            Me._Saldo_Cap = value
        End Set
    End Property
    Public Property Saldo_Int_Cont() As Long
        Get
            Return Me._Saldo_Int_Cont
        End Get
        Set(ByVal value As Long)
            Me._Saldo_Int_Cont = value
        End Set
    End Property
    Public Property Saldo_Int() As Long
        Get
            Return Me._Saldo_Int
        End Get
        Set(ByVal value As Long)
            Me._Saldo_Int = value
        End Set
    End Property
    Public Property Saldo_Int_Mora_Cont() As Long
        Get
            Return Me._Saldo_Int_Mora_Cont
        End Get
        Set(ByVal value As Long)
            Me._Saldo_Int_Mora_Cont = value
        End Set
    End Property
    Public Property Saldo_Int_Mora() As Long
        Get
            Return Me._Saldo_Int_Mora
        End Get
        Set(ByVal value As Long)
            Me._Saldo_Int_Mora = value
        End Set
    End Property
    Public Property Saldo_Otros_Cont() As Long
        Get
            Return Me._Saldo_Otros_Cont
        End Get
        Set(ByVal value As Long)
            Me._Saldo_Otros_Cont = value
        End Set
    End Property
    Public Property Saldo_Otros() As Long
        Get
            Return Me._Saldo_Otros
        End Get
        Set(ByVal value As Long)
            Me._Saldo_Otros = value
        End Set
    End Property
    Public Property Estado_Cont_ID() As Integer
        Get
            Return Me._Estado_Cont_ID
        End Get
        Set(ByVal value As Integer)
            Me._Estado_Cont_ID = value
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
#End Region

End Class
