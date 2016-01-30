(function($){

    $.inf_load = function loadp(cur_p, content, limit){

        // hold the continuously coming content
        var $place = $(content).parent();

        // hold the pagination bar
        var $tmp = $('<div/>').hide();
        $place.prepend($tmp);

        // 
        var page_bar_class = '.' + $(cur_p).parent().closest("[class]").attr("class");

        // loaded pages
        var count = 1;
        limit = limit || 99;

        function _loadp(){

            var $d = $('<div/>');
            $place.append($d);

            $d.load(link + ' ' + content);

            $tmp.load(link + ' ' + page_bar_class, nextLinkAndLoad);

        }

        function nextLinkAndLoad(){
            link = $(this).find(cur_p).next().attr('href');
            count++;
            console.log(link);
            if(!link || count > limit) return;
            _loadp();
        }
        
        nextLinkAndLoad.apply(document);

    }

})(jQuery);