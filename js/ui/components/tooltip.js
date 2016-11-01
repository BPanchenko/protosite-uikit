(function(UI){

    // TODO: уменьшить размер svg до высоты каретки (+ тень)

    var pathCaret = {
        top: 'M19.678,23.84l-7.522-7.523c-0.049-0.039-0.107-0.063-0.156-0.063s-0.103,0.023-0.151,0.063L4.327,23.84 C4.231,23.926,4.146,24,4,24v1h16v-1C19.856,24,19.761,23.924,19.678,23.84z',
        right: 'M1.16,20.178l7.523-7.521c0.039-0.049,0.063-0.107,0.063-0.156s-0.023-0.104-0.063-0.15L1.16,4.827 C1.074,4.731,1,4.646,1,4.5H0v16h1C1,20.355,1.076,20.261,1.16,20.178z',
        bottom: 'M4.322,1.16l7.521,7.523C11.893,8.723,11.951,8.746,12,8.746s0.103-0.023,0.151-0.063l7.522-7.523 C19.77,1.074,19.854,1,20,1V0H4v1C4.145,1,4.239,1.076,4.322,1.16z',
        left: 'M22.84,4.822l-7.523,7.521c-0.039,0.049-0.063,0.107-0.063,0.156s0.023,0.103,0.063,0.151l7.523,7.522 C22.926,20.27,23,20.354,23,20.5h1v-16h-1C23,4.645,22.924,4.739,22.84,4.822z'
    };

    var xmlns = "http://www.w3.org/2000/svg";

    // tooltip markup
    var tooltip = document.createElement('section')
        , caret = document.createElementNS(xmlns, 'svg')
        , caretGroup = document.createElementNS(xmlns, 'g')
        , caretPath = document.createElementNS(xmlns, 'path')
        , caretRect = document.createElementNS(xmlns, 'rect') // fake rectangle for use drop shadow on the caret path
        , body = document.createElement('div');

    tooltip.classList.add('c-tooltip');
    caret.classList.add('c-tooltip__caret');
    caret.classList.add('pos-top-left');
    body.classList.add('c-tooltip__body');

    caret.setAttribute('width', 24);
    caret.setAttribute('height', 25);
    caretPath.setAttribute('d', pathCaret.top);
    caretPath.setAttribute('fill', '#455A64');
    caretRect.setAttribute('x', 0);
    caretRect.setAttribute('y', 0);
    caretRect.setAttribute('width', 24);
    caretRect.setAttribute('height', 25);
    caretRect.setAttribute('fill', 'none');

    caretGroup.appendChild(caretPath);
    caretGroup.appendChild(caretRect);
    caret.appendChild(caretGroup);
    tooltip.appendChild(caret);
    tooltip.appendChild(body);


    //
    function _onMouseMove(e) {
        var $target = $(this);

        document.body.appendChild(tooltip);

        body.innerHTML = e.target.getAttribute('data-ui-tooltip');
        tooltip.style.position = 'fixed';
        tooltip.style.top = (e.clientY + 24) + 'px';
        tooltip.style.left = (e.clientX - 12) + 'px';

        return;
    }

    //
    function _onMouseLeave(e) {

        tooltip.style.position = null;
        tooltip.style.top = null;
        tooltip.style.left = null;

        document.body.removeChild(tooltip);

        return;
    }

    /** Class component */

    UI.Component.extend(
        // selfProps
        {
            name: 'Tooltip'
        }
        // staticProps
        , {
            $holders: null
        }
    );

    UI.dom.on('ready change', function(doc, options){
        UI.Tooltip.$holders = $('[ui-tooltip]');
        UI.Tooltip.$holders.on('mousemove', _onMouseMove);
        UI.Tooltip.$holders.on('mouseleave', _onMouseLeave);
    });

}(UI));