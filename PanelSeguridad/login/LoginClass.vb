﻿' se crea clase para mamejar los datos como objetos para manipulacion en la BD 
Public Class LoginClass

#Region "campos"
    Private _Nit_ID As String
    Private _Usuario_ID As String
    Private _Password As String
    Private _Estado As String
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
    Public Property Usuario_ID() As String
        Get
            Return Me._Usuario_ID
        End Get
        Set(ByVal value As String)
            Me._Usuario_ID = value
        End Set
    End Property
    Public Property Password() As String
        Get
            Return Me._Password
        End Get
        Set(ByVal value As String)
            Me._Password = value
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
#End Region

End Class
