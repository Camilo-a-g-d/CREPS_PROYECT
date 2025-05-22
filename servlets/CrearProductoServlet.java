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
@WebServlet(name = "CrearProductoServlet", urlPatterns = {"/CrearProductoServlet"})
public class CrearProductoServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        Producto producto = new Producto();
        producto.setNombre(request.getParameter("nombre"));
        producto.setDescripcion(request.getParameter("descripcion"));
        producto.setPrecio(Double.parseDouble(request.getParameter("precio")));
        producto.setStock(Integer.parseInt(request.getParameter("stock")));
        producto.setImagen(request.getParameter("imagen")); // aquí se guarda el enlace

        ProductoJpaController productoController = new ProductoJpaController(
            Persistence.createEntityManagerFactory("com.mycompany_CREPS_WAFFLES_war_1.0-SNAPSHOTPU")
        );

        productoController.create(producto);

        response.sendRedirect("ProductoServlet");
    }
}