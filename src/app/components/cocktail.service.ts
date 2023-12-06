import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CocktailService {
    getLiquidIngredients(): Observable<string[]> {
        return of(['Kamillentee 8cl', 'Bourbon Whisky 4cl', 'Zitronensaft 4cl', 'Zuckersirup 1.5cl']);
    }

    getSolidIngredients(): Observable<string[]> {
        return of(['Schokoladennikolaus', 'Eiweiß', 'Eiswürfel']);
    }
}
