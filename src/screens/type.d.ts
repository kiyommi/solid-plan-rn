type RootStackParamList = {
    Home: {user: User};
    Inventory: {user: User};
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

