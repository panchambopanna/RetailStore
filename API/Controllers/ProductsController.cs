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

        public ProductsController(StoreContext context) //this fetches our store.db and assigns it to context
        {
            _context = context; // we copy to local
           
        }

        // return list of products
        [HttpGet]
        // public ActionResult<List<Product>> GetProducts() // sync
        public async Task<ActionResult<List<Product>>> GetProducts()  //async
        {
            //here we access the Product table from Store.db and convert it to list
            // var products = context.Products.ToList();  //sync
             var products = await _context.Products.ToListAsync(); // async

            // we return the products
            return Ok(products); // we can also return products form above line
        }

        // return inidividual products
        [HttpGet("{id}")] //api/products/2
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            // here we call the store.db -> Product table and check if there is a product with the id passed
            // return context.Products.Find(id);
            var product = await _context.Products.FindAsync(id);    //assign it to the product

            if (product == null) return NotFound();

            return product; // returns that particular product
        }
    }
}