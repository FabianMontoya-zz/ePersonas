Public Class FasecoldaClass
#Region "campos"
    Private _Fasecolda_ID As Long
    Private _Clase As String

    Private _Marca As String
    Private _Linea As String
    Private _Cilindraje As Long

    Private _Year_1 As String
    Private _Year_2 As String
    Private _Year_3 As String
    Private _Year_4 As String
    Private _Year_5 As String
    Private _Year_6 As String
    Private _Year_7 As String
    Private _Year_8 As String
    Private _Year_9 As String
    Private _Year_10 As String
    Private _Year_11 As String
    Private _Year_12 As String
    Private _Year_13 As String
    Private _Year_14 As String
    Private _Year_15 As String
    Private _Year_16 As String
    Private _Year_17 As String
    Private _Year_18 As String
    Private _Year_19 As String
    Private _Year_20 As String
    Private _Year_21 As String
    Private _Year_22 As String
    Private _Year_23 As String
    Private _Year_24 As String
    Private _Year_25 As String
   
    Private _Estado As String

    Private _FechaActualizacion As String
    Private _Usuario As String

#End Region

#Region "proiedades"

    Public Property Fasecolda_ID() As Long
        Get
            Return Me._Fasecolda_ID
        End Get
        Set(ByVal value As Long)
            Me._Fasecolda_ID = value
        End Set
    End Property
    Public Property Clase() As String
        Get
            Return Me._Clase
        End Get
        Set(ByVal value As String)
            Me._Clase = value
        End Set
    End Property

    Public Property Marca() As String
        Get
            Return Me._Marca
        End Get
        Set(ByVal value As String)
            Me._Marca = value
        End Set
    End Property
    Public Property Linea() As String
        Get
            Return Me._Linea
        End Get
        Set(ByVal value As String)
            Me._Linea = value
        End Set
    End Property
    Public Property Cilindraje() As Long
        Get
            Return Me._Cilindraje
        End Get
        Set(ByVal value As Long)
            Me._Cilindraje = value
        End Set
    End Property

    Public Property Year_1() As String
        Get
            Return Me._Year_1
        End Get
        Set(ByVal value As String)
            Me._Year_1 = value
        End Set
    End Property
    Public Property Year_2() As String
        Get
            Return Me._Year_2
        End Get
        Set(ByVal value As String)
            Me._Year_2 = value
        End Set
    End Property
    Public Property Year_3() As String
        Get
            Return Me._Year_3
        End Get
        Set(ByVal value As String)
            Me._Year_3 = value
        End Set
    End Property
    Public Property Year_4() As String
        Get
            Return Me._Year_4
        End Get
        Set(ByVal value As String)
            Me._Year_4 = value
        End Set
    End Property
    Public Property Year_5() As String
        Get
            Return Me._Year_5
        End Get
        Set(ByVal value As String)
            Me._Year_5 = value
        End Set
    End Property
    Public Property Year_6() As String
        Get
            Return Me._Year_6
        End Get
        Set(ByVal value As String)
            Me._Year_6 = value
        End Set
    End Property
    Public Property Year_7() As String
        Get
            Return Me._Year_7
        End Get
        Set(ByVal value As String)
            Me._Year_7 = value
        End Set
    End Property
    Public Property Year_8() As String
        Get
            Return Me._Year_8
        End Get
        Set(ByVal value As String)
            Me._Year_8 = value
        End Set
    End Property
    Public Property Year_9() As String
        Get
            Return Me._Year_9
        End Get
        Set(ByVal value As String)
            Me._Year_9 = value
        End Set
    End Property
    Public Property Year_10() As String
        Get
            Return Me._Year_10
        End Get
        Set(ByVal value As String)
            Me._Year_10 = value
        End Set
    End Property
    Public Property Year_11() As String
        Get
            Return Me._Year_11
        End Get
        Set(ByVal value As String)
            Me._Year_11 = value
        End Set
    End Property
    Public Property Year_12() As String
        Get
            Return Me._Year_12
        End Get
        Set(ByVal value As String)
            Me._Year_12 = value
        End Set
    End Property
    Public Property Year_13() As String
        Get
            Return Me._Year_13
        End Get
        Set(ByVal value As String)
            Me._Year_13 = value
        End Set
    End Property
    Public Property Year_14() As String
        Get
            Return Me._Year_14
        End Get
        Set(ByVal value As String)
            Me._Year_14 = value
        End Set
    End Property
    Public Property Year_15() As String
        Get
            Return Me._Year_15
        End Get
        Set(ByVal value As String)
            Me._Year_15 = value
        End Set
    End Property
    Public Property Year_16() As String
        Get
            Return Me._Year_16
        End Get
        Set(ByVal value As String)
            Me._Year_16 = value
        End Set
    End Property
    Public Property Year_17() As String
        Get
            Return Me._Year_17
        End Get
        Set(ByVal value As String)
            Me._Year_17 = value
        End Set
    End Property
    Public Property Year_18() As String
        Get
            Return Me._Year_18
        End Get
        Set(ByVal value As String)
            Me._Year_18 = value
        End Set
    End Property
    Public Property Year_19() As String
        Get
            Return Me._Year_19
        End Get
        Set(ByVal value As String)
            Me._Year_19 = value
        End Set
    End Property
    Public Property Year_20() As String
        Get
            Return Me._Year_20
        End Get
        Set(ByVal value As String)
            Me._Year_20 = value
        End Set
    End Property
    Public Property Year_21() As String
        Get
            Return Me._Year_21
        End Get
        Set(ByVal value As String)
            Me._Year_21 = value
        End Set
    End Property
    Public Property Year_22() As String
        Get
            Return Me._Year_22
        End Get
        Set(ByVal value As String)
            Me._Year_22 = value
        End Set
    End Property
    Public Property Year_23() As String
        Get
            Return Me._Year_23
        End Get
        Set(ByVal value As String)
            Me._Year_23 = value
        End Set
    End Property
    Public Property Year_24() As String
        Get
            Return Me._Year_24
        End Get
        Set(ByVal value As String)
            Me._Year_24 = value
        End Set
    End Property
    Public Property Year_25() As String
        Get
            Return Me._Year_25
        End Get
        Set(ByVal value As String)
            Me._Year_25 = value
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
