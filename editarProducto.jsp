<%-- 
    Document   : editarProducto
    Created on : 20/05/2025, 8:23:19 p. m.
    Author     : LENOVO
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ page import="logica.Producto" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <%
            Producto producto = (Producto) request.getAttribute("producto");
        %>

        <h2>Editar Producto</h2>

        <form action="EditarProductoServlet" method="post">
            <input type="hidden" name="id" value="<%= producto.getId() %>">
            
            <label>Nombre:</label>
            <input type="text" name="nombre" value="<%= producto.getNombre() %>"><br>

            <label>Precio:</label>
            <input type="number" step="0.01" name="precio" value="<%= producto.getPrecio() %>"><br>

            <label>Stock:</label>
            <input type="number" name="stock" value="<%= producto.getStock() %>"><br>

            <label>Descripción:</label>
            <textarea name="descripcion"><%= producto.getDescripcion() %></textarea><br>

            <label>URL de imagen:</label>
            <input type="text" name="imagen" value="<%= producto.getImagen() %>"><br>

            <input type="submit" value="Guardar Cambios">
        </form>
    </body>
</html>
