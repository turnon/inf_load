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
            var l = $(doc).find(cur_p).next().attr('href');
            return l;
        }

        function process_page(data){
            $place.append($(data).find(content));
            link = next_link(data);
            limit--;
            console.log(link);
            if(!link || limit == 0) return;
            _loadp(link);
        }

        function _loadp(link){
            $.get(link, process_page);
        }

        _loadp(next_link(document));

    }

    $.inf_load(".page_css b", ".Mid2L_con");
    $.inf_load(".page_active", ".center");

}

jQuery(document).ready(function(){
    console.log('ready');
    work_with(jQuery);
});