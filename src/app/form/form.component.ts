import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  // define um formGroup
  clientForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]], // define formControl - pode ser this.fb.control('')
    address: ['', [Validators.required]],
    phones: this.fb.array([this.fb.control('', [Validators.required])]), // define um formArray

    // formArray com objeto
    // inicia vazio
    dependents: this.fb.array([]),
    // inicia com um elemento
    // dependents: this.fb.array([
    //   this.fb.group({
    //     name: [''],
    //     age: [''],
    //   }),
    // ]),
  });

  // listas (arrays) de telefone e dependentes
  phones = this.clientForm.get('phones') as FormArray;
  dependents = this.clientForm.get('dependents') as FormArray;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  addEmployee() {
    console.log(this.clientForm.value);
  }

  addPhone() {
    this.phones.push(this.fb.control('', [Validators.required]));
  }

  addDependent() {
    this.dependents.push(
      this.fb.group({
        name: ['', [Validators.required]],
        age: ['', [Validators.min(0)]],
      })
    );
  }

  removeChild(i: number) {
    this.dependents.removeAt(i);
  }
}
