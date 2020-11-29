(function ($) {
    'use strict';
    $(function () {
        // Set Date in the topnav
        let options = { weekday: 'long', month: 'short', day: 'numeric' }
        let d = new Date().toLocaleString('en-GB', options);
        document.getElementById("dateId").innerHTML = d;
        // change the checked class 
        let todoListItem = $('.todo-list');
        todoListItem.on('change', '.checkbox', function () {
            if ($(this).attr('checked')) {
                $(this).removeAttr('checked');
            } else {
                $(this).attr('checked', 'checked');
            }
            $(this).closest("li").toggleClass('completed');
        });

        // todoListItem.on('click', '.remove', function () {
        //     $(this).parent().remove();
        // });
    });

})(jQuery);

// if the item is checked move it into below change the priority 
function getUpdate(id) {
    console.log(id);
        $.ajax({
            type: 'GET',
            url: `/list/change/completed/${id}`,
            data: {
                id
            },
            success: function () {
                location.reload();
            }
        })
    // }
}