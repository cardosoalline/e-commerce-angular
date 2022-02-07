export class Products {
  'id': number;
  'name': string;
  'category': string;
  'img': string;
  'price': number;
  'descricao': string;

  constructor(
    id: number,
    name: string,
    category: string,
    img: string,
    price: number,
    descricao: string
  ) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.img = img;
    this.price = price;
    this.descricao = descricao;
  }
}
