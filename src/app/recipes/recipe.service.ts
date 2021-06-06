import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Sbrodaglia',
      'Brodo di Rana',
      'https://wips.plug.it/cips/buonissimo.org/cms/2012/02/zuppa-di-rane.jpg',
      [
        new Ingredient('Rana', 3),
        new Ingredient('Cipolla', 1),
        new Ingredient('Fagioli', 1),
      ]
    ),
    new Recipe(
      'Sugo di palle',
      'Squisito in ogni suo pelo',
      'https://www.ricetteslowcooker.it/wp-content/uploads/2020/10/polpettine-al-sugo-2.jpg',
      [
        new Ingredient('Testicoli di cammello', 6),
        new Ingredient('Carota', 1),
        new Ingredient('Cipolla', 1),
        new Ingredient('Aglio', 1),
        new Ingredient('Polpa di pomodoro', 1),
      ]
    ),
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
