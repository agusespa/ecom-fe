import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ShoppingFacade } from 'src/app/facade/shopping.facade';
import { Product } from 'src/app/models/Product';

@Component({
    selector: 'app-product-page',
    templateUrl: './product-page.component.html',
    styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit, OnDestroy {
    product$: Observable<Product | undefined>;
    productId: string;

    private destroy$ = new Subject<void>();

    constructor(
        private shoppingFacade: ShoppingFacade,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
            const id = params['id'];
            this.productId = id;
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
