Public Class Adm_UsuarioClass
#Region "campos"

    Private _Index As Long 'Obli
    Private _Nit_ID As String 'Obli
    Private _Usuario_ID As String 'Obli
    Private _TypeDocument As Long 'Obli
    Private _Documento As Long 'Obli

    Private _Nombre As String 'Obli
    Private _Rol_Nit_ID As String 'Obli
    Private _Rol_ID As String 'Obli
    Private _Estado As String 'Obli
    Private _Acceso_Informacion As String

    Private _Nivel_Politica_Seguridad_Grupo As String
    Private _Politica_Seguridad As String
    Private _Acceso_Documentos As String
    Private _Grupo_Documentos_Nit_ID As String
    Private _Grupo_Documentos As String

    Private _Acceso_Informacion_Documentos As String
    Private _Acceso_Reportes As String
    Private _Grupo_Reportes_Nit_ID As String
    Private _Grupo_Reportes As String
    Private _Acceso_Informacion_Reportes As String

    Private _Token As String
    Private _Intentos_Fallidos As Long
    Private _Tipo_Acceso As String
    Private _password As String
    Private _Huella As String

    Private _UsuarioCreacion As String
    Private _FechaCreacion As String
    Private _UsuarioActualizacion As String
    Private _FechaActualizacion As String
    Private _DescripEstado As String
    Private _DescripDocumento As String

#End Region

#Region "propiedades"
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
    Public Property Usuario_ID() As String
        Get
            Return Me._Usuario_ID
        End Get
        Set(ByVal value As String)
            Me._Usuario_ID = value
        End Set
    End Property
    Public Property TypeDocument() As String
        Get
            Return Me._TypeDocument
        End Get
        Set(ByVal value As String)
            Me._TypeDocument = value
        End Set
    End Property
    Public Property Documento() As Long
        Get
            Return Me._Documento
        End Get
        Set(ByVal value As Long)
            Me._Documento = value
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
    Public Property Rol_Nit_ID() As String
        Get
            Return Me._Rol_Nit_ID
        End Get
        Set(ByVal value As String)
            Me._Rol_Nit_ID = value
        End Set
    End Property
    Public Property Rol_ID() As String
        Get
            Return Me._Rol_ID
        End Get
        Set(ByVal value As String)
            Me._Rol_ID = value
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
    Public Property Acceso_Informacion() As String
        Get
            Return Me._Acceso_Informacion
        End Get
        Set(ByVal value As String)
            Me._Acceso_Informacion = value
        End Set
    End Property
    Public Property Nivel_Politica_Seguridad_Grupo() As String
        Get
            Return Me._Nivel_Politica_Seguridad_Grupo
        End Get
        Set(ByVal value As String)
            Me._Nivel_Politica_Seguridad_Grupo = value
        End Set
    End Property
    Public Property Politica_Seguridad() As String
        Get
            Return Me._Politica_Seguridad
        End Get
        Set(ByVal value As String)
            Me._Politica_Seguridad = value
        End Set
    End Property
    Public Property Acceso_Documentos() As String
        Get
            Return Me._Acceso_Documentos
        End Get
        Set(ByVal value As String)
            Me._Acceso_Documentos = value
        End Set
    End Property
    Public Property Grupo_Documentos_Nit_ID() As String
        Get
            Return Me._Grupo_Documentos_Nit_ID
        End Get
        Set(ByVal value As String)
            Me._Grupo_Documentos_Nit_ID = value
        End Set
    End Property
    Public Property Grupo_Documentos() As String
        Get
            Return Me._Grupo_Documentos
        End Get
        Set(ByVal value As String)
            Me._Grupo_Documentos = value
        End Set
    End Property
    Public Property Acceso_Informacion_Documentos() As String
        Get
            Return Me._Acceso_Informacion_Documentos
        End Get
        Set(ByVal value As String)
            Me._Acceso_Informacion_Documentos = value
        End Set
    End Property
    Public Property Acceso_Reportes() As String
        Get
            Return Me._Acceso_Reportes
        End Get
        Set(ByVal value As String)
            Me._Acceso_Reportes = value
        End Set
    End Property
    Public Property Grupo_Reportes_Nit_ID() As String
        Get
            Return Me._Grupo_Reportes_Nit_ID
        End Get
        Set(ByVal value As String)
            Me._Grupo_Reportes_Nit_ID = value
        End Set
    End Property
    Public Property Grupo_Reportes() As String
        Get
            Return Me._Grupo_Reportes
        End Get
        Set(ByVal value As String)
            Me._Grupo_Reportes = value
        End Set
    End Property
    Public Property Acceso_Informacion_Reportes() As String
        Get
            Return Me._Acceso_Informacion_Reportes
        End Get
        Set(ByVal value As String)
            Me._Acceso_Informacion_Reportes = value
        End Set
    End Property
    Public Property Token() As String
        Get
            Return Me._Token
        End Get
        Set(ByVal value As String)
            Me._Token = value
        End Set
    End Property
    Public Property Intentos_Fallidos() As Long
        Get
            Return Me._Intentos_Fallidos
        End Get
        Set(ByVal value As Long)
            Me._Intentos_Fallidos = value
        End Set
    End Property
    Public Property Tipo_Acceso() As String
        Get
            Return Me._Tipo_Acceso
        End Get
        Set(ByVal value As String)
            Me._Tipo_Acceso = value
        End Set
    End Property
    Public Property Password() As String
        Get
            Return Me._password
        End Get
        Set(ByVal value As String)
            Me._password = value
        End Set
    End Property
    Public Property Huella() As String
        Get
            Return Me._Huella
        End Get
        Set(ByVal value As String)
            Me._Huella = value
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
    Public Property DescripEstado() As String
        Get
            Return Me._DescripEstado
        End Get
        Set(ByVal value As String)
            Me._DescripEstado = value
        End Set
    End Property
    Public Property DescripDocumento() As String
        Get
            Return Me._DescripDocumento
        End Get
        Set(ByVal value As String)
            Me._DescripDocumento = value
        End Set
    End Property
#End Region

End Class
