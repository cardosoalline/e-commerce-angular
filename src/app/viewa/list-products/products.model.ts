export class Products {
  'id': number;
  'name': string;
  'category': string;
  'img': string;
  'price': number;

  constructor(
    id: number,
    name: string,
    category: string,
    img: string,
    price: number
  ) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.img = img;
    this.price = price;
  }
}
