Public Class AutorizacionDocumentosClass
#Region "campos"
    Private _Index As Long
    Private _Nit_ID As String
    Private _AutorizacionDocumentos_ID As String
    Private _Descripcion As String

    Private _Formato As Integer
    Private _Ruta_ID As Integer
    Private _Ruta_ID_Plantilla As Integer
    Private _DiasVigencia As Integer
    Private _TipoContenido As String
    Private _TipoVersion As String
    Private _Indicativo As String
    Private _NombrePlantilla As String
    Private _ChequeaVigencias As String
    Private _RequiereVerificacion As String

    Private _UsuarioCreacion As String
    Private _FechaCreacion As String
    Private _UsuarioActualizacion As String
    Private _FechaActualizacion As String

    Private _DescripEmpresa As String

    Private _DescripContenido As String
    Private _DescripFormato As String
    Private _DescripVersion As String
    Private _DescripRuta As String
    Private _DescripRutaPlantilla As String

#End Region

#Region "proiedades"
    Public Property Index() As Long
        Get
            Return Me._Index
        End Get
        Set(ByVal value As Long)
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
    Public Property AutorizacionDocumentos_ID() As String
        Get
            Return Me._AutorizacionDocumentos_ID
        End Get
        Set(ByVal value As String)
            Me._AutorizacionDocumentos_ID = value
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

    Public Property Formato() As Integer
        Get
            Return Me._Formato
        End Get
        Set(ByVal value As Integer)
            Me._Formato = value
        End Set
    End Property
    Public Property Ruta_ID() As Integer
        Get
            Return Me._Ruta_ID
        End Get
        Set(ByVal value As Integer)
            Me._Ruta_ID = value
        End Set
    End Property
    Public Property Ruta_ID_Plantilla() As Integer
        Get
            Return Me._Ruta_ID_Plantilla
        End Get
        Set(ByVal value As Integer)
            Me._Ruta_ID_Plantilla = value
        End Set
    End Property
    Public Property DiasVigencia() As Integer
        Get
            Return Me._DiasVigencia
        End Get
        Set(ByVal value As Integer)
            Me._DiasVigencia = value
        End Set
    End Property
    Public Property TipoContenido() As String
        Get
            Return Me._TipoContenido
        End Get
        Set(ByVal value As String)
            Me._TipoContenido = value
        End Set
    End Property
    Public Property TipoVersion() As String
        Get
            Return Me._TipoVersion
        End Get
        Set(ByVal value As String)
            Me._TipoVersion = value
        End Set
    End Property
    Public Property Indicativo() As String
        Get
            Return Me._Indicativo
        End Get
        Set(ByVal value As String)
            Me._Indicativo = value
        End Set
    End Property
    Public Property NombrePlantilla() As String
        Get
            Return Me._NombrePlantilla
        End Get
        Set(ByVal value As String)
            Me._NombrePlantilla = value
        End Set
    End Property
    Public Property ChequeaVigencias() As String
        Get
            Return Me._ChequeaVigencias
        End Get
        Set(ByVal value As String)
            Me._ChequeaVigencias = value
        End Set
    End Property
    Public Property RequiereVerificacion() As String
        Get
            Return Me._RequiereVerificacion
        End Get
        Set(ByVal value As String)
            Me._RequiereVerificacion = value
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

    Public Property DescripEmpresa() As String
        Get
            Return Me._DescripEmpresa
        End Get
        Set(ByVal value As String)
            Me._DescripEmpresa = value
        End Set
    End Property
    Public Property DescripContenido() As String
        Get
            Return Me._DescripContenido
        End Get
        Set(ByVal value As String)
            Me._DescripContenido = value
        End Set
    End Property
    Public Property DescripFormato() As String
        Get
            Return Me._DescripFormato
        End Get
        Set(ByVal value As String)
            Me._DescripFormato = value
        End Set
    End Property
    Public Property DescripVersion() As String
        Get
            Return Me._DescripVersion
        End Get
        Set(ByVal value As String)
            Me._DescripVersion = value
        End Set
    End Property
    Public Property DescripRuta() As String
        Get
            Return Me._DescripRuta
        End Get
        Set(ByVal value As String)
            Me._DescripRuta = value
        End Set
    End Property
    Public Property DescripRutaPlantilla() As String
        Get
            Return Me._DescripRutaPlantilla
        End Get
        Set(ByVal value As String)
            Me._DescripRutaPlantilla = value
        End Set
    End Property
#End Region
End Class
