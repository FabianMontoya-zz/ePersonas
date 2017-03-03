Public Class DowloadEnroller
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        DescargarArchivo()
    End Sub

    Private Sub DescargarArchivo()
        'Limpiamos la salida
        Response.Clear()
        'Con esto le decimos al browser que la salida sera descargable
        Response.ContentType = "application/octet-stream"
        'esta linea es opcional, en donde podemos cambiar el nombre del fichero a descargar (para que sea diferente al original)
        Response.AddHeader("Content-Disposition", "attachment; filename=EnrollermentAPP.exe")
        'Escribimos el fichero a enviar 
        Response.WriteFile("EnrollerSetup.exe")
        'volcamos el stream 
        Response.Flush()
        'Enviamos todo el encabezado ahora
        Response.End()
    End Sub

End Class