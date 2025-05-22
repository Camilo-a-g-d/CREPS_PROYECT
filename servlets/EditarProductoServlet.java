/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package servlets;

import java.io.IOException;
import javax.persistence.Persistence;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import logica.Producto;
import persistence.ProductoJpaController;

/**
 *
 * @author LENOVO
 */
@WebServlet(name = "EditarProductoServlet", urlPatterns = {"/EditarProductoServlet"})
public class EditarProductoServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
    
        int id = Integer.parseInt(request.getParameter("id"));
        String nombre = request.getParameter("nombre");
        double precio = Double.parseDouble(request.getParameter("precio"));
        int stock = Integer.parseInt(request.getParameter("stock"));
        String descripcion = request.getParameter("descripcion");
        String imagen = request.getParameter("imagen");

        Producto producto = new Producto(id);
        producto.setNombre(nombre);
        producto.setPrecio(precio);
        producto.setStock(stock);
        producto.setDescripcion(descripcion);
        producto.setImagen(imagen);

        ProductoJpaController controller = new ProductoJpaController(
            Persistence.createEntityManagerFactory("com.mycompany_CREPS_WAFFLES_war_1.0-SNAPSHOTPU")
        );

        try {
            controller.edit(producto);
        } catch (Exception e) {
            e.printStackTrace();
        }

        // 🔄 Redirigir al servlet que carga la lista
        response.sendRedirect("ListarProductosServlet"); // Asegúrate de que este servlet exista y cargue listaProductos
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        int id = Integer.parseInt(request.getParameter("id"));
        Producto producto = new ProductoJpaController(
            Persistence.createEntityManagerFactory("com.mycompany_CREPS_WAFFLES_war_1.0-SNAPSHOTPU")
        ).findProducto(id);

        request.setAttribute("producto", producto);
        request.getRequestDispatcher("editarProducto.jsp").forward(request, response);
    }
}