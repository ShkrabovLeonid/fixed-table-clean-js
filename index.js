"use strict";

export default class fixedTable {
    constructor({tableSelector}){
        this.table = document.querySelector(tableSelector),
        this.allTdTable = this.table.querySelectorAll("tbody > tr:nth-child(1) > td"),
        this.allThTable = this.table.querySelectorAll("thead > tr > th"),
        this.fixedSelectorHeadTR = this.table.querySelector("thead > tr"),
        this.fixedSelectorBodyTR = this.table.querySelectorAll("tbody > tr");
        this.init();
    }
    
    init() {
        this.fixedHeaderTable();
        this.events();
    }

    fixedHeaderTable() {
        let width = [];
        for (let i = 0; i < this.allThTable.length; i++) {
            let widthTd = getComputedStyle(this.allTdTable[i]).width.replace(/px/g, '');
            let widthTh = getComputedStyle(this.allThTable[i]).width.replace(/px/g, '');
            width.push((widthTd > widthTh) ?  widthTd : widthTh);
            let widthHeader = (widthTd > widthTh) ?  widthTd : widthTh;
            this.allThTable[i].style.width = `${widthHeader}px`;
        }
        this.setOrDelCssSelector(width, 'flex', '42px');
    }

    cleardisplay() {
        for (let i = 0; i < this.allThTable.length; i++) {
            this.allThTable[i].style.width = '';
            this.allThTable[i].style.backgroundColor = '';
            this.allThTable[i].style.color = '';
        }
        this.setOrDelCssSelector('', '', '');
    }

    setOrDelCssSelector(widthArr, flex, px) {
        this.fixedSelectorBodyTR.forEach(element => {
            element.style.display = flex;
            for (let i = 0; i < element.children.length; i++) {
                element.children[i].style.width = (widthArr === '') ? '' : `${widthArr[i]}px`;
            }
        });
        this.fixedSelectorHeadTR.parentElement.style.display = flex;
        this.fixedSelectorHeadTR.parentElement.style.height = px;
        this.fixedSelectorHeadTR.style.display = flex;
    }

    topFixed() {
        let tableHeight = +getComputedStyle(this.table).height.replace(/px/g, '');
        let indentBeforeTable = this.table.offsetTop;
        let scrollPosition = window.pageYOffset;

        if (scrollPosition > indentBeforeTable && scrollPosition < (indentBeforeTable + tableHeight)) {
            this.fixedSelectorHeadTR.style.top = '0';
            this.fixedSelectorHeadTR.style.position = 'fixed';
            this.horizontalScroll();
        }
        if (scrollPosition < indentBeforeTable) {
            this.fixedSelectorHeadTR.style.top = '';
            this.fixedSelectorHeadTR.style.position = '';
        }
        if (scrollPosition > (indentBeforeTable + tableHeight)) {
            this.fixedSelectorHeadTR.style.top = '';
            this.fixedSelectorHeadTR.style.position = '';
        }   
    }

    horizontalScroll() {
        this.fixedSelectorHeadTR.style.left = `-${window.pageXOffset}px`;
    }

    events() {
        window.addEventListener('resize', () => {
            this.cleardisplay();
            this.fixedHeaderTable();
        });
        window.addEventListener('scroll', ()=>{
            this.topFixed();
        });   
    }
}