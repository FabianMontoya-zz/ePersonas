Public Class FinanciacionClass
#Region "campos"
    Private _Nit_ID As String
    Private _Financiacion_ID As Long
    Private _Descripcion As String
    Private _Unidad_Tiempo As String
    Private _Calculo As String
    Private _Calculo_Cuota_Final As String
    Private _Modalidad_Pago As String
    Private _Periodo_Pago As String
    Private _Tipo_Cuota As String
    Private _Formula_FK As Long
    Private _Base_Calculo As String
    Private _Tasa_FK As Long
    Private _Tipo_Tasa As String
    Private _Puntos_Adicionales As Long
    Private _Tasa_Mora_FK As Long
    Private _Tasa_Usura_FK As Long
    Private _Ciclo_Cobro_FK As Long

    Private _FechaActualizacion As String 'No se han creado en la BD
    Private _Usuario As String 'No se han creado en la BD

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


    Public Property Descripcion() As String
        Get
            Return Me._Descripcion
        End Get
        Set(ByVal value As String)
            Me._Descripcion = value
        End Set
    End Property
#End Region

End Class
