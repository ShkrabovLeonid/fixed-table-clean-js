"use strict";

function fixedTable({tableSelector}) {
    const table = document.querySelector(tableSelector),
          allTdTable = table.querySelectorAll("tbody > tr:nth-child(1) > td"),
          allThTable = table.querySelectorAll("thead > tr > th"),
          fixedSelectorHeadTR = table.querySelector("thead > tr"),
          fixedSelectorBodyTR = table.querySelectorAll("tbody > tr");

    init();

    function init() {
        fixedHeaderTable();
        events();
    }

    function fixedHeaderTable() {
        let width = [];
        for (let i = 0; i < allThTable.length; i++) {
            let widthTd = getComputedStyle(allTdTable[i]).width.replace(/px/g, '');
            let widthTh = getComputedStyle(allThTable[i]).width.replace(/px/g, '');
            width.push((widthTd > widthTh) ?  widthTd : widthTh);
            let widthHeader = (widthTd > widthTh) ?  widthTd : widthTh;
            allThTable[i].style.width = `${widthHeader}px`;
        }
        setOrDelCssSelector(width, 'flex', '42px');
    }
    function cleardisplay() {
        for (let i = 0; i < allThTable.length; i++) {
            allThTable[i].style.width = '';
            allThTable[i].style.backgroundColor = '';
            allThTable[i].style.color = '';
        }
        setOrDelCssSelector('', '', '');
    }
    function setOrDelCssSelector(widthArr, flex, px) {
        fixedSelectorBodyTR.forEach(element => {
            element.style.display = flex;
            for (let i = 0; i < element.children.length; i++) {
                element.children[i].style.width = (widthArr === '') ? '' : `${widthArr[i]}px`;
            }
        });
        fixedSelectorHeadTR.parentElement.style.display = flex;
        fixedSelectorHeadTR.parentElement.style.height = px;
        fixedSelectorHeadTR.style.display = flex;
    }

    function topFixed() {
        console.log('topFixed');
        let tableHeight = +getComputedStyle(table).height.replace(/px/g, '');
        let indentBeforeTable = table.offsetTop;
        let scrollPosition = window.pageYOffset;

        if (scrollPosition > indentBeforeTable && scrollPosition < (indentBeforeTable + tableHeight)) {
            fixedSelectorHeadTR.style.top = '0';
            fixedSelectorHeadTR.style.position = 'fixed';
            horizontalScroll();
        }
        if (scrollPosition < indentBeforeTable) {
            fixedSelectorHeadTR.style.top = '';
            fixedSelectorHeadTR.style.position = '';
        }
        if (scrollPosition > (indentBeforeTable + tableHeight)) {
            fixedSelectorHeadTR.style.top = '';
            fixedSelectorHeadTR.style.position = '';
        }   
    }

    function horizontalScroll() {
        fixedSelectorHeadTR.style.left = `-${window.pageXOffset}px`;
    }

    function events() {
        window.addEventListener('resize', () => {
            cleardisplay();
            fixedHeaderTable();
        });
        window.addEventListener('scroll', ()=>{
            topFixed();
        });   
    }
}

module.exports = fixedTable;