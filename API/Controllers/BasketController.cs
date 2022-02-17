using System;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class BasketController : BaseAPIController
{
    private readonly StoreContext _context;

    public BasketController(StoreContext context)
    {
        _context = context;
    }
    private async Task<Basket> RetrieveBasket()
    {
        return await _context.Baskets               // call Basket table
                    .Include(i => i.Items)          // check it has items
                    .ThenInclude(e => e.Product)    // check if the basketItems has products in it
                    .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);     // find the first occurence of buyer if from baskets 
    }
    private Basket CreateBasket()
    {
        var buyerId = Guid.NewGuid().ToString();
        var cookieOptions = new CookieOptions{IsEssential = true, Expires = DateTime.Now.AddDays(30)};
        Response.Cookies.Append("buyerId", buyerId, cookieOptions);
        var basket = new Basket{BuyerId = buyerId};
        _context.Baskets.Add(basket);
        return basket;
    }

    private BasketDTO MapBasketToDTO (Basket basket)
    {
        return new BasketDTO
        {
            Id = basket.Id,
            BuyerId = basket.BuyerId,
            BasketItem = basket.Items.Select(item => new BasketItemDTO
            {
                ProductId = item.ProductId,
                Name = item.Product.Name,
                Brand = item.Product.Brand,
                Type = item.Product.Type,
                PictureUrl = item.Product.PictureUrl,
                Price = item.Product.Price,
                Quantity = item.Quantity
            }).ToList()
        };
    }
    

    //End point to fetch things from basket
    [HttpGet(Name = "GetBasket")]
    public async Task<ActionResult<BasketDTO>> GetBasket()
    {
        var basket = await RetrieveBasket();

        if (basket == null) return NotFound();
        return MapBasketToDTO (basket);
    }

    // End point to add item to the basket
    [HttpPost]
    public async Task<ActionResult<BasketDTO>> AddItemToBasket(int productId, int quantity)
    {
        // get basket || create basket if basket not present
        var basket = await RetrieveBasket(); // gets basket from database
        if (basket == null ) basket = CreateBasket(); //if not present, creates ones

        // get products that has to be added
        var product = await _context.Products.FindAsync(productId);
        if(product==null) return NotFound();

        // add item to basket
        basket.AddItem(product, quantity); 

        // save the basket
        var result = await _context.SaveChangesAsync()>0; //returns the number of saves
        // if(result) return StatusCode(201);
        if (result) return CreatedAtRoute("GetBasket", MapBasketToDTO(basket));

        return BadRequest(new ProblemDetails{Title = "Problem adding item to basket"});
    }

    

    // End point to remove item from basket
    [HttpDelete]
    public async Task<ActionResult<BasketDTO>> RemoveItemFromBasket(int productId, int quantity)
    {
        // get basket
        var basket = await RetrieveBasket();
        if (basket == null) return NotFound();

        // remove item or reduce quantity 
        var product = await _context.Products.FindAsync(productId);
        if(product == null) return NotFound();
        basket.RemoveItem(product, quantity);

        // save changes
        var result = await _context.SaveChangesAsync()>0; 

        if (result) return CreatedAtRoute("GetBasket", MapBasketToDTO(basket));

        return BadRequest(new ProblemDetails{Title = "Problem removing item from basket"});
    }
}
