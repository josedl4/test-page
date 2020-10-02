import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute, UrlSerializer, Router } from '@angular/router';
import * as _ from 'lodash';
import * as $ from 'jquery';

import { IMenuItem, MenuService } from '@core/menu/menu.service';
import { menu } from '@routes/menu';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  router: Router;
  menuItems: IMenuItem[];

  constructor(
    public activatedRoute: ActivatedRoute,
    public injector: Injector,
    public menuService: MenuService,
    public serializer: UrlSerializer
  ) {
    this.menuItems = menuService.addMenu(_.cloneDeep(menu)).menu;
  }

  ngOnInit(): void {
    this.router = this.injector.get(Router);
  }

  formatRouteQueryParams = (route: string, queryParams: { [key: string]: string }) =>
    this.serializer.serialize(
      this.router.createUrlTree([route], { queryParams })
    )

  toggleSubmenuClick(event: Event) {

    event.preventDefault();

    const target = $(event.target || event.srcElement || event.currentTarget);
    let ul;
    let anchor = target;

    // find the UL
    if (!target.is('a')) {
      anchor = target.parent('a').first();
    }
    ul = anchor.next();

    // hide other submenus
    const parentNav = ul.parents('.sidebar-subnav');
    $('.sidebar-subnav').each((idx, el) => {
      const $el = $(el);
      // if element is not a parent or self ul
      if (!$el.is(parentNav) && !$el.is(ul)) {
        this.closeMenu($el);
      }
    });

    // abort if not UL to process
    if (!ul.length) {
      return;
    }

    // any child menu should start closed
    ul.find('.sidebar-subnav').each((idx, el) => {
      this.closeMenu($(el));
    });

    // toggle UL height
    if (parseInt(ul.height(), 0)) {
      this.closeMenu(ul);
    } else {
      // expand menu
      ul.on('transitionend', () => {
        ul.height('auto').off('transitionend');
      }).height(ul[0].scrollHeight);
      // add class to manage animation
      ul.addClass('opening');
    }
  }

  closeMenu(elem) {
    elem.height(elem[0].scrollHeight); // set height
    elem.height(0); // and move to zero to collapse
    elem.removeClass('opening');
  }
}
