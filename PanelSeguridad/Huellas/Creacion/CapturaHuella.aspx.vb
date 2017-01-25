Public Class CapturaHuella
    Inherits System.Web.UI.Page
    Implements DPFP.Capture.EventHandler
    Private Capturer As DPFP.Capture.Capture

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

    End Sub

    Protected Overridable Sub IniciarCaptura()
        Try
            Capturer = New DPFP.Capture.Capture()                   ' Crea una operación de captura de eventos

            If (Not Capturer Is Nothing) Then
                Capturer.EventHandler = Me 'Es el encargado de capturar los eventos
            Else
                'SetPrompt("Can't initiate capture operation!")
            End If
        Catch ex As Exception

        End Try
    End Sub

    Public Sub OnComplete(Capture As Object, ReaderSerialNumber As String, Sample As DPFP.Sample) Implements DPFP.Capture.EventHandler.OnComplete

    End Sub

    Public Sub OnFingerGone(Capture As Object, ReaderSerialNumber As String) Implements DPFP.Capture.EventHandler.OnFingerGone

    End Sub

    Public Sub OnFingerTouch(Capture As Object, ReaderSerialNumber As String) Implements DPFP.Capture.EventHandler.OnFingerTouch

    End Sub

    Public Sub OnReaderConnect(Capture As Object, ReaderSerialNumber As String) Implements DPFP.Capture.EventHandler.OnReaderConnect
        Response.Write("Conectado")
    End Sub

    Public Sub OnReaderDisconnect(Capture As Object, ReaderSerialNumber As String) Implements DPFP.Capture.EventHandler.OnReaderDisconnect

    End Sub

    Public Sub OnSampleQuality(Capture As Object, ReaderSerialNumber As String, CaptureFeedback As DPFP.Capture.CaptureFeedback) Implements DPFP.Capture.EventHandler.OnSampleQuality

    End Sub
End Class