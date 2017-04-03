Public Class HuellasClass
#Region "Campos"
    Dim NULL As String = DBNull.Value.ToString
    Dim encoding As New System.Text.UTF8Encoding()

    Private _Index As Long
    Private _Nit_ID As String
    Private _TypeDocument_ID As Integer
    Private _Document_ID As String

    'Mano Izquierda
    Private _Menique_IZ As Byte() = encoding.GetBytes(NULL) 'Inicializamos todo en binary null para evitar conflictos al insertar
    Private _Anular_IZ As Byte() = encoding.GetBytes(NULL)
    Private _Medio_IZ As Byte() = encoding.GetBytes(NULL)
    Private _Indice_IZ As Byte() = encoding.GetBytes(NULL)
    Private _Pulgar_IZ As Byte() = encoding.GetBytes(NULL)

    'Mano Derecha
    Private _Menique_DER As Byte() = encoding.GetBytes(NULL)
    Private _Anular_DER As Byte() = encoding.GetBytes(NULL)
    Private _Medio_DER As Byte() = encoding.GetBytes(NULL)
    Private _Indice_DER As Byte() = encoding.GetBytes(NULL)
    Private _Pulgar_DER As Byte() = encoding.GetBytes(NULL)

    Private _UsuarioCreacion As String
    Private _FechaCreacion As String
    Private _UsuarioActualizacion As String
    Private _FechaActualizacion As String
#End Region

#Region "Propiedades"
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
    Public Property TypeDocument_ID() As Integer
        Get
            Return Me._TypeDocument_ID
        End Get
        Set(ByVal value As Integer)
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

    'Mano Izquierda
    Public Property Menique_IZ() As Byte()
        Get
            Return Me._Menique_IZ
        End Get
        Set(ByVal value As Byte())
            Me._Menique_IZ = value
        End Set
    End Property
    Public Property Anular_IZ() As Byte()
        Get
            Return Me._Anular_IZ
        End Get
        Set(ByVal value As Byte())
            Me._Anular_IZ = value
        End Set
    End Property
    Public Property Medio_IZ() As Byte()
        Get
            Return Me._Medio_IZ
        End Get
        Set(ByVal value As Byte())
            Me._Medio_IZ = value
        End Set
    End Property
    Public Property Indice_IZ() As Byte()
        Get
            Return Me._Indice_IZ
        End Get
        Set(ByVal value As Byte())
            Me._Indice_IZ = value
        End Set
    End Property
    Public Property Pulgar_IZ() As Byte()
        Get
            Return Me._Pulgar_IZ
        End Get
        Set(ByVal value As Byte())
            Me._Pulgar_IZ = value
        End Set
    End Property

    'Mano Derecha
    Public Property Menique_DER() As Byte()
        Get
            Return Me._Menique_DER
        End Get
        Set(ByVal value As Byte())
            Me._Menique_DER = value
        End Set
    End Property
    Public Property Anular_DER() As Byte()
        Get
            Return Me._Anular_DER
        End Get
        Set(ByVal value As Byte())
            Me._Anular_DER = value
        End Set
    End Property
    Public Property Medio_DER() As Byte()
        Get
            Return Me._Medio_DER
        End Get
        Set(ByVal value As Byte())
            Me._Medio_DER = value
        End Set
    End Property
    Public Property Indice_DER() As Byte()
        Get
            Return Me._Indice_DER
        End Get
        Set(ByVal value As Byte())
            Me._Indice_DER = value
        End Set
    End Property
    Public Property Pulgar_DER() As Byte()
        Get
            Return Me._Pulgar_DER
        End Get
        Set(ByVal value As Byte())
            Me._Pulgar_DER = value
        End Set
    End Property

    '''''''
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
