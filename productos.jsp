<%-- 
    Document   : productos
    Created on : 20/05/2025, 8:14:13?p.?m.
    Author     : LENOVO
--%>

<%@ page import="logica.Producto" %>
<%@ page import="java.util.List" %>
<html>
    <head><title>Productos</title></head>
    <body>
        <h2>Lista de Productos</h2>
        <a href="crearProducto.jsp">Nuevo Producto</a>
        <table border="1">
            <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Descripción</th>
                <th>Imagen</th>
                <th>Acciones</th>
            </tr>
            <%
                List<Producto> productos = (List<Producto>) request.getAttribute("listaProductos");
                for (Producto p : productos) {
            %>
            <tr>
                <td><%= p.getNombre() %></td>
                <td><%= p.getPrecio() %></td>
                <td><%= p.getStock() %></td>
                <td><%= p.getDescripcion() %></td>
                <td>
                    <img src="<%= p.getImagen() %>" width="150px" alt="Imagen del producto" />
                </td>
                <td>
                    <a href="CargarProductoServlet?id=<%= p.getId() %>">Editar</a>
                </td>
            </tr>
            <% } %>
        </table>
    </body>
</html>

