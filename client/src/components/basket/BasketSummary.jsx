import React, {useContext} from 'react';
import { StoreContext } from '../../context/StoreContext';

const BasketSummary = () => {

    const {basket} = useContext(StoreContext);


  const subtotal = basket?.basketItem.reduce((sum, item) => (sum+item.price*item.quantity), 0)/100;
  const del = (subtotal>500) ? 0 : 50
  const tax = subtotal * 18/100
  const total = subtotal + del + tax

  return (
      <>
      <table className='table '>
          <thead>
              <tr>
                  <th colSpan={2}>Order Summary</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td>Sub-total</td>
                  <td>₹{subtotal}</td>
              </tr>
              <tr>
                  <td>Delivery Cost</td>
                  <td>₹{del}</td>
              </tr>
              <tr>
                  <td>GST</td>
                  <td>₹{tax}</td>
              </tr>
          </tbody>
          <tfoot>
              <tr><td>Total</td><td><h4><b>₹{total}</b></h4></td></tr>
              <tr><td colSpan={2}><i>*No delivery charges for orders above ₹500</i></td></tr>
          </tfoot>

      </table>
      </>
  )
};

export default BasketSummary;
