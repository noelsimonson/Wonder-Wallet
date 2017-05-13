 var acct = [];
 var acctid = [];
 var items = {};
 var trans = {};

 (function($) {
  
      $.get('/accounts', function(data) {
                 const transactions = data.accounts;
         trans =  JSON.stringify(transactions);
        console.log("account " + trans);
        data.accounts.forEach(function(account, idx) {
           
            if (acct.indexOf(account.name) === -1)  {
                acct.push(account.name);
                acctid[acct.indexOf(account.name)] = account.account_id;
            };
    
        });
              $.post('/transactions', function(data) {
         const transactions = data.transactions;
         trans =  JSON.stringify(transactions);
       // console.log( " transactions " + );
       console.log( " trans " + trans );
          if (data.transactions != undefined){
            var i = 0
          data.transactions.forEach(function(txn, idx) {
            
            if (txn.category === null) {
              var tcategory = "";
            } else
            { 
              var tcategory = txn.category[0];
            };

            var ind = acctid.indexOf(txn.account_id);
            console.log("ind = " + ind);
             if (ind === -1)  {
              var taccount = "";
            } else
            {
               var taccount = acct[ind];
            };
 
            var row = $(
            '<tr><td>'  + taccount + 
            '</td><td>' + txn.date  + 
            '</td><td>' + txn.name +
            '</td><td>' + txn.amount + 
            '</td><td>' + tcategory + 
            '</td></tr>'); 
           $('tbody').append(row);
      });
        }
    });
      });
    

    // $('#get-item-btn').on('click', function(e) {
      $.post('/item', function(data) {
        const s = data;
         items =  JSON.stringify(s);
       
                console.log("item " +  items);
    //     $('#upgrade-to-connect-data').slideUp(function() {
          if (data.error)
            console.log("error retrieving items" + data.error);
    //         $(this).html('<p>' + data.error + '</p>').slideDown();
          else {
    //        
           console.log('Institution name:' + data.institution.name);
           console.log('Billed products: ' + data.item.billed_products);
          console.log('Available products: ' + data.item.available_products);
          }
    //     });
    //   });
    });


  })(jQuery);

