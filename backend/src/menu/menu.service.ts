import { Injectable } from '@nestjs/common';

@Injectable()
export class MenuService {
  async getAll() {
    return [
      {
        id: 1,
        type: 'food',
        name: 'Pizza Margarita',
        ingriedients: ['Pesto czerwone', 'Ser'],
        price: 1800,
        vegan: true,
      },
      {
        id: 2,
        type: 'food',
        name: 'Pizza Pepperoni',
        ingriedients: ['Pesto czerwone', 'Ser', 'Salami Picante'],
        price: 2200,
        vegan: false,
      },
    ];
  }
}
