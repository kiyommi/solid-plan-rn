interface SignInResponse extends Response {
    user?: User;
    error?: string;
}

type BaseCredentials = {
    email: string,
    password: string,
}

interface Credentials extends BaseCredentials {
    confirmEmail: string;
    confirmPassword: string;
}

interface User {
    id: string;
    name: string;
    shoppingList? : ShoppingItem[]  
}
