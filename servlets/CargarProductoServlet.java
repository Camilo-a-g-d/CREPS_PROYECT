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
@WebServlet(name = "CargarProductoServlet", urlPatterns = {"/CargarProductoServlet"})
public class CargarProductoServlet extends HttpServlet {
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
