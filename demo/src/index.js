import fixedTable from "fixed-table-clean-js";

try {
    new fixedTable({tableSelector: "#fixedTable_one"});
    new fixedTable({tableSelector: "#fixedTable_two"});
} catch (error) {
    console.error(error);
}