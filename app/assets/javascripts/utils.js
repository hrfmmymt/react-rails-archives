(function() {
  this.amountFormat = function(amount) {
    return Number(amount).toLocaleString() + 'ml';
  };
  this.dateFormat = function(date) {
    return new Date(date).toLocaleString();
  }
}).call(this);