Public Class VehiculosClass
#Region "campos"

    Private _Nit_ID As String
    Private _Ref_1 As String
    Private _Ref_2 As String
    Private _Ref_3 As String
    Private _Fasecolda_ID As Long
    Private _Modelo As Integer
    Private _Clase As String
    Private _Marca As String
    Private _Linea As String
    Private _ValorComer As Long
    Private _ValorAcesorios As Long
    Private _Cilindraje As Long
    Private _N_Motor As String
    Private _N_Chasis As String
    Private _ValorChasis As Long
    Private _N_Serie As String
    Private _N_VIN As String
    Private _Modalidad_Servicio As String
    Private _N_Pasajeros As Integer
    Private _TipoServicio As String
    Private _Combustible As String
    Private _Colores_ID As Integer
    Private _Capacidad As Integer
    Private _Potencia As Integer
    Private _Carroceria As String
    Private _TipoCarroceria As String
    Private _Blindaje As String
    Private _NivelBlindaje As Integer
    Private _TipoIden_Blin As Integer
    Private _N_TypeDocument_ID_Blind As Integer
    Private _N_Document_ID_Blind As Long
    Private _N_GPS As String
    Private _Indicativo_Modificacion As String

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
    Public Property Fasecolda_ID() As Long
        Get
            Return Me._Fasecolda_ID
        End Get
        Set(ByVal value As Long)
            Me._Fasecolda_ID = value
        End Set
    End Property
    Public Property Modelo() As Integer
        Get
            Return Me._Modelo
        End Get
        Set(ByVal value As Integer)
            Me._Modelo = value
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
    Public Property ValorComer() As Long
        Get
            Return Me._ValorComer
        End Get
        Set(ByVal value As Long)
            Me._ValorComer = value
        End Set
    End Property
    Public Property ValorAcesorios() As Long
        Get
            Return Me._ValorAcesorios
        End Get
        Set(ByVal value As Long)
            Me._ValorAcesorios = value
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
    Public Property N_Motor() As String
        Get
            Return Me._N_Motor
        End Get
        Set(ByVal value As String)
            Me._N_Motor = value
        End Set
    End Property
    Public Property N_Chasis() As String
        Get
            Return Me._N_Chasis
        End Get
        Set(ByVal value As String)
            Me._N_Chasis = value
        End Set
    End Property
    Public Property ValorChasis() As Long
        Get
            Return Me._ValorChasis
        End Get
        Set(ByVal value As Long)
            Me._ValorChasis = value
        End Set
    End Property
    Public Property N_Serie() As String
        Get
            Return Me._N_Serie
        End Get
        Set(ByVal value As String)
            Me._N_Serie = value
        End Set
    End Property
    Public Property N_VIN() As String
        Get
            Return Me._N_VIN
        End Get
        Set(ByVal value As String)
            Me._N_VIN = value
        End Set
    End Property
    Public Property Modalidad_Servicio() As String
        Get
            Return Me._Modalidad_Servicio
        End Get
        Set(ByVal value As String)
            Me._Modalidad_Servicio = value
        End Set
    End Property
    Public Property N_Pasajeros() As Integer
        Get
            Return Me._N_Pasajeros
        End Get
        Set(ByVal value As Integer)
            Me._N_Pasajeros = value
        End Set
    End Property
    Public Property TipoServicio() As String
        Get
            Return Me._TipoServicio
        End Get
        Set(ByVal value As String)
            Me._TipoServicio = value
        End Set
    End Property
    Public Property Combustible() As String
        Get
            Return Me._Combustible
        End Get
        Set(ByVal value As String)
            Me._Combustible = value
        End Set
    End Property
    Public Property Colores_ID() As Integer
        Get
            Return Me._Colores_ID
        End Get
        Set(ByVal value As Integer)
            Me._Colores_ID = value
        End Set
    End Property
    Public Property Capacidad() As Integer
        Get
            Return Me._Capacidad
        End Get
        Set(ByVal value As Integer)
            Me._Capacidad = value
        End Set
    End Property
    Public Property Potencia() As Integer
        Get
            Return Me._Potencia
        End Get
        Set(ByVal value As Integer)
            Me._Potencia = value
        End Set
    End Property
    Public Property Carroceria() As String
        Get
            Return Me._Carroceria
        End Get
        Set(ByVal value As String)
            Me._Carroceria = value
        End Set
    End Property
    Public Property TipoCarroceria() As String
        Get
            Return Me._TipoCarroceria
        End Get
        Set(ByVal value As String)
            Me._TipoCarroceria = value
        End Set
    End Property
    Public Property Blindaje() As String
        Get
            Return Me._Blindaje
        End Get
        Set(ByVal value As String)
            Me._Blindaje = value
        End Set
    End Property
    Public Property NivelBlindaje() As Integer
        Get
            Return Me._NivelBlindaje
        End Get
        Set(ByVal value As Integer)
            Me._NivelBlindaje = value
        End Set
    End Property
    Public Property TipoIden_Blin() As Integer
        Get
            Return Me._TipoIden_Blin
        End Get
        Set(ByVal value As Integer)
            Me._TipoIden_Blin = value
        End Set
    End Property
    Public Property N_TypeDocument_ID_Blind() As Integer
        Get
            Return Me._N_TypeDocument_ID_Blind
        End Get
        Set(ByVal value As Integer)
            Me._N_TypeDocument_ID_Blind = value
        End Set
    End Property
    Public Property N_Document_ID_Blind() As Long
        Get
            Return Me._N_Document_ID_Blind
        End Get
        Set(ByVal value As Long)
            Me._N_Document_ID_Blind = value
        End Set
    End Property
    Public Property N_GPS() As String
        Get
            Return Me._N_GPS
        End Get
        Set(ByVal value As String)
            Me._N_GPS = value
        End Set
    End Property
    Public Property Indicativo_Modificacion() As String
        Get
            Return Me._Indicativo_Modificacion
        End Get
        Set(ByVal value As String)
            Me._Indicativo_Modificacion = value
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
