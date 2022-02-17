using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("BasketItems")]
    public class BasketItem
    {
        public int Id { get; set; }

        public int Quantity { get; set; }

        //navigation property || Foreign Key
        public int ProductId { get; set; }
        public Product Product { get; set; }  //this is used to refer the ProductId above to the Product Id in the Product.cs class and also to have the Product

        public int BasketId { get; set; }
        public Basket Basket { get; set; }
    }
}