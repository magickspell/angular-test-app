import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {ProductsService} from "../../services/products.service";
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  form = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3)
    ])
  })

  get title() {
    return this.form.controls.title as FormControl
  }

  submit() {
    this.productsService.create({
      title: this.form.value.title as string,
      price: 13.5,
      description: 'lorem ipsum set',
      image: 'https://i.pravatar.cc',
      category: 'electronic',
      rating: {
        rate: 777,
        count: 7
      }
    }).subscribe(() => {
      this.modalService.close()
    })
  }

  constructor(
    private productsService: ProductsService,
    private modalService: ModalService
  ) {

  }

  ngOnInit(): void {
  }
}
