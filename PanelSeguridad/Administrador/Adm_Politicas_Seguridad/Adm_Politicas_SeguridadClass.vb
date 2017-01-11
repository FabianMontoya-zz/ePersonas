Public Class Adm_Politicas_SeguridadClass

#Region "campos"

    Private _Nit_ID As String
    Private _Politica_ID As String
    Private _Descripcion As String
    Private _DiasVigencia As Integer
    Private _MinNumeric As Integer

    Private _MinLetter As Integer
    Private _NumericNotRepeat As Integer
    Private _MaxErrorClave As Integer
    Private _MaxErrorUser As Integer
    Private _TipoEncriptacion As String

    Private _CharacterRepeat As String
    Private _lengthMinPassword As Integer
    Private _lengthMaxPassword As Integer
    Private _Token As String
    Private _Index As Integer

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
    Public Property Politica_ID() As String
        Get
            Return Me._Politica_ID
        End Get
        Set(ByVal value As String)
            Me._Politica_ID = value
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
    Public Property DiasVigencia() As Integer
        Get
            Return Me._DiasVigencia
        End Get
        Set(ByVal value As Integer)
            Me._DiasVigencia = value
        End Set
    End Property
    Public Property MinNumeric() As Integer
        Get
            Return Me._MinNumeric
        End Get
        Set(ByVal value As Integer)
            Me._MinNumeric = value
        End Set
    End Property
    Public Property MinLetter() As Integer
        Get
            Return Me._MinLetter
        End Get
        Set(ByVal value As Integer)
            Me._MinLetter = value
        End Set
    End Property
    Public Property NumericNotRepeat() As Integer
        Get
            Return Me._NumericNotRepeat
        End Get
        Set(ByVal value As Integer)
            Me._NumericNotRepeat = value
        End Set
    End Property
    Public Property MaxErrorClave() As Integer
        Get
            Return Me._MaxErrorClave
        End Get
        Set(ByVal value As Integer)
            Me._MaxErrorClave = value
        End Set
    End Property
    Public Property MaxErrorUser() As Integer
        Get
            Return Me._MaxErrorUser
        End Get
        Set(ByVal value As Integer)
            Me._MaxErrorUser = value
        End Set
    End Property
    Public Property TipoEncriptacion() As String
        Get
            Return Me._TipoEncriptacion
        End Get
        Set(ByVal value As String)
            Me._TipoEncriptacion = value
        End Set
    End Property
    Public Property CharacterRepeat() As String
        Get
            Return Me._CharacterRepeat
        End Get
        Set(ByVal value As String)
            Me._CharacterRepeat = value
        End Set
    End Property
    Public Property lengthMinPassword() As Integer
        Get
            Return Me._lengthMinPassword
        End Get
        Set(ByVal value As Integer)
            Me._lengthMinPassword = value
        End Set
    End Property
    Public Property lengthMaxPassword() As Integer
        Get
            Return Me._lengthMaxPassword
        End Get
        Set(ByVal value As Integer)
            Me._lengthMaxPassword = value
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
    Public Property Index() As Integer
        Get
            Return Me._Index
        End Get
        Set(ByVal value As Integer)
            Me._Index = value
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
#End Region

End Class
