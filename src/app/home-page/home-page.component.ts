import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { HomePageService } from '../services/homepage.service';
import { HighlightService } from '../services/highlight.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  slides: any[] = new Array(3).fill({
    id: -1,
    src: '',
    title: '',
    subtitle: '',
  });
  isAccept: any = false;
  highlighted: boolean = false;
  sections: any[] = [];
  htmlToAdd: string =
    // '<pre><code class="lang-c"> </code></pre>';
    '<h2>Get Started With C</h2><p>To start using C, you need two things:</p><ul><li>A text editor, like Notepad, to write C code</li><li>A compiler, like GCC, to translate the C code into a language that the computer will understand</li></ul><p>There are many text editors and compilers to choose from. In this tutorial, we will use an&nbsp;<strong><em>IDE&nbsp;</em></strong>(see below).</p><h1>Example:</h1><pre><code class="lang-c">#include &lt;stdio.h&gt;\n\nint main() {\n  printf("Hello World!");\n  return 0;\n}\n</code></pre>';

  constructor(
    private route: Router,
    private home: HomePageService,
    private highlightService: HighlightService
  ) {}

  public visible = false;

  closeDialog() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  ngAfterViewChecked() {
    if (!this.highlighted) {
      this.highlightService.highlightAll();
      this.highlighted = true;
    }
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
    this.getAllLessons();
    this.highlightService.highlightAll();
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

  getAllLessons() {
    this.home.getAllSectionsInfo().subscribe({
      next: (res) => {
        if (res) {
          this.sections = res;
        }
      },
    });
  }
}
