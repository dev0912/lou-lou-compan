/**
 * Include your custom JavaScript here.
 *
 * We also offer some hooks so you can plug your own logic. For instance, if you want to be notified when the variant
 * changes on product page, you can attach a listener to the document:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   var variant = event.detail.variant; // Gives you access to the whole variant details
 * });
 *
 * You can also add a listener whenever a product is added to the cart:
 *
 * document.addEventListener('product:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 *   var quantity = event.detail.quantity; // Get the quantity that was added
 * });
 *
 * If you just want to force refresh the mini-cart without adding a specific product, you can trigger the event
 * "cart:refresh" in a similar way (in that case, passing the quantity is not necessary):
 *
 * document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
 *   bubbles: true
 * }));
 */

document.addEventListener('variant:changed', function(event) {
    var variant = event.detail.variant; // Gives you access to the whole variant details
  console.log(variant.inventory_quantity);
  if( variant.inventory_quantity < 1 ){
  $('label.SizeSwatch.block-'+variant.id).addClass('ctmSold');
  }
  else{
  $('label.SizeSwatch.block-'+variant.id).removeClass('ctmSold');
  }
  });


  var $announcementFlickity;
  $(document).ready(function() {
    $('body').on('click', '[name="checkout"], [name="goto_pp"], [name="goto_gc"]', function() {
      if ($('#agree').is(':checked')) {
        $(this).submit();
      }
      else {
        alert("You must agree with the terms and conditions of sales to check out.");
        return false;
      }
    });

    
    var rotate_time = $('[data-section-type="announcement-bar"]').data('rotate_time');
    $announcementFlickity = $('[data-section-type="announcement-bar"] .AnnouncementBar__Wrapper').flickity({
      prevNextButtons: false,
      draggable: false,
      pageDots: false,
      contain: true,
      wrapAround: true,
      autoPlay: $('[data-section-type="announcement-bar"]').data('enable_rotate') ? true : false,
      autoPlay: rotate_time != '' ? Number(rotate_time) : 1500
    }); 
    
  });

  
  document.addEventListener('shopify:section:load', function(event) {
    if(event.detail.sectionId == 'announcement') {
      console.log("HERE IS ACCOUNT BAR", $announcementFlickity)
      $announcementFlickity.flickity('destroy')

      setTimeout(function(){
        $announcementFlickity.flickity()
      }, 500)
    }
  });