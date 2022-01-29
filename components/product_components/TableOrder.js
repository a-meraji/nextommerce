export default function TableOrder({ cart }) {
  return (
    <>
        <table className="text-left my-3 p-1 border-2 border-[#383434]">
      <tr className="text-sm">
        <th>Product Name</th>
        <th>Color</th>
        <th>Amount</th>
        <th>Price</th>
        <th>Subtotal</th>
      </tr>
      {cart.map((item,i)=><tr className="text-xs" key={i}>
        <td>{item.name.replace(/_/g, " ")}</td>
        <td>{item.color}</td>
        <td>{item.amount}</td>
        <td>{item.price}$</td>
        <td>{item.price*item.amount}$</td>
      </tr>)}
      <style jsx>{`
      tr:nth-child(even){
        background: #e0e0e0;
        color:#000;
      }
      tr:nth-child(odd){
        background: #4e4e4e;
        color:#e0e0e0;
      }
      th, td{
        border:1px solid #777;
        padding: 3px 0 3px 3px;
      }
      `}</style>
    </table>
      </>
  );
}
