import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {CocktailComponent} from "./components/cocktail.component";
import {AsyncPipe, NgIf} from "@angular/common";

@NgModule({
    declarations: [
        CocktailComponent
    ],
    exports: [
        CocktailComponent
    ],
    imports: [
        AsyncPipe,
        NgIf
    ]
})
export class AppModule {}
