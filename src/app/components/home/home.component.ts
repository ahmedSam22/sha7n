import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {

  }
  openwhatsapp(){
    window.open(` https://wa.me/+966582402953`)
  }

}
