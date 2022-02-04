using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    
    public class ProductsController : BaseAPIController
    {
        
        private readonly StoreContext _context;

        public ProductsController(StoreContext context)
        {
            _context = context;
           
        }

        // return list of products
        [HttpGet]
        // public ActionResult<List<Product>> GetProducts() // sync
        public async Task<ActionResult<List<Product>>> GetProducts()  //async
        {
            // var products = context.Products.ToList();  //sync
             var products = await _context.Products.ToListAsync(); // async

            return Ok(products); // we can also return products form above line
        }

        // return inidividual products
        [HttpGet("{id}")] //api/products/2
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            // return context.Products.Find(id);
            var product = await _context.Products.FindAsync(id);

            if (product == null) return NotFound();

            return product;
        }
    }
}