/**
 * This sorting plug-in for DataTables will sort by any number in columns, ignoring text.
 * Plain text columns are pushed to the bottom of the table, both ascending and descending.
 *
 * @author [David A. D Konrad]  davidkonrad at gmail dot com
 * 
 * By any numbers means
 *
 *  - integers, like 66
 *  - floats, like 66.66
 *  - negative numbers, like -66.66
 *  - exponental numbers, like 66.66e+10
 *  - illegal numbers, like 066, which is considered as 66 
 *
 *  @example
 *    $('#example').dataTable( {
 *       columnDefs: [
 *         { type: 'sort-numbers-ignore-text', targets : 0 }
 *       ]
 *    } );
 *
 *   demo : http://jsfiddle.net/6qmkY/
 *
 */
 
function sortNumbersIgnoreText(a, b, high) {
    var reg = /[+-]?((\d+(\.\d*)?)|\.\d+)([eE][+-]?[0-9]+)?/;    
    a = a.match(reg);
    a = a !== null ? parseFloat(a[0]) : high;
    b = b.match(reg);
    b = b !== null ? parseFloat(b[0]) : high;
    return ((a < b) ? -1 : ((a > b) ? 1 : 0));    
}

jQuery.extend( jQuery.fn.dataTableExt.oSort, {
    "sort-numbers-ignore-text-asc": function (a, b) {
        return sortNumbersIgnoreText(a, b, Number.POSITIVE_INFINITY);
    },
    "sort-numbers-ignore-text-desc": function (a, b) {
        return sortNumbersIgnoreText(a, b, Number.NEGATIVE_INFINITY) * -1;
    }
});
