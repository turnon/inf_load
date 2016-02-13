function selectors() {

    var supported = {
        gamersky: [".page_css b", ".Mid2L_con"],
        wallpaperscraft: [".page_active", ".center", 10],
    }

    var url = window.location.host;
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

function work_with($){

    function loadp(cur_p, content, limit){

        // hold the continuously coming content
        var $place = $(content).parent();

        limit = (limit || 99);

        function next_link(doc){
            if(--limit == 0) return;
            var link = $(doc).find(cur_p).next().attr('href');
            console.log(link);
            return link;
        }

        function process_page(data){
            $place.append($(data).find(content));
            _loadp(next_link(data));
        }

        function _loadp(link){
            link && $.get(link, process_page);
        }

        _loadp(next_link(document));

    }

    var slt = selectors();

    if(slt){
        loadp.apply(null, slt);
    }

}

jQuery(document).ready(function(){
    console.log('ready');
    work_with(jQuery);
});