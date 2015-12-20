(function() {
  this.Records = React.createClass({
    getInitialState: function() {
      return {
        records: this.props.data
      };
    },
    getDefaultProps: function() {
      return {
        records: []
      };
    },
    plus: function() {
      var plus;
      plus = this.state.records.filter(function(val) {
        return val.milk_amount >= 0;
      });
      return plus.reduce((function(prev, curr) {
        return prev + parseFloat(curr.milk_amount);
      }), 0);
    },
    minus: function() {
      var minus;
      minus = this.state.records.filter(function(val) {
        return val.milk_amount < 0;
      });
      return minus.reduce((function(prev, curr) {
        return prev + parseFloat(curr.milk_amount);
      }), 0);
    },
    balance: function() {
      return this.minus() + this.plus();
    },
    addRecord: function(record) {
      var records;
      records = React.addons.update(this.state.records, {
        $push: [record]
      });
      return this.setState({
        records: records
      });
    },
    deleteRecord: function(record) {
      var index, records;
      index = this.state.records.indexOf(record);
      records = React.addons.update(this.state.records, {
        $splice: [[index, 1]]
      });
      return this.replaceState({
        records: records
      });
    },
    updateRecord: function(record, data) {
      var index, records;
      index = this.state.records.indexOf(record);
      records = React.addons.update(this.state.records, {
        $splice: [[index, 1, data]]
      });
      return this.replaceState({
        records: records
      });
    },
    render: function() {
      var record;
      return React.DOM.div({
        className: 'records'},
        React.DOM.h2({
          className: 'title'}, '記録'),
        React.DOM.div({
          className: 'row'},
          React.createElement(AmountBox, {
            type: 'default',
            milk_amount: this.plus(),
            text: '今日'}),
          React.createElement(AmountBox, {
            type: 'default',
            milk_amount: this.plus(),
            text: '昨日'}),
          React.createElement(AmountBox, {
            type: 'default',
            milk_amount: this.plus(),
            text: '今月'})),
          React.createElement(RecordForm, {
            handleNewRecord: this.addRecord}),
          React.DOM.hr(null),
          React.DOM.table({
            className: 'table table-striped table-hover'},
            React.DOM.thead(null,
              React.DOM.tr(null,
                React.DOM.th(null, 'ID'),
                // React.DOM.th(null, 'モノ'),
                React.DOM.th(null, 'ミルク分量'),
                React.DOM.th(null, 'Created At'),
                React.DOM.th(null, 'Updated At'),
                React.DOM.th(null, ''))),
            React.DOM.tbody(null, (function() {
              var i, len, ref, results;
              ref = this.state.records;
              results = [];
              for (i = 0, len = ref.length; i < len; i++) {
                record = ref[i];
                results.push(React.createElement(Record, {
                key: record.id,
                record: record,
                handleDeleteRecord: this.deleteRecord,
                handleEditRecord: this.updateRecord
              }));
            }
            return results;
          }).call(this))
        ));
    }
  });

}).call(this);