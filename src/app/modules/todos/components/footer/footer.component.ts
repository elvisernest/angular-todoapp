import { Component } from "@angular/core";
import { TodosService } from "../../services/todos.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { FilterEnum } from "../../types/filter.enum";

@Component({
    selector: 'app-todos-footer',
    templateUrl: './footer.component.html'
})
export class FooterComponent {
    noTodoClass$: Observable<boolean>
    activeCount$: Observable<number>
    itemsLeftText$: Observable<string>
    filter$: Observable<FilterEnum>
    filterEnum = FilterEnum;

    constructor(private todosService: TodosService) {
        this.activeCount$ = this.todosService.todos$.pipe(
            map((todos) => todos.filter((todos) => !todos.isCompleted).length)
        );
        // note: not a good practice to write a ternary operator inside a string 
        this.itemsLeftText$ = this.activeCount$.pipe(
            map((activeCount) => `item${activeCount !== 1 ? 's': ''} left`)
        );
        this.noTodoClass$ = this.todosService.todos$.pipe(
            map((todos) => todos.length === 0)
        );
        this.filter$ = this.todosService.filter$
    }

    changeFilter(event: Event, filterName: FilterEnum): void {
        event.preventDefault();
        this.todosService.changeFilter(filterName);
    }

}