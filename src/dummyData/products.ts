import { ProductType } from "../types/enums";

const cucumber = {
    id: '1',
    name: 'cucumber', 
    type: ProductType.VEGETABLE,
    imageUrl: 'https://media.istockphoto.com/id/967491012/photo/whole-with-slice-cucumber-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=Kmeq5UlXegj7sQEGicTWbxqngB3j57JZBmOM-P_nTwU=',
};

const tomato = {
    id: '2',
    name: 'tomato', 
    type: ProductType.FRUIT,
    imageUrl: 'https://t4.ftcdn.net/jpg/03/27/96/23/360_F_327962332_6mb5jQLnTOjhYeXML7v45Hc5eED2GYOD.jpg',
};

const eggs = {
    id: '3',
    name: 'eggs', 
    type: ProductType.PROTEIN,
    imageUrl: 'https://img.freepik.com/free-photo/brown-eggs_2829-13455.jpg',
};

const flour = {
    id: '4',
    name: 'flour', 
    type: ProductType.GRAIN,
    imageUrl: 'https://media.istockphoto.com/id/861019856/photo/whole-grain-flour-in-a-wooden-bowl-and-sackcloth-bagwith-ears.jpg?s=612x612&w=0&k=20&c=TMt0RqMcxGkyhtdso5tDywcbkWNEbSB8tzAxngrW8PA=',
};

const milk = {
    id: '5',
    name: 'milk', 
    type: ProductType.DAIRY,
    imageUrl: 'https://thumbs.dreamstime.com/b/milk-jug-glass-white-background-33845266.jpg',
};


export const PRODUCTS = [cucumber, tomato, eggs, flour, milk];