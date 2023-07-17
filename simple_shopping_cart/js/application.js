// event handlers
$(document).ready(function() {
    updateCost();
    $(document).on('input', '.qty', updateQty);
    $(document).on('click', '.cancel', cancelItem);
    $(document).on('click', '.add', addItem);
    $('#amt').on('keyup', function(event) {
      if (event.key === 'Enter') {
        addItem();
      }
    });
    
  });
    var cancelItem = function(){
    $('.btn.cancel').on('click', function () {
        $(this).closest('tr').remove();
        updateCost();
      });
    }
// calculate cost per item & total
var updateCost = function() {
  var costArr = [];
  $('tbody tr').each(function (i, item) {
    var amt = parseFloat($(item).find('.amt').text());
    var quantity = parseFloat($(item).find('.qty input').val());
    var itemCost = amt * quantity;
    if(quantity) {
      $(item).children('.cost').html(itemCost.toFixed(2));
      costArr.push(itemCost);
    } else {
      $(item).children('.cost').html('');
    }
  });
  var total = costArr.length > 0 ? costArr.reduce((sum, num) => sum + num) : 0;
  $('#sumTotal').html(total.toFixed(2)); 
};

// add item to cart
var addItem = function() {
  var newItem = $('#item').val();
  var newPrice = parseFloat($('#amt').val()).toFixed(2);
  //var errorMessage = $('msg').prepend();
 // errorMessage();
  if (!newItem || isNaN(newPrice)) {
    //msg.classList.add('.error');
     // msg.innerHTML = 'You must enter both fields to add a new item.';
     // setTimeout(()=> msg.remove(), 3000);
  } else {
    $('#lastRow').before("<tr><td class='item'>" + newItem + "</td><td class='amt'>" + newPrice + "</td><td class='qty'><input type='number'></input></td><td class='cost'></td><td><button class='btn btn-xs cancel'>cancel</button></td></tr>");  
  }
  $('tr').find('#item, #amt').val('');
};

// update cart when quantities change
var updateQty = function () {
  clearTimeout(delay);
  var delay = setTimeout(updateCost, 1000);
};

var timeout;
$(document).on('input', 'tr input', function () {
  clearTimeout(timeout);
  timeout = setTimeout(function () {
    updateQty();
  }, 1000);
});



