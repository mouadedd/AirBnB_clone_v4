$(function () {
  const amChecked = {};

  $('.amenities input:checkbox').change(function (event) {
    if ($(this).is(':checked')) {
      amChecked[$(this).data('id')] = $(this).data('name');
      upCheckAm();
    } else {
      delete amChecked[$(this).data('id')];
      upCheckAm();
    }
  });

  const upCheckAm = () => {
    const length = Object.keys(amChecked).length;
    let content = ''; let i = 0;

    for (const amenity of Object.values(amChecked)) {
      const last = i === length - 1;
      content += amenity;
      if (!last) {
        content += ', ';
      }
      i++;
    }
    $('.amenities h4').text(content);
  };

  $.get('http://127.0.0.1:5001/api/v1/status/',
    function (data, textStatus, jqXHR) {
      if (data.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    }
  );
});
