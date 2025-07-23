import Products from './Products';
import ShoppingCart from './components/ShoppingCart';
import Total from './components/Total';

export default function ZustandExample() {
  return (
    <div>
      <div style={{ marginBottom: '20px', backgroundColor: '#f0f0f0', padding: '10px' }}>
        <Total />
      </div>
      <ShoppingCart />
      <hr style={{ margin: '20px 0', border: '1px solid #eee' }} />
      <Products />
    </div>
  );
}
