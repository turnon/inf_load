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

    $.inf_load = function loadp(cur_p, content, limit){

        // hold the continuously coming content
        var $place = $(content).parent();

        limit = (limit || 99);

        function newContent(){
            var $d = $('<div/>');
            $place.append($d);
            return $d;
        }

        function next_link(doc){
            if(--limit == 0) return;
            var l = $(doc).find(cur_p).next().attr('href');
            return l;
        }

        function process_page(data){
            $place.append($(data).find(content));
            link = next_link(data);
            console.log(link);
            if(!link) return;
            _loadp(link);
        }

        function _loadp(link){
            $.get(link, process_page);
        }

        _loadp(next_link(document));

    }

    var slt = selectors();

    if(slt){
        $.inf_load.apply(null, slt);
    }

}

jQuery(document).ready(function(){
    console.log('ready');
    work_with(jQuery);
});