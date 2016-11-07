Imports System
Imports System.IO
Imports System.Text
Imports Newtonsoft.Json
Imports System.Data
Imports System.Data.SqlClient
Imports System.Web.Script.Serialization

Public Class DocumentosExistentesClass

#Region "Campos"
    Private _Nit_ID As String
    Private _Secuencia_ID As Integer
    Private _Documento_ID As String
    Private _Nombre_Save As String
    Private _RutaDocumento As String
    Private _Formato As Integer
    Private _Trama As String
    Private _Indicativo As String
    Private _Verificado As String
    Private _Usuario_Verifico As String
    Private _Fecha_Verifico As String
    Private _Observaciones_Captura As String
    Private _Observaciones_Validacion As String
    Private _Fecha_Vencimiento As String
    Private _Fecha_Inicio_Vigencia As String
    Private _Dias_Vigencia As Integer
    Private _UsuarioCreacion As String
    Private _FechaCreacion As String
    Private _UsuarioActualizacion As String
    Private _FechaActualizacion As String

#End Region

#Region "Propiedades"
    Public Property Nit_ID() As String
        Get
            Return Me._Nit_ID
        End Get
        Set(ByVal value As String)
            Me._Nit_ID = value
        End Set
    End Property
    Public Property Secuencia_ID() As Integer
        Get
            Return Me._Secuencia_ID
        End Get
        Set(ByVal value As Integer)
            Me._Secuencia_ID = value
        End Set
    End Property
    Public Property Documento_ID() As String
        Get
            Return Me._Documento_ID
        End Get
        Set(ByVal value As String)
            Me._Documento_ID = value
        End Set
    End Property
    Public Property Nombre_Save() As String
        Get
            Return Me._Nombre_Save
        End Get
        Set(ByVal value As String)
            Me._Nombre_Save = value
        End Set
    End Property
    Public Property RutaDocumento() As String
        Get
            Return Me._RutaDocumento
        End Get
        Set(ByVal value As String)
            Me._RutaDocumento = value
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
    Public Property Trama() As String
        Get
            Return Me._Trama
        End Get
        Set(ByVal value As String)
            Me._Trama = value
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
    Public Property Verificado() As String
        Get
            Return Me._Verificado
        End Get
        Set(ByVal value As String)
            Me._Verificado = value
        End Set
    End Property
    Public Property Usuario_Verifico() As String
        Get
            Return Me._Usuario_Verifico
        End Get
        Set(ByVal value As String)
            Me._Usuario_Verifico = value
        End Set
    End Property
    Public Property Fecha_Verifico() As String
        Get
            Return Me._Fecha_Verifico
        End Get
        Set(ByVal value As String)
            Me._Fecha_Verifico = value
        End Set
    End Property
    Public Property Observaciones_Captura() As String
        Get
            Return Me._Observaciones_Captura
        End Get
        Set(ByVal value As String)
            Me._Observaciones_Captura = value
        End Set
    End Property
    Public Property Observaciones_Validacion() As String
        Get
            Return Me._Observaciones_Validacion
        End Get
        Set(ByVal value As String)
            Me._Observaciones_Validacion = value
        End Set
    End Property
    Public Property Fecha_Vencimiento() As String
        Get
            Return Me._Fecha_Vencimiento
        End Get
        Set(ByVal value As String)
            Me._Fecha_Vencimiento = value
        End Set
    End Property
    Public Property Fecha_Inicio_Vigencia() As String
        Get
            Return Me._Fecha_Inicio_Vigencia
        End Get
        Set(ByVal value As String)
            Me._Fecha_Inicio_Vigencia = value
        End Set
    End Property
    Public Property Dias_Vigencia() As Integer
        Get
            Return Me._Dias_Vigencia
        End Get
        Set(ByVal value As Integer)
            Me._Dias_Vigencia = value
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
