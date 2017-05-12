 (function($) {
    $('#get-accounts-btn').on('click', function(e) {
      $.get('/accounts', function(data) {
        $('#get-accounts-data').slideUp(function() {
          var html = '';
          data.accounts.forEach(function(account, idx) {
            html += '<div class="inner">';
            html += '<strong>' + account.name +
              ' $' + (account.balances.available != null ? account.balances.available : account.balances.current) + '</strong><br>';
            html += account.subtype + ' ' + account.mask;
            html += '</div>';
          });

          $(this).html(html).slideDown();
        });
      });
    });

    $('#get-item-btn').on('click', function(e) {
      $.post('/item', function(data) {
        $('#upgrade-to-connect-data').slideUp(function() {
          if (data.error)
            $(this).html('<p>' + data.error + '</p>').slideDown();
          else {
            var html = '';
            html += '<p>Here\'s some basic information about your Item:</p>';
            html += '<p>Institution name:' + data.institution.name + '</p>';
            html += '<p>Billed products: ' + data.item.billed_products.join(', ') + '</p>';
            html += '<p>Available products: ' + data.item.available_products.join(', ') + '</p>';

            $(this).html(html).slideDown();
            $('#txnBox').slideDown();
          }
        });
      });
    });

    $('#get-transaction-data').on('click', function(e) {
      $.post('/transactions', function(data) {
        $('#get-transactions-data').slideUp(function() {
          var html = '';
          data.transactions.forEach(function(txn, idx) {
            html += '<div class="inner">';
            html += '<strong>' + txn.name + '</strong><br>';
            html += '$' + txn.amount;
            html += '<br><em>' + txn.date + '</em>';
            html += '</div>';
          });

          $(this).slideUp(function() {
            $(this).html(html).slideDown();
          });
        });
      });
    });
  })(jQuery);
