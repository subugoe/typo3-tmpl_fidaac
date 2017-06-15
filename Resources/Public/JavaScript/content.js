$(function() {

    /**
     * Take content without title,
     * take title, if present
     * take text,
     * divide by half and put into two rows
     * TODO: flex-direction: column in elements with very little text and lists
     * TODO: images
     * TODO: text without p's or ul's
     */

    var changeContentToDoubleRows = function() {
        // get all html
        if ( $('.doubleColumn').length == 0 ) {
            return false;
        }

        $('.doubleColumn').each( function(el) {
            let html = $(this).html();

            // extract id-div of content element
            let beginning = html.substring(0, html.match(/^<div [^\<].|\s?<h|u|p/).index - 1).trim();

            // extract title
            let title = "";
            let textStart = html.match(/<u|<p/);
            if ( textStart != null) {
                textStartIndex = textStart.index;
            } else {
                textStartIndex = 0;
            }

            let titleSequence = html.substring(0, textStartIndex).match(/<h[1-4]>[^>].+?>/);
            if (titleSequence != null) {
                title = titleSequence[0];
            }
            // cut text in half
            let text = html.substring(textStartIndex);
            if ( text != "") {
                text = text.substring(0, text.match(/<\/div>[\n]*$/).index);
            }
            let text2 = text.substring(text.length / 2);

            // get first possible break
            var breakPoints = {
                'br': text2.indexOf('<br>'),
                'p': text2.indexOf('<p>'),
                'ul': text2.indexOf('<ul>'),
                'li': text2.indexOf('<li>')
            }
            let arr = Object.values(breakPoints);
            var breakPoint = Math.max(...arr);
            var breakEl = '';
            $.each(breakPoints, function(el) {
                if (breakPoints[el] != -1 && breakPoints[el] <= breakPoint) {
                    breakEl = el;
                    breakPoint = breakPoints[el];
                }
            });
            if ( breakPoint == -1) {
                text1 = '<div class="span-6 doubleColumn-col1">'+text+'</div>';
                text2 = '';
            } else if ( breakEl == 'br') {
                text1 = '<div class="span-6 doubleColumn-col1">'+text.substring(0, text.length/2+breakPoint)+'</p></div>';
                text2 = '<div class="span-6 doubleColumn-col2"><p>'+text2.substring(breakPoint+4)+'</div>';
            } else if ( breakEl == 'p' ) {
                text1 = '<div class="span-6 doubleColumn-col1">'+text.substring(0, text.length/2+breakPoint)+'</p></div>';
                text2 = '<div class="span-6 doubleColumn-col2"><p>'+text2.substring(breakPoint+3)+'</div>';
            } else if ( breakEl == 'ul' ) {
                text1 = '<div class="span-6 doubleColumn-col1">'+text.substring(0, text.length/2+breakPoint)+'</ul></div>';
                text2 = '<div class="span-6 doubleColumn-col2"><ul>'+text2.substring(breakPoint+4)+'</div>';
            } else if ( breakEl == 'li' ) {
                text1 = '<div class="span-6 doubleColumn-col1">'+text.substring(0, text.length/2+breakPoint)+'</ul></div>';
                text2 = '<div class="span-6 doubleColumn-col2"><ul>'+text2.substring(breakPoint)+'</div>';
            }

            // put replaced content into element
            let newDiv = '<div class="span-12">'+beginning + title + '</div><div class="span-12">' + text1 + text2 + '</div>';
            $(this).html(newDiv);
        });
    }
    //changeContentToDoubleRows();

});
