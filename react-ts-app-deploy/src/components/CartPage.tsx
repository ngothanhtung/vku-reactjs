import BuyerForm from "./BuyerForm";
import CartList from "./CartList";

export default function CartPage() {
  return (
    <div className="space-y-8">
      <CartList />
      <BuyerForm />
    </div>
  );
}
