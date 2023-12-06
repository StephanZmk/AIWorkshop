import { Component, OnDestroy, OnInit } from '@angular/core';
import { CocktailService } from './cocktail.service';
import { forkJoin, Subscription } from 'rxjs';
import { map, mergeMap, toArray } from 'rxjs/operators';

@Component({
    selector: 'app-cocktail',
    templateUrl: './cocktail.component.html',
})
export class CocktailComponent implements OnInit, OnDestroy {
    isPerfect: boolean = false;
    private subscription: Subscription = new Subscription();

    constructor(private cocktailService: CocktailService) {
    }

    ngOnInit() {
        this.subscription = forkJoin([
            this.cocktailService.getLiquidIngredients(),
            this.cocktailService.getSolidIngredients()
        ]).pipe(
            map(([ liquids, solids ]) => [...liquids, ...solids]),
            mergeMap(ingredients => ingredients),
            this.filterAndMapIngredients(),
            toArray(),
            map(ingredients => this.checkCocktailComposition(ingredients))
        ).subscribe(isPerfectMix => {
            this.isPerfect = isPerfectMix;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    filterAndMapIngredients() {
        return map((ingredient: string) => {
            const parts = ingredient.split(' ');
            return { name: parts.slice(1).join(' '), amount: parts[1] };
        });
    }


    checkCocktailComposition(ingredients: { name: string, amount: string | null }[]): boolean {
        const requiredLiquids = {
            'Bourbon Whisky': '4cl',
            'Zitronensaft': '3cl',
            'Zuckersirup': '1.5cl'
        };

        const requiredSolids = ['Zitronenschale', 'Eiweiß', 'Eiswürfel'];

        const solidsCheck = requiredSolids.every(solid =>
            ingredients.some(ingredient => ingredient.name.includes(solid))
        );

        const liquidsCheck = Object.entries(requiredLiquids).every(([key, value]) =>
            ingredients.some(ingredient => ingredient.name.includes(key) && (ingredient.amount === value || ingredient.amount === null))
        );

        return solidsCheck && liquidsCheck;
    }
}
