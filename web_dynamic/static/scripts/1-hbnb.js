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
});
