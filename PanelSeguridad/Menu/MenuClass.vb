Public Class MenuClass

#Region "campos"
    Private _Nombre As String
    Private _Usuario As String
    Private _EstadoUsuario As String
    Private _IDRol As String
    Private _DescripcionRol As String
    Private _Sigla As String
    Private _IDOpcionRol As String
    Private _Consecutivo As String
    Private _Tipo As String
    Private _Sub_Rol As String
    Private _IDlink As String
    Private _DescripcionLink As String
    Private _Parametro_1 As String
    Private _Parametro_2 As String
    Private _Ruta As String
    Private _Nit As String
    Private _DescripcionSubRol As String
    Private _EstadoRol As String
    Private _Sub_Sigla As String

#End Region

#Region "propiedades"
    Public Property Usuario() As String
        Get
            Return Me._Usuario
        End Get
        Set(ByVal value As String)
            Me._Usuario = value
        End Set
    End Property
    Public Property Nombre() As String
        Get
            Return Me._Nombre
        End Get
        Set(ByVal value As String)
            Me._Nombre = value
        End Set
    End Property
    Public Property EstadoUsuario() As String
        Get
            Return Me._EstadoUsuario
        End Get
        Set(ByVal value As String)
            Me._EstadoUsuario = value
        End Set
    End Property
    Public Property IDRol() As String
        Get
            Return Me._IDRol
        End Get
        Set(ByVal value As String)
            Me._IDRol = value
        End Set
    End Property
    Public Property DescripcionRol() As String
        Get
            Return Me._DescripcionRol
        End Get
        Set(ByVal value As String)
            Me._DescripcionRol = value
        End Set
    End Property
    Public Property Sigla() As String
        Get
            Return Me._Sigla
        End Get
        Set(ByVal value As String)
            Me._Sigla = value
        End Set
    End Property
    Public Property IDOpcionRol() As String
        Get
            Return Me._IDOpcionRol
        End Get
        Set(ByVal value As String)
            Me._IDOpcionRol = value
        End Set
    End Property
    Public Property Consecutivo() As String
        Get
            Return Me._Consecutivo
        End Get
        Set(ByVal value As String)
            Me._Consecutivo = value
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
    Public Property Sub_Rol() As String
        Get
            Return Me._Sub_Rol
        End Get
        Set(ByVal value As String)
            Me._Sub_Rol = value
        End Set
    End Property
    Public Property IDlink() As String
        Get
            Return Me._IDlink
        End Get
        Set(ByVal value As String)
            Me._IDlink = value
        End Set
    End Property
    Public Property DescripcionLink() As String
        Get
            Return Me._DescripcionLink
        End Get
        Set(ByVal value As String)
            Me._DescripcionLink = value
        End Set
    End Property
    Public Property Parametro_1() As String
        Get
            Return Me._Parametro_1
        End Get
        Set(ByVal value As String)
            Me._Parametro_1 = value
        End Set
    End Property
    Public Property Parametro_2() As String
        Get
            Return Me._Parametro_2
        End Get
        Set(ByVal value As String)
            Me._Parametro_2 = value
        End Set
    End Property
    Public Property Ruta() As String
        Get
            Return Me._Ruta
        End Get
        Set(ByVal value As String)
            Me._Ruta = value
        End Set
    End Property
    Public Property Nit() As String
        Get
            Return Me._Nit
        End Get
        Set(ByVal value As String)
            Me._Nit = value
        End Set
    End Property
    Public Property DescripcionSubRol() As String
        Get
            Return Me._DescripcionSubRol
        End Get
        Set(ByVal value As String)
            Me._DescripcionSubRol = value
        End Set
    End Property
    Public Property EstadoRol() As String
        Get
            Return Me._EstadoRol
        End Get
        Set(ByVal value As String)
            Me._EstadoRol = value
        End Set
    End Property
    Public Property Sub_Sigla() As String
        Get
            Return Me._Sub_Sigla
        End Get
        Set(ByVal value As String)
            Me._Sub_Sigla = value
        End Set
    End Property
#End Region
End Class
