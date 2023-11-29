import { Component, Input } from '@angular/core';
import { ExercisesService } from '../services/exercises.service';
import { CComplierService } from '../services/c.complier.service';
import { CodeModel } from '@ngstack/code-editor';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css'],
})
export class ExercisesComponent {
  @Input() activeTheme = 'vs';
  @Input() readOnly = false;
  @Input()
  userName: any;
  exercises: any[] = [];
  userNameParse: any;
  taskTitle: any;
  codeTemplate: any;
  descriptionTask: any;

  isCompile = false;
  output: string = '';
  codeRes: string = '';
  theme = 'vs-dark';

  codeModel: CodeModel = {
    language: 'c',
    uri: '',
    value: '',
  };

  options = {
    contextmenu: false,
    minimap: {
      enabled: true,
    },
  };

  taskId = '';
  disableCompile: boolean = true;
  isMatch: boolean = false;
  stdin = '';
  taskInput = false;
  constructor(
    private ex: ExercisesService,
    private toastr: ToastrService,
    private cCompilerService: CComplierService
  ) {}

  ngOnInit(): void {
    let a: any = localStorage.getItem('userName');
    this.userNameParse = JSON.parse(a);
    this.userName = this.userNameParse.userName;
    this.getAllExercises();
    this.getTaskById(1);
  }

  getAllExercises() {
    this.ex.getAllExercises(this.userName).subscribe({
      next: (res) => {
        this.exercises = res;
      },
    });
  }

  getTaskById(id: any) {
    this.codeModel = {
      language: 'c',
      uri: '',
      value: '',
    };

    this.output = '';
    this.taskInput = false;
    this.taskId = id;
    this.ex.getTaskById(id).subscribe({
      next: (res) => {
        if (res) {
          this.taskTitle = res.taskTitle;
          this.descriptionTask = res.descriptionTask;
          this.codeTemplate = res.instruction;
          this.codeRes = res.taskOutput.replace(/\\n/g, '\n');
          if (res.taskInput) {
            this.taskInput = true;
          }
        }
      },
    });
  }

  onCodeChanged(value: any) {
    if (value && value.length > 0) {
      this.disableCompile = false;
    }
  }

  compileCode() {
    this.isCompile = true;
    this.cCompilerService
      .compile(this.codeModel.value, this.stdin)
      .subscribe((res: any) => {
        this.output = res.output;
        this.isCompile = false;
        if (this.output == this.codeRes) {
          this.codeRes = res.output;
          this.ex.getCompleteTask().subscribe((result: any) => {
            result.map((x: any) => {
              if (x.taskId == this.taskId) {
                this.toastr.warning(
                  'Bài này đã hoàn thành. Bạn không cần nộp lại!',
                  'Thông báo',
                  {
                    timeOut: 1000,
                    positionClass: 'toast-bottom-right',
                  }
                );
                this.isMatch = true;
              }
            });
            if (this.isMatch === false) {
              this.ex.addCompleteTask(this.taskId).subscribe(res);
              this.toastr.success('Nộp bài thành công!', 'Thông báo', {
                timeOut: 1000,
                positionClass: 'toast-bottom-right',
              });
              this.isMatch = false;
            }
          });
        }
      });
  }

  compileCodeTest() {
    this.isCompile = true;
    this.cCompilerService
      .compile(this.codeModel.value, this.stdin)
      .subscribe((res: any) => {
        this.output = res.output;
        this.isCompile = false;
        if (this.output == this.codeRes) {
          this.codeRes = res.output;
        }
      });
  }
}
