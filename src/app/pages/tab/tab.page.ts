import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.page.html',
  styleUrls: ['./tab.page.scss'],
})
export class TabPage {

  constructor(private renderer: Renderer2) { }

  animateTab(tabId: string) {
    const tabButton = document.querySelector(`ion-tab-button[tab="${tabId}"]`);

    if (tabButton) {
      this.renderer.addClass(tabButton, 'animate__animated');
      this.renderer.addClass(tabButton, 'animate__bounceIn');

      setTimeout(() => {
        this.renderer.removeClass(tabButton, 'animate__animated');
        this.renderer.removeClass(tabButton, 'animate__bounceIn');
      }, 1000); 
    }
  }


  onTabClick(tabId: string) {
    this.animateTab(tabId);

  }
}
