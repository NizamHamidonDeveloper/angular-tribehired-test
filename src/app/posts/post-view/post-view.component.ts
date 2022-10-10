import { Component, OnInit,ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Subject, Observable, of } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { Location } from '@angular/common';
import { PostsService } from 'src/app/shared/service/posts.service';
import { CommentListInterface, PostListInterface } from 'src/app/model/post.model';
import { FormBuilder, FormGroup,  FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  idSubscription!: Subscription;
  id!: number;
  isLoading: boolean = false;
  postDetail$!: Observable<PostListInterface>;
  commentList$!: Observable<Array<CommentListInterface>>

  formGroup!: FormGroup;
  titleAlert: string = 'This field is required';

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private cdr: ChangeDetectorRef,
    private location: Location,
    private formBuilder: FormBuilder
  ) {

   }

  ngOnInit(): void {
    this.idSubscription = this.route.paramMap.subscribe(params =>{
      this.id = Number( params.get('id'));
      this.getPostDetailByID(this.id);
      this.getCommentListByID(this.id);

    })

    this.createForm();
  }

  getPostDetailByID(id: number) {
    this.isLoading = true;
    this.postDetail$ = this.postsService.getPostsByID(id);
   
    this.isLoading = false;
  }

  getCommentListByID(id: number) {
    this.commentList$ = this.postsService.getCommentByID(id)
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      'email': [null, [Validators.required, Validators.pattern(emailregex)]],
      'name': [null, Validators.required],
      'body': [null, Validators.required],
    });
  }

  getErrorEmail() {
    return this.formGroup.get('email')!.hasError('required') ? 'Field is required' :
      this.formGroup.get('email')!.hasError('pattern') ? 'Not a valid emailaddress' :
        this.formGroup.get('email')!.hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
  }

  get name() {
    return this.formGroup.get('name') as FormControl
  }

  back() {
    this.location.back();
  }

  onSubmit(post: any) {
    console.log(post);

    this.commentList$ = this.postsService.getCommentByID(this.id).pipe(
      map(data => data.filter(p => p.email === post.email || p.name === post.name || p.body === post.body))
      );
  }

  resetForm() {
    this.getCommentListByID(this.id);
    this.formGroup.get('email')?.setValue('');
    this.formGroup.get('email')?.updateValueAndValidity();
      this.formGroup.get('name')?.setValue('');
      this.formGroup.get('name')?.updateValueAndValidity();
        this.formGroup.get('body')?.setValue('');
        this.formGroup.get('body')?.updateValueAndValidity();
  }

  ngOnDestroy(): void {
    
  }
}
