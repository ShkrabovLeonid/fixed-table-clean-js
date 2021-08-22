# fixed-table-clean-js

Install:  
`npm install fixed-table-clean-js`  

Create table (example):
```
<table id="fixedTable">
    <thead>
        <tr>
            <th></th>
            <th></th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    </tbody>
</table>
```

Init:  
```
import fixedTable from 'fixed-table-clean-js';  

try{
    new fixedTable({tableSelector: "#fixedTable"});
}catch (e){
    console.error(e);
}
```

Fixed Header Table
DEMO: https://goodday.block.kiev.ua/fixed-table/