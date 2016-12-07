(function(UI){

    const tooltip = document.createElement('section');

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
            selector: '[ui-tooltip]'
        }
    );

    UI.dom.on('ready change', function(doc, options){
        UI.Tooltip.$holders = $('[ui-tooltip]');
        UI.Tooltip.$holders.on('mousemove', _onMouseMove);
        UI.Tooltip.$holders.on('mouseleave', _onMouseLeave);
    });

}(UI));