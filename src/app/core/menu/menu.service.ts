import { Injectable } from '@angular/core';

export interface IMenuItem {
    text: string;
    link: string;
    icon: string;
}

@Injectable()
export class MenuService {

    menuItems: IMenuItem[];

    constructor() {
        this.menuItems = [];
    }

    public addMenu = (items: IMenuItem[]): { menu: IMenuItem[] } => {
        this.menuItems = items;
        return { menu: this.menuItems };
    }
    public getMenu = () => this.menuItems;

}
