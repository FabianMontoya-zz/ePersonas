Public Class DireccionesClass
#Region "campos"

    Private _Nit_ID As String
    Private _TypeDoc_ID As Integer
    Private _Doc_ID As Integer
    Private _Consecutivo As Integer

    Private _Pais_ID As Integer
    Private _Ciudad_ID As Integer

    Private _PaginaWeb As String
    Private _Correo_1 As String
    Private _Correo_2 As String
    Private _Contacto As String
    Private _Telefono_1 As String
    Private _Telefono_2 As String
    Private _Telefono_3 As String
    Private _Telefono_4 As String
    Private _Direccion As String
    Private _FechaActualizacion As String
    Private _Usuario As String

    Private _DescripCiudad As String
    Private _DescripPais As String
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
    Public Property TypeDoc_ID() As Integer
        Get
            Return Me._TypeDoc_ID
        End Get
        Set(ByVal value As Integer)
            Me._TypeDoc_ID = value
        End Set
    End Property
    Public Property Doc_ID() As Integer
        Get
            Return Me._Doc_ID
        End Get
        Set(ByVal value As Integer)
            Me._Doc_ID = value
        End Set
    End Property
    Public Property Consecutivo() As Integer
        Get
            Return Me._Consecutivo
        End Get
        Set(ByVal value As Integer)
            Me._Consecutivo = value
        End Set
    End Property

    Public Property Pais_ID() As Integer
        Get
            Return Me._Pais_ID
        End Get
        Set(ByVal value As Integer)
            Me._Pais_ID = value
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

    Public Property PaginaWeb() As String
        Get
            Return Me._PaginaWeb
        End Get
        Set(ByVal value As String)
            Me._PaginaWeb = value
        End Set
    End Property
    Public Property Correo_1() As String
        Get
            Return Me._Correo_1
        End Get
        Set(ByVal value As String)
            Me._Correo_1 = value
        End Set
    End Property
    Public Property Correo_2() As String
        Get
            Return Me._Correo_2
        End Get
        Set(ByVal value As String)
            Me._Correo_2 = value
        End Set
    End Property
    Public Property Contacto() As String
        Get
            Return Me._Contacto
        End Get
        Set(ByVal value As String)
            Me._Contacto = value
        End Set
    End Property
    Public Property Telefono_1() As String
        Get
            Return Me._Telefono_1
        End Get
        Set(ByVal value As String)
            Me._Telefono_1 = value
        End Set
    End Property
    Public Property Telefono_2() As String
        Get
            Return Me._Telefono_2
        End Get
        Set(ByVal value As String)
            Me._Telefono_2 = value
        End Set
    End Property
    Public Property Telefono_3() As String
        Get
            Return Me._Telefono_3
        End Get
        Set(ByVal value As String)
            Me._Telefono_3 = value
        End Set
    End Property
    Public Property Telefono_4() As String
        Get
            Return Me._Telefono_4
        End Get
        Set(ByVal value As String)
            Me._Telefono_4 = value
        End Set
    End Property
    Public Property Direccion() As String
        Get
            Return Me._Direccion
        End Get
        Set(ByVal value As String)
            Me._Direccion = value
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

    Public Property DescripCiudad() As String
        Get
            Return Me._DescripCiudad
        End Get
        Set(ByVal value As String)
            Me._DescripCiudad = value
        End Set
    End Property
    Public Property DescripPais() As String
        Get
            Return Me._DescripPais
        End Get
        Set(ByVal value As String)
            Me._DescripPais = value
        End Set
    End Property
#End Region
End Class
