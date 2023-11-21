import { lessonsUrl } from './../../environments/environment.development';
import { BlockUI, BlockUIModule, NgBlockUI } from 'ng-block-ui';
import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomePageService } from '../services/homepage.service';
import { CComplierService } from '../services/c.complier.service';
import { GptService } from '../services/gpt.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI | undefined;

  slides: any[] = new Array(3).fill({
    id: -1,
    src: '',
    title: '',
    subtitle: '',
  });
  isAccept: any = false;
  highlighted: boolean = false;
  sections: any[] = [];
  contents: any = '';
  subHeader: string = '';
  subContent: string = '';
  isHideSlides: boolean = false;
  cCode: string = 'Code here';
  output: string = '';
  response: any;
  isCompile: boolean = false;
  visibleMsg = false;
  messages: any[] = [];
  isChat: boolean = false;
  isGen: boolean = false;
  newMsg: any;

  constructor(
    private route: Router,
    private home: HomePageService,
    private cCompilerService: CComplierService,
    private gptService: GptService
  ) {}

  public visible = false;

  closeDialog() {
    this.visible = !this.visible;
  }

  ngOnInit(): void {
    this.slides[0] = {
      id: 0,
      src: 'https://codelearn.io/Themes/TheCodeCampPro/Resources/Images/landing-v2/hoc-lap-trinh.png',
      title: 'Lý thuyết',
      subtitle:
        'Hệ thống cung cấp lý thuyết và bài giảng chi tiết của ngôn ngữ lập trình C.',
    };
    this.slides[1] = {
      id: 1,
      src: 'https://codelearn.io/Themes/TheCodeCampPro/Resources/Images/landing-v2/luyen-lap-trinh.png',
      title: 'Bài tập',
      subtitle: 'Hệ thống cung cấp bài tập dựa theo các chủ đề của lý thuyết.',
    };
    this.slides[2] = {
      id: 2,
      src: 'https://codelearn.io/Themes/TheCodeCampPro/Resources/Images/landing-v2/thi-lap-trinh.png',
      title: 'Trình biên dịch',
      subtitle:
        'Cung cấp trình biên dịch C hỗ trợ biên dịch mã đến từ người dùng.',
    };
    this.getAllSections();
    this.getMessage();
  }

  acceptLogout() {
    this.isAccept = true;
    if (this.isAccept) {
      localStorage.clear();
      this.route.navigate(['/sign-in']);
      this.visible = !this.visible;
    }
  }

  logout() {
    this.visible = !this.visible;
  }

  getAllSections() {
    this.home.getAllSections().subscribe({
      next: (res) => {
        if (res) {
          this.sections = res;
        }
      },
    });
  }

  showLesson(id: any) {
    this.isHideSlides = true;
    this.home.getLessonsById(id).subscribe({
      next: (res) => {
        if (res.lessonDetails.length && res.lessonDetails.length > 0) {
          this.contents = res;
          this.subHeader =
            this.contents.lessonDetails[0].lessonDetailDescription;
          this.subContent =
            this.contents.lessonDetails[0].partOfLesson[0].subContent;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  compileCode() {
    this.isCompile = true;
    this.blockUI?.start();
    this.cCompilerService.compile(this.cCode).subscribe((res: any) => {
      this.output = res.output;
      this.isCompile = false;
      this.blockUI?.stop();
    });
  }

  toggleGpt() {
    this.isChat = !this.isChat;

    // this.isCompile = true;
    // this.blockUI?.start();
    // const prompt = 'The meaning of the number 369';

    // this.gptService.callGptAPI(prompt).subscribe((data) => {
    //   this.response = data.choices[0].message.content;
    //   this.isCompile = false;
    //   this.blockUI?.stop();
    // });
  }

  toggleCollapse(): void {
    this.visibleMsg = !this.visibleMsg;
  }

  sendMessage(event: any) {
    this.isGen = true;

    const files = !event.files
      ? []
      : event.files.map((file: any) => {
          return {
            url: file.src,
            type: file.type,
            icon: 'file-text-outline',
          };
        });

    this.messages.push({
      text: event.message,
      date: new Date(),
      reply: true,
      user: {
        name: 'You',
      },
    });

    this.gptService.callGptAPI(event.message).subscribe((data) => {
      if (data) {
        this.isGen = false;
        this.messages.push({
          text: data.choices[0].message.content,
          // text: 'test',
          date: new Date(),
          reply: false,
          user: {
            name: 'Chat GPT',
          },
        });
        localStorage.setItem('message', JSON.stringify(this.messages));
      }
    });
  }

  getMessage() {
    const oldMsg: any = localStorage.getItem('message');
    if (oldMsg && oldMsg.length > 0) {
      this.newMsg = JSON.parse(oldMsg);
      Object.keys(this.newMsg).forEach((x) => {
        this.messages.push({
          text: this.newMsg[x].text,
          date: this.newMsg[x].date,
          reply: this.newMsg[x].reply,
          user: {
            name: this.newMsg[x].user.name,
          },
        });
      });
    }
  }
}
