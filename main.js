// From https://gist.github.com/codeguy/6684588
String.prototype.slugify = function (separator = "-") {
    return this
        .toString()
        .normalize('NFD')                   // split an accented letter in the base letter and the acent
        .replace(/[\u0300-\u036f]/g, '')   // remove all previously split accents
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 ]/g, '')   // remove all chars not letters, numbers and spaces (to be replaced)
        .replace(/\s+/g, separator);
};

document.addEventListener('DOMContentLoaded', function() {
    if(self.location.href.includes('article')) {
        $.get($(".nav .active a")[0].href, function(data) { 
            $(".nav .active").append("<ul class='subnav-list'>" + $(data).find('.articleList').html() + "</ul>"); 
            $('a[href="' + location.pathname + '"]').parent().addClass('active');
            $('.nav-collapse').append('<ul class="mobile-nav-list">'+$('ul.nav-list').html()+"</ul>");
        });
    } else if(self.location.href.includes('category')) {
        $(".nav .active").append("<ul class='subnav-list'>" + $('.articleList').html() + "</ul>");
        $('a[href="' + location.pathname + '"]').parent().addClass('active');
        $('.nav-collapse').append('<ul class="mobile-nav-list">'+$('ul.nav-list').html()+"</ul>");
    }

    // Add anchor and links to all H2s on the page
    $("h2").each(function(i, el) { 
        el.id = el.innerText.slugify(); 
        $(el).wrap("<a href='#" + el.innerText.slugify() + "' style='text-decoration: none'></a>");
    });
    
    // Now if we have a URL hash, scroll to it now
    if(window.location.hash != '') {
        $("h2" + window.location.hash)[0].scrollIntoView();
    }
});
