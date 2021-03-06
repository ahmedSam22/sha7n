import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { GlobalserviceService } from '../../globalservice/globalservice.service';
import Swal from 'sweetalert2';
import { GlobalService } from '../../shared/services/global.service'
import { catchError, first , take } from 'rxjs/operators';
import { of } from 'rxjs';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signUp!: FormGroup;
  val=0;
  thisLang:any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location,
    private service: GlobalService,
    public translate: TranslateService
  ) {
    this.thisLang = localStorage.getItem('currentLang') || navigator.language;
    console.log(this.thisLang, 'from ocnst');

    translate.use(this.thisLang || navigator.language);
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      if (event.lang == 'ar') {
        this.thisLang = 'rtl';
        console.log(this.thisLang, 'test1');
      } else {
        this.thisLang = 'ltr';
        console.log(this.thisLang, 'test2');
      }
    });
  }

  ngOnInit(): void {
    this.signUp = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.minLength(9),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirm_password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  back() {
    this.router.navigate(['/root/home']);
  }

  accept:boolean = false;

  switchaccept(){
    this.accept = !this.accept;
    console.log(this.accept);
    
  }

  show:boolean = false
  showConfirm:boolean = false
  onSubmit() {
    if (this.signUp.valid && this.accept) {
      this.service
        .singUp({ ...this.signUp.value })
        .pipe(first())
        .subscribe({
          next:(res:any) => {
            if(res?.status === false){
              console.log(res.errors[0],"wwwwwwww");
              
              Swal.fire('fail', res.errors[0], 'warning');
              return ;
            }
              Swal.fire('????????', '???? ?????????????? ??????????', 'success');
            this.router.navigate(['/root/verify-code',this.val]);
          },
          error:(error:any) => {

            Swal.fire('fail', 'Invalid Data', 'warning');
          },
        });
    }else{
      Swal.fire('fail', 'complete your data correctly', 'warning');

    }
  }
}
