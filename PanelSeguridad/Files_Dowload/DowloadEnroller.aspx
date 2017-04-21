<%@ Page Title="Descarga EnrollermentAPP" Language="vb" AutoEventWireup="false" CodeBehind="DowloadEnroller.aspx.vb" Inherits="PanelSeguridad.DowloadEnroller" %>
<%  Response.Cache.SetCacheability(HttpCacheability.NoCache)
    Response.Cache.SetAllowResponseInBrowserHistory(False)
    Response.AddHeader("cache-control", "private")
    Response.AddHeader("pragma", "no-cache")
    Response.CacheControl = "Private"
    Response.ExpiresAbsolute = #1/5/2000 12:12:12#
    Response.AddHeader("Cache-Control", "no-cache, no-store, must-revalidate") ' HTTP 1.1.
    Response.AddHeader("Pragma", "no-cache") ' HTTP 1.0.
    Response.AddHeader("Expires", "0") ' Proxies.
    Response.Expires = -1
    Response.Buffer = True%>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>SASIF Personas</title>
    <link rel="icon" type="image/png" href="../Images/LOGO_WEB.png" />
</head>
<body>
    <form id="form1" runat="server">
    </form>
</body>
</html>
