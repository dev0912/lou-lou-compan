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
    var slideIndex = 0; 
    showSlides(); // call showslide method 
      
    function showSlides() { 
      var i; 
    
      // get the array of divs' with classname image-sliderfade 
      var slides = document.getElementsByClassName("AnnouncementBar__Content");    
    
      for (i = 0; i < slides.length; i++) { 
          // initially set the display to  
          // none for every image. 
          slides[i].style.display = "none";  
      } 
    
      // increase by 1, Global variable 
      slideIndex++;  
    
      // check for boundary 
      if (slideIndex > slides.length)  
      { 
          slideIndex = 1; 
      } 
    
      slides[slideIndex - 1].style.display = "block"; 
      setTimeout(showSlides, rotate_time != '' ? Number(rotate_time) : 3000);  
    } 
    
  });