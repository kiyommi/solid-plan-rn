type RootStackParamList = {
    Home: {user: User};
    Inventory: {user: User};
    ShoppingList: {user: User};
    SignUp: undefined;
    SignIn: undefined;
  };


 type SignInFields = {
    email: string;
    password: string;
 };

 type InventoryItem = {
   id: string;
   name: string;
   expiryDate: Date;
 }

type Product = {
  id: string;
  name: string;
  type: ProductType;
  imageUrl?: string;
}

 type ShoppingItem = {
   id: string;
   amount: string; 
   amountType: AmountType;
 }

 type ItemPropToUpdate = {
  amountType?: AmountType;
  amount?: string;
}

 interface PopulatedShoppingItem extends ShoppingItem {
    name: string;
    type: ProductType;
    imageUrl?: string;
 }
