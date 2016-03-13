function selectors() {

    var url = window.location.href;
    var selector = null;

    for (var pattern in supported) {
        var re = new RegExp(pattern);
        if (url.match(re)) {
            selector = supported[pattern];
            console.log(pattern, selector);
            break;
        }
    }

    return selector;
}

function loadp(cur_p, content, limit){

    var $tail = $(content).last();

    limit = (limit || 99);

    function next_link(doc){
        if(--limit == 0) return;
        var $nex_p = ((typeof cur_p == "function") ? cur_p(doc) : $(doc).find(cur_p)).next();
        var link = ($nex_p.is('a') ? $nex_p : $nex_p.find('a')).attr('href');
        console.log(link);
        return link;
    }

    function process_page(data){
        var $cnt = $(data).find(content);
        console.log($cnt, $cnt.length);
        $tail.after($cnt);
        $tail = $cnt.last();
        _loadp(next_link(data));
    }

    function _loadp(link){
        link && $.get(link, process_page);
    }

    _loadp(next_link(document));

}

var slt = selectors();

slt && $(document).ready(function(){
    console.log('ready');
    loadp.apply(null, slt);
});