Public Class File_DowloadClass
#Region "campos"
    Private _Index As Long
    Private _RutaOrigen As String
    Private _NombreDescarga As String
  
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
    Public Property RutaOrigen() As String
        Get
            Return Me._RutaOrigen
        End Get
        Set(ByVal value As String)
            Me._RutaOrigen = value
        End Set
    End Property
    Public Property NombreDescarga() As String
        Get
            Return Me._NombreDescarga
        End Get
        Set(ByVal value As String)
            Me._NombreDescarga = value
        End Set
    End Property
#End Region
End Class
