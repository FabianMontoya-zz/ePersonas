Public Class HuellasCapturaClass

    Implements DPFP.Capture.EventHandler

    Private Capturer As DPFP.Capture.Capture

    Protected Overridable Sub Init()
        Try
            Capturer = New DPFP.Capture.Capture()  ' Crea una operación de captura de eventos

            If (Not Capturer Is Nothing) Then
                Capturer.EventHandler = Me 'Es el encargado de capturar los eventos
            Else
                'SetPrompt("Can't initiate capture operation!")
            End If
        Catch ex As Exception

        End Try
    End Sub

    Public Sub OnComplete(Capture As Object, ReaderSerialNumber As String, Sample As DPFP.Sample) Implements DPFP.Capture.EventHandler.OnComplete
        System.Web.HttpContext.Current.Response.Write("OnComplete") 'Se completó la lectura exitosamente
    End Sub

    Public Sub OnFingerGone(Capture As Object, ReaderSerialNumber As String) Implements DPFP.Capture.EventHandler.OnFingerGone
        System.Web.HttpContext.Current.Response.Write("OnFingerGone")
    End Sub

    Public Sub OnFingerTouch(Capture As Object, ReaderSerialNumber As String) Implements DPFP.Capture.EventHandler.OnFingerTouch
        System.Web.HttpContext.Current.Response.Write("OnFingerTouch") 'Evento de touch al lector de huellas
    End Sub

    Public Sub OnReaderConnect(Capture As Object, ReaderSerialNumber As String) Implements DPFP.Capture.EventHandler.OnReaderConnect
        System.Web.HttpContext.Current.Response.Write("OnReaderConnect") 'Lector de huellas correctamente conectado
    End Sub

    Public Sub OnReaderDisconnect(Capture As Object, ReaderSerialNumber As String) Implements DPFP.Capture.EventHandler.OnReaderDisconnect
        System.Web.HttpContext.Current.Response.Write("OnReaderDisconnect") 'Lector de huellas desconectado
    End Sub

    Public Sub OnSampleQuality(Capture As Object, ReaderSerialNumber As String, CaptureFeedback As DPFP.Capture.CaptureFeedback) Implements DPFP.Capture.EventHandler.OnSampleQuality
        System.Web.HttpContext.Current.Response.Write("OnSampleQuality")
    End Sub
End Class
