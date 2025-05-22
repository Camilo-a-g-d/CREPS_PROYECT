<%-- 
    Document   : crearProducto
    Created on : 20/05/2025, 8:15:28 p. m.
    Author     : LENOVO
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <form action="CrearProductoServlet" method="post">
            Nombre: <input type="text" name="nombre" /><br/>
            Descripción: <input type="text" name="descripcion" /><br/>
            Precio: <input type="text" name="precio" /><br/>
            Stock: <input type="number" name="stock" /><br/>
            Imagen: <input type="text" name="imagen" placeholder="Ruta de imagen (ej: images/waffle1.jpg)" /><br/>
            <input type="submit" value="Guardar" />
        </form>
    </body>
</html>
