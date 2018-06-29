var Page = /** @class */ (function () {
    function Page() {
        //The number of elements in the page
        this.size = 0;
        //The total number of elements
        this.totalElements = 0;
        //The total number of pages
        this.totalPages = 0;
        //The current page number
        this.pageNumber = 0;
    }
    return Page;
}());
export { Page };
var PagedData = /** @class */ (function () {
    function PagedData() {
        this.data = new Array();
        this.page = new Page();
    }
    return PagedData;
}());
export { PagedData };
//# sourceMappingURL=model.js.map